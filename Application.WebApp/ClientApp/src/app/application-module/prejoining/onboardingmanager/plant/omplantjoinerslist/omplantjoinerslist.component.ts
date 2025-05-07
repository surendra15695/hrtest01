import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../../interfaces/common/doctor.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../../interfaces/common/function.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../../interfaces/common/position.interface';
import { IJoinersList, IPendingScheduleBatchWise, IPendingScheduleIndividual, IScheduledBatchWise, IScheduledIndividually, IReportingVenueExists, IInductionProgrammeCoOrdinatiorAssigned, IInductionProgrammeCoOrdinatiorAssignedSearch, IShareWithCandidate } from '../../../../../interfaces/prejoining/joinerslist.interface';
import { IOnboardingCoordinator, ISearchOnboardingCoordinator, IVenue, ISearchVenue, IJoiningDocument, IWelcomeTemplate, ICandidateInductionSchedule } from '../../../../../interfaces/prejoining/onboardingcoordinator.interface';
import { ICandidateDetailData, ISearchCandidateDetail, IModeOfJoining, ISearchModeOfJoining } from '../../../../../interfaces/preselection/candidate.interface';
import { LocationService } from '../../../../../services/common/location/location.service';
import { CommonService } from '../../../../../services/common/common/common.service';
import { FunctionService } from '../../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../../services/common/department/department.service';
import { PositionService } from '../../../../../services/common/position/position.service';
import { RecruitmentmanagerService } from '../../../../../services/prejoining/recruitmentmanager/recruitmentmanager.service';
import { ShareddataService } from '../../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { environment } from '../../../../../../environments/environment';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { CorporateallocationService } from '../../../../../services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { JoinersService } from '../../../../../services/prejoining/onboardingcoordinator/joiners.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { RequisitionService } from '../../../../../services/preselection/requisition/requisition.service';
import { IApproverVertical, IApproverFunction, IApproverDepartment, IApproverVerticalFunctionDepartment, IApproverFunctionDepartment, IBatch, ISearchBatch, IProgramCoordinator, ISearchProgramCoordinator } from '../../../../../interfaces/common/common.interface';
import { IAttachmentDocumentNameDetails, ISearchAttachmentDocumentName } from 'src/app/interfaces/common/attachmentdocument.interface';
import { AttachmentdocumentService } from 'src/app/services/common/attachementdocument/attachmentdocument.service';
import { IEmailTemplate, ISearchEmailTemplate } from 'src/app/interfaces/common/emailtemplate.interface';
import { EmailtemplateService } from 'src/app/services/common/emailtemplate/emailtemplate.service';
import { PlantallocationService } from 'src/app/services/prejoining/onboardingmanager/plant/plantallocation.service';
import * as _ from 'lodash';
declare var jQuery: any;

@Component({
  selector: 'app-omplantjoinerslist',
  templateUrl: './omplantjoinerslist.component.html',
  styleUrls: ['./omplantjoinerslist.component.css']
})
export class OmplantjoinerslistComponent implements OnInit {

  searchformJoinerList: FormGroup;
  searchformPendingScheduleIndividual: FormGroup;
  searchformPendingScheduleBatch: FormGroup;
  searchformScheduledIndividual: FormGroup;
  searchformScheduledBatchWise: FormGroup;
  saveform: FormGroup;
  updateJoiningDateForm: FormGroup;
  confirmJoiningTypeForm: FormGroup;
  candidateMoveSaveForm: FormGroup;
  saveReportingVenueForm: FormGroup;
  shareInductionScheduleWithCandidateForm: FormGroup;
  assignProgramCoordinatorForm: FormGroup;
  reassignProgramCoordinatorForm: FormGroup;
  showBatchSection: boolean = true;
  showBatchForMove: boolean = true;
  // searchReportingVenueForm: FormGroup;
  @ViewChild('dtofJoiningFrom', { static: false }) dtofJoiningFrom: ElementRef;
  @ViewChild('dtofJoiningTo', { static: false }) dtofJoiningTo: ElementRef;
  @ViewChild('fromDatePendingBatch', { static: false }) fromDatePendingBatch: ElementRef;
  @ViewChild('toDatePendingBatch', { static: false }) toDatePendingBatch: ElementRef;
  @ViewChild('fromDateScheduledBatch', { static: false }) fromDateScheduledBatch: ElementRef;
  @ViewChild('toDateScheduledBatch', { static: false }) toDateScheduledBatch: ElementRef;
  @ViewChild('templateText', { static: false }) templateText: ElementRef;
  @ViewChild('dateOfJoining', { static: false }) dtOfJoining: ElementRef;
  @ViewChild('dateOfBatchJoining', { static: false }) dtOfBatchJoining: ElementRef;
  //vertical
  verticals: IVertical[] = [];
  verticalsPopUp: IVertical[] = [];
  selectedPendingVertical: IVertical;
  selectedVerticalId: number;
  defaultverticalId: number;
  //location
  locations: ILocation[] = [];
  selectedLocation: ILocation;
  searchLocation: ISearchLocation =
    {
      locationId: null,
      verticalId: null,
      locationCode: null,
      locationNo: null,
      isActive: true
    };
  selectedLocationId: number;

  //function
  functions: IVerticalFunction[] = [];
  selectedFunction: IVerticalFunction;
  searchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  selectedfunctionId: number;
  functionName: string;
  // Orboarding Coordinator
  // onBoardingCoordinatorList: IOnboardingCoordinator[] = [];
  // selectedCoordinator: IOnboardingCoordinator;
  // searchCoordinator: ISearchOnboardingCoordinator = {
  //   requisitionDetailId: null
  // }

  onBoardingCoordinatorList: any[] = [];
  searchRoleUser: any = {
    roleId: 0
  }
  //Mode Of Joining
  modeOfJoiningList: IModeOfJoining[] = [];
  searchModeOfJoining: ISearchModeOfJoining = {
    modeofJoiningId: null,
    isActive: null
  }
  // Batch
  Verticalbatchs: IBatch[] = [];
  batchs: IBatch[] = [];
  allbatchs: any[] = [];
  selectedBatch: IBatch;
  searchBatch: ISearchBatch = {
    batchId: null,
    vertical: null,
    isActive: null
  }
  // venue
  venues: IVenue[] = [];
  selectedVenue: IVenue;
  searchVenue: ISearchVenue = {
    reportingVenueId: null,
    isActive: null
  }
  loginUserId: number;
  verticalIds: string;
  roleIds: string;
  joinersList: IJoinersList[] = [];
  pendingScheduleCandidateListBatchWise: IPendingScheduleBatchWise[] = [];
  pendingScheduleCandidateindividual: IPendingScheduleIndividual[] = [];
  scheduledIndividually: IScheduledIndividually[] = [];
  scheduledBatchWise: IScheduledBatchWise[] = [];
  requisitionDetailId: number;
  selectAllJoiners: boolean;
  selectAllAllocated: boolean;
  callngIfFunction: boolean = true;
  allocationType: string;
  sendToAllocationCandidateId: number;
  updatedJoiningDateArray: any[] = [];
  modeofJoiningId: number = null;
  joiningDate: any;
  sendingJoinigConfirmationType: string;
  sendingJoiningConfirmationCandidateId: number;
  selectAllIndividual: boolean;
  selectAllScheduledIndividual: boolean;
  moveType: string;
  movingCandidateId: number;
  joiningTypeList: any[] = [];
  candidateIdForReportingVenue: number;
  reportingVenueExists: IReportingVenueExists[] = [];
  addingReportingVenueFor: string;
  addingReportingVenueForNo: string;
  addingReportingVenueForId: number;
  // Share with Candidate
  joiningDocument: IJoiningDocument[] = [];
  welcomeTemplate: IWelcomeTemplate[] = [];
  shareWithCandidateArray: any[] = [];
  sharingType: string;
  sharingCandidateId: number;
  sharingCandidateName: string = "";
  joiningDocumentsIds: string = "";
  sharingCandidateRequisitionId: number;
  // 5th module
  inductionProgramCoordinatorAssignType: string;
  // program coordinator
  programCoordinatorList: IProgramCoordinator[] = [];
  searchProgramCoordinator: ISearchProgramCoordinator = {
    //roleId: 28   // Previous
    roleId: 45
  }
  // Assigned program coordinator
  assignedProgramCoordinatorDeatails: IInductionProgrammeCoOrdinatiorAssigned[] = [];
  searchAssignedProgramCoordinator: IInductionProgrammeCoOrdinatiorAssignedSearch = {
    batchId: null,
    candidateId: null,
  }
  allJoiningDateInformation: any[] = [];

  actionName: string;
  declaineCandidateId: number;
  declineremarks: string;
  tabName: string;
  parentActiveTab: string = "New Joiners";
  pendingChildActiveTab: string = "Individual";
  scheduleChildActiveTab: string = "Individual";
  persistanceParentActiveTab: string;
  childActiveTab: string;

  // Added Later
  accommodationAndVenueDetails: any;
  venueDetails: any;
  accommodationDetails: any[] = [];
  identicalAccommodationDetails: any[] = [];
  allAccommodationDetails: string = "";
  identicalTrainingCoordinator: any[] = [];
  allCandidateVenueDetails: any[] = [];
  trainingCoordinatorDetails: string = "We advise you to get in touch with";
  reportingTimeDetails: any[] = [];
  sharingJoiningDate: string;
  multipleCandidateId: string = "";
  searchAccommodationDetails = {
    batchId: null,
    candidateId: null,
  }
  allUserList: any[] = [];
  coordinatorName: string;
  selectedTestEmailTemplateId: number;
  testEmailTemplateDescription: string;
  // Joining Document
  documentNames: IAttachmentDocumentNameDetails[] = [];
  documentNameList: IAttachmentDocumentNameDetails[] = [];
  searchDocumentName: ISearchAttachmentDocumentName = {
    attachmentDocumentNameId: null,
    attachmentDocumentParticularId: null,
    isActive: true
  }
  // Email Template
  emailTemplates: IEmailTemplate[] = [];
  searchEmailTemplate: ISearchEmailTemplate = {
    // templateTypeId: 7,
    //templateTypeId: 7,
    templateTypeId: 43,
    templateId: null,
    isActive: true
  }
  searchCandidate = {
    batchId: null,
    onBordingMangerId: null,
    onBordingCoordinatorId: null,
    dtofJoiningFrom: "",
    dtofJoiningTo: "",
    candidateName: "",
    verticalId: null,
    locationId: null,
    functionId: null,

  }
  batchWiseCandidateList: any[] = [];
  saveShareWithCandidate: IShareWithCandidate = {
    shareWithCandidateHeaderId: null,
    shareWithCandidates: [],
    candidateAdditionalDocumentId: [],   // Added By anif on 25-01-2023
    shareWithCandidatesInductionAccommodationAttachment: [],  // Added By anif on 08-11-2022
    shareWithCandidatesForSchedular: [], // Added By Anif 0n 21-08-2023
    shareWithCandidatesInductionForSchedular: [], // Added By Anif 0n 21-08-2023
    shareWithCandidatesAccommodationForSchedular: [], // Added By Anif 0n 21-08-2023
    templateId: null,
    templateBody: "",
    candidateId: "",
    remarks: "",
    mailingStatus: null,
    isActive: false,
    createdBy: null,
  }
  // Share with Inductors
  from: any;
  searchInductionSchedule = {
    candidateInductionScheduleId: null,
  }
  inductionSchedule: ICandidateInductionSchedule;
  // searchRoleUser: any = {
  //   roleId: 0
  // }
  objUpdateJoinigDateForBatch: UpdateJoinigDateForBatch;
  batchJoiningDate: any;
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
    private titleService: Title,
    private positionService: PositionService,
    private joinersservice: JoinersService,
    private requisitionService: RequisitionService,
    private attachmentDocumentService: AttachmentdocumentService,
    private emailtemplateService: EmailtemplateService,
    private plantservice: PlantallocationService,
  ) {
    this.SpinnerService.show();
    this.objUpdateJoinigDateForBatch = new UpdateJoinigDateForBatch();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.roleIds = this.persistance.get('loggedinuser').roleIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.persistanceParentActiveTab = this.persistance.get("parentActiveTab");
    this.childActiveTab = this.persistance.get("childActiveTab");
    if (this.persistanceParentActiveTab != null) {
      this.parentActiveTab = this.persistanceParentActiveTab;
      if (this.persistanceParentActiveTab == "Scheduled") {
        this.scheduleChildActiveTab = this.childActiveTab;
      } else {
        this.pendingChildActiveTab = this.childActiveTab;
      }
    }
    this.persistance.set('parentActiveTab', null);
    this.persistance.set('childActiveTab', null);
    this.joiningTypeList.push({ joiningTypeId: "I", joinigTypeName: "Individual" }, { joiningTypeId: "B", joinigTypeName: "Batch" });
    this.createJoinerListSearchForm();
    this.createPendingScheduleIndividualSearchForm();
    this.createPendingScheduleBatchSearchForm();
    this.createScheduledIndividualSearchForm();
    this.createScheduledBatchwiseSearchForm();
    this.createJoiningConfirmTypeForm();
    this.createCandidateMoveSaveForm();
    this.createReportingVenueSaveForm();
    this.createShareInductionForm();
    this.createAssignProgramCoordinatorForm();
    this.createReassignProgramCoordinatorForm();
    // this.createReportingVenueFormSearchForm();
    this.onClickPendingScheduleTab();
    this.onClickScheduledTab()
    this.getAllVerticals();
    this.getVerticalsForPopUp();
    // this.getAllBatch();
    this.getVenue();
    this.getAllOnboardingCoordinator();
    this.getAllCandidateJoinerList();
    this.getModeOfJoining();
    //this.getVerticalsForPopUp();
    this.getAllUsers();
    //push to joinig document
    this.joiningDocument.push({ documnetId: 1, documentName: "ESI Declaration Form" }, { documnetId: 2, documentName: "SBI Initial Disclosure" });
    // push to welcome template
    this.welcomeTemplate.push({ welcomeTemplateId: 1, welcomdeTemplateName: "Sample 1" }, { welcomeTemplateId: 2, welcomdeTemplateName: "Sample 2" });
  }

  ngOnInit() {
    this.loadDataTable();
    this.loadDataTable2();
    this.loadDataTable3();
    this.loadDataTable4();
    this.loadDataTable5();
    this.loadDatePicker();
    this.loadEditor();
    this.loadTooltipMenu();
    this.loadPopover();
    //this.loadDatePicker2();
    var roleIdArray = this.roleIds.split(',');
    roleIdArray.includes("49") == true ? this.from = 'OH' : this.from = 'OM'
  }

  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "fixedColumns": {
          "left": 3
        },
        "drawCallback": function (settings) {
          setTimeout(() => {
            jQuery('[data-toggle="popover"]').popover({
              html: true
            });
          });
        }
      });
    });
  }
  loadDataTable2() {
    jQuery('#dataTable2').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable2').DataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "fixedColumns": {
          "left": 3
        },
        "drawCallback": function (settings) {
          setTimeout(() => {
            jQuery('[data-toggle="popover"]').popover({
              html: true
            });
          });
        }
      });
    });
  }
  loadDataTable3() {
    jQuery('#dataTable3').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable3').DataTable({
        "searching": false,
        "paging": true,
        "scrollX": false,
        "bLengthChange": false,
        "drawCallback": function (settings) {
          setTimeout(() => {
            jQuery('[data-toggle="popover"]').popover({
              html: true
            });
          });
        }
      });
    });
  }
  loadDataTable4() {
    jQuery('#dataTable4').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable4').DataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "fixedColumns": {
          "left": 3
        },
        "drawCallback": function (settings) {
          setTimeout(() => {
            jQuery('[data-toggle="popover"]').popover({
              html: true
            });
          });
        }
      });
    });
  }
  loadDataTable5() {
    jQuery('#dataTable5').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable5').DataTable({
        "searching": false,
        "paging": true,
        "scrollX": false,
        "bLengthChange": false,
        "drawCallback": function (settings) {
          setTimeout(() => {
            jQuery('[data-toggle="popover"]').popover({
              html: true
            });
          });
        }
      });
    });
  }
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }
  loadEditor() {
    jQuery("#txtEditor").Editor({
      'l_align': false,
      'r_align': false,
      'c_align': false,
      'justify': false,
      'print': false,
      'rm_format': false,
      'select_all': false,
      'source': false,
      'togglescreen': false,
      'indent': false,
      'outdent': false,
      'hr_line': false,
      'strikeout': false,
      'insert_img': false
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
  createJoinerListSearchForm() {
    this.searchformJoinerList = this.fb.group({
      requisitionDetailId: [this.requisitionDetailId],
      candidateId: [0],
      onBordingMangerId: [0],
      onBordingCoordinatorId: [0],
      dtofJoiningFrom: [''],
      dtofJoiningTo: [''],
      candidateName: [''],
      verticalId: [2],
      locationId: [0],
      functionId: [0],
    });
  }
  createPendingScheduleIndividualSearchForm() {
    this.searchformPendingScheduleIndividual = this.fb.group({
      candidateId: null,
      onBordingMangerId: null,
      onBordingCoordinatorId: null,
      candidateName: [''],
      verticalId: [2],
      locationId: null,
      functionId: null,
    });
  }
  createPendingScheduleBatchSearchForm() {
    this.searchformPendingScheduleBatch = this.fb.group({
      batchNo: [''],
      onBordingMangerId: null,
      onBordingCoordinatorId: null,
      verticalId: [2],
      dtofJoiningFrom: [''],
      dtofJoiningTo: ['']
    });
  }
  // getAllOnboardingCoordinator() {
  //   this.onBoardingCoordinatorList = [];
  //   this.searchCoordinator.requisitionDetailId = this.requisitionDetailId.toString();
  //   this.corporateService.getAllOnboardingCorordinator(this.searchCoordinator).subscribe((result) => {
  //     if (result) {
  //       this.onBoardingCoordinatorList = result;
  //     }
  //     else {
  //       this.onBoardingCoordinatorList = [];

  //     }
  //   }, error => {
  //     console.log(error);
  //   }, () => {
  //     // this.loadSelectPicker();
  //   });
  // }

  getAllOnboardingCoordinator() {
    this.onBoardingCoordinatorList = [];
    if (this.verticalIds == "1") {
      this.searchRoleUser.roleId = 24
    }
    else if (this.verticalIds == "2") {
      this.searchRoleUser.roleId = 25
    }
    else if (this.verticalIds == "3") {
      this.searchRoleUser.roleId = 26
    }
    this.SpinnerService.show();
    //this.candidateService.getAllOnboardingManager(this.searchOnboardingManager).subscribe((result) => {
    this.commonService.getRoleWiseUser(this.searchRoleUser).subscribe((result) => {
      if (result) {
        this.onBoardingCoordinatorList = result;
      }
      else {
        this.onBoardingCoordinatorList = [];
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  createScheduledIndividualSearchForm() {
    this.searchformScheduledIndividual = this.fb.group({
      candidateId: null,
      onBordingMangerId: null,
      onBordingCoordinatorId: null,
      candidateName: [''],
      verticalId: [2],
      locationId: null,
      functionId: null,
    });
  }
  createScheduledBatchwiseSearchForm() {
    this.searchformScheduledBatchWise = this.fb.group({
      batchNo: [''],
      onBordingMangerId: null,
      onBordingCoordinatorId: null,
      verticalId: [2],
      dtofJoiningFrom: [''],
      dtofJoiningTo: ['']
    });
  }
  createJoiningConfirmTypeForm() {
    this.confirmJoiningTypeForm = this.fb.group({
      candidateId: null,
      joinigType: null,
      vertical: null,
      batchId: null,
      createdBy: this.loginUserId,
      batchType: "1"
    });
    this.confirmJoiningTypeForm.controls.batchId.disable();

  }
  createShareInductionForm() {
    this.shareInductionScheduleWithCandidateForm = this.fb.group({
      shareWithCandidateId: null,
      templateId: null,
      candidateJoiningDocumentId: null,
      candidateRequisitionDetailsId: this.requisitionDetailId,
      candidateInductionScheduleDetailsId: null,
      candidateId: null,
      templateBody: null,
      isSend: false,
      createdBy: this.loginUserId,
    });
  }
  createAssignProgramCoordinatorForm() {
    this.assignProgramCoordinatorForm = this.fb.group({
      inductionProgrammeCoOrdinatiorAssignId: 0,
      batchId: null,
      candidateId: null,
      coOrdinatiorId: null,
      createdBy: this.loginUserId,
    });
  }
  createReassignProgramCoordinatorForm() {
    this.reassignProgramCoordinatorForm = this.fb.group({
      inductionProgrammeCoOrdinatiorAssignId: 0,
      batchId: null,
      candidateId: null,
      coOrdinatiorId: null,
      createdBy: this.loginUserId,
      assignedCoordinatorName: ""
    });
  }
  //verticals
  getAllVerticals() {
    this.verticals = [];
    var splitvertical = this.verticalIds.split(",");
    // for (var i = 0; i < splitvertical.length; i++) {
    //   if (splitvertical[i] != "0") {
    //     if (splitvertical[i] == "1") {
    //       this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    //     }
    //     else if (splitvertical[i] == "2") {
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    //     }
    //     else if (splitvertical[i] == "3") {
    //       this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    //     }
    //   }

    // }
    var selectedVerticalObj = this.verticals.find(e => e.verticalId == 2);
    this.selectedPendingVertical = selectedVerticalObj;
    this.defaultverticalId = this.selectedPendingVertical.verticalId;
    this.selectedVerticalId = this.defaultverticalId;
    // Sending one default value to backend
    this.searchformJoinerList.patchValue({
      verticalId: this.defaultverticalId
    })
    // Pending Individual
    this.searchformPendingScheduleIndividual.patchValue({
      verticalId: this.defaultverticalId
    })
    // Pending Batch
    this.searchformPendingScheduleBatch.patchValue({
      verticalId: this.defaultverticalId
    })
    // Schedule Individual
    this.searchformScheduledIndividual.patchValue({
      verticalId: this.defaultverticalId
    })
    // Schedule Batch
    this.searchformScheduledBatchWise.patchValue({
      verticalId: this.defaultverticalId
    })

    this.getAllLocation();
    this.getAllFunction();
    //this.getCorporateAllocationPendingList();
  }
  changeVertical(tab) {
    switch (tab) {
      case "JL":
        this.selectedVerticalId = this.searchformJoinerList.get("verticalId").value;
        break;
      case "PSI":
        this.selectedVerticalId = this.searchformPendingScheduleIndividual.get("verticalId").value;
        break;
      case "PSB":
        this.selectedVerticalId = this.searchformPendingScheduleBatch.get("verticalId").value;
        break;
      case "SI":
        this.selectedVerticalId = this.searchformScheduledIndividual.get("verticalId").value;
        break;
      case "SB":
        this.selectedVerticalId = this.searchformScheduledBatchWise.get("verticalId").value;
        break;
      default:
        this.selectedVerticalId = this.searchformJoinerList.get("verticalId").value;
        break;
    }
    this.getAllLocation();
    this.getAllFunction();
  }
  //locations
  getAllLocation() {
    this.locations = [];
    this.SpinnerService.show();
    this.searchLocation.verticalId = this.selectedVerticalId;
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
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }

  //Function
  getAllFunction() {
    this.functions = [];
    this.SpinnerService.show();
    this.searchFunction.verticalId = this.selectedVerticalId;
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;
        this.functions.splice(0, 0, {
          functionId: 0,
          functionName: "All",
          verticalId: 0,
          verticalName: "",
          isActive: true
        })
      }
      else {
        this.functions = [];
        this.functions.splice(0, 0, {
          functionId: 0,
          functionName: "All",
          verticalId: 0,
          verticalName: "",
          isActive: true
        })
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  getVenue() {
    this.venues = [];
    //this.searchTrainer.verticalId = this.selectedVerticalId;
    this.joinersservice.getAllVenue(this.searchVenue).subscribe((result) => {
      if (result) {
        this.venues = result;
      }
      else {
        this.venues = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllCandidateJoinerList() {
    this.joinersList = [];
    this.SpinnerService.show();
    this.joinersservice.getAlljoinersList(this.searchformJoinerList.value).subscribe((result) => {
      if (result) {
        this.joinersList = result;
        this.joinersList = this.joinersList.filter(e => e.candidateJoiningTypeDetailsId == 0);
        this.joinersList.forEach(element => {
          if (element.onboardingManagerNotApproveDoc != " ") {
            element.popoverContent = "<div><span class='grey'>Pending/Need clarification Document: </span><span>" + element.onboardingManagerNotApproveDoc + "</span></div>";
          }
        })
        this.SpinnerService.hide();
      }
      else {
        this.joinersList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.loadDataTable();
      this.loadPopover();
      this.SpinnerService.hide();
    });
  }
  joinerSearchSubmit() {
    this.searchformJoinerList.patchValue(
      {
        dtofJoiningFrom: this.dtofJoiningFrom.nativeElement.value,
        dtofJoiningTo: this.dtofJoiningFrom.nativeElement.value
      });
    this.getAllCandidateJoinerList();
  }
  OnClickJoinersTab() {
    setTimeout(() => {
      this.createJoinerListSearchForm();
      this.getAllVerticals();
      this.getAllCandidateJoinerList();
    }, 100);
  }
  OnClickJoinerReset() {
    this.searchformJoinerList.reset();
    // Assign Default Vertical
    this.searchformJoinerList.patchValue({
      verticalId: this.defaultverticalId
    })
    this.getAllVerticals();
    this.getAllCandidateJoinerList();
  }
  showBtnConfirmJoiningType() {
    var checkedObj = this.joinersList.find(e => e.checked == true); //&& e.hiringStatusId == 32 && e.preEmployeeMedicaStatuslId != 1
    return checkedObj == null ? false : true;
  }
  onCheckSelectAllJoiners(eve) {
    if (this.joinersList.length > 0) {
      var firstHiringStatusId = this.joinersList[0].hiringStatusId;
      var flag = 0;
      this.joinersList.forEach(element => {
        if (element.hiringStatusId != firstHiringStatusId) {
          flag = 1
        }
      })
      if (flag == 0) {
        this.joinersList.forEach(element => {
          element.checked = eve.target.checked;
        })
      } else {
        jQuery("#chkAllJoiners").prop("checked", false);
        this.notificationService.showError("Please select same hiring status", "Error");
      }
    } else {
      jQuery("#chkAllJoiners").prop("checked", false);
      this.notificationService.showError("No data to select", "Error");
    }

  }
  onCheckIndividualSelectAll(eve) {
    if (this.pendingScheduleCandidateindividual.length > 0) {
      var firstHiringStatusId = this.pendingScheduleCandidateindividual[0].hiringStatusId;
      var flag = 0;
      this.pendingScheduleCandidateindividual.forEach(element => {
        if (element.hiringStatusId != firstHiringStatusId) {
          flag = 1
        }
      })
      if (flag == 0) {
        this.pendingScheduleCandidateindividual.forEach(element => {
          element.checked = eve.target.checked;
        })
      } else {
        jQuery("#chkAllIndividual").prop("checked", false);
        this.notificationService.showError("Please select same hiring status", "Error");
      }
    } else {
      jQuery("#chkAllIndividual").prop("checked", false);
      this.notificationService.showError("No data to select", "Error");
    }
  }
  onCheckScheduledIndividualSelectAll(eve) {
    if (this.scheduledIndividually.length > 0) {
      var firstHiringStatusId = this.scheduledIndividually[0].hiringStatusId;
      var flag = 0;
      this.scheduledIndividually.forEach(element => {
        if (element.hiringStatusId != firstHiringStatusId) {
          flag = 1
        }
      })
      if (flag == 0) {
        this.scheduledIndividually.forEach(element => {
          element.checked = eve.target.checked;
        })
      } else {
        jQuery("#chkAllIndividualScheduled").prop("checked", false);
        this.notificationService.showError("Please select same hiring status", "Error");
      }
    } else {
      jQuery("#chkAllIndividualScheduled").prop("checked", false);
      this.notificationService.showError("No data to select", "Error");
    }
  }
  getJoinersListEnableStatus(data) {
    return data.checked;
  }
  getPendingScheduleIndividualEnableStatus(data) {
    return data.checked;
  }
  getScheduleIndividualEnableStatus(data) {
    return data.checked;
  }
  onChangeJoinigType() {
    var joiningType = this.confirmJoiningTypeForm.get('joinigType').value;
    // alert(joiningType);
    if (joiningType == "I") {
      this.showBatchSection = false;
    } else {
      this.showBatchSection = true;
    }

  }
  getVerticalWiseBatch(evt) {
    this.getAllBatch(evt);
    this.getBatchPrefix(evt);
    this.confirmJoiningTypeForm.patchValue({
      batchId: undefined
    })
  }
  getBatchPrefix(verticalId) {

  }
  onCheckRowWiseJoinersList(data, eve, index) {
    if (this.GetSelectedHiringStatusPending(data)) {
      data.checked = eve.target.checked;
    } else {
      jQuery("#" + index).prop("checked", false);
      this.notificationService.showError("Please select same hiring status", "Error");
    }
  }
  GetSelectedHiringStatusPending(NewRow) {
    var AlredyChecked = this.joinersList.find(e => e.checked);
    if (AlredyChecked == null) {
      return true;
    } else {
      return AlredyChecked.hiringStatusId == NewRow.hiringStatusId;
    }
  }
  onCheckRowWisePendingScheduleIndividualList(data, eve) {
    if (this.GetSelectedHiringStatusPendingSchedule(data)) {
      data.checked = eve.target.checked;
    } else {
      jQuery("#" + data.candidateId).prop("checked", false);
      this.notificationService.showError("Please select same hiring status", "Error");
    }
  }
  GetSelectedHiringStatusPendingSchedule(NewRow) {
    var AlredyChecked = this.pendingScheduleCandidateindividual.find(e => e.checked);
    if (AlredyChecked == null) {
      return true;
    } else {
      return AlredyChecked.hiringStatusId == NewRow.hiringStatusId;
    }
  }
  onCheckRowWiseScheduleIndividualList(data, eve) {
    if (this.GetSelectedHiringStatusSchedule(data)) {
      data.checked = eve.target.checked;
    } else {
      jQuery("#" + data.candidateNo).prop("checked", false);
      this.notificationService.showError("Please select same hiring status", "Error");
    }
  }
  GetSelectedHiringStatusSchedule(NewRow) {
    var AlredyChecked = this.scheduledIndividually.find(e => e.checked);
    if (AlredyChecked == null) {
      return true;
    } else {
      return AlredyChecked.hiringStatusId == NewRow.hiringStatusId;
    }
  }
  onClickPendingScheduleTab() {
    setTimeout(() => {
      this.createPendingScheduleIndividualSearchForm();
      this.createPendingScheduleBatchSearchForm();
      this.getAllVerticals();
      this.getPendingScheduleListindividually();
      this.getPendingScheduleListBatchwise();
    }, 100);
    jQuery("#chkAllIndividual").prop("checked", false);
  }
  onClickScheduledTab() {
    setTimeout(() => {
      this.createScheduledBatchwiseSearchForm();
      this.createScheduledIndividualSearchForm();
      this.getAllVerticals();
      this.getAllScheduledListBatchWise();
      this.getAllScheduledListIndividually();
    }, 100);
    jQuery("#chkAllIndividualScheduled").prop("checked", false);
  }
  pendingScheduleSearchIndividualSubmit() {
    this.getPendingScheduleListindividually();
  }
  scheduleSearchIndividualSubmit() {
    this.getAllScheduledListIndividually();
  }
  pendingScheduleSearchBatchSubmit() {
    this.searchformPendingScheduleBatch.patchValue(
      {
        dtofJoiningFrom: this.fromDatePendingBatch.nativeElement.value,
        dtofJoiningTo: this.toDatePendingBatch.nativeElement.value
      });
    this.getPendingScheduleListBatchwise();
  }
  scheduleSearchBatchSubmit() {
    this.searchformScheduledBatchWise.patchValue(
      {
        dtofJoiningFrom: this.fromDateScheduledBatch.nativeElement.value,
        dtofJoiningTo: this.toDateScheduledBatch.nativeElement.value
      });
    this.getAllScheduledListBatchWise();
  }

  onclickIndividualTab() {
    this.createPendingScheduleIndividualSearchForm();
    this.getAllVerticals();
    this.getPendingScheduleListindividually();
  }
  onClickBatchTab() {
    this.createPendingScheduleBatchSearchForm();
    this.getAllVerticals();
    this.getPendingScheduleListBatchwise();
  }
  onClickScheduledBatchTab() {
    this.createScheduledBatchwiseSearchForm();
    this.getAllVerticals();
    this.getAllScheduledListBatchWise()
  }
  onclickScheduleIndividualTab() {
    this.createScheduledIndividualSearchForm();
    this.getAllVerticals();
    this.getAllScheduledListIndividually();
  }
  getPendingScheduleListindividually() {
    this.pendingScheduleCandidateindividual = [];
    this.SpinnerService.show();
    this.joinersservice.getAllPendingScheduleCandidateListIndividual(this.searchformPendingScheduleIndividual.value).subscribe((result) => {
      if (result) {
        this.pendingScheduleCandidateindividual = result;
        this.pendingScheduleCandidateindividual.forEach(element => {
          if (element.onboardingManagerNotApproveDoc != " ") {
            element.popoverContent = "<div><span class='grey'>Pending/Need clarification Document: </span><span>" + element.onboardingManagerNotApproveDoc + "</span></div>";
          }
        })
        this.SpinnerService.hide();
      }
      else {
        this.pendingScheduleCandidateindividual = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.loadDataTable2();
      this.loadPopover();
      this.SpinnerService.hide();
    });
  }
  getAllScheduledListIndividually() {
    this.scheduledIndividually = [];
    this.SpinnerService.show();
    this.joinersservice.getAllScheduledIndividually(this.searchformScheduledIndividual.value).subscribe((result) => {
      if (result) {
        this.scheduledIndividually = result;
        this.scheduledIndividually.forEach(element => {
          if (element.onboardingManagerNotApproveDoc != " ") {
            element.popoverContent = "<div><span class='grey'>Pending/Need clarification Document: </span><span>" + element.onboardingManagerNotApproveDoc + "</span></div>";
          }
        })
        // this.loadDataTable();
        this.SpinnerService.hide();
      }
      else {
        this.scheduledIndividually = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.loadDataTable4();
      this.loadPopover();
      this.SpinnerService.hide();
    });
  }
  getPendingScheduleListBatchwise() {
    this.pendingScheduleCandidateListBatchWise = [];
    this.SpinnerService.show();
    this.joinersservice.getAllPendingScheduleCandidateListBatchWise(this.searchformPendingScheduleBatch.value).subscribe((result) => {
      if (result) {
        // this.pendingScheduleCandidateListBatchWise = result.filter(x => x.verticalId == 2);
        this.pendingScheduleCandidateListBatchWise = result;
        this.SpinnerService.hide();
      }
      else {
        this.pendingScheduleCandidateListBatchWise = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.loadDataTable3();
      this.SpinnerService.hide();
    });
  }
  getAllScheduledListBatchWise() {
    this.scheduledBatchWise = [];
    this.SpinnerService.show();
    this.joinersservice.getAllScheduledBatchWise(this.searchformScheduledBatchWise.value).subscribe((result) => {
      if (result) {
        // this.scheduledBatchWise = result.filter(x => x.verticalId == 2);
        this.scheduledBatchWise = result;

        // this.loadDataTable();
        this.SpinnerService.hide();
      }
      else {
        this.scheduledBatchWise = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.loadDataTable5();
      this.SpinnerService.hide();
    });
  }
  onClickIndividualReset() {
    this.searchformPendingScheduleIndividual.reset();
    // Assign default vertical
    this.searchformPendingScheduleIndividual.patchValue({
      verticalId: this.defaultverticalId
    })
    this.getPendingScheduleListindividually();
  }
  onClickScheduledIndividualReset() {
    this.searchformScheduledIndividual.reset();
    // Assign default vertical
    this.searchformScheduledIndividual.patchValue({
      verticalId: this.defaultverticalId
    })
    this.getAllScheduledListIndividually();
  }
  onClickBatchReset() {
    this.searchformPendingScheduleBatch.reset();
    // Assign default vertical
    this.searchformPendingScheduleBatch.patchValue({
      verticalId: this.defaultverticalId
    })
    this.getPendingScheduleListBatchwise();
  }
  onClickScheduledBatchReset() {
    this.searchformScheduledBatchWise.reset();
    // Assign Default Vertical
    this.searchformScheduledBatchWise.patchValue({
      verticalId: this.defaultverticalId
    })
    this.getAllScheduledListBatchWise();
  }
  btnClickConfirmJoiningType() {
    // this.sendingJoinigConfirmationType = "A";
    // this.sendingJoiningConfirmationCandidateId = 0;
    // this.loadSelectPicker();
    // this.getVerticalsForPopUp();
    // this.createJoiningConfirmTypeForm();
    this.confirmJoiningTypeForm.controls.batchId.disable();
    this.sendingJoinigConfirmationType = "A";
    this.sendingJoiningConfirmationCandidateId = 0;
    this.loadSelectPicker();
    this.getVerticalsForPopUp();
    this.createJoiningConfirmTypeForm();
  }
  onConfirmJoiningTypeRowWise(data) {
    // this.sendingJoinigConfirmationType = "S";
    // this.sendingJoiningConfirmationCandidateId = data.candidateId;
    // this.getVerticalsForPopUp();
    // this.loadSelectPicker();
    this.confirmJoiningTypeForm.controls.batchId.disable();
    this.sendingJoinigConfirmationType = "S";
    this.sendingJoiningConfirmationCandidateId = data.candidateId;
    this.getVerticalsForPopUp();
    this.loadSelectPicker();
  }
  // Vertical for popup
  getVerticalsForPopUp() {
    this.verticalsPopUp = [];
    var splitvertical = this.verticalIds.split(",");
    var allvertical = "";
    for (var i = 0; i < splitvertical.length; i++) {
      if (splitvertical[i] != "0") {
        if (splitvertical[i] == "1") {
          var checkExisted = this.verticalsPopUp.find(e => e.verticalId == 1);
          if (checkExisted == undefined) {
            this.verticalsPopUp.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
          }
        }
        else if (splitvertical[i] == "2") {
          var checkExisted = this.verticalsPopUp.find(e => e.verticalId == 2);
          if (checkExisted == undefined) {
            this.verticalsPopUp.push({ verticalId: 2, verticalName: "Plant", isActive: true });
          }
        }
        else if (splitvertical[i] == "3") {
          var checkExisted = this.verticalsPopUp.find(e => e.verticalId == 3);
          if (checkExisted == undefined) {
            this.verticalsPopUp.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
          }
        }
        if (allvertical == "") {
          allvertical = splitvertical[i];
        }
        else {
          allvertical = allvertical + "," + splitvertical[i];
        }
      }

    }
  }



  onChangeBatchTtype(value) {
    if (value == "N") {
      this.confirmJoiningTypeForm.controls.batchId.disable();
      this.confirmJoiningTypeForm.patchValue({
        batchId: null
      })
    } else {
      this.confirmJoiningTypeForm.controls.batchId.enable();
    }
  }
  onSubmitJoiningConfirmationType() {
    var flag = 0;
    var msg = "";

    if (this.confirmJoiningTypeForm.value.batchType == "2") {
      if (this.confirmJoiningTypeForm.value.batchId == null) {
        flag = 1;
        msg = "Please enter batch no";
      }
    }
    else {

    }
    if (this.confirmJoiningTypeForm.value.vertical == null) {
      flag = 1;
      msg = "Please select vertical";
    }
    else {

    }
    if (this.confirmJoiningTypeForm.value.joinigType == null) {
      flag = 1;
      msg = "Please select joining type";
    } else {

    }
    if (flag == 0) {

      if (this.sendingJoinigConfirmationType == "A") {
        var candidateIdString = "";
        var flag = 0;
        this.joinersList.forEach(element => {
          if (element.checked) {
            candidateIdString += (flag == 0 ? "" : ",") + element.candidateId.toString();
            flag = 1;
          }
        })
        this.confirmJoiningTypeForm.patchValue({
          candidateId: candidateIdString,
          createdBy: this.loginUserId,
        })
      } else {
        this.confirmJoiningTypeForm.patchValue({
          candidateId: this.sendingJoiningConfirmationCandidateId.toString(),
          createdBy: this.loginUserId
        })
      }
      this.SpinnerService.show();
      this.joinersservice.confirmJoiningType(this.confirmJoiningTypeForm.value).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.confirmJoiningTypeForm.controls.batchId.disable();
            // this.createJoinerListSearchForm();
            this.createJoiningConfirmTypeForm();
            this.getAllCandidateJoinerList();
            //this.getAllVerticals();
            jQuery("#chkAllJoiners").prop("checked", false);
            this.loadDataTable();
            jQuery("#confirmJoinitypeModal").modal("hide");
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
  onConfimationTypeCancelClick() {
    this.confirmJoiningTypeForm.reset();
    this.confirmJoiningTypeForm.controls.batchId.disable();
  }
  loadSelectPicker() {
    setTimeout(() => {
      jQuery('.selectpicker').selectpicker({
        size: 6
      });
      jQuery('.selectpicker').selectpicker('refresh');
    });
  }
  onClickViewCandidate(data, pagetext, parentTabName, childTabName) {
    var roleIdArray = this.roleIds.split(',');
    jQuery(".custom-menu").hide();
    this.persistance.set('oldpagename', pagetext);
    this.persistance.set('parentActiveTab', parentTabName);
    this.persistance.set('childActiveTab', childTabName);
    if (roleIdArray.includes("49")) {
      this._route.navigate(['/app/viewcandidatedetails'], { queryParams: { BatchId: data.batchId, BatchNo: data.batchNo, OnBoardingcoordinator: data.onBoardingcoordinator, From: "OH", Type: "P" } });
    }
    else {
      this._route.navigate(['/app/viewcandidatedetails'], { queryParams: { BatchId: data.batchId, BatchNo: data.batchNo, OnBoardingcoordinator: data.onBoardingcoordinator, From: "OM", Type: "P" } });
    }
  }
  // Move candidate from  individual tab start

  getAllBatch(verticalId) {
    this.batchs = [];
    this.SpinnerService.show();
    this.searchBatch.vertical = verticalId;//this.defaultverticalId;
    this.commonService.getAllBatch(this.searchBatch).subscribe((result) => {
      if (result) {
        // this.batchs = result.filter(x => x.createdBy == this.loginUserId);  // Previously it was there
        this.batchs = result;                                                 // Changed on 20-07-2022 as batch no is not fecthing
        this.batchs = this.batchs.filter(x => x.vertical == verticalId);
      }
      else {
        this.batchs = [];
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  createCandidateMoveSaveForm() {
    this.candidateMoveSaveForm = this.fb.group({
      candidateId: [''],
      joinIngType: null,
      vertical: null,
      batchId: null,
      createdBy: [this.loginUserId],
    });
  }
  createReportingVenueSaveForm() {

    this.saveReportingVenueForm = this.fb.group({
      candidateReprtingVenueId: null,
      batchId: null,
      candidateId: null,
      reprtingVenue: null,
      reprtingVenueAddress: [''],
      createdBy: [this.loginUserId]
    });
  }
  // createReportingVenueFormSearchForm() {
  //   this.searchReportingVenueForm = this.fb.group({
  //     batchId: null,
  //     candidateId: null
  //   });
  // }

  onMoveRowWise(data) {
    this.moveType = "S";
    this.movingCandidateId = data.candidateId;
  }
  btnClickMoveAllCandidate() {
    this.moveType = "A";
    this.movingCandidateId = 0;
  }
  onChangeMoveType() {
    var type = this.candidateMoveSaveForm.get("joinIngType").value;
    if (type == "I") {
      // this.disablesBatchField = true; //jQuery("#BatchField").prop('disabled', false);
      // this.candidateMoveSaveForm.controls['batchId'].disable();
      this.showBatchForMove = false;
    } else {
      // this.disablesBatchField = false;
      this.showBatchForMove = true;
    }
  }
  showBtnMoveCandidate() {
    var checkedObj = this.pendingScheduleCandidateindividual.find(e => e.checked == true); //&& e.hiringStatusId == 32 && e.preEmployeeMedicaStatuslId != 1
    return checkedObj == null ? false : true;
  }
  btnSaveMoveCandidate() {
    var flag = 0;
    var msg = "";

    // if (this.candidateMoveSaveForm.value.batchId == null) {
    //   flag = 1;
    //   msg = "Please Select Batch Id";
    // }
    // else {

    // }
    // if (this.candidateMoveSaveForm.value.batchId == 0) {
    //   flag = 1;
    //   msg = "Please Select Batch Id";
    // }
    // else {

    // }
    if (this.candidateMoveSaveForm.value.joinIngType == "B") {
      if (this.candidateMoveSaveForm.value.batchId == null) {
        flag = 1;
        msg = "Please select Batch";
      } else {

      }
    }
    if (this.candidateMoveSaveForm.value.vertical == null) {
      flag = 1;
      msg = "Please select vertical";
    }
    else {

    }
    if (this.candidateMoveSaveForm.value.joinIngType == null) {
      flag = 1;
      msg = "Please select joining type";
    } else {

    }
    if (flag == 0) {
      if (this.moveType == "A") {
        var candidateIdString = "";
        var flag = 0;
        this.pendingScheduleCandidateindividual.forEach(element => {
          if (element.checked) {
            candidateIdString += (flag == 0 ? "" : ",") + element.candidateId.toString();
            flag = 1;
          }
        })
        this.candidateMoveSaveForm.patchValue({
          candidateId: candidateIdString,
          createdBy: this.loginUserId,
        })
      } else {
        this.candidateMoveSaveForm.patchValue({
          candidateId: this.movingCandidateId.toString(),
          createdBy: this.loginUserId
        })
      }

      this.SpinnerService.show();
      this.joinersservice.moveCandidate(this.candidateMoveSaveForm.value).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.createPendingScheduleIndividualSearchForm();
            this.createCandidateMoveSaveForm();
            this.OnClickJoinersTab();
            this.onClickPendingScheduleTab();
            this.onClickScheduledTab();
            // this.getPendingScheduleListindividually();
            // this.loadDataTable();
            jQuery("#moveCandidateModal").modal("hide");
            jQuery("#chkAllIndividual").prop("checked", false);
            jQuery("#chkAllIndividualScheduled").prop("checked", false);

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

  btnCancelClick() {
    this.candidateMoveSaveForm.reset();
  }

  onClickIndividualScheduleInduction(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTab', "Pending Scheduled");
    this.persistance.set('childActiveTab', "Individual");
    //this._route.navigate(['/scheduleinduction'], { queryParams: { InductionType: "Candidate", IndictionTypeId: data.candidateId, IndictionTypeNo: data.candidateNo, InductionJoiningType: "I", From: "Corporate", Mode: "Add" } }); // Previous
    this._route.navigate(['/app/scheduleinduction'], { queryParams: { InductionType: "Candidate", IndictionTypeId: data.candidateId, IndictionTypeNo: data.candidateNo, InductionJoiningType: "I", From: "Plant", Mode: "Add", UserType: "OM" } });

  }
  onClickBatchWiseInductionSchedule(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTab', "Pending Scheduled");
    this.persistance.set('childActiveTab', "Batch");
    this._route.navigate(['/app/scheduleinduction'], { queryParams: { InductionType: "Batch", IndictionTypeId: data.batchId, IndictionTypeNo: data.batchNo, InductionJoiningType: "B", From: "Plant", Mode: "Add", UserType: "OM" } });
  }
  onClicViewScheduleBatchWise(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTab', "Scheduled");
    this.persistance.set('childActiveTab', "Batch");
    this._route.navigate(['/app/scheduleinduction'], { queryParams: { InductionType: "Batch", IndictionTypeId: data.batchId, IndictionTypeNo: data.batchNo, InductionJoiningType: "B", From: "Plant", CandidateInductionScheduleId: data.candidateInductionScheduleId, Mode: "View", UserType: "OM" } });

  }
  onClickAddReportingVenue(data, type) {
    this.addingReportingVenueFor = type;
    if (type == "Candidate") {
      this.addingReportingVenueForNo = data.candidateNo; //data.candidateNo
      this.addingReportingVenueForId = data.candidateId;
      this.saveReportingVenueForm.patchValue({
        batchId: null,
        candidateId: this.addingReportingVenueForId,
      })
      // this.searchReportingVenueForm.patchValue({
      //   candidateId: 1
      //   //candidateId: this.addingReportingVenueForId
      // })
    } else {
      this.addingReportingVenueForNo = data.batchNo;
      this.addingReportingVenueForId = data.batchId;
      this.saveReportingVenueForm.patchValue({
        batchId: this.addingReportingVenueForId,
        candidateId: null,
      })
      // this.searchReportingVenueForm.patchValue({
      //   batchId: this.addingReportingVenueForId
      // })
    }
    this.getReportingVenueExistedForBatchOrCandidate();
  }
  getReportingVenueExistedForBatchOrCandidate() {
    this.reportingVenueExists = [];
    this.SpinnerService.show();
    this.joinersservice.getExistedReportingVenue(this.saveReportingVenueForm.value).subscribe((result) => {
      if (result) {
        this.reportingVenueExists = result;
        this.saveReportingVenueForm.patchValue({
          candidateReprtingVenueId: result.candidateReprtingVenueId,
          reprtingVenue: result.venueId == 0 ? null : result.venueId,
          reprtingVenueAddress: result.reprtingVenueAddress == null ? "" : result.reprtingVenueAddress,
        })
        this.SpinnerService.hide();

      }
      else {
        this.reportingVenueExists = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  btnSaveReportingVenue() {
    var flag = 0;
    var msg = "";

    if (this.saveReportingVenueForm.value.reprtingVenueAddress == "") {
      flag = 1;
      msg = "Please enter address";
    }
    else {

    }
    if (this.saveReportingVenueForm.value.reprtingVenue == null) {
      flag = 1;
      msg = "Please select venue";
    } else {

    }
    if (flag == 0) {
      this.SpinnerService.show();
      this.joinersservice.addReportingVenue(this.saveReportingVenueForm.value).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getAllScheduledListIndividually();
            this.getAllScheduledListBatchWise();
            this.loadDataTable4();
            this.loadDataTable5();
            jQuery("#reportingVenueModal").modal("hide");
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
  onClickCancelReportingVenue() {
    this.saveReportingVenueForm.reset();
  }
  onClickBookAccommodationIndividual(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTab', "Scheduled");
    this.persistance.set('childActiveTab', "Individual");
    this._route.navigate(['/app/scheduleaccommodation'], { queryParams: { AccommodationFor: "Candidate", AccommodationForId: data.candidateId, AccommodationForNo: data.candidateNo, From: "Plant", UserType: "OM" } });
  }
  onClickBookAccommodationBatchwise(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTab', "Scheduled");
    this.persistance.set('childActiveTab', "Batch");
    // this._route.navigate(['/scheduleaccommodation'], { queryParams: { AccommodationFor: "Batch", AccommodationForId: data.batchId, AccommodationForNo: data.batchNo, From: "Plant", UserType: "OM" } });
    this._route.navigate(['/app/scheduleaccommodationbatch'], { queryParams: { AccommodationFor: "Batch", AccommodationForId: data.batchId, AccommodationForNo: data.batchNo, From: "Plant", UserType: "OM" } });

  }
  // Edit Accommodation


  onClickEditAccommodationIndividual(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTab', "Scheduled");
    this.persistance.set('childActiveTab', "Individual");
    this._route.navigate(['/app/editaccommodation'], { queryParams: { EditAccommodationFor: "Candidate", EditAccommodationForId: data.candidateId, EditAccommodationForNo: data.candidateNo, InductionScheduleId: data.candidateInductionScheduleId, From: "Plant", UserType: "OM" } });
  }
  onClickEditAccommodationBatchWise(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTab', "Scheduled");
    this.persistance.set('childActiveTab', "Batch");
    //this._route.navigate(['/editaccommodation'], { queryParams: { EditAccommodationFor: "Batch", EditAccommodationForId: data.batchId, EditAccommodationForNo: data.batchNo, InductionScheduleId: data.candidateInductionScheduleId, From: "Plant", UserType: "OM" } });
    this._route.navigate(['/app/editaccommodation-batch'], { queryParams: { EditAccommodationFor: "Batch", EditAccommodationForId: data.batchId, EditAccommodationForNo: data.batchNo, InductionScheduleId: data.candidateInductionScheduleId, From: "Plant", UserType: "OM" } });

  }

  // Share with candidate

  showBtnShareWithCandidate() {
    // var checkedObj = this.scheduledIndividually.find(e => e.checked == true && e.hiringStatusId == 47); //&& e.hiringStatusId == 32 && e.preEmployeeMedicaStatuslId != 1
    // return checkedObj == null ? false : true;

    var flag = 0;
    var CheckedObj = [];
    CheckedObj = this.scheduledIndividually.filter(e => e.checked == true && e.hiringStatusId == 47); //&& e.medicalDocumentCollectionId == 1
    if (CheckedObj.length > 0) {
      var medicalCollectionId = CheckedObj.find(e => e.checked == true && e.hiringStatusId == 47);
      if (medicalCollectionId == null) {
        return false;
      } else {
        // CheckedObj.forEach(element => {
        //   if (element.dateofJoining != medicalCollectionId.dateofJoining || element.modeofJoining != medicalCollectionId.modeofJoining) {
        //     flag = 1;
        //   }
        // })
        // return flag == 0 ? true : false;

        return true;
      }
    }
  }
  onClickBtnShareWithCandiate() {
    this.sharingType = "A";
    this.sharingCandidateId = 0;
    var candidateIdString = "";
    var cFlag = 0;
    this.getAllDocumentName();
    this.getEmailTemplate();
    this.testEmailTemplateDescription = "";
    this.selectedTestEmailTemplateId = null;
    this.joiningDocumentsIds = "";
  }
  onOptionClickShareWithCandidate(data) {
    this.sharingType = "S";
    this.sharingCandidateId = data.candidateId;
    this.sharingCandidateName = data.candidateFullName; // 14-07-2023
    this.sharingJoiningDate = data.dateofJoining;
    this.sharingCandidateRequisitionId = data.requisitionDetailId;
    this.searchAccommodationDetails.batchId = null;
    this.searchAccommodationDetails.candidateId = data.candidateId;
    var userlist = this.allUserList.filter(e => e.autoUserId == data.onBoardingCoordinator);
    this.coordinatorName = userlist[0].employeeName
    //this.getReportingVenuerAndAccommodation();
    this.getAllDocumentName();
    this.getEmailTemplate();
    this.testEmailTemplateDescription = "";
    this.selectedTestEmailTemplateId = null;
    this.joiningDocumentsIds = "";

  }
  getAllDocumentName() {
    this.documentNames = [];
    this.attachmentDocumentService.getAllDocumentName(this.searchDocumentName).subscribe((result) => {
      if (result) {
        this.documentNames = result;
        this.documentNames = this.documentNames.filter(e => e.attachmentDocumentNameId == 16 || e.attachmentDocumentNameId == 17 || e.attachmentDocumentNameId == 18);
      }
      else {
        this.documentNames = [];
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  //email template
  getEmailTemplate() {
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
      this.SpinnerService.hide();
    }, () => {
      this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }
  getAllUsers() {
    this.allUserList = [];
    this.commonService.getRoleWiseUser(this.searchRoleUser).subscribe((result) => {
      if (result) {
        this.allUserList = result;
      }
      else {
        this.allUserList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  onClickShareWithCandidateBatchwise(data) {
    this.sharingType = "B";
    // this.sharingCandidateId = data.candidateId;
    this.sharingJoiningDate = data.dateofJoining;
    // this.sharingCandidateRequisitionId = data.requisitionDetailId;
    this.searchAccommodationDetails.batchId = data.batchId;
    this.searchAccommodationDetails.candidateId = null;
    var userlist = this.allUserList.filter(e => e.autoUserId == data.onBoardingcoordinator);
    this.coordinatorName = userlist[0].employeeName
    //this.getReportingVenuerAndAccommodation();
    this.getAllDocumentName();
    this.getEmailTemplate();
    this.testEmailTemplateDescription = "";
    this.selectedTestEmailTemplateId = null;
    this.joiningDocumentsIds = "";
    this.searchCandidate.batchId = data.batchId;
    this.searchCandidate.onBordingCoordinatorId = data.onBoardingcoordinator;
    this.getAllCandidateDetailsBatchWise();
  }
  getAllCandidateDetailsBatchWise() {
    this.SpinnerService.show();
    this.joinersservice.getAllBatchWiseCandidateDetails(this.searchCandidate).subscribe((result) => {
      if (result) {
        this.batchWiseCandidateList = result;
        this.SpinnerService.hide();
      }
      else {
        this.batchWiseCandidateList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  onChangeJoiningDocuments(eve, docData) {
    if (eve.target.checked) {
      this.joiningDocumentsIds += this.joiningDocumentsIds == "" ? +docData.attachmentDocumentNameId : "," + docData.attachmentDocumentNameId;
    } else {
      var commaSeparatedArr = this.joiningDocumentsIds.split(",");
      commaSeparatedArr.forEach((element, index) => {
        if (element == docData.attachmentDocumentNameId.toString()) {
          commaSeparatedArr.splice(index, 1)
        }
      })
      this.joiningDocumentsIds = commaSeparatedArr.join(",").toString();
    }
  }

  // onClickShareWithCandidate(data) {
  //   let Obj = {
  //     ShareWithCandidateId: null,
  //     templateId: null,
  //     candidateJoiningDocumentId: null,
  //     candidateRequisitionDetailsId: null,
  //     candidateInductionScheduleDetailsId: null,
  //     candidateId: null,
  //     templateBody: this.shareInductionScheduleWithCandidateForm.value.templateBody,
  //     isSend: false
  //   }
  //   this.shareWithCandidateArray.push(Obj);
  // }
  onShareWithCancelClick() {
    this.getAllDocumentName();
    this.getEmailTemplate();
    this.testEmailTemplateDescription = "";
    this.selectedTestEmailTemplateId = null;
    this.joiningDocumentsIds = "";
  }
  changeTestEmailTemplate() {
    this.saveShareWithCandidate.shareWithCandidates = [];
    var templatedescription = this.emailTemplates.filter(x => x.templateId == this.selectedTestEmailTemplateId)[0].templateDescription;
    this.testEmailTemplateDescription = templatedescription;
    setTimeout(() => {
      jQuery(".cke_wysiwyg_div").html("");
      jQuery(".cke_wysiwyg_div").html(templatedescription);
    });
    if (this.sharingType == "A") {
      var templatedescription = this.emailTemplates.filter(x => x.templateId == this.selectedTestEmailTemplateId)[0].templateDescription;
      this.multipleCandidateId = "";
      var cFlag = 0;
      this.identicalAccommodationDetails = [];
      this.identicalTrainingCoordinator = [];
      this.allCandidateVenueDetails = [];
      this.scheduledIndividually.forEach(element => {
        if (element.checked && element.hiringStatusId == 47) {
          this.multipleCandidateId += (cFlag == 0 ? "" : ",") + element.candidateId.toString();
          cFlag = 1;
          this.searchAccommodationDetails.candidateId = element.candidateId;
          this.searchAccommodationDetails.batchId = null;
          this.joinersservice.getAllDetailsForEditAccommodation(this.searchAccommodationDetails).subscribe((result) => {
            this.accommodationAndVenueDetails = result;
            this.venueDetails = this.accommodationAndVenueDetails.editAccomodationCandidateDetail;
            // Candidate wise Venue
            var isVenueExisted = this.allCandidateVenueDetails.find(e => e.candidateId == element.candidateId);
            if (isVenueExisted == null) {
              let venueObj = {
                reprtingVenueAddress: this.venueDetails.reprtingVenueAddress,
                //venueLocation: this.venueDetails.venueAddress,
                venueLocation: this.venueDetails.venueName,      // Changed on 09-01-2023
                candidateId: element.candidateId,
                joiningDate: element.dateofJoining
              }
              this.allCandidateVenueDetails.push(venueObj);
            }
            // Candidate Wise Accommodation
            this.accommodationDetails = this.accommodationAndVenueDetails.trainingEditAccomodationForCandidateDetails;
            this.accommodationDetails.forEach(acc_element => {
              var isExistedVenue = this.identicalAccommodationDetails.find(e => e.fromDate == acc_element.fromDate && e.toDate == acc_element.toDate && e.locationId == acc_element.locationId && e.accomodation == acc_element.accomodation && e.candidateId == acc_element.candidateId);
              if (isExistedVenue == null) {
                this.identicalAccommodationDetails.push(acc_element);
              }
            })

            // Candidate wise coordinator
            this.reportingTimeDetails = this.accommodationAndVenueDetails.trainingEditAccomodationInductionSheduleDetails;
            this.reportingTimeDetails.forEach(ele => {
              var iscoorDinatorExisted = this.identicalTrainingCoordinator.find(e => e.inductionVenue == ele.inductionVenue && e.trainingCoOrdinatorName == ele.trainingCoOrdinatorName && e.candidateId == element.candidateId);
              if (iscoorDinatorExisted == null) {
                let trainingCoordinatorObj = {
                  candidateInductionScheduleDetailsId: ele.candidateInductionScheduleDetailsId,
                  candidateInductionScheduleId: ele.candidateInductionScheduleId,
                  createdBy: ele.createdBy,
                  dateFrom: ele.dateFrom,
                  dateTo: ele.dateTo,
                  detailsofSession: ele.detailsofSession,
                  inductionCoOrdinator: ele.inductionCoOrdinator,
                  inductionMode: ele.inductionMode,
                  inductionVenue: ele.inductionVenue,
                  inductionVenueName: ele.inductionVenueName,
                  inductioneName: ele.inductioneName,
                  location: ele.location,
                  locationName: ele.timeFrom,
                  timeTo: ele.timeTo,
                  trainer: ele.trainer,
                  trainerName: ele.trainerName,
                  traingTitle: ele.traingTitle,
                  trainingCoOrdinatorName: ele.trainingCoOrdinatorName,
                  trainingCoOrdinatorEmail: ele.trainingCoOrdinatorEmail, // 19-07-2023
                  candidateId: element.candidateId
                }
                this.identicalTrainingCoordinator.push(trainingCoordinatorObj);
              }
            })
          });
          let shareWithCandidateObj = {
            shareWithCandidateId: element.candidateId,
            templateId: this.selectedTestEmailTemplateId,
            shareWithCandidateHeaderId: null,
            candidateJoiningDocumentId: null,
            candidateRequisitionDetailsId: element.requisitionDetailId,
            candidateInductionScheduleDetailsId: null,
            candidateId: element.candidateId,
            candidateName: element.candidateFullName, // 14-07-2023
            templateBody: "",
            isSend: false
          }
          this.saveShareWithCandidate.shareWithCandidates.push(shareWithCandidateObj);
        }
      });
    } else if (this.sharingType == "B") {
      this.identicalAccommodationDetails = [];
      this.identicalTrainingCoordinator = [];
      this.allCandidateVenueDetails = [];
      this.multipleCandidateId = "";
      this.joinersservice.getAllDetailsForEditAccommodation(this.searchAccommodationDetails).subscribe((result) => {
        this.accommodationAndVenueDetails = result;
        this.venueDetails = this.accommodationAndVenueDetails.editAccomodationCandidateDetail;
        this.accommodationDetails = this.accommodationAndVenueDetails.trainingEditAccomodationForCandidateDetails;
        this.reportingTimeDetails = this.accommodationAndVenueDetails.trainingEditAccomodationInductionSheduleDetails;

        // Candidate Wise Accommodation
        this.accommodationDetails = this.accommodationAndVenueDetails.trainingEditAccomodationForCandidateDetails;
        this.accommodationDetails.forEach(acc_element => {
          var isExistedVenue = this.identicalAccommodationDetails.find(e => e.fromDate == acc_element.fromDate && e.toDate == acc_element.toDate && e.locationId == acc_element.locationId && e.accomodation == acc_element.accomodation && e.candidateId == acc_element.candidateId);
          if (isExistedVenue == null) {
            this.identicalAccommodationDetails.push(acc_element);
          }
        })
        var cFlag = 0;
        this.batchWiseCandidateList.forEach(bt_element => {
          this.multipleCandidateId += (cFlag == 0 ? "" : ",") + bt_element.candidateId.toString();
          cFlag = 1;
          // Venue details
          let venueObj = {
            reprtingVenueAddress: this.venueDetails.reprtingVenueAddress,
            //venueLocation: this.venueDetails.venueAddress,
            venueLocation: this.venueDetails == null ? "NA" : this.venueDetails.venueName,      // Changed on 09-01-2023
            candidateId: bt_element.candidateId,
            joiningDate: bt_element.dateofJoining
          }
          this.allCandidateVenueDetails.push(venueObj);

          let shareWithCandidateObj = {
            shareWithCandidateId: bt_element.candidateId,
            templateId: this.selectedTestEmailTemplateId,
            shareWithCandidateHeaderId: null,
            candidateJoiningDocumentId: null,
            candidateRequisitionDetailsId: bt_element.requisitionDetailId,
            candidateInductionScheduleDetailsId: null,
            candidateId: bt_element.candidateId,
            candidateName: bt_element.candidateFullName, // 14-07-2023
            templateBody: "",
            isSend: false
          }

          this.saveShareWithCandidate.shareWithCandidates.push(shareWithCandidateObj);
        })

      });
    } else {
      this.identicalAccommodationDetails = [];
      this.identicalTrainingCoordinator = [];
      this.allCandidateVenueDetails = [];
      this.joinersservice.getAllDetailsForEditAccommodation(this.searchAccommodationDetails).subscribe((result) => {
        this.accommodationAndVenueDetails = result;
        this.venueDetails = this.accommodationAndVenueDetails.editAccomodationCandidateDetail;
        // Candidate wise Venue
        var isVenueExisted = this.allCandidateVenueDetails.find(e => e.candidateId == this.sharingCandidateId);
        if (isVenueExisted == null) {
          let venueObj = {
            reprtingVenueAddress: this.venueDetails.reprtingVenueAddress,
            //venueLocation: this.venueDetails.venueAddress,
            venueLocation: this.venueDetails.venueName,      // Changed on 09-01-2023
            candidateId: this.sharingCandidateId,
            joiningDate: this.sharingJoiningDate
          }
          this.allCandidateVenueDetails.push(venueObj);
        }

        // Candidate Wise Accommodation
        this.accommodationDetails = this.accommodationAndVenueDetails.trainingEditAccomodationForCandidateDetails;
        this.accommodationDetails.forEach(acc_element => {
          var isExistedVenue = this.identicalAccommodationDetails.find(e => e.fromDate == acc_element.fromDate && e.toDate == acc_element.toDate && e.locationId == acc_element.locationId && e.accomodation == acc_element.accomodation && e.candidateId == acc_element.candidateId);
          if (isExistedVenue == null) {
            this.identicalAccommodationDetails.push(acc_element);
          }
        })

        // Candidate wise coordinator
        this.reportingTimeDetails = this.accommodationAndVenueDetails.trainingEditAccomodationInductionSheduleDetails;
        this.reportingTimeDetails.forEach(ele => {
          var iscoorDinatorExisted = this.identicalTrainingCoordinator.find(e => e.inductionVenue == ele.inductionVenue && e.trainingCoOrdinatorName == ele.trainingCoOrdinatorName && e.candidateId == this.sharingCandidateId);
          if (iscoorDinatorExisted == null) {
            let trainingCoordinatorObj = {
              candidateInductionScheduleDetailsId: ele.candidateInductionScheduleDetailsId,
              candidateInductionScheduleId: ele.candidateInductionScheduleId,
              createdBy: ele.createdBy,
              dateFrom: ele.dateFrom,
              dateTo: ele.dateTo,
              detailsofSession: ele.detailsofSession,
              inductionCoOrdinator: ele.inductionCoOrdinator,
              inductionMode: ele.inductionMode,
              inductionVenue: ele.inductionVenue,
              inductionVenueName: ele.inductionVenueName,
              inductioneName: ele.inductioneName,
              location: ele.location,
              locationName: ele.timeFrom,
              timeTo: ele.timeTo,
              trainer: ele.trainer,
              trainerName: ele.trainerName,
              traingTitle: ele.traingTitle,
              trainingCoOrdinatorName: ele.trainingCoOrdinatorName,
              trainingCoOrdinatorEmail: ele.trainingCoOrdinatorEmail, // 19-07-2023
              candidateId: this.sharingCandidateId
            }
            this.identicalTrainingCoordinator.push(trainingCoordinatorObj);
          }
        })
      });
      let shareWithCandidateObj = {
        shareWithCandidateId: this.sharingCandidateId,
        templateId: this.selectedTestEmailTemplateId,
        shareWithCandidateHeaderId: null,
        candidateJoiningDocumentId: null,
        candidateRequisitionDetailsId: this.sharingCandidateRequisitionId,
        candidateInductionScheduleDetailsId: null,
        candidateId: this.sharingCandidateId,
        candidateName: this.sharingCandidateName, // 14-07-2023
        templateBody: "",
        isSend: false
      }
      this.saveShareWithCandidate.shareWithCandidates.push(shareWithCandidateObj);
      this.saveShareWithCandidate.candidateId = this.sharingCandidateId.toString();
    }
    // this.testEmailTemplateDescription = templatedescription;
  }
  btnShareInductionWithCandidate() {
    var flag = 0;
    var msg = "";
    if (this.selectedTestEmailTemplateId == null) {
      flag = 1;
      msg = "Please select welcome template";
    } else {

    }
    if (flag == 0) {
      this.saveShareWithCandidate.shareWithCandidateHeaderId = null;
      this.saveShareWithCandidate.templateId = this.selectedTestEmailTemplateId;
      this.saveShareWithCandidate.candidateId = null;
      this.saveShareWithCandidate.mailingStatus = 48;
      this.saveShareWithCandidate.isActive = true;
      this.saveShareWithCandidate.createdBy = this.loginUserId;

      if (this.sharingType == "A") {
        this.saveShareWithCandidate.shareWithCandidates.forEach(can_element => {
          this.allAccommodationDetails = "";
          this.trainingCoordinatorDetails = "We advise you to get in touch with ";
          var venuDetail = this.allCandidateVenueDetails.find(e => e.candidateId == can_element.candidateId);
          var accommodationDetails = this.identicalAccommodationDetails.filter(e => e.candidateId == can_element.candidateId);
          var coordinatorDetails = this.identicalTrainingCoordinator.filter(e => e.candidateId == can_element.candidateId);
          var templatedescription = this.emailTemplates.filter(x => x.templateId == this.selectedTestEmailTemplateId)[0].templateDescription;
          templatedescription = templatedescription.replace("@@candidate", can_element.candidateName); // 14-07-2023
          templatedescription = templatedescription.replace("@@joiningdate", venuDetail.joiningDate);
          accommodationDetails.forEach(acc_element => {
            this.allAccommodationDetails += acc_element.accomodation + " at " + acc_element.locationName + ","
          })
          templatedescription = templatedescription.replace("@@AccomodationLocation", this.allAccommodationDetails);
          templatedescription = templatedescription.replace("@@ReportingLocation", venuDetail.reprtingVenueAddress + " at " + venuDetail.venueLocation);
          coordinatorDetails.forEach(training_element => {
            this.trainingCoordinatorDetails += training_element.trainingCoOrdinatorName + " - <a href='javascript:void(0)'>" + training_element.trainingCoOrdinatorEmail + "</a> in " + training_element.inductionVenueName + ","
          })
          templatedescription = templatedescription.replace("@@Coordinator", this.trainingCoordinatorDetails);
          can_element.templateBody = templatedescription;
          can_element.candidateJoiningDocumentId = this.joiningDocumentsIds;
        })
        this.saveShareWithCandidate.candidateId = this.multipleCandidateId;

        //finalSubmitObj.candidateId = candidateIdString;
      } else if (this.sharingType == "B") {
        this.saveShareWithCandidate.shareWithCandidates.forEach(can_element => {

          this.allAccommodationDetails = "";
          this.trainingCoordinatorDetails = "We advise you to get in touch with ";
          var venuDetail = this.allCandidateVenueDetails.find(e => e.candidateId == can_element.candidateId);
          var accommodationDetails = this.identicalAccommodationDetails.filter(e => e.candidateId == can_element.candidateId);

          // Candidate wise coordinator
          this.reportingTimeDetails = this.accommodationAndVenueDetails.trainingEditAccomodationInductionSheduleDetails;

          this.reportingTimeDetails.forEach(ele => {
            var iscoorDinatorExisted = this.identicalTrainingCoordinator.find(e => e.inductionVenue == ele.inductionVenue && e.trainingCoOrdinatorName == ele.trainingCoOrdinatorName && e.candidateId == can_element.candidateId);
            if (iscoorDinatorExisted == null) {
              let trainingCoordinatorObj = {
                candidateInductionScheduleDetailsId: ele.candidateInductionScheduleDetailsId,
                candidateInductionScheduleId: ele.candidateInductionScheduleId,
                createdBy: ele.createdBy,
                dateFrom: ele.dateFrom,
                dateTo: ele.dateTo,
                detailsofSession: ele.detailsofSession,
                inductionCoOrdinator: ele.inductionCoOrdinator,
                inductionMode: ele.inductionMode,
                inductionVenue: ele.inductionVenue,
                inductionVenueName: ele.inductionVenueName,
                inductioneName: ele.inductioneName,
                location: ele.location,
                locationName: ele.timeFrom,
                timeTo: ele.timeTo,
                trainer: ele.trainer,
                trainerName: ele.trainerName,
                traingTitle: ele.traingTitle,
                trainingCoOrdinatorName: ele.trainingCoOrdinatorName,
                trainingCoOrdinatorEmail: ele.trainingCoOrdinatorEmail, // 19-07-2023
                candidateId: can_element.candidateId
              }
              this.identicalTrainingCoordinator.push(trainingCoordinatorObj);
            }
          })
          var coordinatorDetails = this.identicalTrainingCoordinator.filter(e => e.candidateId == can_element.candidateId);
          var templatedescription = this.emailTemplates.filter(x => x.templateId == this.selectedTestEmailTemplateId)[0].templateDescription;
          templatedescription = templatedescription.replace("@@candidate", can_element.candidateName); // 14-07-2023
          templatedescription = templatedescription.replace("@@joiningdate", venuDetail.joiningDate);
          accommodationDetails.forEach(acc_element => {
            this.allAccommodationDetails += acc_element.accomodation + " at " + acc_element.locationName + ","
          })
          templatedescription = templatedescription.replace("@@AccomodationLocation", this.allAccommodationDetails);
          templatedescription = templatedescription.replace("@@ReportingLocation", venuDetail.reprtingVenueAddress + " at " + venuDetail.venueLocation);
          coordinatorDetails.forEach(training_element => {
            this.trainingCoordinatorDetails += training_element.trainingCoOrdinatorName + " - <a href='javascript:void(0)'>" + training_element.trainingCoOrdinatorEmail + "</a> in " + training_element.inductionVenueName + ","
          })
          templatedescription = templatedescription.replace("@@Coordinator", this.trainingCoordinatorDetails);
          can_element.templateBody = templatedescription;
          can_element.candidateJoiningDocumentId = this.joiningDocumentsIds;
        })
        this.saveShareWithCandidate.candidateId = this.multipleCandidateId;
      } else {
        this.saveShareWithCandidate.shareWithCandidates.forEach(can_element => {
          this.allAccommodationDetails = "";
          this.trainingCoordinatorDetails = "We advise you to get in touch with ";
          var venuDetail = this.allCandidateVenueDetails.find(e => e.candidateId == can_element.candidateId);
          var accommodationDetails = this.identicalAccommodationDetails.filter(e => e.candidateId == can_element.candidateId);
          var coordinatorDetails = this.identicalTrainingCoordinator.filter(e => e.candidateId == can_element.candidateId);
          var templatedescription = this.emailTemplates.filter(x => x.templateId == this.selectedTestEmailTemplateId)[0].templateDescription;
          templatedescription = templatedescription.replace("@@candidate", can_element.candidateName); // 14-07-2023
          templatedescription = templatedescription.replace("@@joiningdate", venuDetail.joiningDate);
          accommodationDetails.forEach(acc_element => {
            this.allAccommodationDetails += acc_element.accomodation + " at " + acc_element.locationName + ","
          })
          templatedescription = templatedescription.replace("@@AccomodationLocation", this.allAccommodationDetails);
          templatedescription = templatedescription.replace("@@ReportingLocation", venuDetail.reprtingVenueAddress + " at " + venuDetail.venueLocation);
          coordinatorDetails.forEach(training_element => {
            this.trainingCoordinatorDetails += training_element.trainingCoOrdinatorName + " - <a href='javascript:void(0)'>" + training_element.trainingCoOrdinatorEmail + "</a> in " + training_element.inductionVenueName + ","
          })
          templatedescription = templatedescription.replace("@@Coordinator", this.trainingCoordinatorDetails);
          can_element.templateBody = templatedescription;
          can_element.candidateJoiningDocumentId = this.joiningDocumentsIds;
        })
      }

      this.SpinnerService.show();
      this.joinersservice.shareInductionDetailsWithcandidate(this.saveShareWithCandidate).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            // this.createScheduledIndividualSearchForm();
            // this.createShareInductionForm();
            // this.getAllScheduledListIndividually();
            // this.getAllVerticals();
            // this.loadDataTable4();
            // jQuery("#shareWithCandidateModal").modal("hide");
          }
        }
        else {
          this.SpinnerService.hide();
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
      }, () => {
        this.createScheduledIndividualSearchForm();
        this.createShareInductionForm();
        this.getAllVerticals();
        this.getAllScheduledListIndividually();
        this.loadDataTable4();
        jQuery("#shareWithCandidateModal").modal("hide");
        jQuery("#chkAllIndividualScheduled").prop("checked", false);
        this.SpinnerService.hide();
      });

    } else {
      this.notificationService.showError(msg, "Error");
    }

  }
  onClickJoiningCheckList(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTab', "Scheduled");
    this.persistance.set('childActiveTab', "Individual");
    this._route.navigate(['/app/ocjoiningchecklist'], { queryParams: { CandidateId: data.candidateId, CandidateNo: data.candidateNo, From: "OM", Type: "P" } });
  }
  onClickViewDocument(data, parentTabName, childTabName) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "newjoinerslist");
    this.persistance.set('nextpagename', "ocviewdocument");
    this.persistance.set('type', "plant");
    this.persistance.set('candidateId', data.candidateId);
    this.persistance.set('paramid', data.requisitionDetailId);
    this.persistance.set('parentActiveTab', parentTabName);
    this.persistance.set('childActiveTab', childTabName);
    this._route.navigate(['app/om-view-document']);
  }
  onClickIndividualViewSchedule(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTab', "Scheduled");
    this.persistance.set('childActiveTab', "Individual");
    this._route.navigate(['/app/scheduleinduction'], { queryParams: { InductionType: "Candidate", IndictionTypeId: data.candidateId, IndictionTypeNo: data.candidateNo, InductionJoiningType: "I", From: "Plant", CandidateInductionScheduleId: data.candidateInductionScheduleId, Mode: "View", UserType: "OM" } });
  }
  onClickIndividualEditSchedule(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTab', "Scheduled");
    this.persistance.set('childActiveTab', "Individual");
    this._route.navigate(['/app/scheduleinduction'], { queryParams: { InductionType: "Candidate", IndictionTypeId: data.candidateId, IndictionTypeNo: data.candidateNo, InductionJoiningType: "I", From: "Plant", CandidateInductionScheduleId: data.candidateInductionScheduleId, Mode: "Edit", UserType: "OM" } });
  }

  changeReportingVenue(evt) {
    this.saveReportingVenueForm.patchValue({
      reprtingVenueAddress: this.venues.filter(x => x.reportingVenueId == evt)[0].reportingVenueAddress
    })
  }
  // for 5th module
  onClickAssignInductionProgramCoordinator(data, Type) {
    this.assignProgramCoordinatorForm.patchValue({
      batchId: Type == "Batch" ? data.batchId : 0,
      candidateId: Type == "Candidate" ? data.candidateId : 0,
      //coOrdinatiorId: Type == "Candidate" ? data.onBoardingCoordinator : data.onBoardingcoordinator,
      inductionProgrammeCoOrdinatiorAssignId: 0,
      createdBy: this.loginUserId,
    })
    this.getInductionProgramCoordinator();

  }

  getInductionProgramCoordinator() {
    this.programCoordinatorList = [];
    this.SpinnerService.show();
    this.commonService.getAllUserBasedonRole(this.searchProgramCoordinator).subscribe((result) => {
      if (result) {
        this.programCoordinatorList = result;
      }
      else {
        this.programCoordinatorList = [];
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  assignProgrammCoordinator() {
    var flag = 0;
    var msg = "";
    if (this.assignProgramCoordinatorForm.value.coOrdinatiorId == null) {
      flag = 1;
      msg = "Please Select Coordinator";
    }
    else {

    }
    if (flag == 0) {
      this.SpinnerService.show();
      this.joinersservice.assignProgramCoordinator(this.assignProgramCoordinatorForm.value).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.createAssignProgramCoordinatorForm();
            this.onClickPendingScheduleTab();
            this.onClickScheduledTab();
            jQuery("#assignInductionProgramModel").modal("hide");
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
  onClickAssignCancel() {
    this.createAssignProgramCoordinatorForm();
    jQuery("#assignInductionProgramModel").modal("hide");
  }
  onClickReassignInductionProgramCoordinator(data, Type) {
    if (Type == "Batch") {
      this.searchAssignedProgramCoordinator.batchId = data.batchId;
      this.searchAssignedProgramCoordinator.candidateId = null;
    } else {
      this.searchAssignedProgramCoordinator.batchId = null;
      this.searchAssignedProgramCoordinator.candidateId = data.candidateId;
    }
    this.reassignProgramCoordinatorForm.patchValue({
      batchId: Type == "Batch" ? data.batchId : 0,
      candidateId: Type == "Candidate" ? data.candidateId : 0,
      // coOrdinatiorId: Type == "Candidate" ? data.onBoardingCoordinator : data.onBoardingcoordinator,
      inductionProgrammeCoOrdinatiorAssignId: 0,
      createdBy: this.loginUserId,
    })
    this.getInductionProgramCoordinator();
    this.getAssignedProgramCoordinator();
  }
  getAssignedProgramCoordinator() {
    this.assignedProgramCoordinatorDeatails = [];
    this.SpinnerService.show();
    this.joinersservice.getAssignedProgramCoordinatorDetails(this.searchAssignedProgramCoordinator).subscribe((result) => {
      if (result) {
        this.assignedProgramCoordinatorDeatails = result;
        this.reassignProgramCoordinatorForm.patchValue({
          assignedCoordinatorName: this.assignedProgramCoordinatorDeatails[0].empName,
          //coOrdinatiorId:this.assignedProgramCoordinatorDeatails[0].coOrdinatiorId
        })
      }
      else {
        this.assignedProgramCoordinatorDeatails = [];
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  reassignProgrammCoordinator() {
    var flag = 0;
    var msg = "";
    if (this.reassignProgramCoordinatorForm.value.coOrdinatiorId == null) {
      flag = 1;
      msg = "Please Select Coordinator";
    }
    else {

    }
    if (flag == 0) {
      this.SpinnerService.show();
      this.joinersservice.assignProgramCoordinator(this.reassignProgramCoordinatorForm.value).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.createReassignProgramCoordinatorForm();
            this.onClickPendingScheduleTab();
            this.onClickPendingScheduleTab();
            jQuery("#reassignInductionProgramModel").modal("hide");
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
  onClickReassignCancel() {
    this.createReassignProgramCoordinatorForm();
    jQuery("#reassignInductionProgramModel").modal("hide");
  }

  // 22-11-2021
  onClickUpdateJoningDate(data) {
    this.getCandidateJoningDate(data.candidateId);
  }
  getCandidateJoningDate(candidateId) {
    let joiningDateObj = {
      candidateId: candidateId.toString()
    }
    this.allJoiningDateInformation = [];
    this.SpinnerService.show();
    this.corporateService.getJoiningDateDetails(joiningDateObj).subscribe((result) => {
      if (result) {
        this.allJoiningDateInformation = result;
        this.modeofJoiningId = null;
        this.joiningDate = "";
        this.updatedJoiningDateArray = [];
        if (this.allJoiningDateInformation.length > 0) {
          let joiningCandidateObj = {
            CandidateId: this.allJoiningDateInformation[0].candidateId,
            RequisitionDetailId: this.allJoiningDateInformation[0].requisitionDetailId,
            DateofJoining: this.allJoiningDateInformation[0].dateofJoining,
            ModeofJoining: this.allJoiningDateInformation[0].modeofJoing,
            PositionCode: this.allJoiningDateInformation[0].positionCode,
            Remarks: this.allJoiningDateInformation[0].remarks,
            CandidateName: this.allJoiningDateInformation[0].candidateFullName
          }
          this.modeofJoiningId = this.allJoiningDateInformation[0].modeofJoing == 0 ? null : this.allJoiningDateInformation[0].modeofJoing;
          this.joiningDate = this.allJoiningDateInformation[0].dateofJoining;
          this.updatedJoiningDateArray.push(joiningCandidateObj);
        }
      }
      else {
        this.allJoiningDateInformation = [];
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      // this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }
  onClickUpdateBatchJoningDate(data) {
    this.batchJoiningDate = data.dateofJoining;
    this.objUpdateJoinigDateForBatch.batchId = data.batchId;
    this.objUpdateJoinigDateForBatch.dateofJoining = data.dateofJoining;
    this.objUpdateJoinigDateForBatch.createdBy = this.loginUserId;

  }
  getModeOfJoining() {
    this.modeOfJoiningList = [];
    this.corporateService.getAllModeOfJoining(this.searchModeOfJoining).subscribe((result) => {
      if (result) {
        this.modeOfJoiningList = result;
      }
      else {
        this.modeOfJoiningList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      // this.loadSelectPicker();
    });
  }
  onUpdateJoiningDate() {
    if (this.dtOfJoining.nativeElement.value == "") {
      this.notificationService.showError("Please select date", "Error");
    } else {
      this.updatedJoiningDateArray[0].DateofJoining = this.dtOfJoining.nativeElement.value;
      this.updatedJoiningDateArray[0].ModeofJoining = this.modeofJoiningId.toString();
      let finalSubmitObj = {
        CandidateJoiningDates: this.updatedJoiningDateArray,
        CreatedBy: this.loginUserId
      }
      this.SpinnerService.show();
      this.corporateService.updateJoiningDate(finalSubmitObj).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getPendingScheduleListindividually();
            this.getPendingScheduleListBatchwise();
            this.modeofJoiningId = null;
            this.dtOfJoining.nativeElement.value = "";
            this.joiningDate = "";
            this.loadDataTable();
            jQuery("#updateJoiningDateModal").modal("hide");
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
  onUpdateBatchJoiningDate() {
    if (this.dtOfBatchJoining.nativeElement.value == "") {
      this.notificationService.showError("Please select date", "Error");
    } else {
      this.objUpdateJoinigDateForBatch.dateofJoining = this.dtOfBatchJoining.nativeElement.value;
      this.corporateService.updateBatchJoiningDate(this.objUpdateJoinigDateForBatch).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getPendingScheduleListindividually();
            this.getPendingScheduleListBatchwise();
            this.getAllScheduledListBatchWise();
            this.getAllScheduledListIndividually();
            this.modeofJoiningId = null;
            this.dtOfJoining.nativeElement.value = "";
            this.joiningDate = "";
            this.loadDataTable();
            jQuery("#updateBatchJoiningDateModal").modal("hide");
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
  onClickUpdateJoiningDateCancel() {
    this.updatedJoiningDateArray = [];
    this.modeofJoiningId = null;
  }

  openModalPopupRejectDeclineCallBack(statusId, candidateId, tabName) {
    this.actionName = "Declined";
    this.declaineCandidateId = candidateId;
    this.tabName == tabName;
  }
  ProcessCandidate() {
    var formdata = {
      candidateIds: this.declaineCandidateId.toString(),
      requisitionDetailId: 0,
      hiringStatusId: 55,
      createdBy: this.loginUserId,
      remarks: this.declineremarks
    }
    this.SpinnerService.show();
    this.requisitionService.updateRequisitionCandidateRejectDeclineCallBack(formdata).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          this.joinerSearchSubmit();
          this.pendingScheduleSearchIndividualSubmit();
          this.scheduleSearchIndividualSubmit();
          jQuery(".close").click();
        }
      }
      else {
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }

  ShowExistingBatch(evt) {
    this.Verticalbatchs = this.allbatchs.filter(x => x.vertical == evt);
  }
  // Share With Inductors

  onClickShareWithInductors(data, shareBy) {
    this.getAllScheduleDetails(data, shareBy);
  }
  trainerWiseResult: any;
  trainerIds: any[] = [];
  getAllScheduleDetails(data: any, shareBy: string) {
    this.searchInductionSchedule.candidateInductionScheduleId = Number(data.candidateInductionScheduleId);
    this.joinersservice.getScheduleInductionDetails(this.searchInductionSchedule).subscribe((result) => {
      if (result) {
        this.inductionSchedule = result;
        //  this.result=this.inductionSchedule.candidateInductionSheduleDetails;        
        this.trainerWiseResult = _.groupBy(this.inductionSchedule.candidateInductionSheduleDetails, x => x.trainer);
        this.trainerIds = Object.keys(this.trainerWiseResult)
        if (shareBy == "Batch") {
          this.shareWithInductorsBatchWise(data);
        } else {
          this.shareWithInductorsCandidateWise(data);
        }
        this.SpinnerService.hide();
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
  shareWithInductorsBatchWise(data) {
    let saheWithInductorObj = {
      shareWithInductorDetail: [],
      isBatch: true,
      createdBy: this.loginUserId,
      joiningDate: data.dateofJoining
    }

    this.trainerIds.forEach(element => {
      var filterArrayByTrainer = this.inductionSchedule.candidateInductionSheduleDetails.filter(x => x.trainer == element);
      var test1 = "";
      var test = "<html lang='en'><p style='margin: 3px 0;'><b>Batch No :</b>" + data.batchNo + "</p><p style='margin: 3px 0 10px 0;'><b> Total No Of Candidates :</b>" + data.totalCandidates + "</p><table style='width: 100%; border: 1px solid #000; border-collapse: collapse;'><thead><tr><th style='border: 1px solid #000; padding:4px;text-align:left;'>Training Tittle</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Date</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>From Time</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>To Time</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Location</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Venue</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Mode</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Coordinator</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Session Details</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Remarks</th></tr></thead><tbody>"
      filterArrayByTrainer.forEach(element => {
        test1 += "<tr><td style='border: 1px solid #000; padding:4px;'>" + element.traingTitle + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.dateFrom + "-" + element.dateTo + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.timeFrom + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.timeTo + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.locationName + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.inductionVenueName + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.inductioneName + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.trainingCoOrdinatorName + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.detailsofSession + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.remarks + "</td></tr>"

      })

      var newString = test + test1 + "</tbody></table><p style='margin: 30px 0 5px 0;'>Thank you</p><p style='margin: 3px 0 10px 0;'>Onboarding team</p></html>"

      let objShareWithInductordetails = {
        batchId: data.batchId,
        candidateId: null,
        autoUserId: Number(element),
        emailBody: newString,
        inductorName: filterArrayByTrainer[0].trainerName
      }
      saheWithInductorObj.shareWithInductorDetail.push(objShareWithInductordetails);
    })

    this.SpinnerService.show();
    this.plantservice.shareWithInductors(saheWithInductorObj).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
        }
      }
      else {
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.loadDataTable();
      this.SpinnerService.hide();
    });


  }
  shareWithInductorsCandidateWise(data) {
    let saheWithInductorObj = {
      shareWithInductorDetail: [],
      isBatch: false,
      createdBy: this.loginUserId,
      joiningDate: data.dateofJoining
    }

    this.trainerIds.forEach(element => {
      var filterArrayByTrainer = this.inductionSchedule.candidateInductionSheduleDetails.filter(x => x.trainer == element);
      var test1 = "";
      var test = "<html lang='en'><p style='margin: 3px 0;'><b>Candidate No :</b>" + data.candidateNo + "</p><p style='margin: 3px 0 10px 0;'><b> Candidate Name :</b>" + data.candidateFullName + "</p><table style='width: 100%; border: 1px solid #000; border-collapse: collapse;'><thead><tr><th style='border: 1px solid #000; padding:4px;text-align:left;'>Training Tittle</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Date</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>From Time</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>To Time</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Location</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Venue</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Mode</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Coordinator</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Session Details</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Remarks</th></tr></thead><tbody>"
      filterArrayByTrainer.forEach(element => {
        test1 += "<tr><td style='border: 1px solid #000; padding:4px;'>" + element.traingTitle + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.dateFrom + "-" + element.dateTo + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.timeFrom + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.timeTo + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.locationName + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.inductionVenueName + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.inductioneName + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.trainingCoOrdinatorName + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.detailsofSession + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.remarks + "</td></tr>"

      })

      var newString = test + test1 + "</tbody></table><p style='margin: 30px 0 5px 0;'>Thank you</p><p style='margin: 3px 0 10px 0;'>Onboarding team</p></html>"

      let objShareWithInductordetails = {
        batchId: null,
        candidateId: data.candidateId,
        autoUserId: Number(element),
        emailBody: newString,
        inductorName: filterArrayByTrainer[0].trainerName
      }
      saheWithInductorObj.shareWithInductorDetail.push(objShareWithInductordetails);
    })

    this.SpinnerService.show();
    this.plantservice.shareWithInductors(saheWithInductorObj).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
        }
      }
      else {
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.loadDataTable();
      this.SpinnerService.hide();
    });
  }
  ngOnDestroy() {
    jQuery(".custom-menu").hide();
  }

  getEditableDocs: any = [];
  getEditableDocsfromapi: any = [];
  onClickEditAdditionalDoc(data) {
    this.getAllDocumentName();
    this.editAttatchmentArray = [];
    this.getEditableDocs = []
    var record = {
      CandidateId: Number(data.candidateId)
    }
    setTimeout(() => {
      this.joinersservice.GetAdditionalDocumentList(record).subscribe((result) => {
        this.getEditableDocs = result;
        for (var val of this.getEditableDocs) {
          this.editAttatchmentArray.push(val.candidateJoiningDocumentId);
        }
        for (var index = 0; index < this.documentNames.length; index++) {
          if (this.documentNames.length > this.getEditableDocs.length) {
            for (var val of this.getEditableDocs) {
              if (this.documentNames[index].attachmentDocumentNameId != val.candidateJoiningDocumentId) {
                var valfind = this.getEditableDocs.find(e => Number(e.candidateJoiningDocumentId) == Number(this.documentNames[index].attachmentDocumentNameId));
                if (valfind != undefined && valfind.attachmentDocumentName.length > 0) {
                  continue;
                }
                else {
                  this.getEditableDocs.push({
                    candidateJoiningDocumentId: this.documentNames[index].attachmentDocumentNameId,
                    attachmentDocumentName: this.documentNames[index].attachmentDocumentName,
                    shareWithCandidateId: 0
                  })
                }
              }
              if (this.documentNames.length == this.getEditableDocs.length) {
                break;
              }
            }
          }
          else {
            break;
          }
        }


      })
    }, 50);

  }
  editAttatchmentArray: any = []
  onClickChangeAttachmentDoc(event, record) {
    if (event.target.checked) {
      this.editAttatchmentArray.push(record.candidateJoiningDocumentId)
    }
    else {
      this.editAttatchmentArray = this.editAttatchmentArray.filter(e => e != record.candidateJoiningDocumentId)
    }
  }
  onClickEditSubmit() {
    var attatchments = "";
    for (var val of this.editAttatchmentArray) {
      attatchments += val.toString() + ","
    }
    var singleSbmitDetail = this.getEditableDocs[0];

    var record = {
      ShareWithCandidateHeaderId: Number(singleSbmitDetail.shareWithCandidateHeaderId),
      CandidateId: Number(singleSbmitDetail.candidateId),
      CandidateJoiningDocumentIds: attatchments.slice(0, -1),
      CreatedBy: this.loginUserId
    }

    this.joinersservice.updateShareWithCandidateAdditionalDocumentOH(record).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");

        }
      }
      else {
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      // this.createShareInductionForm();
      this.getAllCandidateDetailsBatchWise();
      this.loadDataTable();
      jQuery("#editAdditionalDoc").modal("hide");

      this.SpinnerService.hide();
    });
  }

  onClickEditCancel() {
    this.editAttatchmentArray = [];
    this.getEditableDocs = []
  }
}

class UpdateJoinigDateForBatch {
  batchId: number;
  dateofJoining: string;
  createdBy: number;
}
