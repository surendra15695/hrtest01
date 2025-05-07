import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { CommonService } from '../../../services/common/common/common.service';
import { LocationService } from 'src/app/services/common/location/location.service';
declare var jQuery: any;

@Component({
  selector: 'app-manage-induction-mode',
  templateUrl: './manage-induction-mode.component.html',
  styleUrls: ['./manage-induction-mode.component.css']
})
export class ManageInductionModeComponent implements OnInit {

  Operation: string;
  saveForm: FormGroup;
  createdBy: number;
  inductionModeList: any[] = [];
  searchInductionMode = {
    InductionModeId: null,
    IsActive: null
  }
  constructor(
    private commonService: CommonService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private fb: FormBuilder, private locationService: LocationService,
    private persistance: PersistanceService
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;

  }

  ngOnInit() {
    this.tableOptionDropDown();
    this.createForm();
    this.loadDataTable();
    this.getAllInductionMode();
  }
  createForm() {
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      InductionModeId: [0],
      InductionModeName: ['', Validators.required],
      IsActive: [true],
      CreatedBy: [this.createdBy]
    })
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
  getAllInductionMode() {
    this.spinnerService.show();
    // this.saveForm.value.IsActive = null;
    this.commonService.getAllInductionMode(this.searchInductionMode).subscribe((response: any) => {
      if (response) {
        this.inductionModeList = response;
      }
      else {
        this.inductionModeList = [];
      }
    }, error => {
      this.spinnerService.hide();
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    })
  }
  onSubmit() {
    this.spinnerService.show();
    this.commonService.addInductionMode(this.saveForm.value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllInductionMode();
        jQuery(".close").click();
        jQuery(".custom-menu").hide();
      }
      else {
        this.notiService.showError(response.msg, "Error");
      }
    }, error => {
      this.spinnerService.hide();
      jQuery(".custom-menu").hide();
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }
  onEdit(Data: any) {
    this.Operation = 'edit';
    this.saveForm.patchValue({
      InductionModeId: Data.inductionModeId,
      InductionModeName: Data.inductionModeName,
      IsActive: Data.isActive,
      CreatedBy: this.createdBy
    });
    jQuery(".custom-menu").hide();
  }

}
