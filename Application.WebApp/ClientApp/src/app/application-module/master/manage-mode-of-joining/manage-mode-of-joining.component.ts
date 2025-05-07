import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { CommonService } from '../../../services/common/common/common.service'
declare var jQuery: any;

@Component({
  selector: 'app-manage-mode-of-joining',
  templateUrl: './manage-mode-of-joining.component.html',
  styleUrls: ['./manage-mode-of-joining.component.css']
})
export class ManageModeOfJoiningComponent implements OnInit {

  Operation: string;
  modeOfJoiningList: any[] = [];
  saveForm: FormGroup;
  createdBy: number;
  searchModeOfJoinig = {
    ModeofJoiningId: null,
    IsActive: 1
  }
  constructor(
    private commonService: CommonService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private fb: FormBuilder,
    private persistance: PersistanceService
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }


  ngOnInit() {
    this.tableOptionDropDown();
    this.loadDataTable();
    this.createForm();
    this.getAllModeOfJoining();
  }
  createForm() {
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      ModeofJoiningId: [0],
      IsActive: [true],
      ModeofJoiningName: ['', Validators.required],
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
  getAllModeOfJoining() {
    this.spinnerService.show();
    // this.saveForm.value.IsActive = null;
    this.commonService.getAllModeOfjoining(this.searchModeOfJoinig).subscribe((response: any) => {
      if (response) {
        this.modeOfJoiningList = response;
      }
      else {
        this.modeOfJoiningList = [];
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
    this.commonService.addModeOfJoining(this.saveForm.value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllModeOfJoining();
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
      ModeofJoiningId: Data.modeofJoiningId,
      ModeofJoiningName: Data.modeofJoiningName,
      IsActive: Data.isActive,
      CreatedBy: this.createdBy
    });
    jQuery(".custom-menu").hide();
  }
}
