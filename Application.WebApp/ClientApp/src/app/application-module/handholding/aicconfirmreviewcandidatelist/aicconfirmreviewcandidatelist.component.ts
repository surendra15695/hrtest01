import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../interfaces/common/doctor.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../interfaces/common/function.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../interfaces/common/position.interface';
import { IHandholdingAllocationCandidateSearch, IHandholdingAllocationCandidate } from '../../../interfaces/handholding/handholding.interface';
import { LocationService } from '../../../services/common/location/location.service';
import { CommonService } from '../../../services/common/common/common.service';
import { FunctionService } from '../../../services/common/function/function.service';
import { PositionService } from '../../../services/common/position/position.service';
import { ShareddataService } from '../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../sharedservices/notification.service';
import { HandholdingService } from '../../../services/handholding/handholding.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
declare var jQuery: any;

@Component({
  selector: 'app-aicconfirmreviewcandidatelist',
  templateUrl: './aicconfirmreviewcandidatelist.component.html',
  styleUrls: ['./aicconfirmreviewcandidatelist.component.css']
})
export class AicconfirmreviewcandidatelistComponent implements OnInit {
  searchformPending: FormGroup;
  searchformAllocated: FormGroup;
  saveform: FormGroup;
  updateJoiningDateForm: FormGroup;
  @ViewChild('fromDatePending', { static: false }) fDatePending: ElementRef;
  @ViewChild('toDatePending', { static: false }) tDatePending: ElementRef;
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
  allocationPendingList: IHandholdingAllocationCandidate[] = [];
  allocationAllocatedList: IHandholdingAllocationCandidate[] = [];
  selectAllPending: boolean;
  selectAllAllocated: boolean;
  callngIfFunction: boolean = true;
  allocationType: string;
  sendToAllocationCandidateId: number;
  actionName: string;
  tabName: string;
  verticalId: number;
  selectedVertical: IVertical;
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
    this.persistance.set('candidateId', null);
    this.persistance.set('empNo', null);
    this.persistance.set('jobShadowReviewId', null);
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.getAllVerticals();
    this.createAllocatedSearchForm();
    this.createAllocateForm();
    this.getAllocatedCandidateList();
  }

  ngOnInit() {
    this.loadDataTable();
    this.loadDatePicker();
    this.tableOptionDropDown();

  }

  getAllVerticals() {
    this.verticals = [];
    var splitvertical = this.verticalIds.split(",");
    var allvertical = "";
    console.log(splitvertical);
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
    this.selectedVertical = this.verticals[0];
    this.defaultverticalId = this.selectedVertical.verticalId;
    this.getAllFunction();
    this.getAllLocation();
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
      reviewStatus: [0],
      verticalId: [this.defaultverticalId],
      autoUserId:[this.loginUserId],
      roleIds: this.persistance.get('loggedinuser').roleIds
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

  changePendingVertical() {    
    this.getAllFunction();
    this.getAllLocation();
  }

  getAllLocation() {
    this.locations = [];
    this.SpinnerService.show();
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
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }

  //Function
  getAllFunction() {
    this.functions = [];
    this.SpinnerService.show();
    this.searchFunction.verticalId = this.selectedVertical.verticalId;
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
      jQuery('#dataTable1').dataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "fixedColumns": {
          "left": 3
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

  
  getAllocatedCandidateList() {
    this.SpinnerService.show();
    this.chandHoldingService.getAllAICAllocatedConfirmationList(this.searchformAllocated.value).subscribe((result) => {
      if (result) {
        this.allocationAllocatedList = result;
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
      this.loadDataTable();
      this.SpinnerService.hide();
    });
  }

  // filterFormSubmit() {                // By  Piu on 05-08-2023
  //   this.searchformAllocated.patchValue(
  //     {
  //       fromDate: this.fDatePending.nativeElement.value,
  //       toDate: this.tDatePending.nativeElement.value
  //     });
  //     console.log(this.searchformAllocated.value);
  //   this.getAllocatedCandidateList();
  // }
  filterFormSubmit() {                // By  Piu on 05-08-2023
    var flag = 0
    this.searchformAllocated.patchValue(
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
      //console.log(this.searchformAllocated.value);
      this.getAllocatedCandidateList();
    }
  }

  formResetClick() {
    // this.searchformAllocated.reset();
    // this.searchformAllocated.patchValue({
    //   verticalId: this.defaultverticalId,
    // })
    this.createAllocatedSearchForm()
    this.getAllocatedCandidateList();
  }

  gotoConfirmationReview(data)
  {
    this.persistance.set('candidateId', data.candidateId);
    this.persistance.set('empNo', data.employeeNo);
    this.persistance.set('empName', data.fullName);
    this.persistance.set('confirmationReviewId', data.confirmationReviewId);
    this.persistance.set('pagename', "aicconfirmationreview");
    this._route.navigate(['/app/aic/candidate/confirmation-review']);
  }

}
