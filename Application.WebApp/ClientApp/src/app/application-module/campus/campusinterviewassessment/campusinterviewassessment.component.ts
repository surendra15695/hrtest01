import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common/common/common.service';
import { isAbsolute } from 'path';


import { VerticalService } from 'src/app/services/common/vertical/vertical.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { IInterviewCalendarAssessmentFormData, IInterviewCalendarAssessmentList, IInterviewCalendarAssessmentListData, ISearchInterviewCalendarAssessment } from 'src/app/interfaces/selection/interviewcalendaraction.interface';
import { IState } from 'src/app/interfaces/common/common.interface';
import { IFunctionDepartment, ISearchDepartment } from 'src/app/interfaces/common/department.interface';
import { ILocation, ISearchLocation } from 'src/app/interfaces/common/location.interface';
import { InterviewcalendaractionService } from 'src/app/services/selection/interviewcalendaraction/interviewcalendaraction.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { DepartmentService } from 'src/app/services/common/department/department.service';
import { LocationService } from 'src/app/services/common/location/location.service';
import { element } from 'protractor';

declare var jQuery: any;


@Component({
  selector: 'app-campusinterviewassessment',
  templateUrl: './campusinterviewassessment.component.html',
  styleUrls: ['./campusinterviewassessment.component.css']
})
export class CampusinterviewassessmentComponent implements OnInit {

  calendarIds: string;
  candidateIds: string; // Added anif
  candidateId: number;
  requisitionDetailId: number;
  searchAssessmentList: ISearchInterviewCalendarAssessment = {
    CalendarIds: null,
    CandidateId: null,
    RequisitionDetailId: null,
  }
  positionName: string;
  interviewName: string;
  interviewDate: string;
  states: IState[] = [];
  assessmentList: any[] = [];
  assessmentArray: any[] = [];
  formData: IInterviewCalendarAssessmentFormData = {
    InterviewCalendarAssessmentData: null,
    CreatedBy: null,
    CandidateIds: null
  }
  autoUserId: number;
  isVisisble: boolean = false;
  // Anif
  FunctionList: any[] = [];
  VerticalList: any[] = [];
  DepartmentList: any[] = [];
  searchVertical = {
    VerticalId: null,
    VerticalName: "",
    IsActive: true
  }
  //department
  departments: IFunctionDepartment[] = [];
  selectedDepartment: IFunctionDepartment;
  searchDepartment: ISearchDepartment = {
    departmentId: null,
    functionId: null,
    verticalId: null,
    isActive: true
  }
  departmentId: number;
  departmentName: string;

  //location
  locations: ILocation[] = [];
  selectedLocation: ILocation;
  selectedLocationCode: string = "";
  selectedLocationOffice: string = "";
  searchLocation: ISearchLocation =
    {
      locationId: null,
      verticalId: null,
      locationCode: null,
      locationNo: null,
      isActive: true
    };
  locationId: number;
  VerticalId:any;
  FunctionId:any;
  DepartmentId:any;
  currentcalenderid : any;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private commonService: CommonService,
    private interActionService: InterviewcalendaractionService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
    private departmentService: DepartmentService,
    private verticalService: VerticalService,
    private functionService: FunctionService,
    private locationService: LocationService,
  ) {
    this.getAllState();
    this.getAllVertical();
    this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
    this.candidateIds = this.persistance.get("candidateIdsForMail"); // Added anif
    //this.candidateIds = "48,50" // Added anif
    if (this.persistance.get('pagename') == "assessment") {
      this.calendarIds = this.persistance.get('calendarIds');
     // console.log(this.calendarIds);
      this.getAssessmentList();
    }
  }

  ngOnInit() {
  }

  getAssessmentList() {
    this.SpinnerService.show();
    this.assessmentList = [];
    this.searchAssessmentList.CalendarIds = this.calendarIds;
    //console.log(this.searchAssessmentList);
    this.interActionService.getcampusinterviewcalendarassessmentlist(this.searchAssessmentList).subscribe((result) => {
      if (result) {
        this.assessmentList = result;
        console.log(this.assessmentList);
        if (this.assessmentList[0].overallScore > 0) {
          if ((this.assessmentList[0].actionStatus == 2 || this.assessmentList[0].actionStatus == 0) && this.assessmentList.length == 1) {
            this.isVisisble = true;
          }
          else {
            this.isVisisble = false;
          }
        }
        else {
          this.isVisisble = true;
        }
        this.positionName = this.assessmentList[0].positionName;
        this.interviewName = this.assessmentList[0].interviewName;
        this.interviewDate = this.assessmentList[0].interviewDate;
        this.assessmentList.forEach(element => {
          element.verticalid=null,
          element.functionid=null,
          element.departmentid=null
        })
       console.log(this.assessmentList);
      }
      else {
        this.assessmentList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }

  getAllState() {
    this.states = [];
    this.commonService.getAllState().subscribe((result) => {
      if (result) {
        this.states = result;
        this.states.splice(0, 0, {
          stateId: 0,
          stateName: "Select"
        })
      }
      else {
        this.states = [];
        this.states.splice(0, 0, {
          stateId: 0,
          stateName: "Select"
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  assessmentSubmit() {
    var flag = 0;
    this.assessmentArray = [];
    for (var i = 0; i < this.assessmentList.length; i++) {
      if (this.assessmentList[i].personalityScore == 0
        || this.assessmentList[i].communicationScore == 0
        || this.assessmentList[i].subjectScore == 0
        || this.assessmentList[i].apptitudeScore == 0
        || this.assessmentList[i].overallScore == 0
        //|| this.assessmentList[i].preferredLocation==""

        //|| this.assessmentList[i].noticePeriod==0 
        //|| this.assessmentList[i].expectedSalary==0 
        //|| this.assessmentList[i].otherComments==""
        //|| this.assessmentList[i].stateId==0 
        || this.assessmentList[i].actionStatus == 0
      ) {
        flag = 1;
      }
    }
    if (flag == 0) {
      for (var i = 0; i < this.assessmentList.length; i++) {
        this.assessmentArray.push({
          CalendarId: this.assessmentList[i].calendarId,
          PersonalityScore: this.assessmentList[i].personalityScore,
          CommunicationScore: this.assessmentList[i].communicationScore,
          SubjectScore: this.assessmentList[i].subjectScore,
          ApptitudeScore: this.assessmentList[i].apptitudeScore,
          OverallScore: this.assessmentList[i].overallScore,
          NoticePeriod: this.assessmentList[i].noticePeriod,
          ExpectedSalary: this.assessmentList[i].expectedSalary,
          StateId: 0,//this.assessmentList[i].stateId,
          PreferredLocation: this.assessmentList[i].preferredLocation,
          OtherComments: this.assessmentList[i].otherComments,
          ActionStatus: this.assessmentList[i].actionStatus,
          VerticalId: this.assessmentList[i].verticalid,
          FunctionId: this.assessmentList[i].functionid,
          DepartmentId: this.assessmentList[i].departmentid
        })
      }
      console.log(this.assessmentArray);
      this.formData.InterviewCalendarAssessmentData = this.assessmentArray;
      this.formData.CreatedBy = this.autoUserId;
      // added Anif
      this.formData.CandidateIds = this.candidateIds.toString();
      this.SpinnerService.show();
      this.interActionService.addcampusinterviewcalendarassessment(this.formData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.assessmentList = [];
            this.getAssessmentList();
          }
        }
        else {
          this.SpinnerService.hide();
        }
      }, error => {
        this.SpinnerService.hide();
        console.log(error);
      }, () => {
        this.SpinnerService.hide();
      });
    }
    else {
      this.notificationService.showError("Please fill all the fileds to continue", "Error");
    }
  }

  updateActionStatus(val, calendarId) {
    this.currentcalenderid = calendarId;
    this.assessmentList.filter(x => x.calendarId == calendarId)[0].actionStatus = val;
    if (val == 3) {
      jQuery(".close").click();
      // alert("inside 3")
      jQuery("#myModal").modal('show');
    }
    else {
      this.assessmentList.filter(x => x.calendarId == this.currentcalenderid)[0].verticalid=null;
      this.assessmentList.filter(x => x.calendarId == this.currentcalenderid)[0].functionid=null;
      this.assessmentList.filter(x => x.calendarId == this.currentcalenderid)[0].departmentid=null;
    }
  }

  updateState(val, calendarId) {
    this.assessmentList.filter(x => x.calendarId == calendarId)[0].stateId = val;
  }

  updatePreferredLocation(evt, calendarId) {
    var val = evt.target.value;
    this.assessmentList.filter(x => x.calendarId == calendarId)[0].preferredLocation = val;
  }

  updateNoticePeriod(evt, calendarId) {
    var val = evt.target.value;
    // if(val=="")
    // {
    //   val=0;
    // }
    this.assessmentList.filter(x => x.calendarId == calendarId)[0].noticePeriod = val;//Number(val);
  }

  updateSalary(evt, calendarId) {
    var val = evt.target.value;
    // if(val=="")
    // {
    //   val=0;
    // }
    this.assessmentList.filter(x => x.calendarId == calendarId)[0].expectedSalary = val;//Number(val);
  }

  updateComments(evt, calendarId) {
    var val = evt.target.value;
    this.assessmentList.filter(x => x.calendarId == calendarId)[0].otherComments = val;
  }

  updateScore(score, scoreType, calendarId) {
    if (scoreType == "Personality") {
      this.assessmentList.filter(x => x.calendarId == calendarId)[0].personalityScore = Number(score);
    }
    else if (scoreType == "Communication") {
      this.assessmentList.filter(x => x.calendarId == calendarId)[0].communicationScore = Number(score);
    }
    else if (scoreType == "Subject") {
      this.assessmentList.filter(x => x.calendarId == calendarId)[0].subjectScore = Number(score);
    }
    else if (scoreType == "Apptitude") {
      this.assessmentList.filter(x => x.calendarId == calendarId)[0].apptitudeScore = Number(score);
    }
    else if (scoreType == "Overall") {
      this.assessmentList.filter(x => x.calendarId == calendarId)[0].overallScore = Number(score);
    }
  }

  gotoCalendar() {
    if(this.persistance.get('pagename') == "mycalenderviewcandidate"){
      this.persistance.set('candidateId', Number(this.candidateId));
      this.persistance.set('interviewMasterId', this.persistance.get('interviewMasterId'));
      this._route.navigate(['/app/campus/rm-mycalender-view-candidate']);
    }
    if(this.persistance.get('pagename')=="assessment"){
    this.persistance.set('calendarIds', null);
    this.persistance.set('pagename', "interviewassessment");
    this.persistance.set('interviewMasterId', this.persistance.get('interviewMasterId'));
    this.persistance.set('functionId', this.persistance.get('functionId'));
    this._route.navigate(['/app/campus/campusmycalendar'])
    //this._route.navigate(['/app/campus/mycalendar']);
    }
  }

  // Anif

  getAllVertical() {
    this.verticalService.getAllVertical(this.searchVertical).subscribe((response: any) => {
      if (response) {
        this.VerticalList = response;
        // console.log("VerticalList: ", response);
      }
      else {
        this.VerticalList = [];
      }
    }, error => {
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }
  onChangeVertical(verticalID: any) {
    let data: any = {
      'VerticalId': verticalID,
      'IsActive': true
    }
    this.searchDepartment.verticalId = verticalID;
    this.searchLocation.verticalId = verticalID;
    this.getVerticalFunction(data);
    this.getAllLocation();
  }

  getVerticalFunction(data: any) {
    this.functionService.getAllVerticalFunction(data).subscribe((response: any) => {
      if (response) {
        this.FunctionList = response;
        // console.log("FunList: ", this.FunctionList);
        this.SpinnerService.hide();
      }
      else {
        this.FunctionList = [];
      }
    }, error => {
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
      this.SpinnerService.hide();
    })
  }
  onChangeFunction(functionId: any) {
    this.searchDepartment.functionId = functionId;
    this.getAllDepartment();
  }
  //department
  getAllDepartment() {
    this.departments = [];
    // this.searchDepartment.verticalId = this.StaticVerticalId;
    // this.searchDepartment.functionId = this.functionId;
    this.departmentService.getAllFunctionDepartment(this.searchDepartment).subscribe((result) => {
      if (result) {
        this.departments = result;
        //console.log(this.departments);
      }
      else {
        this.departments = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      // this.loadSelectPicker();
    });
  }
  //locations
  getAllLocation() {
    this.locations = [];
    // this.searchLocation.verticalId = this.StaticVerticalId;
    this.locationService.getAllLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        this.locations = result;
       // console.log("Location", this.locations);
      }
      else {
        this.locations = [];
      }
    }, error => {
      this.SpinnerService.hide();
      console.log(error);
    }, () => {
      // this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }
  RefferedSubmit(){
    this.assessmentList.filter(x => x.calendarId == this.currentcalenderid)[0].verticalid=this.VerticalId;
    this.assessmentList.filter(x => x.calendarId == this.currentcalenderid)[0].functionid=this.FunctionId;
    this.assessmentList.filter(x => x.calendarId == this.currentcalenderid)[0].departmentid=this.DepartmentId;
    this.VerticalId=null;
    this.FunctionId=null;
    this.DepartmentId=null;
  }
  RefferedCancel(){
    this.VerticalId=null;
    this.FunctionId=null;
    this.DepartmentId=null;
  }
}



