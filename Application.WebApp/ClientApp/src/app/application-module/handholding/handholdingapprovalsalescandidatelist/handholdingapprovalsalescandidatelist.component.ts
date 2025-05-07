import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ILocation, ISearchLocation } from 'src/app/interfaces/common/location.interface';
import { ISearchFunction, IVerticalFunction } from 'src/app/interfaces/common/function.interface';
import { ShareddataService } from 'src/app/sharedservices/shareddata.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { LocationService } from 'src/app/services/common/location/location.service';
import { CommonService } from 'src/app/services/common/common/common.service';
import { HandholdingService } from 'src/app/services/handholding/handholding.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { PositionService } from 'src/app/services/common/position/position.service';
declare var jQuery: any;
@Component({
  selector: 'app-handholdingapprovalsalescandidatelist',
  templateUrl: './handholdingapprovalsalescandidatelist.component.html',
  styleUrls: ['./handholdingapprovalsalescandidatelist.component.css']
})
export class HandholdingapprovalsalescandidatelistComponent implements OnInit {
  searchformPending: FormGroup;
  searchformAllocated: FormGroup;
  saveform: FormGroup;
  updateJoiningDateForm: FormGroup;
  @ViewChild('dateOfJoining', { static: false }) dtOfJoining: ElementRef;
  @ViewChild('fromDatePending', { static: false }) fDatePending: ElementRef;
  @ViewChild('toDatePending', { static: false }) tDatePending: ElementRef;
  @ViewChild('fromDateAllocated', { static: false }) fDateAllocated: ElementRef;
  @ViewChild('toDateAllocated', { static: false }) tDateAllocated: ElementRef;
  //vertical
  verticals: IVertical[] = [];
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

  aicList: any[] = [];
  searchRoleUser: any = {
    roleId: 0
  }
  loginUserId: number;
  verticalIds: string;
  allocationPendingList: any[] = [];
  allocationAllocatedList: any[] = [];
  selectAllPending: boolean;
  selectAllAllocated: boolean;
  callngIfFunction: boolean = true;
  allocationType: string;
  sendToAllocationCandidateId: number;
  actionName: string;
  tabName: string;
  verticalId: number;

  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private functionService: FunctionService,
    private commonService: CommonService,
    private chandHoldingService: HandholdingService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private titleService: Title,
    private positionService: PositionService
  ) { 
    this.verticalId = 3;
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.createPendingSearchForm();
    this.createAllocatedSearchForm();
    this.getAllLocation();
    this.getAllFunction();
    this.getAllocationPendingList();
  }

  ngOnInit() {
    this.loadDataTable();
    this.loadDataTable2();
    this.loadDatePicker();
    this.tableOptionDropDown();
    this.loadPopover();
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
        jQuery(e.target).append(dropdownMenu.detach());
        jQuery(e.target).find('.custom-menu').hide();
      });
    });
  }
  tableOptionDropDown() {
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
        'font-size': '13px'
      });
      dropdownMenu.addClass("mobPosDropdown");
    });
    table_responsive.on('hide.bs.dropdown', function (e) {
      jQuery(e.target).append(dropdownMenu.detach());
      dropdownMenu.hide();
    });
  }
  createPendingSearchForm() {
    this.searchformPending = this.fb.group({
      empId: [''],
      empName: [''],
      empStatus: [0],
      fromDate: [''],
      toDate: [''],
      locationId: [0],
      functionId: [0],
      probationId: [0],
      verticalId: [this.verticalId]
    });
  }
  createAllocatedSearchForm() {
    this.searchformAllocated = this.fb.group({
      empId: [''],
      empName: [''],
      empStatus: [0],
      fromDate: [''],
      toDate: [''],
      locationId: [0],
      functionId: [0],
      probationId: [0],
      allocationStatus: [1],
      verticalId: [this.verticalId]
    });
  }
  createAllocateForm() {
    this.saveform = this.fb.group({
      candidateId: [0],
      empNo: [''],
      autoUserId: null,
      createdBy: [this.loginUserId]
    });
  }

  //location
  getAllLocation() {
    this.locations = [];
    this.SpinnerService.show();
    this.searchLocation.verticalId = this.verticalId;
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
    this.searchFunction.verticalId = this.verticalId;
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        console.log(result);
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
  loadDataTable() {
    // jQuery('#dataTable1').DataTable().clear().destroy();
    jQuery('#dataTable1').dataTable().fnClearTable();
    jQuery('#dataTable1').dataTable().fnDestroy();
    setTimeout(() => {
      // jQuery('#dataTable1').DataTable({
      //   "searching": false,
      //   "paging": true,
      //   "scrollX": true,
      //   "bLengthChange": false,
      // });
      jQuery('#dataTable1').dataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
      });
    });
  }
  loadDataTable2() {
    // jQuery('#dataTable2').DataTable().clear().destroy();
    jQuery('#dataTable2').dataTable().fnClearTable();
    jQuery('#dataTable2').dataTable().fnDestroy();
    setTimeout(() => {
      // jQuery('#dataTable2').DataTable({
      //   "searching": false,
      //   "paging": true,
      //   "scrollX": true,
      //   "bLengthChange": false,
      // });
      jQuery('#dataTable2').dataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
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
  // loadDatePicker2() {
  //   jQuery(".datepicker1").parent(".input-group").datepicker({
  //     autoclose: true,
  //     format: "dd/mm/yyyy",
  //     todayHighlight: true
  //   });
  // }
  loadPopover() {
    setTimeout(() => {
      jQuery('[data-toggle="popover"]').popover({
        html: true
      });
    });
  }
  getAllocationPendingList() {
    this.SpinnerService.show();
    console.log(this.searchformPending.value);
    this.chandHoldingService.getAllHandholdingApproverPendingList(this.searchformPending.value).subscribe((result) => {
      if (result) {
        this.allocationPendingList = result;
        //this.allocationPendingList=this.allocationPendingList.filter(x=>x.reviewStatus !=2);
        this.SpinnerService.hide();
      }
      else {
        this.allocationPendingList = [];
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
  getAllocationAllocatedList() {
    this.SpinnerService.show();
    this.chandHoldingService.getAllHandholdingApproverAllocatedList(this.searchformAllocated.value).subscribe((result) => {
      if (result) {
        this.allocationAllocatedList = result;
        console.log("List",this.allocationAllocatedList)
        //this.allocationAllocatedList=this.allocationAllocatedList.filter(x=>x.reviewStatus==2);
        this.SpinnerService.hide();
      }
      else {
        this.allocationAllocatedList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.loadDataTable2();
      this.SpinnerService.hide();
    });
  }
  onClickPendingTab() {
    setTimeout(() => {
      this.createPendingSearchForm();
      this.getAllocationPendingList();
    }, 100);
  }
  onClickAllocatedTab() {
    setTimeout(() => {
      this.createAllocatedSearchForm();
      this.getAllocationAllocatedList();
    }, 100);
  }
  // pendingFormSubmit() {               // By  Piu on 05-08-2023
  //   this.searchformPending.patchValue(
  //     {
  //       fromDate: this.fDatePending.nativeElement.value,
  //       toDate: this.tDatePending.nativeElement.value
  //     });
  //   this.getAllocationPendingList();
  // }
  pendingFormSubmit() {              // By  Piu on 05-08-2023
    var flag = 0
    this.searchformPending.patchValue(
      {
        fromDate: this.fDatePending.nativeElement.value,
        toDate: this.tDatePending.nativeElement.value
      });
    if (this.fDatePending.nativeElement.value.length > 0 && this.tDatePending.nativeElement.value.length > 0) {
      const [fday, fmonth, fyear] = this.fDatePending.nativeElement.value.split("/");
      const fdate = new Date(fyear, fmonth - 1, fday);
      const [tday, tmonth, tyear] = this.tDatePending.nativeElement.value.split("/");
      const tdate = new Date(tyear, tmonth - 1, tday);
      if (fdate > tdate) {
        this.notificationService.showError("To Date Can't be less than From Date !! Please provide actual date", "Error");
        flag = 1;
      }
    }
    if (flag == 0) {
      this.getAllocationPendingList();
    }
  }
  pendingResetClick() {
    this.searchformPending.reset();
    this.searchformPending.patchValue({
      verticalId: this.defaultverticalId,
      allocationPendig: true,
    })
    this.getAllocationPendingList();
  }
  // allocatedFormSubmit() {    // By  Piu on 05-08-2023
  //   this.searchformAllocated.patchValue(
  //     {
  //       fromDate: this.fDateAllocated.nativeElement.value,
  //       toDate: this.tDateAllocated.nativeElement.value
  //     });
  //   this.getAllocationAllocatedList();
  // }
  allocatedFormSubmit() {   // By  Piu on 05-08-2023
    var flag = 0
    this.searchformAllocated.patchValue(
      {
        fromDate: this.fDateAllocated.nativeElement.value,
        toDate: this.tDateAllocated.nativeElement.value
      });
    if (this.fDateAllocated.nativeElement.value.length > 0 && this.tDateAllocated.nativeElement.value.length > 0) {
      const [fday, fmonth, fyear] = this.fDateAllocated.nativeElement.value.split("/");
      const fdate = new Date(fyear, fmonth - 1, fday);
      const [tday, tmonth, tyear] = this.tDateAllocated.nativeElement.value.split("/");
      const tdate = new Date(tyear, tmonth - 1, tday);
      if (fdate > tdate) {
        this.notificationService.showError("To Date Can't be less than From Date !! Please provide actual date", "Error");
        flag = 1;
      }
    }
    if (flag == 0) {
      this.getAllocationAllocatedList();
    }
  }
  allocatedResetClick() {
    this.searchformAllocated.reset();
    this.searchformAllocated.patchValue({
      verticalId: this.defaultverticalId,
      allocationPendig: false,
    })
    this.getAllocationAllocatedList();
  }
  gotoHandholdingForms(data){
    jQuery(".custom-menu").hide();
    this.persistance.set('candidateId', data.candidateId);
    this.persistance.set('empNo', data.employeeNo);
    this.persistance.set('empName', data.fullName);
    this.persistance.set('verticalId', this.verticalId);
    console.log("XXXX", data.fullName)
    this.persistance.set('pagename', "handholdingSalesApprovalList")
    this._route.navigate(['/app/candidate/hand-holding-document']);
  }

}
