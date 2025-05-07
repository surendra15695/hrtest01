import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import {
  ISearchTravelReimbursement, ITravelReimbursementDetailData,
  IRMTravelReimbursementList, ITravelReimbursementActionFormData,
  ITravelClarificationList, ISearchTravelClarificationList
} from '../../../../interfaces/selection/travelreimbursement.interface';
import { IVenue, ISearchVenue } from '../../../../interfaces/common/venue.interface';
import { IInterview, ISearchInterview } from '../../../../interfaces/common/interview.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction } from '../../../../interfaces/common/function.interface';
import { IFunctionDepartment, ISearchDepartment } from '../../../../interfaces/common/department.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../interfaces/common/position.interface';
import { InterviewService } from '../../../../services/common/interview/interview.service';
import { VenueService } from '../../../../services/common/venue/venue.service';
import { TravelreimbursementService } from '../../../../services/selection/travelreimbursement/travelreimbursement.service';
import { LocationService } from '../../../../services/common/location/location.service';
import { FunctionService } from '../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../services/common/department/department.service';
import { PositionService } from '../../../../services/common/position/position.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { element } from 'protractor';
declare var html2pdf: any;
declare var jQuery: any;

@Component({
  selector: 'app-rmtravelreimbursementlist',
  templateUrl: './rmtravelreimbursementlist.component.html',
  styleUrls: ['./rmtravelreimbursementlist.component.css']
})
export class RmtravelreimbursementlistComponent implements OnInit {
  @ViewChild('pfromDate', { static: false }) pfDate: ElementRef;
  @ViewChild('ptoDate', { static: false }) ptDate: ElementRef;
  @ViewChild('ifromDate', { static: false }) ifDate: ElementRef;
  @ViewChild('itoDate', { static: false }) itDate: ElementRef;
  @ViewChild('closeActionModal', { static: false }) caModal: ElementRef;
  @ViewChild('closeClarificationModal', { static: false }) ccModal: ElementRef;

  searchpendingform: FormGroup;
  searchprocessedform: FormGroup;
  verticals: IVertical[] = [];
  selectedPendingVertical: IVertical;
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

  interviewDetailIds: string;

  pendingTravelReimbursementList: IRMTravelReimbursementList[] = [];
  processedTravelReimbursementList: IRMTravelReimbursementList[] = [];

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

  travelReimbursementActionFormData: ITravelReimbursementActionFormData = {
    InterviewDetailIds: null,
    ClaimStatusId: 0,
    Remarks: null,
    CreatedBy: null,
    CandidateNo: null
  }

  travelClarificationList: ITravelClarificationList[] = [];
  searchClarificationList: ISearchTravelClarificationList = {
    InterviewDetailId: null
  }

  ClarificationRemarks: string;
  CandidateNosTravel: string = "";
  // Anif for download PDF file

  searchTravelReimbursement: ISearchTravelReimbursement = {
    CandidateId: null,
    RequisitionDetailId: null,
    InterviewDetailId: null
  }
  travelReimbursement: ITravelReimbursementDetailData = {
    travelReimbursementId: null,
    interviewDetailId: null,
    interviewName: null,
    fullName: null,
    emailId: null,
    contactNo: null,
    communicationAddress: null,
    pinCode: null,
    stateId: null,
    interviewDate: null,
    venueName: null,
    positionName: null,
    functionName: null,
    bankAccountName: null,
    bankAccountNumber: null,
    bankName: null,
    ifsc: null,
    bankBranch: null,
    bankStatementId: null,
    bankStatementDocument: null,
    claimStatusId: 0,
    ProfileSignature: null,
    travelReimbursementJourneyListData: [],
    travelReimbursementAttachmentListData: []
  };
  interviewTravelReimbursementData = {
    travelReimbursementId: null,
    interviewDetailId: null,
    interviewName: null,
    fullName: null,
    emailId: null,
    contactNo: null,
    communicationAddress: null,
    pinCode: null,
    stateId: null,
    interviewDate: null,
    venueName: null,
    positionName: null,
    functionName: null,
    bankAccountName: null,
    bankAccountNumber: null,
    bankName: null,
    ifsc: null,
    bankBranch: null,
    bankStatementId: null,
    bankStatementDocument: null,
    claimStatusId: 0,
    travelReimbursementJourneyListData: [],
    travelReimbursementAttachmentListData: [],
    grandTotal: 0,
    stateName: ""
  };
  activeTabName: string;
  activeTabNameShow: string = "Pending";

  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private interViewService: InterviewService,
    private locationService: LocationService,
    private venueService: VenueService,
    private functionService: FunctionService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private travelReimbursementService: TravelreimbursementService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
    private excelService: ExcelService,
  ) {
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
    this.persistance.set('candidateNoForMailTravel', null); // added anif
    this.activeTabName = this.persistance.get("activeTabName");
    if (this.activeTabName != null) {
      this.activeTabNameShow = this.activeTabName;
    }
    this.persistance.set('activeTabName', null);
    //console.log(this.verticalIds);
    this.SpinnerService.show();
    this.getAllVenues();
    this.getAllVerticals();
    this.getAllInterviews();
    this.createPendingForm();
    this.createProcessedForm();
    this.SpinnerService.hide();
  }

  ngOnInit() {
    this.loadDatePicker();
    this.loadDataTable1();
    this.loadDataTable2();
    this.loadTooltipMenu();
    this.fromPendingSubmit();
    this.fromProcessedSubmit();
  }

  ExportReport() {
    const res = this.pendingTravelReimbursementList.map(({ candidateNo, fullName, modeOfJourney, modeOfTravel, interviewDate, venueName, claimAmount }) => ({ candidateNo, fullName, modeOfJourney, modeOfTravel, interviewDate, venueName, claimAmount }));
    this.excelService.ExportAsExcelFile(res, 'Test_Travel_Reimbursement_Report');
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
          "searching": false,
          "paging": true,
          "scrollX": true,
          "fixedColumns": {
            "left": 3
          }
        });
      var flag = 0;
      var l = 0;
      var firsttext = "";
      var nexttext = "";
      jQuery('body').on('click', '#chkPendingAll', function () {
        l = 0;
        if (jQuery(this).prop("checked")) {
          jQuery('.interviewdetailid', oTable.fnGetNodes()).each(function () {
            if (l == 0) {
              firsttext = jQuery(this).parent("td").find(".interviewdetailid").val() + "_" + jQuery(this).parent("td").find(".claimstatusid").val();
            }
            else {
              nexttext = jQuery(this).parent("td").find(".interviewdetailid").val() + "_" + jQuery(this).parent("td").find(".claimstatusid").val();
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
            jQuery('.interviewdetailid', oTable.fnGetNodes()).each(function () {
              if (jQuery(this).parent("td").find('input[type="checkbox"]').prop("checked")) {
                jQuery(this).parent("td").find('input[type="checkbox"]').click();
              }
              jQuery(this).parent("td").find('input[type="checkbox"]').click();
            });
          }
        }
        else {
          jQuery('.interviewdetailid', oTable.fnGetNodes()).each(function () {
            if (jQuery(this).parent("td").find('input[type="checkbox"]').prop("checked")) {
              jQuery(this).parent("td").find('input[type="checkbox"]').click();
            }
          });
          dothis.interviewDetailIds = "";
        }
      });
    });
  }

  // loadTooltipMenu() {
  //   setTimeout(() => {
  //     var body_ = jQuery('body');
  //     var dropdownMenu,
  //       table_responsive = jQuery('.table-responsive');
  //     table_responsive.on('show.bs.dropdown', function (e) {
  //       dropdownMenu = jQuery(e.target).find('.custom-menu');
  //       body_.append(dropdownMenu.detach());
  //       var eOffset = jQuery(e.target).offset();
  //       dropdownMenu.css({
  //         'display': 'block',
  //         'top': eOffset.top + jQuery(e.target).outerHeight(),
  //         'left': eOffset.left,
  //         'font-size': '14px'
  //       });
  //       dropdownMenu.addClass("mobPosDropdown");
  //     });
  //     table_responsive.on('hide.bs.dropdown', function (e) {
  //       jQuery(e.target).append(dropdownMenu.detach());
  //       jQuery(e.target).find('.dropdown-menu').hide();
  //     });

  //   });
  // }
  loadTooltipMenu() {
    // Previous
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

  selectPending(evt, id, statusid, candidateNo) {
    if (evt.target.checked) {
      this.interviewDetailIds = this.interviewDetailIds + "," + id;
      this.CandidateNosTravel = (this.CandidateNosTravel == "" ? candidateNo : (this.CandidateNosTravel + "," + candidateNo));
    }
    else {

      this.interviewDetailIds = this.interviewDetailIds.replace("," + id, "");
      var caldidateId = this.CandidateNosTravel.split(",");
      caldidateId.forEach((element, index) => {
        if (element == candidateNo) {
          caldidateId.splice(index, 1)
        }
      })
      // console.log("candidate Array", caldidateId);
      this.CandidateNosTravel = caldidateId.join(",");
    }
    if (this.interviewDetailIds != "") {
      if (statusid == 5 || statusid == 2) {
        this.isBtnClarification = false;
        this.isBtnAccept = false;
        this.isBtnReject = false;
      }
      else {
        this.isBtnClarification = true;
        this.isBtnAccept = true;
        this.isBtnReject = true;
      }
    }
    else {
      this.isBtnClarification = false;
      this.isBtnAccept = false;
      this.isBtnReject = false;
    }
    // if (this.interviewDetailIds == "") {
    //   jQuery("#chkPendingAll").prop("checked", false);
    // }
  }

  loadDataTable2() {
    var dothis = this;
    jQuery('#dataTable2').dataTable().fnClearTable();
    jQuery('#dataTable2').dataTable().fnDestroy();
    setTimeout(() => {
      var oTable =
        jQuery('#dataTable2').dataTable({
          "searching": false,
          "paging": true,
          "scrollX": true,
          "fixedColumns": {
            "left": 3
          }
        });
      var flag = 0;
      var l = 0;
      var firsttext = "";
      var nexttext = "";
      jQuery('body').on('click', '#chkProcessedAll', function () {
        l = 0;
        if (jQuery(this).prop("checked")) {
          jQuery('.interviewdetailid', oTable.fnGetNodes()).each(function () {
            if (l == 0) {
              firsttext = jQuery(this).parent("td").find(".interviewdetailid").val() + "_" + jQuery(this).parent("td").find(".claimstatusid").val();
            }
            else {
              nexttext = jQuery(this).parent("td").find(".interviewdetailid").val() + "_" + jQuery(this).parent("td").find(".claimstatusid").val();
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
            jQuery("#chkProcessedAll").prop("checked", false);
            dothis.notificationService.showError("Please select same status", "Error");
          }
          else {
            jQuery("#chkProcessedAll").prop("checked", true);
            jQuery('.interviewdetailid', oTable.fnGetNodes()).each(function () {
              if (jQuery(this).parent("td").find('input[type="checkbox"]').prop("checked")) {
                jQuery(this).parent("td").find('input[type="checkbox"]').click();
              }
              jQuery(this).parent("td").find('input[type="checkbox"]').click();
            });
          }
        }
        else {
          jQuery('.interviewdetailid', oTable.fnGetNodes()).each(function () {
            if (jQuery(this).parent("td").find('input[type="checkbox"]').prop("checked")) {
              jQuery(this).parent("td").find('input[type="checkbox"]').click();
            }
          });
          dothis.interviewDetailIds = "";
        }
      });
    });
  }

  selectProcessed(evt, id, statusid) {
    if (evt.target.checked) {
      this.interviewDetailIds = this.interviewDetailIds + "," + id;
    }
    else {

      this.interviewDetailIds = this.interviewDetailIds.replace("," + id, "");
    }
    if (this.interviewDetailIds != "") {
      if (statusid == 5) {
        this.isBtnProcess = true;
      }
      else {
        this.isBtnProcess = false;
      }
    }
    else {
      this.isBtnProcess = false;
    }
    // if (this.interviewDetailIds == "") {
    //   jQuery("#chkProcessedAll").prop("checked", false);
    // }
  }

  createPendingForm() {
    this.searchpendingform = this.fb.group({
      candidateNo: [''],
      interviewId: [0],
      verticalId: [0],
      locationId: [0],
      fromDate: [''],
      toDate: [''],
      candidateName: [''],
      positionId: [0],
      functionId: [0],
      departmentId: [0],
      claimStatusId: [0],
      autoUserId: [this.autoUserId]
    });
  }

  resetPendingForm() {
    this.searchpendingform.reset();
   // this.getAllVerticals();
    this.searchpendingform.patchValue({
      candidateNo: '',
      interviewId: 0,
      verticalId: 0,
      locationId: 0,
      fromDate: '',
      toDate: '',
      candidateName: '',
      positionId: 0,
      functionId: 0,
      departmentId: 0,
      claimStatusId: 0,
      autoUserId: this.autoUserId
    })
    this.fromPendingSubmit();
    // this.getAllPendingFunction();
    // this.getAllPendingPosition();
  }

  createProcessedForm() {
    this.searchprocessedform = this.fb.group({
      candidateNo: [''],
      interviewId: [0],
      verticalId: [0],
      locationId: [0],
      fromDate: [''],
      toDate: [''],
      candidateName: [''],
      positionId: [0],
      functionId: [0],
      departmentId: [0],
      claimStatusId: [0]
    });
  }

  resetProcessedForm() {
    this.searchprocessedform.reset();
    this.searchprocessedform.patchValue({
      candidateNo: '',
      interviewId: 0,
      verticalId: 0,
      locationId: 0,
      fromDate: '',
      toDate: '',
      candidateName: '',
      positionId: 0,
      functionId: 0,
      departmentId: 0,
      claimStatusId: 0
    })
    this.fromProcessedSubmit();
  }

  getAllVerticals() {
    // this.verticals = [];
    // var splitvertical = this.verticalIds.split(",");
    // var allvertical = "";
    // //console.log(splitvertical);
    // for (var i = 0; i < splitvertical.length; i++) {
    //   // if (splitvertical[i] != "0") {
    //     if (splitvertical[i] == "0") {
    //       this.verticals.push({ verticalId: 0, verticalName: "All", isActive: true });
    //     }
    //     else if (splitvertical[i] == "1") {
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
    //   //}

    // }
    this.verticals = [];
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    this.selectedPendingVertical = this.verticals[0];
    this.selectedInterviewedVertical = this.verticals[0];
    this.defaultverticalId = this.selectedPendingVertical.verticalId;
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
    this.getAllPendingFunction();
    this.getAllPendingLocation();
    this.getAllPendingPosition();
    this.setDefaultPendingDepartment();
  }

  changeInterviewedVertical() {
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
        //console.log("pending location",result)
        this.pendingLocations = result;
        this.pendingLocations.splice(0, 0, {
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
        this.pendingLocations = [];
        this.pendingLocations.splice(0, 0, {
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
          locationOffice: "All",
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

  //function
  getAllPendingFunction() {
    this.pendingFunctions = [];
    this.searchPendingFunction.verticalId = this.defaultverticalId;
    this.functionService.getAllVerticalFunction(this.searchPendingFunction).subscribe((result) => {
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
    this.searchInterviewedFunction.verticalId = this.defaultverticalId;
    this.functionService.getAllVerticalFunction(this.searchInterviewedFunction).subscribe((result) => {
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
    this.searchInterviewedDepartment.functionId = this.searchprocessedform.value.functionId;
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
    this.pendingTravelReimbursementList = [];
    //console.log("search value",this.searchpendingform.value);
    this.travelReimbursementService.getRMTravelReimbursementDetailList(this.searchpendingform.value).subscribe((result) => {
      if (result) {
        this.pendingTravelReimbursementList = result;
        this.pendingTravelReimbursementList = this.pendingTravelReimbursementList.filter(x => x.claimStatusId <= 4)
        this.interviewDetailIds = "";
        this.isBtnClarification = false;

        //console.log(this.pendingTravelReimbursementList);
      }
      else {
        this.pendingTravelReimbursementList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadDataTable1();
      this.loadPopover();
      this.loadTooltipMenu();
      this.SpinnerService.hide();
    });
  }

  fromProcessedSubmit() {
    this.isBtnAssessment = false;
    this.SpinnerService.show();
    this.processedTravelReimbursementList = [];
    this.travelReimbursementService.getRMTravelReimbursementDetailList(this.searchprocessedform.value).subscribe((result) => {
      if (result) {
        this.processedTravelReimbursementList = result;
        console.log(this.processedTravelReimbursementList);
        this.processedTravelReimbursementList = this.processedTravelReimbursementList.filter(x => x.claimStatusId > 4);
        this.interviewDetailIds = "";

      }
      else {
        this.processedTravelReimbursementList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadDataTable2();
      this.loadPopover();
      this.loadTooltipMenu();
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
    this.travelReimbursementActionFormData.ClaimStatusId = acceptStatusId;
    this.modalHeader = modalHeader;
    this.travelReimbursementActionFormData.CreatedBy = this.autoUserId;
    jQuery(".txtRemarks").removeClass("is-invalid");
  }

  openClarificationModal(interviewDetailId) {
    jQuery(".custom-menu").hide();
    this.getAllClarificationList(interviewDetailId);
    this.travelReimbursementActionFormData.InterviewDetailIds = interviewDetailId.toString();
    jQuery(".txtRemarks").removeClass("is-invalid");
  }

  getAllClarificationList(interviewDetailId) {
    this.SpinnerService.show();
    this.travelClarificationList = [];
    this.searchClarificationList.InterviewDetailId = interviewDetailId
    this.travelReimbursementService.getTravelClarificationList(this.searchClarificationList).subscribe((result) => {
      if (result) {
        this.travelClarificationList = result;
      }
      else {
        this.travelClarificationList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }

  actionFormSubmit() {
    var flag = 0;
    if (this.travelReimbursementActionFormData.ClaimStatusId == 4 || this.travelReimbursementActionFormData.ClaimStatusId == 2) {
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
      this.travelReimbursementActionFormData.Remarks = this.Remarks;
      this.travelReimbursementActionFormData.InterviewDetailIds = this.interviewDetailIds;
      this.travelReimbursementActionFormData.CandidateNo = this.CandidateNosTravel;
      //console.log(this.travelReimbursementActionFormData);
      this.travelReimbursementService.updateTravelReimbursementStatus(this.travelReimbursementActionFormData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
            this.SpinnerService.hide();
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.SpinnerService.hide();
            if (this.travelReimbursementActionFormData.ClaimStatusId == 6) {
              this.fromProcessedSubmit();
            }
            else {
              this.fromPendingSubmit();
            }
            this.caModal.nativeElement.click();
            this.interviewDetailIds = "";
            this.Remarks = "";
            jQuery("#chkPendingAll").prop("checked", false);
            jQuery("#chkProcessedAll").prop("checked", false);
            this.isBtnClarification = false;
            this.isBtnAccept = false;
            this.isBtnReject = false;
            this.isBtnProcess = false;
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

  clarificationSubmit() {
    var flag = 0;
    if (this.ClarificationRemarks == "" || this.ClarificationRemarks == undefined) {
      jQuery(".txtRemarks").addClass("is-invalid");
      flag = 1;
    }
    else {
      jQuery(".txtRemarks").removeClass("is-invalid");
    }
    if (flag == 0) {
      this.SpinnerService.show();
      this.travelReimbursementActionFormData.CreatedBy = this.autoUserId;
      this.travelReimbursementActionFormData.ClaimStatusId = 2;
      this.travelReimbursementActionFormData.Remarks = this.ClarificationRemarks;
      //console.log(this.travelReimbursementActionFormData);
      this.travelReimbursementService.updateTravelReimbursementStatus(this.travelReimbursementActionFormData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
            this.SpinnerService.hide();
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.SpinnerService.hide();
            this.fromPendingSubmit();
            this.ccModal.nativeElement.click();
            this.interviewDetailIds = "";
            this.ClarificationRemarks = "";
            jQuery("#chkPendingAll").prop("checked", false);
            this.isBtnClarification = false;
            this.isBtnAccept = false;
            this.isBtnReject = false;
            this.isBtnProcess = false;
          }
        }
        else {
        }
      }, error => {
        this.SpinnerService.hide();
        console.log(error);
        this.SpinnerService.hide();
      }, () => {
        this.SpinnerService.hide();
      });
    }
  }

  gotoViewDetail(interviewDetailId, candidateNo, PageName) {
    jQuery(".custom-menu").hide();
    if (PageName == "Processed") {
      this.persistance.set('activeTabName', "Processed");
    } else {
      this.persistance.set('activeTabName', "Pending");
    }
    this.persistance.set('paramid', interviewDetailId);
    this.persistance.set('pagename', "travellist");
    this.persistance.set('candidateNoForMailTravel', candidateNo); // added anif
    this._route.navigate(['/app/travel-reimbursement-list/view']);
  }

  showProcessed() {
    this.fromProcessedSubmit();
    // setTimeout(() => {
    this.loadTooltipMenu();
    // });
    jQuery(".custom-menu").hide();
  }

  showPending() {
    this.fromPendingSubmit();
    //setTimeout(() => {
    this.loadTooltipMenu();
    // });
    jQuery(".custom-menu").hide();
  }
  // Anif

  DownlaodInterviewTravelReimbursement(record: any) {
    jQuery(".custom-menu").hide();
    this.SpinnerService.show();
    // this.journeyAddedAttachmentArray=[];
    // this.journeyAddedDataArray=[];
    this.searchTravelReimbursement.InterviewDetailId = record.interviewDetailId;
    this.travelReimbursementService.getTravelReimbursementDetailData(this.searchTravelReimbursement).subscribe((result) => {
      if (result) {
        this.travelReimbursement = result;
        this.travelReimbursement.travelReimbursementJourneyListData.forEach(element => {
          this.interviewTravelReimbursementData.grandTotal += element.claimAmount;
        });
        this.interviewTravelReimbursementData.travelReimbursementId = this.travelReimbursement.travelReimbursementId;
        this.interviewTravelReimbursementData.interviewDetailId = this.travelReimbursement.interviewDetailId;
        this.interviewTravelReimbursementData.fullName = this.travelReimbursement.fullName;
        this.interviewTravelReimbursementData.emailId = this.travelReimbursement.emailId;
        this.interviewTravelReimbursementData.interviewName = this.travelReimbursement.interviewName;
        this.interviewTravelReimbursementData.contactNo = this.travelReimbursement.contactNo;
        this.interviewTravelReimbursementData.communicationAddress = this.travelReimbursement.communicationAddress;
        this.interviewTravelReimbursementData.pinCode = this.travelReimbursement.pinCode;
        this.interviewTravelReimbursementData.stateId = this.travelReimbursement.stateId;
        this.interviewTravelReimbursementData.interviewDate = this.travelReimbursement.interviewDate;
        this.interviewTravelReimbursementData.venueName = this.travelReimbursement.venueName;
        this.interviewTravelReimbursementData.positionName = this.travelReimbursement.positionName;
        this.interviewTravelReimbursementData.functionName = this.travelReimbursement.functionName;
        this.interviewTravelReimbursementData.bankAccountName = this.travelReimbursement.bankAccountName;
        this.interviewTravelReimbursementData.bankAccountNumber = this.travelReimbursement.bankAccountNumber;
        this.interviewTravelReimbursementData.bankName = this.travelReimbursement.bankName;
        this.interviewTravelReimbursementData.ifsc = this.travelReimbursement.ifsc;
        this.interviewTravelReimbursementData.bankBranch = this.travelReimbursement.bankBranch;
        this.interviewTravelReimbursementData.bankStatementId = this.travelReimbursement.bankStatementId;
        this.interviewTravelReimbursementData.bankStatementDocument = this.travelReimbursement.bankStatementDocument;
        this.interviewTravelReimbursementData.claimStatusId = this.travelReimbursement.claimStatusId;
        this.interviewTravelReimbursementData.travelReimbursementJourneyListData = this.travelReimbursement.travelReimbursementJourneyListData;
        this.interviewTravelReimbursementData.travelReimbursementAttachmentListData = this.travelReimbursement.travelReimbursementAttachmentListData;
        this.interviewTravelReimbursementData.stateName = result.stateName;
        //console.log("Interview travel reimbursement data", result);
      }
      else {
        this.travelReimbursement = null;
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        this.downloadTravelReimbursement(record);
      }, 1000)
      this.SpinnerService.hide();
    });
  }
  downloadTravelReimbursement(record) {
    var htmlstring = document.getElementById("printInterviewTravelReimbursement").innerHTML;
    var dom = document.createElement('div');
    dom.innerHTML = htmlstring;
    html2pdf(dom, {
      margin: 10,
      filename: record.candidateNo + "_interview_Travel_Reimbursement.pdf",
      image: { type: 'jpeg', quality: 0.98 },
      //html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      html2canvas: { scale: 3, y: 0, scrollY: 0 },
      //jsPDF: { format: 'A4' },
      //jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      jsPDF: { format: 'A4', orientation: 'portrait' },
    });
  }
  openFile(blobName: string): void {
    let regex = /\.net(.*)/;
    let match = blobName.match(regex);
    let extractedString = match ? match[1] : '';
    let filename = extractedString.split('/')[2];
    let containername = extractedString.split('/')[1];
    this.locationService.getTestfile(filename,containername).subscribe(response => {
      let blob:Blob=response.body as  Blob;
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
