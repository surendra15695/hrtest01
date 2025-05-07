import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ShareddataService } from '../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../sharedservices/notification.service';
import { HandholdingService } from '../../../services/handholding/handholding.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formhalfyearlyreview',
  templateUrl: './formhalfyearlyreview.component.html',
  styleUrls: ['./formhalfyearlyreview.component.css']
})
export class FormhalfyearlyreviewComponent implements OnInit {
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  saveForm: FormGroup;
  selectedQuestion1Status: string;
  selectedQuestion9Status: string;
  createdBy: number;
  halfyearlyReviewId: number;
  candidateId: number;
  empNo: string;
  empName: string;
  halfYearlyReviewData: any = {};
  disableAll: boolean = false;
  showButton: boolean = false;
  Question1Answer: string = "";
  Question2Answer: string = "";
  Question3Answer: string = "";
  Question4Answer: string;
  Question5Answer: string;
  Remarks: string;
  //isActive: boolean;

  ReviewQuestions: any[] = [];
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private titleService: Title,
    private persistance: PersistanceService,
    private handholdingService: HandholdingService
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    if (this.persistance.get('pagename') != null) {
      if (this.persistance.get('pagename') == "aichalfyearlyreview") {
        this.halfyearlyReviewId = this.persistance.get('halfyearlyReviewId');
        this.candidateId = this.persistance.get('candidateId');
        this.empNo = this.persistance.get('empNo');
        this.empName = this.persistance.get('empName');
        this.getAllReviewQuestions();
        this.getHalfYearlyReviewDetail();
      }
    }
  }

  ngOnInit() {
  }

  allownumbers(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }



  onSubmit() {
    console.log(this.ReviewQuestions);
    var arrayFlag = 0;
    for (var i = 0; i < this.ReviewQuestions.length; i++) {
      if (this.ReviewQuestions[0].rating == "" || this.ReviewQuestions[0].rating == undefined ||
        this.ReviewQuestions[0].reviewComments == "" || this.ReviewQuestions[0].reviewComments == undefined
      ) {
        arrayFlag = 1;
      }
    }
    if (
      this.Question1Answer == '' || this.Question1Answer == undefined ||
      this.Question2Answer == '' || this.Question2Answer == undefined ||
      this.Question3Answer == '' || this.Question3Answer == undefined ||
      this.Question4Answer == '' || this.Question4Answer == undefined ||
      this.Question5Answer == '' || this.Question5Answer == undefined || arrayFlag == 1

    ) {
      this.notificationService.showError("Please fill all fields to proceed", "Error");
    }
    else {
      this.SpinnerService.show();
      var detailArray = [];
      for (var i = 0; i < this.ReviewQuestions.length; i++) {
        detailArray.push({
          ReviewFormId: this.ReviewQuestions[i].reviewTypeId,
          ReviewQuestionId: this.ReviewQuestions[i].reviewQuestionId,
          Rating: this.ReviewQuestions[i].rating.toString(),
          ReviewComments: this.ReviewQuestions[i].reviewComments,
        })
      }
      var jsonData = {
        CandidateId: this.candidateId,
        EmpNo: this.empNo,
        HalfYearlyReviewId: this.halfyearlyReviewId,
        Question1Answer: this.Question1Answer,
        Question2Answer: this.Question2Answer,
        Question3Answer: this.Question3Answer,
        Question4Answer: this.Question4Answer,
        Question5Answer: this.Question5Answer,
        Remarks: this.Remarks,
        isActive: true,
        DetailFormData: detailArray,
        CreatedBy: this.createdBy
      }

      console.log(jsonData);

      this.handholdingService.submitHandHoldingHalfYearlyReview(jsonData).subscribe((result) => {
        if (result) {
          console.log(result);
          if (result.successFlag == 0) {
            this.Remarks=""
            this.closeModal.nativeElement.click();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.Remarks=""
            this.closeModal.nativeElement.click();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getHalfYearlyReviewDetail();
          }
          this.SpinnerService.hide();
        }
        else {
          this.SpinnerService.hide();
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
      }, () => {
      });
    }
  }
  saveasDraftFormat(){
    {
      this.SpinnerService.show();
      var detailArray = [];
      for (var i = 0; i < this.ReviewQuestions.length; i++) {
        detailArray.push({
          ReviewFormId: this.ReviewQuestions[i].reviewTypeId,
          ReviewQuestionId: this.ReviewQuestions[i].reviewQuestionId,
          Rating: this.ReviewQuestions[i].rating,
          ReviewComments: this.ReviewQuestions[i].reviewComments,
        })
      }
      var jsonData = {
        CandidateId: this.candidateId,
        EmpNo: this.empNo,
        HalfYearlyReviewId: this.halfyearlyReviewId,
        Question1Answer: this.Question1Answer,
        Question2Answer: this.Question2Answer,
        Question3Answer: this.Question3Answer,
        Question4Answer: this.Question4Answer,
        Question5Answer: this.Question5Answer,
        Remarks: this.Remarks,
        isActive: false,
        DetailFormData: detailArray,
        CreatedBy: this.createdBy
      }

      console.log(jsonData);

      this.handholdingService.submitHandHoldingHalfYearlyReview(jsonData).subscribe((result) => {
        if (result) {
          console.log(result);
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.getHalfYearlyReviewDetail();
          }
          this.SpinnerService.hide();
        }
        else {
          this.SpinnerService.hide();
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
      }, () => {
      });
    }
  }

  getAllReviewQuestions() {
    var searchdata = {
      reviewTypeId: 1
    }
    this.handholdingService.getAllHandHoldingReviewQuestions(searchdata).subscribe((result) => {
      if (result) {
        this.ReviewQuestions = result;
        console.log(this.ReviewQuestions);
      }
      else {
        this.ReviewQuestions = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
remarksDetails:any=[];
  getHalfYearlyReviewDetail() {
    var searchdata = {
      CandidateId: this.candidateId,
      EmpNo:this.empNo,
      HalfYearlyReviewid:this.halfyearlyReviewId
    }
    this.handholdingService.getAllHandHoldingHalfYearlyReviewDetail(searchdata).subscribe((result) => {
      if (result) {
        this.halfYearlyReviewData = result;
        if(this.halfYearlyReviewData.halfYearlyDetailData.length>0){
          this.ReviewQuestions=this.halfYearlyReviewData.halfYearlyDetailData;
          this.Question1Answer=this.halfYearlyReviewData.halfYearlyData.question1Answer;
          this.Question2Answer=this.halfYearlyReviewData.halfYearlyData.question2Answer;
          this.Question3Answer=this.halfYearlyReviewData.halfYearlyData.question3Answer;
          this.Question4Answer=this.halfYearlyReviewData.halfYearlyData.question4Answer;
          this.Question5Answer=this.halfYearlyReviewData.halfYearlyData.question5Answer;
          //this.Remarks=this.halfYearlyReviewData.halfYearlyData.remarks;
          this.remarksDetails=this.halfYearlyReviewData.remarksDetailsDatas
          if(this.halfYearlyReviewData.halfYearlyData.approvalStatusId=="0" || this.halfYearlyReviewData.halfYearlyData.approvalStatusId=="4"){

            this.disableAll=false;
            this.showButton=false;
          }
          else{
            this.disableAll=true;
            this.showButton=true;
          }
        }
        else{
          this.disableAll=false;
          this.showButton=false;
        }
      }
      else {
        this.halfYearlyReviewData = {};
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }



  gotoHalfYearlyReviewList() {
    this.persistance.set('candidateId', null);
    this.persistance.set('empNo', null);
    this.persistance.set('empName', null);
    this.persistance.set('halfyearlyReviewId', null);
    this.persistance.set('pagename', null);
    this._route.navigate(['/app/aic/half-yearly-review-list']);
  }

}
