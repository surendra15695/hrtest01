import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { CommonService } from 'src/app/services/common/common/common.service';
import { ICountry, ISearchCountry } from '../../../interfaces/common/country.interface';
import { CommondataService } from '../../../services/common/commondata/commondata.service';
import { LocationService } from 'src/app/services/common/location/location.service';
declare var jQuery: any;
@Component({
  selector: 'app-country-state-location-mapping',
  templateUrl: './country-state-location-mapping.component.html',
  styleUrls: ['./country-state-location-mapping.component.css']
})
export class CountryStateLocationMappingComponent implements OnInit {
  Operation: string;
  locationList: any[] = [];
  countryId:number;
  stateList: any[] = [];
  countries: ICountry[] = [];
  searchForm: FormGroup;
  locationListforall:any[]=[];
  searchCountry: ISearchCountry = {
    countryId: null,
    isActive: true
  }
  createdBy: number;

  saveForm = new FormGroup({
    Name: new FormControl('')
  });
  datalist: any[] = [];
  constructor(
    private locationService: LocationService,
    private commonDataService:CommondataService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private commonService: CommonService,
    private fb: FormBuilder
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
   }

  ngOnInit() {
    this.getAllMapping();
    this.getAllMappedAndUnmappedLocation();
    this.createForm();
    this.createSearchForm();
    this.getAllCountry();
    this.getAllLocation(); 
    this.tableOptionDropDown()
    this.loadDataTable();
  }
  createSearchForm() {
    this.searchForm = this.fb.group({
      CountryId: null,
      StateId: null,
      LocationId:null,
      isActive:false
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
  onSubmit() {
    var flag=0;
    if(this.saveForm.value.CountryId ==null){
      this.notiService.showError("Please Select Country", "Error");
      flag=1;
    }
    else if(this.saveForm.value.StateId==null){
      this.notiService.showError("Please Select State", "Error");
      flag=1;
    }
    else if(this.saveForm.value.LocationId==null){
      this.notiService.showError("Please Select a location", "Error");
      flag=1;
    }
    if(flag==0){
      this.spinnerService.show(); 
    this.commonService.addCountryStateLocationMapping(this.saveForm.value).subscribe((response: any) => {
      if (response.successFlag == 1) {  
        this.notiService.showSuccess(response.msg, "Success");
        this.getAllMapping();
        this.getAllLocation();
        jQuery(".close").click();
      }
      else {
        this.notiService.showError(response.msg, "Error");
        
      }
    }, error => {
      this.spinnerService.hide();
      jQuery(".custom-menu").hide();
      this.notiService.showError("Something went wrong.. Try again later..", "")
    }, () => {
      this.spinnerService.hide();
      this.searchForm.reset();
      this.loadDataTable()
    })
  }
  this.tableOptionDropDown();
  }
 
  getAllLocation(){
    this.locationList=[]
    this.spinnerService.show();
    var val={
      isActive:true
    }
    this.locationService.getAllUnmappedLocation(val).subscribe((response: any) => {           
      if(response){
        this.locationList = response;              
      }
      else{
        this.locationList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")     
    }, () => {
      this.spinnerService.hide();
    })
  }

  getAllMapping(){
    this.datalist=[];
    var val = {
      isActive:false,
      CountryId:null,
      StateId:null,
      LocationId:null
    }
    this.commonService.getCountryStateLocationMapping(val).subscribe((response) => {
      if (response) {
        this.datalist = response;
      }
      else {
        this.datalist = [];
      }
    }, error => {
      this.spinnerService.hide();
      this.notiService.showError("Something went wrong.. Try again later..", "")
    }, () => {
      this.spinnerService.hide();
      this.loadDataTable();
    })
  }

  filter() {
    this.commonService.getCountryStateLocationMapping(this.searchForm.value).subscribe((response) => {
      if (response) {
        this.datalist = response;
      }
      else {
        this.datalist = [];
      }
    }, error => {
      this.spinnerService.hide();
      this.notiService.showError("Something went wrong.. Try again later..", "")
    }, () => {
      this.spinnerService.hide();
      this.loadDataTable()
      
    })
    this.tableOptionDropDown();
  }

  reset() {
    this.searchForm.reset();
    this.searchForm = this.fb.group({
      isActive:false,
      CountryId: null,
      StateId: null,
      LocationId:null
    });
    this.stateList=[];
    this.filter();
  }
  getAllMappedAndUnmappedLocation(){
    var val={
        LocationNo:"",
        LocationCode:"",
        LocationOffice:"",
        LocationId:null,
        VerticalId:null,
        IsActive:null
    }

    this.locationService.getAllLocation(val).subscribe((response: any) => {           
      if(response){
        this.locationListforall = response;
                      
      }
      else{
        this.locationListforall = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")     
    }, () => {
      this.spinnerService.hide();
    })
  }

  onClickEdit(data: any) {

    this.Operation="edit";
    this.getAllLocation();
    var value=this.locationListforall.filter(e => e.locationId==data.locationId);
    this.locationList.push({
      locationId:value[0].locationId,
      locationCode: value[0].locationCode,
      locationNo:value[0].locationNo,
      locationOffice:value[0].locationOffice,
      isActive:value[0].isActive,
      deleteStatus:value[0].deleteStatus
    })
    this.onChangeCountryName(0);
    this.saveForm.patchValue({
      MapId:data.mapId,
      CountryId:data.countryId,
      LocationId:data.locationId,
      StateId:data.stateId,
      IsActive:data.isActive,
      CreatedBy:data.createdBy
    });
  }

  onChangeCountryName(eve){
    this.saveForm.patchValue({
      StateId:null
    })
    this.countryId=eve;
    this.spinnerService.show();
    var data={
      CountryId:eve,
      IsActive:true
    }
    this.commonService.getAllStateByCountry(data).subscribe((response: any) => {
      if (response) {
        this.stateList = response;
      }
      else {
        this.stateList = [];
      }
    }, error => {
      this.spinnerService.hide();
      this.notiService.showError("Something went wrong.. Try again later..", "")
    }, () => {
      this.spinnerService.hide();
    })
      
  }

  getAllCountry() {
    this.countries = [];
    this.commonDataService.getAllCountry(this.searchCountry).subscribe((result) => {
      if (result) {
        this.countries = result;
      }
      else {
        this.countries = [];
      }
    }, error => {
    }, () => {
    });
  }

  createForm(){
    this.Operation = 'add'; 
    this.getAllLocation()
    this.saveForm = this.fb.group({
      MapId:0,
      StateId: null,
      LocationId:null,
      CountryId:null,
      IsActive:[true],
      CreatedBy:this.createdBy
    })
  }

  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
      });
    });
  }
}
