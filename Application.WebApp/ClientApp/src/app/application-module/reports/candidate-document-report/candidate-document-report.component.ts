import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportService } from 'src/app/services/reports/report.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../services/common/common/common.service';

declare var jQuery: any;

@Component({
  selector: 'app-candidate-document-report',
  templateUrl: './candidate-document-report.component.html',
  styleUrls: ['./candidate-document-report.component.css'],
  providers: [ReactiveFormsModule, FormsModule]
})
export class CandidateDocumentReportComponent implements OnInit {
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  @ViewChild('candidateId', { static: false }) CandidateId: ElementRef; 
  searchform: FormGroup;
  
  candidatedocumetreportLists : any[] = [];
  constructor(
    private notificationService: NotificationService,
    private SpinnerService: NgxSpinnerService,
    private fb: FormBuilder,
    private reportService: ReportService,
    private excelService: ExcelService,
  )
  {
    this.createForm();
  }
  ngOnInit(
  ) {
    this.loadDatePicker();
      setTimeout(() => {
        this.fromSubmit();
     })
  }
  fromSubmit() 
  {
    var flag = 0;
    this.searchform.patchValue(
      {
        fromDate: this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value,
        //candidateId:Number(this.CandidateId)== null? '': Number(this.CandidateId.nativeElement.value),
        candidateId:(this.CandidateId.nativeElement.value),
        
      }
    )
    if (this.fDate.nativeElement.value.length > 0 && this.tDate.nativeElement.value.length > 0 && this.CandidateId.nativeElement.value =='') 
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
      console.log(this.searchform.value);
    this.candidatedocumetreportLists = [];
      this.SpinnerService.show();
      let obj = {
        fromDate: this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value,
        candidateId:Number(this.CandidateId)== null? '': Number(this.CandidateId.nativeElement.value),
      }
    this.reportService.candidatedocumentReport(obj).subscribe((result) => {
      if (result) {
        this.candidatedocumetreportLists = result;
        this.loadDataTable();
        this.SpinnerService.hide();
      }
      else {
        this.candidatedocumetreportLists = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, 
    // () => 
    // {
    //   this.loadSelectPicker();
    //   this.SpinnerService.hide();
    // }
  );
    }
    
  }
  createForm() {
    this.searchform = this.fb.group({
      candidateId: [''],
      fromDate: [''],       
      toDate: [''],     
    });
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
  ExportReport(){
    if(this.candidatedocumetreportLists.length != 0){
      this.candidatedocumetreportLists.forEach((e,index)=>{
        e.serialNo = index+1;
      })
      const updatedArray: any[] = [];
      this.candidatedocumetreportLists.forEach((obj) => {
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
    //  this.searchform.patchValue({
    //    candidateId: 0,
    //    fromDate: 0,
    //    toDate: 0,
    //  })
    this.fromSubmit();
   }
}

