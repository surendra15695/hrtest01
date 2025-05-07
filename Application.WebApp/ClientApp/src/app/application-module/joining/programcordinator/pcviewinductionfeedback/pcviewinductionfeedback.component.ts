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
import { element } from 'protractor';
declare var jQuery: any;

@Component({
  selector: 'app-pcviewinductionfeedback',
  templateUrl: './pcviewinductionfeedback.component.html',
  styleUrls: ['./pcviewinductionfeedback.component.css']
})
export class PcviewinductionfeedbackComponent implements OnInit {

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
  candidateName: string;
  candidateNo: string;
  activeTabName: string;
  from: string;
  batchId: any;
  batchNo: string;
  type: string;
  EmpNo: string;
  feedbackAllDetails: any[] = [];
  feedbackFormatedDetails: any[] = [];
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
    this.candidateName = this.persistance.get('candidateName');
    this.candidateNo = this.persistance.get('candidateNo');
    this.activeTabName = this.persistance.get("activeTabName");
    this.from = this.persistance.get("From");
    this.batchId = this.persistance.get("BatchId");
    this.batchNo = this.persistance.get("BatchNo");
    this.type = this.persistance.get("Type");
    // this.persistance.set('From', "Batch");
    // this.persistance.set('BatchId', this.batchId);
    // this.persistance.set('BatchNo', this.batchNo);
    this.activatedRoute.queryParams.subscribe((params) => {
      this.candidateId = params['CandidateId'];
      this.EmpNo = params['EmpNo'];
      // this.candidateInductionScheduleDetailsId = params['CandidateInductionScheduleDetailsId'];
      // this.feedBackmode = params['Mode'];
      console.log("chck", this.activeTabName)
    });
    if (this.candidateId != undefined) {
      this.searchFeedbackDetails.candidateId = Number(this.candidateId);
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
    // console.log("Search Feedback Details Obj", this.searchFeedbackDetails);
    this.candidateService.getCandidateFeedbackDetails(this.searchFeedbackDetails).subscribe((result) => {
      if (result) {
        // this.candidateFeedbackDetails = result;
        this.feedbackAllDetails = result;
        // this.candidatefeedbackQuestionDetails = this.candidateFeedbackDetails.feedBackQuestionDataDetailsCandidate;
        // console.log(" Result", result);
        // console.log("Feedback details ", this.candidateFeedbackDetails);
        //console.log("Feedback All details ", this.feedbackAllDetails);
        this.feedbackAllDetails.forEach(element => {
          this.feedbackFormatedDetails.push(element.feedbackData);
        })
        this.feedbackFormatedDetails.forEach(mn_element => {
          mn_element.feedBackQuestionDataDetailsCandidate = mn_element.feedBackQuestionDataDetailsCandidate.filter(x => x.candidateFeedBackId == mn_element.candidateFeedBackId);
        })
        //console.log("Formated details details ", this.feedbackFormatedDetails);
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
  onClickBack() {
    // if (this.from == "Batch") {
    //   jQuery(".custom-menu").hide();
    //   this.persistance.set('activeTabName', "Batch");
    //   this._route.navigate(['/pc-view-candidate'], { queryParams: { BatchId: this.batchId, BatchNo: this.batchNo, Type: this.type } });
    // } 
    // else if(this.from == "Individual")
    // {
    //   jQuery(".custom-menu").hide();
    //   this.persistance.set('activeTabName', "Individual");
    //   this._route.navigate(['/plant/induction-assessment-list']);
    // }
    // else {
    //   this.persistance.set('activeTabName', this.activeTabName);
    //   this._route.navigate(['/corporate/induction-assessment-list']);
    // }
    if (this.from == "Individual") {
      if (this.type == "Corporate") {
        this.persistance.set('activeTabName', "Individual");
        this._route.navigate(['/app/corporate/induction-assessment-list']);
      }
      else if (this.type == "Plant") {
        this.persistance.set('activeTabName', "Individual");
        this._route.navigate(['/app/plant/induction-assessment-list']);
      }
      else if (this.type == "Sales") {
        this.persistance.set('activeTabName', "Individual");
        this._route.navigate(['/app/sales/induction-assessment-list']);
      }
    }
    else {
      this.persistance.set('activeTabName', "Batch");
      this._route.navigate(['/app/pc-view-candidate'], { queryParams: { BatchId: this.batchId, BatchNo: this.batchNo, Type: this.type } });
    }
  }
}
