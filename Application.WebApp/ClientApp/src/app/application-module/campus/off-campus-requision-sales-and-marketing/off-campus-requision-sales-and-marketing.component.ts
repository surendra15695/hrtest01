import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { IVerticalFunction, ISearchFunction } from '../../../interfaces/common/function.interface';
import { ICampusYear,ISearchCampusYear ,ICampusCollegeCategory,
  ICampusCourseStream,ISearchCampusCourse,ICampusCourse,ICampusStream,ISearchCampusStream} from '../../../interfaces/campus/campuscommon.interface';
import { ICampusRequisitionDataArray,ICampusRequisitionDataDetailArray,ICampusRequisition } from '../../../interfaces/campus/campusrequisition.interface';
import { CampuscommonService } from 'src/app/services/campus/common/campuscommon.service'
import { CampusrequisitionService } from 'src/app/services/campus/campusrequisition/campusrequisition.service'
import { NotificationService } from '../../../sharedservices/notification.service';
import { CommondataService } from '../../../services/common/commondata/commondata.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { CommonService } from '../../../services/common/common/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { FunctionService } from '../../../services/common/function/function.service';
import { VerticalService } from 'src/app/services/common/vertical/vertical.service';


declare var jQuery: any;

@Component({
  selector: 'app-off-campus-requision-sales-and-marketing',
  templateUrl: './off-campus-requision-sales-and-marketing.component.html',
  styleUrls: ['./off-campus-requision-sales-and-marketing.component.css']
})
export class OffCampusRequisionSalesAndMarketingComponent implements OnInit {
  saveForm : FormGroup;
  collegeCategories:ICampusCollegeCategory[]=[];
  verticals: IVertical[] = [];
  selectedVertical: number;
  verticalIds: string;
  searchCampusYear:ISearchCampusYear={
    campusYearId:null,
    isActive:null
  }
  campusYears: ICampusYear[] = [];
  selectedCampusYear:number;
  courses: ICampusCourse[] = [];
  searchCourse:ISearchCampusCourse={
    campusCourseId:null,
    isActive:true
  }
  campusCourseStream:ICampusCourseStream[]=[];
  campusCouseStreamList:ICampusCourseStream[]=[];
  courseStreams:ICampusCourseStream[]=[];
  selectedCampusCourse:number;
  selectedCampusStream:number;
  functions: IVerticalFunction[] = [];
  selectedFunction: number;
  searchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  showTable:boolean=false;
  candidateCount:number;
  selectedCollegeCategory:number;
  requisitionData:ICampusRequisitionDataArray[]=[];
  requisitionDataDetail:ICampusRequisitionDataDetailArray[]=[];
  requisitionFormData:ICampusRequisition={
    CampusYearId:null,
    VerticalId:null,
    LocationId:null,
    CampusCourseId:null,
    CampusStreamId:null,
    CampusRequisitionData:null,
    //RequisitionData:[],
    CreatedBy:null
  }
  createdBy:number;
  requisitionTypeId:number;
  requisitionTitle:string;
  constructor(
    private SpinnerService: NgxSpinnerService,
    private notificationService: NotificationService,
    private commonDataService:CommondataService,
    private campusCommonService:CampuscommonService,
    private functionService: FunctionService,
    private persistance: PersistanceService,
    private requisitionService:CampusrequisitionService,
    private _route: Router,
    private fb: FormBuilder,
    private verticalService: VerticalService,
    private notiService: NotificationService,
  ) {
    this.createdBy=this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.getAllVerticals();
    this.getAllCollegeCategory();
    this.getAllCampusYear();
    this.courses=[];
    this.campusCourseStream=[];
    this.getAllCampusCourse();
    this.getAllCourseCampusStream();
   }

  ngOnInit() {
  }
  getAllVerticals() {
    this.verticals = [];
    // var splitvertical = this.verticalIds.split(",");
    // var allvertical = "";
    // console.log(splitvertical);
    // for (var i = 0; i < splitvertical.length; i++) {
    //   if (splitvertical[i] != "0") {
    //     if (splitvertical[i] == "1") {
    //       this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    //     }
    //     else if (splitvertical[i] == "2") {
    //       this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    //     }
    //     else if (splitvertical[i] == "3") {
    //       this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    //     }
    //     if (allvertical == "") {
    //       allvertical = splitvertical[i];
    //     }
    //     else {
    //       allvertical = allvertical + "," + splitvertical[i];
    //     }
    //   }
    // }
    let obj = {
      VerticalId : null,
      VerticalName : null,
      IsActive : true
    }
    this.verticalService.getAllCAmpusVertical(obj).subscribe((response: any) => {            
      if(response){
        this.verticals = response.filter(x=>x.verticalId==2);
        //console.log("VerticalList: ", response);                
      }
      else{
        this.verticals = [];        
      }      
    }, error => {     
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    })
  }

  changeVertical(event) {
    var verticalId = event;
    this.selectedVertical =verticalId; //this.verticals.filter(x => x.verticalId == verticalId)[0];
    this.getAllFunction();
  }

  getAllFunction() {
    this.functions = [];
    this.searchFunction.verticalId = this.selectedVertical;
    this.functionService.getAllCampusVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;
      }
      else {
        this.functions = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  oncahngefunction(){
    for(let i=0;i<this.requisitionDataDetail.length;i++)
    {
      if(this.selectedFunction==this.requisitionDataDetail[i].functionId)
      {
        this.notiService.showError("This Function is already selected", "")
        this.selectedFunction=undefined;
      }
    }
  }
  getAllCollegeCategory() {
    this.collegeCategories = [];
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

  getAllCampusYear(){
    this.searchCampusYear.campusYearId=null;
    this.searchCampusYear.isActive=null;
    this.campusCommonService.getAllCampusYear(this.searchCampusYear).subscribe((response: any) => {            
      if(response){
        this.campusYears = response;                
      }
      else{
        this.campusYears = [];        
      }      
    }, error => {
      console.log(error);      
    }, () => {
    })
  }

  getAllCampusCourse(){
    this.searchCourse.campusCourseId=null;
    this.searchCourse.isActive=true
    this.campusCommonService.getAllCampusCourse(this.searchCourse).subscribe((response: any) => {            
      if(response){
        this.courses= response;                
      }
      else{
        this.courses = [];        
      }      
    }, error => {
      console.log(error);      
    }, () => {
    })
  }

  changeCourse(campusCourseId: any){    
    this.courseStreams=this.campusCouseStreamList.filter(x=>x.campusCourseId==campusCourseId);
  }

  getAllCourseCampusStream(){ 
    this.campusCourseStream=[];
    this.campusCommonService.getAllCampusCourseStream().subscribe((response: any) => {            
      if(response){
        this.campusCourseStream = response; 
        for(var i=0;i<this.campusCourseStream.length;i++){
          this.campusCouseStreamList.push({
            campusCourseId:this.campusCourseStream[i].campusCourseId,
            courseName:this.campusCourseStream[i].courseName,
            campusStreamId:this.campusCourseStream[i].campusStreamId,
            streamName:this.campusCourseStream[i].streamName,
            isActive:this.campusCourseStream[i].isActive,
          })
        }
      }
      else{
        this.campusCourseStream=[];  
        this.campusCouseStreamList=[];           
      }   
        
    }, error => {
      console.log(error);      
    }, () => {
    })    
    
  }

  startRequisition(){
    var flag = 0;
    if (this.selectedVertical == undefined) {
      flag = 1;
    }
    else {

    }
    if (this.selectedCampusYear == undefined) {
      flag = 1;
    }
    else {

    }
    if (this.selectedCampusCourse == undefined) {
      flag = 1;
    }
    else {

    }
    if (this.selectedCampusStream == undefined) {
      flag = 1;
    }
    else {

    }
    if (flag == 0) {
      this.requisitionData=[];
        this.showTable = true;
    }
    else {
      this.showTable = false;
      this.notificationService.showError("Please fill required fields !!", "Error");
    }
  }

  addRow(){
    var flag=0;
    var msg="";
    if(this.requisitionTypeId==undefined){
      flag=1;
      msg="Please select requisition type";
    }
    else{
      msg="";
    }
    if(this.requisitionTitle==undefined || this.requisitionTitle==""){
      flag=1;
      msg="Please select requisition title";
    }
    else{
      msg="";
    }
    if(this.selectedFunction==undefined){
      flag=1;
      msg="Please select function";
    }
    else{
      msg="";
    }
    if(this.candidateCount==undefined || this.candidateCount==0){
      flag=1;
      msg="Please select no. of canidates";
    }
    else{
      msg="";
    }
    if(this.selectedCollegeCategory==undefined){
      flag=1;
      msg="Please select college category";
    }
    else{
      msg="";
    }
    if(flag==0){
      this.requisitionData.push({
        autoId:this.requisitionData.length+1,
        requisitionTypeId:this.requisitionTypeId,
        requisitionTitle:this.requisitionTitle,
          functionId:this.selectedFunction,
          collegeCategoryId:this.selectedCollegeCategory,
          candidateCount:this.candidateCount
      });
      this.requisitionDataDetail.push({
        autoId:this.requisitionDataDetail.length+1,
        requisitionTypeId:this.requisitionTypeId,
        requisitionTypeName:this.requisitionTypeId==1?"Actual Requisition":"Dummy Requisition",
        requisitionTitle:this.requisitionTitle,
        functionId:this.selectedFunction,
        functionName:this.functions.filter(x=>x.functionId==this.selectedFunction)[0].functionName,
        collegeCategoryId:this.selectedCollegeCategory,
        collegeCategoryName:this.collegeCategories.filter(x=>x.collegeCategoryId==this.selectedCollegeCategory)[0].collegeCategoryName,
        candidateCount:this.candidateCount
      });
      this.requisitionTypeId=undefined;
      this.requisitionTitle="";
      this.selectedFunction=undefined;
      this.candidateCount=undefined;
      this.selectedCollegeCategory=undefined;
    }
    else{
      this.notificationService.showError(msg, "Error");
    }
  }

  removeRow(id){
    this.requisitionData=this.requisitionData.filter(x=>x.autoId!=id);
    this.requisitionDataDetail=this.requisitionDataDetail.filter(x=>x.autoId!=id);
  }

  formSubmit(){
    if(this.requisitionData.length==0){

    }
    else{
      this.SpinnerService.show();
      this.requisitionFormData.CampusYearId=this.selectedCampusYear;
      this.requisitionFormData.VerticalId=this.selectedVertical;
      this.requisitionFormData.CampusCourseId=this.selectedCampusCourse;
      this.requisitionFormData.CampusStreamId=this.selectedCampusStream;
      this.requisitionFormData.CampusRequisitionData=JSON.stringify(this.requisitionData);
      this.requisitionFormData.CreatedBy=this.createdBy;
      this.requisitionFormData.LocationId=0;
      this.requisitionService.createOffCampusrequisition(this.requisitionFormData).subscribe((response: any) => {      
        if(response.successFlag == 1){
          this.notificationService.showSuccess(response.msg, "Success");
          this.clearEntireForm(); 
          this.SpinnerService.hide();    
        }
        else{
          this.notificationService.showError(response.msg, "Error");  
          this.SpinnerService.hide();      
        }
      }, error => {
        this.notificationService.showError("Something went wrong.. Try again later..", "")
        console.log(error);      
      }, () => {
        this.SpinnerService.hide();
      })
    }
  }

  clearEntireForm(){
    this.showTable=false;
    this.selectedCampusYear=undefined;
    this.selectedVertical=undefined;
    this.selectedCampusCourse=undefined;
    this.selectedCampusStream=undefined;
    this.courseStreams=[];
  }
}
