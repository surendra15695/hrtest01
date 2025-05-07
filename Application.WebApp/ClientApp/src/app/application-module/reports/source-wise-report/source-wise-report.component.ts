import { Component, OnInit, ViewChild, ElementRef, SystemJsNgModuleLoader } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ICandidateDetailData, ISearchCandidateDetail, IModeOfJoining } from '../../../interfaces/preselection/candidate.interface';
import { ISearchInterviewClarificationList, IInterviewClarificationList, IInterviewClarificationListData, IInterviewClarificationData, IInterviewCalendarActionFormData } from '../../../interfaces/selection/interviewcalendaraction.interface';
import { CandidateService } from '../../../services/preselection/candidate/candidate.service';
import { RequisitionService } from '../../../services/preselection/requisition/requisition.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';

declare var jQuery: any;
declare var moment: any;

@Component({
  selector: 'app-source-wise-report',
  templateUrl: './source-wise-report.component.html',
  styleUrls: ['./source-wise-report.component.css']
})

export class SourceWiseReportComponent implements OnInit {
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;

  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string

  searchInterviewClarification: ISearchInterviewClarificationList = {
    calendarId: null,
    requisitionDetailId: null,
    candidateId: null
  };

  interClarifications: IInterviewClarificationList[];
  interviewClarificationList: IInterviewClarificationListData[];
  interviewClarificationdata: IInterviewClarificationData[] = [];
  calendarActionFormData: IInterviewCalendarActionFormData = {
    CalendarIds: null,
    AcceptStatus: null,
    Remarks: null,
    CreatedBy: null
  }

  filterForm: FormGroup;
  scheduleForm: FormGroup;
  btnVisible: boolean = false;
  topBtnVisible: boolean = false;
  candidates: ICandidateDetailData[] = [];
  candidateIds: string = "";

  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private candidateService: CandidateService,
    private requisitionService: RequisitionService,
    private SpinnerService: NgxSpinnerService,
    private excelService: ExcelService,
    private notificationService: NotificationService,   
  ) {       
    this.createFilterForm();    
  }

  ngOnInit() {
    this.loadSelectPicker();
    this.loadDataTable();
    this.loadDatePicker();
  }

  createFilterForm() {
    this.filterForm = this.fb.group({
      RequisitionNo:[''],
      HiringStatusId: [0],
      SourceChannelId:[''],
      fromDate: [''],       
      toDate: [''],       
    });
  }
  
  onFilter() {
    var flag = 0;
    this.filterForm.patchValue({             
      HiringStatusId: Number(this.filterForm.value.HiringStatusId),      
      RequisitionNo: this.filterForm.value.RequisitionNo,
      SourceChannelId: this.filterForm.value.SourceChannelId,
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
      this.getFilterCandidateList();
    }
  }

  ExportReport(){
    if(this.candidates.length != 0){
      this.excelService.ExportAsExcelFile(this.candidates, 'SourceWiseReport_');
    }
  }

  getFilterCandidateList() {
    this.SpinnerService.show();
    this.candidates = [];
    // this.setFilterForm();           
    this.candidateService.getCandidateList(this.filterForm.value).subscribe((result) => {
      if (result) {
        this.candidates = result;
        //console.log("Candidate List: ", this.candidates);
        // for (var i = 0; i < this.candidates.length; i++) {
        //   this.candidates[i].popoverContent = "<div><span class='grey'>Emp. ID: </span><span>" + this.candidates[i].referalEmpNo + "</span></div><div><span class='grey'>Designation: </span></br><span>" + this.candidates[i].referalDesignation + "</span></div><div><span class='grey'>Function: </span><span>" + this.candidates[i].referalGrade + "</span></div>";
        // }        
      }
      else {
        this.candidates = [];        
      }
    }, error => {
      console.log(error);      
    }, () => {
      this.loadDataTable();      
      this.SpinnerService.hide();
    });
  }
  reset() {
    this.filterForm.reset();
    this.filterForm.patchValue({
      HiringStatusId: 0,
      SourceChannelId: '',
    })
    this.onFilter();
    this.loadSelectPicker();
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
  
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }

}
