import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common/common/common.service';
import { isAbsolute } from 'path';
import { InterviewscheduleService } from '../../../services/selection/interviewschedule/interviewschedule.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { ICampusCandidateInterviewFeedbackData } from '../../../interfaces/selection/interviewschedule.interface';
declare var jQuery: any;

@Component({
  selector: 'app-addcampusinterviewfeedback',
  templateUrl: './addcampusinterviewfeedback.component.html',
  styleUrls: ['./addcampusinterviewfeedback.component.css']
})
export class AddcampusinterviewfeedbackComponent implements OnInit {
  isVisisble: boolean = true;
  autoUserId: number;
  candidateId: number;
  interviewDetailId: number;
  requisitionDetailId: number;
  applicationSystemRate: number = 0;
  explanationRate: number = 0;
  helpfulRate: number = 0;
  informativeRate: number = 0;
  interviewProcessRate: number = 0;
  comfortableRate: number = 0;
  recomendedRate: number = 0;
  overallExperience: string = "";
  suggestion: string = "";
  feedbackDetail: ICampusCandidateInterviewFeedbackData;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private commonService: CommonService,
    private interviewService: InterviewscheduleService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
  ) {
    this.candidateId = this.persistance.get('loggedinuser').candidateId;
    this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
    this.requisitionDetailId = this.persistance.get('paramid1');
    this.interviewDetailId = this.persistance.get('paramid3');
  }

  ngOnInit() {
    this.getFeedback();
  }

  updateRate(ratetype, statusval) {
    if (ratetype == 'ApplicationSystemRate') {
      this.applicationSystemRate = statusval;
    }
    else if (ratetype == 'ExplanationRate') {
      this.explanationRate = statusval;
    }
    else if (ratetype == 'HelpfulRate') {
      this.helpfulRate = statusval;
    }
    else if (ratetype == 'InformativeRate') {
      this.informativeRate = statusval;
    }
    else if (ratetype == 'InterviewProcessRate') {
      this.interviewProcessRate = statusval;
    }
    else if (ratetype == 'ComfortableRate') {
      this.comfortableRate = statusval;
    }
    else if (ratetype == 'RecomendedRate') {
      this.recomendedRate = statusval;
    }
  }

  getFeedback() {
    this.isVisisble = true;
    var formData: any = {
      candidateId: this.candidateId,
      interviewDetailId: this.interviewDetailId
    }
    this.interviewService.getCampusCandidateInterviewFeedbackDetail(formData).subscribe((result) => {
      if (result) {
        this.feedbackDetail = result;
        this.applicationSystemRate = this.feedbackDetail.applicationSystemRate;
        this.explanationRate = this.feedbackDetail.explanationRate;
        this.helpfulRate = this.feedbackDetail.helpfulRate;
        this.informativeRate = this.feedbackDetail.informativeRate;
        this.interviewProcessRate = this.feedbackDetail.interviewProcessRate;
        this.comfortableRate = this.feedbackDetail.comfortableRate;
        this.recomendedRate = this.feedbackDetail.recomendedRate;
        this.overallExperience = this.feedbackDetail.overallExperience;
        this.suggestion = this.feedbackDetail.suggestion;
        this.isVisisble = false;
      }
      else {
        this.feedbackDetail = null;
        this.applicationSystemRate = 0;
        this.explanationRate = 0;
        this.helpfulRate = 0;
        this.informativeRate = 0;
        this.interviewProcessRate = 0;
        this.comfortableRate = 0;
        this.recomendedRate = 0;
        this.overallExperience = "";
        this.suggestion = "";
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
    });
  }

  addFeedback() {
    console.log(this.overallExperience);
    debugger;
    if (this.applicationSystemRate == 0
      || this.explanationRate == 0
      || this.helpfulRate == 0
      || this.informativeRate == 0
      || this.interviewProcessRate == 0
      || this.comfortableRate == 0
      || this.recomendedRate == 0
      || this.overallExperience == "" || this.overallExperience == undefined
      || this.suggestion == "" || this.suggestion == undefined
    ) {
      this.notificationService.showError("Please fill all fileds to proceed", "Error");
    }
    else {
      var formData: any = {
        CandidateId: this.candidateId,
        InterviewDetailId: this.interviewDetailId,
        ApplicationSystemRate: this.applicationSystemRate,
        ExplanationRate: this.explanationRate,
        HelpfulRate: this.helpfulRate,
        InformativeRate: this.informativeRate,
        InterviewProcessRate: this.interviewProcessRate,
        ComfortableRate: this.comfortableRate,
        RecomendedRate: this.recomendedRate,
        OverallExperience: this.overallExperience,
        Suggestion: this.suggestion,
        CreatedBy: this.candidateId
      }
      this.interviewService.addCampusCandidateInterviewFeedback(formData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.getFeedback();
          }
        }
        else {
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
      }, () => {
      });
    }
  }

  gotoFeedback() {
    this.persistance.set('paramid1', null);
    this.persistance.set('paramid2', null);
    this._route.navigate(['/app/career/campusinterviewfeedback']);
  }
  // Added By anif on 04-07-2022
  onCancelClick() {
    this.applicationSystemRate = 0;
    this.explanationRate = 0;
    this.helpfulRate = 0;
    this.informativeRate = 0;
    this.interviewProcessRate = 0;
    this.comfortableRate = 0;
    this.recomendedRate = 0;
    this.overallExperience = "";
    this.suggestion = "";
  }

}
