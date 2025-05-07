import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ICampusYear,ISearchCampusYear } from '../../../interfaces/campus/campuscommon.interface';
import { CampuscommonService } from 'src/app/services/campus/common/campuscommon.service'
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-managecampusyear',
  templateUrl: './managecampusyear.component.html',
  styleUrls: ['./managecampusyear.component.css']
})
export class ManagecampusyearComponent implements OnInit {
  campusYearList: ICampusYear[] = [];
  Operation: string;
  createdBy: number;
  saveForm : FormGroup;
  campusYear:ICampusYear;
  searchCampusYear:ISearchCampusYear={
    campusYearId:null,
    isActive:null
  }
  selectedSearchCampusYear:ISearchCampusYear={
    campusYearId:null,
    isActive:null
  }

  constructor(
    private campusCommonService: CampuscommonService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private fb: FormBuilder
  ) { 
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.loadDataTable();
    this.loadTooltipMenu();
    this.createForm(); 
    
    this.getAllCampusYear();
  }

  createForm(){
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      CampusYearName:['', Validators.required],
      CampusFromYear:[null, Validators.required],
      CampusToYear:[null, Validators.required],
      CampusYearId:[0],
      IsActive:[true],
      CreatedBy:this.createdBy
    })
  }

  onSubmit(){    
    this.spinnerService.show();
    this.saveForm.patchValue({
      CampusFromYear:Number(this.saveForm.value.CampusFromYear),
      CampusToYear:Number(this.saveForm.value.CampusToYear),
    })    
    this.campusCommonService.addCampusYear(this.saveForm.value).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllCampusYear(); 
        jQuery(".close").click();       
      }
      else{
        this.notiService.showError(response.msg, "Error");        
      }
    }, error => {
      // display form values on success
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      this.spinnerService.hide();
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

  getSelectedCampusYear(id){
    jQuery(".custom-menu").hide();
    this.spinnerService.show();
    this.selectedSearchCampusYear.campusYearId=id;
    this.selectedSearchCampusYear.isActive=null
    this.campusCommonService.getAllCampusYear(this.selectedSearchCampusYear).subscribe((response: any) => {            
      if(response){
        this.campusYear = response[0];
        this.Operation = 'edit';
        this.saveForm.patchValue({
          CampusYearName: this.campusYear.campusYearName,
          CampusYearId: this.campusYear.campusYearId,
          CampusFromYear: this.campusYear.campusFromYear,
          CampusToYear: this.campusYear.campusToYear,
          IsActive: this.campusYear.isActive,
          CreatedBy: 0
        });   
        console.log(this.saveForm.value);             
      }
      else{
        this.campusYear = null; 
        this.saveForm.patchValue({
          CampusYearName: '',
          CampusYearId: 0,
          CampusFromYear: null,
          CampusToYear: null,
          IsActive: true,
          CreatedBy: 0
        });          
      }      
    }, error => {
      // display form values on success
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      //this.loadDataTable();
      this.spinnerService.hide();
    })
  }

  getAllCampusYear(){
    this.spinnerService.show();
    this.searchCampusYear.campusYearId=null;
    this.searchCampusYear.isActive=null;

    console.log(this.searchCampusYear);
    this.campusCommonService.getAllCampusYear(this.searchCampusYear).subscribe((response: any) => {            
      if(response){
        this.campusYearList = response;                
      }
      else{
        this.campusYearList = [];        
      }      
    }, error => {
      // display form values on success
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
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
