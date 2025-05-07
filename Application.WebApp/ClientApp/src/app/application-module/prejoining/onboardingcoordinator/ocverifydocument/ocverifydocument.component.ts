import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ICandidateDetailData, ISearchCandidateDetail } from '../../../../interfaces/preselection/candidate.interface';
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
import { CandidateJoiningFormRelativeDetailData, IAccidentInsurancePolicyPDF, ICandidateJoiningFormDetailsForPDF, ICandidateJoiningFormFamilyDetailData, IJoiningFormFamilyDetailsPDF, IJoiningReportPDF, ISEBIDisclosurePDF } from '../../../../interfaces/preselection/candidate.interface';
// Added on 11-01-2023 from here
import { ISearchOfferLetter, IOfferLetterHeader, IOfferLetterSalaryTemplate } from '../../../../interfaces/offer/offerletter.interface'
import { ICandidateSalaryFitmentSalaryDetails, ICandidateSalaryFitmentSalaryDetailsFormat, ISalaryFitmentExperience, ISearchSalaryFitment } from '../../../../interfaces/offer/candidatesalaryfitment.interface';
import {
  ISearchInterviewCalendarAssessment, IInterviewCalendarAssessmentList,
  IInterviewCalendarAssessmentListData, IInterviewCalendarAssessmentFormData, IInterviewAssesmentRecord
} from '../../../../interfaces/selection/interviewcalendaraction.interface';
import { InterviewcalendaractionService } from '../../../../services/selection/interviewcalendaraction/interviewcalendaraction.service';
import { OfferletterService } from '../../../../services/offer/offerletter/offerletter.service';
import { SalaryfitmentService } from '../../../../services/offer/salaryfitment/salaryfitment.service';
import { isNullOrUndefined } from 'util';
import { Observable, Observer } from 'rxjs';
import {
  ICandidateProfile, ISearchCandidateProfile, ICandidateFamilyDetails,
  ICandidateMRFRelatives, ICandidateTyreRelatives, ICandidateAcademicDetails, ICandidateCertificationDetails,
  ICandidateMembershipDetails, ICandidateExtraCarricularActivitiesDetails, ICandidateLanguageKnownDetails,
  ICandidatePeviousAssignmentDetails
} from '../../../../interfaces/candidate/candidateprofile.interface';
import { LocationService } from 'src/app/services/common/location/location.service';
// Till this on 11-01-2023 
declare var jQuery: any;
declare var html2pdf: any;


@Component({
  selector: 'app-ocverifydocument',
  templateUrl: './ocverifydocument.component.html',
  styleUrls: ['./ocverifydocument.component.css']
})
export class OcverifydocumentComponent implements OnInit {

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
  enableModifyForMed: boolean = false;
  batchId: number;
  batchNo: string;
  onBoardingCoordinator: number;


  roleIds: string;
  verifiedStatus: boolean = false;
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
  verticalIds: string;
  From: string;
  FromType: string;
  // Added from here on 11-01-2023
  // Offer Letter PDF
  offerLetterHTML: string = "";
  offerLetterHeader: IOfferLetterHeader;
  searchOfferLetter: ISearchOfferLetter = {
    offerLetterId: null,
    candidateId: null,
    requsitaionDetailsId: null,
  }
  documentDataForSalaryFitmentDownload: ICandidateOfferDocument; // Added by Anif behalf of piu for salary fitment download on 08-08-2022 as same ref replacing othe data
  attachedSubmittedDocumentArrayListForSalaryFitment: IOfferDocumentAttachmentDetails[] = [];
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
  monthlyTotalForSalfitment: number;
  yearlyTotalForSalfitment: number;
  salaryFitmentId: number = 0;
  searchSalaryFitment: ISearchSalaryFitment = {
    salaryFitmentId: null,
    requsitaionDetailsId: null,
    candidateId: null
  }
  // Application Form PDF
  applicationFormData: any;
  candidateProfile: ICandidateProfile;
  searchCandidateProfile: ISearchCandidateProfile = {
    candidateId: null,
    candidateProfileId: null,
    requisitionDetailId: null
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
  searchAdditionDetailsForSalaryFitment = {
    candidateId: null,
    requisitionDetailId: null
  }
  savedSalaryData: any;
  salaryFitmentRemarks: any[] = [];
  ourOffer: number;
  additionalDeatails: any[] = [];
  // Till this on 11-01-2023
  //14-07-2023
  availableDocumentNameIds: any[] = [];
  candidateName: string;
  candidateNo: string;
  constructor(
    private _route: Router,
    private locationService: LocationService,
    private SpinnerService: NgxSpinnerService,
    private candidateService: CandidateService,
    private requisitionService: RequisitionService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private testScheduleService: TestscheduleService,
    private documentService: CandidateofferdocumentService,
    private attachmentDocumentService: AttachmentdocumentService, private salaryFitmentService: SalaryfitmentService,
    private interActionService: InterviewcalendaractionService, private offerLetterService: OfferletterService,
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    if (this.persistance.get('pagename') != null || this.persistance.get('nextpagename') != null) {
      if (this.persistance.get('pagename') == "viewcandidatelist" && this.persistance.get('nextpagename') == "ocverifydocument") {

        this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
        this.roleIds = this.persistance.get('loggedinuser').roleIds;
        this.roleArr = this.roleIds.split(",");
        for (var i = 0; i < this.roleArr.length; i++) {
          if (this.roleArr[i] == "2" || this.roleArr[i] == "3" || this.roleArr[i] == "4") {
            this.verifiedStatus = true;
          }
        }
        this.candidateId = this.persistance.get('candidateId');
        this.candidateName = this.persistance.get('candidateName');
        this.candidateNo = this.persistance.get('candidateNo');
        this.batchId = this.persistance.get('BatchId');
        this.batchNo = this.persistance.get('BatchNo');
        this.From = this.persistance.get('From');
        this.FromType = this.persistance.get('FromType');
        this.onBoardingCoordinator = this.persistance.get('OnBoardingcoordinator');
        this.requisitionDetailId = this.persistance.get('paramid');

        this.getCandidateList();
        this.getTestReult();
        this.getAllDocumentType();
        this.getAllDocumentParticulars();
        this.getAllDocumentName();
        this.getCandidateProfile();
        this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
        this.getCandidateOfferDocument();
        this.getAllJoiningFormDetailsForPDF();
        this.getCandidateOfferDocumentForSalaryFitmentDownload();
        this.getOfferLetterHeader();
        this.getAssessmentList();
        this.getSalaryFiltmentList();
      } else {
        this._route.navigate(['/app/my-action/verifymedicaldocument']);
      }
    }
    else {
      this._route.navigate(['/app/my-action/verifymedicaldocument']);
    }
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
  getCandidateOfferDocument() {
    this.documentData = null;
    this.searchDocument.requsitaionDetailsId = this.requisitionDetailId;
    this.searchDocument.candidateId = this.candidateId;
    this.documentService.getCandidateOfferDocument(this.searchDocument).subscribe((result) => {
      if (result) {
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

    // this.submittedDocumentArrayList = [];
    // for (var i = 0; i < this.attachedSubmittedDocumentArrayList.length; i++) {
    //   var nflag = 0;
    //   for (var j = 0; j < this.submittedDocumentArrayList.length; j++) {
    //     if (this.attachedSubmittedDocumentArrayList[i].doumentType == this.submittedDocumentArrayList[j].doumentType) {
    //       nflag = 1;
    //     }
    //   }
    //   if (nflag == 0) {
    //     this.submittedDocumentArrayList.push({
    //       doumentType: this.attachedSubmittedDocumentArrayList[i].doumentType,
    //       doumentTypName: this.attachedSubmittedDocumentArrayList[i].doumentTypName,
    //       documents: this.attachedSubmittedDocumentArrayList.filter(x => x.doumentType == this.attachedSubmittedDocumentArrayList[i].doumentType)
    //     })
    //   }
    // }

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
      canEditRoleId.forEach((element_edit, index) => {
        this.roleArr.forEach((element_rolearr, index) => {
          if ((element_edit == element_rolearr && this.attachedSubmittedDocumentArrayList[i].approvalStatus != 3) || (this.attachedSubmittedDocumentArrayList[i].requestedBy == this.createdBy && this.attachedSubmittedDocumentArrayList[i].approvalStatus != 3) || element_rolearr == 49) {
            this.attachedSubmittedDocumentArrayList[i].disabledField = false;
            // if(this.attachedSubmittedDocumentArrayList[i].approvalStatus==2){ //addded by Amartya on 01-09-2023 for need clarification disable
            //   this.attachedSubmittedDocumentArrayList[i].disabledField = true;//addded by Amartya on 01-09-2023 for need clarification disable
            // }
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
    //   newArray.push(getitem);
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

  // groupSubmittedAttachedDocument() {
  //   this.submittedDocumentArrayList = [];
  //   // Added on 07/03/2022
  //   this.attachedSubmittedDocumentArrayList.forEach(element => {
  //     element.disabledField = true;
  //   })

  //   // -- Till this
  //   for (var i = 0; i < this.attachedSubmittedDocumentArrayList.length; i++) {
  //     var nflag = 0;
  //     for (var j = 0; j < this.submittedDocumentArrayList.length; j++) {
  //       if (this.attachedSubmittedDocumentArrayList[i].doumentType == this.submittedDocumentArrayList[j].doumentType) {
  //         nflag = 1;
  //       }
  //     }
  //     // Added on 07/03/2022
  //     var canEditRoleId = this.attachedSubmittedDocumentArrayList[i].roleId.split(",");
  //     canEditRoleId.forEach((element_edit, index) => {
  //       this.roleArr.forEach((element_rolearr, index) => {
  //         if ((element_edit == element_rolearr && this.attachedSubmittedDocumentArrayList[i].approvalStatus != 3) || (this.attachedSubmittedDocumentArrayList[i].requestedBy == this.createdBy && this.attachedSubmittedDocumentArrayList[i].approvalStatus != 3)) {
  //           this.attachedSubmittedDocumentArrayList[i].disabledField = false;
  //         }
  //       })
  //     })
  //     // -- Till this
  //     if (nflag == 0) {
  //       this.submittedDocumentArrayList.push({
  //         doumentType: this.attachedSubmittedDocumentArrayList[i].doumentType,
  //         doumentTypName: this.attachedSubmittedDocumentArrayList[i].doumentTypName,
  //         documents: this.attachedSubmittedDocumentArrayList.filter(x => x.doumentType == this.attachedSubmittedDocumentArrayList[i].doumentType)
  //       })
  //     }
  //   }
  //   var documentList=this.submittedDocumentArrayList.filter(e => e.doumentType == 6 || e.doumentType == 4);
  //   this.submittedDocumentArrayList=this.submittedDocumentArrayList.filter(e => e.doumentType != 6);
  //   this.submittedDocumentArrayList=this.submittedDocumentArrayList.filter(e => e.doumentType != 4);
  //   var newArray=[]
  //   this.submittedDocumentArrayList.push({
  //     doumentType:4,
  //     doumentTypName:"Prejoining & Onboarding",
  //     documents:[]
  //   })
  //   for(var i=1;i<=19;i++){
  //     var getdetails=documentList[0]
  //     var getitem=getdetails.documents.find( e=> e.orderColumn ==i);
  //     if(getitem ==undefined){
  //       var getdetails=documentList[1]
  //       var getitem=getdetails.documents.find( e=> e.orderColumn ==i);
  //     }
  //     newArray.push(getitem);
  //   }
  //   for(var i=0;i<this.submittedDocumentArrayList.length;i++){
  //     if(this.submittedDocumentArrayList[i].doumentType==4){
  //       this.submittedDocumentArrayList[i].documents=newArray;
  //     }
  //   }
  //   var lastDocuments = this.submittedDocumentArrayList.filter(e => e.doumentType == 1 || e.doumentType == 2 || e.doumentType==3);
  //   this.submittedDocumentArrayList=this.submittedDocumentArrayList.filter(e => e.doumentType != 1);
  //   this.submittedDocumentArrayList=this.submittedDocumentArrayList.filter(e => e.doumentType != 2);
  //   this.submittedDocumentArrayList=this.submittedDocumentArrayList.filter(e => e.doumentType != 3);
  //   for(var val of lastDocuments){
  //     this.submittedDocumentArrayList.push(val);
  //   }
  // }

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
    this.persistance.set('pagename', "viewcandidatelist");
    this.persistance.set('nextpagename', null);
    this._route.navigate(['/app/viewcandidatedetails'], { queryParams: { BatchId: this.batchId, BatchNo: this.batchNo, OnBoardingcoordinator: this.onBoardingCoordinator, From: this.From, Type: this.FromType } });
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
    this.SpinnerService.show();
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
    // if (flag == 1) {
    if (flag == 3) {  // Added by anif on 26-08-2022 as rmverifycandidatedocument.ts have this logic
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
            approvalStatus: this.submittedDocumentArrayList[i].documents[j].approvalStatus == 4 ? 3 : this.submittedDocumentArrayList[i].documents[j].approvalStatus,
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
        formData.append("CandidateName", this.candidates[0].fullName);
        formData.append("CandidateNo", this.candidates[0].candidateNo);
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
          this.gotoCandidateList();
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
          // if (this.candidateJoiningFormPDFAllDetails.familyDetail.length == index + 1) {

          // }
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
  // Added on 11-01-2023 from here
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
  // Salary fitmrnt PDF
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
  getMonthlyTotalForSalaryFitmentDownload() {
    this.monthlyTotalForSalfitment = 0;
    for (var i = 0; i < this.documentDataForSalaryFitmentDownload.salaryDetails.length; i++) {
      this.monthlyTotalForSalfitment = this.monthlyTotalForSalfitment + this.documentDataForSalaryFitmentDownload.salaryDetails[i].monthly;
    }
  }
  getYearlyTotalForSalaryFitmentDownload() {
    this.yearlyTotalForSalfitment = 0;
    for (var i = 0; i < this.documentDataForSalaryFitmentDownload.salaryDetails.length; i++) {
      this.yearlyTotalForSalfitment = this.yearlyTotalForSalfitment + this.documentDataForSalaryFitmentDownload.salaryDetails[i].yerly;
    }
    this.oldCTC = this.yearlyTotalForSalfitment;
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

        // Added by ani on 14-07-2022 to download only accepeted salary

        this.savedSalaryData.salaryFitmentDetails.forEach((ele, index) => {
          if (index == (this.savedSalaryData.salaryFitmentDetails.length - 1)) {
            this.salaryFitmentDataForPDF.new = ele.salaryFitmentSalaryDetailsFormat;
          }
        })
        if (!isNullOrUndefined(this.savedSalaryData.salaryFitmentDetails[0])) {
          for (var i = 0; i < this.savedSalaryData.salaryFitmentDetails.length; i++) {
            if (i == this.savedSalaryData.salaryFitmentDetails.length - 1) {
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

        if (this.oldCTC == null || this.oldCTC == undefined) {    //by Kuntal das chowdhury on 15/07/2022 
          this.oldCTC = 0;
        }
        this.ourOffer = (this.finalCTC - this.oldCTC);       //by Kuntal das chowdhury on 15/07/2022 
        this.salaryFitmentDataForPDF.percent = this.ourOffer; //by Kuntal das chowdhury on 15/07/2022 
        this.salaryFitmentDataForPDF.candidateFullName = this.savedSalaryData.candidateFullName;
        //this.getTotalYears();
        // this.percentBasic = ((this.finalBasic - this.oldBasic) / this.oldBasic) * 100;
        this.percentBasic = (this.finalBasic / this.finalCTC) * 100;          //by Kuntal das chowdhury on 15/07/2022
        this.percentCTC = (((this.finalCTC - this.oldCTC) / this.oldCTC) * 100);
        if (this.percentCTC == Infinity) {    //by Kuntal das chowdhury on 26/07/2022
          this.percentCTC = 0;
        }
        this.salaryFitmentDataForPDF.in = this.percentCTC;

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
  //  Till this on 11-01-2023 from here
  downLoadPDF(type: any) {
    var fileName;
    var downloadMode = "landscape";  // Added this on 11-01-2023
    var downloadSize = 10;           // Added this on 11-01-2023
    switch (type) {
      case 21:
        var htmlstring = document.getElementById("printFamilyDetailsDiv").innerHTML;
        fileName = this.candidateId.toString() + "Family_Details.pdf";
        downloadSize = 6;
        break;
      case 23:
        var htmlstring = document.getElementById("printJoiningReport").innerHTML;
        fileName = this.candidateId.toString() + "Joining_Report.pdf"
        break;
      case 22:
        var htmlstring = document.getElementById("printAccidentInsurancePolicy").innerHTML;
        fileName = this.candidateId.toString() + "Accident_Insurance_Policy.pdf"
        break;
      case 17:
        var htmlstring = document.getElementById("printSEBIDisclosure").innerHTML;
        fileName = this.candidateId.toString() + "SEBI_Disclosure.pdf"
        break;
      case 24:
        var htmlstring = document.getElementById("printerdivApplicationForm").innerHTML;
        fileName = this.candidateId.toString() + "_Application_Form.pdf";
        downloadMode = "portrait";
        downloadSize = 6;
        break;
      case 26:    // Added this on 11-01-2023 
        var htmlstring = document.getElementById("printerdivInterviewAssessment").innerHTML;
        fileName = this.candidateId.toString() + "_Interview_Assessment.pdf";
        break;
      case 29:      // Added this on 11-01-2023
        var htmlstring = this.offerLetterHTML;
        fileName = this.candidateId.toString() + "_Offer_Letter.pdf";
        downloadMode = "portrait";
        break;
      case 39:    // Added this on 11-01-2023
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
      margin: downloadSize,
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
