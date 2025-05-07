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
import { IBatchAssessmentSummary, IBatchAssessmentSummaryPending, ICandidateAssessmentSummaryDetails, ICandidateAssessmentSummaryPendingDetails, ICandidateAssessmentSummaryShow, ICandidateAssessmentSummaryShowPending, ISearchBatchAssessmentSummary } from '../../../../interfaces/joining/programcoordinator.interface';
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
  selector: 'app-pcviewbatchassessmentsummarypending',
  templateUrl: './pcviewbatchassessmentsummarypending.component.html',
  styleUrls: ['./pcviewbatchassessmentsummarypending.component.css']
})
export class PcviewbatchassessmentsummarypendingComponent implements OnInit {
  @ViewChild('table1', { static: false }) table1: ElementRef;
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  batchId: number;
  batchNo: string;
  type: string;
  coordinatorId: number;
  activeTabName: string;
  searchBatchAssessmentSummary: ISearchBatchAssessmentSummary = {
    candidateId: null,
    batchId: null,
    coOrdinatorId: null,
  }
  batchWiseAssessmentPending: IBatchAssessmentSummaryPending;
  allCandidateAssessmentSummaryPending: ICandidateAssessmentSummaryShowPending[] = [];
  candidateAssessmentSummaryPendingDetails: ICandidateAssessmentSummaryPendingDetails[] = [];

  assessmentHeaderArray: any[] = [];
  assessmentValueArray: any[]=[];
  candidateAssessmentHeaderPending: any[] = [];
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
    this.getAllBatchwiseAssessmentSummaryPending();
  }

  ngOnInit() {

  } 

  getAllBatchwiseAssessmentSummaryPending() {
    this.programcoordinatorService.getAllBatchwiseAssessmentSummaryPending(this.searchBatchAssessmentSummary).subscribe((result) => {
      if (result) {
        this.batchWiseAssessmentPending = result;
        this.allCandidateAssessmentSummaryPending = this.batchWiseAssessmentPending.candidateAssessmentSummaryMasterPending;
        this.candidateAssessmentHeaderPending = this.allCandidateAssessmentSummaryPending[0].candidateAssessmentSummaryPendingDetails;
        // this.allCandidateAssessmentSummaryPending.forEach(element => {
        //   element.CandidateAssessmentSummaryPendingDetails.forEach(can_element => {
        //     element.workAreaName = can_element.workArea;
        //     element.remarks = can_element.assessmentRemarks
        //   })
        // })
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
  prepareHeaderArray(){
    this.assessmentHeaderArray = [];
    this.candidateAssessmentHeaderPending.forEach(element => {
      let headerObj = {
        candidateId: element.candidateId,
        assessmentId: element.assessmentId,
        assessmentName: element.assessmentName,
      }
      this.assessmentHeaderArray.push(headerObj);
    })
  }
  prepareValueArray(){
    this.assessmentValueArray = [];
    this.allCandidateAssessmentSummaryPending.forEach(element => {
      element.candidateAssessmentSummaryPendingDetails.forEach(can_element => {
        let headerObj = {
          candidateId: can_element.candidateId,
          assessmentId: can_element.assessmentId,
          assessmentName: can_element.assessmentName,
          assessmentValue: can_element.assesmentStatus,
        }
        this.assessmentValueArray.push(headerObj);
      })
    }
    )
  }

  getAssessmentValue(candidateId, headerData){
    let valueObj = this.assessmentValueArray.find(e => e.candidateId == candidateId && e.assessmentId == headerData.assessmentId);
    return valueObj == undefined ? "NA" : valueObj.assessmentValue;

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
    XLSX.utils.book_append_sheet(wb, ws, "Assessment_Pending_List");
    var fmt = "@";
    wb.Sheets["Assessment_Pending_List"]["F"] = fmt;

    /* save to file */
    XLSX.writeFile(wb, "Assessment_Pending_List.xlsx");
  }
}
