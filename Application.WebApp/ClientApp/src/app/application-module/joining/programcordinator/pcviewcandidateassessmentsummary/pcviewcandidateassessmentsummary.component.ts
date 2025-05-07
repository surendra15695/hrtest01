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
import { IBatchAssessmentSummary, ICandidateAssessmentSummary, ICandidateAssessmentSummaryDetails, ICandidateAssessmentSummaryShow, ISearchBatchAssessmentSummary, ISearchCandidateAssessmentSummary } from '../../../../interfaces/joining/programcoordinator.interface';
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
import * as XLSX from "xlsx";

declare var jQuery: any;

@Component({
  selector: 'app-pcviewcandidateassessmentsummary',
  templateUrl: './pcviewcandidateassessmentsummary.component.html',
  styleUrls: ['./pcviewcandidateassessmentsummary.component.css']
})
export class PcviewcandidateassessmentsummaryComponent implements OnInit {
  @ViewChild('table1', { static: false }) table1: ElementRef;
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  batchId: number;
  type: string;
  coordinatorId: number;
  candidateId: number;
  batchNo: string;
  // searchCandidateAssessmetSummary: ISearchCandidateAssessmentSummary = {
  //   candidateId: null,
  //   batchId: null,
  //   coOrdinatorId: null,
  // }
  searchCandidateAssessmetSummary: any = {
    candidateId: null,
    batchId: null,
    coOrdinatorId: null,
    isReassigned: null
  }
  candidateAssessmentSummary: ICandidateAssessmentSummary;
  allCandidateAssessmentSummary: ICandidateAssessmentSummaryShow[] = [];
  candidateAssessmentSummaryDetails: ICandidateAssessmentSummaryDetails[] = [];
  requiredColSpan: number;
  assessmentHeaderArray: any[] = [];
  assessmentValueArray: any[] = [];
  activeTabName: string;
  IsReassigned: any;
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
    private programcoordinatorService: ProgramcoordinatorService
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.activeTabName = this.persistance.get("activeTabName");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.batchId = params['BatchId'];
      this.batchNo = params['BatchNo'];
      this.candidateId = params['CandidateId'];
      this.coordinatorId = params['CoOrdinatiorId'];
      this.type = params['Type'];
      this.IsReassigned = params['IsReassigned'];
    });
    this.searchCandidateAssessmetSummary.candidateId = Number(this.candidateId);
    if (this.IsReassigned) {
      this.searchCandidateAssessmetSummary.batchId = null;
      this.searchCandidateAssessmetSummary.isReassigned = true;
    } else {
      this.searchCandidateAssessmetSummary.batchId = Number(this.batchId);
      this.searchCandidateAssessmetSummary.isReassigned = false;
    }

    this.searchCandidateAssessmetSummary.coOrdinatorId = Number(this.coordinatorId);
    this.getCandidateAssessmentSummary();
  }

  ngOnInit() {
  }
  getCandidateAssessmentSummary() {

    this.programcoordinatorService.getAllBatchwiseAssessmentSummary(this.searchCandidateAssessmetSummary).subscribe((result) => {
      debugger;
      if (result) {
        this.candidateAssessmentSummary = result;
        // console.log("Candidate Assessment Summary", this.candidateAssessmentSummary);
        this.allCandidateAssessmentSummary = this.candidateAssessmentSummary.candidateAssessmentSummaryMaster;
        // console.log("Candidate Assessment Summary for All-", this.allCandidateAssessmentSummary);
        this.candidateAssessmentSummaryDetails = this.allCandidateAssessmentSummary[0].candidateAssessmentSummaryDetails;
        this.allCandidateAssessmentSummary[0].workAreaName = this.candidateAssessmentSummaryDetails[0].workArea;

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
  prepareHeaderArray() {
    this.assessmentHeaderArray = [];
    // console.log("chck", this.candidateAssessmentSummaryDetails)
    this.candidateAssessmentSummaryDetails.forEach(element => {
      let headerObj1 = {
        assessmentname: element.assessmentName,
        candidateId: element.candidateId,
        assesmentId: element.assessmentId,
        showTextField: false
      }
      this.assessmentHeaderArray.push(headerObj1);
      if (element.uploded == true) {
        let headerObj2 = {
          assessmentRemarks: element.assessmentRemarks,
          assessmentname: element.assessmentId == 99999999 ? "Overall Remarks" : "Evaluator Remarks",
          candidateId: element.candidateId,
          assesmentId: element.assessmentId,
          showTextField: true
        }
        this.assessmentHeaderArray.push(headerObj2);
      }
    })
    // console.log("Header Array", this.assessmentHeaderArray);

    this.requiredColSpan = this.assessmentHeaderArray.length;
  }
  prepareValueArray() {
    //debugger
    this.assessmentValueArray = [];
    this.allCandidateAssessmentSummary.forEach(element => {
      element.candidateAssessmentSummaryDetails.forEach(can_element => {
        let headerObj1 = {
          assessmentname: can_element.assessmentName,
          candidateId: can_element.candidateId,
          assesmentId: can_element.assessmentId,
          assessmentValue: can_element.assessmentPercent
        }
        this.assessmentValueArray.push(headerObj1);
        if (can_element.uploded == true) {
          let headerObj2 = {
            //assessmentname: element.assessmentRemarks,
            assessmentname: can_element.assessmentId == 99999999 ? "Overall Remarks" : "Evaluator Remarks",
            candidateId: can_element.candidateId,
            assesmentId: can_element.assessmentId,
            assessmentValue: can_element.assessmentPercent
          }
          this.assessmentValueArray.push(headerObj2);
        }
      })
    })
    // console.log("Assessment Value Array", this.assessmentValueArray);

  }

  getPercentValue(headerData) {
    let percent = this.assessmentValueArray.find(e => e.candidateId == this.candidateId && e.assessmentname == headerData.assessmentname && e.assesmentId == headerData.assesmentId).assessmentValue;
    return percent;
  }
  onChangeRemarks(header, remarksValue) {
    // alert(remarksValue);
    this.allCandidateAssessmentSummary.forEach(element => {
      element.candidateAssessmentSummaryDetails.forEach(can_element => {
        if (can_element.candidateId == this.candidateId && can_element.assessmentId == header.assesmentId) {
          can_element.assessmentRemarks = remarksValue;
        }
      })
    })
  }

  onClickBack() {
    if (this.batchId != undefined) {
      //if(this.type=="Corporate"){
      this.persistance.set('activeTabName', this.activeTabName);
      this._route.navigate(['/app/pc-view-candidate'], { queryParams: { BatchId: this.batchId, BatchNo: this.batchNo, Type: this.type } });
      // }
    } else {
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
  }

  onClickSubmit() {
    this.SpinnerService.show();
    const formData = new FormData();
    formData.append("BatchId", "0");
    formData.append("CandidateId", this.candidateId.toString());
    formData.append("CreatedBy", this.loginUserId.toString());
    var assessmentSummaryDetailsArray = [];
    this.allCandidateAssessmentSummary.forEach(element => {
      element.candidateAssessmentSummaryDetails.forEach(can_element => {
        let obj = {
          candidateId: can_element.candidateId,
          candidateInductionScheduleDetailsId: can_element.candidateInductionScheduleDetailsId, // not comig from backend
          uploded: can_element.uploded,
          assessmentId: can_element.assessmentId,
          assessmentName: can_element.assessmentName,
          assessmentPercent: can_element.assessmentPercent,
          assessmentRemarks: can_element.assessmentRemarks,
          workArea: element.workAreaName
        }
        assessmentSummaryDetailsArray.push(obj);
      })
    })
    formData.append("CandidateAssessmentSummaryDetailsSave", JSON.stringify(assessmentSummaryDetailsArray));
    this.programcoordinatorService.saveIndividualAssessmentSummary(formData).subscribe((result) => {
      // console.log(result);
      if (result.status == 0) {
        this.notificationService.showError(result.msg, "Error");
        this.SpinnerService.hide();
      }
      else {
        this.SpinnerService.hide();
        this.notificationService.showSuccess(result.msg, "Success");
        this.persistance.set('activeTabName', this.activeTabName);
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
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
      this.notificationService.showError("Something went wrong", "Error");
    });
  }
  onCancelClick() {
    this.getCandidateAssessmentSummary();
  }
  onFileDownloadaftersubmit() {
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
