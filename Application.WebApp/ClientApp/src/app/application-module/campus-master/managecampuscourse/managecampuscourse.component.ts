import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {ICampusCourse,ISearchCampusCourse} from '../../../interfaces/campus/campuscommon.interface';
import { CampuscommonService } from 'src/app/services/campus/common/campuscommon.service'
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-managecampuscourse',
  templateUrl: './managecampuscourse.component.html',
  styleUrls: ['./managecampuscourse.component.css']
})
export class ManagecampuscourseComponent implements OnInit {
  CourseList: ICampusCourse[] = [];
  Operation: string;
  createdBy: number;
  saveForm : FormGroup;
  campusCourse:ICampusCourse;
  searchCourse:ISearchCampusCourse={
    campusCourseId:null,
    isActive:null
  }
  selectedSearchCourse:ISearchCampusCourse={
    campusCourseId:null,
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
    
    this.getAllCampusCourse();
  }

  createForm(){
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      CourseName:['', Validators.required],
      CampusCourseId:[0],
      IsActive:[true],
      CreatedBy:this.createdBy
    })
  }

  onSubmit(){    
    this.spinnerService.show();
    this.campusCommonService.addCampusCourse(this.saveForm.value).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllCampusCourse();   
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

  getSelectedCampusCourse(id){
    jQuery(".custom-menu").hide();
    this.spinnerService.show();
    this.selectedSearchCourse.campusCourseId=id;
    this.selectedSearchCourse.isActive=null
    this.campusCommonService.getAllCampusCourse(this.selectedSearchCourse).subscribe((response: any) => {            
      if(response){
        this.campusCourse = response[0];
        console.log(this.campusCourse);
        this.Operation = 'edit';
        this.saveForm.patchValue({
          CourseName: this.campusCourse.courseName,
          CampusCourseId: this.campusCourse.campusCourseId,
          IsActive: this.campusCourse.isActive,
          CreatedBy: 0
        });   
        console.log(this.saveForm.value);             
      }
      else{
        this.campusCourse = null;        
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

  getAllCampusCourse(){
    this.spinnerService.show();
    this.searchCourse.campusCourseId=null;
    this.searchCourse.isActive=null
    this.campusCommonService.getAllCampusCourse(this.searchCourse).subscribe((response: any) => {            
      if(response){
        this.CourseList = response;                
      }
      else{
        this.CourseList = [];        
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
