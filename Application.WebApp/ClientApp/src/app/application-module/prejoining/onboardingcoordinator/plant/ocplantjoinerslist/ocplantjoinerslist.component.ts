import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../../interfaces/common/doctor.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../../interfaces/common/function.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../../interfaces/common/position.interface';
import { IJoinersList, IPendingScheduleBatchWise, IPendingScheduleIndividual, IScheduledBatchWise, IScheduledIndividually, IReportingVenueExists, IShareWithCandidate } from '../../../../../interfaces/prejoining/joinerslist.interface';
import { IOnboardingCoordinator, ISearchOnboardingCoordinator, IVenue, ISearchVenue, IJoiningDocument, IWelcomeTemplate } from '../../../../../interfaces/prejoining/onboardingcoordinator.interface';
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
import { IApproverVertical, IApproverFunction, IApproverDepartment, IApproverVerticalFunctionDepartment, IApproverFunctionDepartment, IBatch, ISearchBatch } from '../../../../../interfaces/common/common.interface';
import { EmailtemplateService } from 'src/app/services/common/emailtemplate/emailtemplate.service';
import { IEmailTemplate, ISearchEmailTemplate } from 'src/app/interfaces/common/emailtemplate.interface';
import { IAttachmentDocumentNameDetails, ISearchAttachmentDocumentName } from 'src/app/interfaces/common/attachmentdocument.interface';
import { AttachmentdocumentService } from 'src/app/services/common/attachementdocument/attachmentdocument.service';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { RequisitionService } from '../../../../../services/preselection/requisition/requisition.service';
import { PlantallocationService } from 'src/app/services/prejoining/onboardingmanager/plant/plantallocation.service';
import { IModeOfInduction, ISearchModeOfInduction, ITrainer, IsearchTrainer, ITemplate, ISearchTemplate, IRoleWiseUser, ISearchRoleWiseUser, ICandidateInductionSchedule, ICandidateInductionSheduleHeader, ICandidateInductionSheduleDetails } from '../../../../../interfaces/prejoining/onboardingcoordinator.interface';
import * as _ from 'lodash';

declare var jQuery: any;
// Added By Anif 0n 08-11-2022
import { CandidateService } from '../../../../../services/prejoining/candidate/candidate.service';  // 08-11-2022
import {
  ICandidateInductionPlan, ICandidateDetails, ICandidateInductionPlanSheduleDetails, ICandidateAccommodationDetails, IAccommodationDetails, IInductionDetails,
  IInductionList
} from '../../../../../interfaces/prejoining/candidate.interface';
import { Log } from 'oidc-client';

@Component({
  selector: 'app-ocplantjoinerslist',
  templateUrl: './ocplantjoinerslist.component.html',
  styleUrls: ['./ocplantjoinerslist.component.css']
})
export class OcplantjoinerslistComponent implements OnInit {

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
  // searchReportingVenueForm: FormGroup;
  @ViewChild('dateOfJoining', { static: false }) dtOfJoining: ElementRef;
  @ViewChild('dtofJoiningFrom', { static: false }) dtofJoiningFrom: ElementRef;
  @ViewChild('dtofJoiningTo', { static: false }) dtofJoiningTo: ElementRef;
  @ViewChild('fromDatePendingBatch', { static: false }) fromDatePendingBatch: ElementRef;
  @ViewChild('toDatePendingBatch', { static: false }) toDatePendingBatch: ElementRef;
  @ViewChild('fromDateScheduledBatch', { static: false }) fromDateScheduledBatch: ElementRef;
  @ViewChild('toDateScheduledBatch', { static: false }) toDateScheduledBatch: ElementRef;
  @ViewChild('templateText', { static: false }) templateText: ElementRef;
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
  onBoardingCoordinatorList: IOnboardingCoordinator[] = [];
  selectedCoordinator: IOnboardingCoordinator;
  searchCoordinator: ISearchOnboardingCoordinator = {
    requisitionDetailId: null
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
  verticalBatch: IBatch[];
  verticalWiseBatch: IBatch[];
  // venue
  venues: IVenue[] = [];
  selectedVenue: IVenue;
  searchVenue: ISearchVenue = {
    reportingVenueId: null,
    isActive: null
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
  loginUserId: number;
  verticalIds: string;
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
  moveFrom: string;
  movingCandidateId: number;
  joiningTypeList: any[] = [];
  candidateIdForReportingVenue: number;
  reportingVenueExists: IReportingVenueExists[] = [];
  addingReportingVenueFor: string;
  addingReportingVenueForNo: string;
  addingReportingVenueForId: number;


  welcomeTemplate: IWelcomeTemplate[] = [];
  shareWithCandidateArray: any[] = [];
  sharingType: string;
  sharingCandidateId: number;
  sharingCandidateName: string = "";
  joiningDocumentsIds: string = "";
  sharingCandidateRequisitionId: number;
  disablesBatchField: boolean = false;
  showBatchSection: boolean = true;
  showBatchForMove: boolean = true;
  // Share with candidate email template
  selectedTestEmailTemplateId: number;
  testEmailTemplateDescription: string;
  searchAccommodationDetails = {
    batchId: null,
    candidateId: null,
  }
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
  // Joining Document
  documentNames: IAttachmentDocumentNameDetails[] = [];
  documentNameList: IAttachmentDocumentNameDetails[] = [];
  searchDocumentName: ISearchAttachmentDocumentName = {
    attachmentDocumentNameId: null,
    attachmentDocumentParticularId: null,//changed to null from 10
    isActive: true
  }
  allUserList: any[] = [];
  searchRoleUser: any = {
    roleId: 0
  }
  coordinatorName: string;
  parentActiveTab: string = "New Joiners";
  pendingChildActiveTab: string = "Individual";
  scheduleChildActiveTab: string = "Individual";
  persistanceParentActiveTab: string;
  childActiveTab: string;
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

  actionName: string;
  declaineCandidateId: number;
  declineremarks: string;
  tabName: string;
  allJoiningDateInformation: any[] = [];


  // Share with Inductors

  searchInductionSchedule = {
    candidateInductionScheduleId: null,
  }
  inductionSchedule: ICandidateInductionSchedule;


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

  objUpdateJoinigDateForBatch: UpdateJoinigDateForBatch;
  batchJoiningDate: any;
  // Added By Anif on 08-11-2022
  getInductionDetailsForm: FormGroup;
  candidateInductionPlan: ICandidateInductionPlan;
  candidateDetails: ICandidateDetails;
  candidateInductionPlanDetails: ICandidateInductionPlanSheduleDetails[] = [];
  candidateAllAccommodationDetails: ICandidateAccommodationDetails[] = [];
  candidateAccommodationDetails: ICandidateAccommodationDetails[] = [];
  accommodationData: any;
  accomodationDetails: IAccommodationDetails = {
    candidateName: "",
    location: "",
    department: "",
    grade: "",
    batchNo: "",
    function: "",
    position: "",
    joiningDate: "",
    accommodationList: []
  };

  inductionData: any;
  inductionDetails: IInductionDetails = {
    candidateName: "",
    location: "",
    department: "",
    grade: "",
    batchNo: "",
    function: "",
    position: "",
    joiningDate: "",
    inductionList: []
  };
  sharingCandidateEmailId: string;
  candidatePreviewArray: any[] = [];   // Anif 21-11-2022
  emailDescriptionForPrev: string = "";   // Anif 21-11-2022
  documentNamesForPrev: string = "";         // Anif 21-11-2022
  batchCandidateIds: any[] = [];
  multiSelectCandidateIds: any[] = [];
  candidatesForAdditionalDocuments: any[] = [];  //. Added on 25-01-2023
  candidateAndAdditionalDocIds: any[] = [];  //. Added on 25-01-2023
  discontinueRemarks: string = "";
  discontinueCandidateId: any;
  objDeleteInductionSchedule: DeleteInductionSchedule;
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
    private emailtemplateService: EmailtemplateService,
    private joinersservice: JoinersService,
    private attachmentDocumentService: AttachmentdocumentService,
    private requisitionService: RequisitionService,
    private plantservice: PlantallocationService,
    private candidateService: CandidateService    // Added by Anif on 08-11-2022
  ) {
    this.SpinnerService.show();
    this.objUpdateJoinigDateForBatch = new UpdateJoinigDateForBatch();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
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
    // this.createReportingVenueFormSearchForm();
    this.getAllVerticals();
    this.getVerticalsForPopUp();
    //this.getAllBatch();
    this.getVenue();
    this.getAllOnboardingCoordinator();
    this.getAllCandidateJoinerList();
    this.onClickPendingScheduleTab();
    this.onClickScheduledTab();
    this.getAllDocumentName();
    this.getEmailTemplate();
    this.getAllUsers();
    this.getModeOfJoining();
  }

  ngOnInit() {
    // this.loadDataTable();
    // this.loadDataTable2();
    // this.loadDataTable3();
    // this.loadDataTable4();
    // this.loadDataTable5();
    this.loadDatePicker();
    this.loadEditor();
    this.tableOptionDropDown();
    this.loadPopover();
    //this.loadDatePicker2();
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
  tableOptionDropDown() {
    setTimeout(() => {
      var body_ = jQuery('body');
      var dropdownMenu,
        table_responsive = jQuery('.table-responsive');
      table_responsive.on('show.bs.dropdown', function (e) {
        dropdownMenu = jQuery(e.target).find('.dropdown-menu');
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
      functionId: null
    });
  }
  createPendingScheduleBatchSearchForm() {
    this.searchformPendingScheduleBatch = this.fb.group({
      batchNo: [''],
      onBordingMangerId: null,
      onBordingCoordinatorId: null,
      dtofJoiningFrom: [''],
      dtofJoiningTo: [''],
      verticalId: [2],
    });
  }
  getAllOnboardingCoordinator() {
    this.onBoardingCoordinatorList = [];
    //this.searchCoordinator.requisitionDetailId = this.requisitionDetailId.toString();
    this.corporateService.getAllOnboardingCorordinator(this.searchCoordinator).subscribe((result) => {
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
      // this.loadSelectPicker();
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
  //verticals
  getAllVerticals() {
    this.verticals = [];
    var splitvertical = this.verticalIds.split(",");
    var allvertical = "";
    // for (var i = 0; i < splitvertical.length; i++) {
    //   if (splitvertical[i] != "0") {
    // if (splitvertical[i] == "1") {
    //   this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    // }
    // else if (splitvertical[i] == "2") {
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    //}
    // else if (splitvertical[i] == "3") {
    //   this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    // }
    // if (allvertical == "") {
    //   allvertical = splitvertical[i];
    // }
    // else {
    //   allvertical = allvertical + "," + splitvertical[i];
    // }
    //}

    // }
    var selectedVerticalObj = this.verticals.find(e => e.verticalId == 2);
    this.selectedPendingVertical = selectedVerticalObj;
    this.defaultverticalId = this.selectedPendingVertical.verticalId;
    this.selectedVerticalId = this.defaultverticalId;
    // this.selectedPendingVertical = this.verticals.filter(x => x.verticalId == this.defaultverticalId)[0];
    // Sending one default value to backend
    this.searchformJoinerList.patchValue({
      verticalId: this.defaultverticalId
    })
    // Pending Individual
    // this.searchformPendingScheduleIndividual.patchValue({
    //   verticalId: this.defaultverticalId
    // })
    // // Pending Batch
    // this.searchformPendingScheduleBatch.patchValue({
    //   verticalId: this.defaultverticalId
    // })
    // // Schedule Individual
    // this.searchformScheduledIndividual.patchValue({
    //   verticalId: this.defaultverticalId
    // })
    // // Schedule Batch
    // this.searchformScheduledBatchWise.patchValue({
    //   verticalId: this.defaultverticalId
    // })

    this.searchformPendingScheduleIndividual.patchValue({
      verticalId: 2
    })

    this.searchformPendingScheduleBatch.patchValue({
      verticalId: 2
    })

    this.searchformScheduledBatchWise.patchValue({
      verticalId: 2
    })

    this.searchformJoinerList.patchValue({
      verticalId: 2
    })
    this.searchformScheduledIndividual.patchValue({
      verticalId: 2
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

  getAllDocumentName() {
    this.documentNames = [];
    this.SpinnerService.show();
    this.attachmentDocumentService.getAllDocumentName(this.searchDocumentName).subscribe((result) => {
      if (result) {
        this.documentNames = result;
        //this.documentNames = this.documentNames.filter(e => e.attachmentDocumentNameId != 20 && e.attachmentDocumentNameId != 19);
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

  getAllCandidateJoinerList() {
    this.joinersList = [];
    this.searchformJoinerList.patchValue({
      verticalId: 2
    })
    this.SpinnerService.show();
    this.joinersservice.getAlljoinersList(this.searchformJoinerList.value).subscribe((result) => {
      if (result) {
        this.joinersList = result;
        this.joinersList = this.joinersList.filter(e => e.candidateJoiningTypeDetailsId == 0);
        this.joinersList = this.joinersList.filter(x => x.onBoardingCoordinator == this.loginUserId);
        this.joinersList.forEach(element => {
          if (element.onboardingCordinatorNotApproveDoc != " " && element.onboardingCordinatorNotApproveDoc != null) {
            element.popoverContent = "<div><span class='grey'>Pending/Need clarification Document: </span><span>" + element.onboardingCordinatorNotApproveDoc + "</span></div>";
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
    // Assign Default Vertical Value
    this.searchformJoinerList.patchValue({
      verticalId: this.defaultverticalId
    })
    this.selectedVerticalId = this.defaultverticalId;
    this.getAllLocation();
    this.getAllFunction();
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
      if (data.hiringStatusId == 47) {
        jQuery("#" + data.candidateNo).prop("checked", false);
        this.notificationService.showError("Acomodation Status is not same", "Error");
      }
      else {
        jQuery("#" + data.candidateNo).prop("checked", false);
        this.notificationService.showError("Please select same hiring status", "Error");
      }
    }
  }
  GetSelectedHiringStatusSchedule(NewRow) {
    var AlredyChecked = this.scheduledIndividually.find(e => e.checked);
    if (AlredyChecked == null) {
      return true;
    } else {
      if ((AlredyChecked.hiringStatusId == 47) && (AlredyChecked.hiringStatusId == NewRow.hiringStatusId)) {
        if (AlredyChecked.candidateId == NewRow.candidateId) {
          return true;
        }
        else if ((AlredyChecked.candidateAccomodationHeaderId == 0) && (NewRow.candidateAccomodationHeaderId == 0)) {
          return false
        }
        else if ((AlredyChecked.candidateAccomodationHeaderId > 0) && (NewRow.candidateAccomodationHeaderId > 0)) {
          return true;
        }
        else if (((AlredyChecked.candidateAccomodationHeaderId == 0) && (NewRow.candidateAccomodationHeaderId != 0)) || ((AlredyChecked.candidateAccomodationHeaderId != 0) && (NewRow.candidateAccomodationHeaderId == 0))) {
          return false;
        }
      }
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
    jQuery("#chkAllIndividual").prop("checked", false);
  }
  onClickBatchTab() {
    this.createPendingScheduleBatchSearchForm();
    this.getAllVerticals();
    this.getPendingScheduleListBatchwise();
    jQuery("#chkAllIndividual").prop("checked", false);
  }
  onClickScheduledBatchTab() {
    this.createScheduledBatchwiseSearchForm();
    this.getAllVerticals();
    this.getAllScheduledListBatchWise();
    jQuery("#chkAllIndividualScheduled").prop("checked", false);
  }
  onclickScheduleIndividualTab() {
    this.createScheduledIndividualSearchForm();
    this.getAllVerticals();
    this.getAllScheduledListIndividually();
    jQuery("#chkAllIndividualScheduled").prop("checked", false);
  }
  getPendingScheduleListindividually() {
    this.pendingScheduleCandidateindividual = [];
    this.SpinnerService.show();
    this.joinersservice.getAllPendingScheduleCandidateListIndividual(this.searchformPendingScheduleIndividual.value).subscribe((result) => {
      if (result) {
        //this.pendingScheduleCandidateindividual = result.filter(x => x.verticalId == 2);
        this.pendingScheduleCandidateindividual = result;
        this.pendingScheduleCandidateindividual = this.pendingScheduleCandidateindividual.filter(x => x.onBoardingCoordinator == this.loginUserId);
        this.pendingScheduleCandidateindividual.forEach(element => {
          if (element.onboardingCordinatorNotApproveDoc != " ") {
            element.popoverContent = "<div><span class='grey'>Pending/Need clarification Document: </span><span>" + element.onboardingCordinatorNotApproveDoc + "</span></div>";
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
        // this.scheduledIndividually = result.filter(x => x.verticalId == 2 && x.onBoardingCoordinator == this.loginUserId);  // no need as vertical will come from filter
        this.scheduledIndividually = result.filter(x => x.onBoardingCoordinator == this.loginUserId);
        this.scheduledIndividually.forEach(element => {
          if (element.onboardingCordinatorNotApproveDoc != " ") {
            element.popoverContent = "<div><span class='grey'>Pending/Need clarification Document: </span><span>" + element.onboardingCordinatorNotApproveDoc + "</span></div>";
          }
        })
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
        this.pendingScheduleCandidateListBatchWise = result;
        this.pendingScheduleCandidateListBatchWise = result.filter(x => x.onBoardingcoordinator == this.loginUserId);
        // this.pendingScheduleCandidateListBatchWise = this.pendingScheduleCandidateListBatchWise.filter(x => x.inductionProgrammeCoOrdinatior == 0)
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
        this.scheduledBatchWise = result;
        this.scheduledBatchWise = result.filter(x => x.onBoardingcoordinator == this.loginUserId);
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
    // Assign Default Vertical Value
    this.searchformPendingScheduleIndividual.patchValue({
      verticalId: this.defaultverticalId
    })
    this.selectedVerticalId = this.defaultverticalId;
    this.getAllLocation();
    this.getAllFunction();
    this.getPendingScheduleListindividually();
  }
  onClickScheduledIndividualReset() {
    this.searchformScheduledIndividual.reset();
    // Assign default Vertical Value
    this.searchformScheduledIndividual.patchValue({
      verticalId: this.defaultverticalId
    })
    this.selectedVerticalId = this.defaultverticalId;
    this.getAllLocation();
    this.getAllFunction();
    this.getAllScheduledListIndividually();
  }
  onClickBatchReset() {
    this.searchformPendingScheduleBatch.reset();
    // Assign Default Vertical Value
    this.searchformPendingScheduleBatch.patchValue({
      verticalId: this.defaultverticalId
    })
    this.selectedVerticalId = this.defaultverticalId;
    this.getAllLocation();
    this.getAllFunction();
    this.getPendingScheduleListBatchwise();
  }
  onClickScheduledBatchReset() {
    this.searchformScheduledBatchWise.reset();
    // Assign Default Vertical value
    this.searchformScheduledBatchWise.patchValue({
      verticalId: this.defaultverticalId
    })
    this.selectedVerticalId = this.defaultverticalId;
    this.getAllLocation();
    this.getAllFunction();
    this.getAllScheduledListBatchWise();
  }
  btnClickConfirmJoiningType() {
    this.confirmJoiningTypeForm.controls.batchId.disable();
    this.sendingJoinigConfirmationType = "A";
    this.sendingJoiningConfirmationCandidateId = 0;
    this.loadSelectPicker();
    this.getVerticalsForPopUp();
    this.createJoiningConfirmTypeForm();
  }
  onConfirmJoiningTypeRowWise(data) {
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
    if (this.confirmJoiningTypeForm.value.joinigType == "B") {
      if (this.confirmJoiningTypeForm.value.batchType == "2") {
        if (this.confirmJoiningTypeForm.value.batchId == null) {
          flag = 1;
          msg = "Please enter batch no";
        }
      }
      else {

      }
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
    jQuery(".custom-menu").hide();
    this.persistance.set('oldpagename', pagetext);
    this.persistance.set('parentActiveTab', parentTabName);
    this.persistance.set('childActiveTab', childTabName);
    this._route.navigate(['/app/viewcandidatedetails'], { queryParams: { BatchId: data.batchId, BatchNo: data.batchNo, OnBoardingcoordinator: data.onBoardingcoordinator, From: "OC", Type: "P" } });
  }
  // Move candidate from  individual tab start

  getAllBatch(verticalId) {
    this.batchs = [];
    this.searchBatch.vertical = verticalId;//this.defaultverticalId;
    this.commonService.getAllBatch(this.searchBatch).subscribe((result) => {
      if (result) {
        this.batchs = result.filter(x => x.createdBy == this.loginUserId);
        this.batchs = this.batchs.filter(x => x.vertical == verticalId);
      }
      else {
        this.batchs = [];
      }
    }, error => {
      console.log(error);
    }, () => {

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
      createdBy: [this.loginUserId],
      Password: [''],//Piu
      reportingVenueName: ['']
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
  btnClickMoveAllCandidate(moveFrom: any) {
    this.moveType = "A";
    this.movingCandidateId = 0;
    this.moveFrom = moveFrom;
    this.candidateMoveSaveForm.reset();
  }

  showBtnMoveCandidate() {
    var checkedObj = this.pendingScheduleCandidateindividual.find(e => e.checked == true); //&& e.hiringStatusId == 32 && e.preEmployeeMedicaStatuslId != 1
    return checkedObj == null ? false : true;
  }
  showBtnMoveCandidateSchedule() {
    var checkedObj = this.scheduledIndividually.find(e => e.checked == true); //&& e.hiringStatusId == 32 && e.preEmployeeMedicaStatuslId != 1
    return checkedObj == null ? false : true;
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
        if (this.moveFrom == "P") {
          this.pendingScheduleCandidateindividual.forEach(element => {
            if (element.checked) {
              candidateIdString += (flag == 0 ? "" : ",") + element.candidateId.toString();
              flag = 1;
            }
          })
        } else {
          this.scheduledIndividually.forEach(element => {
            if (element.checked) {
              candidateIdString += (flag == 0 ? "" : ",") + element.candidateId.toString();
              flag = 1;
            }
          })
        }
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
    this._route.navigate(['/app/scheduleinduction'], { queryParams: { InductionType: "Candidate", IndictionTypeId: data.candidateId, IndictionTypeNo: data.candidateNo, InductionJoiningType: "I", From: "Plant", Mode: "Add", UserType: "OC" } });
  }
  onClickIndividualEditSchedule(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTab', "Scheduled");
    this.persistance.set('childActiveTab', "Individual");
    this._route.navigate(['/app/scheduleinduction'], { queryParams: { InductionType: "Candidate", IndictionTypeId: data.candidateId, IndictionTypeNo: data.candidateNo, InductionJoiningType: "I", From: "Plant", CandidateInductionScheduleId: data.candidateInductionScheduleId, Mode: "Edit", UserType: "OC" } });
  }
  onClickIndividualViewSchedule(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTab', "Scheduled");
    this.persistance.set('childActiveTab', "Individual");
    this._route.navigate(['/app/scheduleinduction'], { queryParams: { InductionType: "Candidate", IndictionTypeId: data.candidateId, IndictionTypeNo: data.candidateNo, InductionJoiningType: "I", From: "Plant", CandidateInductionScheduleId: data.candidateInductionScheduleId, Mode: "View", UserType: "OC" } });
  }
  onClickBatchWiseInductionSchedule(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTab', "Pending Scheduled");
    this.persistance.set('childActiveTab', "Batch");
    this._route.navigate(['/app/scheduleinduction'], { queryParams: { InductionType: "Batch", IndictionTypeId: data.batchId, IndictionTypeNo: data.batchNo, InductionJoiningType: "B", From: "Plant", Mode: "Add", UserType: "OC" } });
  }
  onClicEditScheduleBatchWise(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTab', "Scheduled");
    this.persistance.set('childActiveTab', "Batch");
    this._route.navigate(['/app/scheduleinduction'], { queryParams: { InductionType: "Batch", IndictionTypeId: data.batchId, IndictionTypeNo: data.batchNo, InductionJoiningType: "B", From: "Plant", CandidateInductionScheduleId: data.candidateInductionScheduleId, Mode: "Edit", UserType: "OC" } });

  }
  onClicViewScheduleBatchWise(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTab', "Scheduled");
    this.persistance.set('childActiveTab', "Batch");
    this._route.navigate(['/app/scheduleinduction'], { queryParams: { InductionType: "Batch", IndictionTypeId: data.batchId, IndictionTypeNo: data.batchNo, InductionJoiningType: "B", From: "Plant", CandidateInductionScheduleId: data.candidateInductionScheduleId, Mode: "View", UserType: "OC" } });

  }
  onClickAddReportingVenue(data, type) {
    this.addingReportingVenueFor = type;
    if (type == "Candidate") {
      this.addingReportingVenueForNo = data.candidateNo; //data.candidateNo
      this.addingReportingVenueForId = data.candidateId;
      this.saveReportingVenueForm.patchValue({
        batchId: null,
        candidateId: this.addingReportingVenueForId,
        Password: "welcome@1234",//Piu
        reportingVenueName: this.venues[0].reportingVenueName
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
        Password: "welcome@1234",//Piu
        reportingVenueName: this.venues[0].reportingVenueName
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
          Password: "welcome@1234"//Piu
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
    this._route.navigate(['/app/scheduleaccommodation'], { queryParams: { AccommodationFor: "Candidate", AccommodationForId: data.candidateId, AccommodationForNo: data.candidateNo, From: "Plant", UserType: "OC" } });
  }
  onClickBookAccommodationBatchwise(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTab', "Scheduled");
    this.persistance.set('childActiveTab', "Batch");
    // this._route.navigate(['/scheduleaccommodation'], { queryParams: { AccommodationFor: "Batch", AccommodationForId: data.batchId, AccommodationForNo: data.batchNo, From: "Plant", UserType: "OC" } });
    this._route.navigate(['/app/scheduleaccommodationbatch'], { queryParams: { AccommodationFor: "Batch", AccommodationForId: data.batchId, AccommodationForNo: data.batchNo, From: "Plant", UserType: "OC" } });

  }
  // Edit Accommodation

  onClickEditAccommodationIndividual(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTab', "Scheduled");
    this.persistance.set('childActiveTab', "Individual");
    // this._route.navigate(['/editaccommodation'], { queryParams: { EditAccommodationFor: "Candidate", EditAccommodationForId: data.candidateId, EditAccommodationForNo: data.candidateNo, InductionScheduleId: data.candidateInductionScheduleId, From: "Plant" } });
    this._route.navigate(['/app/editaccommodation'], { queryParams: { EditAccommodationFor: "Candidate", EditAccommodationForId: data.candidateId, EditAccommodationForNo: data.candidateNo, InductionScheduleId: data.candidateInductionScheduleId, From: "Plant", UserType: "OC" } });

  }
  onClickEditAccommodationBatchWise(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTab', "Scheduled");
    this.persistance.set('childActiveTab', "Batch");
    //this._route.navigate(['/editaccommodation'], { queryParams: { EditAccommodationFor: "Batch", EditAccommodationForId: data.batchId, EditAccommodationForNo: data.batchNo, InductionScheduleId: data.candidateInductionScheduleId, From: "Plant", UserType: "OC" } });
    this._route.navigate(['/app/editaccommodation-batch'], { queryParams: { EditAccommodationFor: "Batch", EditAccommodationForId: data.batchId, EditAccommodationForNo: data.batchNo, InductionScheduleId: data.candidateInductionScheduleId, From: "Plant", UserType: "OC" } });

  }

  // Share with candidate

  showBtnShareWithCandidate() {
    var flag = 0;
    var CheckedObj = [];
    CheckedObj = this.scheduledIndividually.filter(e => e.checked == true && e.hiringStatusId == 47 && e.candidateAccomodationHeaderId > 0); // && e.medicalDocumentCollectionId == 1
    if (CheckedObj.length > 0) {
      var medicalCollectionId = CheckedObj.find(e => e.checked == true && e.hiringStatusId == 47);  //       
      if (medicalCollectionId == null) {
        return false;
      } else {
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
    //14-07-2023 start
    this.candidateAndAdditionalDocIds = [];
    this.candidatesForAdditionalDocuments = [];
    if (this.scheduledIndividually.length > 0) {
      this.scheduledIndividually.forEach(element => {
        if (element.checked) {
          let candidateobj = {
            candidateId: element.candidateId,
            candidateNo: element.candidateNo,
            candidateFullName: element.candidateFullName
          }
          this.candidatesForAdditionalDocuments.push(candidateobj);
        }
      })
    }
    //14-07-2023 end
  }
  onOptionClickShareWithCandidate(data) {
    this.sharingType = "S";
    this.sharingCandidateId = data.candidateId;
    this.sharingCandidateName = data.candidateFullName; // 14-07-2023
    this.sharingJoiningDate = data.dateofJoining;
    this.sharingCandidateEmailId = data.emailId;     // Added By anif on 08-11-2022
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
    // Added on 25-01-2023
    this.candidatesForAdditionalDocuments = [];
    let candidateobj = {
      candidateId: data.candidateId,
      candidateNo: data.candidateNo,
      candidateFullName: data.candidateFullName
    }
    this.candidatesForAdditionalDocuments.push(candidateobj);
    //14-07-2023 start
    this.candidateAndAdditionalDocIds = [];
    //14-07-2023 end
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
    //14-07-2023 start
    this.candidateAndAdditionalDocIds = [];
    //14-07-2023 end
  }
  getAllCandidateDetailsBatchWise() {
    this.candidatesForAdditionalDocuments = [];  // Added on 25-01-2023
    this.SpinnerService.show();
    this.joinersservice.getAllBatchWiseCandidateDetails(this.searchCandidate).subscribe((result) => {
      if (result) {
        this.batchWiseCandidateList = result;
        this.candidatesForAdditionalDocuments = result; // Added on 25-01-2023
        this.SpinnerService.hide();
      }
      else {
        this.batchWiseCandidateList = [];
        this.candidatesForAdditionalDocuments = []; // Added on 25-01-2023
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
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

  getReportingVenuerAndAccommodation() {
    this.SpinnerService.show();
    this.joinersservice.getAllDetailsForEditAccommodation(this.searchAccommodationDetails).subscribe((result) => {
      if (result) {
        this.accommodationAndVenueDetails = result;
        this.venueDetails = this.accommodationAndVenueDetails.editAccomodationCandidateDetail;
        this.accommodationDetails = this.accommodationAndVenueDetails.trainingEditAccomodationForCandidateDetails[0];
        this.reportingTimeDetails = this.accommodationAndVenueDetails.trainingEditAccomodationInductionSheduleDetails[0];
        this.SpinnerService.hide();
      }
      else {
        // this.editAccommodationDetails = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });

  }
  onChangeJoiningDocuments(eve, docData, docId) {
    // if (eve.target.checked) {
    //   this.joiningDocumentsIds += this.joiningDocumentsIds == "" ? +docData.attachmentDocumentNameId : "," + docData.attachmentDocumentNameId;
    // } else {
    //   var commaSeparatedArr = this.joiningDocumentsIds.split(",");
    //   commaSeparatedArr.forEach((element, index) => {
    //     if (element == docData.attachmentDocumentNameId.toString()) {
    //       commaSeparatedArr.splice(index, 1)
    //     }
    //   })
    //   this.joiningDocumentsIds = commaSeparatedArr.join(",").toString();
    // }
    if (eve.target.checked) {
      let canObj = {
        candidateId: docData.candidateId,
        documentId: docId
      }
      this.candidateAndAdditionalDocIds.push(canObj)

    } else {
      this.candidateAndAdditionalDocIds.forEach((element, index) => {
        if (element.candidateId == docData.candidateId && element.documentId == docId) {
          this.candidateAndAdditionalDocIds.splice(index, 1);
        }
      })
    }
  }


  changeTestEmailTemplate() {
    this.saveShareWithCandidate.shareWithCandidates = [];
    this.saveShareWithCandidate.shareWithCandidatesInductionAccommodationAttachment = [] // Added by anif on 08-11-2022
    this.inductionDetails.inductionList = [];
    this.accomodationDetails.accommodationList = [];
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
        if (element.checked && element.hiringStatusId == 47) { //  
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
                joiningDate: element.dateofJoining,
                onBoardingCoordinatrDetaills: this.venueDetails.onBoardingCoordinatrDetaills
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
          this.multiSelectCandidateIds.push({ candidateId: element.candidateId, emailId: element.emailId });
        }
      });
      if (this.multiSelectCandidateIds.length > 0) {

        this.prepareDataForMultiSelectCandidate(this.multiSelectCandidateIds[0]);
      }
    } else if (this.sharingType == "B") {
      this.identicalAccommodationDetails = [];
      this.identicalTrainingCoordinator = [];
      this.allCandidateVenueDetails = [];
      this.multipleCandidateId = "";
      this.batchCandidateIds = [];
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
            reprtingVenueAddress: this.venueDetails == null ? "NA" : this.venueDetails.reprtingVenueAddress,
            //venueLocation: this.venueDetails == null ? "NA" : this.venueDetails.venueAddress,            
            venueLocation: this.venueDetails == null ? "NA" : this.venueDetails.venueName,   // Changed on 09-01-2023
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
          // Push batch candidate id into one array;
          this.batchCandidateIds.push({ candidateId: bt_element.candidateId, emailId: bt_element.emailId });
        })
        if (this.batchCandidateIds.length > 0) {
          this.prepareDataForBatchCandidate(this.batchCandidateIds[0]);
        }
      });
      // if (this.batchCandidateIds.length > 0) {
      //   this.prepareDataForBatchCandidate(this.batchCandidateIds[0]);
      // }
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
            joiningDate: this.sharingJoiningDate,
            onBoardingCoordinatrDetaills: this.venueDetails.onBoardingCoordinatrDetaills
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

      // Added By Anif on 08-11-2022 GET Accommodation and induction details Data

      let serachInductionAndAccomodationDetails = {
        candidateId: this.sharingCandidateId
      }
      this.candidateService.getCandidateInductionPlan(serachInductionAndAccomodationDetails).subscribe((result) => {
        if (result) {
          this.candidateInductionPlan = result;
          this.candidateDetails = this.candidateInductionPlan.candidateInductionPlanShedule;
          this.candidateInductionPlanDetails = this.candidateInductionPlan.candidateInductionPlanShedules;
          this.candidateAllAccommodationDetails = this.candidateInductionPlan.candidateInductionPlanAccomodations;
          this.candidateAllAccommodationDetails.forEach(element => {
            var existed = this.candidateAccommodationDetails.find(e => e.fromDate == element.fromDate && e.toDate == element.toDate);
            if (existed == null) {
              this.candidateAccommodationDetails.push(element);
            }
          })
          // Prepare Accommodation Data
          if (this.candidateInductionPlan.candidateInductionPlanShedule != null) {
            this.accomodationDetails.candidateName = this.candidateInductionPlan.candidateInductionPlanShedule.candidateFullName;
            this.accomodationDetails.location = this.candidateInductionPlan.candidateInductionPlanShedule.locationName;
            this.accomodationDetails.department = this.candidateInductionPlan.candidateInductionPlanShedule.departmentName;
            this.accomodationDetails.grade = this.candidateInductionPlan.candidateInductionPlanShedule.gradeName;
            //this.accomodationDetails.batchNo = this.candidateInductionPlan.candidateInductionPlanShedule.batchId == null ? "" : this.candidateInductionPlan.candidateInductionPlanShedule.batchId.toString();
            this.accomodationDetails.batchNo = this.candidateInductionPlan.candidateInductionPlanShedule.batchId == null ? "" : this.candidateInductionPlan.candidateInductionPlanShedule.batchNo;   // By Anif on 21-08-2023
            this.accomodationDetails.function = this.candidateInductionPlan.candidateInductionPlanShedule.functionName;
            this.accomodationDetails.position = this.candidateInductionPlan.candidateInductionPlanShedule.positionName;
            this.accomodationDetails.joiningDate = this.candidateInductionPlan.candidateInductionPlanShedule.dateofJoining;
          }
          if (this.candidateAllAccommodationDetails.length > 0) {
            this.candidateAllAccommodationDetails.forEach(element => {
              var existed = this.accomodationDetails.accommodationList.find(e => e.fromDate == element.fromDate && e.toDate == element.toDate);
              if (existed == null) {
                var obj = {
                  fromDate: element.fromDate,
                  toDate: element.toDate,
                  location: element.locationName,
                  accommodation: (element.accomodation == "" || element.accomodation == null) ? "NA" : element.accomodation
                }
                this.accomodationDetails.accommodationList.push(obj);
              }
            })
          }
          this.accommodationData = this.accomodationDetails;
          // Prepare Induction Data

          if (this.candidateInductionPlan.candidateInductionPlanShedule != null) {
            this.inductionDetails.candidateName = this.candidateInductionPlan.candidateInductionPlanShedule.candidateFullName;
            this.inductionDetails.location = this.candidateInductionPlan.candidateInductionPlanShedule.locationName;
            this.inductionDetails.department = this.candidateInductionPlan.candidateInductionPlanShedule.departmentName;
            // this.inductionDetails.candidateName = this.candidateInductionPlan.candidateInductionPlanShedule.candidateFullName;
            this.inductionDetails.grade = this.candidateInductionPlan.candidateInductionPlanShedule.gradeName;
            //this.inductionDetails.batchNo = this.candidateInductionPlan.candidateInductionPlanShedule.batchId == null ? "" : this.candidateInductionPlan.candidateInductionPlanShedule.batchId.toString();
            this.inductionDetails.batchNo = this.candidateInductionPlan.candidateInductionPlanShedule.batchId == null ? "" : this.candidateInductionPlan.candidateInductionPlanShedule.batchNo;   // By Anif on 21-08-2023
            this.inductionDetails.function = this.candidateInductionPlan.candidateInductionPlanShedule.functionName;
            this.inductionDetails.position = this.candidateInductionPlan.candidateInductionPlanShedule.positionName;
            this.inductionDetails.joiningDate = this.candidateInductionPlan.candidateInductionPlanShedule.dateofJoining;
          }
          if (this.candidateInductionPlan.candidateInductionPlanShedules.length > 0) {
            this.candidateInductionPlan.candidateInductionPlanShedules.forEach(element => {
              var existed = this.inductionDetails.inductionList.find(e => e.trainingTittle == element.traingTitle);
              if (existed == null) {
                let obj = {
                  trainingTittle: element.traingTitle,
                  trainingTittleId: element.trainingTittleId,
                  trainingDetails: []
                }
                this.inductionDetails.inductionList.push(obj);
              }
            })
            this.inductionDetails.inductionList.forEach(element => {
              this.candidateInductionPlan.candidateInductionPlanShedules.forEach(plan_element => {
                if (element.trainingTittle == plan_element.traingTitle) {
                  var accommodationObj = this.candidateInductionPlan.candidateInductionPlanAccomodations.find(e => e.locationId == plan_element.locationId);
                  var accommodation = null;
                  if (accommodationObj != undefined) {
                    accommodation = accommodationObj.accomodation
                  }

                  let trainingDetailsObj = {
                    //inductionDate: plan_element.dateFrom,  // Previouse
                    inductionDate: plan_element.dateFrom + " - " + plan_element.dateTo,  // changed on 17-04-2024 by anif
                    fromTime: plan_element.timeFrom,
                    toTime: plan_element.timeTo,
                    detailsOfSession: plan_element.detailsofSession,
                    location: plan_element.locationName,
                    venue: plan_element.inductionVenueName,
                    persontoMeet: plan_element.trainerName,
                    accommodationRequire: accommodation == null ? "NO" : "YES",
                    remarks: ""
                  }
                  element.trainingDetails.push(trainingDetailsObj);
                }
              })
            })
          }
          this.inductionData = this.inductionDetails;

          // Added in main object of save
          let attachmentObj = {
            candidateId: this.sharingCandidateId,
            candidateEmailId: this.sharingCandidateEmailId,
            candidateName: this.inductionDetails.candidateName,
            batchNo: this.inductionDetails.batchNo,
            department: this.inductionDetails.department,
            function: this.inductionDetails.function,
            grade: this.inductionDetails.grade,
            joiningDate: this.inductionDetails.joiningDate,
            location: this.inductionDetails.location,
            position: this.inductionDetails.position,
            candidateInductionDetailsForAttachment: this.inductionDetails.inductionList,
            candidateAccommodationDetailsForAttachment: this.accomodationDetails.accommodationList,
            emailBody: "",
          }
          this.saveShareWithCandidate.shareWithCandidatesInductionAccommodationAttachment.push(attachmentObj)

        }
      })

    } // if else tag closed

    // this.testEmailTemplateDescription = templatedescription;


  }
  prepareDataForBatchCandidate(candidateDetails: any) {
    // Added By Anif on 08-11-2022 Accommodation and induction details
    this.inductionDetails.inductionList = [];
    this.accomodationDetails.accommodationList = [];
    let serachInductionAndAccomodationDetails = {
      candidateId: candidateDetails.candidateId
    }
    this.SpinnerService.show();
    this.candidateService.getCandidateInductionPlan(serachInductionAndAccomodationDetails).subscribe((result) => {
      if (result) {
        this.candidateInductionPlan = result;
        this.candidateDetails = this.candidateInductionPlan.candidateInductionPlanShedule;
        this.candidateInductionPlanDetails = this.candidateInductionPlan.candidateInductionPlanShedules;
        this.candidateAllAccommodationDetails = this.candidateInductionPlan.candidateInductionPlanAccomodations;
        this.candidateAllAccommodationDetails.forEach(element => {
          var existed = this.candidateAccommodationDetails.find(e => e.fromDate == element.fromDate && e.toDate == element.toDate);
          if (existed == null) {
            this.candidateAccommodationDetails.push(JSON.parse(JSON.stringify(element)));
          }
        })
        // Prepare Accommodation Data
        if (this.candidateInductionPlan.candidateInductionPlanShedule != null) {
          this.accomodationDetails.candidateName = this.candidateInductionPlan.candidateInductionPlanShedule.candidateFullName;
          this.accomodationDetails.location = this.candidateInductionPlan.candidateInductionPlanShedule.locationName;
          this.accomodationDetails.department = this.candidateInductionPlan.candidateInductionPlanShedule.departmentName;
          this.accomodationDetails.grade = this.candidateInductionPlan.candidateInductionPlanShedule.gradeName;
          //this.accomodationDetails.batchNo = this.candidateInductionPlan.candidateInductionPlanShedule.batchId == null ? "" : this.candidateInductionPlan.candidateInductionPlanShedule.batchId.toString();
          this.accomodationDetails.batchNo = this.candidateInductionPlan.candidateInductionPlanShedule.batchId == null ? "" : this.candidateInductionPlan.candidateInductionPlanShedule.batchNo;   // By Anif on 21-08-2023
          this.accomodationDetails.function = this.candidateInductionPlan.candidateInductionPlanShedule.functionName;
          this.accomodationDetails.position = this.candidateInductionPlan.candidateInductionPlanShedule.positionName;
          this.accomodationDetails.joiningDate = this.candidateInductionPlan.candidateInductionPlanShedule.dateofJoining;
        }
        if (this.candidateAllAccommodationDetails.length > 0) {
          this.candidateAllAccommodationDetails.forEach(element => {
            var existed = this.accomodationDetails.accommodationList.find(e => e.fromDate == element.fromDate && e.toDate == element.toDate);
            if (existed == null) {
              var obj = {
                fromDate: element.fromDate,
                toDate: element.toDate,
                location: element.locationName,
                accommodation: (element.accomodation == "" || element.accomodation == null) ? "NA" : element.accomodation
              }
              this.accomodationDetails.accommodationList.push(JSON.parse(JSON.stringify(obj)));
            }
          })
        }
        this.accommodationData = this.accomodationDetails;

        // Prepare Induction Data

        if (this.candidateInductionPlan.candidateInductionPlanShedule != null) {
          this.inductionDetails.candidateName = this.candidateInductionPlan.candidateInductionPlanShedule.candidateFullName;
          this.inductionDetails.location = this.candidateInductionPlan.candidateInductionPlanShedule.locationName;
          this.inductionDetails.department = this.candidateInductionPlan.candidateInductionPlanShedule.departmentName;
          this.inductionDetails.grade = this.candidateInductionPlan.candidateInductionPlanShedule.gradeName;
          //this.inductionDetails.batchNo = this.candidateInductionPlan.candidateInductionPlanShedule.batchId == null ? "" : this.candidateInductionPlan.candidateInductionPlanShedule.batchId.toString();
          this.inductionDetails.batchNo = this.candidateInductionPlan.candidateInductionPlanShedule.batchId == null ? "" : this.candidateInductionPlan.candidateInductionPlanShedule.batchNo;   // By Anif on 21-08-2023
          this.inductionDetails.function = this.candidateInductionPlan.candidateInductionPlanShedule.functionName;
          this.inductionDetails.position = this.candidateInductionPlan.candidateInductionPlanShedule.positionName;
          this.inductionDetails.joiningDate = this.candidateInductionPlan.candidateInductionPlanShedule.dateofJoining;
        }
        if (this.candidateInductionPlan.candidateInductionPlanShedules.length > 0) {
          this.candidateInductionPlan.candidateInductionPlanShedules.forEach(element => {
            var existed = this.inductionDetails.inductionList.find(e => e.trainingTittle == element.traingTitle);
            if (existed == null) {
              let obj = {
                trainingTittle: element.traingTitle,
                trainingTittleId: element.trainingTittleId,
                trainingDetails: []
              }
              this.inductionDetails.inductionList.push(JSON.parse(JSON.stringify(obj)));
            }
          })
          this.inductionDetails.inductionList.forEach(element => {
            this.candidateInductionPlan.candidateInductionPlanShedules.forEach(plan_element => {
              if (element.trainingTittle == plan_element.traingTitle) {
                var accommodationObj = this.candidateInductionPlan.candidateInductionPlanAccomodations.find(e => e.locationId == plan_element.locationId);
                var accommodation = null;
                if (accommodationObj != undefined) {
                  accommodation = accommodationObj.accomodation
                }

                let trainingDetailsObj = {
                  //inductionDate: plan_element.dateFrom, // Previous
                  inductionDate: plan_element.dateFrom + " - " + plan_element.dateTo,  // changed on 17-04-2024 by anif
                  fromTime: plan_element.timeFrom,
                  toTime: plan_element.timeTo,
                  detailsOfSession: plan_element.detailsofSession,
                  location: plan_element.locationName,
                  venue: plan_element.inductionVenueName,
                  persontoMeet: plan_element.trainerName,
                  accommodationRequire: accommodation == null ? "NO" : "YES",
                  remarks: ""
                }
                element.trainingDetails.push(JSON.parse(JSON.stringify(trainingDetailsObj)));
              }
            })
          })
        }
        this.inductionData = this.inductionDetails;

        // Added in main object of save
        let attachmentObj = {
          candidateId: candidateDetails.candidateId,
          candidateEmailId: candidateDetails.emailId,
          candidateName: this.inductionDetails.candidateName,
          batchNo: this.inductionDetails.batchNo,
          department: this.inductionDetails.department,
          function: this.inductionDetails.function,
          grade: this.inductionDetails.grade,
          joiningDate: this.inductionDetails.joiningDate,
          location: this.inductionDetails.location,
          position: this.inductionDetails.position,
          candidateInductionDetailsForAttachment: this.inductionDetails.inductionList,
          candidateAccommodationDetailsForAttachment: this.accomodationDetails.accommodationList,
          emailBody: "",
        }
        var checkisexisted = this.saveShareWithCandidate.shareWithCandidatesInductionAccommodationAttachment.find(e => e.candidateId == attachmentObj.candidateId)
        if (checkisexisted == null) {
          this.saveShareWithCandidate.shareWithCandidatesInductionAccommodationAttachment.push(JSON.parse(JSON.stringify(attachmentObj)));
        }
      }
      this.SpinnerService.hide();
      this.batchCandidateIds = this.batchCandidateIds.filter(e => e.candidateId != candidateDetails.candidateId);
      if (this.batchCandidateIds.length > 0) {
        this.inductionDetails.inductionList = [];
        this.accomodationDetails.accommodationList = [];
        this.prepareDataForBatchCandidate(this.batchCandidateIds[0]);
      }
    });
  }
  prepareDataForMultiSelectCandidate(CandidateDetails: any) {
    // Added By Anif on 08-11-2022 Accommodation and induction details
    let serachInductionAndAccomodationDetails = {
      candidateId: CandidateDetails.candidateId
    }
    this.SpinnerService.show();
    this.candidateService.getCandidateInductionPlan(serachInductionAndAccomodationDetails).subscribe((result) => {
      if (result) {
        this.candidateInductionPlan = result;
        this.candidateDetails = this.candidateInductionPlan.candidateInductionPlanShedule;
        this.candidateInductionPlanDetails = this.candidateInductionPlan.candidateInductionPlanShedules;
        this.candidateAllAccommodationDetails = this.candidateInductionPlan.candidateInductionPlanAccomodations;
        this.candidateAllAccommodationDetails.forEach(element => {
          var existed = this.candidateAccommodationDetails.find(e => e.fromDate == element.fromDate && e.toDate == element.toDate);
          if (existed == null) {
            this.candidateAccommodationDetails.push(JSON.parse(JSON.stringify(element)));
          }
        })
        // Prepare Accommodation Data
        if (this.candidateInductionPlan.candidateInductionPlanShedule != null) {
          this.accomodationDetails.candidateName = this.candidateInductionPlan.candidateInductionPlanShedule.candidateFullName;
          this.accomodationDetails.location = this.candidateInductionPlan.candidateInductionPlanShedule.locationName;
          this.accomodationDetails.department = this.candidateInductionPlan.candidateInductionPlanShedule.departmentName;
          this.accomodationDetails.grade = this.candidateInductionPlan.candidateInductionPlanShedule.gradeName;
          //this.accomodationDetails.batchNo = this.candidateInductionPlan.candidateInductionPlanShedule.batchId == null ? "" : this.candidateInductionPlan.candidateInductionPlanShedule.batchId.toString();
          this.accomodationDetails.batchNo = this.candidateInductionPlan.candidateInductionPlanShedule.batchId == null ? "" : this.candidateInductionPlan.candidateInductionPlanShedule.batchNo;   // By Anif on 21-08-2023
          this.accomodationDetails.function = this.candidateInductionPlan.candidateInductionPlanShedule.functionName;
          this.accomodationDetails.position = this.candidateInductionPlan.candidateInductionPlanShedule.positionName;
          this.accomodationDetails.joiningDate = this.candidateInductionPlan.candidateInductionPlanShedule.dateofJoining;
        }
        if (this.candidateAllAccommodationDetails.length > 0) {
          this.candidateAllAccommodationDetails.forEach(element => {
            var existed = this.accomodationDetails.accommodationList.find(e => e.fromDate == element.fromDate && e.toDate == element.toDate);
            if (existed == null) {
              var obj = {
                fromDate: element.fromDate,
                toDate: element.toDate,
                location: element.locationName,
                accommodation: (element.accomodation == "" || element.accomodation == null) ? "NA" : element.accomodation
              }
              this.accomodationDetails.accommodationList.push(JSON.parse(JSON.stringify(obj)));
            }
          })
        }
        this.accommodationData = this.accomodationDetails;  // this.accommodationData not in use
        // Prepare Induction Data

        if (this.candidateInductionPlan.candidateInductionPlanShedule != null) {
          this.inductionDetails.candidateName = this.candidateInductionPlan.candidateInductionPlanShedule.candidateFullName;
          this.inductionDetails.location = this.candidateInductionPlan.candidateInductionPlanShedule.locationName;
          this.inductionDetails.department = this.candidateInductionPlan.candidateInductionPlanShedule.departmentName;
          this.inductionDetails.grade = this.candidateInductionPlan.candidateInductionPlanShedule.gradeName;
          //this.inductionDetails.batchNo = this.candidateInductionPlan.candidateInductionPlanShedule.batchId == null ? "" : this.candidateInductionPlan.candidateInductionPlanShedule.batchId.toString();
          this.inductionDetails.batchNo = this.candidateInductionPlan.candidateInductionPlanShedule.batchId == null ? "" : this.candidateInductionPlan.candidateInductionPlanShedule.batchNo;   // By Anif on 21-08-2023
          this.inductionDetails.function = this.candidateInductionPlan.candidateInductionPlanShedule.functionName;
          this.inductionDetails.position = this.candidateInductionPlan.candidateInductionPlanShedule.positionName;
          this.inductionDetails.joiningDate = this.candidateInductionPlan.candidateInductionPlanShedule.dateofJoining;
        }
        if (this.candidateInductionPlan.candidateInductionPlanShedules.length > 0) {
          this.candidateInductionPlan.candidateInductionPlanShedules.forEach(element => {
            var existed = this.inductionDetails.inductionList.find(e => e.trainingTittle == element.traingTitle);
            if (existed == null) {
              let obj = {
                trainingTittle: element.traingTitle,
                trainingTittleId: element.trainingTittleId,
                trainingDetails: []
              }
              this.inductionDetails.inductionList.push(JSON.parse(JSON.stringify(obj)));
            }
          })
          this.inductionDetails.inductionList.forEach(element => {
            this.candidateInductionPlan.candidateInductionPlanShedules.forEach(plan_element => {
              if (element.trainingTittle == plan_element.traingTitle) {
                var accommodationObj = this.candidateInductionPlan.candidateInductionPlanAccomodations.find(e => e.locationId == plan_element.locationId);
                var accommodation = null;
                if (accommodationObj != undefined) {
                  accommodation = accommodationObj.accomodation
                }
                let trainingDetailsObj = {
                  //inductionDate: plan_element.dateFrom,  // Previous
                  inductionDate: plan_element.dateFrom + " - " + plan_element.dateTo,  // changed on 17-04-2024 by anif
                  fromTime: plan_element.timeFrom,
                  toTime: plan_element.timeTo,
                  detailsOfSession: plan_element.detailsofSession,
                  location: plan_element.locationName,
                  venue: plan_element.inductionVenueName,
                  persontoMeet: plan_element.trainerName,
                  accommodationRequire: accommodation == null ? "NO" : "YES",
                  remarks: ""
                }
                element.trainingDetails.push(JSON.parse(JSON.stringify(trainingDetailsObj)));
              }
            })
          })
        }
        this.inductionData = this.inductionDetails;  // this.inductionData not in use

        // Added in main object of save
        let attachmentObj = {
          candidateId: CandidateDetails.candidateId,
          candidateEmailId: CandidateDetails.emailId,
          candidateName: this.inductionDetails.candidateName,
          batchNo: this.inductionDetails.batchNo,
          department: this.inductionDetails.department,
          function: this.inductionDetails.function,
          grade: this.inductionDetails.grade,
          joiningDate: this.inductionDetails.joiningDate,
          location: this.inductionDetails.location,
          position: this.inductionDetails.position,
          candidateInductionDetailsForAttachment: this.inductionDetails.inductionList,
          candidateAccommodationDetailsForAttachment: this.accomodationDetails.accommodationList,
          emailBody: "",
        }
        var checkifexisted = this.saveShareWithCandidate.shareWithCandidatesInductionAccommodationAttachment.find(e => e.candidateId == attachmentObj.candidateId)
        if (checkifexisted == null) {
          this.saveShareWithCandidate.shareWithCandidatesInductionAccommodationAttachment.push(JSON.parse(JSON.stringify(attachmentObj)));
        }
      }
      this.SpinnerService.hide();
      this.multiSelectCandidateIds = this.multiSelectCandidateIds.filter(e => e.candidateId != CandidateDetails.candidateId);
      if (this.multiSelectCandidateIds.length > 0) {
        this.inductionDetails.inductionList = [];
        this.accomodationDetails.accommodationList = [];
        this.prepareDataForMultiSelectCandidate(this.multiSelectCandidateIds[0]);
      }
    })
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
      this.saveShareWithCandidate.shareWithCandidatesForSchedular = []; // Added by anif on 21-08-2023
      this.saveShareWithCandidate.shareWithCandidatesAccommodationForSchedular = []; // Added by anif on 21-08-2023
      this.saveShareWithCandidate.shareWithCandidatesInductionForSchedular = []; // Added by anif on 21-08-2023
      if (this.sharingType == "A") {
        this.saveShareWithCandidate.shareWithCandidates.forEach(can_element => {
          this.allAccommodationDetails = "";
          this.trainingCoordinatorDetails = "We advise you to get in touch with ";
          var venuDetail = this.allCandidateVenueDetails.find(e => e.candidateId == can_element.candidateId);
          var accommodationDetails = this.identicalAccommodationDetails.filter(e => e.candidateId == can_element.candidateId && e.accomodation != null);
          var coordinatorDetails = this.identicalTrainingCoordinator.filter(e => e.candidateId == can_element.candidateId);
          var templatedescription = this.emailTemplates.filter(x => x.templateId == this.selectedTestEmailTemplateId)[0].templateDescription;
          templatedescription = templatedescription.replace("@@candidate", can_element.candidateName); // 14-07-2023
          templatedescription = templatedescription.replace("@@joiningdate", venuDetail.joiningDate);

          // accommodationDetails.forEach(acc_element => {
          //   this.allAccommodationDetails += acc_element.accomodation + " at " + acc_element.locationName + ","
          // })

          if (accommodationDetails.length > 0) {
            //this.allAccommodationDetails = accommodationDetails[0].accomodation + " at " + accommodationDetails[0].locationName;
            this.allAccommodationDetails = accommodationDetails[0].accomodation;
          }

          templatedescription = templatedescription.replace("@@AccomodationLocation", this.allAccommodationDetails);
          //templatedescription = templatedescription.replace("@@ReportingLocation", venuDetail.reprtingVenueAddress + " at " + venuDetail.venueLocation);
          templatedescription = templatedescription.replace("@@ReportingLocation", venuDetail.reprtingVenueAddress);
          coordinatorDetails.forEach(training_element => {
            this.trainingCoordinatorDetails += training_element.trainingCoOrdinatorName + " - <a href='javascript:void(0)'>" + training_element.trainingCoOrdinatorEmail + "</a> in " + training_element.inductionVenueName + ","
          })
          templatedescription = templatedescription.replace("@@Coordinator", venuDetail.onBoardingCoordinatrDetaills);//this.trainingCoordinatorDetails
          can_element.templateBody = templatedescription;
          can_element.candidateJoiningDocumentId = this.joiningDocumentsIds;
        })
        this.saveShareWithCandidate.candidateId = this.multipleCandidateId;
        // Update template body in attachment array     // added by anif on 08-11-2022
        this.saveShareWithCandidate.shareWithCandidatesInductionAccommodationAttachment.forEach(element => {
          this.saveShareWithCandidate.shareWithCandidates.forEach(ele => {
            if (element.candidateId == ele.candidateId) {
              element.emailBody = ele.templateBody;
            }
          })
        })

        this.saveShareWithCandidate.candidateAdditionalDocumentId = this.candidateAndAdditionalDocIds;  // Added by anif on 25-01-2023
      } else if (this.sharingType == "B") {
        this.saveShareWithCandidate.shareWithCandidates.forEach(can_element => {

          this.allAccommodationDetails = "";
          this.trainingCoordinatorDetails = "We advise you to get in touch with ";
          var venuDetail = this.allCandidateVenueDetails.find(e => e.candidateId == can_element.candidateId);
          var accommodationDetails = this.identicalAccommodationDetails.filter(e => e.candidateId == can_element.candidateId && e.accomodation != null);

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

          // accommodationDetails.forEach(acc_element => {
          //   this.allAccommodationDetails += acc_element.accomodation + " at " + acc_element.locationName + ","
          // })
          if (accommodationDetails.length > 0) {
            //this.allAccommodationDetails = accommodationDetails[0].accomodation + " at " + accommodationDetails[0].locationName;
            this.allAccommodationDetails = accommodationDetails[0].accomodation;
          }
          templatedescription = templatedescription.replace("@@AccomodationLocation", this.allAccommodationDetails);
          // templatedescription = templatedescription.replace("@@ReportingLocation", venuDetail.reprtingVenueAddress + " at " + venuDetail.venueLocation);
          templatedescription = templatedescription.replace("@@ReportingLocation", venuDetail.reprtingVenueAddress);
          coordinatorDetails.forEach(training_element => {
            this.trainingCoordinatorDetails += training_element.trainingCoOrdinatorName + " - <a href='javascript:void(0)'>" + training_element.trainingCoOrdinatorEmail + "</a> in " + training_element.inductionVenueName + ","
          })
          templatedescription = templatedescription.replace("@@Coordinator", this.trainingCoordinatorDetails);
          can_element.templateBody = templatedescription;
          can_element.candidateJoiningDocumentId = this.joiningDocumentsIds;
        })
        this.saveShareWithCandidate.candidateId = this.multipleCandidateId;

        // Update template body in attachment array     // added by anif on 08-11-2022
        this.saveShareWithCandidate.shareWithCandidatesInductionAccommodationAttachment.forEach(element => {
          this.saveShareWithCandidate.shareWithCandidates.forEach(ele => {
            if (element.candidateId == ele.candidateId) {
              element.emailBody = ele.templateBody;
            }
          })
        })
        this.saveShareWithCandidate.candidateAdditionalDocumentId = this.candidateAndAdditionalDocIds;  // Added by anif on 25-01-2023
      } else {
        this.saveShareWithCandidate.shareWithCandidates.forEach(can_element => {
          this.allAccommodationDetails = "";
          this.trainingCoordinatorDetails = "We advise you to get in touch with ";
          var venuDetail = this.allCandidateVenueDetails.find(e => e.candidateId == can_element.candidateId);
          var accommodationDetails = this.identicalAccommodationDetails.filter(e => e.candidateId == can_element.candidateId && e.accomodation != null);
          var coordinatorDetails = this.identicalTrainingCoordinator.filter(e => e.candidateId == can_element.candidateId);
          var templatedescription = this.emailTemplates.filter(x => x.templateId == this.selectedTestEmailTemplateId)[0].templateDescription;
          templatedescription = templatedescription.replace("@@candidate", can_element.candidateName); // 14-07-2023
          templatedescription = templatedescription.replace("@@joiningdate", venuDetail.joiningDate);

          // accommodationDetails.forEach(acc_element => {
          //   this.allAccommodationDetails += acc_element.accomodation + " at " + acc_element.locationName + ","
          // })

          if (accommodationDetails.length > 0) {
            //this.allAccommodationDetails = accommodationDetails[0].accomodation + " at " + accommodationDetails[0].locationName;
            this.allAccommodationDetails = accommodationDetails[0].accomodation;
          }
          templatedescription = templatedescription.replace("@@AccomodationLocation", this.allAccommodationDetails);
          // templatedescription = templatedescription.replace("@@ReportingLocation", venuDetail.reprtingVenueAddress + " at " + venuDetail.venueLocation);
          templatedescription = templatedescription.replace("@@ReportingLocation", venuDetail.reprtingVenueAddress);
          coordinatorDetails.forEach(training_element => {
            this.trainingCoordinatorDetails += training_element.trainingCoOrdinatorName + " - <a href='javascript:void(0)'>" + training_element.trainingCoOrdinatorEmail + "</a> in " + training_element.inductionVenueName + ","
          })
          templatedescription = templatedescription.replace("@@Coordinator", venuDetail.onBoardingCoordinatrDetaills);
          can_element.templateBody = templatedescription;
          can_element.candidateJoiningDocumentId = this.joiningDocumentsIds;
        })
        this.saveShareWithCandidate.candidateId = this.sharingCandidateId.toString();
        // Update template body in attachment array     // added by anif on 08-11-2022
        this.saveShareWithCandidate.shareWithCandidatesInductionAccommodationAttachment.forEach(element => {
          this.saveShareWithCandidate.shareWithCandidates.forEach(ele => {
            if (element.candidateId == ele.candidateId) {
              element.emailBody = ele.templateBody;
            }
          })
        })
        this.saveShareWithCandidate.candidateAdditionalDocumentId = this.candidateAndAdditionalDocIds;  // Added by anif on 25-01-2023
      }

      // Added by Anif on 21-08-2023 from here
      this.saveShareWithCandidate.shareWithCandidatesInductionAccommodationAttachment.forEach(element => {
        let onlycandidateandemaildataforschedular = {
          candidateId: element.candidateId,
          requisitionDetailId: null,
          candidateEmailId: element.candidateEmailId,
          candidateName: element.candidateName,
          batchNo: element.batchNo,
          department: element.department,
          function: element.function,
          grade: element.grade,
          joiningDate: element.joiningDate,
          location: element.location,
          position: element.position,
          emailBody: element.emailBody,
        }
        // Insert only candidate details with emailbody 
        this.saveShareWithCandidate.shareWithCandidatesForSchedular.push(onlycandidateandemaildataforschedular);
        // insert induction details with candidateid
        element.candidateInductionDetailsForAttachment.forEach(ind_ele => {
          ind_ele.trainingDetails.forEach(ind_training_ele => {
            let inductiondetailsforschedular = {
              candidateId: element.candidateId,
              requisitionDetailId: null,
              trainingTittle: ind_ele.trainingTittle,
              accommodationRequire: ind_training_ele.accommodationRequire,
              detailsOfSession: ind_training_ele.detailsOfSession,
              fromTime: ind_training_ele.fromTime,
              inductionDate: ind_training_ele.inductionDate,
              location: ind_training_ele.location,
              persontoMeet: ind_training_ele.persontoMeet,
              remarks: ind_training_ele.remarks,
              toTime: ind_training_ele.toTime,
              venue: ind_training_ele.venue
            }
            this.saveShareWithCandidate.shareWithCandidatesInductionForSchedular.push(inductiondetailsforschedular);
          })
        });

        // Insert accommodation with candidateid
        element.candidateAccommodationDetailsForAttachment.forEach(acc_ele => {
          let accmodationdetailsforschedular = {
            candidateId: element.candidateId,
            requisitionDetailId: null,
            accommodation: acc_ele.accommodation,
            fromDate: acc_ele.fromDate,
            location: acc_ele.location,
            toDate: acc_ele.toDate
          }
          this.saveShareWithCandidate.shareWithCandidatesAccommodationForSchedular.push(accmodationdetailsforschedular);
        })

      })

      this.saveShareWithCandidate.shareWithCandidatesForSchedular.forEach(element => {
        this.saveShareWithCandidate.shareWithCandidates.forEach(ele => {
          if (element.candidateId == ele.candidateId) {
            element.requisitionDetailId = ele.candidateRequisitionDetailsId;
          }
        })
      })
      this.saveShareWithCandidate.shareWithCandidatesInductionForSchedular.forEach(element => {
        this.saveShareWithCandidate.shareWithCandidates.forEach(ele => {
          if (element.candidateId == ele.candidateId) {
            element.requisitionDetailId = ele.candidateRequisitionDetailsId;
          }
        })
      })
      this.saveShareWithCandidate.shareWithCandidatesAccommodationForSchedular.forEach(element => {
        this.saveShareWithCandidate.shareWithCandidates.forEach(ele => {
          if (element.candidateId == ele.candidateId) {
            element.requisitionDetailId = ele.candidateRequisitionDetailsId;
          }
        })
      })
      // Added by Anif on 21-08-2023 end here

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
            this.candidateAndAdditionalDocIds = []; // Added by anif on 25-01-2023
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
        this.candidateAndAdditionalDocIds = []; // Added by anif on 25-01-2023
        this.saveShareWithCandidate.shareWithCandidatesInductionForSchedular = []; // Added By anif on 27-11-2023
        this.saveShareWithCandidate.shareWithCandidatesAccommodationForSchedular = [] // Added By anif on 27-11-2023
        this.inductionDetails.inductionList = [];  // Added By anif on 27-11-2023
        this.SpinnerService.hide();
      });

    } else {
      this.notificationService.showError(msg, "Error");
    }

  }

  // Anif on 21-11-2022
  onClickPreviewShare() {

    this.candidatePreviewArray = [];
    this.documentNamesForPrev = "";
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
          var accommodationDetails = [];
          this.trainingCoordinatorDetails = "We advise you to get in touch with ";
          var venuDetail = this.allCandidateVenueDetails.find(e => e.candidateId == can_element.candidateId);
          accommodationDetails = this.identicalAccommodationDetails.filter(e => e.candidateId == can_element.candidateId && e.accomodation != null);
          var coordinatorDetails = this.identicalTrainingCoordinator.filter(e => e.candidateId == can_element.candidateId);
          var templatedescription = this.emailTemplates.filter(x => x.templateId == this.selectedTestEmailTemplateId)[0].templateDescription;
          templatedescription = templatedescription.replace("@@joiningdate", venuDetail.joiningDate);

          // accommodationDetails.forEach(acc_element => {
          //   this.allAccommodationDetails += acc_element.accomodation + " at " + acc_element.locationName + ","
          // })
          if (accommodationDetails.length > 0) {
            //this.allAccommodationDetails = accommodationDetails[0].accomodation + " at " + accommodationDetails[0].locationName;
            this.allAccommodationDetails = accommodationDetails[0].accomodation;
          }
          templatedescription = templatedescription.replace("@@AccomodationLocation", this.allAccommodationDetails);
          //templatedescription = templatedescription.replace("@@ReportingLocation", venuDetail.reprtingVenueAddress + " at " + venuDetail.venueLocation);
          templatedescription = templatedescription.replace("@@ReportingLocation", venuDetail.reprtingVenueAddress);
          coordinatorDetails.forEach(training_element => {
            this.trainingCoordinatorDetails += training_element.trainingCoOrdinatorName + " - <a href='javascript:void(0)'>" + training_element.trainingCoOrdinatorEmail + "</a> in " + training_element.inductionVenueName + ","
          })
          templatedescription = templatedescription.replace("@@Coordinator", venuDetail.onBoardingCoordinatrDetaills);
          can_element.templateBody = templatedescription;
          can_element.candidateJoiningDocumentId = this.joiningDocumentsIds;
        })
        this.saveShareWithCandidate.candidateId = this.multipleCandidateId;
        // Update template body in attachment array     // added by anif on 08-11-2022
        this.saveShareWithCandidate.shareWithCandidatesInductionAccommodationAttachment.forEach(element => {
          this.saveShareWithCandidate.shareWithCandidates.forEach(ele => {
            if (element.candidateId == ele.candidateId) {
              element.emailBody = ele.templateBody;
            }
          })
        })

        // Prepare preview array
        if (this.saveShareWithCandidate != undefined && this.saveShareWithCandidate.shareWithCandidates.length > 0) {
          this.saveShareWithCandidate.shareWithCandidates.forEach((element_prev => {
            let previewObj = {
              candidateNo: "",
              candidateName: "",
              additionalDocuments: "",
              templateName: "",
              templateBody: ""
            }
            var candidateObj = this.scheduledIndividually.find(e => e.candidateId == element_prev.candidateId);
            // Candidate name and no update
            if (candidateObj != undefined) {
              previewObj.candidateNo = candidateObj.candidateNo
              previewObj.candidateName = candidateObj.candidateFullName
            }
            // Additional doc name update 
            // var docIds = element_prev.candidateJoiningDocumentId.split(",");
            var docIds = [];
            if (this.candidateAndAdditionalDocIds.length > 0) {                       // Added on 25-01-2023
              docIds = this.candidateAndAdditionalDocIds.filter(e => e.candidateId == element_prev.candidateId);
            }
            if (docIds.length > 0) {
              docIds.forEach((docIds_ele) => {
                // var docObj = this.documentNames.find(e => e.attachmentDocumentNameId == Number(docIds_ele));
                var docObj = this.documentNames.find(e => e.attachmentDocumentNameId == docIds_ele.documentId);      // Added on 25-01-2023
                if (docObj != undefined) {
                  this.documentNamesForPrev += (this.documentNamesForPrev == "" ? docObj.attachmentDocumentName : ("," + docObj.attachmentDocumentName));
                }
              })
              previewObj.additionalDocuments = this.documentNamesForPrev;
            }
            this.documentNamesForPrev = "";
            // Template name update 
            var templateNameObj = this.emailTemplates.find(e => e.templateId == element_prev.templateId);
            if (templateNameObj != undefined) {
              previewObj.templateName = templateNameObj.templateEmailName;
            }
            // Template Body Update
            previewObj.templateBody = element_prev.templateBody;
            this.candidatePreviewArray.push(previewObj);

          }))
        }

      } else if (this.sharingType == "B") {
        this.saveShareWithCandidate.shareWithCandidates.forEach(can_element => {

          this.allAccommodationDetails = "";
          var accommodationDetails = [];
          this.trainingCoordinatorDetails = "We advise you to get in touch with ";
          var venuDetail = this.allCandidateVenueDetails.find(e => e.candidateId == can_element.candidateId);
          accommodationDetails = this.identicalAccommodationDetails.filter(e => e.candidateId == can_element.candidateId && e.accomodation != null);

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
          templatedescription = templatedescription.replace("@@joiningdate", venuDetail.joiningDate);

          // accommodationDetails.forEach(acc_element => {
          //   this.allAccommodationDetails += acc_element.accomodation + " at " + acc_element.locationName + ","
          // })
          if (accommodationDetails.length > 0) {
            //this.allAccommodationDetails = accommodationDetails[0].accomodation + " at " + accommodationDetails[0].locationName;
            this.allAccommodationDetails = accommodationDetails[0].accomodation;
          }

          templatedescription = templatedescription.replace("@@AccomodationLocation", this.allAccommodationDetails);
          // templatedescription = templatedescription.replace("@@ReportingLocation", venuDetail.reprtingVenueAddress + " at " + venuDetail.venueLocation);
          templatedescription = templatedescription.replace("@@ReportingLocation", venuDetail.reprtingVenueAddress);
          coordinatorDetails.forEach(training_element => {
            this.trainingCoordinatorDetails += training_element.trainingCoOrdinatorName + " - <a href='javascript:void(0)'>" + training_element.trainingCoOrdinatorEmail + "</a> in " + training_element.inductionVenueName + ","
          })
          templatedescription = templatedescription.replace("@@Coordinator", this.trainingCoordinatorDetails);
          can_element.templateBody = templatedescription;
          can_element.candidateJoiningDocumentId = this.joiningDocumentsIds;
        })
        this.saveShareWithCandidate.candidateId = this.multipleCandidateId;

        // Update template body in attachment array     // added by anif on 08-11-2022
        this.saveShareWithCandidate.shareWithCandidatesInductionAccommodationAttachment.forEach(element => {
          this.saveShareWithCandidate.shareWithCandidates.forEach(ele => {
            if (element.candidateId == ele.candidateId) {
              element.emailBody = ele.templateBody;
            }
          })
        })


        // Prepare preview array
        if (this.saveShareWithCandidate != undefined && this.saveShareWithCandidate.shareWithCandidates.length > 0) {
          this.saveShareWithCandidate.shareWithCandidates.forEach((element_prev => {
            let previewObj = {
              candidateNo: "",
              candidateName: "",
              additionalDocuments: "",
              templateName: "",
              templateBody: ""
            }
            var candidateObj = this.batchWiseCandidateList.find(e => e.candidateId == element_prev.candidateId);
            // Candidate name and no update
            if (candidateObj != undefined) {
              previewObj.candidateNo = candidateObj.candidateNo
              previewObj.candidateName = candidateObj.candidateFullName
            }
            // Additional doc name update 
            //var docIds = element_prev.candidateJoiningDocumentId.split(",");
            var docIds = [];
            if (this.candidateAndAdditionalDocIds.length > 0) {           // Added on 25-01-2023
              docIds = this.candidateAndAdditionalDocIds.filter(e => e.candidateId == element_prev.candidateId);
            }
            if (docIds.length > 0) {
              docIds.forEach((docIds_ele) => {
                // var docObj = this.documentNames.find(e => e.attachmentDocumentNameId == Number(docIds_ele));
                var docObj = this.documentNames.find(e => e.attachmentDocumentNameId == docIds_ele.documentId);    // Added on 25-01-2023
                if (docObj != undefined) {
                  this.documentNamesForPrev += (this.documentNamesForPrev == "" ? docObj.attachmentDocumentName : ("," + docObj.attachmentDocumentName));
                }
              })
              previewObj.additionalDocuments = this.documentNamesForPrev;
            }
            this.documentNamesForPrev = "";
            // Template name update 
            var templateNameObj = this.emailTemplates.find(e => e.templateId == element_prev.templateId);
            if (templateNameObj != undefined) {
              previewObj.templateName = templateNameObj.templateEmailName;
            }
            // Template Body Update
            previewObj.templateBody = element_prev.templateBody;
            this.candidatePreviewArray.push(previewObj);
          }))
        }
      } else {
        this.saveShareWithCandidate.shareWithCandidates.forEach(can_element => {
          this.allAccommodationDetails = "";
          var accommodationDetails = [];
          this.trainingCoordinatorDetails = "We advise you to get in touch with ";
          var venuDetail = this.allCandidateVenueDetails.find(e => e.candidateId == can_element.candidateId);
          accommodationDetails = this.identicalAccommodationDetails.filter(e => e.candidateId == can_element.candidateId && e.accomodation != null);
          var coordinatorDetails = this.identicalTrainingCoordinator.filter(e => e.candidateId == can_element.candidateId);
          var templatedescription = this.emailTemplates.filter(x => x.templateId == this.selectedTestEmailTemplateId)[0].templateDescription;
          templatedescription = templatedescription.replace("@@joiningdate", venuDetail.joiningDate);

          // accommodationDetails.forEach(acc_element => {
          //   this.allAccommodationDetails += acc_element.accomodation + " at " + acc_element.locationName + ","
          // })
          if (accommodationDetails.length > 0) {
            // this.allAccommodationDetails = accommodationDetails[0].accomodation + " at " + accommodationDetails[0].locationName;
            this.allAccommodationDetails = accommodationDetails[0].accomodation;
          }
          templatedescription = templatedescription.replace("@@AccomodationLocation", this.allAccommodationDetails);
          //templatedescription = templatedescription.replace("@@ReportingLocation", venuDetail.reprtingVenueAddress + " at " + venuDetail.venueLocation);
          templatedescription = templatedescription.replace("@@ReportingLocation", venuDetail.reprtingVenueAddress);
          coordinatorDetails.forEach(training_element => {
            this.trainingCoordinatorDetails += training_element.trainingCoOrdinatorName + " - <a href='javascript:void(0)'>" + training_element.trainingCoOrdinatorEmail + "</a> in " + training_element.inductionVenueName + ","
          })
          templatedescription = templatedescription.replace("@@Coordinator", venuDetail.onBoardingCoordinatrDetaills);
          can_element.templateBody = templatedescription;
          can_element.candidateJoiningDocumentId = this.joiningDocumentsIds;
        })
        this.saveShareWithCandidate.candidateId = this.sharingCandidateId.toString();
        // Update template body in attachment array     // added by anif on 08-11-2022
        this.saveShareWithCandidate.shareWithCandidatesInductionAccommodationAttachment.forEach(element => {
          this.saveShareWithCandidate.shareWithCandidates.forEach(ele => {
            if (element.candidateId == ele.candidateId) {
              element.emailBody = ele.templateBody;
            }
          })
        })
        // Prepare preview array
        if (this.saveShareWithCandidate != undefined && this.saveShareWithCandidate.shareWithCandidates.length > 0) {
          this.saveShareWithCandidate.shareWithCandidates.forEach((element_prev => {
            let previewObj = {
              candidateNo: "",
              candidateName: "",
              additionalDocuments: "",
              templateName: "",
              templateBody: ""
            }
            var candidateObj = this.scheduledIndividually.find(e => e.candidateId == element_prev.candidateId);
            // Candidate name and no update
            if (candidateObj != undefined) {
              previewObj.candidateNo = candidateObj.candidateNo
              previewObj.candidateName = candidateObj.candidateFullName
            }
            // Additional doc name update 
            //var docIds = element_prev.candidateJoiningDocumentId.split(",");
            var docIds = [];
            if (this.candidateAndAdditionalDocIds.length > 0) {           // Added on 25-01-2023
              docIds = this.candidateAndAdditionalDocIds.filter(e => e.candidateId == element_prev.candidateId);
            }
            if (docIds.length > 0) {
              docIds.forEach((docIds_ele) => {
                // var docObj = this.documentNames.find(e => e.attachmentDocumentNameId == Number(docIds_ele));
                var docObj = this.documentNames.find(e => e.attachmentDocumentNameId == docIds_ele.documentId);    // Added on 25-01-2023
                if (docObj != undefined) {
                  this.documentNamesForPrev += (this.documentNamesForPrev == "" ? docObj.attachmentDocumentName : ("," + docObj.attachmentDocumentName));
                }
              })
              previewObj.additionalDocuments = this.documentNamesForPrev;
            }
            this.documentNamesForPrev = "";
            // Template name update 
            var templateNameObj = this.emailTemplates.find(e => e.templateId == element_prev.templateId);
            if (templateNameObj != undefined) {
              previewObj.templateName = templateNameObj.templateEmailName;
            }
            // Template Body Update
            previewObj.templateBody = element_prev.templateBody;
            this.candidatePreviewArray.push(previewObj);
          }))
        }
      }
      jQuery("#shareWithCandidateModal").modal('hide');
      jQuery("#previewModal").modal('show');
    } else {
      this.notificationService.showError(msg, "Error");
    }
  }

  onClickPreviewModalClose() {
    jQuery("#previewModal").modal('hide');
    jQuery("#shareWithCandidateModal").modal('show');
  }
  onClickEmployeeNoForPrev(data: any) {
    data.templateBody = data.templateBody.replace("@@candidate", data.candidateName);
    this.emailDescriptionForPrev = data.templateBody;
    jQuery("#emailBodyDescriptionModal").modal('show');
    jQuery("#previewModal").modal('hide');
  }
  onClickEmailDescriptionClose() {
    jQuery("#emailBodyDescriptionModal").modal('hide');
    jQuery("#previewModal").modal('show');
  }

  // Added on 21-11-2022 till this

  // shareWithCandidate(finalSubmitObj: any) {
  //   this.SpinnerService.show();
  //   this.joinersservice.shareInductionDetailsWithcandidate(finalSubmitObj).subscribe((result) => {
  //     if (result) {
  //       if (result.successFlag == 0) {
  //         this.SpinnerService.hide();
  //         this.notificationService.showError(result.msg, "Error");
  //       }
  //       else {
  //         this.SpinnerService.hide();
  //         this.notificationService.showSuccess(result.msg, "Success");
  //         this.createScheduledIndividualSearchForm();
  //         this.createShareInductionForm();
  //         this.getAllScheduledListIndividually();
  //         this.loadDataTable4();
  //         jQuery("#shareWithCandidateModal").modal("hide");
  //       }
  //     }
  //     else {
  //       this.SpinnerService.hide();
  //     }
  //   }, error => {
  //     console.log(error);
  //     this.SpinnerService.hide();
  //   }, () => {
  //     this.SpinnerService.hide();
  //   });
  // }
  onShareWithCancelClick() {
    this.getAllDocumentName();
    this.getEmailTemplate();
    this.testEmailTemplateDescription = "";
    this.selectedTestEmailTemplateId = null;
    this.joiningDocumentsIds = "";
  }
  onClickViewDocument(data, parentTabName, childTabName) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "newjoinerslist");
    this.persistance.set('nextpagename', "ocviewdocument");
    this.persistance.set('type', "plant");
    this.persistance.set('candidateId', data.candidateId);
    // this.persistance.set('paramid', this.requisitionDetailId);
    this.persistance.set('paramid', data.requisitionDetailId);
    this.persistance.set('parentActiveTab', parentTabName);
    this.persistance.set('childActiveTab', childTabName);
    jQuery(".custom-menu").hide();
    this._route.navigate(['app/oc-view-document']);
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

  onClickJoiningCheckList(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTab', "Scheduled");
    this.persistance.set('childActiveTab', "Individual");
    this._route.navigate(['/app/ocjoiningchecklist'], { queryParams: { CandidateId: data.candidateId, CandidateNo: data.candidateNo, From: "OC", Type: "P", HiringStatus: data.hiringStatusName } });
  }

  getVerticalWiseBatch(evt) {
    this.getAllBatch(evt);
    this.confirmJoiningTypeForm.patchValue({
      batchId: undefined
    })
  }

  changeReportingVenue(evt) {
    this.saveReportingVenueForm.patchValue({
      reprtingVenueAddress: this.venues.filter(x => x.reportingVenueId == evt)[0].reportingVenueAddress
    })
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
          document.getElementById("closeModal").click();
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
  opneDiscontinueModal(statusId, candidateId) {
    this.actionName = "Discontinue";
    this.discontinueCandidateId = candidateId;
  }
  onDiscontinueCandidate() {
    var formdata = {
      candidateId: Number(this.discontinueCandidateId),
      requisitionDetailId: 0,
      // hiringStatusId: 55,
      hiringStatusId: 63,
      createdBy: this.loginUserId,
      remarks: this.discontinueRemarks
    }
    //this.requisitionService.updateRequisitionCandidateRejectDeclineCallBack(formdata).subscribe((result) => {
    this.requisitionService.discontinueIndividualCandidateCandidate(formdata).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          this.discontinueRemarks = "";
          jQuery('#discontinueModal').modal('hide');
          this.onClickScheduledTab();
        }
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  // Addedd as per point no 322

  getModeOfJoining() {
    this.modeOfJoiningList = [];
    this.plantservice.getAllModeOfJoining(this.searchModeOfJoining).subscribe((result) => {
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

  onClickUpdateJoningDate(data) {
    this.getCandidateJoningDate(data.candidateId);
  }
  getCandidateJoningDate(candidateId) {
    let joiningDateObj = {
      candidateId: candidateId.toString()
    }
    this.allJoiningDateInformation = [];
    this.plantservice.getJoiningDateDetails(joiningDateObj).subscribe((result) => {
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
    }, () => {
      // this.loadSelectPicker();
    });
  }
  onClickUpdateBatchJoningDate(data) {
    this.batchJoiningDate = data.dateofJoining;
    this.objUpdateJoinigDateForBatch.batchId = data.batchId;
    this.objUpdateJoinigDateForBatch.dateofJoining = data.dateofJoining;
    this.objUpdateJoinigDateForBatch.createdBy = this.loginUserId;

  }
  onClickUpdateJoiningDateCancel() {
    this.updatedJoiningDateArray = [];
    this.modeofJoiningId = null;
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
      this.plantservice.updateJoinigDate(finalSubmitObj).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.createPendingScheduleIndividualSearchForm();
            // this.getAllVerticals();
            this.getPendingScheduleListindividually();
            this.getAllScheduledListIndividually();
            this.loadDataTable4();
            this.loadDataTable2();
            this.modeofJoiningId = null;
            this.dtOfJoining.nativeElement.value = "";
            this.joiningDate = "";
            jQuery("#updateJoiningDateModal").modal("hide");
            jQuery(".custom-menu").hide();
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

  // Share With Inductors

  onClickShareWithInductors(data, shareBy) {
    this.getAllScheduleDetails(data, shareBy);
  }
  trainerWiseResult: any;
  trainerIds: any[] = [];
  getAllScheduleDetails(data: any, shareBy: string) {
    this.SpinnerService.show();
    this.searchInductionSchedule.candidateInductionScheduleId = Number(data.candidateInductionScheduleId);
    this.joinersservice.getScheduleInductionDetails(this.searchInductionSchedule).subscribe((result) => {
      if (result) {
        this.inductionSchedule = result;
        //console.log("Induction Details", this.inductionSchedule);
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
      joiningDate: data.dateofJoining,
      emailAttachment: ""
    }
    // Sending all schedule as an attachment
    var allScheduleCandidateCount = [];
    var allScheduleString = "";
    var allScheduleString1 = "<html lang='en'><div style='width: 74px; text-align: center; margin: 0 auto;'><img src='https://mrfhrportaldocumentstrg.blob.core.windows.net/signatureupload/logo.png' style='width: 100%; text-align: center;' alt=''></div><p style='margin: 3px 0;'><b>Batch No :</b>" + data.batchNo + "</p><p style='margin: 3px 0 10px 0;'><b> Total No Of Candidates in batch :</b>" + data.totalCandidates + "</p><br/><table border='1' style='width: 100%; border: 1px solid #000; border-collapse: collapse;'><thead><tr><th style='border: 1px solid #000; padding:4px;text-align:left;'>Training Tittle</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Date</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>From Time</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>To Time</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Location</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Venue</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Mode</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Coordinator</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Session Details</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Candidate Count</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Remarks</th></tr></thead><tbody>"
    this.inductionSchedule.candidateInductionSheduleDetails.forEach(all_ele => {
      allScheduleCandidateCount = all_ele.batchCandidateIds.split(",");
      allScheduleString += "<tr><td style='border: 1px solid #000; padding:4px;'>" + all_ele.traingTitle + "</td><td style='border: 1px solid #000; padding:4px;'>" + all_ele.dateFrom + "-" + all_ele.dateTo + "</td><td style='border: 1px solid #000; padding:4px;'>" + all_ele.timeFrom + "</td><td style='border: 1px solid #000; padding:4px;'>" + all_ele.timeTo + "</td><td style='border: 1px solid #000; padding:4px;'>" + all_ele.locationName + "</td><td style='border: 1px solid #000; padding:4px;'>" + all_ele.inductionVenueName + "</td><td style='border: 1px solid #000; padding:4px;'>" + all_ele.inductioneName + "</td><td style='border: 1px solid #000; padding:4px;'>" + all_ele.trainingCoOrdinatorName + "</td><td style='border: 1px solid #000; padding:4px;'>" + all_ele.detailsofSession + "</td><td style='border: 1px solid #000; padding:4px;'>" + allScheduleCandidateCount.length + "</td><td style='border: 1px solid #000; padding:4px;'>" + all_ele.remarks + "</td></tr>"
    })
    var allScheduleConcatString = allScheduleString1 + allScheduleString + "</tbody></table><br/><p style='margin: 30px 0 5px 0;'>Thank you</p><p style='margin: 3px 0 10px 0;'>Onboarding team</p></html>";
    saheWithInductorObj.emailAttachment = allScheduleConcatString;

    // Inductor Specific data as body
    var candidateCount = [];
    this.trainerIds.forEach(element => {
      var filterArrayByTrainer = this.inductionSchedule.candidateInductionSheduleDetails.filter(x => x.trainer == element);
      var test1 = "";
      var test = "<html lang='en'><p style='margin: 3px 0;'><b>Batch No :</b>" + data.batchNo + "</p><p style='margin: 3px 0 10px 0;'><b> Total No Of Candidates in batch :</b>" + data.totalCandidates + "</p><table style='width: 100%; border: 1px solid #000; border-collapse: collapse;'><thead><tr><th style='border: 1px solid #000; padding:4px;text-align:left;'>Training Tittle</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Date</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>From Time</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>To Time</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Location</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Venue</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Mode</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Coordinator</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Session Details</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Candidate Count</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Remarks</th></tr></thead><tbody>"
      filterArrayByTrainer.forEach(element => {
        candidateCount = element.batchCandidateIds.split(",");
        test1 += "<tr><td style='border: 1px solid #000; padding:4px;'>" + element.traingTitle + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.dateFrom + "-" + element.dateTo + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.timeFrom + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.timeTo + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.locationName + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.inductionVenueName + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.inductioneName + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.trainingCoOrdinatorName + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.detailsofSession + "</td><td style='border: 1px solid #000; padding:4px;'>" + candidateCount.length + "</td><td style='border: 1px solid #000; padding:4px;'>" + element.remarks + "</td></tr>"

      })
      var newString = test + test1 + "</tbody></table><p style='margin: 30px 0 5px 0;'>Thank you</p><p style='margin: 3px 0 10px 0;'>Onboarding team</p></html>"

      let objShareWithInductordetails = {
        batchId: data.batchId,
        candidateId: null,
        autoUserId: Number(element),
        emailBody: newString,
        //emailAttachment: allScheduleConcatString,
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
      joiningDate: data.dateofJoining,
      emailAttachment: ""
    }

    // Sending all schedule as an attachment
    // var allScheduleCandidateCount = [];
    var allScheduleStringCandidate = "";
    var allScheduleStringCandidate1 = "<html lang='en'><div style='width: 74px; text-align: center; margin: 0 auto;'><img src='https://mrfhrportaldocumentstrg.blob.core.windows.net/signatureupload/logo.png' style='width: 100%; text-align: center;' alt=''></div><p style='margin: 3px 0;'><b>Candidate No :</b>" + data.candidateNo + "</p><p style='margin: 3px 0 10px 0;'><b>  Candidate Name :</b>" + data.candidateFullName + "</p><br/><table border='1' style='width: 100%; border: 1px solid #000; border-collapse: collapse;'><thead><tr><th style='border: 1px solid #000; padding:4px;text-align:left;'>Training Tittle</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Date</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>From Time</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>To Time</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Location</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Venue</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Mode</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Coordinator</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Session Details</th><th style='border: 1px solid #000; padding:4px;text-align:left;'>Remarks</th></tr></thead><tbody>"
    this.inductionSchedule.candidateInductionSheduleDetails.forEach(all_ele => {
      //allScheduleCandidateCount = all_ele.batchCandidateIds.split(",");
      allScheduleStringCandidate += "<tr><td style='border: 1px solid #000; padding:4px;'>" + all_ele.traingTitle + "</td><td style='border: 1px solid #000; padding:4px;'>" + all_ele.dateFrom + "-" + all_ele.dateTo + "</td><td style='border: 1px solid #000; padding:4px;'>" + all_ele.timeFrom + "</td><td style='border: 1px solid #000; padding:4px;'>" + all_ele.timeTo + "</td><td style='border: 1px solid #000; padding:4px;'>" + all_ele.locationName + "</td><td style='border: 1px solid #000; padding:4px;'>" + all_ele.inductionVenueName + "</td><td style='border: 1px solid #000; padding:4px;'>" + all_ele.inductioneName + "</td><td style='border: 1px solid #000; padding:4px;'>" + all_ele.trainingCoOrdinatorName + "</td><td style='border: 1px solid #000; padding:4px;'>" + all_ele.detailsofSession + "</td><td style='border: 1px solid #000; padding:4px;'>" + all_ele.remarks + "</td></tr>"
    })
    var allScheduleConcatCandidateString = allScheduleStringCandidate1 + allScheduleStringCandidate + "</tbody></table><br/><p style='margin: 30px 0 5px 0;'>Thank you</p><p style='margin: 3px 0 10px 0;'>Onboarding team</p></html>";
    saheWithInductorObj.emailAttachment = allScheduleConcatCandidateString;


    // Inductor Specific data as body
    //var candidateCount = [];
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
  gotoCandidateAction(id: any, requisitionDetailId: any) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "ocplantjoinerslist");
    this.persistance.set('nextpagename', "ocrequsitioncandidateaction");
    this.persistance.set('candidateid', id);
    this.persistance.set('paramid', requisitionDetailId);
    this._route.navigate(['/app/corporate/new-joiner-list/candidateaction']);
  }
  //Candidate Details

  // Reassign Candidate

  onClickReassignCandidate(data, parentTabName, childTabName) {
    //oc-reassign-candiadte
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTab', parentTabName);
    this.persistance.set('childActiveTab', childTabName);
    //this._route.navigate(['/oc-reassign-candiadte'], { queryParams: { CandidateId: data.candidateId, For: "Candidate", Type: "P", CandidateInductionScheduleId: data.candidateInductionScheduleId } });
    this._route.navigate(['/app/oc-reassign-individualcandiadte'], { queryParams: { CandidateId: data.candidateId, BatchId: 0, BatchNo: "", For: "Candidate", Type: "P", ReqDetailsId: data.requisitionDetailId, EmpNo: data.empNp, VerticalID: this.verticalIds } });
  }

  // Delete Induction schedule

  onClickDeleteSchedule(data, deleteFor) {
    this.objDeleteInductionSchedule = new DeleteInductionSchedule();
    if (deleteFor == "I") {
      this.objDeleteInductionSchedule.CandidateId = data.candidateId;
      this.objDeleteInductionSchedule.BatchId = 0;

    } else {
      this.objDeleteInductionSchedule.CandidateId = 0;
      this.objDeleteInductionSchedule.BatchId = data.batchId;
    }
    jQuery("#confirmPopup").modal('show');
  }
  ConfirmDeleteSchedule() {
    this.SpinnerService.show();
    this.joinersservice.deleteInductionSchedule(this.objDeleteInductionSchedule).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          jQuery("#confirmPopup").modal('hide');
          this.notificationService.showSuccess(result.msg, "Success");
          this.onClickScheduledTab();
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
  ngOnDestroy() {
    jQuery(".custom-menu").hide();
  }


}

class UpdateJoinigDateForBatch {
  batchId: number;
  dateofJoining: string;
  createdBy: number;
}
class DeleteInductionSchedule {
  CandidateId: number;
  BatchId: number;
}

