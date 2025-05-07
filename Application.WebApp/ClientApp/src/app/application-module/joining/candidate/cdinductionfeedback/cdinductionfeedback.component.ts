import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ICandidateInductionFeedback, ICandidateFeedbackDetailData } from '../../../../interfaces/joining/candidate.interface';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { CandidateService } from '../../../../services/joining/candidate/candidate.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

declare var jQuery: any;


@Component({
  selector: 'app-cdinductionfeedback',
  templateUrl: './cdinductionfeedback.component.html',
  styleUrls: ['./cdinductionfeedback.component.css']
})
export class CdinductionfeedbackComponent implements OnInit {

  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  candidateId: number;
  searchInductionFeedback = {
    candidateId: null,
  }
  candidateInductionFeedbackList: ICandidateInductionFeedback;
  candidateFeedbackDetailData: ICandidateFeedbackDetailData[] = [];
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private candidateService: CandidateService
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.candidateId = this.persistance.get('loggedinuser').candidateId;
    this.persistance.set('trainingTittle', null);
    console.log("CandidateId", this.candidateId);
    console.log("verticcalId", this.verticalIds);
    console.log("loginUserId", this.loginUserId);
    this.searchInductionFeedback.candidateId = this.candidateId;

    this.getCandidateInductionFeedbackList();

  }

  ngOnInit() {
  }
  getCandidateInductionFeedbackList() {
    this.SpinnerService.show();
    // console.log("Search Induction Obj", this.searchInductionFeedback);
    this.candidateService.getAllCandidateInductionFeedback(this.searchInductionFeedback).subscribe((result) => {
      if (result) {
        this.candidateInductionFeedbackList = result;
        //console.log("Candidate Induction Feedback list", this.candidateInductionFeedbackList);
        this.candidateFeedbackDetailData = this.candidateInductionFeedbackList.candidateDetailData;
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
  getFeedbackStatus(statusId, feedbackbutton) {
    switch (statusId) {
      case "1":
        return "Not Released";
        break;
      case "2":
        switch (feedbackbutton) {
          case true:
            return "Pending";
            break;
          case false:
            return "Expired";
            break;
        }
      //return "Pending";
      break;
      case "3":
        return "Feedback Provided";
        break;
    }
  }
  onClickGiveFeedback(data) {
    this.persistance.set('trainingTittle', data.traingTitle);
    this._route.navigate(["app/career/give-feedback"], { queryParams: { CandidateId: this.candidateInductionFeedbackList.candidateId, CandidateInductionScheduleDetailsId: data.candidateInductionScheduleDetailsId, FeedbackId: data.feedbackId } });
  }
  onClickViewFeedback(data) {
    this.persistance.set('trainingTittle', data.traingTitle);
    this._route.navigate(["app/career/give-feedback"], { queryParams: { CandidateId: this.candidateInductionFeedbackList.candidateId, CandidateInductionScheduleDetailsId: data.candidateInductionScheduleDetailsId, FeedbackId: data.feedbackId, Mode: "View" } });
  }

}
