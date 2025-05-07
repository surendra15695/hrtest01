import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { IAttachmentDocumentNameDetails, ISearchAttachmentDocumentName } from 'src/app/interfaces/common/attachmentdocument.interface';
import { IBatch, ISearchBatch } from 'src/app/interfaces/common/common.interface';
import { IEmailTemplate, ISearchEmailTemplate } from 'src/app/interfaces/common/emailtemplate.interface';
import { ISearchFunction, IVerticalFunction } from 'src/app/interfaces/common/function.interface';
import { ILocation, ISearchLocation } from 'src/app/interfaces/common/location.interface';
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { IAccommodationDetails, ICandidateAccommodationDetails, ICandidateDetails, ICandidateInductionPlan, ICandidateInductionPlanSheduleDetails, IInductionDetails } from 'src/app/interfaces/prejoining/candidate.interface';
import { IShareWithCandidate } from 'src/app/interfaces/prejoining/joinerslist.interface';
import { IJoiningDocument, IViewCandidateList, IWelcomeTemplate } from 'src/app/interfaces/prejoining/onboardingcoordinator.interface';
import { IModeOfJoining, ISearchModeOfJoining } from 'src/app/interfaces/preselection/candidate.interface';
import { CandidateService } from 'src/app/services/prejoining/candidate/candidate.service';
import { AttachmentdocumentService } from 'src/app/services/common/attachementdocument/attachmentdocument.service';
import { CommonService } from 'src/app/services/common/common/common.service';
import { EmailtemplateService } from 'src/app/services/common/emailtemplate/emailtemplate.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { LocationService } from 'src/app/services/common/location/location.service';
import { PositionService } from 'src/app/services/common/position/position.service';
import { JoinersService } from 'src/app/services/prejoining/onboardingcoordinator/joiners.service';
import { CorporateallocationService } from 'src/app/services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { RequisitionService } from 'src/app/services/preselection/requisition/requisition.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { ShareddataService } from 'src/app/sharedservices/shareddata.service';
import { ReportService } from 'src/app/services/reports/report.service';


declare var jQuery: any;

@Component({
  selector: 'app-induction-report-batchwise-viewcandidate',
  templateUrl: './induction-report-batchwise-viewcandidate.component.html',
  styleUrls: ['./induction-report-batchwise-viewcandidate.component.css']
})
export class InductionReportBatchwiseViewcandidateComponent implements OnInit {
  searchForm: FormGroup;
  candidateMoveSaveForm: FormGroup;
  shareInductionScheduleWithCandidateForm: FormGroup;
  @ViewChild('dateOfJoining', { static: false }) dtOfJoining: ElementRef;


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
  // Batch
  batchs: IBatch[] = [];
  selectedBatch: IBatch;
  searchBatch: ISearchBatch = {
    batchId: null,
    vertical: null,
    isActive: null
  }
  //Mode Of Joining
  modeOfJoiningList: IModeOfJoining[] = [];
  searchModeOfJoining: ISearchModeOfJoining = {
    modeofJoiningId: null,
    isActive: null
  }
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  batchId: number;
  batchNo: string;
  onBoardingCoordinator: number;
  candidateList: IViewCandidateList[] = [];
  selectAll: boolean;
  moveType: string;
  movingCandidateId: number;
  callngIfFunction: boolean = true;
  joiningTypeList: any[] = [];
  // Share with Candidate
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
  joiningDocument: IJoiningDocument[] = [];
  welcomeTemplate: IWelcomeTemplate[] = [];
  shareWithCandidateArray: any[] = [];
  sharingType: string;
  sharingCandidateId: number;
  sharingCandidateName: string = ""; // 14-07-2023
  joiningDocumentsIds: string = "";
  sharingCandidateRequisitionId: number;
  updatedJoiningDateArray: any[] = [];
  modeofJoiningId: number = null;
  joiningDate: any;
  allJoiningDateInformation: any[] = [];
  showBatchForMove: boolean = true;
  from: string;
  type: string;
  // Share with candidate email template
  // Email Template
  emailTemplates: IEmailTemplate[] = [];
  searchEmailTemplate: ISearchEmailTemplate = {
    //templateTypeId: 7,
    templateTypeId: 43,
    templateId: null,
    isActive: true
  }
  selectedTestEmailTemplateId: number;
  testEmailTemplateDescription: string;
  searchAccommodationDetails = {
    batchId: null,
    candidateId: null,
  }
  // accommodationAndVenueDetails: any;
  // venueDetails: any;
  // accommodationDetails: any;
  // sharingJoiningDate: string;

  // Joining Document
  documentNames: IAttachmentDocumentNameDetails[] = [];
  documentNameList: IAttachmentDocumentNameDetails[] = [];
  searchDocumentName: ISearchAttachmentDocumentName = {
    attachmentDocumentNameId: null,
    attachmentDocumentParticularId: null,
    isActive: true
  }
  allUserList: any[] = [];
  searchRoleUser: any = {
    roleId: 0
  }
  coordinatorName: string;
  parentActiveTab: string;
  childActiveTab: string;
  actionName: string;
  declaineCandidateId: number;
  declineremarks: string;
  tabName: string;
  remarks: string = "";
  discontinuecandidates: any;

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
  showPopoverForOM: boolean = false;
  showPopoverForOC: boolean = false;
  getEditableDocs: any = [];
  getEditableDocsfromapi: any = [];
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
  multiSelectCandidateIds: any[] = [];
  candidatesForAdditionalDocuments: any[] = [];  //. Added on 25-01-2023
  candidateAndAdditionalDocIds: any[] = [];  //. Added on 25-01-2023
  discontinueRemarks: string = "";
  discontinueCandidateId: any;
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
    private titleService: Title, public activatedRoute: ActivatedRoute,
    private positionService: PositionService,
    private emailtemplateService: EmailtemplateService,
    private attachmentDocumentService: AttachmentdocumentService,
    private joinersservice: JoinersService, private requisitionService: RequisitionService,
    private reportService: ReportService,
    private candidateService: CandidateService   
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.parentActiveTab = this.persistance.get("parentActiveTab");
    this.childActiveTab = this.persistance.get("childActiveTab");
    this.joiningTypeList.push({ joiningTypeId: "I", joinigTypeName: "Individual" }, { joiningTypeId: "B", joinigTypeName: "Batch" });
    this.requisitionDetailId = this.persistance.get('paramid');
    this.activatedRoute.queryParams.subscribe((params) => {
      this.batchId = params['BatchId'];
      this.batchNo = params['BatchNo'];
      this.onBoardingCoordinator = params['OnBoardingcoordinator'];
      this.from = params['From'];
      this.type = params['Type'];
    });
    this.createSearchForm();
    this.createCandidateMoveSaveForm()
    this.createShareInductionForm();
    this.getAllVerticals();
    //this.getAllBatch();
    this.getEmailTemplate();
    this.getModeOfJoining();
    this.getAllDocumentName();
    this.getVerticalsForPopUp();
    if (this.batchId != undefined) {
      this.getAllCandidateDetailsBatchWise();
    }
    this.getAllUsers();
  }

  ngOnInit() {
    this.loadDataTable();
    this.loadEditor();
    this.loadTooltipMenu();
    this.loadDatePicker()
    this.loadPopover();
  }

  getVerticalsForPopUp() {
    this.verticalsPopUp = [];
    var splitvertical = this.verticalIds.split(",");
    var allvertical = "";
    for (var i = 0; i < splitvertical.length; i++) {
      if (splitvertical[i] != "0") {
        if (splitvertical[i] == "1") {
          this.verticalsPopUp.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
        }
        else if (splitvertical[i] == "2") {
          this.verticalsPopUp.push({ verticalId: 2, verticalName: "Plant", isActive: true });
        }
        else if (splitvertical[i] == "3") {
          this.verticalsPopUp.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
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

  loadTooltipMenu() {
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
  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
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
      });
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
  onClickReset() {
    this.createSearchForm();
    this.getAllCandidateDetailsBatchWise();
  }
  createSearchForm() {
    this.searchForm = this.fb.group({
      batchId: [Number(this.batchId)],
      onBordingMangerId: [0],
      onBordingCoordinatorId: [Number(this.onBoardingCoordinator)],
      dtofJoiningFrom: [''],
      dtofJoiningTo: [''],
      candidateName: [''],
      verticalId: [0],
      locationId: [0],
      functionId: [0],
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
  //verticals
  getAllVerticals() {
    this.verticals = [];
    this.verticals = [];
    var splitvertical = this.verticalIds.split(",");
    var allvertical = "";
  
    this.verticals.push({ verticalId: 0, verticalName: "All", isActive: true });
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    
    this.selectedVerticalId = 0;
    this.getAllLocation();
    this.getAllFunction();
    //this.getCorporateAllocationPendingList();
  }
  changeVertical() {
    this.selectedVerticalId = this.searchForm.get("verticalId").value;
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
  getAllBatch(verticalId) {
    this.batchs = [];
    this.SpinnerService.show();
    this.searchBatch.vertical = verticalId; //this.defaultverticalId;
    this.commonService.getAllBatch(this.searchBatch).subscribe((result) => {
      if (result) {
        //  this.batchs = result.filter(x => x.createdBy == this.loginUserId);  // Previously it was there
        this.batchs = result;                                                 // Changed on 20-07-2022 as batch no is not fecthing
        //console.log(this.batchs);
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
  searchSubmit() {
    this.getAllCandidateDetailsBatchWise();
  }
  getAllCandidateDetailsBatchWise() {
    this.SpinnerService.show();

    this.reportService.getAllBatchWiseCandidateDetails(this.searchForm.value).subscribe((result) => {
      if (result) {
        this.candidateList = result;
        //console.log("View Candidate List Batch Wise", result);
        this.candidateList.forEach(element => {
          if (this.from == "OM") {
            this.showPopoverForOM = true;
            this.showPopoverForOC = false;
            if (element.onboardingManagerNotApproveDoc != " ") {
              element.popoverContent = "<div><span class='grey'>Pending/Need clarification Document: </span><span>" + element.onboardingManagerNotApproveDoc + "</span></div>";
            }
          } else {
            this.showPopoverForOM = false;
            this.showPopoverForOC = true;
            if (element.onboardingCordinatorNotApproveDoc != " ") {
              element.popoverContent = "<div><span class='grey'>Pending/Need clarification Document: </span><span>" + element.onboardingCordinatorNotApproveDoc + "</span></div>";
            }
          }

        })
        // console.log("candidate details list", this.candidateList);
        this.SpinnerService.hide();
      }
      else {
        this.candidateList = [];
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
  // Anifur
  //email template
  getEmailTemplate() {
    this.emailTemplates = [];
    this.SpinnerService.show();
    this.emailtemplateService.getAllEmailTemplate(this.searchEmailTemplate).subscribe((result) => {
      if (result) {
        this.emailTemplates = result;
        // console.log("Email template", this.emailTemplates);
      }
      else {
        this.emailTemplates = [];
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }


  onCheckSelectAll(eve) {
    if (this.candidateList.length > 0) {
      var firstHiringStatusId = this.candidateList[0].hiringStatusId;
      var flag = 0;
      this.candidateList.forEach(element => {
        if (element.hiringStatusId != firstHiringStatusId) {
          flag = 1
        }
      })
      if (flag == 0) {
        this.candidateList.forEach(element => {
          element.checked = eve.target.checked;
        })
      } else {
        jQuery("#chkAll").prop("checked", false);
        this.notificationService.showError("Please select same hiring status", "Error");
      }
    } else {
      jQuery("#chkAll").prop("checked", false);
      this.notificationService.showError("No data to select", "Error");
    }

  }
  getEnableStatusRowWise(data) {
    return data.checked;
  }
  onCheckRowWiseData(data, eve, index) {
    if (this.GetSelectedHiringStatusRowWise(data)) {
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
  GetSelectedHiringStatusRowWise(NewRow) {
    var AlredyChecked = this.candidateList.find(e => e.checked);
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

  onMoveRowWise(data) {
    this.moveType = "S";
    this.movingCandidateId = data.candidateId;
  }
  btnClickMoveAllCandidate() {
    this.moveType = "A";
    this.movingCandidateId = 0;
  }

  showBtnMoveCandidate() {
    var checkedObj = this.candidateList.find(e => e.checked == true && e.hiringStatusId == 46); //&& e.hiringStatusId == 32 && e.preEmployeeMedicaStatuslId != 1
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
        this.candidateList.forEach(element => {
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
    } else {
      this.notificationService.showError(msg, "Error");
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
          this.createSearchForm();
          this.createCandidateMoveSaveForm();
          this.getAllVerticals();
          this.getAllCandidateDetailsBatchWise();
          this.loadDataTable();
          jQuery("#moveCandidateModal").modal("hide");
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
  btnCancelClick() {
    this.candidateMoveSaveForm.reset();
  }

  // Share with candidate
  showBtnShareWithCandidate() {
    var checkedObj = this.candidateList.find(e => e.checked == true && e.hiringStatusId >= 47 && e.hiringStatusId < 48 && e.candidateAccomodationHeaderId > 0); //&& e.hiringStatusId == 32 && e.preEmployeeMedicaStatuslId != 1
    return checkedObj == null ? false : true;
  }

  getAllUsers() {
    this.allUserList = [];
    this.commonService.getRoleWiseUser(this.searchRoleUser).subscribe((result) => {
      if (result) {
        this.allUserList = result;
        // console.log("All User List", this.allUserList);
      }
      else {
        this.allUserList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
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
    if (this.candidateList.length > 0) {
      this.candidateList.forEach(element => {
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
    //console.log("Share with candidate details", data);
    //this.searchAccommodationDetails.batchId = null;  // Removed on 09-01-2022
    this.searchAccommodationDetails.batchId = Number(this.batchId);     // To get batch candidate accommodation details need to pass batch id alos so added on 09-01-2023
    this.searchAccommodationDetails.candidateId = data.candidateId;
    var userlist = this.allUserList.filter(e => e.autoUserId == data.onBoardingCoordinator);
    // console.log("User List", userlist);
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

  onClickEditAdditionalDoc(data) {
    this.editAttatchmentArray = [];
    var record = {
      CandidateId: Number(data.candidateId)
    }
    this.joinersservice.GetAdditionalDocumentList(record).subscribe((result) => {
      this.getEditableDocs = result;
      //if(this.getEditableDocs != null ){
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
        //}
        // if(this.getEditableDocs ==null){
        //   for(var val2 of this.documentNames){
        //     this.getEditableDocs.push({
        //       candidateJoiningDocumentId:val2.attachmentDocumentNameId,
        //       attachmentDocumentName:val2.attachmentDocumentName,
        //       shareWithCandidateId:0
        //     })
        //   }
        // }
      }


    })
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
      this.candidateList.forEach(element => {
        if (element.checked && element.hiringStatusId == 47) {
          this.multipleCandidateId += (cFlag == 0 ? "" : ",") + element.candidateId.toString();
          cFlag = 1;
          this.searchAccommodationDetails.candidateId = element.candidateId;
          //this.searchAccommodationDetails.batchId = null;  // Removed on 09-01-2023
          this.searchAccommodationDetails.batchId = Number(this.batchId); // To get batch candidate accommodation details need to pass batch id alos so added on 09-01-2023
          this.joinersservice.getAllDetailsForEditAccommodation(this.searchAccommodationDetails).subscribe((result) => {
            this.accommodationAndVenueDetails = result;
            this.venueDetails = this.accommodationAndVenueDetails.editAccomodationCandidateDetail;
            // Candidate wise Venue
            var isVenueExisted = this.allCandidateVenueDetails.find(e => e.candidateId == element.candidateId);
            if (isVenueExisted == null) {
              let venueObj = {
                reprtingVenueAddress: this.venueDetails == null ? "NA" : this.venueDetails.reprtingVenueAddress,
                // venueLocation: this.venueDetails == null ? "NA" : this.venueDetails.venueAddress,
                venueLocation: this.venueDetails == null ? "NA" : this.venueDetails.venueName,
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
          this.multiSelectCandidateIds.push({ candidateId: element.candidateId, emailId: element.emailId });
        }
      });
      if (this.multiSelectCandidateIds.length > 0) {
        this.prepareDataForMultiSelectCandidate(this.multiSelectCandidateIds[0]);
      }
      // console.log("Save Share With Candiate", this.saveShareWithCandidate);
    } else {
      this.identicalAccommodationDetails = [];
      this.identicalTrainingCoordinator = [];
      this.allCandidateVenueDetails = [];
      this.joinersservice.getAllDetailsForEditAccommodation(this.searchAccommodationDetails).subscribe((result) => {
        this.accommodationAndVenueDetails = result;
        //console.log("Venue Details", this.accommodationAndVenueDetails);
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
        // console.log("candidate wise venue OutSide", this.allCandidateVenueDetails);
        // console.log("accommodation details OutSide", this.accommodationDetails);
        // console.log("Identical accommodation details OutSide", this.identicalAccommodationDetails);
        //  console.log("Reporting Time details OutSide", this.reportingTimeDetails);
        // console.log("Identical Training Coordinator", this.identicalTrainingCoordinator);

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
                  // console.log("accommodationObj", accommodation);
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
    }

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
  getReportingVenuerAndAccommodation() {
    this.SpinnerService.show();
    // console.log("Reporting Venue And Accommodation Search Obj", this.searchAccommodationDetails);

    this.joinersservice.getAllDetailsForEditAccommodation(this.searchAccommodationDetails).subscribe((result) => {
      if (result) {
        this.accommodationAndVenueDetails = result;
        // console.log("Reporting Venue And Accommodation Details", this.accommodationAndVenueDetails);

        this.venueDetails = this.accommodationAndVenueDetails.editAccomodationCandidateDetail;
        this.accommodationDetails = this.accommodationAndVenueDetails.trainingEditAccomodationForCandidateDetails[0];
        // console.log("Venue Details", this.venueDetails);
        // console.log("Accommodation details", this.accommodationDetails);
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
          templatedescription = templatedescription.replace("@@candidate", can_element.candidateName); // 14-07-2023
          templatedescription = templatedescription.replace("@@joiningdate", venuDetail.joiningDate);
          // accommodationDetails.forEach(acc_element => {
          //   this.allAccommodationDetails += acc_element.accomodation + " at " + acc_element.locationName + ","
          // })
          if (accommodationDetails.length > 0) {
            // this.allAccommodationDetails = accommodationDetails[0].accomodation + " at " + accommodationDetails[0].locationName;
            this.allAccommodationDetails = accommodationDetails[0].accomodation;
          }

          templatedescription = templatedescription.replace("@@AccomodationLocation", this.allAccommodationDetails);
          //  templatedescription = templatedescription.replace("@@ReportingLocation", venuDetail.reprtingVenueAddress + " at " + venuDetail.venueLocation);
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
            var candidateObj = this.candidateList.find(e => e.candidateId == element_prev.candidateId);
            // Candidate name and no update
            if (candidateObj != undefined) {
              previewObj.candidateNo = candidateObj.candidateNo
              previewObj.candidateName = candidateObj.candidateFullName
            }
            // Additional doc name update 
            //var docIds = element_prev.candidateJoiningDocumentId.split(",");
            var docIds = [];
            if (this.candidateAndAdditionalDocIds.length > 0) {                       // Added on 25-01-2023
              docIds = this.candidateAndAdditionalDocIds.filter(e => e.candidateId == element_prev.candidateId);
            }
            if (docIds.length > 0) {
              docIds.forEach((docIds_ele) => {
                //  var docObj = this.documentNames.find(e => e.attachmentDocumentNameId == Number(docIds_ele));
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

      } else {
        this.saveShareWithCandidate.shareWithCandidates.forEach(can_element => {
          this.allAccommodationDetails = "";
          var accommodationDetails = [];
          this.trainingCoordinatorDetails = "We advise you to get in touch with ";
          var venuDetail = this.allCandidateVenueDetails.find(e => e.candidateId == can_element.candidateId);
          accommodationDetails = this.identicalAccommodationDetails.filter(e => e.candidateId == can_element.candidateId && e.accomodation != null);
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
          templatedescription = templatedescription.replace("@@Coordinator", this.trainingCoordinatorDetails);
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
            var candidateObj = this.candidateList.find(e => e.candidateId == element_prev.candidateId);
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
  getAllDocumentName() {
    this.documentNames = [];
    this.SpinnerService.show();
    this.attachmentDocumentService.getAllDocumentName(this.searchDocumentName).subscribe((result) => {
      if (result) {
        // console.log("Document Name in View", result);
        this.documentNames = result;
        // this.documentNames = this.documentNames.filter(e => e.attachmentDocumentNameId != 20 && e.attachmentDocumentNameId != 19);
        this.documentNames = this.documentNames.filter(e => e.attachmentDocumentNameId == 16 || e.attachmentDocumentNameId == 17 || e.attachmentDocumentNameId == 18);
        //console.log("Document Name", this.documentNames);
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
          // console.log("Venue Details on button click", venuDetail);
          // var accommodationDetails = this.identicalAccommodationDetails.filter(e => e.candidateId == can_element.candidateId);
          var accommodationDetails = this.identicalAccommodationDetails.filter(e => e.candidateId == can_element.candidateId && e.accomodation != null);
          // console.log("Accommodation on button click", accommodationDetails);
          var coordinatorDetails = this.identicalTrainingCoordinator.filter(e => e.candidateId == can_element.candidateId);
          // console.log("Traninf Coordinator Details on button click", coordinatorDetails);
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
          // console.log("allAccommodationDetails", this.allAccommodationDetails);
          templatedescription = templatedescription.replace("@@AccomodationLocation", this.allAccommodationDetails);
          //templatedescription = templatedescription.replace("@@ReportingLocation", venuDetail.reprtingVenueAddress + " at " + venuDetail.venueLocation);
          templatedescription = templatedescription.replace("@@ReportingLocation", venuDetail.reprtingVenueAddress);
          coordinatorDetails.forEach(training_element => {
            this.trainingCoordinatorDetails += training_element.trainingCoOrdinatorName + " - <a href='javascript:void(0)'>" + training_element.trainingCoOrdinatorEmail + "</a> in " + training_element.inductionVenueName + ","
          })
          // console.log("trainingCoordinatorDetails", this.trainingCoordinatorDetails);
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
          // console.log("Venue Details on button click", venuDetail);
          //var accommodationDetails = this.identicalAccommodationDetails.filter(e => e.candidateId == can_element.candidateId);
          var accommodationDetails = this.identicalAccommodationDetails.filter(e => e.candidateId == can_element.candidateId && e.accomodation != null);
          // console.log("Accommodation on button click", accommodationDetails);
          var coordinatorDetails = this.identicalTrainingCoordinator.filter(e => e.candidateId == can_element.candidateId);
          // console.log("Traninf Coordinator Details on button click", coordinatorDetails);
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
          // console.log("allAccommodationDetails", this.allAccommodationDetails);
          templatedescription = templatedescription.replace("@@AccomodationLocation", this.allAccommodationDetails);
          // templatedescription = templatedescription.replace("@@ReportingLocation", venuDetail.reprtingVenueAddress + " at " + venuDetail.venueLocation);
          templatedescription = templatedescription.replace("@@ReportingLocation", venuDetail.reprtingVenueAddress);
          coordinatorDetails.forEach(training_element => {
            this.trainingCoordinatorDetails += training_element.trainingCoOrdinatorName + " - <a href='javascript:void(0)'>" + training_element.trainingCoOrdinatorEmail + "</a> in " + training_element.inductionVenueName + ","
          })
          // console.log("trainingCoordinatorDetails", this.trainingCoordinatorDetails);
          templatedescription = templatedescription.replace("@@Coordinator", this.trainingCoordinatorDetails);
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
            // this.createScheduledIndividualSearchForm();
            // this.createShareInductionForm();
            // this.getAllScheduledListIndividually();
            // this.getAllVerticals();
            // this.loadDataTable4();
            // jQuery("#shareWithCandidateModal").modal("hide");
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
        this.createShareInductionForm();
        this.getAllCandidateDetailsBatchWise();
        this.loadDataTable();
        jQuery("#shareWithCandidateModal").modal("hide");
        jQuery("#chkAll").prop("checked", false);
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



  onShareWithCancelClick() {
    this.getAllDocumentName();
    this.getEmailTemplate();
    this.testEmailTemplateDescription = "";
    this.selectedTestEmailTemplateId = null;
    this.joiningDocumentsIds = "";
  }

  onClickJoiningCheckList(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('paramid', data.requisitionDetailId);
    this.persistance.set('parentActiveTab', this.parentActiveTab);
    this.persistance.set('childActiveTab', this.childActiveTab);
    this._route.navigate(['/app/ocjoiningchecklist'], { queryParams: { CandidateId: data.candidateId, CandidateNo: data.candidateNo, BatchId: this.batchId, BatchNo: this.batchNo, OnBoardingcoordinator: this.onBoardingCoordinator, From: this.from, Type: this.type } });
  }
  onClickViewDocument(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "viewcandidatelist");
    this.persistance.set('nextpagename', "ocverifydocument");
    this.persistance.set('candidateId', data.candidateId);
    this.persistance.set('BatchId', this.batchId);
    this.persistance.set('BatchNo', this.batchNo);
    this.persistance.set('From', this.from);
    this.persistance.set('FromType', this.type);
    this.persistance.set('OnBoardingcoordinator', this.onBoardingCoordinator);
    // this.persistance.set('paramid', this.requisitionDetailId);
    this.persistance.set('paramid', data.requisitionDetailId);
    this.persistance.set('parentActiveTab', this.parentActiveTab);
    this.persistance.set('childActiveTab', this.childActiveTab);
    this._route.navigate(['app/ocverifydocument']);
  }
  onClickBack() {
    this.persistance.set('parentActiveTab', "Batch");
        this._route.navigate(['app/report/inductionProgramReportComponent']);
    

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
            this.getAllCandidateDetailsBatchWise();
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
  onClickUpdateJoiningDateCancel() {
    this.updatedJoiningDateArray = [];
    this.modeofJoiningId = null;
  }
  onChangeMoveType() {
    var type = this.candidateMoveSaveForm.get("joinIngType").value;
    if (type == "I") {
      this.showBatchForMove = false;
    } else {
      this.showBatchForMove = true;
    }
  }

  getVerticalWiseBatch(evt) {
    this.getAllBatch(evt);
    this.candidateMoveSaveForm.patchValue({
      batchId: undefined
    })
  }

  // 03-03-2022
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
          this.createSearchForm();
          this.getAllCandidateDetailsBatchWise();
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
  openModalPopupDiscontinue(candiadte, data) {
    this.discontinuecandidates = candiadte.toString();
  }
  DiscontinueCandidate() {
    var formdata = {
      candidateIds: this.discontinuecandidates.toString(),
      remarks: this.remarks,
      createdBy: this.loginUserId
    }
    this.joinersservice.discontinueCandidates(formdata).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          this.getAllCandidateDetailsBatchWise();
          jQuery("#discontinueModal").modal('toggle');
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
  gotoCandidateAction(id: any, requisitionDetailId: any) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "viewcandidatelist");
    this.persistance.set('nextpagename', "ocrequsitioncandidateaction");
    this.persistance.set('candidateid', id);
    this.persistance.set('paramid', requisitionDetailId);
    this._route.navigate(['/app/corporate/new-joiner-list/candidateaction']);
  }
  onClickReassignCandidate(data) {
    //oc-reassign-candiadte
    jQuery(".custom-menu").hide();
    // this.persistance.set('parentActiveTab', parentTabName);
    // this.persistance.set('childActiveTab', childTabName);

    this._route.navigate(['/app/oc-reassign-candiadte'], { queryParams: { CandidateId: data.candidateId, BatchId: this.batchId, BatchNo: this.batchNo, For: "Candidate", Type: this.type, From: this.from, OnBoardingcoordinator: this.onBoardingCoordinator, ReqDetailsId: data.requisitionDetailId, EmpNo: data.empNp } });
  }

  
  ngOnDestroy() {
    jQuery(".custom-menu").hide();
  }

  

}







