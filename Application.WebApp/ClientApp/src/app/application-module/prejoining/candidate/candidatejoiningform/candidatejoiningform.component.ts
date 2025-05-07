import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { ICandidateWelcomeAcknowledgement } from '../../../../interfaces/prejoining/candidate.interface';
import { IViewCandidateList } from '../../../../interfaces/prejoining/onboardingcoordinator.interface';
import { LocationService } from '../../../../services/common/location/location.service';
import { CommonService } from '../../../../services/common/common/common.service';
import { FunctionService } from '../../../../services/common/function/function.service';
import { PositionService } from '../../../../services/common/position/position.service';
import { ShareddataService } from '../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { CorporateallocationService } from '../../../../services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { CandidateService } from '../../../../services/prejoining/candidate/candidate.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { IBatch, ISearchBatch } from '../../../../interfaces/common/common.interface';
import { element } from 'protractor';
import { ICandidateJoingFormFamily, ICandidateJoingFormImidiateRelatives, ICandidateJoiningFormApprovalStatus, ICandidateJoiningFormDetails, ICandidateJoiningFormDetailsNew, ISearchCandidateJoiningFormDetails } from 'src/app/interfaces/joining/candidate.interface';
import { IBloodGroup, ISearchBloodGroup } from 'src/app/interfaces/common/bloodgroup.interface';
import { DatePipe } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { RecruitmentmanagerService } from 'src/app/services/prejoining/recruitmentmanager/recruitmentmanager.service';
declare var jQuery: any;
declare var html2pdf: any;
// Added by anif on 16-11-2022 for pdf generation and upload into storage thriugh API
import {
  CandidateJoiningFormRelativeDetailData, IAccidentInsurancePolicyPDF, ICandidateJoiningFormDetailsForPDF, ICandidateJoiningFormFamilyDetailData, IJoiningFormFamilyDetailsPDF, IJoiningReportPDFForUpload,
  ISEBIDisclosurePDFForUpload, IJoiningFormFamilyDetailsPDFForUpload, IAccidentInsurancePolicyPDFForUpload
} from '../../../../interfaces/preselection/candidate.interface';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-candidatejoiningform',
  templateUrl: './candidatejoiningform.component.html',
  styleUrls: ['./candidatejoiningform.component.css'],
  providers: [DatePipe]
})
export class CandidatejoiningformComponent implements OnInit {
  //saveWelcomeAcknowledgementForm: FormGroup;
  @ViewChild('dob', { static: false }) dob: ElementRef;
  @ViewChild('fdDate', { static: false }) fdDate: ElementRef;
  @ViewChild('joiningLetterDate', { static: false }) joiningLetterDate: ElementRef;
  // @ViewChild('familydetailsDate', { static: false }) familyDate: ElementRef;
  @ViewChild('JoiningDate', { static: false }) JoiningDate: ElementRef;
  @ViewChild('familyDOB', { static: false }) familyDOB: ElementRef;
  @ViewChild('SignatureDate', { static: false }) SignatureDate: ElementRef;
  @ViewChild('attachmentFileImport', { static: false }) attachmentFileImport: ElementRef;
  loginUserId: number;
  signature: any;
  verticalIds: string;
  requisitionDetailId: number;
  candidateId: number;
  showFamilyDetailsSection: boolean = true;
  showInsurancePolicySection: boolean;
  showSEBIInitialDisclosure: boolean;
  showJoiningReport: boolean;
  Name: string = "";
  objCandidateJoiningForm: CandidateJoiningForm;
  remarksForCandidate: any;
  isRemarksForCandidate: boolean = false;
  // bloodGroupList: any[] = [];
  familyMembersDetailsArray: any[] = [];
  familyMembersDetailsArrayNew: any[] = [];          // 25-08-2022
  objFamilyMembersdetails: FamilyMembersdetails;
  relationshipList: any[] = [];
  objImmediateRelativeDetails: ImmediateRelativeDetails;
  immediateRelativesArray: any[] = [];
  attachmentfileToUpload: File;
  bloodGroups: IBloodGroup[] = [];
  searchBloodGroud: ISearchBloodGroup = {
    bloodGroupId: 0,
    isActive: true
  }
  familyDetailspdf: File;
  accidentPolicyPdf: File;
  sebiDisclousePdf: File;
  joiningReportPdf: File;
  searchCandidateJoiningFormDetails: ISearchCandidateJoiningFormDetails = {
    candidateJoiningFormId: null,
    candidateId: null,
  }
  familyrelationshipList: any[] = [];
  candidateJoiningFormDetailsList: ICandidateJoiningFormDetailsNew;
  candidateJoiningFamilyDetails: ICandidateJoingFormFamily[];
  candidateJoiningImmediateRelatives: ICandidateJoingFormImidiateRelatives[];
  candidateJoiningFormApprovalStatus: any[];
  currentLetterDate = new Date();
  fieldReadOnly: boolean;
  todayDate: string;
  disableOnEditFamilyDetailsForm: boolean = true;
  disableOnEditAccidentInsurancePolicyForm: boolean = true;
  disableOnEditSebiDisclosureForm: boolean = true;
  disableOnEditJoiningReportForm: boolean = true;
  FamilyDetailsFormRemarks: any = [];
  AccidentInsurancePolicyFormRemarks: any = [];
  JoiningReportFormRemarks: any = [];
  SebiDisclosureFormRemarks: any = [];
  currentYear: number;
  currentMonth: number;
  isFamilyRemarksForCandidate: boolean = false;
  isAccidentRemarksForCandidate: boolean = false;
  isSebiRemarksForCandidate: boolean = false;
  isJoiningRemarksForCandidate: boolean = false;
  remarksForFamilyCandidate: string = "";
  remarksForAccidentCandidate: string = "";
  remarksForSebiCandidate: string = "";
  remarksForJoiningCandidate: string = "";
  // Added by anif on 16-11-2022 for pdf generation and upload into storage thriugh API

  familyDetailsData: any;
  familyDetailsRecord: IJoiningFormFamilyDetailsPDFForUpload = {
    candidateName: "",
    dob: "",
    bloodGroup: "",
    residentialAddress: "",
    residentialPIN: "",
    permanentAdress: "",
    permanentPIN: "",
    email: "",
    mobile: "",
    signatureDate: "",
    documentPath: "",
    familyMemberList: []
  };

  joiningReportData: any;
  joiningReportRecord: IJoiningReportPDFForUpload = {
    candidateName: "",
    employeeNo: "",
    grade: "",
    location: "",
    department: "",
    probation: "",
    date: "",
    joiningDate: "",
    designation: "",
    documentPath: "",
  }
  accidentInsurancePolicyData: any;
  accidentInsurancePolicyRecord: IAccidentInsurancePolicyPDFForUpload = {
    accidentPolicyRelationShipName: "",
    accidentPolicyNomineeName: "",
    accidentPolicyNomineeAddress: "",
    accidentPolicyHolderName: "",
    documentPath: ""
  }
  saveForm = new FormGroup({
    Name: new FormControl('')
  });
  UploadPDFList: any
  SEBIDisclosureData: any;
  SEBIDisclosureRecord: ISEBIDisclosurePDFForUpload = {
    designatedPersonName: "",
    designatedPersonEmployeeNo: "",
    designatedPersonDepartment: "",
    designatedPersonDesignation: "",
    designatedPersonPAN: "",
    designatedPersonMobile: "",
    designatedPersonInstitute: "",
    designatedPersonPastEmployer: "",
    designatedPersonNoOfSecurityHeld: "",
    currentDate: "",
    financialRelationshipName: "",
    financialRelationshipPAN: "",
    financialRelationshipMobileNo: "",
    signatureDate: "",
    signaturePlace: "",
    documentPath: "",
    immediateRelatives: []
  }
  isSignatureButtonClicked: boolean = false;
  searchJoiningForm = {
    candidateJoiningFormId: null,
    candidateId: null
  }
  showReleationShipName: boolean = false;
  candidateJoiningFormPDFAllDetails: ICandidateJoiningFormDetailsForPDF = {
    candidateJoiningFormId: null,
    candidateId: null,
    requisitionDetailId: null,
    fullName: "",
    dob: "",
    bloodGroupName: "",
    residentialAddress: "",
    residentialPin: "",
    permanentAddress: "",
    permanentPin: "",
    emailId: "",
    phoneNo: "",
    date: "",
    employeeNo: "",
    joiningLetterDate: "",
    joiningDate: "",
    signatureDate: "",
    signaturePlace: "",
    signature: "",
    grade: "",
    position: "",
    location: "",
    designation: "",
    designatedPersonName: "",
    designatedPersonDesignation: "",
    designatedPersonEmployeeNo: "",
    designatedPersonDepartment: "",
    designatedPersonPAN: "",
    designatedPersonMobileNo: "",
    designatedPersonInstitute: "",
    designatedPersonPastEmployer: "",
    designatedPersonNoofSecurity: "",
    financialRelationshipName: "",
    financialRelationshipPAN: "",
    financialRelationshipMobileNo: "",
    accidentalPolicyNominee: "",
    accidentalPolicyRelationShipName: "",
    accidentalPolicyNomineeAddress: "",
    accidentalPolicyHolderName: "",
    familyDetail: [],
    immediateRelativeDetail: []
  };

  familyDetailsHtmlstring: string = "";
  accidentPolicyHtmlstring: string = "";
  sebiHtmlstring: string = "";
  joiningReportHtmlstring: string = "";
  serachRelationShip = {
    RelationshipName: "",
    RelationshipId: null,
    IsActive: true,
    CreatedBy: null
  }
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
    private SpinnerService: NgxSpinnerService,
    private titleService: Title, public activatedRoute: ActivatedRoute,
    private positionService: PositionService,
    private candidateService: CandidateService,
    private datePipe: DatePipe,
    private recruiteService: RecruitmentmanagerService
  ) {
    this.objCandidateJoiningForm = new CandidateJoiningForm();
    this.objFamilyMembersdetails = new FamilyMembersdetails();
    this.objImmediateRelativeDetails = new ImmediateRelativeDetails();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.candidateId = this.persistance.get('loggedinuser').candidateId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.searchCandidateJoiningFormDetails.candidateId = Number(this.candidateId);
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth();
    //this.todayDate = this.datePipe.transform(this.currentLetterDate, "dd/MM/yyyy");
    this.currentMonth == 3 ? this.todayDate = "01/04/" + this.currentYear.toString() : this.todayDate = "01/04/" + (this.currentYear - 1).toString()
    this.isRemarksForCandidate = false;
    this.isFamilyRemarksForCandidate = false;
    this.isAccidentRemarksForCandidate = false;
    this.isSebiRemarksForCandidate = false;
    this.isJoiningRemarksForCandidate = false;
    this.getRelationShip();
    this.getFamilyRelationShip();
    this.getAllBloodGroup();
    this.candidateJoiningFormDetails();
    this.getAllJoiningFormDetailsForPDF();   // Added By Anif on 16-11-2022
    //this.getAllAttachmentPDF()
    this.isSignatureButtonClicked = false;
  }

  ngOnInit() {
    this.loadDatePicker();
    this.getUploadedSignature()
  }
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      container: '.content',
      todayHighlight: true
    });
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getRelationShip() {
    this.SpinnerService.show();
    var search = {
      IsActive: true
    }
    this.recruiteService.GetJoiningRelationShip(search).subscribe((response: any) => {
      if (response) {
        this.relationshipList = response;

      }
      else {
        this.relationshipList = [];
      }
    }, error => {
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    })

  }

  getFamilyRelationShip() {

    this.commonService.getAllFamilyRelationship(this.serachRelationShip).subscribe((response: any) => {
      if (response) {
        this.familyrelationshipList = response;
      }
      else {
        this.familyrelationshipList = [];
      }
    }, error => {
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    })

  }
  getAllBloodGroup() {
    this.bloodGroups = [];
    this.commonService.getAllBloodGroup(this.searchBloodGroud).subscribe((result) => {
      if (result) {
        this.bloodGroups = result;
        this.bloodGroups.splice(0, 0, {
          bloodGroupId: 0,
          bloodGroupName: "Select",
          isActive: true
        })

      }
      else {
        this.bloodGroups = [];
        this.bloodGroups.splice(0, 0, {
          bloodGroupId: 0,
          bloodGroupName: "Select",
          isActive: true
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  nextShowPersonalAccidentInsurancePolicy() {
    var flag = 0;
    var msg = "";
    if (this.objCandidateJoiningForm.date == null || this.objCandidateJoiningForm.date == "") {
      flag = 1;
      msg = "Please Select Date";
    }
    else {

    }
    if (this.familyMembersDetailsArray.length > 0) {
      var obj = this.familyMembersDetailsArray.find(e => e.isReadOnly == true);
      if (obj == null) {
        flag = 1;
        msg = "Please Add Atleast on family member";
      }
    }
    else {

    }
    if (this.objCandidateJoiningForm.phoneNo == null || this.objCandidateJoiningForm.phoneNo == "") {
      flag = 1;
      msg = "Please Enter Phone No";
    }
    else {

    }
    if (this.objCandidateJoiningForm.emailId == null || this.objCandidateJoiningForm.emailId == "") {
      flag = 1;
      msg = "Please Enter Email";
    }
    else {

    }
    if (this.objCandidateJoiningForm.permanentPin == null || this.objCandidateJoiningForm.permanentPin == "") {
      flag = 1;
      msg = "Please Enter Permanent Pincode";
    }
    else {

    }
    if (this.objCandidateJoiningForm.permanentAddress == null || this.objCandidateJoiningForm.permanentAddress == "") {
      flag = 1;
      msg = "Please Enter Permanent Address";
    }
    else {

    }
    if (this.objCandidateJoiningForm.residentialPin == null || this.objCandidateJoiningForm.residentialPin == "") {
      flag = 1;
      msg = "Please Enter Residential pincode";
    }
    else {

    }
    if (this.objCandidateJoiningForm.residentialAddress == null || this.objCandidateJoiningForm.residentialAddress == "") {
      flag = 1;
      msg = "Please Enter Residential Address";
    }
    else {

    }
    if (this.objCandidateJoiningForm.bloodGroupId == null || this.objCandidateJoiningForm.bloodGroupId == 0) {
      flag = 1;
      msg = "Please Select Blood Group";
    }
    else {

    }
    if (this.dob.nativeElement.value == "") {
      flag = 1;
      msg = "Please Enter DOB";
    }
    else {

    }
    if (this.objCandidateJoiningForm.fullName == null || this.objCandidateJoiningForm.fullName == "") {
      flag = 1;
      msg = "Please Enter Name";
    }
    else {

    }
    if (this.isFamilyRemarksForCandidate == true && this.remarksForFamilyCandidate == "") {
      flag = 1;
      msg = "Please Enter Remarks";
    }
    if (flag == 0) {
      this.showFamilyDetailsSection = false;
      this.showInsurancePolicySection = true;
      this.showSEBIInitialDisclosure = false;
      this.showJoiningReport = false;
    }
    else {
      this.notificationService.showError(msg, "Error");
    }

  }
  nextShowSEBIInitialDisclosureSection() {
    var flag = 0;
    var msg = "";
    if (this.objCandidateJoiningForm.acidentalPolicyName == "" || this.objCandidateJoiningForm.acidentalPolicyName == null) {
      flag = 1;
      msg = "Please Enter Name";
    }
    else {

    }
    if (this.objCandidateJoiningForm.acidentalPolicyNomineeAddress == "" || this.objCandidateJoiningForm.acidentalPolicyNomineeAddress == null) {
      flag = 1;
      msg = "Please Enter Full Address";
    }
    else {

    }
    if (this.objCandidateJoiningForm.acidentalPolicyNomineeRelationShip == 0 || this.objCandidateJoiningForm.acidentalPolicyNomineeRelationShip == null) {
      flag = 1;
      msg = "Please Select Select Relationship";
    }
    else {

    }
    if (this.objCandidateJoiningForm.acidentalPolicyNominee == "" || this.objCandidateJoiningForm.acidentalPolicyNominee == null) {
      flag = 1;
      msg = "Please Enter Nominee Name";
    }
    else {

    }
    if (this.isAccidentRemarksForCandidate == true && this.remarksForAccidentCandidate == "") {
      flag = 1;
      msg = "Please Enter Remarks";
    }
    if (flag == 0) {
      // alert(this.objCandidateJoiningForm.sebiApplicable);
      if (this.objCandidateJoiningForm.sebiApplicable) {
        this.showFamilyDetailsSection = false;
        this.showInsurancePolicySection = false;
        this.showSEBIInitialDisclosure = true;
        this.showJoiningReport = false;
      } else {
        this.showFamilyDetailsSection = false;
        this.showInsurancePolicySection = false;
        this.showSEBIInitialDisclosure = false;
        this.showJoiningReport = true;
      }


    }
    else {
      this.notificationService.showError(msg, "Error");
    }
  }
  prevShowFamilydetailsSection() {
    this.showFamilyDetailsSection = true;
    this.showInsurancePolicySection = false;
    this.showSEBIInitialDisclosure = false;
    this.showJoiningReport = false;

  }
  nextShowJoiningReportSection() {
    var flag = 0;
    var msg = "";
    if (this.objCandidateJoiningForm.sebiNoofSecurity == null) {
      flag = 1;
      msg = "Please Enter No of Securities held";
    }
    else {

    }
    if (this.objCandidateJoiningForm.sebiPastEmployer == "" || this.objCandidateJoiningForm.sebiPastEmployer == null) {
      flag = 1;
      msg = "Please Enter Past Employer";
    }
    else {

    }
    if (this.objCandidateJoiningForm.sebiInsTitute == "" || this.objCandidateJoiningForm.sebiInsTitute == null) {
      flag = 1;
      msg = "Please Enter Educational Institution Name";
    }
    else {

    }
    if (this.objCandidateJoiningForm.sebiMobileNo == "" || this.objCandidateJoiningForm.sebiMobileNo == null) {
      flag = 1;
      msg = "Please Enter Mobile No";
    }
    else {

    }
    if (this.objCandidateJoiningForm.sebiPanNo == "" || this.objCandidateJoiningForm.sebiPanNo == null) {
      flag = 1;
      msg = "Please Enter PAN No";
    }
    else {

    }
    if (this.objCandidateJoiningForm.sebiName == "" || this.objCandidateJoiningForm.sebiName == null) {
      flag = 1;
      msg = "Please Enter Name";
    }
    else {

    }
    if (this.isSebiRemarksForCandidate == true && this.remarksForSebiCandidate == "") {
      flag = 1;
      msg = "Please Enter Remarks";
    }
    if (flag == 0) {
      this.showFamilyDetailsSection = false;
      this.showInsurancePolicySection = false;
      this.showSEBIInitialDisclosure = false;
      this.showJoiningReport = true;
    }
    else {
      this.notificationService.showError(msg, "Error");
    }
  }
  prevShowPersonalAccidentPolicy() {
    this.showFamilyDetailsSection = false;
    this.showInsurancePolicySection = true;
    this.showSEBIInitialDisclosure = false;
    this.showJoiningReport = false;
  }
  prevShowSEIBInitialDisclosure() {
    if (this.objCandidateJoiningForm.sebiApplicable) {
      this.showFamilyDetailsSection = false;
      this.showInsurancePolicySection = false;
      this.showSEBIInitialDisclosure = true;
      this.showJoiningReport = false;
    } else {
      this.showFamilyDetailsSection = false;
      this.showInsurancePolicySection = true;
      this.showSEBIInitialDisclosure = false;
      this.showJoiningReport = false;
    }

  }
  onChangeRelationShip(familyDetails) {
    var relationShipName = this.relationshipList.find(e => e.relationshipId == familyDetails.familyRelationShip).relationshipName;
    familyDetails.familyRelationShipName = relationShipName;
  }
  onAddFamilyMembers(index, data) {
    var flag = 0;
    var msg = "";

    if (data.familyDOB == "") {
      flag = 1;
      msg = "Please Select DOB";
    }
    else {

    }
    if (data.familyRelationShip == null) {
      flag = 1;
      msg = "Please Select Relation";
    }
    else {

    }
    if (data.familyName == "") {
      flag = 1;
      msg = "Please Enter Name";
    }

    if (flag == 0) {
      // Previous
      // data.isReadOnly = true;
      // data.familyDOB = this.familyDOB.nativeElement.value;
      // this.objFamilyMembersdetails = new FamilyMembersdetails();
      // this.familyMembersDetailsArray.unshift(this.objFamilyMembersdetails);
      //this.familyMembersDetailsArray.push(this.objFamilyMembersdetails);

      // 25-08-2022
      data.isReadOnly = true;
      data.familyDOB = this.familyDOB.nativeElement.value;
      // this.objFamilyMembersdetails = new FamilyMembersdetails();
      this.familyMembersDetailsArray.push(this.objFamilyMembersdetails);
      this.familyMembersDetailsArrayNew = [];
      this.objFamilyMembersdetails = new FamilyMembersdetails();
      this.familyMembersDetailsArrayNew.push(this.objFamilyMembersdetails);
    } else {
      this.notificationService.showError(msg, "Error");
    }
    setTimeout(() => {
      this.loadDatePicker();
    }, 1000);
  }
  onClickDeleteFamilyMembers(i) {
    this.familyMembersDetailsArray.forEach((element, index) => {
      if (index == i) {
        this.familyMembersDetailsArray.splice(i, 1);
      }
    })
  }
  onAddImmediatRelatives(index, data) {
    var flag = 0;
    var msg = "";

    if (data.imidiateRelativesNoofSecurity == null) {
      flag = 1;
      msg = "Please Enter No of Security";
    }
    else {

    }
    if (data.imidiateRelativesPhone == "") {
      flag = 1;
      msg = "Please Enter Mobile No";
    }
    else {

    }
    if (data.imidiateRelativesNoofSecurity == "") {
      flag = 1;
      msg = "Please Enter Pan No";
    }
    else {

    }
    if (data.imidiateRelativesName == "") {
      flag = 1;
      msg = "Please Enter Name";
    }

    if (flag == 0) {
      data.isReadOnly = true;
      this.objImmediateRelativeDetails = new ImmediateRelativeDetails();
      this.immediateRelativesArray.unshift(this.objImmediateRelativeDetails);
    } else {
      this.notificationService.showError(msg, "Error");
    }
  }

  onClickDeleteImmediateRelatives(i, data) {
    this.immediateRelativesArray.forEach((element, index) => {
      if (index == i) {
        this.immediateRelativesArray.splice(i, 1);
      }
    })
  }
  onChangeSameAs(eve) {
    if (eve.target.checked) {
      this.objCandidateJoiningForm.permanentAddress = this.objCandidateJoiningForm.residentialAddress;
      this.objCandidateJoiningForm.permanentPin = this.objCandidateJoiningForm.residentialPin;
    } else {
      this.objCandidateJoiningForm.permanentAddress = "";
      this.objCandidateJoiningForm.permanentAddress = null;
    }
    this.objCandidateJoiningForm.sameAsResidential = eve.target.checked;

  }
  getSameAsResidentialStatus(status) {
    return status
  }
  onAttachmentFileChange(files: FileList) {
    this.invalidFileName = false;
    var filenameforValidationCheck = files[0].name.replace(".jpeg", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName = true;
      }
    })
    const mimeType = files[0].type;
    if (mimeType.match(/jpeg\/*/) == null) {
      this.notificationService.showError("Only jpeg/jpg files are supported", "Error");
      return;
    }
    if (files[0].size >= 81920) {
      this.notificationService.showError("File should be max 80KB!", "Error");
      this.attachmentFileImport.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    }
    if (this.invalidFileName) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.attachmentFileImport.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    } else {
      this.attachmentFileImport.nativeElement.innerText = files[0].name;
      this.attachmentfileToUpload = files.item(0);
    }
  }

  candidateJoiningFormDetails() {
    this.SpinnerService.show();
    this.FamilyDetailsFormRemarks = [];
    this.AccidentInsurancePolicyFormRemarks = [];
    this.JoiningReportFormRemarks = [];
    this.SebiDisclosureFormRemarks = []
    this.candidateService.getCandidateJoiningFormDetails(this.searchCandidateJoiningFormDetails).subscribe((result) => {
      if (result) {
        this.candidateJoiningFormDetailsList = result;
        this.objCandidateJoiningForm = this.candidateJoiningFormDetailsList;
        this.candidateJoiningFormApprovalStatus = this.candidateJoiningFormDetailsList.candidateJoiningFormApprovalStatus;
        if (this.candidateJoiningFormDetailsList.acidentalPolicyNomineeRelationShip == 0) {
          this.objCandidateJoiningForm.acidentalPolicyNomineeRelationShip = null;
        }
        Number(this.objCandidateJoiningForm.acidentalPolicyNomineeRelationShip) == 7 ? this.showReleationShipName = true : this.showReleationShipName = false;
        if (this.candidateJoiningFormApprovalStatus != null && this.candidateJoiningFormApprovalStatus.length > 0) {
          this.candidateJoiningFormApprovalStatus.forEach(element => {
            if (element.doumentName == 21 && element.approvalRemarks.length > 0) {
              var rec = {
                createdBy: element.remarksBy,
                remarks: element.approvalRemarks
              }
              this.FamilyDetailsFormRemarks.push(rec);
            }
            if (element.doumentName == 22 && element.approvalRemarks.length > 0) {
              var rec = {
                createdBy: element.remarksBy,
                remarks: element.approvalRemarks
              }
              this.AccidentInsurancePolicyFormRemarks.push(rec);
            }

            if (element.doumentName == 23 && element.approvalRemarks.length > 0) {
              var rec = {
                createdBy: element.remarksBy,
                remarks: element.approvalRemarks
              }
              this.JoiningReportFormRemarks.push(rec);
            }
            if (element.doumentName == 17 && element.approvalRemarks.length > 0) {
              var rec = {
                createdBy: element.remarksBy,
                remarks: element.approvalRemarks
              }
              this.SebiDisclosureFormRemarks.push(rec);
            }
            if (element.doumentName == 21 && element.approvalStatus == 2) {
              this.disableOnEditFamilyDetailsForm = false;
              //this.FamilyDetailsFormRemarks = element.approvalRemarks;
              //this.isRemarksForCandidate=true;
              this.isFamilyRemarksForCandidate = true;

            }
            else if (element.doumentName == 22 && element.approvalStatus == 2) {
              this.disableOnEditAccidentInsurancePolicyForm = false;
              //this.AccidentInsurancePolicyFormRemarks = element.approvalRemarks;
              //this.isRemarksForCandidate=true;
              this.isAccidentRemarksForCandidate = true;
            }
            else if (element.doumentName == 23 && element.approvalStatus == 2) {
              this.disableOnEditJoiningReportForm = false;
              //this.JoiningReportFormRemarks = element.approvalRemarks;
              //this.isRemarksForCandidate=true;
              this.isJoiningRemarksForCandidate = true;
            }
            else if (element.doumentName == 17 && element.approvalStatus == 2) {
              this.disableOnEditSebiDisclosureForm = false;
              //this.SebiDisclosureFormRemarks = element.approvalRemarks;
              //this.isRemarksForCandidate=true;
              this.isSebiRemarksForCandidate = true;
            }
          })
        }

        var candidateRemarksForFamily = this.candidateJoiningFormDetailsList.candidateRemarksDetails.filter(e => e.remarksDocumentType == 21);
        for (var val of candidateRemarksForFamily) {
          this.FamilyDetailsFormRemarks.push({
            createdBy: val.fullName,
            remarks: val.reamrks
          })
        }

        var candidateRemarksForAccident = this.candidateJoiningFormDetailsList.candidateRemarksDetails.filter(e => e.remarksDocumentType == 22);
        for (var val of candidateRemarksForAccident) {
          this.AccidentInsurancePolicyFormRemarks.push({
            createdBy: val.fullName,
            remarks: val.reamrks
          })
        }

        var candidateRemarksForJoining = this.candidateJoiningFormDetailsList.candidateRemarksDetails.filter(e => e.remarksDocumentType == 17);
        for (var val of candidateRemarksForJoining) {
          this.JoiningReportFormRemarks.push({
            createdBy: val.fullName,
            remarks: val.reamrks
          })
        }

        var candidateRemarksForSebi = this.candidateJoiningFormDetailsList.candidateRemarksDetails.filter(e => e.remarksDocumentType == 23);
        for (var val of candidateRemarksForSebi) {
          this.SebiDisclosureFormRemarks.push({
            createdBy: val.fullName,
            remarks: val.reamrks
          })
        }

        //this.objCandidateJoiningForm.joiningLetterDate = //this.datePipe.transform(this.currentLetterDate, "dd/MM/yyyy");
        //this.objCandidateJoiningForm.signatureDate = this.datePipe.transform(this.currentLetterDate, "dd/MM/yyyy");
        //this.objCandidateJoiningForm.joiningDate = this.datePipe.transform(this.currentLetterDate, "dd/MM/yyyy");
        if (this.candidateJoiningFormDetailsList.candidateJoiningFormId != 0 && this.candidateJoiningFormDetailsList.isDraft == false) {
          this.fieldReadOnly = true;
        } else {
          this.fieldReadOnly = false;
        }

        // For Family members details
        if (this.candidateJoiningFormDetailsList.candidateJoiningFormId != 0) {
          this.familyMembersDetailsArray = [];
          if (this.candidateJoiningFormDetailsList.candidateJoingFormFamily.length > 0) {
            this.candidateJoiningFormDetailsList.candidateJoingFormFamily.forEach(element => {
              element.isReadOnly = true;
              this.familyMembersDetailsArray.push(element);
            })
          }
          if (!this.fieldReadOnly || !this.disableOnEditFamilyDetailsForm) {
            // this.familyMembersDetailsArray.unshift(this.objFamilyMembersdetails);
            this.familyMembersDetailsArrayNew = [];                                   // 25-08-2022
            this.familyMembersDetailsArrayNew.push(this.objFamilyMembersdetails);   // 25-08-2022
          }
        }
        else {
          //this.familyMembersDetailsArray.push(this.objFamilyMembersdetails);
          this.familyMembersDetailsArrayNew.push(this.objFamilyMembersdetails);   // 25-08-2022
        }
        // For Immediate Relatievs
        if (this.candidateJoiningFormDetailsList.candidateJoiningFormId != 0) {
          this.immediateRelativesArray = [];
          if (this.candidateJoiningFormDetailsList.candidateJoingFormImidiateRelatives.length > 0) {
            this.candidateJoiningFormDetailsList.candidateJoingFormImidiateRelatives.forEach(element => {
              element.isReadOnly = true;
              this.immediateRelativesArray.push(element);
            })
          }
          if (!this.fieldReadOnly || !this.disableOnEditSebiDisclosureForm) {
            this.immediateRelativesArray.unshift(this.objImmediateRelativeDetails);
          }
        }
        else {
          this.immediateRelativesArray.push(this.objImmediateRelativeDetails);
        }
        this.SpinnerService.hide();
      }
      else {
        // this.candidateJoiningFormDetailsList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      // this.loadDataTable();
      setTimeout(() => {
        this.loadDatePicker();
      }, 1000);
      this.SpinnerService.hide();
    });
  }
  getAllJoiningFormDetailsForPDF() {
    this.searchJoiningForm.candidateId = this.candidateId;
    this.candidateService.getAllCandidateJoinigFormDetails(this.searchJoiningForm).subscribe((result) => {
      if (result) {
        this.candidateJoiningFormPDFAllDetails = result;
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  onChangeDate() {
    this.objCandidateJoiningForm.date = this.fdDate.nativeElement.value;
  }
  onChangeJoiningDate() {
    this.objCandidateJoiningForm.joiningDate = this.JoiningDate.nativeElement.value;
  }
  onSaveAsDraft() {
    var flag = 0;
    var msg = "";
    if (this.attachmentfileToUpload != null && this.isSignatureButtonClicked == false) {
      flag = 1;
      this.notificationService.showError("Please click on the Upload Button", "Error");
    }
    if (flag == 0) {
      this.SpinnerService.show();
      const formData = new FormData();
      //formData.append("Files", this.attachmentfileToUpload == null ? "" : this.attachmentfileToUpload);
      formData.append("CandidateJoiningFormId", this.objCandidateJoiningForm.candidateJoiningFormId.toString());
      formData.append("CandidateId", this.objCandidateJoiningForm.candidateId.toString());
      formData.append("RequisitionDetailId", this.objCandidateJoiningForm.requisitionDetailId.toString());
      formData.append("FullName", this.objCandidateJoiningForm.fullName);
      formData.append("DOB", this.objCandidateJoiningForm.dob);
      formData.append("BloodGroupId", this.objCandidateJoiningForm.bloodGroupId.toString());
      formData.append("ResidentialAddress", this.objCandidateJoiningForm.residentialAddress);
      formData.append("ResidentialPin", this.objCandidateJoiningForm.residentialPin);
      formData.append("SameAsResidential", this.objCandidateJoiningForm.sameAsResidential.toString());
      formData.append("PermanentAddress", this.objCandidateJoiningForm.permanentAddress);
      formData.append("PermanentPin", this.objCandidateJoiningForm.permanentPin);
      formData.append("EmailId", this.objCandidateJoiningForm.emailId);
      formData.append("PhoneNo", this.objCandidateJoiningForm.phoneNo);
      formData.append("Date", this.objCandidateJoiningForm.date == null ? this.todayDate : this.objCandidateJoiningForm.date);
      formData.append("AcidentalPolicyNominee", this.objCandidateJoiningForm.acidentalPolicyNominee);
      formData.append("AcidentalPolicyNomineeOtherRelationShip", this.objCandidateJoiningForm.otherRelationName);
      //formData.append("AcidentalPolicyNomineeRelationShip", this.objCandidateJoiningForm.acidentalPolicyNomineeRelationShip.toString());
      formData.append("AcidentalPolicyNomineeRelationShip", this.objCandidateJoiningForm.acidentalPolicyNomineeRelationShip == null ? "0" : this.objCandidateJoiningForm.acidentalPolicyNomineeRelationShip.toString());
      formData.append("AcidentalPolicyNomineeAddress", this.objCandidateJoiningForm.acidentalPolicyNomineeAddress);
      formData.append("AcidentalPolicyName", this.objCandidateJoiningForm.acidentalPolicyName);
      formData.append("SEBIApplicable", this.objCandidateJoiningForm.sebiApplicable.toString());
      formData.append("SEBIName", this.objCandidateJoiningForm.sebiName);
      formData.append("SEBIEmployeeNo", this.objCandidateJoiningForm.sebiEmployeeNo);
      formData.append("SEBIDesignation", this.objCandidateJoiningForm.sebiDesignation.toString());
      formData.append("SEBIDepartment", this.objCandidateJoiningForm.sebiDepartment.toString());
      formData.append("SEBIPanNo", this.objCandidateJoiningForm.sebiPanNo);
      formData.append("SEBIMobileNo", this.objCandidateJoiningForm.sebiMobileNo);
      formData.append("SEBIInsTitute", this.objCandidateJoiningForm.sebiInsTitute);
      formData.append("SEBIPastEmployer", this.objCandidateJoiningForm.sebiPastEmployer);
      formData.append("SEBINoofSecurity", this.objCandidateJoiningForm.sebiNoofSecurity.toString());
      formData.append("SEBIDesigName", this.objCandidateJoiningForm.sebiDesigName);
      formData.append("SEBIDesigPAN", this.objCandidateJoiningForm.sebiDesigPAN);
      formData.append("SEBIDesigPhone", this.objCandidateJoiningForm.sebiDesigPhone);
      formData.append("JoiningLetterDate", this.objCandidateJoiningForm.joiningLetterDate);
      // formData.append("JoiningLetterDate", this.joiningLetterDate.nativeElement.value);
      formData.append("JoiningLetterDesignation", this.objCandidateJoiningForm.joiningLetterDesignation.toString());
      formData.append("JoiningDate", this.objCandidateJoiningForm.joiningDate == null ? this.todayDate : this.objCandidateJoiningForm.joiningDate);
      //formData.append("JoiningDate", this.JoiningDate.nativeElement.value);
      formData.append("SignatureDate", this.objCandidateJoiningForm.signatureDate);
      //formData.append("SignatureDate", this.SignatureDate.nativeElement.value);
      formData.append("SignaturePlace", this.objCandidateJoiningForm.signaturePlace);
      // formData.append("IsDraft", this.objCandidateJoiningForm.isDraft.toString());
      formData.append("IsDraft", "true");

      formData.append("FamilyDetailsHTML", "");
      formData.append("AccidentPolicyHTML", "");
      formData.append("SEBIDisclosureHTML", "");
      formData.append("JoiningReportHTML", "");

      var familyDetailsArrayForSave = [];
      var immediateRelativeArrayForSave = [];

      this.familyMembersDetailsArray.forEach((element, index) => {
        if (element.isReadOnly) {
          let familyMemberDetailsObj = {
            candidateJoiningFormId: element.CandidateJoiningFormId,
            lineId: (index + 1),
            candidateJoiningFamilyLineId: element.candidateJoiningFamilyLineId,
            familyName: element.familyName,
            familyRelationShip: element.familyRelationShip,
            familyRelationShipName: element.familyRelationShipName,
            familyDOB: element.familyDOB
          }
          familyDetailsArrayForSave.push(familyMemberDetailsObj);
        }
      })

      formData.append("CandidateJoingFormFamily", JSON.stringify(familyDetailsArrayForSave));
      this.immediateRelativesArray.forEach(element => {
        if (element.isReadOnly) {
          let immediateRelativeObj = {
            candidateJoiningFormId: element.candidateJoiningFormId,
            candidateImidiateRelativesLineId: element.candidateImidiateRelativesLineId,
            imidiateRelativesName: element.imidiateRelativesName,
            imidiateRelativesPAN: element.imidiateRelativesPAN,
            imidiateRelativesPhone: element.imidiateRelativesPhone,
            imidiateRelativesNoofSecurity: element.imidiateRelativesNoofSecurity
          }
          immediateRelativeArrayForSave.push(immediateRelativeObj);
        }
      })
      formData.append("CandidateJoingFormImidiateRelatives", JSON.stringify(immediateRelativeArrayForSave));
      formData.append("CreatedBy", this.loginUserId.toString());
      var updatedRemarks = [];
      if (this.isFamilyRemarksForCandidate == true && this.remarksForFamilyCandidate.length > 0) { //family details 
        updatedRemarks.push({
          offerDocumentCollectionRemarksId: 0,
          offerDocumentCollectionId: 0,
          remarksType: 2,
          reamrks: this.remarksForFamilyCandidate,
          reamrksReply: "",
          createdBy: this.loginUserId,
          createdByName: "",
          createdOn: null,
          candidateFullName: "",
          modifiedOn: null,
          documentType: 21
        })
      }
      if (this.isAccidentRemarksForCandidate == true && this.remarksForAccidentCandidate.length > 0) { //remarks accident
        updatedRemarks.push({
          offerDocumentCollectionRemarksId: 0,
          offerDocumentCollectionId: 0,
          remarksType: 2,
          reamrks: this.remarksForAccidentCandidate,
          reamrksReply: "",
          createdBy: this.loginUserId,
          createdByName: "",
          createdOn: null,
          candidateFullName: "",
          modifiedOn: null,
          documentType: 22
        })
      }
      if (this.isSebiRemarksForCandidate == true && this.remarksForSebiCandidate.length > 0) { //sebi 
        updatedRemarks.push({
          offerDocumentCollectionRemarksId: 0,
          offerDocumentCollectionId: 0,
          remarksType: 2,
          reamrks: this.remarksForSebiCandidate,
          reamrksReply: "",
          createdBy: this.loginUserId,
          createdByName: "",
          createdOn: null,
          candidateFullName: "",
          modifiedOn: null,
          documentType: 23
        })
      }
      if (this.isJoiningRemarksForCandidate == true && this.remarksForJoiningCandidate.length > 0) { //joining remarks
        updatedRemarks.push({
          offerDocumentCollectionRemarksId: 0,
          offerDocumentCollectionId: 0,
          remarksType: 2,
          reamrks: this.remarksForJoiningCandidate,
          reamrksReply: "",
          createdBy: this.loginUserId,
          createdByName: "",
          createdOn: null,
          candidateFullName: "",
          modifiedOn: null,
          documentType: 17
        })
      }
      formData.append("RemaksDetails", JSON.stringify(updatedRemarks));
      this.candidateService.saveJoiningForm(formData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            //jQuery("#confirmPopup").modal("hide");
            // this.objCandidateJoiningForm = new CandidateJoiningForm();
            // this.objFamilyMembersdetails = new FamilyMembersdetails();
            // this.objImmediateRelativeDetails = new ImmediateRelativeDetails();
            // this.showFamilyDetailsSection = true;
            // this.showInsurancePolicySection = false;
            // this.showSEBIInitialDisclosure = false;
            // this.showJoiningReport = false;
            if (this.attachmentfileToUpload != null) {
              this.attachmentFileImport.nativeElement.innerText = "";
              this.attachmentFileImport.nativeElement.value = "";
            }
            this.candidateJoiningFormDetails();
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
  /* Method to fetch image from Url */
  getBase64ImageFromURL(url: string): Observable<string> {
    return Observable.create((observer: Observer<string>) => {
      // create an image object
      let img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      if (!img.complete) {
        // This will call another method that will create image from url
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  /* Method to create base64Data Url from fetched image */
  getBase64Image(img: HTMLImageElement): string {
    // We create a HTML canvas object that will create a 2d image
    var canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    // This will draw image
    ctx.drawImage(img, 0, 0);
    // Convert the drawn image to Data URL
    let dataURL: string = canvas.toDataURL("image/png");
    //return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    return dataURL;
  }
  convertBase64CandidateSignature(imageUrl: string) {
    this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
      this.signature = base64Data;
    });
  }
  onConfirmPopoup(val) {
    if (val == "Y") {
      var flag = 0;
      var msg = "";
      if (this.attachmentfileToUpload == null && this.candidateJoiningFormDetailsList.signature == "") {
        flag = 1;
        msg = "Please Upload Signature";
      }
      else {

      }
      if (this.attachmentfileToUpload != null && this.isSignatureButtonClicked == false) {
        flag = 1;
        msg = "Please click on the Upload Button"
      } else {

      }
      if (this.objCandidateJoiningForm.signaturePlace == "" || this.objCandidateJoiningForm.signaturePlace == null) {
        flag = 1;
        msg = "Please Enter Place";
      }
      else {

      }
      if (this.isJoiningRemarksForCandidate == true && this.remarksForJoiningCandidate == "") {
        flag = 1;
        msg = "Please Enter Remarks";
      }

      if (flag == 0) {
        this.prepareFamilyMemberDataForPDF();

      }
      else {
        this.notificationService.showError(msg, "Error");
      }
    }

  }

  prepareFamilyMemberDataForPDF() {
    this.SpinnerService.show();
    //this.convertBase64CandidateSignature(this.UploadPDFList[0].signaturePic);
    this.familyDetailsRecord.familyMemberList = [];
    //if (this.candidateJoiningFormPDFAllDetails != null) {
    this.familyDetailsRecord.candidateName = this.objCandidateJoiningForm.fullName;
    this.familyDetailsRecord.dob = this.objCandidateJoiningForm.dob;
    var bloodGroupNameObj = this.bloodGroups.find(e => e.bloodGroupId == this.objCandidateJoiningForm.bloodGroupId);
    if (bloodGroupNameObj != null) {

      this.familyDetailsRecord.bloodGroup = bloodGroupNameObj.bloodGroupName;
    }
    this.familyDetailsRecord.residentialAddress = this.objCandidateJoiningForm.residentialAddress;
    this.familyDetailsRecord.residentialPIN = this.objCandidateJoiningForm.residentialPin;
    this.familyDetailsRecord.permanentAdress = this.objCandidateJoiningForm.permanentAddress;
    this.familyDetailsRecord.permanentPIN = this.objCandidateJoiningForm.permanentPin;
    this.familyDetailsRecord.email = this.objCandidateJoiningForm.emailId;
    this.familyDetailsRecord.mobile = this.objCandidateJoiningForm.phoneNo;
    this.familyDetailsRecord.signatureDate = this.objCandidateJoiningForm.signatureDate;
    //this.familyDetailsRecord.documentPath=this.UploadPDFList[0].signaturePic; 
    this.familyDetailsRecord.documentPath = this.signature;
    if (this.familyMembersDetailsArray.length > 0) {
      this.familyMembersDetailsArray.forEach((element, index) => {
        let familyDetailsObj = {
          memberName: element.familyName,
          relationwithEmployee: element.familyRelationShipName,
          memberDOB: element.familyDOB
        }
        this.familyDetailsRecord.familyMemberList.push(familyDetailsObj);
      })
    }
    this.familyDetailsData = this.familyDetailsRecord;
    setTimeout(() => {
      this.familyDetailsHtmlstring = document.getElementById("printFamilyDetailsDiv").innerHTML;
      this.prepareAccidentPolicyDataForPDF();
    }, 100)

  }
  prepareAccidentPolicyDataForPDF() {
    //  if (this.candidateJoiningFormPDFAllDetails != null) {
    this.accidentInsurancePolicyRecord.accidentPolicyHolderName = this.objCandidateJoiningForm.acidentalPolicyName;
    this.accidentInsurancePolicyRecord.accidentPolicyNomineeName = this.objCandidateJoiningForm.acidentalPolicyNominee;
    this.accidentInsurancePolicyRecord.accidentPolicyNomineeAddress = this.objCandidateJoiningForm.acidentalPolicyNomineeAddress;
    //this.accidentInsurancePolicyRecord.documentPath=this.UploadPDFList[0].signaturePic;
    this.accidentInsurancePolicyRecord.documentPath = this.signature
    var accidentRelationshipObj = this.relationshipList.find(e => e.relationshipId == this.objCandidateJoiningForm.acidentalPolicyNomineeRelationShip);
    if (accidentRelationshipObj != undefined) {
      this.accidentInsurancePolicyRecord.accidentPolicyRelationShipName = accidentRelationshipObj.relationshipName;
    }
    this.accidentInsurancePolicyData = this.accidentInsurancePolicyRecord;
    setTimeout(() => {
      this.accidentPolicyHtmlstring = document.getElementById("printAccidentInsurancePolicy").innerHTML;
      this.prepareSEBIDisclosureForPDF();
    }, 10)
  }
  prepareSEBIDisclosureForPDF() {
    //if (this.candidateJoiningFormPDFAllDetails != null) {
    this.SEBIDisclosureRecord.designatedPersonName = this.objCandidateJoiningForm.sebiName;
    this.SEBIDisclosureRecord.designatedPersonEmployeeNo = this.objCandidateJoiningForm.sebiEmployeeNo;
    this.SEBIDisclosureRecord.designatedPersonDesignation = this.objCandidateJoiningForm.sebiDesignationName;
    this.SEBIDisclosureRecord.designatedPersonDepartment = this.objCandidateJoiningForm.sebiDepartmentName;
    this.SEBIDisclosureRecord.designatedPersonPAN = this.objCandidateJoiningForm.sebiPanNo;
    this.SEBIDisclosureRecord.designatedPersonMobile = this.objCandidateJoiningForm.sebiMobileNo;
    this.SEBIDisclosureRecord.designatedPersonInstitute = this.objCandidateJoiningForm.sebiInsTitute;
    this.SEBIDisclosureRecord.designatedPersonPastEmployer = this.objCandidateJoiningForm.sebiPastEmployer;
    this.SEBIDisclosureRecord.designatedPersonNoOfSecurityHeld = this.objCandidateJoiningForm.sebiNoofSecurity.toString();
    // this.SEBIDisclosureRecord.currentDate = this.objCandidateJoiningForm.date;
    //this.SEBIDisclosureRecord.documentPath=this.UploadPDFList[0].signaturePic;
    this.SEBIDisclosureRecord.documentPath = this.signature;
    this.SEBIDisclosureRecord.currentDate = this.todayDate;
    this.SEBIDisclosureRecord.financialRelationshipName = this.objCandidateJoiningForm.sebiDesigName;
    this.SEBIDisclosureRecord.financialRelationshipPAN = this.objCandidateJoiningForm.sebiDesigPAN;
    this.SEBIDisclosureRecord.financialRelationshipMobileNo = this.objCandidateJoiningForm.sebiDesigPhone;
    this.SEBIDisclosureRecord.signatureDate = this.objCandidateJoiningForm.signatureDate;
    this.SEBIDisclosureRecord.signaturePlace = this.objCandidateJoiningForm.signaturePlace;

    if (this.immediateRelativesArray.length > 0) {
      this.immediateRelativesArray.forEach(element => {
        let obj = {
          immediateRelativesName: element.imidiateRelativesName,
          immediateRelativesPAN: element.imidiateRelativesPAN,
          iImmediateRelativesPhone: element.imidiateRelativesPhone == null ? "" : element.imidiateRelativesPhone,
          immediateRelativesNoofSecurity: element.imidiateRelativesNoofSecurity
        }
        this.SEBIDisclosureRecord.immediateRelatives.push(obj);
      })
    }
    this.SEBIDisclosureData = this.SEBIDisclosureRecord;
    setTimeout(() => {
      this.sebiHtmlstring = document.getElementById("printSEBIDisclosure").innerHTML;
      this.prepareJoiningReportDataForPDF();
    }, 10)
  }
  prepareJoiningReportDataForPDF() {
    // if (this.candidateJoiningFormPDFAllDetails != null) {
    this.joiningReportRecord.candidateName = this.objCandidateJoiningForm.fullName;
    this.joiningReportRecord.employeeNo = this.objCandidateJoiningForm.sebiEmployeeNo;
    this.joiningReportRecord.grade = this.candidateJoiningFormPDFAllDetails.grade;
    this.joiningReportRecord.location = this.candidateJoiningFormPDFAllDetails.location;
    this.joiningReportRecord.department = this.candidateJoiningFormPDFAllDetails.designatedPersonDepartment;
    // this.joiningReportRecord.probation=this.objCandidateJoiningForm.probation;
    this.joiningReportRecord.date = this.objCandidateJoiningForm.joiningLetterDate;
    this.joiningReportRecord.joiningDate = this.objCandidateJoiningForm.joiningDate;
    //this.joiningReportRecord.probation = this.objCandidateJoiningForm.probation;
    this.joiningReportRecord.designation = this.objCandidateJoiningForm.joiningLetterDesignationName;
    // this.joiningReportRecord.documentPath = this.UploadPDFList[0].signaturePic;
    this.joiningReportRecord.documentPath = this.signature;
    this.joiningReportData = this.joiningReportRecord;
    setTimeout(() => {
      this.joiningReportHtmlstring = document.getElementById("printJoiningReport").innerHTML;
      this.prepareFamilyPdf()
      //this.finalSubmit();
    }, 10)
  }

  prepareFamilyPdf() {
    var dom = document.createElement('div');
    dom.innerHTML = this.familyDetailsHtmlstring;
    var opt = {
      margin: 6,
      filename: this.objCandidateJoiningForm.candidateId.toString() + "_FamilyDetails.pdf",
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, y: 2, scrollY: 0 },
      // jsPDF: { format: 'A4', orientation: "landscape" },
      jsPDF: { format: 'A4', orientation: "portrait" },
    }
    html2pdf().set(opt).from(dom).toPdf().output('blob').then((data: any) => {
      this.familyDetailspdf = data;
      this.prepareAccidentPolicyPdf();
    })
  }
  prepareAccidentPolicyPdf() {
    var dom = document.createElement('div');
    dom.innerHTML = this.accidentPolicyHtmlstring;
    var opt = {
      margin: 6,
      filename: this.objCandidateJoiningForm.candidateId.toString() + "_AccidentPolicy.pdf",
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, y: 2, scrollY: 0 },
      //jsPDF: { format: 'A4', orientation: "landscape" },
      jsPDF: { format: 'A4', orientation: "portrait" },
    }
    html2pdf().set(opt).from(dom).toPdf().output('blob').then((data: any) => {
      this.accidentPolicyPdf = data;
      this.prepareSEBIPdf();
    })
  }
  prepareSEBIPdf() {
    var dom = document.createElement('div');
    dom.innerHTML = this.sebiHtmlstring;
    var opt = {
      margin: 6,
      filename: this.objCandidateJoiningForm.candidateId.toString() + "_SEBI.pdf",
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, y: 2, scrollY: 0 },
      //jsPDF: { format: 'A4', orientation: "landscape" },
      jsPDF: { format: 'A4', orientation: "portrait" },
    }
    html2pdf().set(opt).from(dom).toPdf().output('blob').then((data: any) => {
      this.sebiDisclousePdf = data;
      this.preparejoiningFormPdf()
    })
  }
  preparejoiningFormPdf() {
    var dom = document.createElement('div');
    dom.innerHTML = this.joiningReportHtmlstring;
    var opt = {
      margin: 8,
      filename: this.objCandidateJoiningForm.candidateId.toString() + "_JoiningReport.pdf",
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, y: 2, scrollY: 0 },
      jsPDF: { format: 'A4', orientation: "portrait" },
    }
    html2pdf().set(opt).from(dom).toPdf().output('blob').then((data: any) => {
      this.joiningReportPdf = data;
      this.finalSubmit();
      this.notificationService.showSuccess("Successfully", "Success");
    })
  }
  finalSubmit() {
    this.SpinnerService.show();
    const formData = new FormData();
    //formData.append("Files", this.attachmentfileToUpload);
    formData.append("CandidateJoiningFormId", this.objCandidateJoiningForm.candidateJoiningFormId.toString());
    formData.append("CandidateId", this.objCandidateJoiningForm.candidateId.toString());
    formData.append("RequisitionDetailId", this.objCandidateJoiningForm.requisitionDetailId.toString());
    formData.append("FullName", this.objCandidateJoiningForm.fullName);
    formData.append("DOB", this.objCandidateJoiningForm.dob);
    formData.append("BloodGroupId", this.objCandidateJoiningForm.bloodGroupId.toString());
    formData.append("ResidentialAddress", this.objCandidateJoiningForm.residentialAddress);
    formData.append("ResidentialPin", this.objCandidateJoiningForm.residentialPin);
    formData.append("SameAsResidential", this.objCandidateJoiningForm.sameAsResidential.toString());
    formData.append("PermanentAddress", this.objCandidateJoiningForm.permanentAddress);
    formData.append("PermanentPin", this.objCandidateJoiningForm.permanentPin);
    formData.append("EmailId", this.objCandidateJoiningForm.emailId);
    formData.append("PhoneNo", this.objCandidateJoiningForm.phoneNo);
    formData.append("Date", this.objCandidateJoiningForm.date);
    formData.append("AcidentalPolicyNominee", this.objCandidateJoiningForm.acidentalPolicyNominee);
    formData.append("AcidentalPolicyNomineeRelationShip", this.objCandidateJoiningForm.acidentalPolicyNomineeRelationShip.toString());
    formData.append("AcidentalPolicyNomineeOtherRelationShip", this.objCandidateJoiningForm.otherRelationName.toString());
    formData.append("AcidentalPolicyNomineeAddress", this.objCandidateJoiningForm.acidentalPolicyNomineeAddress);
    formData.append("AcidentalPolicyName", this.objCandidateJoiningForm.acidentalPolicyName);
    formData.append("SEBIApplicable", this.objCandidateJoiningForm.sebiApplicable.toString());
    formData.append("SEBIName", this.objCandidateJoiningForm.sebiName);
    formData.append("SEBIEmployeeNo", this.objCandidateJoiningForm.sebiEmployeeNo);
    formData.append("SEBIDesignation", this.objCandidateJoiningForm.sebiDesignation.toString());
    formData.append("SEBIDepartment", this.objCandidateJoiningForm.sebiDepartment.toString());
    formData.append("SEBIPanNo", this.objCandidateJoiningForm.sebiPanNo);
    formData.append("SEBIMobileNo", this.objCandidateJoiningForm.sebiMobileNo);
    formData.append("SEBIInsTitute", this.objCandidateJoiningForm.sebiInsTitute);
    formData.append("SEBIPastEmployer", this.objCandidateJoiningForm.sebiPastEmployer);
    formData.append("SEBINoofSecurity", this.objCandidateJoiningForm.sebiNoofSecurity.toString());
    formData.append("SEBIDesigName", this.objCandidateJoiningForm.sebiDesigName);
    formData.append("SEBIDesigPAN", this.objCandidateJoiningForm.sebiDesigPAN);
    formData.append("SEBIDesigPhone", this.objCandidateJoiningForm.sebiDesigPhone);
    formData.append("JoiningLetterDate", this.objCandidateJoiningForm.joiningLetterDate);
    //formData.append("JoiningLetterDate", this.joiningLetterDate.nativeElement.value);
    formData.append("JoiningLetterDesignation", this.objCandidateJoiningForm.joiningLetterDesignation.toString());
    formData.append("JoiningDate", this.objCandidateJoiningForm.joiningDate);
    //formData.append("JoiningDate", this.JoiningDate.nativeElement.value);
    formData.append("SignatureDate", this.objCandidateJoiningForm.signatureDate);
    //formData.append("SignatureDate", this.SignatureDate.nativeElement.value);
    formData.append("SignaturePlace", this.objCandidateJoiningForm.signaturePlace);
    formData.append("Remarks", this.remarksForCandidate);
    // formData.append("IsDraft", this.objCandidateJoiningForm.isDraft.toString());
    formData.append("IsDraft", "false");

    var familyDetailsArrayForSave = [];
    var immediateRelativeArrayForSave = [];

    this.familyMembersDetailsArray.forEach((element, index) => {
      if (element.isReadOnly) {
        let familyMemberDetailsObj = {
          candidateJoiningFormId: element.CandidateJoiningFormId,
          lineId: (index + 1),
          candidateJoiningFamilyLineId: element.candidateJoiningFamilyLineId,
          familyName: element.familyName,
          familyRelationShip: element.familyRelationShip,
          familyRelationShipName: element.familyRelationShipName,
          familyDOB: element.familyDOB
        }
        familyDetailsArrayForSave.push(familyMemberDetailsObj);
      }
    })

    formData.append("CandidateJoingFormFamily", JSON.stringify(familyDetailsArrayForSave));
    this.immediateRelativesArray.forEach(element => {
      if (element.isReadOnly) {
        let immediateRelativeObj = {
          candidateJoiningFormId: element.candidateJoiningFormId,
          candidateImidiateRelativesLineId: element.candidateImidiateRelativesLineId,
          imidiateRelativesName: element.imidiateRelativesName,
          imidiateRelativesPAN: element.imidiateRelativesPAN,
          imidiateRelativesPhone: element.imidiateRelativesPhone,
          imidiateRelativesNoofSecurity: element.imidiateRelativesNoofSecurity
        }
        immediateRelativeArrayForSave.push(immediateRelativeObj);
      }
    })
    formData.append("CandidateJoingFormImidiateRelatives", JSON.stringify(immediateRelativeArrayForSave));
    formData.append("CreatedBy", this.loginUserId.toString());
    // Added By anif on 16-11-2022 for generate PDF and uplaod to storage thriugh API

    formData.append("FamilyDetailsHTML", this.familyDetailsHtmlstring);
    formData.append("AccidentPolicyHTML", this.accidentPolicyHtmlstring);
    formData.append("SEBIDisclosureHTML", this.sebiHtmlstring);
    formData.append("JoiningReportHTML", this.joiningReportHtmlstring);

    formData.append("FamilyDetailsPdf", this.familyDetailspdf);
    formData.append("AccidentPolicyPdf", this.accidentPolicyPdf);
    formData.append("SEBIDisclosurePdf", this.sebiDisclousePdf);
    formData.append("JoiningReportPdf", this.joiningReportPdf);

    var updatedRemarks = [];
    if (this.isFamilyRemarksForCandidate == true) { //family details 
      updatedRemarks.push({
        offerDocumentCollectionRemarksId: 0,
        offerDocumentCollectionId: 0,
        remarksType: 2,
        reamrks: this.remarksForFamilyCandidate,
        reamrksReply: "",
        createdBy: this.loginUserId,
        createdByName: "",
        createdOn: null,
        candidateFullName: "",
        modifiedOn: null,
        documentType: 21
      })
    }
    if (this.isAccidentRemarksForCandidate == true) { //remarks accident
      updatedRemarks.push({
        offerDocumentCollectionRemarksId: 0,
        offerDocumentCollectionId: 0,
        remarksType: 2,
        reamrks: this.remarksForAccidentCandidate,
        reamrksReply: "",
        createdBy: this.loginUserId,
        createdByName: "",
        createdOn: null,
        candidateFullName: "",
        modifiedOn: null,
        documentType: 22
      })
    }
    if (this.isSebiRemarksForCandidate == true) { //sebi 
      updatedRemarks.push({
        offerDocumentCollectionRemarksId: 0,
        offerDocumentCollectionId: 0,
        remarksType: 2,
        reamrks: this.remarksForSebiCandidate,
        reamrksReply: "",
        createdBy: this.loginUserId,
        createdByName: "",
        createdOn: null,
        candidateFullName: "",
        modifiedOn: null,
        documentType: 23
      })
    }
    if (this.isJoiningRemarksForCandidate == true) { //joining remarks
      updatedRemarks.push({
        offerDocumentCollectionRemarksId: 0,
        offerDocumentCollectionId: 0,
        remarksType: 2,
        reamrks: this.remarksForJoiningCandidate,
        reamrksReply: "",
        createdBy: this.loginUserId,
        createdByName: "",
        createdOn: null,
        candidateFullName: "",
        modifiedOn: null,
        documentType: 17
      })
    }
    formData.append("RemaksDetails", JSON.stringify(updatedRemarks));
    this.candidateService.saveJoiningForm(formData).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          jQuery("#confirmPopup").modal("hide");
          this.objCandidateJoiningForm = new CandidateJoiningForm();
          this.objFamilyMembersdetails = new FamilyMembersdetails();
          this.objImmediateRelativeDetails = new ImmediateRelativeDetails();
          this.showFamilyDetailsSection = true;
          this.showInsurancePolicySection = false;
          this.showSEBIInitialDisclosure = false;
          // Added by anif 18-11-2022
          this.disableOnEditFamilyDetailsForm = true;
          this.disableOnEditAccidentInsurancePolicyForm = true;
          this.disableOnEditSebiDisclosureForm = true;
          this.disableOnEditJoiningReportForm = true;
          this.showJoiningReport = false;
          this.isRemarksForCandidate = false;
          this.isFamilyRemarksForCandidate = false;
          this.isAccidentRemarksForCandidate = false;
          this.isSebiRemarksForCandidate = false;
          this.isJoiningRemarksForCandidate = false;
          if (this.attachmentfileToUpload != null) {
            this.attachmentFileImport.nativeElement.innerText = "";
            this.attachmentFileImport.nativeElement.value = "";
          }
          this.candidateJoiningFormDetails();
          this.familyMembersDetailsArrayNew = []; // 25-08-2022
          this.gotoUploadJoiningDocument();
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
  gotoUploadJoiningDocument() {
    this._route.navigate(['app/career/upload-joining-documents']);
  }
  ngOnDestroy() {
    jQuery(".custom-menu").hide();
  }
  onChangeFamilyRelation(event) {
    if (Number(event) == 7) {
      this.showReleationShipName = true;
    }
    else {
      this.showReleationShipName = false;
    }

  }

  onClickUploadedSignature() {
    var flag = 0
    if (this.attachmentfileToUpload == null) {
      flag = 1;
      this.notificationService.showError("Please Attach a file", "Error");
    }
    if (flag == 0) {
      this.SpinnerService.show();
      this.isSignatureButtonClicked = true;
      const formData = new FormData();
      formData.append("Files", this.attachmentfileToUpload);
      formData.append("CandidateId", this.objCandidateJoiningForm.candidateId.toString());
      formData.append("RequisitionDetailId", this.objCandidateJoiningForm.requisitionDetailId.toString());
      formData.append("CandidateJoiningFormId", this.objCandidateJoiningForm.candidateJoiningFormId.toString());
      this.candidateService.insertUpdateSignature(formData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
            this.isSignatureButtonClicked = false //this line is added on 11-06-2024

          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");

            this.getUploadedSignature()
            // this.isSignatureButtonClicked = false this line is commented as submit and save as draft not working after uploading signature on 11-06-2024
            if (this.attachmentfileToUpload != null) {
              this.attachmentFileImport.nativeElement.innerText = "";
              this.attachmentFileImport.nativeElement.value = "";
            }
          }
        }
      })
    }
  }

  getUploadedSignature() {
    this.UploadPDFList = []
    var searchForm = {
      CandidateId: Number(this.candidateId),
      RequisitionDetailId: null,
      CandidateJoiningFormId: null,
      SignaturePic: null
    }
    this.candidateService.getSignatureCandidate(searchForm).subscribe((result) => {
      if (result) {
        this.UploadPDFList = result;
        // this.familyDetailsRecord.documentPath = this.UploadPDFList[0].signaturePic;
        // this.convertBase64CandidateSignature(this.UploadPDFList[0].signaturePic);
        this.openFileforsignture(this.UploadPDFList[0].signaturePic);
      }
    })
  }
  signatureurl: any
  openFileforsignture(blobName: string): void {
    let regex = /\.net(.*)/;
    let match = blobName.match(regex);
    let extractedString = match ? match[1] : '';
    let filename = extractedString.split('/')[2];
    let containername = extractedString.split('/')[1];
    this.locationService.getTestfile(filename, containername).subscribe(response => {
      let blob: Blob = response.body as Blob;
      const url = window.URL.createObjectURL(blob);
      this.signatureurl = url;
      this.familyDetailsRecord.documentPath = this.signatureurl;
      this.convertBase64CandidateSignature(this.signatureurl);
    });
  }
  openFile(blobName: string): void {
    let regex = /\.net(.*)/;
    let match = blobName.match(regex);
    let extractedString = match ? match[1] : '';
    let filename = extractedString.split('/')[2];
    let containername = extractedString.split('/')[1];
    this.locationService.getTestfile(filename, containername).subscribe(response => {
      let blob: Blob = response.body as Blob;
      const url = window.URL.createObjectURL(blob);

      // Open the file in a new tab
      window.open(url);
    }, error => {
      console.error('Failed to download file:', error);
    });
  }
}

export class CandidateJoiningForm {
  candidateJoiningFormId: number;
  candidateId: number;
  requisitionDetailId: number;
  fullName: string;  //Done
  dob: string; // Done
  bloodGroupId: number;  // Done
  residentialAddress: string; // Done
  residentialPin: string;  // Done
  sameAsResidential: boolean; // Done
  permanentAddress: string; // Done
  permanentPin: string;  // Done
  emailId: string;  // Done
  phoneNo: string; // Done
  date: string;  // Done
  acidentalPolicyNominee: string; // Done
  acidentalPolicyNomineeRelationShip: number;  //Done
  acidentalPolicyNomineeAddress: string;  // Done
  acidentalPolicyName: string; // Done
  sebiApplicable: boolean;
  sebiName: string;  // Done
  sebiEmployeeNo: string;  // Done
  sebiDesignation: number;  // Done
  sebiDesignationName: string;
  sebiDepartment: number;  // Done
  sebiPanNo: string;  // Done
  sebiMobileNo: string;  // Done
  sebiInsTitute: string;  // Done
  sebiPastEmployer: string;  // Done
  sebiNoofSecurity: number; // Done
  sebiDesigName: string; // Done
  sebiDesigPAN: string;  // Done
  sebiDesigPhone: string;  // Done
  joiningLetterDate: string;  // Done
  joiningLetterDesignation: number; // Done
  joiningDate: string;  // Done
  signatureDate: string; // Done
  signaturePlace: string;  // Done
  // formData.Signature = "/" + filepathSignature + "/" + fileNameSignature;
  isDraft: boolean;
  createdBy: number;
  signature: string;
  sebiDepartmentName: string;  // Added on 16-11-20222
  joiningLetterDesignationName: string; // Added on 16-11-20222
  otherRelationName: string;
}

export class FamilyMembersdetails {
  candidateJoiningFormId: number;
  lineId: number;
  candidateJoiningFamilyLineId: number;
  familyName: string;  //Done
  familyRelationShip: number;  //Done
  familyRelationShipName: string;
  familyDOB: string; // Done
  isReadOnly: boolean;
}

export class ImmediateRelativeDetails {
  candidateJoiningFormId: number;
  candidateImidiateRelativesLineId: number;
  imidiateRelativesName: string; // Done
  imidiateRelativesPAN: string; // Done
  imidiateRelativesPhone: string; // Done
  imidiateRelativesNoofSecurity: number; // Done
  isReadOnly: boolean;
}

