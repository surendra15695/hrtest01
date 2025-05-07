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
  selector: 'app-handholdingallocationplantcandidatelist',
  templateUrl: './handholdingallocationplantcandidatelist.component.html',
  styleUrls: ['./handholdingallocationplantcandidatelist.component.css']
})
export class HandholdingallocationplantcandidatelistComponent implements OnInit {
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
  isEdit:boolean=false;
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
    this.verticalId = 2;
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.createPendingSearchForm();
    this.createAllocatedSearchForm();
    this.createAllocateForm();
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
      allocationStatus: [0],
      verticalId: [this.verticalId],
      roleId: this.persistance.get('loggedinuser').roleIds,
      autoUserId: this.persistance.get('loggedinuser').autoUserId

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
      verticalId: [this.verticalId],
      roleId: this.persistance.get('loggedinuser').roleIds,
      autoUserId: this.persistance.get('loggedinuser').autoUserId
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
        "fixedColumns": {
          "left": 3
        }
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
    this.chandHoldingService.getHandHoldingAllocationList(this.searchformPending.value).subscribe((result) => {
      if (result) {
        this.allocationPendingList = result;
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
    this.chandHoldingService.getHandHoldingAllocationList(this.searchformAllocated.value).subscribe((result) => {
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
      this.loadDataTable2();
      this.SpinnerService.hide();
    });
  }


  onClickPendingTab() {
    this.isEdit=false;
    setTimeout(() => {
      this.createPendingSearchForm();
      this.getAllocationPendingList();
    }, 100);
  }
  onClickAllocatedTab() {
    this.isEdit=true;
    setTimeout(() => {
      this.createAllocatedSearchForm();
      this.getAllocationAllocatedList();
    }, 100);
  }

  // pendingFormSubmit() {                // By  Piu on 05-08-2023
  //   this.searchformPending.patchValue(
  //     {
  //       fromDate: this.fDatePending.nativeElement.value,
  //       toDate: this.tDatePending.nativeElement.value
  //     });
  //   this.getAllocationPendingList();
  // }

  pendingFormSubmit() {            // By  Piu on 05-08-2023
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
    //this.searchformPending.reset();
    this.createPendingSearchForm();
    this.searchformPending.patchValue({
      verticalId: this.defaultverticalId,
      allocationPendig: true,
    })
    this.getAllocationPendingList();
  }
  // allocatedFormSubmit() {         // By  Piu on 05-08-2023
  //   this.searchformAllocated.patchValue(
  //     {
  //       fromDate: this.fDateAllocated.nativeElement.value,
  //       toDate: this.tDateAllocated.nativeElement.value
  //     });
  //   this.getAllocationAllocatedList();
  // }


  allocatedFormSubmit() {  // By  Piu on 05-08-2023
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
    //this.searchformAllocated.reset();
    this.createAllocatedSearchForm()
    this.searchformAllocated.patchValue({
      verticalId: this.defaultverticalId,
      allocationPendig: false,
    })
    this.getAllocationAllocatedList();
  }

  onAllocateSingleCandidate(data) {
    this.saveform.patchValue({
      candidateId: data.candidateId,
      empNo: data.employeeNo
    })
    this.getAllAIC();
  }
  onReAllocateSingleCandidate(data) {
    this.getAllAIC();
    this.saveform.patchValue({
      candidateId: Number(data.candidateId),
      empNo: data.employeeNo
    })
    // this.saveform.value.candidateId=Number(data.candidateId);
    // this.saveform.value.empNo=data.employeeNo
    //sayandeep
  }
  getAllAIC() {
    this.aicList = [];
    if (this.verticalId == 1) {
      this.searchRoleUser.roleId = 50
    }
    if (this.verticalId == 2) {
      this.searchRoleUser.roleId = 51
    }
    if (this.verticalId == 3) {
      this.searchRoleUser.roleId = 52
    }
    this.SpinnerService.show();
    this.commonService.getRoleWiseUserhandhold(this.searchRoleUser).subscribe((result) => {
      if (result) {
        this.aicList = result;
      }
      else {
        this.aicList = [];
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  onAllocateCandidateToAIC() {
    if (this.saveform.value.autoUserId == null) {
      this.notificationService.showError("Please select AIC", "Error");
    } else {
      this.saveform.patchValue({
        createdBy: this.loginUserId
      })
      console.log(this.saveform.value);
      this.SpinnerService.show();
      this.chandHoldingService.allocateHandHolding(this.saveform.value).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.createPendingSearchForm();
            this.createAllocatedSearchForm();
            this.createAllocateForm();
            this.getAllocationPendingList();
            this.getAllocationAllocatedList();
            this.loadDataTable();
            jQuery("#myModal").modal("hide");
            jQuery("#chkAllPending").prop("checked", false);
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
  onClickCancel() {
    this.saveform.reset();
    this.getAllAIC();
  }

  gotoHRFeedback(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('candidateId', data.candidateId);
    this.persistance.set('empNo', data.employeeNo);
    this.persistance.set('empName', data.fullName);
    this.persistance.set('pagename', "plantcandidate");
    this._route.navigate(['/app/hr/candidate/hr-feedback']);
  }

  gotoHRReview(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('candidateId', data.candidateId);
    this.persistance.set('empNo', data.employeeNo);
    this.persistance.set('empName', data.fullName);
    this.persistance.set('pagename', "plantcandidate");
    this._route.navigate(['/app/hr/candidate/hr-review']);
  }

  gotoHandHoldingDocument(data){
    jQuery(".custom-menu").hide();
    this.persistance.set('candidateId', data.candidateId);
    this.persistance.set('empNo', data.employeeNo);
    this.persistance.set('empName', data.fullName);
    this.persistance.set('pagename', "plantcandidate");
    this._route.navigate(['/app/candidate/hand-holding-document']);
  }

}
