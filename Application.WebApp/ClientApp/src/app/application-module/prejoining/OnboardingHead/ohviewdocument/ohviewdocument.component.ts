import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { CandidateJoiningFormRelativeDetailData, IAccidentInsurancePolicyPDF, ICandidateDetailData, ICandidateJoiningFormDetailsForPDF, ICandidateJoiningFormFamilyDetailData, IJoiningFormFamilyDetailsPDF, IJoiningReportPDF, ISearchCandidateDetail, ISEBIDisclosurePDF } from '../../../../interfaces/preselection/candidate.interface';
import { IRequisitionCandidateHiringStatusFormData } from '../../../../interfaces/preselection/requisition.interface';
import { RequisitionService } from '../../../../services/preselection/requisition/requisition.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { CandidateService } from '../../../../services/preselection/candidate/candidate.service';
import { NotificationService } from '../../../../sharedservices/notification.service';
import {
  ICandidateOfferDocument, ISearchCandidateOfferDocument, IPreviousSalaryDetails, IOfferDocumentAttachmentDetails,
  IAttachedDocument, IAttachedDocumentArrayList, IOfferDocumentRemarksDetails,
  IAttachmentApprovalData, ISubmittedAttachedDocumentArrayList
} from '../../../../interfaces/prejoining/candidatedocument.interface'
import {
  IAttachmentDocumentType, ISearchAttachmentDocumentType, IAttachmentDocumentParticular,
  ISearchAttachmentDocumentParticular, IAttachmentDocumentNameDetails, ISearchAttachmentDocumentName,
} from '../../../../interfaces/common/attachmentdocument.interface'
import { CandidateofferdocumentService } from '../../../../services/offer/candidateofferdocument/candidateofferdocument.service';
import { AttachmentdocumentService } from '../../../../services/common/attachementdocument/attachmentdocument.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { ITestResult, ISearchTestResult } from '../../../../interfaces/selection/testschedule.interface'
import { TestscheduleService } from '../../../../services/selection/testschedule/testschedule.service';
import { TwoDigitDecimaNumberLessThanHundredDirective } from 'src/app/directives/rangewithinghundred';
declare var jQuery: any;
declare var html2pdf: any;
import { HttpEventType } from '@angular/common/http';
import { LocationService } from 'src/app/services/common/location/location.service';
@Component({
  selector: 'app-ohviewdocument',
  templateUrl: './ohviewdocument.component.html',
  styleUrls: ['./ohviewdocument.component.css']
})
export class OhviewdocumentComponent implements OnInit {

  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  testResults: ITestResult[] = [];
  searchTestResult: ISearchTestResult = {
    requisitionDetailId: null,
    candidateId: null
  }

  candidates: ICandidateDetailData[] = [];
  zipFileName: string = "";
  searchCandidate: ISearchCandidateDetail = {
    CandidateId: 0,
    CandidateName: "",
    HiringStatusId: 0,
    GenderIds: "",
    FromAge: 0,
    ToAge: 0,
    AadharNo: "",
    ContactNo: "",
    EmailId: "",
    MotherTongueIds: "",
    QualificationIds: "",
    CourseIds: "",
    StreamIds: "",
    FromPercentage: 0,
    ToPercentage: 0,
    DomainIds: "",
    SubDomainIds: "",
    StateIds: "",
    SourceChannelId: "",
    CreatedBy: 0,
    RequisitionDetailId: 0,
    FromDate: "",
    ToDate: "",
    FromExperience: 0,
    ToExperience: 0,
    CompletionYears: "",
    QualificationTypeIds: "",
    CurrentEmployer: "",
    Designation: "",
    RelativeStatus: "",
    PreviousApplied: 0
  }
  candidateId: number;
  createdBy: number;
  requisitionDetailId: number;

  testScoreVisible: boolean = false;

  documentData: ICandidateOfferDocument;
  searchDocument: ISearchCandidateOfferDocument = {
    offerDocumentCollectionId: null,
    candidateId: null,
    requsitaionDetailsId: null
  };
  autoUserId: number;
  //attachedSubmittedDocumentArrayList: IOfferDocumentAttachmentDetails[] = [];
  attachedSubmittedDocumentArrayList: any[] = [];
  submittedDocumentArrayList: any[] = [];
  submittedSalaryRemarksDetails: IOfferDocumentRemarksDetails[] = [];
  submittedAdditionalRemarksDetails: IOfferDocumentRemarksDetails[] = [];

  monthlyTotal: number;
  yearlyTotal: number;

  updatedSalary: IPreviousSalaryDetails[] = [];
  updatedAttachment: IAttachmentApprovalData[] = [];
  updatedRemarks: IOfferDocumentRemarksDetails[] = [];
  salaryRemarks: string;
  additionalRemarks: string;
  additionalAttachment: IOfferDocumentAttachmentDetails[] = [];

  documentTypes: IAttachmentDocumentType[] = [];
  searchDocumentType: ISearchAttachmentDocumentType = {
    attachmentDocumentTypeId: null,
    isActive: true
  }

  documentParticulars: IAttachmentDocumentParticular[] = [];
  documentParticularList: IAttachmentDocumentParticular[] = [];
  searchDocumentParticular: ISearchAttachmentDocumentParticular = {
    attachmentDocumentParticularId: null,
    attachmentDocumentTypeId: null,
    isActive: true
  }

  documentNames: IAttachmentDocumentNameDetails[] = [];
  documentNameList: IAttachmentDocumentNameDetails[] = [];
  searchDocumentName: ISearchAttachmentDocumentName = {
    attachmentDocumentNameId: null,
    attachmentDocumentParticularId: null,
    isActive: true
  }

  selectedDocumentType: number;;
  selectedDocumentParticular: number;
  selectedDocumentName: number;

  isAdditionalDocumentReq: boolean = false;
  enableModify: boolean = false;
  batchId: number;
  batchNo: string;
  onBoardingCoordinator: number;
  pageName: string;
  type: string;
  from: string;
  fromType: string;
  parentActiveTab: string;
  childActiveTab: string;
  roleIds: string;
  disabledField: boolean = true;
  roleArr: any[] = [];

  searchJoiningForm = {
    candidateJoiningFormId: null,
    candidateId: null
  }
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
  candidateJoiningFormFamilyDetails: ICandidateJoiningFormFamilyDetailData[] = [];
  candidateJoiningFormRelatives: CandidateJoiningFormRelativeDetailData[] = [];


  familyDetailsData: any;
  familyDetailsRecord: IJoiningFormFamilyDetailsPDF = {
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
    familyMemberList: []
  };

  joiningReportData: any;
  joiningReportRecord: IJoiningReportPDF = {
    candidateName: "",
    employeeNo: "",
    grade: "",
    location: "",
    department: "",
    probation: "",
    date: "",
    joiningDate: "",
    designation: ""
  }
  accidentInsurancePolicyData: any;
  accidentInsurancePolicyRecord: IAccidentInsurancePolicyPDF = {
    accidentPolicyRelationShipName: "",
    accidentPolicyNomineeName: "",
    accidentPolicyNomineeAddress: "",
    accidentPolicyHolderName: ""
  }
  SEBIDisclosureData: any;
  SEBIDisclosureRecord: ISEBIDisclosurePDF = {
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
    immediateRelatives: []
  }

  constructor(
    private _route: Router,
    private SpinnerService: NgxSpinnerService,
    private candidateService: CandidateService,
    private requisitionService: RequisitionService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private testScheduleService: TestscheduleService,
    private documentService: CandidateofferdocumentService,
    private attachmentDocumentService: AttachmentdocumentService,
    private locationService: LocationService,

  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    //if (this.persistance.get('pagename') != null || this.persistance.get('nextpagename') != null) {
    //if ((this.persistance.get('pagename') == "newjoinerslist" || this.persistance.get('pagename') == "viewcandidatelist" || this.persistance.get('pagename') == "employeemanagement") && this.persistance.get('nextpagename') == "ocviewdocument") {
    this.roleIds = this.persistance.get('loggedinuser').roleIds;
    this.roleArr = this.roleIds.split(",");
    // this.roleArr.push("21");
    // console.log("Role ID", this.roleArr);

    for (var i = 0; i < this.roleArr.length; i++) {
      if (this.roleArr[i] == "49" ) {
        this.disabledField = false;
      }
    }
    this.candidateId = this.persistance.get('candidateId');
    this.batchId = this.persistance.get('BatchId');
    this.batchNo = this.persistance.get('BatchNo');
    this.pageName = this.persistance.get('pagename');
    this.type = this.persistance.get('type');
    this.from = this.persistance.get('From');
    this.fromType = this.persistance.get('FromType');
    this.onBoardingCoordinator = this.persistance.get('OnBoardingcoordinator');
    this.requisitionDetailId = this.persistance.get('paramid');
    this.parentActiveTab = this.persistance.get("parentActiveTab");


    this.getCandidateList();
    this.getTestReult();
    this.getAllDocumentType();
    this.getAllDocumentParticulars();
    this.getAllDocumentName();
    this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
    this.getCandidateOfferDocument();
    this.getAllJoiningFormDetailsForPDF();
    // } else {
    //   this._route.navigate(['/my-action/verifymedicaldocument']);
    // }
    // }
    // else {
    //   this._route.navigate(['/my-action/verifymedicaldocument']);
    // }
  }

  ngOnInit() {
    this.loadAccordion();
  }
  loadAccordion() {
    jQuery("#accordion").on("hide.bs.collapse show.bs.collapse", e => {
      jQuery(e.target)
        .prev()
        .find("i:last-child")
        .toggleClass("fa-minus fa-plus");
    });
  }
  getAllDocumentType() {
    //this.documentTypes=[];
    this.attachmentDocumentService.getAllDocumentType(this.searchDocumentType).subscribe((result) => {
      if (result) {
        this.documentTypes = result;
        console.log(this.documentTypes);
      }
      else {
        this.documentTypes = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }

  getAllDocumentParticulars() {
    this.documentParticulars = [];
    this.attachmentDocumentService.getAllDocumentParticular(this.searchDocumentParticular).subscribe((result) => {
      if (result) {
        // console.log(result);
        this.documentParticulars = result;
      }
      else {
        this.documentParticulars = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }

  getAllDocumentName() {
    this.documentNames = [];
    this.attachmentDocumentService.getAllDocumentName(this.searchDocumentName).subscribe((result) => {
      if (result) {
        // console.log(result);
        this.documentNames = result;
      }
      else {
        this.documentNames = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }

  changeDocumentType(evt) {
    this.selectedDocumentParticular = undefined;
    this.selectedDocumentName = undefined;
    this.documentNameList = [];
    this.documentParticularList = this.documentParticulars.filter(x => x.attachmentDocumentTypeId == evt);
  }

  changeDocumentParticular(evt) {
    this.selectedDocumentName = undefined;
    this.documentNameList = this.documentNames.filter(x => x.attachmentDocumentParticularId == evt);
  }

  getCandidateOfferDocument() {
    this.documentData = null;
    this.searchDocument.candidateId = this.candidateId;
    this.documentService.getCandidateOfferDocument(this.searchDocument).subscribe((result) => {
      if (result) {
        // console.log("Candidate Doc", result);
        this.documentData = result;
        this.attachedSubmittedDocumentArrayList = this.documentData.attachmentDetails;
        this.groupSubmittedAttachedDocument();
        this.submittedSalaryRemarksDetails = this.documentData.remaksDetails.filter(x => x.remarksType == 1);
        this.submittedAdditionalRemarksDetails = this.documentData.remaksDetails.filter(x => x.remarksType == 2);
        this.getMonthlyTotal();
        this.getYearlyTotal();
        this.salaryRemarks = "";
        this.additionalRemarks = "";
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }

  groupSubmittedAttachedDocument() {
    this.submittedDocumentArrayList = [];
    // Added on 07/03/2022
    this.attachedSubmittedDocumentArrayList.forEach(element => {
      element.disabledField = true;
    })
    // -- Till this
    for (var i = 0; i < this.attachedSubmittedDocumentArrayList.length; i++) {
      var nflag = 0;
      for (var j = 0; j < this.submittedDocumentArrayList.length; j++) {
        if (this.attachedSubmittedDocumentArrayList[i].doumentType == this.submittedDocumentArrayList[j].doumentType) {
          nflag = 1;
        }
      }
      // Added on 07/03/2022
      var canEditRoleId = this.attachedSubmittedDocumentArrayList[i].roleId.split(",");
      // console.log("canEditRoleId", canEditRoleId);
      canEditRoleId.forEach((element_edit, index) => {
        this.roleArr.forEach((element_rolearr, index) => {
          if ((element_edit == element_rolearr && this.attachedSubmittedDocumentArrayList[i].approvalStatus != 3) || (this.attachedSubmittedDocumentArrayList[i].requestedBy == this.createdBy && this.attachedSubmittedDocumentArrayList[i].approvalStatus != 3)) {
            this.attachedSubmittedDocumentArrayList[i].disabledField = false;
          }
        })
      })
      // -- Till this
      if (nflag == 0) {
        this.submittedDocumentArrayList.push({
          doumentType: this.attachedSubmittedDocumentArrayList[i].doumentType,
          doumentTypName: this.attachedSubmittedDocumentArrayList[i].doumentTypName,
          documents: this.attachedSubmittedDocumentArrayList.filter(x => x.doumentType == this.attachedSubmittedDocumentArrayList[i].doumentType)
        })
      }
    }
     // Added from here by anif on 21-10-2022 to grouping Portal document type into prejoining & Onboarding
     var docList = this.submittedDocumentArrayList.filter(e => e.doumentType == 6);    
     this.submittedDocumentArrayList = this.submittedDocumentArrayList.filter(e => e.doumentType != 6);
     this.submittedDocumentArrayList.forEach(element => {
       if (element.doumentType == 4) {
         element.documents.forEach(ele_doc => {
           docList[0].documents.push(ele_doc);
         })
         element.documents = docList[0].documents;
       }
     })
   // // Till here by anif on 21-10-2022

  }

  getCandidateList() {
    this.candidates = [];
    this.searchCandidate.CandidateId = this.candidateId;
    this.searchCandidate.RequisitionDetailId = this.requisitionDetailId;
    this.candidateService.getCandidateList(this.searchCandidate).subscribe((result) => {
      if (result) {
        this.candidates = result;
        // console.log(result);
      }
      else {
        this.candidates = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  gotoCandidateList() {
    this.persistance.set('paramid', this.requisitionDetailId);
    this.persistance.set('pagename', this.pageName);
    this.persistance.set('parentActiveTab', this.parentActiveTab);
    this.persistance.set('nextpagename', null);
    this._route.navigate(['/app/onboardingmanagement']);
  }

  getTestReult() {
    this.testScoreVisible = false;
    this.searchTestResult.candidateId = this.candidateId;
    this.searchTestResult.requisitionDetailId = this.requisitionDetailId;

    this.testScheduleService.getTestResult(this.searchTestResult).subscribe((result) => {
      if (result) {
        this.testResults = result;
        if (this.testResults.length > 0) {
          this.testScoreVisible = true;
        }
      }
      else {
        this.testResults = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getMonthlyTotal() {
    this.monthlyTotal = 0;
    for (var i = 0; i < this.documentData.salaryDetails.length; i++) {
      this.monthlyTotal = this.monthlyTotal + this.documentData.salaryDetails[i].monthly;
    }
  }

  getYearlyTotal() {
    this.yearlyTotal = 0;
    for (var i = 0; i < this.documentData.salaryDetails.length; i++) {
      this.yearlyTotal = this.yearlyTotal + this.documentData.salaryDetails[i].yerly;
    }
  }

  removeSalaryHead(id) {
    this.documentData.salaryDetails = this.documentData.salaryDetails.filter(x => x.offerDocumentCollectionSalaryId != id);
    this.getMonthlyTotal();
    this.getYearlyTotal();
  }

  addAdditionalAttachment() {
    var flag = 0;
    if (this.selectedDocumentType == undefined) {
      jQuery(".documentType").addClass("is-invalid");
      flag = 1
    }
    else {
      jQuery(".documentType").removeClass("is-invalid");
    }
    if (this.selectedDocumentParticular == undefined) {
      jQuery(".documentParticular").addClass("is-invalid");
      flag = 1
    }
    else {
      jQuery(".documentParticular").removeClass("is-invalid");
    }
    if (this.selectedDocumentName == undefined) {
      jQuery(".documentName").addClass("is-invalid");
      flag = 1
    }
    else {
      jQuery(".documentName").removeClass("is-invalid");
    }

    if (flag == 0) {
      this.additionalAttachment.push({
        offerDocumentCollectionDocumentId: this.additionalAttachment.length + 1,
        offerDocumentCollectionId: this.documentData.offerDocumentCollectionId,
        doumentType: this.selectedDocumentType,
        doumentTypName: this.documentTypes.filter(x => x.attachmentDocumentTypeId == this.selectedDocumentType)[0].attachmentDocumentTypeName,
        doumentParticular: this.selectedDocumentParticular,
        doumentParticularName: this.documentParticulars.filter(x => x.attachmentDocumentParticularId == this.selectedDocumentParticular)[0].attachmentDocumentParticularName,
        doumentNameId: this.selectedDocumentName,
        doumentName: this.documentNames.filter(x => x.attachmentDocumentNameId == this.selectedDocumentName)[0].attachmentDocumentName,
        document: "",
        documentPath: "",
        approvalStatus: 1,
        approvalRemarks: "",
        additionalDocument: true,
        modifyStatus: 0,
        createdBy: this.autoUserId,
        // Added on 07/03/2022
        roleId: null,
        disabledField: false,
        modifiedOn: "",  
        modifyBy: ""
      })

      this.selectedDocumentName = undefined;
      this.selectedDocumentParticular = undefined;
      this.selectedDocumentType = undefined;
      this.documentNameList = [];
      this.documentParticularList = [];
    }
  }

  removeAdditionalAttachment(id) {
    this.additionalAttachment = this.additionalAttachment.filter(x => x.offerDocumentCollectionDocumentId != id);
  }

  changeAdditionDocument(val) {
    if (val == "1") {
      this.isAdditionalDocumentReq = true;
      for(var values of this.submittedDocumentArrayList){
        for(var document of values.documents){
          if(document.isUploaded && document.offerDocumentCollectionDocumentId >0){
          this.documentNames = this.documentNames.filter( e => e.attachmentDocumentNameId != document.doumentNameId)
          }
        }
      }
    }
    else {
      this.isAdditionalDocumentReq = false;
    }
  }

  submitData() {
    var flag = 0;
    this.updatedSalary = [];
    for (var i = 0; i < this.documentData.salaryDetails.length; i++) {

      if (this.documentData.salaryDetails[i].emolumntVerifyStatus == 1) {
        flag = 1;
      }
    }
    for (var i = 0; i < this.submittedDocumentArrayList.length; i++) {
      for (var j = 0; j < this.submittedDocumentArrayList[i].documents.length; j++) {
        if (this.submittedDocumentArrayList[i].documents[j].approvalStatus == 1) {
          flag = 2;
        }
      }
    }
    if (flag == 1) {
      this.notificationService.showError("Please verify salary details", "Error");
    }
    // else if (flag == 2) {
    //   this.notificationService.showError("Please verify document details", "Error");
    // }
    else {
      for (var i = 0; i < this.documentData.salaryDetails.length; i++) {
        this.updatedSalary.push({
          offerDocumentCollectionSalaryId: this.documentData.salaryDetails[i].offerDocumentCollectionSalaryId,
          offerDocumentCollectionId: this.documentData.salaryDetails[i].offerDocumentCollectionId,
          emolumntId: this.documentData.salaryDetails[i].emolumntId,
          emolumntName: this.documentData.salaryDetails[i].emolumntName,
          monthly: this.documentData.salaryDetails[i].monthly,
          yerly: this.documentData.salaryDetails[i].yerly,
          emolumntVerifyStatus: this.documentData.salaryDetails[i].emolumntVerifyStatus,
          emolumntVerifyRemarks: this.documentData.salaryDetails[i].emolumntVerifyRemarks,
          createdBy: this.autoUserId
        })
      }
      this.updatedAttachment = [];
      for (var i = 0; i < this.submittedDocumentArrayList.length; i++) {
        for (var j = 0; j < this.submittedDocumentArrayList[i].documents.length; j++) {
          this.updatedAttachment.push({
            offerDocumentCollectionDocumentId: this.submittedDocumentArrayList[i].documents[j].offerDocumentCollectionDocumentId,
            offerDocumentCollectionId: this.submittedDocumentArrayList[i].documents[j].offerDocumentCollectionId,
            doumentType: this.submittedDocumentArrayList[i].documents[j].doumentType,
            doumentParticular: this.submittedDocumentArrayList[i].documents[j].doumentParticular,
            doumentNameId: this.submittedDocumentArrayList[i].documents[j].doumentNameId,
            approvalStatus: this.submittedDocumentArrayList[i].documents[j].approvalStatus,
            approvalRemarks: this.submittedDocumentArrayList[i].documents[j].approvalRemarks,
            createdBy: this.autoUserId,
            isAdditional:false    // Added By Anif 0n 07-12-2022
          })
        }
      }
      for (var i = 0; i < this.additionalAttachment.length; i++) {
        this.updatedAttachment.push({
          offerDocumentCollectionDocumentId: 0,
          offerDocumentCollectionId: this.additionalAttachment[i].offerDocumentCollectionId,
          doumentType: this.additionalAttachment[i].doumentType,
          doumentParticular: this.additionalAttachment[i].doumentParticular,
          doumentNameId: this.additionalAttachment[i].doumentNameId,
          approvalStatus: this.additionalAttachment[i].approvalStatus,
          approvalRemarks: this.additionalAttachment[i].approvalRemarks,
          createdBy: this.autoUserId,
          isAdditional:true    // Added By Anif 0n 07-12-2022
        })
      }
      this.updatedRemarks = [];
      if (this.salaryRemarks != "") {
        this.updatedRemarks.push({
          offerDocumentCollectionRemarksId: 0,
          offerDocumentCollectionId: this.documentData.offerDocumentCollectionId,
          remarksType: 1,
          reamrks: this.salaryRemarks,
          reamrksReply: "",
          createdBy: this.autoUserId,
          createdByName: "",
          createdOn: null,
          candidateFullName: "",
          modifiedOn: null
        })
      }
      if (this.additionalRemarks != "") {
        this.updatedRemarks.push({
          offerDocumentCollectionRemarksId: 0,
          offerDocumentCollectionId: this.documentData.offerDocumentCollectionId,
          remarksType: 2,
          reamrks: this.additionalRemarks,
          reamrksReply: "",
          createdBy: this.autoUserId,
          createdByName: "",
          createdOn: null,
          candidateFullName: "",
          modifiedOn: null
        })
      }
      // console.log(this.updatedRemarks);
      const formData = new FormData();
      formData.append("CandidateId", this.candidateId.toString());
      formData.append("CandidateNo", this.candidates[0].candidateNo);
      formData.append("CandidateName", this.candidates[0].fullName);
      formData.append("OfferDocumentCollectionId", this.documentData.offerDocumentCollectionId.toString());
      formData.append("RequsitaionDetailsId", this.documentData.requsitaionDetailsId.toString());
      formData.append("SalaryDetails", JSON.stringify(this.updatedSalary));
      formData.append("CreatedBy", this.autoUserId.toString());
      formData.append("RemaksDetails", JSON.stringify(this.updatedRemarks));
      formData.append("AttachmentDetails", JSON.stringify(this.updatedAttachment));
      if (this.candidates.length > 0) {   // Added by anif on 16-11-2022 as no email sending to API so got error while send mail

        formData.append("EmailId", this.candidates[0].emailId);
      }
      if (this.enableModify == true) {
        formData.append("IsEnabled", "true");
      }
      else {
        formData.append("IsEnabled", "false");
      }
      this.documentService.approveCandidateOfferDocument(formData).subscribe((result) => {
        // console.log(result);
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.closeModal.nativeElement.click();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.additionalAttachment = [];
          this.closeModal.nativeElement.click();
          this.notificationService.showSuccess(result.msg, "Success");
          jQuery(".radio3").click();
          this.isAdditionalDocumentReq = false;
          this.salaryRemarks = "";
          this.additionalRemarks = "";
          this.getCandidateOfferDocument();
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
        this.closeModal.nativeElement.click();
        this.notificationService.showError("Something went wrong", "Error")
      });
    }

  }

  getAllJoiningFormDetailsForPDF() {
    this.searchJoiningForm.candidateId = this.candidateId;
    this.candidateService.getAllCandidateJoinigFormDetails(this.searchJoiningForm).subscribe((result) => {
      if (result) {
        this.candidateJoiningFormPDFAllDetails = result;
        // console.log("Candidate Joining Form Details", this.candidateJoiningFormPDFAllDetails);
        this.prepareFamilyMemberDataForPDF();
        this.prepareJoiningReportDataForPDF();
        this.prepareAccidentPolicyDataForPDF();
        this.prepareSEBIDisclosureForPDF();
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  prepareFamilyMemberDataForPDF() {
    this.familyDetailsRecord.familyMemberList = [];
    if (this.candidateJoiningFormPDFAllDetails != null) {
      this.familyDetailsRecord.candidateName = this.candidateJoiningFormPDFAllDetails.fullName;
      this.familyDetailsRecord.dob = this.candidateJoiningFormPDFAllDetails.dob;
      this.familyDetailsRecord.bloodGroup = this.candidateJoiningFormPDFAllDetails.bloodGroupName;
      this.familyDetailsRecord.residentialAddress = this.candidateJoiningFormPDFAllDetails.residentialAddress;
      this.familyDetailsRecord.residentialPIN = this.candidateJoiningFormPDFAllDetails.residentialPin;
      this.familyDetailsRecord.permanentAdress = this.candidateJoiningFormPDFAllDetails.permanentAddress;
      this.familyDetailsRecord.permanentPIN = this.candidateJoiningFormPDFAllDetails.permanentPin;
      this.familyDetailsRecord.email = this.candidateJoiningFormPDFAllDetails.emailId;
      this.familyDetailsRecord.mobile = this.candidateJoiningFormPDFAllDetails.phoneNo;
      this.familyDetailsRecord.signatureDate = this.candidateJoiningFormPDFAllDetails.signatureDate;
      if (this.candidateJoiningFormPDFAllDetails.familyDetail.length > 0) {
        this.candidateJoiningFormPDFAllDetails.familyDetail.forEach((element, index) => {
          let familyDetailsObj = {
            memberName: element.familyName,
            relationwithEmployee: element.familyRelationShipName,
            memberDOB: element.familyDOB
          }
          this.familyDetailsRecord.familyMemberList.push(familyDetailsObj);
          // console.log("Index", index);
          // if (this.candidateJoiningFormPDFAllDetails.familyDetail.length == index + 1) {

          // }
        })
      }
      this.familyDetailsData = this.familyDetailsRecord;
      // console.log("Family Details Record", this.familyDetailsRecord);
    }
  }

  prepareAccidentPolicyDataForPDF() {
    if (this.candidateJoiningFormPDFAllDetails != null) {
      this.accidentInsurancePolicyRecord.accidentPolicyHolderName = this.candidateJoiningFormPDFAllDetails.accidentalPolicyHolderName;
      this.accidentInsurancePolicyRecord.accidentPolicyNomineeName = this.candidateJoiningFormPDFAllDetails.accidentalPolicyNominee;
      this.accidentInsurancePolicyRecord.accidentPolicyNomineeAddress = this.candidateJoiningFormPDFAllDetails.accidentalPolicyNomineeAddress;
      this.accidentInsurancePolicyRecord.accidentPolicyRelationShipName = this.candidateJoiningFormPDFAllDetails.accidentalPolicyRelationShipName;
      this.accidentInsurancePolicyData = this.accidentInsurancePolicyRecord;
      // console.log("Accident Policy Nominee", this.accidentInsurancePolicyRecord);
    }
  }
  prepareJoiningReportDataForPDF() {
    if (this.candidateJoiningFormPDFAllDetails != null) {
      this.joiningReportRecord.candidateName = this.candidateJoiningFormPDFAllDetails.fullName;
      this.joiningReportRecord.employeeNo = this.candidateJoiningFormPDFAllDetails.employeeNo;
      this.joiningReportRecord.grade = this.candidateJoiningFormPDFAllDetails.grade;
      this.joiningReportRecord.location = this.candidateJoiningFormPDFAllDetails.location;
      this.joiningReportRecord.department = this.candidateJoiningFormPDFAllDetails.designatedPersonDepartment;
      // this.joiningReportRecord.probation=this.candidateJoiningFormPDFAllDetails.probation;
      this.joiningReportRecord.date = this.candidateJoiningFormPDFAllDetails.joiningLetterDate;
      this.joiningReportRecord.joiningDate = this.candidateJoiningFormPDFAllDetails.joiningDate;
      //this.joiningReportRecord.probation = this.candidateJoiningFormPDFAllDetails.probation;
      this.joiningReportRecord.designation = this.candidateJoiningFormPDFAllDetails.designation;
      this.joiningReportData = this.joiningReportRecord;
      // console.log("Joinig Report Form DATA for PDF", this.joiningReportData);

    }
  }
  prepareSEBIDisclosureForPDF() {
    if (this.candidateJoiningFormPDFAllDetails != null) {
      this.SEBIDisclosureRecord.designatedPersonName = this.candidateJoiningFormPDFAllDetails.designatedPersonName;
      this.SEBIDisclosureRecord.designatedPersonEmployeeNo = this.candidateJoiningFormPDFAllDetails.designatedPersonEmployeeNo;
      this.SEBIDisclosureRecord.designatedPersonDesignation = this.candidateJoiningFormPDFAllDetails.designatedPersonDesignation;
      this.SEBIDisclosureRecord.designatedPersonDepartment = this.candidateJoiningFormPDFAllDetails.designatedPersonDepartment;
      this.SEBIDisclosureRecord.designatedPersonPAN = this.candidateJoiningFormPDFAllDetails.designatedPersonPAN;
      this.SEBIDisclosureRecord.designatedPersonMobile = this.candidateJoiningFormPDFAllDetails.designatedPersonMobileNo;
      this.SEBIDisclosureRecord.designatedPersonInstitute = this.candidateJoiningFormPDFAllDetails.designatedPersonInstitute;
      this.SEBIDisclosureRecord.designatedPersonPastEmployer = this.candidateJoiningFormPDFAllDetails.designatedPersonPastEmployer;
      this.SEBIDisclosureRecord.designatedPersonNoOfSecurityHeld = this.candidateJoiningFormPDFAllDetails.designatedPersonNoofSecurity;
      this.SEBIDisclosureRecord.currentDate = this.candidateJoiningFormPDFAllDetails.date;
      this.SEBIDisclosureRecord.financialRelationshipName = this.candidateJoiningFormPDFAllDetails.financialRelationshipName;
      this.SEBIDisclosureRecord.financialRelationshipPAN = this.candidateJoiningFormPDFAllDetails.financialRelationshipPAN;
      this.SEBIDisclosureRecord.financialRelationshipMobileNo = this.candidateJoiningFormPDFAllDetails.financialRelationshipMobileNo;
      this.SEBIDisclosureRecord.signatureDate = this.candidateJoiningFormPDFAllDetails.signatureDate;
      this.SEBIDisclosureRecord.signaturePlace = this.candidateJoiningFormPDFAllDetails.signaturePlace;

      if (this.candidateJoiningFormPDFAllDetails.immediateRelativeDetail.length > 0) {
        this.candidateJoiningFormPDFAllDetails.immediateRelativeDetail.forEach(element => {
          let obj = {
            immediateRelativesName: element.immediateRelativesName,
            immediateRelativesPAN: element.immediateRelativesPAN,
            iImmediateRelativesPhone: element.immediateRelativesPhone == null ? "" : element.immediateRelativesPhone,
            immediateRelativesNoofSecurity: element.immediateRelativesNoofSecurity
          }
          this.SEBIDisclosureRecord.immediateRelatives.push(obj);
        })
      }
      this.SEBIDisclosureData = this.SEBIDisclosureRecord;
      // console.log("SEBI Disclosure", this.SEBIDisclosureRecord);

    }
  }
  downLoadPDF(type: any) {
    var fileName;
    switch (type) {
      case 21:
        var htmlstring = document.getElementById("printFamilyDetailsDiv").innerHTML;
        fileName = "Family_Details.pdf"
        break;
      case 23:
        var htmlstring = document.getElementById("printJoiningReport").innerHTML;
        fileName = "Joining_Report.pdf"
        break;
      case 22:
        var htmlstring = document.getElementById("printAccidentInsurancePolicy").innerHTML;
        fileName = "Accident_Insurance_Policy.pdf"
        break;
      case 17:
        var htmlstring = document.getElementById("printSEBIDisclosure").innerHTML;
        fileName = "SEBI_Disclosure.pdf"
        break;
    }
    var dom = document.createElement('div');
    dom.innerHTML = htmlstring;
    html2pdf(dom, {
      margin: 10,
      filename: fileName,
      // image: { type: 'jpeg', quality: 0.98 },
      image: { type: 'jpeg', quality: 0.98 },
      // html2canvas: { scale: 3, y: 0, scrollY: 0 },
      html2canvas: { scale: 2, y: 2, scrollY: 0 },
      jsPDF: { format: 'A4', orientation: 'landscape' },
    });
  }
  onclickDownloadAll() {
    this.SpinnerService.show();
    var downloadZipFileArr = [];
    this.zipFileName = this.candidateId + "_Document_Details";
    let obj = {
      // FileName: "",
      // EmpNo: data.EmpNo.toString()
      OfferDocumentCollectionId: null,
      RequsitaionDetailsId: this.requisitionDetailId,
      CandidateId: this.candidateId,
    };
    //downloadZipFileArr.push(obj);    
    this.documentService.downloadFile(obj).subscribe(
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
