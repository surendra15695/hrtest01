import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ISearchFunction, IVerticalFunction } from '../../../interfaces/common/function.interface';
import { IGrade, ISearchGrade } from '../../../interfaces/common/grade.interface';
import { ICandidateList } from '../../../interfaces/common/inductionassessment.interface';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { IPositionVerticalDetail, ISearchPosition } from '../../../interfaces/common/position.interface';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { IEmployeeSalaryList } from '../../../interfaces/employee/employee.interface';
import { IRequisitionList, ISearchRequisition } from '../../../interfaces/preselection/requisition.interface';
import { ISearchAllocatedUser } from '../../../interfaces/selection/interviewcalendaraction.interface';
import { CommonService } from '../../../services/common/common/common.service';
import { DepartmentService } from '../../../services/common/department/department.service';
import { FunctionService } from '../../../services/common/function/function.service';
import { GradeService } from '../../../services/common/grade/grade.service';
import { LocationService } from '../../../services/common/location/location.service';
import { PositionService } from '../../../services/common/position/position.service';
import { UserService } from '../../../services/common/user/user.service';
import { EmployeeService } from '../../../services/employee/employee/employee.service';
import { HiringteamService } from '../../../services/joining/hiringteam/hiringteam.service';
import { RequisitionService } from '../../../services/preselection/requisition/requisition.service';
import { ReportService } from '../../../services/reports/report.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
declare var jQuery: any;

@Component({
  selector: 'app-employee-salary-report',
  templateUrl: './employee-salary-report.component.html',
  styleUrls: ['./employee-salary-report.component.css']
})
export class EmployeeSalaryReportComponent implements OnInit {

  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  //@ViewChild('modeOfInterview', { static: false }) modeOfInterview: ElementRef;
  searchform: FormGroup;
  //Grade list
  grades: IGrade[] = [];
  searchGrade: ISearchGrade = {
    gradeId: null,
    isActive: true
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
  PositionList: any[] = [];
  positions: IPositionVerticalDetail[] = [];
  searchPosition: ISearchPosition =
    {
      verticalId: null,
      positionId: null,
      isActive: true
    }
  //AllocatedUserId
  UserList: any[] = [];
  searchAllocatedUser: ISearchAllocatedUser =
    {
      userId: null,
      roleIds: null,
      isActive: true
    }
  employeesalaryLists: IEmployeeSalaryList[] = [];
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
    private hiringteamService: HiringteamService,
    private departmentService: DepartmentService,
    public functionService: FunctionService,
    private employeeService: EmployeeService,
    private requisitionService: RequisitionService,
    private positionService: PositionService,
    private userService: UserService,
    private gradeService: GradeService,
  ) {
    this.createForm();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllFunction();
    this.getAllPositionMaster();
    this.getAllDepartment();
    this.getAllUser();
    this.selectedRequisition();
    this.getAllGrade();
  }
  ngOnInit() {
    this.loadDatePicker();
    this.loadDataTable();
    //this.selectedRequisition();
    //this.selectedCandidate();
  }
  createForm() {
    this.searchform = this.fb.group({
      requisitionNo: [''],
      gradeName: [''],
      gradeId: [0],
      fromDate: [''],
      toDate: [''],
      verticalId: null,
      positionName: [''],
      positionId: [0],
      departmentId: null,
      functionId: null,
      locationId: null,
      userId: [''],
    });
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
  //Grade
  getAllGrade() {
    this.gradeService.getAllGrade(this.searchGrade).subscribe((response: any) => {
      if (response) {
        this.grades = response;
        this.grades.splice(0, 0, {
          gradeId: 0,
          gradeName: "All",
          isActive: true,
          createdBy: 0
        })
      }
      else {
        this.grades = [];
        this.grades.splice(0, 0, {
          gradeId: 0,
          gradeName: "All",
          isActive: true,
          createdBy: 0
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    })
  }
  onchangeGrade() {
    this.searchGrade.gradeId = this.searchform.get("gradeId").value;
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

  //verticals
  getAllVerticals() {
    this.verticals = [];
    this.verticalIds = "1,2,3";
    var splitvertical = this.verticalIds.split(",");
    var allvertical = "";
    console.log(splitvertical);
    for (var i = 0; i < splitvertical.length; i++) {
      if (splitvertical[i] != "0") {
        if (splitvertical[i] == "1") {
          this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
        }
        else if (splitvertical[i] == "2") {
          this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
        }
        else if (splitvertical[i] == "3") {
          this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
        }
        if (allvertical == "") {
          allvertical = splitvertical[i];
        }
        else {
          allvertical = allvertical + "," + splitvertical[i];
        }
      }

    }
    this.selectedVertical = this.verticals[0];
    this.searchform.patchValue(
      {
        verticalId: this.selectedVertical.verticalId,
      });
    // this.setDefaultVertical();
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

  // Requisition
  selectedRequisition() {
    this.requisitionLists = [];
    var obj = {
      requisitionNo: "",
    }
    //this.SearchReqNo.requisitionNo = this.SearchReqNo.requisitionNo;
    this.requisitionService.getAllRequisition(obj).subscribe((result) => {
      debugger
      if (result) {
        this.requisitionLists = result;
      }
    }, error => {
      console.log(error);
    }, () => {
      //this.loadSelectPicker();
    });
  }
  //changeRequisitionNo() {
  //  this.SearchReqNo.requisitionNo = this.SearchReqNo.requisitionNo;
  //}
  onchangeReqNo() {
    this.SearchReqNo.requisitionNo = this.searchform.get("requisitionNo").value;
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
          locationOffice: "",
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
          locationOffice: "",
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
      });
    });
  }

  fromSubmit() {
    this.searchform.patchValue(
      {
        fromDate: this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value,
        verticalId: this.selectedVertical.verticalId,
        gradeId: this.searchGrade.gradeId,
        requisitionNo: this.SearchReqNo.requisitionNo
      });
    //console.log("patch", this.searchform.value);
    debugger
    this.SpinnerService.show();
    this.reportService.employeesalaryReportLists(this.searchform.value).subscribe((result) => {
      if (result) {
        console.log("Piu", result)
        this.employeesalaryLists = result;
        this.loadDataTable();
        this.SpinnerService.hide();
      }
      else {
        this.employeesalaryLists = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
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
      jQuery(".dropdown-item").on("click", function () {
        jQuery('.dropdown-menu').hide();
      });
    });
  }
  reset() {
    this.searchform.reset();
    this.searchform.patchValue({
      verticalId: 0,
      positionId: 0,
      functionId: 0,
      locationId: 0,
      departmentId:0
    })
    this.fromSubmit();
    //this.loadSelectPicker();
    this.employeesalaryLists = [];
    this.loadDataTable();
  }

  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });


  }
}
