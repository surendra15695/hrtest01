import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../interfaces/common/doctor.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import { IPendingAccommodationBatchWise, IPendingAccommodationIndividual, IProcessedAccommodationIndividual, IProcessedAccomodationBatchWise } from '../../../../interfaces/prejoining/trainingincharge.interface';
import { IJoinersList, IPendingScheduleBatchWise, IPendingScheduleIndividual, IScheduledBatchWise, IScheduledIndividually } from '../../../../interfaces/prejoining/joinerslist.interface';
import { IOnboardingCoordinator, ISearchOnboardingCoordinator, IVenue, ISearchVenue } from '../../../../interfaces/prejoining/onboardingcoordinator.interface';
import { ICandidateDetailData, ISearchCandidateDetail, IModeOfJoining, ISearchModeOfJoining } from '../../../../interfaces/preselection/candidate.interface';
import { LocationService } from '../../../../services/common/location/location.service';
import { CommonService } from '../../../../services/common/common/common.service';
import { FunctionService } from '../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../services/common/department/department.service';
import { PositionService } from '../../../../services/common/position/position.service';
import { TraininginchargeService } from '../../../../services/prejoining/trainingincharge/trainingincharge.service';
import { ShareddataService } from '../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { CorporateallocationService } from '../../../../services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { JoinersService } from '../../../../services/prejoining/onboardingcoordinator/joiners.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { IApproverVertical, IApproverFunction, IApproverDepartment, IApproverVerticalFunctionDepartment, IApproverFunctionDepartment, IBatch, ISearchBatch } from '../../../../interfaces/common/common.interface';
import { IFunctionDepartment, ISearchDepartment } from 'src/app/interfaces/common/department.interface';
import { ISearchInductionVenue, IInductionVenue } from 'src/app/interfaces/common/venue.interface';
import { VenueService } from '../../../../services/common/venue/venue.service';
declare var jQuery: any;

@Component({
  selector: 'app-accommodationlist',
  templateUrl: './accommodationlist.component.html',
  styleUrls: ['./accommodationlist.component.css']
})
export class AccommodationlistComponent implements OnInit {
  searchPendingIndividualForm: FormGroup;
  searchPendingBatchForm: FormGroup;
  searchProcessedIndividualForm: FormGroup;
  searchProcessedBatchForm: FormGroup;
  @ViewChild('fromDatePendingIndividual', { static: false }) fdPendingIndividual: ElementRef;
  @ViewChild('toDatePendinIndividual', { static: false }) tdPendingIndividual: ElementRef;
  @ViewChild('fromDatePendingBatch', { static: false }) fdPendingBatch: ElementRef;
  @ViewChild('toDatePendingBatch', { static: false }) tdPendingBatch: ElementRef;
  @ViewChild('fromDateProcessedIndividual', { static: false }) fdProcessedIndividual: ElementRef;
  @ViewChild('toDateProcessedIndividual', { static: false }) tdProcessedIndividual: ElementRef;
  @ViewChild('fromDateProcessedBatch', { static: false }) fdProcessedBatch: ElementRef;
  @ViewChild('toDateProcessedBatch', { static: false }) tdProcessedBatch: ElementRef;
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
  //department
  departments: IFunctionDepartment[] = [];
  selectedDepartment: IFunctionDepartment;
  searchDepartment: ISearchDepartment = {
    departmentId: null,
    functionId: null,
    verticalId: null,
    isActive: true
  }
  // venue
  // venues: IVenue[] = [];
  // selectedVenue: IVenue;
  // searchVenue: ISearchVenue = {
  //   reportingVenueId: null,
  //   isActive: null
  // }
  venues: IInductionVenue[] = [];
  locationwiseVenue: IInductionVenue[] = [];
  selectedVenue: IInductionVenue;
  searchVenue: ISearchInductionVenue = {
    InductionVenueId: null,
    isActive: null
  }


  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  pendingAccommodationIndividual: IPendingAccommodationIndividual[] = [];
  pendingAccommodationBatchWise: IPendingAccommodationBatchWise[] = [];
  processedAccommodationIndividual: IProcessedAccommodationIndividual[] = [];
  processedAccommodationBatchWise: IProcessedAccomodationBatchWise[] = [];
  parentActiveTab: string = "Pending";
  pendingChildActiveTab: string = "Individual";
  processedChildActiveTab: string = "Individual";
  persistanceParentActiveTab: string;
  childActiveTab: string;
  locationID: number;


  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private functionService: FunctionService,
    private commonService: CommonService,
    private traininginchargeservice: TraininginchargeService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private titleService: Title,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private joinersservice: JoinersService,
    private venueService: VenueService,
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    //this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.persistanceParentActiveTab = this.persistance.get("parentActiveTabAc");
    this.childActiveTab = this.persistance.get("childActiveTabAc");
    if (this.persistanceParentActiveTab != null) {
      this.parentActiveTab = this.persistanceParentActiveTab;
      if (this.persistanceParentActiveTab == "Processed") {
        this.processedChildActiveTab = this.childActiveTab;
        this.onClickProcessedTab();
      } else {
        this.pendingChildActiveTab = this.childActiveTab;
        this.onClickPendingTab();
      }
    }
    this.persistance.set('parentActiveTabAc', null);
    this.persistance.set('childActiveTabAc', null);
    this.createPendingIndividualSearchForm();
    this.createPendingBatchSearchForm();
    this.createProcessedIndividualSearchForm();
    this.createProcessedBatchSearchForm();
    // this.getAllVerticals();
    this.getAllLocation();
    this.getAllFunction();
    this.getAllDepartment();
    this.getAllVenue()
    this.getAllIndividualPendingAccommodation();
    this.getAllBatchWisePendingAccommodation();
    // this.getAllIndividualProcessedAccommodation();
    // this.getAllBatchWiseProcessedAccommodation()

  }

  ngOnInit() {
    // this.loadDataTable1();
    // this.loadDataTable2();
    // this.loadDataTable3();
    // this.loadDataTable4();
    // this.loadDatePicker();
    //this.tableOptionDropDown();
    this.loadTooltipMenu();
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

      });
    }, 100);
  }

  loadDataTable1() {
    // jQuery('#dataTable1').DataTable().clear().destroy();
    jQuery('#dataTable1').dataTable().fnClearTable();
    jQuery('#dataTable1').dataTable().fnDestroy();
    setTimeout(() => {
      jQuery('#dataTable1').dataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "fixedColumns": {
          "left": 4
        }
        // "drawCallback": function (settings) {
        //   jQuery('#dataTable1').DataTable().clear().destroy();
        //   setTimeout(() => {
        //     jQuery('#dataTable1').DataTable({
        //       "searching": false,
        //       "paging": true,
        //       "scrollX": true,
        //       "bLengthChange": false,
        //     });
        //   });
        // }
      });
    });
  }
  loadDataTable2() {
    // jQuery('#dataTable2').DataTable().clear().destroy();
    jQuery('#dataTable2').dataTable().fnClearTable();
    jQuery('#dataTable2').dataTable().fnDestroy();
    setTimeout(() => {
      jQuery('#dataTable2').dataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
      });
    });
  }
  loadDataTable3() {
    // jQuery('#dataTable3').DataTable().clear().destroy();
    jQuery('#dataTable3').dataTable().fnClearTable();
    jQuery('#dataTable3').dataTable().fnDestroy();
    setTimeout(() => {
      jQuery('#dataTable3').dataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "fixedColumns": {
          "left": 4
        }
      });
    });
  }
  loadDataTable4() {
    //jQuery('#dataTable4').DataTable().clear().destroy();
    jQuery('#dataTable4').dataTable().fnClearTable();
    jQuery('#dataTable4').dataTable().fnDestroy();
    setTimeout(() => {
      jQuery('#dataTable4').dataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
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
  createPendingIndividualSearchForm() {
    this.searchPendingIndividualForm = this.fb.group({
      candidateId: null,
      candidateNo: [''],
      candidateName: [''],
      fromDate: [''],
      toDate: [''],
      locationId: null,
      functionId: null,
      venueId: null,
      departmentId: null,
      positionId: null,
      autoUserId: this.persistance.get('loggedinuser').autoUserId
    });
  }
  createPendingBatchSearchForm() {
    this.searchPendingBatchForm = this.fb.group({
      batchId: [0],
      batchNo: [''],
      dtofJoiningFrom: [''],
      dtofJoiningTo: [''],
      autoUserId: this.persistance.get('loggedinuser').autoUserId
    });
  }
  createProcessedIndividualSearchForm() {
    this.searchProcessedIndividualForm = this.fb.group({
      candidateId: [0],
      candidateNo: [''],
      candidateName: [''],
      fromDate: [''],
      toDate: [''],
      verticalId: [0],
      posLocationId: [0],
      functionId: [0],
      departmentid: [0],
      locationId: [0],
      venueId: [0],
      autoUserId: this.persistance.get('loggedinuser').autoUserId
    });
  }
  createProcessedBatchSearchForm() {
    this.searchProcessedBatchForm = this.fb.group({
      batchId: [0],
      batchNo: [''],
      dtofJoiningFrom: [''],
      dtofJoiningTo: [''],
      autoUserId: this.persistance.get('loggedinuser').autoUserId
    });
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
    // Sending one default value to backend
    this.searchPendingIndividualForm.patchValue({
      verticalId: this.defaultverticalId
    })
    // this.searchformPendingScheduleIndividual.patchValue({
    //   verticalId: this.defaultverticalId
    // })

    // this.getAllLocation();
    // this.getAllFunction();
    // this.getAllDepartment();
    // this.getAllVenue()
  }
  //locations
  getAllLocation() {
    this.locations = [];
    this.SpinnerService.show();
    //this.searchLocation.verticalId = this.selectedVerticalId;
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
    //this.searchFunction.verticalId = this.selectedVerticalId;
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
  onChangeFunction() {
    this.searchDepartment.functionId = this.searchPendingIndividualForm.get("functionId").value;
    this.getAllDepartment();
  }


  //department
  getAllDepartment() {
    this.departments = [];
    // this.searchDepartment.verticalId = this.selectedVerticalId;
    //this.searchDepartment.functionId = this.functionId;
    this.SpinnerService.show();
    this.departmentService.getAllFunctionDepartment(this.searchDepartment).subscribe((result) => {
      if (result) {
        this.departments = result;
        //console.log("Department List", this.departments);
        this.departments.splice(0, 0, {
          departmentId: 0,
          departmentName: "All",
          verticalId: 0,
          verticalName: "",
          functionName: "",
          functionId: 0,
          isActive: true
        })

      }
      else {
        this.departments = [];
        this.departments.splice(0, 0, {
          departmentId: 0,
          departmentName: "All",
          verticalId: 0,
          verticalName: "",
          functionName: "",
          functionId: 0,
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
  getAllVenue() {
    this.venues = [];
    //this.searchTrainer.verticalId = this.selectedVerticalId;
    this.searchVenue.isActive = true;
    this.venueService.getAllInductionVenue(this.searchVenue).subscribe((result) => {
      if (result) {
        this.venues = result;
        //  console.log("Venue List", this.venues);
      }
      else {
        this.venues = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  onChangeLocation() {
    this.searchPendingIndividualForm.patchValue(
      {
        venueId: null
      });
    this.locationwiseVenue = [];
    this.locationID = this.searchPendingIndividualForm.get("locationId").value;
    this.locationwiseVenue = this.venues.filter(e => e.locationId == this.locationID);
    //this.locationwiseVenue = this.venues.filter(e => e.inductionVenueId == this.locationID);
    // this.venues = this.venues.filter(e => e.inductionVenueId == this.locationID);
  }
  // For Pending Tab
  onClickPendingTab() {
    setTimeout(() => {
      this.createPendingIndividualSearchForm();
      this.createPendingBatchSearchForm();
      //this.getAllVerticals();
      this.getAllIndividualPendingAccommodation();
      this.getAllBatchWisePendingAccommodation();
    }, 100);
    // this.loadDataTable1();
    // this.loadDataTable2();
  }
  onClickPendingIndividualTab() {
    setTimeout(() => {
      this.createPendingIndividualSearchForm();
      //this.getAllVerticals();
      this.getAllIndividualPendingAccommodation();

    }, 100);
    // this.loadDataTable1();
  }
  onClickPendingBatchWiseTab() {
    setTimeout(() => {
      this.createPendingBatchSearchForm();
      //this.getAllVerticals();
      this.getAllBatchWisePendingAccommodation();
    }, 100);
    // this.loadDataTable2();
  }

  // pendingIndividualFormSubmit() {              // By  Piu on 05-08-2023
  //   var flag = 0;
  //   this.searchPendingIndividualForm.patchValue(
  //     {
  //       fromDate: this.fdPendingIndividual.nativeElement.value,
  //       toDate: this.tdPendingIndividual.nativeElement.value
  //     });
  //   if ((this.tdPendingIndividual.nativeElement.value != "") && (this.fdPendingIndividual.nativeElement.value > this.tdPendingIndividual.nativeElement.value)) {
  //     this.notificationService.showError("To Date Cann't be less than From Date !! Please provide actual date", "Error");
  //     flag = 1;
  //   }
  //   if (flag == 0) {
  //     this.getAllIndividualPendingAccommodation();
  //   }
  // }
  pendingIndividualFormSubmit() {        // By  Piu on 05-08-2023
    var flag = 0;
    this.searchPendingIndividualForm.patchValue(
      {
        fromDate: this.fdPendingIndividual.nativeElement.value,
        toDate: this.tdPendingIndividual.nativeElement.value
      });
    if (this.fdPendingIndividual.nativeElement.value.length > 0 && this.tdPendingIndividual.nativeElement.value.length > 0) {
      const [fday, fmonth, fyear] = this.fdPendingIndividual.nativeElement.value.split("/");
      const fdate = new Date(fyear, fmonth - 1, fday);
      const [tday, tmonth, tyear] = this.tdPendingIndividual.nativeElement.value.split("/");
      const tdate = new Date(tyear, tmonth - 1, tday);
      if (fdate > tdate) {
        this.notificationService.showError("To Date Can't be less than From Date !! Please provide actual date", "Error");
        flag = 1;
      }
    }
    if (flag == 0) {
      this.getAllIndividualPendingAccommodation();
    }
  }

  // pendingBatchWiseFormSubmit() {           // By  Piu on 05-08-2023
  //   var flag = 0;
  //   this.searchPendingBatchForm.patchValue(
  //     {
  //       dtofJoiningFrom: this.fdPendingBatch.nativeElement.value,
  //       dtofJoiningTo: this.tdPendingBatch.nativeElement.value
  //     });
  //   if ((this.tdPendingBatch.nativeElement.value != "") && (this.fdPendingBatch.nativeElement.value > this.tdPendingBatch.nativeElement.value)) {
  //     this.notificationService.showError("To Date Cann't be less than From Date !! Please provide actual date", "Error");
  //     flag = 1;
  //   }
  //   if (flag == 0) {
  //     this.getAllBatchWisePendingAccommodation();
  //   }
  // }

  pendingBatchWiseFormSubmit() {                 // By  Piu on 05-08-2023
    var flag = 0;
    this.searchPendingBatchForm.patchValue(
      {
        dtofJoiningFrom: this.fdPendingBatch.nativeElement.value,
        dtofJoiningTo: this.tdPendingBatch.nativeElement.value
      });
    if (this.fdPendingBatch.nativeElement.value.length > 0 && this.tdPendingBatch.nativeElement.value.length > 0) {
      const [fday, fmonth, fyear] = this.fdPendingBatch.nativeElement.value.split("/");
      const fdate = new Date(fyear, fmonth - 1, fday);
      const [tday, tmonth, tyear] = this.tdPendingBatch.nativeElement.value.split("/");
      const tdate = new Date(tyear, tmonth - 1, tday);
      if (fdate > tdate) {
        this.notificationService.showError("To Date Can't be less than From Date !! Please provide actual date", "Error");
        flag = 1;
      }
    }
    if (flag == 0) {
      this.getAllBatchWisePendingAccommodation();
    }
  }

  onClickPendingIndividualReset() {
    this.searchPendingIndividualForm.reset();
    this.createPendingIndividualSearchForm();
    this.getAllIndividualPendingAccommodation();
  }
  onClickPendingBatchwiseReset() {
    this.searchPendingBatchForm.reset();
    this.createPendingBatchSearchForm();
    this.getAllBatchWisePendingAccommodation();
  }

  getAllIndividualPendingAccommodation() {
    this.pendingAccommodationIndividual = [];
    this.SpinnerService.show();
    // console.log("Search Pending Individual Obj", this.searchPendingIndividualForm.value);
    //Anifur
    this.traininginchargeservice.getAllpendingAccommodationIndividual(this.searchPendingIndividualForm.value).subscribe((result) => {
      if (result) {
        // console.log(result);
        this.pendingAccommodationIndividual = result;
        this.pendingAccommodationIndividual = this.pendingAccommodationIndividual.filter(e => e.status == "Pending");
        //console.log("Accommodation Pending List Individual", this.pendingAccommodationIndividual);
        this.SpinnerService.hide();
      }
      else {
        this.pendingAccommodationIndividual = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.loadDataTable1();
      this.loadTooltipMenu();
      this.SpinnerService.hide();
    });
  }
  getAllBatchWisePendingAccommodation() {
    this.pendingAccommodationBatchWise = [];
    this.SpinnerService.show();
    // console.log("Search Pending Batch Obj", this.searchPendingBatchForm.value);
    this.traininginchargeservice.getAllpendingAccommodationBatchWise(this.searchPendingBatchForm.value).subscribe((result) => {
      if (result) {
        this.pendingAccommodationBatchWise = result;
        this.pendingAccommodationBatchWise = this.pendingAccommodationBatchWise.filter(e => e.status == "Pending");
        //console.log("Accommodation Pending List Batch Wise", this.pendingAccommodationBatchWise);
        this.SpinnerService.hide();
      }
      else {
        this.pendingAccommodationBatchWise = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();      
      this.loadDataTable2();
      this.loadTooltipMenu();
      this.SpinnerService.hide();
    });
  }

  // For Processed tab
  onClickProcessedTab() {
    setTimeout(() => {
      // jQuery('#dataTable4').DataTable().clear().destroy();
      this.createProcessedIndividualSearchForm();
      this.createProcessedBatchSearchForm();
      //this.getAllVerticals();
      this.getAllIndividualProcessedAccommodation();
      this.getAllBatchWiseProcessedAccommodation();
    }, 100);
    setTimeout(() => {
      this.loadDatePicker();
    }, 1000);
    // this.loadDataTable4();
  }
  onClickProcessedIndividualTab() {
    setTimeout(() => {
      this.createProcessedIndividualSearchForm();
      //this.getAllVerticals();
      this.getAllIndividualProcessedAccommodation();
    }, 100);
  }
  onClickProcessedBatchWiseTab() {
    setTimeout(() => {
      // jQuery('#dataTable4').DataTable().clear().destroy();
      this.createProcessedBatchSearchForm();
      //this.getAllVerticals();
      this.getAllBatchWiseProcessedAccommodation();
      this.loadDataTable4();
    }, 100);
  }
  processedIndividualFormSubmit() {
    var flag = 0;
    this.searchProcessedIndividualForm.patchValue({
      fromDate: this.fdProcessedIndividual.nativeElement.value,
      toDate: this.tdProcessedIndividual.nativeElement.value
    });
    if ((this.tdProcessedIndividual.nativeElement.value != "") && (this.fdProcessedIndividual.nativeElement.value > this.tdProcessedIndividual.nativeElement.value)) {
      this.notificationService.showError("To Date Cann't be less than From Date !! Please provide actual date", "Error");
      flag = 1;
    }
    if (flag == 0) {
      this.getAllIndividualProcessedAccommodation();
    }
  }
  // processedBatchWiseFormSubmit() {       // By  Piu on 05-08-2023
  //   var flag = 0;
  //   this.searchProcessedBatchForm.patchValue(
  //     {
  //       fromDate: this.fdProcessedBatch.nativeElement.value,
  //       toDate: this.tdProcessedBatch.nativeElement.value
  //     });
  //   if ((this.tdProcessedBatch.nativeElement.value != "") && (this.fdProcessedBatch.nativeElement.value > this.tdProcessedBatch.nativeElement.value)) {
  //     this.notificationService.showError("To Date Cann't be less than From Date !! Please provide actual date", "Error");
  //     flag = 1;
  //   }
  //   if (flag == 0) {
  //     this.getAllBatchWiseProcessedAccommodation();
  //   }
  // }

  processedBatchWiseFormSubmit() {          // By  Piu on 05-08-2023
    var flag = 0;
    this.searchProcessedBatchForm.patchValue(
      {
        fromDate: this.fdProcessedBatch.nativeElement.value,
        toDate: this.tdProcessedBatch.nativeElement.value
      });
    if (this.fdProcessedBatch.nativeElement.value.length > 0 && this.tdProcessedBatch.nativeElement.value.length > 0) {
      const [fday, fmonth, fyear] = this.fdProcessedBatch.nativeElement.value.split("/");
      const fdate = new Date(fyear, fmonth - 1, fday);
      const [tday, tmonth, tyear] = this.tdProcessedBatch.nativeElement.value.split("/");
      const tdate = new Date(tyear, tmonth - 1, tday);
      if (fdate > tdate) {
        this.notificationService.showError("To Date Can't be less than From Date !! Please provide actual date", "Error");
        flag = 1;
      }
    }
    if (flag == 0) {
      this.getAllBatchWiseProcessedAccommodation();
    }
  }
  onClickProccessedIndividualReset() {
    this.searchProcessedIndividualForm.reset();
    this.createProcessedIndividualSearchForm();
    this.getAllIndividualProcessedAccommodation();
  }
  onClickProccessedBatchwiseReset() {
    this.searchProcessedBatchForm.reset();
    this.createProcessedBatchSearchForm();
    this.getAllBatchWiseProcessedAccommodation();
  }
  getAllIndividualProcessedAccommodation() {
    this.processedAccommodationIndividual = [];
    this.SpinnerService.show();
    this.traininginchargeservice.getAllpendingAccommodationIndividual(this.searchProcessedIndividualForm.value).subscribe((result) => {
      if (result) {
        // console.log(result);
        this.processedAccommodationIndividual = result;
        this.processedAccommodationIndividual = this.processedAccommodationIndividual.filter(e => e.status == "Processed");
        // console.log("Processed List Individual", this.processedAccommodationIndividual);
        this.SpinnerService.hide();
      }
      else {
        this.processedAccommodationIndividual = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.loadDataTable3();
      this.loadTooltipMenu();
      this.SpinnerService.hide();
    });
  }
  getAllBatchWiseProcessedAccommodation() {
    this.processedAccommodationBatchWise = [];
    this.SpinnerService.show();
    this.traininginchargeservice.getAllpendingAccommodationBatchWise(this.searchProcessedBatchForm.value).subscribe((result) => {
      if (result) {
        this.processedAccommodationBatchWise = result;
        this.processedAccommodationBatchWise = this.processedAccommodationBatchWise.filter(e => e.status == "Processed");
        //console.log("Processed List Batch Wise", this.processedAccommodationBatchWise);
        this.SpinnerService.hide();
      }
      else {
        this.processedAccommodationBatchWise = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      // setTimeout(() => {
      this.loadDataTable4();
      // }, 1000)
      this.loadTooltipMenu();
      this.SpinnerService.hide();
    });
  }
  goToFillAccommodationByCandidate(record, parentTabName, childTabName) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTabAc', parentTabName);
    this.persistance.set('childActiveTabAc', childTabName);
    //  this._route.navigate(['/app/fill-accommodation'], { queryParams: { FillAccommodationFor: "Candidate", FillAccommodationForId: record.candidateId, FillAccommodationFromDate: record.dateFrom, FillAccommodationToDate: record.dateTo, CandidateName: record.candidateFullName, Location: record.inductionLocation, AccommodationDetailsId: record.candidateAccomodationDetailsId } });
    this._route.navigate(['/app/fill-accommodation'], { queryParams: { FillAccommodationFor: "Candidate", FillAccommodationForId: record.candidateId, FillAccommodationFromDate: record.dateFrom, FillAccommodationToDate: record.dateTo, CandidateName: record.candidateFullName, Location: record.inductionLocation } }); // By anif on 17-11-2023 as AccommodationDetailsId Not Required
  }
  goToFillAccommodationByBatch(record, parentTabName, childTabName) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTabAc', parentTabName);
    this.persistance.set('childActiveTabAc', childTabName);
    this._route.navigate(['/app/fill-accommodation'], { queryParams: { FillAccommodationFor: "Batch", FillAccommodationForId: record.batchId, FillAccommodationFromDate: record.dateFrom, FillAccommodationToDate: record.dateTo, Location: record.inductionLocation } });
  }
  onClicViewScheduleBatchWise(data, parentTabName, childTabName) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTabAc', parentTabName);
    this.persistance.set('childActiveTabAc', childTabName);
    this._route.navigate(['/app/view-schedule-details'], { queryParams: { InductionType: "Batch", IndictionTypeId: data.batchId, IndictionTypeNo: data.batchNo, InductionJoiningType: "B", CandidateInductionScheduleId: data.candidateInductionScheduleId, Mode: "View" } });

  }
  onClicViewScheduleDeatailsIndividual(data, parentTabName, childTabName) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTabAc', parentTabName);
    this.persistance.set('childActiveTabAc', childTabName);
    this._route.navigate(['/app/view-schedule-details'], { queryParams: { InductionType: "Candidate", IndictionTypeId: data.candidateId, IndictionTypeNo: data.candidateNo, InductionJoiningType: "I", CandidateInductionScheduleId: data.candidateInductionScheduleId, Mode: "View" } });
  }
  onClicViewAccommodationIndividual(data, parentTabName, childTabName) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTabAc', parentTabName);
    this.persistance.set('childActiveTabAc', childTabName);
    this._route.navigate(['/app/view-accommodation-details'], { queryParams: { EditAccommodationFor: "Candidate", EditAccommodationForId: data.candidateId, EditAccommodationForNo: data.candidateNo, InductionScheduleId: data.candidateInductionScheduleId, From: "Corporate" } });

  }
  onClicViewAccommodationBatchWise(data, parentTabName, childTabName) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTabAc', parentTabName);
    this.persistance.set('childActiveTabAc', childTabName);
    // this._route.navigate(['/view-accommodation-details'], { queryParams: { EditAccommodationFor: "Batch", EditAccommodationForId: data.batchId, EditAccommodationForNo: data.batchNo, InductionScheduleId: data.candidateInductionScheduleId, From: "Corporate" } });
    this._route.navigate(['/app/view-accommodation-details-batch'], { queryParams: { EditAccommodationFor: "Batch", EditAccommodationForId: data.batchId, EditAccommodationForNo: data.batchNo, InductionScheduleId: data.candidateInductionScheduleId, From: "Corporate", LocationId: data.inductionLocation } });
  }

}
