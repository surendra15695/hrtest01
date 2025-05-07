import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common/common/common.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { SuccessionService } from 'src/app/services/preselection/succession/succession.service';
import { TransferService } from 'src/app/services/preselection/transfer/transfer.service';
import { IDeleteBeforeRequisitionFormData } from 'src/app/interfaces/preselection/requisition.interface';
import { ISearchFunction, IVerticalFunction } from 'src/app/interfaces/common/function.interface';
import { IStatus } from 'src/app/interfaces/common/common.interface';
import { IMergeTransferFormData, ISearchTransferClarification, ITransferList, ITransferRequisition } from 'src/app/interfaces/preselection/transfer.interface';
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from 'src/app/interfaces/common/location.interface';
import { LocationService } from 'src/app/services/common/location/location.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { RequisitionService } from 'src/app/services/preselection/requisition/requisition.service';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/services/excel/excel.service';

declare var jQuery: any;

@Component({
  selector: 'app-transfer-report',
  templateUrl: './transfer-report.component.html',
  styleUrls: ['./transfer-report.component.css']
})

export class TransferReportComponent implements OnInit {
  
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  @ViewChild('closeModal', { static: false }) cModal: ElementRef; 
   
  searchform: FormGroup;
  saveform: FormGroup;
  //vertical
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
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
  transferLists: any[] = [];

  reasons: IStatus[] = [];
  selectedReason: IStatus;
  //replacestatus
  replacementStatuses: IStatus[] = [];
  selectedReplacementStatus: IStatus;

  createdBy: number;

  transferRequisition: ITransferRequisition[];

  mergeTransferFormdata: IMergeTransferFormData = {
    TransferData: null,
    CreatedBy: null
  }

  isMerge: boolean = false;
  verticalIds: string;
  searchTransferClarification: ISearchTransferClarification = {
    transferDetailId: 0
  }
  //function
  functions: IVerticalFunction[] = [];
  selectedFunction: IVerticalFunction;
  searchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  functionId: number;
  functionName: string;

  deleteRequisitionFormData: IDeleteBeforeRequisitionFormData = {
    DataId: null,
    TypeId: null,
    CreatedBy: null
  }
  
  constructor(
    private fb: FormBuilder,
    private _route: Router,    
    private locationService: LocationService,
    private commonService: CommonService,
    private transferService: TransferService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,        
    private SpinnerService: NgxSpinnerService,
    private functionService: FunctionService,
    private requisitionService: RequisitionService,
    private excelService: ExcelService   
  ) { 
    this.createForm();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllStatus();
    this.getAllFunction();
    this.getAllReasons();
    this.getAllReplacementStatus();
    this.transferRequisition = [];
  }

  ngOnInit() {
    this.loadDatePicker();
    this.loadDataTable();
    setTimeout(() => {
      this.fromSubmit();
    })
  }
  createForm() {
    this.searchform = this.fb.group({
      verticalId: [0],
      locationId: [0],
      functionId: [0],
      fromDate: [''],
      toDate: [''],
      transferProcessStatus: [0],
      replacementStatusId: [0]
    });
  }
  

  //verticals
  getAllVerticals(){
    this.verticals = [];
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    this.loadSelectPicker();
    this.selectedVertical = this.verticals.filter(x => x.verticalId == 0)[0];
  }
  changeVertical() {
    var verticalId = this.searchform.get("verticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0];
    this.getAllLocation();
    this.getAllFunction();
  }

  // setDefaultVertical(){
  //   setTimeout(() => {      
  //     jQuery('.ddlvertical').selectpicker("val","0: "+this.selectedVertical.verticalId+"");
  //     jQuery('.ddlvertical').selectpicker("refresh");
  //   });    
  // }
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
          isActive: true,
          verticalName: ""
        })
      }
      else {
        this.functions = [];
        this.functions.splice(0, 0, {
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
      this.loadSelectPicker();
      this.SpinnerService.hide();
    });
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
        this.SpinnerService.hide(); 
    });
  }
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
      //this.loadSelectPicker();
    });
  }

  getAllReasons() {
    this.reasons = [];
    this.commonService.getAllStatus().subscribe((result) => {
      if (result) {
        this.reasons = result.filter(x => x.statusTypeId == 5);
        this.replacementStatuses.splice(0, 0, {
          statusId: 0,
          statusName: "All",
          statusTypeId: 5,
          statusTypeName: "ResaonStatus",
          statusIcon: ""
        })
      }
      else {
        this.reasons = [];
        this.replacementStatuses.splice(0, 0, {
          statusId: 0,
          statusName: "All",
          statusTypeId: 5,
          statusTypeName: "ResaonStatus",
          statusIcon: ""
        })
      }
    }, error => {
      console.log(error);
    }, () => {
      //this.loadSelectPicker();
    });
  }
  
  getAllReplacementStatus() {
    this.replacementStatuses = [];
    this.commonService.getAllStatus().subscribe((result) => {
      if (result) {
        this.replacementStatuses = result.filter(x => x.statusTypeId == 4);
        this.replacementStatuses.splice(0, 0, {
          statusId: 0,
          statusName: "All",
          statusTypeId: 4,
          statusTypeName: "ReplacementStatus",
          statusIcon: ""
        })
      }
      else {
        this.replacementStatuses = [];
        this.statuses.splice(0, 0, {
          statusId: 0,
          statusName: "All",
          statusTypeId: 4,
          statusTypeName: "ReplacementStatus",
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

  fromSubmit() {
    var flag = 0;
    this.searchform.patchValue(
      {
        verticalId:this.selectedVertical.verticalId,
        fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,
      });
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
    if(flag == 0){
      this.transferLists = [];
      this.SpinnerService.show();
      this.transferService.getAllTransferListReport(this.searchform.value).subscribe((result) => {
        if (result) {
          this.transferLists = result;
          console.log(this.transferLists);
          this.loadDataTable();
          this.SpinnerService.hide();
        }
        else {
          this.transferLists = [];
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
  }

  // gotoAllocateToRM(id) {
  //   this.persistance.set('pagename', "rorequisitionlist");
  //   this.persistance.set('paramid', id);
  //   this._route.navigate(['/rorequisitionlist/allocatetorm']);
  // }

  // viewIOM(pathval) {
  //   window.open(this.apppath + "" + pathval, "blank");
  // }

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
      jQuery(".dropdown-item").on("click",function(){
        jQuery('.dropdown-menu').hide();
      });
    });
  }
  capitalizeFirstLetter(str: string): string {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (i > 0 && str[i] === str[i].toUpperCase()) {
            result += ' ';
        }
        result += str[i];
    }
    return result.charAt(0).toUpperCase()+ result.slice(1);;

  }
  ExportReport(){
    if(this.transferLists.length != 0){
      this.transferLists.forEach((e,index)=>{
        e.serialNo = index+1;
      })
      const updatedArray: any[] = [];
      this.transferLists.forEach((obj) => {
      const updatedObj: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const updatedKey = this.capitalizeFirstLetter(key);
          updatedObj[updatedKey] = obj[key];
        }
      }
      updatedArray.push(updatedObj);
    });
      this.excelService.ExportAsExcelFileForReport(updatedArray, 'Transfer Report');
    }
  }
  reset() {
    this.searchform.reset();
    this.searchform.patchValue({
      verticalId: 0,
      locationId: 0,
      functionId: 0,
      transferProcessStatus: 0,
      replacementStatusId: 0
    })
    this.changeVertical();
    //this.loadSelectPicker();
    this.loadDataTable();
    this.fromSubmit();
  }  

  loadSelectPicker() {
    setTimeout(() => {
      jQuery('.selectpicker').selectpicker({
        size: 6
      });
      jQuery('.selectpicker').selectpicker('refresh');
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
        "fixedColumns":{
          "left": 4
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
}
