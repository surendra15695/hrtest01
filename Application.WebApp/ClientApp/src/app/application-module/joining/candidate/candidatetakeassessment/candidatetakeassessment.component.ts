import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../interfaces/common/doctor.interface';
import { IAssessmentQuestionAnswerOptionCandidate, IAssessmentQuestionDataDetailsCandidate, ICandidateAssessmentData, ICandidateAssessmentDetails, ISearchCandidateAssessment, ISearcheTakeAssessment, ITakeAssessmentData } from '../../../../interfaces/joining/candidate.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import { IAssessemenrAssignReleaseList, IBatchAssessment, ICandidateAssessmentList, ISearchAssessmentAssignReleaseList } from '../../../../interfaces/joining/programcoordinator.interface';
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
import { CandidateService } from '../../../../services/joining/candidate/candidate.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { ProgramcoordinatorService } from 'src/app/services/joining/programcoordinator/programcoordinator.service';
declare var jQuery: any;

@Component({
  selector: 'app-candidatetakeassessment',
  templateUrl: './candidatetakeassessment.component.html',
  styleUrls: ['./candidatetakeassessment.component.css']
})
export class CandidatetakeassessmentComponent implements OnInit {

  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  candidateId: number;
  searchTakeAssessment: ISearcheTakeAssessment = {
    candidateId: null,
    assessmentId: null,
    candidateInductionScheduleDetailsId: null,
    isActive: true
  }
  takeAssessmentData: ITakeAssessmentData;
  assessmentQuestionData: IAssessmentQuestionDataDetailsCandidate[] = [];
  assessmentQuestionAnswer: IAssessmentQuestionAnswerOptionCandidate[] = [];
  assessmentId: number;
  assessmentType: string;
  assessmentTypeName: string;
  disabledField: boolean;
  uploadeddetailsarray: any[] = [];
  candidateInductionScheduleDetailsId: number;
  searchuploadedevaluationdetails = {
    BatchId:null,
    EmployeeNo: null,
    candidateId: null,
    assessmentId:null
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
    private titleService: Title, public activatedRoute: ActivatedRoute,
    private positionService: PositionService,
    private candidateService: CandidateService,
    private programcoordinatorService: ProgramcoordinatorService,

  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.candidateId = this.persistance.get('loggedinuser').candidateId;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.activatedRoute.queryParams.subscribe((params) => {
      this.assessmentId = params['AssessmentId'];
      this.candidateInductionScheduleDetailsId = params['CandidateInductionScheduleDetailsId'];
      this.assessmentType = params['Type'];
      this.assessmentTypeName = params['AssessmentType'];
      if(this.assessmentTypeName=="Practical"){
        this.UploadedAssessmentEvaluation();
      }
    });
    this.disabledField = this.assessmentType == "New" ? false : true;
    this.searchTakeAssessment.candidateId = Number(this.candidateId);
    this.searchTakeAssessment.candidateInductionScheduleDetailsId = Number(this.candidateInductionScheduleDetailsId);
    this.searchTakeAssessment.assessmentId = Number(this.assessmentId);
    this.getCandidateAssessmentQuestionAnswerDetails();
  }

  ngOnInit() {
  }
  getCandidateAssessmentQuestionAnswerDetails() {
    console.log("Take assessment Search Obj", this.searchTakeAssessment);

    this.candidateService.getCandidateAssessmentQuestionAnswer(this.searchTakeAssessment).subscribe((result) => {
      if (result) {
        this.takeAssessmentData = result;

        this.assessmentQuestionData = this.takeAssessmentData.assessmentQuestionDataDetailsCandidate;
        // this.assessmentQuestionAnswer=this.takeAssessmentData.assessmentQuestionDataDetailsCandidate;
        this.assessmentQuestionData.forEach(element => {
          element.isAnswered = false
        })
        console.log("Take Assessment Data", this.takeAssessmentData);
        this.SpinnerService.hide();
      }
      else {
        //this.candidateAssessmentDataList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  onChangeRadio(answer) {
    this.assessmentQuestionData.forEach(as_element => {
      as_element.assessmentQuestionAnswerOptionCandidate.forEach(ans_element => {
        if (ans_element.assessmentQuestionId == answer.assessmentQuestionId && ans_element.assessmentQuestionAnswerOptionId == answer.assessmentQuestionAnswerOptionId) {
          ans_element.isAnswer = true;
          as_element.isAnswered = true;
        } else if (ans_element.assessmentQuestionId == answer.assessmentQuestionId && ans_element.assessmentQuestionAnswerOptionId != answer.assessmentQuestionAnswerOptionId) {
          ans_element.isAnswer = false;
          as_element.isAnswered = true;
        }
      })

    })
    // answer.isAnswer = true;
  }
  onChangeCheck(answer, event) {
    this.assessmentQuestionData.forEach(as_element => {
      as_element.assessmentQuestionAnswerOptionCandidate.forEach(ans_element => {
        if (ans_element.assessmentQuestionId == answer.assessmentQuestionId && ans_element.assessmentQuestionAnswerOptionId == answer.assessmentQuestionAnswerOptionId) {
          ans_element.isAnswer = event.target.checked;
          as_element.isAnswered = true;
        }
      })

    })
  }
  UploadedAssessmentEvaluation() {
    if (this.candidateId != undefined) {
      this.searchuploadedevaluationdetails.candidateId = Number(this.candidateId);
    }
    // this.searchuploadedevaluationdetails.BatchId = Number(this.batchId);
    this.searchuploadedevaluationdetails.assessmentId = Number(this.assessmentId);
    this.programcoordinatorService.getUploadedAssessmentEvaluation(this.searchuploadedevaluationdetails).subscribe((result) => {
      if (result) {
        this.uploadeddetailsarray = result;
        console.log("check",this.uploadeddetailsarray)
        this.SpinnerService.hide();
      }
      else {
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      // this.loadDataTable();
      this.SpinnerService.hide();
    });
  }
  onChangeTextValue(answer, qstnData) {
    answer.isAnswer = true;
    qstnData.isAnswered = true;
  }
  // checkAnswer(textanswer){
  //   alert(JSON.stringify(textanswer));
  // }
  onSubmitAssessmentAnswer() {
    debugger
    var flag = 0;
    var msg = "";
    if (this.takeAssessmentData.assessmentTypeId != 2) {
      this.assessmentQuestionData.forEach(element => {
        if (!element.isAnswered) {
          flag = 1;
          msg = "Please answer all question";
        }
      })

    }
    if (flag == 0) {
      this.SpinnerService.show();
      const formData = new FormData();
      formData.append("CandidateId", this.takeAssessmentData.candidateId.toString());
      formData.append("RequisitionDetailId", this.takeAssessmentData.requisitionDetailId.toString());
      formData.append("CandidateAssessmentId", this.takeAssessmentData.candidateAssessmentId.toString());
      formData.append("CandidateInductionScheduleDetailsId", this.takeAssessmentData.candidateInductionScheduleDetailsId.toString());
      formData.append("AssessmentId", this.takeAssessmentData.assessmentId.toString());
      formData.append("CreatedBy", this.loginUserId.toString());
      // Question
      var AssessmentQuestionDetails = [];
      var QuestionAnswerDetails = [];
      this.assessmentQuestionData.forEach(element => {
        var obj = {
          candidateAssessmentQuestionId: element.candidateAssessmentQuestionId,
          assessmentQuestionId: element.assessmentQuestionId,
          candidateAssessmentId: element.candidateAssessmentId,
          assessmentQuestionOrder: element.assessmentQuestionOrder,
          assessmentQuestion: element.assessmentQuestion,
          assessmentQuestionTypeId: element.assessmentQuestionTypeId,
          assessmentQuestionType: element.assessmentQuestionType
        }
        AssessmentQuestionDetails.push(obj);
        element.assessmentQuestionAnswerOptionCandidate.forEach(answer => {
          QuestionAnswerDetails.push(answer)
        })
      })
      console.log("Question Details", AssessmentQuestionDetails);
      console.log("Question answer Details", QuestionAnswerDetails);

      formData.append("AssessmentQuestionDataCandidate", JSON.stringify(AssessmentQuestionDetails));
      formData.append("AssessmentQuestionAnswerOptionCandidate", JSON.stringify(QuestionAnswerDetails));
      this.candidateService.saveAssessmentQuestionAnswer(formData).subscribe((result) => {
        // console.log(result);
        if (result.status == 0) {
          this.notificationService.showError(result.msg, "Error");
          this.SpinnerService.hide();
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this._route.navigate(['/app/career/candidate-assessment-list']);
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
        this.notificationService.showError("Something went wrong", "Error");
      });
    } else {
      this.notificationService.showError(msg, "Error");
    }
  }
  onClickCancel() {
    this.getCandidateAssessmentQuestionAnswerDetails();
  }

}


