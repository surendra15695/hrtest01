import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { VenueService } from 'src/app/services/common/venue/venue.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { CommonService } from '../../../services/common/common/common.service';
import { LocationService } from 'src/app/services/common/location/location.service';
declare var jQuery: any;

@Component({
  selector: 'app-manage-induction-venue',
  templateUrl: './manage-induction-venue.component.html',
  styleUrls: ['./manage-induction-venue.component.css']
})
export class ManageInductionVenueComponent implements OnInit {

  Operation: string;
  inductionVenueList: any[] = [];
  locationList: any[] = [];
  saveForm: FormGroup;
  createdBy: number;
  searchLoaction = {
    LocationId: null,
    VerticalId: null,
    LocationNo: null,
    LocationCode: null,
    IsActive: true
  }
  isReadonly: boolean;
  externalLocation: any[] = [];
  searchExternalVenue = {
    ExternalVenueId: 0,
    IsActive: null,
  }
  locations: ILocation[] = [];
  combinedLocation: any[] = [];
  locationType: string = "Internal";
  searchInductionVenue = {
    InductionVenueId: null,
    IsActive: null
  }
  constructor( private venueSevice: VenueService,
    private commonService: CommonService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private fb: FormBuilder, private locationService: LocationService,
    private persistance: PersistanceService
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    //this.getAllLocation();
  }


  ngOnInit() {
    this.tableOptionDropDown();
    this.loadDataTable();
    this.createForm();
    this.getAllLocation()
    this.getAllInductionVenue();
    this.getExternalLocation()
  }
  createForm() {
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      InductionVenueId: [0],
      InductionVenueName: ['', Validators.required],
      LocationId: [null, Validators.required],
      IsActive: [true],
      IsExternal: false,
      CreatedBy: [this.createdBy]
    })
    this.isReadonly = false;
    this.locationType = "Internal";
    jQuery('.externalLocation').attr("disabled", false);
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
  getAllInductionVenue() {
    this.spinnerService.show();
    // this.saveForm.value.IsActive = null;
    this.commonService.getAllInductionVenue(this.searchInductionVenue).subscribe((response: any) => {
      if (response) {
        this.inductionVenueList = response;
      }
      else {
        this.inductionVenueList = [];
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

  getAllLocation() {
    this.spinnerService.show();
    // this.saveForm.value.IsActive = null;
    this.locationService.getAllLocation(this.searchLoaction).subscribe((response: any) => {
      if (response) {
        this.locationList = response;
        this.locationList.forEach((element, index) => {
          this.combinedLocation.push({ locationId: element.locationId, locationName: element.locationOffice });
        })
      }
      else {
        this.locationList = [];
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
  getExternalLocation() {
    this.spinnerService.show();
    this.venueSevice.getAllExternalInductionVenue(this.searchExternalVenue).subscribe((response: any) => {
      if (response) {

        this.externalLocation = response;
      }
      else {
        this.externalLocation = [];
      }
    }, error => {
      this.spinnerService.hide();
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }
  getLocationName(locationId,isExternal) {
    var locationObj;
    debugger;
    if(isExternal ==true){
       locationObj = this.externalLocation.find(e => e.externalVenueId == locationId);
    }
    else{
    locationObj = this.locationList.find(e => e.locationId == locationId);
    }
    return locationObj == null ? "N/A" : (locationObj.locationOffice == undefined ? locationObj.externalVenueName:locationObj.locationOffice );
  }
  onSubmit() {
    //this.spinnerService.show();
    console.log("values",this.saveForm.value);
    this.commonService.addInductionVenue(this.saveForm.value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.isReadonly = false;
        this.getAllInductionVenue();
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
    this.isReadonly = true;
    debugger
    this.saveForm.patchValue({
      InductionVenueId: Data.inductionVenueId,
      InductionVenueName: Data.inductionVenueName,
      LocationId: Data.locationId,
      IsActive: Data.isActive,
      IsExternal: Data.isExternal,
      CreatedBy: this.createdBy
    });
    
    if(Data.isExternal ==true){
      this.combinedLocation=[];
      this.externalLocation.forEach((element, index) => {
        this.combinedLocation.push({ locationId: element.externalVenueId, locationName: element.externalVenueName });
      })
    }
    else{
      this.combinedLocation=[];
      this.locationList.forEach((element, index) => {
        this.combinedLocation.push({ locationId: element.locationId, locationName: element.locationOffice });
      })
    }
    jQuery('.externalLocation').attr("disabled", true);
    jQuery(".custom-menu").hide();
  }
  onChangeCheckbox(eve) {
    this.spinnerService.show();
    if (eve.target.checked) {
      this.combinedLocation = [];
      this.locationType = "External";
      this.saveForm.patchValue({
        IsActive: true,
        IsExternal: true,
        CreatedBy: this.createdBy,
        AutoId: 0
      })
      this.externalLocation.forEach((element, index) => {
        this.combinedLocation.push({ locationId: element.externalVenueId, locationName: element.externalVenueName });
      })
    } 
    else {
      this.combinedLocation = [];
      this.locationType = "Internal";
      this.saveForm.reset();
      this.saveForm.patchValue({
        IsActive: true,
        IsExternal: false,
        CreatedBy: this.createdBy,
        AutoId: 0
      })
      this.locationList.forEach((element, index) => {
        this.combinedLocation.push({ locationId: element.locationId, locationName: element.locationOffice });
      })
    }
    this.spinnerService.hide();
  }
}
