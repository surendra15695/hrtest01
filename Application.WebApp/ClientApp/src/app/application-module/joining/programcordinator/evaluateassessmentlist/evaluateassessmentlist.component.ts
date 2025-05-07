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
import { IAssessemenrAssignReleaseList, IBatchAssessment, IBatchesAssementEvaluateDetailsList, ICandidateAssessmentList, IEvaluateAssessmentListBatch, ISearchAssessmentAssignReleaseList, ISearchEvaluateAssessmentListBatch } from '../../../../interfaces/joining/programcoordinator.interface';
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
import { IApproverVertical, IApproverFunction, IApproverDepartment, IApproverVerticalFunctionDepartment, IApproverFunctionDepartment, IBatch, ISearchBatch } from '../../../../interfaces/common/common.interface';
import { ExcelService } from '../../../../services/excel/excel.service';
declare var jQuery: any;

@Component({
  selector: 'app-evaluateassessmentlist',
  templateUrl: './evaluateassessmentlist.component.html',
  styleUrls: ['./evaluateassessmentlist.component.css']
})
export class EvaluateassessmentlistComponent implements OnInit {
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  searchEvaluateAssessment: ISearchEvaluateAssessmentListBatch = {
    batchId: null,
    candidateId: null,
    coOrdinatiorId: null,
  }
  evaluateAssessmentListBatch: IEvaluateAssessmentListBatch;
  evaluateAssessmentDetails: IBatchesAssementEvaluateDetailsList[] = [];
  batchId: number;
  candidateId: number;
  coordinatorId: string;
  type: string;
  evaluateFor: string;
  activeTabName: string;
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
    this.persistance.set('trainingTittle', null);
    this.activeTabName = this.persistance.get("activeTabName");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.batchId = params['BatchId'];
      this.candidateId = params['CandidateId'];
      this.coordinatorId = params['CoOrdinatiorId'];
      this.evaluateFor = params['AssessmetFor'];
      this.type = params['Type'];
    });
    // alert(this.evaluateFor);
    if (this.evaluateFor == "Candidate") {
      this.searchEvaluateAssessment.candidateId = Number(this.candidateId);
    } else {
      this.searchEvaluateAssessment.batchId = Number(this.batchId);
    }
    this.searchEvaluateAssessment.coOrdinatiorId = Number(this.coordinatorId);
    this.getBatchwiseEvaluateAssessmentList();
  }

  ngOnInit() {
  }
  getBatchwiseEvaluateAssessmentList() {
    // console.log("Evaluate Assessment Search Obj", this.searchEvaluateAssessment);

    this.programcoordinatorService.getEvaluateAssessmentListBatchwise(this.searchEvaluateAssessment).subscribe((result) => {
      if (result) {
        this.evaluateAssessmentListBatch = result;
        //console.log("Evaluate Assessment data", this.evaluateAssessmentListBatch);
        
        //this.evaluateAssessmentDetails = this.evaluateAssessmentListBatch.batchesAssementEvaluateDetailsList;
        this.evaluateAssessmentDetails = this.evaluateAssessmentListBatch.batchesAssementEvaluateDetailsList.filter(e => e.status != 'Not Assigned');
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
  onClickEvaluate(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('activeTabName', this.activeTabName);
    this.persistance.set('trainingTittle', data.traingTitle);
    if (this.evaluateFor == "Candidate") {
      this._route.navigate(['/app/evaluate-assessment'], { queryParams: { CandidateId: data.candidateId, AssessmentId: data.assessmentId, CandidateInductionScheduleDetailsId: data.candidateInductionScheduleDetailsId, CoOrdinatiorId: this.coordinatorId, Type: this.type, EvaluateFor: this.evaluateFor } });
    } else {
      this._route.navigate(['/app/evaluate-assessment'], { queryParams: { BatchId: data.batchId, AssessmentId: data.assessmentId, CandidateInductionScheduleDetailsId: data.candidateInductionScheduleDetailsId, CoOrdinatiorId: this.coordinatorId, Type: this.type, EvaluateFor: this.evaluateFor } });
    }

  }
  onClickEvaluationUplaod(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('activeTabName', this.activeTabName);
    this.persistance.set('BatchId', data.batchId);
    this._route.navigate(['/app/upload-assessment-evaluation'], { queryParams: { BatchId: data.batchId, AssessmentId: data.assessmentId, CandidateInductionScheduleDetailsId: data.candidateInductionScheduleDetailsId, CoOrdinatiorId: this.coordinatorId, Type: this.type, EvaluateFor: this.evaluateFor, AssessmentName: data.assessmentName } });
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
  onFileDownloadFormat() {
    this.excelService.exportTemplateAsExcel();
  }
}
