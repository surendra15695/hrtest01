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
import { ISearchSuccessionPlanHoldRelease, ISuccessionPlanHoldRelease, ISuccessionPlanHoldReleaseSubmitFormData, ISuccessionPlanDetailData, ISuccessionPlanHoldReleaseData } from '../../../../../interfaces/preselection/successionplan.interface';
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
  selector: 'app-holdreleasesuccessionplant',
  templateUrl: './holdreleasesuccessionplant.component.html',
  styleUrls: ['./holdreleasesuccessionplant.component.css']
})
export class HoldreleasesuccessionplantComponent implements OnInit {
  pageTitle: string = "Succession Plan - Hold Release";
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
  successionPlanDetailData: ISuccessionPlanHoldRelease[] = [];
  searchSuccessionPlanList: ISearchSuccessionPlanHoldRelease = {
    locationId: null,
    verticalId: null,
    createdBy: null
  }
  managementfileToUpload: File;
  createdBy: number;
  fileToUpload: IFormFiles[] = [];
  remarks: string;
  isHoldStatus: boolean = false;
  holdReleaseData: ISuccessionPlanHoldReleaseData[];
  submitData: ISuccessionPlanHoldReleaseSubmitFormData = {
    HoldReleaseSuccessionPlanData: null,
    CreatedBy: null
  }
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
    private successionService: SuccessionService,
    private fb: FormBuilder,
    private persistance: PersistanceService,
    private SpinnerService: NgxSpinnerService,
    private titleService: Title,
    private commonService: CommonService,
  ) {
    this.SpinnerService.show();
    this.StaticVerticalId = 2;
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.getAllLocation();
    this.getAllJobType();
    this.getAllJobDescription();
    this.getAllPosition();
    this.getAllGrade();
    this.getAllReplacementStatus();
  }

  ngOnInit() {
    this.titleService.setTitle(this.pageTitle);
  }

  ngAfterViewInit() {
    this.loadDatePicker();
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

      dothis.successionPlanDetailData[rowid].targetDate = e.target.value;
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
      this.successionPlanDetailData = [];
      this.searchSuccessionPlanList.createdBy = this.createdBy;
      this.searchSuccessionPlanList.verticalId = this.StaticVerticalId;
      this.searchSuccessionPlanList.locationId = this.selectedLocation.locationId;
      this.successionService.getAllSuccessionPlanHoldReleaseList(this.searchSuccessionPlanList).subscribe((result) => {
        if (result) {
          this.successionPlanDetailData = result;
         // console.log(result);
          this.showTable = true;
          this.SpinnerService.hide();
        }
        else {
          this.successionPlanDetailData = [];
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
      this.SpinnerService.hide();
    });
  }

  onPositionChange(selectedPosition, successionPlanDetailId) {
    this.positionId = selectedPosition.positionId;
    var flag = 0;
    for (var i = 0; i < this.successionPlanDetailData.length; i++) {
      if (this.successionPlanDetailData[i].successionPlanDetailId == successionPlanDetailId) {
        this.successionPlanDetailData[i].positionId = this.positionId;
        this.successionPlanDetailData[i].gradeList = this.grades.filter(x => x.positionId == this.positionId);
        setTimeout(() => {
          jQuery('.selectpicker').selectpicker('refresh');
        });
      }
    }

  }

  onGradeChange(selectedGrade, successionPlanDetailId) {
    for (var i = 0; i < this.successionPlanDetailData.length; i++) {
      if (this.successionPlanDetailData[i].successionPlanDetailId == successionPlanDetailId) {
        this.successionPlanDetailData[i].gradeId = selectedGrade.gradeId;
      }
    }
  }

  onJTChange(selectedJobType, successionPlanDetailId) {
    for (var i = 0; i < this.successionPlanDetailData.length; i++) {
      if (this.successionPlanDetailData[i].successionPlanDetailId == successionPlanDetailId) {
        this.successionPlanDetailData[i].jobTypeId = selectedJobType.jobTypeId;
      }
    }
  }

  onJDChange(selectedJobDescription, successionPlanDetailId) {
    for (var i = 0; i < this.successionPlanDetailData.length; i++) {
      if (this.successionPlanDetailData[i].successionPlanDetailId == successionPlanDetailId) {
        this.successionPlanDetailData[i].jobDescriptionId = selectedJobDescription.jobDescriptionId;
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
    for (var i = 0; i < this.successionPlanDetailData.length; i++) {
      if (this.successionPlanDetailData[i].successionPlanDetailId == id) {
        if (evt.target.checked) {
          this.successionPlanDetailData[i].checkStatus = true;
          jQuery('#ddlPosition' + id).prop('disabled', false);
          jQuery('#ddlGrade' + id).prop('disabled', false);
          jQuery('#ddlJT' + id).prop('disabled', false);
          jQuery('#ddlJD' + id).prop('disabled', false);
          jQuery('#ddlReplacementStatus' + id).prop('disabled', false);
          jQuery('#ddlPosition' + id).selectpicker('refresh');
          jQuery('#ddlGrade' + id).selectpicker('refresh');
          jQuery('#ddlJT' + id).selectpicker('refresh');
          jQuery('#ddlJD' + id).selectpicker('refresh');
          jQuery('#ddlReplacementStatus' + id).selectpicker('refresh');
          this.loadDatePicker();
        }
        else {
          this.successionPlanDetailData[i].checkStatus = false;
          jQuery('#ddlPosition' + id).prop('disabled', true);
          jQuery('#ddlGrade' + id).prop('disabled', true);
          jQuery('#ddlJT' + id).prop('disabled', true);
          jQuery('#ddlJD' + id).prop('disabled', true);
          jQuery('#ddlReplacementStatus' + id).prop('disabled', true);
          jQuery('#ddlPosition' + id).selectpicker('refresh');
          jQuery('#ddlGrade' + id).selectpicker('refresh');
          jQuery('#ddlJT' + id).selectpicker('refresh');
          jQuery('#ddlJD' + id).selectpicker('refresh');
          jQuery('#ddlReplacementStatus' + id).selectpicker('refresh');
          jQuery('#ddlPosition' + id).val('').trigger('change');
          jQuery('#ddlGrade' + id).val('').trigger('change');
          jQuery('#ddlJT' + id).val('').trigger('change');
          jQuery('#ddlJD' + id).val('').trigger('change');
          jQuery('#ddlReplacementStatus' + id).val('').trigger('change');
          this.loadDatePicker();
        }
      }
    }
    // Added by Anif on 14-07-2022
    if (this.successionPlanDetailData.length > 0) {
      this.successionPlanDetailData.forEach((element, index) => {
        if (element.successionPlanDetailId == id) {
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
    if (this.successionPlanDetailData.filter(x => x.checkStatus == true).length == 0) {
      flag = 1;
    }
    else {
      //console.log(this.successionPlanDetailData);
      for (var i = 0; i < this.successionPlanDetailData.length; i++) {
        // console.log(this.successionPlanDetailData[i].positionId);
        // console.log(this.successionPlanDetailData[i].gradeId);
        // console.log(this.successionPlanDetailData[i].jobTypeId);
        // console.log(this.successionPlanDetailData[i].jobDescriptionId);
        // console.log(this.successionPlanDetailData[i].targetDate);
        if (
          (this.successionPlanDetailData[i].positionId == 0
            || this.successionPlanDetailData[i].gradeId == 0
            || this.successionPlanDetailData[i].jobTypeId == 0
            || this.successionPlanDetailData[i].jobDescriptionId == 0
            || this.successionPlanDetailData[i].targetDate == ""
            || this.successionPlanDetailData[i].targetDate == null)
          && (this.successionPlanDetailData[i].checkStatus == true)
          && (this.successionPlanDetailData[i].newReplacementStatusId == 1
            || this.successionPlanDetailData[i].newReplacementStatusId == undefined)
        ) {
          flag = 1;
        }
        else {
          if (this.successionPlanDetailData[i].checkStatus == true) {
            if (this.successionPlanDetailData[i].newReplacementStatusId == 1) {
              this.holdReleaseData.push({
                AutoId: this.holdReleaseData.length,
                SuccessionPlanDetailId: this.successionPlanDetailData[i].successionPlanDetailId,
                PositionId: this.successionPlanDetailData[i].positionId,
                GradeId: this.successionPlanDetailData[i].gradeId,
                JobTypeId: this.successionPlanDetailData[i].jobTypeId,
                JobDescriptionId: this.successionPlanDetailData[i].jobDescriptionId,
                Remarks: this.successionPlanDetailData[i].remarks,
                TargetDate: this.successionPlanDetailData[i].targetDate
              })
            }
            else {
              this.holdReleaseData.push({
                AutoId: this.holdReleaseData.length,
                SuccessionPlanDetailId: this.successionPlanDetailData[i].successionPlanDetailId,
                PositionId: 0,
                GradeId: 0,
                JobTypeId: 0,
                JobDescriptionId: 0,
                Remarks: this.successionPlanDetailData[i].remarks,
                TargetDate: ""
              })
            }
          }
        }
      }
    }
    if (flag == 0) {
      this.SpinnerService.show();
      this.submitData.CreatedBy = this.createdBy,
        this.submitData.HoldReleaseSuccessionPlanData = this.holdReleaseData;
      this.successionService.updateholdrelease(this.submitData).subscribe((result) => {
        if (result) {
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
        console.log(error);
        this.SpinnerService.hide();
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

  onReplacementChange(selectedReplacementStatus, successionPlanDetailId) {
   // console.log(selectedReplacementStatus);
    if (selectedReplacementStatus.statusId == 3) {
      this.isHoldStatus = true;
      jQuery('.hold' + successionPlanDetailId).prop('disabled', true);
      jQuery('.hold' + successionPlanDetailId).selectpicker('refresh');
      jQuery(".hold" + successionPlanDetailId).val('').trigger('change');
      this.targetDate = "";
      this.tDate.nativeElement.value = "";
      this.remarks = "";
      for (var i = 0; i < this.successionPlanDetailData.length; i++) {
        if (this.successionPlanDetailData[i].successionPlanDetailId == successionPlanDetailId) {
          this.successionPlanDetailData[i].newReplacementStatusId = 0;
        }
      }
    }
    else {
    //  console.log(selectedReplacementStatus.statusId);
      for (var i = 0; i < this.successionPlanDetailData.length; i++) {
        if (this.successionPlanDetailData[i].successionPlanDetailId == successionPlanDetailId) {
          this.successionPlanDetailData[i].newReplacementStatusId = selectedReplacementStatus.statusId;
        }
      }
      this.isHoldStatus = false;
      jQuery('.hold' + successionPlanDetailId).prop('disabled', false);
      jQuery('.hold' + successionPlanDetailId).selectpicker('refresh');
    }
  //  console.log(this.successionPlanDetailData);
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

}

