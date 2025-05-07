import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../../interfaces/common/vertical.interface';
import { IStatus } from '../../../../../interfaces/common/common.interface';
import { ILocation, ISearchLocation } from '../../../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction } from '../../../../../interfaces/common/function.interface';
import { IFunctionDepartment, ISearchDepartment } from '../../../../../interfaces/common/department.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../../interfaces/common/position.interface';
import { ISearchRequisition, IRequisitionList } from '../../../../../interfaces/preselection/requisition.interface';
import { LocationService } from '../../../../../services/common/location/location.service';
import { CommonService } from '../../../../../services/common/common/common.service';
import { FunctionService } from '../../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../../services/common/department/department.service';
import { PositionService } from '../../../../../services/common/position/position.service';
import { RequisitionService } from '../../../../../services/preselection/requisition/requisition.service';
import { ShareddataService } from '../../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { environment } from '../../../../../../environments/environment';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { ToastrService } from 'ngx-toastr';
declare var jQuery: any;
declare var html2pdf: any;

@Component({
  selector: 'app-planthiringmanagerrequisitionlist',
  templateUrl: './planthiringmanagerrequisitionlist.component.html',
  styleUrls: ['./planthiringmanagerrequisitionlist.component.css']
})
export class PlanthiringmanagerrequisitionlistComponent implements OnInit {
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  @ViewChild('closeModal', { static: false }) cModal: ElementRef;
  private apppath = environment.apppath;
  searchform: FormGroup;
  saveform: FormGroup;
  //vertical
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  StaticVerticalId: number = 2;
  //location
  locations: ILocation[] = [];
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
  requisitionDetailHistoryId: number;
  positionName: string;
  verticalIds: string;
  selectedVerticalId: number;
  // Anif
  requisitionDetailsArrayPopup: any[] = [];
  loggedInUserRoleIds: string;
  moduleId: number;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private commonService: CommonService,
    private requisitionService: RequisitionService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
  ) {
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.loggedInUserRoleIds = this.persistance.get('loggedinuser').roleIds;
    this.moduleId = this.persistance.get('moduleId');
    localStorage.removeItem('pagename');
    localStorage.removeItem('id');
    this.createForm();
    this.getCurrentVerticals();
    this.createSaveForm();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllStatus();
  }

  getCurrentVerticals() {
    this.verticals = [];
    var splitvertical = this.verticalIds.split(",");
    var allvertical = "";
    // console.log(splitvertical);
    // for (var i = 0; i < splitvertical.length; i++) {                                 // Section been commented on 03-08-2022 by anif as this is not required as corporate means vertical id will be 1
    //   if (splitvertical[i] != "0") {                                                 // issue coming in multiple vertical HM
    //     if (splitvertical[i] == "1") {
    //       this.selectedVerticalId = 1
    //     }
    //     else if (splitvertical[i] == "2") {
          this.selectedVerticalId = 2
    //     }
    //     else if (splitvertical[i] == "3") {
    //       this.selectedVerticalId = 3
    //     }
    //   }

    // }
  }

  ngOnInit() {
    this.loadDatePicker();
    this.loadDataTable();
    this.loadTooltipMenu();
    setTimeout(() => {
      this.fromSubmit();
    }, 100);
  }

  createForm() {
    this.searchform = this.fb.group({
      requisitionNo: [''],
      verticalId: [1],
      locationId: [0],
      fromDate: [''],
      toDate: [''],
      iOMNo: [''],
      requisitionActionStatus: [0],
      createdBy: [0],
      loggedInUserRoleIds: this.loggedInUserRoleIds, 
      moduleId: this.moduleId  
    });
  }

  createSaveForm() {
    this.saveform = this.fb.group({
      RequisitionDetailHistoryId: [0],
      Remarks: [''],
      StatusId: [0],
      CreatedBy: [0]
    });
  }

  //verticals
  getAllVerticals() {
    this.verticals = [];
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    //this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true});
    //this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    //this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    this.loadSelectPicker();
    this.selectedVertical = this.verticals.filter(x => x.verticalId == 0)[0];
  }

  changeVertical() {
    var verticalId = this.searchform.get("verticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0];
    this.getAllLocation();
  }

  //locations
  getAllLocation() {
    this.locations = [];
    this.searchLocation.verticalId = this.StaticVerticalId;
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
      this.loadSelectPicker();
    });
  }

  //status
  getAllStatus() {
    this.statuses = [];
    this.commonService.getAllStatus().subscribe((result) => {
      if (result) {
        this.statuses = result.filter(x => x.statusTypeId == 1);
        this.statuses.splice(0, 0, {
          statusId: 0,
          statusName: "All",
          statusTypeId: 1,
          statusTypeName: "RequisitionApprovalStatus",
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
      this.loadSelectPicker();
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
        "order": [],
        "fixedColumns": 
        {"left": 3}
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

  // fromSubmit() {
  //   this.searchform.patchValue(
  //     {
  //       verticalId: this.selectedVerticalId,
  //       fromDate: this.fDate.nativeElement.value,
  //       toDate: this.tDate.nativeElement.value
  //     });
  //   console.log(this.searchform.value);
  //   this.requisitionService.getAllRequisitionForHM(this.searchform.value).subscribe((result) => {
  //     if (result) {
  //       console.log(result);
  //       this.requisitionLists = result.filter(x => x.hiringManagerAutoUserId == this.loginUserId);
  //       this.requisitionLists = this.requisitionLists.filter(x => x.hiringManagerAutoUserId == this.loginUserId);
  //       if (this.searchform.value.requisitionActionStatus == 1) {
  //         this.requisitionLists = this.requisitionLists.filter(x => x.hmPendingStatusCount > 0);
  //       }
  //       this.loadDataTable();
  //     }
  //     else {
  //       this.requisitionLists = [];
  //     }
  //   }, error => {
  //     console.log(error);
  //   }, () => {
  //     this.loadSelectPicker();
  //   });
  // }
  fromSubmit() {
    var flag = 0;
    this.searchform.patchValue(
      {
        verticalId: this.selectedVerticalId,
        fromDate: this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value
      }
    );
    //console.log(this.searchform.value);
    if(this.fDate.nativeElement.value.length > 0 && this.tDate.nativeElement.value.length > 0){
      const [fDay, fMonth, fYear] = this.fDate.nativeElement.value.split("/");
      const fDate = new Date(fYear, fMonth - 1, fDay);
      const [tDay, tMonth, tYear] = this.tDate.nativeElement.value.split("/");
      const tDate = new Date(tYear, tMonth - 1, tDay);
      if(fDate > tDate){
        this.notificationService.showError("To Date Cann't be less than from From Date !! Please provide actual date", "Error");
        flag = 1;
      }
    }
    if(flag == 0){
      this.requisitionService.getAllRequisitionForHM(this.searchform.value).subscribe((result) => {
        if (result) {
          this.requisitionLists = result.filter(x => x.hiringManagerAutoUserId == this.loginUserId);
          this.requisitionLists = this.requisitionLists.filter(x => x.hiringManagerAutoUserId == this.loginUserId);
          if (this.searchform.value.requisitionActionStatus == 1) {
            this.requisitionLists = this.requisitionLists.filter(x => x.hmPendingStatusCount > 0);
          }
          this.loadDataTable();
        }
        else {
          this.requisitionLists = [];
        }
      }, error => {
        console.log(error);
      }, () => {
        this.loadSelectPicker();
      });
    }
  }

  reset() {
    this.searchform.reset();
    this.searchform.patchValue({
      locationId: 0,
      requisitionApprovalStatus: 0
    })
    this.loadSelectPicker();
    this.requisitionLists = [];
    this.loadDataTable();
    this.fromSubmit();
  }

  gotoCandidateList(id,hrStatus, functionId, data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "planthiringmanagerrequisitionlist");
    this.persistance.set('paramid', id);
    this.persistance.set('functionId', functionId);
    this.persistance.set('hrStatus', hrStatus);
    this._route.navigate(['/app/my-action/all-requisition/candidate-list']);
  }

  DownloadJD(docData, filename) {
    var htmlstring = docData;
    var dom = document.createElement('div');
    dom.innerHTML = htmlstring;
    html2pdf(dom, {
      margin: 10,
      filename: filename + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      //html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      html2canvas: { scale: 3, y: 0, scrollY: 0 },
      //jsPDF: { format: 'A4' },
      //jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      jsPDF: { format: 'A4' },
    });
  }
  // Anif

  onClickRequisitionNo(record: any) {
    this.requisitionDetailsArrayPopup = [];
    this.requisitionDetailsArrayPopup.push(record);
    //console.log("requesition Details", this.requisitionDetailsArrayPopup);
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
}
