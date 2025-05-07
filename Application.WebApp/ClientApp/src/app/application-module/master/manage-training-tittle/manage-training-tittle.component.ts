import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { LocationService } from 'src/app/services/common/location/location.service';
import { CommonService } from '../../../services/common/common/common.service';
declare var jQuery: any;

@Component({
  selector: 'app-manage-training-tittle',
  templateUrl: './manage-training-tittle.component.html',
  styleUrls: ['./manage-training-tittle.component.css']
})
export class ManageTrainingTittleComponent implements OnInit {

  Operation: string = "add";
  saveForm: FormGroup;
  createdBy: number;
  searchTrainingTittle = {
    TrainingTittleId: 0,
    IsActive: null,
  }
  trainingTittleList: any[] = [];
  constructor(private commonService: CommonService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private fb: FormBuilder,
    private locationService: LocationService,
    private persistance: PersistanceService) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.createForm();
    this.loadDataTable();
    this.tableOptionDropDown();
    this.getAllTrainingTittle();
  }
  createForm() {
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      TrainingTittleId: [0],
      TrainingTittleName: ['', Validators.required],
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
  getAllTrainingTittle() {
    this.spinnerService.show();
    this.commonService.getAllTrainingTittleList(this.searchTrainingTittle).subscribe((response: any) => {
      if (response) {
        this.trainingTittleList = response;
      }
      else {
        this.trainingTittleList = [];
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
    this.commonService.insertUpdateTrainingTittle(this.saveForm.value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllTrainingTittle();
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
      TrainingTittleId: Data.trainingTittleId,
      TrainingTittleName: Data.trainingTittleName,
      IsActive: Data.isActive,
      CreatedBy: this.createdBy
    });
    jQuery(".custom-menu").hide();
  }

}
