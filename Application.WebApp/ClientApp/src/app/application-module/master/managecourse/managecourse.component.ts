import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/common/course/course.service'
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-managecourse',
  templateUrl: './managecourse.component.html',
  styleUrls: ['./managecourse.component.css']
})

export class ManagecourseComponent implements OnInit {

  CourseList: any[] = [];
  Operation: string;
  createdBy: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });  

  constructor(
    private courseService: CourseService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private fb: FormBuilder
  ) { 
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.loadDataTable();
    this.createForm(); 
    
    this.getAllCourse();
  }

  createForm(){
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      CourseName:['', Validators.required],
      CourseId:[0],
      IsActive:[true],
      CreatedBy:this.createdBy
    })
  }

  onSubmit(){    
    this.spinnerService.show();
    this.courseService.addCourse(this.saveForm.value).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllCourse();  
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

  onEdit(Data: any){    
    this.Operation = 'edit';
    this.saveForm.patchValue({
      CourseName: Data.courseName,
      CourseId: Data.courseId,
      IsActive: Data.isActive,
      CreatedBy: Data.createdBy
    });
  }

  getAllCourse(){
    this.spinnerService.show();
    this.saveForm.value.IsActive = null;
    this.courseService.getAllCourseList(this.saveForm.value).subscribe((response: any) => {            
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
