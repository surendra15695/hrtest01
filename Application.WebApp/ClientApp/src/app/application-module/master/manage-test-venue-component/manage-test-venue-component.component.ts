import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { CommonService } from '../../../services/common/common/common.service';
import { LocationService } from 'src/app/services/common/location/location.service';
declare var jQuery: any;

@Component({
  selector: 'app-manage-test-venue-component',
  templateUrl: './manage-test-venue-component.component.html',
  styleUrls: ['./manage-test-venue-component.component.css']
})
export class ManageTestVenueComponentComponent implements OnInit {
  Operation: string;
  interviewVenueList: any[] = [];
  locationList: any[] = [];
  saveForm: FormGroup;
  createdBy: number;
  searchTestVenue = {
    TestVenueId: null,
    IsActive: null,
  }

  constructor( 
    private commonService: CommonService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private fb: FormBuilder, private locationService: LocationService,
    private persistance: PersistanceService) { 
      this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    }

  ngOnInit() {
    this.createForm();
    this.loadDataTable();
    this.getAllTestVenue();
    this.tableOptionDropDown();
  }
  createForm() {
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      TestVenueId: [0],
      TestVenueName: ['', Validators.required],
      TestVenueAddress: ['', Validators.required],
      IsActive: [true],
      CreatedBy: [this.createdBy],
      StateId:[1]
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
  getAllTestVenue() {
    this.spinnerService.show();
    // this.saveForm.value.IsActive = null;
    this.commonService.getAllTestVenue(this.searchTestVenue).subscribe((response: any) => {
      if (response) {
        this.interviewVenueList = response;
        console.log("piu",this.interviewVenueList)
      }
      else {
        this.interviewVenueList = [];
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
    console.log("chc",this.saveForm.value)
    this.commonService.addtestvenue(this.saveForm.value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllTestVenue();
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
      TestVenueId: Data.testVenueId,
      TestVenueName: Data.testVenueName,
      TestVenueAddress: Data.testVenueAddress,
      IsActive: Data.isActive,
      CreatedBy: this.createdBy
    });
    jQuery(".custom-menu").hide();
  }
}
