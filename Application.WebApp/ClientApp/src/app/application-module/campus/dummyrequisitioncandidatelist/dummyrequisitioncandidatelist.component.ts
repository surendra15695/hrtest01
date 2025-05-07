import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef, SystemJsNgModuleLoader } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ICandidateDetailData, ISearchCandidateDetail, IModeOfJoining, ISearchModeOfJoining, ISearchCandidateOwner } from '../../../interfaces/preselection/candidate.interface';
import { IVenue, ISearchVenue } from '../../../interfaces/common/venue.interface';
import { IGenders, IHiringStatus } from '../../../interfaces/common/common.interface';
import { IEmailTemplate, ISearchEmailTemplate, } from '../../../interfaces/common/emailtemplate.interface';
import { ITestScheduleFormData, TTestScheduleDetail, ISearchTestScheduleDetail, } from '../../../interfaces/selection/testschedule.interface';
import { IInterviewScheduleFormData, ISearchInterviewScheduleDetail, IInterviewScheduleDetail } from '../../../interfaces/selection/interviewschedule.interface';
import { IInterviewPanelMember, ISearchInterviewPanelMember, IInterviewRoom, ISearchInterviewRoom } from '../../../interfaces/common/interview.interface';
import { ISearchInterviewClarificationList, IInterviewClarificationList, IInterviewClarificationListData, IInterviewClarificationData, IInterviewCalendarActionFormData } from '../../../interfaces/selection/interviewcalendaraction.interface';
import { IDocumentCollectionFormData } from '../../../interfaces/offer/candidatedocument.interface';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { CandidateService } from '../../../services/preselection/candidate/candidate.service';
import { IRequisitionCandidateHiringStatusFormData, IRequisitionCandidateHiringStatusFormDataForCancel } from '../../../interfaces/preselection/requisition.interface';
import { ISearchRequisition, IRequisitionList } from '../../../interfaces/preselection/requisition.interface';
import { ISelectionGuideInterview, ISearchSelectionGuideInterview } from '../../../interfaces/common/selectionguide.interface';
import { RequisitionService } from '../../../services/preselection/requisition/requisition.service';
import { InterviewcalendaractionService } from '../../../services/selection/interviewcalendaraction/interviewcalendaraction.service';
import { TestscheduleService } from '../../../services/selection/testschedule/testschedule.service';
import { InterviewscheduleService } from '../../../services/selection/interviewschedule/interviewschedule.service';
import { VenueService } from '../../../services/common/venue/venue.service';
import { EmailtemplateService } from '../../../services/common/emailtemplate/emailtemplate.service';
import { InterviewService } from '../../../services/common/interview/interview.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { CommonService } from '../../../services/common/common/common.service';
import { LanguageService } from '../../../services/common/language/language.service';
import { DomainService } from '../../../services/common/domain/domain.service';
import { ManagementapprovalService } from '../../../services/offer/managementapproval/managementapproval.service';
import { ISearchStream, IStream, IQualificationCourseStream, ISearchQualificationCourseStream } from '../../../interfaces/common/stream.interface';
import { StreamService } from '../../../services/common/stream/stream.service';
import { SelectionguideService } from '../../../services/common/selectionguide/selectionguide.service';
import { ICourse, ISearchCourse, IQualificationCourse, ISearchQualificationCourse } from '../../../interfaces/common/course.interface';
import { CourseService } from '../../../services/common/course/course.service';
import { IQualification, IQualificationType, ISearchQualification } from '../../../interfaces/common/qualification.interface';
import { QualificationService } from '../../../services/common/qualification/qualification.service';
import { IAge, IExperience, IMonths, IYears, IState } from '../../../interfaces/common/common.interface';
import { CandidateofferdocumentService } from '../../../services/offer/candidateofferdocument/candidateofferdocument.service'
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

import { IDomain, ISearchDomain } from '../../../interfaces/common/domain.interface';
import { ILanguage, ISearchLanguage } from '../../../interfaces/common/language.interface';
import { element } from 'protractor';
import { IOnboardingManager, ISearchonboardingManager } from 'src/app/interfaces/candidate/candidate.interface';
import { CorporateallocationService } from 'src/app/services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { CampusrequisitionService } from 'src/app/services/campus/campusrequisition/campusrequisition.service';
declare var jQuery: any;
declare var moment: any;

@Component({
  selector: 'app-dummyrequisitioncandidatelist',
  templateUrl: './dummyrequisitioncandidatelist.component.html',
  styleUrls: ['./dummyrequisitioncandidatelist.component.css']
})
export class DummyrequisitioncandidatelistComponent implements OnInit {

  pageTitle: string = "Candidate List";
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string
  @ViewChild('emailTemplate', { static: false }) emailTemplate: any;
  @ViewChild('closeModal', { static: false }) cModal: ElementRef;
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  @ViewChild('closeScheduleModal', { static: false }) cScheduleModal: ElementRef;
  @ViewChild('fTestDateTime', { static: false }) fTestDate: ElementRef;
  @ViewChild('tTestDateTime', { static: false }) tTestDate: ElementRef;
  @ViewChild('fInterviewDateTime', { static: false }) fInterviewDate: ElementRef;
  @ViewChild('tInterviewDateTime', { static: false }) tInterviewDate: ElementRef;
  @ViewChild('closeInterviewModal', { static: false }) cInterviewModal: ElementRef;
  @ViewChild('closeInterviewClarificationModal', { static: false }) cInterviewClarificationModal: ElementRef;
  @ViewChild('closeDocumentCollectionModal', { static: false }) cDocumentCollectionModal: ElementRef;
  @ViewChild('closeManagementApprovalModal', { static: false }) closeManagementApprovalModal: ElementRef;
  @ViewChild('managementFileImport', { static: false }) managementFileImport: ElementRef;
  @ViewChild('dateOfJoining', { static: false }) dtOfJoining: ElementRef;
  searchInterviewClarification: ISearchInterviewClarificationList = {
    calendarId: null,
    requisitionDetailId: null,
    candidateId: null
  };
  interClarifications: IInterviewClarificationList[];
  interviewClarificationList: IInterviewClarificationListData[];
  interviewClarificationdata: IInterviewClarificationData[] = [];
  calendarActionFormData: IInterviewCalendarActionFormData = {
    CalendarIds: null,
    AcceptStatus: null,
    Remarks: null,
    CreatedBy: null
  }
  OnboardingMailIds: any[];
  previousHiringId: number;
  emailidAray: any[] = [];
  templatedescription: string;
  filterForm: FormGroup;
  scheduleForm: FormGroup;
  btnVisible: boolean = false;
  topBtnVisible: boolean = false;
  candidates: any[] = [];
  requisitionArrayPopup: any[] = [];
  candidateIds: string = "";
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
    PreviousApplied: 0,
    //CandidateOwner:""

  }

  genders: IGenders[] = [];
  requisitionDetailId: number;
  createdBy: number;
  statusId: number;
  formData: IRequisitionCandidateHiringStatusFormData = {
    candidateIds: "",
    requisitionDetailId: 0,
    createdBy: 0,
    remarks: "",
    hiringStatusId: 1
  };
  cancelFormData: IRequisitionCandidateHiringStatusFormDataForCancel = {
    candidateIds: "",
    requisitionDetailId: 0,
    createdBy: 0,
    remarks: "",
    hiringStatusId: 1,
    prevHiringId: 0
  };
  remarks: string;
  actionName: string;

  venueId: number;
  searchVenue: ISearchVenue = {
    venueId: null,
    isActive: true
  }
  searchTestVenue = {
    TestVenueId: null,
    IsActive: null,
  }

  searchCandidateOwner: ISearchCandidateOwner = {
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
    PreviousApplied: 0,
    CandidateOwner: "",
  };
  //selectedVenue: IVenue;
  venues: any[] = [];

  interviewVenues: any[] = [];

  emailTemplates: IEmailTemplate[] = [];
  searchEmailTemplate: ISearchEmailTemplate = {
    templateTypeId: 1,
    templateId: null,
    isActive: true
  }

  interviewemailTemplates: IEmailTemplate[] = [];
  searchInterviewEmailTemplate: ISearchEmailTemplate = {
    //templateTypeId: 2,
    templateTypeId: 28,
    templateId: null,
    isActive: true
  }
  testScheduleemailTemplates: IEmailTemplate[] = [];
  searchTestScheduleEmailTemplate: ISearchEmailTemplate = {
    //templateTypeId: 2,
    templateTypeId: 41,
    templateId: null,
    isActive: true
  }

  documentCollectionEmailTemplates: IEmailTemplate[] = [];
  searchDocumentCollectionEmailTemplate: ISearchEmailTemplate = {
    templateTypeId: 4,
    templateId: null,
    isActive: true
  }
  //HiringStatus
  candidateLists: IHiringStatus[] = [];
  searchCandidateNo: IHiringStatus = {
    hiringStatusId: null,
    hiringStatusName: null,
  }
  //domain
  domain: IDomain[] = [];
  selectedDomain: IDomain;
  searchDomain: ISearchDomain =
    {
      domainId: null,
      parentDomainId: null,
      isActive: true
    };
  domainId: number;
  //subdomain
  subdomain: IDomain[] = [];
  selectedSubDomain: IDomain;
  searchSubDomain: ISearchDomain =
    {
      domainId: null,
      parentDomainId: null,
      isActive: true
    };
  subdomainId: number;
  //qualification
  qualifications: IQualification[] = [];
  selectedQualification: IQualification;
  searchQualification: ISearchQualification = {
    qualificationId: null,
    isActive: null
  }
  //qualification type
  qualificationType: IQualificationType[] = [];
  //course
  courses: IQualificationCourse[] = [];
  selectedCourse: IQualificationCourse;
  searchCourse: ISearchQualificationCourse = {
    qualificationId: null,
    courseId: null,
    isActive: true
  }
  courseId: number;
  courseName: string;
  //stream
  streams: IQualificationCourseStream[] = [];
  selectedStream: IQualificationCourseStream;
  searchStream: ISearchQualificationCourseStream = {
    qualificationId: null,
    courseId: null,
    streamId: null,
    isActive: true
  }
  streamId: number;
  streamName: string;
  //languages
  languages: ILanguage[] = [];
  selectedLanguages: ILanguage;
  searchLanguages: ISearchLanguage = {
    languageId: null,
    isActive: null
  }
  languageId: number;
  languageName: string;
  CompletionYear: IYears[] = [];
  Months: IMonths[] = [];
  State: IState[] = [];

  stepCount: number = 1;
  btnTestVisible: boolean = false;
  candidiateIdCb: any;
  hiringStatusIdCb: any;
  emailIdCb: any;
  isOnlineTest: boolean = false;
  requisitionType: any;
  testTypeId: number = 0;
  testLink: string;
  testFromDateTime: string;
  testToDateTime: string;
  selectedTestVenueId: number;
  testContactName: string;
  testContactNo: string;
  selectedTestEmailTemplateId: number;
  testEmailTemplateDescription: string;
  isTestTravel: boolean = false;

  testScheduleFormData: ITestScheduleFormData = {
    RequisitionDetailId: null,
    TestTypeId: null,
    TestLink: null,
    TestFromDate: null,
    TestToDate: null,
    TestVenueId: null,
    TestContactName: null,
    TestContactNo: null,
    IsTestTravel: null,
    TestEmailTemplateId: null,
    TestEmailTemplate: null,
    CandidateIds: null,
    CreatedBy: null,
    VenueName: null,
    EmailId: null,
    VanueAddress: null,
    ContactName: null,
    ContactNo: null,

  };
  requisitionLists: IRequisitionList[] = [];
  requisitionPositionName: string;
  requisitionDepartmentName: string;
  requisitionFunctionName: string;
  requisitionVerticalId: number;
  requisitionFunctionId: number;

  searchRequisition: ISearchRequisition = {
    requisitionNo: null,
    requistionId: null,
    requisitionDetailId: null,
    locationId: null,
    verticalId: null,
    fromDate: null,
    toDate: null,
    iOMNo: null,
    requisitionApprovalStatus: null,
    requisitionProcessStatus: null,
    createdBy: null,
    approverAutoUserId: null,
    allocatedUserId: null,
    requisitionTypeId: null,
  }

  checkTestLink: string;
  checkTestFromDate: string;
  checkTestToDate: string;
  checkTestContactNo: string;
  checkTestContactName: string;
  checkTestVenue: string;
  checkTestEmailTemplate: string;

  interviewRooms: IInterviewRoom[] = [];
  searchInterviewRoom: ISearchInterviewRoom = {
    interviewRoomId: null,
    isActive: true
  }

  interviewPanelMembersHR: IInterviewPanelMember[] = [];
  interviewPanelMembersFunction: IInterviewPanelMember[] = [];
  searchInterviewPanelMember: ISearchInterviewPanelMember = {
    verticalId: null,
    functionId: null,
    panelTypeId: null,
    isActive: true
  }

  selectedPanelHR: any[];
  selectedPanelFunction: any[];
  selectedTravelModeArray: any[];
  selectedInterViewHR: string;
  selectedSlot: string;
  selectedInterViewFunction: string;
  selectedInterViewRoom: number;
  interviewTypeId: number = 0;
  interviewLink: string;
  interviewFromDateTime: string;
  interviewToDateTime: string;
  selectedInterviewVenueId: number;
  isInterviewAccomodation: boolean = false;
  interviewAccomodationDetails: string;
  isInterviewTravel: boolean = false;
  interviewTravelMode: string;
  isFormAnexture: boolean = false;
  interviewComments: string;
  selectedInterviewEmailTemplateId: number;
  interviewEmailTemplateDescription: string;
  selectedInterviewId: number;
  selectedTravelMode: string;
  checkInterviewLink: string;
  checkInterviewFromDate: string;
  checkInterviewToDate: string;
  checkInterviewVenue: string;
  checkInterviewEmailTemplate: string;
  checkAccomodationDetails: string;
  travelModeDesc: string;

  selectionGuideInterview: ISelectionGuideInterview[] = [];
  candidateNoarray: any[] = [];
  searchSelectionGuideInterview: ISearchSelectionGuideInterview = {
    requisitionDetailId: null,
    hiringStatusId: null
  }

  interviewScheduleFormData: IInterviewScheduleFormData = {
    RequisitionDetailId: null,
    InterviewId: null,
    InterviewTypeId: null,
    InterviewLink: null,
    InterviewRoomId: null,
    FromDate: null,
    ToDate: null,
    InterviewSlot: null,
    VenueId: null,
    HRAutoUserIds: null,
    InterviewerAutoUserIds: null,
    IsAccomodation: null,
    AccomodationDetails: null,
    ScheduleComments: null,
    IsTravel: null,
    TravelModes: null,
    EmailTemplateId: null,
    EmailTemplate: null,
    CandidateIds: null,
    CreatedBy: null,
    IsFormAnexture: null,
    EmailId: null,
    VenueName: null,
    VanueAddress: null,
    ContactName: null,
    ContactNo: null,
    candidateNo: null,
    travelModeDesc: null,
    interviewAccomodationDetails: null,
  };

  btnInterviewVisible: boolean = false;
  testScheduleDetail: TTestScheduleDetail;
  searchTestScheduleDetail: ISearchTestScheduleDetail = {
    candidateId: null,
    requisitionDetailId: null
  }
  rescheduleCandidateId: string = "";

  searchInterviewScheduleDetail: ISearchInterviewScheduleDetail = {
    candidateId: null,
    requisitionDetailId: null
  }

  interviewScheduleDetail: IInterviewScheduleDetail;

  prevselectedstatus: number = 0;
  currentHiringStatus: number;

  //Anif
  // joiningConfirmationCandidateList: any[] = [];
  // modeOfJoiningList: IModeOfJoining[] = [];
  // searchModeOfJoining: ISearchModeOfJoining = {
  //   modeofJoiningId: null,
  //   isActive: null
  // }
  callngIfFunction: boolean = true;
  onBoardingSendingType: string;
  onBoardingSingleCandidateId: any;
  OnBoardingManager: number = null;

  documentCollectionEmailTemplateDescription: string;
  btnDocumentCollectionVisible: boolean = false;
  documentCollectionFormData: IDocumentCollectionFormData = {
    offerDocumentCollectionId: 0,
    requsitaionDetailsId: 0,
    candidateId: "",
    emailTemplateId: 0,
    emailTemplate: "",
    createdBy: 0
  }

  btnManagementApprovalVisible: boolean = false;
  candidateIdNames: any[];
  btnUploadManagementApprovalVisible: boolean = false;
  btnUpdateManagementApprovalVisible: boolean = false;
  btnreScheduleInterviewVisible: boolean = false;
  managementfileToUpload: File = null;
  allJoiningDateInformation: any[] = [];
  btnJoiningConfirmation: boolean;
  btnSendToOnboarding: boolean;

  //SMAJI - START
  joiningConfirmationCandidateList: any[] = [];
  // Mode of joining dropdown

  modeOfJoiningList: IModeOfJoining[] = [];
  searchModeOfJoining: ISearchModeOfJoining = {
    modeofJoiningId: null,
    isActive: null
  }

  // onboarding Manager Dropdown

  onBoardingManager: IOnboardingManager[] = [];
  selectedOnBoardingManager: IOnboardingManager;
  searchOnboardingManager: ISearchonboardingManager = {
    requisitionDetailId: null
  }

  // callngIfFunction: boolean = true;
  // onBoardingSendingType: string;
  // onBoardingSingleCandidateId: any;
  // OnBoardingManager: number = 0;

  onBoardingManagerList: any[] = [];
  //SMAJI - END

  searchRoleUser: any = {
    roleId: 0
  }

  isSourceChannelId: number;
  pageNameForBack: string;

  rejectHiringRemarks: any[] = [];
  functionId: number;
  campusrequisitionLists: any[] = [];
  VenueName: string;
  VanueAddress: string;
  DateTime: string;
  ContactName: string;
  ContactNo: string;
  EmailId: string;
  candidateNo: string;
  rejectOfferRemarks: any[] = [];
  managementApprovalId: number = 0;
  oldManagementApprovalId: number = 0;

  // Release and call back

  releaseCandidateId: number;
  releaseremarks: string;
  callbackCandidateId: number;
  callbackremarks: string = "";
  objCallbackHistoryInsert: CallbackHistoryInsert;
  invalidFileName: boolean = false;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private candidateService: CandidateService,
    private requisitionService: RequisitionService,
    private CampusRequisitionService: CampusrequisitionService,
    private testScheduleService: TestscheduleService,
    private venueService: VenueService,
    private emailtemplateService: EmailtemplateService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
    private commonService: CommonService,
    private courseService: CourseService,
    private streamService: StreamService,
    private qualificationService: QualificationService,
    private languageService: LanguageService,
    private domainService: DomainService,
    private interviewService: InterviewService,
    private corporateService: CorporateallocationService,
    private selectionGuideService: SelectionguideService,
    private interviewScheduleService: InterviewscheduleService,
    private calendarActionService: InterviewcalendaractionService,
    private candidateOfferDocumentService: CandidateofferdocumentService,
    private managementApprovalService: ManagementapprovalService
  ) {
    this.objCallbackHistoryInsert = new CallbackHistoryInsert();  // callback
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    if (this.persistance.get('pagename') != null) {
      this.pageNameForBack = this.persistance.get('pagename');
      if (this.persistance.get('pagename') == "rmdummyrequisitionlist" || this.persistance.get('pagename') == "requesterrequisitionlist" ||
        this.persistance.get('pagename') == "rmcandidatelist") {
        this.requisitionDetailId = this.persistance.get('paramid');
        this.isSourceChannelId = this.persistance.get('hrStatus');
        this.functionId = this.persistance.get('functionId');
        this.getAllGender();
        this.getAllDomain();
        this.getAllState();
        this.getAllLanguages();
        this.getAllCompletionYearsAndMonths();
        this.getAllQualification();
        this.getAllEmailTemplate();
        this.getAllInterviewEmailTemplate();
        this.getAllTestScheduleEmailTemplate();
        this.getAllDocumentCollectionEmailTemplate();
        this.getAllRequisition();
        this.createFilterForm();
        this.getCandidateList();
        this.getAllVenue();
        this.getAllInterviewVenue();
        this.getModeOfJoining();
        this.getAllInterviewRoom();
        this.getAllInterviewPanelMemberHR();
        this.getAllInterviewPanelMemberFunction();
        this.getHiringStatus();
        //this.getAllSelectionGuideInterview();

      } else {
        this._route.navigate(['/app/my-action/all-positions']);
      }
    }
    else {
      this._route.navigate(['/app/my-action/all-positions']);
    }
  }

  getAllRequisition() {
    this.requisitionDepartmentName = "";
    this.requisitionPositionName = "";
    this.requisitionFunctionName = "";
    this.requisitionFunctionId = 0;
    this.requisitionVerticalId = 0;
    this.searchRequisition.requisitionDetailId = this.requisitionDetailId
    this.requisitionService.getAllRequisition(this.searchRequisition).subscribe((result) => {
      if (result) {
        this.requisitionLists = result;
        for (var i = 0; i < this.requisitionLists.length; i++) {
          this.requisitionDepartmentName = this.requisitionLists[i].departmentName;
          this.requisitionPositionName = this.requisitionLists[i].positionName;
          this.requisitionFunctionName = this.requisitionLists[i].functionName;
          this.requisitionVerticalId = this.requisitionLists[i].verticalId;
          this.requisitionFunctionId = this.requisitionLists[i].functionId;
          this.getAllOnboardingmanagerList();
        }
      }
      else {
        this.requisitionLists = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllState() {
    this.State = [];
    this.commonService.getAllState().subscribe((result) => {
      if (result) {
        this.State = result;
      }
      else {
        this.State = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  getAllCompletionYearsAndMonths() {
    this.CompletionYear = [];
    var currentyear = new Date().getFullYear();
    for (var i = currentyear; i > currentyear - 40; i--) {
      this.CompletionYear.push({ yearsId: parseInt(i.toString()), yearsName: i.toString() });
    }
    this.Months = [];
    for (var i = 0; i < 12; i++) {
      this.Months.push({ monthId: parseInt(i.toString()), monthName: i.toString() });
    }

  }

  //languages
  getAllLanguages() {
    this.languages = [];
    this.searchLanguages.languageId = 0;
    this.searchLanguages.isActive = true;
    this.languageService.getAllLanguage(this.searchLanguages).subscribe((result) => {
      if (result) {
        this.languages = result;
      }
      else {
        this.languages = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
  }

  //qualification
  getAllQualification() {
    this.qualifications = [];
    this.qualificationService.getAllQualification(this.searchQualification).subscribe((result) => {
      if (result) {
        this.qualifications = result;
      }
      else {
        this.qualifications = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });

    this.qualificationType = [];
    this.qualificationService.getAllQualificationType(this.searchQualification).subscribe((result) => {
      if (result) {
        this.qualificationType = result;
      }
      else {
        this.qualificationType = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
  }

  changeQualification() {
    var qualificationId = this.filterForm.get("QualificationId").value.join(',');
    this.courses = [];
    if (qualificationId != "") {
      var splitQualification = qualificationId.split(",");
      for (var i = 0; i < splitQualification.length; i++) {
        this.getAllCourse(splitQualification[i]);
      }
    }
    // if (Number(this.filterForm.get("QualificationId").value) > 0) {
    //   this.selectedQualification = this.qualifications.filter(x => x.qualificationId == qualificationId)[0];
    //   this.getAllCourse();
    // }
    else {
      this.courses = [];
      this.streams = [];
    }
  }
  //Course
  getAllCourse(qualificationId) {
    this.searchCourse.qualificationId = Number(qualificationId);
    this.courseService.getAllQualificationCourse(this.searchCourse).subscribe((result) => {
      if (result) {
        for (var i = 0; i < result.length; i++) {
          this.courses.push({
            courseId: result[i].courseId,
            courseName: result[i].courseName,
            qualificationId: result[i].qualificationId,
            qualificationName: result[i].qualificationName,
            isActive: true,
          })
        }
        //this.courses = result;
        //this.streams = [];
      }
      else {
        //this.courses = [];
        //this.streams = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  changeCourse() {
    var courseId = this.filterForm.get("CourseId").value.join(',');
    var qualificationId = this.filterForm.get("QualificationId").value.join(',');
    this.streams = [];
    if (courseId != "") {
      var splitCourse = courseId.split(",");
      var splitQualification = qualificationId.split(",");
      for (var i = 0; i < splitQualification.length; i++) {
        for (var j = 0; j < splitCourse.length; j++) {
          this.getAllStream(splitQualification[i], splitCourse[j]);
        }
      }
    }
    else {
      this.streams = [];
    }
  }

  getAllStream(qualificationId, courseid) {
    this.searchStream.qualificationId = Number(qualificationId);
    this.searchStream.courseId = Number(courseid);
    this.streamService.getAllQualificationCourseStream(this.searchStream).subscribe((result) => {
      if (result) {
        //this.streams = result;
        for (var i = 0; i < result.length; i++) {
          this.streams.push({
            streamId: result[i].streamId,
            streamName: result[i].streamName,
            courseId: result[i].courseId,
            courseName: result[i].courseName,
            qualificationId: result[i].qualificationId,
            qualificationName: result[i].qualificationName,
            isActive: true
          })
        }
      }
      else {
        //this.streams = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
  }
  // HiringStatus
  getHiringStatus() {
    this.candidateLists = [];
    var obj = {
      hiringStatusId: 0
      //hiringStatusName: "",

    }
    //this.SearchCandidateNo.candidateNo = this.SearchCandidateNo.candidateNo;
    this.commonService.GetHiringStatus(obj).subscribe((result) => {
      if (result) {
        this.candidateLists = result;
      }
    }, error => {
      console.log(error);
    }, () => {
      //this.loadSelectPicker();
    });

    //changeHiringStatus() {
    //  this.searchCandidateNo.Fi = this.searchCandidateNo.hiringStatusId;
    //}
  }

  //domain
  getAllDomain() {
    this.domain = [];
    this.searchDomain.parentDomainId = 0;
    this.domainService.getAllDomain(this.searchDomain).subscribe((result) => {
      if (result) {
        this.domain = result;
      }
      else {
        this.domain = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  changeDomain() {
    var domainId = this.filterForm.get("DomainId").value.join('');
    this.subdomain = [];
    if (domainId != "") {
      var splitdomain = domainId.split(",");
      for (var i = 0; i < domainId.length; i++) {
        this.getAllSubDomain(domainId[i]);
      }
    }
    // if (Number(this.filterForm.get("QualificationId").value) > 0) {
    //   this.selectedQualification = this.qualifications.filter(x => x.qualificationId == qualificationId)[0];
    //   this.getAllCourse();
    // }
    else {
      this.subdomain = [];
    }
  }

  //subdomain
  getAllSubDomain(domainid) {
    this.searchSubDomain.parentDomainId = Number(domainid);
    this.domainService.getAllDomain(this.searchSubDomain).subscribe((result) => {
      if (result) {
        for (var i = 0; i < result.length; i++) {
          this.subdomain.push({
            domainId: result[i].domainId,
            domainName: result[i].domainName,
            parentDomainId: result[i].parentDomainId,
            isActive: true
          })
        }
      }
      else {
        //this.subdomain = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  getAllGender() {
    this.genders = [];
    this.genders.push({ genderId: 1, genderName: "Male", isActive: true });
    this.genders.push({ genderId: 2, genderName: "Female", isActive: true });
    this.genders.push({ genderId: 3, genderName: "Others", isActive: true });
  }

  createFilterForm() {
    this.filterForm = this.fb.group({
      CandidateName: [''],
      FromDate: [''],
      ToDate: [''],
      HiringStatusId: [''],
      GenderId: [''],
      FromAge: [0],
      ToAge: [0],
      AadharNo: [''],
      ContactNo: [''],
      EmailId: [''],
      MotherTongueIds: [''],
      LanguageIds: [''],
      QualificationId: [0],
      CourseId: [0],
      StreamId: [0],
      FromPercent: [0],
      ToPercent: [0],
      CompletionYear: [0],
      QualificationTypeId: [0],
      FromExperience: [0],
      ToExperience: [0],
      FromCTC: [0],
      ToCTC: [0],
      CurrentEmployer: [''],
      Designation: [''],
      DomainId: [0],
      SubDomainId: [0],
      StateIds: [''],
      PreviousApplied: [0],
      RelativeStatus: [0],
      SourceChannelId: [0],
      //HiringStatusId: null,
      RequisitionDetailId: [this.requisitionDetailId],
      CandidateOwner: ['']
    });
  }

  resetFilter() {                 //added by arghya on-01.07.2022
    this.filterForm.reset();
    this.createFilterForm();
    this.getFilterCandidateList();
    //this.onFilter();
    this.getAllLanguages();
  }                               //Till this 

  onFilter() {

    this.filterForm.patchValue(
      {
        FromDate: this.fDate.nativeElement.value,
        ToDate: this.tDate.nativeElement.value,
        //GenderId: GenderIds,
        FromAge: Number(this.filterForm.value.FromAge),
        ToAge: Number(this.filterForm.value.ToAge),
        FromExperience: Number(this.filterForm.value.FromExperience),
        ToExperience: Number(this.filterForm.value.ToExperience),
        FromCTC: Number(this.filterForm.value.FromCTC),
        ToCTC: Number(this.filterForm.value.ToCTC),
        HiringStatusId: Number(this.filterForm.value.HiringStatusId),
      });
    this.getFilterCandidateList();
  }

  ngOnInit() {
    this.titleService.setTitle(this.pageTitle);
    this.openNav();
    this.closeNav();
    this.loadTooltipMenu();
    this.loadDatePicker();
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true,
      removePlugins: 'specialchar,about,others,link',
      removeButtons: 'Save,NewPage,Preview,Print,Templates,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Find,Select,Button,ImageButton,HiddenField,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,PageBreak,Iframe,ShowBlocks,Table,Image,Maximize,Anchor,SpecialChar,PasteFromWord,PasteText,Scayt,RemoveFormat,Indent,Outdent,Blockquote'
    };
    this.loadDateTimePicker();
  }

  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginRight = "300px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
  }

  getCandidateList() {
    this.SpinnerService.show();
    jQuery("#chkAll").prop("checked", false);
    this.candidates = [];
    this.searchCandidate.RequisitionDetailId = this.requisitionDetailId;
    this.candidateService.getCandidatedummyList(this.searchCandidate).subscribe((result) => {
      if (result) {
        this.candidates = result;
        console.log("Candidate Details", this.candidates);

        for (var i = 0; i < this.candidates.length; i++) {
          this.candidates[i].popoverContent = "<div><span class='grey'>Emp. ID: </span><span>" + this.candidates[i].referalEmpNo + "</span></div><div><span class='grey'>Designation: </span></br><span>" + this.candidates[i].referalDesignation + "</span></div><div><span class='grey'>Function: </span><span>" + this.candidates[i].referalGrade + "</span></div>";
        }
        this.SpinnerService.hide();
      }
      else {
        this.candidates = [];
        this.SpinnerService.hide();
      }
    }, error => {
      this.SpinnerService.hide();
    }, () => {
      this.loadDataTable();
      this.loadPopover();
      this.SpinnerService.hide();
    });
  }

  setFilterForm() {
    var GenderIds = "";
    if (this.filterForm.value.GenderId != null || this.filterForm.value.GenderId != undefined) {
      if (this.filterForm.value.GenderId == "") {
        GenderIds = "";
      }
      else {
        GenderIds = this.filterForm.value.GenderId.join(',');
      }
    }
    this.searchCandidate = {
      CandidateId: 0,
      CandidateName: this.filterForm.value.CandidateName,
      HiringStatusId: Number(this.filterForm.value.HiringStatusId),
      GenderIds: GenderIds,
      FromAge: this.filterForm.value.FromAge,
      ToAge: this.filterForm.value.ToAge,
      AadharNo: this.filterForm.value.AadharNo,
      ContactNo: this.filterForm.value.ContactNo,
      EmailId: this.filterForm.value.EmailId,
      MotherTongueIds: this.filterForm.value.MotherTongueIds == "" ? "" : this.filterForm.value.MotherTongueIds.join(","),
      QualificationIds: this.filterForm.value.QualificationId == 0 ? "" : this.filterForm.value.QualificationId.join(","),
      CourseIds: this.filterForm.value.CourseId == 0 ? "" : this.filterForm.value.CourseId.join(","),
      StreamIds: this.filterForm.value.StreamId == 0 ? "" : this.filterForm.value.StreamId.join(","),
      FromPercentage: this.filterForm.value.ToPercent,
      ToPercentage: this.filterForm.value.FromPercent,
      DomainIds: this.filterForm.value.DomainId == 0 ? "" : this.filterForm.value.DomainId.join(","),
      SubDomainIds: (this.filterForm.value.SubDomainId == 0) ? "" : this.filterForm.value.SubDomainId.join(","),
      StateIds: this.filterForm.value.StateIds,
      SourceChannelId: this.filterForm.value.SourceChannelId == 0 ? "" : this.filterForm.value.SourceChannelId.join(","),
      CreatedBy: 0,
      RequisitionDetailId: this.requisitionDetailId,
      FromDate: this.filterForm.value.ToDate,
      ToDate: this.filterForm.value.FromDate,
      FromExperience: this.filterForm.value.FromExperience,
      ToExperience: this.filterForm.value.ToExperience,
      CompletionYears: "",
      QualificationTypeIds: this.filterForm.value.QualificationTypeId == 0 ? "" : this.filterForm.value.QualificationTypeId.join(","),
      CurrentEmployer: this.filterForm.value.CurrentEmployer,
      Designation: this.filterForm.value.Designation,
      RelativeStatus: this.filterForm.value.RelativeStatus == 0 ? "" : this.filterForm.value.RelativeStatus.join(","),
      PreviousApplied: this.filterForm.value.PreviousApplied
    }
    this.searchCandidateOwner = {
      CandidateId: 0,
      CandidateName: this.filterForm.value.CandidateName,
      HiringStatusId: Number(this.filterForm.value.HiringStatusId),
      GenderIds: GenderIds,
      FromAge: this.filterForm.value.FromAge,
      ToAge: this.filterForm.value.ToAge,
      AadharNo: this.filterForm.value.AadharNo,
      ContactNo: this.filterForm.value.ContactNo,
      EmailId: this.filterForm.value.EmailId,
      MotherTongueIds: this.filterForm.value.MotherTongueIds == "" ? "" : this.filterForm.value.MotherTongueIds.join(","),
      QualificationIds: this.filterForm.value.QualificationId == 0 ? "" : this.filterForm.value.QualificationId.join(","),
      CourseIds: this.filterForm.value.CourseId == 0 ? "" : this.filterForm.value.CourseId.join(","),
      StreamIds: this.filterForm.value.StreamId == 0 ? "" : this.filterForm.value.StreamId.join(","),
      FromPercentage: this.filterForm.value.ToPercent,
      ToPercentage: this.filterForm.value.FromPercent,
      DomainIds: this.filterForm.value.DomainId == 0 ? "" : this.filterForm.value.DomainId.join(","),
      SubDomainIds: (this.filterForm.value.SubDomainId == 0) ? "" : this.filterForm.value.SubDomainId.join(","),
      StateIds: this.filterForm.value.StateIds,
      SourceChannelId: this.filterForm.value.SourceChannelId == 0 ? "" : this.filterForm.value.SourceChannelId.join(","),
      CreatedBy: 0,
      RequisitionDetailId: this.requisitionDetailId,
      FromDate: this.filterForm.value.ToDate,
      ToDate: this.filterForm.value.FromDate,
      FromExperience: this.filterForm.value.FromExperience,
      ToExperience: this.filterForm.value.ToExperience,
      CompletionYears: "",
      QualificationTypeIds: this.filterForm.value.QualificationTypeId == 0 ? "" : this.filterForm.value.QualificationTypeId.join(","),
      CurrentEmployer: this.filterForm.value.CurrentEmployer,
      Designation: this.filterForm.value.Designation,
      RelativeStatus: this.filterForm.value.RelativeStatus == 0 ? "" : this.filterForm.value.RelativeStatus.join(","),
      PreviousApplied: this.filterForm.value.PreviousApplied,
      CandidateOwner: this.filterForm.value.CandidateOwner
    }
  }

  getFilterCandidateList() {
    this.SpinnerService.show();
    this.candidates = [];
    this.setFilterForm();
    this.btnInterviewVisible = false;
    this.btnTestVisible = false;
    jQuery("#chkAll").prop("checked", false);
    this.candidateService.getCandidateList(this.searchCandidateOwner).subscribe((result) => {
      if (result) {
        this.candidates = result.filter(item => item.sourceChannelId == this.searchCandidateOwner.SourceChannelId);
        for (var i = 0; i < this.candidates.length; i++) {
          this.candidates[i].popoverContent = "<div><span class='grey'>Emp. ID: </span><span>" + this.candidates[i].referalEmpNo + "</span></div><div><span class='grey'>Designation: </span></br><span>" + this.candidates[i].referalDesignation + "</span></div><div><span class='grey'>Function: </span><span>" + this.candidates[i].referalGrade + "</span></div>";
        }
        this.SpinnerService.hide();
      }
      else {
        this.candidates = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.loadDataTable();
      this.loadPopover();
      this.SpinnerService.hide();
    });
  }

  loadDataTable() {
    var dothis = this;
    jQuery('#dataTable1').dataTable().fnClearTable();
    jQuery('#dataTable1').dataTable().fnDestroy();
    setTimeout(() => {
      var oTable =
        jQuery('#dataTable1').dataTable({
          "searching": true,
          "paging": true,
          "scrollX": true,
          //"pageLength": 2,
          //"stateSave": true,
          "fixedColumns": {
            "left": 3
          }
        });
      var flag = 0;
      var l = 0;
      var firsttext = "";
      var nexttext = "";
      jQuery('body').on('click', '#chkAll', function () {
        l = 0;
        flag = 0;
        if (jQuery(this).prop("checked")) {
          jQuery('.cmdUpdateStatus', oTable.fnGetNodes()).each(function () {
            if (l == 0) {
              firsttext = jQuery(this).parent("td").parent("tr").find("td:eq(14)").html();
            }
            else {
              nexttext = jQuery(this).parent("td").parent("tr").find("td:eq(14)").html();
            }
            if (jQuery(this).val() == "0") {
              flag = 1;
            }
            else {
              if (l > 0) {
                if (firsttext != nexttext) {
                  flag = 2;
                }
              }
            }
            l++;
          });
          if (flag == 1) {
            dothis.notificationService.showError("Please update the CMD approval status", "Error");
            jQuery("#chkAll").prop("checked", false);
          }
          else if (flag == 2) {
            jQuery("#chkAll").prop("checked", false);
            dothis.notificationService.showError("Please select same hiring status", "Error");
          }
          else {
            jQuery('.cmdUpdateStatus', oTable.fnGetNodes()).each(function () {
              if (jQuery(this).parent("td").find('input[type="checkbox"]').prop("checked")) {
                jQuery(this).parent("td").find('input[type="checkbox"]').click();
              }
              jQuery(this).parent("td").find('input[type="checkbox"]').click();
            });
            jQuery("#chkAll").prop("checked", true);
          }
        }
        else {
          jQuery('.cmdUpdateStatus', oTable.fnGetNodes()).each(function () {
            if (jQuery(this).parent("td").find('input[type="checkbox"]').prop("checked")) {
              jQuery(this).parent("td").find('input[type="checkbox"]').click();
            }
          });
          dothis.candidateIds = "";
        }
      });
    });
  }

  loadTooltipMenu() {
    setTimeout(() => {
      var body_ = jQuery('body');
      var dropdownMenu,
        table_responsive = jQuery('.table-responsive');
      table_responsive.on('show.bs.dropdown', function (e) {
        dropdownMenu = jQuery(e.target).find('.custom-menu');
        body_.append(dropdownMenu.detach());
        var eOffset = jQuery(e.target).offset();
        dropdownMenu.css({
          'display': 'block',
          'top': eOffset.top + jQuery(e.target).outerHeight(),
          'left': eOffset.left,
          'font-size': '14px'
        });
        dropdownMenu.addClass("mobPosDropdown");
      });
      table_responsive.on('hide.bs.dropdown', function (e) {
        jQuery(e.target).append(dropdownMenu.detach());
        jQuery(e.target).find('.dropdown-menu').hide();
      });
      jQuery(".custom-menu").find(".dropdown-item").on("click", function (e) {
        jQuery(e.target).append(dropdownMenu.detach());
        jQuery(e.target).find('.custom-menu').hide();
      });
    });
  }

  loadPopover() {
    setTimeout(() => {
      jQuery('[data-toggle="popover"]').popover({
        html: true
      });
    });
  }

  selectAll(event) {
    jQuery('#dataTable1 tbody tr').each(function () {
      jQuery("#chkm2").click();
    });
  }

  select(evt, id, statusid, testOption, emailId, candidateNo, managementApprovalId) {
    var flag = 0;
    var managementflag = 0;
    this.candidiateIdCb = id;
    this.hiringStatusIdCb = statusid;
    this.emailIdCb = emailId;
    this.btnreScheduleInterviewVisible = false;
    this.currentHiringStatus = statusid;
    this.EmailId = emailId;
    this.candidateNo = candidateNo;
    if (this.candidateIds != "") {
      if (this.prevselectedstatus != statusid) {
        jQuery("#chkm" + id).prop("checked", false);
        flag = 1;
      }
      else {
        this.prevselectedstatus = statusid;
        if (statusid != 39) {                  // Added By anif on 04-02-2023
          if (this.oldManagementApprovalId != managementApprovalId) {
            jQuery("#chkm" + id).prop("checked", false);
            managementflag = 1;
          }
          else {
            this.oldManagementApprovalId = managementApprovalId;
          }
        }
      }
    }
    else {
      this.prevselectedstatus = statusid;
      this.oldManagementApprovalId = managementApprovalId; //Piu
    }
    if (evt.target.checked && flag == 0 && managementflag == 0) {
      this.candidateIds = this.candidateIds + "," + id;
      this.emailidAray.push({
        id: id,
        emailId: emailId
      });
      this.candidateNoarray.push({
        id: id,
        candidateNo: candidateNo
      });
    }
    else {
      jQuery("#chkAll").prop("checked", false);
      this.candidateIds = this.candidateIds.replace("," + id, "");
      this.emailidAray = this.emailidAray.filter(e => e.id != id);
      this.candidateNoarray = this.candidateNoarray.filter(e => e.id != id);
    }
    if (this.candidateIds != "") {
      if (statusid == 1 && flag == 0) {
        this.btnVisible = true;
        this.btnTestVisible = false;
        this.btnInterviewVisible = false;
        this.btnDocumentCollectionVisible = false;
        this.btnManagementApprovalVisible = false;
        this.btnUploadManagementApprovalVisible = false;
        this.btnUpdateManagementApprovalVisible = false;
      }
      else if (statusid == 3 && flag == 0 && testOption == 1) {
        this.btnVisible = false;
        this.btnTestVisible = true;
        this.btnInterviewVisible = false;
        this.btnDocumentCollectionVisible = false;
        this.btnManagementApprovalVisible = false;
        this.btnUploadManagementApprovalVisible = false;
        this.btnUpdateManagementApprovalVisible = false;
      }
      else if (statusid == 3 && testOption == 0 && flag == 0) {
        this.btnVisible = false;
        this.btnTestVisible = false;
        this.btnInterviewVisible = true;
        this.btnDocumentCollectionVisible = false;
        this.btnManagementApprovalVisible = false;
        this.btnUploadManagementApprovalVisible = false;
        this.btnUpdateManagementApprovalVisible = false;

      }
      else if (statusid % 3 == 0 && flag == 0 && statusid != 39 && statusid != 36) {
        this.btnVisible = false;
        this.btnTestVisible = false;
        this.btnInterviewVisible = true;
        this.btnDocumentCollectionVisible = false;
        this.btnManagementApprovalVisible = false;
        this.btnUploadManagementApprovalVisible = false;
        this.btnUpdateManagementApprovalVisible = false;
      }
      else if (statusid == 29 && flag == 0) {
        this.btnVisible = false;
        this.btnTestVisible = false;
        this.btnInterviewVisible = false;
        this.btnDocumentCollectionVisible = true;
        this.btnManagementApprovalVisible = false;
        this.btnUploadManagementApprovalVisible = false;
        this.btnUpdateManagementApprovalVisible = false;
      }
      else if (statusid == 38 && flag == 0) {
        this.btnVisible = false;
        this.btnTestVisible = false;
        this.btnInterviewVisible = false;
        this.btnDocumentCollectionVisible = false;
        this.btnManagementApprovalVisible = true;
        this.btnUploadManagementApprovalVisible = false;
        this.btnUpdateManagementApprovalVisible = false;
      }
      else if (statusid == 39 && flag == 0) {
        this.btnVisible = false;
        this.btnTestVisible = false;
        this.btnInterviewVisible = false;
        this.btnDocumentCollectionVisible = false;
        this.btnManagementApprovalVisible = false;
        this.btnUploadManagementApprovalVisible = true;
        this.btnUpdateManagementApprovalVisible = false;
      }

      // else if (statusid == 40 && flag == 0 && managementflag == 0) {
      //   this.oldManagementApprovalId = managementApprovalId;
      //   if (this.oldManagementApprovalId != 0) {
      //     if (this.oldManagementApprovalId == managementApprovalId) {
      //       this.btnVisible = false;
      //       this.btnTestVisible = false;
      //       this.btnInterviewVisible = false;
      //       this.btnDocumentCollectionVisible = false;
      //       this.btnManagementApprovalVisible = false;
      //       this.btnUpdateManagementApprovalVisible = true;
      //       this.btnUploadManagementApprovalVisible = false;
      //     }
      //     else {
      //       //this.oldManagementApprovalId = this.managementApprovalId
      //       this.notificationService.showWarning("Please select same type of Management Approval", "Error");

      //     }
      //   }
      //   else {
      //     this.oldManagementApprovalId = this.managementApprovalId
      //     this.btnVisible = false;
      //     this.btnTestVisible = false;
      //     this.btnInterviewVisible = false;
      //     this.btnDocumentCollectionVisible = false;
      //     this.btnManagementApprovalVisible = false;
      //     this.btnUpdateManagementApprovalVisible = true;
      //     this.btnUploadManagementApprovalVisible = false;
      //   }
      // }
      else if (statusid == 8 || statusid == 11 || statusid == 26 ||
        statusid == 14 || statusid == 17 || statusid == 20 || statusid == 23) {
        this.btnreScheduleInterviewVisible = true;
      }

    }
    else {
      this.btnVisible = false;
      this.btnTestVisible = false;
      this.btnInterviewVisible = false;
      this.btnTestVisible = false;
      this.prevselectedstatus = 0;
      this.btnDocumentCollectionVisible = false;
      this.btnManagementApprovalVisible = false;
      this.btnUploadManagementApprovalVisible = false;
      this.btnUpdateManagementApprovalVisible = false;
    }

    this.searchTestScheduleDetail.candidateId = id;
    this.searchTestScheduleDetail.requisitionDetailId = this.requisitionDetailId;
    this.testScheduleService.getTestScheduleDetail(this.searchTestScheduleDetail).subscribe((result) => {
      if (result) {
        if (result) {
          this.testScheduleDetail = result;
          this.ContactName = this.testScheduleDetail.contactPersonName;
          this.ContactNo = this.testScheduleDetail.contactNo;
        }
      }
    })
  }

  getCandidateIds() {
    var dothis = this;
    var candidates = "";
    jQuery('#dataTable1 tr').each(function () {
      if (jQuery(this).find("input[type=checkbox]").attr("checked")) {
        var idval = jQuery(this).find("input[type=checkbox]").val();
        if (candidates == "") {
          candidates = idval;
        }
        else {
          candidates += "," + idval;
        }
      }

    });
    dothis.candidateIds = candidates;
  }

  gotoCandidateAction(id: any, relativeStatus: any, childRelationshipId: any, cmdUpdateStatus: any) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "rmdummyrequisitionlist");
    this.persistance.set('nextpagename', "candidateaction");
    this.persistance.set('candidateid', id);
    this.persistance.set('paramid', this.requisitionDetailId);
    this._route.navigate(['/app/my-action/all-positions/candidate-list/candidate']);

  }

  gotoAddNaukriCandidate() {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "rmrequisitionlist");
    this.persistance.set('paramid', this.requisitionDetailId);
    this._route.navigate(['/app/my-action/all-requisition/upload-naukri-profile']);
  }

  gotoAddCandidate() {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "rmrequisitionlist");
    this.persistance.set('paramid', this.requisitionDetailId);
    this._route.navigate(['/app/my-action/all-requisition/requisition/add-candidate']);
  }

  gotoTagCvDropCandidate() {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "rmrequisitionlist");
    this.persistance.set('paramid', this.requisitionDetailId);
    this._route.navigate(['/app/candidatedropcvtag']);
  }

  ProcessCandidate() {
    this.SpinnerService.show();
    this.formData.candidateIds = this.candidateIds.substring(1, 100);
    this.formData.requisitionDetailId = this.requisitionDetailId;
    this.formData.hiringStatusId = this.statusId;
    this.formData.createdBy = this.createdBy;
    this.formData.remarks = this.remarks;
    //console.log(this.formData);
    if (this.statusId < 55) {
      this.requisitionService.updateRequisitionCandidateHiringStatus(this.formData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getCandidateList();
            this.btnInterviewVisible = false;
            this.btnTestVisible = false;
            this.prevselectedstatus = 0;
            this.cModal.nativeElement.click();
            this.btnVisible = false;
            this.candidateIds = "";
            this.remarks = "";
            this.rescheduleCandidateId = "";
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
      this.requisitionService.updateRequisitionCandidateRejectDeclineCallBack(this.formData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getCandidateList();
            this.btnInterviewVisible = false;
            this.btnTestVisible = false;
            this.prevselectedstatus = 0;
            this.cModal.nativeElement.click();
            this.btnVisible = false;
            this.candidateIds = "";
            this.remarks = "";
            this.rescheduleCandidateId = "";
          }
        }
        else {
          this.SpinnerService.hide();
        }
      }, error => {
        this.SpinnerService.hide();
        console.log(error);
      }, () => {
        this.SpinnerService.hide();
      });
    }
  }

  openModalPopupRejectDeclineCallBack(statusId, candidateId, prevHiringId) {
    this.statusId = statusId;
    this.previousHiringId = prevHiringId;
    if (this.statusId == 56) {
      this.actionName = "Declined";
    }
    else if (this.statusId == 57) {
      this.actionName = "Reject";
    }
    else if (this.statusId == 59) {
      this.actionName = "Call back";
    }
    else if (this.statusId == 8
      || this.statusId == 11 || this.statusId == 14
      || this.statusId == 17 || this.statusId == 20 || this.statusId == 23 || this.statusId == 26) {
      this.actionName = "Cancel Interview"
    }
    this.candidateIds = "," + candidateId.toString();
  }

  CancelInterviewSubmit() {
    this.cancelFormData.candidateIds = this.candidateIds.substring(1, 100);
    this.cancelFormData.requisitionDetailId = this.requisitionDetailId;
    this.cancelFormData.hiringStatusId = this.statusId;
    this.cancelFormData.prevHiringId = this.previousHiringId;
    this.cancelFormData.createdBy = this.createdBy;
    this.cancelFormData.remarks = this.remarks;
    ////console.log(this.formData);
    if (this.statusId < 55) {
      this.SpinnerService.show();
      this.requisitionService.updateRequisitionCandidateHiringStatusForCancel(this.cancelFormData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
            this.SpinnerService.hide();
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.SpinnerService.hide();
            this.getCandidateList();
            this.btnInterviewVisible = false;
            this.btnTestVisible = false;
            this.prevselectedstatus = 0;
            this.cModal.nativeElement.click();
            this.btnVisible = false;
            this.candidateIds = "";
            this.remarks = "";
            this.rescheduleCandidateId = "";

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
    //else {
    //  this.requisitionService.updateRequisitionCandidateRejectDeclineCallBack(this.formData).subscribe((result) => {
    //    if (result) {
    //      if (result.successFlag == 0) {
    //        this.notificationService.showError(result.msg, "Error");
    //      }
    //      else {
    //        this.notificationService.showSuccess(result.msg, "Success");
    //        this.getCandidateList();
    //        this.btnInterviewVisible = false;
    //        this.btnTestVisible = false;
    //        this.prevselectedstatus = 0;
    //        this.cModal.nativeElement.click();
    //        this.btnVisible = false;
    //        this.candidateIds = "";
    //        this.remarks = "";
    //        this.rescheduleCandidateId = "";
    //      }
    //    }
    //    else {
    //    }
    //  }, error => {
    //    console.log(error);
    //  }, () => {
    //  });
    //}
  }

  openModalPopup(status: number) {
    this.statusId = parseInt(status.toString());
    if (this.statusId == 2) {
      this.actionName = "Send To Hiring Manager";
    }
    else if (this.statusId == 3) {
      this.actionName = "Shortlist";
    }
    else if (this.statusId == 4) {
      this.actionName = "Reject";
    }
  }

  gotoRMRequisitionList() {
    if (this.pageNameForBack == "rmrequisitionlist") {
      this.persistance.set('pagename', null)
      this.persistance.set('paramid', null)
      this._route.navigate(['/my-action/all-positions']);
    } else if (this.pageNameForBack == "requesterrequisitionlist") {
      this.persistance.set('pagename', null)
      this.persistance.set('paramid', null)
      this._route.navigate(['/app/my-action/requisition-list']);
    }
    else {
      this.persistance.set('moduleId', this.persistance.get('moduleId'))
      this._route.navigate(['/app/campus/dummyrequisitionlist']);
    }
  }

  //venue
  getAllVenue() {
    this.venues = [];
    this.commonService.getAllTestVenue(this.searchTestVenue).subscribe((result: any) => {
      if (result) {
        this.venues = result;
      }
      else {
        this.venues = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  getAllInterviewVenue() {

    this.commonService.getAllInterviewVenue(this.searchVenue).subscribe((result: any) => {
      if (result) {
        this.interviewVenues = result;
        //this.venues=result
      }
      else {
        this.interviewVenues = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  //email template
  getAllEmailTemplate() {
    this.emailTemplates = [];
    this.emailtemplateService.getAllEmailTemplate(this.searchEmailTemplate).subscribe((result) => {
      if (result) {
        this.emailTemplates = result;
      }
      else {
        this.emailTemplates = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  getAllInterviewEmailTemplate() {
    this.interviewemailTemplates = [];
    this.emailtemplateService.getAllEmailTemplate(this.searchInterviewEmailTemplate).subscribe((result) => {
      if (result) {
        this.interviewemailTemplates = result;
      }
      else {
        this.interviewemailTemplates = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  getAllTestScheduleEmailTemplate() {
    this.testScheduleemailTemplates = [];
    this.emailtemplateService.getAllEmailTemplate(this.searchTestScheduleEmailTemplate).subscribe((result) => {
      if (result) {
        this.testScheduleemailTemplates = result;
      }
      else {
        this.testScheduleemailTemplates = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  getAllDocumentCollectionEmailTemplate() {
    this.documentCollectionEmailTemplates = [];
    this.emailtemplateService.getAllEmailTemplate(this.searchDocumentCollectionEmailTemplate).subscribe((result) => {
      if (result) {
        this.documentCollectionEmailTemplates = result;
        //  console.log("Email Template List", this.documentCollectionEmailTemplates);

      }
      else {
        this.documentCollectionEmailTemplates = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  loadSelectPicker() {
    setTimeout(() => {
      jQuery('.selectpicker').selectpicker({
        size: 6
      });
      jQuery('.selectpicker').selectpicker('refresh');
    });
  }

  loadDateTimePicker() {
    setTimeout(() => {
      jQuery('.dateTimepik').datetimepicker(
        {
          format: 'DD-MM-YYYY HH:mm'
        }
      );
      jQuery('.timepik').datetimepicker(
        {
          format: 'hh:mm'
        }
      );
    });
  }

  openTestScheduleModal() {
    this.checkTestLink = "";
    this.checkTestFromDate = "";
    this.checkTestToDate = "";
    this.checkTestContactNo = "";
    this.checkTestContactName = "";
    this.checkTestVenue = "";
    this.checkTestEmailTemplate = "";
    this.stepCount = 1;
    this.isTestTravel = false;
    this.loadSelectPicker();
    if (this.testTypeId != 1) {
      document.getElementById("radio1").click();
    }
    this.loadDateTimePicker();
  }

  onTestSchedule() {
    //debugger;
    var flag = 0;
    if (this.selectedTestEmailTemplateId == undefined) {
      flag = 1;
      jQuery(".ddltestemailtemplate").addClass("is-invalid");
    }
    else {
      jQuery(".ddltestemailtemplate").removeClass("is-invalid");
    }
    if (flag == 0) {
      if (this.testScheduleFormData.TestTypeId == 1) {
        this.testScheduleFormData.TestLink = "";
      }
      if (this.rescheduleCandidateId != "") {
        this.candidateIds = this.rescheduleCandidateId;
      }
      this.testScheduleFormData.CandidateIds = this.candidateIds;
      this.testScheduleFormData.RequisitionDetailId = this.requisitionDetailId;
      this.testScheduleFormData.TestEmailTemplateId = Number(this.selectedTestEmailTemplateId);
      //this.testScheduleFormData.TestEmailTemplate = this.testEmailTemplateDescription;
      //this.testScheduleFormData.TestEmailTemplate = this.templatedescription;
      if (this.testEmailTemplateDescription == null && this.testEmailTemplateDescription == undefined) {
        this.testScheduleFormData.TestEmailTemplate = this.templatedescription;
      }
      else {
        this.testScheduleFormData.TestEmailTemplate = this.testEmailTemplateDescription;
      }
      this.testScheduleFormData.CreatedBy = this.createdBy;
      this.testScheduleFormData.TestTypeId = Number(this.testTypeId);
      this.testScheduleFormData.TestVenueId = Number(this.selectedTestVenueId);
      // this.testScheduleFormData.TestFromDate = this.DateTime;
      var emailids = "";
      for (var val of this.emailidAray) {
        emailids += val.emailId.toString() + ","
      }
      this.testScheduleFormData.EmailId = emailids.slice(0, -1);
      this.testScheduleFormData.VenueName = this.VenueName;
      this.testScheduleFormData.VanueAddress = this.VanueAddress;
      if (this.testContactName != undefined) {
        this.testScheduleFormData.ContactName = this.testContactName;
        this.testScheduleFormData.ContactNo = this.testContactNo;
      }
      else {
        this.testScheduleFormData.ContactName = '';
        this.testScheduleFormData.ContactNo = '';
      }

      if (this.testLink != undefined) {
        this.testScheduleFormData.TestLink = this.testLink;
      }
      else {
        this.testScheduleFormData.TestLink = '';

      }
      this.SpinnerService.show();
      this.testScheduleService.createTestSchedule(this.testScheduleFormData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
            this.SpinnerService.hide();
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.SpinnerService.hide();
            this.candidateIds = "";
            this.prevselectedstatus = 0;
            this.closeScheduleModal();
            this.getFilterCandidateList();
            this.loadDataTable();
            this.getCandidateList();
            this.btnTestVisible = false;
            this.rescheduleCandidateId = "";
            jQuery("#chkAll").prop("checked", false);
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
  }

  onInterviewSchedule() {
    var flag = 0;
    var index = 0;
    var emailids = "";
    var candidateNos = ""
    //this.SpinnerService.show();
    if (this.selectedInterviewEmailTemplateId == undefined) {
      flag = 1;
      jQuery(".ddlinterviewemailtemplate").addClass("is-invalid");
    }
    else {
      jQuery(".ddlinterviewemailtemplate").removeClass("is-invalid");
    }
    if (flag == 0) {
      this.SpinnerService.show();
      if (this.interviewScheduleFormData.InterviewTypeId == 1) {
        this.interviewScheduleFormData.InterviewLink = "";
      }
      if (this.rescheduleCandidateId != "") {
        this.candidateIds = this.rescheduleCandidateId;
      }
      this.interviewScheduleFormData.CandidateIds = this.candidateIds;

      for (index = 0; index < this.emailidAray.length; index++) {
        var emailbyId = this.emailidAray.find(e => e.id == this.emailidAray[index].id);
        var candidatebyId = this.candidateNoarray.find(e => e.id == this.emailidAray[index].id);
        emailids += emailbyId.emailId.toString() + ","
        candidateNos += candidatebyId.candidateNo.toString() + ","
      }
      this.interviewScheduleFormData.EmailId = emailids.slice(0, -1);
      this.interviewScheduleFormData.candidateNo = candidateNos;
      this.interviewScheduleFormData.VenueName = this.VenueName;
      this.interviewScheduleFormData.VanueAddress = this.VanueAddress;
      this.interviewScheduleFormData.travelModeDesc = this.travelModeDesc;
      this.interviewScheduleFormData.interviewAccomodationDetails = this.interviewAccomodationDetails;
      if (this.ContactName != undefined) {
        this.interviewScheduleFormData.ContactName = this.ContactName;
        this.interviewScheduleFormData.ContactNo = this.ContactNo;
      }
      else {
        this.interviewScheduleFormData.ContactName = '';
        this.interviewScheduleFormData.ContactNo = '';
      }
      this.interviewScheduleFormData.RequisitionDetailId = this.requisitionDetailId;
      this.interviewScheduleFormData.EmailTemplateId = Number(this.selectedInterviewEmailTemplateId);
      //this.interviewScheduleFormData.EmailTemplate = this.interviewEmailTemplateDescription;
      //this.interviewScheduleFormData.EmailTemplate = this.templatedescription;
      if (this.interviewEmailTemplateDescription == null && this.interviewEmailTemplateDescription == undefined) {
        this.interviewScheduleFormData.EmailTemplate = this.templatedescription;
      }
      else {
        this.interviewScheduleFormData.EmailTemplate = this.interviewEmailTemplateDescription;
      }
      this.interviewScheduleFormData.CreatedBy = this.createdBy;
      this.interviewScheduleFormData.InterviewSlot = "" + this.interviewScheduleFormData.InterviewSlot.toString();
      this.interviewScheduleService.createInterviewSchedule(this.interviewScheduleFormData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
            this.SpinnerService.hide();
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.SpinnerService.hide();
            this.candidateIds = "";
            this.emailidAray = [];
            this.candidateNoarray = [];
            this.closeInterviewModal();
            this.prevselectedstatus = 0;
            //this.getFilterCandidateList();
            this.loadDataTable();
            this.getCandidateList();
            this.btnInterviewVisible = false;
            this.rescheduleCandidateId = "";
            jQuery("#chkAll").prop("checked", false);
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
  }

  openInterviewModal() {
    this.getAllSelectionGuideInterview();
    this.checkInterviewLink = "";
    this.checkInterviewFromDate = "";
    this.checkInterviewToDate = "";
    this.checkInterviewVenue = "";
    this.checkInterviewEmailTemplate = "";
    this.checkAccomodationDetails = "";
    this.stepCount = 1;
    this.isInterviewTravel = false;
    this.isInterviewAccomodation = false;
    this.selectedPanelFunction = [];
    this.selectedPanelHR = [];
    this.selectedTravelModeArray = [];
    this.selectedInterViewRoom = 1;
    this.loadSelectPicker();
    if (this.testTypeId != 1) {
      document.getElementById("interviewradio1").click();
    }
    this.loadDateTimePicker();
  }

  changeTestEmailTemplate() {
    var venueaddress = this.venues.filter(x => x.testVenueId == this.selectedTestVenueId)[0].venueAddress;
    //  //var templatedescription = this.testScheduleemailTemplates.filter(x => x.templateId == this.selectedTestEmailTemplateId)[0].templateDescription;
    //  this.templatedescription = this.templatedescription.replace("@@DateTime", this.testScheduleFormData.TestFromDate + " - " + this.testScheduleFormData.TestToDate);
    //  this.templatedescription = this.templatedescription.replace("@@VenueAddress", venueaddress);
    //  this.templatedescription = this.templatedescription.replace("@@PositionDepartment", this.requisitionPositionName + ", " + this.requisitionDepartmentName);
    //  this.templatedescription = this.templatedescription.replace("@@Function", this.requisitionFunctionName);
    //  this.templatedescription = this.templatedescription.replace("@@TestLink", this.testLink);
    //  this.templatedescription = this.templatedescription.replace("@@ContactPerson", this.testScheduleFormData.TestContactName);
    //  this.templatedescription = this.templatedescription.replace("@@ContactNumber", this.testScheduleFormData.TestContactNo);

    if (this.testScheduleemailTemplates.length > 0) {
      for (let i = 0; i < this.testScheduleemailTemplates.length; i++) {
        if (this.testScheduleemailTemplates[i].templateId == this.selectedTestEmailTemplateId) {
          this.templatedescription = this.testScheduleemailTemplates[i].templateDescription;
        }
      }

    }
    this.VanueAddress = this.venues.filter(x => x.testVenueId == this.selectedTestVenueId)[0].testVenueAddress;
    this.VenueName = this.venues.filter(x => x.testVenueId == this.selectedTestVenueId)[0].testVenueName;
    this.DateTime = this.testScheduleFormData.TestFromDate + " - " + this.testScheduleFormData.TestToDate;

    this.testEmailTemplateDescription = this.templatedescription

    if (this.testEmailTemplateDescription != undefined) {
      if (this.DateTime != undefined) {
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@fromDate", this.DateTime);
      }
      else {
        this.DateTime = '';
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@fromDate", this.DateTime);
      }
      if (this.VenueName != undefined) {
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@VenueName", this.VenueName);
      }
      else {
        this.VenueName = '';
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@VenueName", this.VenueName);
      }
      if (this.VanueAddress != undefined) {
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@VanueAddress", this.VanueAddress);
      }
      else {
        this.VanueAddress = '';
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@VanueAddress", this.VanueAddress);
      }
      if (this.requisitionDepartmentName != undefined) {
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@Department", this.requisitionDepartmentName);
      }
      else {
        this.requisitionDepartmentName = '';
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@Department", this.requisitionDepartmentName);
      }
      if (this.requisitionPositionName != undefined) {
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@Position", this.requisitionPositionName);
      }
      else {
        this.requisitionPositionName = '';
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@Position", this.requisitionPositionName);
      }
      if (this.requisitionFunctionName != undefined) {
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@Function", this.requisitionFunctionName);
      }
      else {
        this.requisitionFunctionName = '';
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@Function", this.requisitionFunctionName);
      }
      if (this.testLink != undefined) {
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@TestLink", this.testLink);
      }
      else {
        this.testLink = '';
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@TestLink", this.testLink);
      }
      if (this.testContactName != undefined) {
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@ContactName", this.testContactName);
      }
      else {
        this.testContactName = '';
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@ContactName", this.testContactName);
      }
      if (this.testContactNo != undefined) {
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@ContactNo", this.testContactNo);
      }
      else {
        this.testContactNo = '';
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@ContactNo", this.testContactNo);
      }
      if (this.interviewAccomodationDetails != undefined) {
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@InterviewAccomodationDetails", this.interviewAccomodationDetails);
      }
      else {
        this.interviewAccomodationDetails = '';
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@InterviewAccomodationDetails", this.interviewAccomodationDetails);
      }
      if (this.travelModeDesc != undefined) {
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@IsTravel", this.travelModeDesc); //not done
      }
      else {
        this.travelModeDesc = '';
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@IsTravel", this.travelModeDesc); //not done
      }
      if (this.travelModeDesc != undefined) {
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@TravelMode", this.travelModeDesc);
      }
      else {
        this.travelModeDesc = '';
        this.testEmailTemplateDescription = this.testEmailTemplateDescription.replace("@~@TravelMode", this.travelModeDesc);
      }
    }

    setTimeout(() => {
      jQuery(".cke_wysiwyg_div").html("");
      jQuery(".cke_wysiwyg_div").html(this.testEmailTemplateDescription);
    });
  }



  btnTestNext() {
    var flag = 0;
    this.testScheduleFormData.TestTypeId = this.testTypeId;
    this.testScheduleFormData.TestLink = this.testLink;
    this.testScheduleFormData.TestFromDate = this.fTestDate.nativeElement.value;
    this.testScheduleFormData.TestToDate = this.tTestDate.nativeElement.value;
    this.testScheduleFormData.TestVenueId = this.selectedTestVenueId;
    this.testScheduleFormData.TestContactName = this.testContactName;
    this.testScheduleFormData.TestContactNo = this.testContactNo;
    this.testScheduleFormData.IsTestTravel = this.isTestTravel;
    if (this.testTypeId == 2) {
      if (this.testLink == "" || this.testLink == undefined) {
        flag = 1;
        this.checkTestLink = "1";
      }
      else {
        this.checkTestLink = "";
      }
    }
    else {
      this.checkTestLink = "";
    }
    if (this.fTestDate.nativeElement.value == "") {
      flag = 1;
      this.checkTestFromDate = "1";
    }
    else {
      this.checkTestFromDate = "";
    }
    if (this.tTestDate.nativeElement.value == "") {
      flag = 1;
      this.checkTestToDate = "1";
    }
    else {
      this.checkTestToDate = "";
    }
    if (this.tTestDate.nativeElement.value < this.fTestDate.nativeElement.value) {
      this.notificationService.showError("To Date Can't be less than From Date !! Please provide actual date", "Error");
      flag = 1
    }
    if (this.selectedTestVenueId == undefined) {
      flag = 1;
      this.checkTestVenue = "1";
      jQuery(".ddltestvenue").addClass("is-invalid");
    }
    else {
      this.checkTestVenue = "";
      jQuery(".ddltestvenue").removeClass("is-invalid");
    }
    if (this.testContactName == "" || this.testContactName == undefined) {
      flag = 1;
      this.checkTestContactName = "1";
    }
    else {
      this.checkTestContactName = "";
    }
    if (this.testContactNo == "" || this.testContactNo == undefined) {
      flag = 1;
      this.checkTestContactNo = "1";
    }
    else {
      this.checkTestContactNo = "";
    }
    if (flag == 0) {
      this.stepCount = 2;
      this.changeTestEmailTemplate();
      if (this.selectedTestEmailTemplateId != undefined) {
        setTimeout(() => {
          jQuery(".ddltestemailtemplate").selectpicker("val", this.selectedTestEmailTemplateId);
          jQuery('.ddltestemailtemplate').selectpicker('refresh');
        });
        //this.changeTestEmailTemplate();
      }
      else {
        setTimeout(() => {
          jQuery('.ddltestemailtemplate').selectpicker('refresh');
        });
      }
    }
    else {

    }
  }

  btnInterviewNext() {
    var flag = 0;
    var hruserid = jQuery(".ddlinterviewhrpanel").selectpicker('val');
    this.selectedPanelHR = hruserid;
    var paneluserid = jQuery(".ddlinterviewfunctionpanel").selectpicker('val');
    this.selectedPanelFunction = paneluserid;
    var travelmode = jQuery(".ddltravelmode").selectpicker('val');
    this.selectedTravelModeArray = travelmode;
    this.interviewScheduleFormData.InterviewTypeId = Number(this.interviewTypeId);
    this.interviewScheduleFormData.InterviewId = this.selectedInterviewId;
    this.interviewScheduleFormData.InterviewLink = this.interviewLink;
    this.interviewScheduleFormData.InterviewRoomId = this.selectedInterViewRoom;
    this.interviewScheduleFormData.FromDate = this.fInterviewDate.nativeElement.value;
    this.interviewScheduleFormData.ToDate = this.tInterviewDate.nativeElement.value;
    this.interviewScheduleFormData.VenueId = this.selectedInterviewVenueId;
    this.interviewScheduleFormData.InterviewSlot = "0"; //this.selectedSlot;

    if (this.selectedPanelHR == null) {
      this.interviewScheduleFormData.HRAutoUserIds = "";
    }
    else {
      this.interviewScheduleFormData.HRAutoUserIds = this.selectedPanelHR.join(); //this.selectedInterViewHR;
    }
    if (this.selectedPanelFunction == null) {
      this.interviewScheduleFormData.InterviewerAutoUserIds = "";
    }
    else {
      this.interviewScheduleFormData.InterviewerAutoUserIds = this.selectedPanelFunction.join(); //this.selectedInterViewFunction;
    }
    this.interviewScheduleFormData.IsTravel = this.isInterviewTravel;
    if (this.isInterviewTravel == true) {
      // console.log(this.selectedTravelModeArray);
      if (this.selectedTravelModeArray == null) {
        this.interviewScheduleFormData.TravelModes = "";
      }
      else {
        this.interviewScheduleFormData.TravelModes = this.selectedTravelModeArray.join();
      }
    }
    else {
      this.interviewScheduleFormData.TravelModes = "";
    }
    this.interviewScheduleFormData.IsAccomodation = this.isInterviewAccomodation;
    this.interviewScheduleFormData.AccomodationDetails = this.interviewAccomodationDetails;
    this.interviewScheduleFormData.ScheduleComments = this.interviewComments;
    this.interviewScheduleFormData.IsFormAnexture = this.isFormAnexture;
    if (this.interviewScheduleFormData.AccomodationDetails == undefined) {
      this.interviewScheduleFormData.AccomodationDetails = "";
    }
    if (this.interviewScheduleFormData.ScheduleComments == undefined) {
      this.interviewScheduleFormData.ScheduleComments = "";
    }
    if (this.interviewTypeId == 2) {
      if (this.interviewLink == "" || this.interviewLink == undefined) {
        flag = 1;
        this.checkInterviewLink = "1";
      }
      else {
        this.checkInterviewLink = "";
      }
    }
    else {
      this.checkInterviewLink = "";
    }
    if (this.fInterviewDate.nativeElement.value == "") {
      flag = 1;
      this.checkInterviewFromDate = "1";
    }
    else {
      this.checkInterviewFromDate = "";
    }
    if (this.tInterviewDate.nativeElement.value == "") {
      flag = 1;
      this.checkInterviewToDate = "1";
    }
    else {
      this.checkInterviewToDate = "";
    }
    if (this.selectedInterviewVenueId == undefined) {
      flag = 1;
      this.checkInterviewVenue = "1";
      jQuery(".ddlinterviewvenue").addClass("is-invalid");
    }
    else {
      this.checkInterviewVenue = "";
      jQuery(".ddlinterviewvenue").removeClass("is-invalid");
    }
    if (this.selectedInterviewId == undefined) {
      flag = 1;
      jQuery(".ddlinterviewid").addClass("is-invalid");
    }
    else {
      jQuery(".ddlinterviewid").removeClass("is-invalid");
    }
    if (this.selectedInterViewRoom == undefined) {
      flag = 1;
      jQuery(".ddlinterviewroom").addClass("is-invalid");
    }
    else {
      jQuery(".ddlinterviewroom").removeClass("is-invalid");
    }
    if (this.interviewScheduleFormData.HRAutoUserIds == "" || this.interviewScheduleFormData.HRAutoUserIds == undefined) {
      flag = 1;
      jQuery(".ddlinterviewhrpanel").addClass("is-invalid");
    }
    else {
      jQuery(".ddlinterviewhrpanel").removeClass("is-invalid");
    }
    if (this.interviewScheduleFormData.InterviewerAutoUserIds == "" || this.interviewScheduleFormData.InterviewerAutoUserIds == undefined) {
      flag = 1;
      jQuery(".ddlinterviewfunctionpanel").addClass("is-invalid");
    }
    else {
      jQuery(".ddlinterviewfunctionpanel").removeClass("is-invalid");
    }
    if (this.isInterviewAccomodation == true) {
      if (this.interviewAccomodationDetails == "" || this.interviewAccomodationDetails == undefined) {
        this.checkAccomodationDetails = "1";
        flag = 1;
      }
      else {
        this.checkAccomodationDetails = "";
      }
    }
    if (this.isInterviewTravel == true) {
      // console.log(this.interviewScheduleFormData.TravelModes);
      if (this.interviewScheduleFormData.TravelModes == "" || this.interviewScheduleFormData.TravelModes == undefined) {
        jQuery(".ddltravelmode").addClass("is-invalid");
        flag = 1;
      }
      else {
        jQuery(".ddltravelmode").removeClass("is-invalid");
      }
    }
    if (this.tInterviewDate.nativeElement.value < this.fInterviewDate.nativeElement.value) {
      this.notificationService.showError("To Date Can't be less than From Date !! Please provide actual date", "Error");
      flag = 1
    }
    if (flag == 0) {
      this.stepCount = 2;
      this.changeInterviewEmailTemplate();
      if (this.selectedInterviewEmailTemplateId != undefined) {
        setTimeout(() => {
          jQuery(".ddlinterviewemailtemplate").selectpicker("val", this.selectedInterviewEmailTemplateId);
          jQuery('.ddlinterviewemailtemplate').selectpicker('refresh');
        });
      }
      else {
        setTimeout(() => {
          jQuery('.ddlinterviewemailtemplate').selectpicker('refresh');
        });
      }
    }
    else {

    }
  }

  btnTestBack() {
    this.loadDateTimePicker();
    this.stepCount = 1;
    setTimeout(() => {
      jQuery("#fromdatetimepik").data("DateTimePicker").date(this.testScheduleFormData.TestFromDate);
      jQuery("#todatetimepik").data("DateTimePicker").date(this.testScheduleFormData.TestToDate);
    });

    setTimeout(() => {
      jQuery(".ddltestvenue").selectpicker("val", this.selectedTestVenueId);
      jQuery('.ddltestvenue').selectpicker('refresh');
    });
  }

  btnInterviewBack() {
    this.loadDateTimePicker();
    this.stepCount = 1;
    setTimeout(() => {
      jQuery("#ifromdatetimepik").data("DateTimePicker").date(this.interviewScheduleFormData.FromDate);
      jQuery("#itodatetimepik").data("DateTimePicker").date(this.interviewScheduleFormData.ToDate);
    });
    setTimeout(() => {
      jQuery(".ddlinterviewhrpanel").selectpicker("val", this.selectedPanelHR);
      //jQuery('.ddlinterviewhrpanel').selectpicker('refresh');
    });

    setTimeout(() => {
      jQuery(".ddlinterviewfunctionpanel").selectpicker("val", this.selectedPanelFunction);
      //jQuery('.ddlinterviewfunctionpanel').selectpicker('refresh');
    });

    setTimeout(() => {
      jQuery(".ddltravelmode").selectpicker("val", this.selectedTravelModeArray);
      //jQuery('.ddlinterviewhrpanel').selectpicker('refresh');
    });
  }

  changeTestType() {
    if (this.testTypeId == 1) {
      this.isOnlineTest = false;
      this.checkTestLink = "";
      this.searchTestScheduleEmailTemplate.templateTypeId = 41;
      // this.searchTestScheduleEmailTemplate.templateId=this.selectedTestEmailTemplateId;
    }
    else {
      this.isOnlineTest = true;
      this.checkTestLink = "";
      this.isTestTravel = false;
      this.searchTestScheduleEmailTemplate.templateTypeId = 42;
    }
    this.getAllTestScheduleEmailTemplate();
  }

  changeInterviewType() {
    if (this.interviewTypeId == 1) {
      this.isOnlineTest = false;
      this.checkInterviewLink = "";
      this.searchInterviewEmailTemplate.templateTypeId = 28;
    }
    else {
      this.isOnlineTest = true;
      this.checkInterviewLink = "";
      this.isInterviewAccomodation = false;
      this.interviewAccomodationDetails = "";
      this.isInterviewTravel = false;
      this.searchInterviewEmailTemplate.templateTypeId = 19;
    }
    this.getAllInterviewEmailTemplate();
  }


  closeScheduleModal() {
    this.resetTestForm();
    jQuery("#scheduleModal").modal('toggle');
  }

  closeInterviewModal() {
    this.resetInterviewForm();
    jQuery("#interviewModal").modal('toggle');
  }

  resetTestForm() {
    this.testScheduleFormData.TestTypeId = 1;
    this.testScheduleFormData.TestLink = "";
    this.testScheduleFormData.TestFromDate = "";
    this.testScheduleFormData.TestToDate = "";
    this.testScheduleFormData.TestVenueId = undefined;
    this.testScheduleFormData.TestContactName = "";
    this.testScheduleFormData.TestContactNo = "";
    this.testScheduleFormData.IsTestTravel = false;
    this.testScheduleFormData.TestEmailTemplateId = undefined;
    this.testScheduleFormData.TestEmailTemplate = "";
    this.testTypeId = 0;
    this.testLink = "";
    this.selectedTestVenueId = undefined;
    this.testContactNo = "";
    this.testContactName = "";
    this.testEmailTemplateDescription = "";
    this.selectedTestEmailTemplateId = undefined;
    this.isOnlineTest = false;
    this.stepCount = 1;
    setTimeout(() => {
      jQuery("#fromdatetimepik").data("DateTimePicker").date(null);
      jQuery("#todatetimepik").data("DateTimePicker").date(null);
    });

    setTimeout(() => {
      jQuery('.ddltestvenue').selectpicker('refresh');
      jQuery('.ddltestemailtemplate').selectpicker('refresh');
    });
    setTimeout(() => {
      jQuery(".cke_wysiwyg_div").html("");
    });
    this.loadDateTimePicker();
  }

  resetInterviewForm() {
    this.interviewScheduleFormData.InterviewTypeId = 1;
    this.interviewScheduleFormData.InterviewLink = "";
    this.interviewScheduleFormData.FromDate = "";
    this.interviewScheduleFormData.ToDate = "";
    this.interviewScheduleFormData.InterviewSlot = "";
    this.interviewScheduleFormData.VenueId = undefined;
    this.interviewScheduleFormData.InterviewRoomId = undefined;
    this.interviewScheduleFormData.HRAutoUserIds = "";
    this.interviewScheduleFormData.InterviewerAutoUserIds = "";
    this.interviewScheduleFormData.IsTravel = false;
    this.interviewScheduleFormData.TravelModes = "";
    this.interviewScheduleFormData.IsAccomodation = false;
    this.interviewScheduleFormData.IsFormAnexture = false;
    this.interviewScheduleFormData.AccomodationDetails = "";
    this.interviewScheduleFormData.EmailTemplateId = undefined;
    this.interviewScheduleFormData.EmailTemplate = "";
    this.interviewScheduleFormData.InterviewId = undefined;
    this.interviewTypeId = 0;
    this.interviewLink = "";
    this.selectedInterviewId = undefined;
    this.selectedInterViewRoom = undefined;
    this.selectedInterviewVenueId = undefined;
    this.selectedInterViewHR = "";
    this.selectedInterViewFunction = "";
    this.testContactName = "";
    this.testEmailTemplateDescription = "";
    this.selectedTestEmailTemplateId = undefined;
    this.isOnlineTest = false;
    this.stepCount = 1;
    setTimeout(() => {
      jQuery("#ifromdatetimepik").data("DateTimePicker").date(null);
      jQuery("#itodatetimepik").data("DateTimePicker").date(null);
      jQuery("#itimepik").data("DateTimePicker").date(null);
    });

    setTimeout(() => {
      jQuery('.ddlinterviewid').selectpicker('refresh');
      jQuery('.ddlinterviewroom').selectpicker('refresh');
      jQuery('.ddlinterviewhrpanel').selectpicker('refresh');
      jQuery('.ddlinterviewfunctionpanel').selectpicker('refresh');
      jQuery('.ddlinterviewvenue').selectpicker('refresh');
      jQuery('.ddltravelmode').selectpicker('refresh');
      jQuery('.ddlinterviewemailtemplate').selectpicker('refresh');
    });
    setTimeout(() => {
      jQuery(".cke_wysiwyg_div").html("");
    });
    this.loadDateTimePicker();
  }

  //only number will be add
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getAllInterviewPanelMemberHR() {
    this.interviewPanelMembersHR = [];
    this.searchInterviewPanelMember.panelTypeId = 2;
    this.searchInterviewPanelMember.functionId = Number(this.functionId);
    this.interviewService.getAllInterviewPanelMember(this.searchInterviewPanelMember).subscribe((result) => {
      if (result) {
        this.interviewPanelMembersHR = result;
        this.interviewPanelMembersHR = this.interviewPanelMembersHR.filter(x => x.panelTypeId == 2);

        if (this.interClarifications != undefined) {    // Added by anifur on 28/06/2022 as length got undefine
          for (var i = 0; i < this.interClarifications.length; i++) {
            this.ContactName = this.interviewPanelMembersHR[i].empName;
          }
        }

      }
      else {
        this.interviewPanelMembersHR = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  getAllInterviewPanelMemberFunction() {
    this.interviewPanelMembersFunction = [];
    this.searchInterviewPanelMember.panelTypeId = 1;
    this.searchInterviewPanelMember.functionId = Number(this.functionId);
    this.interviewService.getAllInterviewPanelMember(this.searchInterviewPanelMember).subscribe((result) => {
      if (result) {
        this.interviewPanelMembersFunction = result;
        this.interviewPanelMembersFunction = this.interviewPanelMembersFunction.filter(x => x.panelTypeId == 1);
      }
      else {
        this.interviewPanelMembersFunction = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  getAllInterviewRoom() {
    this.interviewRooms = [];
    this.interviewService.getAllInterviewRoom(this.searchInterviewRoom).subscribe((result) => {
      if (result) {
        this.interviewRooms = result;
      }
      else {
        this.interviewRooms = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  getInterviewClarificationList(candidateId) {
    this.interClarifications = [];
    this.interviewClarificationList = [];
    var data: any[] = [];
    this.searchInterviewClarification.requisitionDetailId = this.requisitionDetailId;
    this.searchInterviewClarification.candidateId = candidateId;
    this.calendarActionService.getInterviewClarificationList(this.searchInterviewClarification).subscribe((result) => {
      if (result) {
        this.interClarifications = result;
        for (var i = 0; i < this.interClarifications.length; i++) {
          //var count=this.interviewClarificationList.filter(x=>x.calendarId==this.interClarifications[i].calendarId).length;
          var flag = 0;
          for (var j = 0; j < data.length; j++) {
            if (data[j] == this.interClarifications[i].calendarId) {
              flag = 1;
            }
          }
          if (flag == 0) {
            data.push(this.interClarifications[i].calendarId);
          }
        }
        for (var i = 0; i < data.length; i++) {
          this.interviewClarificationdata = [];
          var listdata = this.interClarifications.filter(x => x.calendarId == data[i]);
          for (var j = 0; j < listdata.length; j++) {
            this.interviewClarificationdata.push({
              remarks: listdata[j].remarks,
              createdByName: listdata[j].createdByName
            })
          }
          this.interviewClarificationList.push(
            {
              calendarId: data[i],
              clarificationData: this.interviewClarificationdata,
              createdByName: this.interviewClarificationdata[0].createdByName,
              clarificationCount: this.interviewClarificationdata.length % 2 == 0 ? false : true
            }
          )
        }
        //console.log(this.interviewClarificationList);
      }
      else {
        this.interClarifications = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  sendInterviewClarification(calendarId) {
    var remarks = jQuery("#calendarRemarks" + calendarId).val();
    if (remarks == undefined || remarks == "") {
      jQuery("#calendarRemarks" + calendarId).addClass("is-invalid");
    }
    else {
      jQuery("#calendarRemarks" + calendarId).removeClass("is-invalid");
      this.calendarActionFormData.AcceptStatus = 2;
      this.calendarActionFormData.CalendarIds = calendarId.toString();
      this.calendarActionFormData.Remarks = remarks;
      this.calendarActionFormData.CreatedBy = this.createdBy;
      //console.log(this.calendarActionFormData);
      this.SpinnerService.show();
      this.calendarActionService.updateInterviewCalendarStatus(this.calendarActionFormData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
            this.SpinnerService.hide();
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.SpinnerService.hide();
            this.cInterviewClarificationModal.nativeElement.click();
            this.getFilterCandidateList();
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
  }

  getAllSelectionGuideInterview() {
    this.selectionGuideInterview = [];
    this.searchSelectionGuideInterview.requisitionDetailId = this.requisitionDetailId;
    this.searchSelectionGuideInterview.hiringStatusId = this.currentHiringStatus;
    this.selectionGuideService.getSelectionGuideInterview(this.searchSelectionGuideInterview).subscribe((result) => {
      if (result) {
        this.selectionGuideInterview = result;
        //console.log("Selection Guide", this.selectionGuideInterview);
      }
      else {
        this.selectionGuideInterview = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  onInterviewTravelChange() {
    setTimeout(() => {
      jQuery(".ddltravelmode").selectpicker("refresh");
    });
  }


  changeInterviewEmailTemplate() {
    // debugger;
    var venueaddress = this.interviewVenues.filter(x => x.venueId == this.selectedInterviewVenueId)[0].venueAddress;
    //var templatedescription = this.interviewemailTemplates.filter(x => x.templateId == this.selectedInterviewEmailTemplateId)[0].templateDescription;
    //templatedescription = templatedescription.replace("@@DateTime", this.interviewScheduleFormData.FromDate + " - " + this.interviewScheduleFormData.ToDate);
    //templatedescription = templatedescription.replace("@@VenueAddress", venueaddress);
    //templatedescription = templatedescription.replace("@@PositionDepartment", this.requisitionPositionName + ", " + this.requisitionDepartmentName);
    //templatedescription = templatedescription.replace("@@Function", this.requisitionFunctionName);
    //templatedescription = templatedescription.replace("@@InterviewLink", this.interviewLink);

    if (this.interviewemailTemplates.length > 0) {
      // this.templatedescription = this.interviewemailTemplates[0].templateDescription;
      for (let i = 0; i < this.interviewemailTemplates.length; i++) {
        if (this.interviewemailTemplates[i].templateId == this.selectedInterviewEmailTemplateId) {
          this.templatedescription = this.interviewemailTemplates[i].templateDescription;
        }
      }

    }
    this.VanueAddress = this.interviewVenues.filter(x => x.venueId == this.selectedInterviewVenueId)[0].venueAddress;
    this.VenueName = this.interviewVenues.filter(x => x.venueId == this.selectedInterviewVenueId)[0].venueName;
    this.DateTime = this.interviewScheduleFormData.FromDate + " - " + this.interviewScheduleFormData.ToDate;
    if (this.isInterviewTravel) {
      //  console.log(this.interviewScheduleFormData.TravelModes);
      if (this.interviewScheduleFormData.TravelModes != null) {
        var travelModes = "";
        var data = this.interviewScheduleFormData.TravelModes.split(",");
        for (var i = 0; i < data.length; i++) {
          if (data[i] == "1") {
            travelModes += ", Bus ";
          }
          if (data[i] == "2") {
            travelModes += ", Taxi/Cab";
          }
          if (data[i] == "3") {
            travelModes += ", Train";
          }
          if (data[i] == "4") {
            travelModes += ", Air";
          }

        }

        this.travelModeDesc = travelModes.substring(2, 1000);
      }

    }

    this.interviewEmailTemplateDescription = this.templatedescription
    if (this.interviewEmailTemplateDescription != undefined) {
      if (this.DateTime != undefined) {
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@fromDate", this.DateTime);
      }
      else {
        this.DateTime = '';
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@fromDate", this.DateTime);
      }
      if (this.VenueName != undefined) {
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@VenueName", this.VenueName);
      }
      else {
        this.VenueName = '';
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@VenueName", this.VenueName);
      }
      if (this.VanueAddress != undefined) {
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@VanueAddress", this.VanueAddress);
      }
      else {
        this.VanueAddress = '';
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@VanueAddress", this.VanueAddress);
      }
      if (this.requisitionDepartmentName != undefined) {
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@Department", this.requisitionDepartmentName);
      }
      else {
        this.requisitionDepartmentName = '';
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@Department", this.requisitionDepartmentName);
      }
      if (this.requisitionPositionName != undefined) {
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@Position", this.requisitionPositionName);
      }
      else {
        this.requisitionPositionName = '';
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@Position", this.requisitionPositionName);
      }
      if (this.requisitionFunctionName != undefined) {
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@Function", this.requisitionFunctionName);
      }
      else {
        this.requisitionFunctionName = '';
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@Function", this.requisitionFunctionName);
      }
      if (this.interviewLink != undefined) {
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@InterviewLink", this.interviewLink);
      }
      else {
        this.interviewLink = '';
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@InterviewLink", this.interviewLink);
      }
      if (this.testContactName != undefined) {
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@ContactName", this.testContactName);
      }
      else {
        this.testContactName = '';
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@ContactName", this.testContactName);
      }
      if (this.testContactNo != undefined) {
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@ContactNo", this.testContactNo);
      }
      else {
        this.testContactNo = '';
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@ContactNo", this.testContactNo);
      }
      if (this.interviewAccomodationDetails != undefined) {
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@InterviewAccomodationDetails", this.interviewAccomodationDetails);
      }
      else {
        this.interviewAccomodationDetails = '';
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@InterviewAccomodationDetails", this.interviewAccomodationDetails);
      }
      if (this.travelModeDesc != undefined) {
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@IsTravel", this.travelModeDesc); //not done
      }
      else {
        this.travelModeDesc = '';
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@IsTravel", this.travelModeDesc); //not done
      }
      if (this.travelModeDesc != undefined) {
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@TravelMode", this.travelModeDesc);
      }
      else {
        this.travelModeDesc = '';
        this.interviewEmailTemplateDescription = this.interviewEmailTemplateDescription.replace("@~@TravelMode", this.travelModeDesc);
      }
    }
    setTimeout(() => {
      jQuery(".cke_wysiwyg_div").html("");
      jQuery(".cke_wysiwyg_div").html(this.interviewEmailTemplateDescription);
    });
  }



  rescheduleTest(candidateId, emailId) {
    this.EmailId = emailId;
    this.checkTestLink = "";
    this.checkTestFromDate = "";
    this.checkTestToDate = "";
    this.checkTestContactNo = "";
    this.checkTestContactName = "";
    this.checkTestVenue = "";
    this.checkTestEmailTemplate = "";
    this.searchTestScheduleDetail.candidateId = candidateId;
    this.searchTestScheduleDetail.requisitionDetailId = this.requisitionDetailId;
    //console.log(this.searchTestScheduleDetail);
    this.testScheduleService.getTestScheduleDetail(this.searchTestScheduleDetail).subscribe((result) => {
      if (result) {
        this.testScheduleDetail = result;
        this.rescheduleCandidateId = "" + candidateId;
        this.testTypeId = this.testScheduleDetail.testTypeId;
        this.testLink = this.testScheduleDetail.testLink;
        this.selectedTestVenueId = this.testScheduleDetail.venueId;
        this.testContactNo = this.testScheduleDetail.contactNo;
        this.testContactName = this.testScheduleDetail.contactPersonName;
        this.testEmailTemplateDescription = "";
        this.isTestTravel = this.testScheduleDetail.isTravel;
        this.selectedTestEmailTemplateId = this.testScheduleDetail.emailTemplateId;
        this.testScheduleFormData.TestFromDate = this.testScheduleDetail.fromDate;
        this.testScheduleFormData.TestToDate = this.testScheduleDetail.toDate;
        this.testScheduleFormData.TestVenueId = this.selectedTestVenueId;
        this.testScheduleFormData.TestContactName = this.testContactName;
        this.testScheduleFormData.TestContactNo = this.testContactNo;
        if (this.testTypeId == 1) {
          document.getElementById("radio1").click();
          this.isOnlineTest = false;
        }
        else {
          document.getElementById("radio1").click();
          this.isOnlineTest = true;
        }
        setTimeout(() => {
          jQuery("#fromdatetimepik").data("DateTimePicker").date(this.testScheduleDetail.fromDate);
          jQuery("#todatetimepik").data("DateTimePicker").date(this.testScheduleDetail.toDate);
        });
        this.changeTestEmailTemplate();
        this.stepCount = 1;
      }
      else {
        this.testScheduleDetail = null;
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
      this.loadDateTimePicker();
    });
  }

  reScheduletheInterview() {
    this.rescheduleInterview(this.candidiateIdCb, this.hiringStatusIdCb, this.emailIdCb);
  }
  rescheduleInterview(candidateId, hiringStatusId, emailId) {
    this.currentHiringStatus = hiringStatusId;
    this.EmailId = emailId;
    this.getAllSelectionGuideInterview();
    this.checkInterviewFromDate = "";
    this.checkInterviewToDate = "";
    this.checkInterviewLink = "";
    this.checkAccomodationDetails = "";
    this.searchInterviewScheduleDetail.candidateId = candidateId;
    this.searchInterviewScheduleDetail.requisitionDetailId = this.requisitionDetailId;
    this.interviewScheduleService.getInterviewScheduleDetail(this.searchInterviewScheduleDetail).subscribe((result) => {
      if (result) {
        this.interviewScheduleDetail = result;
        this.rescheduleCandidateId = "" + candidateId;
        this.interviewTypeId = this.interviewScheduleDetail.interviewTypeId;
        this.interviewLink = this.interviewScheduleDetail.interviewLink;
        this.selectedInterviewVenueId = this.interviewScheduleDetail.venueId;
        this.selectedInterviewId = this.interviewScheduleDetail.interviewId;
        this.selectedInterViewRoom = this.interviewScheduleDetail.interviewRoomId;
        this.interviewEmailTemplateDescription = "";
        this.isInterviewTravel = this.interviewScheduleDetail.isTravel;
        this.selectedInterviewEmailTemplateId = this.interviewScheduleDetail.emailTemplateId;
        this.interviewScheduleFormData.FromDate = this.interviewScheduleDetail.fromDate;
        this.interviewScheduleFormData.ToDate = this.interviewScheduleDetail.toDate;
        this.isInterviewAccomodation = this.interviewScheduleDetail.isAccomodation;
        this.interviewAccomodationDetails = this.interviewScheduleDetail.accomodationDetails;
        this.isFormAnexture = this.interviewScheduleDetail.isFormAnexture;
        var hruserid = this.interviewScheduleDetail.hrAutoUserIds.split(",");
        var paneluserid = this.interviewScheduleDetail.interviewerAutoUserIds.split(",");
        var travelmodes = this.interviewScheduleDetail.travelModes.split(",");

        this.selectedSlot = this.interviewScheduleDetail.interviewSlot;
        if (this.interviewTypeId == 1) {
          document.getElementById("interviewradio1").click();
          this.isOnlineTest = false;
        }
        else {
          document.getElementById("interviewradio2").click();
          this.isOnlineTest = true;
        }

        setTimeout(() => {
          jQuery(".ddlinterviewhrpanel").selectpicker("val", hruserid);
        });

        setTimeout(() => {
          jQuery(".ddlinterviewfunctionpanel").selectpicker("val", paneluserid);
        });

        setTimeout(() => {
          jQuery(".ddltravelmode").selectpicker("val", travelmodes);
        });

        this.loadDateTimePicker();
        setTimeout(() => {
          jQuery("#ifromdatetimepik").data("DateTimePicker").date(this.interviewScheduleDetail.fromDate);
          jQuery("#itodatetimepik").data("DateTimePicker").date(this.interviewScheduleDetail.toDate);
        });
        this.changeInterviewEmailTemplate();
        this.stepCount = 1;
      }
      else {
        this.interviewScheduleDetail = null;
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
      this.loadDateTimePicker();
    });
  }

  gotoInterviewAssessment(candidateid) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "rmviewassessment");
    this.persistance.set('candidateId', candidateid);
    this._route.navigate(['/app/interview-assessment/view']);
  }
  gotoInterviewHRFeedback(candidateid) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "rmviewhrfeedback");
    this.persistance.set('candidateId', candidateid);
    this._route.navigate(['/app/hr-interview-feedback/view']);
  }

  gotoApplicationForm(candidateId) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "rmcandidatelist");
    this.persistance.set('candidateId', candidateId);
    this.persistance.set('paramid', this.requisitionDetailId);
    this._route.navigate(['/app/candidate-application/view']);
  }

  openDocumentCollectionModal() {
    // var templatedescription = this.documentCollectionEmailTemplates.filter(x => x.templateId == 6)[0].templateDescription;
    var templatedescription = "";
    var searchObjDocumentCollectionEmailTemplate = {
      templateTypeId: 40,
      templateId: null,
      isActive: true
    }
    var documentCollectionTemplateList = [];
    this.documentCollectionEmailTemplates = [];
    this.emailtemplateService.getAllEmailTemplate(searchObjDocumentCollectionEmailTemplate).subscribe((result) => {
      if (result) {
        documentCollectionTemplateList = result;
        templatedescription = documentCollectionTemplateList[0].templateDescription;

        setTimeout(() => {
          jQuery(".cke_wysiwyg_div").html("");
          jQuery(".cke_wysiwyg_div").html(templatedescription);
        });
        this.documentCollectionEmailTemplateDescription = templatedescription

      }
      else {
        this.documentCollectionEmailTemplates = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });


  }

  SendDocumentCollectionCandidate() {
    this.SpinnerService.show();
    this.documentCollectionFormData.offerDocumentCollectionId = 0;
    this.documentCollectionFormData.candidateId = this.candidateIds;
    this.documentCollectionFormData.requsitaionDetailsId = this.requisitionDetailId;
    this.documentCollectionFormData.emailTemplateId = 6;
    this.documentCollectionFormData.emailTemplate = this.documentCollectionEmailTemplateDescription;
    this.candidateOfferDocumentService.addCandidateOfferDocument(this.documentCollectionFormData).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.cDocumentCollectionModal.nativeElement.click();
          this.btnDocumentCollectionVisible = false;
          this.loadDataTable();
          this.getCandidateList();

          //this.getFilterCandidateList();
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

  gotoViewDocuments(candidateId) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "rmcandidatelist");
    this.persistance.set('nextpagename', "candidatedocuments");
    this.persistance.set('candidateId', candidateId);
    this.persistance.set('paramid', this.requisitionDetailId);
    this._route.navigate(['/app/my-action/all-positions/candidate/view-documents']);
  }

  gotoSalaryFitment(candidateId) {
    jQuery(".custom-menu").hide();
    // this.persistance.set('pagename', "rmcandidatelist");
    // this.persistance.set('nextpagename', "candidatedocuments");
    // this.persistance.set('candidateId', candidateId);
    // this.persistance.set('paramid', this.requisitionDetailId);
    this.persistance.set('nextpagename', "candidatedocuments");
    this.persistance.set('pagename', "dummyrmcandidatelist");
    this.persistance.set("candidateId", candidateId);
    this.persistance.set("paramid", this.requisitionDetailId);
    this.persistance.set("hrStatus", this.persistance.get('hrStatus'));
    this.persistance.set("functionId", this.persistance.get('functionId'));
    this._route.navigate(['/app/my-action/all-positions/candidate/salary-fitment']);
    //this._route.navigate(['/my-action/all-positions/candidate/salary-fitment']);
  }

  // gotoManagementApproval(candidateId) {
  //   this.candidateIdNames = [];
  //   this.candidateIdNames.push({
  //     candidateId: this.candidates.filter(x => x.candidateId == candidateId)[0].candidateId,
  //     candidateName: this.candidates.filter(x => x.candidateId == candidateId)[0].fullName
  //   })
  //   jQuery(".custom-menu").hide();
  //   this.persistance.set('pagename', "rmcandidatelist");
  //   this.persistance.set('nextpagename', "managementapproval");
  //   this.persistance.set('candidateId', this.candidateIdNames);
  //   this.persistance.set('paramid', this.requisitionDetailId);
  //   this._route.navigate(['/my-action/all-positions/candidate/management-approval']);
  // }
  gotoManagementApprovalView(candidateId) {
    this.candidateIdNames = [];
    this.candidateIdNames.push({
      candidateId: this.candidates.filter(x => x.candidateId == candidateId)[0].candidateId,
      candidateName: this.candidates.filter(x => x.candidateId == candidateId)[0].fullName
    })
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "rmcandidatelist");
    this.persistance.set('nextpagename', "managementapprovalview");
    this.persistance.set('candidateId', this.candidateIdNames);
    this.persistance.set('MailId', this.OnboardingMailIds);
    this.persistance.set('paramid', this.requisitionDetailId);
    this._route.navigate(['/app/my-action/all-positions/candidate/management-approvalview']);
  }

  gotoGenerateManagementApproval() {
    this.candidateIdNames = [];
    this.OnboardingMailIds = [];
    var splittedCandidates = this.candidateIds.split(",");
    for (var i = 0; i < this.candidates.length; i++) {
      for (var j = 0; j < splittedCandidates.length; j++) {
        if (this.candidates[i].candidateId.toString() == splittedCandidates[j].toString()) {
          this.candidateIdNames.push({
            candidateId: this.candidates[i].candidateId,
            candidateName: this.candidates[i].fullName
          })
          this.OnboardingMailIds.push({
            OMMailIds: this.candidates[i].omMailId,
            OHMailIds: this.candidates[i].ohMailId,
            OCMailIds: this.candidates[i].ocMailId,
            StatusFlag: this.candidates[i].statusFlag
          })
        }
      }
    }
    this.persistance.set('pagename', "rmcandidatelist");
    this.persistance.set('nextpagename', "managementapproval");
    this.persistance.set('candidateId', this.candidateIdNames);
    this.persistance.set('MailId', this.OnboardingMailIds);
    this.persistance.set('paramid', this.requisitionDetailId);
    this._route.navigate(['/app/my-action/all-positions/candidate/management-approval']);
  }

  onFileChange(event) {
    const files = event.target.files;
    this.invalidFileName = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName = true;
      }
    })
    if (files.length === 0) {
      this.managementFileImport.nativeElement.innerText = "Choose file";
      return;
    }
    if (this.invalidFileName) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.managementFileImport.nativeElement.innerText = "Choose file";
      this.managementfileToUpload = null;
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      this.managementFileImport.nativeElement.innerText = "Choose file";
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("File should be less than 2MB!", "Error");
      this.managementFileImport.nativeElement.innerText = "Choose file";
      this.managementfileToUpload = null;
    } else {
      this.managementFileImport.nativeElement.innerText = files[0].name;
      this.managementfileToUpload = files.item(0);
    }
  }

  UploadManagementApproval() {
    if (this.managementfileToUpload == null) {
      this.notificationService.showError("Please attach the management approval document !!", "Error");
    }
    else {
      this.SpinnerService.show();
      const formData = new FormData();
      formData.append("CreatedBy", this.createdBy.toString());
      formData.append("RequisitionDetailId", this.requisitionDetailId.toString());
      formData.append("CandidateIds", this.candidateIds.toString());
      formData.append("ManagementApprovalFile", this.managementfileToUpload);
      this.managementApprovalService.uploadManagementApproval(formData).subscribe((result) => {
        if (result.status == 0) {
          this.notificationService.showError(result.msg, "Error");
          this.SpinnerService.hide();
        }
        else {
          this.getCandidateList();   // Added by Anif on 04-02-2023
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.managementfileToUpload = null;
          this.managementFileImport.nativeElement.innerText = "Choose file";
          this.closeManagementApprovalModal.nativeElement.click();
          this.btnUploadManagementApprovalVisible = false;
          this.candidateIds = "";
          //this.SpinnerService.hide();
          //this.getFilterCandidateList();  // Removed by Anif on 04-02-2023
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
        this.notificationService.showError("Something went wrong", "Error");
      });
    }
  }

  gotoSendOfferLetter(value) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "dummycandidatelist");
    this.persistance.set('nextpagename', "sendofferletter");
    this.persistance.set('candidateId', value.candidateId);
    this.persistance.set('paramid', this.requisitionDetailId);
    this.persistance.set('candidatename', value.fullName);
    this.persistance.set('candidateno', value.candidateNo);
    this._route.navigate(['/app/my-action/all-positions/candidate/send-offer-letter']);
  }

  getAllOnboardingmanagerList() {
    this.onBoardingManagerList = [];
    if (this.requisitionVerticalId == 1) {
      this.searchRoleUser.roleId = 21
    }
    else if (this.requisitionVerticalId == 2) {
      this.searchRoleUser.roleId = 22
    }
    else if (this.requisitionVerticalId == 3) {
      this.searchRoleUser.roleId = 23
    }
    //this.candidateService.getAllOnboardingManager(this.searchOnboardingManager).subscribe((result) => {
    this.commonService.getRoleWiseUser(this.searchRoleUser).subscribe((result) => {
      if (result) {
        this.onBoardingManagerList = result;
      }
      else {
        this.onBoardingManagerList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  // onCheckRowWise(eve, data) {
  //   data.checked = eve.target.checked;
  // }

  // showJoiningConfirmationButton() {
  //   var checkedObj = this.candidates.find(e => e.checked == true);
  //   return checkedObj == null ? false : true;
  // }

  // showSendToOnBoarding() {
  //   var checkedObj = this.candidates.find(e => e.checked == true);
  //   return checkedObj == null ? false : true;
  // }

  onClickJoiningConfirmation() {
    this.getCandidateJoningDate(this.candidateIds);

  }
  onJoiningConfirmation(data) {
    this.getCandidateJoningDate(data.candidateId);
    setTimeout(() => {
      this.loadDatePicker();
    });
  }
  getCandidateJoningDate(candidateId) {
    let joiningDateObj = {
      candidateId: candidateId.toString()
    }
    this.allJoiningDateInformation = [];
    this.corporateService.getJoiningDateDetails(joiningDateObj).subscribe((result) => {
      if (result) {
        this.allJoiningDateInformation = result;

        this.joiningConfirmationCandidateList = [];
        if (this.allJoiningDateInformation.length > 0) {
          this.allJoiningDateInformation.forEach(element => {
            let joiningCandidateObj = {
              CandidateId: element.candidateId,
              CandidateNo: element.candidateNo,
              RequisitionDetailId: element.requisitionDetailId,
              DateofJoining: element.dateofJoining,
              ModeofJoining: element.modeofJoing == 0 ? null : element.modeofJoing,
              PositionCode: element.positionCode,
              Remarks: element.remarks,
              CandidateName: element.candidateFullName
            }
            this.joiningConfirmationCandidateList.push(joiningCandidateObj);
          })
        }

      }
      else {
        this.allJoiningDateInformation = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      // this.loadSelectPicker();
    });
  }

  onSendSingleToOnboarding(data) {

    this.onBoardingSendingType = "S";
    this.onBoardingSingleCandidateId = data.candidateId;
    // this.OnBoardingManager=
  }

  sendAllCheckedToOnboarding() {
    this.onBoardingSendingType = "A";
    this.onBoardingSingleCandidateId = 0;
  }

  onSendToOnboardingTeam() {
    let obj = {
      CandidateId: "",
      OnBoardingManager: 0,
      CreatedBy: 0
    }
    if (this.OnBoardingManager == null) {
      this.notificationService.showError("Please select Onboarding Manager", "Error");
    } else {
      if (this.onBoardingSendingType == "A") {
        obj.CandidateId = this.candidateIds; //All candidate id which are checked;
        obj.OnBoardingManager = Number(this.OnBoardingManager);
        obj.CreatedBy = this.createdBy;
      } else {
        obj.CandidateId = this.onBoardingSingleCandidateId.toString();
        obj.OnBoardingManager = Number(this.OnBoardingManager);
        obj.CreatedBy = this.createdBy;
      }
      this.SpinnerService.show();
      this.candidateService.sendToOnboardingTeam(obj).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getCandidateList();
            this.loadDataTable();
            this.OnBoardingManager = null;
            jQuery("#sendtoOnboardingModal").modal("hide");
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
  }

  getModeOfJoining() {
    this.modeOfJoiningList = [];
    this.candidateService.getAllModeOfJoining(this.searchModeOfJoining).subscribe((result) => {
      if (result) {
        this.modeOfJoiningList = result;
      }
      else {
        this.modeOfJoiningList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }
  onChangeJoiningDate(data) {
    data.DateofJoining = this.dtOfJoining.nativeElement.value;
  }

  onConfirmJoiningDate() {

    let finalSubmitObj = {
      CandidateJoiningDates: [],
      CreatedBy: this.createdBy
    }
    var flag = 0;
    var msg = "";
    this.joiningConfirmationCandidateList.forEach(element => {
      if (element.Remarks == null || element.Remarks == "") {
        flag = 1;
        msg = "Please Enter Remarks for Candidate " + element.CandidateName;
      }
      else {

      }
      if (element.PositionCode == null || element.PositionCode == "") {
        flag = 1;
        msg = "Please Enter Position Code for Candidate " + element.CandidateName;
      }
      else {

      }
      if (element.ModeofJoining == null) {
        flag = 1;
        msg = "Please Select Mode of Joining for Candidate " + element.CandidateName;
      }
      else {

      }
      if (element.DateofJoining == "" || element.DateofJoining == null) {
        flag = 1;
        msg = "Please Select Joining Date for Candidate " + element.CandidateName;
      }
      else {

      }
    })
    if (flag == 0) {
      this.joiningConfirmationCandidateList.forEach(element => {
        let joiningDateObj = {
          CandidateId: element.CandidateId,
          RequisitionDetailId: element.RequisitionDetailId,
          DateofJoining: element.DateofJoining,
          ModeofJoining: element.ModeofJoining.toString(),
          PositionCode: element.PositionCode,
          Remarks: element.Remarks
        }
        finalSubmitObj.CandidateJoiningDates.push(joiningDateObj);
      })
      this.SpinnerService.show();
      this.candidateService.saveJoiningConfirmationDate(finalSubmitObj).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getCandidateList();
            this.loadDataTable();
            jQuery("#joiningConfirmationModal").modal("hide");
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
  onClickJoiningCheckList(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "rmrequisitionlist");
    this.persistance.set('paramid', this.requisitionDetailId);
    this._route.navigate(['/app/rm-joining-check-list'], { queryParams: { CandidateId: data.candidateId } });
  }

  gotoInterviewFeedback(candidateId) {
    jQuery(".custom-menu").hide();
    this.persistance.set('paramid1', 0);
    this.persistance.set('paramid2', candidateId);
    this.persistance.set('paramid3', 0);
    this.persistance.set('pagename', "rmviewcandidatefeedback")
    this._route.navigate(['/app/view-interview-feedback']);
  }
  onClickRejectStatus(data) {
    let obj = {
      CandidateId: data.candidateId,
      RequisitionDetailId: this.requisitionDetailId,
      HiringStatusId: data.hiringStatusId
    }
    this.candidateService.getCandidateHiringRemarks(obj).subscribe((result) => {
      if (result) {
        this.rejectHiringRemarks = result[0];
        this.SpinnerService.hide();
        jQuery("#rejectRemarks").modal('show');
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
  // Added by anif on 04-07-2022
  onClickOfferRejectStatus(data) {
    let obj = {
      CandidateId: data.candidateId,
      RequisitionDetailId: this.requisitionDetailId,
    }
    this.candidateService.getCandidateOfferRejectRemarks(obj).subscribe((result) => {
      if (result) {
        this.rejectOfferRemarks = result[0];
        this.SpinnerService.hide();
        jQuery("#rejectOfferRemarks").modal('show');
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
  ngOnDestroy() {
    jQuery(".custom-menu").hide();
  }
  // Release And call back option started
  openModalPopupreleaseCandidate(statusId, candidateId, tabName) {
    this.actionName = "Release";
    this.releaseCandidateId = candidateId;
    // this.tabName == tabName;
  }
  releaseCandidate() {
    var formdata = {
      candidateIds: this.releaseCandidateId.toString(),
      requisitionDetailId: this.requisitionDetailId,
      hiringStatusId: 31,
      createdBy: this.createdBy,
      remarks: this.releaseremarks
    }
    this.SpinnerService.show();
    this.requisitionService.updateRequisitionCandidateRejectDeclineCallBack(formdata).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
          this.SpinnerService.hide();
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          this.SpinnerService.hide();
          this.getCandidateList();
          this.releaseremarks = "";
          jQuery("#releaseModal").modal("hide");
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

  onChangeCandidateStage(stage: any) {
    if (stage == "I") {
      this.objCallbackHistoryInsert.isFromBeginning = true;
    } else {
      this.objCallbackHistoryInsert.isFromBeginning = false;
    }

  }

  openModalPopupCallBack(data) {
    this.actionName = "Callback";
    this.objCallbackHistoryInsert.callBackHistoryId = 0;
    this.objCallbackHistoryInsert.requisitionId = this.persistance.get("requisitionidforcallback");
    this.objCallbackHistoryInsert.requisitionDetailId = this.persistance.get('paramid');
    this.objCallbackHistoryInsert.verticalId = this.persistance.get("verticalidforcallback");
    this.objCallbackHistoryInsert.candidateId = data.candidateId;
    this.objCallbackHistoryInsert.currentHiringStatusId = 59;
    // this.objCallbackHistoryInsert.callBackRemarks = this.callbackremarks;
    this.objCallbackHistoryInsert.createdBy = this.createdBy;
    // this.callbackCandidateId = candidateId;
    //this.tabName == tabName;

  }

  callBackCandidate() {
    var flag = 0;
    var msg = "";
    // if (this.objCallbackHistoryInsert.isFromBeginning == undefined) {
    //   flag = 1;
    //   msg = "Please select candidate recall stage";
    // }
    // else {

    // }
    if (this.callbackremarks == "") {
      flag = 1;
      msg = "Please enter remarks";
    }
    else {

    }
    if (flag == 0) {
      this.SpinnerService.show();
      this.objCallbackHistoryInsert.callBackRemarks = this.callbackremarks;
      this.objCallbackHistoryInsert.isFromBeginning = false;;
      this.requisitionService.insertCallbackRequest(this.objCallbackHistoryInsert).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
            this.SpinnerService.hide();
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.SpinnerService.hide();
            this.getCandidateList();
            this.callbackremarks = "";
            this.objCallbackHistoryInsert = new CallbackHistoryInsert();
            jQuery("#callBackModal").modal("hide");
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
  onChangeRequisitionType() {
    let searchdata = {
      RequisitionDetailId: null,
      IsDummy: Number(this.requisitionType)
    }
    this.CampusRequisitionService.getRequisitionListForRequisitionMapping(searchdata).subscribe((result) => {
      if (result) {
        this.campusrequisitionLists = result;
        // console.log("Requsition List", this.campusrequisitionLists);

      }
      else {
        this.campusrequisitionLists = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });

  }
  mapReqCandiate: any;
  openMapReq(data) {
    this.mapReqCandiate = Number(data.candidateId);
  }
  closeRequisitionModal() {
    jQuery("#requisitionModal").modal('toggle');
    this.mapReqCandiate = 0;
    this.requisitionType = "";
    this.selectedRequisitionDetailId = "";
  }
  selectedRequisitionDetailId: any;
  onMapRequisition() {
    var value = {
      CandidateId: Number(this.mapReqCandiate),
      RequistionType: Number(this.requisitionType),
      SelectedRequitionDetails: Number(this.selectedRequisitionDetailId),
      CreatedBy: Number(this.createdBy)
    }

    this.CampusRequisitionService.InsertUpdateMapRequistion(value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notificationService.showSuccess(response.msg, "Success");
        this.getCandidateList();
        this.SpinnerService.hide();
        this.closeRequisitionModal()
      }
      else {
        this.notificationService.showError(response.msg, "Error");
        this.SpinnerService.hide();
      }
    }, error => {
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
      jQuery("#myModal1").modal('toggle');
    })
  }
  onClickRequisitionStatus(record: any) {
    debugger;
    this.requisitionArrayPopup = [];
    var rec = {
      CandidateId: record.candidateId
    }
    this.requisitionService.GetCandidatetaggedRequisitions(rec).subscribe((result) => {
      this.requisitionArrayPopup = result

    })
  }
  gotoVerifyDocuments(candidateId, requisitionDetailId) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "DummyCampuscandidatemanagement");
    this.persistance.set('nextpagename', "campuscandidatedocuments");
    this.persistance.set('candidateId', candidateId);
    // this.persistance.set('paramid', this.requisitionDetailId);
    this.persistance.set('paramid', this.requisitionDetailId);
    this._route.navigate(['app/CampusViewDocumentComponent']);
  }
}

class CallbackHistoryInsert {
  callBackHistoryId: number;
  requisitionId: number;
  requisitionDetailId: number;
  candidateId: number;
  verticalId: number;
  currentHiringStatusId: number;
  approvalStatusId: number;
  isFromBeginning: boolean = false;;
  callBackRemarks: string;
  createdBy: number;
}
