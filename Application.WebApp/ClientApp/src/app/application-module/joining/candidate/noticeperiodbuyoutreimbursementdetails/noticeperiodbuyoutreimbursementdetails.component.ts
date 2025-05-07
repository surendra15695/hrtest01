import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../interfaces/common/doctor.interface';
import { INoticePeriodBuyouteReimbursement, INoticePeriodBuyouteReimbursementNew, ISearcheNoticePeriodBuyouteReimbursement } from '../../../../interfaces/joining/candidate.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import { IAssessemenrAssignReleaseList, IBatchAssessment, ICandidateAssessmentList, ISearchAssessmentAssignReleaseList } from '../../../../interfaces/joining/programcoordinator.interface';
import { LocationService } from '../../../../services/common/location/location.service';
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
declare var jQuery: any;
import { DomSanitizer } from '@angular/platform-browser'
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-noticeperiodbuyoutreimbursementdetails',
  templateUrl: './noticeperiodbuyoutreimbursementdetails.component.html',
  styleUrls: ['./noticeperiodbuyoutreimbursementdetails.component.css']
})
export class NoticeperiodbuyoutreimbursementdetailsComponent implements OnInit {
  @ViewChild('dateresignation', { static: false }) dateresignation: ElementRef;

  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  candidateId: number;
  prevApprovalStatus: number;
  candidateNoticePeriodBuyOutDaysId: number;
  @ViewChild('billDate', { static: false }) billDate: ElementRef;
  @ViewChild('attachmentFileImport', { static: false }) attachmentFileImport: ElementRef;
  attachmentfileToUpload: File;
  searchNoticPeriodBuyOutReimbursement: ISearcheNoticePeriodBuyouteReimbursement = {
    candidateId: null,
    requisitionDetailId: null,
    candidateNoticePeriodBuyOutDaysId: null,
    empId: null,
  }
  noticeperiodData: any = {};
  noticeperiodDataRecord: any;
  noticePeriodBuyOutReimbursement: any[] = [];
  noticePeriodDays: number;
  noticePeriodServeDays: number;
  noticePeriodRemainingDays: number;
  settlementAmount: number;
  IsReadOnly: boolean;
  approvalStatus: string;
  approvalRemarks: string;
  fullName: string;
  attachment: string;
  approvalForRemarks: string; //arg
  mode: string;
  // For preview file
  selectedPdf1?: Blob;
  pdfURL1: any;
  ForPrintRemarks: any[];
  noticePeriodRecoveryDropDown: any = []
  dateOfResignation: string;
  noticeperiodRecovery: string;
  recoveryAmountperDay: string;
  invalidFileName: boolean = false;
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
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,   // private datePipe: DatePipe,
    private titleService: Title, public activatedRoute: ActivatedRoute,
    private positionService: PositionService,
    private candidateService: CandidateService, private sant: DomSanitizer
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.activatedRoute.queryParams.subscribe((params) => {
      this.candidateId = params['CandidateId'];
      this.candidateNoticePeriodBuyOutDaysId = params['CandidateNoticePeriodBuyOutDaysId'];
      this.approvalRemarks = params['ApprovalRemarks'];
      this.mode = params['Mode'];
    });
    this.searchNoticPeriodBuyOutReimbursement.candidateId = Number(this.candidateId);
    this.searchNoticPeriodBuyOutReimbursement.candidateNoticePeriodBuyOutDaysId = Number(this.candidateNoticePeriodBuyOutDaysId);
    this.candidateNoticePeriodBuyoutReimbursementDetails();
    this.loadnoticePeriodRecoveryDropDown()
  }

  ngOnInit() {
    this.loadDatePicker();
  }
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      container: '.content',
      todayHighlight: true
    });
  }
  loadnoticePeriodRecoveryDropDown() {
    this.noticePeriodRecoveryDropDown = [];
    this.noticePeriodRecoveryDropDown.push({ name: 'Basic', id: 1 }, { name: 'Gross', id: 2 }, { name: 'CTC', id: 3 })
  }
  candidateNoticePeriodBuyoutReimbursementDetails() {
    this.candidateService.getCandidateNoticePeriodBuyoutReimbursementDetails(this.searchNoticPeriodBuyOutReimbursement).subscribe((result) => {
      if (result) {
        this.noticePeriodBuyOutReimbursement = result;

        if (this.noticePeriodBuyOutReimbursement[0].candidateNoticePeriodBuyOutDaysId != 0) {
          this.noticePeriodDays = this.noticePeriodBuyOutReimbursement[0].noticePeriodDays;
          this.noticePeriodServeDays = this.noticePeriodBuyOutReimbursement[0].noticePeroiodServed;
          this.noticePeriodRemainingDays = this.noticePeriodBuyOutReimbursement[0].remainingDays;
          this.settlementAmount = this.noticePeriodBuyOutReimbursement[0].amount;
          this.fullName = this.noticePeriodBuyOutReimbursement[0].fullName;
          this.dateOfResignation = this.noticePeriodBuyOutReimbursement[0].dateOfResigation;
          this.noticeperiodRecovery = this.noticePeriodBuyOutReimbursement[0].noticePeriodRecovery;
          this.recoveryAmountperDay = this.noticePeriodBuyOutReimbursement[0].recoveryAmountPerDay;

          this.ForPrintRemarks = [];
          for (var i = 0; i < this.noticePeriodBuyOutReimbursement.length; i++) {
            let obj = {
              printName: this.noticePeriodBuyOutReimbursement[i].fullName,
              printRemarks: this.noticePeriodBuyOutReimbursement[i].approvalRemarks,
            }
            this.ForPrintRemarks.push(obj);
            // this.fullName = this.noticePeriodBuyOutReimbursement[i].fullName;         
            // this.approvalRemarks = this.noticePeriodBuyOutReimbursement[i].approvalRemarks;
          }
          this.attachment = this.noticePeriodBuyOutReimbursement[0].documentPath;
        }
        this.prevApprovalStatus = this.noticePeriodBuyOutReimbursement[0].approvalStatus;
        if (this.noticePeriodBuyOutReimbursement[0].approvalStatus != 0 && this.noticePeriodBuyOutReimbursement[0].approvalStatus != 2 && this.noticePeriodBuyOutReimbursement[0].approvalStatus != 1 && this.mode == "View") {
          this.IsReadOnly = true;
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
  onAttachmentFileChange(files: FileList) {
    //this.fileUploadArray = [];
    this.invalidFileName = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName = true;
      }
    })
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      return;
    }
    if (this.invalidFileName) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.attachmentFileImport.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("File should be less than 2MB!", "Error");
      this.attachmentFileImport.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    } else {
      this.attachmentFileImport.nativeElement.innerText = files[0].name;
      this.attachmentfileToUpload = files.item(0);
      // Creating Blob URL
      this.selectedPdf1 = files[0];
      this.pdfURL1 = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.selectedPdf1)) as string;
      //
      this.noticePeriodBuyOutReimbursement[0].document = this.pdfURL1;
    }
  }
  onClickSubmit() {
    var flag = 0;
    var msg = "";
    if (this.attachmentfileToUpload == null && this.noticePeriodBuyOutReimbursement[0].document == "") {
      flag = 1;
      msg = "Please Attach a file";
    }
    else {

    }
    if (this.settlementAmount == null) {
      flag = 1;
      msg = "Please Enter Settelement Amount";
    }
    else {

    }
    if (this.noticePeriodRemainingDays == null) {
      flag = 1;
      msg = "Please Enter Notice Period Remaining days";
    }
    else {

    }
    if (this.noticePeriodServeDays == null) {
      flag = 1;
      msg = "Please Enter Notice Period Served Days";
    }
    else {

    }
    if (this.noticePeriodDays == null) {
      flag = 1;
      msg = "Please Enter Notice period days";
    }
    else {

    }
    if (this.approvalForRemarks == null) {
      flag = 1;
      msg = "Please Enter Remarks";
    }
    else {

    }

    if (flag == 0) {
      this.SpinnerService.show();
      this.prevApprovalStatus == 2 ? this.approvalStatus = '5' : this.approvalStatus = '1'
      //this.approvalStatus ='1';
      const formData = new FormData();
      formData.append("CandidateNoticePeriodBuyOutDaysId", this.candidateNoticePeriodBuyOutDaysId.toString());
      formData.append("RequisitionDetailId", this.noticePeriodBuyOutReimbursement[0].requisitionDetailId.toString());
      formData.append("CandidateId", this.candidateId.toString());
      formData.append("NoticePeriodDays", this.noticePeriodDays.toString());
      formData.append("NoticePeroiodServed", this.noticePeriodServeDays.toString());
      formData.append("RemainingDays", this.noticePeriodRemainingDays.toString());
      formData.append("Amount", this.settlementAmount.toString());

      formData.append("Dateresignation", this.dateresignation.nativeElement.value.toString());
      formData.append("NoticeperiodRecovery", this.noticeperiodRecovery.toString());
      formData.append("RecoveryAmountperDay", this.recoveryAmountperDay.toString());
      //formData.append("FullName", this.fullName.toString());
      formData.append("CreatedBy", this.loginUserId.toString());
      if (this.attachmentfileToUpload != undefined) {
        formData.append("Files", this.attachmentfileToUpload);
      }
      else {
        formData.append("Files", this.attachment);
      }
      formData.append("approvalRemarks", this.approvalForRemarks);
      formData.append("approvalStatus", this.approvalStatus);
      this.noticeperiodData.candidateFullName = this.noticePeriodBuyOutReimbursement[0].candidateFullName;
      this.noticeperiodData.empNo = this.noticePeriodBuyOutReimbursement[0].empNo;
      this.noticeperiodData.dateOfJoining = this.noticePeriodBuyOutReimbursement[0].dateofJoining;
      this.noticeperiodData.functionName = this.noticePeriodBuyOutReimbursement[0].functionName;
      this.noticeperiodData.gradeName = this.noticePeriodBuyOutReimbursement[0].gradeName;
      this.noticeperiodData.locationOffice = this.noticePeriodBuyOutReimbursement[0].locationOffice;
      this.noticeperiodData.offerSendDate = this.noticePeriodBuyOutReimbursement[0].offerSendDate;
      this.noticeperiodData.noticePeriodDays = this.noticePeriodDays;
      this.noticeperiodData.noticePeriodServeDays = this.noticePeriodServeDays;
      this.noticeperiodData.noticePeriodRemainingDays = this.noticePeriodRemainingDays;
      this.noticeperiodData.settlementAmount = this.settlementAmount;
      this.noticeperiodData.dateresignation = this.dateresignation.nativeElement.value;
      this.noticeperiodData.recoveryAmountperDay = this.recoveryAmountperDay;
      var value = this.noticePeriodRecoveryDropDown.find(e => e.id == this.noticeperiodRecovery);
      this.noticeperiodData.noticeperiodRecovery = value.name
      setTimeout(() => {
        var htmlstring = document.getElementById("printNoticeForzip").innerHTML;

        formData.append("Htmlstring", htmlstring);

        // if(this.noticePeriodBuyOutReimbursement[0].approvalStatus){
        this.candidateService.saveNoticePeriodBuyoutReimbursement(formData).subscribe((result) => {
          // console.log(result);
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
            this.SpinnerService.hide();
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.attachmentFileImport.nativeElement.innerText = "";
            this.attachmentFileImport.nativeElement.value = "";
            jQuery(".custom-menu").hide();
            this._route.navigate(['/app/career/notice-period-buyout-reimbursement-list']);
          }
        }, error => {
          console.log(error);
          this.SpinnerService.hide();
          this.notificationService.showError("Something went wrong", "Error");
        });
      }, 500);
    } else {
      this.notificationService.showError(msg, "Error");
    }
    //}
  }
  onClickCancel() {
    this.noticePeriodDays;
    this.noticePeriodServeDays;
    this.noticePeriodRemainingDays;
    this.candidateNoticePeriodBuyoutReimbursementDetails();
  }
  onClickBack() {
    jQuery(".custom-menu").hide();
    this._route.navigate(["/app/career/notice-period-buyout-reimbursement-list"]);
  }

}
