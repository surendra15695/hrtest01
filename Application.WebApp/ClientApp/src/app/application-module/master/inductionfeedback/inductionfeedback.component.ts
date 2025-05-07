import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../interfaces/common/doctor.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../interfaces/common/function.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../interfaces/common/position.interface';
import { IJoinersList, IPendingScheduleBatchWise, IPendingScheduleIndividual, IScheduledBatchWise, IScheduledIndividually, IReportingVenueExists } from '../../../interfaces/prejoining/joinerslist.interface';
import { IOnboardingCoordinator, ISearchOnboardingCoordinator, IVenue, ISearchVenue, IJoiningDocument, IWelcomeTemplate } from '../../../interfaces/prejoining/onboardingcoordinator.interface';
import { IBatchWiseInductionFeedback, IIndividualInductionFeedback, ISearchBatchwiseFeedback, ISearchIndividualInductionFeedback } from '../../../interfaces/common/inductionfeedback.interface';
import { LocationService } from '../../../services/common/location/location.service';
import { CommonService } from '../../../services/common/common/common.service';
import { FunctionService } from '../../../services/common/function/function.service';
import { DepartmentService } from '../../../services/common/department/department.service';
import { PositionService } from '../../../services/common/position/position.service';
import { InductionfeedbackService } from '../../../services/common/inductionfeedback/inductionfeedback.service';
import { ShareddataService } from '../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../sharedservices/notification.service';
import { CorporateallocationService } from '../../../services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { JoinersService } from '../../../services/prejoining/onboardingcoordinator/joiners.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { IApproverVertical, IApproverFunction, IApproverDepartment, IApproverVerticalFunctionDepartment, IApproverFunctionDepartment, IBatch, ISearchBatch, ITrainingTittle, IsearchTrainingTittle } from '../../../interfaces/common/common.interface';
import { ICandidateList, ISearchCandidate } from 'src/app/interfaces/common/inductionassessment.interface';
import { InductionassessmentService } from 'src/app/services/common/inductionassessment/inductionassessment.service';
declare var jQuery: any;

@Component({
  selector: 'app-inductionfeedback',
  templateUrl: './inductionfeedback.component.html',
  styleUrls: ['./inductionfeedback.component.css']
})
export class InductionfeedbackComponent implements OnInit {

  inductionFeedbackAssignForm: FormGroup;
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  searchIndividualInductionFeedback: ISearchIndividualInductionFeedback = {

  }
  inductionIndividualFeedback: IIndividualInductionFeedback[] = [];
  searchBatchwiseInductionFeedback: ISearchBatchwiseFeedback = {

  }
  inductionBatchFeedback: IBatchWiseInductionFeedback[] = [];
  // Batch
  batchs: IBatch[] = [];
  selectedBatch: IBatch;
  searchBatch: ISearchBatch = {
    batchId: null,
    vertical: null,
    isActive: null
  }
  // Training tittle
  trainingTittleList: ITrainingTittle[] = [];
  searchTrainingTittle: IsearchTrainingTittle = {
    batchId: null,
    candidateId: null
  }
  // Candidate
  candidateList: ICandidateList[] = [];
  searchCandidate: ISearchCandidate = {
    candidateId: null,
    onBordingMangerId: null,
    onBordingCoordinatorId: null,
    candidateName: "",
    verticalId: null,
    locationId: null,
    functionId: null,
  }
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
    private SpinnerService: NgxSpinnerService,
    private titleService: Title,
    private positionService: PositionService,
    private inductionfeedbackService: InductionfeedbackService,
    private inductionassessmentService: InductionassessmentService
  ) {
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.createInductionAssignSaveForm();
    this.getAllIndividualInductionFeedback();
  }

  ngOnInit() {
    this.loadDataTable();
  }
  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
      });
    });
  }
  createInductionAssignSaveForm() {
    this.inductionFeedbackAssignForm = this.fb.group({
      assessmentId: null,
      batchId: null,
      candidateId: null,
      candidateInductionScheduleDetailsId: null,
      createdBy: this.loginUserId
    });
  }
  onLClickIndividualJoiner() {
    this.getAllIndividualInductionFeedback();
  }
  onClickBatchJoiner() {
    this.getBatchWiseInductionFeedback();
  }
  getAllIndividualInductionFeedback() {
    this.inductionIndividualFeedback = [];
    this.inductionfeedbackService.getAllIndividualInductionFeedback(this.searchIndividualInductionFeedback).subscribe((result) => {
      if (result) {
        this.inductionIndividualFeedback = result;        
        this.SpinnerService.hide();
      }
      else {
        this.inductionIndividualFeedback = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.loadDataTable();
      this.SpinnerService.hide();
    });
  }

  getBatchWiseInductionFeedback() {
    this.inductionBatchFeedback = [];
    this.inductionfeedbackService.getAllBatchwiseInductionFeedback(this.searchBatchwiseInductionFeedback).subscribe((result) => {
      if (result) {
        this.inductionBatchFeedback = result;
        this.SpinnerService.hide();
      }
      else {
        this.inductionBatchFeedback = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.loadDataTable();
      this.SpinnerService.hide();
    });
  }
  getAllBatch() {
    this.batchs = [];
    // this.searchBatch.vertical = Number(this.verticalIds);
    this.commonService.getAllBatch(this.searchBatch).subscribe((result) => {
      if (result) {
        this.batchs = result;        
        
      }
      else {
        this.batchs = [];
      }
    }, error => {
      console.log(error);
    }, () => {

    });
  }
  getAllCandidate() {
    this.candidateList = [];
    this.inductionassessmentService.getCandidateList(this.searchCandidate).subscribe((result) => {
      if (result) {
        this.candidateList = result;
        this.SpinnerService.hide();
      }
      else {
        this.candidateList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }
  onChageBatch() {
    this.inductionFeedbackAssignForm.patchValue({
      candidateInductionScheduleDetailsId: null
    })
    this.searchTrainingTittle.batchId = this.inductionFeedbackAssignForm.get("batchId").value;
    this.searchTrainingTittle.candidateId = null;
    this.getAllTrainingTittle();
  }
  onChangeCandidate() {
    this.inductionFeedbackAssignForm.patchValue({
      candidateInductionScheduleDetailsId: null
    })
    this.searchTrainingTittle.batchId = null;
    this.searchTrainingTittle.candidateId = this.inductionFeedbackAssignForm.get("candidateId").value;
    this.getAllTrainingTittle();
  }
  getAllTrainingTittle() {
    this.trainingTittleList = [];
    this.commonService.getAllTrainingTittle(this.searchTrainingTittle).subscribe((result) => {
      if (result) {
        this.trainingTittleList = result;
      }
      else {
        this.batchs = [];
      }
    }, error => {
      console.log(error);
    }, () => {

    });
  }
  onClickAssignToBatch(data) {
    this.inductionFeedbackAssignForm.patchValue({
      assessmentId: data.assessmentId,
      candidateId: 0
    })
  }
  onClickAssignToCandidate(data) {
    this.inductionFeedbackAssignForm.patchValue({
      assessmentId: data.assessmentId,
      batchId: 0
    })
  }
  onClickCancel() {
    this.createInductionAssignSaveForm();
  }

}
