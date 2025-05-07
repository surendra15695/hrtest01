import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { ReportService } from 'src/app/services/reports/report.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
declare var jQuery: any;

@Component({
  selector: 'app-reimbursement-details-report',
  templateUrl: './reimbursement-details-report.component.html',
  styleUrls: ['./reimbursement-details-report.component.css']
})
export class ReimbursementDetailsReportComponent implements OnInit {
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  searchform: FormGroup;
  saveform: FormGroup;

  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  reimbursementReportList:any[]=[];

  constructor(
    private notificationService: NotificationService,
    private SpinnerService: NgxSpinnerService,
    private fb: FormBuilder,
    private reportService: ReportService,
    private excelService: ExcelService,
  )
  {
    this.createForm();
    this.getAllVerticals();

  }
  ngOnInit() {
    this.loadDataTable();
    this.loadDatePicker();
    setTimeout(() => {
      this.formSubmit();
    })
  }
  createForm(){
    this.searchform = this.fb.group({
      verticalId: [0],
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
 
  } 
  formSubmit() 
  {
    var flag = 0;
    console.log(this.fDate.nativeElement);

    this.searchform.patchValue(
      {
        // fromDate: this.fDate.nativeElement.value,
        // toDate: this.tDate.nativeElement.value,
        fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,
        
        //verticalId:(this.verticalId.nativeElement.value),
        
      }
    )
    if (this.fDate.nativeElement.value.length > 0 && this.tDate.nativeElement.value.length > 0 ) 
      {
      const [fDay, fMonth, fYear] = this.fDate.nativeElement.value.split("/");
      const fDate = new Date(fYear, fMonth - 1, fDay);
      const [tDay, tMonth, tYear] = this.tDate.nativeElement.value.split("/");
      const tDate = new Date(tYear, tMonth - 1, tDay);
      
      if (fDate > tDate) {
        this.notificationService.showError("To Date Cann't be less than from From Date !! Please provide actual date", "Error");
        flag = 1;
      }
    }
    if(flag==0)
    {
      //console.log(this.searchform.value);
    // this.candidatedocumetreportLists = [];
     this.SpinnerService.show();
    //   let obj = {
    //     fromDate: this.fDate.nativeElement.value,
    //     toDate: this.tDate.nativeElement.value,
    //     candidateId:Number(this.CandidateId)== null? '': Number(this.CandidateId.nativeElement.value),
    //   }
    this.reportService.reimbursementReport(this.searchform.value).subscribe((result) => {
      if (result) {
        this.reimbursementReportList = result;
        this.loadDataTable();
        this.SpinnerService.hide();
      }
      else {
        this.reimbursementReportList = [];
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
  
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }
  loadDataTable() 
  {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "fixedColumns":{
          "left":3
        }
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
 
  ExportReport(){
    if(this.reimbursementReportList.length != 0){
      this.reimbursementReportList.forEach((e,index)=>{
        e.serialNo = index+1;
      })
      const updatedArray: any[] = [];
      this.reimbursementReportList.forEach((obj) => {
      const updatedObj: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const updatedKey = this.capitalizeFirstLetter(key);
          updatedObj[updatedKey] = obj[key];
        }
      }
      updatedArray.push(updatedObj);
    });
      this.excelService.ExportAsExcelFileForReport(updatedArray, 'Candidate Document Report');
    }
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
  reset() {
     this.searchform.reset();
    this.formSubmit();
   }

}
