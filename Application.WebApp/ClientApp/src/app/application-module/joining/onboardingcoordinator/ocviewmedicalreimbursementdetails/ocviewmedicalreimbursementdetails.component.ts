import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../interfaces/common/doctor.interface';
import { ICandidateAssessmentData, ICandidateAssessmentDetails, ICandidateMedicalReimbursement, ICandidateMedicalReimbursementDetails, IEmployeeReimbursementDetails, ISearchCandidateAssessment, ISearchCandidateMedicalReimbursement } from '../../../../interfaces/joining/candidate.interface';
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
  selector: 'app-ocviewmedicalreimbursementdetails',
  templateUrl: './ocviewmedicalreimbursementdetails.component.html',
  styleUrls: ['./ocviewmedicalreimbursementdetails.component.css']
})
export class OcviewmedicalreimbursementdetailsComponent implements OnInit {
  zipFileName:string;
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  candidateId: number;
  candidateMedicalReimbursementId: number;
  searchCandidateMedicalReimbursement: ISearchCandidateMedicalReimbursement = {
    candidateMedicalReimbursementId: null,
    requisitionDetailId: null,
    candidateId: null,
    empId: null,
  }
  medicalReimbursementDetails: ICandidateMedicalReimbursementDetails;
  candidateMedicalReimbursementDeatils: IEmployeeReimbursementDetails[] = [];
  //candidateRemarksDetails: ICandidateRemarksDetails[] = [];
  billDetailsArray: any[] = [];
  BillDetails: string = "";
  totalAmount: number = 0;
  IsReadOnly: boolean;
  claimRemarks: string = "";
  claimStatus: number = 3;
  uploadedFileArray: any[] = [];
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
      this.candidateMedicalReimbursementId = params['CandidateMedicalReimbursementId'];
    });
    this.searchCandidateMedicalReimbursement.candidateId = Number(this.candidateId);
    this.searchCandidateMedicalReimbursement.candidateMedicalReimbursementId = Number(this.candidateMedicalReimbursementId);
    // this.searchCandidateMedicalReimbursement.requisitionDetailId = this.requisitionDetailId;
    this.searchCandidateMedicalReimbursement.requisitionDetailId = null;
    this.getCandidateMedicalReimbursementDetails();
  }

  ngOnInit() {
    this.loadDatePicker();
  }
  loadDatePicker() {
    var dothis = this;
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    }).on("change", function (e) {
      var selecteddate = e.target.value;
      var datepickerid = jQuery(e.target).attr("id");
      var rowid = parseInt(datepickerid.replace("datepicker", ""));
    });;
  }

  getCandidateMedicalReimbursementDetails() {
    this.candidateService.getCandidateMedicalReimbursementDetailsApprove(this.searchCandidateMedicalReimbursement).subscribe((result) => {
      if (result) {
        this.medicalReimbursementDetails = result;
        this.DocumentPathForPDF = result.documentPathForPDF;
        //console.log("aaaaabbb", result)
        //this.BillDetails = this.medicalReimbursementDetails.billDetails;              // Commented as multiple file to be upload 11/03/2022
        // this.candidateName = this.medicalReimbursementDetails.candidateFullName;
        // this.joiningDate = this.medicalReimbursementDetails.dateofJoining;
        if (this.medicalReimbursementDetails.employeeReimbursementDetailsMedical.length > 0) {
          this.billDetailsArray = this.medicalReimbursementDetails.employeeReimbursementDetailsMedical; //Argg
          this.calculateTotalAmount();
        }

        this.ForPrintRemarks = [];
        if(this.medicalReimbursementDetails.employeeMedicalReimbursementMedicalApproval.length >0){
          for (var val of this.medicalReimbursementDetails.employeeMedicalReimbursementMedicalApproval){
            let obj={
              printName:val.remarksBy,
              printRemarks:val.approvalRemarksapprove
            }
            this.ForPrintRemarks.push(obj);
          }
        }
        // this.ForPrintRemarks = [];
        // if (this.medicalReimbursementDetails.employeeReimbursementDetailsMedical.length > 0) {        //Argg
        //   for (var i = 0; i < this.medicalReimbursementDetails.employeeReimbursementDetailsMedical.length; i++) { //Argg
        //     let obj = {
        //       printName: this.medicalReimbursementDetails.employeeReimbursementDetailsMedical[i].remarksby, //Argg
        //       printRemarks: this.medicalReimbursementDetails.employeeReimbursementDetailsMedical[i].approvalRemarks, //Argg
        //     }
        //     this.ForPrintRemarks.push(obj);

        //   }
        // }
        // this.testLocation=this.medicalReimbursementDetails.location;
        // this.billTotalAmount=this.medicalReimbursementDetails.totalAmount;
        if (this.medicalReimbursementDetails.approvalStatus == 3 || this.medicalReimbursementDetails.approvalStatus == 4) {
          this.IsReadOnly = true;
        }
        if (this.medicalReimbursementDetails.approvalStatus == 3) {
          jQuery("#radio1").prop("checked", true);
        } else if (this.medicalReimbursementDetails.approvalStatus == 4) {
          jQuery("#radio2").prop("checked", true);
        } else if (this.medicalReimbursementDetails.approvalStatus == 2) {
          jQuery("#radio3").prop("checked", true)
        }
        if (this.medicalReimbursementDetails.billDetails != "") {
          this.uploadedFileArray = [];
          var filePathList = this.medicalReimbursementDetails.billDetails.split(",");
          filePathList.forEach(element => {
            var docPath = element.split("/");
            var lastElement = docPath[docPath.length - 1];
            var fullFileName = lastElement.split("_");
            fullFileName.shift();
            var fileName = fullFileName.join("_");
            // console.log("File Name", fileName);
            var i = this.uploadedFileArray.length + 1;
            this.uploadedFileArray.push({
              FileName: fileName,
              FilePath: element,
              PdfUrl: "",
              index: i,
              file: ""
            });

          })
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
      setTimeout(() => {
        this.loadDatePicker();
      }, 1000);
      this.SpinnerService.hide();
    });
  }
  calculateTotalAmount() {
    this.totalAmount = 0;
    this.billDetailsArray.forEach(element => {
      this.totalAmount += element.amount;
    })
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
  onClickBack() {
      this.persistance.set('activeTabName', this.activeTabName);
      this._route.navigate(['/app/oc-medical-reimbursement-list']);
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
        candidateMedicalReimbursementId: this.medicalReimbursementDetails.candidateMedicalReimbursementId.toString(),
        requisitionDetailId: this.medicalReimbursementDetails.requisitionDetailId.toString(),
        candidateId: "",
        approvalStatus: this.claimStatus,
        approvalRemarks: this.claimRemarks,
        createdBy: this.loginUserId
      }
      this.SpinnerService.show();
      this.onboardingCordinatorService.saveMedicalClaimStatus(obj).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.persistance.set('activeTabName', this.activeTabName);
            this._route.navigate(['/app/oc-medical-reimbursement-list']);
            this.onClickBack();
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
  onClickDownloadFormView() {
    var htmlstring = document.getElementById("printMedicalReimbursement").innerHTML;
    var dom = document.createElement('div');
    dom.innerHTML = htmlstring;
    html2pdf(dom, {
      margin: 10,
      filename: this.medicalReimbursementDetails.empNo + "_Medical_Reimbursement.pdf",
      image: { type: 'jpeg', quality: 0.98 },
      //html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      html2canvas: { scale: 3, y: 0, scrollY: 0 },
      //jsPDF: { format: 'A4' },
      //jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      jsPDF: { format: 'A4', orientation: 'portrait' },
    });
  }
  onClickDownloadForm() {
    this.SpinnerService.show();
    this.zipFileName = this.candidateId + "_Document_Details";
    let obj = {
      requisitionDetailId: this.requisitionDetailId,
      CandidateId: this.candidateId.toString(),
    };

    this.onboardingCordinatorService.downloadFileForPreEmployeeMedical(obj).subscribe(
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

  openFile(blobName: string): void {
    let regex = /\.net(.*)/;
    let match = blobName.match(regex);
    let extractedString = match ? match[1] : '';
    let filename = extractedString.split('/')[2];
    let containername = extractedString.split('/')[1];
    this.locationService.getTestfile(filename,containername).subscribe(response => {
      let blob:Blob=response.body as  Blob;
      const url = window.URL.createObjectURL(blob);

      // Open the file in a new tab
      window.open(url);
    }, error => {
      console.error('Failed to download file:', error);
    });
  }

}
