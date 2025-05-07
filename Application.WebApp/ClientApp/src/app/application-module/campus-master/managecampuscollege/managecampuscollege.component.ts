import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { IState, IDropDown } from 'src/app/interfaces/common/common.interface';
import { ICountry, ISearchCountry } from '../../../interfaces/common/country.interface';
import { ICampusCollege,ISearchCampusCollege,ICampusCollegeCategory} from '../../../interfaces/campus/campuscommon.interface';
import { CampuscommonService } from 'src/app/services/campus/common/campuscommon.service'
import { NotificationService } from '../../../sharedservices/notification.service';
import { CommondataService } from '../../../services/common/commondata/commondata.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { CommonService } from '../../../services/common/common/common.service';
import { NgxSpinnerService } from "ngx-spinner";

declare var jQuery: any;

@Component({
  selector: 'app-managecampuscollege',
  templateUrl: './managecampuscollege.component.html',
  styleUrls: ['./managecampuscollege.component.css']
})
export class ManagecampuscollegeComponent implements OnInit {
  saveForm : FormGroup;
  btnText:string;
  listVisible:boolean=true;
  formVisible:boolean=false;
  countries: ICountry[] = [];
  searchCountry: ISearchCountry = {
    countryId: null,
    isActive: true
  }
  states: IState[] = [];
  collegeCategories:ICampusCollegeCategory[]=[];
  createdBy:number;
  Operation:string;
  campusCollege:any;
  campusColleges:ICampusCollege[]=[];
  searchCampusCollege:ISearchCampusCollege={
    campusCollegeId:null,
    isActive:null,
    countryId:null,
    stateId:null,
    collegeCategoryId:null
  }
  selectedSearchCampusCollege:ISearchCampusCollege={
    campusCollegeId:null,
    isActive:null,
    countryId:null,
    stateId:null,
    collegeCategoryId:null
  }
  constructor(
    private commonService: CommonService,
    private SpinnerService: NgxSpinnerService,
    private notificationService: NotificationService,
    private commonDataService:CommondataService,
    private campusCommonService:CampuscommonService,
    private persistance: PersistanceService,
    private _route: Router,
    private fb: FormBuilder
  ) { 
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.createForm();
    this.getAllCountry();
    this.getAllState();
    this.getAllCollegeCategory();
    this.loadDataTable();
    this.loadTooltipMenu();    
    this.getAllCampusCollege();
  }

  createForm(){
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      CollegeName:['', Validators.required],
      CollegeType:['', Validators.required],
      CountryId:[null, Validators.required],
      StateId:[null, Validators.required],
      CollegeCategoryId:[null, Validators.required],
      CollegeAddress:['', Validators.required],
      ContactName:['', Validators.required],
      ContactDesignation:['', Validators.required],
      ContactEmailId:['', Validators.required],
      ContactNo:['', Validators.required],
      CampusCollegeId:[0],
      IsActive:[true],
      CreatedBy:this.createdBy
    })
  }

  getAllCountry() {
    this.countries = [];
    this.commonDataService.getAllCountry(this.searchCountry).subscribe((result) => {
      if (result) {
        this.countries = result;
        console.log(result);
      }
      else {
        this.countries = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllState() {
    this.states = [];
    this.commonService.getAllState().subscribe((result) => {
      if (result) {
        this.states = result;
      }
      else {
        this.states = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllCollegeCategory() {
    this.states = [];
    this.campusCommonService.getAllCampusCollegeCategory().subscribe((result) => {
      if (result) {
        this.collegeCategories = result;
      }
      else {
        this.collegeCategories = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  showForm() {
    this.listVisible = false;
    this.formVisible = true;
    this.Operation = 'add';
    this.saveForm.reset();
    this.btnText="Submit";
  }

  showList(){
    this.listVisible = true;
    this.formVisible = false;
    this.Operation="add";
    this.getAllCampusCollege();
  }

  onSubmit(){    
    this.SpinnerService.show();
    this.saveForm.value.IsActive=true;
    this.saveForm.value.CreatedBy=this.createdBy;
    this.campusCommonService.addCampusCollege(this.saveForm.value).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notificationService.showSuccess(response.msg, "Success");
        if(this.Operation=="add"){
          this.createForm();
        }
        this.getAllCampusCollege();   
        jQuery(".close").click();     
      }
      else{
        this.notificationService.showError(response.msg, "Error");        
      }
    }, error => {
      // display form values on success
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      this.SpinnerService.hide();
    })
  }

  loadTooltipMenu() {
    setTimeout(() => {
      var body_ = jQuery('body');
      var dropdownMenu,
        table_responsive = jQuery('.table-responsive');
      table_responsive.on('show.bs.dropdown', function (e) {
        dropdownMenu = jQuery(e.target).find('.custom-menu');
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
      jQuery(".custom-menu").find(".dropdown-item").on("click", function (e) {
        jQuery(e.target).append(dropdownMenu.detach());
        jQuery(e.target).find('.custom-menu').hide();
      });
    });
  }

  getAllCampusCollege(){
    this.SpinnerService.show();
    this.campusCommonService.getAllCampusCollege(this.searchCampusCollege).subscribe((response: any) => {            
      if(response){
        this.campusColleges = response;    
        console.log(this.campusColleges);            
      }
      else{
        this.campusColleges = [];        
      }      
    }, error => {
      // display form values on success
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      this.loadDataTable();
      this.SpinnerService.hide();
    })
  }

  getSelectedCampusCollege(id){
    jQuery(".custom-menu").hide();
    this.showForm();
    this.SpinnerService.show();
    this.selectedSearchCampusCollege.campusCollegeId=id;
    this.campusCommonService.getAllCampusCollege(this.selectedSearchCampusCollege).subscribe((response: any) => {            
      if(response){
        this.campusCollege = response[0];
        this.Operation = 'edit';
        this.btnText="Update";
        this.saveForm.patchValue({
          CollegeName: this.campusCollege.collegeName,
          CampusCollegeId: this.campusCollege.campusCollegeId,
          CountryId: this.campusCollege.countryId,
          StateId: this.campusCollege.stateId,
          CollegeAddress: this.campusCollege.collegeAddress,
          CollegeCategoryId: this.campusCollege.collegeCategoryId,
          ContactName: this.campusCollege.contactName,
          ContactDesignation: this.campusCollege.contactDesignation,
          ContactEmailId: this.campusCollege.contactEmailId,
          ContactNo: this.campusCollege.contactNo,
          IsActive: this.campusCollege.isActive,
          CollegeType: this.campusCollege.collegeType,
          CreatedBy: 0
        });   
        console.log(this.saveForm.value);             
      }
      else{
        this.campusCollege = null;        
      }      
    }, error => {
      // display form values on success
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      //this.loadDataTable();
      this.SpinnerService.hide();
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
