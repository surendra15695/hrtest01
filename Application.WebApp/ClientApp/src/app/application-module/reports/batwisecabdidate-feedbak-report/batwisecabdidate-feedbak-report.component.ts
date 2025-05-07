import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { ReportService } from 'src/app/services/reports/report.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
declare var jQuery: any;

@Component({
  selector: 'app-batwisecabdidate-feedbak-report',
  templateUrl: './batwisecabdidate-feedbak-report.component.html',
  styleUrls: ['./batwisecabdidate-feedbak-report.component.css']
})
export class BatwisecabdidateFeedbakReportComponent implements OnInit {
  batchNo: string;
  
  batchId: number;

  viewcandidateList:any[]=[];
  constructor(
    public activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private SpinnerService: NgxSpinnerService,
    private fb: FormBuilder,
    private reportService: ReportService,
    private excelService: ExcelService,
    private _route: Router,
    private persistance: PersistanceService,

  )
  {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.batchId = params['BatchId'];
      this.batchNo = params['BatchNo'];
      
   })
    //this.createForm();
    //this.getAllVerticals();

  }
  ngOnInit() {
    this.loadDataTable();
    this. loadTooltipMenu() ;
    //this.loadDatePicker();
    setTimeout(() => {
      this.formSubmit();
    })
  }
  formSubmit() 
  {
    this.SpinnerService.show();
   let data = {
    BatchId:Number(this.batchId)
   }
    this.reportService.viewCandidate(data).subscribe((result) => {
      if (result) {
        this.viewcandidateList = result;
        this.loadDataTable();
        this.SpinnerService.hide();
      }
      else {
        this.viewcandidateList = [];
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
  onClickViewfeedback(data)
  {
    jQuery(".custom-menu").hide();
    this._route.navigate(['/app/report/candidatewiseviewfeedbackComponent'], 
    { queryParams: { CandidateId: data.candidateId, CandidateNo: data.candidateNo } }
  );
  }
  
  onClickBack()
  {
    this.persistance.set('parentActiveTab', "Batch");
    this._route.navigate(['/app/report/inducfeedbacktDetailsReportComponent'])
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

