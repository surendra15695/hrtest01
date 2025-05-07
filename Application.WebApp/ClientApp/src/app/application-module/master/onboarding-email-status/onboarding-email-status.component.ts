import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../services/common/common/common.service';
import { DatePipe } from '@angular/common';
import { stringify } from 'querystring';

declare var jQuery: any;

@Component({
  selector: 'app-onboarding-email-status',
  templateUrl: './onboarding-email-status.component.html',
  styleUrls: ['./onboarding-email-status.component.css'],
  providers: [DatePipe]
})
export class OnboardingEmailStatusComponent implements OnInit {

  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  @ViewChild('candidateNo', { static: false }) CandidateNo: ElementRef; 
  searchform: FormGroup;
  dateForm: FormGroup;

  pipe = new DatePipe('en-US');
  
  OnboardingEmailStatusList : any[] = [];
  constructor(
    private notificationService: NotificationService,
    private SpinnerService: NgxSpinnerService,
    private fb: FormBuilder,
    private commonservice: CommonService,
    private excelService: ExcelService,
    private datePipe: DatePipe,
  )
  {
   
    this.createForm();
  }
  ngOnInit(
  ) {
    this.loadDataTable();
    this.loadDatePicker();
      setTimeout(() => {
        this.fromSubmit();
     })
  }
  ngAfterViewInit(){
    this.defaultdate();
  }
   defaultdate() 
   {
    const currentDate = new Date();

    const fromDate = new Date(currentDate);
    fromDate.setDate(fromDate.getDate() - 15);
    this.fDate.nativeElement.value = fromDate
    this.fDate.nativeElement.value = this.formatDate(this.fDate.nativeElement.value);

    const toDate = new Date(currentDate);
    toDate.setDate(toDate.getDate());
    this.tDate.nativeElement.value = toDate
    this.tDate.nativeElement.value = this.formatDate(this.tDate.nativeElement.value);

    }
  
    formatDate(dateString: string): string {
      // Parse the original date string to a Date object
      const parsedDate = new Date(dateString);
  
      // Format the date using DatePipe
      // 'dd/MMM/yyyy' represents '25/Jun/2024' format
      return this.datePipe.transform(parsedDate, 'dd/MM/yyyy')!;
    }

  fromSubmit() 
  {
    var flag = 0;
    this.searchform.patchValue(
      {
        fromDate: this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value,
        // fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
        // toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,
        candidateNo:this.CandidateNo== null? '': this.CandidateNo.nativeElement.value,

        //candidateNo:(this.CandidateNo.nativeElement.value),
        
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
    this.OnboardingEmailStatusList = [];
      this.SpinnerService.show();
      let obj = {
        fromDate: this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value,
       
        //candidateNo: this.CandidateNo.nativeElement.value,
        candidateNo:this.CandidateNo== null? '': this.CandidateNo.nativeElement.value,
      }
      this.commonservice.OnboardingEmailStatus(obj).subscribe((result) => {
      if (result) {
        this.SpinnerService.hide();
        this.OnboardingEmailStatusList = result;
        this.loadDataTable();
      }
      else {
        this.OnboardingEmailStatusList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, 
    
  );
    }
    
  }
  createForm() {
    this.searchform = this.fb.group({
      candidateNo: [''],
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
    if(this.OnboardingEmailStatusList.length != 0){
      this.OnboardingEmailStatusList.forEach((e,index)=>{
        e.serialNo = index+1;
      })
      const updatedArray: any[] = [];
      this.OnboardingEmailStatusList.forEach((obj) => {
      const updatedObj: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const updatedKey = this.capitalizeFirstLetter(key);
          updatedObj[updatedKey] = obj[key];
        }
      }
      updatedArray.push(updatedObj);
    });
      this.excelService.ExportAsExcelFileForReport(updatedArray, 'Candidate Welcome Email Status');
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
    this.defaultdate();
    this.fromSubmit();
   }
}

