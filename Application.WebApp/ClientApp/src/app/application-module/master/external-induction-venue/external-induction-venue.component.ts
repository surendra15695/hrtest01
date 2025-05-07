import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { LocationService } from 'src/app/services/common/location/location.service';
import { VenueService } from 'src/app/services/common/venue/venue.service';
declare var jQuery: any;

@Component({
  selector: 'app-external-induction-venue',
  templateUrl: './external-induction-venue.component.html',
  styleUrls: ['./external-induction-venue.component.css']
})
export class ExternalInductionVenueComponent implements OnInit {

  Operation: string;
  ExternalVenueList: any[] = [];
  locationList: any[] = [];
  saveForm: FormGroup;
  createdBy: number;
  searchExternalVenue = {
    ExternalVenueId: 0,
    IsActive: null,
  }
  constructor( private venueSevice: VenueService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private fb: FormBuilder, private locationService: LocationService,
    private persistance: PersistanceService) {this.createdBy = this.persistance.get('loggedinuser').autoUserId;}

  ngOnInit() {
    this.createForm();
    this.loadDataTable();
    this.tableOptionDropDown();
    this.getAllExternalInductionVenue();
  }
  createForm() {
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      ExternalVenueId: [0],
      ExternalVenueName: ['', Validators.required],
      ExternalVenueAddress: ['', Validators.required],
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
  onEdit(Data: any)
  {
    this.Operation = 'edit';
    this.saveForm.patchValue({
      ExternalVenueId: Data.externalVenueId,
      ExternalVenueName: Data.externalVenueName,
      ExternalVenueAddress: Data.externalVenueAddress,
      IsActive: Data.isActive,
      CreatedBy: this.createdBy
    });
    jQuery(".custom-menu").hide();
  }
  
  getAllExternalInductionVenue()
  {
    this.spinnerService.show();
    this.venueSevice.getAllExternalInductionVenue(this.searchExternalVenue).subscribe((response: any) => {
      if (response) {
        this.ExternalVenueList = response;
      }
      else {
        this.ExternalVenueList = [];
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
    this.venueSevice.addExternalInductionVenue(this.saveForm.value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllExternalInductionVenue();
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
}
