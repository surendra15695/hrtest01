import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { privateDecrypt } from 'crypto';
import { NgxSpinnerService } from 'ngx-spinner';
import { ISearchFunction, IVerticalFunction } from '../../../interfaces/common/function.interface';
import { IAssessmentList, ICandidateList, ISearchCandidate } from '../../../interfaces/common/inductionassessment.interface';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { IEmployeeReplacementList } from '../../../interfaces/employee/employee.interface';
import { ICandidateRelocationReimbursementList } from '../../../interfaces/joining/hiringteam.interface';
import { IRequisitionList, ISearchRequisition } from '../../../interfaces/preselection/requisition.interface';
import { CommonService } from '../../../services/common/common/common.service';
import { DepartmentService } from '../../../services/common/department/department.service';
import { FunctionService } from '../../../services/common/function/function.service';
import { LocationService } from '../../../services/common/location/location.service';
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
  selector: 'app-documentstatus-report',
  templateUrl: './documentstatus-report.component.html',
  styleUrls: ['./documentstatus-report.component.css']
})
export class DocumentstatusReportComponent implements OnInit {
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
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
  //EmpNo
  employees: IEmployeeReplacementList[] = [];
  documentstatusLists: any[];
  SearchEmpNo: IEmployeeReplacementList = {
    empId: null,
    empNo: null,
    empName: null,
    designation: null,
    gradeName: null,
    functionId: null,
    functionName: null
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
  constructor(
    private SpinnerService: NgxSpinnerService,
    private persistance: PersistanceService,
    private commonService: CommonService,
    private locationService: LocationService,
    private reportService: ReportService,
    private excelService: ExcelService,
    private fb: FormBuilder,
    private hiringteamService: HiringteamService,
    private departmentService: DepartmentService,
    private notificationService: NotificationService,
    public functionService: FunctionService,
    private employeeService: EmployeeService,
    private requisitionService: RequisitionService,
    private candidateService: CandidateService
  ) {
    this.createForm();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllFunction();
    this.getAllDepartment();
    this.selectedEmployee();
    //this.selectedRequisition();
    //this.selectedCandidate();
  }
  ngOnInit() {
    this.loadDatePicker();
    this.loadDataTable();
    this.selectedEmployee();
    setTimeout(() => {
      this.fromSubmit();
    })
    //this.selectedRequisition();
    //this.selectedCandidate();
  }
  createForm() {
    // this.searchform = this.fb.group({
    //   candidateNo:[''],
    //   requisitionNo: [''],
    //   empNo: [''],
    //   fromDate: [''],
    //   toDate: [''],
    //   verticalId: null,
    //   departmentId: null,
    //   functionId: null,
    //   locationId: null,
    // });
    this.searchform = this.fb.group({
      requisitionNo: [''],
      candidateNo: [''],
      verticalId: [0],
      locationId: [0],
      functionId: [0],
      departmentId: [0],
      positionId: [0],
      fromDate: [''],
      toDate: ['']
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
  // Candidate
  selectedCandidate() {
    this.candidateLists = [];
    var obj = {
      CandidateNo: "",
      CandidateId: 0
    }
    //this.SearchCandidateNo.candidateNo = this.SearchCandidateNo.candidateNo;
    this.candidateService.getCandidateList(obj).subscribe((result) => {
      if (result) {
        this.candidateLists = result;
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

  // Employee
  selectedEmployee() {
    this.employees = [];
    var obj = {
      EmpNo: "",
      EmpId: 0
    }
    //this.SearchEmpNo.empNo = this.SearchEmpNo.empNo;
    this.employeeService.getEmployeeReplacementList(obj).subscribe((result) => {
      if (result) {
        this.employees = result;
      }
    }, error => {
      console.log(error);
    }, () => {
      //this.loadSelectPicker();
    });
  }
  changeEmployeeNo() {
    this.SearchEmpNo.empNo = this.SearchEmpNo.empNo;
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
  exportToExcel(){
    if(this.documentstatusLists.length != 0){
      this.documentstatusLists.forEach((e,index)=>{
        e.serialNo = index+1;
      })
      const updatedArray: any[] = [];
      this.documentstatusLists.forEach((obj) => {
      const updatedObj: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const updatedKey = this.capitalizeFirstLetter(key);
          updatedObj[updatedKey] = obj[key];
        }
      }
      updatedArray.push(updatedObj);
    });
      this.excelService.ExportAsExcelFileForReport(updatedArray, 'Document Status Report');
    }
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
          "left":4
        }
      });
    });
  }

  fromSubmit() {
    var flag=0;
    this.searchform.patchValue(
      {
        fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,
        verticalId: this.selectedVertical.verticalId,
        // departmentId: this.SearchDepartmentId.departmentId,
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
    this.documentstatusLists = [];
    console.log("patch", this.searchform.value);
    this.SpinnerService.show();
    this.reportService.documentstatusreport(this.searchform.value).subscribe((result) => {
      if (result) {
        console.log(result);
        this.documentstatusLists = result;
        this.loadDataTable();
        this.SpinnerService.hide();
      }
      else {
        this.documentstatusLists = [];
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
  reset() {
    this.searchform.reset();
    this.searchform.patchValue({
      verticalId: 0,
      locationId: 0,
      functionId: 0,
      departmentId: 0,
      positionId: 0
    })
    //this.loadSelectPicker();
    //this.requisitionLists = [];
    //this.loadDataTable();
    this.changeVertical();
    this.fromSubmit();
  }
  loadSelectPicker() {
    setTimeout(() => {
      jQuery('.selectpicker').selectpicker({
        size: 6
      });
      jQuery('.selectpicker').selectpicker('refresh');
    });
  }
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });


  }
}

