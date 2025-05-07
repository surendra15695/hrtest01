import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ICandidateDetailData, IModeOfJoining, ISearchModeOfJoining } from '../../../interfaces/preselection/candidate.interface';
import { IVenue, ISearchVenue } from '../../../interfaces/common/venue.interface';
import { IDropDown, IGenders } from '../../../interfaces/common/common.interface';
import { ICandidateProfile, ISearchCandidateProfile } from '../../../interfaces/candidate/candidateprofile.interface';
import { IEmailTemplate, ISearchEmailTemplate, } from '../../../interfaces/common/emailtemplate.interface';
import { ICampusTestScheduleFormDataForUpdate, TCampusTestScheduleDetail, ISearchCampusTestScheduleDetail, ICampusInterviewScheduleFormData, ICampusTalkScheduleFormData, ICampusForInterviewScheduleFormData, ICampusTalkScheduleFormDataNew, TCampusTalkScheduleDetail, ISearchCampusTalkScheduleDetail, ISearchCampusCandidateNew } from '../../../interfaces/campus/campusrequisition.interface';
import { IInterviewScheduleFormData, ISearchInterviewScheduleDetail, IInterviewScheduleDetail, IInterviewScheduleDetailUpdate, IInterviewScheduleDetailUpdateNew } from '../../../interfaces/selection/interviewschedule.interface';
import { IInterviewPanelMember, ISearchInterviewPanelMember, IInterviewRoom, ISearchInterviewRoom } from '../../../interfaces/common/interview.interface';
import { ISearchInterviewClarificationList, IInterviewClarificationList, IInterviewClarificationListData, IInterviewClarificationData, IInterviewCalendarActionFormData } from '../../../interfaces/selection/interviewcalendaraction.interface';
import { IDocumentCollectionFormData } from '../../../interfaces/offer/candidatedocument.interface';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { CandidateService } from '../../../services/preselection/candidate/candidate.service';

import { IRequisitionCandidateHiringStatusFormData } from '../../../interfaces/preselection/requisition.interface';
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
import { ICampusCandidateList, ISearchCampusCandidate, ICampusCandidateHiringStatusFormData } from '../../../interfaces/campus/campusrequisition.interface'
import { CampusrequisitionService } from '../../../services/campus/campusrequisition/campusrequisition.service';
import { IDomain, ISearchDomain } from '../../../interfaces/common/domain.interface';
import { ILanguage, ISearchLanguage } from '../../../interfaces/common/language.interface';
import { IVerticalFunction, ISearchFunction } from '../../../interfaces/common/function.interface';
import { FunctionService } from '../../../services/common/function/function.service';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { element } from 'protractor';
import { IOnboardingManager, ISearchonboardingManager } from 'src/app/interfaces/candidate/candidate.interface';
import { CorporateallocationService } from 'src/app/services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { IfStmt } from '@angular/compiler';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { environment } from 'src/environments/environment';
import { Observable, Observer } from 'rxjs';
import { VerticalService } from 'src/app/services/common/vertical/vertical.service';
import { CampuscommonService } from 'src/app/services/campus/common/campuscommon.service';
import { IQulificationUniversityBoard, ISearchQulificationUniversityBoard } from 'src/app/interfaces/common/university.interface';

declare var jQuery: any;
declare var moment: any;
declare var html2pdf: any;


@Component({
  selector: 'app-campustalentpool',
  templateUrl: './campustalentpool.component.html',
  styleUrls: ['./campustalentpool.component.css']
})
export class CampustalentpoolComponent implements OnInit {
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
  @ViewChild('fTalkDateTime', { static: false }) fTalkDate: ElementRef;
  @ViewChild('tTalkDateTime', { static: false }) tTalkDate: ElementRef;
  @ViewChild('edob', { static: false }) dedob: ElementRef;
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
  CandidateName: any;
  emailIdFront: any;
  btnRescheduleInterviewVisible: boolean = false;
  filterForm: FormGroup;
  scheduleForm: FormGroup;
  btnVisible: boolean = false;
  topBtnVisible: boolean = false;
  //candidates: ICampusCandidateList[] = [];
  candidates: any[] = [];
  candidateIds: string = "";
  searchCandidate: ISearchCampusCandidateNew = {
    CandidateNo: "",
    CandidateName: "",
    HiringStatusId: 0,
    GenderIds: "",
    FromAge: 0,
    ToAge: 0,
    AadharNo: "",
    ContactNo: "",
    EmailId: "",
    MotherTongueIds: "",
    NativeStateIds: null,
    PresentStateIds: null,
    FatherOccupation: null,
    MotherOccupation: null,
    InstitutionIds: "",
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
    CampusLinkId: 0,
    FromDate: "",
    ToDate: "",
    FromHeight: 0,
    ToHeight: 0,
    FromWeight: 0,
    ToWeight: 0,
    Disability: null,
    Health: null,
    EyeSightCorrected: null,
    Siblings: null,
    Commitment: null,
    WorkingShift: null,
    JobTypePriyority: null,
    CriticalFactor: null,
    ExtraCurricularActivity: null,
    LanguageIds: null,
    FromExperience: 0,
    ToExperience: 0,
    CompletionYears: "",
    QualificationTypeIds: "",
    CurrentEmployer: "",
    Designation: "",
    RelativeStatus: "",
    PreviousApplied: 0
  }
  genders: IGenders[] = [];
  campusLinkId: number;
  createdBy: number;
  statusId: number;
  formData: ICampusCandidateHiringStatusFormData = {
    candidateIds: "",
    campusLinkId: 0,
    createdBy: 0,
    remarks: "",
    hiringStatusId: 1
  };
  remarks: string;
  actionName: string;
  candidateId: number;
  venueId: number;
  searchVenue: ISearchVenue = {
    venueId: null,
    isActive: true
  }
  //selectedVenue: IVenue;
  venues: IVenue[] = [];

  emailTemplates: IEmailTemplate[] = [];
  searchEmailTemplate: ISearchEmailTemplate = {
    templateTypeId: 52,
    templateId: null,
    isActive: true
  }
  isUniversityMultipleVisible: boolean = false;
  interviewemailTemplates: IEmailTemplate[] = [];
  talkemailTemplates: IEmailTemplate[] = [];
  searchInterviewEmailTemplate: ISearchEmailTemplate = {
    templateTypeId: 54,
    templateId: null,
    isActive: true
  }
  searchCandidateProfile: ISearchCandidateProfile = {
    candidateId: null,
    candidateProfileId: null,
    requisitionDetailId: null
  }
  documentCollectionEmailTemplates: IEmailTemplate[] = [];
  searchDocumentCollectionEmailTemplate: ISearchEmailTemplate = {
    templateTypeId: 4,
    templateId: null,
    isActive: true
  }
  objModelForCampusdob: string;
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
  candiateIdArray: any = [];
  //qualification
  qualifications: IQualification[] = [];
  selectedQualification: IQualification;
  searchQualification: ISearchQualification = {
    qualificationId: null,
    isActive: null
  }
  isVisibleStageGetAssesment: boolean = false;
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

  testmailIds: string = "";
  interviewmailIds: string = "";
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
  btnTalkVisible: boolean = false;
  isOnlineTest: boolean = false;
  campuscandidateId: number;
  testTypeId: number = 0;
  testLink: string;
  testFromDateTime: string;
  testToDateTime: string;
  testVenueName: string = "";
  testVenueAddress: string = "";
  testContactName: string;
  testInstituteEmail: string;
  testContactNo: string;
  selectedTestEmailTemplateId: number;
  testEmailTemplateDescription: string;
  isTestTravel: boolean = false;
  testResults1: any = [];
  familyOccupations: IDropDown[] = [];
  talkTypeId: number = 0;
  talkLink: string;
  talkmailid: string;
  talkFromDateTime: string;
  talkToDateTime: string;
  talkVenueName: string = "";
  talkContactName: string;
  talkContactNo: string;
  selectedTalkEmailTemplateId: number;
  talkEmailTemplateDescription: any;
  isTalkTravel: boolean = false;
  hiringstatus: any[] = []
  testScheduleFormData: ICampusTestScheduleFormDataForUpdate = {
    CampusLinkId: null,
    TestTypeId: null,
    TestLink: null,
    TestFromDate: null,
    TestToDate: null,
    TestVenueName: null,
    TestContactName: null,
    TestInstituteEmail: null,
    TestContactNo: null,
    IsTestTravel: null,
    TravelModes: null,
    TestEmailTemplateId: null,
    TestEmailTemplate: null,
    CandidateIds: null,
    CreatedBy: null,
    EmailId: null,
    //TestVenueId: null,
    TestVenueAddress: null
  };
  talkScheduleFormData: ICampusTalkScheduleFormDataNew = {
    placementScheduleMasterId: 0,
    CampusLinkId: null,
    TalkTypeId: null,
    TalkLink: null,
    TalkFromDate: null,
    TalkToDate: null,
    TalkVenueName: null,
    TalkContactName: null,
    TalkContactNo: null,
    TalkEmailTemplate: null,
    CandidateIds: null,
    CreatedBy: null,
    InstituteEmailId: null,
    EmailId: null
  };
  requisitionLists: IRequisitionList[] = [];
  requisitionPositionName: string;
  requisitionDepartmentName: string;
  requisitionFunctionName: string;
  requisitionVerticalId: number;
  requisitionFunctionId: number;
  objModelForCampus: any = {};
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
  interviewEmailTemplateDescription2: any;
  checkTestLink: string;
  checkTestFromDate: string;
  checkTestToDate: string;
  checkTestContactNo: string;
  checkTestContactName: string;
  checktestInstituteEmail: string;
  checkTestVenue: string;
  checkTestVenueAddress: string;
  checkTestEmailTemplate: string;

  checkTalkFromDate: string;
  checkTalkToDate: string;
  checkTalkLink: string;
  checkTalkContactNo: string;
  checkTalkContactName: string;
  checkTalkVenue: string;
  checkTalkMailId: string;
  checkTalkEmailTemplate: string;

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
  selectedTravelModeTestArray: any[];
  selectedInterViewHR: any;
  selectedInterViewInterview: any;
  selectedSlot: string;
  selectedInterViewFunction: string;
  selectedInterViewRoom: number;
  interviewTypeId: number = 0;
  interviewLink: string;
  interviewFromDateTime: string;
  interviewToDateTime: string;
  selectedInterviewVenueId: number;
  selectedInterviewVenueName: string;
  selectedInterviewVenueAddress: string;
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

  selectionGuideInterview: ISelectionGuideInterview[] = [];
  searchSelectionGuideInterview: ISearchSelectionGuideInterview = {
    requisitionDetailId: null,
    hiringStatusId: null
  }

  interviewScheduleFormData: ICampusForInterviewScheduleFormData = {
    CampusLinkId: null,
    VerticalId: null,
    FunctionId: null,
    InterviewId: null,
    InterviewTypeId: null,
    InterviewLink: null,
    InterviewRoomId: null,
    FromDate: null,
    ToDate: null,
    InterviewSlot: null,
    VenueName: null,
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
    ContactName: null,
    ContactNo: null,
    InterviewVenueAddress: null
  };
  //arg
  rejectremarks: any;
  declineremarks: any;
  btnInterviewVisible: boolean = false;
  testScheduleDetail: TCampusTestScheduleDetail;
  searchTestScheduleDetail: ISearchCampusTestScheduleDetail = {
    candidateId: null,
    requisitionDetailId: null,
    campusLinkId: null
  }
  talkScheduleDetail: TCampusTalkScheduleDetail;
  searchTalkScheduleDetail: ISearchCampusTalkScheduleDetail = {
    candidateId: null,
    campusLinkId: null
  }

  rescheduleCandidateId: string = "";

  searchInterviewScheduleDetail: ISearchInterviewScheduleDetail = {
    candidateId: null,
    requisitionDetailId: null
  }

  interviewScheduleDetail: IInterviewScheduleDetailUpdateNew;

  prevselectedstatus: number = 0;
  currentHiringStatus: number;
  selectAllchckbox: boolean = false;
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
  candidateIdNames: string = "";
  institute: string = "";
  course: string = "";
  stream: string = "";
  btnUploadManagementApprovalVisible: boolean = false;

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
  numberOfDays: any
  isSourceChannelId: number;

  verticals: IVertical[] = [];
  selectedInterviewVerticalId: number;

  functions: IVerticalFunction[] = [];
  selectedInterviewFunctionId: number;
  searchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }

  campusverticals: any[] = [];
  campusfunctions: any[] = [];
  campuslocations: any[] = [];   // A-R-G
  campuspositions: any[] = []; // A-R-G
  mappedList: any[] = [];

  mapListData: any[] = [];
  campusverticalfunctions: any[] = [];
  campusSelectedCandidateId: number;
  selectedCampusVerticalId: number;
  selectedCampusFunctionId: number;
  selectedFunctionwiseRequisition: number;
  selectedCampusLocationId: number; // A-R-G
  selectedCampusPositionId: number; // A-R-G
  campusfunctionLocations: any[] = []; // A-R-G
  campusVerticalpositions: any[] = []; // A-R-G
  selectedInterViewnameId: number;
  testEmailTemplateDescription2: any;
  InterviewVenueName: string;
  NewInstituteName: string;
  selectedCandidateId: string;
  EmailId: string;
  applicationFormData: any;
  fileName: string;
  candidateProfile: ICandidateProfile;

  //Piu start
  CandidateId: number;
  InterviewDetailId: number;
  InterviewFeedbackName: string;
  CreatedBy: number;
  IsEnable: number;
  //Piu end
  interviewNameList: any[] = [];
  campusrequisitionLists: any[] = [];
  selectedRequisitionDetailId: number;
  changeUniverSityNameArray: any[] = [];
  selectedTestVenueId: any;
  selectedTestVenueName: any;
  selectedTestVenueAddress: any;
  requisitionDetailId: number;
  ContactNo: string;
  ContactName: string;
  btnpreplacementVisible: boolean = false;
  btnReScheduleTestVisible: boolean = false;
  btnreshedulepreplacementVisible: boolean = false;
  declaineCandidateId: any;
  prevplacement: number = 0;
  btncancelpreplacementVisible: boolean = false;
  btncancelInterview: boolean = false;
  btnCancelTestVisible: boolean = false;
  talkheader: string;
  testheader: string;
  btnreject: boolean = false
  takeactioncandidateId: any;
  editapplicationformcandidateid: any;
  Registrationremarks: any;
  Applicationremarks: any
  canNo: any;
  canemail: any;
  canName: any;
  checkflag: any;
  campusfuncwisereq: any = [];
  academicUniversity: IQulificationUniversityBoard[];
  searchUniversity: ISearchQulificationUniversityBoard = {
    qulificationUniversityBoardId: null,
    isActive: null
  }
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private _activeRoute: ActivatedRoute,
    private candidateService: CandidateService,
    private requisitionService: RequisitionService,
    private testScheduleService: TestscheduleService,
    private venueService: VenueService,
    private verticalService: VerticalService,
    private emailtemplateService: EmailtemplateService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
    private campusCommonService: CampuscommonService,
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
    private managementApprovalService: ManagementapprovalService,
    private campusRequisitionService: CampusrequisitionService,
    private functionService: FunctionService,
    private excelService: ExcelService
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    if (this.persistance.get('pagename') != null) {
      if (this.persistance.get('pagename') == "talentpool" || this.persistance.get('pagename') == "campusstalentpool") {
        this.campusLinkId = this.persistance.get('paramid');
        this.isSourceChannelId = this.persistance.get('hrStatus');
        this.getAllGender();
        this.getAllDomain();
        this.getAllState();
        this.getAllLanguages();
        this.getAllUniversity();
        this.getCampusHiringStatus();
        this.getAllCompletionYearsAndMonths();
        this.getAllQualification();
        this.getAllEmailTemplate();
        this.getAllInterviewEmailTemplate();
        this.getAllTalkEmailTemplate();
        this.getAllDocumentCollectionEmailTemplate();
        this.createFilterForm();
        this.getCandidateList();
        this.getAllVenue();
        this.getAllInterviewRoom();
        this.getAllInterviewPanelMemberHR();
        this.getAllInterviewPanelMemberFunction();
        // this.getAllSelectionGuideInterview();
        this.getAllFamilyOccupations();
        this.getAllVerticals();
        this.getAllRequisition();
        this.getAllInterviewName();
        this.emailIdFront = environment.emailLink;
        var roleIds = this.persistance.get('loggedinuser').roleIds.split(",");
        roleIds.includes("40") ? this.isVisibleStageGetAssesment = true : this.isVisibleStageGetAssesment = false

      } else {
        this._route.navigate(['/app/talent-pool']);
      }
    }
    else {
      this._route.navigate(['/app/talent-pool']);
    }
  }
  getAllFamilyOccupations() {
    this.familyOccupations = [];
    this.familyOccupations.push({ name: "Business", id: 1 });
    this.familyOccupations.push({ name: "Govt. Employee", id: 2 });
    this.familyOccupations.push({ name: "Private Sector", id: 3 });
    this.familyOccupations.push({ name: "Housewife", id: 4 });
    this.familyOccupations.push({ name: "Retired", id: 5 });
  }
  getAllVerticals() {
    this.verticals = [];
    var value = {
      FunctionName: "",
      FunctionId: 0,
      VerticalId: null,
      IsActive: true,
      CreatedBy: this.createdBy
    }
    this.verticalService.getAllCAmpusVertical(value).subscribe((result) => {
      if (result) {
        this.verticals = result;
      }
      else {
        this.requisitionLists = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });

  }
  gotoStageGetAssesment(candidateId) {
    jQuery(".custom-menu").hide();
    this.persistance.set('candidateId', candidateId);
    this._route.navigate(['/app/campus/stage-get-assesment']);
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
  //function
  getAllFunction(data) {
    this.functions = [];
    this.searchFunction.verticalId = data;
    this.functionService.getAllCampusVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;
      }
      else {
        this.functions = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllInterviewName() {
    this.SpinnerService.show();

    var value = {
      InterviewNameId: 0
    }
    this.calendarActionService.getcampusinterviewname(value).subscribe((response: any) => {
      if (response) {
        this.interviewNameList = response;

      }
      else {
        this.interviewNameList = [];
      }
    }, error => {
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {

      this.SpinnerService.hide();
    })
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
  getCampusHiringStatus() {
    this.hiringstatus = []
    let obj = {
      IsActive: true
    }
    this.campusRequisitionService.getAllCampusHiringStatus(obj).subscribe((result) => {
      if (result) {
        this.hiringstatus = result;
      }
      else {
        this.hiringstatus = [];
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
      Candidateid: [''],
      CandidateName: [''],
      CandidateId: [0],
      FromDate: [''],
      ToDate: [''],
      HiringStatusId: [0],
      GenderId: [''],
      FromAge: [0],
      ToAge: [0],
      AadharNo: [''],
      ContactNo: [''],
      EmailId: [''],
      MotherTongueIds: [''],
      LanguageIds: [''],
      NativeStateIds: [0],
      PresentStateIds: [0],
      FatherOccupation: [0],
      MotherOccupation: [0],
      QualificationId: [''],
      InstitutionId: [''],
      CourseId: [''],
      StreamId: [''],
      FromPercent: [0],
      ToPercent: [0],
      CompletionYear: [0],
      FromHeight: [0],
      ToHeight: [0],
      FromWeight: [0],
      ToWeight: [0],
      Disability: [''],
      Health: [''],
      EyeSightCorrected: [''],
      Siblings: [],
      Commitment: [''],
      WorkingShift: [''],
      JobTypePriyority: [''],
      CriticalFactor: [''],
      ExtraCurricularActivity: [''],
      QualificationTypeId: [''],
      FromExperience: [0],
      ToExperience: [0],
      FromCTC: [0],
      ToCTC: [0],
      CurrentEmployer: [''],
      Designation: [''],
      DomainId: [''],
      SubDomainId: [''],
      StateIds: [''],
      PreviousApplied: [0],
      RelativeStatus: [''],
      SourceChannelId: [''],
      campusLinkId: [this.campusLinkId]
    });
  }

  resetFilter() {
    this.filterForm.reset();
    this.createFilterForm();
    //this.getCandidateList();
    this.getFilterCandidateList();
    this.loadSelectPicker();
  }
  getAllUniversity() {
    this.academicUniversity = [];
    this.commonService.getAllQualificationUniversityBoard(this.searchUniversity).subscribe((result) => {
      if (result) {
        this.academicUniversity = result;
        console.log(result);
      }
      else {
        this.academicUniversity = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  getCandidateListAfterReset() {
    this.SpinnerService.show();
    //this.candidates = [];
    this.filterForm.value.campusLinkId = this.campusLinkId;
    this.campusRequisitionService.getAllCampusCandidateList(this.filterForm.value).subscribe((result) => {
      if (result) {
        this.candidates = result;
        this.candidates.forEach(element => {
          if (element.hiringStatusId == 7 || element.hiringStatusId == 8 || element.hiringStatusId == 9) {
            if (element.statusName != null || element.statusName != undefined) {
              var satus = element.statusName.split(",")
              element.hiringStatusName = satus[Number(satus.length) - 2]
              element.popoverContent = "<div><span class='grey'> Interview Status</span><span><br/>" + element.statusName + "</span></div>"
            }
          }
        })
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

  onFilter() {
    var flag = 0;
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
    //added by sayandeep to calculate days difference for filter
    const [fromDay, fromMonth, fromYear] = this.fDate.nativeElement.value.split('/');
    const [toDay, toMonth, toYear] = this.tDate.nativeElement.value.split('/');

    const fromDate = new Date(parseInt(fromYear), parseInt(fromMonth) - 1, parseInt(fromDay));
    const toDate = new Date(parseInt(toYear), parseInt(toMonth) - 1, parseInt(toDay));

    const timeDifference = toDate.getTime() - fromDate.getTime();
    const millisecondsInADay = 1000 * 60 * 60 * 24;

    this.numberOfDays = Math.floor(timeDifference / millisecondsInADay);
    if ((this.fDate.nativeElement.value != "")
      && (this.tDate.nativeElement.value != "")
      && (this.numberOfDays < 0)) {
      this.notificationService.showError("To Date Cann't be less than From Date !! Please provide actual date", "Error");
      flag = 1;
    }
    if (flag == 0) {
      this.getFilterCandidateList();
    }
  }
  campusLink: string = "";
  ngOnInit() {
    this.campusLink = this._activeRoute.snapshot.queryParamMap.get('campusLink');

    this.isUniversityMultipleVisible = false;
    this.titleService.setTitle(this.pageTitle);
    this.openNav();
    this.closeNav();
    this.loadTooltipMenu();
    this.loadDatePicker();
    this.loadPopover();
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
    this.searchCandidate.CampusLinkId = this.campusLinkId;
    this.campusRequisitionService.getAllCampusCandidateList(this.searchCandidate).subscribe((result) => {
      if (result) {
        this.candidates = result;
        this.candidates.forEach(element => {
          if (element.hiringStatusId == 7 || element.hiringStatusId == 8 || element.hiringStatusId == 9) {
            if (element.statusName != null || element.statusName != undefined) {
              var satus = element.statusName.split(",")
              element.hiringStatusName = satus[Number(satus.length) - 2]
              element.popoverContent = "<div><span class='grey'> Interview Status</span><span><br/>" + element.statusName + "</span></div>"
            }
          }
        })
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
    if (this.filterForm.value.GenderId == "") {
      GenderIds = "";
    }
    else {
      GenderIds = this.filterForm.value.GenderId.join(',');
    }
    this.searchCandidate = {
      CandidateNo: this.filterForm.value.Candidateid,
      CandidateName: this.filterForm.value.CandidateName,
      HiringStatusId: this.filterForm.value.HiringStatusId,
      GenderIds: GenderIds,
      FromAge: this.filterForm.value.FromAge,
      ToAge: this.filterForm.value.ToAge,
      AadharNo: this.filterForm.value.AadharNo,
      ContactNo: this.filterForm.value.ContactNo,
      EmailId: this.filterForm.value.EmailId,
      MotherTongueIds: this.filterForm.value.MotherTongueIds == "" ? "" : this.filterForm.value.MotherTongueIds.join(","),
      // NativeStateIds: this.filterForm.value.NativeStateIds == "" ? "" : this.filterForm.value.NativeStateIds.join(","),
      // PresentStateIds: this.filterForm.value.PresentStateIds == "" ? "" : this.filterForm.value.PresentStateIds.join(","),
      NativeStateIds: this.filterForm.value.NativeStateIds,
      PresentStateIds: this.filterForm.value.PresentStateIds,
      FatherOccupation: this.filterForm.value.FatherOccupation,
      MotherOccupation: this.filterForm.value.MotherOccupation,
      InstitutionIds: this.filterForm.value.InstitutionId == 0 ? "" : this.filterForm.value.InstitutionId.join(","),
      QualificationIds: this.filterForm.value.QualificationId == 0 ? "" : this.filterForm.value.QualificationId.join(","),
      CourseIds: this.filterForm.value.CourseId == 0 ? "" : this.filterForm.value.CourseId.join(","),
      StreamIds: this.filterForm.value.StreamId == 0 ? "" : this.filterForm.value.StreamId.join(","),
      FromPercentage: this.filterForm.value.ToPercent,
      ToPercentage: this.filterForm.value.FromPercent,
      DomainIds: this.filterForm.value.DomainId == 0 ? "" : this.filterForm.value.DomainId.join(","),
      SubDomainIds: (this.filterForm.value.SubDomainId == 0) ? "" : this.filterForm.value.SubDomainId.join(","),
      StateIds: this.filterForm.value.StateIds == 0 ? "" : this.filterForm.value.StateIds.join(","),
      SourceChannelId: this.filterForm.value.SourceChannelId == 0 ? "" : this.filterForm.value.SourceChannelId.join(","),
      CreatedBy: 0,
      CampusLinkId: this.campusLinkId,
      FromDate: this.filterForm.value.FromDate,
      ToDate: this.filterForm.value.ToDate,
      FromHeight: this.filterForm.value.FromHeight,
      ToHeight: this.filterForm.value.ToHeight,
      FromWeight: this.filterForm.value.FromWeight,
      ToWeight: this.filterForm.value.ToWeight,
      Disability: this.filterForm.value.Disability == "" ? "" : this.filterForm.value.Disability.join(","),
      EyeSightCorrected: this.filterForm.value.EyeSightCorrected == "" ? "" : this.filterForm.value.EyeSightCorrected.join(","),
      Health: this.filterForm.value.Health == "" ? "" : this.filterForm.value.Health.join(","),
      Siblings: this.filterForm.value.Siblings,
      Commitment: this.filterForm.value.Commitment == "" ? "" : this.filterForm.value.Commitment.join(","),
      WorkingShift: this.filterForm.value.WorkingShift == "" ? "" : this.filterForm.value.WorkingShift.join(","),
      JobTypePriyority: this.filterForm.value.JobTypePriyority == "" ? "" : this.filterForm.value.JobTypePriyority.join(","),
      CriticalFactor: this.filterForm.value.CriticalFactor == "" ? "" : this.filterForm.value.CriticalFactor.join(","),
      ExtraCurricularActivity: this.filterForm.value.ExtraCurricularActivity == "" ? "" : this.filterForm.value.ExtraCurricularActivity.join(","),
      LanguageIds: this.filterForm.value.LanguageIds == "" ? "" : this.filterForm.value.LanguageIds.join(","),
      FromExperience: this.filterForm.value.FromExperience,
      ToExperience: this.filterForm.value.ToExperience,
      CompletionYears: "",
      QualificationTypeIds: this.filterForm.value.QualificationTypeId == 0 ? "" : this.filterForm.value.QualificationTypeId.join(","),
      CurrentEmployer: this.filterForm.value.CurrentEmployer,
      Designation: this.filterForm.value.Designation,
      RelativeStatus: this.filterForm.value.RelativeStatus == 0 ? "" : this.filterForm.value.RelativeStatus.join(","),
      PreviousApplied: this.filterForm.value.PreviousApplied
    }
  }

  getFilterCandidateList() {
    this.SpinnerService.show();
    this.candidates = [];
    this.setFilterForm();
    this.btnInterviewVisible = false;
    this.btnTestVisible = false;
    jQuery("#chkAll").prop("checked", false);
    console.log("chck", this.searchCandidate)
    this.campusRequisitionService.getAllCampusCandidateList(this.searchCandidate).subscribe((result) => {
      if (result) {
        this.candidates = result;
        this.candidates.forEach(element => {
          if (element.hiringStatusId == 7 || element.hiringStatusId == 8 || element.hiringStatusId == 9) {
            if (element.statusName != null || element.statusName != undefined) {
              var satus = element.statusName.split(",")
              element.hiringStatusName = satus[Number(satus.length) - 2]
              element.popoverContent = "<div><span class='grey'> Interview Status</span><span><br/>" + element.statusName + "</span></div>"
            }
          }
        })
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
          "fixedColumns": {
            "left": 4
          },
          "drawCallback": function (settings) {
            setTimeout(() => {
              jQuery('[data-toggle="popover"]').popover({
                html: true
              });
            });
          }

          //"pageLength": 2,
          //"stateSave": true
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

  // select(evt, id, statusid, placementId, data, emailId, candidateNo, names, institute, course, stream) {
  //   data.checked=evt.target.checked;
  //   var flag = 0;
  //   var pflag = 0;
  //   if (evt.target.checked == true) {
  //     this.candiateIdArray.push(id);
  //   }
  //   if (evt.target.checked == false) {
  //     this.candiateIdArray = this.candiateIdArray.filter(e => e != id);
  //   }
  //   this.currentHiringStatus = statusid;
  //   this.EmailId = data.emailId;
  //   this.candidateId = id;
  //   this.btnVisible = false;  // By Sayandeepon 05-08-2023
  //   this.btnreject = false;  // By Sayandeepon 05-08-2023
  //   this.btnpreplacementVisible = false;
  //   this.btnRescheduleInterviewVisible = false;
  //   this.btnreshedulepreplacementVisible = false;
  //   this.btnInterviewVisible = false;
  //   this.btnReScheduleTestVisible = false;
  //   this.btncancelpreplacementVisible = false;
  //   this.btncancelInterview = false;
  //   this.btnCancelTestVisible = false;
  //   if (this.candidateIds != "") {
  //     if (this.prevselectedstatus != statusid && this.prevselectedstatus != 0) {
  //       var oldstatusid = this.prevselectedstatus;
  //       flag = 1;
  //     }
  //     else {
  //       this.prevselectedstatus = statusid;
  //     }
  //     if (this.prevplacement != placementId) {
  //       pflag = 1
  //     }
  //     else {
  //       this.prevplacement = placementId;
  //     }
  //   }
  //   else {
  //     this.prevselectedstatus = statusid;
  //     this.prevplacement = placementId;
  //   }
  //   if (evt.target.checked && flag == 0) {
  //     this.candidateIds = this.candidateIds + "," + id;
  //     this.testmailIds = this.testmailIds + "," + emailId;
  //     this.candidateIdNames = this.candidateIdNames + "," + names;
  //     this.institute = this.institute + "," + institute;
  //     this.course = this.course + "," + course;
  //     this.stream = this.stream + "," + stream;
  //     this.interviewmailIds = this.interviewmailIds + "," + emailId;
  //   }
  //   else {
  //     jQuery("#chkAll").prop("checked", false);
  //     this.candidateIds = this.candidateIds.replace("," + id, "");
  //     this.candidateIdNames = this.candidateIdNames.replace("," + names, "");
  //     this.institute = this.institute + "," + institute;
  //     this.course = this.course + "," + course;
  //     this.stream = this.stream + "," + stream;
  //     this.interviewmailIds = this.interviewmailIds.replace("," + emailId, "");
  //   }
  //   if (this.candidateIds != "") {
  //     if (statusid == 1 && flag == 0) {
  //       this.btnVisible = true;
  //       this.btnTestVisible = false;
  //       this.btnInterviewVisible = false;
  //       this.btnDocumentCollectionVisible = false;
  //       this.btnManagementApprovalVisible = false;
  //       this.btnUploadManagementApprovalVisible = false;
  //       this.btnpreplacementVisible = false;
  //       this.btnreshedulepreplacementVisible = false;
  //       this.btnReScheduleTestVisible = false;
  //       this.btnRescheduleInterviewVisible = false;
  //       this.btnreject = true;   
  //     }
  //     else if (statusid == 2 && flag == 0) {
  //       this.btnVisible = false;
  //       this.btnreject = false; 
  //       this.btnTestVisible = true;
  //       this.btnInterviewVisible = false;
  //       this.btnRescheduleInterviewVisible = false;
  //       if ((data.preplacementId != 1) && pflag == 0) {
  //         this.btnpreplacementVisible = true;
  //         this.btnreshedulepreplacementVisible = false;
  //       }
  //       else if (pflag == 0) {
  //         this.btnreshedulepreplacementVisible = true;
  //         this.btncancelpreplacementVisible = true;
  //         this.btnpreplacementVisible = false;
  //       }
  //       this.btnReScheduleTestVisible = false;
  //     }
  //     else if ((statusid == 7 || statusid == 17) && flag == 0) {
  //       this.btnRescheduleInterviewVisible = true;
  //       this.btncancelInterview = true;
  //       this.btnpreplacementVisible = false;
  //       this.btnreshedulepreplacementVisible = false;
  //       this.btncancelpreplacementVisible = false;
  //     }
  //     else if ((statusid == 14 || statusid == 8 || statusid==9) && flag == 0) {
  //       this.btnInterviewVisible = true;
  //       this.btnpreplacementVisible = false;
  //       this.btnreshedulepreplacementVisible = false;
  //       if(statusid == 14 && flag==0)
  //         {

  //           if ((data.preplacementId != 1) && pflag == 0) {
  //             this.btnpreplacementVisible = true;
  //             this.btnreshedulepreplacementVisible = false;
  //           }
  //           else if (pflag == 0) {
  //             this.btnreshedulepreplacementVisible = true;
  //             this.btncancelpreplacementVisible = true;
  //             this.btnpreplacementVisible = false;
  //           }
  //        }
  //     }

  //     else if ((statusid == 5) && flag == 0) {
  //       this.btnVisible = false;
  //       this.btnreject = false;
  //       this.btnTestVisible = false;
  //       this.btnInterviewVisible = false;
  //       this.btnRescheduleInterviewVisible = false;
  //       if ((data.preplacementId != 1) && pflag == 0) {
  //         this.btnpreplacementVisible = true;
  //         this.btnreshedulepreplacementVisible = false;
  //       }
  //       else if (pflag == 0) {
  //         this.btnreshedulepreplacementVisible = true;
  //         this.btncancelpreplacementVisible = true;
  //         this.btnpreplacementVisible = false;
  //       }
  //       this.btnReScheduleTestVisible = false;
  //     }
  //     else if ((statusid == 8) && flag == 0) {
  //       this.btnVisible = false;
  //       this.btnreject = false;
  //       this.btnTestVisible = false;
  //       this.btnInterviewVisible = true;
  //       this.btnpreplacementVisible = false;
  //       this.btnRescheduleInterviewVisible = false;
  //       this.btnreshedulepreplacementVisible = false;
  //       this.btnReScheduleTestVisible = false;
  //     }
  //     else if ((statusid == 3 || statusid == 6) && flag == 0) {
  //       this.btnRescheduleInterviewVisible = false;
  //       if ((data.preplacementId != 1) && pflag == 0) {
  //         this.btnpreplacementVisible = true;
  //         this.btnreshedulepreplacementVisible = false;
  //       }
  //       else if (pflag == 0) {
  //         this.btnreshedulepreplacementVisible = true;
  //         this.btncancelpreplacementVisible = true;
  //         this.btnpreplacementVisible = false;
  //       }
  //     }
  //     else if (statusid == 4 && flag == 0) {
  //       this.btnVisible = false;
  //       this.btnreject = false;
  //       this.btnTestVisible = false;
  //       this.btnInterviewVisible = false;
  //       this.btnRescheduleInterviewVisible = false;
  //       this.btnCancelTestVisible = true;
  //       if ((data.preplacementId != 1) && pflag == 0) {
  //         this.btnpreplacementVisible = true;
  //         this.btnreshedulepreplacementVisible = false;
  //       }
  //       else if (pflag == 0) {
  //         this.btnreshedulepreplacementVisible = true;
  //         this.btncancelpreplacementVisible = true;
  //         this.btnpreplacementVisible = false;
  //       }
  //       this.btnReScheduleTestVisible = true;
  //     }
  //     else if (statusid == 1 && flag == 1) {
  //       this.btnreject = false;
  //     }



  //   }
  //   else {
  //     this.btnVisible = false;
  //     this.btnreject = false;
  //     this.btnTestVisible = false;
  //     this.btnInterviewVisible = false;
  //     this.btnTestVisible = false;
  //     this.btnpreplacementVisible = false;
  //     this.btnreshedulepreplacementVisible = false;
  //     this.btnReScheduleTestVisible = false;
  //     this.btnRescheduleInterviewVisible = false;
  //     this.prevselectedstatus = 0;
  //     this.btncancelpreplacementVisible = false;
  //     this.btncancelInterview = false;
  //     this.btnCancelTestVisible = false;
  //   }
  //   var universityArr = this.changeUniverSityNameArray.find(e => e.candidateId == data.candidateId);
  //   if (universityArr == undefined || universityArr == null) {
  //     this.changeUniverSityNameArray.push(data);
  //   }
  //   else {
  //     if (evt.target.checked == false) {
  //       this.changeUniverSityNameArray = this.changeUniverSityNameArray.filter(e => e.candidateId != data.candidateId)
  //     }
  //   }

  //   if (this.changeUniverSityNameArray.length > 1) {
  //     this.isUniversityMultipleVisible = true;
  //   }
  //   else if (this.changeUniverSityNameArray.length == 0) {
  //     this.isUniversityMultipleVisible = false;
  //   }
  //   else if (this.changeUniverSityNameArray.length == 1) {
  //     this.isUniversityMultipleVisible = false;
  //     if (this.changeUniverSityNameArray[0].hiringStatusId == 1) {
  //       this.btnVisible = true;
  //      // this.btnreject = false;  // By Sayandeepon 05-08-2023
  //       this.btnreject = true;    // By Sayandeepon 05-08-2023
  //       // this.btnTestVisible = false;
  //       // this.btnInterviewVisible = false;
  //       // this.btnpreplacementVisible=false;
  //       this.btnDocumentCollectionVisible = false;
  //       this.btnManagementApprovalVisible = false;
  //       this.btnUploadManagementApprovalVisible = false;
  //       // this.btnReScheduleTestVisible = false;
  //     }
  //     else if (this.changeUniverSityNameArray[0].hiringStatusId == 2) {
  //       this.btnVisible = false;
  //       this.btnreject = false; 
  //     }
  //     else if (this.changeUniverSityNameArray[0].hiringStatusId == 4) {
  //       this.btnVisible = false;
  //       this.btnreject = false;
  //     }
  //     else if (this.changeUniverSityNameArray[0].hiringStatusId == 5 || this.changeUniverSityNameArray[0].hiringStatusId == 8) {
  //       this.btnVisible = false;
  //       this.btnreject = false;
  //     }
  //     else if (this.changeUniverSityNameArray[0].hiringStatusId == 2 || this.changeUniverSityNameArray[0].hiringStatusId == 3 || this.changeUniverSityNameArray[0].hiringStatusId == 4 || this.changeUniverSityNameArray[0].hiringStatusId == 5 || this.changeUniverSityNameArray[0].hiringStatusId == 6) {
  //       this.btnVisible = false;
  //       this.btnreject = false;
  //     }
  //   }

  // }
  onCheckSelectAll(eve) {
    var firstHiringStatusId = this.candidates[0].hiringStatusId;
    var flag = 0;
    this.candidates.forEach(element => {
      if (element.hiringStatusId != firstHiringStatusId) {
        flag = 1
      }
    })
    if (flag == 0) {
      this.candidates.forEach(element => {
        element.checked = eve.target.checked;
      })
      if (eve.target.checked) {
        this.checkflag = 1
      }
      else {
        this.checkflag = 0;
      }
    } else {
      jQuery("#ani").prop("checked", false);
      this.notificationService.showError("Please select same hiring status", "Error");

    }
  }
  getEnableStatus(data) {
    return data.checked;
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




  ProcessCandidate() {
    var eligiblecandidates = this.candidates.filter(e => (e.checked == true));
    var candids = "";
    for (var i = 0; i < eligiblecandidates.length; i++) {
      candids = candids + "," + eligiblecandidates[i].candidateId;
    }
    this.formData.candidateIds = candids.toString();
    this.formData.campusLinkId = this.campusLinkId;
    this.formData.hiringStatusId = this.statusId;
    this.formData.createdBy = this.createdBy;
    this.formData.remarks = this.remarks;
    if (this.statusId < 55) {
      this.campusRequisitionService.updateCampusCandidateHiringStatus(this.formData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.getCandidateList();
            this.btnInterviewVisible = false;
            this.btnTestVisible = false;
            this.prevselectedstatus = 0;
            this.cModal.nativeElement.click();
            this.btnVisible = false;
            this.btnreject = false;
            this.candidateIds = "";
            this.remarks = "";
            this.rescheduleCandidateId = "";
          }
        }
        else {
        }
      }, error => {
        console.log(error);
      }, () => {
      });
    }
  }

  openModalPopupRejectDeclineCallBack(statusId, candidateId) {
    this.statusId = statusId;
    if (this.statusId == 56) {
      this.actionName = "Declined";
    }
    else if (this.statusId == 57) {
      this.actionName = "Reject";
    }
    else if (this.statusId == 59) {
      this.actionName = "Call back";
    }
    this.candidateIds = "," + candidateId.toString();
  }

  openModalPopup(status: number) {
    this.statusId = parseInt(status.toString());

    if (this.statusId == 2) {
      this.actionName = "Shortlist";
    }
    else if (this.statusId == 3) {
      this.actionName = "Reject";
    }
  }

  gotoCampusLink() {
    this.persistance.set('pagename', null)
    this.persistance.set('paramid', null)
    this._route.navigate(['/app/campus/requsition-link']);
  }

  //venue
  getAllVenue() {
    this.venues = [];
    this.venueService.getAllVenue(this.searchVenue).subscribe((result) => {
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
  getAllTalkEmailTemplate() {
    this.talkemailTemplates = [];
    this.searchInterviewEmailTemplate.templateTypeId = 56;
    this.emailtemplateService.getAllEmailTemplate(this.searchInterviewEmailTemplate).subscribe((result) => {
      if (result) {
        this.talkemailTemplates = result;
      }
      else {
        this.talkemailTemplates = [];
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
          format: 'DD-MM-YYYY HH:mm',
          minDate: new Date().setDate(new Date().getDate()),
          sideBySide: false
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
    this.testheader = "Schedule Test"
    this.checkTestLink = "";
    this.checkTestFromDate = "";
    this.checkTestToDate = "";
    this.checkTestContactNo = "";
    this.checkTestContactName = "";
    this.checktestInstituteEmail = "";
    this.checkTestVenue = "";
    this.checkTestVenueAddress = "";
    this.checkTestEmailTemplate = "";
    this.selectedTravelModeTestArray = [];
    this.stepCount = 1;
    this.isTestTravel = false;
    this.loadSelectPicker();
    if (this.testTypeId != 1) {
      document.getElementById("radio1").click();
    }
    this.loadDateTimePicker();
  }
  openReScheduleTestModal() {
    this.testheader = "Reschedule Test"
    this.checkTestLink = "";
    this.checkTestFromDate = "";
    this.checkTestToDate = "";
    this.checkTestContactNo = "";
    this.checkTestContactName = "";
    this.checktestInstituteEmail = "";
    this.checkTestVenue = "";
    this.checkTestEmailTemplate = "";
    this.stepCount = 1;
    this.isTestTravel = false;
    this.loadSelectPicker();
    this.changeTestEmailTemplate();
    if (this.testTypeId != 1) {
      document.getElementById("radio1").click();
    }
    this.loadDateTimePicker();
  }
  onTestSchedule() {
    this.SpinnerService.show();
    var flag = 0;
    if (this.selectedTestEmailTemplateId == undefined) {
      flag = 1;
      jQuery(".ddltestemailtemplate").addClass("is-invalid");
    }
    else {
      jQuery(".ddltestemailtemplate").removeClass("is-invalid");
    }
    if (flag == 0) {
      var eligiblecandidates = this.candidates.filter(e => (e.checked == true));
      var candids = "";
      this.testmailIds = "";
      for (var i = 0; i < eligiblecandidates.length; i++) {
        candids = candids + "," + eligiblecandidates[i].candidateId;
        this.testmailIds = this.testmailIds + "," + eligiblecandidates[i].emailId
      }
      if (this.testScheduleFormData.TestTypeId == 1) {
        this.testScheduleFormData.TestLink = "";
      }
      if (this.rescheduleCandidateId != "") {
        candids = this.rescheduleCandidateId;
      }
      if (this.candidateIds.length > 0) {
        candids = this.candidateIds;
      }
      this.testScheduleFormData.CandidateIds = candids;
      this.testScheduleFormData.CampusLinkId = this.campusLinkId;
      this.testScheduleFormData.TestEmailTemplateId = Number(this.selectedTestEmailTemplateId);
      this.testScheduleFormData.TestEmailTemplate = this.testEmailTemplateDescription;
      this.testScheduleFormData.CreatedBy = this.createdBy;
      this.testScheduleFormData.TestTypeId = Number(this.testTypeId);
      if (this.testScheduleDetail != undefined) {
        if (this.testScheduleDetail.venueName != null || this.testScheduleDetail.venueName != undefined) {
          this.testScheduleFormData.TestVenueName = this.testScheduleDetail.venueName;
        }
        else {
          this.testScheduleFormData.TestVenueName = this.selectedTestVenueName;
        }
      }
      else {
        this.testScheduleFormData.TestVenueName = this.selectedTestVenueName;
      }
      if (this.testmailIds.length > 0) {
        this.EmailId = this.testmailIds;
      }
      this.testScheduleFormData.EmailId = this.EmailId;
      if (this.testScheduleDetail != undefined) {  //Piu
        if (this.testScheduleDetail.venueAddress != null || this.testScheduleDetail.venueAddress != undefined) {
          this.testScheduleFormData.TestVenueAddress = this.testScheduleDetail.venueAddress;
        }
        else {
          this.testScheduleFormData.TestVenueAddress = this.selectedTestVenueAddress;
        }
      }
      else {
        this.testScheduleFormData.TestVenueAddress = this.selectedTestVenueAddress;
      }
      console.log("test", this.testScheduleFormData)
      this.campusRequisitionService.createCampusTestSchedule(this.testScheduleFormData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.candidateIds = "";
            this.prevselectedstatus = 0;
            this.closeScheduleModal();
            this.getFilterCandidateList();
            this.loadDataTable();
            this.btnTestVisible = false;
            this.rescheduleCandidateId = "";
            this.testmailIds = "";
            jQuery("#chkAll").prop("checked", false);
            this.SpinnerService.hide();
          }
        }
        else {
        }
      }, error => {
        console.log(error);
      }, () => {
      });

    }
  }

  onInterviewSchedule() {
    this.SpinnerService.show();
    var flag = 0;
    if (this.selectedInterviewEmailTemplateId == undefined) {
      flag = 1;
      jQuery(".ddlinterviewemailtemplate").addClass("is-invalid");
    }
    else {
      jQuery(".ddlinterviewemailtemplate").removeClass("is-invalid");
    }
    if (flag == 0) {
      var eligiblecandidates = this.candidates.filter(e => (e.checked == true));
      var candids = "";
      this.interviewmailIds = "";
      for (var i = 0; i < eligiblecandidates.length; i++) {
        candids = candids + "," + eligiblecandidates[i].candidateId;
        this.interviewmailIds = this.interviewmailIds + "," + eligiblecandidates[i].emailId
      }
      if (this.testScheduleFormData.TestTypeId == 1) {
        this.testScheduleFormData.TestLink = "";
      }
      if (this.rescheduleCandidateId != "") {
        candids = this.rescheduleCandidateId;
      }
      if (this.candidateIds.length > 0) {
        candids = this.candidateIds;
      }
      if (this.interviewScheduleFormData.InterviewTypeId == 1) {
        this.interviewScheduleFormData.InterviewLink = "";
      }
      if (this.rescheduleCandidateId != "") {
        this.candidateIds = this.rescheduleCandidateId;
      }
      if (this.interviewmailIds.length > 0) {
        this.EmailId = this.interviewmailIds
      }
      this.interviewScheduleFormData.VerticalId = this.selectedInterviewVerticalId;
      if (this.interviewScheduleDetail != undefined) {
        this.interviewScheduleFormData.VenueName = this.interviewScheduleDetail.venueName;
      }
      else {
        this.interviewScheduleFormData.VenueName = this.interviewScheduleFormData.VenueName;
      }

      this.interviewScheduleFormData.FunctionId = this.selectedInterviewFunctionId;
      this.interviewScheduleFormData.CandidateIds = candids.toString();
      this.interviewScheduleFormData.CampusLinkId = this.campusLinkId;
      this.interviewScheduleFormData.EmailTemplateId = Number(this.selectedInterviewEmailTemplateId);
      this.interviewScheduleFormData.EmailTemplate = this.interviewEmailTemplateDescription;
      this.interviewScheduleFormData.EmailId = this.EmailId;
      this.interviewScheduleFormData.VenueName = this.selectedInterviewVenueName;
      this.interviewScheduleFormData.InterviewVenueAddress = this.selectedInterviewVenueAddress;
      this.interviewScheduleFormData.CreatedBy = this.createdBy;
      this.interviewScheduleFormData.InterviewId = this.selectedInterviewId;
      this.interviewScheduleFormData.InterviewSlot = "" + this.interviewScheduleFormData.InterviewSlot.toString();

      var arrayhr = ""
      for (var val of this.selectedInterViewHR) {
        arrayhr += val.toString() + ","
      }
      this.interviewScheduleFormData.HRAutoUserIds = arrayhr.slice(0, -1);
      var arrayPannlel = ""
      for (var val of this.selectedInterViewInterview) {
        arrayPannlel += val.toString() + ","
      }
      this.interviewScheduleFormData.InterviewerAutoUserIds = arrayPannlel.slice(0, -1);
      console.log("in", this.interviewScheduleFormData)
      this.campusRequisitionService.createCampusInterviewSchedule(this.interviewScheduleFormData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.candidateIds = "";
            this.EmailId = "";
            this.interviewmailIds = "";
            this.closeInterviewModal();
            this.prevselectedstatus = 0;
            this.getFilterCandidateList();
            this.loadDataTable();
            this.btnInterviewVisible = false;
            this.btnpreplacementVisible = false;
            this.btnreshedulepreplacementVisible = false;
            this.btncancelpreplacementVisible = false;
            this.rescheduleCandidateId = "";
            jQuery("#chkAll").prop("checked", false);
            this.SpinnerService.hide();
          }
        }
        else {
        }
      }, error => {
        console.log(error);
      }, () => {
      });

    }
  }
  interviewDetailsData: any = [];
  onclickInterviewDetails(CandiateId) {
    var searachvalue = {
      CandidateId: Number(CandiateId)
    }
    this.calendarActionService.getInterviewDetails(searachvalue).subscribe((result) => {
      if (result) {
        this.interviewDetailsData = result;
      }

    }, error => {
      console.log(error);
    }, () => {
    });
  }

  onTalkSchedule() {
    var flag = 0;
    if (this.talkEmailTemplateDescription == undefined || this.talkEmailTemplateDescription == "") {
      flag = 1;
      this.checkTalkEmailTemplate = "1";
      this.talkEmailTemplateDescription = "";
    }
    if (flag == 0) {
      var eligiblecandidates = this.candidates.filter(e => (e.checked == true));
      var candids = "";
      for (var i = 0; i < eligiblecandidates.length; i++) {
        candids = candids + "," + eligiblecandidates[i].candidateId;
      }
      if (this.talkScheduleFormData.TalkTypeId == 1) {
        this.talkScheduleFormData.TalkLink = "";
      }
      if (this.candidateId != undefined || this.candidateId != null) {
        candids = this.candidateId.toString();
      }
      this.talkScheduleFormData.CandidateIds = candids;
      this.talkScheduleFormData.CampusLinkId = this.campusLinkId;
      this.talkScheduleFormData.InstituteEmailId = this.talkmailid;
      this.talkScheduleFormData.TalkEmailTemplate = this.talkEmailTemplateDescription;
      this.talkScheduleFormData.CreatedBy = this.createdBy;
      this.talkScheduleFormData.TalkTypeId = Number(this.talkTypeId);
      this.talkScheduleFormData.TalkVenueName = this.talkVenueName;
      console.log("ff", this.talkScheduleFormData)
      this.campusRequisitionService.createPrePlacementTalkSchedule(this.talkScheduleFormData).subscribe((result) => {

        if (result.successFlag == 1) {
          this.notificationService.showSuccess(result.msg, "success");
          this.closePreplacementModal();
          this.resetPrePlacementForm();
        }
        else {
          this.notificationService.showError(result.msg, "Error");
        }

      }, error => {
        console.log(error);
      }, () => {
      });

    }
  }
  openTalkModal(data) {
    this.talkheader = "PrePlacement Talk"
    this.checkTalkLink = "";
    this.checkTalkFromDate = "";
    this.checkTalkToDate = "";
    this.checkTalkContactNo = "";
    this.checkTalkContactName = "";
    this.checkTalkVenue = "";
    this.checkTalkMailId = "";
    this.checkTalkEmailTemplate = "";
    this.stepCount = 1;
    this.candidateId = data.candidateId;
    //this.isTestTravel = false;
    this.loadSelectPicker();
    if (this.talkTypeId != 1) {
      document.getElementById("radio3").click();
    }
    this.loadDateTimePicker();
  }
  openRescheduleTalkModal(data) {
    this.talkheader = "Reschedule Preplacement Talk";
    this.checkTalkLink = "";
    this.checkTalkFromDate = "";
    this.checkTalkToDate = "";
    this.checkTalkContactNo = "";
    this.checkTalkContactName = "";
    this.checkTalkVenue = "";
    this.checkTalkMailId = "";
    this.checkTalkEmailTemplate = "";
    this.stepCount = 1;
    this.searchTalkScheduleDetail.candidateId = data.candidateId;
    this.searchTalkScheduleDetail.campusLinkId = data.campusLinkId;
    //this.isTestTravel = false;
    this.campusRequisitionService.getAllCampusTalkScheduleDetail(this.searchTalkScheduleDetail).subscribe((result) => {
      if (result) {
        this.talkScheduleDetail = result;
        //this.talkScheduleFormData.CandidateIds = "" + this.candidateId;
        this.talkTypeId = this.talkScheduleDetail.talkTypeId;
        this.talkLink = this.talkScheduleDetail.TALKLINK;
        this.talkVenueName = this.talkScheduleDetail.venueName;
        this.talkmailid = this.talkScheduleDetail.instituteEmailId;
        this.talkContactNo = this.talkScheduleDetail.contactNo;
        this.talkContactName = this.talkScheduleDetail.contactPersonName;
        this.talkFromDateTime = this.talkScheduleDetail.fromDate;
        this.talkToDateTime = this.talkScheduleDetail.toDate;
        this.talkEmailTemplateDescription = "";
        this.selectedTalkEmailTemplateId = this.talkScheduleDetail.emailTemplate;
        this.talkScheduleFormData.TalkFromDate = this.talkScheduleDetail.fromDate;
        this.talkScheduleFormData.TalkToDate = this.talkScheduleDetail.toDate;
        this.talkScheduleFormData.TalkVenueName = this.talkVenueName;
        this.talkScheduleFormData.InstituteEmailId = this.talkmailid;
        this.talkScheduleFormData.TalkContactName = this.talkContactName;
        this.talkScheduleFormData.TalkContactNo = this.talkContactNo;
        if (this.talkTypeId == 1) {
          document.getElementById("radio3").click();
          this.isOnlineTest = false;
        }
        else {
          document.getElementById("radio4").click();
          this.isOnlineTest = true;
        }
        setTimeout(() => {
          jQuery("#fromdatetimepik").data("DateTimePicker").date(this.talkScheduleDetail.fromDate);
          jQuery("#todatetimepik").data("DateTimePicker").date(this.talkScheduleDetail.toDate);
        });
        this.changetalkEmailTemplate();
        this.stepCount = 1;
      }
      else {
        this.talkScheduleDetail = null;
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
      this.loadDateTimePicker();
    });
  }
  openpreplacementTalkModal() {
    this.talkheader = "PrePlacement Talk";
    this.checkTalkLink = "";
    this.checkTalkFromDate = "";
    this.checkTalkToDate = "";
    this.checkTalkContactNo = "";
    this.checkTalkContactName = "";
    this.checkTalkVenue = "";
    this.checkTalkMailId = "";
    this.checkTalkEmailTemplate = "";
    this.stepCount = 1;
    //this.isTestTravel = false;
    this.loadSelectPicker();
    if (this.talkTypeId != 1) {
      document.getElementById("radio3").click();
    }
    this.loadDateTimePicker();
  }
  openreshedulepreplacementTalkModal() {
    this.talkheader = "Reschedule PrePlacement Talk";
    this.checkTalkLink = "";
    this.checkTalkFromDate = "";
    this.checkTalkToDate = "";
    this.checkTalkContactNo = "";
    this.checkTalkContactName = "";
    this.checkTalkVenue = "";
    this.checkTalkMailId = "";
    this.checkTalkEmailTemplate = "";
    this.stepCount = 1;
    //this.isTestTravel = false;
    this.loadSelectPicker();
    if (this.talkTypeId != 1) {
      document.getElementById("radio3").click();
    }
    this.loadDateTimePicker();
  }
  openInterviewModal() {
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
    this.selectedInterviewVerticalId = undefined;
    this.selectedInterviewFunctionId = undefined;
    this.functions = [];
    this.loadSelectPicker();
    if (this.testTypeId != 1) {
      document.getElementById("interviewradio1").click();
    }
    this.loadDateTimePicker();
  }

  changeTestEmailTemplate() {
    // var venueaddress = this.testVenueName;
    var templatedescription = this.emailTemplates.filter(x => x.templateId == Number(this.selectedTestEmailTemplateId))[0].templateDescription;
    templatedescription = templatedescription.replace("@@DateTime", this.testScheduleFormData.TestFromDate + " - " + this.testScheduleFormData.TestToDate);
    templatedescription = templatedescription.replace("@@VenueName", this.testScheduleFormData.TestVenueName);
    templatedescription = templatedescription.replace("@@VenueAddress", this.testScheduleFormData.TestVenueAddress);
    templatedescription = templatedescription.replace("@@Position", this.requisitionPositionName);
    templatedescription = templatedescription.replace("@@Department", this.requisitionDepartmentName);
    templatedescription = templatedescription.replace("@@Function", this.requisitionFunctionName);
    templatedescription = templatedescription.replace("@@TestLink", this.testLink);
    templatedescription = templatedescription.replace("@@ContactPerson", this.testScheduleFormData.TestContactName);
    templatedescription = templatedescription.replace("@@ContactNumber", this.testScheduleFormData.TestContactNo);
    //templatedescription = templatedescription.replace("@@AcknowledgementLink", this.campusLink);
    templatedescription = templatedescription.replace("@@AcknowledgementLink", this.emailIdFront + "campusoffcampus/testacknowledgement?CandiateId=@~@CandidateId");
    setTimeout(() => {
      jQuery(".cke_wysiwyg_div").html("");
      jQuery(".cke_wysiwyg_div").html(templatedescription);
    });
    this.testEmailTemplateDescription = templatedescription;
    this.testEmailTemplateDescription2 = templatedescription;
  }

  // btnTestNext() {          // By  Piu on 05-08-2023
  //   var flag = 0;
  //   var travelmode = jQuery(".ddltravelmode").selectpicker('val');
  //   this.selectedTravelModeTestArray = travelmode;
  //   this.testScheduleFormData.TestTypeId = this.testTypeId;
  //   this.testScheduleFormData.TestLink = this.testLink;
  //   this.testScheduleFormData.TestFromDate = this.fTestDate.nativeElement.value;
  //   this.testFromDateTime = this.fTestDate.nativeElement.value;  // 15-03-2023
  //   this.testScheduleFormData.TestToDate = this.tTestDate.nativeElement.value;
  //   this.testToDateTime = this.tTestDate.nativeElement.value;   // 15-03-2023
  //   this.testScheduleFormData.TestVenueName = this.selectedTestVenueName;
  //   this.testScheduleFormData.TestVenueAddress = this.selectedTestVenueAddress;
  //   this.testScheduleFormData.TestContactName = this.testContactName;
  //   //this.testScheduleFormData.TestInstituteEmail = this.testInstituteEmail;
  //   this.testScheduleFormData.TestContactNo = this.testContactNo;
  //   this.testScheduleFormData.IsTestTravel = this.isTestTravel;
  //   if (this.isTestTravel == true) {
  //     if (this.selectedTravelModeTestArray == null) {
  //       this.testScheduleFormData.TravelModes = "";
  //     }
  //     else {
  //       this.testScheduleFormData.TravelModes = this.selectedTravelModeTestArray.join();
  //     }
  //   }
  //   else {
  //     this.testScheduleFormData.TravelModes = "";
  //   }
  //   if (this.testTypeId == 2) {
  //     if (this.testLink == "" || this.testLink == undefined) {
  //       flag = 1;
  //       this.checkTestLink = "1";
  //     }
  //     else {
  //       this.checkTestLink = "";
  //     }
  //   }
  //   else {
  //     this.checkTestLink = "";
  //   }
  //   if (this.fTestDate.nativeElement.value == "") {
  //     flag = 1;
  //     this.checkTestFromDate = "1";
  //   }
  //   else {
  //     this.checkTestFromDate = "";
  //   }
  //   if (this.tTestDate.nativeElement.value == "") {
  //     flag = 1;
  //     this.checkTestToDate = "1";
  //   }
  //   else {
  //     this.checkTestToDate = "";
  //   }
  //   if (this.testVenueName == undefined) {
  //     if (this.testScheduleFormData.TestVenueName == "") {
  //       flag = 1;
  //       this.checkTestVenue = "1";
  //     }
  //   }
  //   else {
  //     this.checkTestVenue = "";
  //   }
  //   if (this.testVenueAddress == undefined) {
  //     if (this.testScheduleFormData.TestVenueAddress == "") {
  //       flag = 1;
  //       this.checkTestVenueAddress = "1";
  //     }
  //   }
  //   else {
  //     this.checkTestVenueAddress = "";
  //   }
  //   // if ((this.testInstituteEmail == "" || this.testInstituteEmail == undefined)&&(this.testTypeId != 2)) {
  //   //   flag = 1;
  //   //   this.checktestInstituteEmail = "1";
  //   // }
  //   if(this.testInstituteEmail == "" || this.testInstituteEmail == undefined) {
  //     this.checktestInstituteEmail = "";
  //   }
  //   if (this.testContactName == "" || this.testContactName == undefined) {
  //     flag = 1;
  //     this.checkTestContactName = "1";
  //   }
  //   else {
  //     this.checkTestContactName = "";
  //   }
  //   if (this.testContactNo == "" || this.testContactNo == undefined) {
  //     flag = 1;
  //     this.checkTestContactNo = "1";
  //   }
  //   else {
  //     this.checkTestContactNo = "";
  //   }

  //   if (this.tTestDate.nativeElement.value < this.fTestDate.nativeElement.value) { //Added by Arg
  //     this.notificationService.showError("To Date Can't be less than From Date !! Please provide actual date", "Error");
  //     flag = 1
  //   }
  //   if (this.isTestTravel == true) {
  //     if (this.testScheduleFormData.TravelModes == "" || this.testScheduleFormData.TravelModes == undefined) {
  //       jQuery(".ddltravelmode").addClass("is-invalid");
  //       flag = 1;
  //     }
  //     else {
  //       jQuery(".ddltravelmode").removeClass("is-invalid");
  //     }
  //   }
  //   if (flag == 0) {
  //     this.stepCount = 2;
  //     if (this.selectedTestEmailTemplateId != undefined) {
  //       setTimeout(() => {
  //         jQuery(".ddltestemailtemplate").selectpicker("val", this.selectedTestEmailTemplateId);
  //         jQuery('.ddltestemailtemplate').selectpicker('refresh');
  //       });
  //       this.changeTestEmailTemplate();
  //     }
  //     else {
  //       setTimeout(() => {
  //         jQuery('.ddltestemailtemplate').selectpicker('refresh');
  //       });
  //     }
  //   }
  //   else {

  //   }
  // }
  btnTestNext() {         // By  Piu on 05-08-2023
    var flag = 0;
    var travelmode = jQuery(".ddltravelmode").selectpicker('val');
    this.selectedTravelModeTestArray = travelmode;
    this.testScheduleFormData.TestTypeId = this.testTypeId;
    this.testScheduleFormData.TestLink = this.testLink;
    this.testScheduleFormData.TestFromDate = this.fTestDate.nativeElement.value;
    this.testFromDateTime = this.fTestDate.nativeElement.value;  // 15-03-2023
    this.testScheduleFormData.TestToDate = this.tTestDate.nativeElement.value;
    this.testToDateTime = this.tTestDate.nativeElement.value;   // 15-03-2023
    this.testScheduleFormData.TestVenueName = this.selectedTestVenueName;
    this.testScheduleFormData.TestVenueAddress = this.selectedTestVenueAddress;
    this.testScheduleFormData.TestContactName = this.testContactName;
    //this.testScheduleFormData.TestInstituteEmail = this.testInstituteEmail;
    this.testScheduleFormData.TestContactNo = this.testContactNo;
    this.testScheduleFormData.IsTestTravel = this.isTestTravel;
    if (this.isTestTravel == true) {
      if (this.selectedTravelModeTestArray == null) {
        this.testScheduleFormData.TravelModes = "";
      }
      else {
        this.testScheduleFormData.TravelModes = this.selectedTravelModeTestArray.join();
      }
    }
    else {
      this.testScheduleFormData.TravelModes = "";
    }
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
    if (this.testVenueName == undefined) {
      if (this.testScheduleFormData.TestVenueName == "") {
        flag = 1;
        this.checkTestVenue = "1";
      }
    }
    else {
      this.checkTestVenue = "";
    }
    if (this.testVenueAddress == undefined) {
      if (this.testScheduleFormData.TestVenueAddress == "") {
        flag = 1;
        this.checkTestVenueAddress = "1";
      }
    }
    else {
      this.checkTestVenueAddress = "";
    }
    // if ((this.testInstituteEmail == "" || this.testInstituteEmail == undefined)&&(this.testTypeId != 2)) {
    //   flag = 1;
    //   this.checktestInstituteEmail = "1";
    // }
    if (this.testInstituteEmail == "" || this.testInstituteEmail == undefined) {
      this.checktestInstituteEmail = "";
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

    //if (this.tTestDate.nativeElement.value < this.fTestDate.nativeElement.value) { //Added by Arg
    //  this.notificationService.showError("To Date Can't be less than From Date !! Please provide actual date", "Error");
    //  flag = 1
    //}
    var newFromDateTime, newToDateTime;
    if (this.tTestDate.nativeElement.value.length > 0) {
      var toDateTime = this.tTestDate.nativeElement.value.split(" ");
      var toDate = toDateTime[0].split("-");
      var toTime = toDateTime[1].split(":");
      newToDateTime = new Date(Number(toDate[2]), Number(toDate[1]) - 1, Number(toDate[0]), Number(toTime[0]), Number(toTime[1]), 0, 0);
    }

    if (this.fTestDate.nativeElement.value.length > 0) {
      var fromDateTime = this.fTestDate.nativeElement.value.split(" ");
      var fromDate = fromDateTime[0].split("-");
      var fromTime = fromDateTime[1].split(":");
      newFromDateTime = new Date(Number(fromDate[2]), Number(fromDate[1]) - 1, Number(fromDate[0]), Number(fromTime[0]), Number(fromTime[1]), 0, 0);
    }
    if (newToDateTime < newFromDateTime) {
      this.notificationService.showError("To Date Time Can't be less than From Date Time !! Please provide actual date", "Error");
      flag = 1
    }
    if (this.isTestTravel == true) {
      if (this.testScheduleFormData.TravelModes == "" || this.testScheduleFormData.TravelModes == undefined) {
        jQuery(".ddltravelmode").addClass("is-invalid");
        flag = 1;
      }
      else {
        jQuery(".ddltravelmode").removeClass("is-invalid");
      }
    }
    if (flag == 0) {
      this.stepCount = 2;
      if (this.selectedTestEmailTemplateId != undefined) {
        setTimeout(() => {
          jQuery(".ddltestemailtemplate").selectpicker("val", this.selectedTestEmailTemplateId);
          jQuery('.ddltestemailtemplate').selectpicker('refresh');
        });
        this.changeTestEmailTemplate();
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
    // var hruserid = jQuery(".ddlinterviewhrpanel").selectpicker('val');
    // this.selectedPanelHR = hruserid;
    // var paneluserid = jQuery(".ddlinterviewfunctionpanel").selectpicker('val');
    // this.selectedPanelFunction = paneluserid;
    var travelmode = jQuery(".ddltravelmode").selectpicker('val');
    this.selectedTravelModeArray = travelmode;
    this.interviewScheduleFormData.VerticalId = this.selectedInterviewVerticalId;
    this.interviewScheduleFormData.FunctionId = this.selectedInterviewFunctionId;
    this.interviewScheduleFormData.InterviewTypeId = Number(this.interviewTypeId);
    this.interviewScheduleFormData.InterviewId = this.selectedInterviewId;
    if (this.interviewLink != undefined) {
      this.interviewScheduleFormData.InterviewLink = this.interviewLink;
    }
    else {
      this.interviewScheduleFormData.InterviewLink = "";
    }

    this.interviewScheduleFormData.InterviewRoomId = this.selectedInterViewRoom;
    this.interviewScheduleFormData.FromDate = this.fInterviewDate.nativeElement.value;
    this.interviewScheduleFormData.ToDate = this.tInterviewDate.nativeElement.value;
    this.interviewScheduleFormData.VenueName = this.selectedInterviewVenueName;
    this.interviewScheduleFormData.InterviewVenueAddress = this.selectedInterviewVenueAddress;//Piu
    this.interviewScheduleFormData.InterviewSlot = "0"; //this.selectedSlot;

    // if (this.selectedPanelHR == null) {
    //   this.interviewScheduleFormData.HRAutoUserIds = "";
    // }
    // else {
    //   this.interviewScheduleFormData.HRAutoUserIds = this.selectedPanelHR.join(); //this.selectedInterViewHR;
    // }
    // if (this.selectedPanelFunction == null) {
    //   this.interviewScheduleFormData.InterviewerAutoUserIds = "";
    // }
    // else {
    //   this.interviewScheduleFormData.InterviewerAutoUserIds = this.selectedPanelFunction.join(); //this.selectedInterViewFunction;
    // }
    this.interviewScheduleFormData.IsTravel = this.isInterviewTravel;
    if (this.isInterviewTravel == true) {
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
    if (this.InterviewVenueName == undefined) {
      if (this.interviewScheduleFormData.VenueName == "") {
        flag = 1;
        this.checkInterviewVenue = "1";
      }
    }
    else {
      this.checkInterviewVenue = "";
    }
    if (this.tInterviewDate.nativeElement.value < this.fInterviewDate.nativeElement.value) { //added by Arg
      this.notificationService.showError("To Date Can't be less than From Date !! Please provide actual date", "Error");
      flag = 1
    }
    // if (this.selectedInterviewId == undefined) {
    //   flag = 1;
    //   jQuery(".ddlinterviewid").addClass("is-invalid");
    // }
    // else {
    //   jQuery(".ddlinterviewid").removeClass("is-invalid");
    // }
    // if (this.selectedInterViewRoom == undefined) {
    //   flag = 1;
    //   jQuery(".ddlinterviewroom").addClass("is-invalid");
    // }
    // else {
    //   jQuery(".ddlinterviewroom").removeClass("is-invalid");
    // }
    // if (this.interviewScheduleFormData.HRAutoUserIds == "" || this.interviewScheduleFormData.HRAutoUserIds == undefined) {
    //   flag = 1;
    //   jQuery(".ddlinterviewhrpanel").addClass("is-invalid");
    // }
    // else {
    //   jQuery(".ddlinterviewhrpanel").removeClass("is-invalid");
    // }
    // if (this.interviewScheduleFormData.InterviewerAutoUserIds == "" || this.interviewScheduleFormData.InterviewerAutoUserIds == undefined) {
    //   flag = 1;
    //   jQuery(".ddlinterviewfunctionpanel").addClass("is-invalid");
    // }
    // else {
    //   jQuery(".ddlinterviewfunctionpanel").removeClass("is-invalid");
    // }
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
      if (this.interviewScheduleFormData.TravelModes == "" || this.interviewScheduleFormData.TravelModes == undefined) {
        jQuery(".ddltravelmode").addClass("is-invalid");
        flag = 1;
      }
      else {
        jQuery(".ddltravelmode").removeClass("is-invalid");
      }
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
  btnTalkNext() {
    var flag = 0;
    this.talkScheduleFormData.TalkTypeId = this.talkTypeId;
    this.talkScheduleFormData.TalkLink = this.talkLink;
    this.talkScheduleFormData.TalkFromDate = this.fTalkDate.nativeElement.value;
    this.talkScheduleFormData.TalkToDate = this.tTalkDate.nativeElement.value;
    this.talkScheduleFormData.TalkVenueName = this.talkVenueName;
    this.talkScheduleFormData.TalkContactName = this.talkContactName;
    this.talkScheduleFormData.TalkContactNo = this.talkContactNo;
    if (this.talkTypeId == 2) {
      if (this.talkLink == "" || this.talkLink == undefined) {
        flag = 1;
        this.checkTalkLink = "1";
      }
      else {
        this.checkTalkLink = "";
      }
    }
    else {
      this.checkTalkLink = "";
    }
    if (this.fTalkDate.nativeElement.value == "") {
      flag = 1;
      this.checkTalkFromDate = "1";
    }
    else {
      this.checkTalkFromDate = "";
    }
    if (this.tTalkDate.nativeElement.value == "") {
      flag = 1;
      this.checkTalkToDate = "1";
    }
    else {
      this.checkTalkToDate = "";
    }
    if (this.talkVenueName == undefined || this.talkVenueName == "") {
      flag = 1;
      this.checkTalkVenue = "1";
    }
    else {
      this.checkTalkVenue = "";
    }
    if (this.talkContactName == "" || this.talkContactName == undefined) {
      flag = 1;
      this.checkTalkContactName = "1";
    }
    else {
      this.checkTalkContactName = "";
    }
    if (this.talkmailid == "" || this.talkmailid == undefined) {
      flag = 1;
      this.checkTalkMailId = "1";
    }
    else {
      this.checkTalkMailId = "";
    }
    if (this.talkContactNo == "" || this.talkContactNo == undefined) {
      flag = 1;
      this.checkTalkContactNo = "1";
    }
    else {
      this.checkTalkContactNo = "";
    }

    //--------------------------------------------
    if (flag == 0) {
      this.stepCount = 2;
      this.changetalkEmailTemplate();
      // if(this.talkEmailTemplateDescription == "" || this.talkEmailTemplateDescription==undefined){
      //   flag=1;
      //   this.checkTalkEmailTemplate="1";
      // }
      // else{
      //   this.checkTalkEmailTemplate="";
      // }
      // if (this.selectedTalkEmailTemplateId != undefined) {
      //   setTimeout(() => {
      //     jQuery(".ddltalkemailtemplate").selectpicker("val", this.selectedTalkEmailTemplateId);
      //     jQuery('.ddltestemailtemplate').selectpicker('refresh');
      //   });
      //   this.changeTestEmailTemplate();
      // }
      // else {
      //   setTimeout(() => {
      //     jQuery('.ddltestemailtemplate').selectpicker('refresh');
      //   });
      // }
    }
    // else {

    // }
  }
  btnTestBack() {
    this.loadDateTimePickerBack();
    this.stepCount = 1;
    setTimeout(() => {
        jQuery("#fromdatetimepik").data("DateTimePicker").date(this.testScheduleFormData.TestFromDate);
        jQuery("#todatetimepik").data("DateTimePicker").date(this.testScheduleFormData.TestToDate);
    });
    setTimeout(() => {
      jQuery(".ddltravelmode").selectpicker("val", this.selectedTravelModeTestArray);
      //jQuery('.ddlinterviewhrpanel').selectpicker('refresh');
    });
  }
  loadDateTimePickerBack() {
    setTimeout(() => {
      jQuery('.dateTimepik').datetimepicker(
        {
          format: 'DD-MM-YYYY HH:mm',
          //minDate: new Date().setDate(new Date().getDate()),
          // sideBySide: false
        }
      );
      jQuery('.timepik').datetimepicker(
        {
          format: 'hh:mm'
        }
      );
    });
  }
  btnTalkBack() {
    this.loadDateTimePicker();
    this.stepCount = 1;
    setTimeout(() => {
      jQuery("#tfromdatetimepik").data("DateTimePicker").date(this.talkScheduleFormData.TalkFromDate);
      jQuery("#ttodatetimepik").data("DateTimePicker").date(this.talkScheduleFormData.TalkToDate);
    });
  }

  btnInterviewBack() {
    this.loadDateTimePickerBack();
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
    }
    else {
      this.isOnlineTest = true;
      this.checkTestLink = "";
      this.isTestTravel = false;
    }
  }
  changeTalkType() {
    if (this.talkTypeId == 1) {
      this.isOnlineTest = false;
      this.checkTestLink = "";
    }
    else {
      this.isOnlineTest = true;
      this.checkTestLink = "";
      this.isTestTravel = false;
    }
  }
  changeInterviewType() {
    if (this.interviewTypeId == 1) {
      this.isOnlineTest = false;
      this.checkInterviewLink = "";
      this.searchInterviewEmailTemplate.templateTypeId = 54;
    }
    else {
      this.isOnlineTest = true;
      this.checkInterviewLink = "";
      this.isInterviewAccomodation = false;
      this.interviewAccomodationDetails = "";
      this.isInterviewTravel = false;
      this.searchInterviewEmailTemplate.templateTypeId = 55;
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
  closePreplacementModal() {
    this.resetPrePlacementForm();
    jQuery("#preplacementModal").modal('toggle');
  }
  resetTestForm() {
    this.testScheduleFormData.TestTypeId = 1;
    this.testScheduleFormData.TestLink = "";
    this.testScheduleFormData.TestFromDate = "";
    this.testScheduleFormData.TestToDate = "";
    this.testScheduleFormData.TestVenueName = "";
    this.testScheduleFormData.TestVenueAddress = "";
    this.testScheduleFormData.TestContactName = "";
    this.testScheduleFormData.TestInstituteEmail = "";
    this.testScheduleFormData.TestContactNo = "";
    this.testScheduleFormData.IsTestTravel = false;
    this.testScheduleFormData.TestEmailTemplateId = undefined;
    this.testScheduleFormData.TestEmailTemplate = "";
    this.testScheduleFormData.EmailId = "";
    this.testTypeId = 0;
    this.selectedTestVenueName = "";
    this.selectedTestVenueAddress = "";
    this.testLink = "";
    this.testVenueName = "";
    this.testVenueAddress = "";
    this.testContactNo = "";
    this.testContactName = "";
    this.testInstituteEmail = "";
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
    this.interviewScheduleFormData.VenueName = "";
    this.interviewScheduleFormData.InterviewVenueAddress = "";     // By Sayandeep on 05-08-2023
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
    //this.interviewScheduleFormData.InterviewId = undefined;
    this.functions = [];
    this.interviewTypeId = 0;
    this.interviewLink = "";
    this.selectedInterviewId = undefined;
    this.selectedInterViewRoom = undefined;
    this.selectedInterviewVenueId = undefined;
    this.selectedInterviewVenueName = undefined;
    this.selectedInterviewVenueAddress = undefined;  // By Sayandeep on 05-08-2023
    this.selectedInterViewHR = "";
    this.selectedInterViewInterview = "";
    this.selectedInterViewFunction = "";
    this.selectedInterviewVerticalId = undefined;
    this.selectedInterviewFunctionId = undefined;
    this.testContactName = "";
    this.InterviewVenueName = ""
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
  resetPrePlacementForm() {
    this.talkScheduleFormData.TalkTypeId = 1;
    this.talkScheduleFormData.TalkLink = "";
    this.talkScheduleFormData.TalkFromDate = "";
    this.talkScheduleFormData.TalkToDate = "";
    this.talkScheduleFormData.TalkVenueName = "";
    this.talkScheduleFormData.TalkContactName = "";
    this.talkScheduleFormData.TalkContactNo = "";
    this.talkScheduleFormData.TalkEmailTemplate = "";
    this.talkTypeId = 0;
    this.talkLink = "";
    this.talkVenueName = "";
    this.talkContactNo = "";
    this.talkContactName = "";
    this.talkEmailTemplateDescription = "";

    this.isOnlineTest = false;
    this.stepCount = 1;
    setTimeout(() => {
      jQuery("#tfromdatetimepik").data("DateTimePicker").date(null);
      jQuery("#ttodatetimepik").data("DateTimePicker").date(null);
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
    this.interviewService.getAllInterviewPanelMember(this.searchInterviewPanelMember).subscribe((result) => {
      if (result) {
        this.interviewPanelMembersHR = result;
        this.interviewPanelMembersHR = this.interviewPanelMembersHR.filter(x => x.panelTypeId == 2);
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

  onInterviewTravelChange() {
    setTimeout(() => {
      jQuery(".ddltravelmode").selectpicker("refresh");
    });
  }

  changeInterviewEmailTemplate() {
    // By Sayandeepon 05-08-2023
    var Funcname = this.functions.filter(e => (e.functionId == this.interviewScheduleFormData.FunctionId));

    if (this.selectedInterviewEmailTemplateId != undefined) {
      var venueaddress = this.InterviewVenueName;
      var templatedescription = this.interviewemailTemplates.filter(x => x.templateId == this.selectedInterviewEmailTemplateId)[0].templateDescription;
      templatedescription = templatedescription.replace("@@DateTime", this.interviewScheduleFormData.FromDate + " - " + this.interviewScheduleFormData.ToDate);
      templatedescription = templatedescription.replace("@@VenueName", this.interviewScheduleFormData.VenueName);
      templatedescription = templatedescription.replace("@@VenueAddress", this.interviewScheduleFormData.InterviewVenueAddress);
      //templatedescription = templatedescription.replace("@@Function", this.requisitionFunctionName);  // By Sayandeepon 05-08-2023
      templatedescription = templatedescription.replace("@@Function", Funcname[0].functionName);        // By Sayandeepon 05-08-2023
      //templatedescription = templatedescription.replace("@@InterviewLink", this.interviewScheduleFormData.InterviewLink);
      templatedescription = templatedescription.replace("@@InterviewLink", this.emailIdFront + "interviewacknowledgement?CandiateId=@~@CandidateId");
      if (this.isInterviewTravel) {
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
        templatedescription = templatedescription.replace("@@Travel", "<h6 style='margin-bottom: 5px;'>Travel Eligibility/ Reimbursement:</h6> <p>Eligible mode of transport : " + travelModes.substring(2, 1000) + "<p>");
      }
      else {
        templatedescription = templatedescription.replace("@@Travel", "");
      }
      if (this.isInterviewAccomodation) {
        templatedescription = templatedescription.replace("@@Accomodation", "<h6 style='margin-bottom: 5px;'>Accomodation Details:</h6> <p>" + this.interviewAccomodationDetails + "<p>");
      }
      else {
        templatedescription = templatedescription.replace("@@Accomodation", "");
      }
    }

    //templatedescription = templatedescription.replace("@@PositionDepartment", this.requisitionPositionName + ", " + this.requisitionDepartmentName);
    //templatedescription = templatedescription.replace("@@Function", this.selectedInterviewFunctionId.functionName);


    //  templatedescription=templatedescription.replace("@@ContactPerson",this.testScheduleFormData.TestContactName);
    //  templatedescription=templatedescription.replace("@@ContactNumber",this.testScheduleFormData.TestContactNo);

    setTimeout(() => {
      jQuery(".cke_wysiwyg_div").html("");
      jQuery(".cke_wysiwyg_div").html(templatedescription);
    });
    this.interviewEmailTemplateDescription = templatedescription
    this.interviewEmailTemplateDescription2 = templatedescription
  }
  changetalkEmailTemplate() {
    var venueaddress = this.talkVenueName;
    var templatedescription = this.talkemailTemplates[0].templateDescription;
    templatedescription = templatedescription.replace("@@DateTime", this.talkScheduleFormData.TalkFromDate + " - " + this.talkScheduleFormData.TalkToDate);
    templatedescription = templatedescription.replace("@@Venue", this.talkVenueName);
    templatedescription = templatedescription.replace("@@VenueAddress", venueaddress);
    templatedescription = templatedescription.replace("@@InterviewLink", this.talkLink);

    setTimeout(() => {
      jQuery(".cke_wysiwyg_div").html("");
      jQuery(".cke_wysiwyg_div").html(templatedescription);
    });
    this.talkEmailTemplateDescription = templatedescription
  }
  scheduleTest(candidateId, emailId, candidateNo) {
    this.testheader = "Schedule Test"
    this.candidateIds = candidateId.toString();
    this.EmailId = emailId;
    this.openTestScheduleModal()
  }
  rescheduleTest(candidateId, emailId) {
    debugger;
    this.testheader = "Reschedule Test"
    this.EmailId = emailId;
    this.checkTestLink = "";
    this.checkTestFromDate = "";
    this.checkTestToDate = "";
    this.checkTestContactNo = "";
    this.checkTestContactName = "";
    this.checkTestVenue = "";
    this.checkTestEmailTemplate = "";
    this.searchTestScheduleDetail.candidateId = candidateId;
    if (this.requisitionDetailId != undefined) {
      this.searchTestScheduleDetail.requisitionDetailId = this.requisitionDetailId;
    }
    else {
      this.searchTestScheduleDetail.requisitionDetailId = 0;
    }
    this.campusRequisitionService.getAllCampusTestScheduleDetail(this.searchTestScheduleDetail).subscribe((result) => {
      if (result) {
        this.testScheduleDetail = result;
        this.rescheduleCandidateId = "" + candidateId;
        this.candidateIds = this.rescheduleCandidateId;
        this.testTypeId = this.testScheduleDetail.testTypeId;
        this.testLink = this.testScheduleDetail.testLink;
        //this.selectedTestVenueId = this.testScheduleDetail.venueId;
        this.selectedTestVenueName = this.testScheduleDetail.venueName;
        this.selectedTestVenueAddress = this.testScheduleDetail.venueAddress;
        this.testContactNo = this.testScheduleDetail.contactNo;
        this.testContactName = this.testScheduleDetail.contactPersonName;
        this.testInstituteEmail = this.testScheduleDetail.instituteEmailId;
        this.testEmailTemplateDescription = "";
        this.isTestTravel = this.testScheduleDetail.isTravel;
        this.selectedTestEmailTemplateId = this.testScheduleDetail.emailTemplateId;
        this.testScheduleFormData.TestFromDate = this.testScheduleDetail.fromDate;
        this.testScheduleFormData.TestToDate = this.testScheduleDetail.toDate;
        //this.testScheduleFormData.TestVenueId = this.selectedTestVenueId;
        this.testScheduleFormData.TestVenueName = this.testVenueName;
        this.testScheduleFormData.TestVenueAddress = this.testVenueAddress;
        this.testScheduleFormData.TestContactName = this.testContactName;
        this.testScheduleFormData.TestInstituteEmail = this.testInstituteEmail;
        this.testScheduleFormData.TestContactNo = this.testContactNo;
        var travelmodes = this.testScheduleDetail.travelModes.split(",");
        if (this.testTypeId == 1) {
          document.getElementById("radio1").click();
          this.isOnlineTest = false;
        }
        else {
          document.getElementById("radio1").click();
          this.isOnlineTest = true;
        }
        setTimeout(() => {
          jQuery(".ddltravelmode").selectpicker("val", travelmodes);
        });
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
  cancelTest(candidateId, emailId, candidateNo, fullName) {
    this.Heading = "Cancel Test"
    this.candidateIds = candidateId.toString();
    this.EmailId = emailId;
    this.CandidateName = fullName;
  }
  //akash
  // getAllSelectionGuideInterview() {
  //   this.selectionGuideInterview = [];
  //   if(this.requisitionDetailId!= undefined){
  //     this.searchSelectionGuideInterview.requisitionDetailId = this.requisitionDetailId;
  //   }
  //   else{
  //     this.searchSelectionGuideInterview.requisitionDetailId= 0 ;
  //   }
  //  // this.searchSelectionGuideInterview.requisitionDetailId = this.requisitionDetailId;
  //   this.searchSelectionGuideInterview.hiringStatusId = this.currentHiringStatus;
  //   this.selectionGuideService.getSelectionGuideInterview(this.searchSelectionGuideInterview).subscribe((result) => {
  //     if (result) {
  //       this.selectionGuideInterview = result;
  //       //console.log(this.selectionGuideInterview);
  //     }
  //     else {
  //       this.selectionGuideInterview = [];
  //     }
  //   }, error => {
  //     console.log(error);
  //   }, () => {
  //     this.loadSelectPicker();
  //   });
  // }
  scheduleInterview(candidateId, emailId) {
    this.candidateIds = candidateId.toString();
    this.EmailId = emailId;
    this.openInterviewModal()
  }
  rescheduleInterview(candidateId, emailId, candidateNo, hiringStatusId) {
    this.currentHiringStatus = hiringStatusId;
    this.EmailId = emailId;
    this.getAllInterviewPanelMemberHR()
    //this.getAllSelectionGuideInterview();    
    this.checkInterviewFromDate = "";
    this.checkInterviewToDate = "";
    this.checkInterviewLink = "";
    this.checkAccomodationDetails = "";
    this.InterviewVenueName = "";
    this.searchInterviewScheduleDetail.candidateId = candidateId;
    if (this.requisitionDetailId != undefined) {
      this.searchInterviewScheduleDetail.requisitionDetailId = this.requisitionDetailId;
    }
    else {
      this.searchInterviewScheduleDetail.requisitionDetailId = 0;
    }
    this.selectedInterViewHR = [];
    this.selectedInterViewInterview = [];
    //this.searchInterviewScheduleDetail.requisitionDetailId = this.requisitionDetailId;
    this.campusRequisitionService.CampusgetInterviewScheduleDetailForCandidate(this.searchInterviewScheduleDetail).subscribe((result) => {
      if (result) {

        this.interviewScheduleDetail = result;
        this.rescheduleCandidateId = "" + candidateId;
        this.interviewTypeId = this.interviewScheduleDetail.interviewTypeId;
        this.interviewLink = this.interviewScheduleDetail.interviewLink;
        //this.selectedInterviewVenueId = this.interviewScheduleDetail.venueId;
        this.selectedInterviewVenueName = this.interviewScheduleDetail.venueName;
        this.selectedInterviewVenueAddress = this.interviewScheduleDetail.venueAddress;
        this.selectedInterviewId = this.interviewScheduleDetail.interviewId;
        //this.selectedInterViewHR=[Number(this.interviewScheduleDetail.hrAutoUserIds)]
        var interviewHr = this.interviewScheduleDetail.hrAutoUserIds.split(",");
        var aarayhr = []
        for (var i = 0; i < interviewHr.length; i++) {
          aarayhr.push(Number(interviewHr[i]));
        }
        this.selectedInterViewHR = aarayhr;

        var interviewPanel = this.interviewScheduleDetail.interviewerAutoUserIds.split(",");
        var aarayPanel = []
        for (var i = 0; i < interviewPanel.length; i++) {
          aarayPanel.push(Number(interviewPanel[i]));
        }
        this.selectedInterViewInterview = aarayPanel;


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
        this.selectedInterviewVerticalId = this.interviewScheduleDetail.verticalId;
        this.getAllFunction(this.interviewScheduleDetail.verticalId);
        this.selectedInterviewFunctionId = this.interviewScheduleDetail.functionId;
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
        this.getAllInterviewEmailTemplate();
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

  // rescheduleInterview(candidateId, hiringStatusId) {
  //   this.currentHiringStatus = hiringStatusId;
  //   this.getAllSelectionGuideInterview();
  //   console.log(this.selectionGuideInterview);
  //   this.checkInterviewFromDate = "";
  //   this.checkInterviewToDate = "";
  //   this.checkInterviewLink = "";
  //   this.checkAccomodationDetails = "";
  //   this.searchInterviewScheduleDetail.candidateId = candidateId;
  //   this.searchInterviewScheduleDetail.campusLinkId = this.campusLinkId;
  //   this.interviewScheduleService.getInterviewScheduleDetail(this.searchInterviewScheduleDetail).subscribe((result) => {
  //     if (result) {
  //       this.interviewScheduleDetail = result;
  //       console.log(this.interviewScheduleDetail);
  //       this.rescheduleCandidateId = "" + candidateId;
  //       this.interviewTypeId = this.interviewScheduleDetail.interviewTypeId;
  //       this.interviewLink = this.interviewScheduleDetail.interviewLink;
  //       this.selectedInterviewVenueId = this.interviewScheduleDetail.venueId;
  //       this.selectedInterviewId = this.interviewScheduleDetail.interviewId;
  //       this.selectedInterViewRoom = this.interviewScheduleDetail.interviewRoomId;
  //       this.interviewEmailTemplateDescription = "";
  //       this.isInterviewTravel = this.interviewScheduleDetail.isTravel;
  //       this.selectedInterviewEmailTemplateId = this.interviewScheduleDetail.emailTemplateId;
  //       this.interviewScheduleFormData.FromDate = this.interviewScheduleDetail.fromDate;
  //       this.interviewScheduleFormData.ToDate = this.interviewScheduleDetail.toDate;
  //       this.isInterviewAccomodation = this.interviewScheduleDetail.isAccomodation;
  //       this.interviewAccomodationDetails = this.interviewScheduleDetail.accomodationDetails;
  //       this.isFormAnexture = this.interviewScheduleDetail.isFormAnexture;
  //       var hruserid = this.interviewScheduleDetail.hrAutoUserIds.split(",");
  //       var paneluserid = this.interviewScheduleDetail.interviewerAutoUserIds.split(",");
  //       var travelmodes = this.interviewScheduleDetail.travelModes.split(",");

  //       this.selectedSlot = this.interviewScheduleDetail.interviewSlot;
  //       if (this.interviewTypeId == 1) {
  //         document.getElementById("interviewradio1").click();
  //         this.isOnlineTest = false;
  //       }
  //       else {
  //         document.getElementById("interviewradio2").click();
  //         this.isOnlineTest = true;
  //       }

  //       setTimeout(() => {
  //         jQuery(".ddlinterviewhrpanel").selectpicker("val", hruserid);
  //       });

  //       setTimeout(() => {
  //         jQuery(".ddlinterviewfunctionpanel").selectpicker("val", paneluserid);
  //       });

  //       setTimeout(() => {
  //         jQuery(".ddltravelmode").selectpicker("val", travelmodes);
  //       });

  //       this.loadDateTimePicker();
  //       setTimeout(() => {
  //         jQuery("#ifromdatetimepik").data("DateTimePicker").date(this.interviewScheduleDetail.fromDate);
  //         jQuery("#itodatetimepik").data("DateTimePicker").date(this.interviewScheduleDetail.toDate);
  //       });
  //       this.changeInterviewEmailTemplate();
  //       this.stepCount = 1;
  //     }
  //     else {
  //       this.interviewScheduleDetail = null;
  //     }
  //   }, error => {
  //     console.log(error);
  //   }, () => {
  //     this.loadSelectPicker();
  //     this.loadDateTimePicker();
  //   });
  // }


  gotoInterviewHRFeedback(candidateid) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "cmviewhrfeedback");
    this.persistance.set('candidateId', candidateid);
    this._route.navigate(['/app/hr-interview-feedback/view']);
  }

  gotoApplicationForm(candidateId) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "cmrequisitionlist");
    this.persistance.set('candidateId', candidateId);
    this._route.navigate(['/app/candidate-application/view']);
  }


  gotoInterviewFeedback(candidateId) {
    jQuery(".custom-menu").hide();
    this.persistance.set('paramid1', 0);
    this.persistance.set('paramid2', candidateId);
    this.persistance.set('paramid3', 0);
    this._route.navigate(['/app/view-interview-feedback']);
  }

  onUpdateFunction() {
    var data = {
      CampusLinkId: this.campusLinkId,
      CandidateId: this.campusSelectedCandidateId,
      VerticalId: this.selectedCampusVerticalId,
      FunctionId: this.selectedCampusFunctionId,
      RequisitionDetailId: this.selectedFunctionwiseRequisition,
      CreatedBy: this.createdBy
    }
    this.campusRequisitionService.updateCampusCampusCandidateVerticalFunction(data).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          this.candidateIds = "";
          this.closeFunctionModal();
          this.prevselectedstatus = 0;
          this.getFilterCandidateList();
          this.loadDataTable();
          jQuery("#chkAll").prop("checked", false);
        }
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  changeCampusVerticalFunction(verticalId) {
    this.campusverticalfunctions = [];
    this.campusVerticalpositions = [];
    this.campusfunctionLocations = [];
    this.campusverticalfunctions = this.campusfunctions.filter(x => x.verticalId == verticalId);
    this.campusVerticalpositions = this.campuspositions.filter(x => x.verticalId == verticalId);
    this.campusfunctionLocations = this.campuslocations.filter(x => x.verticalId == verticalId);
  }
  // changeCampusFuntionLocation(verticalId){
  //   this.campusfunctionLocations = [];
  //   this.campusfunctionLocations = this.campuslocations.filter(x => x.verticalId == verticalId)
  // }
  changeFunctionfordefine() {
    let obj = {
      CampusLinkId: this.campusLinkId,
      CandidateId: this.campusSelectedCandidateId,
      VerticalId: this.selectedCampusVerticalId,
      FunctionId: this.selectedCampusFunctionId
    }
    this.campusCommonService.getCampusFunctionwiseRequisition(obj).subscribe((response: any) => {
      if (response) {
        this.campusfuncwisereq = response;
      }
      else {
        this.campusfuncwisereq = [];
      }
    })
  }

  openFunctionModal(candidateId) {
    this.campusverticals = [];
    this.campusfunctions = [];
    this.campuslocations = [];
    this.campuspositions = [];
    this.campusSelectedCandidateId = candidateId;
    var searchdata = {
      campusLinkId: this.campusLinkId,
      candidateId: candidateId
    }
    this.campusRequisitionService.getCampusCampusCandidateVerticalFunction(searchdata).subscribe((result) => {
      if (result) {
        this.campusverticals = result.campusVertical;
        this.campusfunctions = result.campusFunction;
        // this.campuslocations = result.campusLocation;
        // this.campuspositions = result.campusPosition;
        this.mapListData = result.mappedList;
      }
      else {
        this.campusverticals = [];
        this.campusfunctions = [];
        this.campuslocations = [];
        this.campuspositions = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  closeFunctionModal() {
    this.campusverticals = [];
    this.campusfunctions = [];
    this.campuslocations = [];
    this.campuspositions = [];
    this.campusverticalfunctions = [];
    this.campusVerticalpositions = [];
    this.campusfunctionLocations = [];
    this.campusfuncwisereq = [];
    this.selectedCampusFunctionId = undefined;
    this.selectedCampusVerticalId = undefined;
    this.selectedCampusLocationId = undefined;
    this.selectedCampusPositionId = undefined;
    this.selectedFunctionwiseRequisition = undefined;
    jQuery("#functionModal").modal('toggle');
  }
  openRequisitionModal(verticalId, functionId, candidateId) {
    this.campusSelectedCandidateId = candidateId;
    this.campusrequisitionLists = [];
    var searchdata = {
      VerticalId: verticalId,
      FunctionId: functionId
    }
    this.campusRequisitionService.getCampusVerticalFunctionRequisition(searchdata).subscribe((result) => {
      if (result) {
        this.campusrequisitionLists = result;
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

  closeRequisitionModal() {
    this.campusrequisitionLists = [];
    this.selectedRequisitionDetailId = undefined;
    jQuery("#requisitionModal").modal('toggle');
  }

  onMapRequisition() {
    var data = {
      CandidateId: this.campusSelectedCandidateId,
      RequisitionDetailId: this.selectedRequisitionDetailId,
      CreatedBy: this.createdBy
    }
    this.campusRequisitionService.umapCampusCandidateRequisition(data).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          this.candidateIds = "";
          this.closeRequisitionModal();
          this.prevselectedstatus = 0;
          this.getFilterCandidateList();
          this.loadDataTable();
          jQuery("#chkAll").prop("checked", false);
        }
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  gotoCandidateDetail(data) {
    jQuery(".custom-menu").hide();
    setTimeout(() => {
      this.persistance.set('pagename', "talentpool");
      this.persistance.set('prevpagename', "campustalentpool");
      this.persistance.set('candidateId', data.candidateId);
      this.persistance.set('hiringstatus', data.hiringStatusName);
      this._route.navigate(['/app/talent-pool/candidate-detail']);
    });
  }

  gotoInterviewAssessment(data) {
    jQuery(".custom-menu").hide();
    setTimeout(() => {
      this.persistance.set('pagename', "talentpool");
      this.persistance.set('CampusLinkId', this.campusLinkId);
      this.persistance.set('candidateId', data.candidateId);
      this._route.navigate(['/app/campus/interview-assesment-list']);
    });
  }

  openInstitueModal(candidateId) {
    if (candidateId != -1) {
      this.selectedCandidateId = candidateId;
    }
    else {
      var value = "";
      for (var val of this.changeUniverSityNameArray) {
        value += val.candidateId + ",";
      }
      this.selectedCandidateId = value.replace(/,\s*$/, "");

    }

  }

  onInstitueUpdate() {
    if (this.NewInstituteName == undefined || this.NewInstituteName == "") {
      this.notificationService.showError("Please fill institute name", "")
    }
    else {
      var eligiblecandidates = this.candidates.filter(e => (e.checked == true));
      var candids = "";
      this.testmailIds = "";
      for (var i = 0; i < eligiblecandidates.length; i++) {
        candids = candids + "," + eligiblecandidates[i].candidateId;

      }
      var formData = {
        candidateId: candids.toString(),
        InstituteName: this.NewInstituteName
      }
      this.campusRequisitionService.updateCampusCandidateInstitute(formData).subscribe((response: any) => {
        if (response.successFlag == 1) {
          this.notificationService.showSuccess(response.msg, "Success");
          this.NewInstituteName = "";
          jQuery("#instituteModal").modal('toggle');
          this.getCandidateList();
          this.SpinnerService.hide();
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
      })


    }
  }

  closeInstituteModal() {
    this.NewInstituteName = "";
    jQuery("#instituteModal").modal('toggle');
  }

  gotoCandidateFeedback(data) {
    jQuery(".custom-menu").hide();
    setTimeout(() => {
      this.persistance.set('pagename', "cmviewassessment");
      this.persistance.set('candidateId', data.candidateId);
      this.persistance.set('requisitionDetailId', 0);
      this.persistance.set('interviewDetailId', 0);
      this._route.navigate(['/app/view-interview-feedback']);
    });
  }
  openOnEditModal(data) {
    var formData = {
      candidateId: data.candidateId
    }
    this.campuscandidateId = data.candidateId;
    this.campusRequisitionService.getCampusCampusProfileData(formData).subscribe((result) => {

      this.objModelForCampus = result.profileData[0];
      this.objModelForCampusdob = this.objModelForCampus.dob;
    })
  }
  highestQualification(data) {

  }
  openCancelTestModal() {
    this.Heading = "Cancel Test"
  }
  VisualOrder: any;
  onClickEditButton() {
    if (this.objModelForCampus.highestQualification == "-1") {
      this.VisualOrder = 1;
    }
    if (this.objModelForCampus.highestQualification == "1") {
      this.VisualOrder = 2;
    }
    if (this.objModelForCampus.highestQualification == "5") {
      this.VisualOrder = 3;
    }
    if (this.objModelForCampus.highestQualification == "2" || this.objModelForCampus.highestQualification == "4") {
      this.VisualOrder = 4;
    }
    if (this.objModelForCampus.highestQualification == "3" || this.objModelForCampus.highestQualification == "6") {
      this.VisualOrder = 5;
    }
    var value = {
      CandidateId: this.campuscandidateId,
      Name: this.objModelForCampus.fullName,
      Dob: this.dedob.nativeElement.value,
      EmailId: this.objModelForCampus.emailId,
      phoneno: this.objModelForCampus.phoneNo,
      hometwon: this.objModelForCampus.homeTown,
      highestQualification: this.objModelForCampus.highestQualification,
      VisualOrder: this.VisualOrder,
      Height: this.objModelForCampus.height,
      Weight: this.objModelForCampus.weight,
    }
    this.campusRequisitionService.updateCampusCandidateProfile(value).subscribe((response: any) => {
      if (response.successFlag == 1 || response.successFlag == 2) {
        this.notificationService.showSuccess(response.msg, "Success");

        this.SpinnerService.hide();
        this.closeEditModal();
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
    })
  }
  closeEditModal() {
    jQuery("#editProfileModal").modal('toggle');
  }
  cancelpreplacementTalkModal() {
    this.Heading = "Cancel PrePlacement";
  }
  cancelinterviewModal() {
    this.Heading = "Cancel Interview";
  }

  openModalForDecline(candidateId) {
    this.actionName = "Declined";
    this.declaineCandidateId = candidateId;
  }
  Heading: string;
  actionNameReject: string;
  rejectCandidateId: number;
  tabeName: string;
  openModalForReject(candidateId) {
    this.actionNameReject = "Reject";
    this.rejectCandidateId = candidateId;
  }
  openModalForCancelPrePlacement(candidateId, emailId, fullName) {
    this.Heading = "Cancel PrePlacement";
    this.candidateIds = candidateId.toString();
    this.EmailId = emailId;
    this.CandidateName = fullName;
  }
  openModalForCancelInterview(candidateId, emailId, fullName) {
    this.Heading = "Cancel Interview";
    this.candidateIds = candidateId.toString();
    this.EmailId = emailId;
    this.CandidateName = fullName;
  }
  openModalForTakeaction(candiadteId) {
    jQuery(".custom-menu").hide();
    this.takeactioncandidateId = candiadteId;
  }
  openOnEditCampusCandidateModal(candiadteId, emailId, candidateNo, fullName) {
    jQuery(".custom-menu").hide();
    this.editapplicationformcandidateid = candiadteId;
    this.canNo = candidateNo;
    this.canemail = emailId;
    this.canName = fullName;
  }
  openOnEditCampusCandidateModalforRegistration(candiadteId, emailId, candidateNo, fullName) {
    jQuery(".custom-menu").hide();
    this.editapplicationformcandidateid = candiadteId;
    this.canNo = candidateNo;
    this.canemail = emailId;
    this.canName = fullName;
  }
  Foreditingregistrationform() {
    debugger;
    var formdata = {
      AutoUserId: this.createdBy,
      CandidateId: this.editapplicationformcandidateid,
      FormtypeId: 1,
      Remarks: this.Registrationremarks,
      Name: this.canName,
      CandidateNo: this.canNo,
      EmailId: this.canemail
    }
    console.log("form", formdata)
    this.candidateService.editcampusCandidateregistrationform(formdata).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          this.Registrationremarks = null;
          jQuery("#editCampusCandidateModalforRegistration").modal('toggle');
          this.getFilterCandidateList();
          this.loadDataTable();
          //jQuery(".close").click();
        }
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  Foreditingapplicationform() {
    debugger;
    var formdata = {
      AutoUserId: this.createdBy,
      CandidateId: this.editapplicationformcandidateid,
      FormtypeId: 2,
      Remarks: this.Applicationremarks,
      Name: this.canName,
      CandidateNo: this.canNo,
      EmailId: this.canemail
    }
    this.candidateService.editcampusCandidateapplicationform(formdata).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          this.Applicationremarks = null;
          jQuery("#editCampusCandidateModal").modal('toggle');
          this.getFilterCandidateList();
          this.loadDataTable();
          //jQuery(".close").click();
        }
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  ForShortListCandidate() {
    var formdata = {
      CandidateId: this.takeactioncandidateId,
      HiringStatusId: 2
    }
    this.campusRequisitionService.updateCandidateRejctDecline(formdata).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");

          jQuery("#TakeactionModal").modal('toggle');
          this.getFilterCandidateList();
          this.loadDataTable();
          //jQuery(".close").click();
        }
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  ForRejectCandidate() {
    var formdata = {
      CandidateId: this.rejectCandidateId,
      HiringStatusId: 3,
      CreatedBy: this.createdBy,
      Remarks: this.rejectremarks
    }
    this.campusRequisitionService.updateCandidateRejctDecline(formdata).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");

          jQuery("#rejectModal").modal('toggle');
          this.getFilterCandidateList();
          this.loadDataTable();
          //jQuery(".close").click();
        }
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  onclickcancelplacement() {
    debugger;
    var eligiblecandidates = this.candidates.filter(e => (e.checked == true));
    var candids = "";
    var cannames = "";
    this.testmailIds = "";
    var institute = "";
    var course = "";
    var stream = "";
    for (var i = 0; i < eligiblecandidates.length; i++) {
      candids = candids + "," + eligiblecandidates[i].candidateId;
      cannames = cannames + "," + eligiblecandidates[i].fullName;
      this.testmailIds = this.testmailIds + "," + eligiblecandidates[i].emailId;
      institute = institute + "," + eligiblecandidates[i].institite;
      course = course + "," + eligiblecandidates[i].course;
      stream = stream + "," + eligiblecandidates[i].stream;
    }
    if ((this.candidateIds != undefined) && this.candidateIds != "") {
      candids = this.candidateIds;
    }
    if ((this.EmailId != undefined) && this.EmailId != "") {
      this.testmailIds = this.EmailId;
    }
    if ((this.CandidateName != undefined) && this.CandidateName != "") {
      cannames = this.CandidateName;
    }
    var cancelFormData = {
      CandidateIds: candids.startsWith(',') ? ((candids.split(',')).slice(1)).join(',') : candids,
      CandidateName: cannames.startsWith(',') ? ((cannames.split(',')).slice(1)).join(',') : cannames,
      Institute: institute.startsWith(',') ? ((institute.split(',')).slice(1)).join(',') : institute,
      Course: course.startsWith(',') ? ((course.split(',')).slice(1)).join(',') : course,
      Stream: stream.startsWith(',') ? ((stream.split(',')).slice(1)).join(',') : stream,
      EmailId: this.testmailIds.startsWith(',') ? ((this.testmailIds.split(',')).slice(1)).join(',') : this.testmailIds
    }
    console.log("c", cancelFormData)
    if (this.Heading == "Cancel PrePlacement") {
      this.campusRequisitionService.cancelPreplacementTalk(cancelFormData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");

            jQuery("#cancelModal").modal('toggle');
            this.getFilterCandidateList();
            this.loadDataTable();
            //jQuery(".close").click();
          }
        }
        else {
        }
      }, error => {
        console.log(error);
      }, () => {
      });
    }
    else if (this.Heading == "Cancel Test") {
      this.campusRequisitionService.cancelTestSchedule(cancelFormData).subscribe((result) => {
        debugger;
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            jQuery("#cancelModal").modal('toggle');
            this.getFilterCandidateList();
            this.loadDataTable();
            //jQuery(".close").click();
          }
        }
        else {
        }
      }, error => {
        console.log(error);
      }, () => {
      });
    }
    else if (this.Heading == "Cancel Interview") {
      this.campusRequisitionService.cancelInterview(cancelFormData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");

            jQuery("#cancelModal").modal('toggle');
            this.getFilterCandidateList();
            this.loadDataTable();
            //jQuery(".close").click();
          }
        }
        else {
        }
      }, error => {
        console.log(error);
      }, () => {
      });
    }
  }

  ProcessdeclineCandidate() {
    var formdata = {
      CandidateId: this.declaineCandidateId,
      HiringStatusId: 13,
      CreatedBy: this.createdBy,
      Remarks: this.declineremarks
    }
    this.campusRequisitionService.updateCandidateRejctDecline(formdata).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");

          jQuery("#declineModal").modal('toggle');
          this.getFilterCandidateList();
          this.loadDataTable();
          //jQuery(".close").click();
        }
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  viewapplicationform(candidateId) {
    jQuery(".custom-menu").hide();
    this.persistance.set('candidateId', candidateId);
    this.persistance.set('pagename', "candidateapplicationformview");
    // this.persistance.set('paramId', this.candidateProfile.requisitionDetailId);
    this._route.navigate(['/app/candidate-applicationformb/view']);
  }
  viewregistrationform(candidateId) {
    jQuery(".custom-menu").hide();
    this.persistance.set('candidateId', candidateId);
    this.persistance.set('pagename', "candidateregistrationformview");
    // this.persistance.set('paramId', this.candidateProfile.requisitionDetailId);
    this._route.navigate(['/app/view-campus-registration']);
  }
  downloadapplicationform(candidateId) {
    debugger;
    jQuery(".custom-menu").hide();
    this.candidateProfile = null;
    this.searchCandidateProfile.candidateId = candidateId;
    this.candidateService.getCampusCandidateProfile(this.searchCandidateProfile).subscribe((result) => {
      if (result) {
        this.candidateProfile = result;
        this.applicationFormData = this.candidateProfile;
        this.convertBase64CandidatePhoto(this.candidateProfile.candiadatePhoto)
        this.convertBase64CandidateSignature(this.candidateProfile.signature)
        this.fileName = this.candidateProfile.candidateId.toString() + "_ApplicationForm.pdf";
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
      if (this.applicationFormData != undefined) {
        this.pdfdownload();
      }
    });

  }

  //Piu Biswas
  openModalForEnableInterviewFeedback(candidateId, data) {
    debugger;
    this.CandidateId = candidateId;
    this.InterviewDetailId = 0;
    this.InterviewFeedbackName = data.interviewComName;
    this.CreatedBy = this.createdBy;
    this.IsEnable = 1;
  }
  //Piu Biswas
  openModalForDisableInterviewFeedback(candidateId, data) {
    debugger;
    this.CandidateId = candidateId;
    this.InterviewDetailId = 0;
    this.InterviewFeedbackName = data.interviewComName;
    this.CreatedBy = this.createdBy;
    this.IsEnable = 0;
  }
  //Piu biswas
  EnableFeedback() {
    debugger;
    this.SpinnerService.show();
    var Obj = {
      CandidateId: this.CandidateId,
      InterviewDetailId: this.InterviewDetailId,
      InterviewFeedbackName: this.InterviewFeedbackName,
      CreatedBy: this.CreatedBy,
      IsEnable: this.IsEnable
    }
    this.interviewService.addCampusCandidateInterviewFeedbackList(Obj).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notificationService.showSuccess(response.msg, "Success");
        jQuery(".close").click();
      }
      else {
        this.notificationService.showError(response.msg, "Error");
      }
    }, error => {
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    })
  }
  //Piu end
  pdfdownload() {
    var htmlstring = document.getElementById("printerdiv").innerHTML;
    var dom = document.createElement('div');
    dom.innerHTML = htmlstring;
    html2pdf(dom, {
      margin: 6,
      filename: this.fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }

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
  downloadcandidate(candidateId) {
    var formdata = {
      CandidateIds: candidateId.toString()
    }
    this.campusRequisitionService.getCampusCandidateDataForExcel(formdata).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          //this.notificationService.showSuccess(result.msg, "Success");
          result.forEach(element => {
            let headerObj = {
              "Candidate No": element.candidateNo,
              "Aadhar No": element.aadharNo,
              "Full Name": element.fullName,
              "Email Id": element.emailId,
              "Phone No": element.phoneNo,
              "Highest Qualification": element.highestQualificationName,
              "Post Graduate Course Name": element.coursenamepostgraduate,
              "Post Graduate Stream Name": element.streamnamepostgraduate,
              "Post Graduate Marks": element.markspostgraduate,
              // "PostGraduateInstitution": element.institutionpostgraduate,
              // "PostGraduateInstitutionName": element.institutionnamepostgraduate,
              "Post Graduate Institution": (element.institutionpostgraduate == null ? "" : element.institutionpostgraduate) + (element.institutionpostgraduate == "Others" ? "-" : "") + (element.institutionnamepostgraduate == null ? "" : element.institutionnamepostgraduate),
              "Post Graduate Institution Location": element.institutelocationpostgraduate,
              "Post Graduate Year of Passing": element.yearofPassingpostgraduate,
              "Post Graduate Course Status": element.courseStatuspostgraduate,
              "Under Graduate Course Name": element.coursenameundergraduate,
              "Under Graduate Stream Name": element.streamnameundergraduate,
              "Under Graduate Marks": element.marksundergraduate,
              // "UnderGraduateInstitution": element.institutionundergraduate,
              // "UnderGraduateInstitutionName": element.institutionnameundergraduate,
              "Under Graduate Institution": (element.institutionundergraduate == null ? "" : element.institutionundergraduate) + (element.institutionundergraduate == "Others" ? "-" : "") + (element.institutionnameundergraduate == null ? "" : element.institutionnameundergraduate),
              "Under Graduate Institution Location": element.institutelocationundergraduate,
              "Under Graduate Year of Passing": element.yearofPassingundergraduate,
              "Under Graduate Course Status": element.courseStatusundergraduate,
              "Diploma Course Name": element.coursenamediploma,
              "Diploma Stream Name": element.streamnamediploma,
              "Diploma Marks": element.marksdiploma,
              // "DiplomaInstitution": element.institutiondiploma,
              // "DiplomaInstitutionName": element.institutionnamediploma,
              "Diploma Institution": (element.institutiondiploma == null ? "" : element.institutiondiploma) + (element.institutiondiploma == "Others" ? "-" : "") + (element.institutionnamediploma == null ? "" : element.institutionnamediploma),
              "Diploma Institution Location": element.institutelocationdiploma,
              "Diploma Year of Passing": element.yearofPassingdiploma,
              "Diploma Course Status": element.courseStatusdiploma,
              "12th Year of Passing": element.yearofPassinghigherschool,
              "12th Marks": element.markshigherschool,
              "12th Course Status": element.courseStatushigherschool,
              "10th Year of Passing": element.yearofPassinghighschool,
              "10th Marks": element.markshighschool,
              "10th Course Status": element.courseStatushighschool,
              "Any Other Qualification Name": element.qualificationnameAnyotheracademic,
              "Any Other Qualification Course Name": element.coursenameAnyotherqualification,
              "Any Other Qualification Stream Name": element.streamnameAnyotherqualification,
              "Any Other Qualification Marks": element.marksAnyotherqualification,
              // "AnyotherqualificationInstitution": element.institutionAnyotherqualification,
              // "AnyotherqualificationInstitutionName": element.institutionnameAnyotherqualification,
              "Any Other Qualification Institution": (element.institutionAnyotherqualification == null ? "" : element.institutionAnyotherqualification) + (element.institutionAnyotherqualification == "Others" ? "+" : "") + (element.institutionnameAnyotherqualification == null ? "" : element.institutionnameAnyotherqualification),
              "Any Other Qualification Institution Location": element.institutelocationAnyotherqualification,
              "Any Other Qualification Year of Passing": element.yearofPassingAnyotherqualification,
              "Any Other Qualification Course Status": element.courseStatusAnyotherqualification,
              "Active Arrears": element.activearrears == 0 ? "No" : "Yes",
              "Mother Tongue": element.motherTongueName,
              "Language Known": element.languageKnownName,
              Hometown: element.homeTown,
              "Native State": element.nativeStateName,
              "Present State": element.presentStateName,
              "Father Occupation": element.fatherOccupationName,
              "Mother Occupation": element.motherOccupationName,
              "No of Siblings": element.noofSiblings,
              Dob: element.dob,
              Age: element.age,
              Gender: element.genderName,
              Height: element.height,
              Weight: element.weight,
              "Health Issue": element.healthIssue == false ? "No" : "Yes",
              "Health Issue Details": element.healthIssueDetails,
              Disability: element.disability == false ? "No" : "Yes",
              "Disability Details": element.disabilityDetails,
              "Eye Sight Corrected": element.eyeSightCorrected == false ? "No" : "Yes",
              "Eye Sight Left": element.eyeSightLeft == "0" ? "" : element.eyeSightLeft,
              "Eye Sight Right": element.eyeSightRight == "0" ? "" : element.eyeSightRight,
              "Years Commitments": element.yearsCommitments == 0 ? "No" : "Yes",
              "Anywhere in India": element.anyWhereinIndia == 0 ? "No" : "Yes",
              "Working in Shift": element.workinginShift == 0 ? "No" : "Yes",
              "Most Preferd Benifit": element.mostPreferdBenifitName,
              "Extra Curricular Activities": element.extraCurricularActivitiesName,
              "Job Type Priority": element.jobPriorityName,
              "Critical Factor": element.criticalFactorName

            }
            this.testResults1.push(headerObj);
          })
          this.excelDownload();
        }
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
    });

  }



  ExportReport() {
    this.testResults1 = [];
    var eligiblecandidates = this.candidates.filter(e => (e.checked == true));
    var candids = "";
    for (var i = 0; i < eligiblecandidates.length; i++) {
      candids = candids + "," + eligiblecandidates[i].candidateId;
    }

    var formdata = {
      CandidateIds: candids
    }
    this.campusRequisitionService.getCampusCandidateDataForExcel(formdata).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          //this.notificationService.showSuccess(result.msg, "Success");
          result.forEach(element => {
            let headerObj = {
              "Candidate No": element.candidateNo,
              "Aadhar No": element.aadharNo,
              "Full Name": element.fullName,
              "Email Id": element.emailId,
              "Phone No": element.phoneNo,
              "Highest Qualification": element.highestQualificationName,
              "Post Graduate Course Name": element.coursenamepostgraduate,
              "Post Graduate Stream Name": element.streamnamepostgraduate,
              "Post Graduate Marks": element.markspostgraduate,
              // "PostGraduateInstitution": element.institutionpostgraduate,
              // "PostGraduateInstitutionName": element.institutionnamepostgraduate,
              "Post Graduate Institution": (element.institutionpostgraduate == null ? "" : element.institutionpostgraduate) + (element.institutionpostgraduate == "Others" ? "-" : "") + (element.institutionnamepostgraduate == null ? "" : element.institutionnamepostgraduate),
              "Post Graduate Institution Location": element.institutelocationpostgraduate,
              "Post Graduate Year of Passing": element.yearofPassingpostgraduate,
              "Post Graduate Course Status": element.courseStatuspostgraduate,
              "Under Graduate Course Name": element.coursenameundergraduate,
              "Under Graduate Stream Name": element.streamnameundergraduate,
              "Under Graduate Marks": element.marksundergraduate,
              // "UnderGraduateInstitution": element.institutionundergraduate,
              // "UnderGraduateInstitutionName": element.institutionnameundergraduate,
              "Under Graduate Institution": (element.institutionundergraduate == null ? "" : element.institutionundergraduate) + (element.institutionundergraduate == "Others" ? "-" : "") + (element.institutionnameundergraduate == null ? "" : element.institutionnameundergraduate),
              "Under Graduate Institution Location": element.institutelocationundergraduate,
              "Under Graduate Year of Passing": element.yearofPassingundergraduate,
              "Under Graduate Course Status": element.courseStatusundergraduate,
              "Diploma Course Name": element.coursenamediploma,
              "Diploma Stream Name": element.streamnamediploma,
              "Diploma Marks": element.marksdiploma,
              // "DiplomaInstitution": element.institutiondiploma,
              // "DiplomaInstitutionName": element.institutionnamediploma,
              "Diploma Institution": (element.institutiondiploma == null ? "" : element.institutiondiploma) + (element.institutiondiploma == "Others" ? "-" : "") + (element.institutionnamediploma == null ? "" : element.institutionnamediploma),
              "Diploma Institution Location": element.institutelocationdiploma,
              "Diploma Year of Passing": element.yearofPassingdiploma,
              "Diploma Course Status": element.courseStatusdiploma,
              "12th Year of Passing": element.yearofPassinghigherschool,
              "12th Marks": element.markshigherschool,
              "12th Course Status": element.courseStatushigherschool,
              "10th Year of Passing": element.yearofPassinghighschool,
              "10th Marks": element.markshighschool,
              "10th Course Status": element.courseStatushighschool,
              "Any Other Qualification Name": element.qualificationnameAnyotheracademic,
              "Any Other Qualification Course Name": element.coursenameAnyotheracademic,
              "Any Other Qualification Stream Name": element.streamnameAnyotheracademic,
              "Any Other Qualification Marks": element.marksAnyotheracademic,
              // "AnyotherqualificationInstitution": element.institutionAnyotherqualification,
              // "AnyotherqualificationInstitutionName": element.institutionnameAnyotherqualification,
              "Any Other Qualification Institution": (element.institutionAnyotheracademic == null ? "" : element.institutionAnyotheracademic) + (element.institutionAnyotheracademic == "Others" ? "+" : "") + (element.institutionnameAnyotheracademic == null ? "" : element.institutionnameAnyotheracademic),
              "Any Other Qualification Institution Location": element.institutelocationAnyotheracademic,
              "Any Other Qualification Year of Passing": element.yearofPassingAnyotheracademic,
              "Any Other Qualification Course Status": element.courseStatusAnyotheracademic,
              "Active Arrears": element.activearrears == 0 ? "No" : "Yes",
              "Mother Tongue": element.motherTongueName,
              "Language Known": element.languageKnownName,
              Hometown: element.homeTown,
              "Native State": element.nativeStateName,
              "Present State": element.presentStateName,
              "Father Occupation": element.fatherOccupationName,
              "Mother Occupation": element.motherOccupationName,
              "No of Siblings": element.noofSiblings,
              Dob: element.dob,
              Age: element.age,
              Gender: element.genderName,
              Height: element.height,
              Weight: element.weight,
              "Health Issue": element.healthIssue == false ? "No" : "Yes",
              "Health Issue Details": element.healthIssueDetails,
              Disability: element.disability == false ? "No" : "Yes",
              "Disability Details": element.disabilityDetails,
              "Eye Sight Corrected": element.eyeSightCorrected == false ? "No" : "Yes",
              "Eye Sight Left": element.eyeSightLeft == "0" ? "" : element.eyeSightLeft,
              "Eye Sight Right": element.eyeSightRight == "0" ? "" : element.eyeSightRight,
              "Years Commitments": element.yearsCommitments == 0 ? "No" : "Yes",
              "Anywhere in India": element.anyWhereinIndia == 0 ? "No" : "Yes",
              "Working in Shift": element.workinginShift == 0 ? "No" : "Yes",
              "Most Preferrd Benefit": element.mostPreferdBenifitName,
              "Extra Curricular Activities": element.extraCurricularActivitiesName,
              "Job Type Priority": element.jobPriorityName,
              "Critical Factor": element.criticalFactorName
            }
            this.testResults1.push(headerObj);
          })
          this.excelDownload();
        }
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
    });


  }
  isbtnshortlistvisible() {
    var ChyeckedObj = [];
    ChyeckedObj = this.candidates.filter(e => e.checked == true && e.hiringStatusId == 1);
    if (ChyeckedObj.length > 0) {
      //console.log("Checked Obj", ChyeckedObj);
      var medicalCollectionId = ChyeckedObj.find(e => e.checked == true && e.hiringStatusId == 1);
      console.log("medicalCollectionId", medicalCollectionId);
      if (medicalCollectionId == null) {
        return false;
      } else {
        return true;
      }
    }
  }
  isbtnscheduletestvisible() {
    var ChyeckedObj = [];
    ChyeckedObj = this.candidates.filter(e => e.checked == true && e.hiringStatusId == 2);
    if (ChyeckedObj.length > 0) {
      //console.log("Checked Obj", ChyeckedObj);
      var medicalCollectionId = ChyeckedObj.find(e => e.checked == true && e.hiringStatusId == 2);
      // console.log("medicalCollectionId", medicalCollectionId);
      if (medicalCollectionId == null) {
        return false;
      } else {
        return true;
      }
    }
  }
  isbtnrescheduletestvisible() {
    var ChyeckedObj = [];
    ChyeckedObj = this.candidates.filter(e => e.checked == true && e.hiringStatusId == 4);
    if (ChyeckedObj.length > 0) {
      //console.log("Checked Obj", ChyeckedObj);
      var medicalCollectionId = ChyeckedObj.find(e => e.checked == true && e.hiringStatusId == 4);
      // console.log("medicalCollectionId", medicalCollectionId);
      if (medicalCollectionId == null) {
        return false;
      } else {
        return true;
      }
    }
  }
  isbtnrescheduleterviewvisible() {
    var ChyeckedObj = [];
    ChyeckedObj = this.candidates.filter(e => e.checked == true && (e.hiringStatusId == 7 || e.hiringStatusId == 17));
    if (ChyeckedObj.length > 0) {
      //console.log("Checked Obj", ChyeckedObj);
      var medicalCollectionId = ChyeckedObj.find(e => e.checked == true && (e.hiringStatusId == 7 || e.hiringStatusId == 17));
      // console.log("medicalCollectionId", medicalCollectionId);
      if (medicalCollectionId == null) {
        return false;
      } else {
        return true;
      }
    }
  }
  isbtnscheduleinterviewvisible() {
    var ChyeckedObj = [];
    ChyeckedObj = this.candidates.filter(e => e.checked == true && (e.hiringStatusId == 14 || e.hiringStatusId == 8 || e.hiringStatusId == 9));
    if (ChyeckedObj.length > 0) {
      //console.log("Checked Obj", ChyeckedObj);
      var medicalCollectionId = ChyeckedObj.find(e => e.checked == true && (e.hiringStatusId == 14 || e.hiringStatusId == 8 || e.hiringStatusId == 9));
      // console.log("medicalCollectionId", medicalCollectionId);
      if (medicalCollectionId == null) {
        return false;
      } else {
        return true;
      }
    }
  }
  isbtncancelinterviewvisible() {
    var ChyeckedObj = [];
    ChyeckedObj = this.candidates.filter(e => e.checked == true && (e.hiringStatusId == 7 || e.hiringStatusId == 17));
    if (ChyeckedObj.length > 0) {
      //console.log("Checked Obj", ChyeckedObj);
      var medicalCollectionId = ChyeckedObj.find(e => e.checked == true && (e.hiringStatusId == 7 || e.hiringStatusId == 17));
      // console.log("medicalCollectionId", medicalCollectionId);
      if (medicalCollectionId == null) {
        return false;
      } else {
        return true;
      }
    }
  }
  isbtnpreplacementvisible() {
    var ChyeckedObj = [];
    ChyeckedObj = this.candidates.filter(e => e.checked == true && (e.hiringStatusId == 2 || e.hiringStatusId == 3 || e.hiringStatusId == 4 || e.hiringStatusId == 5 || e.hiringStatusId == 14) && e.preplacementId != 1);
    if (ChyeckedObj.length > 0) {
      //console.log("Checked Obj", ChyeckedObj);
      var medicalCollectionId = ChyeckedObj.find(e => e.checked == true && (e.hiringStatusId == 2 || e.hiringStatusId == 3 || e.hiringStatusId == 4 || e.hiringStatusId == 5 || e.hiringStatusId == 14) && e.preplacementId != 1);
      // console.log("medicalCollectionId", medicalCollectionId);
      if (medicalCollectionId == null) {
        return false;
      } else {
        return true;
      }
    }
  }
  isBTNUniversityMultipleVisible() {
    var ChyeckedObj = [];
    ChyeckedObj = this.candidates.filter(e => e.checked == true);
    if (ChyeckedObj.length > 1) {
      return true;
    } else {
      return false;
    }

  }
  onCheckRowWise(data, eve, index) {
    if (this.GetSelectedHiringStatus(data)) {
      data.checked = eve.target.checked;
    } else {
      jQuery("#" + index).prop("checked", false);
      this.notificationService.showError("Please select same hiring status", "Error");
    }
    console.log("chck", this.candidates)
  }
  GetSelectedHiringStatus(NewRow) {
    var AlredyChecked = this.candidates.find(e => e.checked);
    if (AlredyChecked == null) {
      return true;
    } else {
      return AlredyChecked.hiringStatusId == NewRow.hiringStatusId;
    }
  }
  excelDownload() {
    this.excelService.ExportAsExcelFile(this.testResults1, 'CandidateDetails');
  }

}
