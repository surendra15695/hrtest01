import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICompanyDoctorReportList } from '../../../interfaces/common/common.interface';
import { ISearchFunction, IVerticalFunction } from '../../../interfaces/common/function.interface';
import { ICandidateList } from '../../../interfaces/common/inductionassessment.interface';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { IEmployeeNo, IsearchEmployeeNo } from '../../../interfaces/joining/hiringteam.interface';
import { IRequisitionList, ISearchRequisition } from '../../../interfaces/preselection/requisition.interface';
import { ISearchAllocatedUser } from '../../../interfaces/selection/interviewcalendaraction.interface';
import { CandidateService } from '../../../services/candidate/candidate/candidate.service';
import { CommonService } from '../../../services/common/common/common.service';
import { DepartmentService } from '../../../services/common/department/department.service';
import { FunctionService } from '../../../services/common/function/function.service';
import { LocationService } from '../../../services/common/location/location.service';
import { PositionService } from '../../../services/common/position/position.service';
import { UserService } from '../../../services/common/user/user.service';
import { EmployeeService } from '../../../services/employee/employee/employee.service';
import { HiringteamService } from '../../../services/joining/hiringteam/hiringteam.service';
import { RequisitionService } from '../../../services/preselection/requisition/requisition.service';
import { ReportService } from '../../../services/reports/report.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
declare var jQuery: any;

@Component({
  selector: 'app-companydoctor-report',
  templateUrl: './companydoctor-report.component.html',
  styleUrls: ['./companydoctor-report.component.css']
})
export class CompanydoctorReportComponent implements OnInit {
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  //@ViewChild('modeOfInterview', { static: false }) modeOfInterview: ElementRef;
  searchform: FormGroup;
  //EmpNo
  empLists: IEmployeeNo[] = [];
  searchEmpNo: IsearchEmployeeNo = {
    candidateId: null
  }
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
  //AllocatedUserId
  UserList: any[] = [];
  searchAllocatedUser: ISearchAllocatedUser =
    {
      userId: null,
      roleIds: null,
      isActive: true
    }
  companydoctorreportLists: any[] = [];
  //department
  departmentId: ICandidateList[] = [];
  ddlDepartment: ICandidateList[] = [];
  SearchDepartmentId: ICandidateList = {
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
  //vertical
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  verticalIds: string;
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
    private fb: FormBuilder,
    private candidateService: CandidateService,
    private hiringteamService: HiringteamService,
    private departmentService: DepartmentService,
    private notificationService: NotificationService,
    public functionService: FunctionService,
    private employeeService: EmployeeService,
    private requisitionService: RequisitionService,
    private positionService: PositionService,
    private userService: UserService,
    private excelService: ExcelService,
  ) {
    this.createForm();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllFunction();
    this.getAllDepartment();
    this.getAllUser();
    this.selectedCandidate();
  }
  ngOnInit() {
    this.loadDatePicker();
    this.loadDataTable();
    setTimeout(() => {
      this.fromSubmit();
    })
    //this.selectedRequisition();
    //this.selectedCandidate();
  }
  createForm() {
    this.searchform = this.fb.group({
      requisitionNo: [''],
      candidateNo: [''],
      verticalId: [0],
      locationId: [0],
      functionId: [0],
      departmentId: [0],
      fromDate: [''],       
      toDate: [''], 
    });
  }
  //EmpNo
  //getEmployeeNoDeatils() {
  //  this.empLists = [];
  //  var obj = {
  //    candidateId: 0
  //  }
  //  this.hiringteamService.getEmployeeNoDetails(obj).subscribe((result) => {
  //    if (result) {
  //      this.empLists = result;
  //    }
  //    else {
  //      this.empLists = [];
  //      this.SpinnerService.hide();
  //    }
  //  }, error => {
  //    console.log(error);
  //    this.SpinnerService.hide();
  //  }, () => {
  //    this.SpinnerService.hide();
  //  });
  //}
  //changeEmpNo() {
  //  this.searchEmpNo.candidateId = this.searchform.get("candidateId").value;
  //}
  // Candidate
  selectedCandidate() {
    this.candidateLists = [];
    var obj = {
      CandidateNo: ''
    }
    //this.SearchCandidateNo.candidateNo = this.SearchCandidateNo.candidateNo;
    this.candidateService.getCandidateData(obj).subscribe((result) => {
      if (result) {
        this.candidateLists = result;
        console.log("canId", result)
      }
    }, error => {
      console.log(error);
    }, () => {
      //this.loadSelectPicker();
    });
  }
  changeCandidateNo() {
    this.searchCandidateNo.candidateNo = this.searchform.get("candidateNo").value;
  }
  //departments
  getAllDepartment() {
    //this.departmentId = [];
    this.ddlDepartment = [];
    this.departmentService.getAllFunctionDepartment(this.SearchDepartmentId).subscribe((result) => {
      if (result) {
        console.log("Department", result);
        //this.departmentId = result;
        this.ddlDepartment = result;
      }
    }, error => {
      console.log(error);
    }, () => {
      //this.loadSelectPicker();
    });
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
 
  getAllVerticals(){
    this.verticals = [];
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    this.loadSelectPicker();
    this.selectedVertical = this.verticals.filter(x => x.verticalId == 0)[0];
  }

  setDefaultVertical() {
    setTimeout(() => {
      jQuery('.ddlvertical').selectpicker("val", "0: " + this.selectedVertical.verticalId + "");
      jQuery('.ddlvertical').selectpicker("refresh");
    });
  }

  changeVertical() {
    var verticalId = this.searchform.get("verticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0];
    console.log(this.selectedVertical);
    this.getAllLocation();
    this.getAllFunction();
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
    });
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
    if(this.companydoctorreportLists.length != 0){
      this.companydoctorreportLists.forEach((e,index)=>{
        e.serialNo = index+1;
      })
      const updatedArray: any[] = [];
      this.companydoctorreportLists.forEach((obj) => {
      const updatedObj: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const updatedKey = this.capitalizeFirstLetter(key);
          updatedObj[updatedKey] = obj[key];
        }
      }
      updatedArray.push(updatedObj);
    });
      this.excelService.ExportAsExcelFileForReport(updatedArray, 'Company Doctor Report');
    }
  }
  fromSubmit() {
    var flag = 0;
    this.searchform.patchValue(
      {
        fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,   
        verticalId: this.selectedVertical.verticalId,
        //candidateNo: this.searchCandidateNo.candidateNo,
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
    if(flag ==0){
      this.companydoctorreportLists = [];
      this.SpinnerService.show();
      this.reportService.comapnydoctorreport(this.searchform.value).subscribe((result) => {
        if (result) {
          this.companydoctorreportLists = result;
          this.loadDataTable();
          this.SpinnerService.hide();
        }
        else {
          this.companydoctorreportLists = [];
          this.SpinnerService.hide();
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
      }, () => {
        this.SpinnerService.hide();
      });
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
  //     functionId: 0,
  //     locationId: 0,
  //    // departmentId: 0,
  //   })
  //   this.fromSubmit();
  //   //this.loadSelectPicker();
  //   // this.companydoctorreportLists = [];
  //   this.loadDataTable();
  // }
  reset() {
    this.searchform.reset();
    this.searchform.patchValue({
      candidateNo:'',
      verticalId: 0,
      locationId: 0,
      functionId: 0,
      departmentId: 0,
    
    })
    this.changeVertical();
    this.fromSubmit();
  }

  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });


  }
}
