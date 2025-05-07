import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../interfaces/common/position.interface';
import { IDoctorVerificationCandidateList, IDoctorVerificationReportDetails, ISearchDoctorVerificationReportDetails } from '../../../../interfaces/prejoining/doctorverification.interface';
import { LocationService } from '../../../../services/common/location/location.service';
import { CommonService } from '../../../../services/common/common/common.service';
import { FunctionService } from '../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../services/common/department/department.service';
import { PositionService } from '../../../../services/common/position/position.service';
import { DoctorService } from '../../../../services/prejoining/doctor/doctor.service';
import { ShareddataService } from '../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { RequisitionService } from '../../../../services/preselection/requisition/requisition.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { IApproverVertical, IApproverFunction, IApproverDepartment, IApproverVerticalFunctionDepartment, IApproverFunctionDepartment } from '../../../../interfaces/common/common.interface';
import { IcandidateremarksList } from 'src/app/interfaces/preselection/candidate.interface';
declare var jQuery: any;


@Component({
  selector: 'app-verifycandidate',
  templateUrl: './verifycandidate.component.html',
  styleUrls: ['./verifycandidate.component.css']
})
export class VerifycandidateComponent implements OnInit {
  
  remarksDetails:IcandidateremarksList={
    CandidateId: 0,
    RequisitionDetailId: 0,
    HiringStatusId: 0,
    IsActive: false
  }
  candidateremarksList: any[]=[];
  searchformPending: FormGroup;
  verifyCandidateForm: FormGroup;
  candidateId: any;
  requestNo: any;
  loginUserId: number;
  doctorVerificationCandidiateList: IDoctorVerificationCandidateList[] = [];
  doctorId: number;
  candidateDetails: any;
  medicalDocRecord: any;
  medicalDocData: any = {}
  searchDoctorVerificationReportDetails: ISearchDoctorVerificationReportDetails = {
    medicalDocumentCollectionId: null,
    requisitionDetailId: null,
    candidateId: null,
    isActive: true
  }
  doctorIdForPdf: any;
  doctorNameForPdf: any;
  DoctorReportHtmlstring: string;
  doctorVerificationReportDetails: IDoctorVerificationReportDetails;
  mode: string = "";
  canEdit: boolean;
  candidateNo: string;
  
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private functionService: FunctionService,
    private commonService: CommonService,
    private requisitionService: RequisitionService,
    private doctorService: DoctorService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService, public activatedRoute: ActivatedRoute,
    private SpinnerService: NgxSpinnerService,
    private titleService: Title
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.doctorId = this.persistance.get('loggedinuser').mapId;
    this.doctorIdForPdf = this.persistance.get('loggedinuser').userId;
    this.doctorNameForPdf = this.persistance.get('loggedinuser').userName;
    this.activatedRoute.queryParams.subscribe((params) => {
      this.candidateId = params['CandidateId'];
      this.candidateNo = params['CandidateNo'];
      this.requestNo = params['RequestNo'];
      this.mode = params['Mode'];
    });
    if (this.candidateId != undefined) {
      this.searchDoctorVerificationReportDetails.candidateId = Number(this.candidateId);
    }
    if (this.mode == "View") {
      this.canEdit = false;
    } else {
      this.canEdit = true;
    }
    this.createVerifyCandidateForm();
    this.getDoctorVerificationReportDetails();
   // alert(this.candidateNo)
  }

  ngOnInit() {
    this.getRemarksDetails();
  }
  createVerifyCandidateForm() {
    this.verifyCandidateForm = this.fb.group({
      medicalDocumentDoctorApprovalId: null,
      medicalallyFit: null,
      medicalallyFitRemarks: "",
      createdBy: this.loginUserId,
      previousString: "",
      docApprovedString: ""
    });
  }
  getDoctorVerificationReportDetails() {
    this.doctorService.getDoctorVerificationReportDetailsForCandidate(this.searchDoctorVerificationReportDetails).subscribe((result) => {
      if (result) {
        this.doctorVerificationReportDetails = result;
        //  console.log("Verification Data", this.doctorVerificationReportDetails);
        this.SpinnerService.hide();
        if (this.doctorVerificationReportDetails != null) {
          this.verifyCandidateForm.patchValue({
            medicalDocumentDoctorApprovalId: this.doctorVerificationReportDetails.medicalDocumentDoctorApprovalId
          })
        }
        if (this.doctorVerificationReportDetails != null && !this.canEdit) {
          this.verifyCandidateForm.patchValue({
            // medicalallyFit: this.doctorVerificationReportDetails.medicallyFit,
            medicalallyFitRemarks: this.doctorVerificationReportDetails.approvalRemarks
          })
          if (this.doctorVerificationReportDetails.medicallyFit) {
            jQuery("#radio1").prop("checked", true);
          } else {
            jQuery("#radio2").prop("checked", true);
          }
        }
      }
      else {
        // this.doctorVerificationReportDetails = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  onChangeMedicallyFit(val) {
    if (val == "Y") {
      this.verifyCandidateForm.patchValue({
        medicalallyFit: true
      })
    } else {
      this.verifyCandidateForm.patchValue({
        medicalallyFit: false
      })
    }
  }
  onVerifyReport() {
    var flag = 0;
    var msg = "";
    if (this.verifyCandidateForm.value.medicalallyFit == false) {
      if (this.verifyCandidateForm.value.medicalallyFitRemarks == "") {
        flag = 1;
        msg = "Please Enter Remarks";
      }
      else {
      }
    }
    if (this.verifyCandidateForm.value.medicalallyFit == null) {
      flag = 1;
      msg = "Please Choose Medically Fit";
    }
    else {

    }
    if (flag == 0) {
      this.SpinnerService.show();
      this.processMedicalDataForPDF();
    } else {
      this.notificationService.showError(msg, "Error");
    }

  }
  onCancel() {
    this.verifyCandidateForm.patchValue({
      medicalallyFit: null,
      medicalallyFitRemarks: ""
    });
    jQuery("#radio1").prop('checked', false);
    jQuery("#radio2").prop('checked', false);
  }
  getRemarksDetails(){   
    this.remarksDetails={
      CandidateId: this.candidateId,
      RequisitionDetailId: 0,
      HiringStatusId: 0,
      IsActive: false
    }
    this.requisitionService.getCandidateHigringAction(this.remarksDetails).subscribe((result) => {
      if (result) {
        this.candidateremarksList = result;
        console.log("Remarks Details-",result);
      }
      else {
        this.candidateremarksList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  processMedicalDataForPDF() {
    this.medicalDocData.candiadteId = this.candidateNo;
    this.medicalDocData.candidatename = this.doctorVerificationReportDetails.name;
    this.verifyCandidateForm.value.medicalallyFit == true ? this.medicalDocData.isFit = "Fit for work" : this.medicalDocData.isFit = "Not fit for work";
    this.medicalDocData.remarks = this.verifyCandidateForm.value.medicalallyFitRemarks;
    this.medicalDocData.doctorIdForPdf = this.doctorIdForPdf;
    this.medicalDocData.doctorNameForPdf = this.doctorNameForPdf;
    this.medicalDocData.datetime = new Date().toLocaleString();
    setTimeout(() => {
      this.DoctorReportHtmlstring = document.getElementById("printMedicalDocDiv").innerHTML;
      this.finalSubmit();
    }, 10)
  }
  finalSubmit() {
    this.verifyCandidateForm.patchValue({
      docApprovedString: this.DoctorReportHtmlstring,
      previousString: this.doctorVerificationReportDetails.document
    })
    //  console.log("Verify data", this.verifyCandidateForm.value);
    this.doctorService.verifyMedicalReport(this.verifyCandidateForm.value).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.createVerifyCandidateForm();
          jQuery("#radio1").prop('checked', false);
          jQuery("#radio2").prop('checked', false);
          this._route.navigate(['/app/doctor/candidatelist'])
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
