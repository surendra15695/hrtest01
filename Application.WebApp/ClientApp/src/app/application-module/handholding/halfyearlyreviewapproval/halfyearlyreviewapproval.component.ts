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
  selector: 'app-halfyearlyreviewapproval',
  templateUrl: './halfyearlyreviewapproval.component.html',
  styleUrls: ['./halfyearlyreviewapproval.component.css']
})
export class HalfyearlyreviewapprovalComponent implements OnInit {
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  createdBy: number;
  candidateId: number;
  empNo: string;
  empName: string;
  hrReviewData: any[] = [];
  disableAll:boolean=false;
  showButton:boolean=false;
  verticalId:string;
  halfYearlyReviewId:number;
  halfYearlyReviewData: any = {};
  remarksDetails:any=[];
  reviewData:any;
  ReviewQuestions: any[] = [];
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
      if (this.persistance.get('pagename') == "halfyearlyapproval"  
      ) {
        this.halfYearlyReviewId = this.persistance.get('halfYearlyReviewId');
        this.verticalId = this.persistance.get('verticald');
        this.candidateId = this.persistance.get('candidateId');
        this.empNo = this.persistance.get('empNo');
        this.empName = this.persistance.get('empName');
        this.getHalfYearlyReviewDetail();
      }
    }
  }

  ngOnInit() {
  }

  getHalfYearlyReviewDetail() {
    var searchdata = {
      CandidateId: this.candidateId,
      EmpNo:this.empNo,
      HalfYearlyReviewid:this.halfYearlyReviewId
    }
    this.handholdingService.getAllHandHoldingHalfYearlyReviewDetail(searchdata).subscribe((result) => {
      if (result) {
        this.halfYearlyReviewData = result;
        this.reviewData=this.halfYearlyReviewData.halfYearlyData;
        if(this.halfYearlyReviewData.halfYearlyDetailData.length>0){
          this.ReviewQuestions=this.halfYearlyReviewData.halfYearlyDetailData;
          this.selectedApprovalStatus=this.reviewData.approvalStatusId.toString();
          //this.approvalRemarks=this.reviewData.approvalRemarks;
          this.remarksDetails=this.halfYearlyReviewData.remarksDetailsDatas
          if(this.selectedApprovalStatus=="0" || this.selectedApprovalStatus=="5"|| this.selectedApprovalStatus=="1"){

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

  onSubmit(){
    if(this.approvalStatusId==0){
      this.notificationService.showError("Please select the approval status", "Error");
    }
    else if(this.approvalRemarks==undefined || this.approvalRemarks==""){
      this.notificationService.showError("Please fill remarks", "Error");
    }
    else{
      var formData={
        FormTypeId:3,
        ReviewId:this.halfYearlyReviewId,
        CreatedBy:this.createdBy,
        StatusId:this.approvalStatusId,
        Remarks:this.approvalRemarks
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
            this.getHalfYearlyReviewDetail();
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
    this._route.navigate(['app/plant/half-yearly-review-list']);
  }

}
