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
import { IAssessemenrAssignReleaseList, IAssessmentEvaluate, IBatchAssessment, IBatchesAssementEvaluateDetailsList, ICandidateAssessmentList, ICandidateEvaluationQuestionAnswer, ICandidateEvaluationQuestionMaster, IEvaluateAssessmentListBatch, ISearchAssessmentAssignReleaseList, ISearchAssessmentEvaluation, ISearchEvaluateAssessmentListBatch } from '../../../../interfaces/joining/programcoordinator.interface';
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
import { Console } from 'console';
import { element } from 'protractor';
declare var jQuery: any;
@Component({
  selector: 'app-pcevaluateassessment-showscore',
  templateUrl: './pcevaluateassessment-showscore.component.html',
  styleUrls: ['./pcevaluateassessment-showscore.component.css']
})
export class PcevaluateassessmentShowscoreComponent implements OnInit {

  loginUserId: number;
  batchId: number;
  coordinatorId: number;
  type: string;
  assessmentId: number;
  evaluateFor: string;
  candidatId: number;
  candidateInductionScheduleDetailsId: number;
  trainingTittle: string;

  searchAssessmentEvaluation: ISearchAssessmentEvaluation = {
    batchId: null,
    candidateId: null,
    assessmentId: null,
    candidateInductionScheduleDetailsId: null
  }
  assessmentEvaluateQuestionMaster: ICandidateEvaluationQuestionMaster[] = [];
  assessmentEvaluateData: IAssessmentEvaluate;
  newarray:any[]=[];
  selectedObjectArray: any[] = [];
  candiaditeId_releasae:any[]=[];

  assessmentEvaluateScore: any[]=[];
  finalAssessmentEvaluatedArray: any[]=[];
  finalEvaluatedArray:any[] = [];
  selectedCandidateIds:any[]=[];
  selectedAllCandidateIds:any[]=[];

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
    this.trainingTittle = this.persistance.get('trainingTittle');
    this.finalAssessmentEvaluatedArray = this.persistance.get('finalAssessmentEvaluatedArray');
    this.assessmentEvaluateScore = this.persistance.get('evalutionScore');
    this.selectedObjectArray = this.persistance.get('selectedObjectArray');

    console.log("SCORE", this.assessmentEvaluateScore)

    this.activatedRoute.queryParams.subscribe((params) => {
      this.batchId = params['BatchId'];
      this.candidatId = params['CandidateId'];
      this.coordinatorId = params['CoOrdinatiorId'];
      this.assessmentId = params['AssessmentId'];
      this.candidateInductionScheduleDetailsId = params['CandidateInductionScheduleDetailsId'];
      this.evaluateFor = params['EvaluateFor'];
      this.type = params['Type'];
    });

   }

  ngOnInit() {
  }

  onFinishEvaluation(){

  }
  onCheckSelectAll(eve) {
    this.candiaditeId_releasae =[];
    this.selectedAllCandidateIds = [];
    if (this.assessmentEvaluateScore.length > 0) {
      this.assessmentEvaluateScore.forEach(element => {
        element.checked = eve.target.checked;
      })
    } else {
      jQuery("#chkAll").prop("checked", false);
      this.notificationService.showError("No data to select", "Error");
      this.candiaditeId_releasae =[];
      this.selectedAllCandidateIds = [];
    }
    this.assessmentEvaluateScore.forEach(element => {
      if(element.checked==true){
        this.selectedAllCandidateIds = element.candidateId;
        this.candiaditeId_releasae.push(this.selectedAllCandidateIds);
      }
        else{
          this.candiaditeId_releasae =[];
          this.selectedAllCandidateIds = [];
        }
      }
    )

  }
  getEnableStatus(data) {
    return data.checked;
  }
  onCheckRowWise(data, eve) {
    data.checked = eve.target.checked;
    eve.target.checked==true ? this.candiaditeId_releasae.push(data.candidateId):this.candiaditeId_releasae=this.candiaditeId_releasae.filter(e =>e !=data.candidateId);
    //eve.target.checked==true ? this.candiaditeNo_releasae.push(data.candidateNo.toString()):this.candiaditeNo_releasae=this.candiaditeNo_releasae.filter(e =>e !=data.candidateNo.toString());
    jQuery("#chkAll").prop("checked", false);
  }
  onBackClick() {
    if (this.evaluateFor == "Candidate") {
      this._route.navigate(['/app/corporate/evaluate-assessment-list'], { queryParams: { CandidateId: this.candidatId, CoOrdinatiorId: this.coordinatorId, Type: this.type, AssessmetFor: this.evaluateFor } });
    } else {
      this._route.navigate(['/app/corporate/evaluate-assessment-list'], { queryParams: { BatchId: this.batchId, CoOrdinatiorId: this.coordinatorId, Type: this.type, AssessmetFor: this.evaluateFor } });
    }
  }
  onBackPrevious(){
    this._route.navigate(['/app/evaluate-assessment'], { queryParams: { BatchId: this.batchId, AssessmentId: this.assessmentId, CandidateInductionScheduleDetailsId: this.candidateInductionScheduleDetailsId, CoOrdinatiorId: this.coordinatorId, Type: this.type, EvaluateFor: this.evaluateFor } })
  }
   myClonedArray : any[] = [];
  onGetCanIds(){

    this.finalEvaluatedArray = [];
    this.myClonedArray =[];
    if(this.candiaditeId_releasae.length > 0){
      this.candiaditeId_releasae.forEach((element, index) => {
      this.finalEvaluatedArray=this.finalAssessmentEvaluatedArray.filter(e => e.candidateId == element)
      this.finalEvaluatedArray.forEach(val => this.myClonedArray.push(Object.assign({}, val)));
     
  })
  }
  else
  this.notificationService.showError("Please select atleast one row", "Error");
    // console.log("1",this.selectedCandidateIds)
    // console.log("2",this.finalAssessmentEvaluatedArray)
    // console.log("3", this.myClonedArray)

  }
  onSubmitEvaluation() {
   
    this.SpinnerService.show();
    const formData = new FormData();
    formData.append("CreatedBy", this.loginUserId.toString());
    formData.append("CandidateEvaluationAnswerSave", JSON.stringify(this.myClonedArray));
    this.programcoordinatorService.saveAssessmentEvaluation(formData).subscribe((result) => {
      // console.log(result);
      if (result.status == 0) {
        this.notificationService.showError(result.msg, "Error");
        this.SpinnerService.hide();
      }
      else {
        this.SpinnerService.hide();
        this.notificationService.showSuccess(result.msg, "Success");
        //this._route.navigate(['/corporate/evaluate-assessment-list'], { queryParams: { BatchId: this.batchId, CoOrdinatiorId: this.coordinatorId, Type: this.type, AssessmetFor: this.evaluateFor } });
        if (this.evaluateFor == "Candidate") {
          this._route.navigate(['/app/corporate/evaluate-assessment-list'], { queryParams: { CandidateId: this.candidatId, CoOrdinatiorId: this.coordinatorId, Type: this.type, AssessmetFor: this.evaluateFor } });
        } else {
          this._route.navigate(['/app/corporate/evaluate-assessment-list'], { queryParams: { BatchId: this.batchId, CoOrdinatiorId: this.coordinatorId, Type: this.type, AssessmetFor: this.evaluateFor } });
        }
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
      this.notificationService.showError("Something went wrong", "Error");
    });

  }

}
