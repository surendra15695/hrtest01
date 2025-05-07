import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { CommonService } from '../../../services/common/common/common.service';
import { LocationService } from 'src/app/services/common/location/location.service';
import { ICountry, ISearchCountry } from '../../../interfaces/common/country.interface';
import { CommondataService } from '../../../services/common/commondata/commondata.service';

declare var jQuery: any;

@Component({
  selector: 'app-manage-state',
  templateUrl: './manage-state.component.html',
  styleUrls: ['./manage-state.component.css']
})
export class ManageStateComponent implements OnInit {
  Operation: string;
  createdBy: number;
  stateList: any[] = [];
  saveForm: FormGroup;
  searchState = {
    StateId: 0,
    IsActive: null
  }
  searchCountry: ISearchCountry = {
    countryId: null,
    isActive: true
  }
  countries: ICountry[] = [];
  constructor(
    private commonService: CommonService,
    private commonDataService:CommondataService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private fb: FormBuilder,
    private locationService: LocationService,
    private persistance: PersistanceService
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.tableOptionDropDown();
    this.createForm();
    this.loadDataTable();
    this.getAllState();
    this.getAllCountry();
  }
  createForm() {
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      CountryId: null,
      StateId: [0],
      StateName: ['', Validators.required],
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
  getAllState() {
    this.spinnerService.show();
    // this.saveForm.value.IsActive = null;
    this.commonService.getAllMasterState(this.searchState).subscribe((response: any) => {
      if (response) {
        console.log("response",response);
        this.stateList = response;
      }
      else {
        this.stateList = [];
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
    if(this.Operation=='edit'){
    this.saveForm.value.StateName= this.stateList.find(e => e.stateId == this.saveForm.value.StateId).stateName;
    }
    this.spinnerService.show();
    this.commonService.addState(this.saveForm.value).subscribe((response: any) => {
      if (response.successFlag == 1) {  
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllState();
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
      StateId: Data.stateId,
      StateName: Data.stateName,
      CountryId: Data.countryId,
      IsActive: Data.isActive,
      CreatedBy: this.createdBy
    });
    jQuery(".custom-menu").hide();
  }
  getAllCountry() {
    this.countries = [];
    this.commonDataService.getAllCountry(this.searchCountry).subscribe((result) => {
      if (result) {
        console.log("country",result);
        this.countries = result;
      }
      else {
        this.countries = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

}
