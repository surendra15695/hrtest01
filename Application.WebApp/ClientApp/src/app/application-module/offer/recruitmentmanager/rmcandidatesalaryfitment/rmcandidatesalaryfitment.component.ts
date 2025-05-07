import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../interfaces/common/position.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IGrade, ISearchGrade } from '../../../../interfaces/common/grade.interface';
import {
  ISearchSalaryAccountHead, ISalaryAccountHead, ISalaryFormula, ISalaryArray, ISalaryTemplateMasterData,
  ISearchSalaryTemplate, ISalaryTemplateList, ICalculateSalary, ISalaryTemplateDetails, ISearchCalculateSalary,

} from '../../../../interfaces/common/paystructure.interface'
import { PaystructureService } from 'src/app/services/common/paystructure/paystructure.service';
import { GradeService } from 'src/app/services/common/grade/grade.service';
import { ICandidateDetailData, ISearchCandidateDetail } from '../../../../interfaces/preselection/candidate.interface';
import { IRequisitionCandidateHiringStatusFormData } from '../../../../interfaces/preselection/requisition.interface';
import {
  ICandidateSalaryFitmentSalaryDetails, ICandidateSalaryFitmentSalaryDetailsFormat,
  ISalaryFitmentRemarks, ISearchSalaryFitment, ISalaryFitmentExperience
} from '../../../../interfaces/offer/candidatesalaryfitment.interface'
import { RequisitionService } from '../../../../services/preselection/requisition/requisition.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { CandidateService } from '../../../../services/preselection/candidate/candidate.service';
import { NotificationService } from '../../../../sharedservices/notification.service';
import {
  ICandidateOfferDocument, ISearchCandidateOfferDocument, IPreviousSalaryDetails, IOfferDocumentAttachmentDetails,
  IAttachedDocument, IAttachedDocumentArrayList, IOfferDocumentRemarksDetails,
  IAttachmentApprovalData, ISubmittedAttachedDocumentArrayList
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
import { SalaryfitmentService } from '../../../../services/offer/salaryfitment/salaryfitment.service';
import { PositionService } from '../../../../services/common/position/position.service';
import { LocationService } from '../../../../services/common/location/location.service';
import { isNullOrUndefined } from 'util';
declare var jQuery: any;
declare var html2pdf: any;


@Component({
  selector: 'app-rmcandidatesalaryfitment',
  templateUrl: './rmcandidatesalaryfitment.component.html',
  styleUrls: ['./rmcandidatesalaryfitment.component.css']
})
export class RmcandidatesalaryfitmentComponent implements OnInit {
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  @ViewChild('closeSalaryModal', { static: false }) closeSalaryModal: ElementRef;
  // Added by arghya on 27-06-2022
  gradeName: any;
  gradeVal: any = [];
  // Till this
  locations: ILocation[] = [];
  selectedLocation: ILocation;
  selectedLocationCode: string = "";
  selectedLocationOffice: string = "";
  searchLocation: ISearchLocation =
    {
      locationId: null,
      verticalId: null,
      locationCode: null,
      locationNo: null,
      isActive: true
    };
  locationId: number;
  positions: IPositionVerticalDetail[] = [];
  selectedPosition: IPositionVerticalDetail;
  searchPosition: ISearchPosition = {
    verticalId: null,
    positionId: null,
    isActive: true
  }
  positionId;
  positionName: string;

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
  attachedSubmittedDocumentArrayList: IOfferDocumentAttachmentDetails[] = [];
  submittedDocumentArrayList: ISubmittedAttachedDocumentArrayList[] = [];
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

  gradeList: IGrade[] = [];
  searchGrade: ISearchGrade = {
    gradeId: null,
    isActive: true
  }
  file: File;
  candidateSalaryFitmentSalaryDetailsFormatpdf: ICandidateSalaryFitmentSalaryDetailsFormat[] = []
  searchSalaryTemplate: ISearchSalaryTemplate = {
    salaryTemplateId: null,
    grade: null,
    isActive: true
  };
  salaryTemplateList: ISalaryTemplateList;
  selectedGradeId: number;
  selectedTemplateId: number;
  searchSalaryTemplateDetails: ISalaryTemplateDetails[];
  calculatedSalary: any;
  searchSalaryArray: ISalaryArray[];
  searchCalculatePayStructure: ISearchCalculateSalary = {
    calculteSalryDetails: null
  };

  salaryFitmentExperience: ISalaryFitmentExperience[] = [];

  salaryTemplates: ISalaryTemplateMasterData[] = [];
  salaryFitmentDetailsId: number = 0;
  salaryFitmentId: number = 0;
  salaryFitmentRemarks: any[] = [];
  salaryFitRemarks: ISalaryFitmentRemarks[] = [];

  candidateSalaryFitmentDetails: ICandidateSalaryFitmentSalaryDetails[] = [];
  candidateSalaryFitmentSalaryDetailsFormat: ICandidateSalaryFitmentSalaryDetailsFormat[] = [];
  searchSalaryFitment: ISearchSalaryFitment = {
    salaryFitmentId: null,
    requsitaionDetailsId: null,
    candidateId: null
  }
  savedSalaryData: any;
  // Added by anif on 25-06-2022
  savedSalaryDataDup: any;
  selectedCandidateDesignationId: number;
  selectedCandidateLocationId: number;
  selectedCandidateProbationIdId: number;
  selectedCandidateDesignationText: string;
  finalBasic: number;
  finalCTC: number;
  oldBasic: number;
  oldCTC: number;
  ourOffer: number;
  percentBasic: number;
  percentCTC: number;
  allexperience: number;
  fileName: string;

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
    candidateFullName: '',
    isExperinced: true,
    existingMonthly: 0,
    existingYearly: 0
  }
  showExperience: boolean = true;
  // Added by Anif on 02-07-2022
  candidateNo: string;
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
    private gradeService: GradeService,
    private payStructureService: PaystructureService,
    private salaryFitmentService: SalaryfitmentService,
    private locationService: LocationService,
    private positionService: PositionService,
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.showExperience = true;
    if (this.persistance.get('pagename') != null || this.persistance.get('nextpagename') != null) {
      if ((this.persistance.get('pagename') == "rmcandidatelist" || this.persistance.get('pagename') == "dummyrmcandidatelist") && this.persistance.get('nextpagename') == "candidatedocuments") {
        this.candidateId = this.persistance.get('candidateId');
        this.requisitionDetailId = this.persistance.get('paramid');
        this.getAllGrade();
        this.getAllPosition();
        this.getAllLocation();
        this.salaryTemplates = [];
        this.getCandidateList();
        this.getTestReult();
        this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
        this.getCandidateOfferDocument();
        this.salaryFitmentId = 0;
        setTimeout(() => {  // Added this by ANif on 22-07-2022 as some time old CTC not geting as call is async
          this.getSalaryFiltmentList();
        }, 1000);
        //this.getSalaryFiltmentList();   // Previously was
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
  // Added Anif on 25-06-2022 for datepicker
  loadDatePickerFrom() {
    var dothis = this;
    jQuery(".datepickerfrom").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      container: '.content',
      todayHighlight: true
    }).on("change", function (e) {
      //var selecteddate = e.target.value;
      // alert(e.target.value);
      var datepickerid = jQuery(e.target).attr("id");
      var expFromId = parseInt(datepickerid.replace("datepickerfrom", ""));
      dothis.calculateDays(expFromId, e.target.value, "From")

    });

  }
  loadDatePickerTo() {
    var dothis = this;
    jQuery(".datepickerto").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      container: '.content',
      todayHighlight: true
    }).on("change", function (e) {
      //var selecteddate = e.target.value;
      var datepickerid = jQuery(e.target).attr("id");
      var expToId = parseInt(datepickerid.replace("datepickerto", ""));
      dothis.calculateDays(expToId, e.target.value, "To")
    });
  }

  getAllGrade() {
    this.SpinnerService.show();
    this.gradeService.getAllGrade(this.searchGrade).subscribe((response: any) => {
      if (response) {
        this.gradeList = response;
      }
      else {
        this.gradeList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    })
  }

  getCandidateOfferDocument() {
    this.documentData = null;
    this.searchDocument.candidateId = this.candidateId;
    this.documentService.getCandidateOfferDocument(this.searchDocument).subscribe((result) => {
      if (result) {
        this.documentData = result;
        this.attachedSubmittedDocumentArrayList = this.documentData.attachmentDetails.filter(x => x.doumentNameId != 28 && x.doumentNameId != 29);
        this.salaryFitmentDataForPDF.existing = this.documentData.salaryDetails;
        this.groupSubmittedAttachedDocument();
        this.submittedSalaryRemarksDetails = this.documentData.remaksDetails.filter(x => x.remarksType == 1);
        this.submittedAdditionalRemarksDetails = this.documentData.remaksDetails.filter(x => x.remarksType == 2);
        this.getMonthlyTotal();
        this.getYearlyTotal();
        this.salaryRemarks = "";
        this.additionalRemarks = "";
        if (this.documentData.salaryDetails.length > 0) {
          // added by anif on 25-06-202 as if no basic emolumntname then filter given undefined error
          var checkBasic = this.documentData.salaryDetails.find(x => x.emolumntName.toLowerCase() == 'basic');
          if (checkBasic != undefined) {
            this.oldBasic = this.documentData.salaryDetails.filter(x => x.emolumntName.toLowerCase() == 'basic')[0].yerly;
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

  groupSubmittedAttachedDocument() {
    this.submittedDocumentArrayList = [];
    for (var i = 0; i < this.attachedSubmittedDocumentArrayList.length; i++) {
      var nflag = 0;
      for (var j = 0; j < this.submittedDocumentArrayList.length; j++) {
        if (this.attachedSubmittedDocumentArrayList[i].doumentType == this.submittedDocumentArrayList[j].doumentType) {
          nflag = 1;
        }
      }
      if (nflag == 0) {
        this.submittedDocumentArrayList.push({
          doumentType: this.attachedSubmittedDocumentArrayList[i].doumentType,
          doumentTypName: this.attachedSubmittedDocumentArrayList[i].doumentTypName,
          documents: this.attachedSubmittedDocumentArrayList.filter(x => x.doumentType == this.attachedSubmittedDocumentArrayList[i].doumentType)
        })
      }
    }
  }

  getCandidateList() {
    this.candidates = [];
    this.searchCandidate.CandidateId = this.candidateId;
    this.searchCandidate.RequisitionDetailId = this.requisitionDetailId;
    this.candidateService.getCandidateList(this.searchCandidate).subscribe((result) => {
      if (result) {
        this.candidates = result;
        if (this.candidates[0].experienceMonth == 0 && this.candidates[0].experienceYear == 0) {
          this.salaryFitmentDataForPDF.isExperinced = false;
          this.showExperience = false;
        }
        if (this.candidates.length > 0) {
          this.candidateNo = this.candidates[0].candidateNo;
        }
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
    this.persistance.set('pagename', "rmrequisitionlist");
    this.persistance.set('nextpagename', null);
    var page = this.persistance.get('pagename')
    if (page == "dummyrmcandidatelist") {
      this._route.navigate(['/app/campus/dummyrequisition-candidatelist']);
    } else {
      this.persistance.set('previouspageparams', this.persistance.get('previouspagefilter'));
      this.persistance.set('tabledisplayStartcandi', this.persistance.get('tabledisplayStartcandi'));
      this._route.navigate(['/app/my-action/all-positions/candidate-list']);
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
    this.oldCTC = this.yearlyTotal;
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
        createdBy: this.autoUserId
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
    }
    else {
      this.isAdditionalDocumentReq = false;
    }
  }

  onChangeTemplate(evt) {
    this.salaryTemplateList = null;
    this.searchSalaryTemplate.salaryTemplateId = evt;
    this.payStructureService.getAllSalaryTemplate(this.searchSalaryTemplate).subscribe((response: any) => {
      if (response) {
        this.salaryTemplateList = response;
        this.searchSalaryTemplateDetails = this.salaryTemplateList.salaryTemplateDetails;
      }
      else {
        this.salaryTemplateList = null;
      }
    }, error => {
      console.log(error);
    }, () => {
    })
  }

  getCalculatedSalaryTemplate() {
    this.searchSalaryArray = [];
    for (var i = 0; i < this.searchSalaryTemplateDetails.length; i++) {
      this.searchSalaryArray.push({
        salaryAccountHead: this.searchSalaryTemplateDetails[i].salaryAccountHeadId,
        formula: this.searchSalaryTemplateDetails[i].salaryFormula,
        amount: this.searchSalaryTemplateDetails[i].salaryValue.toString(),
      })
    }
    this.calculatedSalary = null;
    this.searchCalculatePayStructure.calculteSalryDetails = this.searchSalaryArray;

    console.log("To be Calculated", this.searchCalculatePayStructure);
    this.payStructureService.getCalculatedSalaryTemplate(this.searchCalculatePayStructure).subscribe((response: any) => {
      if (response) {
        this.calculatedSalary = response;
        console.log("Calculated salary", this.calculatedSalary);
        this.calculateBasicCTCPercent(this.calculatedSalary);
        this.closeSalaryModal.nativeElement.click();
        this.salaryTemplates = [];
      }
      else {
        this.calculatedSalary = null;
      }
    }, error => {
      console.log(error);
    }, () => {
    })
  }

  onChangeGrade(evt) {
    this.salaryTemplates = [];
    this.searchSalaryTemplate.grade = evt;
    // Added anif because on change grade the salary template not get populated
    this.gradeVal = this.gradeList.filter(obj => obj.gradeId == this.searchSalaryTemplate.grade)  // Added By arghya on 27-06-2022
    this.gradeName = this.gradeVal[0].gradeName;     // Added By arghya on 27-06-2022
    this.searchSalaryTemplate.salaryTemplateId = null;
    this.payStructureService.getAllSalaryTemplateList(this.searchSalaryTemplate).subscribe((response: any) => {
      if (response) {
        this.salaryTemplates = response;
      }
      else {
        this.salaryTemplates = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    })
  }

  submitData() {
    var flag = 0;
    var msg = "";
    this.candidateSalaryFitmentDetails = [];
    this.candidateSalaryFitmentSalaryDetailsFormat = [];
    this.salaryFitRemarks = [];
    if (this.calculatedSalary == null) {
      flag = 1;
      msg = "Please set salary";
    }
    //else {
    //  msg = "";
    //}
    if (this.selectedCandidateDesignationText == undefined || this.selectedCandidateDesignationText == "") {
      flag = 1;
      msg = "Please select designation";
    }
    //else {
    //  msg = "";
    //}
    if (this.selectedCandidateLocationId == undefined || this.selectedCandidateLocationId == 0) {
      flag = 1;
      msg = "Please select location";
    }
    //else {
    //  msg = "";
    //}
    if (this.selectedCandidateProbationIdId == undefined || this.selectedCandidateProbationIdId == 0) {
      flag = 1;
      msg = "Please select probation period";
    }
    //else {
    //  msg = "";
    //}
    var j = 0;
    if (this.salaryFitmentRemarks.length > 0) {
      if (this.additionalRemarks == undefined || this.additionalRemarks == "") {
        flag = 1;
        jQuery(".txtremarks").addClass("is-invalid");
        msg = "Please give remarks";
      }
      else {
        jQuery(".txtremarks").removeClass("is-invalid");
        for (var i = this.salaryFitmentRemarks.length; i > 0; i--) {
          this.salaryFitmentRemarks[i - 1].modifiedBy = this.createdBy;
          this.salaryFitmentRemarks[i - 1].reamrksReply = this.additionalRemarks;
          this.salaryFitmentRemarks[i - 1].modifiedOn = "";
          j++;
          if (j > 0) {
            this.salaryFitRemarks.push(this.salaryFitmentRemarks[i - 1]);
            i = 0;
          }
        }
      }

    }
    if (flag == 0) {
      this.SpinnerService.show();
      this.candidateSalaryFitmentDetails = [];
      for (var i = 0; i < this.calculatedSalary.claCulatePayStructureValue.length; i++) {
        this.candidateSalaryFitmentDetails.push({
          salaryFitmentDetailsId: 0,
          salaryFitmentId: this.salaryFitmentId,
          salaryFitmentSalaryDetailsLineId: 0,
          salaryAccountHeadId: this.calculatedSalary.claCulatePayStructureValue[i].salaryAccountHeadId,
          salaryAccountHeadName: this.calculatedSalary.claCulatePayStructureValue[i].salaryAccountHeadName,
          salaryFormula: this.calculatedSalary.claCulatePayStructureValue[i].salaryFormula,
          salaryValue: Number(this.calculatedSalary.claCulatePayStructureValue[i].amount),
          calculatedSalaryValue: Number(this.calculatedSalary.claCulatePayStructureValue[i].calculatedValue),
          calculatedSalaryValueYearly: Number(this.calculatedSalary.claCulatePayStructureValue[i].calculatedValueYerly),
          createdBy: this.createdBy,
        })
      }
      for (var i = 0; i < this.calculatedSalary.claCulatePayStructureValueFormat.length; i++) {
        this.candidateSalaryFitmentSalaryDetailsFormat.push({
          salaryFitmentDetailsId: 0,
          salaryFitmentId: this.salaryFitmentId,
          salaryFitmentSalaryDetailsFormatId: 0,
          dbOrder: this.calculatedSalary.claCulatePayStructureValueFormat[i].dbOrder,
          visibleOrder: this.calculatedSalary.claCulatePayStructureValueFormat[i].order,
          salaryAccountHeadId: Number(this.calculatedSalary.claCulatePayStructureValueFormat[i].salaryAccountHeadId),
          salaryAccountHeadName: this.calculatedSalary.claCulatePayStructureValueFormat[i].salaryAccountHeadName,
          calculatedSalaryValue: Number(this.calculatedSalary.claCulatePayStructureValueFormat[i].calculatedValue),
          calculatedSalaryValueYearly: Number(this.calculatedSalary.claCulatePayStructureValueFormat[i].calculatedValueYerly),
          createdBy: this.createdBy,
        })
      }
      this.salaryFitmentExperience = [];
      for (var i = 0; i < this.savedSalaryData.salaryFitmentExperience.length; i++) {
        this.salaryFitmentExperience.push({
          SalaryFitmentExperienceId: this.savedSalaryData.salaryFitmentExperience[i].salaryFitmentId == 0 ? 0 : this.savedSalaryData.salaryFitmentExperience[i].salaryFitmentExperienceId,
          SalaryFitmentId: 0,
          Organisation: this.savedSalaryData.salaryFitmentExperience[i].organisation,
          From: this.savedSalaryData.salaryFitmentExperience[i].from,
          To: this.savedSalaryData.salaryFitmentExperience[i].to,
          Days: this.savedSalaryData.salaryFitmentExperience[i].days,
          Years: this.savedSalaryData.salaryFitmentExperience[i].years,
          Remarks: this.savedSalaryData.salaryFitmentExperience[i].remarks,

        })

      }
      //this.salaryFitmentDataForPDF.exp = this.savedSalaryData.salaryFitmentExperience[0];
      const formData = new FormData();
      formData.append("CandidateId", this.candidateId.toString());
      formData.append("SalaryFitmentDetailsId", this.salaryFitmentDetailsId.toString());
      formData.append("SalaryFitmentId", this.salaryFitmentId.toString());
      formData.append("RequsitaionDetailId", this.requisitionDetailId.toString());
      formData.append("Grade", this.selectedGradeId.toString());
      formData.append("Probation", this.selectedCandidateProbationIdId.toString());
      formData.append("Location", this.selectedCandidateLocationId.toString());
      formData.append("Designation", this.selectedCandidateDesignationText); //this.selectedCandidateDesignationId.toString());
      formData.append("CreatedBy", this.autoUserId.toString());
      formData.append("CTC", this.finalCTC.toString());
      formData.append("CTCIncrementPercent", this.percentCTC.toString());
      formData.append("BasicIncrementPercent", this.percentBasic.toString());
      formData.append("SalaryFitmentInternalEmployee", JSON.stringify([]));
      formData.append("SalaryFitmentExperience", JSON.stringify(this.salaryFitmentExperience));
      formData.append("SalaryFitmentRemaks", JSON.stringify(this.salaryFitRemarks));
      formData.append("SalaryFitmentSalaryDetails", JSON.stringify(this.candidateSalaryFitmentDetails));
      formData.append("SalaryFitmentSalaryDetailsFormat", JSON.stringify(this.candidateSalaryFitmentSalaryDetailsFormat));
      formData.append("theFile", this.file);

      this.salaryFitmentService.saveSalaryFitment(formData).subscribe((result) => {
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.closeModal.nativeElement.click();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.closeModal.nativeElement.click();
          this.notificationService.showSuccess(result.msg, "Success");
          this.getCandidateOfferDocument();
          this.getSalaryFiltmentList();
          this.calculatedSalary = null;
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
        this.closeModal.nativeElement.click();
        this.notificationService.showError("Something went wrong", "Error")
      });
    }
    else {
      this.notificationService.showError(msg, "Error")
    }
  }
  //Piu Biswas
  getSalaryFiltmentList() {
    this.salaryFitmentId = 0;
    this.searchSalaryFitment.candidateId = this.candidateId;
    this.searchSalaryFitment.requsitaionDetailsId = this.requisitionDetailId;
    this.salaryFitmentService.getSalaryFitment(this.searchSalaryFitment).subscribe((response: any) => {
      if (response) {
        this.savedSalaryData = response;

        this.savedSalaryDataDup = JSON.parse(JSON.stringify(response));  // Added by anif on 25-06-2022
        this.salaryFitmentDataForPDF.exp = response.salaryFitmentExperience;
        if (this.savedSalaryData.salaryFitmentDetails.length > 0) {   // Added by anif on 25-06-2022 to check the legth as below line showing undefined
          // Added by ani on 14-07-2022 to download only accepeted salary

          this.savedSalaryData.salaryFitmentDetails.forEach((ele, index) => {
            if (index == (this.savedSalaryData.salaryFitmentDetails.length - 1)) {
              this.salaryFitmentDataForPDF.new = ele.salaryFitmentSalaryDetailsFormat;
            }
          })
          // var acceptedSal = this.savedSalaryData.salaryFitmentDetails.find(x => x.acceptance == 2 || x.acceptance == 1);
          //   this.salaryFitmentDataForPDF.new = acceptedSal.salaryFitmentSalaryDetailsFormat;
        }
        //this.selectedCandidateDesignationId=this.savedSalaryData.salaryFitmentDetails[0].designation;
        if (!isNullOrUndefined(this.savedSalaryData.salaryFitmentDetails[0])) {
          for (var i = 0; i < this.savedSalaryData.salaryFitmentDetails.length; i++) {
            if (i == this.savedSalaryData.salaryFitmentDetails.length - 1) {
              this.selectedCandidateDesignationText = this.savedSalaryData.salaryFitmentDetails[i].designationName;
              this.selectedCandidateLocationId = this.savedSalaryData.salaryFitmentDetails[i].location;
              this.selectedCandidateProbationIdId = this.savedSalaryData.salaryFitmentDetails[i].probation;
              this.gradeName = this.savedSalaryData.salaryFitmentDetails[i].gradeName;  // Add this line by anif 08-08-2022
            }
          }
          //this.selectedGradeId = this.savedSalaryData.salaFitmentDetails[0].grade;
          this.salaryFitmentRemarks = this.savedSalaryData.salaryFitmentRemaks;
          for (var i = 0; i < this.savedSalaryData.salaryFitmentDetails.length; i++) {
            this.salaryFitmentId = this.savedSalaryData.salaryFitmentDetails[i].salaryFitmentId;
          }
          for (var i = 0; i < this.savedSalaryData.salaryFitmentDetails.length; i++) {
            if (i == this.savedSalaryData.salaryFitmentDetails.length - 1) {   // Added this if ,By Anif On 22-07-2022 to get the lateast Sal fitment which is accepted
              this.finalBasic = this.savedSalaryData.salaryFitmentDetails[i].salaryFitmentSalaryDetailsFormat.filter(x => x.salaryAccountHeadName.toLowerCase() == 'basic')[0].calculatedSalaryValueYearly;
              this.finalCTC = this.savedSalaryData.salaryFitmentDetails[i].salaryFitmentSalaryDetailsFormat[this.savedSalaryData.salaryFitmentDetails[i].salaryFitmentSalaryDetailsFormat.length - 1].calculatedSalaryValueYearly;
            }
          }
        }

        this.salaryFitmentDataForPDF.designation = this.selectedCandidateDesignationText;
        var locName = this.locations.filter(x => x.locationId == this.selectedCandidateLocationId);
        if (locName.length > 0) {
          this.salaryFitmentDataForPDF.location = String(locName[0].locationOffice);
        }
        if (this.savedSalaryData.salaryFitmentDetails.length > 0) {

          // this.gradeName = this.savedSalaryData.salaryFitmentDetails[0].gradeName;                                         
          // if (this.savedSalaryData.salaryFitmentDetails[0].gradeName != undefined || this.savedSalaryData.salaryFitmentDetails[0].gradeName != '') {
          //   this.salaryFitmentDataForPDF.grade = this.savedSalaryData.salaryFitmentDetails[0].gradeName;
          // }
          // this.salaryFitmentDataForPDF.grade = this.savedSalaryData.salaryFitmentDetails[0].gradeName;

          // Above 4 line not required below line added by anif on 08-08-2022
          this.salaryFitmentDataForPDF.grade = this.gradeName;
        }

        switch (this.selectedCandidateProbationIdId) {
          case 1:
            this.salaryFitmentDataForPDF.probation = "6 Months";
            break;
          case 2:
            this.salaryFitmentDataForPDF.probation = "1 Year";
            break;
          case 3:
            this.salaryFitmentDataForPDF.probation = "NA";
            break;
        }

        if (this.oldCTC == null || this.oldCTC == undefined) {    //by Kuntal das chowdhury on 15/07/2022 
          this.oldCTC = 0;
        }

        this.ourOffer = Math.floor(this.finalCTC - this.oldCTC);       //by Kuntal das chowdhury on 15/07/2022 
        this.salaryFitmentDataForPDF.percent = this.ourOffer; //by Kuntal das chowdhury on 15/07/2022 
        //this.salaryFitmentDataForPDF.percent = this.finalCTC;
        this.salaryFitmentDataForPDF.candidateFullName = this.savedSalaryData.candidateFullName;
        this.getTotalYears();
        //this.percentBasic = ((this.finalBasic - this.oldBasic) / this.oldBasic) * 100;
        this.percentBasic = (this.finalBasic / this.finalCTC) * 100;          //by Kuntal das chowdhury on 15/07/2022
        this.salaryFitmentDataForPDF.basic = this.percentBasic;
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
      // Added by Anif on 25-06-2022 for datepicker
      setTimeout(() => {
        this.loadDatePickerFrom();
        this.loadDatePickerTo();
      }, 1000);

    })
  }
  // W@H   Added by Anif on 25-06-2022
  calculateDays(expId: number, changedDate, Type: string) {
    if (Type == "From") {
      if (this.savedSalaryData.salaryFitmentExperience.length > 0) {
        this.savedSalaryData.salaryFitmentExperience.forEach((element) => {
          if (element.salaryFitmentExperienceId == expId) {
            const [fday, fmonth, fyear] = changedDate.split("/");
            var changedFromDate = new Date(+fyear, +fmonth - 1, +fday);
            const [tday, tmonth, tyear] = element.to.split("/");
            var changedToDate = new Date(+tyear, +tmonth - 1, +tday);
            if (changedFromDate > changedToDate) {
              var existingData = this.savedSalaryDataDup.salaryFitmentExperience.find(x => x.salaryFitmentExperienceId == expId);
              element.from = existingData.to;
              this.notificationService.showError("From Date Cann't be greater than To Date !! Please provide actual date", "Error");
              element.days = 0;
              element.years = 0;
            } else {
              var daysDiff = Math.floor((Date.UTC(changedToDate.getFullYear(), changedToDate.getMonth(), changedToDate.getDate()) - Date.UTC(changedFromDate.getFullYear(), changedFromDate.getMonth(), changedFromDate.getDate())) / (1000 * 60 * 60 * 24));
              element.days = daysDiff
              var yearsCount = Math.floor((Date.UTC(changedToDate.getFullYear(), changedToDate.getMonth(), changedToDate.getDate()) - Date.UTC(changedFromDate.getFullYear(), changedFromDate.getMonth(), changedFromDate.getDate())) / (1000 * 60 * 60 * 24 * 365));
              element.days = daysDiff;
              var yearsValue = daysDiff / 365;
              element.years = this.roundOff(yearsValue, 1);
            }
          }
        })
      }
    }
    if (Type == "To") {
      if (this.savedSalaryData.salaryFitmentExperience.length > 0) {
        this.savedSalaryData.salaryFitmentExperience.forEach((element) => {
          if (element.salaryFitmentExperienceId == expId) {
            const [tday, tmonth, tyear] = changedDate.split("/");
            var changedToDate = new Date(+tyear, +tmonth - 1, +tday);
            const [fday, fmonth, fyear] = element.from.split("/");
            var changedFromDate = new Date(+fyear, +fmonth - 1, +fday);
            if (changedToDate < changedFromDate) {
              var existingData = this.savedSalaryDataDup.salaryFitmentExperience.find(x => x.salaryFitmentExperienceId == expId);
              //element.to = existingData.from;
              element.to = null;     // By Amartya on 05-08-2023
              this.notificationService.showError("To Date Cann't be less than From Date !! Please provide actual date", "Error");
              element.days = 0;
              element.years = 0;
            } else {
              var daysDiff = Math.floor((Date.UTC(changedToDate.getFullYear(), changedToDate.getMonth(), changedToDate.getDate()) - Date.UTC(changedFromDate.getFullYear(), changedFromDate.getMonth(), changedFromDate.getDate())) / (1000 * 60 * 60 * 24));
              element.days = daysDiff;
              var yearsValue = daysDiff / 365;
              element.years = this.roundOff(yearsValue, 1);
            }
          }
        })
      }
    }
    this.getTotalYears();
  }
  roundOff(num: number, places: number) {
    const factor = 10 ** places;
    return Math.round(num * factor) / factor;
  }

  getAllPosition() {
    this.positions = [];
    this.positionService.getAllVerticalPosition(this.searchPosition).subscribe((result) => {
      if (result) {
        this.positions = result;
      }
      else {
        this.positions = [];
      }
    }, error => {
      console.log(error);
    }, () => {

    });
  }

  getAllLocation() {
    this.locations = [];
    this.locationService.getAllLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        this.locations = result;
      }
      else {
        this.locations = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  calculateBasicCTCPercent(data: any) {
    this.finalCTC = 0;
    for (var i = 0; i < data.claCulatePayStructureValueFormat.length; i++) {
      this.finalCTC = Number(data.claCulatePayStructureValueFormat[i].calculatedValueYerly);
    }

    if (this.oldCTC == null || this.oldCTC == undefined) {    //by Kuntal das chowdhury on 15/07/2022 
      this.oldCTC = 0;
    }
    this.ourOffer = Math.floor(this.finalCTC - this.oldCTC);
    this.finalBasic = Number(data.claCulatePayStructureValueFormat.filter(x => x.salaryAccountHeadName.toLowerCase() == 'basic')[0].calculatedValueYerly);
    // if (this.oldBasic > 0) {    // By Amartya on 05-08-2023
    //this.percentBasic = (((this.finalBasic - this.oldBasic) / this.oldBasic) * 100) < 0 ? 0 : (((this.finalBasic - this.oldBasic) / this.oldBasic) * 100);
    this.percentBasic = ((this.finalBasic / this.finalCTC) * 100) < 0 ? 0 : ((this.finalBasic / this.finalCTC) * 100);          //by Kuntal das chowdhury on 15/07/2022
    // }
    // else {
    //this.percentBasic = 100;
    // }
    if (this.oldCTC > 0) {
      this.percentCTC = (((this.finalCTC - this.oldCTC) / this.oldCTC) * 100) < 0 ? 0 : (((this.finalCTC - this.oldCTC) / this.oldCTC) * 100);
    }
    else {
      //this.percentCTC = 100; // By Amartya on 05-08-2023 
      this.percentCTC = 0;
    }


    if (this.percentCTC == Infinity) {  //by Kuntal das chowdhury on 26/07/2022
      this.percentCTC = 0;
    }
  }

  removeExperience(id) {
    this.savedSalaryData.salaryFitmentExperience = this.savedSalaryData.salaryFitmentExperience.filter(x => x.salaryFitmentExperienceId != id);
  }

  getTotalYears() {
    this.allexperience = 0;
    for (var i = 0; i < this.savedSalaryData.salaryFitmentExperience.length; i++) {
      this.allexperience = this.allexperience + this.savedSalaryData.salaryFitmentExperience[i].years;
    }
  }
  yessubmitData() {
    var flag = 0;
    for (var val of this.savedSalaryData.salaryFitmentExperience) {   // By Amartya on 05-08-2023
      if (val.from == null || val.organisation == null || val.remarks == null || val.to == null) {
        this.notificationService.showError("Please fill all the fileds to continue", "Error");
        flag = 1;
        break;
      }
    }
    if (flag == 0) {    // By Amartya on 05-08-2023
      this.SpinnerService.show();
      this.salaryFitmentDataForPDF.exp = this.savedSalaryData.salaryFitmentExperience[0];
      this.salaryFitmentDataForPDF.designation = this.selectedCandidateDesignationText;
      var locName = this.locations.filter(x => x.locationId == this.selectedCandidateLocationId);
      if (locName.length > 0) {
        this.salaryFitmentDataForPDF.location = String(locName[0].locationOffice);
      }
      this.salaryFitmentDataForPDF.grade = this.gradeName;
      switch (this.selectedCandidateProbationIdId) {
        case 1:
          this.salaryFitmentDataForPDF.probation = "6 Months";
          break;
        case 2:
          this.salaryFitmentDataForPDF.probation = "1 Year";
          break;
        case 3:
          this.salaryFitmentDataForPDF.probation = "NA";
          break;
      }
      this.salaryFitmentDataForPDF.candidateFullName = this.savedSalaryData.candidateFullName;
      this.salaryFitmentDataForPDF.percent = Math.floor(this.ourOffer);
      //this.percentBasic = (this.finalBasic / this.finalCTC) * 100;          
      this.salaryFitmentDataForPDF.basic = this.percentBasic;
      //this.percentCTC = (((this.finalCTC - this.oldCTC) / this.oldCTC) * 100);
      if (this.percentCTC == Infinity) {
        this.percentCTC = 0;
      }
      this.salaryFitmentDataForPDF.in = this.percentCTC;

      for (var i = 0; i < this.calculatedSalary.claCulatePayStructureValueFormat.length; i++) {
        this.candidateSalaryFitmentSalaryDetailsFormatpdf.push({
          salaryFitmentDetailsId: 0,
          salaryFitmentId: this.salaryFitmentId,
          salaryFitmentSalaryDetailsFormatId: 0,
          dbOrder: this.calculatedSalary.claCulatePayStructureValueFormat[i].dbOrder,
          visibleOrder: this.calculatedSalary.claCulatePayStructureValueFormat[i].order,
          salaryAccountHeadId: Number(this.calculatedSalary.claCulatePayStructureValueFormat[i].salaryAccountHeadId),
          salaryAccountHeadName: this.calculatedSalary.claCulatePayStructureValueFormat[i].salaryAccountHeadName,
          calculatedSalaryValue: Number(this.calculatedSalary.claCulatePayStructureValueFormat[i].calculatedValue),
          calculatedSalaryValueYearly: Number(this.calculatedSalary.claCulatePayStructureValueFormat[i].calculatedValueYerly),
          createdBy: this.createdBy
        })
      }
      this.salaryFitmentDataForPDF.new = this.candidateSalaryFitmentSalaryDetailsFormatpdf;
      //console.log("salaryFitmentDataForPDF", this.salaryFitmentDataForPDF)
      var htmlString = ""
      this.salaryFitmentDataForPDF.existingMonthly = this.monthlyTotal;
      this.salaryFitmentDataForPDF.existingYearly = this.yearlyTotal;
      setTimeout(() => {
        if (this.salaryFitmentDataForPDF.new.length > 17) {
          htmlString = document.getElementById("printerdiv").innerHTML;
        }
        else {
          htmlString = document.getElementById("printerdivSingle").innerHTML;
        }
        var dom = document.createElement('div');
        dom.innerHTML = htmlString;
        var opt = {
          margin: 6,
          filename: this.candidateNo + "_SalaryFitment.pdf",
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, y: 2, scrollY: 0 },
          jsPDF: { format: 'A4', orientation: "landscape" },
        }

        html2pdf().set(opt).from(dom).toPdf().output('blob').then((data: any) => {
          this.file = data;

          //this.submitData();
          jQuery("#confirmPopup").modal('show');
        })
        this.SpinnerService.hide()
        //this.SpinnerService.hide()
      }, 300);
    }
  }
  // Added anif on 02-07-2022 //salaryFitmentDataForPDF

  DownloadPDF() {

    this.salaryFitmentDataForPDF.existingMonthly = this.monthlyTotal;
    this.salaryFitmentDataForPDF.existingYearly = this.yearlyTotal;
    setTimeout(() => {
      if (this.salaryFitmentDataForPDF.new.length > 17) {
        var htmlstring = document.getElementById("printerdiv").innerHTML;
        var dom = document.createElement('div');
        dom.innerHTML = htmlstring;
        html2pdf(dom, {
          margin: 6,
          filename: this.candidateNo + "_SalaryFitment.pdf",
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, y: 2, scrollY: 0 },
          jsPDF: { format: 'A4', orientation: "landscape" },
        });
      }
      else {
        var htmlstring = document.getElementById("printerdivSingle").innerHTML;
        var dom = document.createElement('div');
        dom.innerHTML = htmlstring;
        html2pdf(dom, {
          margin: 6,
          filename: this.candidateNo + "_SalaryFitment.pdf",
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, y: 2, scrollY: 0 },
          jsPDF: { format: 'A4', orientation: "landscape" },
        });
      }
    }, 300);

  }
  // Added anif on 25-06-2022

  // onChangeFromExp(eve) {
  //   // alert(eve.target.value);
  //   //alert("Hi")
  // }
  // ngAfterViewInit() {
  //   // jQuery(this.elementRef.nativeElement).datepicker({
  //   //   onSelect: (dateText) => {
  //   //     this.change.emit(dateText);
  //   //   }
  //   // });
  //   // jQuery(".datepicker").on("change", function () {
  //   //   var selected = jQuery(this).val();
  //   //   alert(selected);
  //   // });
  //   jQuery('.datepicker').datepicker({
  //     onSelect: (dataValue) => {
  //       alert(dataValue)
  //     }
  //   });
  // }
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
