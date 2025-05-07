import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ShareddataService } from '../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { HandholdingService } from '../../../services/handholding/handholding.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formlistenreview',
  templateUrl: './formlistenreview.component.html',
  styleUrls: ['./formlistenreview.component.css']
})
export class FormlistenreviewComponent implements OnInit {
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  saveForm: FormGroup;
  selectedQuestion1Status: string;
  selectedQuestion9Status: string;
  createdBy: number;
  listenReviewId: number;
  candidateId: number;
  empNo: string;
  empName: string;
  listenReviewData: any[] = [];
  disableAll:boolean=false;
  showButton:boolean=false;
  
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
      if (this.persistance.get('pagename') == "aiclistenwreview") {
        this.listenReviewId = this.persistance.get('listenReviewId');
        this.candidateId = this.persistance.get('candidateId');
        this.empNo = this.persistance.get('empNo');
        this.empName = this.persistance.get('empName');
        this.createForm();
        this.getListenReview();
      }
    }
  }

  ngOnInit() {
  }

  createForm() {
    this.saveForm = this.fb.group({
      CandidateId:[this.candidateId],
      EmpNo:[this.empNo],
      ListenReviewId:[this.listenReviewId],
      Question1Answer: [''],
      Question10Answer: [''],
      Question2Answer: [''],
      Question3Answer: [''],
      Question4Answer: [''],
      Question5Answer: [''],
      Question6Answer: [''],
      Question7Answer: [''],
      Question8Answer: [''],
      Question9Answer: [''],
      isActive: [false] ,
      CreatedBy:[this.createdBy]
    });
  }

  onSubmit() {
    this.saveForm.value.isActive = true;
    console.log(this.saveForm.value);
    if (
      this.saveForm.value.Question1Answer == '' || this.saveForm.value.Question1Answer == undefined ||
      this.saveForm.value.Question2Answer == '' || this.saveForm.value.Question2Answer == undefined ||
      this.saveForm.value.Question3Answer == '' || this.saveForm.value.Question3Answer == undefined ||
      this.saveForm.value.Question4Answer == '' || this.saveForm.value.Question4Answer == undefined ||
      this.saveForm.value.Question5Answer == '' || this.saveForm.value.Question5Answer == undefined ||
      this.saveForm.value.Question6Answer == '' || this.saveForm.value.Question6Answer == undefined ||
      this.saveForm.value.Question7Answer == '' || this.saveForm.value.Question7Answer == undefined ||
      this.saveForm.value.Question8Answer == '' || this.saveForm.value.Question8Answer == undefined ||
      this.saveForm.value.Question9Answer == '' || this.saveForm.value.Question9Answer == undefined ||
      this.saveForm.value.Question10Answer == '' || this.saveForm.value.Question10Answer == undefined
    ) {
      this.notificationService.showError("Please fill all fields to proceed", "Error");
    }
    else {
      this.SpinnerService.show();
      //console.log("aam-",this.saveForm.value);
      this.handholdingService.submitHandHoldingListenReview(this.saveForm.value).subscribe((result) => {
        if (result) {
          console.log(result);
          if (result.successFlag == 0) {
            this.closeModal.nativeElement.click();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.closeModal.nativeElement.click();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getListenReview();
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
    this.SpinnerService.show();
    this.saveForm.value.isActive = false;
    this.handholdingService.submitHandHoldingListenReview(this.saveForm.value).subscribe((result) => {
      if (result) {
        console.log(result);
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          
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
  //arg
  getListenReview() {
    this.disableAll=false;
    this.showButton=false;
    this.SpinnerService.show();
    var searchdata = {
      candidateId: this.candidateId,
      empNo: this.empNo,
      listenReviewId: this.listenReviewId
    }
    this.handholdingService.getListenReviewDetail(searchdata).subscribe((result) => {
      if (result) {
        this.listenReviewData = result;
        console.log(this.listenReviewData);

        if (this.listenReviewData.length > 0) {
          this.saveForm.patchValue({
            Question1Answer:this.listenReviewData[0].question1Answer,
            Question2Answer:this.listenReviewData[0].question2Answer,
            Question3Answer:this.listenReviewData[0].question3Answer,
            Question4Answer:this.listenReviewData[0].question4Answer,
            Question5Answer:this.listenReviewData[0].question5Answer,
            Question6Answer:this.listenReviewData[0].question6Answer,
            Question7Answer:this.listenReviewData[0].question7Answer,
            Question8Answer:this.listenReviewData[0].question8Answer,
            Question9Answer:this.listenReviewData[0].question9Answer,
            Question10Answer:this.listenReviewData[0].question10Answer,
          })
          // this.disableAll=true;
          // this.showButton=true;
          if(this.listenReviewData[0].approvalStatusId=="0" || this.listenReviewData[0].approvalStatusId=="4"){

            this.disableAll=false;
            this.showButton=false;
          }
          else{
            this.disableAll=true;
            this.showButton=true;
          }
        }
        else {
          this.disableAll=false;
          this.showButton=false;
        }
        this.SpinnerService.hide();
      }
      else {
        this.listenReviewData = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }

  gotoListenReviewList()
  {
    this.persistance.set('candidateId',null);
    this.persistance.set('empNo', null);
    this.persistance.set('empName', null);
    this.persistance.set('listenReviewId',null);
    this.persistance.set('pagename', null);
    this._route.navigate(['/app/aic/listen-review-list']);
  }

}
