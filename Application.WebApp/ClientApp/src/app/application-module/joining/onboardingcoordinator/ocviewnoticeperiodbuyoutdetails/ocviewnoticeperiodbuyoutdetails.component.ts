import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../interfaces/common/doctor.interface';
import { ICandidateAssessmentData, ICandidateAssessmentDetails, ICandidateMedicalReimbursement, ICandidateMedicalReimbursementDetails, IEmployeeReimbursementDetails, INoticePeriodBuyouteReimbursement, INoticePeriodBuyouteReimbursementNew, ISearchCandidateAssessment, ISearchCandidateMedicalReimbursement, ISearcheNoticePeriodBuyouteReimbursement } from '../../../../interfaces/joining/candidate.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import { IAssessemenrAssignReleaseList, IBatchAssessment, ICandidateAssessmentList, ISearchAssessmentAssignReleaseList } from '../../../../interfaces/joining/programcoordinator.interface';
import { LocationService } from '../../../../services/common/location/location.service';
import { OnboardingcoordinatorService } from '../../../../services/joining/onboardingcoordinator/onboardingcoordinator.service';
import { CommonService } from '../../../../services/common/common/common.service';
import { FunctionService } from '../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../services/common/department/department.service';
import { PositionService } from '../../../../services/common/position/position.service';
import { RecruitmentmanagerService } from '../../../../services/prejoining/recruitmentmanager/recruitmentmanager.service';
import { ShareddataService } from '../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { CorporateallocationService } from '../../../../services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { CandidateService } from '../../../../services/joining/candidate/candidate.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { HttpEventType } from '@angular/common/http';
declare var jQuery: any;
declare var html2pdf: any;

@Component({
  selector: 'app-ocviewnoticeperiodbuyoutdetails',
  templateUrl: './ocviewnoticeperiodbuyoutdetails.component.html',
  styleUrls: ['./ocviewnoticeperiodbuyoutdetails.component.css']
})
export class OcviewnoticeperiodbuyoutdetailsComponent implements OnInit {

  zipFileName:string;
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  candidateId: number;
  candidateNoticePeriodBuyOutDaysId: number;
  searchNoticPeriodBuyOutReimbursement: ISearcheNoticePeriodBuyouteReimbursement = {
    candidateId: null,
    requisitionDetailId: null,
    candidateNoticePeriodBuyOutDaysId: null,
    empId: null,
  }
  noticeperiodDataRecord:any=[];
  noticeperiodData:any={};
  noticePeriodBuyOutReimbursement: any = [];
  noticePeriodDays: number;
  noticePeriodServeDays: number;
  noticePeriodRemainingDays: number;
  settlementAmount: number;
  IsReadOnly: boolean;
  claimStatus: number = 3;
  claimRemarks: string;
  fullName: string;
  ForPrintRemarks: any[];
  DocumentPathForPDF: string;
  activeTabName: string;

  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private functionService: FunctionService,
    private commonService: CommonService,
    private corporateService: CorporateallocationService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService, private onboardingCordinatorService: OnboardingcoordinatorService,
    private SpinnerService: NgxSpinnerService,   // private datePipe: DatePipe,
    private titleService: Title, public activatedRoute: ActivatedRoute,
    private positionService: PositionService,
    private candidateService: CandidateService
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.activeTabName = this.persistance.get("activeTabName");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.candidateId = params['CandidateId'];
      this.candidateNoticePeriodBuyOutDaysId = params['CandidateNoticePeriodBuyOutDaysId'];
    });
    this.searchNoticPeriodBuyOutReimbursement.candidateId = Number(this.candidateId);
    this.searchNoticPeriodBuyOutReimbursement.candidateNoticePeriodBuyOutDaysId = Number(this.candidateNoticePeriodBuyOutDaysId);
    this.candidateNoticePeriodBuyoutReimbursementDetails();
  }

  ngOnInit() {
  }
  candidateNoticePeriodBuyoutReimbursementDetails() {
    this.candidateService.getCandidateNoticePeriodBuyoutReimbursementDetails(this.searchNoticPeriodBuyOutReimbursement).subscribe((result:any[]) => {
      if (result) {
        this.noticePeriodBuyOutReimbursement = result;
       this.DocumentPathForPDF = result[0].documentPath;
       console.log("View Notice Period Buyout Details", this.noticePeriodBuyOutReimbursement);
       this.noticeperiodData.candidateFullName= this.noticePeriodBuyOutReimbursement[0].candidateFullName;
       this.noticeperiodData.empNo= this.noticePeriodBuyOutReimbursement[0].empNo;
       this.noticeperiodData.dateOfJoining= this.noticePeriodBuyOutReimbursement[0].dateofJoining;
       this.noticeperiodData.functionName= this.noticePeriodBuyOutReimbursement[0].functionName;
       this.noticeperiodData.gradeName= this.noticePeriodBuyOutReimbursement[0].gradeName;
       this.noticeperiodData.locationOffice= this.noticePeriodBuyOutReimbursement[0].locationOffice;
       this.noticeperiodData.offerSendDate= this.noticePeriodBuyOutReimbursement[0].offerSendDate;
       this.noticeperiodData.noticePeriodDays= this.noticePeriodBuyOutReimbursement[0].noticePeriodDays;
       this.noticeperiodData.noticePeriodServeDays=  this.noticePeriodBuyOutReimbursement[0].noticePeroiodServed
       this.noticeperiodData.noticePeriodRemainingDays=  this.noticePeriodBuyOutReimbursement[0].noticePeroiodServed
       this.noticeperiodData.settlementAmount= this.noticePeriodBuyOutReimbursement[0].amount;
       this.noticeperiodData.dateresignation= this.noticePeriodBuyOutReimbursement[0].dateOfResigation
       this.noticeperiodData.recoveryAmountperDay= this.noticePeriodBuyOutReimbursement[0].recoveryAmountPerDay;
        if(this.noticePeriodBuyOutReimbursement[0].noticePeriodRecovery==1){
          this.noticeperiodData.noticeperiodRecovery="Basic"
        }
        if(this.noticePeriodBuyOutReimbursement[0].noticePeriodRecovery==2){
          this.noticeperiodData.noticeperiodRecovery="Gross"
        }
        if(this.noticePeriodBuyOutReimbursement[0].noticePeriodRecovery==3){
          this.noticeperiodData.noticeperiodRecovery="CTC"
        }
      //this.noticeperiodData.noticeperiodRecovery=value.name
        if (this.noticePeriodBuyOutReimbursement[0].candidateNoticePeriodBuyOutDaysId != 0) {
          this.noticePeriodDays = this.noticePeriodBuyOutReimbursement[0].noticePeriodDays;
          this.noticePeriodServeDays = this.noticePeriodBuyOutReimbursement[0].noticePeroiodServed;
          this.noticePeriodRemainingDays =  this.noticePeriodBuyOutReimbursement[0].noticePeroiodServed
          this.settlementAmount = this.noticePeriodBuyOutReimbursement[0].amount;
          this.fullName = this.noticePeriodBuyOutReimbursement[0].fullName;
          
          this.ForPrintRemarks = []; 
          for (var i = 0; i < this.noticePeriodBuyOutReimbursement.length; i++){
            let obj={
              printName: this.noticePeriodBuyOutReimbursement[i].fullName,
              printRemarks: this.noticePeriodBuyOutReimbursement[i].approvalRemarks,
            }
            this.ForPrintRemarks.push(obj);
          } 
        }
        if (this.noticePeriodBuyOutReimbursement[0].approvalStatus == 3 || this.noticePeriodBuyOutReimbursement[0].approvalStatus == 4) {
          this.IsReadOnly = true;
        }
        if(this.noticePeriodBuyOutReimbursement[0].approvalStatus==3){
          jQuery("#radio1").prop("checked", true);
          this.claimStatus = 3;
        }else if(this.noticePeriodBuyOutReimbursement[0].approvalStatus==4){
          jQuery("#radio2").prop("checked", true);
          this.claimStatus = 4;
        }else if(this.noticePeriodBuyOutReimbursement[0].approvalStatus==2){
          jQuery("#radio3").prop("checked", true);
          this.claimStatus = 2;
        }
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
  onChangeRadioValue(val) {
    if (val == "A") {
      this.claimStatus = 3;
    } else if (val == "R") {
      this.claimStatus = 4;
    } else if (val == "S") {
      this.claimStatus = 2;
    }
  }
  onSubmitClaim() {
    var flag = 0;
    var msg = "";
    if (this.claimRemarks == "") {
      flag = 1;
      msg = "Please Enter Remarks";
    }
    else {

    }
    if (flag == 0) {

      let obj = {
        candidateNoticePeriodBuyOutDaysId: this.noticePeriodBuyOutReimbursement[0].candidateNoticePeriodBuyOutDaysId,
        requisitionDetailId: this.noticePeriodBuyOutReimbursement[0].requisitionDetailId,
        candidateId: this.candidateId.toString(),
        approvalStatus: this.claimStatus,
        approvalRemarks: this.claimRemarks,
        CreatedBy: this.loginUserId,
        CandidateName: this.noticePeriodBuyOutReimbursement[0].candidateFullName,
        EmpNo: this.noticePeriodBuyOutReimbursement[0].empNo,
        Passworrd: "welcome@1234",
        ReimbursementName: "Notice Period Buyout",
        //CandidateIdForEmail: this.noticePeriodBuyOutReimbursement[0].candidateId
        EmailId: this.noticePeriodBuyOutReimbursement[0].emailId
      }
      this.SpinnerService.show();
      this.onboardingCordinatorService.saveNoticePeriodBuyoutClaimStatus(obj).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.persistance.set('activeTabName', this.activeTabName);
            this._route.navigate(['/app/oc-noticeperiod-reimburshment-list']);
            this.onBackClick();
          }
        }
        else {
          this.SpinnerService.hide();
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
      }, () => {
        this.SpinnerService.hide();
      });
    }
    else {
      this.notificationService.showError(msg, "Error");
    }
  }

  onClickCancel() {

  }
  onBackClick() {
    jQuery(".custom-menu").hide();
    this.persistance.set('activeTabName', this.activeTabName);
    this._route.navigate(["/app/oc-noticeperiod-reimburshment-list"]);
  }
  onClickDownloadFormView(){
    var htmlstring = document.getElementById("printNoticePeriodBuyOutReimbursementDiv").innerHTML;
    var dom = document.createElement('div');
    dom.innerHTML = htmlstring;
    
    html2pdf(dom, {
      margin: 10,
      filename: this.noticePeriodBuyOutReimbursement[0].empNo + "_Notice_period_Reimbursement.pdf",
      image: { type: 'jpeg', quality: 0.98 },
      //html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      html2canvas: { scale: 3, y: 0, scrollY: 0 },
      //jsPDF: { format: 'A4' },
      //jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      jsPDF: { format: 'A4', orientation: 'portrait' },
    });
  }

  onClickDownloadForm(){
    this.SpinnerService.show();
    this.zipFileName = this.candidateId + "_Document_Details";
    let obj = {
      requisitionDetailId: this.requisitionDetailId,
      CandidateId: this.candidateId.toString(),
    };

    this.onboardingCordinatorService.downloadFileForNoticePeriod(obj).subscribe(
      data => {
        switch (data.type) {
          case HttpEventType.DownloadProgress:
            break;
          case HttpEventType.Response:
            const downloadedFile = new Blob([data.body], { type: data.body.type });
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = this.zipFileName;
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.click();
            document.body.removeChild(a);
            break;
        }
        this.SpinnerService.hide();

      },
      error => {
      }
    );
  }
}
