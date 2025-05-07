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
  selector: 'app-formjobshadowreview',
  templateUrl: './formjobshadowreview.component.html',
  styleUrls: ['./formjobshadowreview.component.css']
})
export class FormjobshadowreviewComponent implements OnInit {
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  saveForm: FormGroup;
  selectedQuestion1Status: string;
  selectedQuestion9Status: string;
  createdBy: number;
  jobShadowReviewId: number;
  candidateId: number;
  empNo: string;
  empName: string;
  jobshadowReviewData: any = [];
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
      if (this.persistance.get('pagename') == "aicjobshadowreview") {
        this.jobShadowReviewId = this.persistance.get('jobShadowReviewId');
        this.candidateId = this.persistance.get('candidateId');
        this.empNo = this.persistance.get('empNo');
        this.empName = this.persistance.get('empName');
        this.createForm();
        this.getJobShadowReview();
      }
    }
  }

  ngOnInit() {
  }

  createForm() {
    this.saveForm = this.fb.group({
      CandidateId:[this.candidateId],
      EmpNo:[this.empNo],
      JobShadowReviewId:[this.jobShadowReviewId],
      Question1Status: [0],
      Question1Reason: [''],
      Question2Answer: [''],
      Question3Answer: [''],
      Question4Answer: [''],
      Question5Answer: [''],
      Question6Answer: [''],
      Question7Answer: [''],
      Question8Answer: [''],
      Question9Status: [0],
      isActive: [false],
      Remarks: [''],
      CreatedBy:[this.createdBy]
    });
  }

  onSubmit() {
    console.log(this.saveForm.value);
    if (this.saveForm.value.Question1Status == 0 ||
      this.saveForm.value.Question1Reason == '' || this.saveForm.value.Question1Reason == undefined ||
      this.saveForm.value.Question2Answer == '' || this.saveForm.value.Question2Answer == undefined ||
      this.saveForm.value.Question3Answer == '' || this.saveForm.value.Question3Answer == undefined ||
      this.saveForm.value.Question4Answer == '' || this.saveForm.value.Question4Answer == undefined ||
      this.saveForm.value.Question5Answer == '' || this.saveForm.value.Question5Answer == undefined ||
      this.saveForm.value.Question6Answer == '' || this.saveForm.value.Question6Answer == undefined ||
      this.saveForm.value.Question7Answer == '' || this.saveForm.value.Question7Answer == undefined ||
      this.saveForm.value.Question8Answer == '' || this.saveForm.value.Question8Answer == undefined ||
      this.saveForm.value.Remarks == '' || this.saveForm.value.Remarks == undefined ||
      this.saveForm.value.Question9Status == 0
    ) {
      this.notificationService.showError("Please fill all fields to proceed", "Error");
    }
    else {
      this.SpinnerService.show();
      this.saveForm.value.Question1Status =Number(this.saveForm.value.Question1Status );
      this.saveForm.value.Question9Status =Number(this.saveForm.value.Question9Status );
      this.saveForm.value.isActive=true;
      this.handholdingService.submitHandHoldingJobShadowReview(this.saveForm.value).subscribe((result) => {
        if (result) {
          console.log(result);
          if (result.successFlag == 0) {
            this.closeModal.nativeElement.click();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.closeModal.nativeElement.click();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getJobShadowReview();
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
    console.log(this.saveForm.value);
    this.saveForm.value.Question1Status =Number(this.saveForm.value.Question1Status );
    this.saveForm.value.Question9Status =Number(this.saveForm.value.Question9Status );
    this.saveForm.value.isActive=false;
    this.handholdingService.submitHandHoldingJobShadowReview(this.saveForm.value).subscribe((result) => {
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
  remarksDetails:any=[];
  getJobShadowReview() {
    this.disableAll=false;
    this.showButton=false;
    this.SpinnerService.show();
    var searchdata = {
      candidateId: this.candidateId,
      empNo: this.empNo,
      jobShadowReviewId: this.jobShadowReviewId
    }
    this.handholdingService.getJobShadowReviewDetail(searchdata).subscribe((result) => {
      if (result) {
        this.jobshadowReviewData = result.aICHandHoldingJobShadowReviewDetails;
        this.remarksDetails=result.remarksDetailsDatas;
        
        if (this.jobshadowReviewData != undefined) {
          this.selectedQuestion1Status=this.jobshadowReviewData.question1Status;
          this.selectedQuestion9Status=this.jobshadowReviewData.question9Status;
          this.saveForm.patchValue({
            Question1Status:this.jobshadowReviewData.question1Status,
            Question1Reason:this.jobshadowReviewData.question1Reason,
            Question2Answer:this.jobshadowReviewData.question2Answer,
            Question3Answer:this.jobshadowReviewData.question3Answer,
            Question4Answer:this.jobshadowReviewData.question4Answer,
            Question5Answer:this.jobshadowReviewData.question5Answer,
            Question6Answer:this.jobshadowReviewData.question6Answer,
            Question7Answer:this.jobshadowReviewData.question7Answer,
            Question8Answer:this.jobshadowReviewData.question8Answer,
            Question9Status:this.jobshadowReviewData.question9Status,
            Remarks:"",
          })
          
          if(this.jobshadowReviewData.approvalStatusId=="0" || this.jobshadowReviewData.approvalStatusId=="4"){

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
        this.jobshadowReviewData = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }

  gotoJobShadowReviewList()
  {
    this.persistance.set('candidateId',null);
    this.persistance.set('empNo', null);
    this.persistance.set('empName', null);
    this.persistance.set('jobShadowReviewId',null);
    this.persistance.set('pagename', null);
    this._route.navigate(['/app/aic/job-shadowing-review-list']);
  }

}
