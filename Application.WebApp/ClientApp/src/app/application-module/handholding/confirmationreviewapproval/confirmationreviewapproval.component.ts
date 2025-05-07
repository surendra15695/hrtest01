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
  selector: 'app-confirmationreviewapproval',
  templateUrl: './confirmationreviewapproval.component.html',
  styleUrls: ['./confirmationreviewapproval.component.css']
})
export class ConfirmationreviewapprovalComponent implements OnInit {
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  createdBy: number;
  candidateId: number;
  remarksDetails:any=[];
  empNo: string;
  empName: string;
  roleIds:any=[]
  hrReviewData: any[] = [];
  disableAll:boolean=false;
  showButton:boolean=false;
  verticalId:string;
  confirmationReviewId:number;
  confirmationReviewData: any = {};
  reviewData:any;
  ReviewQuestions: any[] = [];
  AssignmentsArray:any[]=[];
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
      if (this.persistance.get('pagename') == "confirmationapproval"  
      ) {
        this.confirmationReviewId = this.persistance.get('confirmationReviewId');
        this.verticalId = this.persistance.get('verticald');
        this.candidateId = this.persistance.get('candidateId');
        this.roleIds = this.persistance.get('loggedinuser').roleIds.split(",");
        this.empNo = this.persistance.get('empNo');
        this.empName = this.persistance.get('empName');
        this.getConfirmationReviewDetail();
      }
    }
  }

  ngOnInit() {
  }

  getConfirmationReviewDetail() {
    var searchdata = {
      CandidateId: this.candidateId,
      EmpNo:this.empNo,
      ConfirmationReviewId:this.confirmationReviewId
    }
    this.handholdingService.getAllHandHoldingConfirmationReviewDetail(searchdata).subscribe((result) => {
      if (result) {
        this.confirmationReviewData = result;
        this.reviewData=this.confirmationReviewData.confirmationData;
        if(this.confirmationReviewData.confirmationDetailData.length>0){
          this.ReviewQuestions=this.confirmationReviewData.confirmationDetailData;
          this.AssignmentsArray=this.confirmationReviewData.confirmationAssignmentData;
          this.selectedApprovalStatus=this.reviewData.approvalStatusId.toString();
         // this.approvalRemarks=this.reviewData.approvalRemarks;
          this.remarksDetails=this.confirmationReviewData.remarksDetailsDatas
          if(this.selectedApprovalStatus=="0" || this.selectedApprovalStatus=="5" || this.selectedApprovalStatus=="10" || this.selectedApprovalStatus=="11" || this.selectedApprovalStatus=="1"){

            this.disableAll=false;
            this.showButton=false;
          }
          else{
            this.disableAll=true;
            this.showButton=true;
          }
          if(this.roleIds.includes("60") && this.selectedApprovalStatus=="6"){
            this.disableAll=false;
            this.showButton=false;
          }
          if(this.roleIds.includes("63") && this.selectedApprovalStatus=="7"){
            this.disableAll=false;
            this.showButton=false;
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

  onSubmit(){
    if(this.approvalStatusId==0){
      this.notificationService.showError("Please select the approval status", "Error");
    }
    else if(this.approvalRemarks==undefined || this.approvalRemarks==""){
      this.notificationService.showError("Please fill remarks", "Error");
    }
    else{
      var formData={
        FormTypeId:4,
        ReviewId:this.confirmationReviewId,
        CreatedBy:this.createdBy,
        StatusId:this.approvalStatusId,
        Remarks:this.approvalRemarks,
        RoleIds : this.persistance.get('loggedinuser').roleIds
      }
      if(this.roleIds.includes("61")){
        if(formData.StatusId==2){
          formData.StatusId=6
        }
      }
      if(this.roleIds.includes("60")){
        if(formData.StatusId==2){
          formData.StatusId=7
        }
        if(formData.StatusId==4){
          formData.StatusId=8
        }
      }
      if(this.roleIds.includes("63")){
        if(formData.StatusId==2){
          formData.StatusId=2
        }
        if(formData.StatusId==4){
          formData.StatusId=9
        }
      }
    
      this.handholdingService.submitApproverAction(formData).subscribe((result) => {
        if (result) {
          console.log(result);
          if(result.successFlag==0){
            this.approvalRemarks=""
            this.closeModal.nativeElement.click();
            this.notificationService.showError(result.msg, "Error");
          }
          else{
            this.approvalRemarks=""
            this.closeModal.nativeElement.click();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getConfirmationReviewDetail();
            
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
    this._route.navigate(['app/plant/confirmation-review-list']);
  }
}
