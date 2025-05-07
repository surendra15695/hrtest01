import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../interfaces/common/doctor.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../interfaces/common/position.interface';
import { IJoinersList, IPendingScheduleBatchWise, IPendingScheduleIndividual, IScheduledBatchWise, IScheduledIndividually, IReportingVenueExists } from '../../../../interfaces/prejoining/joinerslist.interface';
import { IOnboardingCoordinator, ISearchOnboardingCoordinator, IVenue, ISearchVenue, IJoiningDocument, IWelcomeTemplate } from '../../../../interfaces/prejoining/onboardingcoordinator.interface';
import { ICandidateDetailData, ISearchCandidateDetail, IModeOfJoining, ISearchModeOfJoining } from '../../../../interfaces/preselection/candidate.interface';
import { IBatchAssessmentSummary, ICandidateAssessmentSummaryDetails, ICandidateAssessmentSummaryShow, ISearchBatchAssessmentSummary } from '../../../../interfaces/joining/programcoordinator.interface';
import { LocationService } from '../../../../services/common/location/location.service';
import { CommonService } from '../../../../services/common/common/common.service';
import { FunctionService } from '../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../services/common/department/department.service';
import { PositionService } from '../../../../services/common/position/position.service';
import { RecruitmentmanagerService } from '../../../../services/prejoining/recruitmentmanager/recruitmentmanager.service';
import { ShareddataService } from '../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { CorporateallocationService } from '../../../../services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { ProgramcoordinatorService } from '../../../../services/joining/programcoordinator/programcoordinator.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { Console } from 'console';
import { ExcelService } from 'src/app/services/excel/excel.service';
import * as XLSX from "xlsx";
declare var jQuery: any;

@Component({
  selector: 'app-pcviewbatchassessmentsummary',
  templateUrl: './pcviewbatchassessmentsummary.component.html',
  styleUrls: ['./pcviewbatchassessmentsummary.component.css']
})
export class PcviewbatchassessmentsummaryComponent implements OnInit {
  @ViewChild('table1', { static: false }) table1: ElementRef;

  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  batchId: number;
  batchNo: string;
  type: string;
  coordinatorId: number;
  searchBatchAssessmentSummary: ISearchBatchAssessmentSummary = {
    candidateId: null,
    batchId: null,
    coOrdinatorId: null,
  }
  objnewarray: any[]=[];
  batchWiseAssessment: IBatchAssessmentSummary;
  allCandidateAssessmentSummary: ICandidateAssessmentSummaryShow[] = [];
  candidateAssessmentSummaryDetails: ICandidateAssessmentSummaryDetails[] = [];
  requiredColSpan: number;
  assessmentHeaderArray: any[] = [];
  assessmentValueArray: any[] = [];
  //assessmentSummaryArray: any[] = []; ///later need to remove once API get fixed;
  activeTabName: string;
  workarea: any;
  candidateAssessmentHeader: any[] = [];  // Added on 12-12-2022
  
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private functionService: FunctionService,
    private commonService: CommonService,
    private corporateService: CorporateallocationService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService, public activatedRoute: ActivatedRoute,
    private titleService: Title,
    private positionService: PositionService,
    private programcoordinatorService: ProgramcoordinatorService,
    private excelService: ExcelService
  ) {
    
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.activeTabName = this.persistance.get("activeTabName");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.batchId = params['BatchId'];
      this.batchNo = params['BatchNo'];
      this.coordinatorId = params['CoOrdinatiorId'];
      this.type = params['Type'];
    });
    this.searchBatchAssessmentSummary.batchId = Number(this.batchId);
    this.searchBatchAssessmentSummary.coOrdinatorId = Number(this.coordinatorId);
    this.getAllBatchWiseAssessmentSummary();
  }

  ngOnInit() {
  }

  // New code Modified By Anif on 12-12-2022

  getAllBatchWiseAssessmentSummary() {
    this.programcoordinatorService.getAllBatchwiseAssessmentSummary(this.searchBatchAssessmentSummary).subscribe((result) => {
      if (result) {
        this.batchWiseAssessment = result;
        this.allCandidateAssessmentSummary = this.batchWiseAssessment.candidateAssessmentSummaryMaster;
        for (var i = 0; this.allCandidateAssessmentSummary.length > i; i++) {
          if (this.allCandidateAssessmentSummary[i].candidateAssessmentSummaryDetails.length != 0)
            this.candidateAssessmentHeader = this.allCandidateAssessmentSummary[i].candidateAssessmentSummaryDetails;
          break;
        }
        //this.candidateAssessmentHeader = this.allCandidateAssessmentSummary[0].candidateAssessmentSummaryDetails;
        this.allCandidateAssessmentSummary.forEach(element => {
          element.candidateAssessmentSummaryDetails.forEach(can_element => {
            element.workAreaName = can_element.workArea;
            element.remarks = can_element.assessmentRemarks
          })
        })
        this.prepareHeaderArray();
        this.prepareValueArray();
        this.SpinnerService.hide();
      }
      else {
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  onClickBack() {
    if (this.type == "Corporate") {
      this.persistance.set('activeTabName', this.activeTabName);
      this._route.navigate(['/app/corporate/induction-assessment-list']);
    } else if (this.type == "Plant") {
      this.persistance.set('activeTabName', this.activeTabName);
      this._route.navigate(['/app/plant/induction-assessment-list']);
    } else if (this.type == "Sales") {
      this.persistance.set('activeTabName', this.activeTabName);
      this._route.navigate(['/app/sales/induction-assessment-list']);
    }

  }

  prepareHeaderArray() {
    this.assessmentHeaderArray = [];
    this.candidateAssessmentHeader.forEach(element => {
      if (element.uploded == false) {
        let headerObj1 = {
          assessmentname: element.assessmentName,
          candidateId: element.candidateId,
          assesmentId: element.assessmentId,
          candidateInductionScheduleDetailsId: element.candidateInductionScheduleDetailsId,
          showTextField: false
        }
        this.assessmentHeaderArray.push(headerObj1);
      }
      else if (element.uploded == true && element.assessmentId != 99999999) {
        let headerObj2 = {
          assessmentname: element.assessmentName,
          candidateId: element.candidateId,
          assesmentId: element.assessmentId,
          candidateInductionScheduleDetailsId: element.candidateInductionScheduleDetailsId,
          showTextField: false
        }
        this.assessmentHeaderArray.push(headerObj2);
        let headerObj3 = {
          assessmentname: element.assessmentId == 99999999 ? "Overall Remarks" : "Evaluator Remarks",
          candidateId: element.candidateId,
          assesmentId: element.assessmentId,
          candidateInductionScheduleDetailsId: element.candidateInductionScheduleDetailsId,
          showTextField: true
        }
        this.assessmentHeaderArray.push(headerObj3);
      } else {
        let headerObj4 = {
          assessmentname: element.assessmentId == 99999999 ? "Overall Remarks" : "Evaluator Remarks",
          candidateId: element.candidateId,
          assesmentId: element.assessmentId,
          candidateInductionScheduleDetailsId: element.candidateInductionScheduleDetailsId,
          showTextField: true
        }
        this.assessmentHeaderArray.push(headerObj4);
      }
    })
    this.requiredColSpan = this.assessmentHeaderArray.length;
  }
  prepareValueArray() {
    this.assessmentValueArray = [];
    this.allCandidateAssessmentSummary.forEach(element => {
      element.candidateAssessmentSummaryDetails.forEach(can_element => {
        if (can_element.uploded == false) {
          let headerObj1 = {
            assessmentname: can_element.assessmentName,
            candidateId: can_element.candidateId,
            assesmentId: can_element.assessmentId,
            assessmentValue: can_element.assessmentPercent,
            candidateInductionScheduleDetailsId: can_element.candidateInductionScheduleDetailsId,
            showTextField: false
          }
          this.assessmentValueArray.push(headerObj1);
        } else if (can_element.uploded == true && can_element.assessmentId != 99999999) {
          let headerObj2 = {
            assessmentname: can_element.assessmentName,
            candidateId: can_element.candidateId,
            assesmentId: can_element.assessmentId,
            assessmentValue: can_element.assessmentPercent,
            candidateInductionScheduleDetailsId: can_element.candidateInductionScheduleDetailsId,
            showTextField: false
          }
          this.assessmentValueArray.push(headerObj2);

          let headerObj3 = {
            assessmentname: can_element.assessmentRemarks,
            candidateId: can_element.candidateId,
            assesmentId: can_element.assessmentId,
            assessmentValue: can_element.assessmentPercent,
            candidateInductionScheduleDetailsId: can_element.candidateInductionScheduleDetailsId,
            showTextField: true
          }
          this.assessmentValueArray.push(headerObj3);
        }
        else {
          let headerObj4 = {
            assessmentname: can_element.assessmentRemarks,
            candidateId: can_element.candidateId,
            assesmentId: can_element.assessmentId,
            assessmentValue: can_element.assessmentPercent,
            candidateInductionScheduleDetailsId: can_element.candidateInductionScheduleDetailsId,
            showTextField: true
          }
          this.assessmentValueArray.push(headerObj4);
        }
      })
    })
  }
  getPercentValue(candidateId, headerData) {
    let percentObj = this.assessmentValueArray.find(e => e.candidateId == candidateId && e.assesmentId == headerData.assesmentId && e.showTextField == headerData.showTextField && e.candidateInductionScheduleDetailsId == headerData.candidateInductionScheduleDetailsId);
    return percentObj == undefined ? "NA" : percentObj.assessmentValue;
  }

  onChangeRemarks(candidateId, header, remarksValue) {
    this.allCandidateAssessmentSummary.forEach(element => {
      element.candidateAssessmentSummaryDetails.forEach(can_element => {
        if (can_element.candidateId == candidateId && can_element.assessmentId == header.assesmentId && can_element.candidateInductionScheduleDetailsId == header.candidateInductionScheduleDetailsId) {
          can_element.assessmentRemarks = remarksValue;
        }
      })
    })
  }
  getRemarksValue(candidateId, header) {
    var remarksValue = "";
    this.allCandidateAssessmentSummary.forEach(element => {
      element.candidateAssessmentSummaryDetails.forEach(can_element => {
        if (can_element.candidateId == candidateId && can_element.assessmentId == header.assesmentId && can_element.candidateInductionScheduleDetailsId == header.candidateInductionScheduleDetailsId) {
          remarksValue = can_element.assessmentRemarks;
        }
      })
    })
    return remarksValue;
  }
  onClickSubmit() {
    const formData = new FormData();
    debugger;
    formData.append("BatchId", this.batchId.toString());
    formData.append("CandidateId", "0");
    formData.append("CreatedBy", this.loginUserId.toString());
    formData.append("Detaillist", JSON.stringify(this.allCandidateAssessmentSummary));
    console.log("detaillist", this.allCandidateAssessmentSummary)
    var assessmentSummaryDetailsArray = [];
    this.allCandidateAssessmentSummary.forEach(element => {
      element.candidateAssessmentSummaryDetails.forEach(can_element => {
        let obj = {
          candidateId: can_element.candidateId,
          candidateInductionScheduleDetailsId: can_element.candidateInductionScheduleDetailsId,
          uploded: can_element.uploded,
          assessmentId: can_element.assessmentId,
          assessmentName: can_element.assessmentName,
          assessmentPercent: can_element.assessmentPercent,
          assessmentRemarks: can_element.assessmentRemarks,
          workArea: element.workAreaName,
        }
        assessmentSummaryDetailsArray.push(obj);
      })
    })
    formData.append("CandidateAssessmentSummaryDetailsSave", JSON.stringify(assessmentSummaryDetailsArray));
    this.programcoordinatorService.saveBatchAssessmentSummary(formData).subscribe((result) => {
      if (result.status == 0) {
        this.notificationService.showError(result.msg, "Error");
        this.SpinnerService.hide();
      }
      else {
        this.SpinnerService.hide();
        this.notificationService.showSuccess(result.msg, "Success");
        this.persistance.set('activeTabName', this.activeTabName);
        this.onClickBack();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
      this.notificationService.showError("Something went wrong", "Error");
    });
  }
  onCancelClick() {
    this.getAllBatchWiseAssessmentSummary();
  }
  onFileDownloadaftersubmit(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.table1.nativeElement
    );

    /* new format */
    var fmt = "0";
    /* change cell format of range B2:D4 */
    var range = { s: { r: 1, c: 1 }, e: { r: 2, c: 100000 } };
    for (var R = range.s.r; R <= range.e.r; ++R) {
      for (var C = range.s.c; C <= range.e.c; ++C) {
        var cell = ws[XLSX.utils.encode_cell({ r: R, c: C })];
        if (!cell || cell.t != "n") continue; // only format numeric cells
        cell.z = fmt;
      }
    }
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "AssessmentSummary");
    var fmt = "@";
    wb.Sheets["AssessmentSummary"]["F"] = fmt;

    /* save to file */
    XLSX.writeFile(wb, "AssessmentSummary.xlsx");
  }
}
