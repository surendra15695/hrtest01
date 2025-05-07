import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { ReportService } from 'src/app/services/reports/report.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';

declare var jQuery: any;

@Component({
  selector: 'app-recruitmentment-funnel-report',
  templateUrl: './recruitmentment-funnel-report.component.html',
  styleUrls: ['./recruitmentment-funnel-report.component.css']
})
export class RecruitmentmentFunnelReportComponent implements OnInit {
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  recruitmentFunnelList: any[] = [];
  filterForm: FormGroup;
  constructor(
    private reportService: ReportService,
    private SpinnerService: NgxSpinnerService,
    private excelService: ExcelService,
    private fb: FormBuilder,
    private notificationService: NotificationService,   
  ) { this.createFilterForm();  }

  ngOnInit() {
    this.loadSelectPicker();
    this.loadDatePicker();
    this.formSubmit()
  }
  createFilterForm() {
    this.filterForm = this.fb.group({
      fromDate: [''],       
      toDate: [''],       
    });
  }
  onFilter() {
    var flag = 0;
    this.filterForm.patchValue({         
      fromDate: this.fDate.nativeElement.value,
      toDate: this.tDate.nativeElement.value,
    });
    //console.log(this.filterForm.value);
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
      this.formSubmit();
    }
  }
  formSubmit() {
    this.SpinnerService.show();
    this.reportService.recruitmentFunnelReport(this.filterForm.value).subscribe((result) => {
      if (result) {
        this.recruitmentFunnelList = result;
        this.recruitmentFunnelList.forEach((e,index)=>{
          e.serialNumber = index+1;
        })
        this.loadDataTable();
        this.SpinnerService.hide();
      }
      else {
        this.recruitmentFunnelList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
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
    if(this.recruitmentFunnelList.length !=0)
    {
     
      const updatedArray: any[] = [];
      this.recruitmentFunnelList.forEach((obj) => {
      const updatedObj: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const updatedKey = this.capitalizeFirstLetter(key);
          updatedObj[updatedKey] = obj[key];
        }
      }
      updatedArray.push(updatedObj);
    });
    this.excelService.ExportAsExcelFileForReport(updatedArray, "Recruitment Funnel Report");
    }
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
  reset()
  {
    this.filterForm.reset();
    this.onFilter();
  }
}
