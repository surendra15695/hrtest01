import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {ICampusCourseStream,ISearchCampusCourse,ICampusCourse,ICampusStream,ISearchCampusStream} from '../../../interfaces/campus/campuscommon.interface';
import { CampuscommonService } from 'src/app/services/campus/common/campuscommon.service'
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-managecampuscoursestream',
  templateUrl: './managecampuscoursestream.component.html',
  styleUrls: ['./managecampuscoursestream.component.css']
})
export class ManagecampuscoursestreamComponent implements OnInit {

  SelectedCourseStream: any[] = [];
  SelectedCourse: ICampusCourse;
  courseList: ICampusCourse[] = [];
  searchCourse:ISearchCampusCourse={
    campusCourseId:null,
    isActive:true
  }
  streamList: ICampusStream[] = [];
  campusStreamList:ICampusStream[] = [];
  searchStream:ISearchCampusStream={
    campusStreamId:null,
    isActive:true
  }
  campusCourseStream:ICampusCourseStream[]=[];
  createdBy: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });  

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
    this.getAllCampusCourse();
  }

  getAllCampusCourse(){
    this.spinnerService.show();
    this.searchCourse.campusCourseId=null;
    this.searchCourse.isActive=true;
    this.campusCommonService.getAllCampusCourse(this.searchCourse).subscribe((response: any) => {            
      if(response){
        this.courseList = response;                
      }
      else{
        this.courseList = [];        
      }      
    }, error => {
      // display form values on success
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      this.spinnerService.hide();
    })
  }

  getAllCampusStream(){
    this.spinnerService.show();
    this.searchStream.campusStreamId=null;
    this.searchStream.isActive=true;
    this.campusCommonService.getAllCampusStream(this.searchStream).subscribe((response: any) => {            
      if(response){
        this.streamList = response;   
        for(var i=0;i<this.streamList.length;i++){
          this.campusStreamList.push({
            campusStreamId:this.streamList[i].campusStreamId,
            streamName:this.streamList[i].streamName,
            isActive:this.streamList[i].isActive,
          })
        }
      }
      else{
        this.streamList = []; 
        this.campusStreamList=[];       
      }      
    }, error => {
      // display form values on success
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      this.spinnerService.hide();
    })
  }

  onChangeCourse(campusCourseId: any){    
    console.log(campusCourseId);
    this.getAllCourseCampusStream(campusCourseId);
  }

  getAllCourseCampusStream(campusCourseId: number){    
    this.spinnerService.show();
    this.getAllCampusStream();
    let TempArr: any[] = [];
    this.campusCommonService.getAllCampusCourseStream().subscribe((response: any) => {            
      if(response){
        this.campusCourseStream = response;   
        console.log(this.campusCourseStream);
        for(var i=0;i<this.campusCourseStream.length;i++){
          if(this.campusCourseStream[i].campusCourseId==campusCourseId){
          TempArr.push(this.campusCourseStream[i].campusStreamId);
          }
        }        
        this.SelectedCourseStream=TempArr; 
      }
      else{
        TempArr=[];         
        this.SelectedCourseStream=TempArr;      
      }   
        
    }, error => {
      // display form values on success
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      this.spinnerService.hide();
    })    
    
  }

  onSubmit(){         
    let strStream: string = this.SelectedCourseStream.join();
    let Data: any = {
      "CampusCourseId": +this.SelectedCourse,
      "CampusStreamId": strStream,   
      "CreatedBy":this.createdBy   
    }

    console.log(Data);

    this.spinnerService.show();
    this.campusCommonService.addCampusCourseStream(Data).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");                
      }
      else {
        this.notiService.showError(response.msg, "Error");        
      }
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "");      
      this.spinnerService.hide();
      console.log(error);      
    }, () => {
      this.spinnerService.hide();
      this.resetForm();
    })          
  }
  
  resetForm(){
    this.SelectedCourse = null;
    this.SelectedCourseStream = [];
  }

}
