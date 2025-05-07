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
import { IAssessemenrAssignReleaseList, IAssessmentEvaluate, IBatchAssessment, IBatchesAssementEvaluateDetailsList, ICandidateAssessmentList, ICandidateEvaluationQuestionAnswer, ICandidateEvaluationQuestionMaster, IEvaluateAssessmentListBatch, ISearchAssessmentAssignReleaseList, ISearchAssessmentEvaluation, ISearchEvaluateAssessmentListBatch, IAssessmentEvaluateScore } from '../../../../interfaces/joining/programcoordinator.interface';
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
import { element } from 'protractor';
import { isContext } from 'vm';
declare var jQuery: any;

@Component({
  selector: 'app-pcevaluateassessment',
  templateUrl: './pcevaluateassessment.component.html',
  styleUrls: ['./pcevaluateassessment.component.css']
})
export class PcevaluateassessmentComponent implements OnInit {

  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  searchAssessmentEvaluation: ISearchAssessmentEvaluation = {
    batchId: null,
    candidateId: null,
    assessmentId: null,
    candidateInductionScheduleDetailsId: null
  }
  assessmentEvaluateData: IAssessmentEvaluate;
  assessmentEvaluateQuestionMaster: ICandidateEvaluationQuestionMaster[] = [];
  assessmentQuestionAnswer: ICandidateEvaluationQuestionAnswer[] = [];
  batchId: number;
  coordinatorId: number;
  type: string;
  assessmentId: number;
  evaluateFor: string;
  candidatId: number;
  candidateInductionScheduleDetailsId: number;
  selectedObjectIndex: number = 0;
  selectedObjectArray: any[] = [];
  finalAssessmentEvaluatedArray: any[] = [];
  trainingTittle: string;
  newarray:any[]=[];
  showsubmit:boolean=false;
  btnfinish:boolean=false;
  btnnext: boolean = false
  sum: number =0;
  x: number = 0;
  candidates: any[] = [];
  newarrayScore: any[] = [];
  assessmentEvaluateScore: IAssessmentEvaluateScore;
  //evalutionScore: any[] = [];
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
    this.trainingTittle = this.persistance.get('trainingTittle');

    this.activatedRoute.queryParams.subscribe((params) => {
      this.batchId = params['BatchId'];
      this.candidatId = params['CandidateId'];
      this.coordinatorId = params['CoOrdinatiorId'];
      this.assessmentId = params['AssessmentId'];
      this.candidateInductionScheduleDetailsId = params['CandidateInductionScheduleDetailsId'];
      this.evaluateFor = params['EvaluateFor'];
      this.type = params['Type'];
    });
    this.updateSearchEvaluateValue();
  }


  ngOnInit() {
  }
  updateSearchEvaluateValue() {
    if (this.evaluateFor == "Batch") {
      this.searchAssessmentEvaluation.batchId = Number(this.batchId);
    } else {
      this.searchAssessmentEvaluation.candidateId = Number(this.candidatId);
    }
    this.searchAssessmentEvaluation.assessmentId = Number(this.assessmentId);
    this.searchAssessmentEvaluation.candidateInductionScheduleDetailsId = Number(this.candidateInductionScheduleDetailsId);
    this.getEvaluationDetails();
  }
  getEvaluationDetails() {
    // console.log("Evaluation Search Obj", this.searchAssessmentEvaluation);

    this.programcoordinatorService.getAssessmentEvaluationDetails(this.searchAssessmentEvaluation).subscribe((result) => {
      if (result) {
        this.assessmentEvaluateData = result;
        //console.log("Evaluation Details", result);
        this.assessmentEvaluateQuestionMaster = this.assessmentEvaluateData.candidateEvaluationQuestionMaster;
        this.getindexwiseDataIntoArrray();
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
  getindexwiseDataIntoArrray() {
    this.newarray = [];
    this.selectedObjectArray = [];
    this.assessmentEvaluateQuestionMaster.forEach((element, index) => {
      if (element.assessmentQuestionTypeId == 2) {
        this.selectedObjectArray.push(element);
      }
    })
    if(this.selectedObjectArray.length == 0){
      this.onFinishEvaluation();
    }

    this.selectedObjectArray.forEach((element, index) => {
      if (index == this.selectedObjectIndex) {
        for(let i=0;i<this.selectedObjectArray.length;i++)
        {
          // for(let j=(i+1);j<(this.selectedObjectArray.length-1);j++){
            if(this.selectedObjectArray[index].assessmentQuestionAnswer==this.selectedObjectArray[i].assessmentQuestionAnswer){
              this.newarray = this.selectedObjectArray.filter(e => e.assessmentQuestionAnswer == this.selectedObjectArray[i].assessmentQuestionAnswer)
            // }
          }
        }
        // this.newarray = this.selectedObjectArray.filter(e => e.assessmentQuestionAnswer == "Name any 2 stages of Industrialization and explain")

      }
    })
     console.log("chck",this.selectedObjectArray)
    console.log("newarray",this.newarray)
    console.log("index",this.selectedObjectIndex)
    
    var val = (this.selectedObjectArray.length)-1;
    var newval = (this.newarray.length)-1;
    console.log("sellastarray",this.selectedObjectArray[val].assessmentQuestionAnswer)
    console.log("newlast",this.newarray[newval].assessmentQuestionAnswer)
    if(this.selectedObjectArray[val].assessmentQuestionAnswer==this.newarray[newval].assessmentQuestionAnswer)
    {
      this.btnfinish=true;
      this.btnnext=false
    }
    else
    {
      this.btnfinish=false;
      this.btnnext=true;
    }
    //alert(JSON.stringify(newarray));
  }
  onChangeEvaluation(eve, data) {
    debugger;
    console.log("data",data)
    console.log("assessment",this.assessmentEvaluateQuestionMaster)
    for(let i=0;i<this.assessmentEvaluateQuestionMaster.length;i++){
      if(data.candidateAssessmentQuestionId==this.assessmentEvaluateQuestionMaster[i].candidateAssessmentQuestionId)
      {
        this.assessmentEvaluateQuestionMaster[i].candidateEvaluationQuestionAnswer.forEach(qstn_element => {
          if (qstn_element.candidateAssessmentQuestionId == data.candidateAssessmentQuestionId && qstn_element.assessmentQuestionOrder == data.assessmentQuestionOrder) {
            qstn_element.descreptiveQuestionStatus = eve.target.checked;
            qstn_element.correctAnswer = eve.target.checked ? 1 : 0;
          }
        })
      }
    }
    
  }
  onClickNext() {
    this.selectedObjectIndex = this.selectedObjectIndex + 1;
    this.getindexwiseDataIntoArrray();
  }
  onClickPrevious() {
    this.showsubmit=false
    this.selectedObjectIndex = this.selectedObjectIndex - 1;
    this.getindexwiseDataIntoArrray();
  }
  getSingleChoiceAnswer(val) {
    return val == true ? "True" : "False";
  }
  onFinishEvaluation(){
    this.finalAssessmentEvaluatedArray = [];
    this.showsubmit=true;
    this.assessmentEvaluateQuestionMaster.forEach(qstn_element => {
      // if (qstn_element.assessmentQuestionTypeId == 2) {
      qstn_element.candidateEvaluationQuestionAnswer.forEach(qstn_ans_element => {
        let saveEvaluationObj = {
          candidateAssessmentDescQuestionEvaluationId: 0,
          candidateAssessmentId: qstn_ans_element.assessmentId,
          candidateId: qstn_ans_element.candidateId,
          candidateInductionScheduleDetailsId: qstn_ans_element.candidateInductionScheduleDetailsId,
          candidateAssessmentQuestionId: qstn_ans_element.candidateAssessmentQuestionId,
          candidateAssessmentQuestionAnswerOptionId: qstn_ans_element.candidateAssessmentQuestionAnswerOptionId,
          isCorrect: qstn_ans_element.correctAnswer
        }
        this.finalAssessmentEvaluatedArray.push(saveEvaluationObj);
      })
    })
    console.log("json", this.finalAssessmentEvaluatedArray)
    this.onGetScore();

  }
  onSubmitEvaluation() {
   
    this.SpinnerService.show();
    const formData = new FormData();
    formData.append("CreatedBy", this.loginUserId.toString());
    formData.append("CandidateEvaluationAnswerSave", JSON.stringify(this.finalAssessmentEvaluatedArray));
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
  onBackClick() {
    if (this.evaluateFor == "Candidate") {
      this._route.navigate(['/app/corporate/evaluate-assessment-list'], { queryParams: { CandidateId: this.candidatId, CoOrdinatiorId: this.coordinatorId, Type: this.type, AssessmetFor: this.evaluateFor } });
    } else {
      this._route.navigate(['/app/corporate/evaluate-assessment-list'], { queryParams: { BatchId: this.batchId, CoOrdinatiorId: this.coordinatorId, Type: this.type, AssessmetFor: this.evaluateFor } });
    }
  }


  onGetScore(){
    
    const formData = new FormData();
    formData.append("CreatedBy", this.loginUserId.toString());
    formData.append("CandidateEvaluationAnswerSave", JSON.stringify(this.finalAssessmentEvaluatedArray));
    this.programcoordinatorService.getAssessmentEvaluationScore(formData).subscribe((result) => {
      if (result) {
        this.assessmentEvaluateScore = result;
        this.SpinnerService.hide();
        this.onClickScore();
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

  onClickScore() {
   this.persistance.set('trainingTittle', this.trainingTittle);
   this.persistance.set('finalAssessmentEvaluatedArray', this.finalAssessmentEvaluatedArray)
   this.persistance.set('evalutionScore', this.assessmentEvaluateScore);
   this.persistance.set('selectedObjectArray', this.selectedObjectArray);
   this._route.navigate(['app/evaluate-assessment-showscore'], { queryParams: { BatchId: this.batchId, AssessmentId: this.assessmentId, CandidateInductionScheduleDetailsId: this.candidateInductionScheduleDetailsId, CoOrdinatiorId: this.coordinatorId, Type: this.type, EvaluateFor: this.evaluateFor } })
  }

}
