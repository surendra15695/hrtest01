import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICandidateCVData, ICandidateDetailData, IfiltercandidateNew, ISearchCandidateDetail } from '../../../../../interfaces/preselection/candidate.interface';
import { IRequisitionList, ISearchRequisition } from '../../../../../interfaces/preselection/requisition.interface';
import { CommonService } from '../../../../../services/common/common/common.service';
import { RequisitionService } from '../../../../../services/preselection/requisition/requisition.service';
import { VendorService } from '../../../../../services/vendor/vendor/vendor.service';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { ShareddataService } from '../../../../../sharedservices/shareddata.service';
import { CandidateService } from '../../../../../services/preselection/candidate/candidate.service';
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { ISearchFunction, IVerticalFunction } from 'src/app/interfaces/common/function.interface';
import { ILocation, ISearchLocation } from 'src/app/interfaces/common/location.interface';
import { LocationService } from 'src/app/services/common/location/location.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { IHiringStatus } from 'src/app/interfaces/common/common.interface';
import { ILanguage, ISearchLanguage } from '../../../../../interfaces/common/language.interface';
import { LanguageService } from 'src/app/services/common/language/language.service';
import { CampusrequisitionService } from 'src/app/services/campus/campusrequisition/campusrequisition.service';
import { CourseService } from 'src/app/services/common/course/course.service';
import { QualificationService } from 'src/app/services/common/qualification/qualification.service';
import { ISearchQualification } from 'src/app/interfaces/common/qualification.interface';
import { StreamService } from 'src/app/services/common/stream/stream.service';
import { IDomain, ISearchDomain } from 'src/app/interfaces/common/domain.interface';
import { DomainService } from 'src/app/services/common/domain/domain.service';
import { IEmailTemplate, ISearchEmailTemplate } from 'src/app/interfaces/common/emailtemplate.interface';
import { EmailtemplateService } from 'src/app/services/common/emailtemplate/emailtemplate.service';
import { VerticalService } from 'src/app/services/common/vertical/vertical.service';
import { IFunctionDepartment, ISearchDepartment } from 'src/app/interfaces/common/department.interface';
import { DepartmentService } from 'src/app/services/common/department/department.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
declare var jQuery: any;
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-cv-drop-tag',
  templateUrl: './cv-drop-tag.component.html',
  styleUrls: ['./cv-drop-tag.component.css']
})
export class CvDropTagComponent implements OnInit {
  @ViewChild('FromDate', { static: false }) fDate: ElementRef;//31
  @ViewChild('ToDate', { static: false }) tDate: ElementRef; //32
  @ViewChild('QualificationTypeIdselect', { static: false }) domainSelect: ElementRef;
  // @ViewChild('CourseId' ,{ static: false }) CId: ElementRef;
  searchform: FormGroup;
  filterForm: FormGroup;
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
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
  interviewEmailTemplateDescription: any;
  searchInterviewEmailTemplate: ISearchEmailTemplate = {
    templateTypeId: 101,
    templateId: null,
    isActive: true
  }
  selectedInterviewEmailTemplateId: number;
  interviewemailTemplates: IEmailTemplate[] = [];
  //candidates: ICandidateCVData[] = [];  // prev
  candidates: any[] = [];                 // anif on 02-05-2023
  CompletionYear: any[] = [];
  candidate: ICandidateCVData = {
    candidateNo: "",
    candidateId: 0,
    CandidateIds: "",
    prefixId: 0,
    prefixName: "",
    fullName: "",
    genderId: 0,
    genderName: "",
    dob: "",
    age: 0,
    emailId: "",
    contactNo: "",
    aadharNo: "",
    motherTongueId: 0,
    motherTongueName: "",
    laguageIds: "",
    languageNames: "",
    qualificationId: 0,
    qualificationName: "",
    courseId: 0,
    courseName: "",
    streamId: 0,
    streamName: "",
    marksPercentage: "",
    completionYear: 0,
    qualificationTypeId: 0,
    qualificationTypeName: "",
    experienceYear: 0,
    experienceMonth: 0,
    currentCTC: "",
    currentEmployer: "",
    currentDesignation: "",
    domainId: 0,
    domainName: "",
    subDomainId: 0,
    subDomainName: "",
    stateId: 0,
    stateName: "",
    previousApplied: 0,
    previousAppliedName: "",
    relativeStatus: 0,
    relativeStatusName: "",
    relativeName: "",
    relativeContactNo: "",
    sourceChannelId: 0,
    sourceChannelName: "",
    createdBy: 0,
    candidateOwner: "",
    hiringStatusId: 0,
    hiringStatusName: "",
    resume: "",
    referalEmpNo: "",
    referalDesignation: "",
    referalGrade: "",
    parentRelationshipId: 0,
    childRelationshipId: 0,
    parentRelationshipName: "",
    childRelationshipName: "",
    relationshipNotes: "",
    cmdApprovalRequired: 0,
    cmdApprovalStatus: 0,
    cmdApprovalNo: "",
    cmdApprovalDocument: "",
    popoverContent: "",
    cmdUpdateStatus: 0,
    testOption: 0,
    hrFeedbackCount: 0,
    assessmentCount: 0,
    applicationCount: 0,
    clarificationCount: 0,
    checked: null,
    requisitionDetailId: 0,
    Position: "",
    Department: "",
    Location: "",
    state: "",
    Requisitionno: "",
  };
  candidateIds: string = "";
  requisitionids: string = "";
  hiringstatusids: string = "";
  candidateId: number;
  candidateNo: string;
  candidateName: string;
  State: any[] = [];
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
  filtercandidate: IfiltercandidateNew = {
    CandidateId: null,
    CandidateName: "",
    CandidateNo: "",
    GenderIds: null,
    FromAge: null,
    ToAge: null,
    AadharNo: "",
    ContactNo: "",
    EmailId: "",
    MotherTongueIds: "",
    LanguageKnownIds: "",
    QualificationIds: "",
    CourseIds: "",
    StreamIds: "",
    SubDomainIds: "",
    StateIds: "",
    SourceChannelId: null,
    CreatedBy: null,
    FromPercentage: null,
    ToPercentage: null,
    DomainIds: "",
    HiringStatusId: "",
    ToDate: formatDate(new Date(), 'dd/MM/yyyy', 'en'),
    FromDate: formatDate(new Date().setDate(new Date().getDate() - 30),'dd/MM/yyyy', 'en'),
    FromExperience: null,
    ToExperience: null,
    CompletionYears: "",
    QualificationTypeIds: "",
    CurrentEmployer: "",
    Designation: "",
    RelativeStatus: null,
    PreviousApplied: null,
    CandidateOwner: "",
    University: "",
    Institution: "",
    ApplicationCount: null,
    RequisitionStatus: "",
    RequisitionNo: "",
    VerticalId: null,
    FunctionId: null,
    LocationId: null,
    RequisitionDetailId: 2,
    Interview: "",
    InterviewassessmentForm: "",
    RefferedVerticalId: null,
    RefferedFunctionId: null,
    RefferedDepartmentId: null,
    pagesize:100,
    pagenumber:1
  }
  basicFilterReqMapped: any;
  requisitionList: any[] = []
  //languages
  languages: ILanguage[] = [];
  selectedLanguages: ILanguage;
  searchLanguages: ISearchLanguage = {
    languageId: null,
    isActive: null
  }
  pagValue: number;
  displaystart: number;
  //vertical
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  enablecvdrop: boolean = false;
  enabledeletebtn: boolean = false;
  //functions
  functions: IVerticalFunction[] = [];
  selectedFunction: IVerticalFunction;
  searchFunction: any =
    {
      verticalId: "",
      functionId: null,
      isActive: true
    };
  searchFunctionReleaseTag: any =
    {
      verticalId: "",
      functionId: null,
      isActive: true
    };
  functionId: number;
  //location
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
  searchLocationReleasetag: ISearchLocation =
    {
      locationId: null,
      verticalId: null,
      locationCode: null,
      locationNo: null,
      isActive: true
    };
  locationId: number;
  selectAll: boolean;
  buyOutType: string;
  relocationReimbursementType: string;
  callngIfFunction: boolean = true;
  pageNameForBack: string;
  toggle: boolean;
  closecourse: boolean;
  arr: any[] = [];
  // Release and call back
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
  candidateLists: IHiringStatus[] = [];
  canmapreqarray: any[] = [];
  createdBy: number;
  statusId: number;
  actionName: string;
  releaseCandidateId: number;
  releaseremarks: string;
  callbackCandidateId: number;
  callbackremarks: string = "";
  objCallbackHistoryInsert: CallbackHistoryInsert;
  // selectedVertical: IVertical;
  pendingCandidateList: any[] = [];
  verticalsForReleaseTag: any[] = [];
  requisitionTagStageList: any[] = [];
  functionsForReleaseTag: any[] = [];
  locationsForReleasetag: any[] = [];
  requisitionListsForReleaseTag: any[] = [];
  requisitionListsForReleaseTagFiltered: any[] = [];
  objReleaseCandidateTag: ReleaseCandidateTag;
  reqidarray: any;
  closestream: boolean;
  closedomain: boolean;
  closecurloc: boolean;
  closesourcechannel: boolean;
  hiringstatusidarray: any;
  qualificationType: any[] = []
  qualifications: any[] = []
  searchQualification: ISearchQualification = {
    qualificationId: null,
    isActive: null
  }
  courses: any[] = []
  StreamList: any[] = []
  candidatedetailsarray: any[] = [];
  enablecanprofile: boolean = false;
  enableMapRequisition: boolean = false;
  enableRemapRequisition: boolean = false;
  reqstat: boolean;
  requsitionListforMapping: any[] = [];
  selectedRequisitionDetailsIdForMap: any;
  newRequsitionMapDetailsArray: any[] = [];
  array: any[] = [];
  rejectedBy: string = "";
  isMappedtoNew: boolean = false;
  disablerowcheck: boolean = false;
  verticalsforreq: any[] = [];
  verticalIdforreq: any;
  functionIdforreq: any;
  functionsforreq: any[] = [];
  locationsforreq: any[] = [];
  locationidforreq: any;
  FunctionList: any[] = [];
  VerticalList: any[] = [];
  DepartmentList: any[] = [];
  searchVertical = {
    VerticalId: null,
    VerticalName: "",
    IsActive: true
  }
  closesdomain: boolean;
  departments: IFunctionDepartment[] = [];
  selectedDepartment: IFunctionDepartment;
  searchDepartment: ISearchDepartment = {
    departmentId: null,
    functionId: null,
    verticalId: null,
    isActive: true
  }
  closever: boolean
  streamlength: any;
  quallength: any;
  courselength: any;
  domainlength: any;
  subdomainlength: any;
  currentlocationlength: any;
  sourcelength: any;
  verlength: any;
  constructor(
    private elementRef: ElementRef,
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private candidateService: CandidateService,
    private requisitionService: RequisitionService,
    private commonService: CommonService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private SpinnerService: NgxSpinnerService, public activatedRoute: ActivatedRoute,
    private titleService: Title,
    private locationService: LocationService,
    private functionService: FunctionService,
    private languageService: LanguageService,
    private CampusRequisitionService: CampusrequisitionService,
    private qualificationService: QualificationService,
    private courseService: CourseService,
    private streamService: StreamService,
    private domainService: DomainService,
    private emailtemplateService: EmailtemplateService,
    private verticalService: VerticalService,
    private departmentService: DepartmentService,
    private excelService: ExcelService
  ) {
  
    jQuery(".custom-menu").hide();
    this.objCallbackHistoryInsert = new CallbackHistoryInsert();
    this.objReleaseCandidateTag = new ReleaseCandidateTag();
    this.objReleaseCandidateTag.verticalId = null;
    this.objReleaseCandidateTag.functionId = null;
    this.objReleaseCandidateTag.locationId = null;
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.objReleaseCandidateTag.assignedByUserId = this.loginUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.pageNameForBack = this.persistance.get('pagename');
    this.persistance.get('pagename') == "dropcvtag"

    this.requisitionDetailId = this.persistance.get('paramid');
    this.createForm();
    this.getAllRequisition();
    this.Reqstatus();
    this.getHiringStatus();
    this.getAllInterviewEmailTemplate();
    this.getAllCvDropCandidate();
    this.createFilterForm();
    this.getAllVerticalforReffered();
  }

  ngOnInit() {
    this.persistance.get('tabledisplayStart') == (null || undefined) ? this.displaystart = 0 : this.displaystart = this.persistance.get('tabledisplayStart');
    if (this.persistance.get('tabledisplayStart') == (null || undefined)) {
      this.displaystart = 0
    }
    if (this.persistance.get('tabledisplayStart') > 0) {
      var tablestart = this.persistance.get('tabledisplayStart')
      this.displaystart = (tablestart - 1) * 10;
    }
    this.loadDatePicker();
    this.loadPopover();
    this.loadTooltipMenu();
    this.loadDataTable();
    this.loadSelectPicker();
    this.openNav();
    this.closeNav();
    this.getAllLanguages();
    this.getAllQualificationType();
    this.getAllQualifications();
    this.getAllCourse();
    this.getAllStream();
    this.getAllDomain();
    this.getAllCompletionYears();
    this.getAllState();
    this.getallverticalforreq();
  }
  createFilterForm() {
    var previousmonthStart = new Date();
    previousmonthStart.setDate(previousmonthStart.getDate() - 30);
    this.filterForm = this.fb.group({
      CandidateId: [0],
      CandidateName: [''],
      FromDate:formatDate(previousmonthStart, 'dd/MM/yyyy', 'en'),
      ToDate: formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      HiringStatusId: [],
      GenderId: [],
      FromAge: [0],
      ToAge: [0],
      AadharNo: [''],
      ContactNo: [''],
      EmailId: [''],
      MotherTongueIds: [],
      LanguageIds: [],
      QualificationId: [],
      CourseId: [],
      StreamId: [],
      FromPercent: [0],
      ToPercent: [0],
      CompletionYear: [],
      QualificationTypeId: [],
      FromExperience: [0],
      ToExperience: [0],
      FromCTC: [0],
      ToCTC: [0],
      CurrentEmployer: [''],
      Designation: [''],
      DomainId: [],
      SubDomainId: [],
      StateIds: [],
      MRFRelativeStatus: [],
      MRFHistory: [],
      PreviousApplied: [],
      RelativeStatus: [],
      RequisitionNo: [],
      SourceChannelId: [],
      ApplicationFormStatusId: [],
      InterviewStatusId: [],
      InterviewassessmentForm: [],
      University: [''],
      RequisitionStatus: [''],
      //HiringStatusId: null,
      RequisitionDetailId: [this.requisitionDetailId],
      CandidateOwner: [''],
      verticalId: [],
      functionId: [],
      locationId: [],
      RequisitionProcessStatus: null,
      CandidateNo: "",
      RefferedVerticalId: null,
      RefferedFunctionId: null,
      RefferedDepartmentId: null
    });
  }
  onChangeReqmapp() {
    if (this.filterForm.value.RequisitionProcessStatus == true) {
      this.getAllVerticals();
    }
    if (this.filterForm.value.RequisitionProcessStatus == false) {
      this.verticals = [];
      this.locations = [];
      this.functions = [];
    }
  }
  onChangeRequisitionType() {

    let searchdata = {
      RequisitionDetailId: 0,
      VerticalIds: "",
      FunctionIds: "",
      LocationIds: ""
    }
    if (this.filterForm.value.verticalId.includes(0) || this.filterForm.value.verticalId == null || this.filterForm.value.verticalId == undefined) {
      searchdata.VerticalIds = "1,2,3";
    }
    else {
      var vertiVals = "";
      for (var val of this.filterForm.value.verticalId) {
        vertiVals += val.toString() + ","
      }
      searchdata.VerticalIds = vertiVals.slice(0, -1);
    }

    if (this.filterForm.value.functionId == null || this.filterForm.value.functionId.includes(0)) {
      searchdata.FunctionIds = "";
    }
    else {
      var funvals = ""
      for (var val of this.filterForm.value.functionId) {
        funvals += val.toString() + ","
      }
      searchdata.FunctionIds = funvals.slice(0, -1);
    }

    if (this.filterForm.value.locationId == null || this.filterForm.value.locationId.includes(0)) {
      searchdata.LocationIds = "";
    }
    else {
      var locVals = ""
      for (var val of this.filterForm.value.locationId) {
        locVals += val.toString() + ","
      }
      searchdata.LocationIds = locVals.slice(0, -1);
    }
    this.candidateService.getRequitionDetailsForCvDrop(searchdata).subscribe((result) => {
      if (result) {
        this.requisitionList = result;
        // this.requisitionList.splice(
        //   0,
        //   0,
        //   {
        //     requisitionDetailId: 0,
        //     requisitionId: 0,
        //     requisitionNo: "All",
        //     verticalId: 0,
        //     locationId: 0,
        //     locationNo: "",
        //     locationOffice: "",
        //     functionId: 0,
        //     functionName: "",
        //     departmentId: 0,
        //     departmentName: ""
        //   });


      }
      else {
        this.requisitionList = []
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });

  }

  getAllLocations(values) {
    // if (this.filterForm.value.functionId[0]==0)
    // {

    //   this.filterForm.value.functionId=[];
    //   for(let i=1;i<this.functions.length;i++){
    //     this.filterForm.value.functionId.push((this.functions[i].functionId))
    //   }
    // }
    // else{
    // }
    // this.filterForm.patchValue(
    //   {
    //     functionId : this.filterForm.value.functionId
    //   }
    // )
    var functionIds = "";
    for (var val of values) {
      functionIds += val.toString() + ","
    }
    if (values.includes(0)) {
      functionIds = "";
      for (var value of this.functions) {
        functionIds += value.functionId.toString() + ","
      }
    }

    var rec = {
      FunctionIds: functionIds.slice(0, -1)
    }

    this.commonService.getallfunctionwiselocation(rec).subscribe((result) => {
      if (result) {
        this.locations = result;
        // this.locations.splice(0, 0, {
        //   locationId: 0,
        //   verticalId: 0,
        //   locationNo: "All",
        //   locationCode: "",
        //   locationOffice: "All",
        //   isActive: true,
        //   createdBy: 0
        // })
        this.onChangeRequisitionType()
      }
      else {
        this.locations = [];
        // this.locations.splice(0, 0, {
        //   locationId: 0,
        //   verticalId: 0,
        //   locationNo: "All",
        //   locationCode: "",
        //   locationOffice: "All",
        //   isActive: true,
        //   createdBy: 0
        // })
        this.onChangeRequisitionType()
      }
    })
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
  loadDataTable() {
    var dothis = this
    jQuery('#dataTable1').dataTable().fnClearTable();
    jQuery('#dataTable1').dataTable().fnDestroy();
    setTimeout(() => {
      jQuery('#dataTable1').dataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "order": [],
        "fixedColumns": {
          "left": 3
        },
        "displayStart": this.displaystart,
        "drawCallback": function (settings) {
          dothis.pagValue = (settings._iDisplayStart / settings._iDisplayLength) + 1
          setTimeout(() => {
            jQuery('[data-toggle="popover"]').popover({
              html: true
            });
          });
        }
      });
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

  openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginRight = "300px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
  }

  createForm() {
    this.searchform = this.fb.group({
      requisitionNo: [''],
      verticalId: [0],
      locationId: [0],
      functionId: [0],
      fromAppliedDate: [''],
      toAppliedDate: [''],
      iOMNo: [''],
      CandidateNo: [''],
      requisitionProcessStatus: [0],
      PreviousApplied: [0],
      allocatedAutoUserId: [0]
    });
  }
  getallverticalforreq() {
    this.verticalsforreq = [];
    this.verticalsforreq.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticalsforreq.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticalsforreq.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.loadSelectPicker();
  }
  changeVerticalforreq() {
    this.functionsforreq = [];
    this.locationsforreq = [];
    let obj = {
      VerticalId: this.verticalIdforreq.toString(),
      IsActive: true
    }
    this.functionService.searchgetAllVerticalFunction(obj).subscribe((result) => {
      if (result) {
        this.functionsforreq = result;
      }
      else {
        this.functionsforreq = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
    let objlocation = {
      VerticalId: this.verticalIdforreq,
      IsActive: true
    }
    this.locationService.getAllLocation(objlocation).subscribe((result) => {
      if (result) {
        this.locationsforreq = result;
      }
      else {
        this.locationsforreq = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }
  //verticals
  getAllVerticals() {            //arg
    this.verticals = [];
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.verticalsForReleaseTag = this.verticals;
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    this.loadSelectPicker();
    this.selectedVertical = this.verticals.filter(x => x.verticalId == 0)[0];
  }

  changeVertical() {
    if (this.filterForm.value.verticalId[0] == 0) {
      this.closever = true;
      if (this.verlength == this.verticals.length - 1) {
        this.filterForm.value.verticalId = [];
        this.verlength = this.filterForm.value.verticalId.length;
      }
      else {
        this.filterForm.value.verticalId = [];
        for (let i = 1; i < this.verticals.length; i++) {
          this.filterForm.value.verticalId.push((this.verticals[i].verticalId))
        }
        this.verlength = this.filterForm.value.verticalId.length;
      }
    }
    else {
      this.closever = false;
    }
    this.filterForm.patchValue(
      {
        verticalId: this.filterForm.value.verticalId
      }
    )
    var verticalId = this.searchform.get("verticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0];
    this.getAllFunction();
    this.onChangeRequisitionType();
  }
  // closevertical(selectElement: HTMLSelectElement) {
  //   if(this.closever){
  //   selectElement.click();
  //   this.elementRef.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
  //   }
  // }
  //locations
  getAllLocation() {
    this.locations = [];
    this.searchLocation.verticalId = this.selectedVertical.verticalId;
    this.locationService.getAllLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        this.locations = result;
        this.locations.splice(0, 0, {
          locationId: 0,
          verticalId: 0,
          locationNo: "All",
          locationCode: "",
          locationOffice: "All",
          isActive: true,
          createdBy: 0
        })
      }
      else {
        this.locations = [];
        this.locations.splice(0, 0, {
          locationId: 0,
          verticalId: 0,
          locationNo: "All",
          locationCode: "",
          locationOffice: "All",
          isActive: true,
          createdBy: 0
        })
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }
  //function
  getAllFunction() {
    this.functions = [];
    var verticals = "";
    if (this.filterForm.value.verticalId != null) {
      for (var val of this.filterForm.value.verticalId) {
        verticals += val.toString() + ",";
      }
      this.searchFunction.verticalId = verticals.slice(0, -1);
      if (this.filterForm.value.verticalId.includes(0)) {
        this.searchFunction.verticalId = "1,2,3";
      }
    }
    else {
      this.searchFunction.verticalId = "";
    }

    this.functionService.searchgetAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;
        // this.functions.splice(0, 0, {
        //   functionId: 0,
        //   verticalId: 0,
        //   functionName: "All",
        //   verticalName: "",
        //   isActive: true
        // })
      }
      else {
        this.functions = [];
        // this.functions.splice(0, 0, {
        //   functionId: 0,
        //   verticalId: 0,
        //   functionName: "All",
        //   verticalName: "",
        //   isActive: true
        // })
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }
  Reqstatus() {
    this.arr = [];
    this.arr.push({ reqid: true, reqstatus: "Yes" });
    this.arr.push({ reqid: false, reqstatus: "No", });
  }
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
        // this.candidateLists.splice(0, 0, {
        //   hiringStatusId: 0,
        //   hiringStatusName: "All"

        // })
      }
    }, error => {
      console.log(error);
    }, () => {
      //this.loadSelectPicker();
    });
  }
  //languages

  getAllQualificationType() {
    this.qualificationType = [];
    this.qualificationService.getAllQualificationType(this.searchQualification).subscribe((result) => {
      if (result) {
        this.qualificationType = result;
      }
      else {
        this.qualificationType = [];
      }
    }, error => {
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
  }
  getAllQualifications() {
    this.qualifications = [];
    this.qualificationService.getAllQualification(this.searchQualification).subscribe((result) => {
      if (result) {
        this.qualifications = result;
      }
      else {
        this.qualifications = [];
      }
    }, error => {
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
  }

  getAllCourse() {
    this.SpinnerService.show();
    let value = {
      CourseId: 0,
      CourseName: ""
    }
    this.courseService.getAllCourse(value).subscribe((response: any) => {
      if (response) {
        this.courses = response;
      }
      else {
        this.courses = [];
      }
    }, error => {
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    })
  }
  getAllStream() {
    let obj = {
      StreamId: 0,
      StreamName: ""
    }
    this.streamService.getAllStream(obj).subscribe((response: any) => {
      if (response) {
        this.StreamList = response;
      }
      else {
        this.StreamList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    })
  }
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
    if (this.filterForm.value.DomainId[0] == 0) {
      this.closedomain = true;
      if (this.domainlength == this.domain.length) {
        this.filterForm.value.DomainId = [];
        this.domainlength = this.filterForm.value.DomainId.length;
      }
      else {
        this.filterForm.value.DomainId = [];
        for (let i = 0; i < this.domain.length; i++) {
          this.filterForm.value.DomainId.push(this.domain[i].domainId)
        }
        this.domainlength = this.filterForm.value.DomainId.length;
      }
    }
    else {
      this.closedomain = false;
    }
    this.filterForm.patchValue(
      {
        DomainId: this.filterForm.value.DomainId
      }
    )
    var domainId = this.filterForm.get("DomainId").value.join('');
    this.subdomain = [];
    if (domainId != "") {
      var splitdomain = domainId.split(",");
      for (var i = 0; i < domainId.length; i++) {
        this.getAllSubDomain(domainId[i]);
      }
    }
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
  getAllCompletionYears() {

    this.CompletionYear = [];
    var currentyear = new Date().getFullYear();
    this.CompletionYear.push({ yearsId: parseInt("0"), yearsName: "Select" });
    for (var i = currentyear; i > currentyear - 40; i--) {
      this.CompletionYear.push({ yearsId: parseInt(i.toString()), yearsName: i.toString() });
    }

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

  fromSubmit() {
    // this.filtercandidate.HiringStatusId = this.filterForm.value.HiringStatusId == null ? "" : this.filterForm.value.HiringStatusId.toString();
    this.SpinnerService.show();
    if (this.filterForm.value.RequisitionProcessStatus == null) {
      this.filtercandidate.RequisitionDetailId = 2;
    }
    if (this.filterForm.value.RequisitionProcessStatus == true) {
      this.filtercandidate.RequisitionDetailId = 1
    }
    if (this.filterForm.value.RequisitionProcessStatus == false) {
      this.filtercandidate.RequisitionDetailId = 0
    }
    this.filtercandidate.CandidateId = this.filterForm.value.CandidateId;

    if (this.filterForm.value.RequisitionNo != null) {
      var reqDetails = "";
      for (var val of this.filterForm.value.RequisitionNo) {
        reqDetails += val.toString() + ",";
      }
      this.filtercandidate.RequisitionNo = reqDetails.slice(0, -1);
    }

    if (this.filterForm.value.RequisitionNo == null || this.filterForm.value.RequisitionNo.includes(0)) {
      reqDetails = "";
      for (var val of this.requisitionList) {
        reqDetails += val.requisitionDetailId.toString() + ",";
      }
      this.filtercandidate.RequisitionNo = reqDetails.slice(0, -1);
    }

    if (this.filterForm.value.HiringStatusId != null) {
      var mulhiringStatus = ""
      for (var val of this.filterForm.value.HiringStatusId) {
        mulhiringStatus += val.toString() + ",";
      }
      this.filtercandidate.HiringStatusId = mulhiringStatus.slice(0, -1);
      if (this.filterForm.value.HiringStatusId.includes(0)) {
        mulhiringStatus = "";
        this.filtercandidate.HiringStatusId = ""
      }
    }
    else {
      this.filtercandidate.HiringStatusId = "";
    }

    if (this.filterForm.value.verticalId != null) {
      var mulvertical = "";
      for (var val of this.filterForm.value.verticalId) {
        mulvertical += val.toString() + ",";
      }
      this.filtercandidate.VerticalId = mulvertical.slice(0, -1);
      if (this.filterForm.value.verticalId.includes(0)) {
        this.filtercandidate.VerticalId = "1,2,3";
      }
    }
    else {
      this.filtercandidate.VerticalId = ""
    }

    if (this.filterForm.value.locationId != null) {
      var mulloc = "";

      for (var val of this.filterForm.value.locationId) {
        mulloc += val.toString() + ",";
      }
      this.filtercandidate.LocationId = mulloc.slice(0, -1);

      if (this.filterForm.value.locationId.includes(0)) {
        mulloc = "";
        for (var val2 of this.locations) {
          mulloc += val2.locationId.toString() + ","
        }
        this.filtercandidate.LocationId = mulloc.slice(0, -1);
      }
    }
    else {
      this.filtercandidate.LocationId = ""
    }

    if (this.filterForm.value.functionId != null) {
      var mulfun = "";
      for (var val of this.filterForm.value.functionId) {
        mulfun += val.toString() + ",";
      }
      this.filtercandidate.FunctionId = mulfun.slice(0, -1);

      if (this.filterForm.value.functionId.includes(0)) {
        mulfun = "";
        for (var val3 of this.functions) {
          mulfun += val3.functionId.toString() + ",";
        }
        this.filtercandidate.FunctionId = mulfun.slice(0, -1);
      }
    }
    else {
      this.filtercandidate.FunctionId = ""
    }
    if (this.filterForm.value.PreviousApplied != null) {
      var mulreqstatus = "";
      for (var val of this.filterForm.value.PreviousApplied) {
        if (val == 1) {
          mulreqstatus += "In Progress,Partially Completed" + ",";
        }
        if (val == 2) {
          mulreqstatus += "Completed" + ",";
        }
        if (val == 3) {
          mulreqstatus += "Requitiotion OnHold" + ",";
        }

      }
      this.filtercandidate.RequisitionStatus = mulreqstatus.slice(0, -1);



    }
    if (this.filterForm.value.PreviousApplied == null || this.filterForm.value.PreviousApplied.includes(0)) {
      mulreqstatus = "";
      this.filtercandidate.RequisitionStatus = "";
    }
    this.filtercandidate.ToDate = this.tDate.nativeElement.value;
    this.filtercandidate.FromDate = this.fDate.nativeElement.value;
    this.filtercandidate.CandidateNo = this.filterForm.value.CandidateNo == undefined ? "" : this.filterForm.value.CandidateNo.toString();
    this.filtercandidate.RefferedVerticalId = this.filterForm.value.RefferedVerticalId;
    this.filtercandidate.RefferedFunctionId = this.filterForm.value.RefferedFunctionId;
    this.filtercandidate.RefferedDepartmentId = this.filterForm.value.RefferedDepartmentId;
    this.filtercandidate.pagenumber=1;
    this.getAllCvDropCandidate();
  }
  onFilter() {
    this.filtercandidate.CandidateNo = this.filterForm.value.CandidateNo == undefined ? "" : this.filterForm.value.CandidateNo.toString();
    this.filtercandidate.CandidateName = this.filterForm.value.CandidateName == undefined ? "" : this.filterForm.value.CandidateName.toString();
    if (this.filterForm.value.GenderId != null) {
      var mulgender = "";
      for (var val of this.filterForm.value.GenderId) {
        mulgender += val.toString() + ",";
      }
      this.filtercandidate.GenderIds = mulgender
    }
    this.filtercandidate.FromAge = this.filterForm.value.FromAge == undefined ? null : Number(this.filterForm.value.FromAge);
    this.filtercandidate.ToAge = this.filterForm.value.ToAge == undefined ? null : Number(this.filterForm.value.ToAge);
    this.filtercandidate.AadharNo = this.filterForm.value.AadharNo == undefined ? "" : this.filterForm.value.AadharNo.toString();
    this.filtercandidate.ContactNo = this.filterForm.value.ContactNo == undefined ? "" : this.filterForm.value.ContactNo.toString();
    this.filtercandidate.EmailId = this.filterForm.value.EmailId == undefined ? "" : this.filterForm.value.EmailId.toString();
    if (this.filterForm.value.MotherTongueIds != null) {
      var mulmother = "";
      for (var val of this.filterForm.value.MotherTongueIds) {
        mulmother += val.toString() + ",";
      }
      this.filtercandidate.MotherTongueIds = mulmother
    }
    if (this.filterForm.value.LanguageIds != null) {
      var mullang = "";
      for (var val of this.filterForm.value.LanguageIds) {
        mullang += val.toString() + ",";
      }
      this.filtercandidate.LanguageKnownIds = mullang
    }
    this.filtercandidate.FromExperience = this.filterForm.value.FromExperience == undefined ? null : this.filterForm.value.FromExperience;
    this.filtercandidate.ToExperience = this.filterForm.value.ToExperience == undefined ? null : this.filterForm.value.ToExperience;
    this.filtercandidate.FromPercentage = this.filterForm.value.FromPercent == undefined ? null : this.filterForm.value.FromPercent;
    this.filtercandidate.ToPercentage = this.filterForm.value.ToPercent == undefined ? null : this.filterForm.value.ToPercent;
    this.filtercandidate.CurrentEmployer = this.filterForm.value.CurrentEmployer == undefined ? null : this.filterForm.value.CurrentEmployer.toString();
    this.filtercandidate.Designation = this.filterForm.value.Designation == undefined ? null : this.filterForm.value.Designation.toString();
    if (this.filterForm.value.MRFRelativeStatus != null) {
      var mulrel = "";
      for (var val of this.filterForm.value.MRFRelativeStatus) {
        mulrel += val.toString() + ",";
      }
      this.filtercandidate.RelativeStatus = mulrel
    }
    if (this.filterForm.value.QualificationId != null) {
      var mulqual = "";
      for (var val of this.filterForm.value.QualificationId) {
        mulqual += val.toString() + ",";
      }
      this.filtercandidate.QualificationIds = mulqual
    }
    if (this.filterForm.value.QualificationTypeId != null) {
      var mulqualtype = "";
      for (var val of this.filterForm.value.QualificationTypeId) {
        mulqualtype += val.toString() + ",";
      }
      this.filtercandidate.QualificationTypeIds = mulqualtype
    }
    if (this.filterForm.value.CourseId != null) {
      var mulcourse = "";
      for (var val of this.filterForm.value.CourseId) {
        mulcourse += val.toString() + ",";
      }
      this.filtercandidate.CourseIds = mulcourse
    }
    if (this.filterForm.value.StreamId != null) {
      var mulstream = "";
      for (var val of this.filterForm.value.StreamId) {
        mulstream += val.toString() + ",";
      }
      this.filtercandidate.StreamIds = mulstream
    }
    if (this.filterForm.value.DomainId != null) {
      var muldomain = "";
      for (var val of this.filterForm.value.DomainId) {
        muldomain += val.toString() + ",";
      }
      this.filtercandidate.DomainIds = muldomain
    }
    if (this.filterForm.value.SubDomainId != null) {
      var mulsubdomain = "";
      for (var val of this.filterForm.value.SubDomainId) {
        mulsubdomain += val.toString() + ",";
      }
      this.filtercandidate.SubDomainIds = mulsubdomain
    }
    if (this.filterForm.value.CompletionYear != null) {
      var mulcompyear = "";
      for (var val of this.filterForm.value.CompletionYear) {
        mulcompyear += val.toString() + ",";
      }
      this.filtercandidate.CompletionYears = mulcompyear
    }
    if (this.filterForm.value.MRFHistory != null) {
      var mulhis = "";
      for (var val of this.filterForm.value.MRFHistory) {
        mulhis += val.toString() + ",";
      }
      this.filtercandidate.PreviousApplied = mulhis
    }
    if (this.filterForm.value.SourceChannelId != null) {
      // if(this.filterForm.value.SourceChannelId[0]==0){
      //   this.filtercandidate.SourceChannelId = "1,2,3,4,5,6,7,8"
      // }
      // else{
      var mulsource = "";
      for (var val of this.filterForm.value.SourceChannelId) {
        mulsource += val.toString() + ",";
      }
      this.filtercandidate.SourceChannelId = mulsource
      // }

    }
    this.filtercandidate.CandidateOwner = this.filterForm.value.CandidateOwner == undefined ? null : this.filterForm.value.CandidateOwner.toString();
    if (this.filterForm.value.ApplicationFormStatusId != null) {
      var mulapp = "";
      for (var val of this.filterForm.value.ApplicationFormStatusId) {
        mulapp += val.toString() + ",";
      }
      this.filtercandidate.ApplicationCount = mulapp
    }
    if (this.filterForm.value.InterviewStatusId != null) {
      var mulinter = "";
      for (var val of this.filterForm.value.InterviewStatusId) {
        mulinter += val.toString() + ",";
      }
      this.filtercandidate.Interview = mulinter
    }
    if (this.filterForm.value.StateIds != null) {
      var mulstate = "";
      for (var val of this.filterForm.value.StateIds) {
        mulstate += val.toString() + ",";
      }
      this.filtercandidate.StateIds = mulstate
    }
    this.filtercandidate.InterviewassessmentForm = this.filterForm.value.InterviewassessmentForm == undefined ? null : this.filterForm.value.InterviewassessmentForm.toString();
    console.log("full", this.filtercandidate)
    this.getAllRequisition();
    this.getAllCvDropCandidate();
    this.closeNav();
  }
  onResetClick() {
    this.searchform.reset();
    this.getAllRequisition();
  }
  reset() {
    this.filterForm.reset();
    this.createFilterForm();;
    this.resetFilter()
  }

  resetFilter() {
    this.filtercandidate.RequisitionDetailId = 2;
    this.filtercandidate.GenderIds = null;
    this.filtercandidate.MotherTongueIds = null;
    this.filtercandidate.LanguageKnownIds = null;
    this.filtercandidate.QualificationTypeIds = null;
    this.filtercandidate.QualificationIds = null;
    this.filtercandidate.CourseIds = null;
    this.filtercandidate.StreamIds = null;
    this.filtercandidate.CompletionYears = null;
    this.filtercandidate.DomainIds = null;
    this.filtercandidate.SubDomainIds = null;
    this.filtercandidate.StateIds = null;
    this.filtercandidate.RelativeStatus = null;
    this.filtercandidate.SourceChannelId = null;
    this.filtercandidate.PreviousApplied = null;
    this.filtercandidate.ApplicationCount = null;
    this.filtercandidate.Interview = null;
    this.filtercandidate.RequisitionNo = null;
    this.filtercandidate.FromDate = formatDate(new Date().setDate(new Date().getDate() - 30),'dd/MM/yyyy', 'en');
    this.filtercandidate.ToDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    this.filtercandidate.pagenumber=1;
    this.filtercandidate.pagesize=100;
    console.log("f", this.filtercandidate)
    this.createFilterForm();
    this.getAllLanguages();
    this.getAllCvDropCandidate();
    this.closeNav();
  }
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }
  loadPopover() {
    setTimeout(() => {
      jQuery('[data-toggle="popover"]').popover({
        html: true
      });
    });
  }


  getAllCvDropCandidate() {
    this.SpinnerService.show();
    this.candidates = [];
    this.candidateService.getCvDropCandidateListNew(this.filtercandidate).subscribe((result) => {
      if (result) {
        this.candidates = result;
        this.candidates.forEach(element => {
          if (element.sourceChannelId == 4) {
            element.popoverContent = "<div><span class='grey'>Emp No: </span><span>" + element.refEmpNo + "</span></div><div><span class='grey'>Emp Name: </span><span>" + element.refEmpName + "</span></div><div><span class='grey'>Designation: </span><span>" + element.refEmpDesignation + "</span></div>";
          }
          if (element.isRefferedId != 0) {
            element.hovertext = "<div><span class='grey'>Reffered Vertical: </span><span>" + element.refferedVertical + "</span></div><div><span class='grey'>Reffered Function: </span><span>" + element.refferedFunction + "</span></div><div><span class='grey'>Reffered Department: </span><span>" + element.refferedDepartment + "</span></div>";
          }
        })
        console.log("Candidate profile list", this.candidates);
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

  btnClickEnableTagCVDropRequisition() {

    this.candidateId = 0;
    this.buyOutType = "A";
    var candidateNoString = "";
    var cflag = 0;
    this.candidates.forEach(element => {
      if (element.checked) {
        candidateNoString += (cflag == 0 ? "" : ",") + element.candidateNo.toString();
        cflag = 1;
      }
    })
    this.candidateNo = candidateNoString;
  }

  showBtnEnableTagCVDropRequisition() {
    var checkObj = this.candidates.find(e => (e.checked == true) && (e.requisitionDetailId == 0));
    return checkObj == null ? false : true;
  }

  onCheckSelectAll(eve) {
    this.disablerowcheck = true;
    this.candidateIds = "";
    this.candidatedetailsarray = [];
    if (this.candidates.length > 0) {
      var flag = 1;
      //1st index of array -- requisitiondetailid ,, status
      var reqdetailid = this.candidates[0].requisitionDetailId;
      var status = this.candidates[0].hiringStatusId;
      for (let i = 0; i < this.candidates.length; i++) {
        if ((this.candidates[i].requisitionDetailId == 0) && (status != this.candidates[i].hiringStatusId)) {
          flag = 0
          break;
        }
        if ((this.candidates[i].requisitionDetailId != 0) && (status != this.candidates[i].hiringStatusId)) {
          flag = 0;
          break;
        }
      }
      if (flag == 1) {
        this.candidates.forEach(element => {
          element.checked = eve.target.checked;
        })
      }
      else {
        jQuery("#chkAll").prop("checked", false);
        this.notificationService.showError("Please select same Requisition status and same Hiring Status", "Error");
      }
      this.candidates.forEach(element => {
        if (element.checked) {
          this.candidateIds = this.candidateIds == "" ? element.candidateId.toString() : (this.candidateIds + "," + element.candidateId.toString());
          this.candidatedetailsarray.push({
            CandidateName: element.fullName,
            CandidateId: element.candidateId,
            EmailId: element.emailId
          });
          this.canmapreqarray.push({
            CandidateName: element.fullName,
            EmailId: element.emailId,
            UserId: element.candidateNo
          });
          if (element.requisitionDetailId != 0 || element.requisitionDetailId == 4 || element.requisitionDetailId == 10
            || element.requisitionDetailId == 13 || element.requisitionDetailId == 16 || element.requisitionDetailId == 19 || element.requisitionDetailId == 22 || element.requisitionDetailId == 25
            || element.requisitionDetailId == 28 || element.requisitionDetailId == 55 || element.requisitionDetailId == 56 || element.requisitionDetailId == 57) {
            this.enableMapRequisition = false;
            this.enableRemapRequisition = true;
          }
          if (element.requisitionDetailId == 0) {
            this.enableMapRequisition = true;
            this.enableRemapRequisition = false;
          }
          if (element.hiringStatusId == 0 || element.hiringStatusId == 1 || element.hiringStatusId == 4
            || element.hiringStatusId == 7 || element.hiringStatusId == 30 || element.hiringStatusId == 37 || element.hiringStatusId == 42 || element.hiringStatusId == 49
            || element.hiringStatusId == 55 || element.hiringStatusId == 56 || element.hiringStatusId == 57 || element.hiringStatusId == 60 || element.hiringStatusId == 63) {
            this.enabledeletebtn = true;
          }
          this.enablecanprofile = true;
        }
        else {
          this.candidateIds = "";
          this.candidatedetailsarray = [];
          this.canmapreqarray = [];
          this.enableMapRequisition = false;
          this.enableRemapRequisition = false;
          this.enabledeletebtn = false;
          this.enablecanprofile = false;
          this.disablerowcheck = false;
        }
      })
    } else {
      jQuery("#chkAll").prop("checked", false);
      this.notificationService.showError("No data to select", "Error");
    }
    console.log("find1", this.candidateIds)
    console.log("find2", this.candidatedetailsarray)
  }
  getEnableStatus(data) {
    return data.checked;
  }
  onCheckRowWise(data, eve, index) {
    this.candidate.candidateNo = data.candidateNo;
    this.candidate.emailId = data.emailId;
    var flag = 0;
    data.checked = eve.target.checked;
    this.candidateId = data.candidateId;
    if (this.candidateIds != "") {
      jQuery("#chkm" + index).prop("checked", false);
      flag = 1;
    }
    if (eve.target.checked) {
      this.candidateIds = this.candidateIds + "," + this.candidateId;  // Previous
      // this.candidateIds = this.candidateIds == "" ? this.candidateId.toString() : (this.candidateIds + "," + this.candidateId.toString());
      this.requisitionids = this.requisitionids + "," + data.requisitionDetailId;
      this.hiringstatusids = this.hiringstatusids + "," + data.hiringStatusId;
      this.enablecvdrop = true;
      this.enabledeletebtn = true;
      this.enablecanprofile = true;
      this.hiringstatusidarray = this.hiringstatusids.split(",");
      this.reqidarray = this.requisitionids.split(",");
      this.candidatedetailsarray.push({
        CandidateName: data.fullName,
        CandidateId: data.candidateId,
        EmailId: data.emailId
      });
      this.canmapreqarray.push({
        CandidateName: data.fullName,
        EmailId: data.emailId,
        UserId: data.candidateNo
      });
      for (let i = 0; i < this.reqidarray.length; i++) {
        if (this.reqidarray.length == 1) {
          this.enablecvdrop = false;
          this.enablecanprofile = false;
        }
        else {
          if (this.reqidarray[i] != "0" && this.reqidarray[i] != "") {
            this.enablecvdrop = false;
          }
        }
      }
      for (let i = 0; i < this.hiringstatusidarray.length; i++) {
        if (this.hiringstatusidarray.length == 1) {
          this.enabledeletebtn = false;
        }
        else {
          if ((this.hiringstatusidarray[i] != 0 && this.hiringstatusidarray[i] != 1 && this.hiringstatusidarray[i] != 4 && this.hiringstatusidarray[i] != 7
            && this.hiringstatusidarray[i] != 30 && this.hiringstatusidarray[i] != 37 && this.hiringstatusidarray[i] != 42 && this.hiringstatusidarray[i] != 49 && this.hiringstatusidarray[i] != 55 && this.hiringstatusidarray[i] != 56
            && this.hiringstatusidarray[i] != 57 && this.hiringstatusidarray[i] != 60 && this.hiringstatusidarray[i] != 63) && this.hiringstatusidarray[i] != "") {
            this.enabledeletebtn = false;
          }
        }
      }
      // Anif from here 02-05-2023
      this.newRequsitionMapDetailsArray.push({ RequisitionDetailId: data.requisitionDetailId, CandidateId: data.candidateId });
      var checkRemapp = this.newRequsitionMapDetailsArray.find(e => e.RequisitionDetailId != 0 || e.RequisitionDetailId == 4 || e.RequisitionDetailId == 10
        || e.RequisitionDetailId == 13 || e.RequisitionDetailId == 16 || e.RequisitionDetailId == 19 || e.RequisitionDetailId == 22 || e.RequisitionDetailId == 25
        || e.RequisitionDetailId == 28 || e.RequisitionDetailId == 55 || e.RequisitionDetailId == 56 || e.RequisitionDetailId == 57);
      var checkMapp = this.newRequsitionMapDetailsArray.find(e => e.RequisitionDetailId == 0);
      if (checkRemapp == undefined && checkMapp != undefined) {
        this.enableMapRequisition = true;
        this.enableRemapRequisition = false;
      } else if (checkRemapp != undefined && checkMapp == undefined) {
        this.enableMapRequisition = false;
        this.enableRemapRequisition = true;
      } else {
        this.enableMapRequisition = false;
        this.enableRemapRequisition = false;
      }
    }
    else {
      this.enablecvdrop = true;
      this.enabledeletebtn = true;
      this.enablecanprofile = true;
      // start
      //after deselecting the checkbox candidateid will also be removed from candidateids array same for requisitiondetailids
      let canidarray = this.candidateIds.split(",");
      // console.log(canidarray)
      let index = canidarray.indexOf(data.candidateId.toString());
      canidarray.splice(index, 1);
      this.candidateIds = canidarray.join(",")
      this.reqidarray.splice(index, 1);
      this.requisitionids = this.reqidarray.join(",")
      this.hiringstatusidarray.splice(index, 1);
      this.hiringstatusids = this.hiringstatusidarray.join(",")
      this.candidatedetailsarray.splice(index - 1, 1);
      this.canmapreqarray.splice(index - 1, 1);
      // end
      for (let i = 0; i < this.reqidarray.length; i++) {
        if (this.reqidarray.length == 1) {
          // this.enabledeletebtn=false;
          this.enablecvdrop = false;
          this.enablecanprofile = false;
        }
        else {
          if (this.reqidarray[i] != "0" && this.reqidarray[i] != "") {
            this.enablecvdrop = false;
          }
        }
      }
      for (let i = 0; i < this.hiringstatusidarray.length; i++) {
        if (this.hiringstatusidarray.length == 1) {
          this.enabledeletebtn = false;
        }
        else {
          if ((this.hiringstatusidarray[i] != 0 && this.hiringstatusidarray[i] != 1 && this.hiringstatusidarray[i] != 4 && this.hiringstatusidarray[i] != 7
            && this.hiringstatusidarray[i] != 30 && this.hiringstatusidarray[i] != 37 && this.hiringstatusidarray[i] != 42 && this.hiringstatusidarray[i] != 49 && this.hiringstatusidarray[i] != 55 && this.hiringstatusidarray[i] != 56
            && this.hiringstatusidarray[i] != 57 && this.hiringstatusidarray[i] != 60 && this.hiringstatusidarray[i] != 63) && this.hiringstatusidarray[i] != "") {
            this.enabledeletebtn = false;
          }
        }
      }

      // Anif from here
      this.newRequsitionMapDetailsArray.forEach((element, index) => {
        if (element.CandidateId == data.candidateId) {
          this.newRequsitionMapDetailsArray.splice(index, 1)
        }
      })

      var checkRemapp = this.newRequsitionMapDetailsArray.find(e => e.RequisitionDetailId != 0 || e.RequisitionDetailId == 4 || e.RequisitionDetailId == 10
        || e.RequisitionDetailId == 13 || e.RequisitionDetailId == 16 || e.RequisitionDetailId == 19 || e.RequisitionDetailId == 22 || e.RequisitionDetailId == 25
        || e.RequisitionDetailId == 28 || e.RequisitionDetailId == 55 || e.RequisitionDetailId == 56 || e.RequisitionDetailId == 57);
      var checkMapp = this.newRequsitionMapDetailsArray.find(e => e.RequisitionDetailId == 0);
      if (checkRemapp == undefined && checkMapp != undefined) {
        this.enableMapRequisition = true;
        this.enableRemapRequisition = false;
      } else if (checkRemapp != undefined && checkMapp == undefined) {
        this.enableMapRequisition = false;
        this.enableRemapRequisition = true;
      } else {
        this.enableMapRequisition = false;
        this.enableRemapRequisition = false;
      }
    }
    console.log("canids", this.candidateIds)
  }
  onClickViewDocument(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "employeemanagement");
    this.persistance.set('nextpagename', "ocviewdocument");
    this.persistance.set('type', "plant");
    this.persistance.set('candidateId', data.candidateId);
    this.persistance.set('paramid', data.requisitionDetailId);
    jQuery(".custom-menu").hide();
    this._route.navigate(['app/oc-view-document']);
  }

  getAllRequisition() {
    this.requisitionDepartmentName = "";
    this.requisitionPositionName = "";
    this.requisitionFunctionName = "";
    this.requisitionFunctionId = 0;
    this.requisitionVerticalId = 0;

    this.searchform.patchValue(
      {
        allocatedAutoUserId: this.loginUserId
      });
    this.requisitionService.getAllRequisition(this.searchform.value).subscribe((result) => {
      // console.log("true", this.searchform)
      if (result) {
        // console.log("Candidate List", result)
        this.requisitionLists = result;
        this.array = result;
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


  onCVCandidateTag() {
    this.candidate.requisitionDetailId = this.requisitionDetailId;
    this.candidate.createdBy = this.loginUserId;
    this.candidate.CandidateIds = this.candidateIds;
    this.SpinnerService.show();
    this.requisitionService.updateRequisitionCVCandidateTag(this.candidate).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.getAllCvDropCandidate();
          this.getAllRequisition();
          this.closeCvDropCandidateModal();
          this.candidates = [];
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
  btnDelete() {

  }
  btnUpdateProfile() {

  }
  deletecandidates() {
    this.SpinnerService.show();
    let obj =
    {
      CandidateIds: this.candidateIds
    }
    console.log(obj)
    this.requisitionService.DeleteCandidates(obj).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.getAllCvDropCandidate();
          this.getAllRequisition();
          this.enabledeletebtn = false;
          this.enablecanprofile = false;
          this.enableMapRequisition = false;
          this.enableRemapRequisition = false;
          this.candidateIds = "";
          this.canmapreqarray = [];
          this.hiringstatusidarray = [];
          this.reqidarray = [];
          this.candidatedetailsarray = [];
          this.requisitionids = "";
          this.hiringstatusids = "";
          this.newRequsitionMapDetailsArray = [];
          // jQuery("#deletemodal").modal('toggle');
          this.candidates = [];
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

  changeRequisition(requisitionDetailId: number) {
    this.requisitionDetailId = requisitionDetailId;
    this.requisitionService.getAllRequisition(this.searchform.value).subscribe((result) => {
      if (result) {
        let len = result.length;
        for (let i = 0; i < len; i++) {
          if (result[i].requisitionDetailId == requisitionDetailId) {

            this.candidate.Requisitionno = result[i].requisitionNo;
            this.candidate.Department = result[i].departmentName;
            this.candidate.Location = result[i].locationOffice;
            this.candidate.Position = result[i].positionName;
          }
        }
      }
    })
  }

  closeCvDropCandidateModal() {
    this.requisitionDepartmentName = "";
    this.requisitionPositionName = "";
    this.requisitionFunctionName = "";
    this.requisitionFunctionId = 0;
    this.requisitionVerticalId = 0;
    this.requisitionDetailId = 0;
    this.requisitionLists = [];
    jQuery("#tagCVDropRequisition").modal('toggle');
  }
  // filterValue:any;
  // filterVAlues(){
  //   this.filterValue = this.filterForm.value;
  // }

  gotoCandidateAction(id: any, relativeStatus: any, childRelationshipId: any, cmdUpdateStatus: any, RequisitionDetailId: any) {
    // this.filterVAlues();
    this.persistance.set('tabledisplayStart', this.pagValue);
    //this.persistance.set('previouspagefilters',this.filterValue);
    if ((parseInt(childRelationshipId) > 1 || relativeStatus == "1") && cmdUpdateStatus == "0") {
      jQuery(".custom-menu").hide();
      this.persistance.set('pagename', "dropcvtag");
      this.persistance.set('nextpagename', "candidateaction");
      this.persistance.set('candidateid', id);
      //this.persistance.set('paramid', this.requisitionDetailId);
      this._route.navigate(['/app/my-action/all-positions/candidate-list/candidate-cmd-approval']);
    }
    else {
      jQuery(".custom-menu").hide();
      this.persistance.set('pagename', "dropcvtag");
      this.persistance.set('nextpagename', "candidateaction");
      this.persistance.set('candidateid', id);
      this.persistance.set('paramid', RequisitionDetailId);
      this._route.navigate(['/app/dropcvtag/candidate/viewaction']);
    }
  }


  openModalPopupCallBack(data) {
    this.actionName = "Callback";
    this.objCallbackHistoryInsert.callBackHistoryId = 0;
    this.objCallbackHistoryInsert.requisitionId = this.persistance.get("requisitionidforcallback");
    if (data.requisitionDetailId != 0 || data.requisitionDetailId != null) {
      this.objCallbackHistoryInsert.requisitionDetailId = data.requisitionDetailId;
    }
    else {
      this.objCallbackHistoryInsert.requisitionDetailId = this.persistance.get('paramid');
    }

    this.objCallbackHistoryInsert.verticalId = this.persistance.get("verticalidforcallback");
    this.objCallbackHistoryInsert.candidateId = data.candidateId;
    this.objCallbackHistoryInsert.currentHiringStatusId = 59;
    this.objCallbackHistoryInsert.createdBy = this.createdBy;

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
    else if (this.statusId == 8) {
      this.actionName = "Cancel Interview"
    }
    this.candidateIds = "," + candidateId.toString();
  }

  onChangeCandidateStage(stage: any) {
    if (stage == "I") {
      this.objCallbackHistoryInsert.isFromBeginning = true;
    } else {
      this.objCallbackHistoryInsert.isFromBeginning = false;
    }

  }

  callBackCandidate() {
    var flag = 0;
    var msg = "";
    if (this.objCallbackHistoryInsert.isFromBeginning == undefined) {
      flag = 1;
      msg = "Please select candidate recall stage";
    }
    else {

    }
    if (this.callbackremarks == "") {
      flag = 1;
      msg = "Please enter remarks";
    }
    else {

    }
    if (flag == 0) {
      this.SpinnerService.show();
      this.objCallbackHistoryInsert.callBackRemarks = this.callbackremarks;
      this.requisitionService.insertCallbackRequest(this.objCallbackHistoryInsert).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getAllCvDropCandidate();
            this.callbackremarks = "";
            this.objCallbackHistoryInsert = new CallbackHistoryInsert();
            jQuery("#callBackModal").modal("hide");
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
    else {
      this.notificationService.showError(msg, "Error");
    }
  }


  onClickTagtoRequisition(data) {
    this.verticalsForReleaseTag = [];
    this.verticalsForReleaseTag.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticalsForReleaseTag.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticalsForReleaseTag.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });

    this.objReleaseCandidateTag.candidateId = data.candidateId;
  }
  onChangeVerticalForReleaseTag() {
    this.functionsForReleaseTag = [];
    this.locationsForReleasetag = [];
    this.requisitionListsForReleaseTagFiltered = [];
    this.objReleaseCandidateTag.functionId = null;
    this.objReleaseCandidateTag.locationId = null;
    this.objReleaseCandidateTag.requisitionId = null;
    // this.functionsForReleaseTag = this.functions.filter(e => e.verticalId == this.objReleaseCandidateTag.verticalId);
    //this.locationsForReleasetag = this.locations.filter(e => e.verticalId == this.objReleaseCandidateTag.verticalId);
    this.getAllFunctionForReleaseTag();
    this.getAllLocationForReleaseTag();
  }
  getAllLocationForReleaseTag() {
    this.locationsForReleasetag = [];
    this.searchLocationReleasetag.verticalId = this.objReleaseCandidateTag.verticalId;
    this.locationService.getAllLocation(this.searchLocationReleasetag).subscribe((result) => {
      if (result) {
        this.locationsForReleasetag = result;
        //console.log("Location", this.locations);
        this.locationsForReleasetag.splice(0, 0, {
          locationId: 0,
          verticalId: 0,
          locationNo: "All",
          locationCode: "",
          locationOffice: "All",
          isActive: true,
          createdBy: 0
        })
      }
      else {
        this.locationsForReleasetag = [];
        this.locationsForReleasetag.splice(0, 0, {
          locationId: 0,
          verticalId: 0,
          locationNo: "All",
          locationCode: "",
          locationOffice: "All",
          isActive: true,
          createdBy: 0
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  //Function
  getAllFunctionForReleaseTag() {
    this.functionsForReleaseTag = [];
    this.searchFunctionReleaseTag.verticalId = this.objReleaseCandidateTag.verticalId;
    this.functionService.getAllVerticalFunction(this.searchFunctionReleaseTag).subscribe((result) => {
      if (result) {
        this.functionsForReleaseTag = result;
        this.functionsForReleaseTag.splice(0, 0, {
          functionId: 0,
          functionName: "All",
          verticalId: 0,
          verticalName: "",
          isActive: true
        })
      }
      else {
        this.functionsForReleaseTag = [];
        this.functionsForReleaseTag.splice(0, 0, {
          functionId: 0,
          functionName: "All",
          verticalId: 0,
          verticalName: "",
          isActive: true
        })
      }
    }, error => {
      console.log(error);
    }, () => {

    });
  }


  onChangeToGetReq() {
    // this.requisitionListsForReleaseTagFiltered = [];
    // this.objReleaseCandidateTag.requisitionId = null;
    // this.requisitionListsForReleaseTagFiltered = this.requisitionListsForReleaseTag.filter(e => e.verticalId == this.objReleaseCandidateTag.verticalId && e.functionId == this.objReleaseCandidateTag.functionId && e.locationId == this.objReleaseCandidateTag.locationId);

    let searchdata = {
      RequisitionDetailId: 0,
      VerticalIds: "",
      FunctionIds: "",
      LocationIds: ""
    }
    searchdata.VerticalIds = this.objReleaseCandidateTag.verticalId.toString();
    searchdata.FunctionIds = this.objReleaseCandidateTag.functionId.toString();
    searchdata.LocationIds = this.objReleaseCandidateTag.locationId.toString();

    this.candidateService.getRequitionDetailsForCvDrop(searchdata).subscribe((result) => {
      if (result) {
        this.requisitionListsForReleaseTagFiltered = result;
        //console.log("Requisition List", this.requisitionListsForReleaseTagFiltered);
      }
      else {
        this.requisitionListsForReleaseTagFiltered = []
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }
  onChangeRequisitionForReleaseCandidate() {
    let searchObj = {
      requisitionDetailId: this.objReleaseCandidateTag.requisitionDetailId,
      candidateId: this.objReleaseCandidateTag.candidateId
    }
    this.requisitionService.getAllStageListForRequisitionReleaseCandidate(searchObj).subscribe((result) => {
      // console.log("true", this.searchform)
      if (result) {
        // console.log("Requisition Stage List", result)
        this.requisitionTagStageList = result;
      }
      else {
        this.requisitionTagStageList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  oncickupdateprofile() {
    this.SpinnerService.show();
    const formData = new FormData();
    formData.append("Template", this.interviewEmailTemplateDescription.toString());
    formData.append("CandidateDetailsMail", JSON.stringify(this.candidatedetailsarray));
    let obj =
    {
      Template: this.interviewEmailTemplateDescription.toString(),
      CandidateDetailsMail: this.candidatedetailsarray
    }
    //console.log(obj);
    this.requisitionService.CandidatesUpdateProfile(obj).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
          this.SpinnerService.hide();
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          this.SpinnerService.hide();
          this.enablecanprofile = false;
          this.enabledeletebtn = false;
          this.enableMapRequisition = false;
          this.enableRemapRequisition = false;
          this.candidateIds = "";
          this.canmapreqarray = [];
          this.hiringstatusidarray = [];
          this.reqidarray = [];
          this.candidatedetailsarray = [];
          this.requisitionids = "";
          this.hiringstatusids = "";
          this.newRequsitionMapDetailsArray = [];
        }
      }
      else {
      }
    }, error => {
      // display form values on success
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.closeupdateprofile();
      this.getAllCvDropCandidate();
      this.SpinnerService.hide();
    })
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

    });
  }
  changeInterviewEmailTemplate() {
    if (this.selectedInterviewEmailTemplateId != undefined) {

      var templatedescription = this.interviewemailTemplates.filter(x => x.templateId == this.selectedInterviewEmailTemplateId)[0].templateDescription;

    }


    setTimeout(() => {
      jQuery(".cke_wysiwyg_div").html("");
      jQuery(".cke_wysiwyg_div").html(templatedescription);
    });
    this.interviewEmailTemplateDescription = templatedescription

  }
  closeupdateprofile() {
    this.selectedInterviewEmailTemplateId = null;
    this.interviewEmailTemplateDescription = "";
    jQuery("#updateprofile").modal('toggle');
  }
  onSubmitReleaseCandidateTag() {
    var flag = 0;
    var msg = "";
    if (this.objReleaseCandidateTag.stageId == undefined) {
      flag = 1;
      msg = "Please select  stage";
    }
    else {

    }
    if (this.objReleaseCandidateTag.requisitionDetailId == undefined || this.objReleaseCandidateTag.requisitionDetailId == 0) {
      flag = 1;
      msg = "Please select requisition";
    }
    else {

    }
    if (flag == 0) {
      let releasedObj = {
        CandidateId: this.objReleaseCandidateTag.candidateId,
        RequisitionDetailId: this.objReleaseCandidateTag.requisitionDetailId,
        Remarks: this.objReleaseCandidateTag.remarks,
        AssignedHiringStatusId: this.objReleaseCandidateTag.stageId,
        AssignedByUserId: this.objReleaseCandidateTag.assignedByUserId
      }
      this.SpinnerService.show();
      this.requisitionService.saveRequisitionReleaseCandidate(releasedObj).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getAllCvDropCandidate();
            this.objReleaseCandidateTag = new ReleaseCandidateTag();
            jQuery("#tagReleaseCandidateRequisition").modal("hide");
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
      this.SpinnerService.hide();
      jQuery("#tagReleaseCandidateRequisition").modal("hide");
    }
    else {
      this.notificationService.showError(msg, "Error");
    }
  }

  btnClickMapRequsition() {
    this.getAllVerticals();
    this.isMappedtoNew = true;
    let searchObj = {
      LoggedinUserId: this.loginUserId
    }
    this.requsitionListforMapping = [];
    this.SpinnerService.show();
    this.requisitionService.ddlGetAllRequisition(searchObj).subscribe((result) => {
      if (result) {
        this.requsitionListforMapping = result;
        this.isMappedtoNew = false;
        //  console.log("Requisition List for mapping", this.requsitionListforMapping);
        this.SpinnerService.hide();
      }
      else {
        this.requsitionListforMapping = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }
  btnClickReMapRequsition() {
    this.getAllVerticals();
    this.isMappedtoNew = false;
    let searchObj = {
      LoggedinUserId: this.loginUserId
    }
    this.requsitionListforMapping = [];
    this.SpinnerService.show();
    this.requisitionService.ddlGetAllRequisition(searchObj).subscribe((result) => {
      if (result) {
        this.requsitionListforMapping = result;
        this.isMappedtoNew = false;
        //console.log("Requisition List for Remapping", this.requsitionListforMapping);
        this.SpinnerService.hide();
      }
      else {
        this.requsitionListforMapping = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }
  optnClickMapRequisition(data: any) {
    this.btnClickMapRequsition();
    this.candidateIds = data.candidateId.toString();
  }

  onRequisitionMappedSubmit() {
    var flag = 0;
    var msg = "";
    if (this.selectedRequisitionDetailsIdForMap == undefined || this.selectedRequisitionDetailsIdForMap == null) {
      flag = 1;
      msg = "Please select  Requisition";
    }
    else {
      //stores the values of selected requisition
      var val = this.requsitionListforMapping.find(e => e.requisitionDetailId == this.selectedRequisitionDetailsIdForMap)
      this.canmapreqarray.forEach(e => {
        e.Position = val.positionName,
          e.Department = val.departmentName,
          e.Location = val.locationOffice,
          e.Function = val.functionName,
          e.ReqNo = val.requisitionNo
      })
    }
    if (flag == 0) {
      let requisitionMapObj = {
        CandidateId: this.candidateIds,
        RequisitionDetailsId: this.selectedRequisitionDetailsIdForMap,
        NewRequisitionTag: this.isMappedtoNew,
        CreatedBy: this.loginUserId,
        CandidateDetailsCvDropTag: this.canmapreqarray
      }
      console.log("save obj", requisitionMapObj);
      this.SpinnerService.show();
      this.requisitionService.newCandidateRequisitionMapInsert(requisitionMapObj).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getAllCvDropCandidate();
            this.selectedRequisitionDetailsIdForMap = null;
            this.enablecvdrop = false;
            this.enabledeletebtn = false;
            this.enablecanprofile = false;
            this.enableMapRequisition = false;
            this.enableRemapRequisition = false;
            this.candidateIds = "";
            this.canmapreqarray = [];
            this.hiringstatusidarray = [];
            this.reqidarray = [];
            this.candidatedetailsarray = [];
            this.requisitionids = "";
            this.hiringstatusids = "";
            this.newRequsitionMapDetailsArray = [];
            jQuery("#mymodal32").modal("hide");
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
      this.SpinnerService.hide();
      jQuery("#mymodal32").modal("hide");
    }
    else {
      this.notificationService.showError(msg, "Error");
    }

  }
  onClickRejectedStatus(data: any) {
    // jQuery("#rejectDetailsModal").modal('show');
    switch (data.hiringStatusId) {
      case 4:
        this.rejectedBy = "Recruitment Team"
        break;
      case 10:
        this.rejectedBy = "Panel Member"
        break;
      case 13:
        this.rejectedBy = "Panel Member"
        break;
      case 16:
        this.rejectedBy = "Panel Member"
        break;
      case 19:
        this.rejectedBy = "Panel Member"
        break;
      case 22:
        this.rejectedBy = "Panel Member"
        break;
      case 25:
        this.rejectedBy = "Panel Member"
        break;
      case 28:
        this.rejectedBy = "Panel Member"
        break;
      case 55:
        this.rejectedBy = "Onboarding Team"
        break;
      case 56:
        this.rejectedBy = "Onboarding Team"
        break;
      case 57:
        this.rejectedBy = "Onboarding Team"
        break;
    }
  }
  onReqFilter() {
    let searchObj = {
      LoggedinUserId: this.loginUserId,
      FunctionId: this.functionIdforreq,
      VerticalId: this.verticalIdforreq,
      LocationId: this.locationidforreq
    }
    this.requsitionListforMapping = [];
    this.SpinnerService.show();
    this.requisitionService.ddlGetAllRequisition(searchObj).subscribe((result) => {
      if (result) {
        this.requsitionListforMapping = result;
        this.isMappedtoNew = false;
        //  console.log("Requisition List for mapping", this.requsitionListforMapping);
        this.SpinnerService.hide();
      }
      else {
        this.requsitionListforMapping = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }
  onResetReqFilter() {
    this.functionIdforreq = undefined;
    this.locationidforreq = undefined;
    this.verticalIdforreq = undefined;
    let searchObj = {
      LoggedinUserId: this.loginUserId,
    }
    this.requsitionListforMapping = [];
    this.SpinnerService.show();
    this.requisitionService.ddlGetAllRequisition(searchObj).subscribe((result) => {
      if (result) {
        this.requsitionListforMapping = result;
        this.isMappedtoNew = false;
        //  console.log("Requisition List for mapping", this.requsitionListforMapping);
        this.SpinnerService.hide();
      }
      else {
        this.requsitionListforMapping = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }
  getAllVerticalforReffered() {
    this.verticalService.getAllVertical(this.searchVertical).subscribe((response: any) => {
      if (response) {
        this.VerticalList = response;
        // console.log("VerticalList: ", response);
      }
      else {
        this.VerticalList = [];
      }
    }, error => {
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }
  onChangeVerticalforReffered(verticalID: any) {
    let data: any = {
      'VerticalId': verticalID,
      'IsActive': true
    }
    this.searchDepartment.verticalId = verticalID;
    this.searchLocation.verticalId = verticalID;
    this.getVerticalFunctionforReffered(data);
  }

  getVerticalFunctionforReffered(data: any) {
    this.functionService.getAllVerticalFunction(data).subscribe((response: any) => {
      if (response) {
        this.FunctionList = response;
        // console.log("FunList: ", this.FunctionList);
        this.SpinnerService.hide();
      }
      else {
        this.FunctionList = [];
      }
    }, error => {
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
      this.SpinnerService.hide();
    })
  }
  onChangeFunctionforReffered(functionId: any) {
    this.searchDepartment.functionId = functionId;
    this.getAllDepartmentforReffered();
  }
  //department
  getAllDepartmentforReffered() {
    this.departments = [];
    // this.searchDepartment.verticalId = this.StaticVerticalId;
    // this.searchDepartment.functionId = this.functionId;
    this.departmentService.getAllFunctionDepartment(this.searchDepartment).subscribe((result) => {
      if (result) {
        this.departments = result;
        //console.log(this.departments);
      }
      else {
        this.departments = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      // this.loadSelectPicker();
    });
  }
  changeQualificationType() {
    if (this.filterForm.value.QualificationTypeId[0] == 0) {
      this.toggle = true
      if (this.quallength == this.qualificationType.length) {
        this.filterForm.value.QualificationTypeId = [];
        this.quallength = this.filterForm.value.QualificationTypeId.length;
      }
      else {
        this.filterForm.value.QualificationTypeId = [];
        for (let i = 0; i < this.qualificationType.length; i++) {
          this.filterForm.value.QualificationTypeId.push(parseInt(this.qualificationType[i].qualificationTypeId))
        }
        this.quallength = this.filterForm.value.QualificationTypeId.length;
      }

    }
    else {
      this.toggle = false
    }
    this.filterForm.patchValue(
      {
        QualificationTypeId: this.filterForm.value.QualificationTypeId
      }
    )
  }
  changeCourse() {
    if (this.filterForm.value.CourseId[0] == 0) {
      this.closecourse = true;
      if (this.courselength == this.courses.length) {
        this.filterForm.value.CourseId = [];
        this.courselength = this.filterForm.value.CourseId.length;
      }
      else {
        this.filterForm.value.CourseId = [];
        for (let i = 0; i < this.courses.length; i++) {
          this.filterForm.value.CourseId.push(parseInt(this.courses[i].courseId))
        }
        this.courselength = this.filterForm.value.CourseId.length;
      }
    }
    else {
      this.closecourse = false;
    }
    this.filterForm.patchValue(
      {
        CourseId: this.filterForm.value.CourseId
      }
    )
    console.log("c", this.filterForm.value.CourseId)
  }
  changeStream() {
    if (this.filterForm.value.StreamId[0] == 0) {
      this.closestream = true;
      if (this.streamlength == this.StreamList.length) { //written By Amartya
        this.filterForm.value.StreamId = [];
        this.streamlength = this.filterForm.value.StreamId.length;
      }
      else {
        this.filterForm.value.StreamId = [];
        for (let i = 0; i < this.StreamList.length; i++) {
          this.filterForm.value.StreamId.push(parseInt(this.StreamList[i].streamId))
        }
        this.streamlength = this.filterForm.value.StreamId.length;
      }

    }
    else {
      this.closestream = false;
    }
    this.filterForm.patchValue(
      {
        StreamId: this.filterForm.value.StreamId
      }
    )
  }

  changeSubDomain() {
    if (this.filterForm.value.SubDomainId[0] == 0) {
      this.closesdomain = true
      if (this.subdomainlength == this.subdomain.length) {
        this.filterForm.value.SubDomainId = [];
        this.subdomainlength = this.filterForm.value.SubDomainId.length;
      }
      else {
        this.filterForm.value.SubDomainId = [];
        for (let i = 0; i < this.subdomain.length; i++) {
          this.filterForm.value.SubDomainId.push(this.subdomain[i].domainId)
        }
        this.subdomainlength = this.filterForm.value.SubDomainId.length;
      }

    }
    else {
      this.closesdomain = false
    }
    this.filterForm.patchValue(
      {
        SubDomainId: this.filterForm.value.SubDomainId
      }
    )

  }
  closeQualificationDropdown(selectElement: HTMLSelectElement) {
    if (this.toggle) {
      selectElement.click();
      this.elementRef.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
    }

  }
  onclosecourse(selectElement: HTMLSelectElement) {
    if (this.closecourse) {
      selectElement.click();
      this.elementRef.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
    }
  }
  onclosestream(selectElement: HTMLSelectElement) {
    if (this.closestream) {
      selectElement.click();
      this.elementRef.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
    }
  }
  closeDomain(selectElement: HTMLSelectElement) {
    if (this.closedomain) {
      selectElement.click();
      this.elementRef.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
    }
  }
  closesubdomain(selectElement: HTMLSelectElement) {
    if (this.closesdomain) {
      selectElement.click();
      this.elementRef.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
    }
  }
  closecurrentlocation(selectElement: HTMLSelectElement) {
    if (this.closecurloc) {
      selectElement.click();
      this.elementRef.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
    }
  }
  closesource(selectElement: HTMLSelectElement) {
    if (this.closesourcechannel) {
      selectElement.click();
      this.elementRef.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
    }
  }
  onChangeCurrentlocation() {
    if (this.filterForm.value.StateIds[0] == 0) {
      this.closecurloc = true;
      if (this.currentlocationlength == this.State.length) {
        this.filterForm.value.StateIds = [];
        this.currentlocationlength = this.filterForm.value.StateIds.length;
      }
      else {
        this.filterForm.value.StateIds = [];
        for (let i = 0; i < this.State.length; i++) {
          this.filterForm.value.StateIds.push(this.State[i].stateId)
        }
        this.currentlocationlength = this.filterForm.value.StateIds.length;
      }
    }
    else {
      this.closecurloc = false;
    }
    this.filterForm.patchValue(
      {
        StateIds: this.filterForm.value.StateIds
      }
    )
  }
  reqlength: any;
  onchangereqstatus() {
    if (this.filterForm.value.PreviousApplied[0] == 0) {
      this.reqstat = true;
      if (this.reqlength == 3) {
        this.filterForm.value.PreviousApplied = [];
        this.reqlength = this.filterForm.value.PreviousApplied.length;
      }
      else {
        this.filterForm.value.PreviousApplied = [];
        for (let i = 1; i < 4; i++) {
          this.filterForm.value.PreviousApplied.push(i)
        }
        this.reqlength = this.filterForm.value.PreviousApplied.length;
      }
    }
    else {
      this.reqstat = false;
    }
    this.filterForm.patchValue(
      {
        PreviousApplied: this.filterForm.value.PreviousApplied
      }
    )
  }
  onclosereqstatus(selectElement: HTMLSelectElement) {
    if (this.reqstat) {
      selectElement.click();
      this.elementRef.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
    }
  }
  Next(){
    this.filtercandidate.pagenumber=this.filtercandidate.pagenumber+1;
    this.getAllCvDropCandidate();
  }
  onchangeSource() {
    if (this.filterForm.value.SourceChannelId[0] == 0) {
      this.closesourcechannel = true;
      if (this.sourcelength == 8) {
        this.filterForm.value.SourceChannelId = [];
        this.sourcelength = this.filterForm.value.SourceChannelId.length;
      }
      else {
        this.filterForm.value.SourceChannelId = [];
        for (let i = 1; i < 9; i++) {
          this.filterForm.value.SourceChannelId.push(i)
        }
        this.sourcelength = this.filterForm.value.SourceChannelId.length;
      }
    }
    else {
      this.closesourcechannel = false;
    }
    this.filterForm.patchValue(
      {
        SourceChannelId: this.filterForm.value.SourceChannelId
      }
    )
  }
  exportToExcel() {
    var downloadinExcel = [];
    this.candidates.forEach(element => {
      let headerObj = {
        "Candidate Id": element.candidateNo,
        "Candidate Name": element.prefixName + " " + element.fullName,
        "Age": element.age,
        "Highest Qualification": element.qualificationName,
        "Course": element.courseName,
        "Stream": element.streamName,
        "Experience": element.experienceYear + " Years " + element.experienceMonth + " Months",
        "Present Company": element.currentEmployer,
        "Designation": element.currentDesignation,
        "Relatives": element.relativeStatus == 1 ? "Yes" : "No",
        "Source": element.sourceChannelName,
        "Candidate Owner": element.candidateOwner,
        "Date of Submission": element.dateOfSubmission,
        "Mapped to Requisition": element.mappedToRequisition,
        "Requisition No": element.requisitionNo,
        "Requisition Status": element.rmProcessStatus,
        "Application Form Status": element.applicationCount == 1 ? "Application Filled" : "Application Not Filled",
        "MRF Rec/Emp History": element.previousApplied == 0 ? "No" : "Yes",
        "Hiring Status": element.hiringStatusName,
        "IsReffered": element.isRefferedId == 0 ? "No" : "Yes"
      }
      downloadinExcel.push(headerObj);
    })
    this.excelService.ExportAsExcelFile(downloadinExcel, "Candidate profile search");
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
  isFromBeginning: boolean;
  callBackRemarks: string;
  createdBy: number;
}

// Adde class by Anif

class ReleaseCandidateTag {
  callBackHistoryId: number;
  requisitionId: number;
  requisitionDetailId: number;
  candidateId: number;
  verticalId: number;
  functionId: number;
  locationId: number;
  stageId: number;
  remarks: string;
  assignedByUserId: number;
}

