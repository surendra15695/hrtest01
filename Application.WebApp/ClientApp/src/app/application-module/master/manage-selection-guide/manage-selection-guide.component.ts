import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { CommonService } from '../../../services/common/common/common.service';
import { LocationService } from 'src/app/services/common/location/location.service';
declare var jQuery: any;

@Component({
  selector: 'app-manage-selection-guide',
  templateUrl: './manage-selection-guide.component.html',
  styleUrls: ['./manage-selection-guide.component.css']
})
export class ManageSelectionGuideComponent implements OnInit {

  Operation: string;
  createdBy: number;
  saveForm: FormGroup;
  serachSelectionGuide = {
    SelectionGuideId: null,
    IsActive: null
  }
  selectionGuidList: any[] = [];
  searchInterview = {
    InterviewId: null,
    IsActive: null
  }
  interviewsList: any[] = [];
  interviewNames: string = "";
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
    this.getAllSelectionGuide();
    this.getAllInterviews();
  }
  createForm() {
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      SelectionGuideId: [0],
      SelectionGuideName: ['', Validators.required],
      InterviewIds: ['', Validators.required],
      selectedIds: [''],
      InterviewNames: [''],
      Description: ['', Validators.required],
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
  getAllInterviews() {
    this.spinnerService.show();
    // this.saveForm.value.IsActive = null;
    this.commonService.getAllSelectionGuideInterview(this.searchInterview).subscribe((response: any) => {
      if (response) {
        this.interviewsList = response;
      }
      else {
        this.interviewsList = [];
      }
    }, error => {
      this.spinnerService.hide();
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      // this.loadDataTable();
      this.spinnerService.hide();
    })
  }
  getAllSelectionGuide() {
    this.spinnerService.show();
    // this.saveForm.value.IsActive = null;
    this.commonService.getAllSelectionGuide(this.serachSelectionGuide).subscribe((response: any) => {
      if (response) {
        this.selectionGuidList = response;
      }
      else {
        this.selectionGuidList = [];
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
  onChangeInterview() {
    var interviewIds = this.saveForm.value.selectedIds.join(",");
    this.interviewNames = "";
    this.saveForm.value.selectedIds.forEach(element => {
      var obj = this.interviewsList.find(e => e.interviewId == element);
      if (obj != undefined) {
        this.interviewNames += (this.interviewNames == "" ? (obj.interviewName) : ("," + obj.interviewName));
      }
    })
    this.saveForm.patchValue({
      InterviewIds: interviewIds,
      InterviewNames: this.interviewNames,
    });

  }
  onSubmit() {
    this.spinnerService.show();
    this.commonService.addSelectionGuide(this.saveForm.value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllSelectionGuide();
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
    var intergerArray = [];
    var value = Data.interviewIds.split(",");
    value.forEach(element => {
      intergerArray.push(Number(element))
    })

    this.saveForm.patchValue({
      SelectionGuideId: Data.selectionGuideId,
      SelectionGuideName: Data.selectionGuideName,
      InterviewIds: Data.interviewIds,
      selectedIds: intergerArray,
      InterviewNames: Data.interviewNames,
      Description: Data.description,
      IsActive: Data.isActive,
      CreatedBy: this.createdBy
    });
    jQuery(".custom-menu").hide();
  }

}
