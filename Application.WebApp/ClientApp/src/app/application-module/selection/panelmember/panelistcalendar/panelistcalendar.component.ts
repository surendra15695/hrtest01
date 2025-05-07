import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import {
  IInterviewCalendarList, ISearchInterviewCalendar, IInterviewCalendarActionFormDataNew,
  IInterviewFeedbackFormData, ISearchInterviewFeedback, IInterviewFeedback,
  ISearchInterviewClarificationList, IInterviewClarificationList, IInterviewClarificationListData, IInterviewClarificationData,
} from '../../../../interfaces/selection/interviewcalendaraction.interface';
import { IVenue, ISearchVenue } from '../../../../interfaces/common/venue.interface';
import { IInterview, ISearchInterview } from '../../../../interfaces/common/interview.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction } from '../../../../interfaces/common/function.interface';
import { IFunctionDepartment, ISearchDepartment } from '../../../../interfaces/common/department.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../interfaces/common/position.interface';
import { InterviewService } from '../../../../services/common/interview/interview.service';
import { VenueService } from '../../../../services/common/venue/venue.service';
import { InterviewcalendaractionService } from '../../../../services/selection/interviewcalendaraction/interviewcalendaraction.service';
import { LocationService } from '../../../../services/common/location/location.service';
import { FunctionService } from '../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../services/common/department/department.service';
import { PositionService } from '../../../../services/common/position/position.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
declare var jQuery: any;

@Component({
  selector: 'app-panelistcalendar',
  templateUrl: './panelistcalendar.component.html',
  styleUrls: ['./panelistcalendar.component.css']
})
export class PanelistcalendarComponent implements OnInit {
  @ViewChild('pfromDate', { static: false }) pfDate: ElementRef;
  @ViewChild('ptoDate', { static: false }) ptDate: ElementRef;
  @ViewChild('ifromDate', { static: false }) ifDate: ElementRef;
  @ViewChild('itoDate', { static: false }) itDate: ElementRef;
  @ViewChild('closeActionModal', { static: false }) caModal: ElementRef;
  @ViewChild('clodeFeedbackModal', { static: false }) cfModal: ElementRef;
  @ViewChild('closeInterviewClarificationModal', { static: false }) cInterviewClarificationModal: ElementRef;


  searchInterviewClarification: ISearchInterviewClarificationList = {
    calendarId: null,
    requisitionDetailId: null,
    candidateId: null
  };
  interClarifications: IInterviewClarificationList[];
  interviewClarificationList: IInterviewClarificationListData[];
  interviewClarificationdata: IInterviewClarificationData[] = [];
  calendarActionFormData: IInterviewCalendarActionFormDataNew = {
    CalendarIds: null,
    AcceptStatus: null,
    Remarks: null,
    CreatedBy: null,
    CandidateId: null,
  }

  searchpendingform: FormGroup;
  searchinterviewedform: FormGroup;
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  //selectedPendingVertical: IVertical;
  selectedInterviewedVertical: IVertical;
  //venue
  searchVenue: ISearchVenue = {
    venueId: null,
    isActive: true
  }
  venues: IVenue[] = [];

  //location
  pendingLocations: ILocation[] = [];
  selectedPendingLocation: ILocation;
  searchPendingLocation: ISearchLocation =
    {
      locationId: null,
      verticalId: null,
      locationCode: null,
      locationNo: null,
      isActive: true
    };
  pendingLocationId: number;

  interviewedLocations: ILocation[] = [];
  selectedInterviewedLocation: ILocation;
  searchInterviewedLocation: ISearchLocation =
    {
      locationId: null,
      verticalId: null,
      locationCode: null,
      locationNo: null,
      isActive: true
    };
  pinterviewedLocationId: number;

  //interview
  interviews: IInterview[] = [];
  searchInterview: ISearchInterview = {
    InterviewId: null,
    IsActive: true
  }

  //function
  pendingFunctions: IVerticalFunction[] = [];
  selectedPendingFunction: IVerticalFunction;
  searchPendingFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  pendingFunctionId: number;

  interviewedFunctions: IVerticalFunction[] = [];
  selectedInterviewedFunction: IVerticalFunction;
  searchInterviewedFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  interviewedFunctionId: number;

  //department
  pendingDepartments: IFunctionDepartment[] = [];
  selectedPendingDepartment: IFunctionDepartment;
  searchPendingDepartment: ISearchDepartment = {
    departmentId: null,
    functionId: null,
    verticalId: null,
    isActive: true
  }
  pendingDepartmentId: number;

  interviewedDepartments: IFunctionDepartment[] = [];
  selectedInterviewedDepartment: IFunctionDepartment;
  searchInterviewedDepartment: ISearchDepartment = {
    departmentId: null,
    functionId: null,
    verticalId: null,
    isActive: true
  }
  interviewedDepartmentId: number;

  //position
  pendingPositions: IPositionVerticalDetail[] = [];
  selectedPendingPosition: IPositionVerticalDetail;
  searchPendingPosition: ISearchPosition = {
    verticalId: null,
    positionId: null,
    isActive: true
  }
  pendingPositionId;

  interviewedPositions: IPositionVerticalDetail[] = [];
  selectedInterviewedPosition: IPositionVerticalDetail;
  searchInterviewedPosition: ISearchPosition = {
    verticalId: null,
    positionId: null,
    isActive: true
  }
  interviewedPositionId;

  verticalIds: string;
  defaultverticalId: number;

  calendarIds: string;
  candidateIds: string = "";  // added by anifur.

  interviewCalendarList: IInterviewCalendarList[] = [];
  interviewedCalendarList: IInterviewCalendarList[] = [];

  isBtnClarification: boolean = false;
  isBtnAccept: boolean = false;
  isBtnReject: boolean = false;
  isBtnCancel: boolean = false;
  isBtnProcess: boolean = false;
  isBtnAssessment: boolean = false;

  autoUserId: number;
  modalHeader: string;
  AcceptStatus: number;
  Remarks: string;

  interviewActionFormData: IInterviewCalendarActionFormDataNew = {
    CalendarIds: null,
    AcceptStatus: 0,
    Remarks: null,
    CreatedBy: null,
    CandidateId: null,
  }

  feedbackFormData: IInterviewFeedbackFormData = {
    calendarId: 0,
    medicalDetails: "",
    parentIncomeDetails: "",
    dependentDetails: "",
    higherStudiesDetails: "",
    underStandingDetails: "",
    createdBy: 0
  }

  searchFeedback: ISearchInterviewFeedback = {
    candidateId: 0,
    calendarId: 0,
    requisitionDetailId: 0
  }

  interviewFeedbacks: IInterviewFeedback;
  feedbackButtonVisible: boolean = false;

  activeTab: string = "1";
  pendingActiveTabClass: string = "";
  interviewedActiveTabClass: string = "";

  pendingActiveDivClass: string = "";
  interviewedActiveDivClass: string = "";
  fromdate: any;
  count: any;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private interViewService: InterviewService,
    private locationService: LocationService,
    private venueService: VenueService,
    private functionService: FunctionService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private interActionService: InterviewcalendaractionService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
  ) {
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
    this.persistance.set('candidateIdsForMail', null); // added anif
    this.fromdate = this.persistance.get('fromdate');
    this.count = this.persistance.get('count');
    if (this.persistance.get('mycalendaractivetab') != null) {
      this.activeTab = this.persistance.get('mycalendaractivetab');
      this.persistance.set('mycalendaractivetab', this.activeTab);
    }
    else {
      this.activeTab = "1";
    }
    if (this.activeTab == "1") {
      this.pendingActiveTabClass = "nav-link active";
      this.interviewedActiveTabClass = "nav-link";

      this.pendingActiveDivClass = "tab-pane fade show active";
      this.interviewedActiveDivClass = "tab-pane fade";
    }
    else {
      this.pendingActiveTabClass = "nav-link";
      this.interviewedActiveTabClass = "nav-link active";

      this.pendingActiveDivClass = "tab-pane fade";
      this.interviewedActiveDivClass = "tab-pane fade show active";
    }
    this.persistance.set('mycalendaractivetab', null);
    this.SpinnerService.show();
    this.getAllVenues();
    this.getAllInterviews();
    this.createPendingForm();
    this.createInterviewedForm();
    this.SpinnerService.hide();
    this.getAllVerticals();
  }

  ngOnInit() {
    this.loadDatePicker();
    // this.loadDataTable1();
    //this.loadDataTable2();
    this.loadTooltipMenu();
    this.fromInterviewedSubmit();
    this.getAllVerticals();
    if (this.count == 1) {
      this.searchpendingform.value.fromDate = this.fromdate;
      this.fromPendingSubmit();
    } else {
      this.fromPendingSubmit();
    }
  }

  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }

  loadDataTable1() {
    var dothis = this;
    jQuery('#dataTable1').dataTable().fnClearTable();
    jQuery('#dataTable1').dataTable().fnDestroy();
    setTimeout(() => {
      var oTable =
        jQuery('#dataTable1').dataTable({
          "searching": true,
          "paging": true,
          "scrollX": true,
          "order": [],
          "fixedColumns": {
            "left": 5
          },
        });
      var flag = 0;
      var l = 0;
      var firsttext = "";
      var nexttext = "";
      jQuery('body').on('click', '#chkPendingAll', function () {
        l = 0;
        if (jQuery(this).prop("checked")) {
          jQuery('.calendarId', oTable.fnGetNodes()).each(function () {
            if (l == 0) {
              firsttext = jQuery(this).parent("td").find(".hiringStatusId").val() + "_" + jQuery(this).parent("td").find(".acceptStatus").val();
            }
            else {
              nexttext = jQuery(this).parent("td").find(".hiringStatusId").val() + "_" + jQuery(this).parent("td").find(".acceptStatus").val();
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
          if (flag == 2) {
            jQuery("#chkPendingAll").prop("checked", false);
            dothis.notificationService.showError("Please select same status", "Error");
          }
          else {
            jQuery("#chkPendingAll").prop("checked", true);
            jQuery('.calendarId', oTable.fnGetNodes()).each(function () {
              if (jQuery(this).parent("td").find('input[type="checkbox"]').prop("checked")) {
                jQuery(this).parent("td").find('input[type="checkbox"]').click();
              }
              jQuery(this).parent("td").find('input[type="checkbox"]').click();
            });
          }
        }
        else {
          jQuery('.calendarId', oTable.fnGetNodes()).each(function () {
            if (jQuery(this).parent("td").find('input[type="checkbox"]').prop("checked")) {
              jQuery(this).parent("td").find('input[type="checkbox"]').click();
            }
          });
          dothis.calendarIds = "";
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

  selectPending(evt, id, acceptStatus, statusid, candidateId) {
    if (evt.target.checked) {
      this.calendarIds = this.calendarIds + "," + id;
      this.candidateIds = this.candidateIds + "," + candidateId;
    }
    else {
      let arr: any = []
      this.calendarIds = this.calendarIds.replace("," + id, "");
      arr = this.candidateIds.split(",") // Split the string into an array of substrings
      arr = arr.filter(item => item != candidateId) // Remove the specified string 
      this.candidateIds = arr.join(',');
    }
    if (this.calendarIds != "") {
      if (acceptStatus == 0) {
        this.isBtnClarification = true;
        this.isBtnAccept = true;
        this.isBtnReject = true;
        this.isBtnCancel = false;
        this.isBtnProcess = false;
      }
      else if (acceptStatus == 1) {
        this.isBtnClarification = false;
        this.isBtnAccept = false;
        this.isBtnReject = false;
        this.isBtnCancel = true;
        this.isBtnProcess = true;
      }
      else if (acceptStatus == 3) {
        this.isBtnClarification = true;
        this.isBtnAccept = true;
        this.isBtnReject = true;
        this.isBtnCancel = false;
        this.isBtnProcess = false;
      }
      else if (acceptStatus == 4) {
        this.isBtnClarification = false;
        this.isBtnAccept = false;
        this.isBtnReject = false;
        this.isBtnCancel = false;
        this.isBtnProcess = false;
      }
    }
    else {
      this.isBtnClarification = false;
      this.isBtnAccept = false;
      this.isBtnReject = false;
      this.isBtnCancel = false;
      this.isBtnProcess = false;
    }
    if (this.calendarIds == "") {
      jQuery("#chkPendingAll").prop("checked", false);
    }
  }

  loadDataTable2() {
    var dothis = this;
    jQuery('#dataTable2').dataTable().fnClearTable();
    jQuery('#dataTable2').dataTable().fnDestroy();
    setTimeout(() => {
      var oTable =
        jQuery('#dataTable2').dataTable({
          "searching": true,
          "paging": true,
          "scrollX": true,
          "order": [],
          "fixedColumns": {
            "left": 5
          },
        });
      var flag = 0;
      var l = 0;
      var firsttext = "";
      var nexttext = "";
      jQuery('body').on('click', '#chkInterviewedAll', function () {
        l = 0;
        if (jQuery(this).prop("checked")) {
          jQuery('.calendarId', oTable.fnGetNodes()).each(function () {
            if (l == 0) {
              firsttext = jQuery(this).parent("td").find(".hiringStatusId").val() + "_" + jQuery(this).parent("td").find(".acceptStatus").val() + "_" + jQuery(this).parent("td").find(".assessmentFilledStatus").val();
            }
            else {
              nexttext = jQuery(this).parent("td").find(".hiringStatusId").val() + "_" + jQuery(this).parent("td").find(".acceptStatus").val() + "_" + jQuery(this).parent("td").find(".assessmentFilledStatus").val();
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
          if (flag == 2) {
            jQuery("#chkInterviewedAll").prop("checked", false);
            dothis.notificationService.showError("Please select same status", "Error");
          }
          else {
            jQuery("#chkInterviewedAll").prop("checked", true);
            jQuery('.calendarId', oTable.fnGetNodes()).each(function () {
              if (jQuery(this).parent("td").find('input[type="checkbox"]').prop("checked")) {
                jQuery(this).parent("td").find('input[type="checkbox"]').click();
              }
              jQuery(this).parent("td").find('input[type="checkbox"]').click();
            });
          }
        }
        else {
          jQuery('.calendarId', oTable.fnGetNodes()).each(function () {
            if (jQuery(this).parent("td").find('input[type="checkbox"]').prop("checked")) {
              jQuery(this).parent("td").find('input[type="checkbox"]').click();
            }
          });
          dothis.calendarIds = "";
        }
      });
    });
  }

  selectInterviewed(evt, id, acceptStatus, statusid, filledstatus, candidateId) {
    if (evt.target.checked) {
      this.calendarIds = this.calendarIds + "," + id;
      this.candidateIds = (this.candidateIds == "" ? candidateId : (this.candidateIds + "," + candidateId));
    }
    else {
      this.calendarIds = this.calendarIds.replace("," + id, "");
      // this.candidateIds = this.candidateIds.replace("," + candidateId, "");
      var caldidateId = this.candidateIds.split(",");
      caldidateId.forEach((element, index) => {
        if (element == candidateId) {
          caldidateId.splice(index, 1)
        }
      })
      this.candidateIds = caldidateId.join(",");

    }
    if (this.calendarIds != "") {
      if (filledstatus == 0) {
        this.isBtnAssessment = true;
      }
      else {
        this.isBtnAssessment = false;
        this.isBtnAccept = false;
        this.isBtnReject = false;
        this.isBtnCancel = true;
        this.isBtnProcess = true;
      }
    }
    else {
      this.isBtnAssessment = false;
    }
    if (this.calendarIds == "") {
      jQuery("#chkInterviewedAll").prop("checked", false);
    }
  }

  createPendingForm() {
    this.searchpendingform = this.fb.group({
      autoUserId: [this.autoUserId],
      interviewId: [0],
      verticalId: [0],
      locationId: [0],
      fromDate: [''],
      toDate: [''],
      candidateName: [''],
      venueId: [0],
      positionId: [0],
      functionId: [0],
      departmentId: [0],
      hiringStatusId: [0],
      interviewTypeId: [0],
      acceptStatus: [0]
    });
  }

  createInterviewedForm() {
    this.searchinterviewedform = this.fb.group({
      autoUserId: [this.autoUserId],
      interviewId: [0],
      verticalId: [this.defaultverticalId],
      locationId: [0],
      fromDate: [''],
      toDate: [''],
      candidateName: [''],
      venueId: [0],
      positionId: [0],
      functionId: [0],
      departmentId: [0],
      hiringStatusId: [0],
      interviewTypeId: [0],
      acceptStatus: [6]
    });
  }

  getAllVerticals() {

    // this.verticals = [];
    // var splitvertical = this.verticalIds.split(",");
    // var allvertical = "";
    // for (var i = 0; i < splitvertical.length; i++) {
    //   if (splitvertical[i] != "0") {
    //     if (splitvertical[i] == "1") {
    //       this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    //     }
    //     else if (splitvertical[i] == "2") {
    //       this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    //     }
    //     else if (splitvertical[i] == "3") {
    //       this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    //     }
    //     if (allvertical == "") {
    //       allvertical = splitvertical[i];
    //     }
    //     else {
    //       allvertical = allvertical + "," + splitvertical[i];
    //     }
    //   }

    //}
    this.verticals = [];
    this.verticals.push({ verticalId: 0, verticalName: "All", isActive: true });
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });  //argh
    // this.selectedVertical = this.verticals[0];
    // this.searchform.patchValue({ verticalId: this.selectedVertical.verticalId })

    this.selectedVertical = this.verticals[0];
    this.selectedInterviewedVertical = this.verticals[0];
    //this.defaultverticalId = this.selectedVertical.verticalId;
    this.getAllPendingFunction();
    this.getAllPendingLocation();
    this.getAllPendingPosition();
    this.setDefaultPendingDepartment();
    this.getAllInterviewedFunction();
    this.getAllInterviewedLocation();
    this.getAllInterviewedPosition();
    this.setDefaultInterviewedDepartment();
  }

  setDefaultPendingDepartment() {
    this.pendingDepartments = [];
    this.pendingDepartments.splice(0, 0, {
      departmentId: 0,
      verticalId: 0,
      departmentName: "All",
      functionId: 0,
      functionName: "",
      isActive: true,
      verticalName: ""
    })
  }

  setDefaultInterviewedDepartment() {
    this.interviewedDepartments = [];
    this.interviewedDepartments.splice(0, 0, {
      departmentId: 0,
      verticalId: 0,
      departmentName: "All",
      functionId: 0,
      functionName: "",
      isActive: true,
      verticalName: ""
    })
  }

  changePendingVertical() {
    var verticalId = this.searchpendingform.get("verticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0]; //arg
    this.getAllPendingFunction();
    this.getAllPendingLocation();
    this.getAllPendingPosition();
    this.setDefaultPendingDepartment();
  }

  changeInterviewedVertical() {
    var verticalId = this.searchinterviewedform.get("verticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0];  //arg
    this.getAllInterviewedFunction();
    this.getAllInterviewedLocation();
    this.getAllInterviewedPosition();
    this.setDefaultInterviewedDepartment();
  }

  //locations
  getAllPendingLocation() {
    this.pendingLocations = [];
    this.searchPendingLocation.verticalId = this.defaultverticalId;
    this.locationService.getAllLocation(this.searchPendingLocation).subscribe((result) => {
      if (result) {
        this.pendingLocations = result;
        this.pendingLocations.splice(0, 0, {
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
        this.pendingLocations = [];
        this.pendingLocations.splice(0, 0, {
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

  getAllInterviewedLocation() {
    this.interviewedLocations = [];
    this.searchInterviewedLocation.verticalId = this.defaultverticalId;
    this.locationService.getAllLocation(this.searchInterviewedLocation).subscribe((result) => {
      if (result) {
        this.interviewedLocations = result;
        this.interviewedLocations.splice(0, 0, {
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
        this.interviewedLocations = [];
        this.interviewedLocations.splice(0, 0, {
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

  //function
  getAllPendingFunction() {
    this.pendingFunctions = [];
    this.searchPendingFunction.verticalId = this.selectedVertical.verticalId;
    this.functionService.getAllVerticalFunction(this.selectedVertical).subscribe((result) => {
      if (result) {
        this.pendingFunctions = result;
        this.pendingFunctions.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          isActive: true,
          verticalName: ""
        })
      }
      else {
        this.pendingFunctions = [];
        this.pendingFunctions.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          isActive: true,
          verticalName: ""
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllInterviewedFunction() {
    this.interviewedFunctions = [];
    this.searchInterviewedFunction.verticalId = this.selectedVertical.verticalId;       //argh
    this.functionService.getAllVerticalFunction(this.selectedVertical).subscribe((result) => {
      if (result) {
        this.interviewedFunctions = result;
        this.interviewedFunctions.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          isActive: true,
          verticalName: ""
        })
      }
      else {
        this.interviewedFunctions = [];
        this.interviewedFunctions.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          isActive: true,
          verticalName: ""
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  changePendingFunction() {
    this.getAllPendingDepartment();

  }

  changeInterviewedFunction() {
    this.getAllInterviewedDepartment();
  }

  //department
  getAllPendingDepartment() {
    this.pendingDepartments = [];
    this.searchPendingDepartment.verticalId = this.defaultverticalId;
    this.searchPendingDepartment.functionId = this.searchpendingform.value.functionId;
    this.departmentService.getAllFunctionDepartment(this.searchPendingDepartment).subscribe((result) => {
      if (result) {
        this.pendingDepartments = result;
        this.pendingDepartments.splice(0, 0, {
          departmentId: 0,
          verticalId: 0,
          departmentName: "All",
          functionId: 0,
          functionName: "",
          isActive: true,
          verticalName: ""
        })
      }
      else {
        this.pendingDepartments = [];
        this.pendingDepartments.splice(0, 0, {
          departmentId: 0,
          verticalId: 0,
          departmentName: "All",
          functionId: 0,
          functionName: "",
          isActive: true,
          verticalName: ""
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllInterviewedDepartment() {
    this.interviewedDepartments = [];
    this.searchInterviewedDepartment.verticalId = this.defaultverticalId;
    this.searchInterviewedDepartment.functionId = this.searchinterviewedform.value.functionId;
    this.departmentService.getAllFunctionDepartment(this.searchInterviewedDepartment).subscribe((result) => {
      if (result) {
        this.interviewedDepartments = result;
        this.interviewedDepartments.splice(0, 0, {
          departmentId: 0,
          verticalId: 0,
          departmentName: "All",
          functionId: 0,
          functionName: "",
          isActive: true,
          verticalName: ""
        })
      }
      else {
        this.interviewedDepartments = [];
        this.interviewedDepartments.splice(0, 0, {
          departmentId: 0,
          verticalId: 0,
          departmentName: "All",
          functionId: 0,
          functionName: "",
          isActive: true,
          verticalName: ""
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  //position
  getAllPendingPosition() {
    this.pendingPositions = [];
    this.searchPendingPosition.verticalId = this.defaultverticalId;
    this.positionService.getAllVerticalPosition(this.searchPendingPosition).subscribe((result) => {
      if (result) {
        this.pendingPositions = result;
        this.pendingPositions.splice(0, 0, {
          positionId: 0,
          positionName: "All",
          isActive: true,
          verticalIds: "",
          verticalNames: ""
        })
      }
      else {
        this.pendingPositions = [];
        this.pendingPositions.splice(0, 0, {
          positionId: 0,
          positionName: "All",
          isActive: true,
          verticalIds: "",
          verticalNames: ""
        })
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }

  getAllInterviewedPosition() {
    this.interviewedPositions = [];
    this.searchInterviewedPosition.verticalId = this.defaultverticalId;
    this.positionService.getAllVerticalPosition(this.searchInterviewedPosition).subscribe((result) => {
      if (result) {
        this.interviewedPositions = result;
        this.interviewedPositions.splice(0, 0, {
          positionId: 0,
          positionName: "All",
          isActive: true,
          verticalIds: "",
          verticalNames: ""
        })
      }
      else {
        this.interviewedPositions = [];
        this.interviewedPositions.splice(0, 0, {
          positionId: 0,
          positionName: "All",
          isActive: true,
          verticalIds: "",
          verticalNames: ""
        })
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }

  getAllVenues() {
    this.venues = [];
    this.venueService.getAllVenue(this.searchVenue).subscribe((result) => {
      if (result) {
        this.venues = result;
        this.venues.splice(0, 0, {
          venueId: 0,
          venueAddress: "",
          venueName: "All",
          isActive: true,
          stateId: 0,
          stateName: ""
        })
      }
      else {
        this.venues = [];
        this.venues.splice(0, 0, {
          venueId: 0,
          venueAddress: "",
          venueName: "All",
          isActive: true,
          stateId: 0,
          stateName: ""
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllInterviews() {
    this.interviews = [];
    this.interViewService.getAllInterview(this.searchInterview).subscribe((result) => {
      if (result) {
        this.interviews = result;
        this.interviews.splice(0, 0, {
          interviewId: 0,
          interviewName: "All",
          isActive: true,
          createdBy: 0
        })
      }
      else {
        this.interviews = [];
        this.interviews.splice(0, 0, {
          interviewId: 0,
          interviewName: "All",
          isActive: true,
          createdBy: 0
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  fromPendingSubmit() {
    this.isBtnAccept = false;
    this.isBtnReject = false;
    this.isBtnCancel = false;
    this.isBtnProcess = false;
    this.SpinnerService.show();
    this.interviewCalendarList = [];
    this.interActionService.getPanelistCalendar(this.searchpendingform.value).subscribe((result) => {
      if (result) {
        this.interviewCalendarList = result;
        this.interviewCalendarList = this.interviewCalendarList.filter(x => x.calendarAcceptStatusId != 6)
        for (var i = 0; i < this.interviewCalendarList.length; i++) {
          this.interviewCalendarList[i].popoverContent = "<div><span class='grey'>Emp. ID: </span><span>" + this.interviewCalendarList[i].referalEmpNo + "</span></div><div><span class='grey'>Designation: </span></br><span>" + this.interviewCalendarList[i].referalDesignation + "</span></div><div><span class='grey'>Function: </span><span>" + this.interviewCalendarList[i].referalGrade + "</span></div>";
        }
        this.calendarIds = "";
        this.isBtnClarification = false;
      }
      else {
        this.interviewCalendarList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadDataTable1();
      setTimeout(() => {
        this.loadPopover();
        this.loadTooltipMenu();
      });
      this.SpinnerService.hide();
    });
  }

  fromInterviewedSubmit() {
    this.isBtnAssessment = false;
    this.SpinnerService.show();
    this.interviewedCalendarList = [];
    this.interActionService.getPanelistCalendar(this.searchinterviewedform.value).subscribe((result) => {
      if (result) {
        this.interviewedCalendarList = result;
        for (var i = 0; i < this.interviewedCalendarList.length; i++) {
          this.interviewedCalendarList[i].popoverContent = "<div><span class='grey'>Emp. ID: </span><span>" + this.interviewedCalendarList[i].referalEmpNo + "</span></div><div><span class='grey'>Designation: </span></br><span>" + this.interviewedCalendarList[i].referalDesignation + "</span></div><div><span class='grey'>Function: </span><span>" + this.interviewedCalendarList[i].referalGrade + "</span></div>";
        }
        this.calendarIds = "";

      }
      else {
        this.interviewedCalendarList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadDataTable2();
      setTimeout(() => {
        this.loadPopover();
        this.loadTooltipMenu();
      });
      this.SpinnerService.hide();
    });
  }

  loadPopover() {
    setTimeout(() => {
      jQuery('[data-toggle="popover"]').popover({
        html: true
      });
    });
  }

  openActionModal(acceptStatusId, modalHeader) {
    this.interviewActionFormData.AcceptStatus = acceptStatusId;
    this.modalHeader = modalHeader;
    this.interviewActionFormData.CreatedBy = this.autoUserId;
    jQuery(".txtRemarks").removeClass("is-invalid");
  }

  actionFormSubmit() {
    var flag = 0;
    if (this.interviewActionFormData.AcceptStatus == 4 || this.interviewActionFormData.AcceptStatus == 5) {
      if (this.Remarks == "" || this.Remarks == undefined) {
        jQuery(".txtRemarks").addClass("is-invalid");
        flag = 1;
      }
      else {
        jQuery(".txtRemarks").removeClass("is-invalid");
      }
    }
    if (flag == 0) {
      this.SpinnerService.show();
      this.interviewActionFormData.Remarks = this.Remarks;
      this.interviewActionFormData.CalendarIds = this.calendarIds;
      this.interviewActionFormData.CandidateId = this.candidateIds;
      this.interActionService.updateInterviewCalendarStatus(this.interviewActionFormData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.fromPendingSubmit();
            this.caModal.nativeElement.click();
            this.candidateIds = "";
            this.calendarIds = "";
            this.Remarks = "";
            jQuery("#chkPendingAll").prop("checked", false);
            this.isBtnClarification = false;
            this.isBtnAccept = false;
            this.isBtnReject = false;
            this.isBtnCancel = false;
            this.isBtnProcess = false;
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
  }

  getFeedbackDetails(calendarid) {
    this.feedbackButtonVisible = true;
    this.interviewFeedbacks = null;
    this.searchFeedback.calendarId = calendarid;
    this.interActionService.getInterviewFeedbackList(this.searchFeedback).subscribe((result) => {
      if (result) {
        if (result.length > 0) {
          this.interviewFeedbacks = result[0];
          this.feedbackFormData.calendarId = this.interviewFeedbacks.calendarId;
          this.feedbackFormData.medicalDetails = this.interviewFeedbacks.medicalDetails;
          this.feedbackFormData.parentIncomeDetails = this.interviewFeedbacks.parentIncomeDetails;
          this.feedbackFormData.higherStudiesDetails = this.interviewFeedbacks.higherStudiesDetails;
          this.feedbackFormData.dependentDetails = this.interviewFeedbacks.dependentDetails;
          this.feedbackFormData.underStandingDetails = this.interviewFeedbacks.underStandingDetails;
          this.feedbackButtonVisible = false;
        }
        else {
          this.interviewFeedbacks = null;
          this.feedbackFormData.calendarId = calendarid;
          this.feedbackFormData.medicalDetails = "";
          this.feedbackFormData.parentIncomeDetails = "";
          this.feedbackFormData.higherStudiesDetails = "";
          this.feedbackFormData.dependentDetails = "";
          this.feedbackFormData.underStandingDetails = "";
          this.feedbackButtonVisible = true;
        }
      }
      else {
        this.interviewFeedbacks = null;
        this.feedbackFormData.calendarId = calendarid;
        this.feedbackFormData.medicalDetails = "";
        this.feedbackFormData.parentIncomeDetails = "";
        this.feedbackFormData.higherStudiesDetails = "";
        this.feedbackFormData.dependentDetails = "";
        this.feedbackFormData.underStandingDetails = "";
        this.feedbackButtonVisible = true;
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  openFeedbackModal(calendarId) {
    jQuery(".custom-menu").hide();
    setTimeout(() => {
      this.loadPopover();
      this.loadTooltipMenu();
    });
    this.getFeedbackDetails(calendarId);
    jQuery(".txtareadetails").removeClass("is-invalid");
  }

  saveFeedback() {
    var flag = 0;
    if (this.feedbackFormData.medicalDetails == "" || this.feedbackFormData.medicalDetails == undefined) {
      jQuery(".medicalddetails").addClass("is-invalid");
      flag = 1;
    }
    else {
      jQuery(".medicalddetails").removeClass("is-invalid");
    }
    if (this.feedbackFormData.parentIncomeDetails == "" || this.feedbackFormData.parentIncomeDetails == undefined) {
      jQuery(".parentincomedetails").addClass("is-invalid");
      flag = 1;
    }
    else {
      jQuery(".parentincomedetails").removeClass("is-invalid");
    }
    if (this.feedbackFormData.higherStudiesDetails == "" || this.feedbackFormData.higherStudiesDetails == undefined) {
      jQuery(".higherstudiesdetails").addClass("is-invalid");
      flag = 1;
    }
    else {
      jQuery(".higherstudiesdetails").removeClass("is-invalid");
    }
    if (this.feedbackFormData.dependentDetails == "" || this.feedbackFormData.dependentDetails == undefined) {
      jQuery(".dependentdetails").addClass("is-invalid");
      flag = 1;
    }
    else {
      jQuery(".dependentdetails").removeClass("is-invalid");
    }
    if (this.feedbackFormData.underStandingDetails == "" || this.feedbackFormData.underStandingDetails == undefined) {
      jQuery(".understandingdetails").addClass("is-invalid");
      flag = 1;
    }
    else {
      jQuery(".understandingdetails").removeClass("is-invalid");
    }
    if (flag == 0) {
      this.SpinnerService.show();
      this.feedbackFormData.createdBy = this.autoUserId;
      this.interActionService.addInterviewFeedbackList(this.feedbackFormData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.fromInterviewedSubmit();
            this.cfModal.nativeElement.click();
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
  }

  gotoAssessment() {
    jQuery(".custom-menu").hide();
    this.persistance.set('calendarIds', this.calendarIds);
    this.persistance.set('candidateIdsForMail', this.candidateIds);
    this.persistance.set('pagename', "assessment");
    this.persistance.set('mycalendaractivetab', this.activeTab);
    this._route.navigate(['/app/my-calendar/interview-assessment']);
  }

  gotoIndividualAssessment(calendarId, candidateId) {
    jQuery(".custom-menu").hide();
    this.persistance.set('calendarIds', calendarId.toString());
    this.persistance.set('candidateIdsForMail', candidateId.toString());
    this.persistance.set('pagename', "assessment");
    this.persistance.set('mycalendaractivetab', this.activeTab);
    this._route.navigate(['/app/my-calendar/interview-assessment']);
  }

  gotoCandidateView(canidateid, requisitiondetailid) {
    jQuery(".custom-menu").hide();
    this.persistance.set('candidateid', canidateid);
    this.persistance.set('paramid', requisitiondetailid);
    this.persistance.set('pagename', "canidateview");
    this.persistance.set('mycalendaractivetab', this.activeTab);
    this._route.navigate(['/app/my-calendar/view-candidate']);
  }

  getInterviewClarificationList(calendarId) {
    this.interClarifications = [];
    this.interviewClarificationList = [];
    var data: any[] = [];
    this.searchInterviewClarification.calendarId = calendarId;
    this.interActionService.getInterviewClarificationList(this.searchInterviewClarification).subscribe((result) => {
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
              clarificationCount: this.interviewClarificationdata.length % 2 == 0 ? true : false
            }
          )
        }
      }
      else {
        this.interClarifications = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  sendInterviewClarification(calendarId, status) {
    var remarks = jQuery("#calendarRemarks" + calendarId).val();
    if ((remarks == undefined || remarks == "") && status > 1) {
      jQuery("#calendarRemarks" + calendarId).addClass("is-invalid");
    }
    else {
      jQuery("#calendarRemarks" + calendarId).removeClass("is-invalid");
      this.calendarActionFormData.AcceptStatus = status;
      this.calendarActionFormData.CalendarIds = calendarId.toString();
      this.calendarActionFormData.Remarks = remarks;
      this.calendarActionFormData.CreatedBy = this.autoUserId;
      this.interActionService.updateInterviewCalendarStatus(this.calendarActionFormData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.cInterviewClarificationModal.nativeElement.click();
            this.fromPendingSubmit();
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
  }

  gotoApplicationForm(candidateId, requisitionDetailId) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "panelcandidatelist");
    this.persistance.set('candidateId', candidateId);
    this.persistance.set('paramid', requisitionDetailId);
    this.persistance.set('mycalendaractivetab', this.activeTab);
    this._route.navigate(['/app/candidate-application/view']);
  }

  resetPendingForm() {
    // this.searchpendingform.reset();    
    this.getAllVerticals();
    this.searchpendingform.patchValue({
      autoUserId: this.autoUserId,
      interviewId: 0,
      verticalId: 0,
      locationId: 0,
      fromDate: '',
      toDate: '',
      candidateName: '',
      venueId: 0,
      positionId: 0,
      functionId: 0,
      departmentId: 0,
      hiringStatusId: 0,
      interviewTypeId: 0,
      acceptStatus: 0
    })
    this.fromPendingSubmit();
  }

  resetInterviewedForm() {
    //  this.searchinterviewedform.reset();
    this.searchinterviewedform.patchValue({
      autoUserId: this.autoUserId,
      interviewId: 0,
      verticalId: 0,
      locationId: 0,
      fromDate: '',
      toDate: '',
      candidateName: '',
      venueId: 0,
      positionId: 0,
      functionId: 0,
      departmentId: 0,
      hiringStatusId: 0,
      interviewTypeId: 0,
      acceptStatus: 0
    })
    this.fromInterviewedSubmit();
  }

  showPending() {
    this.fromPendingSubmit();
    this.activeTab = "1";
  }

  showInterviewed() {
    this.fromInterviewedSubmit();
    this.activeTab = "2";
  }


}
