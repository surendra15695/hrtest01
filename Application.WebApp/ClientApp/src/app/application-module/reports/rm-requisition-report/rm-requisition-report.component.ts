import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { IStatus } from '../../../interfaces/common/common.interface';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { LocationService } from '../../../services/common/location/location.service';
import { CommonService } from '../../../services/common/common/common.service';
import { RequisitionService } from '../../../services/preselection/requisition/requisition.service';
import { ShareddataService } from '../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ExcelService } from 'src/app/services/excel/excel.service';
import { IRequisitionList } from 'src/app/interfaces/preselection/requisition.interface';
import { VerticalService } from 'src/app/services/common/vertical/vertical.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
declare var jQuery: any;

@Component({
  selector: 'app-rm-requisition-report',
  templateUrl: './rm-requisition-report.component.html',
  styleUrls: ['./rm-requisition-report.component.css']
})

export class RmRequisitionReportComponent implements OnInit {
  pageTitle: string = "Requisition List";
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  searchform: FormGroup;
  //vertical
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  //location
  locations: ILocation[] = [];
  VerticalRMList: any[] = [];
  selectedLocation: ILocation;
  selectedLocationCode: string = "";
  selectedLocationOffice: string = "";
  searchLocation: ISearchLocation =
    {
      locationId: null,
      verticalId: null,
      locationCode: null,
      locationNo: null,
      isActive: true
    };
  locationId: number;
  //status
  statuses: IStatus[] = [];
  selectedStatus: IStatus;
  //requisition list
  requisitionLists: IRequisitionList[] = [];
  loginUserId: number;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private commonService: CommonService,
    private requisitionService: RequisitionService,
    private persistance: PersistanceService,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
    private verticalService: VerticalService,
    private notiService: NotificationService,
    private excelService: ExcelService
  ) {
    this.SpinnerService.show();
    this.titleService.setTitle(this.pageTitle);
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    localStorage.removeItem('pagename');
    localStorage.removeItem('id');
    this.createForm();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllStatus();
  }

  ngOnInit() {
    this.loadDatePicker();
    this.loadDataTable();
    this.loadTooltipMenu();
  }

  createForm() {
    this.searchform = this.fb.group({
      requisitionNo: [''],
      verticalId: [0],
      locationId: [0],
      fromDate: [''],
      toDate: [''],
      iOMNo: [''],
      AutoUserId: [null],
      requisitionProcessStatus: [0],
      allocatedAutoUserId: [0]
    });
  }

  //verticals
  getAllVerticals() {
    this.verticals = [];
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    this.selectedVertical = this.verticals.filter(x => x.verticalId == 0)[0];
  }

  changeVertical(VerticalID: any) {
    debugger
    var verticalId = this.searchform.get("verticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0];
    console.log(this.selectedVertical);
    this.getAllLocation();

    let data: any = {
      "verticalId": VerticalID
    }

    this.getAllVerticalRM(data);
  }

  //locations
  getAllLocation() {
    this.locations = [];
    this.searchLocation.verticalId = this.selectedVertical.verticalId;
    this.locationService.getAllLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        this.locations = result;
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
      //this.loadSelectPicker();
    });
  }

  //status
  getAllStatus() {
    this.statuses = [];
    this.commonService.getAllStatus().subscribe((result) => {
      if (result) {
        this.statuses = result.filter(x => x.statusTypeId == 3);
        this.statuses.splice(0, 0, {
          statusId: 0,
          statusName: "All",
          statusTypeId: 3,
          statusTypeName: "RequisitionProcessStatus",
          statusIcon: ""
        })
      }
      else {
        this.statuses = [];
        this.statuses.splice(0, 0, {
          statusId: 0,
          statusName: "All",
          statusTypeId: 2,
          statusTypeName: "RequisitionProcessStatus",
          statusIcon: ""
        })
      }
    }, error => {
      console.log(error);
    }, () => {
      //this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }

  loadSelectPicker() {
    setTimeout(() => {
      jQuery('.selectpicker').selectpicker({
        size: 6
      });
      jQuery('.selectpicker').selectpicker('refresh');
    });
  }

  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }

  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
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

      });
    });
  }

  fromSubmit() {
    this.searchform.patchValue(
    {
      fromDate: this.fDate.nativeElement.value,
      toDate: this.tDate.nativeElement.value,
      allocatedAutoUserId: this.loginUserId
    });
    this.SpinnerService.show();
    this.requisitionService.getAllRequisition(this.searchform.value).subscribe((result) => {
      if (result) {
        this.requisitionLists = result;
        this.loadDataTable();
        this.SpinnerService.hide();
      }
      else {
        this.requisitionLists = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }

  gotoAllocateToSourceChannel(id) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "rmrequisitionlist");
    this.persistance.set('paramid', id);
    this._route.navigate(['/app/my-action/all-positions/allocate-to-source-channel']);
  }

  gotoStopSourceChannel(id) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "rmrequisitionlist");
    this.persistance.set('paramid', id);
    this._route.navigate(['/app/my-action/all-positions/stop-source-channel']);
  }

  gotoCandidateList(id) {
    jQuery(".custom-menu").hide();
    setTimeout(() => {
      this.persistance.set('pagename', "rmrequisitionlist");
      this.persistance.set('paramid', id);
      this._route.navigate(['/app/my-action/all-positions/candidate-list']);
    });
  }

  gotoAddCandidate(id) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "rmrequisitionlist");
    this.persistance.set('paramid', id);
    this._route.navigate(['/app/rmrequisitionlist/addcandidate']);
  }

  reset() {
    this.searchform.reset();
    this.searchform.patchValue({
      verticalId: 0,
      locationId: 0,
      requisitionProcessStatus: 0
    })
    //this.loadSelectPicker();
    this.requisitionLists = [];
    this.loadDataTable();
  }

  viewIOM(pathval) {
    window.open("/viewpdf?q=" + "" + pathval, "blank");
  }

  gotoSubmitTestResult(requisitionDetailId) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "rmrequisitionlist");
    this.persistance.set('paramid', requisitionDetailId);
    this._route.navigate(['/app/my-action/all-requisition/requisition/submit-test-result']);
  }

  getAllVerticalRM(data: any) {
    this.verticalService.getAllVerticalRM(data).subscribe((response: any) => {
      if (response) {
        this.VerticalRMList = response;
        console.log("Vertical RM List: ", this.VerticalRMList);
      }
      else {
        this.VerticalRMList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }

  ExportReport(){
    this.excelService.ExportAsExcelFile(this.requisitionLists, 'RequisitionReport_')
  }
}
