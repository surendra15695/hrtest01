import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debug } from 'console';
import { privateDecrypt } from 'crypto';
import { NgxSpinnerService } from 'ngx-spinner';
import { IStatus } from '../../../interfaces/common/common.interface';
import { ISearchFunction, IVerticalFunction } from '../../../interfaces/common/function.interface';
import { IAssessmentList, ICandidateList, ISearchCandidate } from '../../../interfaces/common/inductionassessment.interface';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { IPositionVerticalDetail, ISearchPosition } from '../../../interfaces/common/position.interface';
import { IInterviewVenue, ISearchInterviewVenue } from '../../../interfaces/common/venue.interface';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { IEmployeeReplacementList } from '../../../interfaces/employee/employee.interface';
import { ICandidateRelocationReimbursementList } from '../../../interfaces/joining/hiringteam.interface';
import { IRequisitionList, ISearchRequisition } from '../../../interfaces/preselection/requisition.interface';
import { IAllocatedUserLists, IInterviewCalendarList, IinterviewCalendarReportList, ISearchAllocatedUser } from '../../../interfaces/selection/interviewcalendaraction.interface';
import { CommonService } from '../../../services/common/common/common.service';
import { DepartmentService } from '../../../services/common/department/department.service';
import { FunctionService } from '../../../services/common/function/function.service';
import { LocationService } from '../../../services/common/location/location.service';
import { PositionService } from '../../../services/common/position/position.service';
import { UserService } from '../../../services/common/user/user.service';
import { EmployeeService } from '../../../services/employee/employee/employee.service';
import { ExcelService } from '../../../services/excel/excel.service';
import { HiringteamService } from '../../../services/joining/hiringteam/hiringteam.service';
import { CandidateService } from '../../../services/preselection/candidate/candidate.service';
import { RequisitionService } from '../../../services/preselection/requisition/requisition.service';
import { ReportService } from '../../../services/reports/report.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
declare var jQuery: any;

@Component({
  selector: 'app-interview-calendar-report',
  templateUrl: './interview-calendar-report.component.html',
  styleUrls: ['./interview-calendar-report.component.css']
})
export class InterviewCalendarReportComponent implements OnInit {

  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  //@ViewChild('modeOfInterview', { static: false }) modeOfInterview: ElementRef;
  searchform: FormGroup;
  //candidate list
  candidateLists: ICandidateList[] = [];
  searchCandidateNo: ICandidateList = {
    requisitionDetailId: null,
    candidateId: null,
    candidateNo: null,
    requisitionNo: null,
    candidateFullName: null,
    verticalId: null,
    verticalName: null,
    designation: null,
    designationName: null,
    functionId: null,
    functionName: null,
    departmentId: null,
    departmentName: null,
    locationId: null,
    locationName: null,
    gradeId: null,
    gradeName: null,
    emailId: null,
    contact: null,
    qualificationId: null,
    qualificationName: null,
    courseId: null,
    courseName: null,
    streamId: null,
    streamName: null,
    marksPercentage: null,
    experienceYear: null,
    experienceMonth: null,
    stateId: null,
    stateName: null,
    dateofJoining: null,
    modeofJoining: null,
    modeofJoiningName: null,
    positionCode: null,
    remarks: null,
    docApprovalStatusId: null,
    docApprovalStatus: null,
    hiringStatusId: null,
    hiringStatusName: null,
    candidateOnBoardingId: null,
    onBoardingCoordinator: null,
    candidateReprtingVenueId: null
  }

  //requisition list
  requisitionLists: IRequisitionList[] = [];
  SearchReqNo: ISearchRequisition = {
    requisitionNo: null,
    requistionId: null,
    requisitionDetailId: null,
    locationId: null,
    verticalId: null,
    fromDate: null,
    toDate: null,
    iOMNo: null,
    requisitionApprovalStatus: null,
    requisitionProcessStatus: null,
    createdBy: null,
    approverAutoUserId: null,
    allocatedUserId: null,
    requisitionTypeId: null

  }
  interviewVenueList: any[] = [];
  interviewVenues: IInterviewVenue[] = [];
  searchinterviewVenue: ISearchInterviewVenue = {
    venueId: null,
    verticalId: null,
    isActive: true
  }
  PositionList: any[] = [];
  positions: IPositionVerticalDetail[] = [];
  searchPosition: ISearchPosition =
    {
      verticalId: null,
      positionId: null,
      isActive: true
    }
  interviewcalendarLists: any[] = [];
  //AllocatedUserId
  UserList: any[] = [];
  searchAllocatedUser: ISearchAllocatedUser =
    {
      userId: null,
      roleIds: null,
      isActive: true
    }
  //vertical
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  verticalIds: string;
  //Interview
  interviews: IinterviewCalendarReportList[] = [];
  selectedInterview: IinterviewCalendarReportList;
  interviewsType = [{ modeOfInterview: 'Offline' }, { modeOfInterview: 'Online' }]
  interviewTypeIds: string;
  modeOfInterview: any;
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
  //function
  functions: IVerticalFunction[] = [];
  selectedFunction: IVerticalFunction;
  searchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  functionId: number;
  functionName: string;

  constructor(
    private SpinnerService: NgxSpinnerService,
    private persistance: PersistanceService,
    private commonService: CommonService,
    private locationService: LocationService,
    private reportService: ReportService,
    private excelService: ExcelService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private hiringteamService: HiringteamService,
    private departmentService: DepartmentService,
    public functionService: FunctionService,
    private employeeService: EmployeeService,
    private requisitionService: RequisitionService,
    private candidateService: CandidateService,
    private positionService: PositionService,
    private userService: UserService,
  ) {
    this.createForm();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllFunction();
     this.getAllPositionMaster();
    // this.getAllInterviewVenue();
    this.getAllUser();
    this.selectedRequisition();
    this.selectedCandidate();
  }
  ngOnInit() {
    this.loadDatePicker();
    this.loadDataTable();
    setTimeout(() => {
      this.formSubmit();
    })
  }
  createForm(){
    this.searchform = this.fb.group({
      requisitionNo: [''],
      candidateNo: [''],
      empId: [''],
      verticalId: [0],
      locationId: [0],
      functionId: [0],
      departmentId: [0],
      positionId: [0],
      gradeId: [0],
      fromDate: [''],
      toDate: ['']
    });
  }
  // getAllInterviewVenue() {
  //   this.searchinterviewVenue.verticalId = this.selectedVertical.verticalId;
  //   this.commonService.getAllInterviewVenue(this.searchinterviewVenue).subscribe((response: any) => {
  //     if (response) {
  //       //console.log("Piu", response)
  //       this.interviewVenueList = response;
  //       this.interviewVenues = response;
  //       this.interviewVenues.splice(0, 0, {
  //         venueId: 0,
  //         verticalIds: "",
  //         venueName: "All",
  //         isActive: true,
  //         verticalNames: ""
  //       })
  //     }
  //     else {
  //       this.interviewVenues = [];
  //       this.interviewVenues.splice(0, 0, {
  //         venueId: 0,
  //         verticalIds: "",
  //         venueName: "All",
  //         isActive: true,
  //         verticalNames: ""
  //       })
  //     }
  //   }, error => {
  //     console.log(error);
  //   }, () => { 
  //   })
  // }

  //Position
  getAllPositionMaster() {
    this.searchPosition.verticalId = this.selectedVertical.verticalId;
    this.positionService.getAllPositionMaster(this.searchPosition).subscribe((response: any) => {
      if (response) {
        this.positions = response;
        this.positions.splice(0, 0, {
          positionId: 0,
          verticalIds: "",
          positionName: "All",
          isActive: true,
          verticalNames: ""
        })
      }
      else {
        this.positions = [];
        this.positions.splice(0, 0, {
          positionId: 0,
          verticalIds: "",
          positionName: "All",
          isActive: true,
          verticalNames: ""
        })
      }
    }, error => {
      console.log(error);
    }, () => { 
    })
  }
  //AllocatedUserId
  getAllUser() {
    this.UserList = [];
    var obj = {
      userId: "",
      roleIds: ""
    }
    this.userService.getAllUser(obj).subscribe((response: any) => {
      if (response) {
        this.UserList = response;
        //console.log("!!!!!!!!", response)
      }
    }, error => {
      console.log(error);
    }, () => {
      //this.loadSelectPicker();
    })
  }
  changeAllocatedUser() {
    this.searchAllocatedUser.userId = this.searchAllocatedUser.userId;
  }
  loadSelectPicker() {
    setTimeout(() => {
      jQuery('.selectpicker').selectpicker({
        size: 6
      });
      jQuery('.selectpicker').selectpicker('refresh');
    });
  }

  //verticals
  getAllVerticals(){
    this.verticals = [];
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });   
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    this.loadSelectPicker();
    this.selectedVertical = this.verticals.filter(x => x.verticalId == 0)[0];
  }
  changeVertical() {
    var verticalId = this.searchform.get("verticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0];
    this.getAllLocation();
    this.getAllFunction();
  }
  
  // Candidate
  selectedCandidate() {
    this.candidateLists = [];
    var obj = {
      candidateNo: ''
    }
    //this.SearchCandidateNo.candidateNo = this.SearchCandidateNo.candidateNo;
    this.candidateService.getCandidateList(obj).subscribe((result) => {
      if (result) {
        this.candidateLists = result;
        //console.log("canId", result)
      }
    }, error => {
      console.log(error);
    }, () => {
      //this.loadSelectPicker();
    });
  }
  changeCandidateNo() {
    this.searchCandidateNo.candidateNo = this.searchCandidateNo.candidateNo;
  }

  // Requisition
  selectedRequisition() {
    this.requisitionLists = [];
    var obj = {
      ReqNo: "",
      ReqId: 0
    }
    //this.SearchReqNo.requisitionNo = this.SearchReqNo.requisitionNo;
    this.requisitionService.getAllRequisition(obj).subscribe((result) => {
      if (result) {
        this.requisitionLists = result;
      }
    }, error => {
      console.log(error);
    }, () => {
      //this.loadSelectPicker();
    });
  }
  changeRequisitionNo() {
    this.SearchReqNo.requisitionNo = this.SearchReqNo.requisitionNo;
  }
  //functions
 getAllFunction() {
    this.functions = [];
    this.searchFunction.verticalId = this.selectedVertical.verticalId;
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;
        this.functions.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          isActive: true,
          verticalName: ""
        })
      }
      else {
        this.functions = [];
        this.functions.splice(0, 0, {
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
      this.loadSelectPicker();
      this.SpinnerService.hide();
    });
    this.selectedFunction = this.functions.filter(x => x.functionId == 0)[0];
  }

  //locations
  getAllLocation() {
    this.locations = [];
    this.searchLocation.verticalId = this.selectedVertical.verticalId;
    this.locationService.getAllLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        this.locations = result;
        this.locations.splice(0, 0, {
          locationId: 0,
          verticalId: 0,
          locationNo: "All",
          locationCode: "",
          locationOffice: "All",
          isActive: true,
          createdBy: 0
        })
      }
      else {
        this.locations = [];
        this.locations.splice(0, 0, {
          locationId: 0,
          verticalId: 0,
          locationNo: "All",
          locationCode: "",
          locationOffice: "All",
          isActive: true,
          createdBy: 0
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
        "fixedColumns":{
          "left": 4
        }
      });
    });
  }
  onChangeInterviewType(value) {
    this.modeOfInterview = value;
  }
  formSubmit() {
    var flag=0;
      this.searchform.patchValue(
        {
          verticalId: this.selectedVertical.verticalId,
          fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
          toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,  // date added by arg
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
      if(flag==0){
        this.interviewcalendarLists = [];
        console.log("patch", this.searchform.value);
      this.SpinnerService.show();
      this.reportService.interviewcalendarreport(this.searchform.value).subscribe((result) => {
      if (result) {
        
        this.interviewcalendarLists = result;
        this.loadDataTable();
        this.SpinnerService.hide();
      }
      else {
        this.interviewcalendarLists = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.loadSelectPicker();
      this.SpinnerService.hide();
    });
    }
    
  }
  capitalizeFirstLetter(str: string): string {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (i > 0 && str[i] === str[i].toUpperCase()) {
            result += ' ';
        }
        result += str[i];
    }
    return result.charAt(0).toUpperCase()+ result.slice(1);;

  }
  ExportReport(){
    if(this.interviewcalendarLists.length != 0){
      this.interviewcalendarLists.forEach((e,index)=>{
        e.serialNo = index+1;
      })
      const updatedArray: any[] = [];
      this.interviewcalendarLists.forEach((obj) => {
      const updatedObj: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const updatedKey = this.capitalizeFirstLetter(key);
          updatedObj[updatedKey] = obj[key];
        }
      }
      updatedArray.push(updatedObj);
    });
      this.excelService.ExportAsExcelFileForReport(updatedArray, 'Interview Calendar Report');
    }
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
      jQuery(".dropdown-item").on("click", function () {
        jQuery('.dropdown-menu').hide();
      });
    });
  }
  // reset() {
  //   this.searchform.reset();
  //   this.searchform.patchValue({
  //     verticalId: 0,
  //     positionId: 0,
  //     functionId: 0,
  //     locationId: 0,
  //     venueId: 0,
  //     empNo: 0,
  //   })
  //   this.fromSubmit();
  //   //this.loadSelectPicker();
  //   this.interviewcalendarLists = [];
  //   this.loadDataTable();
  // }
  reset() {
    this.searchform.reset();
    this.searchform.patchValue({
      verticalId: 0,
      locationId: 0,
      functionId: 0,
      departmentId: 0,
      positionId: 0,
      empNo: 0,
    })
    this.changeVertical();
    this.formSubmit();
    //this.getAllFunction(); 
  }

  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });


  }
}

