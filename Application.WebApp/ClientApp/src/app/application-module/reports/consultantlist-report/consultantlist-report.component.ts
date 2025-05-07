import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { ReportService } from 'src/app/services/reports/report.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';

declare var jQuery: any;

@Component({
  selector: 'app-consultantlist-report',
  templateUrl: './consultantlist-report.component.html',
  styleUrls: ['./consultantlist-report.component.css']
})
export class ConsultantlistReportComponent implements OnInit {
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  searchForm: FormGroup;
  consultantReportList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private spinerService: NgxSpinnerService,
    private notificationService: NotificationService,
    private excelService: ExcelService,
    private reportService: ReportService
  ) 
  { 
    this.createForm();
  }

  ngOnInit() {
    this.loadDataTable();
    this.loadDatePicker();
    setTimeout(() => {
      this.formSubmit();
    })
  }
  createForm(){
    this.searchForm = this.fb.group({
      vendorName: [''],
      emailId: [''],
      contactNo: [''],
      fromDate: [''],
      toDate: [''],
    });
  }
  formSubmit() {
    var flag=0;
    this.searchForm.patchValue(
      {
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
    if(flag==0){
    this.consultantReportList = [];
    this.spinerService.show();
    this.reportService.consultantReport(this.searchForm.value).subscribe((result) => {
      if (result) {
        this.consultantReportList = result;
        console.log("List",this.consultantReportList)
        this.loadDataTable();
        this.spinerService.hide();
      }
      else {
        this.consultantReportList = [];
        this.spinerService.hide();
      }
    }, error => {
      console.log(error);
      this.spinerService.hide();
    }, () => {
      this.loadSelectPicker();
      this.spinerService.hide();
    });
  }
  }
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });


  }
  reset(){
    this.searchForm.reset();
    this.formSubmit();
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
  exportToExcel(){
    if(this.consultantReportList.length != 0){
      
      const updatedArray: any[] = [];
      this.consultantReportList.forEach((obj) => {
      const updatedObj: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const updatedKey = this.capitalizeFirstLetter(key);
          updatedObj[updatedKey] = obj[key];
        }
      }
      updatedArray.push(updatedObj);
    });
      this.excelService.ExportAsExcelFileForReport(updatedArray, 'Consultant List Report');
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

}
