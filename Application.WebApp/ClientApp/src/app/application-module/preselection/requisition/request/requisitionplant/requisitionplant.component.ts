import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ILocation, ISearchLocation } from '../../../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction, ISearchLocationFunction, ILocationFunction } from '../../../../../interfaces/common/function.interface';
import { IFunctionDepartment, ISearchDepartment } from '../../../../../interfaces/common/department.interface';
import { IJobType, ISearchJobType } from '../../../../../interfaces/common/jobtype.interface';
import { IJobDescription, ISearchJobDescription, ISearchJobDescriptionRequisition } from '../../../../../interfaces/common/jobdescription.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade, ISearchFunctionPosition, IFunctionPositionDetail } from '../../../../../interfaces/common/position.interface';
import { IRequisitionDetailData, IRequisitionDetailDataArray, IIOMFormData } from '../../../../../interfaces/preselection/requisition.interface';
import { LocationService } from '../../../../../services/common/location/location.service';
import { FunctionService } from '../../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../../services/common/department/department.service';
import { PositionService } from '../../../../../services/common/position/position.service';
import { JobtypeService } from '../../../../../services/common/jobtype/jobtype.service';
import { JobdescriptionService } from '../../../../../services/common/jobdescription/jobdescription.service';
import { RequisitionService } from '../../../../../services/preselection/requisition/requisition.service';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
//import * as $ from 'jquery';
declare var jQuery: any;

@Component({
  selector: 'app-requisitionplant',
  templateUrl: './requisitionplant.component.html',
  styleUrls: ['./requisitionplant.component.css']
})
export class RequisitionplantComponent implements OnInit {
  pageTitle: string = "New Requisition";
  StaticVerticalId: number;
  @ViewChild('tDate', { static: false }) tDate: ElementRef;
  @ViewChild('managementFileImport', { static: false }) managementFileImport: ElementRef;
  saveform: FormGroup;
  showTable: boolean = false;
  iomdisable: boolean = false;
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
  //position
  // positions: IPositionVerticalDetail[] = [];
  // selectedPosition: IPositionVerticalDetail;
  // searchPosition: ISearchPosition = {
  //   verticalId: null,
  //   positionId: null,
  //   isActive: true
  // }
  // change as per point sl no 11
  positions: IFunctionPositionDetail[] = [];
  selectedPosition: IFunctionPositionDetail;
  searchPosition: ISearchFunctionPosition = {
    functionId: null,
    positionId: null,
    isActive: 1
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
  // functions: IVerticalFunction[] = [];
  // selectedFunction: IVerticalFunction;
  // searchFunction: ISearchFunction = {
  //   verticalId: null,
  //   functionId: null,
  //   isActive: true
  // }

  // change as per point sl no 11
  functions: ILocationFunction[] = [];
  selectedFunction: ILocationFunction;
  searchFunction: ISearchLocationFunction = {
    locationId: null,
    functionId: null,
    isActive: 1
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
  searchJobDescription: ISearchJobDescription = {
    jobDescriptionId: null,
    verticalId: null,
    isActive: true
  }
  searchJobDescriptionRequisition: ISearchJobDescriptionRequisition = {
    jobDescriptionId: null,
    verticalId: null,
    isActive: true,
    createdBy: null,
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
  // requistionDetailData: IRequisitionDetailData[] = [];   // By anif on 15-04-2023
  requistionDetailData: any[] = [];                        // By anif on 15-04-2023
  //requistionDetailDataArray: IRequisitionDetailDataArray[] = [];  // By anif on 15-04-2023
  requistionDetailDataArray: any[] = [];                            // By anif on 15-04-2023
  managementfileToUpload: File = null;
  createdBy: number;
  checkIOMFormData: IIOMFormData = {
    IOMNo: null
  }

  // Added by anif 0n 11-07-2022 for email send on requisition creation
  uniqueFunctionId: any[] = [];
  // By Anif on 15-04-2023 for dummy requisition
  isDummyChecked: boolean = false;
  invalidFileName: boolean = false;
  constructor(
    private notificationService: NotificationService,
    private locationService: LocationService,
    private positionService: PositionService,
    private functionService: FunctionService,
    private departmentService: DepartmentService,
    private jobTypeService: JobtypeService,
    private jobDescriptionService: JobdescriptionService,
    private requisitionService: RequisitionService,
    private fb: FormBuilder,
    private persistance: PersistanceService,
    private SpinnerService: NgxSpinnerService,
    private titleService: Title
  ) {
    this.SpinnerService.show();
    this.StaticVerticalId = 2;
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.searchJobDescriptionRequisition.createdBy = this.createdBy;
    this.getAllLocation();
    // this.getAllFunction();   // commented as point sl no 11 and add the method on change of location
    this.getAllJobType();
    //this.getAllJobDescription();
    //this.getAllPosition();  //// commented as point sl no 11 and add the method on change of function
    this.iom = "123";
  }

  ngAfterViewInit() {
    this.loadDatePicker();
  }

  loadDatePicker() {
    var today = new Date();
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      startDate: today,
      todayHighlight: true
    });
  }

  ngOnInit() {
    this.titleService.setTitle(this.pageTitle);
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
      this.SpinnerService.hide();
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
      this.loadSelectPicker();
    });
  }

  onLocationChange() {
    this.selectedLocationCode = this.selectedLocation.locationCode;
    this.selectedLocationOffice = this.selectedLocation.locationOffice;
    this.searchFunction.locationId = this.selectedLocation.locationId;
    this.getAllFunction();
  }

  //functions
  getAllFunction() {
    this.functions = [];
    // this.searchFunction.verticalId = this.StaticVerticalId;
    // this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {  // previous
    this.functionService.getAllLocationFunction(this.searchFunction).subscribe((result) => {
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
    this.functionId = this.selectedFunction.functionId;
    this.searchPosition.functionId = this.selectedFunction.functionId;
    this.getAllDepartment();
    this.getAllPosition();
  }

  //department
  getAllDepartment() {
    this.departments = [];
    this.searchDepartment.verticalId = this.StaticVerticalId;
    this.searchDepartment.functionId = this.functionId;
    this.departmentService.getAllFunctionDepartment(this.searchDepartment).subscribe((result) => {
      if (result) {
        this.departments = result;
        // console.log(this.departments);
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
    // this.searchPosition.verticalId = this.StaticVerticalId;
    // this.positionService.getAllVerticalPosition(this.searchPosition).subscribe((result) => {  // previous
    this.positionService.getAllFunctionPosition(this.searchPosition).subscribe((result) => {
      if (result) {
        this.positions = result;
      }
      else {
        this.positions = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
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
      this.SpinnerService.hide();
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
      //this.loadSelectPicker();
    });
  }

  onDepartmentChange() {
    this.departmentId = this.selectedDepartment.departmentId;
    this.getAllJobDescription();
  }

  //job description
  getAllJobDescription() {
    this.jobdescriptions = [];
    this.searchJobDescriptionRequisition.verticalId = this.StaticVerticalId;
    this.jobDescriptionService.getAllJobDescription(this.searchJobDescriptionRequisition).subscribe((result) => {
      if (result) {
        this.jobdescriptions = result;
        this.jobdescriptions = this.jobdescriptions.filter(x => x.departmentId == this.departmentId && x.functionId == this.functionId);
        // console.log(this.jobdescriptions);
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
    if (this.iom == undefined || this.iom == "") {
      flag = 1;
    }
    else {

    }
    if (flag == 0) {
      this.checkIOMFormData.IOMNo = this.iom
      this.requisitionService.checkIOM(this.checkIOMFormData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.requistionDetailData = [];
            this.showTable = true;
            this.iomNo = this.iom;
            setTimeout(() => {
              jQuery('.selectpicker').selectpicker({
                size: 4
              });
              jQuery('.selectpicker').selectpicker('refresh');
              this.loadDatePicker();
            });

          }
        }
        else {
          this.jobdescriptions = [];
        }
      }, error => {
        console.log(error);
      }, () => {
        //this.loadSelectPicker();
      });


    }
    else {
      this.showTable = false;
      this.notificationService.showError("Please select Plant Office !!", "Error");
    }
  }

  changeIOMNo() {
    this.iomNo = this.iom;
  }

  addRow() {
    var msg = "";
    var flag = 0;
    if (this.selectedJobDescription == undefined) {
      flag = 1;
      msg = "Please select Job Description";
    }
    else {

    }
    if (this.tDate.nativeElement.value == undefined || this.tDate.nativeElement.value == "") {
      flag = 1;
      msg = "Please select Target Date";
    }
    else {

    }
    if (this.selectedJobType == undefined) {
      flag = 1;

      msg = "Please select Job Type";
    }
    else {

    }
    if (this.approveCount != undefined && this.requestCount != undefined && parseInt(this.approveCount.toString()) < parseInt(this.requestCount.toString())) {
      flag = 1;
      msg = "Invalid Requested Data";
    }
    else {

    }
    if (this.requestCount == undefined || this.requestCount == 0) {
      flag = 1;
      msg = "Please enter Requested Data";
    }
    else {

    }
    if (this.approveCount == undefined || this.approveCount == 0) {
      flag = 1;
      msg = "Please enter Approved Data";
    }
    else {
    }
    if (this.selectedGrade == undefined) {
      flag = 1;
      msg = "Please select Grade";
    }
    else {

    }
    if (this.selectedPosition == undefined) {
      flag = 1;
      msg = "Please select Position";
    }
    else {

    }
    if (this.selectedDepartment == undefined) {
      flag = 1;
      msg = "Please select Department";
    }
    else {

    }
    if (this.selectedFunction == undefined) {
      flag = 1;
      msg = "Please select Function";
    }
    else {

    }
    if (flag == 0) {
      this.iomdisable = true;
      this.requistionDetailData.push(
        {
          autoId: this.requistionDetailData.length + 1,
          iomNo: this.iomNo,
          functionId: this.selectedFunction.functionId,
          departmentId: this.selectedDepartment.departmentId,
          positionId: this.selectedPosition.positionId,
          gradeId: this.selectedGrade.gradeId,
          jobTypeId: this.selectedJobType.jobTypeId,
          jobDescriptionId: this.selectedJobDescription.jobDescriptionId,
          targetDate: this.tDate.nativeElement.value,
          approveCount: this.approveCount,
          requestCount: this.requestCount,
          holdCount: (this.approveCount - this.requestCount),
          isAutoApproved: (this.approveCount - this.requestCount) > 0 ? false : true,
          isDummy: this.isDummyChecked      // By anif on 15-04-2023
        });

      // Added by anif on 11-07-2022
      if (this.requistionDetailData.length > 0) {
        var functionObj = this.uniqueFunctionId.find(x => x.functionId == this.selectedFunction.functionId);
        if (functionObj == undefined) {
          this.uniqueFunctionId.push({
            functionId: this.selectedFunction.functionId
          })
        }
      }
      // Till this
      this.requistionDetailDataArray.push({
        autoId: this.requistionDetailDataArray.length + 1,
        iomNo: this.iomNo,
        functionId: this.selectedFunction.functionId,
        functionName: this.selectedFunction.functionName,
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
        targetDate: this.tDate.nativeElement.value,
        approveCount: this.approveCount,
        requestCount: this.requestCount,
        holdCount: (this.approveCount - this.requestCount),
        isAutoApproved: (this.approveCount - this.requestCount) > 0 ? false : true,
        isDummy: this.isDummyChecked       // By anif on 15-04-2023
      });
      this.clearForm();
    }
    else {
      this.notificationService.showError(msg, "Error");
    }
  }

  removeRow(index) {
    if (confirm("Are you sure to delete ")) {
      this.requistionDetailDataArray = this.requistionDetailDataArray.filter(x => x.autoId != index);
      this.requistionDetailData = this.requistionDetailData.filter(x => x.autoId != index);
      if (this.requistionDetailDataArray.length == 0) {
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
    this.approveCount = null;
    this.requestCount = null;
    this.holdCount = null;
    this.selectedJobDescription = undefined;
    this.selectedJobType = undefined;
    this.selectedGrade = undefined;
    this.selectedPosition = undefined;
    this.selectedDepartment = undefined;
    this.selectedFunction = undefined;
    this.isDummyChecked = false;         // By anif on 15-04-2023
  }

  formSubmit() {
    if (confirm("Are you sure to submit ? ")) {  //----Piu
      // console.log(this.managementfileToUpload);
      if (this.requistionDetailData.length == 0) {
        this.notificationService.showError("Please add requisition details !!", "Error");
      }
      else if (this.managementfileToUpload == null) {
        this.notificationService.showError("Please attach the management approval document !!", "Error");
      }
      else {
        this.SpinnerService.show();
        const formData = new FormData();
        formData.append("VerticalId", this.StaticVerticalId.toString());
        formData.append("LocationId", this.selectedLocation.locationId.toString());
        formData.append("IOMNo", this.iom.toString());
        formData.append("RequisitionData", JSON.stringify(this.requistionDetailData));
        formData.append("ManagementApprovalFile", this.managementfileToUpload);
        formData.append("CreatedBy", this.createdBy.toString());
        formData.append("UniqueFunctionIds", JSON.stringify(this.uniqueFunctionId));
        // console.log("Requisition data", JSON.stringify(this.requistionDetailData));
        // console.log("Unique Functions Ids", JSON.stringify(this.uniqueFunctionId));
        //this.requisitionService.generateRequisition(formData).subscribe((result) => {         // By Anif on 15-04-2023
        this.requisitionService.generateRequisitionWithDummy(formData).subscribe((result) => {  // By Anif on 15-04-2023
          //  console.log(result);
          if (result.status == 0) {
            this.notificationService.showError(result.msg, "Error");
            this.SpinnerService.hide();
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
  }

  clearEntireForm() {
    this.requistionDetailData = [];
    this.requistionDetailDataArray = [];
    this.iom = "123";
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
    this.managementfileToUpload = null;
  }

  allownumbers(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onBlur(evt) {
    if (evt.target.value == "") {
      evt.target.value = 0;
    }
  }

  onFileChange(files: FileList) {
    this.invalidFileName = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName = true;
      }
    })
    if (files.length === 0) {
      this.managementFileImport.nativeElement.innerText = "Choose file";
      return;
    }
    if (this.invalidFileName) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.managementFileImport.nativeElement.innerText = "Choose file";
      this.managementfileToUpload = null;
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      this.managementFileImport.nativeElement.innerText = "Choose file";
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("File should be less than 2MB!", "Error");
      this.managementFileImport.nativeElement.innerText = "Choose file";
      this.managementfileToUpload = null;
    } else {
      this.managementFileImport.nativeElement.innerText = files[0].name;
      this.managementfileToUpload = files.item(0);
      //  console.log(this.managementfileToUpload);
    }
  }


}
