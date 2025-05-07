import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GradeService } from 'src/app/services/common/grade/grade.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { CommonService } from 'src/app/services/common/common/common.service';

declare var jQuery: any;

@Component({
  selector: 'app-manage-report-header',
  templateUrl: './manage-report-header.component.html',
  styleUrls: ['./manage-report-header.component.css']
})
export class ManageReportHeaderComponent implements OnInit {

  ReportHeaderList: any[] = [];
  Operation: string;
  createdBy: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });

  constructor(
    private commonService: CommonService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private fb: FormBuilder
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }


  ngOnInit() {
    this.loadDataTable();
    this.getAllFlexiReportHeader();
    this.createForm();
    this.tableOptionDropDown();
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
  tableOptionDropDown() {
    setTimeout(() => {
      var body_ = jQuery('body');
      var dropdownMenu,
        table_responsive = jQuery('.table-responsive');
      table_responsive.on('show.bs.dropdown', function (e) {
        dropdownMenu = jQuery(e.target).find('.dropdown-menu');
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
    });
  }
  getAllFlexiReportHeader() {
    this.spinnerService.show();
    this.saveForm.value.IsActive = null;
    this.commonService.getAllFlexiReportHeader(this.saveForm.value).subscribe((response: any) => {
      if (response) {
        this.ReportHeaderList = response;
      }
      else {
        this.ReportHeaderList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    })
  }
  createForm() {
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      ReportHeaderName: ['', Validators.required],
      ReportHeaderId: [0],
      IsActive: [true]
    })
  }
  onSubmit() {
    this.spinnerService.show();
    this.commonService.addFlexiReportHeader(this.saveForm.value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllFlexiReportHeader();
        jQuery(".close").click();
      }
      else {
        this.notiService.showError(response.msg, "Error");
      }
    }, error => {
      // display form values on success
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }
  onEdit(Data: any) {
    this.Operation = 'edit';
    this.saveForm.patchValue({
      ReportHeaderName: Data.reportHeaderName,
      ReportHeaderId: Data.reportHeaderId,
      IsActive: Data.isActive
    });
  }


}
