import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { QualificationService } from 'src/app/services/common/qualification/qualification.service';
import { CourseService } from 'src/app/services/common/course/course.service'
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-qualificationcoursemapping',
  templateUrl: './qualificationcoursemapping.component.html',
  styleUrls: ['./qualificationcoursemapping.component.css']
})

export class QualificationcoursemappingComponent implements OnInit {

  SelectedCourse: any[] = [];
  SelectedQualification: number;
  QualificationList: any[] = [];
  CourseList: any[] = [];
  createdBy: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });  

  constructor(
    private qualificationService: QualificationService,
    private courseService: CourseService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private fb: FormBuilder
  ) { 
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.getAllCourse();
    this.getAllQualification();
  }

  getAllQualification() {
    this.spinnerService.show();
    this.saveForm.value.IsActive = true;
    this.qualificationService.getAllQualification(this.saveForm.value).subscribe((response: any) => {
      if (response) {
        this.QualificationList = response;                
      }
      else {
        this.QualificationList = [];        
      }
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {      
      this.spinnerService.hide();
    })
  }

  getAllCourse(){
    this.spinnerService.show();
    this.courseService.getAllCourse(this.saveForm.value).subscribe((response: any) => {            
      if(response){
        this.CourseList = response;                
      }
      else{
        this.CourseList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {      
      this.spinnerService.hide();
    })
  }

  onChangeQualification(QualificationID: number){    
    let Data: any = {
      "QualificationId": QualificationID,
      "IsActive": true
    }

    this.getAllQualificationCourse(Data);
  }

  getAllQualificationCourse(Data: any){    
    this.spinnerService.show();
    this.courseService.getAllQualificationCourse(Data).subscribe((response: any) => {            
      if(response.length != 0){
        let TempArr: any[] = [];
        for(let item of response){
          TempArr.push(item.courseId);
        }

        this.SelectedCourse = TempArr; 
        console.log(this.SelectedCourse);                        
      }
      else{
        this.SelectedCourse = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {      
      this.spinnerService.hide();
    })
  }

  onSubmit(){
    debugger          
    let strCourse: string = this.SelectedCourse.join();

    // let count: number = 0;    
    // if(this.SelectedCourse.length != 0){
    //   for(let val of this.SelectedCourse){
    //     if(count == 0){
    //       strCourse = val.toString();
    //     }
    //     else{
    //       strCourse = strCourse + ',' + val.toString();
    //     }
        
    //     count = count + 1;
    //   }
    // }

    let Data: any = {
      "QualificationId": +this.SelectedQualification,
      "CourseId": strCourse,      
    }

    this.spinnerService.show();
    this.courseService.addQualificationCourse(Data).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");                
      }
      else {
        this.notiService.showError(response.msg, "Error");        
      }
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      this.spinnerService.hide();
      this.resetForm();
    })          
  }
  
  resetForm(){
    this.SelectedQualification = null;
    this.SelectedCourse = [];
  }
}
