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
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade, IPositionList, ISearchPositionList } from '../../../interfaces/common/position.interface';
import {
  ISearchResignationList, IResignationList, IResignationRequisition, IMergeResignationFormData,
  IResignationClarification, ISearchResignationClarification
} from '../../../interfaces/preselection/resignation.interface';
import { LocationService } from '../../../services/common/location/location.service';
import { CommonService } from '../../../services/common/common/common.service';
import { FunctionService } from '../../../services/common/function/function.service';
import { DepartmentService } from '../../../services/common/department/department.service';
import { PositionService } from '../../../services/common/position/position.service';
import { ResignationService } from '../../../services/preselection/resignation/resignation.service';
import { ShareddataService } from '../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ReportService } from 'src/app/services/reports/report.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
declare var jQuery: any;

@Component({
  selector: 'app-resignation-report',
  templateUrl: './resignation-report.component.html',
  styleUrls: ['./resignation-report.component.css']
})

export class ResignationReportComponent implements OnInit {

  pageTitle: string = "Resignation List";
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
  //department
  departments: IFunctionDepartment[] = [];
  selectedDepartment: IFunctionDepartment;
  searchDepartment: ISearchDepartment = {
    departmentId:null,
    functionId:null,
    verticalId:null,
    isActive:true
  }
  departmentId: number;
  departmentName: string;
  //position
  positions:IPositionList[]= [];
  selectedPosition: IPositionList;
  searchPosition: ISearchPositionList = {
    positionId: null,
    isActive: true
  }
  positionId: number;
  positionName: string;

  resignationReportList:any[]=[];

  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private commonService: CommonService,
    private resignationService: ResignationService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
    private functionService: FunctionService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private excelService: ExcelService,
    private reportService: ReportService,
    private requisitionService: RequisitionService
  ) {
    this.createForm();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllFunction();
    this.getAllFunctionDepartment();
    this.getAllPositionMaster();
    
    
   }

  ngOnInit() {
    this.loadDatePicker();
    this.loadDataTable();   
    setTimeout(() => {
      this.formSubmit(); 
    })
  }    

  // getdata()
  // {
  //   this.searchform.patchValue(
  //     {
  //       verticalId: 0,
  //       fromDate: "",
  //       toDate: "",
  //     });
  //     this.reportService.resignationReport(this.searchform.value).subscribe((result) => {
  //       if (result) {
  //         this.resignationReportList = result;
  //         this.loadDataTable();
  //         this.SpinnerService.hide();
  //       }
  //       else {
  //         this.resignationReportList = [];
  //         this.SpinnerService.hide();
  //       }
  //     }, error => {
  //       console.log(error);
  //       this.SpinnerService.hide();
  //     }, () => {
  //       this.loadSelectPicker();
  //       this.SpinnerService.hide();
  //     });
  // }
  createForm() {
    this.searchform = this.fb.group({
      verticalId: [0],
      locationId: [0],
      functionId: [0],
      departmentId: [0],
      positionId: [0],
      fromDate: [''],       
      toDate: [''],         
    });
  }

  formSubmit() {
    var flag = 0;
    this.searchform.patchValue(
      {
        verticalId: this.selectedVertical.verticalId,
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
      this.resignationReportList = [];
        this.SpinnerService.show();
        this.reportService.resignationReport(this.searchform.value).subscribe((result) => {
        if (result) {
          this.resignationReportList = result;
          this.loadDataTable();
          this.SpinnerService.hide();
        }
        else {
          this.resignationReportList = [];
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

  reset() {
    this.searchform.reset();
    this.searchform.patchValue({
      verticalId:   0,
      locationId:   0,
      functionId:   0,
      departmentId: 0,
      positionId:   0,
    })
    this.changeVertical();
    this.changeFunction();
    this.formSubmit();
  }


  getAllVerticals(){
    this.verticals = [];
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
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
    this.selectedFunction = this.functions.filter(x => x.functionId == 0)[0];
  }
  changeFunction(){
    // var functionId = this.searchform.get("functionId").value;
    // this.selectedFunction = this.functions.filter(x => x.functionId == functionId)[0];
    this.getAllFunctionDepartment();
  }

  //functions
  getAllFunctionDepartment() {
    this.departments = [];
    this.searchDepartment.verticalId = this.selectedVertical.verticalId;
    this.searchDepartment.functionId = this.searchform.value.functionId;
    this.departmentService.getAllFunctionDepartment(this.searchDepartment).subscribe((response: any) => {
      if (response) {
        this.departments = response;
        this.departments.splice(0,0, {
          departmentId:0,
          departmentName:"All",
          verticalId:0,
          verticalName:"All",
          functionName:"All",
          functionId:0,
          isActive:true,
        })              
      }
      else {
        this.departments = [];
        this.departments.splice(0,0, {
          departmentId:0,
          departmentName:"All",
          verticalId:0,
          verticalName:"",
          functionName:"",
          functionId:0,
          isActive:true,
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
  //positons
  getAllPositionMaster() {
    this.positionService.getAllPositionMaster(this.searchPosition).subscribe((response: any) => {
      if (response) {
        this.positions = response;
        this.positions.splice(0, 0, {
          positionId: 0,
          positionName: "All",
          isActive: true,
          createdBy: 0
        })
      }
      else {
        this.positions = [];
        this.positions.splice(0, 0, {
          positionId: 0,
          positionName: "All",
          isActive: true,
          createdBy: 0
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    })
  }
  exportToExcel() {
    //this.excelService.ExportAsExcelFile(this.resignationReportList, "Report_Resignation");
    var htmls = "";
    var uri = 'data:application/vnd.ms-excel;base64,';
    var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
    var base64 = function (s) {
      return window.btoa(unescape(encodeURIComponent(s)))
    };
    var format = function (s, c) {
      return s.replace(/{(\w+)}/g, function (m, p) {
        return c[p];
      })
    };
    htmls = jQuery("#exportTable").html();
    var ctx = {
      worksheet: 'Worksheet',
      table: htmls
    }
    var link = document.createElement("a");
    link.download = "ResignationReport.xls";
    link.href = uri + base64(format(template, ctx));
    link.click();
  }

  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
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
}
