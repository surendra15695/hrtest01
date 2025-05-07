import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../sharedservices/notification.service';
import { VerticalService } from 'src/app/services/common/vertical/vertical.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { InterviewService } from 'src/app/services/common/interview/interview.service';
import { CommonService } from 'src/app/services/common/common/common.service';
import { EmployeeSalaryReportComponent } from '../../reports/employee-salary-report/employee-salary-report.component';

declare var jQuery: any;

@Component({
  selector: 'app-mail-sending-form',
  templateUrl: './mail-sending-form.component.html',
  styleUrls: ['./mail-sending-form.component.css']
})
export class MailSendingFormComponent implements OnInit {
  createdBy: number = 0;
  mailSendingMaster: any[] = [];
  mailData: any[] = [];
  mailTemplate: any;
  visibleEmailButton: boolean = false;
  selectedItems: any[] = [];
  selectedEmailType: number = 0;

  activeTab: string = "1";
  pendingComunication: string = "";
  completedCommunication: string = "";

  pendingComunicationClass: string = "";
  completedCommunicationClass: string = "";
  clearFirstType: any;
  clearSecondType: any;
  selectAll: boolean = false;
  constructor(
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private commonService: CommonService,
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.pendingComunication = "nav-link active";
    this.completedCommunication = "nav-link";
    this.pendingComunicationClass = "tab-pane fade show active";
    this.completedCommunicationClass = "tab-pane fade";
  }

  ngOnInit() {
    this.tableOptionDropDown();
    this.GetAllMailSending();
  }

  loadDataTable1() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "fixedColumns": {
          "left": 3
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

  GetAllMailSending() {
    this.spinnerService.show();
    this.commonService.GetAllEmailTypeToSendMail().subscribe((response: any) => {
      if (response) {
        this.mailSendingMaster = response;
      }
      else {
        this.mailSendingMaster = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      this.spinnerService.hide();
    }, () => {
      this.spinnerService.hide();
    })
  }

  GetAllEmailsByTypeID(event) {
    this.selectedEmailType = event;
    this.visibleEmailButton = false;
    this.selectedItems = [];
    this.selectAll=false;
    this.spinnerService.show();
    var body = {
      EmailTypeId: event,
      CreatedBy: this.createdBy,
      IsPending: this.activeTab == '1' ? false : true
    }
    this.commonService.GetAllEmailsByTypeID(body).subscribe((response: any) => {
      if (response) {
        this.mailData = response;
      }
      else {
        this.mailData = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      this.spinnerService.hide();
    }, () => {
      if (this.activeTab == '1')
        this.loadDataTable1();
      else
        this.loadDataTable2();
      this.spinnerService.hide();
    })
  }
  ToggleEmail(value) {
    jQuery("#myModal").modal('show');
    this.mailTemplate = value;
  }
  closeTemplate() {
    jQuery("#myModal").modal('hide');
  }
  getEnableStatus(data) {
    return data.checked;
  }
  onCheckRowWise(data, event, index) {
    if (event.target.checked)
      this.selectedItems.push(data);
    else
      this.selectedItems = this.selectedItems.filter(e => e.autoId != data.autoId);
    this.selectedItems.length == 0 ? this.visibleEmailButton = false : this.visibleEmailButton = true;
    this.selectAll=false;
    // if (this.selectedItems.length >= 16) {
    //   jQuery("#" + index).prop("checked", false);
    //   this.selectedItems = this.selectedItems.filter(e => e.autoId != data.autoId);
    //   this.notiService.showError("You can select 15 items at a time", "Error");
    // }
  }
  OnClickSendMail() {
    if (this.selectedEmailType == 52) {
      this.sendUpdatedScheduleMail();
    } else if (this.selectedEmailType == 53) {
      this.sendWelcomeMail();
    } else if (this.selectedEmailType == 54) {
      this.sendBookAccommodationMail();
    }
    else if (this.selectedEmailType == 55) {
      this.sendMailToNaukriCandidates();
    }
    else {
      this.sendMailFromMailHistoryData();
    }

  }
  sendUpdatedScheduleMail() {
    this.spinnerService.show();
    this.commonService.SendMailForUpdatedSchedule(this.selectedItems).subscribe((response: any) => {
      this.notiService.showSuccess("Mail Has been Send", "Success");
      this.GetAllEmailsByTypeID(this.selectedEmailType);
      this.selectedItems = [];
      this.visibleEmailButton = false;
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      this.spinnerService.hide();
    }, () => {

      this.spinnerService.hide();
    })
  }
  sendWelcomeMail() {
    this.spinnerService.show();
    this.commonService.SharewithCandidateWelcomeMail(this.selectedItems).subscribe((response: any) => {
      this.notiService.showSuccess("Mail Has been Send", "Success");
      this.GetAllEmailsByTypeID(this.selectedEmailType);
      this.selectedItems = [];
      this.visibleEmailButton = false;
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      this.spinnerService.hide();
    }, () => {

      this.spinnerService.hide();
    })
  }
  sendBookAccommodationMail() {
    this.spinnerService.show();
    this.commonService.SendBookAccommodationMail(this.selectedItems).subscribe((response: any) => {
      this.notiService.showSuccess("Mail Has been Send", "Success");
      this.GetAllEmailsByTypeID(this.selectedEmailType);
      this.selectedItems = [];
      this.visibleEmailButton = false;
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      this.spinnerService.hide();
    }, () => {

      this.spinnerService.hide();
    })
  }
  sendMailFromMailHistoryData() {
    this.spinnerService.show();
    this.commonService.SendMailForSelectedItems(this.selectedItems).subscribe((response: any) => {
      this.notiService.showSuccess("Mail Has been Send", "Success");
      this.GetAllEmailsByTypeID(this.selectedEmailType);
      this.selectedItems = [];
      this.visibleEmailButton = false;
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      this.spinnerService.hide();
    }, () => {

      this.spinnerService.hide();
    })
  }

  sendMailToNaukriCandidates() {
    this.spinnerService.show();
    this.commonService.SendEmailNaukriCandidates(this.selectedItems).subscribe((response: any) => {
      this.notiService.showSuccess("Mail Has been Send", "Success");
      this.GetAllEmailsByTypeID(this.selectedEmailType);
      this.selectedItems = [];
      this.visibleEmailButton = false;
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      this.spinnerService.hide();
    }, () => {

      this.spinnerService.hide();
    })
  }
  OnClickCommunicationPending() {
    this.activeTab = '1';
    this.mailData = [];
    jQuery('#dataTable1').DataTable().clear().destroy();
    jQuery('#dataTable2').DataTable().clear().destroy();
    this.clearFirstType = undefined;
    this.clearSecondType = undefined;
    this.selectAll=false;
    this.visibleEmailButton = false;
  }
  OnClickCompletedCommunication() {
    this.activeTab = '2';
    this.mailData = [];
    jQuery('#dataTable1').DataTable().clear().destroy();
    jQuery('#dataTable2').DataTable().clear().destroy();
    this.clearFirstType = undefined;
    this.clearSecondType = undefined;
    this.selectAll=false;
    this.visibleEmailButton = false;
  }
  onCheckSelectAll(eve) {
    if (eve.target.checked) {
      this.selectedItems = [];
      this.selectedItems = this.mailData;
      this.visibleEmailButton = true;
      for (var i = 0; i < this.mailData.length; i++) {
        jQuery("#" + i).prop("checked", true);
      }
    }
    else {
      this.selectedItems = [];
      this.visibleEmailButton = false;
      jQuery("#ani").prop("checked", false);
      for (var i = 0; i < this.mailData.length; i++) {
        jQuery("#" + i).prop("checked", false);
      }
    }
  }
}

