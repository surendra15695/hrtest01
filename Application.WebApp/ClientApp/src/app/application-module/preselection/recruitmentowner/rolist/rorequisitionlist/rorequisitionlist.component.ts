import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../../interfaces/common/vertical.interface';
import { IStatus } from '../../../../../interfaces/common/common.interface';
import { ILocation, ISearchLocation } from '../../../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction } from '../../../../../interfaces/common/function.interface';
import { IFunctionDepartment, ISearchDepartment } from '../../../../../interfaces/common/department.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../../interfaces/common/position.interface';
import { ISearchRequisition, IRequisitionList, ISearchMergeRequisitionList, IMergeRequisitionDetailsList, IDeleteBeforeRequisitionFormData, IHoldPositionRequisition } from '../../../../../interfaces/preselection/requisition.interface';
import { LocationService } from '../../../../../services/common/location/location.service';
import { CommonService } from '../../../../../services/common/common/common.service';
import { FunctionService } from '../../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../../services/common/department/department.service';
import { PositionService } from '../../../../../services/common/position/position.service';
import { RequisitionService } from '../../../../../services/preselection/requisition/requisition.service';
import { ShareddataService } from '../../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { SharedcomponentdataService } from '../../../../../sharedservices/sharedcomponentdata.service';
import { environment } from '../../../../../../environments/environment';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
declare var jQuery: any;
declare var html2pdf: any;

@Component({
  selector: 'app-rorequisitionlist',
  templateUrl: './rorequisitionlist.component.html',
  styleUrls: ['./rorequisitionlist.component.css']
})
export class RorequisitionlistComponent implements OnInit {
  pageTitle: string = "Requisition List";
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  @ViewChild('closeModal', { static: false }) cModal: ElementRef;
  private apppath = environment.apppath;
  searchform: FormGroup;
  updateHoldForm = new FormGroup({
    Name: new FormControl('')
  });;
  deleteRequisitionFormData: IDeleteBeforeRequisitionFormData = {
    DataId: null,
    TypeId: null,
    CreatedBy: null
  }
  //vertical
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  //functions
  functions: IVerticalFunction[] = [];
  selectedFunction: IVerticalFunction;
  searchFunction: ISearchFunction =
    {
      verticalId: null,
      functionId: null,
      isActive: true
    };
  functionId: number;
  functionName: string;
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
  verticalIds: string;
  mergeRequisitionDetailId: number;
  mergeRequisitionType: string;
  serarchMergeRequisitionList: ISearchMergeRequisitionList = {
    requisitionDetailId: null,
    requisitionType: null
  }
  mergeRequisitionList: IMergeRequisitionDetailsList[] = [];
  isResignationTable: boolean = false;
  isSuccessionPlanTable: boolean = false;
  isTransferTable: boolean = false;
  requisitionType: number;
  searchHoldRequisition: IHoldPositionRequisition = {
    requisitionDetailId: null,
    requisitionNo: null,
    onHold: false
  };
  createdBy: number;
  //Anif
  requisitionDetailsArrayPopup: any[] = [];
  moduleId: number;
  loggedInUserRoleIds: string;

  pagValue: number;
  displaystart: number;
  previousValues: any = {};
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private functionService: FunctionService,
    private commonService: CommonService,
    private requisitionService: RequisitionService,
    private persistance: PersistanceService,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private sharedDataComponentService: SharedcomponentdataService
  ) {
    this.SpinnerService.show();
    localStorage.removeItem('pagename');
    localStorage.removeItem('id');
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.moduleId = this.persistance.get('moduleId');   // Added by anif on 09-02-2023
    this.loggedInUserRoleIds = this.persistance.get('loggedinuser').roleIds;   // Added by anif on 09-02-2023
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllStatus();
    this.createForm();
    this.createHoldForm();
    if (this.persistance.get('previouspageparams') != (null || undefined)) {
      var params = this.persistance.get('previouspageparams');
      this.searchform.patchValue({
        requisitionNo: params.requisitionNo,
        functionId: params.functionId,
        verticalId: params.verticalId,
        locationId: params.locationId,
        fromDate: params.fromDate,
        toDate: params.toDate,
        iOMNo: params.iOMNo,
        requisitionProcessStatus: params.requisitionProcessStatus,
      })
    }

  }

  ngOnInit() {
    this.persistance.get('tabledisplayStart') == (null || undefined) ? this.displaystart = 0 : this.displaystart = this.persistance.get('tabledisplayStart');
    if (this.persistance.get('tabledisplayStart') == (null || undefined)) {
      this.displaystart = 0
    }
    if (this.persistance.get('tabledisplayStart') > 0) {
      var tablestart = this.persistance.get('tabledisplayStart')
      this.displaystart = (tablestart - 1) * 10;
    }
    this.titleService.setTitle(this.pageTitle);
    this.loadDatePicker();
    this.loadDataTable();
    this.loadTooltipMenu();
    this.hideCustomMenu();
    setTimeout(() => {
      this.fromSubmit();
    });
  }

  createForm() {
    this.searchform = this.fb.group({
      requisitionNo: [''],
      functionId: [0],
      verticalId: [''],
      locationId: [0],
      fromDate: [''],
      toDate: [''],
      iOMNo: [''],
      requisitionProcessStatus: [0],
      loggedInUserRoleIds: this.loggedInUserRoleIds,       // Added By anif on 09-02-2023
      moduleId: this.moduleId                               // Added By anif on 09-02-2023
    });
  }
  onClickNextPage() {
    this.previousValues.requisitionNo = this.searchform.value.requisitionNo;
    this.previousValues.functionId = this.searchform.value.functionId;
    this.previousValues.verticalId = this.searchform.value.verticalId;
    this.previousValues.locationId = this.searchform.value.locationId;
    this.previousValues.fromDate = this.searchform.value.fromDate;
    this.previousValues.toDate = this.searchform.value.toDate;
    this.previousValues.iOMNo = this.searchform.value.iOMNo;
    this.previousValues.requisitionProcessStatus = this.searchform.value.requisitionProcessStatus;
  }

  //verticals
  // getAllVerticals() {
  //   this.verticals = [];
  //   var splitvertical = this.verticalIds.split(",");
  //   var allvertical = "";
  //   console.log(splitvertical);
  //   for (var i = 0; i < splitvertical.length; i++) {
  //     if (splitvertical[i] != "0") {
  //       if (splitvertical[i] == "1") {
  //         this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
  //       }
  //       else if (splitvertical[i] == "2") {
  //         this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
  //       }
  //       else if (splitvertical[i] == "3") {
  //         this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
  //       }
  //       if (allvertical == "") {
  //         allvertical = splitvertical[i];
  //       }
  //       else {
  //         allvertical = allvertical + "," + splitvertical[i];
  //       }
  //     }

  //   }
  //   this.selectedVertical = this.verticals[0];
  //   //this.setDefaultVertical();
  // }

  setDefaultVertical() {
    setTimeout(() => {
      jQuery('.ddlvertical').selectpicker("val", "0: " + this.selectedVertical.verticalId + "");
      jQuery('.ddlvertical').selectpicker("refresh");
    });
  }
  getAllVerticals() {
    this.verticals = [];
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    //this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    this.loadSelectPicker();
    this.selectedVertical = this.verticals.filter(x => x.verticalId == 0)[0];
    this.setDefaultVertical();
    this.getAllFunction();
  }

  changeVertical() {
    var verticalId = this.searchform.get("verticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0];
    // console.log(this.selectedVertical);
    this.getAllLocation();
    this.getAllFunction();
  }

  //function
  getAllFunction() {
    this.functions = [];
    this.searchFunction.verticalId = this.selectedVertical.verticalId;
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;
        this.functions.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          verticalName: "",
          isActive: true
        })
      }
      else {
        this.functions = [];
        this.functions.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          verticalName: "",
          isActive: true
        })
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  //locations
  getAllLocation() {
    this.locations = [];
    this.searchLocation.verticalId = Number(this.selectedVertical.verticalId);
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
    }, () => {
      this.loadSelectPicker();
    });
  }
  // arg
  //status
  getAllStatus() {
    this.statuses = [];
    this.commonService.getAllStatus().subscribe((result) => {
      if (result) {
        this.statuses = result.filter(x => x.statusTypeId == 2);
        this.statuses.splice(0, 0, {
          statusId: 0,
          statusName: "All",
          statusTypeId: 2,
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
      this.loadSelectPicker();
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
    jQuery('#dataTable1').dataTable().fnClearTable();
    jQuery('#dataTable1').dataTable().fnDestroy();
    setTimeout(() => {
      var dothis = this;
      jQuery('#dataTable1').dataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "autoWidth": false,
        "order": [],
        "fixedColumns": {
          "left": 2
        },
        "displayStart": this.displaystart,
        "drawCallback": function (settings) {
          dothis.pagValue = (settings._iDisplayStart / settings._iDisplayLength) + 1
          //this.pagValue.push({value:(settings._iDisplayStart/settings._iDisplayLength) +1});
          //settings._iDisplayStart=30;
          setTimeout(() => {
            jQuery('[data-toggle="popover"]').popover({
              html: true
            });
          });
        }
      });
    });
  } //added by arg

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

  hideCustomMenu() {
    jQuery(".custom-menu").find(".dropdown-item").on("click", function (e) {
    });
  }

  // fromSubmit() {                             // By Arnab on 05-08-2023
  //   this.searchform.patchValue(
  //     {
  //       verticalId: this.selectedVertical.verticalId,
  //       fromDate: this.fDate.nativeElement.value,
  //       toDate: this.tDate.nativeElement.value
  //     });
  //   //console.log(this.searchform.value);
  //   this.SpinnerService.show();
  //   this.requisitionService.getAllRequisition(this.searchform.value).subscribe((result) => {
  //     if (result) {
  //       //console.log(result);
  //       this.requisitionLists = result;
  //       this.loadDataTable();
  //       //this.SpinnerService.hide();
  //     }
  //     else {
  //       this.requisitionLists = [];
  //       //this.SpinnerService.hide();
  //     }
  //   }, error => {
  //     console.log(error);
  //     this.SpinnerService.hide();
  //   }, () => {
  //     this.loadSelectPicker();
  //     this.SpinnerService.hide();
  //   });
  // }

  fromSubmit() {                                       // By Arnab on 05-08-2023
    var flag = 0;
    this.searchform.patchValue(
      {
        verticalId: this.selectedVertical.verticalId,
        fromDate: this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value
      });
    //console.log(this.searchform.value);
    if (this.fDate.nativeElement.value.length > 0 && this.tDate.nativeElement.value.length > 0) {
      const [fDay, fMonth, fYear] = this.fDate.nativeElement.value.split("/");
      const fDate = new Date(fYear, fMonth - 1, fDay);
      const [tDay, tMonth, tYear] = this.tDate.nativeElement.value.split("/");
      const tDate = new Date(tYear, tMonth - 1, tDay);
      if (fDate > tDate) {
        this.notificationService.showError("To Date Cann't be less than from From Date !! Please provide actual date", "Error");
        flag = 1;
      }
    }
    if (flag == 0) {
      this.SpinnerService.show();
      this.requisitionService.getAllRequisition(this.searchform.value).subscribe((result) => {
        if (result) {
          //console.log(result);
          this.requisitionLists = result;
          this.loadDataTable();
          //this.SpinnerService.hide();
        }
        else {
          this.requisitionLists = [];
          //this.SpinnerService.hide();
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
      }, () => {
        this.loadSelectPicker();
        this.SpinnerService.hide();
      });

    }

  }

  gotoAllocateToRM(id) {
    jQuery(".custom-menu").hide();
    this.onClickNextPage();
    this.persistance.set('pagename', "rorequisitionlist");
    this.persistance.set('paramid', id);
    // this.sharedDataComponentService.setPageName("rorequisitionlist");
    // this.sharedDataComponentService.setParamId("rorequisitionlist");
    this.persistance.set('previouspagefilters', this.previousValues);
    this.persistance.set('tabledisplayStart', this.pagValue);
    this._route.navigate(['/app/requisition/all-positions/allocate-to-rm']);
  }

  gotoCandidateList(requisitionDetailId) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "recruitmentownercandidatelist");
    this.persistance.set('paramid', requisitionDetailId);
    // this.sharedDataComponentService.setPageName("rorequisitionlist");
    // this.sharedDataComponentService.setParamId("rorequisitionlist");
    this.persistance.set('previouspagefilters', this.previousValues);
    this.persistance.set('tabledisplayStart', this.pagValue);
    this._route.navigate(['/app/requisition/all-positions/candidate-list']);
  }

  viewIOM(pathval) {
    window.open("/viewpdf?q=" + "" + pathval, "blank");
  }

  reset() {
    this.searchform.reset();
    this.searchform.patchValue({
      verticalId: 0,
      locationId: 0,
      requisitionApprovalStatus: 0,
      loggedInUserRoleIds: this.loggedInUserRoleIds,       // By Arnab on 05-08-2023
      moduleId: this.moduleId                              // By Arnab on 05-08-2023
    })
    this.loadSelectPicker();
    this.requisitionLists = [];
    this.loadDataTable();
    this.fromSubmit();                                    // By Arnab on 05-08-2023
  }

  openModalPopup(mergeRequisitionDetailId, mergeRequisitionType) {
    this.mergeRequisitionDetailId = mergeRequisitionDetailId;
    this.mergeRequisitionType = mergeRequisitionType;
    if (this.mergeRequisitionType == "Resignation") {
      this.isResignationTable = true;
      this.isTransferTable = false;
      this.isSuccessionPlanTable = false;
      this.requisitionType = 2
    }
    if (this.mergeRequisitionType == "Transfer") {
      this.isTransferTable = true;
      this.isSuccessionPlanTable = false;
      this.isResignationTable = false;
      this.requisitionType = 3;
    }
    if (this.mergeRequisitionType == "Succession Plan") {
      this.isSuccessionPlanTable = true;
      this.isResignationTable = false;
      this.isTransferTable = false;
      this.requisitionType = 4
    }
    this.serarchMergeRequisitionList.requisitionDetailId = this.mergeRequisitionDetailId;
    this.serarchMergeRequisitionList.requisitionType = this.requisitionType;
    this.requisitionService.getAllMergeRequisitionDetailList(this.serarchMergeRequisitionList).subscribe((result) => {
      if (result) {
        this.mergeRequisitionList = result;
      }
      else {
        this.mergeRequisitionList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  deleteRequisition(dataId) {
    if (confirm("Are you sure to delete ")) {
      this.deleteRequisitionFormData.DataId = dataId;
      this.deleteRequisitionFormData.TypeId = 4;        // Type id 4 For Delete Requisition
      this.deleteRequisitionFormData.CreatedBy = this.createdBy;
      // console.log(this.deleteRequisitionFormData);
      this.SpinnerService.show();
      this.requisitionService.deleteBeforeRequisition(this.deleteRequisitionFormData).subscribe((result) => {
        if (result) {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.fromSubmit();
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Error");
        }
      }, error => {
        console.log(error);
      }, () => {
        this.SpinnerService.hide();
      });
    }

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
  onClickRequisitionNo(record: any) {
    this.requisitionDetailsArrayPopup = [];
    this.requisitionDetailsArrayPopup.push(record);
    //console.log("requesition Details", this.requisitionDetailsArrayPopup);
  }

  createHoldForm() {
    this.updateHoldForm = this.fb.group({
      OnHold: [false]
    })
  }
  onHoldCheck(RowData: any) {
    this.updateHoldForm.patchValue({
      OnHold: RowData.onHold
    });
    this.searchHoldRequisition.requisitionDetailId = RowData.requisitionDetailId;
    this.searchHoldRequisition.requisitionNo = RowData.requisitionNo;
    //this.searchHoldRequisition.onHold = this.updateHoldForm.value.OnHold;
  }
  onHoldUpdate() {
    this.searchHoldRequisition.onHold = this.updateHoldForm.value.OnHold;
    this.requisitionService.updateHoldPositionForRequisition(this.searchHoldRequisition).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notificationService.showSuccess(response.msg, "Success");
        this.createForm();
        this.fromSubmit();
        jQuery(".close").click();
      }
      else {
        this.notificationService.showError(response.msg, "Error");
      }
    }, error => {
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }
    )
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
