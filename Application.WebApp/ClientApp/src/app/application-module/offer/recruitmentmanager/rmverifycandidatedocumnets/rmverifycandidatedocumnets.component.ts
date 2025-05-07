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
  IAttachedDocument, IAttachedDocumentArrayList, IOfferDocumentRemarksDetails, IOfferDocumentAttachmentDetailsForRM,
  IAttachmentApprovalData, ISubmittedAttachedDocumentArrayList, ICandidateOfferDocumentRM
} from '../../../../interfaces/offer/candidatedocument.interface'
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

import {
  ICandidateProfile, ISearchCandidateProfile, ICandidateFamilyDetails,
  ICandidateMRFRelatives, ICandidateTyreRelatives, ICandidateAcademicDetails, ICandidateCertificationDetails,
  ICandidateMembershipDetails, ICandidateExtraCarricularActivitiesDetails, ICandidateLanguageKnownDetails,
  ICandidatePeviousAssignmentDetails
} from '../../../../interfaces/candidate/candidateprofile.interface';
import { ISearchOfferLetter, IOfferLetterHeader, IOfferLetterSalaryTemplate } from '../../../../interfaces/offer/offerletter.interface'
import { OfferletterService } from '../../../../services/offer/offerletter/offerletter.service';
import {
  ISearchInterviewCalendarAssessment, IInterviewCalendarAssessmentList,
  IInterviewCalendarAssessmentListData, IInterviewCalendarAssessmentFormData, IInterviewAssesmentRecord
} from '../../../../interfaces/selection/interviewcalendaraction.interface';
import { InterviewcalendaractionService } from '../../../../services/selection/interviewcalendaraction/interviewcalendaraction.service';
import { ICandidateSalaryFitmentSalaryDetails, ICandidateSalaryFitmentSalaryDetailsFormat, ISalaryFitmentExperience, ISearchSalaryFitment } from '../../../../interfaces/offer/candidatesalaryfitment.interface';
import { ISalaryTemplateDetails } from '../../../../interfaces/common/paystructure.interface';
import { SalaryfitmentService } from '../../../../services/offer/salaryfitment/salaryfitment.service';
import { isNullOrUndefined } from 'util';
import { Observable, Observer } from 'rxjs';
import { LocationService } from 'src/app/services/common/location/location.service';
declare var jQuery: any;
declare var html2pdf: any;

@Component({
  selector: 'app-rmverifycandidatedocumnets',
  templateUrl: './rmverifycandidatedocumnets.component.html',
  styleUrls: ['./rmverifycandidatedocumnets.component.css']
})
export class RmverifycandidatedocumnetsComponent implements OnInit {
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  testResults: ITestResult[] = [];
  searchTestResult: ISearchTestResult = {
    requisitionDetailId: null,
    candidateId: null
  }

  candidates: ICandidateDetailData[] = [];

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

  //documentData: ICandidateOfferDocument;
  documentData: ICandidateOfferDocumentRM;  // Added By anif on 08-12-2022
  documentDataForSalaryFitmentDownload: ICandidateOfferDocument; // Added by Anif behalf of piu for salary fitment download on 08-08-2022 as same ref replacing othe data
  searchDocument: ISearchCandidateOfferDocument = {
    offerDocumentCollectionId: null,
    candidateId: null,
    requsitaionDetailsId: null
  };
  autoUserId: number;
  //attachedSubmittedDocumentArrayList: IOfferDocumentAttachmentDetails[] = [];
  //attachedSubmittedDocumentArrayList: IOfferDocumentAttachmentDetailsForRM[] = [];
  attachedSubmittedDocumentArrayList: any[] = [];
  submittedDocumentArrayList: any[] = [];
  submittedSalaryRemarksDetails: IOfferDocumentRemarksDetails[] = [];
  submittedAdditionalRemarksDetails: IOfferDocumentRemarksDetails[] = [];

  monthlyTotal: number;
  yearlyTotal: number;
  monthlyTotalForSalfitment: number;
  yearlyTotalForSalfitment: number;

  updatedSalary: IPreviousSalaryDetails[] = [];
  updatedAttachment: IAttachmentApprovalData[] = [];
  updatedRemarks: IOfferDocumentRemarksDetails[] = [];
  salaryRemarks: string;
  additionalRemarks: string;
  //additionalAttachment: IOfferDocumentAttachmentDetails[] = [];
  additionalAttachment: IOfferDocumentAttachmentDetailsForRM[] = [];

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
  roleIds: string;
  verifiedStatus: boolean = false;
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

  enableModifyForMed: boolean = false;

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
  // Application Form PDF
  applicationFormData: any;
  candidateProfile: ICandidateProfile;
  searchCandidateProfile: ISearchCandidateProfile = {
    candidateId: null,
    candidateProfileId: null,
    requisitionDetailId: null
  }
  // Offer Letter PDF
  offerLetterHTML: string = "";
  offerLetterHeader: IOfferLetterHeader;
  searchOfferLetter: ISearchOfferLetter = {
    offerLetterId: null,
    candidateId: null,
    requsitaionDetailsId: null,
  }
  // Assessment PDF
  assessmentData: any;
  assessmentList: IInterviewCalendarAssessmentList[] = [];
  assessmentArray: IInterviewCalendarAssessmentListData[] = [];
  searchAssessmentList: ISearchInterviewCalendarAssessment = {
    CalendarIds: null,
    CandidateId: null,
    RequisitionDetailId: null,
  }
  assessmentRecords: IInterviewAssesmentRecord[] = [];
  salaryFitmentDataForPDF = {
    existing: [],
    new: [],
    exp: [],
    percent: 0,
    in: 0,
    basic: 0,
    designation: '',
    probation: '',
    location: '',
    grade: '',
    candidateFullName: ''

  }
  finalBasic: number;
  finalCTC: number;
  percentBasic: number;
  percentCTC: number;
  oldBasic: number;
  oldCTC: number;
  searchSalaryFitment: ISearchSalaryFitment = {
    salaryFitmentId: null,
    requsitaionDetailsId: null,
    candidateId: null
  }
  salaryFitmentRemarks: any[] = [];
  salaryFitmentId: number = 0;
  salaryFitmentExperience: ISalaryFitmentExperience[] = [];
  attachedSubmittedDocumentArrayListForSalaryFitment: IOfferDocumentAttachmentDetails[] = [];
  candidateSalaryFitmentDetails: ICandidateSalaryFitmentSalaryDetails[] = [];
  searchSalaryTemplateDetails: ISalaryTemplateDetails[];
  savedSalaryData: any;
  candidateSalaryFitmentSalaryDetailsFormat: ICandidateSalaryFitmentSalaryDetailsFormat[] = [];
  searchAdditionDetailsForSalaryFitment = {
    candidateId: null,
    requisitionDetailId: null
  }
  additionalDeatails: any[] = [];
  ourOffer: number;
  roleArr: any[] = [];   // Added By Anif on 08-12-2022
  //14-07-2023
  availableDocumentNameIds: any[] = [];
  candidateName: string;
  candidateNo: string;
  constructor(
    private _route: Router,
    private SpinnerService: NgxSpinnerService,
    private candidateService: CandidateService,
    private requisitionService: RequisitionService,
    private persistance: PersistanceService, private offerLetterService: OfferletterService,
    private notificationService: NotificationService, private interActionService: InterviewcalendaractionService,
    private toasterService: ToastrService,
    private testScheduleService: TestscheduleService,
    private salaryFitmentService: SalaryfitmentService,
    private documentService: CandidateofferdocumentService,
    private attachmentDocumentService: AttachmentdocumentService,
    private locationService: LocationService,
  ) {
    this.verifiedStatus = false;
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.roleIds = this.persistance.get('loggedinuser').roleIds;
    var roleArr = this.roleIds.split(",");
    this.roleArr = this.roleIds.split(",");   // Added By Anif on 08-12-2022
    for (var i = 0; i < roleArr.length; i++) {
      if (roleArr[i] == "2" || roleArr[i] == "3" || roleArr[i] == "4") {
        this.verifiedStatus = true;
      }
    }
    if (this.persistance.get('pagename') != null || this.persistance.get('nextpagename') != null) {
      if ((this.persistance.get('pagename') == "rmcandidatelist" || this.persistance.get('pagename') == "rocandidatelist") && this.persistance.get('nextpagename') == "candidatedocuments") {
        this.candidateId = this.persistance.get('candidateId');
        this.candidateName = this.persistance.get('candidateName');
        this.candidateNo = this.persistance.get('candidateNo');
        this.requisitionDetailId = this.persistance.get('paramid');
        this.getCandidateList();
        this.getTestReult();
        this.getAllDocumentType();
        this.getAllDocumentParticulars();
        this.getAllDocumentName();
        this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
        this.getCandidateOfferDocument();
        this.getAllJoiningFormDetailsForPDF();
        this.getCandidateOfferDocumentForSalaryFitmentDownload();
        this.getCandidateProfile();
        this.getOfferLetterHeader();
        this.getAssessmentList();
        this.getSalaryFiltmentList();
        //this.getAdditionDetailsForSalaryFitment();  // Not requird removed by anif on 08-08-2022

      } else {
        this._route.navigate(['/app/my-action/all-positions/candidate-list']);
      }
    }
    else {
      this._route.navigate(['/app/my-action/all-positions/candidate-list']);
    }
  }

  ngOnInit() {

  }

  getAllDocumentType() {
    //this.documentTypes=[];
    this.attachmentDocumentService.getAllDocumentType(this.searchDocumentType).subscribe((result) => {
      if (result) {
        this.documentTypes = result;
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
    // 14-07-2023 start
    this.availableDocumentNameIds = [];
    if (this.attachedSubmittedDocumentArrayList.length > 0) {
      this.attachedSubmittedDocumentArrayList.forEach(element => {
        this.availableDocumentNameIds.push({ docNameId: element.doumentNameId });
      })
    }
    // 14-07-2023 end
  }

  changeDocumentParticular(evt) {
    this.selectedDocumentName = undefined;
    this.documentNameList = this.documentNames.filter(x => x.attachmentDocumentParticularId == evt);
    // Removed all the Document those are already available in the list 14-07-2023 start
    this.availableDocumentNameIds.forEach(doc_element => {
      this.documentNameList.forEach((element, index) => {
        if (doc_element.docNameId == element.attachmentDocumentNameId) {
          this.documentNameList.splice(index, 1);
        }
      })
    })
    // 14-07-2023 end
  }

  getCandidateOfferDocument() {
    this.documentData = null;
    this.searchDocument.candidateId = this.candidateId;
    this.searchDocument.requsitaionDetailsId = this.requisitionDetailId;
    this.documentService.getCandidateOfferDocument(this.searchDocument).subscribe((result) => {
      if (result) {
        this.documentData = result;
        this.attachedSubmittedDocumentArrayList = this.documentData.attachmentDetails;
        this.attachedSubmittedDocumentArrayList = this.attachedSubmittedDocumentArrayList.filter(e => e.documentPath != "NOT AVAILABLE");
        this.groupSubmittedAttachedDocument();
        this.submittedSalaryRemarksDetails = this.documentData.remaksDetails.filter(x => x.remarksType == 1);
        this.submittedAdditionalRemarksDetails = this.documentData.remaksDetails.filter(x => x.remarksType == 2);
        this.getMonthlyTotal();
        this.getYearlyTotal();
        this.salaryRemarks = "";
        this.additionalRemarks = "";
        this.addDummyToSalaryDetails();

      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }


  // Added by anifur on 17-06-2022 as they required to add new component to salary structutre
  addDummyToSalaryDetails() {
    let salaryObj = {
      offerDocumentCollectionSalaryId: null,
      offerDocumentCollectionId: this.documentData.offerDocumentCollectionId,
      emolumntId: null,
      emolumntName: "",
      monthly: 0,
      yerly: 0,
      emolumntVerifyStatus: 1,
      emolumntVerifyRemarks: "",
      createdBy: this.createdBy,
      isNewlyAdded: true
    }
    this.documentData.salaryDetails.push(salaryObj);
  }
  onClickAdd(data) {
    var falg = 0;
    var msg = "";
    if (data.emolumntName == "") {
      falg = 1;
      msg = "Please Enter Emoluments Name"
    }
    if (falg == 0) {
      data.isNewlyAdded = false;
      let salaryObj = {
        offerDocumentCollectionSalaryId: null,
        offerDocumentCollectionId: this.documentData.offerDocumentCollectionId,
        emolumntId: null,
        emolumntName: "",
        monthly: 0,
        yerly: 0,
        emolumntVerifyStatus: 1,
        emolumntVerifyRemarks: "",
        createdBy: this.createdBy,
        isNewlyAdded: true
      }
      this.documentData.salaryDetails.push(salaryObj);
    } else {
      this.notificationService.showError(msg, "Error");
    }
  }

  // Till this
  groupSubmittedAttachedDocument() {
    // Added on 07/03/2022
    this.attachedSubmittedDocumentArrayList.forEach(element => {
      element.disabledField = true;
    })
    // -- Till this

    this.submittedDocumentArrayList = [];
    for (var i = 0; i < this.attachedSubmittedDocumentArrayList.length; i++) {
      var nflag = 0;
      for (var j = 0; j < this.submittedDocumentArrayList.length; j++) {
        if (this.attachedSubmittedDocumentArrayList[i].doumentType == this.submittedDocumentArrayList[j].doumentType) {
          nflag = 1;
        }
      }

      // Added on 07/03/2022
      var canEditRoleId = this.attachedSubmittedDocumentArrayList[i].roleId.split(",");
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
    if (this.persistance.get('pagename') == "rmcandidatelist") {
      this.persistance.set('pagename', "rmrequisitionlist");
      this.persistance.set('nextpagename', null);
      this.persistance.set('previouspageparams', this.persistance.get('previouspagefilter'));
      this.persistance.set('tabledisplayStartcandi', this.persistance.get('tabledisplayStartcandi'));
      this._route.navigate(['/app/my-action/all-positions/candidate-list']);
    }
    else {
      // this.persistance.set('pagename', "rorequisitionlist");         // Previous
      this.persistance.set('pagename', "recruitmentownercandidatelist"); // Adde by Anif on 14-07-2022 (on back click candiadte list not fetching)
      this.persistance.set('nextpagename', null);
      this.persistance.set('tabledisplayStartcandi', this.persistance.get('tabledisplayStartcandi'));
      this._route.navigate(['/app/requisition/all-positions/candidate-list']);
    }
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
  getMonthlyTotalForSalaryFitmentDownload() {
    this.monthlyTotalForSalfitment = 0;
    for (var i = 0; i < this.documentDataForSalaryFitmentDownload.salaryDetails.length; i++) {
      this.monthlyTotalForSalfitment = this.monthlyTotalForSalfitment + this.documentDataForSalaryFitmentDownload.salaryDetails[i].monthly;
    }
  }

  getYearlyTotal() {
    this.yearlyTotal = 0;
    for (var i = 0; i < this.documentData.salaryDetails.length; i++) {
      this.yearlyTotal = this.yearlyTotal + this.documentData.salaryDetails[i].yerly;
    }
    this.oldCTC = this.yearlyTotal;
  }
  getYearlyTotalForSalaryFitmentDownload() {
    this.yearlyTotalForSalfitment = 0;
    for (var i = 0; i < this.documentDataForSalaryFitmentDownload.salaryDetails.length; i++) {
      this.yearlyTotalForSalfitment = this.yearlyTotalForSalfitment + this.documentDataForSalaryFitmentDownload.salaryDetails[i].yerly;
    }
    this.oldCTC = this.yearlyTotalForSalfitment;
  }

  removeSalaryHead(id, i) {
    //this.documentData.salaryDetails = this.documentData.salaryDetails.filter(x => x.offerDocumentCollectionSalaryId != id); // previously
    // Added by ani on 17-06-2022
    this.documentData.salaryDetails.forEach((element, index) => {
      if (element.offerDocumentCollectionSalaryId == id && index == i) {
        this.documentData.salaryDetails.splice(index, 1)
      }
    })
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
        roleId: "", // Added Anif on 08-12-2022
        disabledField: false, // Added Anif 08-12-2022
        createdBy: this.autoUserId,
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
      for (var values of this.submittedDocumentArrayList) {
        for (var document of values.documents) {
          if (document.isUploaded && document.offerDocumentCollectionDocumentId > 0) {
            this.documentNames = this.documentNames.filter(e => e.attachmentDocumentNameId != document.doumentNameId)
          }
        }
      }
    }
    else {
      this.isAdditionalDocumentReq = false;
    }
  }

  changeMonthlySalary(evt, id, arrIndex) {
    this.monthlyTotal = 0;
    this.yearlyTotal = 0;
    var yearlyVal = evt * 12;
    this.updateData(1, yearlyVal, id, arrIndex);
    for (var i = 0; i < this.documentData.salaryDetails.length; i++) {
      this.monthlyTotal += Number(this.documentData.salaryDetails[i].monthly);
      this.yearlyTotal += Number(this.documentData.salaryDetails[i].yerly);
    }
  }

  changeYearlySalary(evt, id, arrIndex) {
    this.monthlyTotal = 0;
    this.yearlyTotal = 0;
    var monthlyVal = evt / 12;
    this.updateData(2, monthlyVal.toFixed(0), id, arrIndex);
    for (var i = 0; i < this.documentData.salaryDetails.length; i++) {
      this.monthlyTotal += Number(this.documentData.salaryDetails[i].monthly);
      this.yearlyTotal += Number(this.documentData.salaryDetails[i].yerly);
    }
  }

  updateData(type, valData, id, arrIndex) {
    if (type == 1) {
      // this.documentData.salaryDetails.filter(x => x.offerDocumentCollectionSalaryId == id)[0].yerly = valData;
      this.documentData.salaryDetails[arrIndex].yerly = valData;
    }
    else {
      //this.documentData.salaryDetails.filter(x => x.offerDocumentCollectionSalaryId == id)[0].monthly = valData;
      this.documentData.salaryDetails[arrIndex].monthly = valData;
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
    if (flag == 3) {
      //if (flag == 3) {
      this.notificationService.showError("Please check salary details", "Error");
    }
    // else if (flag == 2) {
    //   this.notificationService.showError("Please check document details", "Error");
    // }
    else {
      for (var i = 0; i < this.documentData.salaryDetails.length; i++) {
        if (this.documentData.salaryDetails[i].emolumntName != "") {
          this.updatedSalary.push({
            offerDocumentCollectionSalaryId: this.documentData.salaryDetails[i].offerDocumentCollectionSalaryId,
            offerDocumentCollectionId: this.documentData.salaryDetails[i].offerDocumentCollectionId,
            emolumntId: this.documentData.salaryDetails[i].emolumntId,
            emolumntName: this.documentData.salaryDetails[i].emolumntName,
            monthly: this.documentData.salaryDetails[i].monthly,
            yerly: this.documentData.salaryDetails[i].yerly,
            emolumntVerifyStatus: this.documentData.salaryDetails[i].emolumntVerifyStatus == 4 ? 3 : this.documentData.salaryDetails[i].emolumntVerifyStatus,
            emolumntVerifyRemarks: this.documentData.salaryDetails[i].emolumntVerifyRemarks,
            createdBy: this.autoUserId
          })
        }
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
            approvalStatus: this.submittedDocumentArrayList[i].documents[j].approvalStatus == 4 ? 3 : this.submittedDocumentArrayList[i].documents[j].approvalStatus,
            approvalRemarks: this.submittedDocumentArrayList[i].documents[j].approvalRemarks,
            createdBy: this.autoUserId,
            isAdditional: false  // Added By Anif 0n 07-12-2022
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
          isAdditional: true    // Added By Anif 0n 07-12-2022
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
      this.SpinnerService.show();
      const formData = new FormData();
      formData.append("CandidateId", this.candidateId.toString());
      // formData.append("CandidateName", this.candidateName.toString());
      // formData.append("CandidateNo", this.candidateNo.toString());
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
      this.enableModifyForMed == true ? formData.append("IsEnabledForMed", "true") : formData.append("IsEnabledForMed", "false"); //added by Amartya
      this.documentService.approveCandidateOfferDocument(formData).subscribe((result) => {
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


  // Assessment PDF

  getAssessmentList() {
    this.SpinnerService.show();
    this.assessmentList = [];
    var interviewNames: any[] = [];
    this.searchAssessmentList.CandidateId = this.candidateId;
    this.searchAssessmentList.RequisitionDetailId = this.requisitionDetailId;
    this.interActionService.getInterviewCalendarAssessmentList(this.searchAssessmentList).subscribe((result) => {
      if (result) {
        this.assessmentList = result;
        //this.assessmentList=this.assessmentList.filter(x=>x.overallScore>0);

        for (var i = 0; i < this.assessmentList.length; i++) {
          //var count=this.interviewClarificationList.filter(x=>x.calendarId==this.interClarifications[i].calendarId).length;
          var flag = 0;
          for (var j = 0; j < interviewNames.length; j++) {
            if (interviewNames[j] == this.assessmentList[i].interviewName) {
              flag = 1;
            }
          }
          if (flag == 0) {
            interviewNames.push(this.assessmentList[i].interviewName);
          }
        }
        this.assessmentRecords = [];
        for (var i = 0; i < interviewNames.length; i++) {
          var listdata = this.assessmentList.filter(x => x.interviewName == interviewNames[i]);

          this.assessmentRecords.push({
            interviewName: interviewNames[i],
            fullName: this.assessmentList[0].fullName,
            positionName: this.assessmentList[0].positionName,
            assessmentList: listdata,
            interviewDate: this.assessmentList[0].interviewDate,
          }
          )
        }
        // this.fileName=this.assessmentList[0].candidateNo+"_InterviewAssessment.pdf";
        this.assessmentData = this.assessmentRecords;

        // this.fullName = this.assessmentList[0].fullName;
        // this.positionName = this.assessmentList[0].positionName;
        // this.interviewDate = this.assessmentList[0].interviewDate;
      }
      else {
        this.assessmentList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }
  // Offer letter PDF
  getOfferLetterHeader() {
    this.SpinnerService.show();
    this.offerLetterHeader = null;
    this.searchOfferLetter.candidateId = this.candidateId;
    this.offerLetterService.getOfferLetter(this.searchOfferLetter).subscribe((response: any) => {
      if (response) {
        this.offerLetterHeader = response;
        this.offerLetterHTML = this.offerLetterHeader.templateDetails;
        // this.Acceptance=this.offerLetterHeader.accepted;
        // this.offerAcceptance=this.Acceptance;
      }
      else {
        this.offerLetterHeader = null;
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    })
  }
  // Application Form PDF  
  getCandidateProfile() {
    this.candidateProfile = null;
    this.searchCandidateProfile.candidateId = this.candidateId;
    this.searchCandidateProfile.requisitionDetailId = this.requisitionDetailId;
    this.candidateService.getCandidateProfile(this.searchCandidateProfile).subscribe((result) => {
      if (result) {

        this.candidateProfile = result;
        this.applicationFormData = this.candidateProfile;
        this.convertBase64CandidatePhoto(this.candidateProfile.candiadatePhoto)
        this.convertBase64CandidateSignature(this.candidateProfile.signature)
        // this.fileName=this.candidateProfile.candidateId.toString()+"_ApplicationForm.pdf";
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }
  convertBase64CandidatePhoto(imageUrl: string) {
    this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
      this.applicationFormData.candiadatePhoto = base64Data;
    });
  }
  convertBase64CandidateSignature(imageUrl: string) {
    this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
      this.applicationFormData.signature = base64Data;
    });
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
  getAllJoiningFormDetailsForPDF() {
    this.searchJoiningForm.candidateId = this.candidateId;
    this.candidateService.getAllCandidateJoinigFormDetails(this.searchJoiningForm).subscribe((result) => {
      if (result) {
        this.candidateJoiningFormPDFAllDetails = result;
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
        })
      }
      this.familyDetailsData = this.familyDetailsRecord;
    }
  }

  prepareAccidentPolicyDataForPDF() {
    if (this.candidateJoiningFormPDFAllDetails != null) {
      this.accidentInsurancePolicyRecord.accidentPolicyHolderName = this.candidateJoiningFormPDFAllDetails.accidentalPolicyHolderName;
      this.accidentInsurancePolicyRecord.accidentPolicyNomineeName = this.candidateJoiningFormPDFAllDetails.accidentalPolicyNominee;
      this.accidentInsurancePolicyRecord.accidentPolicyNomineeAddress = this.candidateJoiningFormPDFAllDetails.accidentalPolicyNomineeAddress;
      this.accidentInsurancePolicyRecord.accidentPolicyRelationShipName = this.candidateJoiningFormPDFAllDetails.accidentalPolicyRelationShipName;
      this.accidentInsurancePolicyData = this.accidentInsurancePolicyRecord;
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

    }
  }
  getCandidateOfferDocumentForSalaryFitmentDownload() {
    this.documentDataForSalaryFitmentDownload = null;
    this.searchDocument.candidateId = this.candidateId;
    this.documentService.getCandidateOfferDocument(this.searchDocument).subscribe((result) => {
      if (result) {
        this.documentDataForSalaryFitmentDownload = result;
        this.attachedSubmittedDocumentArrayListForSalaryFitment = this.documentDataForSalaryFitmentDownload.attachmentDetails.filter(x => x.doumentNameId != 28 && x.doumentNameId != 29);
        this.salaryFitmentDataForPDF.existing = this.documentDataForSalaryFitmentDownload.salaryDetails;
        // this.groupSubmittedAttachedDocument();   // Removed By Anif on 08-08-2022 as not requird
        this.submittedSalaryRemarksDetails = this.documentDataForSalaryFitmentDownload.remaksDetails.filter(x => x.remarksType == 1);
        this.submittedAdditionalRemarksDetails = this.documentDataForSalaryFitmentDownload.remaksDetails.filter(x => x.remarksType == 2);
        this.getMonthlyTotalForSalaryFitmentDownload();
        this.getYearlyTotalForSalaryFitmentDownload();
        this.salaryRemarks = "";
        this.additionalRemarks = "";
        if (this.documentDataForSalaryFitmentDownload.salaryDetails.length > 0) {
          // added by anif on 25-06-202 as if no basic emolumntname then filter given undefined error
          var checkBasic = this.documentDataForSalaryFitmentDownload.salaryDetails.find(x => x.emolumntName.toLowerCase() == 'basic');
          if (checkBasic != undefined) {
            this.oldBasic = this.documentDataForSalaryFitmentDownload.salaryDetails.filter(x => x.emolumntName.toLowerCase() == 'basic')[0].yerly;
          }
        }
        else {
          this.oldBasic = 0;
          this.oldCTC = 0;
        }
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }
  getSalaryFiltmentList() {
    this.salaryFitmentId = 0;
    this.searchSalaryFitment.candidateId = this.candidateId;
    this.searchSalaryFitment.requsitaionDetailsId = this.requisitionDetailId;
    this.salaryFitmentService.getSalaryFitment(this.searchSalaryFitment).subscribe((response: any) => {
      if (response) {
        this.savedSalaryData = response;
        //this.savedSalaryDataDup = JSON.parse(JSON.stringify(response));  
        this.salaryFitmentDataForPDF.exp = response.salaryFitmentExperience;

        // if (this.savedSalaryData.salaryFitmentDetails.length > 0) {  // Previous
        //   this.salaryFitmentDataForPDF.new = this.savedSalaryData.salaryFitmentDetails[0].salaryFitmentSalaryDetailsFormat;
        // }

        // Added by ani on 14-07-2022 to download only accepeted salary

        this.savedSalaryData.salaryFitmentDetails.forEach((ele, index) => {
          if (index == (this.savedSalaryData.salaryFitmentDetails.length - 1)) {
            this.salaryFitmentDataForPDF.new = ele.salaryFitmentSalaryDetailsFormat;
          }
        })
        //this.selectedCandidateDesignationId=this.savedSalaryData.salaryFitmentDetails[0].designation;
        if (!isNullOrUndefined(this.savedSalaryData.salaryFitmentDetails[0])) {
          //this.selectedCandidateDesignationText = this.savedSalaryData.salaryFitmentDetails[0].designationName;
          //this.selectedCandidateLocationId = this.savedSalaryData.salaryFitmentDetails[0].location;
          //this.selectedCandidateProbationIdId = this.savedSalaryData.salaryFitmentDetails[0].probation;
          //this.selectedGradeId = this.savedSalaryData.salaFitmentDetails[0].grade;
          for (var i = 0; i < this.savedSalaryData.salaryFitmentDetails.length; i++) {
            if (i == this.savedSalaryData.salaryFitmentDetails.length - 1) {
              // this.selectedCandidateDesignationText = this.savedSalaryData.salaryFitmentDetails[i].designationName;
              // this.selectedCandidateLocationId = this.savedSalaryData.salaryFitmentDetails[i].location;
              // this.selectedCandidateProbationIdId = this.savedSalaryData.salaryFitmentDetails[i].probation;
              // this.gradeName = this.savedSalaryData.salaryFitmentDetails[i].gradeName;  
              this.salaryFitmentDataForPDF.designation = this.savedSalaryData.salaryFitmentDetails[i].designationName;  // Add this line by anif 08-08-2022
              this.salaryFitmentDataForPDF.grade = this.savedSalaryData.salaryFitmentDetails[i].gradeName;
              this.salaryFitmentDataForPDF.location = this.savedSalaryData.salaryFitmentDetails[i].locationOffice;
              this.salaryFitmentDataForPDF.probation = this.savedSalaryData.salaryFitmentDetails[i].probationName;
            }
          }
          this.salaryFitmentRemarks = this.savedSalaryData.salaryFitmentRemaks;
          for (var i = 0; i < this.savedSalaryData.salaryFitmentDetails.length; i++) {
            this.salaryFitmentId = this.savedSalaryData.salaryFitmentDetails[i].salaryFitmentId;
          }
          for (var i = 0; i < this.savedSalaryData.salaryFitmentDetails.length; i++) {
            if (i == this.savedSalaryData.salaryFitmentDetails.length - 1) {   // Added this if ,By Anif On 08-08-2022 to get the lateast Sal fitment which is accepted
              this.finalBasic = this.savedSalaryData.salaryFitmentDetails[i].salaryFitmentSalaryDetailsFormat.filter(x => x.salaryAccountHeadName.toLowerCase() == 'basic')[0].calculatedSalaryValueYearly;
              this.finalCTC = this.savedSalaryData.salaryFitmentDetails[i].salaryFitmentSalaryDetailsFormat[this.savedSalaryData.salaryFitmentDetails[i].salaryFitmentSalaryDetailsFormat.length - 1].calculatedSalaryValueYearly;
            }
          }
        }

        //this.salaryFitmentDataForPDF.designation = this.selectedCandidateDesignationText;
        //var locName = this.locations.filter(x => x.locationId == this.selectedCandidateLocationId);
        //if (locName.length > 0) {
        //  this.salaryFitmentDataForPDF.location = String(locName[0].locationOffice);
        //}
        //var grade = this.gradeList.filter(x => x.gradeId == this.selectedGradeId);
        //if (this.savedSalaryData.salaryFitmentDetails[0].gradeName != undefined || this.savedSalaryData.salaryFitmentDetails[0].gradeName != '') {
        //  this.salaryFitmentDataForPDF.grade = this.savedSalaryData.salaryFitmentDetails[0].gradeName;
        //}
        //this.salaryFitmentDataForPDF.grade = this.savedSalaryData.salaryFitmentDetails[0].gradeName;
        //switch (this.selectedCandidateProbationIdId) {
        //  case 1:
        //    this.salaryFitmentDataForPDF.probation = "6 Months";
        //    break;
        //  case 2:
        //    this.salaryFitmentDataForPDF.probation = "1 Year";
        //    break;
        //  case 3:
        //    this.salaryFitmentDataForPDF.probation = "NA";
        //    break;
        //}
        if (this.oldCTC == null || this.oldCTC == undefined) {    //by Kuntal das chowdhury on 15/07/2022 
          this.oldCTC = 0;
        }
        this.ourOffer = (this.finalCTC - this.oldCTC);       //by Kuntal das chowdhury on 15/07/2022 
        this.salaryFitmentDataForPDF.percent = this.ourOffer; //by Kuntal das chowdhury on 15/07/2022 
        this.salaryFitmentDataForPDF.candidateFullName = this.savedSalaryData.candidateFullName;
        //this.getTotalYears();
        // this.percentBasic = ((this.finalBasic - this.oldBasic) / this.oldBasic) * 100;
        this.percentBasic = (this.finalBasic / this.finalCTC) * 100;          //by Kuntal das chowdhury on 15/07/2022
        this.salaryFitmentDataForPDF.basic = this.percentBasic;
        // this.percentCTC = (((this.finalCTC - this.oldCTC) / this.oldCTC) * 100);
        // this.salaryFitmentDataForPDF.in = this.percentCTC;
        this.percentCTC = (((this.finalCTC - this.oldCTC) / this.oldCTC) * 100);
        if (this.percentCTC == Infinity) {    //by Kuntal das chowdhury on 26/07/2022
          this.percentCTC = 0;
        }
        this.salaryFitmentDataForPDF.in = this.percentCTC;
        //this.salaryFitmentDataForPDF.percent = this.savedSalaryData.salaryFitmentDetails[0].
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {

      setTimeout(() => {
        //this.loadDatePickerFrom();
        //this.loadDatePickerTo();
      }, 1000);

    })
  }
  getAdditionDetailsForSalaryFitment() {
    this.searchAdditionDetailsForSalaryFitment.candidateId = this.candidateId;
    this.searchAdditionDetailsForSalaryFitment.requisitionDetailId = this.requisitionDetailId;
    this.salaryFitmentService.getSalaryFitmentListNew(this.searchAdditionDetailsForSalaryFitment).subscribe((response: any) => {
      if (response) {
        this.additionalDeatails = response;
        if (this.additionalDeatails.length > 0) {
          this.salaryFitmentDataForPDF.designation = this.additionalDeatails[0].designation;
          this.salaryFitmentDataForPDF.grade = this.additionalDeatails[0].gradeName;
          this.salaryFitmentDataForPDF.location = this.additionalDeatails[0].locationOffice;
          this.salaryFitmentDataForPDF.probation = this.additionalDeatails[0].probation;
        }
      }
      else {
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    })
  }


  downLoadPDF(type: any) {
    var fileName;
    var downloadMode = "landscape";
    var downloadSize = 10;
    switch (type) {
      case 17:
        var htmlstring = document.getElementById("printSEBIDisclosure").innerHTML;
        fileName = this.candidateId.toString() + "_SEBI_Disclosure.pdf";
        break;
      case 21:
        var htmlstring = document.getElementById("printFamilyDetailsDiv").innerHTML;
        fileName = this.candidateId.toString() + "_Family_Details.pdf";
        break;
      case 22:
        var htmlstring = document.getElementById("printAccidentInsurancePolicy").innerHTML;
        fileName = this.candidateId.toString() + "_Accident_Insurance_Policy.pdf";
        break;
      case 23:
        var htmlstring = document.getElementById("printJoiningReport").innerHTML;
        fileName = this.candidateId.toString() + "_Joining_Report.pdf";
        break;
      case 26:
        var htmlstring = document.getElementById("printerdivInterviewAssessment").innerHTML;
        fileName = this.candidateId.toString() + "_Interview_Assessment.pdf";
        break;
      //case 27:
      case 24:
        var htmlstring = document.getElementById("printerdivApplicationForm").innerHTML;
        fileName = this.candidateId.toString() + "_Application_Form.pdf";
        downloadMode = "portrait";
        downloadSize = 6;
        break;
      case 29:
        var htmlstring = this.offerLetterHTML;
        fileName = this.candidateId.toString() + "_Offer_Letter.pdf";
        downloadMode = "portrait";
        break;
      case 39:
        if (this.salaryFitmentDataForPDF.new.length < 18) {
          var htmlstring = document.getElementById("printSalaryFitmentSinglePage").innerHTML;
        } else {
          var htmlstring = document.getElementById("printSalaryFitment").innerHTML;
        }
        fileName = this.candidateId.toString() + "_Salary_Fitment.pdf";
        downloadSize = 6;
        break;
    }
    var dom = document.createElement('div');
    dom.innerHTML = htmlstring;
    html2pdf(dom, {
      downloadSize,
      filename: fileName,
      // image: { type: 'jpeg', quality: 0.98 },
      image: { type: 'jpeg', quality: 0.98 },
      // html2canvas: { scale: 3, y: 0, scrollY: 0 },
      html2canvas: { scale: 2, y: 2, scrollY: 0 },
      jsPDF: { format: 'A4', orientation: downloadMode },
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
  ngOnDestroy() {
    jQuery(".custom-menu").hide();
  }
}
