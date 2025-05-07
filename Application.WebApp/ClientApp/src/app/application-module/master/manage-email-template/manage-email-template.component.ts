import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from '../../../services/common/common/common.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { IEmailTemplate, ISearchEmailTemplate, IEmailTemplateType, ISearchEmailTemplateType } from '../../../interfaces/common/emailtemplate.interface';
declare var jQuery: any;


@Component({
  selector: 'app-manage-email-template',
  templateUrl: './manage-email-template.component.html',
  styleUrls: ['./manage-email-template.component.css']
})
export class ManageEmailTemplateComponent implements OnInit {

  assessmentAssignSaveForm: FormGroup;
  loginUserId: number;
  showEmailTemplateList: boolean = true;
  showEmailTemplateAddNew: boolean = false;
  emailTemplateList: IEmailTemplate[] = [];
  searchEmailTemplate: ISearchEmailTemplate = {
    templateTypeId: null,
    templateId: null,
    isActive: true
  }
  emailTemplateTypeList: IEmailTemplateType[] = [];
  searchEmailTemplateType: ISearchEmailTemplateType = {
    TemplateTypeId: null,
    isActive: true
  }
  objSaveEmailTemplate: SaveEmailTemplate;
  isEditMode: boolean = false;
  pageName: string = "Email Template";
  constructor(
    private fb: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private commonService: CommonService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private SpinnerService: NgxSpinnerService
  ) {
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.objSaveEmailTemplate = new SaveEmailTemplate();
    this.objSaveEmailTemplate.createdBy = this.loginUserId;
    this.objSaveEmailTemplate.isActive = true;
    this.getAllEmailTemplate();
  }

  ngOnInit() {
    this.loadDataTable();
    this.tableOptionDropDown();
  }
  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        //"searching": true,
        //"paging": true,
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
  getAllEmailTemplate() {
    this.spinnerService.show();
    this.commonService.getAllEmailTemplate(this.searchEmailTemplate).subscribe((response: any) => {
      if (response) {
        this.emailTemplateList = response;
        console.log("Email template list", this.emailTemplateList);
      }
      else {
        this.emailTemplateList = [];
      }
    }, error => {
      this.spinnerService.hide();
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    })
  }
  onClickAddNew() {
    this.pageName = "New Email Template";
    this.showEmailTemplateAddNew = true;
    this.showEmailTemplateList = false;
    this.objSaveEmailTemplate = new SaveEmailTemplate();
    this.objSaveEmailTemplate.createdBy = this.loginUserId;
    this.objSaveEmailTemplate.isActive = true;
    this.isEditMode = false;
    jQuery(".custom-menu").hide();
    this.getAllEmailTemplateType();
  }
  onBackClick() {
    this.pageName = "Email Template";
    this.showEmailTemplateAddNew = false;
    this.showEmailTemplateList = true;
    this.getAllEmailTemplate();
    this.tableOptionDropDown();
    jQuery(".custom-menu").hide();
  }
  getAllEmailTemplateType() {
    this.spinnerService.show();
    this.emailTemplateTypeList = [];
    this.commonService.getAllEmailTemplateType(this.searchEmailTemplateType).subscribe((response: any) => {
      if (response) {
        this.emailTemplateTypeList = response;
      }
      else {
        this.emailTemplateTypeList = [];
      }
    }, error => {
      this.spinnerService.hide();
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }
  onChangeTemplateType() {
    // this.searchEmailTemplate.templateTypeId = this.objSaveEmailTemplate.templateTypeId;
    // this.searchEmailTemplate.isActive = true;
    // this.commonService.getAllEmailTemplate(this.searchEmailTemplate).subscribe((response: any) => {
    //   console.log("find",response);
    //   if (response.length > 0) {
    //     this.notificationService.showError("This template already added . please go to list and edit if any modification required", "Error");
    //     this.objSaveEmailTemplate = new SaveEmailTemplate();
    //     this.objSaveEmailTemplate.createdBy = this.loginUserId;
    //     this.objSaveEmailTemplate.isActive = true;
    //   }
    //   else {
    //     this.searchEmailTemplate.templateTypeId = null;
    //   }
    // }, error => {
    //   this.spinnerService.hide();
    //   this.notificationService.showError("Something went wrong.. Try again later..", "")
    //   console.log(error);
    // }, () => {
    //   this.spinnerService.hide();
    // })
  }
  onClickSubmit() {
    if (this.isValid()) {
      // console.log("Email Template Obj", this.objSaveEmailTemplate);
      this.SpinnerService.show();
      this.commonService.saveEmailTemplate(this.objSaveEmailTemplate).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.pageName = "Email Template";
          }
        }
        else {
          this.SpinnerService.hide();
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
      }, () => {
        this.showEmailTemplateAddNew = false;
        this.showEmailTemplateList = true;
        this.getAllEmailTemplate();
        this.SpinnerService.hide();
        // jQuery(".custom-menu").hide();
        this.tableOptionDropDown();
      });
    }
  }
  isValid(): boolean {
    if (this.objSaveEmailTemplate.templateTypeId == undefined || this.objSaveEmailTemplate.templateTypeId == null) {
      this.notificationService.showError("Please Selecte Template Type", "Error");
      return false;
    }
    if (this.objSaveEmailTemplate.templateEmailName == undefined || this.objSaveEmailTemplate.templateEmailName.trim() == "") {
      this.notificationService.showError("Please Enter Template Name", "Error");
      return false;
    }
    if (this.objSaveEmailTemplate.templateDescription == undefined || this.objSaveEmailTemplate.templateDescription.trim() == "") {
      this.notificationService.showError("Please Enter Template Description", "Error");
      return false;
    }

    return true;
  }
  onClickEdit(record) {
    this.pageName = "Edit Email Template";
    this.showEmailTemplateAddNew = true;
    this.showEmailTemplateList = false;
    jQuery(".custom-menu").hide();
    this.getAllEmailTemplateType();
    this.isEditMode = true;
    var dataforEditFind = this.emailTemplateList.find(e => e.templateId == record.templateId && e.templateTypeId == record.templateTypeId);
    this.objSaveEmailTemplate = dataforEditFind;
    this.objSaveEmailTemplate.createdBy = this.loginUserId;
    // this.objSaveEmailTemplate.isActive = true;    
  }
  onClickCancel() {
    this.pageName = "Email Template";
    this.showEmailTemplateAddNew = false;
    this.showEmailTemplateList = true;
    this.objSaveEmailTemplate = new SaveEmailTemplate();
    this.objSaveEmailTemplate.createdBy = this.loginUserId;
    this.objSaveEmailTemplate.isActive = true;
    this.getAllEmailTemplate();
    this.tableOptionDropDown();
    jQuery(".custom-menu").hide();
  }

}

export class SaveEmailTemplate {
  templateId: number;
  templateTypeId: number;
  templateEmailName: string;
  templateDescription: string;
  isActive: boolean
  createdBy: number;
}
