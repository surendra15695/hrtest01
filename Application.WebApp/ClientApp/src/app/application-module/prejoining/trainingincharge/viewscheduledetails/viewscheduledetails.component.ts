import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import { IOnboardingCoordinator, ISearchOnboardingCoordinator, IModeOfInduction, ISearchModeOfInduction, IVenue, ISearchVenue, ITrainer, IsearchTrainer, ITemplate, ISearchTemplate, IRoleWiseUser, ISearchRoleWiseUser, ICandidateInductionSchedule, ICandidateInductionSheduleHeader, ICandidateInductionSheduleDetails } from '../../../../interfaces/prejoining/onboardingcoordinator.interface';
import { LocationService } from '../../../../services/common/location/location.service';
import { CommonService } from '../../../../services/common/common/common.service';
import { FunctionService } from '../../../../services/common/function/function.service';
import { PositionService } from '../../../../services/common/position/position.service';
import { ShareddataService } from '../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { CorporateallocationService } from '../../../../services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { JoinersService } from '../../../../services/prejoining/onboardingcoordinator/joiners.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { IBatch, ISearchBatch } from '../../../../interfaces/common/common.interface';
import { ISearchModeOfJoining } from 'src/app/interfaces/preselection/candidate.interface';
import { InductionassessmentService } from 'src/app/services/common/inductionassessment/inductionassessment.service';
declare var jQuery: any;

@Component({
  selector: 'app-viewscheduledetails',
  templateUrl: './viewscheduledetails.component.html',
  styleUrls: ['./viewscheduledetails.component.css']
})
export class ViewscheduledetailsComponent implements OnInit {

  inductionForm: FormGroup;
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  inductionType: string;
  inductionTypeId: any;
  inductionTypeNo: any;
  inductionJoiningType: string;
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
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

  onBoardingCoordinatorList: any[] = [];
  searchRoleUser: any = {
    roleId: 0
  }

  // induction mode
  inductionModes: IModeOfInduction[] = [];
  selectedInductionMode: IModeOfInduction;
  searchInductionMode: ISearchModeOfInduction = {
    inductionModeId: null,
    isActive: null
  }

  // venue
  venues: IVenue[] = [];
  selectedVenue: IVenue;
  searchVenue: ISearchVenue = {
    reportingVenueId: null,
    isActive: null
  }
  // Template
  templates: ITemplate[] = [];
  selectedTemplate: ITemplate;
  searchTemplate: ISearchTemplate = {

  }
  // Trainer

  roleWiseUser: IRoleWiseUser[] = [];
  searchRoleWiseUser: ISearchRoleWiseUser = {
    roleId: null
  }
  inductionScheduleDetailsList: any[] = [];
  inductionScheduleDetailsNonEditableList: any[] = [];
  templateId: number = 0;
  from: string;

  trainerRoleid = 0;
  trainerTypename = "";
  candidateInductionScheduleId: any;
  mode: string;
  inductionSchedule: ICandidateInductionSchedule;

  inductionScheduleHeader: ICandidateInductionSheduleHeader;
  inductionScheduleDetails: ICandidateInductionSheduleDetails;

  searchInductionSchedule = {
    candidateInductionScheduleId: null,
  }
  parentActiveTab: string;
  childActiveTab: string;
  disabledField: boolean;
  // R F A T
  locationID: number;
  coordinatorID: number;
  isForBatch: boolean = false;
  candidatePreviewList: any[] = [];
  batchWiseCandidateList: any[] = [];    // Added for multiple schedule from here
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
    private joinersservice: JoinersService,
    private inductionassessmentService: InductionassessmentService
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    // this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.parentActiveTab = this.persistance.get("parentActiveTabAc");
    this.childActiveTab = this.persistance.get("childActiveTabAc");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.inductionType = params['InductionType'];
      this.inductionTypeId = params['IndictionTypeId'];
      this.inductionTypeNo = params['IndictionTypeNo'];
      this.inductionJoiningType = params['InductionJoiningType'];
      // this.from = params['From'];
      this.candidateInductionScheduleId = params['CandidateInductionScheduleId'];
      this.mode = params['Mode'];
      if (this.mode == "View") {
        this.disabledFormField();
      }
      if (this.inductionType == 'Candidate') {
        this.trainerRoleid = 48;
        this.trainerTypename = "Person To Meet";
        this.isForBatch = false;
      }
      else {
        this.trainerRoleid = 47;
        this.trainerTypename = "Trainer";
        this.getBatchwiseCandidate();  // Added for multiple schedule 
        this.isForBatch = true;
      }
    });
    this.createIndcutionForm();
    this.updateFormValue();
    this.getAllDropdowndata();
    //alert(this.candidateInductionScheduleId);
    if (this.candidateInductionScheduleId != null) {
      this.getAllScheduleDetails();
    }
  }

  ngOnInit() {
    this.loadDatePicker();
    this.loadTimePicker1();
    this.loadTimePicker2();
    // this.loadDateTimePicker(); 

  }
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }
  loadTimePicker1() {
    // jQuery('#timepicker1').timepicker({
    //   minuteStep: 5,
    //   defaultTime: 'current'
    // });
    jQuery('.timepik').datetimepicker(
      {
        format: 'hh:mm'
      }
    );
  }
  loadTimePicker2() {
    // jQuery('#timepicker2').timepicker({
    //   minuteStep: 5,
    //   defaultTime: 'current'
    // });
    jQuery('.timepik').datetimepicker(
      {
        format: 'hh:mm'
      }
    );
  }
  loadDateTimePicker() {
    setTimeout(() => {
      jQuery('.dateTimepik').datetimepicker(
        {
          format: 'DD-MM-YYYY hh:mm A'
        }
      );
      jQuery('.timepik').datetimepicker(
        {
          format: 'hh:mm'
        }
      );
    });
  }
  createIndcutionForm() {
    this.inductionForm = this.fb.group({
      candidateInductionScheduleId: [0],
      joinigType: [''],
      templateId: null,
      templateDetails: [''],
      batchId: null,
      candidateId: null,
      createdBy: this.loginUserId,
      onBordingCoordinatorId: null,
      locationId: null,
      inductionTypeNo: [''],
      fromDate: [''],
      toDate: ['']

    });
  }
  updateFormValue() {
    if (this.inductionType == "Candidate") {
      this.inductionForm.patchValue({
        candidateId: this.inductionTypeId,
        inductionTypeNo: this.inductionTypeNo,
        joinigType: this.inductionJoiningType

      })
    } else {
      this.inductionForm.patchValue({
        batchId: this.inductionTypeId,
        inductionTypeNo: this.inductionTypeNo,
        joinigType: this.inductionJoiningType
      })
    }
  }
  disabledFormField() {
    this.disabledField = true;
  }
  getAllDropdowndata() {
    // this.getAllTemplate();
    // this.getAllVerticals();
    this.getAllLocation();
    this.getAllOnboardingCoordinator();
    this.getInductionMode();
    this.getVenue();
    this.getAllRoleWiseUser()

  }
  getAllRoleWiseUser() {
    this.roleWiseUser = [];
    this.searchRoleWiseUser.roleId = this.trainerRoleid;
    this.joinersservice.getAllRoleWiseUser(this.searchRoleWiseUser).subscribe((result) => {
      if (result) {
        this.roleWiseUser = result;
        //  console.log("Rolewise User", this.roleWiseUser);
        // this.locations.splice(0, 0, {
        //   locationId: 0,
        //   verticalId: 0,
        //   locationNo: "All",
        //   locationCode: "",
        //   locationOffice: "",
        //   isActive: true,
        //   createdBy: 0
        // })
      }
      else {
        this.roleWiseUser = [];
        // this.locations.splice(0, 0, {
        //   locationId: 0,
        //   verticalId: 0,
        //   locationNo: "All",
        //   locationCode: "",
        //   locationOffice: "",
        //   isActive: true,
        //   createdBy: 0
        // })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  getAllTemplate() {
    this.templates = [];
    //this.searchTrainer.verticalId = this.selectedVerticalId;
    this.joinersservice.getAllTemplate(this.searchTemplate).subscribe((result) => {
      if (result) {
        this.templates = result;
        this.templates.splice(0, 0, {
          locationId: 0,
          verticalId: 0,
          locationNo: "All",
          locationCode: "",
          locationOffice: "",
          isActive: true,
          createdBy: 0
        })
      }
      else {
        this.templates = [];
        this.templates.splice(0, 0, {
          locationId: 0,
          verticalId: 0,
          locationNo: "All",
          locationCode: "",
          locationOffice: "",
          isActive: true,
          createdBy: 0
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
    // For test adding some static value
    this.templates.push({ templateId: "1", templateName: "Welcome" }, { templateId: "2", templateName: "Offer" })
  }
  //verticals
  getAllVerticals() {
    this.verticals = [];
    var splitvertical = this.verticalIds.split(",");
    var allvertical = "";
    for (var i = 0; i < splitvertical.length; i++) {
      if (splitvertical[i] != "0") {
        if (splitvertical[i] == "1") {
          this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
        }
        else if (splitvertical[i] == "2") {
          this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
        }
        else if (splitvertical[i] == "3") {
          this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
        }
        if (allvertical == "") {
          allvertical = splitvertical[i];
        }
        else {
          allvertical = allvertical + "," + splitvertical[i];
        }
      }

    }
    this.selectedPendingVertical = this.verticals[0];
    this.defaultverticalId = this.selectedPendingVertical.verticalId;
    this.selectedVerticalId = this.defaultverticalId;
    // this.getAllLocation();
  }

  //locations
  getAllLocation() {
    this.locations = [];
    this.searchLocation.verticalId = this.selectedVerticalId;
    this.locationService.getAllLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        this.locations = result;
        //console.log("Location", this.locations);

        this.locations.splice(0, 0, {
          locationId: 0,
          verticalId: 0,
          locationNo: "All",
          locationCode: "",
          locationOffice: "",
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
          locationOffice: "",
          isActive: true,
          createdBy: 0
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  getAllOnboardingCoordinator() {
    this.onBoardingCoordinatorList = [];
    for (var i = 0; i < this.verticals.length; i++) {
      if (this.verticals[i].verticalId.toString() == "1") {
        this.searchRoleUser.roleId = 24
      }
      else if (this.verticals[i].verticalId.toString() == "2") {
        this.searchRoleUser.roleId = 25
      }
      else if (this.verticals[i].verticalId.toString() == "3") {
        this.searchRoleUser.roleId = 26
      }
    }
    //this.candidateService.getAllOnboardingManager(this.searchOnboardingManager).subscribe((result) => {
    this.commonService.getRoleWiseUser(this.searchRoleUser).subscribe((result) => {
      if (result) {
        this.onBoardingCoordinatorList = result;
        //console.log("Onboarding Coordinator",this.onBoardingCoordinatorList);
      }
      else {
        this.onBoardingCoordinatorList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getInductionMode() {
    this.inductionModes = [];
    //this.searchTrainer.verticalId = this.selectedVerticalId;
    this.joinersservice.getAllInductionMode(this.searchInductionMode).subscribe((result) => {
      if (result) {
        this.inductionModes = result;
        // console.log("Induction Mode", this.inductionModes);
        this.inductionModes.splice(0, 0, {
          inductionModeId: 0,
          inductionModeName: "All",
          isActive: true,
        })
      }
      else {
        this.inductionModes = [];
        this.inductionModes.splice(0, 0, {
          inductionModeId: 0,
          inductionModeName: "All",
          isActive: true,
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  getVenue() {
    this.venues = [];
    //this.searchTrainer.verticalId = this.selectedVerticalId;
    this.joinersservice.getAllVenue(this.searchVenue).subscribe((result) => {
      if (result) {
        this.venues = result;
        //console.log("Venue", this.venues);
      }
      else {
        this.venues = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllScheduleDetails() {
    this.searchInductionSchedule.candidateInductionScheduleId = Number(this.candidateInductionScheduleId);
    this.joinersservice.getScheduleInductionDetails(this.searchInductionSchedule).subscribe((result) => {
      if (result) {
        this.inductionSchedule = result;
        //  this.inductionSchedule = this.inductionSchedule.candidateInductionSheduleDetails.filter(e => e.inductionCoOrdinator == this.loginUserId);
        console.log("Induction details For Edit", this.inductionSchedule);
        if (this.inductionSchedule.candidateInductionSheduleDetails.length > 0) {
          this.inductionSchedule.candidateInductionSheduleDetails.forEach((element, index) => {
            if (element.inductionCoOrdinator == this.loginUserId) {
              if (this.isForBatch) {
                var batchCandidateIdArray = [];
                var batchCandidate = element.batchCandidateIds.split(",");
                if (batchCandidate.length > 0) {
                  batchCandidate.forEach(element => {
                    batchCandidateIdArray.push(Number(element));
                  })
                }
              }
              let obj = {
                candidateInductionScheduleDetailsId: element.candidateInductionScheduleDetailsId,
                candidateInductionScheduleId: element.candidateInductionScheduleId,
                traingTitle: element.traingTitle,
                dateFrom: element.dateFrom,
                dateTo: element.dateTo,
                timeFrom: element.timeFrom,
                timeTo: element.timeTo,
                batchCandidateIds: batchCandidateIdArray,
                detailsofSession: element.detailsofSession,
                // trainer: element.trainer,
                trainer: element.trainerName,
                inductionMode: element.inductionMode,
                // location: element.location,
                location: element.locationName,
                //inductionVenue: element.inductionVenue,
                inductionVenue: element.inductionVenueName,
                inductionCoOrdinator: element.inductionCoOrdinator,
                remarks: element.remarks,
                readOnly: true,
                index: index + 1,
              }
              this.inductionScheduleDetailsNonEditableList.push(obj);
            }
          })
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
  getBatchwiseCandidate() {
    this.batchWiseCandidateList = [];
    this.SpinnerService.show();
    let searchObj = {
      BatchId: Number(this.inductionTypeId)
    }
    this.inductionassessmentService.getAllBatchWiseCandidate(searchObj).subscribe((result) => {
      if (result) {
        this.batchWiseCandidateList = result;
        // console.log("Batchwise candidate list", this.batchWiseCandidateList);
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
      // this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }
  onClickCandidateList(candidateIds: any) {      // Added for multiple schedule
    this.candidatePreviewList = [];
    candidateIds.forEach(element => {
      var candidateObj = this.batchWiseCandidateList.find(e => e.candidateId == element);
      if (candidateObj != undefined) {
        let candidateDetailsObj = {
          candidateNo: candidateObj.candidateNo,
          candidateName: candidateObj.fullName,
        }
        this.candidatePreviewList.push(candidateDetailsObj);
      }
    })
  }
  btnAddInductionDetails() {
    var flag = 0;
    var msg = "";
    if (this.coordinatorID == null) {
      flag = 1;
      msg = "Please select coordinator";
    }
    else {

    }
    if (this.locationID == null) {
      flag = 1;
      msg = "Please select location";
    }
    else {

    }
    if (this.tDate.nativeElement.value == "") {
      flag = 1;
      msg = "Please select To Date";
    }
    else {

    }
    if (this.fDate.nativeElement.value == "") {
      flag = 1;
      msg = "Please select From Date";
    }
    else {

    }
    if (flag == 0) {
      this.inductionScheduleDetailsList = [];
      let arrayIndex = this.inductionScheduleDetailsList.length == 0 ? 1 : (this.inductionScheduleDetailsList[this.inductionScheduleDetailsList.length - 1].index) + 1
      let obj = {
        candidateInductionScheduleDetailsId: 0,
        candidateInductionScheduleId: this.mode == "Edit" ? this.inductionSchedule.candidateInductionShedules.candidateInductionScheduleId : 0,
        traingTitle: "",
        dateFrom: this.fDate.nativeElement.value,
        dateTo: this.tDate.nativeElement.value,
        timeFrom: "",
        timeTo: "",
        detailsofSession: "",
        trainer: null,
        inductionMode: null,
        // location: this.inductionForm.value.locationId,
        location: this.locationID,
        inductionVenue: null,
        // inductionCoOrdinator: this.inductionForm.value.onBordingCoordinatorId,
        inductionCoOrdinator: this.coordinatorID,
        remarks: "",
        readOnly: false,
        index: arrayIndex
      }
      this.inductionScheduleDetailsList.push(obj);
      // this.inductionForm.reset();
      this.locationID = null;
      this.coordinatorID = null;
      this.updateFormValue();
    } else {
      this.notificationService.showError(msg, "Error");
    }

  }
  getLocationName(locationid) {
    if (locationid != undefined) {
      // console.log("Location", this.locations);

      var locationName = this.locations.find(e => e.locationId == locationid).locationOffice;
      return locationName;
    }
  }
  getCoordinatorName(coordinatorId) {
    if (coordinatorId != undefined) {
      var name = this.onBoardingCoordinatorList.find(e => e.autoUserId == coordinatorId).employeeName;
      return name;
    }

  }
  getFormatedTime(time) {

    let hour = (time.split(':'))[0]
    let min = (time.split(':'))[1]
    let part = hour > 12 ? 'pm' : 'am';
    if (parseInt(hour) == 0)
      hour = 12;
    min = (min + '').length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour + '').length == 1 ? `0${hour}` : hour;
    return `${hour}:${min} ${part}`
  }
  getTrainerName(trainerId) {
    if (trainerId != undefined) {
      var trainerName = this.roleWiseUser.find(e => e.autoUserId == trainerId).employeeName;
      return trainerName;
    }

  }
  getInductionModeName(modeId) {
    if (modeId != undefined) {
      var inductionmodeName = this.inductionModes.find(e => e.inductionModeId == modeId).inductionModeName;
      return inductionmodeName;
    }

  }
  getVenueName(venueId) {
    if (venueId != undefined) {
      var venueName = this.venues.find(e => e.reportingVenueId == venueId).reportingVenueName;
      return venueName;
    }

  }
  onClickAddIcon(data) {
    var flag = 0;
    var msg = "";

    if (data.remarks == "") {
      flag = 1;
      msg = "Please Enter Remarks";
    }
    else {

    }
    if (data.inductionVenue == null) {
      flag = 1;
      msg = "Please Select Venue";
    }
    else {

    }
    if (data.inductionMode == null) {
      flag = 1;
      msg = "Please Select Induction Mode";
    }
    else {

    }
    if (data.trainer == null) {
      flag = 1;
      msg = "Please Select Trainer";
    }
    else {

    }
    if (data.detailsofSession == "") {
      flag = 1;
      msg = "Please Enter Details of Session";
    }
    else {

    }
    if (data.timeTo == "") {
      flag = 1;
      msg = "Please Enter Time To";
    }
    else {

    }
    if (data.timeFrom == "") {
      flag = 1;
      msg = "Please Enter Time From";
    }
    else {

    }
    if (data.traingTitle == "") {
      flag = 1;
      msg = "Please Enter Training Tittle";
    }
    else {

    }
    if (flag == 0) {
      var selectedObj = this.inductionScheduleDetailsList.find(e => e.index == data.index);
      selectedObj.index = this.inductionScheduleDetailsNonEditableList.length == 0 ? 1 : (this.inductionScheduleDetailsNonEditableList[this.inductionScheduleDetailsNonEditableList.length - 1].index) + 1;
      this.inductionScheduleDetailsNonEditableList.push(JSON.parse(JSON.stringify(selectedObj)));
      // console.log("Non Editable List", this.inductionScheduleDetailsNonEditableList);
      this.inductionScheduleDetailsList.forEach((element, index) => {
        if (element.index == data.index) {
          element.traingTitle = "",
            element.timeFrom = "",
            element.timeTo = "",
            element.detailsofSession = "",
            element.trainer = null,
            element.inductionMode = null,
            element.inductionVenue = null,
            element.remarks = "",
            element.readOnly = false
          // element.index= arrayIndex
        }
      })
    }
    else {
      this.notificationService.showError(msg, "Error");
    }

  }
  onClickDelete(data) {
    this.inductionScheduleDetailsNonEditableList.forEach((element, index) => {
      if (element.index == data.index) {
        this.inductionScheduleDetailsNonEditableList.splice(index, 1)
      }
    })
  }

  // onFinalSubmit() {
  //   if (this.inductionScheduleDetailsNonEditableList.length > 0) {
  //     let finalSubmitObj = {
  //       candidateInductionScheduleId: this.inductionSchedule.candidateInductionShedules.candidateInductionScheduleId,
  //       joinigType: this.inductionJoiningType,
  //       templateId: Number(this.templateId),
  //       templateDetails: this.inductionSchedule.candidateInductionShedules.templateDetails,
  //       batchId: this.inductionType == "Candidate" ? null : Number(this.inductionTypeId),
  //       candidateId: this.inductionType == "Candidate" ? Number(this.inductionTypeId) : null,
  //       createdBy: this.loginUserId,
  //       candidateInductionScheduleDetails: []
  //     }
  //     this.inductionScheduleDetailsNonEditableList.forEach(element => {
  //       let obj = {
  //         candidateInductionScheduleDetailsId: element.candidateInductionScheduleDetailsId,
  //         candidateInductionScheduleId: element.candidateInductionScheduleId,
  //         traingTitle: element.traingTitle,
  //         dateFrom: element.dateFrom,
  //         dateTo: element.dateTo,
  //         timeFrom: element.timeFrom,
  //         timeTo: element.timeTo,
  //         detailsofSession: element.detailsofSession,
  //         trainer: element.trainer,
  //         inductionMode: element.inductionMode,
  //         location: element.location,
  //         inductionVenue: element.inductionVenue,
  //         inductionCoOrdinator: element.inductionCoOrdinator,
  //         remarks: element.remarks
  //       }
  //       finalSubmitObj.candidateInductionScheduleDetails.push(obj);
  //     })
  //    // console.log("Final Object for schedule Induction", finalSubmitObj);

  //     this.SpinnerService.show();
  //     this.joinersservice.scheduleInduction(finalSubmitObj).subscribe((result) => {
  //       if (result) {
  //         if (result.successFlag == 0) {
  //           this.SpinnerService.hide();
  //           this.notificationService.showError(result.msg, "Error");
  //         }
  //         else {
  //           this.SpinnerService.hide();
  //           this.notificationService.showSuccess(result.msg, "Success");
  //           this.inductionScheduleDetailsList = [];
  //           this.inductionScheduleDetailsNonEditableList = [];
  //           this.updateFormValue();
  //           this.redirectTo()

  //         }
  //       }
  //       else {
  //         this.SpinnerService.hide();
  //       }
  //     }, error => {
  //       console.log(error);
  //       this.SpinnerService.hide();
  //     }, () => {
  //       this.SpinnerService.hide();
  //     });
  //   } else {
  //     this.notificationService.showError("Please add atleast one details", "Error");
  //   }

  // }
  // BtnResetClick() {
  //   this.locationID = null;
  //   this.coordinatorID = null;
  //   this.updateFormValue();
  //   this.getAllDropdowndata();
  // }
  onFinalReset() {
    this.inductionScheduleDetailsList = [];
    this.inductionScheduleDetailsNonEditableList = [];
  }
  backTo() {
    this.persistance.set('parentActiveTabAc', this.parentActiveTab);
    this.persistance.set('childActiveTabAc', this.childActiveTab);
    this._route.navigate(['/app/manage-accomodation']);
  }
  // redirectTo() {
  //   if (this.from == "Corporate") {
  //     this.persistance.set('parentActiveTab', "Scheduled");
  //     this.persistance.set('childActiveTab', this.childActiveTab);
  //     this._route.navigate(['/corporate/new-joiner-list']);
  //   } else if (this.from == "Plant") {
  //     this.persistance.set('parentActiveTab', "Scheduled");
  //     this.persistance.set('childActiveTab', this.childActiveTab);
  //     this._route.navigate(['/plant/new-joiner-list']);
  //   } else if (this.from == "Sales") {
  //     this.persistance.set('parentActiveTab', "Scheduled");
  //     this.persistance.set('childActiveTab', this.childActiveTab);
  //     this._route.navigate(['/sales/new-joiner-list']);
  //   }
  // }

}
