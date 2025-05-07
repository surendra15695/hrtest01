import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IStatus, IFormFiles } from '../../../../../interfaces/common/common.interface';
import { ILocation, ISearchLocation } from '../../../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction } from '../../../../../interfaces/common/function.interface';
import { IFunctionDepartment, ISearchDepartment } from '../../../../../interfaces/common/department.interface';
import { IJobType, ISearchJobType } from '../../../../../interfaces/common/jobtype.interface';
import { IJobDescription, ISearchJobDescription } from '../../../../../interfaces/common/jobdescription.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade, IVerticalPositionGrade } from '../../../../../interfaces/common/position.interface';
import { ISearchResignationHoldRelease, IResignationHoldRelease, IResignationHoldReleaseSubmitFormData, IResignationDetailData, IResignationHoldReleaseData } from '../../../../../interfaces/preselection/resignation.interface';
import { IEmployeeReplacementList, ISearchEmployeeReplacement } from '../../../../../interfaces/employee/employee.interface';
import { CommonService } from '../../../../../services/common/common/common.service';
import { EmployeeService } from '../../../../../services/employee/employee/employee.service';
import { LocationService } from '../../../../../services/common/location/location.service';
import { FunctionService } from '../../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../../services/common/department/department.service';
import { PositionService } from '../../../../../services/common/position/position.service';
import { JobtypeService } from '../../../../../services/common/jobtype/jobtype.service';
import { JobdescriptionService } from '../../../../../services/common/jobdescription/jobdescription.service';
import { ResignationService } from '../../../../../services/preselection/resignation/resignation.service';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
//import * as $ from 'jquery';
declare var jQuery: any;

@Component({
  selector: 'app-holdreleaseresignationcorporate',
  templateUrl: './holdreleaseresignationcorporate.component.html',
  styleUrls: ['./holdreleaseresignationcorporate.component.css']
})
export class HoldreleaseresignationcorporateComponent implements OnInit {
  pageTitle: string = "Resignation - Hold Release";
  StaticVerticalId: number;
  @ViewChild('tDate', { static: false }) tDate: ElementRef;
  saveform: FormGroup;
  showTable: boolean = false;
  iomdisable: boolean = false;
  empNo: string;
  empId: number;
  empName: string;
  designation: string;
  oldGradeName: string;
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
  grades: IVerticalPositionGrade[] = [];
  selectedGrade: IVerticalPositionGrade;
  searchGrade: ISearchPositionGrade = {
    verticalId: null,
    positionId: null,
    isActive: true
  }
  gradeId: number;
  gradeName: string;
  //function
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
  jobDescriptionId: number;
  jobDescriptionName;
  iom: string;
  iomNo: string;
  targetDate: string;
  isAutoApproved: boolean = false;
  resignationDetailData: IResignationHoldRelease[] = [];
  searchResignationList: ISearchResignationHoldRelease = {
    locationId: null,
    verticalId: null,
    createdBy: null
  }
  managementfileToUpload: File;
  createdBy: number;
  fileToUpload: IFormFiles[] = [];
  remarks: string;
  isHoldStatus: boolean = false;
  holdReleaseData: IResignationHoldReleaseData[];
  submitData: IResignationHoldReleaseSubmitFormData = {
    HoldReleaseResignationData: null,
    CreatedBy: null
  }
  //reason
  reasons: IStatus[] = [];
  selectedReason: IStatus;
  //replacestatus
  replacementStatuses: IStatus[] = [];
  selectedReplacementStatus: IStatus;
  constructor(
    private notificationService: NotificationService,
    private locationService: LocationService,
    private positionService: PositionService,
    private functionService: FunctionService,
    private departmentService: DepartmentService,
    private jobTypeService: JobtypeService,
    private jobDescriptionService: JobdescriptionService,
    private resignationService: ResignationService,
    private fb: FormBuilder,
    private persistance: PersistanceService,
    private SpinnerService: NgxSpinnerService,
    private titleService: Title,
    private commonService: CommonService,
  ) {
    this.SpinnerService.show();
    this.StaticVerticalId = 1;
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.getAllLocation();
    this.getAllJobType();
    //this.getAllJobDescription();
    this.getAllPosition();
    this.getAllGrade();
    this.getAllReasons();
    this.getAllReplacementStatus();
  }

  ngOnInit() {
    this.titleService.setTitle(this.pageTitle);
  }

  ngAfterViewInit() {
    this.loadDatePicker();
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
        this.replacementStatuses = result.filter(x => x.statusTypeId == 4 && x.statusId != 2 && x.statusId != 4);
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

  loadDatePicker() {
    var today = new Date();
    var dothis = this;
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      //startDate: today,
      todayHighlight: true
    }).on("change", function (e) {
      var selecteddate = e.target.value;
      var birthDate = new Date(selecteddate.substring(6, 10) + "/" + selecteddate.substring(3, 5) + "/" + selecteddate.substring(0, 2));
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      var datepickerid = jQuery(e.target).attr("id");
      var rowid = parseInt(datepickerid.replace("datepicker", ""));

      dothis.resignationDetailData[rowid].targetDate = e.target.value;
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
      this.SpinnerService.show();
      this.resignationDetailData = [];
      this.searchResignationList.createdBy = this.createdBy;
      this.searchResignationList.verticalId = this.StaticVerticalId;
      this.searchResignationList.locationId = this.selectedLocation.locationId;
      this.resignationService.getAllResignationHoldReleaseList(this.searchResignationList).subscribe((result) => {
        if (result) {
          this.resignationDetailData = result;
          // console.log(result);
          this.showTable = true;
          this.SpinnerService.hide();
        }
        else {
          this.resignationDetailData = [];
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
    else {
      this.showTable = false;
      this.notificationService.showError("Please select location !!", "Error");
    }
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

  loadSelectPicker() {
    setTimeout(() => {
      jQuery('.selectpicker').selectpicker({
        size: 6
      });
      jQuery('.selectpicker').selectpicker('refresh');
    });
  }

  onLocationChange() {
    this.selectedLocationCode = this.selectedLocation.locationCode;
    this.selectedLocationOffice = this.selectedLocation.locationOffice;
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

  onPositionChange(selectedPosition, resignationDetailId) {
    this.positionId = selectedPosition.positionId;
    var flag = 0;
    for (var i = 0; i < this.resignationDetailData.length; i++) {
      if (this.resignationDetailData[i].resignationDetailId == resignationDetailId) {
        this.resignationDetailData[i].positionId = this.positionId;
        this.resignationDetailData[i].gradeList = this.grades.filter(x => x.positionId == this.positionId);
        setTimeout(() => {
          jQuery('.selectpicker').selectpicker('refresh');
        });
      }
    }

  }

  onGradeChange(selectedGrade, resignationDetailId) {
    for (var i = 0; i < this.resignationDetailData.length; i++) {
      if (this.resignationDetailData[i].resignationDetailId == resignationDetailId) {
        this.resignationDetailData[i].gradeId = selectedGrade.gradeId;
      }
    }
  }

  onJTChange(selectedJobType, resignationDetailId) {
    for (var i = 0; i < this.resignationDetailData.length; i++) {
      if (this.resignationDetailData[i].resignationDetailId == resignationDetailId) {
        this.resignationDetailData[i].jobTypeId = selectedJobType.jobTypeId;
      }
    }
  }

  onJDChange(selectedJobDescription, resignationDetailId) {
    for (var i = 0; i < this.resignationDetailData.length; i++) {
      if (this.resignationDetailData[i].resignationDetailId == resignationDetailId) {
        this.resignationDetailData[i].jobDescriptionId = selectedJobDescription.jobDescriptionId;
      }
    }
  }

  //grade
  getAllGrade() {
    this.grades = [];
    this.searchGrade.verticalId = this.StaticVerticalId;
    this.positionService.getAllVerticalPositionGrade(this.searchGrade).subscribe((result) => {
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
      this.SpinnerService.hide();
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

  //job description
  getAllJobDescription() {
    this.jobdescriptions = [];
    this.searchJobDescription.verticalId = this.StaticVerticalId;
    this.jobDescriptionService.getAllJobDescription(this.searchJobDescription).subscribe((result) => {
      if (result) {
        this.jobdescriptions = result;
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

  select(evt, id, departmentId, functionId) {   // departmentId and functionId added by anif on 14-07-2022
    for (var i = 0; i < this.resignationDetailData.length; i++) {
      if (this.resignationDetailData[i].resignationDetailId == id) {
        if (evt.target.checked) {
          this.resignationDetailData[i].checkStatus = true;
          jQuery('#ddlPosition' + id).prop('disabled', false);
          jQuery('#ddlGrade' + id).prop('disabled', false);
          jQuery('#ddlJT' + id).prop('disabled', false);
          jQuery('#ddlJD' + id).prop('disabled', false);
          jQuery('#ddlReplacementStatus' + id).prop('disabled', false);
          //jQuery('#ddlReason' + id).prop('disabled', false);
          jQuery('#ddlPosition' + id).selectpicker('refresh');
          jQuery('#ddlGrade' + id).selectpicker('refresh');
          jQuery('#ddlJT' + id).selectpicker('refresh');
          jQuery('#ddlJD' + id).selectpicker('refresh');
          jQuery('#ddlReplacementStatus' + id).selectpicker('refresh');
          //jQuery('#ddlReason' + id).selectpicker('refresh');
          this.loadDatePicker();
        }
        else {
          this.resignationDetailData[i].checkStatus = false;
          jQuery('#ddlPosition' + id).prop('disabled', true);
          jQuery('#ddlGrade' + id).prop('disabled', true);
          jQuery('#ddlJT' + id).prop('disabled', true);
          jQuery('#ddlJD' + id).prop('disabled', true);
          jQuery('#ddlReplacementStatus' + id).prop('disabled', true);
          //jQuery('#ddlReason' + id).prop('disabled', true);
          jQuery('#ddlPosition' + id).selectpicker('refresh');
          jQuery('#ddlGrade' + id).selectpicker('refresh');
          jQuery('#ddlJT' + id).selectpicker('refresh');
          jQuery('#ddlJD' + id).selectpicker('refresh');
          jQuery('#ddlReplacementStatus' + id).selectpicker('refresh');
          //jQuery('#ddlReason' + id).selectpicker('refresh');
          jQuery('#ddlPosition' + id).val('').trigger('change');
          jQuery('#ddlGrade' + id).val('').trigger('change');
          jQuery('#ddlJT' + id).val('').trigger('change');
          jQuery('#ddlJD' + id).val('').trigger('change');
          jQuery('#ddlReplacementStatus' + id).val('').trigger('change');
          //jQuery('#ddlReason' + id).val('').trigger('change');
          this.loadDatePicker();
        }
      }
    }


    // Added by Anif on 14-07-2022
    if (this.resignationDetailData.length > 0) {
      this.resignationDetailData.forEach((element, index) => {
        if (element.resignationDetailId == id) {
          element.jobdescriptionList = this.jobdescriptions.filter(x => x.departmentId == departmentId && x.functionId == functionId);
          setTimeout(() => {
            jQuery('.selectpicker').selectpicker('refresh');
          });
        }
      })
    }
  }

  formSubmit() {
    var flag = 0;
    this.holdReleaseData = [];
    if (this.resignationDetailData.filter(x => x.checkStatus == true).length == 0) {
      flag = 1;
    }
    else {
      // console.log(this.resignationDetailData);
      for (var i = 0; i < this.resignationDetailData.length; i++) {
        if (
          (this.resignationDetailData[i].positionId == 0
            || this.resignationDetailData[i].gradeId == 0
            || this.resignationDetailData[i].jobTypeId == 0
            || this.resignationDetailData[i].jobDescriptionId == 0
            || this.resignationDetailData[i].targetDate == ""
            || this.resignationDetailData[i].targetDate == null)
          && (this.resignationDetailData[i].checkStatus == true)
          && (this.resignationDetailData[i].newReplacementStatusId == 1
            || this.resignationDetailData[i].newReplacementStatusId == undefined)
        ) {
          flag = 1;
        }
        else {
          if (this.resignationDetailData[i].checkStatus == true) {
            if (this.resignationDetailData[i].newReplacementStatusId == 1) {
              this.holdReleaseData.push({
                AutoId: this.holdReleaseData.length,
                ResignationDetailId: this.resignationDetailData[i].resignationDetailId,
                PositionId: this.resignationDetailData[i].positionId,
                GradeId: this.resignationDetailData[i].gradeId,
                JobTypeId: this.resignationDetailData[i].jobTypeId,
                JobDescriptionId: this.resignationDetailData[i].jobDescriptionId,
                Remarks: this.resignationDetailData[i].remarks,
                TargetDate: this.resignationDetailData[i].targetDate
              })
            }
            else {
              this.holdReleaseData.push({
                AutoId: this.holdReleaseData.length,
                ResignationDetailId: this.resignationDetailData[i].resignationDetailId,
                PositionId: 0,
                GradeId: 0,
                JobTypeId: 0,
                JobDescriptionId: 0,
                Remarks: this.resignationDetailData[i].remarks,
                TargetDate: this.resignationDetailData[i].targetDate
              })
            }
          }
        }
      }
    }
    // console.log(flag);
    // console.log(this.holdReleaseData);
    if (flag == 0) {
      this.SpinnerService.show();
      this.submitData.CreatedBy = this.createdBy,
        this.submitData.HoldReleaseResignationData = this.holdReleaseData;
      this.resignationService.updateholdrelease(this.submitData).subscribe((result) => {
        if (result) {
          // console.log(result);
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.startRequisition();
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
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
      this.notificationService.showError("Please enter valid data to proceed", "Error");
    }
  }

  clearEntireForm() {
    this.showTable = false;
    this.selectedLocationCode = "";
    this.selectedLocationOffice = "";
    jQuery('.selectpicker').val('').trigger('change');
    this.selectedLocation = undefined;
  }

  onReplacementChange(selectedReplacementStatus, resignationDetailId) {
    // console.log(selectedReplacementStatus);
    if (selectedReplacementStatus.statusId == 3) {
      this.isHoldStatus = true;
      jQuery('.hold' + resignationDetailId).prop('disabled', true);
      jQuery('.hold' + resignationDetailId).selectpicker('refresh');
      jQuery(".hold" + resignationDetailId).val('').trigger('change');
      this.targetDate = "";
      this.tDate.nativeElement.value = "";
      this.remarks = "";
      for (var i = 0; i < this.resignationDetailData.length; i++) {
        if (this.resignationDetailData[i].resignationDetailId == resignationDetailId) {
          this.resignationDetailData[i].newReplacementStatusId = 0;
        }
      }
    }
    else {
      // console.log(selectedReplacementStatus.statusId);
      for (var i = 0; i < this.resignationDetailData.length; i++) {
        if (this.resignationDetailData[i].resignationDetailId == resignationDetailId) {
          this.resignationDetailData[i].newReplacementStatusId = selectedReplacementStatus.statusId;
        }
      }
      this.isHoldStatus = false;
      jQuery('.hold' + resignationDetailId).prop('disabled', false);
      jQuery('.hold' + resignationDetailId).selectpicker('refresh');
    }
    //console.log(this.resignationDetailData);
  }

}
