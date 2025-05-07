import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { privateDecrypt } from 'crypto';
import { NgxSpinnerService } from 'ngx-spinner';
import { IFunctionDepartment, ISearchDepartment } from 'src/app/interfaces/common/department.interface';
import { ISearchFunction, IVerticalFunction } from '../../../interfaces/common/function.interface';
import { IAssessmentList, ICandidateList } from '../../../interfaces/common/inductionassessment.interface';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { IEmployeeReplacementList } from '../../../interfaces/employee/employee.interface';
import { ICandidateRelocationReimbursementList } from '../../../interfaces/joining/hiringteam.interface';
import { CommonService } from '../../../services/common/common/common.service';
import { DepartmentService } from '../../../services/common/department/department.service';
import { FunctionService } from '../../../services/common/function/function.service';
import { LocationService } from '../../../services/common/location/location.service';
import { EmployeeService } from '../../../services/employee/employee/employee.service';
import { ExcelService } from '../../../services/excel/excel.service';
import { HiringteamService } from '../../../services/joining/hiringteam/hiringteam.service';
import { ReportService } from '../../../services/reports/report.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
declare var jQuery: any;
@Component({
  selector: 'app-hropsresignation-report',
  templateUrl: './hropsresignation-report.component.html',
  styleUrls: ['./hropsresignation-report.component.css']
})
export class HropsresignationReportComponent implements OnInit {
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  searchform: FormGroup;
  //EmpNo
  employees: IEmployeeReplacementList[] = [];
  hropsresignationList: any[];
  SearchEmpNo: IEmployeeReplacementList = {
    empId: null,
    empNo: null,
    empName: null,
    designation: null,
    gradeName: null,
    functionId: null,
    functionName: null
  }
  //vertical
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  verticalIds: string;
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
  constructor(
    private SpinnerService: NgxSpinnerService,
    private persistance: PersistanceService,
    private commonService: CommonService,
    private locationService: LocationService,
    private reportService: ReportService,
    private excelService: ExcelService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private hiringteamService: HiringteamService,
    private departmentService: DepartmentService,
    public functionService: FunctionService,
    private employeeService: EmployeeService
  ) {
    this.createForm();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllFunction();
    this.getAllFunctionDepartment();
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
      empNo: [''],
      verticalId: [0],
      departmentId: [0],
      functionId: [0],
      locationId: [0],
      fromDate: [''],
      toDate: [''],
    });
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


  //departments
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
  exportToExcel() {
    // if(this.hropsresignationList.length != 0){
    //   this.hropsresignationList.forEach((e,index)=>{
    //     e.serialNo = index+1;
    //   })
    //   const updatedArray: any[] = [];
    //   this.hropsresignationList.forEach((obj) => {
    //   const updatedObj: any = {};
    //   for (const key in obj) {
    //     if (Object.prototype.hasOwnProperty.call(obj, key)) {
    //       const updatedKey = this.capitalizeFirstLetter(key);
    //       updatedObj[updatedKey] = obj[key];
    //     }
    //   }
    //   updatedArray.push(updatedObj);
    // });
    //   this.excelService.ExportAsExcelFileForReport(updatedArray, 'Hr Ops Resignation Report');
    // }
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
    link.download = "Hr Ops Resignation Report.xls";
    link.href = uri + base64(format(template, ctx));
    link.click();
  }

  fromSubmit() {
    var flag = 0;
    this.searchform.patchValue(
      {
        verticalId: this.selectedVertical.verticalId,
        fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value, // date added
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
    if(flag==0){
      this.hropsresignationList = [];
      this.SpinnerService.show();
      this.reportService.hropsresignationreport(this.searchform.value).subscribe((result) => {
        if (result) {
          this.hropsresignationList = result;
          this.loadDataTable();
          this.SpinnerService.hide();
        }
        else {
          this.hropsresignationList = [];
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
      jQuery(".dropdown-item").on("click", function () {
        jQuery('.dropdown-menu').hide();
      });
    });
  }
  reset() {
    this.searchform.reset();
    this.searchform.patchValue({
      verticalId: 0,
      departmentId: 0,
      functionId: 0,
      locationId: 0
    })
    //this.loadSelectPicker();
    //this.loadDataTable();
    this.changeVertical();
    this.changeFunction();
    this.fromSubmit();
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
          "left": 3
        }
      });
    });
  }
}

