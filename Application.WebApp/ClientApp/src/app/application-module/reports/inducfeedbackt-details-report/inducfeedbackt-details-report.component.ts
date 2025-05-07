import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IFunctionDepartment, ISearchDepartment } from 'src/app/interfaces/common/department.interface';
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { DepartmentService } from 'src/app/services/common/department/department.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { ReportService } from 'src/app/services/reports/report.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';

declare var jQuery: any;
@Component({
  selector: 'app-inducfeedbackt-details-report',
  templateUrl: './inducfeedbackt-details-report.component.html',
  styleUrls: ['./inducfeedbackt-details-report.component.css']
})
export class InducfeedbacktDetailsReportComponent implements OnInit {
  JoiningType: string;

  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  @ViewChild('fromDateB', { static: false }) fBDate: ElementRef;
  @ViewChild('toDateB', { static: false }) tBDate: ElementRef;

  //@ViewChild('joiningtype', { static: false }) jtype: ElementRef;
  searchformI: FormGroup;
  searchformB: FormGroup;
  saveform: FormGroup;
  parentActiveTab: string = "Individual";
  notificationService: any;
  constructor
  (
    //private departmentService: DepartmentService,
    private SpinnerService: NgxSpinnerService,
    private reportService: ReportService,
    private persistance: PersistanceService,
    private _route: Router,
    private fb: FormBuilder,
    private excelService: ExcelService,
  ) { 
     if(this.persistance.get('parentActiveTab')=="Individual")
       {
        this.parentActiveTab="Individual"
      }
   
  }
  
  objModel: any = {};
  batchModel : any = {};
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  
  newJoinerIndividual:any[]=[];
  newJoinerBatch:any[]=[];

  ngOnInit() {
    this.createFormI();
    this.createFormB();
    this.loadDatePicker();
    this.loadDataTable();
    this.getAllVerticals();
    this.loadTooltipMenu();
    setTimeout(() => {
      if(this.parentActiveTab=="Individual")
        {
          this.getIndividualNewJoiner();
        }
      else{
        this.getBatchnewJoiner();
      }
    })
  }
  createFormI(){
      this.searchformI = this.fb.group({
        verticalId: [0],
        fromDate: [''],
        toDate: [''],
       joiningType :["I"]
      });
    }
    createFormB(){
      this.searchformB = this.fb.group({
        verticalId: [0],
        fromDate: [''],
        toDate: [''],
       joiningType :["B"]
      });
    }
  getAllVerticals() {
    this.verticals = [];
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    this.loadSelectPicker();
    this.objModel.verticalId = this.verticals.filter(x => x.verticalId == 0)[0].verticalId;
  }
  OnClickIndividualTab() {
    this.parentActiveTab="Individual";
    this.getAllVerticals();   
    this.getIndividualNewJoiner();
    jQuery("#chkAllIndividualScheduled").prop("checked", false);

  }
  onClickBatchTab() {
    this.parentActiveTab="Batch";
    this.getBatchnewJoiner();
    jQuery("#chkAllIndividualScheduled").prop("checked", false);

  }
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }
  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "fixedColumns": {
          "left": 3
        },
        "drawCallback": function (settings) {
          setTimeout(() => {
            jQuery('[data-toggle="popover"]').popover({
              html: true
            });
          });
        }
      });
    });
  }
  loadDataTable2() {
    jQuery('#dataTable2').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable2').DataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "fixedColumns": {
          "left": 3
        },
        "drawCallback": function (settings) {
          setTimeout(() => {
            jQuery('[data-toggle="popover"]').popover({
              html: true
            });
          });
        }
      });
    });
  }
  
  changeVertical() {
    console.log("vert", this.objModel.verticalId)
    //this.getAllFunctionDepartment();
  }
 
  getIndividualNewJoiner() 
  {
    var flag = 0;
    console.log(this.fDate.nativeElement);

    this.searchformI.patchValue(
      {
        fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,
        joiningType : "I"
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
      
     this.SpinnerService.show();
    this.reportService.inductionfeedbackReportIndividual(this.searchformI.value).subscribe((result) => {
      if (result) {
        this.newJoinerIndividual=result;
        this.loadDataTable();
        this.SpinnerService.hide();
      }
      else {
        this.newJoinerIndividual = [];
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
  getBatchnewJoiner(){
    var flag = 0;
    //console.log(this.fDate.nativeElement);

    this.searchformB.patchValue(
      {
        fromDate: this.fBDate.nativeElement.value == undefined ? "" : this.fBDate.nativeElement.value,
        toDate: this.tBDate.nativeElement.value == undefined ? "" : this.tBDate.nativeElement.value,
        joiningType : "B"

      }
    )
    
    if (this.fBDate.nativeElement.value.length > 0 && this.tBDate.nativeElement.value.length > 0 ) 
      {
      const [fDay, fMonth, fYear] = this.fBDate.nativeElement.value.split("/");
      const fBDate = new Date(fYear, fMonth - 1, fDay);
      const [tDay, tMonth, tYear] = this.tBDate.nativeElement.value.split("/");
      const tBDate = new Date(tYear, tMonth - 1, tDay);
      
      if (fBDate > tBDate) {
        this.notificationService.showError("To Date Cann't be less than from From Date !! Please provide actual date", "Error");
        flag = 1;
      }
    }
    if(flag==0)
    {
     this.SpinnerService.show();
    this.reportService.inductionfeedbackReportBatch(this.searchformB.value).subscribe((result) => 
      {
      if (result) {
        this.newJoinerBatch=result;
        this.SpinnerService.hide();
        this.loadDataTable2();

      }
      else {
        this.newJoinerBatch = [];
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
  OnClickFilterIndividual()
  {
    this.getIndividualNewJoiner();
  }
  OnClickIndividualReset()
  {
    this.objModel={};
    
    this.fDate.nativeElement.value="";
    this.tDate.nativeElement.value="";
    
    this.getIndividualNewJoiner();
  }
  OnClickFilterBatch()
  {
    this.getBatchnewJoiner();
  }
  OnClickBatchReset()
  {
    //this.batchModel={};
    this.searchformB.reset();
    this.fBDate.nativeElement.value="";
    this.tBDate.nativeElement.value="";
    this.getBatchnewJoiner();
  }
  onClickViewfeedback(data)
  {
    jQuery(".custom-menu").hide();
    this._route.navigate(['/app/report/candidatewiseviewfeedbackComponent'], 
    { queryParams: { CandidateId: data.candidateId, CandidateNo: data.candidateNo } }
  );
  }
  onClickViewCandidate(data){
    jQuery(".custom-menu").hide();
    this._route.navigate(['/app/report/batwisecabdidateFeedbakReportComponent'], { queryParams: { BatchId: data.batchId, BatchNo: data.batchNo } });
  }
  
  loadSelectPicker() {
    setTimeout(() => {
      jQuery('.selectpicker').selectpicker({
        size: 6
      });
      jQuery('.selectpicker').selectpicker('refresh');
    });
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
      jQuery(".custom-menu").find(".dropdown-item").on("click", function (e) {
        jQuery(e.target).append(dropdownMenu.detach());
        jQuery(e.target).find('.custom-menu').hide();
      });
    });
  }
  ngOnDestroy() {
    jQuery(".custom-menu").hide();
  }

  
}
