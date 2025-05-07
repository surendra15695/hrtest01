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
  selector: 'app-formconfirmationreview',
  templateUrl: './formconfirmationreview.component.html',
  styleUrls: ['./formconfirmationreview.component.css']
})
export class FormconfirmationreviewComponent implements OnInit {
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  createdBy: number;
  confirmationReviewId: number;
  candidateId: number;
  empNo: string;
  empName: string;
  roleIds:any=[]
  selectedConfirmStatus:string;
  ConfirmStatus:number;
  confirmationReviewData: any = {};
  disableAll: boolean = false;
  showButton: boolean = false;
  Question1Answer: string = "";
  Question2Answer: string = "";
  Question3Answer: string = "";
  Question4Answer: string;
  Question5Answer: string;
  Question6Answer: string;
  Remarks: string;
  getCandidateDetailsCandiate:any=[];
  modifiedPdfValues:any={};
  ReviewQuestions: any[] = [];
  AssignmentsArray:any[]=[];
  Assignments:string;
  AssignmentRating:string;
  AssignmentComments:string;
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
      if (this.persistance.get('pagename') == "aicconfirmationreview") {
        this.confirmationReviewId = this.persistance.get('confirmationReviewId');
        this.candidateId = this.persistance.get('candidateId');
        this.empNo = this.persistance.get('empNo');
        this.empName = this.persistance.get('empName');
        this.ConfirmStatus=0;
        this.roleIds = this.persistance.get('loggedinuser').roleIds.split(",");
        this.getCandiateDetails();
        this.getAllReviewQuestions();
        this.getConfirmationReviewDetail()
      }
    }
  }

  allownumbers(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getCandiateDetails(){
    var searchdata={
      EmpNo:this.empNo.toString(),
      CandidateId: Number(this.candidateId)
    }
    this.handholdingService.GetCandidateDetailsConfReview(searchdata).subscribe((result) => {
      if (result) {
        
        this.getCandidateDetailsCandiate=result;
        this.modifiedPdfValues.candidateDetails=this.getCandidateDetailsCandiate;
      }
      else {
       // this.ReviewQuestions = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  getAllReviewQuestions() {
    var searchdata = {
      reviewTypeId: 2
    }
    this.handholdingService.getAllHandHoldingReviewQuestions(searchdata).subscribe((result) => {
      if (result) {
        this.ReviewQuestions = result;
        this.ReviewQuestions=this.ReviewQuestions.filter(x=>x.reviewQuestion!="");
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

  ngOnInit() {
  }

  addAssessment(){
    if(this.Assignments==undefined || this.AssignmentRating==undefined || this.AssignmentComments==undefined ||
      this.Assignments=="" || this.AssignmentRating=="" || this.AssignmentComments==""){
        this.notificationService.showError("Please add the required fields to proceed", "Error");
      }
      else{
        this.AssignmentsArray.push({
          assignments:this.Assignments,
          rating:this.AssignmentRating.toString(),
          assignmentComments:this.AssignmentComments
        })
        this.Assignments="";
        this.AssignmentRating="";
        this.AssignmentComments="";
      }
  }
  gotoConfirmationReviewList(){
    this.persistance.set('candidateId', null);
    this.persistance.set('empNo', null);
    this.persistance.set('empName', null);
    this.persistance.set('halfyearlyReviewId', null);
    this.persistance.set('pagename', null);
    this._route.navigate(['/app/aic/confirmation-review-list']);
  }

  onSubmit(){
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
      this.Question6Answer == '' || this.Question6Answer == undefined ||
      this.Remarks == '' || this.Remarks == undefined || this.ConfirmStatus==undefined || this.ConfirmStatus==0||
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
        ConfirmationReviewId: this.confirmationReviewId,
        Question1Answer: this.Question1Answer,
        Question2Answer: this.Question2Answer,
        Question3Answer: this.Question3Answer,
        Question4Answer: this.Question4Answer,
        Question5Answer: this.Question5Answer,
        Question6Answer: this.Question6Answer,
        ConfirmStatus:Number(this.ConfirmStatus),
        Remarks: this.Remarks,
        DetailFormData: detailArray,
        AssignmentData:this.AssignmentsArray,
        CreatedBy: this.createdBy
      }

      console.log(jsonData);
      //console.log("this.confirmationReviewData.confirmationData.approvalStatusId",this.confirmationReviewData.confirmationData.approvalStatusId);

      this.handholdingService.submitHandHoldingConfirmationReview(jsonData).subscribe((result) => {
        if (result) {
          console.log(result);
          if (result.successFlag == 0) {
            this.closeModal.nativeElement.click();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.closeModal.nativeElement.click();
            this.Remarks=""
            this.notificationService.showSuccess(result.msg, "Success");
            this.getConfirmationReviewDetail();
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
  remarksDetails:any=[];
  getConfirmationReviewDetail() {
    var searchdata = {
      CandidateId: this.candidateId,
      EmpNo:this.empNo,
      ConfirmationReviewId:this.confirmationReviewId
    }
    this.handholdingService.getAllHandHoldingConfirmationReviewDetail(searchdata).subscribe((result) => {
      if (result) {
        this.confirmationReviewData = result;
        if(this.confirmationReviewData.confirmationDetailData.length>0){
          this.ReviewQuestions=this.confirmationReviewData.confirmationDetailData;
          this.Question1Answer=this.confirmationReviewData.confirmationData.question1Answer;
          this.Question2Answer=this.confirmationReviewData.confirmationData.question2Answer;
          this.Question3Answer=this.confirmationReviewData.confirmationData.question3Answer;
          this.Question4Answer=this.confirmationReviewData.confirmationData.question4Answer;
          this.Question5Answer=this.confirmationReviewData.confirmationData.question5Answer;
          this.Question6Answer=this.confirmationReviewData.confirmationData.question6Answer;
          this.ConfirmStatus=this.confirmationReviewData.confirmationData.confirmStatus.toString();
          this.selectedConfirmStatus=this.confirmationReviewData.confirmationData.confirmStatus.toString();
          //this.ConfirmStatus
          //this.Remarks=this.confirmationReviewData.confirmationData.remarks;
          this.remarksDetails=this.confirmationReviewData.remarksDetailsDatas
          this.AssignmentsArray=this.confirmationReviewData.confirmationAssignmentData;
          if(this.confirmationReviewData.confirmationData.approvalStatusId=="0" || this.confirmationReviewData.confirmationData.approvalStatusId=="4" || this.confirmationReviewData.confirmationData.approvalStatusId=="8" || this.confirmationReviewData.confirmationData.approvalStatusId == "9"){

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
        this.confirmationReviewData = {};
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

}
