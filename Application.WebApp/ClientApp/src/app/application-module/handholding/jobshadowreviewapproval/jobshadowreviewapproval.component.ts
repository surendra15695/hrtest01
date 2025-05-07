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
  selector: 'app-jobshadowreviewapproval',
  templateUrl: './jobshadowreviewapproval.component.html',
  styleUrls: ['./jobshadowreviewapproval.component.css']
})
export class JobshadowreviewapprovalComponent implements OnInit {
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  createdBy: number;
  candidateId: number;
  empNo: string;
  empName: string;
  hrReviewData: any[] = [];
  disableAll:boolean=false;
  showButton:boolean=false;
  verticalId:string;
  jobShadowReviewId:number;
  jobshadowReviewData: any[] = [];
  reviewData:any;
  approvalStatusId:number;
  approvalRemarks:string;
  selectedApprovalStatus:string;

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
      if (this.persistance.get('pagename') == "jobshadowapproval"  
      ) {
        this.jobShadowReviewId = this.persistance.get('jobShadowReviewId');
        this.verticalId = this.persistance.get('verticald');
        this.candidateId = this.persistance.get('candidateId');
        this.empNo = this.persistance.get('empNo');
        this.empName = this.persistance.get('empName');
        this.getJobShadowReview();
      }
    }
  }

  ngOnInit() {
  }
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
          this.reviewData=this.jobshadowReviewData;
          console.log(this.reviewData);
          this.selectedApprovalStatus=this.reviewData.approvalStatusId.toString();
          //this.approvalRemarks=this.reviewData.approvalRemarks;
          if(this.selectedApprovalStatus=="0" ||this.selectedApprovalStatus=="1"|| this.selectedApprovalStatus=="5"){

            this.disableAll=false;
            this.showButton=false;
          }
          else{
            this.disableAll=true;
            this.showButton=true;
          }
          
        }
        else {
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

  onSubmit(){
    if(this.approvalStatusId==0){
      this.notificationService.showError("Please select the approval status", "Error");
    }
    else if(this.approvalRemarks==undefined || this.approvalRemarks==""){
      this.notificationService.showError("Please fill remarks", "Error");
    }
    else{
      var formData={
        FormTypeId:1,
        ReviewId:this.jobShadowReviewId,
        CreatedBy:this.createdBy,
        StatusId:this.approvalStatusId,
        Remarks:this.approvalRemarks
      }
      this.handholdingService.submitApproverAction(formData).subscribe((result) => {
        if (result) {
          console.log(result);
          if(result.successFlag==0){
            this.closeModal.nativeElement.click();
            this.notificationService.showError(result.msg, "Error");
          }
          else{
            this.closeModal.nativeElement.click();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getJobShadowReview();
          }
        }
        else {
        }
      }, error => {
        console.log(error);
      }, () => {
      });    
    }
  }
  backButton(){
    
    this._route.navigate(['app/plant/job-shadow-review-list']);
  }
}
