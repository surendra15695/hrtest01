import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IFunctionDepartment, ISearchDepartment } from 'src/app/interfaces/common/department.interface';
import { ISearchFunction, IVerticalFunction } from 'src/app/interfaces/common/function.interface';
import { IInterview, ISearchInterview } from 'src/app/interfaces/common/interview.interface';
import { ISearchVenue, IVenue } from 'src/app/interfaces/common/venue.interface';
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { ICalendarList } from 'src/app/interfaces/selection/interviewcalendaraction.interface';
import { DepartmentService } from 'src/app/services/common/department/department.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { InterviewService } from 'src/app/services/common/interview/interview.service';
import { VenueService } from 'src/app/services/common/venue/venue.service';
import { InterviewcalendaractionService } from 'src/app/services/selection/interviewcalendaraction/interviewcalendaraction.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-rm-campus-mycalender',
  templateUrl: './rm-campus-mycalender.component.html',
  styleUrls: ['./rm-campus-mycalender.component.css']
})
export class RmCampusMycalenderComponent implements OnInit {
  searchMyCalendar: FormGroup;
  allInterviewCalendarList:ICalendarList[] =[];
  //interview
  interviews: IInterview[] = [];
  searchInterview: ISearchInterview = {
    InterviewId: null,
    IsActive: true
  }

  verticals: IVertical[] = [];
  selectedVertical: IVertical;
   //venue
   searchVenue: ISearchVenue = {
    venueId: null,
    isActive: true
  }
  venues: IVenue[] = [];
    //function
    functionList: IVerticalFunction[] = [];
    selectedFunction: IVerticalFunction;
    searchFunction: ISearchFunction = {
      verticalId: null,
      functionId: null,
      isActive: true
    }
     //department
    departmentList: IFunctionDepartment[] = [];
    selectedDepartment: IFunctionDepartment;
    searchDepartment: ISearchDepartment = {
    departmentId: null,
    functionId: null,
    verticalId: null,
    isActive: true
  }

    autoUserId: number;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private interViewService: InterviewService,
    private venueService: VenueService,
    private functionService: FunctionService,
    private departmentService: DepartmentService,
    private persistance: PersistanceService,
    private SpinnerService: NgxSpinnerService,
    private interActionService: InterviewcalendaractionService,
  ) { 
    this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
    this.getAllInterviews();
    this.getAllVenues();
    this.getAllVerticals();
    this.createForm();
  }

  ngOnInit() {
    this.loadDatePicker();
    this.loadDataTable();
    this.loadTooltipMenu();
    this.getAllVerticals();
    this.getAllFunction();
    this.getAllDepartment();
    this.filterSubmit();
  }
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }
  createForm(){
    this.searchMyCalendar = this.fb.group({
      autoUserId: [this.autoUserId],
      interviewId: [0],
      verticalId: [0],
      locationId: [0],
      fromDate: [''],
      toDate: [''],
      venueId: [0],
      positionId: [0],
      functionId: [0],
      departmentId: [0],
      interviewTypeId: [0],
      acceptStatus: [0]
    })
  }
  filterSubmit(){
    this.SpinnerService.show();
    this.allInterviewCalendarList = [];
    var value={
      roleId:  this.persistance.get('loggedinuser').roleIds
    }
    this.interActionService.getRmCalendersearchdata(value).subscribe((result) => {
      if (result) {
        this.allInterviewCalendarList = result;
        console.log("List", this.allInterviewCalendarList);
      }
      else {
        this.allInterviewCalendarList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadDataTable();
      setTimeout(() => {
        //this.loadPopover();
        this.loadTooltipMenu();
      });
      this.SpinnerService.hide();
    });
  }
  

  getAllInterviews() {
    this.interviews = [];
    this.interViewService.getAllInterview(this.searchInterview).subscribe((result) => {
      if (result) {
        this.interviews = result;
        this.interviews.splice(0, 0, {
          interviewId: 0,
          interviewName: "All",
          isActive: true,
          createdBy: 0
        })
      }
      else {
        this.interviews = [];
        this.interviews.splice(0, 0, {
          interviewId: 0,
          interviewName: "All",
          isActive: true,
          createdBy: 0
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  //venues
  getAllVenues() {
    this.venues = [];
    this.venueService.getAllVenue(this.searchVenue).subscribe((result) => {
      if (result) {
        this.venues = result;
        this.venues.splice(0, 0, {
          venueId: 0,
          venueAddress: "",
          venueName: "All",
          isActive: true,
          stateId: 0,
          stateName: ""
        })
      }
      else {
        this.venues = [];
        this.venues.splice(0, 0, {
          venueId: 0,
          venueAddress: "",
          venueName: "All",
          isActive: true,
          stateId: 0,
          stateName: ""
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  getAllVerticals() {    
 
    this.verticals = [];
    this.verticals.push({ verticalId: 0, verticalName: "All", isActive: true });
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    // this.selectedVertical = this.verticals[0];
    // this.searchform.patchValue({ verticalId: this.selectedVertical.verticalId })

    this.selectedVertical = this.verticals[0];
  }
  changeVertical() {
    var verticalId = this.searchMyCalendar.get("verticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0];
    this.getAllFunction();
  }

  //function
  getAllFunction() {
    this.functionList = [];
    this.searchFunction.verticalId = this.selectedVertical.verticalId;
    this.functionService.getAllVerticalFunction(this.selectedVertical).subscribe((result) => {
      if (result) {
        this.functionList = result;
        this.functionList.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          isActive: true,
          verticalName: ""
        })
      }
      else {
        this.functionList = [];
        this.functionList.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          isActive: true,
          verticalName: ""
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  changeFunction(){
    this.getAllDepartment();
  }
  getAllDepartment(){
    this.departmentList = [];
    this.searchDepartment.functionId = this.searchMyCalendar.value.functionId;
    this.departmentService.getAllFunctionDepartment(this.searchDepartment).subscribe((result) => {
      if (result) {
        this.departmentList = result;
        this.departmentList.splice(0, 0, {
          departmentId: 0,
          verticalId: 0,
          departmentName: "All",
          functionId: 0,
          functionName: "",
          isActive: true,
          verticalName: ""
        })
      }
      else {
        this.departmentList = [];
        this.departmentList.splice(0, 0, {
          departmentId: 0,
          verticalId: 0,
          departmentName: "All",
          functionId: 0,
          functionName: "",
          isActive: true,
          verticalName: ""
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
      });
    });
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
  resetForm(){
    this.getAllVerticals();
    this.searchMyCalendar.patchValue({
      autoUserId: this.autoUserId,
      interviewId: 0,
      verticalId: 0,
      locationId: 0,
      fromDate: '',
      toDate: '',
      venueId: 0,
      positionId: 0,
      functionId: 0,
      departmentId: 0,
      interviewTypeId: 0,
      acceptStatus: 0     
    })
    this.filterSubmit();
  }
  actionCandidate(obj: any){
    jQuery(".custom-menu").hide();
    console.log("ok",obj)
    this.persistance.set('pagename', "rmcampusmycalendar");
    this.persistance.set('interviewMasterId', obj.interviewMasterId);
    this.persistance.set('functionId', obj.functionId);
    var c=1;
    this.persistance.set('count', c);
    this._route.navigateByUrl('campus/rm-mycalender-view-candidate');
  }
}
