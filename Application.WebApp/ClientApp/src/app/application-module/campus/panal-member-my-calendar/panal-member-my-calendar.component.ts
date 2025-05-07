import { Component, OnInit ,ViewChild, ElementRef } from '@angular/core';
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
import { VerticalService } from 'src/app/services/common/vertical/vertical.service';
import { InterviewcalendaractionService } from 'src/app/services/selection/interviewcalendaraction/interviewcalendaraction.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-panal-member-my-calendar',
  templateUrl: './panal-member-my-calendar.component.html',
  styleUrls: ['./panal-member-my-calendar.component.css']
})
export class PanalMemberMyCalendarComponent implements OnInit {
  @ViewChild('pfromDate', { static: false }) fDate: ElementRef;
  @ViewChild('ptoDate', { static: false }) tDate: ElementRef;
  searchMyCalendar: FormGroup;
  allInterviewCalendarList:ICalendarList[] =[];
  //interview
  interviews: any[] = [];
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
    private calenderActionSevice: InterviewcalendaractionService,
    private verticalService: VerticalService,
    private notificationService: NotificationService,
  ) {
    this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
    this.getAllInterviewName();
    this.getAllVenues();
    this.getAllVerticals();
    this.createForm();
  }

  ngOnInit() {
    this.loadDatePicker();
    this.loadDataTable();
    this.loadTooltipMenu();
    this.getAllVerticals();
    // this.getAllFunction();
    this.functionList.splice(0, 0, {
        functionId: 0,
        verticalId: 0,
        functionName: "All",
        isActive: true,
        verticalName: ""
      })
    this.getAllDepartment();
    setTimeout(() => {
      this.filterSubmit(); 
    })
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
    var flag = 0;
    this.searchMyCalendar.patchValue(
      {
        fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,
      });
    if (this.fDate.nativeElement.value.length > 0 && this.tDate.nativeElement.value.length > 0) {
      const [fDay, fMonth, fYear] = this.fDate.nativeElement.value.split("/");
      const fDate = new Date(fYear, fMonth - 1, fDay);
      const [tDay, tMonth, tYear] = this.tDate.nativeElement.value.split("/");
      const tDate = new Date(tYear, tMonth - 1, tDay);
      if (fDate > tDate) {
        this.notificationService.showError("To Date Cann't be less than from From Date !! Please provide actual date", "Error");
        flag = 1;
      }
    }
    if(flag == 0){
    this.SpinnerService.show();
    this.allInterviewCalendarList = [];
    this.interActionService.getMyCampusCalenderList(this.searchMyCalendar.value).subscribe((result) => {
      if (result) {
        this.allInterviewCalendarList = result;
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
  }
  

  getAllInterviewName(){
    var value={
      InterviewNameId:0
    }
    this.calenderActionSevice.getcampusinterviewname(value).subscribe((response: any) => {            
      if(response){
        this.interviews = response;
        this.interviews.splice(0, 0, {
          interviewNameId: 0,
          interviewName: "All",
          isActive: true,
          createdBy: 0
        })                            
      }
      else{
        this.interviews = []; 
    }
  })
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
    var value ={
      FunctionName:"",
      FunctionId:0,
      VerticalId:null,
      IsActive:true
    }
    this.verticalService.getAllCAmpusVertical(value).subscribe((result) => {
      if (result) {
        this.verticals=result;
        this.verticals.splice(0, 0, {
          verticalId: 0,
          verticalName: "All",
          isActive: true
        }) 
      }
      else {
        this.verticals = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });

  }
  changeVertical() {
    var verticalId = this.searchMyCalendar.get("verticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0];
    // this.searchMyCalendar.value.functionId=[];
    this.getAllFunction();
  }
  getAllFunction() {
    this.functionList = [];
    this.searchFunction.verticalId = this.selectedVertical.verticalId;
    this.functionService.getAllCampusVerticalFunction(this.searchFunction).subscribe((result) => {
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
  //function
  // getAllFunction() {
  //   this.functionList = [];
  //   this.searchFunction.verticalId = this.selectedVertical.verticalId;
  //   this.functionService.getAllVerticalFunction(this.selectedVertical).subscribe((result) => {
  //     if (result) {
  //       this.functionList = result;
  //       this.functionList.splice(0, 0, {
  //         functionId: 0,
  //         verticalId: 0,
  //         functionName: "All",
  //         isActive: true,
  //         verticalName: ""
  //       })
  //     }
  //     else {
  //       this.functionList = [];
  //       this.functionList.splice(0, 0, {
  //         functionId: 0,
  //         verticalId: 0,
  //         functionName: "All",
  //         isActive: true,
  //         verticalName: ""
  //       })
  //     }
  //   }, error => {
  //     console.log(error);
  //   }, () => {
  //   });
  // }
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
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "order":[]
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
    this.persistance.set('pagename', "campusmycalendar");
    this.persistance.set('interviewMasterId', obj.interviewMasterId);
    this.persistance.set('functionId', obj.functionId);
    var c=1;
    this.persistance.set('count', c);
    this._route.navigateByUrl('/app/campus/campusmycalendar');
  }

}
