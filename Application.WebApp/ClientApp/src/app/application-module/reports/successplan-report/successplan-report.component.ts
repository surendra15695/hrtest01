import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IDeleteBeforeRequisitionFormData } from '../../../interfaces/preselection/requisition.interface';
import { RequisitionService } from '../../../services/preselection/requisition/requisition.service';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { IStatus } from '../../../interfaces/common/common.interface';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction } from '../../../interfaces/common/function.interface';
import { IFunctionDepartment, ISearchDepartment } from '../../../interfaces/common/department.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../interfaces/common/position.interface';
import { ISearchSuccessionPlanList, ISuccessionPlanList, ISuccessionPlanRequisition, IMergeSuccessionPlanFormData, ISearchSuccessionPlanClarification } from '../../../interfaces/preselection/successionplan.interface';
import { LocationService } from '../../../services/common/location/location.service';
import { CommonService } from '../../../services/common/common/common.service';
import { FunctionService } from '../../../services/common/function/function.service';
import { DepartmentService } from '../../../services/common/department/department.service';
import { PositionService } from '../../../services/common/position/position.service';
import { SuccessionService } from '../../../services/preselection/succession/succession.service';
import { ShareddataService } from '../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/services/excel/excel.service';
declare var jQuery: any;

declare var jQuery: any;

@Component({
  selector: 'app-successplan-report',
  templateUrl: './successplan-report.component.html',
  styleUrls: ['./successplan-report.component.css']
})

export class SuccessplanReportComponent implements OnInit {

  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  @ViewChild('closeModal', { static: false }) cModal: ElementRef;
  private apppath = environment.apppath;
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
  successionPlanLists: any[] = [];
  mergeSuccFormdatessionPlanFormData: IMergeSuccessionPlanFormData = {
    SuccessionPlanData: null,
    CreatedBy: null
  }
  isMerge: boolean = false;
  verticalIds: string;
  searchSuccessionPlanClarification: ISearchSuccessionPlanClarification = {
    SuccessionPlanDetailId: 0
  }
  reasons: IStatus[] = [];
  selectedReason: IStatus;
  //replacestatus
  replacementStatuses: IStatus[] = [];
  selectedReplacementStatus: IStatus;

  createdBy: number;

  successionPlanRequisition: ISuccessionPlanRequisition[] = [];

  mergeSuccessionPlanFormdata: IMergeSuccessionPlanFormData = {
    SuccessionPlanData: null,
    CreatedBy: null
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

  // searchform = new FormGroup({
  //   Name: new FormControl('')
  // });  
  
  // successionPlanLists: any[] = [];
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private commonService: CommonService,
    private successionPlanService: SuccessionService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private titleService:Title,    
    private SpinnerService: NgxSpinnerService,
    private functionService: FunctionService,
    private excelService: ExcelService,
    private requisitionService: RequisitionService
  ) { 
    this.SpinnerService.show();
    localStorage.removeItem('pagename');
    localStorage.removeItem('id');
    this.verticalIds=this.persistance.get('loggedinuser').verticalIds; 
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.createForm();
    this.createAcknowledgementForm();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllFunction();
    this.getAllStatus();
    this.getAllReasons();
    this.getAllReplacementStatus();
    this.successionPlanRequisition = [];
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
      requisitionNo: [''],
      verticalId: [0],
      functionId:[0],
      locationId: [0],
      fromDate: [''],
      toDate: [''],
      iOMNo: [''],
      successionPlanProcessStatus: [0],
      replacementStatusId: [0]
    });
  }

  createAcknowledgementForm () {
    this.saveform = this.fb.group({
      successionPlanDetailId: [0],
      acknowledgementStatusId: [4, [Validators.required]],
      remarks: ['', [Validators.required]],
      createdBy: [0]
    })
  }

  // getSuccessplanList(){
  //   this.SpinnerService.show();
  //   this.successionPlanService.getAllSuccessionPlanList(this.searchform.value).subscribe((result) => {
  //     if (result) {        
  //       this.successionPlanLists = result;                
  //       console.log("Success Plan List: ", this.successionPlanLists);
  //     }
  //     else {
  //       this.successionPlanLists = [];        
  //     }
  //   }, error => {
  //     console.log(error);      
  //   }, () => {
  //     this.loadDataTable();
  //     this.SpinnerService.hide();
  //   });
  // }

  getAllVerticals() {
    this.verticals = [];
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    this.loadSelectPicker();
    this.selectedVertical = this.verticals.filter(x => x.verticalId == 0)[0];
  }

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
          verticalName:""
        })
      }
      else {
        this.functions = [];
        this.functions.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          isActive: true,
          verticalName:""
        })
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  setDefaultVertical(){
    setTimeout(() => {      
      jQuery('.ddlvertical').selectpicker("val","0: "+this.selectedVertical.verticalId+"");
      jQuery('.ddlvertical').selectpicker("refresh");
    });    
  }

  changeVertical() {
    var verticalId = this.searchform.get("verticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0];
    console.log(this.selectedVertical);
    this.getAllLocation();
    this.getAllFunction();
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
      this.loadSelectPicker();
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
    if(this.successionPlanLists.length != 0){
      this.successionPlanLists.forEach((e,index)=>{
        e.serialNo = index+1;
      })
      const updatedArray: any[] = [];
      this.successionPlanLists.forEach((obj) => {
      const updatedObj: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const updatedKey = this.capitalizeFirstLetter(key);
          updatedObj[updatedKey] = obj[key];
        }
      }
      updatedArray.push(updatedObj);
    });
      this.excelService.ExportAsExcelFileForReport(updatedArray, 'Success Plan Report');
    }
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
        "fixedColumns":{
          "left": 5
        }
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
      jQuery(".dropdown-item").on("click",function(){
        jQuery('.dropdown-menu').hide();
      });
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
    if(flag == 0){
      this.successionPlanLists = [];
      this.SpinnerService.show();
      this.successionPlanService.getAllSuccessionPlanListReport(this.searchform.value).subscribe((result) => {
      if (result) {
        console.log(result);
        this.successionPlanLists = result;
        this.loadDataTable();
        this.SpinnerService.hide();
      }
      else {
        this.successionPlanLists = [];
        this.SpinnerService.hide();
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
    this.persistance.set('pagename', "rorequisitionlist");
    this.persistance.set('paramid', id);
    this._route.navigate(['/app/rorequisitionlist/allocatetorm']);
  }

  viewIOM(pathval) {
    window.open(this.apppath + "" + pathval, "blank");
  }

  reset() {
    this.searchform.reset();
    this.searchform.patchValue({
      verticalId: 0,
      locationId: 0,
      functionId:0,
      successionPlanProcessStatus:0,
      replacementStatusId: 0
    })
    // this.loadSelectPicker();
    // this.successionPlanLists = [];
    // this.loadDataTable();
    this.fromSubmit();
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
      this.loadSelectPicker();
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
      this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }  
}
