import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { CommonService } from '../../../services/common/common/common.service';
import { LocationService } from 'src/app/services/common/location/location.service';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { VenueService } from 'src/app/services/common/venue/venue.service';
declare var jQuery: any;

@Component({

  selector: 'app-managelocationwisetrainingincharge',
  templateUrl: './managelocationwisetrainingincharge.component.html',
  styleUrls: ['./managelocationwisetrainingincharge.component.css']
})
export class ManagelocationwisetraininginchargeComponent implements OnInit {
  Operation: string;
  saveForm: FormGroup;
  createdBy: number;
  searchLocationWiseTrainingIncharge = {
    AutoId: null,
    LocationId: null

  }
  locationWiseTrainingInchargeList: any[] = [];
  trainingInchargeList: any[] = [];
  searchInductionVenue = {
    InductionVenueId: null,
    IsActive: true
  }
  inductionVenueList: any[] = [];
  searchRoleWiseUser = {
    RoleId: 31
  }
  isReadonly: boolean;
  //location
  locations: ILocation[] = [];
  selectedLocation: ILocation;
  searchLocation: ISearchLocation =
    {
      locationId: null,
      verticalId: null,
      locationCode: null,
      locationNo: null,
      isActive: true
    };
  searchExternalVenue = {
    ExternalVenueId: 0,
    IsActive: null,
  }
  externalLocation: any[] = [];
  locationType: string = "Internal";
  combinedLocation: any[] = [];
  constructor(
    private commonService: CommonService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private fb: FormBuilder, private locationService: LocationService,
    private persistance: PersistanceService, private venueSevice: VenueService
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;

  }

  ngOnInit() {
    this.tableOptionDropDown();
    this.createForm();
    this.loadDataTable();
    this.getRoleWiseUser();
    // this.getInductionVenue();
    this.getAllLocation();
    this.getExternalLocation();
    this.getAllLocationWiseTrainingIncharge();
  }
  createForm() {
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      LocationId: [null, Validators.required],
      AutoUserId: [null, Validators.required],
      IsExternal: false,
      CreatedBy: [this.createdBy],
      IsActive: [true],
      AutoId: [0]
    })
    this.isReadonly = false;
    jQuery('.externalLocation').attr("disabled", false);
    this.getAllLocation();
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
  getAllLocation() {
    this.locations = [];
    this.combinedLocation = [];
    this.locationService.getAllLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        this.locations = result;
        this.locations.forEach((element, index) => {
          this.combinedLocation.push({ locationId: element.locationId, locationName: element.locationOffice });
        })
      }
      else {
        this.locations = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
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
  getRoleWiseUser() {
    this.spinnerService.show();
    this.commonService.getRoleWiseUser(this.searchRoleWiseUser).subscribe((response: any) => {
      if (response) {
        this.trainingInchargeList = response;
      }
      else {
        this.trainingInchargeList = [];
      }
    }, error => {
      this.spinnerService.hide();
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }
  // getInductionVenue() {
  //   this.spinnerService.show();    
  //   this.commonService.getAllInductionVenue(this.searchInductionVenue).subscribe((response: any) => {
  //     if (response) {
  //       this.inductionVenueList = response;
  //       console.log("Induction venue List", this.inductionVenueList);
  //     }
  //     else {
  //       this.inductionVenueList = [];
  //     }
  //   }, error => {
  //     this.spinnerService.hide();
  //     this.notiService.showError("Something went wrong.. Try again later..", "")
  //     console.log(error);
  //   }, () => {
  //     this.spinnerService.hide();
  //   })
  // }
  getAllLocationWiseTrainingIncharge() {
    this.spinnerService.show();
    this.commonService.getAllLocationWiseTrainingIncharge(this.searchLocationWiseTrainingIncharge).subscribe((response: any) => {
      if (response) {
        this.locationWiseTrainingInchargeList = response;
      }
      else {
        this.locationWiseTrainingInchargeList = [];
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
  onChangeCheckbox(eve) {
    this.spinnerService.show();
    if (eve.target.checked) {
      this.combinedLocation = [];
      this.locationType = "External";
      this.saveForm.reset();
      this.saveForm.patchValue({
        IsActive: true,
        IsExternal: true,
        CreatedBy: this.createdBy,
        AutoId: 0
      })
      this.externalLocation.forEach((element, index) => {
        this.combinedLocation.push({ locationId: element.externalVenueId, locationName: element.externalVenueName });
      })
    } else {
      this.combinedLocation = [];
      this.locationType = "Internal";
      this.saveForm.reset();
      this.saveForm.patchValue({
        IsActive: true,
        IsExternal: false,
        CreatedBy: this.createdBy,
        AutoId: 0
      })
      this.locations.forEach((element, index) => {
        this.combinedLocation.push({ locationId: element.locationId, locationName: element.locationOffice });
      })
    }
    this.spinnerService.hide();
  }
  onSubmit() {
    this.spinnerService.show();
    this.commonService.addLocationWiseTrainingIncharge(this.saveForm.value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllLocationWiseTrainingIncharge();
        jQuery(".close").click();
        this.isReadonly = false;
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
      LocationId: Data.locationId,
      AutoUserId: Data.autoUserId,
      CreatedBy: this.createdBy,
      IsActive: Data.isActive,
      AutoId: Data.autoId,
      IsExternal: Data.isExternal
    });
    this.isReadonly = true;
    jQuery('.externalLocation').attr("disabled", true);
    jQuery(".custom-menu").hide();
  }


}
