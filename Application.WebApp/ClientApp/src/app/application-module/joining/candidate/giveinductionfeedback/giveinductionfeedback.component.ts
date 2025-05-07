import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ICandidateFeedbackDetails, ICandidateFeedbackQuestionSave, IFeedBackQuestionDataDetailsCandidate } from '../../../../interfaces/joining/candidate.interface';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { CandidateService } from '../../../../services/joining/candidate/candidate.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';


declare var jQuery: any;

@Component({
  selector: 'app-giveinductionfeedback',
  templateUrl: './giveinductionfeedback.component.html',
  styleUrls: ['./giveinductionfeedback.component.css']
})
export class GiveinductionfeedbackComponent implements OnInit {

  loginUserId: number;
  candidateId: number;
  candidateInductionScheduleDetailsId: number;
  searchFeedbackDetails = {
    candidateId: null,
    feedBackId: null,
    candidateInductionScheduleDetailsId: null,
    isActive: true
  }
  candidateFeedbackDetails: ICandidateFeedbackDetails;
  candidatefeedbackQuestionDetails: IFeedBackQuestionDataDetailsCandidate[] = [];
  trainingTittle: string;
  candidateInductionFeedbackQuestionSave: ICandidateFeedbackQuestionSave[] = [];
  fieldReadOnly: boolean;
  feedBackmode: string;
  feedbackId:number;
  constructor(
    private fb: FormBuilder,
    private _route: Router, public activatedRoute: ActivatedRoute,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private candidateService: CandidateService
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.trainingTittle = this.persistance.get('trainingTittle');
    this.activatedRoute.queryParams.subscribe((params) => {
      this.candidateId = params['CandidateId'];
      this.feedbackId=params['FeedbackId'];
      this.candidateInductionScheduleDetailsId = params['CandidateInductionScheduleDetailsId'];
      this.feedBackmode = params['Mode'];
    });
    if (this.candidateId != undefined && this.candidateInductionScheduleDetailsId != undefined) {
      this.searchFeedbackDetails.candidateId = Number(this.candidateId);
      this.searchFeedbackDetails.feedBackId = Number(this.feedbackId);
      this.searchFeedbackDetails.candidateInductionScheduleDetailsId = Number(this.candidateInductionScheduleDetailsId);
      this.getAllFeedbackDetails();
    }
    if (this.feedBackmode != undefined) {
      this.fieldReadOnly = true;
    }
  }

  ngOnInit() {
  }

  getAllFeedbackDetails() {
    this.SpinnerService.show();
    //console.log("Search Feedback Details Obj", this.searchFeedbackDetails);
    this.candidateService.getCandidateFeedbackDetails(this.searchFeedbackDetails).subscribe((result) => {
      if (result.length > 0 ) {
        this.candidateFeedbackDetails = result[0].feedbackData;
        this.candidatefeedbackQuestionDetails = this.candidateFeedbackDetails.feedBackQuestionDataDetailsCandidate;
        // console.log(" Result", result);
        // console.log("Feedback details ", this.candidateFeedbackDetails);
        // console.log("Feedback Question Details", this.candidatefeedbackQuestionDetails);

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
  onBackClick() {
    this._route.navigate(["app/career/induction-feedback"]);
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  onSaveFeedback() {
    this.candidatefeedbackQuestionDetails.forEach(element => {
      let qstnObj = {
        candidateFeedBackQuestionId: element.candidateFeedBackQuestionId,
        feedBackQuestionId: element.feedBackQuestionId,
        candidateFeedBackId: element.candidateFeedBackId,
        feedBackQuestionOrder: element.feedBackQuestionOrder,
        feedBackQuestion: element.feedBackQuestion,
        feedBackQuestionTypeId: element.feedBackQuestionTypeId,
        feedBackQuestionAnswer: element.feedBackAnswer
      }
      this.candidateInductionFeedbackQuestionSave.push(qstnObj);
    })

   // console.log("Feedback question Answer Array", this.candidateInductionFeedbackQuestionSave);
    const formData = new FormData();
    formData.append("CandidateFeedBackId", this.candidateFeedbackDetails.candidateFeedBackId.toString());
    formData.append("FeedBackId", this.candidateFeedbackDetails.feedBackId.toString());
    formData.append("CandidateId", this.candidateFeedbackDetails.candidateId.toString());
    formData.append("CandidateInductionScheduleDetailsId", this.candidateFeedbackDetails.candidateInductionScheduleDetailsId.toString());
    formData.append("RequisitionDetailId", this.candidateFeedbackDetails.requisitionDetailId.toString());
    formData.append("CreatedBy", this.loginUserId.toString());
    formData.append("FeedBackQuestionAnswerDataCandidate", JSON.stringify(this.candidateInductionFeedbackQuestionSave));
    this.candidateService.saveCandidateFeedback(formData).subscribe((result) => {
      // console.log(result);
      if (result.successFlag == 0) {
        this.notificationService.showError(result.msg, "Error");
        this.SpinnerService.hide();
      }
      else {
        this.SpinnerService.hide();
        this.notificationService.showSuccess(result.msg, "Success");
        this._route.navigate(["app/career/induction-feedback"]);
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
      this.notificationService.showError("Something went wrong", "Error");
    });

  }
  onCancelClick() {
    this.getAllFeedbackDetails();
  }
}
