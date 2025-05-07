import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ILocation, ISearchLocation } from '../../../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction } from '../../../../../interfaces/common/function.interface';
import { IFunctionDepartment, ISearchDepartment } from '../../../../../interfaces/common/department.interface';
import { IJobType, ISearchJobType } from '../../../../../interfaces/common/jobtype.interface';
import { IJobDescription, ISearchJobDescription } from '../../../../../interfaces/common/jobdescription.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../../interfaces/common/position.interface';
import { IRequisitionDetailData, IRequisitionDetailDataArray } from '../../../../../interfaces/preselection/requisition.interface';
import { LocationService } from '../../../../../services/common/location/location.service';
import { FunctionService } from '../../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../../services/common/department/department.service';
import { PositionService } from '../../../../../services/common/position/position.service';
import { JobtypeService } from '../../../../../services/common/jobtype/jobtype.service';
import { JobdescriptionService } from '../../../../../services/common/jobdescription/jobdescription.service';
import { RequisitionService } from '../../../../../services/preselection/requisition/requisition.service';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { IRequisitionHoldRelease, ISearchRequisitionHoldRelease, IRequisitionHoldReleaseData, holdReleaseSubmitFormData } from '../../../../../interfaces/preselection/requisition.interface';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
//import * as $ from 'jquery';
declare var jQuery: any;

@Component({
  selector: 'app-holdreleasesales',
  templateUrl: './holdreleasesales.component.html',
  styleUrls: ['./holdreleasesales.component.css']
})
export class HoldreleasesalesComponent implements OnInit {
  pageTitle: string = "Requisition - Hold Release";
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
  approveCount: number;
  requestCount: number;
  holdCount: number;
  isAutoApproved: boolean = false;
  requistionDetailData: IRequisitionHoldRelease[] = [];
  requistionDetailDataArray: IRequisitionDetailDataArray[] = [];
  managementfileToUpload: File = null;
  createdBy: number;
  requisitionDetailIds: string;

  searchRequisition: ISearchRequisitionHoldRelease = {
    createdBy: null,
    locationId: null
  }

  submitData: holdReleaseSubmitFormData = {
    HoldReleaseRequisitionData: [],
    CreatedBy: 0
  }

  holdRelaeseFormData: IRequisitionHoldReleaseData[] = [];

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
    this.StaticVerticalId = 3;
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.getAllLocation();
    this.requisitionDetailIds = "";
  }

  ngAfterViewInit() {
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
      console.log(error);
    }, () => {
      this.loadSelectPicker();
      this.SpinnerService.hide();
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


  startRequisition() {
    var flag = 0;
    if (this.selectedLocation == undefined) {
      flag = 1;
    }
    else {

    }
    if (flag == 0) {
      this.requistionDetailData = [];
      this.searchRequisition.createdBy = this.createdBy;
      this.searchRequisition.locationId = this.selectedLocation.locationId;
      this.requisitionService.getRequisitionHoldRelease(this.searchRequisition).subscribe((result) => {
        if (result) {
          this.requistionDetailData = result;
          this.showTable = true;
        }
        else {
          this.requistionDetailData = [];
        }
      }, error => {
        console.log(error);
      }, () => {
        this.loadSelectPicker();
      });
    }
    else {
      this.showTable = false;
      this.notificationService.showError("Please select location !!", "Error");
    }
  }

  changeRequestCount(evt, aCount, rCount, hCount, requisitionDetailId) {
    console.log(evt.target.value);
    console.log(hCount);
    var newrequestCount = 0;
    var newholdCount = 0;
    if (evt.target.value == "") {
      evt.target.value = "0";
      evt.target.focus();
    }
    else if (parseInt(evt.target.value) > parseInt(hCount)) {
      evt.target.value = "0";
      evt.target.focus();
      this.updateRequisitionArrayCount(requisitionDetailId, 0, hCount);
    }
    else {
      newrequestCount = parseInt(evt.target.value);
      newholdCount = parseInt(hCount) - parseInt(newrequestCount.toString());
      this.updateRequisitionArrayCount(requisitionDetailId, newrequestCount, newholdCount);
    }
  }

  updateRequisitionArrayCount(id, rcount, hcount) {
    for (var i = 0; i < this.requistionDetailData.length; i++) {
      if (this.requistionDetailData[i].requisitionDetailId == id) {
        this.requistionDetailData[i].newRequestCount = rcount;
        this.requistionDetailData[i].holdCount = hcount;
      }
    }
  }

  select(evt, id) {
    for (var i = 0; i < this.requistionDetailData.length; i++) {
      if (this.requistionDetailData[i].requisitionDetailId == id) {
        if (evt.target.checked) {
          this.requistionDetailData[i].checkStatus = 1;
          //this.requisitionDetailIds=this.requisitionDetailIds+","+this.requistionDetailData[i].requisitionDetailId;

        }
        else {
          this.requistionDetailData[i].newRequestCount = 0;
          this.requistionDetailData[i].holdCount = this.requistionDetailData[i].prevHoldCount;
          this.requistionDetailData[i].checkStatus = 0;
          this.requistionDetailData[i].remarks = "";
          //var uncheckstring=","+this.requistionDetailData[i].requisitionDetailHistoryId.toString();
          //this.requisitionDetailIds=this.requisitionDetailIds.replace(uncheckstring,",");
          //this.holdRelaeseFormData=this.holdRelaeseFormData.filter(x=>x.RequisitionDetailId!=this.requistionDetailData[i].requisitionDetailId);
        }
      }
    }

  }

  formSubmit() {
    var flag = 0;
    this.holdRelaeseFormData = [];
    if (this.requistionDetailData.filter(x => x.checkStatus == 1).length == 0) {
      flag = 1;
    }
    else {
      for (var i = 0; i < this.requistionDetailData.length; i++) {
        if (this.requistionDetailData[i].newRequestCount == 0 && this.requistionDetailData[i].checkStatus == 1) {
          flag = 1;
        }
        else {
          if (this.requistionDetailData[i].checkStatus == 1) {
            this.holdRelaeseFormData.push({
              AutoId: this.holdRelaeseFormData.length,
              RequisitionDetailId: this.requistionDetailData[i].requisitionDetailId,
              ApproveCount: this.requistionDetailData[i].approveCount,
              RequestCount: this.requistionDetailData[i].newRequestCount,
              HoldCount: this.requistionDetailData[i].holdCount,
              Remarks: this.requistionDetailData[i].remarks,
              IsAutoApproved: this.requistionDetailData[i].holdCount == 0 ? 1 : 0,
            })
          }
        }
      }
    }
    if (flag == 0) {
      this.SpinnerService.show();
      this.submitData.CreatedBy = this.createdBy,
        this.submitData.HoldReleaseRequisitionData = this.holdRelaeseFormData;
      this.requisitionService.updateholdrelease(this.submitData).subscribe((result) => {
        if (result) {
          console.log(result);
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
      }, () => {
        this.SpinnerService.hide();
      });
    }
    else {
      this.notificationService.showError("Please enter valid requested data to proceed", "Error");
    }
  }

  clearEntireForm() {
    this.showTable = false;
    this.selectedLocationCode = "";
    this.selectedLocationOffice = "";
    jQuery('.selectpicker').val('').trigger('change');
    this.selectedLocation = undefined;
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


}
