import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { QualificationService } from 'src/app/services/common/qualification/qualification.service';
import { CourseService } from 'src/app/services/common/course/course.service'
import { NotificationService } from '../../../sharedservices/notification.service';
import { StreamService } from 'src/app/services/common/stream/stream.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-qualificationcoursestreammapping',
  templateUrl: './qualificationcoursestreammapping.component.html',
  styleUrls: ['./qualificationcoursestreammapping.component.css']
})

export class QualificationcoursestreammappingComponent implements OnInit {

  QualificationList: any[] = [];  
  CourseList: any[] = [];
  StreamList: any[] = [];    
  SelectedQualification: number;   
  SelectedCourse: number;
  SelectedStream: any[] = [];
  createdBy: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });  

  constructor(
    private qualificationService: QualificationService,
    private courseService: CourseService,
    private streamService: StreamService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private fb: FormBuilder
  ) { 
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.getAllQualification();    
    this.getAllStream();
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

  getAllStream(){
    this.spinnerService.show();
    this.streamService.getAllStream(this.saveForm.value).subscribe((response: any) => {            
      if(response){
        this.StreamList = response;                            
      }
      else{
        this.StreamList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    },() => {      
      this.spinnerService.hide();
    })
  }

  onChangeQualification(QualificationID: number){    
    let Data: any = {
      "QualificationId": QualificationID,
      "IsActive": true
    }

    this.SelectedCourse = null;
    this.SelectedStream = [];
    this.getAllQualificationCourse(Data);
  }

  onChangeCourse(CourseID: number){
    let Data: any = {
      "QualificationId": this.SelectedQualification,
      "CourseId": CourseID,
      "IsActive": true
    }

    this.getAllQualificationCourseStream(Data);
  }

  getAllQualificationCourse(Data: any){
    this.spinnerService.show();
    this.courseService.getAllQualificationCourse(Data).subscribe((response: any[]) => {            
      this.CourseList = response;
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {      
      this.spinnerService.hide();
    })
  }

  getAllQualificationCourseStream(Data: any){
    this.spinnerService.show();
    this.streamService.getAllQualificationCourseStream(Data).subscribe((response: any[]) => {            
      if(response.length != 0){
        let TempArr: any[] = [];
        for(let item of response){
          TempArr.push(item.streamId);
        }

        this.SelectedStream = TempArr; 
        console.log("Sel Stream: ", this.SelectedStream);                              
      }
      else{
        this.SelectedStream = [];        
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
    let strStream: string = this.SelectedStream.join();
    // let count: number = 0;
    // if(this.SelectedStream.length != 0){
    //   for(let val of this.SelectedStream){
    //     if(count == 0){
    //       strStream = val.toString();
    //     }
    //     else{
    //       strStream = strStream + ',' + val.toString();
    //     }
        
    //     count = count + 1;
    //   }
    // }

    let Data: any = {
      "QualificationId": +this.SelectedQualification,
      "CourseId": +this.SelectedCourse,
      "StreamId": strStream
    }

    this.spinnerService.show();
    this.streamService.addQualificationCourseStream(Data).subscribe((response: any) => {
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
    this.SelectedCourse = null;
    this.SelectedStream = [];
  }
}
