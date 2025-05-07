import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { IStatus } from '../../../interfaces/common/common.interface';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction } from '../../../interfaces/common/function.interface';
import { IFunctionDepartment, ISearchDepartment } from '../../../interfaces/common/department.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../interfaces/common/position.interface';
import { ISearchRequisition, IRequisitionList } from '../../../interfaces/preselection/requisition.interface';
import { LocationService } from '../../../services/common/location/location.service';
import { CommonService } from '../../../services/common/common/common.service';
import { FunctionService } from '../../../services/common/function/function.service';
import { DepartmentService } from '../../../services/common/department/department.service';
import { PositionService } from '../../../services/common/position/position.service';
import { ReportService } from '../../../services/reports/report.service';
import { ShareddataService } from '../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ExcelService } from 'src/app/services/excel/excel.service';
declare var jQuery: any;

@Component({
  selector: 'app-candidatetrackerreport',
  templateUrl: './candidatetrackerreport.component.html',
  styleUrls: ['./candidatetrackerreport.component.css']
})
export class CandidatetrackerreportComponent implements OnInit {
  pageTitle: string = "Candidate Tracker Report";
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  searchform: FormGroup;
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
  dataList: any[] = [];
  loginUserId: number;
  loginRoleIds:any[];
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private functionService: FunctionService,
    private commonService: CommonService,
    private reportService: ReportService,
    private persistance: PersistanceService,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
    private excelService: ExcelService,
  ) {
    this.loginRoleIds=this.persistance.get('loggedinuser').roleIds.split(",");
    this.titleService.setTitle(this.pageTitle);
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    localStorage.removeItem('pagename');
    localStorage.removeItem('id');
    this.createForm();
    this.getAllVerticals();
    this.getAllFunction();
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
      functionId: [0],
      requisitionNo:[''],
      allocatedAutoUserId:[0]
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

  changeVertical() {
    this.functions = [];
    var verticalId = this.searchform.get("verticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0];
    console.log(this.selectedVertical);
    //this.getAllLocation();
    this.getAllFunction();
  }

  //locations
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
    });
  }

  fromSubmit() {
    
      console.log(this.loginRoleIds);
      for (var i = 0; i < this.loginRoleIds.length; i++) {
        if (this.loginRoleIds[i]=="5") {
          this.searchform.patchValue({allocatedAutoUserId:this.loginUserId}) ;  
        }
        if(this.loginRoleIds[i]=="1" || this.loginRoleIds[i]=="2" || this.loginRoleIds[i]=="3" || this.loginRoleIds[i]=="4"){
          this.searchform.patchValue({allocatedAutoUserId:0}) ;  
        }
      }
    console.log(this.searchform.value);
    this.SpinnerService.show();
    this.reportService.candidatetrackerreport(this.searchform.value).subscribe((result) => {
      if (result) {
        this.dataList = result;
        this.loadDataTable();
        this.SpinnerService.hide();
      }
      else {
        this.dataList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
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

  exportToExcel() {
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
    link.download = "RequisitionReport.xls";
    link.href = uri + base64(format(template, ctx));
    link.click();
  }

}
