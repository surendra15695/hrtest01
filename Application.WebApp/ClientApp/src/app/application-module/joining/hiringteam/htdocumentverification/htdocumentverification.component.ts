import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
// import { ICandidateDetailData, ISearchCandidateDetail } from '../../../../interfaces/preselection/candidate.interface';
import { IRequisitionCandidateHiringStatusFormData } from '../../../../interfaces/preselection/requisition.interface';
import { RequisitionService } from '../../../../services/preselection/requisition/requisition.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { CandidateService } from '../../../../services/preselection/candidate/candidate.service';
import { NotificationService } from '../../../../sharedservices/notification.service';
// import {
//   ICandidateOfferDocument, ISearchCandidateOfferDocument, IPreviousSalaryDetails, IOfferDocumentAttachmentDetails,
//   IAttachedDocument, IAttachedDocumentArrayList, IOfferDocumentRemarksDetails,
//   IAttachmentApprovalData, ISubmittedAttachedDocumentArrayList
// } from '../../../../interfaces/offer/candidatedocument.interface'
import {
  ICandidateOfferDocument, ISearchCandidateOfferDocument, IPreviousSalaryDetails, IOfferDocumentAttachmentDetails,
  IAttachedDocument, IAttachedDocumentArrayList, IOfferDocumentRemarksDetails,
  IAttachmentApprovalData, ISubmittedAttachedDocumentArrayList
} from '../../../../interfaces/prejoining/candidatedocument.interface';
import { CandidateJoiningFormRelativeDetailData, IAccidentInsurancePolicyPDF, ICandidateDetailData, ICandidateJoiningFormDetailsForPDF, ICandidateJoiningFormFamilyDetailData, IJoiningFormFamilyDetailsPDF, IJoiningReportPDF, ISearchCandidateDetail, ISEBIDisclosurePDF } from '../../../../interfaces/preselection/candidate.interface';
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
import { DomSanitizer } from '@angular/platform-browser';
import { TwoDigitDecimaNumberLessThanHundredDirective } from 'src/app/directives/rangewithinghundred';
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
declare var jQuery: any;
declare var html2pdf: any;
import { HttpEventType } from '@angular/common/http';
import { ICandidateJoingFormFamily, ICandidateJoingFormImidiateRelatives, ICandidateJoiningFormApprovalStatus, ICandidateJoiningFormDetails, ISearchCandidateJoiningFormDetails } from 'src/app/interfaces/joining/candidate.interface';
import { IBloodGroup, ISearchBloodGroup } from 'src/app/interfaces/common/bloodgroup.interface';
import { CommonService } from '../../../../services/common/common/common.service';
import { Observable, Observer } from 'rxjs';
import { LocationService } from 'src/app/services/common/location/location.service';

@Component({
  selector: 'app-htdocumentverification',
  templateUrl: './htdocumentverification.component.html',
  styleUrls: ['./htdocumentverification.component.css']
})
export class HtdocumentverificationComponent implements OnInit {

  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  testResults: ITestResult[] = [];
  searchTestResult: ISearchTestResult = {
    requisitionDetailId: null,
    candidateId: null
  }
  zipFileName: string = "";
  candidates: ICandidateDetailData[] = [];
  createdOnForHistroy: string;
  ModifiedOnForHistory: any;
  modifiedForHistroy: any;
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
  isVisibleTakeActionbtn: boolean = false;
  testScoreVisible: boolean = false;
  takeActionButton: number;
  documentData: ICandidateOfferDocument;
  searchDocument: ISearchCandidateOfferDocument = {
    offerDocumentCollectionId: null,
    candidateId: null,
    requsitaionDetailsId: null
  };
  autoUserId: number;
  //attachedSubmittedDocumentArrayList: IOfferDocumentAttachmentDetailsNew[] = [];
  attachedSubmittedDocumentArrayList: any[] = []
  submittedDocumentArrayList: any[] = [];
  submittedSalaryRemarksDetails: IOfferDocumentRemarksDetails[] = [];
  submittedAdditionalRemarksDetails: IOfferDocumentRemarksDetails[] = [];

  monthlyTotal: number;
  yearlyTotal: number;
  isVisible: boolean;
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
  type: string;
  roleIds: string;
  roleIdList: any[] = [];
  roleArr: any[] = [];
  disabledField: boolean;
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
  @ViewChild('attachmentFileImport', { static: false }) attachmentFileImport: ElementRef;
  attachmentfileToUpload: File;
  documentTypeEdit: string;
  document_Type: string;//-----by Sayandeep
  documentParticularEdit: string;
  document_particular: string;//-----by Sayandeep
  documentNameEdit: string;
  documentapprovalremarks: string;//-----by sayandeep
  documentadditionaldocument: boolean;//-----by sayandeep
  documentNameIdEdit: number; // Adde by anif on 20-01-2023
  offerDocumentCollectionDocumentIdEdit: number;
  documentPathEdit: any = "";
  offerDocumentCollection_Id: any;//-----by sayandeep
  selectedPdf?: Blob;
  pdfURL: any;
  // Added by anif on 01-12-2022 for edit by AIC
  candidateJoiningFormDetailsList: ICandidateJoiningFormDetails;
  searchCandidateJoiningFormDetails: ISearchCandidateJoiningFormDetails = {
    candidateJoiningFormId: null,
    candidateId: null,
  }
  bloodGroups: IBloodGroup[] = [];
  searchBloodGroud: ISearchBloodGroup = {
    bloodGroupId: 0,
    isActive: true
  }
  @ViewChild('dob', { static: false }) dob: ElementRef;
  @ViewChild('fdDate', { static: false }) fdDate: ElementRef;
  @ViewChild('joiningLetterDate', { static: false }) joiningLetterDate: ElementRef;
  // @ViewChild('familydetailsDate', { static: false }) familyDate: ElementRef;
  @ViewChild('JoiningDate', { static: false }) JoiningDate: ElementRef;
  @ViewChild('familyDOB', { static: false }) familyDOB: ElementRef;
  @ViewChild('SignatureDate', { static: false }) SignatureDate: ElementRef;
  @ViewChild('attachmentFileImport', { static: false }) attachmentFileImportJoinnigForm: ElementRef;
  familyMembersDetailsArray: any[] = [];
  familyMembersDetailsArrayNew: any[] = [];
  objFamilyMembersdetails: FamilyMembersdetails;
  relationshipList: any[] = [];
  serachRelationShip = {
    RelationshipName: "",
    RelationshipId: null,
    IsActive: true,
    CreatedBy: null
  }
  objFamilyDetailsForm: FamilyDetailsForm;
  objAccidentPolicyForm: AccidentPolicyForm;
  objJoiningReportForm: JoiningReportForm;
  joiningFormFamilyDetailsUpdateList: any[] = [];
  accidentInsurancePolicyUpdateDetailsList: any[] = [];
  joiningformreportList: any[] = [];
  mrfppflist: any[] = [];
  objSEBIDisclosureForm: SEBIDisclosureForm;
  objImmediateRelativeDetails: ImmediateRelativeDetails;
  immediateRelativesArray: any[] = [];
  sebiInitialDisclosureUpdateHistoryList: any[] = [];

  // Till this by anif on 01-12-2022
  //14-07-2023
  availableDocumentNameIds: any[] = [];
  invalidFileName: boolean = false;
  candidateName: string;
  candidateNo: string;
  constructor(
    private _route: Router,
    private SpinnerService: NgxSpinnerService,
    private candidateService: CandidateService,
    private requisitionService: RequisitionService,
    private persistance: PersistanceService, private offerLetterService: OfferletterService,
    private notificationService: NotificationService,
    private toasterService: ToastrService, private interActionService: InterviewcalendaractionService,
    private testScheduleService: TestscheduleService,
    private documentService: CandidateofferdocumentService,
    private attachmentDocumentService: AttachmentdocumentService,
    private sant: DomSanitizer,
    private commonService: CommonService, private locationService: LocationService,

  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.roleIds = this.persistance.get('loggedinuser').roleIds;
    this.roleArr = this.roleIds.split(",");
    this.objFamilyMembersdetails = new FamilyMembersdetails();    // Added By anif on 01-12-2022 for edit by AIC
    this.objFamilyDetailsForm = new FamilyDetailsForm();    // Added By anif on 01-12-2022 for edit by AIC
    this.objFamilyDetailsForm.createdBy = this.createdBy;    // Added By anif on 01-12-2022 for edit by AIC
    this.objAccidentPolicyForm = new AccidentPolicyForm();    // Added By anif on 01-12-2022 for edit by AIC
    this.objAccidentPolicyForm.createdBy = this.createdBy;    // Added By anif on 01-12-2022 for edit by AIC
    this.objJoiningReportForm = new JoiningReportForm();
    this.objJoiningReportForm.createdBy = this.createdBy;
    this.objSEBIDisclosureForm = new SEBIDisclosureForm();    // Added By anif on 01-12-2022 for edit by AIC
    this.objImmediateRelativeDetails = new ImmediateRelativeDetails(); // Added By anif on 01-12-2022 for edit by AIC
    this.objSEBIDisclosureForm.createdBy = this.createdBy;    // Added By anif on 01-12-2022 for edit by AIC
    if (this.persistance.get('pagename') != null || this.persistance.get('nextpagename') != null) {
      if (this.persistance.get('pagename') == "htcandidatelist" && this.persistance.get('nextpagename') == "htverifydocument") {
        this.candidateId = this.persistance.get('candidateId');
        this.candidateName = this.persistance.get('candidateName');
        this.candidateNo = this.persistance.get('candidateNo');
        this.searchCandidateJoiningFormDetails.candidateId = Number(this.candidateId);   // Added By anif on 01-12-2022 for edit by AIC
        this.type = this.persistance.get('sendType');
        // alert(this.type)
        this.requisitionDetailId = this.persistance.get('paramid');
        // alert(this.requisitionDetailId)
        this.getCandidateList();
        this.isVisibleTakeActionbtn = false;
        this.getTestReult();
        this.getAllDocumentType();
        this.getAllDocumentParticulars();
        this.getAllDocumentName();
        this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
        this.getCandidateOfferDocument();
        this.getAllJoiningFormDetailsForPDF();
        this.getCandidateProfile();
        this.getOfferLetterHeader();
        this.getAssessmentList();
      } else {
        this._route.navigate(['/app/my-action/verifymedicaldocument']);
      }
    }
    else {
      this._route.navigate(['/app/my-action/verifymedicaldocument']);
    }
  }

  ngOnInit() {
    this.getAllBloodGroup(); // added by anif on 01-12-2022
    this.loadDatePicker(); // Added By Anif on 01-12-2022
    this.getRelationShip(); // Added By Anif on 01-12-2022
    this.candidateJoiningFormDetails();   // Added By anif on 01-12-2022 for edit by AIC

  }
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      container: '.content',
      todayHighlight: true
    });
  }

  getAllDocumentType() {
    //this.documentTypes=[];
    this.attachmentDocumentService.getAllDocumentType(this.searchDocumentType).subscribe((result) => {
      if (result) {
        this.documentTypes = result;
        //console.log(this.documentTypes);
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
        //  console.log(result);
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
        //console.log(result);
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
    debugger;
    this.documentData = null;
    this.searchDocument.candidateId = this.candidateId;
    this.searchDocument.requsitaionDetailsId = this.requisitionDetailId;
    this.documentService.getCandidateOfferDocumentForAdditional(this.searchDocument).subscribe((result) => {
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
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }

  // groupSubmittedAttachedDocument() {
  //   this.submittedDocumentArrayList = [];
  //   // Added on 07/03/2022
  //   // this.attachedSubmittedDocumentArrayList.forEach(element => {
  //   //   element.disabledField = true;
  //   // })
  //   // -- Till this
  //   for (var i = 0; i < this.attachedSubmittedDocumentArrayList.length; i++) {
  //     var nflag = 0;
  //     for (var j = 0; j < this.submittedDocumentArrayList.length; j++) {
  //       if (this.attachedSubmittedDocumentArrayList[i].doumentType == this.submittedDocumentArrayList[j].doumentType) {
  //         nflag = 1;
  //       }
  //     }
  //     // Added on 07/03/2022
  //     // var canEditRoleId = this.attachedSubmittedDocumentArrayList[i].roleId.split(",");
  //     // // console.log("canEditRoleId", canEditRoleId);
  //     // canEditRoleId.forEach((element_edit, index) => {
  //     //   this.roleArr.forEach((element_rolearr, index) => {
  //     //     if (element_edit == element_rolearr && this.attachedSubmittedDocumentArrayList[i].approvalStatus != 3) {
  //     //       this.attachedSubmittedDocumentArrayList[i].disabledField = false;
  //     //     }
  //     //   })
  //     // })
  //     // -- Till this
  //     if (nflag == 0) {
  //       this.submittedDocumentArrayList.push({
  //         doumentType: this.attachedSubmittedDocumentArrayList[i].doumentType,
  //         doumentTypName: this.attachedSubmittedDocumentArrayList[i].doumentTypName,
  //         documents: this.attachedSubmittedDocumentArrayList.filter(x => x.doumentType == this.attachedSubmittedDocumentArrayList[i].doumentType)
  //       })
  //     }
  //   }
  //   // Added from here by anif on 21-10-2022 to grouping Portal document type into prejoining & Onboarding
  //   var docList = this.submittedDocumentArrayList.filter(e => e.doumentType == 6);
  //   this.submittedDocumentArrayList = this.submittedDocumentArrayList.filter(e => e.doumentType != 6);
  //   this.submittedDocumentArrayList.forEach(element => {
  //     if (element.doumentType == 4) {
  //       element.documents.forEach(ele_doc => {
  //         docList[0].documents.push(ele_doc);
  //       })
  //       element.documents = docList[0].documents;
  //     }
  //   })
  //   console.log("Submitted Array Doc List", this.submittedDocumentArrayList);

  //   // // Till here by anif on 21-10-2022
  // }
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
      // console.log("Approval Status", this.attachedSubmittedDocumentArrayList[i].approvalStatus);
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
    // var documentList=this.submittedDocumentArrayList.filter(e => e.doumentType == 6 || e.doumentType == 4);
    // this.submittedDocumentArrayList=this.submittedDocumentArrayList.filter(e => e.doumentType != 6);
    // this.submittedDocumentArrayList=this.submittedDocumentArrayList.filter(e => e.doumentType != 4);
    // // console.log("docList",documentList);
    // // console.log("this.submittedDocumentArrayList",this.submittedDocumentArrayList)

    // var newArray=[]
    // this.submittedDocumentArrayList.push({
    //   doumentType:4,
    //   doumentTypName:"Prejoining & Onboarding",
    //   documents:[]
    // })
    // for(var i=1;i<=19;i++){
    //   var getdetails=documentList[0]
    //   var getitem=getdetails.documents.find( e=> e.orderColumn ==i);
    //   if(getitem ==undefined){
    //     var getdetails=documentList[1]
    //     var getitem=getdetails.documents.find( e=> e.orderColumn ==i);
    //   }
    //   if(getitem !=undefined)
    //   {
    //     newArray.push(getitem);
    //   }
    // }
    // for(var i=0;i<this.submittedDocumentArrayList.length;i++){
    //   if(this.submittedDocumentArrayList[i].doumentType==4){
    //     this.submittedDocumentArrayList[i].documents=newArray;
    //   }
    // }
    // var lastDocuments = this.submittedDocumentArrayList.filter(e => e.doumentType == 1 || e.doumentType == 2 || e.doumentType==3);
    // this.submittedDocumentArrayList=this.submittedDocumentArrayList.filter(e => e.doumentType != 1);
    // this.submittedDocumentArrayList=this.submittedDocumentArrayList.filter(e => e.doumentType != 2);
    // this.submittedDocumentArrayList=this.submittedDocumentArrayList.filter(e => e.doumentType != 3);
    // for(var val of lastDocuments){
    //   this.submittedDocumentArrayList.push(val);
    // }
  }

  getCandidateList() {
    this.candidates = [];
    this.searchCandidate.CandidateId = this.candidateId;
    this.searchCandidate.RequisitionDetailId = this.requisitionDetailId;
    this.candidateService.getCandidateList(this.searchCandidate).subscribe((result) => {
      if (result) {
        this.candidates = result;

        if (this.candidates[0].hiringStatusId == 54) {
          this.isVisible = false;
        }
        else {
          this.isVisible = true;
        }
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
    this.persistance.set('pagename', "htcandidatelist");
    this.persistance.set('nextpagename', null);
    if (this.type == "C") {
      this._route.navigate(['/app/corporate/ht-candidate-list']);
    } else if (this.type == "P") {
      this._route.navigate(['/app/plant/ht-candidate-list']);
    } else if (this.type == "S") {
      this._route.navigate(['/app/sales/ht-candidate-list']);
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
        roleId: "", // Added Anif
        disabledField: false, // Added Anif
        createdBy: this.autoUserId,
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
        if (this.submittedDocumentArrayList[i].documents[j].approvalStatus == 1 && this.submittedDocumentArrayList[i].documents[j].disabledField == false) {
          flag = 2;
        }
      }
    }
    if (flag == 3) {
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
            isAdditional: false    // Added By Anif 0n 07-12-2022
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
      // console.log(this.updatedRemarks);
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
      if (this.isVisibleTakeActionbtn == true) {
        formData.append("IsProcedForJoining", this.takeActionButton.toString())
      }
      if (this.isVisibleTakeActionbtn == false) {
        formData.append("IsProcedForJoining", this.takeActionButton.toString());
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
          this.gotoCandidateList();
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
    // console.log(this.searchAssessmentList);
    this.interActionService.getInterviewCalendarAssessmentList(this.searchAssessmentList).subscribe((result) => {
      if (result) {
        this.assessmentList = result;
        // console.log("Assessment List", this.assessmentList);
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
        // console.log("Interview Assessment Data", this.assessmentData);

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
        // console.log("Offer Letter", this.offerLetterHeader);
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
        //console.log("-------Candidate Profile", this.candidateProfile)
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
  // Added by Anif on 01-12-2022 for Edit By AIC
  omclickEditJoiningDoc(rec) {
    this.candidateJoiningFormDetails();
    switch (rec.doumentNameId) {
      case 21:
        jQuery("#familyDetailsModal").modal("show");
        // this.candidateJoiningFormDetails();
        break;
      case 22:
        jQuery("#accidentPolicyDetailsModal").modal("show");
        //this.candidateJoiningFormDetails();
        break;
      case 17:
        jQuery("#sebiDisclosureModal").modal("show");
        //this.candidateJoiningFormDetails();
        break;
      case 24:
        this.persistance.set('pagename', "htverifydocument");
        this.persistance.set('CandidateID', this.candidateId);
        this.persistance.set('CreatedBy', this.createdBy);
        this._route.navigate(['/app/MRF-PPF']);
        break;
      case 23:
        jQuery("#joiningReportModal").modal("show");
        //this.candidateJoiningFormDetails();
        break;

    }
  }
  getRelationShip() {
    // this.relationshipList.push({ name: "Select", id: 0 }, { name: "Father", id: 1 }, { name: "Mother", id: 2 }, { name: "Sibling(s)", id: 3 }, { name: "Spouse", id: 4 }, { name: "Children", id: 5 })
    this.SpinnerService.show();
    this.commonService.getAllRelationship(this.serachRelationShip).subscribe((response: any) => {
      if (response) {
        this.relationshipList = response;
        //console.log("Relation Ship details", this.relationshipList);
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

  candidateJoiningFormDetails() {
    this.SpinnerService.show();
    this.candidateService.getCandidateJoiningFormDetails(this.searchCandidateJoiningFormDetails).subscribe((result) => {
      if (result) {
        this.candidateJoiningFormDetailsList = result;
        //console.log("Candidate Joning Form Details", this.candidateJoiningFormDetailsList);
        // Family Details Form
        this.objFamilyDetailsForm.candidateJoiningFormId = this.candidateJoiningFormDetailsList.candidateJoiningFormId;
        this.objFamilyDetailsForm.candidateId = this.candidateJoiningFormDetailsList.candidateId;
        this.objFamilyDetailsForm.requisitionDetailId = this.candidateJoiningFormDetailsList.requisitionDetailId;
        this.objFamilyDetailsForm.fullName = this.candidateJoiningFormDetailsList.fullName;
        this.objFamilyDetailsForm.oldFullName = this.candidateJoiningFormDetailsList.fullName;
        this.objFamilyDetailsForm.dob = this.candidateJoiningFormDetailsList.dob;
        this.objFamilyDetailsForm.bloodGroupId = this.candidateJoiningFormDetailsList.bloodGroupId;
        this.objFamilyDetailsForm.oldBloodGroupId = this.candidateJoiningFormDetailsList.bloodGroupId;
        this.objFamilyDetailsForm.residentialAddress = this.candidateJoiningFormDetailsList.residentialAddress;
        this.objFamilyDetailsForm.oldResidentialAddress = this.candidateJoiningFormDetailsList.residentialAddress;
        this.objFamilyDetailsForm.residentialPin = this.candidateJoiningFormDetailsList.residentialPin;
        this.objFamilyDetailsForm.oldResidentialPin = this.candidateJoiningFormDetailsList.residentialPin;
        this.objFamilyDetailsForm.sameAsResidential = this.candidateJoiningFormDetailsList.sameAsResidential;
        this.objFamilyDetailsForm.oldSameAsResidential = this.candidateJoiningFormDetailsList.sameAsResidential;
        this.objFamilyDetailsForm.permanentAddress = this.candidateJoiningFormDetailsList.permanentAddress;
        this.objFamilyDetailsForm.oldPermanentAddress = this.candidateJoiningFormDetailsList.permanentAddress;
        this.objFamilyDetailsForm.permanentPin = this.candidateJoiningFormDetailsList.permanentPin;
        this.objFamilyDetailsForm.oldPermanentPin = this.candidateJoiningFormDetailsList.permanentPin;
        this.objFamilyDetailsForm.emailId = this.candidateJoiningFormDetailsList.emailId;
        this.objFamilyDetailsForm.oldEmailId = this.candidateJoiningFormDetailsList.emailId;
        this.objFamilyDetailsForm.phoneNo = this.candidateJoiningFormDetailsList.phoneNo;
        this.objFamilyDetailsForm.oldPhoneNo = this.candidateJoiningFormDetailsList.phoneNo;
        this.objFamilyDetailsForm.date = this.candidateJoiningFormDetailsList.date;

        // For Family members details
        //  if (this.candidateJoiningFormDetailsList.candidateJoiningFormId != 0) {
        this.familyMembersDetailsArray = [];
        this.familyMembersDetailsArrayNew = [];
        if (this.candidateJoiningFormDetailsList.candidateJoingFormFamily.length > 0) {
          this.candidateJoiningFormDetailsList.candidateJoingFormFamily.forEach(element => {
            element.isReadOnly = true;
            this.familyMembersDetailsArray.push(element);
          })
          // Update already save data as IsNew=false and IsDelete=false;
          this.familyMembersDetailsArray.forEach((ele, index) => {
            ele.isNew = false;
            ele.isDelete = false;
            ele.lineId = index + 1;
          })
          this.familyMembersDetailsArrayNew.push(this.objFamilyMembersdetails);   // 25-08-2022
        }


        // Accident Policy Form
        this.objAccidentPolicyForm.candidateJoiningFormId = this.candidateJoiningFormDetailsList.candidateJoiningFormId;
        this.objAccidentPolicyForm.candidateId = this.candidateJoiningFormDetailsList.candidateId;
        this.objAccidentPolicyForm.requisitionDetailId = this.candidateJoiningFormDetailsList.requisitionDetailId;
        this.objAccidentPolicyForm.acidentalPolicyNominee = this.candidateJoiningFormDetailsList.acidentalPolicyNominee;
        this.objAccidentPolicyForm.oldAcidentalPolicyNominee = this.candidateJoiningFormDetailsList.acidentalPolicyNominee;
        this.objAccidentPolicyForm.acidentalPolicyNomineeRelationShip = this.candidateJoiningFormDetailsList.acidentalPolicyNomineeRelationShip;
        this.objAccidentPolicyForm.oldAcidentalPolicyNomineeRelationShip = this.candidateJoiningFormDetailsList.acidentalPolicyNomineeRelationShip;
        this.objAccidentPolicyForm.acidentalPolicyNomineeAddress = this.candidateJoiningFormDetailsList.acidentalPolicyNomineeAddress;
        this.objAccidentPolicyForm.oldAcidentalPolicyNomineeAddress = this.candidateJoiningFormDetailsList.acidentalPolicyNomineeAddress;
        this.objAccidentPolicyForm.acidentalPolicyName = this.candidateJoiningFormDetailsList.acidentalPolicyName;

        //Joining Report Form
        this.objJoiningReportForm.candidateJoiningFormId = this.candidateJoiningFormDetailsList.candidateJoiningFormId;
        this.objJoiningReportForm.candidateId = this.candidateJoiningFormDetailsList.candidateId;
        this.objJoiningReportForm.requisitionDetailId = this.candidateJoiningFormDetailsList.requisitionDetailId;
        this.objJoiningReportForm.joiningLetterDate = this.candidateJoiningFormDetailsList.joiningLetterDate;
        this.objJoiningReportForm.joiningDate = this.candidateJoiningFormDetailsList.joiningDate;
        this.objJoiningReportForm.joiningLetterDesignationName = this.candidateJoiningFormDetailsList.joiningLetterDesignationName;
        this.objJoiningReportForm.signatureDate = this.candidateJoiningFormDetailsList.signatureDate;
        this.objJoiningReportForm.signaturePlace = this.candidateJoiningFormDetailsList.signaturePlace;

        // SEBI Initial Disclosuer Form
        this.objSEBIDisclosureForm.candidateJoiningFormId = this.candidateJoiningFormDetailsList.candidateJoiningFormId;
        this.objSEBIDisclosureForm.candidateId = this.candidateJoiningFormDetailsList.candidateId;
        this.objSEBIDisclosureForm.requisitionDetailId = this.candidateJoiningFormDetailsList.requisitionDetailId;
        this.objSEBIDisclosureForm.sebiName = this.candidateJoiningFormDetailsList.sebiName;
        this.objSEBIDisclosureForm.oldSEBIName = this.candidateJoiningFormDetailsList.sebiName;
        this.objSEBIDisclosureForm.sebiEmployeeNo = this.candidateJoiningFormDetailsList.sebiEmployeeNo;
        this.objSEBIDisclosureForm.sebiDesignation = this.candidateJoiningFormDetailsList.sebiDesignationName;
        this.objSEBIDisclosureForm.sebiDepartment = this.candidateJoiningFormDetailsList.sebiDepartmentName;
        this.objSEBIDisclosureForm.sebiPanNo = this.candidateJoiningFormDetailsList.sebiPanNo;
        this.objSEBIDisclosureForm.oldSEBIPanNo = this.candidateJoiningFormDetailsList.sebiPanNo;
        this.objSEBIDisclosureForm.sebiMobileNo = this.candidateJoiningFormDetailsList.sebiMobileNo;
        this.objSEBIDisclosureForm.oldSEBIMobileNo = this.candidateJoiningFormDetailsList.sebiMobileNo;
        this.objSEBIDisclosureForm.sebiInstitute = this.candidateJoiningFormDetailsList.sebiInsTitute;
        this.objSEBIDisclosureForm.oldSEBIInstitute = this.candidateJoiningFormDetailsList.sebiInsTitute;
        this.objSEBIDisclosureForm.sebiPastEmployer = this.candidateJoiningFormDetailsList.sebiPastEmployer;
        this.objSEBIDisclosureForm.oldSEBIPastEmployer = this.candidateJoiningFormDetailsList.sebiPastEmployer;
        this.objSEBIDisclosureForm.sebiNoOfSecurity = this.candidateJoiningFormDetailsList.sebiNoofSecurity;
        this.objSEBIDisclosureForm.oldSEBINoOfSecurity = this.candidateJoiningFormDetailsList.sebiNoofSecurity;
        this.objSEBIDisclosureForm.sebiDesigName = this.candidateJoiningFormDetailsList.sebiDesigName;
        this.objSEBIDisclosureForm.oldSEBIDesigName = this.candidateJoiningFormDetailsList.sebiDesigName;
        this.objSEBIDisclosureForm.sebiDesigPanNo = this.candidateJoiningFormDetailsList.sebiDesigPAN;
        this.objSEBIDisclosureForm.oldSEBIDesigPanNo = this.candidateJoiningFormDetailsList.sebiDesigPAN;
        this.objSEBIDisclosureForm.sebiDesigMobileNo = this.candidateJoiningFormDetailsList.sebiDesigPhone;
        this.objSEBIDisclosureForm.oldSEBIDesigMobileNo = this.candidateJoiningFormDetailsList.sebiDesigPhone;

        // For Immediate Relatievs
        if (this.candidateJoiningFormDetailsList.candidateJoiningFormId != 0) {
          this.immediateRelativesArray = [];
          if (this.candidateJoiningFormDetailsList.candidateJoingFormImidiateRelatives.length > 0) {
            this.candidateJoiningFormDetailsList.candidateJoingFormImidiateRelatives.forEach(element => {
              element.isReadOnly = true;
              this.immediateRelativesArray.push(element);
              //console.log("In Get Immediate Relative Details", this.familyMembersDetailsArray);
            })
          }
          // Update already save data as IsNew=false and IsDelete=false;
          this.immediateRelativesArray.forEach((imme_ele, index) => {
            imme_ele.isNew = false;
            imme_ele.isDelete = false;
            imme_ele.lineId = index + 1;
          })
          this.objImmediateRelativeDetails.lineId = this.immediateRelativesArray.length + 1;
          this.immediateRelativesArray.unshift(this.objImmediateRelativeDetails);
        }
        // console.log("Immediate Relative adata", this.immediateRelativesArray);
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
  getSameAsResidentialStatus(status) {
    return status
  }
  onChangeSameAs(eve) {
    if (eve.target.checked) {
      this.objFamilyDetailsForm.permanentAddress = this.objFamilyDetailsForm.residentialAddress;
      this.objFamilyDetailsForm.permanentPin = this.objFamilyDetailsForm.residentialPin;
    } else {
      this.objFamilyDetailsForm.permanentAddress = "";
      this.objFamilyDetailsForm.permanentPin = null;
    }
    this.objFamilyDetailsForm.sameAsResidential = eve.target.checked;
  }
  onChangeAddressAndPin() {
    if (this.objFamilyDetailsForm.sameAsResidential) {
      if ((this.objFamilyDetailsForm.permanentAddress != this.objFamilyDetailsForm.residentialAddress) || (this.objFamilyDetailsForm.permanentPin != this.objFamilyDetailsForm.residentialPin)) {
        this.objFamilyDetailsForm.sameAsResidential = false;
      }
    }
  }
  getAllBloodGroup() {
    this.bloodGroups = [];
    this.commonService.getAllBloodGroup(this.searchBloodGroud).subscribe((result) => {
      if (result) {
        this.bloodGroups = result;
        //console.log("Blood Group", this.bloodGroups);
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
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
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

      // 25-08-2022
      data.isReadOnly = true;
      data.familyDOB = this.familyDOB.nativeElement.value;
      // this.objFamilyMembersdetails = new FamilyMembersdetails();
      this.objFamilyMembersdetails.lineId = this.familyMembersDetailsArray.length + 1;
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
  onClickDeleteFamilyMembers(i, data) {
    this.familyMembersDetailsArray.forEach((element, index) => {
      if (element.lineId == data.lineId) {
        if (element.isNew) {
          this.familyMembersDetailsArray.splice(i, 1);
          // Update LineId
          this.familyMembersDetailsArray.forEach((ele, index) => {
            ele.lineId = index + 1;
          })
        } else {
          element.isDelete = true;
        }
      }
    })
  }
  onUpdateFamilyDetails() {
    var flag = 0;
    var msg = "";
    var arrayWithoutDelete = this.familyMembersDetailsArray.filter(e => e.isDelete == false);
    if (arrayWithoutDelete.length == 0) {
      flag = 1;
      msg = "Please Add Atleast one Family Member";
    }
    if (this.objFamilyDetailsForm.phoneNo == undefined || this.objFamilyDetailsForm.phoneNo == "") {
      flag = 1;
      msg = "Please Enter Phone No";
    }
    else {

    }
    if (this.objFamilyDetailsForm.emailId == undefined || this.objFamilyDetailsForm.emailId == "") {
      flag = 1;
      msg = "Please Enter Email Id";
    }
    else {

    }
    if (this.objFamilyDetailsForm.permanentPin == undefined || this.objFamilyDetailsForm.permanentPin == "") {
      flag = 1;
      msg = "Please Enter Permanent Pin";
    }
    else {

    }
    if (this.objFamilyDetailsForm.permanentAddress == undefined || this.objFamilyDetailsForm.permanentAddress == "") {
      flag = 1;
      msg = "Please Enter Permanent Address";
    }
    else {

    }
    if (this.objFamilyDetailsForm.residentialPin == undefined || this.objFamilyDetailsForm.residentialPin == "") {
      flag = 1;
      msg = "Please Enter Residential Pin";
    }
    else {

    }
    if (this.objFamilyDetailsForm.residentialAddress == undefined || this.objFamilyDetailsForm.residentialAddress == "") {
      flag = 1;
      msg = "Please Enter Residential Address";
    }
    else {

    }
    if (this.objFamilyDetailsForm.bloodGroupId == undefined || this.objFamilyDetailsForm.bloodGroupId == 0) {
      flag = 1;
      msg = "Please Select Blood Group";
    }
    else {

    }
    if (flag == 0) {
      if (this.objFamilyDetailsForm.oldFullName != this.objFamilyDetailsForm.fullName) {
        this.objFamilyDetailsForm.newFullName = this.objFamilyDetailsForm.fullName;
        this.objFamilyDetailsForm.fullNameChanged = true;
      } else {
        this.objFamilyDetailsForm.newFullName = "";
        this.objFamilyDetailsForm.fullNameChanged = false;
      }
      if (this.objFamilyDetailsForm.oldBloodGroupId != this.objFamilyDetailsForm.bloodGroupId) {
        this.objFamilyDetailsForm.newBloodGroupId = this.objFamilyDetailsForm.bloodGroupId;
        this.objFamilyDetailsForm.bloodGroupIdChanged = true;
      } else {
        this.objFamilyDetailsForm.newBloodGroupId = 0;
        this.objFamilyDetailsForm.bloodGroupIdChanged = false;
      }
      if (this.objFamilyDetailsForm.oldResidentialAddress != this.objFamilyDetailsForm.residentialAddress) {
        this.objFamilyDetailsForm.newResidentialAddress = this.objFamilyDetailsForm.residentialAddress;
        this.objFamilyDetailsForm.residentialAddressChanged = true;
      } else {
        this.objFamilyDetailsForm.newResidentialAddress = "";
        this.objFamilyDetailsForm.residentialAddressChanged = false;
      }
      if (this.objFamilyDetailsForm.oldResidentialPin != this.objFamilyDetailsForm.residentialPin) {
        this.objFamilyDetailsForm.newResidentialPin = this.objFamilyDetailsForm.residentialPin;
        this.objFamilyDetailsForm.residentialPinChanged = true;
      } else {
        this.objFamilyDetailsForm.newResidentialPin = "";
        this.objFamilyDetailsForm.residentialPinChanged = false;
      }
      if (this.objFamilyDetailsForm.oldPermanentAddress != this.objFamilyDetailsForm.permanentAddress) {
        this.objFamilyDetailsForm.newPermanentAddress = this.objFamilyDetailsForm.permanentAddress;
        this.objFamilyDetailsForm.permanentAddressChanged = true;
      } else {
        this.objFamilyDetailsForm.newPermanentAddress = "";
        this.objFamilyDetailsForm.permanentAddressChanged = false;
      }
      if (this.objFamilyDetailsForm.oldPermanentPin != this.objFamilyDetailsForm.permanentPin) {
        this.objFamilyDetailsForm.newPermanentPin = this.objFamilyDetailsForm.permanentPin;
        this.objFamilyDetailsForm.permanentPinChanged = true;
      } else {
        this.objFamilyDetailsForm.newPermanentPin = "";
        this.objFamilyDetailsForm.permanentPinChanged = false;
      }
      if (this.objFamilyDetailsForm.oldSameAsResidential != this.objFamilyDetailsForm.sameAsResidential) {
        this.objFamilyDetailsForm.newSameAsResidential = this.objFamilyDetailsForm.sameAsResidential;
        this.objFamilyDetailsForm.sameAsResidentialChanged = true;
      } else {
        this.objFamilyDetailsForm.newSameAsResidential = false;
        this.objFamilyDetailsForm.sameAsResidentialChanged = false;
      }
      if (this.objFamilyDetailsForm.oldEmailId != this.objFamilyDetailsForm.emailId) {
        this.objFamilyDetailsForm.newEmailId = this.objFamilyDetailsForm.emailId;
        this.objFamilyDetailsForm.emailIdChanged = true;
      } else {
        this.objFamilyDetailsForm.newEmailId = "";
        this.objFamilyDetailsForm.emailIdChanged = false;
      }
      if (this.objFamilyDetailsForm.oldPhoneNo != this.objFamilyDetailsForm.phoneNo) {
        this.objFamilyDetailsForm.newPhoneNo = this.objFamilyDetailsForm.phoneNo;
        this.objFamilyDetailsForm.phoneNoChanged = true;
      } else {
        this.objFamilyDetailsForm.newPhoneNo = "";
        this.objFamilyDetailsForm.phoneNoChanged = false;
      }

      const formData = new FormData();
      formData.append("CandidateJoiningFormId", this.objFamilyDetailsForm.candidateJoiningFormId.toString());
      formData.append("CandidateId", this.objFamilyDetailsForm.candidateId.toString());
      formData.append("RequisitionDetailId", this.objFamilyDetailsForm.requisitionDetailId.toString());
      formData.append("NewFullName", this.objFamilyDetailsForm.newFullName);
      formData.append("OldFullName", this.objFamilyDetailsForm.oldFullName);
      formData.append("FullNameChanged", this.objFamilyDetailsForm.fullNameChanged.toString());
      formData.append("NewBloodGroup", this.objFamilyDetailsForm.newBloodGroupId.toString());
      formData.append("OldBloodGroup", this.objFamilyDetailsForm.oldBloodGroupId.toString());
      formData.append("BloodGroupChanged", this.objFamilyDetailsForm.bloodGroupIdChanged.toString());
      formData.append("NewResidentialAddress", this.objFamilyDetailsForm.newResidentialAddress);
      formData.append("OldResidentialAddress", this.objFamilyDetailsForm.oldResidentialAddress);
      formData.append("ResidentialAddressChanged", this.objFamilyDetailsForm.residentialAddressChanged.toString());
      formData.append("NewResidentialPin", this.objFamilyDetailsForm.newResidentialPin.toString());
      formData.append("OldResidentialPin", this.objFamilyDetailsForm.oldResidentialPin.toString());
      formData.append("ResidentialPinChanged", this.objFamilyDetailsForm.residentialPinChanged.toString());
      formData.append("NewSameAsResidential", this.objFamilyDetailsForm.newSameAsResidential.toString());
      formData.append("OldSameAsResidential", this.objFamilyDetailsForm.oldSameAsResidential.toString());
      formData.append("SameAsResidentialChanged", this.objFamilyDetailsForm.sameAsResidentialChanged.toString());
      formData.append("NewPermanentAddress", this.objFamilyDetailsForm.newPermanentAddress);
      formData.append("OldPermanentAddress", this.objFamilyDetailsForm.oldPermanentAddress);
      formData.append("PermanentAddressChanged", this.objFamilyDetailsForm.permanentAddressChanged.toString());
      formData.append("NewPermanentPin", this.objFamilyDetailsForm.newPermanentPin.toString());
      formData.append("OldPermanentPin", this.objFamilyDetailsForm.oldPermanentPin.toString());
      formData.append("PermanentPinChanged", this.objFamilyDetailsForm.permanentPinChanged.toString());
      formData.append("NewEmailId", this.objFamilyDetailsForm.newEmailId);
      formData.append("OldEmailId", this.objFamilyDetailsForm.oldEmailId);
      formData.append("EmailIdChanged", this.objFamilyDetailsForm.emailIdChanged.toString());
      formData.append("NewPhoneNo", this.objFamilyDetailsForm.newPhoneNo.toString());
      formData.append("OldPhoneNo", this.objFamilyDetailsForm.oldPhoneNo.toString());
      formData.append("PhoneNoChanged", this.objFamilyDetailsForm.phoneNoChanged.toString());
      formData.append("CreatedBy", this.objFamilyDetailsForm.createdBy.toString());
      formData.append("CandidateJoingFormFamily", JSON.stringify(this.familyMembersDetailsArray));
      this.candidateService.updateCandiadteJoiningFamilyDetailsForm(formData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            jQuery("#familyDetailsModal").modal("hide");
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
  onUpdateAccidentPolicyForm() {
    var flag = 0;
    var msg = "";
    if (this.objAccidentPolicyForm.acidentalPolicyNomineeAddress == undefined || this.objAccidentPolicyForm.acidentalPolicyNomineeAddress == "") {
      flag = 1;
      msg = "Please Enter Nominee Address";
    }
    else {

    }
    if (this.objAccidentPolicyForm.acidentalPolicyNomineeRelationShip == undefined || this.objAccidentPolicyForm.acidentalPolicyNomineeRelationShip == null) {
      flag = 1;
      msg = "Please Enter Nominee Relation Ship";
    }
    else {

    }
    if (this.objAccidentPolicyForm.acidentalPolicyNominee == undefined || this.objAccidentPolicyForm.acidentalPolicyNominee == "") {
      flag = 1;
      msg = "Please Enter Nominee Name";
    } else {

    }
    if (flag == 0) {
      if (this.objAccidentPolicyForm.oldAcidentalPolicyNominee != this.objAccidentPolicyForm.acidentalPolicyNominee) {
        this.objAccidentPolicyForm.newAcidentalPolicyNominee = this.objAccidentPolicyForm.acidentalPolicyNominee;
        this.objAccidentPolicyForm.acidentalPolicyNomineeChanged = true;
      } else {
        this.objAccidentPolicyForm.newAcidentalPolicyNominee = "";
        this.objAccidentPolicyForm.acidentalPolicyNomineeChanged = false;
      }
      if (this.objAccidentPolicyForm.oldAcidentalPolicyNomineeRelationShip != this.objAccidentPolicyForm.acidentalPolicyNomineeRelationShip) {
        this.objAccidentPolicyForm.newAcidentalPolicyNomineeRelationShip = this.objAccidentPolicyForm.acidentalPolicyNomineeRelationShip;
        this.objAccidentPolicyForm.acidentalPolicyNomineeRelationShipChanged = true;
      } else {
        this.objAccidentPolicyForm.newAcidentalPolicyNomineeRelationShip = 0;
        this.objAccidentPolicyForm.acidentalPolicyNomineeRelationShipChanged = false;
      }
      if (this.objAccidentPolicyForm.oldAcidentalPolicyNomineeAddress != this.objAccidentPolicyForm.acidentalPolicyNomineeAddress) {
        this.objAccidentPolicyForm.newAcidentalPolicyNomineeAddress = this.objAccidentPolicyForm.acidentalPolicyNomineeAddress;
        this.objAccidentPolicyForm.acidentalPolicyNomineeAddressChanged = true;
      } else {
        this.objAccidentPolicyForm.newAcidentalPolicyNomineeAddress = "";
        this.objAccidentPolicyForm.acidentalPolicyNomineeAddressChanged = false;
      }

      const formData = new FormData();
      formData.append("CandidateJoiningFormId", this.objAccidentPolicyForm.candidateJoiningFormId.toString());
      formData.append("CandidateId", this.objAccidentPolicyForm.candidateId.toString());
      formData.append("RequisitionDetailId", this.objAccidentPolicyForm.requisitionDetailId.toString());
      formData.append("NewAcidentalPolicyNominee", this.objAccidentPolicyForm.newAcidentalPolicyNominee);
      formData.append("OldAcidentalPolicyNominee", this.objAccidentPolicyForm.oldAcidentalPolicyNominee);
      formData.append("AcidentalPolicyNomineeChanged", this.objAccidentPolicyForm.acidentalPolicyNomineeChanged.toString());
      formData.append("NewAcidentalPolicyNomineeRelationShip", this.objAccidentPolicyForm.newAcidentalPolicyNomineeRelationShip.toString());
      formData.append("OldAcidentalPolicyNomineeRelationShip", this.objAccidentPolicyForm.oldAcidentalPolicyNomineeRelationShip.toString());
      formData.append("AcidentalPolicyNomineeRelationShipChanged", this.objAccidentPolicyForm.acidentalPolicyNomineeRelationShipChanged.toString());
      formData.append("NewAcidentalPolicyNomineeAddress", this.objAccidentPolicyForm.newAcidentalPolicyNomineeAddress);
      formData.append("OldAcidentalPolicyNomineeAddress", this.objAccidentPolicyForm.oldAcidentalPolicyNomineeAddress);
      formData.append("AcidentalPolicyNomineeAddressChanged", this.objAccidentPolicyForm.acidentalPolicyNomineeAddressChanged.toString());
      formData.append("CreatedBy", this.objAccidentPolicyForm.createdBy.toString());
      this.candidateService.updateAccidenInsurancePolicy(formData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            jQuery("#accidentPolicyDetailsModal").modal("hide");
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

    } else {
      this.notificationService.showError(msg, "Error");
    }
  }
  onUpdateJoiningReportForm() {
    const formData = new FormData();
    formData.append("CandidateJoiningFormId", this.objJoiningReportForm.candidateJoiningFormId.toString());
    formData.append("CandidateId", this.objJoiningReportForm.candidateId.toString());
    formData.append("RequisitionDetailId", this.objJoiningReportForm.requisitionDetailId.toString());
    formData.append("SignaturePlace", this.objJoiningReportForm.signaturePlace.toString());
    formData.append("CreatedBy", this.objJoiningReportForm.createdBy.toString());
    this.candidateService.updatejoiningReportform(formData).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          jQuery("#joiningReportModal").modal("hide");
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

  onClickViewUpdateDetails(record) {
    switch (record.doumentNameId) {
      case 21:
        this.getJoiningFormFamilyDetailsUpdateDetails();
        break;
      case 22:
        this.getAccidentInsurancePolicyUpdateHistory();
        break;
      case 17:
        this.getSEBIInitialDisclosureUpdateHistory();
        break;
      case 23:
        this.getjoiningreporthistory();
        break;
      case 24:
        this.getmrfppfhistory();
        break;
    }

  }

  getJoiningFormFamilyDetailsUpdateDetails() {
    let searchobj = {
      CandidateJoiningFormId: null,
      CandidateId: Number(this.candidateId)
    }
    this.candidateService.getFamilyDeatilsUpdatehistroy(searchobj).subscribe((result) => {
      if (result) {
        this.joiningFormFamilyDetailsUpdateList = result.familyDetailsForms;
        //console.log("Family details update details", result);
        // console.log("Family details update details", this.joiningFormFamilyDetailsUpdateList);
        jQuery("#joiningFormFamilyDetailsUpdateDetailsModal").modal("show");

      }

    })
  }
  getAccidentInsurancePolicyUpdateHistory() {
    let searchobj = {
      CandidateJoiningFormId: null,
      CandidateId: Number(this.candidateId)
    }
    this.candidateService.getAccidentPolicyUpdateDetails(searchobj).subscribe((result) => {
      if (result) {
        this.accidentInsurancePolicyUpdateDetailsList = result;
        // console.log("Accident Insurance Policy Form Details", this.accidentInsurancePolicyUpdateDetailsList);
        jQuery("#accidentInsurancePolicyUpdateDetailsModal").modal("show");

      }

    })
  }
  getjoiningreporthistory() {
    let searchobj = {
      CandidateJoiningFormId: null,
      CandidateId: Number(this.candidateId)
    }
    this.candidateService.getJoiningReportFormHistory(searchobj).subscribe((result) => {
      if (result) {
        this.joiningformreportList = result;
        console.log("joiningformreportList", this.joiningformreportList);
        jQuery("#joiningreportformUpdateDetailsModal").modal("show");

      }

    })
  }
  getmrfppfhistory() {
    let searchobj = {
      CandidateId: Number(this.candidateId)
    }
    this.candidateService.getMRFPPFHistory(searchobj).subscribe((result) => {
      if (result) {
        this.mrfppflist = result;
        jQuery("#mrfppfUpdateDetailsModal").modal("show");

      }

    })
  }
  getSEBIInitialDisclosureUpdateHistory() {
    let searchobj = {
      CandidateJoiningFormId: null,
      CandidateId: Number(this.candidateId)
    }
    this.candidateService.getSEBIInitialDisclosureUpdateHistory(searchobj).subscribe((result) => {
      if (result) {
        this.sebiInitialDisclosureUpdateHistoryList = result.finalSEBIDisclosureData;
        //console.log("SEBI Disclosure Policy Form Details", this.sebiInitialDisclosureUpdateHistoryList);
        jQuery("#sebiUpdateHistoryDetailsModal").modal("show");

      }

    })
  }
  getFamilymemberDeleteStatus(deleteStatus) {
    return deleteStatus == true ? "Yes" : "No";
  }
  getFamilymemberNewStatus(newStatus) {
    return newStatus == true ? "Yes" : "No";
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
      this.objImmediateRelativeDetails.lineId = this.immediateRelativesArray.length + 1;
      // this.immediateRelativesArray.unshift(this.objImmediateRelativeDetails);
      this.immediateRelativesArray.unshift(this.objImmediateRelativeDetails);
    } else {
      this.notificationService.showError(msg, "Error");
    }
  }
  onClickDeleteImmediateRelatives(i, data) {
    this.immediateRelativesArray.forEach((element, index) => {
      if (element.lineId == data.lineId) {
        if (element.isNew == true) {
          this.immediateRelativesArray.splice(i, 1);
          // Update LineId
          this.immediateRelativesArray.forEach((ele, index) => {
            if (ele.isReadOnly) {
              ele.lineId = index + 1;
            }
          })
        } else {
          element.isDelete = true;
        }
      }
    })
  }
  onUpdateSEBIDisclosure() {
    var flag = 0;
    var msg = "";
    if (this.objSEBIDisclosureForm.sebiDesigMobileNo == undefined || this.objSEBIDisclosureForm.sebiDesigMobileNo == "") {
      flag = 1;
      msg = "Please Enter SEBI Designated Person Phone No";
    }
    else {

    }
    if (this.objSEBIDisclosureForm.sebiDesigPanNo == undefined || this.objSEBIDisclosureForm.sebiDesigPanNo == "") {
      flag = 1;
      msg = "Please Enter SEBI Designated Person PAN No";
    }
    else {

    }
    if (this.objSEBIDisclosureForm.sebiDesigName == undefined || this.objSEBIDisclosureForm.sebiDesigName == "") {
      flag = 1;
      msg = "Please Enter SEBI Designated Person Name";
    } else {

    }
    if (this.immediateRelativesArray.length == 0) {
      flag = 1;
      msg = "Please Enter Atleast One Immediate Relative Details";
    } else {

    }
    if (this.objSEBIDisclosureForm.sebiNoOfSecurity == undefined || this.objSEBIDisclosureForm.sebiNoOfSecurity == null) {
      flag = 1;
      msg = "Please Enter No Of Security";
    } else {

    }
    if (this.objSEBIDisclosureForm.sebiPastEmployer == undefined || this.objSEBIDisclosureForm.sebiPastEmployer == "") {
      flag = 1;
      msg = "Please Enter Past Employer";
    } else {

    }
    if (this.objSEBIDisclosureForm.sebiInstitute == undefined || this.objSEBIDisclosureForm.sebiInstitute == "") {
      flag = 1;
      msg = "Please Enter Institute";
    } else {

    }
    if (this.objSEBIDisclosureForm.sebiMobileNo == undefined || this.objSEBIDisclosureForm.sebiMobileNo == "") {
      flag = 1;
      msg = "Please Enter Mobile No";
    } else {

    }
    if (this.objSEBIDisclosureForm.sebiPanNo == undefined || this.objSEBIDisclosureForm.sebiPanNo == "") {
      flag = 1;
      msg = "Please Enter PAN No";
    } else {

    }
    if (this.objSEBIDisclosureForm.sebiName == undefined || this.objSEBIDisclosureForm.sebiName == "") {
      flag = 1;
      msg = "Please Enter SEBI Name";
    } else {

    }
    if (flag == 0) {
      if (this.objSEBIDisclosureForm.oldSEBIName != this.objSEBIDisclosureForm.sebiName) {
        this.objSEBIDisclosureForm.newSEBIName = this.objSEBIDisclosureForm.sebiName;
        this.objSEBIDisclosureForm.sebiNameChanged = true;
      } else {
        this.objSEBIDisclosureForm.newSEBIName = "";
        this.objSEBIDisclosureForm.sebiNameChanged = false;
      }
      if (this.objSEBIDisclosureForm.oldSEBIPanNo != this.objSEBIDisclosureForm.sebiPanNo) {
        this.objSEBIDisclosureForm.newSEBIPanNo = this.objSEBIDisclosureForm.sebiPanNo;
        this.objSEBIDisclosureForm.sebiPanNoChanged = true;
      } else {
        this.objSEBIDisclosureForm.newSEBIPanNo = "";
        this.objSEBIDisclosureForm.sebiPanNoChanged = false;
      }
      if (this.objSEBIDisclosureForm.oldSEBIMobileNo != this.objSEBIDisclosureForm.sebiMobileNo) {
        this.objSEBIDisclosureForm.newSEBIMobileNo = this.objSEBIDisclosureForm.sebiMobileNo;
        this.objSEBIDisclosureForm.sebiMobileNoChanged = true;
      } else {
        this.objSEBIDisclosureForm.newSEBIMobileNo = "";
        this.objSEBIDisclosureForm.sebiMobileNoChanged = false;
      }
      if (this.objSEBIDisclosureForm.oldSEBIInstitute != this.objSEBIDisclosureForm.sebiInstitute) {
        this.objSEBIDisclosureForm.newSEBIInstitute = this.objSEBIDisclosureForm.sebiInstitute;
        this.objSEBIDisclosureForm.sebiInstituteChanged = true;
      } else {
        this.objSEBIDisclosureForm.newSEBIInstitute = "";
        this.objSEBIDisclosureForm.sebiInstituteChanged = false;
      }
      if (this.objSEBIDisclosureForm.oldSEBIPastEmployer != this.objSEBIDisclosureForm.sebiPastEmployer) {
        this.objSEBIDisclosureForm.newSEBIPastEmployer = this.objSEBIDisclosureForm.sebiPastEmployer;
        this.objSEBIDisclosureForm.sebiPastEmployerChanged = true;
      } else {
        this.objSEBIDisclosureForm.newSEBIPastEmployer = "";
        this.objSEBIDisclosureForm.sebiPastEmployerChanged = false;
      }
      if (this.objSEBIDisclosureForm.oldSEBINoOfSecurity != this.objSEBIDisclosureForm.sebiNoOfSecurity) {
        this.objSEBIDisclosureForm.newSEBINoOfSecurity = this.objSEBIDisclosureForm.sebiNoOfSecurity;
        this.objSEBIDisclosureForm.sebiNoOfSecurityChanged = true;
      } else {
        this.objSEBIDisclosureForm.newSEBINoOfSecurity = 0;
        this.objSEBIDisclosureForm.sebiPastEmployerChanged = false;
      }
      if (this.objSEBIDisclosureForm.oldSEBIDesigName != this.objSEBIDisclosureForm.sebiDesigName) {
        this.objSEBIDisclosureForm.newSEBIDesigName = this.objSEBIDisclosureForm.sebiDesigName;
        this.objSEBIDisclosureForm.sebiDesigNameChanged = true;
      } else {
        this.objSEBIDisclosureForm.newSEBIDesigName = "";
        this.objSEBIDisclosureForm.sebiDesigNameChanged = false;
      }
      if (this.objSEBIDisclosureForm.oldSEBIDesigPanNo != this.objSEBIDisclosureForm.sebiDesigPanNo) {
        this.objSEBIDisclosureForm.newSEBIDesigPanNo = this.objSEBIDisclosureForm.sebiDesigPanNo;
        this.objSEBIDisclosureForm.sebiDesigPanNoChanged = true;
      } else {
        this.objSEBIDisclosureForm.newSEBIDesigPanNo = "";
        this.objSEBIDisclosureForm.sebiDesigPanNoChanged = false;
      }
      if (this.objSEBIDisclosureForm.oldSEBIDesigMobileNo != this.objSEBIDisclosureForm.sebiDesigMobileNo) {
        this.objSEBIDisclosureForm.newSEBIDesigMobileNo = this.objSEBIDisclosureForm.sebiDesigMobileNo;
        this.objSEBIDisclosureForm.sebiDesigMobileNoChanged = true;
      } else {
        this.objSEBIDisclosureForm.newSEBIDesigMobileNo = "";
        this.objSEBIDisclosureForm.sebiDesigMobileNoChanged = false;
      }

      const formData = new FormData();
      formData.append("CandidateJoiningFormId", this.objSEBIDisclosureForm.candidateJoiningFormId.toString());
      formData.append("CandidateId", this.objSEBIDisclosureForm.candidateId.toString());
      formData.append("RequisitionDetailId", this.objSEBIDisclosureForm.requisitionDetailId.toString());
      formData.append("NewSEBIName", this.objSEBIDisclosureForm.newSEBIName);
      formData.append("OldSEBIName", this.objSEBIDisclosureForm.oldSEBIName);
      formData.append("SEBINameChanged", this.objSEBIDisclosureForm.sebiNameChanged.toString());
      formData.append("NewSEBIPanNo", this.objSEBIDisclosureForm.newSEBIPanNo);
      formData.append("OldSEBIPanNo", this.objSEBIDisclosureForm.oldSEBIPanNo);
      formData.append("SEBIPanNoChanged", this.objSEBIDisclosureForm.sebiPanNoChanged.toString());
      formData.append("NewSEBIMobileNo", this.objSEBIDisclosureForm.newSEBIMobileNo);
      formData.append("OldSEBIMobileNo", this.objSEBIDisclosureForm.oldSEBIMobileNo);
      formData.append("SEBIMobileNoChanged", this.objSEBIDisclosureForm.sebiMobileNoChanged.toString());
      formData.append("NewSEBIinstitute", this.objSEBIDisclosureForm.newSEBIInstitute);
      formData.append("OldSEBIinstitute", this.objSEBIDisclosureForm.oldSEBIInstitute);
      formData.append("SEBIinstituteChanged", this.objSEBIDisclosureForm.sebiInstituteChanged.toString());
      formData.append("NewSEBIPastEmployer", this.objSEBIDisclosureForm.newSEBIPastEmployer);
      formData.append("OldSEBIPastEmployer", this.objSEBIDisclosureForm.oldSEBIPastEmployer);
      formData.append("SEBIPastEmployeChanged", this.objSEBIDisclosureForm.sebiPastEmployerChanged.toString());
      formData.append("NewSEBINoOfSecurity", this.objSEBIDisclosureForm.newSEBINoOfSecurity.toString());
      formData.append("OldSEBINoOfSecurity", this.objSEBIDisclosureForm.oldSEBINoOfSecurity.toString());
      formData.append("SEBINoOfSecurityChanged", this.objSEBIDisclosureForm.sebiNoOfSecurityChanged.toString());
      formData.append("NewSEBIDesigName", this.objSEBIDisclosureForm.newSEBIDesigName);
      formData.append("OldSEBIDesigName", this.objSEBIDisclosureForm.oldSEBIDesigName);
      formData.append("SEBIDesigNameChanged", this.objSEBIDisclosureForm.sebiDesigNameChanged.toString());
      formData.append("NewSEBIDesigPanNo", this.objSEBIDisclosureForm.newSEBIDesigPanNo);
      formData.append("OldSEBIDesigPanNo", this.objSEBIDisclosureForm.oldSEBIDesigPanNo);
      formData.append("SEBIDesigPanNoChanged", this.objSEBIDisclosureForm.sebiDesigPanNoChanged.toString());
      formData.append("NewSEBIDesigMobile", this.objSEBIDisclosureForm.newSEBIDesigMobileNo);
      formData.append("OldSEBIDesigMobile", this.objSEBIDisclosureForm.oldSEBIDesigMobileNo);
      formData.append("SEBIDesigMobileChanged", this.objSEBIDisclosureForm.sebiDesigMobileNoChanged.toString());
      formData.append("CreatedBy", this.objSEBIDisclosureForm.createdBy.toString());
      var immediateRelativeArrayForSave = [];
      this.immediateRelativesArray.forEach(element => {
        if (element.isReadOnly) {
          let immediateRelativeObj = {
            candidateJoiningFormId: element.candidateJoiningFormId,
            candidateImidiateRelativesLineId: element.candidateImidiateRelativesLineId,
            imidiateRelativesName: element.imidiateRelativesName,
            imidiateRelativesPAN: element.imidiateRelativesPAN,
            imidiateRelativesPhone: element.imidiateRelativesPhone,
            imidiateRelativesNoofSecurity: element.imidiateRelativesNoofSecurity,
            isNew: element.isNew,
            isDelete: element.isDelete,
            lineId: element.lineId
          }
          immediateRelativeArrayForSave.push(immediateRelativeObj);
        }
      })

      formData.append("ImmediateRelative", JSON.stringify(immediateRelativeArrayForSave));
      this.candidateService.updateSEBIInitialDisclosure(formData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            jQuery("#sebiDisclosureModal").modal("hide");
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



    } else {
      this.notificationService.showError(msg, "Error");
    }
  }

  // Tiil this by Anif on  01-12-2022 foe Edit by AIC

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
    debugger;
    var fileName;
    var downloadMode = "landscape";  // Added this on 08-02-2023
    var downloadSize = 10;           // Added this on 08-02-2023
    switch (type) {
      case 17:
        var htmlstring = document.getElementById("printSEBIDisclosure").innerHTML;
        fileName = this.candidateId.toString() + "_SEBI_Disclosure.pdf"
        break;
      case 21:
        var htmlstring = document.getElementById("printFamilyDetailsDiv").innerHTML;
        fileName = this.candidateId.toString() + "_Family_Details.pdf"
        downloadMode = "portrait";
        downloadSize = 6;
        break;
      case 22:
        var htmlstring = document.getElementById("printAccidentInsurancePolicy").innerHTML;
        fileName = this.candidateId.toString() + "_Accident_Insurance_Policy.pdf"
        break;
      case 23:
        var htmlstring = document.getElementById("printJoiningReport").innerHTML;
        fileName = this.candidateId.toString() + "_Joining_Report.pdf"
        downloadMode = "portrait";
        downloadSize = 6;
        break;
      case 24:
        var htmlstring = document.getElementById("printerdivApplicationForm").innerHTML;
        fileName = this.candidateId.toString() + "_Application_Form.pdf"
        downloadMode = "portrait";
        downloadSize = 6;
        break;
      case 26:
        var htmlstring = document.getElementById("printerdivInterviewAssessment").innerHTML;
        fileName = this.candidateId.toString() + "_Interview_Assessment.pdf"
        break;
      case 27:
        var htmlstring = document.getElementById("printerdivApplicationForm").innerHTML;
        fileName = this.candidateId.toString() + "_Application_Form.pdf"
        break;
      case 29:
        var htmlstring = this.offerLetterHTML;
        fileName = this.candidateId.toString() + "_Offer_Letter.pdf"
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
      jsPDF: { format: 'A4', orientation: downloadMode },
    });
  }

  onAttachmentFileChange(files: FileList) {
    // this.fileUploadArray = [];
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
      this.selectedPdf = files[0];
      this.pdfURL = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.selectedPdf)) as string;
      //  console.log("Pdf Url", this.pdfURL);
      const reader = new FileReader();
      this.documentPathEdit = files[0];
      this.attachmentFileImport.nativeElement.innerText = files[0].name;
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.documentPathEdit = reader.result;
      }
      console.log('chck', this.documentPathEdit)
    }
  }

  omclickEditDoc(record) {
    console.log("Edit Doc Result", record);
    this.documentTypeEdit = record.doumentTypName == null ? "" : record.doumentTypName;
    this.documentParticularEdit = record.documentParticularName == null ? "" : record.documentParticularName;
    this.documentNameEdit = record.doumentName == null ? "" : record.doumentName;
    this.offerDocumentCollectionDocumentIdEdit = record.offerDocumentCollectionDocumentId;
    if (record.documentPath != "") {
      var pathList = record.documentPath.split("/");
      pathList.shift();
      pathList.pop();
      // console.log("Path List Array", pathList);
      // pathList.forEach(element => {
      //   this.documentPathEdit += element + "/"
      // })
      this.documentPathEdit = pathList.join("/");
    }
    this.offerDocumentCollection_Id = record.offerDocumentCollectionId;
    this.document_Type = record.doumentType;
    this.document_particular = record.doumentParticular;
    this.documentapprovalremarks = record.approvalRemarks;
    this.documentadditionaldocument = record.additionalDocument;
    console.log("Document Path", this.documentPathEdit);
    this.documentNameIdEdit = record.doumentNameId;          // Added by anif on 20-01-2023

  }
  onUpdate() {
    //   this.submittedDocumentArrayList.forEach(element => {
    //     element.documents.forEach(doc_element => {
    //       if (doc_element.offerDocumentCollectionDocumentId == this.offerDocumentCollectionDocumentIdEdit) {
    //         doc_element.documentPath = this.pdfURL;
    //       }
    //     })
    //   })
    //   this.attachmentFileImport.nativeElement.innerText = "Choose file";
    //   this.attachmentfileToUpload = null;
    //   jQuery("#myModal").modal("hide");
    var flag = 0;
    var msg = "";
    if (this.attachmentfileToUpload == null) {  //&& this.BillDetails == ""
      flag = 1;
      msg = "Please Attach a file";
    }
    else {

    }

    if (flag == 0) {
      this.SpinnerService.show();
      const formData = new FormData();
      formData.append("OfferDocumentCollectionDocumentId", this.offerDocumentCollectionDocumentIdEdit.toString());
      formData.append("OfferDocumentCollectionId", this.offerDocumentCollection_Id.toString());
      formData.append("DocumentType", this.document_Type.toString());
      formData.append("DocumentParticular", this.document_particular.toString());
      formData.append("DocumentName", this.documentNameEdit.toString());//---by sayandeep
      formData.append("DocumentPath", this.documentPathEdit.toString());
      formData.append("Document", this.attachmentfileToUpload);
      // formData.append("Files", this.attachmentfileToUpload);
      formData.append("ApprovalRemarks", this.documentapprovalremarks.toString());
      formData.append("AdditionalDocument", this.documentadditionaldocument.toString());
      formData.append("CreatedBy", this.createdBy.toString());
      formData.append("DocumentNameId", this.documentNameIdEdit.toString());
      formData.append("CandidateId", this.candidateId.toString());
      // console.log("Bill details Array", this.billDetailsArray);

      this.documentService.updateDocument(formData).subscribe((result) => {
        // console.log(result);
        if (result.status == 0) {
          this.notificationService.showError(result.msg, "Error");
          this.SpinnerService.hide();
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.attachmentFileImport.nativeElement.innerText = "Choose file";
          this.attachmentfileToUpload = null;
          jQuery("#myModal").modal("hide");
          this.getCandidateOfferDocument();
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
        this.notificationService.showError("Something went wrong", "Error");
      });

    } else {
      this.notificationService.showError(msg, "Error");
    }

  }

  omclickHistroyDoc(record) {
    debugger;
    console.log("record", record)
    if (record.modifiedOn == null && record.modifyBy == null) {
      this.createdOnForHistroy = record.createdOn;
      this.modifiedForHistroy = record.createdBy;
    }
    else if (record.modifiedOn == null && record.modifyBy != null) {
      this.createdOnForHistroy = record.createdOn;
      this.modifiedForHistroy = record.modifyBy;
    }
    else if (record.modifiedOn != null && record.modifyBy == null) {
      this.createdOnForHistroy = record.modifiedOn;
      this.modifiedForHistroy = record.createdBy;
    }
    else {
      this.createdOnForHistroy = record.modifiedOn;
      this.modifiedForHistroy = record.modifyBy;
    }
    // this.createdOnForHistroy = record.createdOn;
    // this.modifiedForHistroy = record.createdBy;

    //record.modifyStatus>0 ? this.modifiedForHistroy=true:this.modifiedForHistroy=false;
  }
  onReset() {
    this.gotoCandidateList();
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
  onClickDocVerification() {
    var flag = 0;
    for (var i = 0; i < this.submittedDocumentArrayList.length; i++) {
      for (var j = 0; j < this.submittedDocumentArrayList[i].documents.length; j++) {
        if (this.submittedDocumentArrayList[i].documents[j].approvalStatus != 3) {
          flag = 1;
          break;
        }
      }
    }
    if (flag == 0) {
      this.isVisibleTakeActionbtn = true;
    }
    else {
      this.isVisibleTakeActionbtn = false;
    }
  }
  onClickProcedForJoining(value) {
    if (value == '1') {
      this.takeActionButton = 1;
    }
    if (value == '2') {
      this.takeActionButton = 2;
    }
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


// Added By anif on 01-12-2022 for edit by AIC

class FamilyDetailsForm {
  candidateJoiningFormId: number;
  candidateId: number;
  requisitionDetailId: number;
  oldFullName: string = "";
  fullName: string = "";
  newFullName: string = "";
  fullNameChanged: boolean = false;
  dob: any;
  oldBloodGroupId: number = 0;
  bloodGroupId: number = 0;
  newBloodGroupId: number = 0;
  bloodGroupIdChanged: boolean = false;
  oldResidentialAddress: string = "";
  residentialAddress: string = "";
  newResidentialAddress: string = "";
  residentialAddressChanged: boolean = false;
  oldResidentialPin: any;
  residentialPin: any;
  newResidentialPin: any;
  residentialPinChanged: boolean = false;
  oldSameAsResidential: boolean = false;
  sameAsResidential: boolean;
  newSameAsResidential: boolean = false;
  sameAsResidentialChanged: boolean = false;
  oldPermanentAddress: string = "";
  permanentAddress: string = "";
  newPermanentAddress: string = "";
  permanentAddressChanged: boolean = false;
  oldPermanentPin: any;
  permanentPin: any;
  newPermanentPin: any;
  permanentPinChanged: boolean = false;
  oldEmailId: string = "";
  emailId: string = "";
  newEmailId: string = "";
  emailIdChanged: boolean = false;
  oldPhoneNo: any;
  phoneNo: any;
  newPhoneNo: any;
  phoneNoChanged: boolean = false;
  date: any;
  createdBy: number;
}
class AccidentPolicyForm {
  candidateJoiningFormId: number;
  candidateId: number;
  requisitionDetailId: number;
  oldAcidentalPolicyNominee: string = "";
  acidentalPolicyNominee: string = "";
  newAcidentalPolicyNominee: string = "";
  acidentalPolicyNomineeChanged: boolean = false;
  oldAcidentalPolicyNomineeRelationShip: number = 0;
  acidentalPolicyNomineeRelationShip: number = 0;
  newAcidentalPolicyNomineeRelationShip: number = 0;
  acidentalPolicyNomineeRelationShipChanged: boolean = false;
  oldAcidentalPolicyNomineeAddress: string = "";
  acidentalPolicyNomineeAddress: string = "";
  newAcidentalPolicyNomineeAddress: string = "";
  acidentalPolicyNomineeAddressChanged: boolean = false;
  acidentalPolicyName: string;
  createdBy: number;
}
class JoiningReportForm {
  candidateJoiningFormId: number;
  candidateId: number;
  requisitionDetailId: number;
  joiningLetterDate: string;
  joiningLetterDesignationName: string;
  joiningDate: string;
  signatureDate: string;
  signaturePlace: string;
  createdBy: number;
}
class SEBIDisclosureForm {
  candidateJoiningFormId: number;
  candidateId: number;
  requisitionDetailId: number;
  oldSEBIName: string = "";
  sebiName: string = "";
  newSEBIName: string = "";
  sebiNameChanged: boolean = false;
  sebiEmployeeNo: string = "";
  sebiDesignation: string = "";
  sebiDepartment: string = "";
  oldSEBIPanNo: string = "";
  sebiPanNo: string = "";
  newSEBIPanNo: string = "";
  sebiPanNoChanged: boolean = false;
  newSEBIMobileNo: string = "";
  sebiMobileNo: string = "";
  oldSEBIMobileNo: string = "";
  sebiMobileNoChanged: boolean = false;
  newSEBIInstitute: string = "";
  sebiInstitute: string = "";
  oldSEBIInstitute: string = "";
  sebiInstituteChanged: boolean = false;
  newSEBIPastEmployer: string = "";
  sebiPastEmployer: string = "";
  oldSEBIPastEmployer: string = "";
  sebiPastEmployerChanged: boolean = false;
  newSEBINoOfSecurity: number;
  sebiNoOfSecurity: number;
  oldSEBINoOfSecurity: number;
  sebiNoOfSecurityChanged: boolean = false;
  newSEBIDesigName: string = "";
  sebiDesigName: string = "";
  oldSEBIDesigName: string = "";
  sebiDesigNameChanged: boolean = false;
  newSEBIDesigPanNo: string = "";
  sebiDesigPanNo: string = "";
  oldSEBIDesigPanNo: string = "";
  sebiDesigPanNoChanged: boolean = false;
  newSEBIDesigMobileNo: string = "";
  sebiDesigMobileNo: string = "";
  oldSEBIDesigMobileNo: string = "";
  sebiDesigMobileNoChanged: boolean = false;
  createdBy: number;
}
class SEBIInitialDisclosureForm {
  candidateJoiningFormId: number;
  candidateId: number;
  requisitionDetailId: number;
  OldSEBIName: string = "";
  SEBIName: string = "";
  NewSEBIName: string = "";
  SEBINameChanged: boolean = false;
  OldSEBIPanNo: string = "";
  SEBIPanNo: string = "";
  NewSEBIPanNo: string = "";
  SEBIPanNoChanged: boolean = false;
  NewSEBIMobile: string = "";
  SEBIMobile: string = "";
  OldSEBIMobile: string = "";
  SEBIMobileChanged: boolean = false;
  NewSEBIInstitute: string = "";
  SEBIInstitute: string = "";
  OldSEBIInstitute: string = "";
  SEBIInstituteChanged: boolean = false;
  NewSEBIPastEmployer: string = "";
  SEBIPastEmployer: string = "";
  OldSEBIPastEmployer: string = "";
  SEBIPastEmployerChanged: boolean = false;
  NewSEBINoOfSecurity: number = 0;
  SEBINoOfSecurity: number = 0;
  OldSEBINoOfSecurity: number = 0;
  SEBINoOfSecurityChanged: boolean = false;
  NewSEBIDesigName: string = "";
  SEBIDesigName: string = "";
  OldSEBIDesigName: string = "";
  SEBIDesigNameChanged: boolean = false;
  NewSEBIDesigPanNo: string = "";
  SEBIDesigPanNo: string = "";
  OldSEBIDesigPanNo: string = "";
  SEBIDesigPanNoChanged: boolean = false;
  NewSEBIDesigMobile: string = "";
  SEBIDesigMobile: string = "";
  OldSEBIDesigMobile: string = "";
  SEBIDesigMobileChanged: boolean = false;

}

export class FamilyMembersdetails {
  candidateJoiningFormId: number;
  lineId: number;
  candidateJoiningFamilyLineId: number;
  familyName: string;  //Done
  familyRelationShip: number;  //Done
  familyRelationShipName: string;
  familyDOB: string; // Done
  isReadOnly: boolean = true;
  isNew: boolean = true;
  isDelete: boolean = false;
}

export class ImmediateRelativeDetails {
  candidateJoiningFormId: number;
  candidateImidiateRelativesLineId: number;
  imidiateRelativesName: string; // Done
  imidiateRelativesPAN: string; // Done
  imidiateRelativesPhone: string; // Done
  imidiateRelativesNoofSecurity: number; // Done
  isReadOnly: boolean;
  isNew: boolean = true;
  isDelete: boolean = false;
  lineId: number;
}


// Till this by anif for edit by AIC 01-12-2022 