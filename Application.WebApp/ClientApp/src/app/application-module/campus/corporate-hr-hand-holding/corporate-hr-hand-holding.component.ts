import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ISearchFunction, IVerticalFunction } from 'src/app/interfaces/common/function.interface';
import { IHandholdingAllocationCandidate } from 'src/app/interfaces/handholding/handholding.interface';
import { CommonService } from 'src/app/services/common/common/common.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { LocationService } from 'src/app/services/common/location/location.service';
import { HandholdingService } from 'src/app/services/handholding/handholding.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
declare var jQuery: any;

@Component({
  selector: 'app-corporate-hr-hand-holding',
  templateUrl: './corporate-hr-hand-holding.component.html',
  styleUrls: ['./corporate-hr-hand-holding.component.css']
})
export class CorporateHrHandHoldingComponent implements OnInit {
  searchformPending: FormGroup;
  searchformAllocated: FormGroup;
  saveform: FormGroup;
  @ViewChild('dateOfJoining', { static: false }) dtOfJoining: ElementRef;
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  @ViewChild('fromDateAllocated', { static: false }) fDateAllocated: ElementRef;
  @ViewChild('toDateAllocated', { static: false }) tDateAllocated: ElementRef;
  isEdit:boolean=false;
  verticalId: number;
  defaultverticalId: number;
  loginUserId: number;
  locations: ILocation[] = [];
  aicList: any[] = [];
  searchRoleUser: any = {
    roleId: 0
  }
  allocationPendingList: IHandholdingAllocationCandidate[] = [];
  allocationAllocatedList: IHandholdingAllocationCandidate[] = [];
  searchLocation: ISearchLocation =
    {
      locationId: null,
      verticalId: null,
      locationCode: null,
      locationNo: null,
      isActive: true
    };
    functions: IVerticalFunction[] = [];
    searchFunction: ISearchFunction = {
      verticalId: null,
      functionId: null,
      isActive: true
    }

  constructor(private fb: FormBuilder,
    private functionService: FunctionService,
    private locationService: LocationService,
    private SpinnerService: NgxSpinnerService,
    private chandHoldingService: HandholdingService,
    private commonService: CommonService,
    private notificationService: NotificationService,
    private persistance: PersistanceService,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) {
    this.verticalId = 1;
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.createPendingSearchForm();
    this.createAllocatedSearchForm();
    this.getAllLocation();
    this.getAllFunction();
    this.getAllocationPendingList();
    this.createAllocateForm();
   }

  ngOnInit() {
    this.loadDatePicker();
    this.loadDataTable();
    this.loadDataTable2();
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
  loadPopover() {
    setTimeout(() => {
      jQuery('[data-toggle="popover"]').popover({
        html: true
      });
    });
  }
  onClickPendingTab() {
    this.isEdit=false;
    setTimeout(() => {
      this.createPendingSearchForm();
      this.getAllocationPendingList();
    }, 100);
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
  onClickAllocatedTab() {
    this.isEdit=true;
      setTimeout(() => {
        this.createAllocatedSearchForm();
        this.getAllocationAllocatedList();
      }, 100);
  }
  allocatedResetClick() {
    this.searchformAllocated.reset();
    this.searchformAllocated.patchValue({
      verticalId: this.defaultverticalId,
      allocationPendig: false,
    })
    this.getAllocationAllocatedList();
  }
  pendingFormSubmit() {
    this.searchformPending.patchValue(
      {
        fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,
      });
    this.getAllocationPendingList();
  }
  pendingResetClick() {
    this.searchformPending.reset();
    this.searchformPending.patchValue({
      verticalId: this.defaultverticalId,
      allocationPendig: true,
    })
    this.getAllocationPendingList();
  }
  allocatedFormSubmit() {
    this.searchformAllocated.patchValue(
      {
        fromDate: this.fDateAllocated.nativeElement.value,
        toDate: this.tDateAllocated.nativeElement.value
      });
    this.getAllocationAllocatedList();
  }
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }
  onFeedback(data)
  {
    jQuery(".custom-menu").hide();
    this.persistance.set('candidateId', data.candidateId);
    this.persistance.set('empid', data.employeeNo);
    this.persistance.set('empName', data.fullName);
    this.persistance.set('pagename', "corporatehrhandholding");
    this.router.navigateByUrl('/hr/candidate/hr-feedback')
  }
  onReassign(data)
  {
    this.saveform.patchValue({
      candidateId: data.candidateId,
      empNo: data.employeeNo
    })
    this.getAllAIC();
  }
  getAllAIC () {
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
    this.commonService.getRoleWiseUser(this.searchRoleUser).subscribe((result) => {
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
  getAllocationPendingList() {
    this.SpinnerService.show();
    console.log(this.searchformPending.value);
    this.chandHoldingService.getAllHandHoldingAllocationList(this.searchformPending.value).subscribe((result) => {
      if (result) {
        this.allocationPendingList = result;
        console.log("check",this.allocationPendingList)
        this.allocationPendingList = result.filter( e => e.feedbackId==0);
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
    this.chandHoldingService.getAllHandHoldingAllocationList(this.searchformAllocated.value).subscribe((result) => {
      console.log("find",result)
      if (result) {
        this.allocationAllocatedList = result.filter(e => e.feedbackId > 0);
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
  onSubmitmodal()
  {
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
            this.createAllocateForm();
            this.getAllocationPendingList();
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
  createAllocateForm() {
    this.saveform = this.fb.group({
      candidateId: [0],
      empNo: [''],
      autoUserId: null,
      createdBy: [this.loginUserId]
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
      allocationStatus: [1],
      verticalId: [this.verticalId]
    });
  }

}
