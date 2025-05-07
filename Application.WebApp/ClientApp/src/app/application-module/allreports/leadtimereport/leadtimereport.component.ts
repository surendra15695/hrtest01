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
import { NotificationService } from 'src/app/sharedservices/notification.service';
declare var jQuery: any;

@Component({
  selector: 'app-leadtimereport',
  templateUrl: './leadtimereport.component.html',
  styleUrls: ['./leadtimereport.component.css']
})
export class LeadtimereportComponent implements OnInit {
  pageTitle: string = "Lead Time Report";
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  searchform: FormGroup;
  //vertical
  
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
    private notificationService: NotificationService
  ) {
    this.loginRoleIds=this.persistance.get('loggedinuser').roleIds.split(",");
    this.titleService.setTitle(this.pageTitle);
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    localStorage.removeItem('pagename');
    localStorage.removeItem('id');
    this.createForm();
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
      fromDate: [''],
      toDate: [''],
      allocatedUserId:[0]
    });
  }

  // fromSubmit() {             // By Arnab on 05-08-2023            
  //   this.searchform.patchValue(
  //     {
  //       fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
  //       toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,
  //     });
  //     console.log(this.loginRoleIds);
  //     for (var i = 0; i < this.loginRoleIds.length; i++) {
  //       if (this.loginRoleIds[i]=="5") {
  //         this.searchform.patchValue({allocatedUserId:this.loginUserId}) ;  
  //       }
  //       if(this.loginRoleIds[i]=="1" || this.loginRoleIds[i]=="2" || this.loginRoleIds[i]=="3" || this.loginRoleIds[i]=="4"){
  //         this.searchform.patchValue({allocatedUserId:0}) ;  
  //       }
  //     }
  //   console.log(this.searchform.value);
  //   this.SpinnerService.show();
  //   this.reportService.leadtimereport(this.searchform.value).subscribe((result) => {
  //     if (result) {
  //       this.dataList = result;
  //       this.loadDataTable();
  //       this.SpinnerService.hide();
  //     }
  //     else {
  //       this.dataList = [];
  //       this.SpinnerService.hide();
  //     }
  //   }, error => {
  //     console.log(error);
  //     this.SpinnerService.hide();
  //   }, () => {
  //     this.SpinnerService.hide();
  //   });
  // }

  fromSubmit() {             // By Arnab on 05-08-2023   
    var flag = 0;
    this.searchform.patchValue(
      {
        fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,
      });
      //console.log(this.loginRoleIds);
    for (var i = 0; i < this.loginRoleIds.length; i++) {
      if (this.loginRoleIds[i]=="5") {
        this.searchform.patchValue({allocatedUserId:this.loginUserId}) ;  
      }
      if(this.loginRoleIds[i]=="1" || this.loginRoleIds[i]=="2" || this.loginRoleIds[i]=="3" || this.loginRoleIds[i]=="4"){
        this.searchform.patchValue({allocatedUserId:0}) ;  
      }
    }
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
      //console.log(this.searchform.value);
      this.SpinnerService.show();
      this.reportService.leadtimereport(this.searchform.value).subscribe((result) => {
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
  }
  reset(){                // By Arnab on 05-08-2023   
    this.searchform.reset();
    this.fromSubmit();
  }

  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "order": []
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
