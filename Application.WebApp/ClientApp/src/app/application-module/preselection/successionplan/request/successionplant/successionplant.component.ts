import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IStatus, IFormFiles } from '../../../../../interfaces/common/common.interface';
import { ILocation, ISearchLocation } from '../../../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction } from '../../../../../interfaces/common/function.interface';
import { IFunctionDepartment, ISearchDepartment } from '../../../../../interfaces/common/department.interface';
import { IJobType, ISearchJobType } from '../../../../../interfaces/common/jobtype.interface';
import { IJobDescription, ISearchJobDescription, ISearchJobDescriptionResignation } from '../../../../../interfaces/common/jobdescription.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../../interfaces/common/position.interface';
import { ISuccessionPlanDetailData, ISuccessionPlanDetailDataArray, ISuccessPlanFormData } from '../../../../../interfaces/preselection/successionplan.interface';
import { IEmployeeReplacementList, ISearchEmployeeReplacement } from '../../../../../interfaces/employee/employee.interface';
import { CommonService } from '../../../../../services/common/common/common.service';
import { EmployeeService } from '../../../../../services/employee/employee/employee.service';
import { LocationService } from '../../../../../services/common/location/location.service';
import { FunctionService } from '../../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../../services/common/department/department.service';
import { PositionService } from '../../../../../services/common/position/position.service';
import { JobtypeService } from '../../../../../services/common/jobtype/jobtype.service';
import { JobdescriptionService } from '../../../../../services/common/jobdescription/jobdescription.service';
import { SuccessionService } from '../../../../../services/preselection/succession/succession.service';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
//import * as $ from 'jquery';
declare var jQuery: any;

@Component({
  selector: 'app-successionplant',
  templateUrl: './successionplant.component.html',
  styleUrls: ['./successionplant.component.css']
})
export class SuccessionplantComponent implements OnInit {
  pageTitle: string = "Succession Plan - New Request";
  StaticVerticalId: number;
  @ViewChild('tDate', { static: false }) tDate: ElementRef;
  @ViewChild('lDate', { static: false }) lDate: ElementRef;
  @ViewChild('dDate', { static: false }) dDate: ElementRef;
  @ViewChild('managementFileImport', { static: false }) managementFileImport: ElementRef;
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
  //reason
  reasons: IStatus[] = [];
  selectedReason: IStatus;
  //replacestatus
  replacementStatuses: IStatus[] = [];
  selectedReplacementStatus: IStatus;
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
  successionDetailData: ISuccessionPlanDetailData[] = [];
  successionDetailDataArray: ISuccessionPlanDetailDataArray[] = [];
  managementfileToUpload: File;
  createdBy: number;
  fileToUpload: IFormFiles[] = [];
  remarks: string;
  saveForm: ISuccessPlanFormData = {
    VerticalId: null,
    LocationId: null,
    SuccessionPlanData: null,
    CreatedBy: null,
    UniqueFunctionId: null
  };
  isHoldStatus: boolean = false;
  uniqueFunctionId: any[] = [];
  constructor(
    private notificationService: NotificationService,
    private locationService: LocationService,
    private positionService: PositionService,
    private functionService: FunctionService,
    private departmentService: DepartmentService,
    private jobTypeService: JobtypeService,
    private jobDescriptionService: JobdescriptionService,
    private successionService: SuccessionService,
    private fb: FormBuilder,
    private persistance: PersistanceService,
    private empService: EmployeeService,
    private commonService: CommonService,
    private SpinnerService: NgxSpinnerService,
    private titleService: Title
  ) {
    this.SpinnerService.show();
    this.StaticVerticalId = 2;
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
    this.getAllReasons();
    this.getAllReplacementStatus();
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

  getAllReasons() {
    this.reasons = [];
    this.commonService.getAllStatus().subscribe((result) => {
      if (result) {
        this.reasons = result.filter(x => x.statusTypeId == 5);
      }
      else {
        this.reasons = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
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
    this.functions = [];
    this.searchFunction.verticalId = this.StaticVerticalId;
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;
      }
      else {
        this.functions = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  onFunctionChange() {
    //this.functionId = this.selectedFunction.functionId;
    this.getAllDepartment();
  }

  //department
  getAllDepartment() {
    this.departments = [];
    this.searchDepartment.verticalId = this.StaticVerticalId;
    this.searchDepartment.functionId = this.oldFunctionId; //this.functionId;
    this.departmentService.getAllFunctionDepartment(this.searchDepartment).subscribe((result) => {
      if (result) {
        this.departments = result;
        console.log(this.departments);
      }
      else {
        this.departments = [];
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

  onDepartmentChange(){
    this.departmentId = this.selectedDepartment.departmentId;
    this.getAllJobDescription();
  }

  //job description
  getAllJobDescription() {
    this.jobdescriptions = [];
    this.searchJobDescriptionResignation.verticalId = this.StaticVerticalId;
    this.jobDescriptionService.getAllJobDescription(this.searchJobDescriptionResignation).subscribe((result) => {
      if (result) {
        this.jobdescriptions = result;
        this.jobdescriptions=this.jobdescriptions.filter(x=>x.departmentId==this.departmentId && x.functionId==this.oldFunctionId);
        console.log(this.jobdescriptions);
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
      this.successionDetailData = [];
      this.showTable = true;
      this.iomNo = "";
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker({
          size: 4
        });
        jQuery('.selectpicker').selectpicker('refresh');
        this.loadDatePicker();
        jQuery('.custom-file input').change(function (e) {
          var files = [];
          for (var i = 0; i < jQuery(this)[0].files.length; i++) {
            files.push(jQuery(this)[0].files[i].name);
          }
          jQuery(this).next('.custom-file-label').html(files.join(', '));
        });

      });
    }
    else {
      this.showTable = false;
      this.notificationService.showError("Please fill required fields !!", "Error");
    }
  }

  changeIOMNo() {
    this.iomNo = this.iom;
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
    if (this.dDate.nativeElement.value == undefined || this.dDate.nativeElement.value == "") {
      flag = 1;
      msg = "Please enter dor";
    }
    else {

    }
    if (this.selectedDepartment == undefined) {
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
    // if (this.selectedFunction == undefined) {
    //   flag = 1;
    // }
    // else {

    // }
    if (flag == 0) {
      if (this.selectedReplacementStatus.statusId == 2 || this.selectedReplacementStatus.statusId == 3) {
        this.successionDetailData.push(
          {
            autoId: this.successionDetailData.length + 1,
            empNo: this.empNo,
            empName: this.empName,
            empId: this.empId,
            designation: this.designation,
            oldGradeName: this.oldGradeName,
            functionId: this.oldFunctionId, //this.selectedFunction.functionId,
            departmentId: this.selectedDepartment.departmentId,
            positionId: 0,
            gradeId: 0,
            jobTypeId: 0,
            jobDescriptionId: 0,
            dor: this.dDate.nativeElement.value,
            targetDate: "",
            replacementStatusId: this.selectedReplacementStatus.statusId,
            remarks: ""
          });

        // Added by Kuntal on 20-07-2022
        if (this.successionDetailData.length > 0) {
          var functionObj = this.uniqueFunctionId.find(x => x.functionId == this.oldFunctionId);
          if (functionObj == undefined) {
            this.uniqueFunctionId.push({
              functionId: this.oldFunctionId
            })
          }
        }
      // Till this

        this.successionDetailDataArray.push({
          autoId: this.successionDetailDataArray.length + 1,
          empNo: this.empNo,
          empName: this.empName,
          empId: this.empId,
          designation: this.designation,
          oldGradeName: this.oldGradeName,
          functionId: this.oldFunctionId, //this.selectedFunction.functionId,
          functionName: this.oldFunctionName, //this.selectedFunction.functionName,
          departmentId: this.selectedDepartment.departmentId,
          departmentName: this.selectedDepartment.departmentName,
          positionId: 0,
          positionName: "",
          gradeId: 0,
          gradeName: "",
          jobTypeId: 0,
          jobTypeName: "",
          jobDescriptionId: 0,
          jobDescriptionName: "",
          dor: this.dDate.nativeElement.value,
          targetDate: "",
          replacementStatusId: this.selectedReplacementStatus.statusId,
          replacementStatusName: this.selectedReplacementStatus.statusName,
          remarks: ""
        });
        this.fileToUpload.push({ file: this.managementfileToUpload });
        this.clearForm();
      }
      else {
        this.successionDetailData.push(
          {
            autoId: this.successionDetailData.length + 1,
            empNo: this.empNo,
            empName: this.empName,
            empId: this.empId,
            designation: this.designation,
            oldGradeName: this.oldGradeName,
            functionId: this.oldFunctionId, //this.selectedFunction.functionId,
            departmentId: this.selectedDepartment.departmentId,
            positionId: this.selectedPosition.positionId,
            gradeId: this.selectedGrade.gradeId,
            jobTypeId: this.selectedJobType.jobTypeId,
            jobDescriptionId: this.selectedJobDescription.jobDescriptionId,
            dor: this.dDate.nativeElement.value,
            targetDate: this.tDate.nativeElement.value,
            replacementStatusId: this.selectedReplacementStatus.statusId,
            remarks: this.remarks
          });

        this.successionDetailDataArray.push({
          autoId: this.successionDetailDataArray.length + 1,
          empNo: this.empNo,
          empName: this.empName,
          empId: this.empId,
          designation: this.designation,
          oldGradeName: this.oldGradeName,
          functionId: this.oldFunctionId, //this.selectedFunction.functionId,
          functionName: this.oldFunctionName, //this.selectedFunction.functionName,
          departmentId: this.selectedDepartment.departmentId,
          departmentName: this.selectedDepartment.departmentName,
          positionId: this.selectedPosition.positionId,
          positionName: this.selectedPosition.positionName,
          gradeId: this.selectedGrade.gradeId,
          gradeName: this.selectedGrade.gradeName,
          jobTypeId: this.selectedJobType.jobTypeId,
          jobTypeName: this.selectedJobType.jobTypeName,
          jobDescriptionId: this.selectedJobDescription.jobDescriptionId,
          jobDescriptionName: this.selectedJobDescription.jobDescriptionName,
          dor: this.dDate.nativeElement.value,
          targetDate: this.tDate.nativeElement.value,
          replacementStatusId: this.selectedReplacementStatus.statusId,
          replacementStatusName: this.selectedReplacementStatus.statusName,
          remarks: this.remarks
        });
        this.fileToUpload.push({ file: this.managementfileToUpload });
        this.clearForm();
      }
    }
    else {
      this.notificationService.showError(msg, "Error");
    }
  }

  removeRow(index) {
    if (confirm("Are you sure to delete ")) {
      this.successionDetailDataArray = this.successionDetailDataArray.filter(x => x.autoId != index);
      this.successionDetailData = this.successionDetailData.filter(x => x.autoId != index);
      if (this.successionDetailDataArray.length == 0) {
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
    this.oldFunctionName = "";
    this.oldFunctionId = 0;
    this.remarks = "";
    this.selectedGrade = undefined;
    this.selectedJobDescription = undefined;
    this.selectedJobType = undefined;
    this.selectedPosition = undefined;
    this.selectedReplacementStatus = undefined;
    this.selectedDepartment = undefined;
  }

  onFileChange(files: FileList) {
    this.managementFileImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.managementfileToUpload = files.item(0);
  }

  formSubmit() {
    console.log(this.managementfileToUpload);
    if (this.successionDetailData.length == 0) {
      this.notificationService.showError("Please add succession plan details !!", "Error");
    }
    else {
      this.SpinnerService.show();
      this.saveForm.VerticalId = this.StaticVerticalId;
      this.saveForm.LocationId = this.selectedLocation.locationId;
      this.saveForm.CreatedBy = this.createdBy;
      this.saveForm.SuccessionPlanData = this.successionDetailData;
      this.saveForm.UniqueFunctionId = this.uniqueFunctionId;
      this.successionService.generateSuccessionPlan(this.saveForm).subscribe((result) => {
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
        this.SpinnerService.hide();
        this.notificationService.showError("Something went wrong", "Error")
      });
    }
  }

  clearEntireForm() {
    this.successionDetailData = [];
    this.successionDetailDataArray = [];
    this.iom = "";
    this.iomNo = "";
    setTimeout(() => {
      jQuery('.selectpicker').val('').trigger('change');
      jQuery('.selectpicker').not(".no-refresh").find('option').remove();
      jQuery('.selectpicker').not(".no-refresh").selectpicker('refresh');
      jQuery(".datepicker").parent(".input-group").datepicker('setDate', null);
      this.loadDatePicker();
    });
    this.approveCount = null;
    this.requestCount = null;
    this.holdCount = null;
    this.showTable = false;
    this.getAllLocation();
    this.selectedLocationCode = "";
    this.selectedLocationOffice = "";
    this.iomdisable = false;
    this.selectedLocation = undefined;
    this.selectedGrade = undefined;
    this.selectedJobDescription = undefined;
    this.selectedJobType = undefined;
    this.selectedPosition = undefined;
    this.selectedReplacementStatus = undefined;
    this.selectedDepartment = undefined;
    this.empNo = "";
    this.empId = 0;
    this.empName = "";
    this.designation = "";
    this.oldGradeName = "";
    this.oldFunctionName = "";
    this.oldFunctionId = 0;
    this.remarks = "";
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
      if (this.successionDetailData.length == 0) {
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
        for (var i = 0; i < this.successionDetailData.length; i++) {
          if (this.successionDetailData[i].empNo == evt.target.value) {
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
}
