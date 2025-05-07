import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../../interfaces/common/vertical.interface';
import { IStatus, IFormFiles } from '../../../../../interfaces/common/common.interface';
import { ILocation, ISearchLocation } from '../../../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction } from '../../../../../interfaces/common/function.interface';
import { IFunctionDepartment, ISearchDepartment } from '../../../../../interfaces/common/department.interface';
import { IJobType, ISearchJobType } from '../../../../../interfaces/common/jobtype.interface';
import { IJobDescription, ISearchJobDescription, ISearchJobDescriptionResignation } from '../../../../../interfaces/common/jobdescription.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../../interfaces/common/position.interface';
import { ITransferDetailData, ITransferDetailDataArray, ITransferFormData, ISearchVacancyList, IVacancyList } from '../../../../../interfaces/preselection/transfer.interface';
import { IEmployeeReplacementList, ISearchEmployeeReplacement } from '../../../../../interfaces/employee/employee.interface';
import { CommonService } from '../../../../../services/common/common/common.service';
import { EmployeeService } from '../../../../../services/employee/employee/employee.service';
import { LocationService } from '../../../../../services/common/location/location.service';
import { FunctionService } from '../../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../../services/common/department/department.service';
import { PositionService } from '../../../../../services/common/position/position.service';
import { JobtypeService } from '../../../../../services/common/jobtype/jobtype.service';
import { JobdescriptionService } from '../../../../../services/common/jobdescription/jobdescription.service';
import { TransferService } from '../../../../../services/preselection/transfer/transfer.service';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
//import * as $ from 'jquery';
declare var jQuery: any;

@Component({
  selector: 'app-transfercorporate',
  templateUrl: './transfercorporate.component.html',
  styleUrls: ['./transfercorporate.component.css']
})
export class TransfercorporateComponent implements OnInit {
  pageTitle: string = "Transfer - New Request";
  StaticVerticalId: number;
  @ViewChild('tDate', { static: false }) tDate: ElementRef;
  @ViewChild('dtDate', { static: false }) dtDate: ElementRef;
  saveform: FormGroup;
  showTable: boolean = false;
  iomdisable: boolean = false;
  empNo: string;
  empId: number;
  empName: string;
  designation: string;
  oldGradeName: string;
  oldFunctionId: number;
  oldFunctionName: string;
  employees: IEmployeeReplacementList[];
  searchEmployee: ISearchEmployeeReplacement = {
    empNo: "",
    empId: 0
  };
  //vertical
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  //reason
  reasons: IStatus[] = [];
  selectedReason: IStatus;
  //replacestatus
  replacementStatuses: IStatus[] = [];
  selectedReplacementStatus: IStatus;
  //vacancy
  //location
  vacancies: IVacancyList[] = [];
  selectedVacancy: IVacancyList;
  searchVacancy: ISearchVacancyList =
    {
      locationId: null,
      verticalId: null,
      functionId: null,
      departmentId: null
    };
  newVacancyFunctionName: string;
  newVacancyDepartmentName: string;
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
  //new location
  newLocations: ILocation[] = [];
  newSelectedLocation: ILocation;
  newSelectedLocationCode: string = "";
  newSelectedLocationOffice: string = "";
  newSearchLocation: ISearchLocation =
    {
      locationId: null,
      verticalId: null,
      locationCode: null,
      locationNo: null,
      isActive: true
    };
  newLocationId: number;
  //position
  positions: IPositionVerticalDetail[] = [];
  selectedPosition: IPositionVerticalDetail;
  searchPosition: ISearchPosition = {
    verticalId: null,
    positionId: null,
    isActive: true
  }
  positionId;
  positionName: string;
  //grade
  grades: IPositionGrade[] = [];
  selectedGrade: IPositionGrade;
  searchGrade: ISearchPositionGrade = {
    verticalId: null,
    positionId: null,
    isActive: true
  }
  gradeId: number;
  gradeName: string;
  //function
  oldFunctions: IVerticalFunction[] = [];
  oldSelectedFunction: IVerticalFunction;
  oldSearchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  //oldFunctionId: number;
  //oldFunctionName: string;
  //newfunction
  newFunctions: IVerticalFunction[] = [];
  newSelectedFunction: IVerticalFunction;
  newSearchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  newFunctionId: number;
  newFunctionName: string;
  //department
  oldDepartments: IFunctionDepartment[] = [];
  oldSelectedDepartment: IFunctionDepartment;
  oldSearchDepartment: ISearchDepartment = {
    departmentId: null,
    functionId: null,
    verticalId: null,
    isActive: true
  }
  oldDepartmentId: number;
  oldDdepartmentName: string;
  //new department
  newDepartments: IFunctionDepartment[] = [];
  newSelectedDepartment: IFunctionDepartment;
  newSearchDepartment: ISearchDepartment = {
    departmentId: null,
    functionId: null,
    verticalId: null,
    isActive: true
  }
  newDepartmentId: number;
  newDdepartmentName: string;
  //jobtype
  jobtypes: IJobType[] = [];
  selectedJobType: IJobType;
  searchJobType: ISearchJobType = {
    jobTypeId: null,
    isActive: true
  }
  jobTypeId: number;
  jobTypeName: string;
  //jobdescription
  jobdescriptions: IJobDescription[] = [];
  selectedJobDescription: IJobDescription;
  // searchJobDescription: ISearchJobDescription = {
  //   jobDescriptionId: null,
  //   verticalId: null,
  //   isActive: true
  // }
  searchJobDescriptionResignation: ISearchJobDescriptionResignation = {   // Added this by anif on 06-12-2022 for PROD issue JD not Popilating
    jobDescriptionId: null,
    verticalId: null,
    isActive: true,
    createdBy: null
  }
  jobDescriptionId: number;
  jobDescriptionName;
  iom: string;
  iomNo: string;
  targetDate: string;
  approveCount: number;
  requestCount: number;
  holdCount: number;
  isAutoApproved: boolean = false;
  transferDetailData: ITransferDetailData[] = [];
  transferDetailDataArray: ITransferDetailDataArray[] = [];
  createdBy: number;
  fileToUpload: IFormFiles[] = [];
  remarks: string;
  saveForm: ITransferFormData = {
    VerticalId: null,
    LocationId: null,
    TransferData: null,
    CreatedBy: null,
    UniqueFunctionId: null
  };
  isHoldStatus: boolean = false;
  transferToFunctionName: string;
  transferToDepartmentName: string;
  uniqueFunctionId: any[] = [];
  constructor(
    private notificationService: NotificationService,
    private locationService: LocationService,
    private positionService: PositionService,
    private functionService: FunctionService,
    private departmentService: DepartmentService,
    private jobTypeService: JobtypeService,
    private jobDescriptionService: JobdescriptionService,
    private transferService: TransferService,
    private fb: FormBuilder,
    private persistance: PersistanceService,
    private empService: EmployeeService,
    private commonService: CommonService,
    private SpinnerService: NgxSpinnerService,
    private titleService: Title
  ) {
    this.SpinnerService.show();
    this.StaticVerticalId = 1;
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.searchJobDescriptionResignation.createdBy = this.createdBy;  // Added By anif on 06-12-2022
    this.empName = "";
    this.empId = 0;
    this.designation = "";
    this.oldGradeName = "";
    this.getAllLocation();
    this.getAllFunction();
    this.getAllJobType();
    //this.getAllJobDescription();
    this.getAllPosition();
    this.getAllReplacementStatus();
    this.getAllVerticals();
  }

  ngAfterViewInit() {
    this.loadDatePicker();
  }

  loadDatePicker() {
    var today = new Date();
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      //startDate: today,
      todayHighlight: true
    });
  }

  ngOnInit() {
    this.titleService.setTitle(this.pageTitle);
  }
  //verticals
  getAllVerticals() {
    this.verticals = [];
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.loadSelectPicker();
    this.selectedVertical = this.verticals.filter(x => x.verticalId == 1)[0];
  }

  changeVertical() {
    //this.selectedVertical = this.verticals.filter(x => x.verticalId == newVerticalId)[0];
    console.log(this.selectedVertical);
    this.getNewLocation();
    this.getNewFunction();
  }

  //new locations
  getNewLocation() {
    this.newLocations = [];
    this.newSearchLocation.verticalId = this.selectedVertical.verticalId;
    this.locationService.getAllLocation(this.newSearchLocation).subscribe((result) => {
      if (result) {
        this.newLocations = result;
      }
      else {
        this.newLocations = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  onNewLocationChange() {
    this.newSelectedLocationCode = this.newSelectedLocation.locationCode;
    this.newSelectedLocationOffice = this.newSelectedLocation.locationOffice;
    this.getVacancyList();
  }

  //new functions
  getNewFunction() {
    this.newFunctions = [];
    this.newDepartments = [];
    this.vacancies = [];
    this.newSearchFunction.verticalId = this.selectedVertical.verticalId;
    this.functionService.getAllVerticalFunction(this.newSearchFunction).subscribe((result) => {
      if (result) {
        this.newFunctions = result;
      }
      else {
        this.newFunctions = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  onNewFunctionChange() {
    this.newFunctionId = this.newSelectedFunction.functionId;
    this.getNewDepartment();
  }

  //department
  getNewDepartment() {
    this.newDepartments = [];
    this.vacancies = [];
    this.newSearchDepartment.verticalId = this.selectedVertical.verticalId;
    this.newSearchDepartment.functionId = this.newFunctionId;
    this.departmentService.getAllFunctionDepartment(this.newSearchDepartment).subscribe((result) => {
      if (result) {
        this.newDepartments = result;
      }
      else {
        this.newDepartments = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  changeNewDepartment() {
    //this.newSelectedDepartment = this.newDepartments.filter(x => x.departmentId == newDepartmentId)[0];
    this.getVacancyList();
  }

  //vacancy
  getVacancyList() {
    this.SpinnerService.show();
    this.vacancies = [];
    this.searchVacancy.locationId = this.newSelectedLocation.locationId;
    this.searchVacancy.verticalId = this.selectedVertical.verticalId;
    this.searchVacancy.functionId = 0;//this.newSelectedFunction.functionId;
    this.searchVacancy.departmentId = 0;// this.newSelectedDepartment.departmentId;
    this.transferService.getAllVacancyList(this.searchVacancy).subscribe((result) => {
      if (result) {
        this.vacancies = result;
      }
      else {
        this.vacancies = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }

  getAllReplacementStatus() {
    this.replacementStatuses = [];
    this.commonService.getAllStatus().subscribe((result) => {
      if (result) {
        this.replacementStatuses = result.filter(x => x.statusTypeId == 4);
      }
      else {
        this.replacementStatuses = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }

  //locations
  getAllLocation() {
    this.locations = [];
    this.searchLocation.verticalId = this.StaticVerticalId;
    this.locationService.getAllLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        this.locations = result;
      }
      else {
        this.locations = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  onLocationChange() {
    this.selectedLocationCode = this.selectedLocation.locationCode;
    this.selectedLocationOffice = this.selectedLocation.locationOffice;
  }

  //functions
  getAllFunction() {
    this.oldFunctions = [];
    this.oldSearchFunction.verticalId = this.StaticVerticalId;
    this.functionService.getAllVerticalFunction(this.oldSearchFunction).subscribe((result) => {
      if (result) {
        this.oldFunctions = result;
      }
      else {
        this.oldFunctions = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  onFunctionChange() {
    //this.oldFunctionId = this.oldSelectedFunction.functionId;
    this.getAllDepartment();
  }

  //department
  getAllDepartment() {
    this.oldDepartments = [];
    this.oldSearchDepartment.verticalId = this.StaticVerticalId;
    this.oldSearchDepartment.functionId = this.oldFunctionId;
    this.departmentService.getAllFunctionDepartment(this.oldSearchDepartment).subscribe((result) => {
      if (result) {
        this.oldDepartments = result;
      }
      else {
        this.oldDepartments = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  //position
  getAllPosition() {
    this.positions = [];
    this.searchPosition.verticalId = this.StaticVerticalId;
    this.positionService.getAllVerticalPosition(this.searchPosition).subscribe((result) => {
      if (result) {
        this.positions = result;
      }
      else {
        this.positions = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      //this.loadSelectPicker();
    });
  }

  onPositionChange() {
    this.positionId = this.selectedPosition.positionId;
    this.getAllGrade();
  }

  //grade
  getAllGrade() {
    this.grades = [];
    this.searchGrade.verticalId = this.StaticVerticalId;
    this.searchGrade.positionId = this.positionId;
    this.positionService.getAllPositionGrade(this.searchGrade).subscribe((result) => {
      if (result) {
        this.grades = result;
      }
      else {
        this.grades = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  //job type
  getAllJobType() {
    this.jobtypes = [];
    this.jobTypeService.getAllJobType(this.searchJobType).subscribe((result) => {
      if (result) {
        this.jobtypes = result;
      }
      else {
        this.jobtypes = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      //this.loadSelectPicker();
    });
  }

  onDepartmentChange() {
    this.oldDepartmentId = this.oldSelectedDepartment.departmentId;
    this.getAllJobDescription();
  }

  //job description
  getAllJobDescription() {
    this.jobdescriptions = [];
    this.searchJobDescriptionResignation.verticalId = this.StaticVerticalId;
    this.jobDescriptionService.getAllJobDescription(this.searchJobDescriptionResignation).subscribe((result) => {
      if (result) {
        this.jobdescriptions = result;
        this.jobdescriptions = this.jobdescriptions.filter(x => x.departmentId == this.oldDepartmentId && x.functionId == this.oldFunctionId);
        //console.log(this.jobdescriptions);
      }
      else {
        this.jobdescriptions = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  startRequisition() {
    var flag = 0;
    if (this.selectedLocation == undefined) {
      flag = 1;
    }
    else {

    }
    if (flag == 0) {
      this.transferDetailData = [];
      this.showTable = true;
      this.iomNo = "";
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker({
          size: 4
        });
        jQuery('.selectpicker').selectpicker('refresh');
        this.loadDatePicker();
      });
    }
    else {
      this.showTable = false;
      this.notificationService.showError("Please fill required fields !!", "Error");
    }
  }

  addRow() {
    var msg = "";
    var flag = 0;
    if (this.selectedReplacementStatus == undefined) {
      flag = 1;
      msg = "Please select position status";
    }
    else {
      if (this.selectedReplacementStatus.statusId == 1 || this.selectedReplacementStatus.statusId == 4) {
        if (this.selectedJobDescription == undefined) {
          flag = 1;
          msg = "Please select job description";
        }
        else {

        }
        if (this.tDate.nativeElement.value == undefined || this.tDate.nativeElement.value == "") {
          flag = 1;
          msg = "Please enter target date";
        }
        else {

        }
        if (this.selectedJobType == undefined) {
          flag = 1;
          msg = "Please select job type";
        }
        else {

        }
        if (this.selectedGrade == undefined) {
          flag = 1;
          msg = "Please select replacement grade";
        }
        else {

        }
        if (this.selectedPosition == undefined) {
          flag = 1;
          msg = "Please select replacement position";
        }
        else {

        }

      }
    }
    // if (this.selectedVacancy == undefined) {
    //   flag = 1;
    //   msg = "Please select against vacancy no.";
    // }
    // else {

    // }
    // if (this.oldSelectedFunction == undefined) {
    //   flag = 1;
    // }
    // else {

    // }
    if (this.selectedVertical == undefined) {
      flag = 1;
      msg = "Please select transfer vertical";
    }
    else {

    }
    if (this.newSelectedLocation == undefined) {
      flag = 1;
      msg = "Please select transfer location";
    }
    else {

    }
    if (this.dtDate.nativeElement.value == undefined || this.dtDate.nativeElement.value == "") {
      flag = 1;
      msg = "Please enter transfer date";
    }
    else {

    }
    if (this.oldSelectedDepartment == undefined) {
      flag = 1;
      msg = "Please select department";
    }
    else {

    }
    if (this.empName == "") {
      flag = 1;
      msg = "Please enter employee number";
    }
    else {

    }
    if (flag == 0) {
      if (this.selectedReplacementStatus.statusId == 2 || this.selectedReplacementStatus.statusId == 3) {
        this.transferDetailData.push(
          {
            autoId: this.transferDetailData.length + 1,
            empNo: this.empNo,
            empName: this.empName,
            empId: this.empId,
            designation: this.designation,
            oldGradeName: this.oldGradeName,
            oldFunctionId: this.oldFunctionId, //this.oldSelectedFunction.functionId,
            oldDepartmentId: this.oldSelectedDepartment.departmentId,
            newVerticalId: this.selectedVertical.verticalId,
            newLocationId: this.newSelectedLocation.locationId,
            newFunctionId: this.selectedVacancy==undefined?0:this.selectedVacancy.functionId,
            newDepartmentId: this.selectedVacancy==undefined?0:this.selectedVacancy.departmentId,
            requisitionDetailId: this.selectedVacancy==undefined?0:this.selectedVacancy.requisitionDetailId,
            requisitionNo: this.selectedVacancy==undefined?'':this.selectedVacancy.requisitionNo,
            positionId: 0,
            gradeId: 0,
            jobTypeId: 0,
            jobDescriptionId: 0,
            dot: this.dtDate.nativeElement.value,
            targetDate: "",
            replacementStatusId: this.selectedReplacementStatus.statusId,
            remarks: ""
          });

        // Added by Kuntal on 20-07-2022
        if (this.transferDetailData.length > 0) {
          var functionObj = this.uniqueFunctionId.find(x => x.functionId == this.oldFunctionId);
          if (functionObj == undefined) {
            this.uniqueFunctionId.push({
              functionId: this.oldFunctionId
            })
          }
        }
        // Till this

        this.transferDetailDataArray.push({
          autoId: this.transferDetailDataArray.length + 1,
          empNo: this.empNo,
          empName: this.empName,
          empId: this.empId,
          designation: this.designation,
          oldGradeName: this.oldGradeName,
          oldFunctionId: this.oldFunctionId, //this.oldSelectedFunction.functionId,
          oldFunctionName: this.oldFunctionName, //this.oldSelectedFunction.functionName,
          oldDepartmentId: this.oldSelectedDepartment.departmentId,
          oldDepartmentName: this.oldSelectedDepartment.departmentName,
          newVerticalId: this.selectedVertical.verticalId,
          newVerticalName: this.selectedVertical.verticalName,
          newLocationId: this.newSelectedLocation.locationId,
          newLocationNo: this.newSelectedLocation.locationNo,
          newFunctionId: this.selectedVacancy==undefined?0:this.selectedVacancy.functionId,
          newFunctionName: this.selectedVacancy==undefined?'':this.selectedVacancy.functionName,
          newDepartmentId: this.selectedVacancy==undefined?0:this.selectedVacancy.departmentId,
          newDepartmentName: this.selectedVacancy==undefined?'':this.selectedVacancy.departmentName,
          requisitionNo:this.selectedVacancy==undefined?'': this.selectedVacancy.requisitionNo,
          positionId: 0,
          positionName: "",
          gradeId: 0,
          gradeName: "",
          jobTypeId: 0,
          jobTypeName: "",
          jobDescriptionId: 0,
          jobDescriptionName: "",
          dot: this.dtDate.nativeElement.value,
          targetDate: "",
          replacementStatusId: this.selectedReplacementStatus.statusId,
          replacementStatusName: this.selectedReplacementStatus.statusName,
          remarks: ""
        });
        this.clearForm();
        this.selectedVacancy = null;

      }
      else {
        this.transferDetailData.push(
          {
            autoId: this.transferDetailData.length + 1,
            empNo: this.empNo,
            empName: this.empName,
            empId: this.empId,
            designation: this.designation,
            oldGradeName: this.oldGradeName,
            oldFunctionId: this.oldFunctionId, //this.oldSelectedFunction.functionId,
            oldDepartmentId: this.oldSelectedDepartment.departmentId,
            newVerticalId: this.selectedVertical.verticalId,
            newLocationId: this.newSelectedLocation.locationId,
            newFunctionId: this.selectedVacancy==undefined?0:this.selectedVacancy.functionId,
            newDepartmentId: this.selectedVacancy==undefined?0:this.selectedVacancy.departmentId,
            requisitionDetailId: this.selectedVacancy==undefined?0:this.selectedVacancy.requisitionDetailId,
            requisitionNo: this.selectedVacancy==undefined?'':this.selectedVacancy.requisitionNo,
            positionId: this.selectedPosition.positionId,
            gradeId: this.selectedGrade.gradeId,
            jobTypeId: this.selectedJobType.jobTypeId,
            jobDescriptionId: this.selectedJobDescription.jobDescriptionId,
            dot: this.dtDate.nativeElement.value,
            targetDate: this.tDate.nativeElement.value,
            replacementStatusId: this.selectedReplacementStatus.statusId,
            remarks: this.remarks
          });

        this.transferDetailDataArray.push({
          autoId: this.transferDetailDataArray.length + 1,
          empNo: this.empNo,
          empName: this.empName,
          empId: this.empId,
          designation: this.designation,
          oldGradeName: this.oldGradeName,
          oldFunctionId: this.oldFunctionId, //this.oldSelectedFunction.functionId,
          oldFunctionName: this.oldFunctionName, //this.oldSelectedFunction.functionName,
          oldDepartmentId: this.oldSelectedDepartment.departmentId,
          oldDepartmentName: this.oldSelectedDepartment.departmentName,
          newVerticalId: this.selectedVertical.verticalId,
          newVerticalName: this.selectedVertical.verticalName,
          newLocationId: this.newSelectedLocation.locationId,
          newLocationNo: this.newSelectedLocation.locationNo,
          newFunctionId: this.selectedVacancy==undefined?0:this.selectedVacancy.functionId,
          newFunctionName: this.selectedVacancy==undefined?'':this.selectedVacancy.functionName,
          newDepartmentId: this.selectedVacancy==undefined?0:this.selectedVacancy.departmentId,
          newDepartmentName:this.selectedVacancy==undefined?'': this.selectedVacancy.departmentName,
          requisitionNo: this.selectedVacancy==undefined?'':this.selectedVacancy.requisitionNo,
          positionId: this.selectedPosition.positionId,
          positionName: this.selectedPosition.positionName,
          gradeId: this.selectedGrade.gradeId,
          gradeName: this.selectedGrade.gradeName,
          jobTypeId: this.selectedJobType.jobTypeId,
          jobTypeName: this.selectedJobType.jobTypeName,
          jobDescriptionId: this.selectedJobDescription.jobDescriptionId,
          jobDescriptionName: this.selectedJobDescription.jobDescriptionName,
          dot: this.dtDate.nativeElement.value,
          targetDate: this.tDate.nativeElement.value,
          replacementStatusId: this.selectedReplacementStatus.statusId,
          replacementStatusName: this.selectedReplacementStatus.statusName,
          remarks: this.remarks
        });
        this.clearForm();

        this.selectedVacancy = null;
      }
    }
    else {
      this.notificationService.showError(msg, "Error");
    }
  }

  removeRow(index) {
    if (confirm("Are you sure to delete ")) {
      this.transferDetailDataArray = this.transferDetailDataArray.filter(x => x.autoId != index);
      this.transferDetailData = this.transferDetailData.filter(x => x.autoId != index);
      if (this.transferDetailDataArray.length == 0) {
        this.iomdisable = false;
      }
      else {
        this.iomdisable = true;
      }
    }
  }

  loadSelectPicker() {
    setTimeout(() => {
      jQuery('.selectpicker').selectpicker({
        size: 6
      });
      jQuery('.selectpicker').selectpicker('refresh');
    });
  }

  clearForm() {
    setTimeout(() => {
      jQuery('.selectpicker').not(".no-refresh").val('').trigger('change');
      jQuery('.selectpicker').not(".no-remove").find('option').remove();
      jQuery('.selectpicker').not(".no-refresh").selectpicker('refresh');
      jQuery(".datepicker").parent(".input-group").datepicker('setDate', null);
      this.loadDatePicker();
    });
    this.empNo = "";
    this.empId = 0;
    this.empName = "";
    this.designation = "";
    this.oldGradeName = "";
    this.remarks = "";
    this.oldFunctionName = "";
    this.oldFunctionId = 0;
    this.selectedGrade = undefined;
    this.selectedJobDescription = undefined;
    this.selectedJobType = undefined;
    this.selectedPosition = undefined;
    this.selectedReplacementStatus = undefined;
    this.oldSelectedDepartment = undefined;
    this.selectedVertical = undefined;
    this.newSelectedLocation = undefined;
    this.selectedVacancy = undefined;
    this.transferToFunctionName = "";
    this.transferToDepartmentName = "";
  }


  formSubmit() {
    if (this.transferDetailData.length == 0) {
      this.notificationService.showError("Please add transfer details !!", "Error");
    }
    else {
      this.saveForm.VerticalId = this.StaticVerticalId;
      this.saveForm.LocationId = this.selectedLocation.locationId;
      this.saveForm.CreatedBy = this.createdBy;
      this.saveForm.TransferData = this.transferDetailData;
      this.saveForm.UniqueFunctionId = this.uniqueFunctionId;
      this.SpinnerService.show();
      this.transferService.generateTransfer(this.saveForm).subscribe((result) => {
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.clearEntireForm();
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
        this.notificationService.showError("Something went wrong", "Error")
      });
    }
  }

  clearEntireForm() {
    this.transferDetailData = [];
    this.transferDetailDataArray = [];
    this.iom = "";
    this.iomNo = "";
    setTimeout(() => {
      jQuery('.selectpicker').val('').trigger('change');
      jQuery('.selectpicker').not(".no-refresh").find('option').remove();
      jQuery('.selectpicker').not(".no-refresh").selectpicker('refresh');
      jQuery(".datepicker").parent(".input-group").datepicker('setDate', null);
      this.loadDatePicker();
    });
    this.showTable = false;
    this.getAllLocation();
    this.selectedLocationCode = "";
    this.selectedLocationOffice = "";
    this.iomdisable = false;
    this.selectedLocation = undefined;
    this.transferToFunctionName = "";
    this.transferToDepartmentName = "";
    this.empNo = "";
    this.empId = 0;
    this.empName = "";
    this.designation = "";
    this.oldGradeName = "";
    this.remarks = "";
    this.oldFunctionName = "";
    this.oldFunctionId = 0;
    this.selectedGrade = undefined;
    this.selectedJobDescription = undefined;
    this.selectedJobType = undefined;
    this.selectedPosition = undefined;
    this.selectedReplacementStatus = undefined;
    this.oldSelectedDepartment = undefined;
    this.selectedVertical = undefined;
    this.newSelectedLocation = undefined;
    this.selectedVacancy = undefined;
  }


  changeEmpNo(evt) {
    var checkflag = 0;
    if (evt.target.value != "") {
      this.searchEmployee.empNo = evt.target.value;
      //console.log(this.searchEmployee);
      this.employees = [];
      this.empName = "";
      this.empId = 0;
      this.designation = "";
      this.oldGradeName = "";
      this.oldFunctionId = 0;
      this.oldFunctionName = "";
      if (this.transferDetailData.length == 0) {
        this.empService.getEmployeeReplacementList(this.searchEmployee).subscribe((result) => {
          if (result.length > 0) {
            if (result[0].successFlag == 1) {
              this.employees = result;
              if (this.employees.length > 0) {
                this.empName = this.employees[0].empName;
                this.empId = this.employees[0].empId;
                this.designation = this.employees[0].designation;
                this.oldGradeName = this.employees[0].gradeName;
                this.oldFunctionId = this.employees[0].functionId;
                this.oldFunctionName = this.employees[0].functionName;
                this.onFunctionChange();
              }
            } else {
              this.notificationService.showError(result[0].msg, "Error");
              this.employees = null;
              this.empName = "";
              this.empId = 0;
              this.designation = "";
              this.oldGradeName = "";
              this.oldFunctionId = 0;
              this.oldFunctionName = "";

            }
          }

          // if (result) {
          //   this.employees = result;
          //   if (this.employees.length > 0) {
          //     this.empName = this.employees[0].empName;
          //     this.empId = this.employees[0].empId;
          //     this.designation = this.employees[0].designation;
          //     this.oldGradeName = this.employees[0].gradeName;
          //     this.oldFunctionId = this.employees[0].functionId;
          //     this.oldFunctionName = this.employees[0].functionName;
          //     this.onFunctionChange();
          //   }
          //   else {
          //     this.notificationService.showError("Invalid Employee No.", "Error");
          //     this.empName = "";
          //     this.empId = 0;
          //     this.designation = "";
          //     this.oldGradeName = "";
          //     this.oldFunctionId = 0;
          //     this.oldFunctionName = "";
          //   }
          // }
          // else {
          //   this.notificationService.showError("Invalid Employee No.", "Error");
          //   this.employees = null;
          //   this.empName = "";
          //   this.empId = 0;
          //   this.designation = "";
          //   this.oldGradeName = "";
          //   this.oldFunctionId = 0;
          //   this.oldFunctionName = "";
          // }
        }, error => {
          console.log(error);
        }, () => {
        });
      } else {
        for (var i = 0; i < this.transferDetailData.length; i++) {
          if (this.transferDetailData[i].empNo == evt.target.value) {
            checkflag = 1;
          }
        }
        if (checkflag == 1) {
          this.notificationService.showError("Employee already added", "Error");
          this.employees = null;
          this.empName = "";
          this.empId = 0;
          this.designation = "";
          this.oldGradeName = "";
          this.oldFunctionId = 0;
          this.oldFunctionName = "";
        }
        else {
          this.empService.getEmployeeReplacementList(this.searchEmployee).subscribe((result) => {
            if (result.length > 0) {
              if (result[0].successFlag == 1) {
                this.employees = result;
                if (this.employees.length > 0) {
                  this.empName = this.employees[0].empName;
                  this.empId = this.employees[0].empId;
                  this.designation = this.employees[0].designation;
                  this.oldGradeName = this.employees[0].gradeName;
                  this.oldFunctionId = this.employees[0].functionId;
                  this.oldFunctionName = this.employees[0].functionName;
                  this.onFunctionChange();
                }
              } else {
                this.notificationService.showError(result[0].msg, "Error");
                this.employees = null;
                this.empName = "";
                this.empId = 0;
                this.designation = "";
                this.oldGradeName = "";
                this.oldFunctionId = 0;
                this.oldFunctionName = "";

              }
            }
            // if (result) {
            //   this.employees = result;
            //   if (this.employees.length > 0) {
            //     this.empName = this.employees[0].empName;
            //     this.empId = this.employees[0].empId;
            //     this.designation = this.employees[0].designation;
            //     this.oldGradeName = this.employees[0].gradeName;
            //     this.oldFunctionId = this.employees[0].functionId;
            //     this.oldFunctionName = this.employees[0].functionName;
            //     this.onFunctionChange();
            //   }
            //   else {
            //     this.empName = "";
            //     this.empId = 0;
            //     this.designation = "";
            //     this.oldGradeName = "";
            //     this.oldFunctionId = 0;
            //     this.oldFunctionName = "";
            //     this.notificationService.showError("Invalid Employee No.", "Error");
            //   }
            // }
            // else {
            //   this.empName = "";
            //   this.empId = 0;
            //   this.designation = "";
            //   this.oldGradeName = "";
            //   this.oldFunctionId = 0;
            //   this.oldFunctionName = "";
            //   this.notificationService.showError("Invalid Employee No.", "Error");
            // }
          }, error => {
            console.log(error);
          }, () => {
          });
        }
      }
    }
    else {
      //this.notificationService.showError("Invalid Employee No.", "Error");
      this.empName = "";
      this.empId = 0;
      this.designation = "";
      this.oldGradeName = "";
      this.oldFunctionId = 0;
      this.oldFunctionName = "";
    } //Arghya
  }
  onReplacementChange() {
    if (this.selectedReplacementStatus.statusId == 2 || this.selectedReplacementStatus.statusId == 3) {
      this.isHoldStatus = true;
      jQuery('.hold').prop('disabled', true);
      jQuery('.hold').selectpicker('refresh');
      jQuery(".hold").val('').trigger('change');
      this.targetDate = "";
      this.tDate.nativeElement.value = "";
      this.remarks = "";
    }
    else {
      this.isHoldStatus = false;
      jQuery('.hold').prop('disabled', false);
      jQuery('.hold').selectpicker('refresh');
    }

  }

  onVacancyChange(vacancy: any) {
    this.transferToFunctionName = vacancy.functionName;
    this.transferToDepartmentName = vacancy.departmentName;
  }
}
