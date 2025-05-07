import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../../interfaces/common/vertical.interface';
import { IStatus } from '../../../../../interfaces/common/common.interface';
import { ILocation, ISearchLocation } from '../../../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction } from '../../../../../interfaces/common/function.interface';
import { IFunctionDepartment, ISearchDepartment } from '../../../../../interfaces/common/department.interface';
import { IJobType, ISearchJobType } from '../../../../../interfaces/common/jobtype.interface';
import { IJobDescription, ISearchJobDescription } from '../../../../../interfaces/common/jobdescription.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../../interfaces/common/position.interface';
import {
  ISearchResignationList, IResignationList, IResignationRequisition, IMergeResignationFormData,
  IResignationClarification, ISearchResignationClarification
} from '../../../../../interfaces/preselection/resignation.interface';
import { LocationService } from '../../../../../services/common/location/location.service';
import { CommonService } from '../../../../../services/common/common/common.service';
import { FunctionService } from '../../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../../services/common/department/department.service';
import { PositionService } from '../../../../../services/common/position/position.service';
import { JobtypeService } from '../../../../../services/common/jobtype/jobtype.service';
import { JobdescriptionService } from '../../../../../services/common/jobdescription/jobdescription.service';
import { ResignationService } from '../../../../../services/preselection/resignation/resignation.service';
import { ShareddataService } from '../../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { environment } from '../../../../../../environments/environment';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
declare var jQuery: any;
declare var html2pdf: any;

@Component({
  selector: 'app-requesterresignationlist',
  templateUrl: './requesterresignationlist.component.html',
  styleUrls: ['./requesterresignationlist.component.css']
})
export class RequesterresignationlistComponent implements OnInit {
  pageTitle: string = "Resignation List";
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  @ViewChild('closeModal', { static: false }) cModal: ElementRef;
  @ViewChild('tarDate', { static: false }) tarDate: ElementRef;
  @ViewChild('lDate', { static: false }) lDate: ElementRef;
  @ViewChild('dDate', { static: false }) dDate: ElementRef;
  @ViewChild('managementFileImport', { static: false }) managementFileImport: ElementRef;
  private apppath = environment.apppath;
  searchform: FormGroup;
  saveform: FormGroup;
  //vertical
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  verticalIds: string;
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
  //Piu
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
  //status
  statuses: IStatus[] = [];
  selectedStatus: IStatus;
  //requisition list
  resignationLists: IResignationList[] = [];

  reasons: IStatus[] = [];
  selectedReason: IStatus;
  //replacestatus
  replacementStatuses: IStatus[] = [];
  selectedReplacementStatus: IStatus;

  createdBy: number;

  resignationRequisition: IResignationRequisition[];

  mergeResignationFormdata: IMergeResignationFormData = {
    ResignationData: null,
    CreatedBy: null
  }

  searchResignationClarification: ISearchResignationClarification = {
    resignationDetailId: 0
  }

  resignationClarificationList: IResignationClarification[] = [];

  isMerge: boolean = false;

  //update
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
  selectedGrade: number;
  searchGrade: ISearchPositionGrade = {
    verticalId: null,
    positionId: null,
    isActive: true
  }
  gradeId: number;
  gradeName: string;
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
  managementfileToUpload: File;
  remarks: string;
  StaticVerticalId: number;
  oldFunctionId: number;
  clarificationRemarks: string;
  dor: string;
  lwd: string;
  targetDate: string;
  resignationDetailId: number;

  selectedDepartmentId: number;
  selectedPositionId: number;
  selectedGradeId: number;
  selectedJobTypeId: number;
  selectedJobDescriptionId: number;
  invalidFileName:boolean=false;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private commonService: CommonService,
    private resignationService: ResignationService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
    private departmentService: DepartmentService,
    private jobTypeService: JobtypeService,
    private jobDescriptionService: JobdescriptionService,
    private positionService: PositionService,
    private functionService: FunctionService,
  ) {
    this.SpinnerService.show();
    localStorage.removeItem('pagename');
    localStorage.removeItem('id');
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.createForm();
    this.createAcknowledgementForm();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllFunction();  // Removed by Anif on 08-07-2022 as vertical filter added and function will come on change vertical
    this.getAllStatus();
    this.getAllReasons();
    this.getAllReplacementStatus();
    this.resignationRequisition = [];
  }

  ngOnInit() {
    this.titleService.setTitle(this.pageTitle);
    this.loadDatePicker();
    this.loadPDatePicker();
    this.loadDataTable();
    this.loadTooltipMenu();
    //this.getAllFunction()
    setTimeout(() => {
      this.fromSubmit();
    });
  }


  createAcknowledgementForm() {
    this.saveform = this.fb.group({
      resignationDetailId: [0],
      acknowledgementStatusId: ['', [Validators.required]],
      remarks: [''],//, [Validators.required]],
      createdBy: [0]
    })
  }

  createForm() {
    this.searchform = this.fb.group({
      //verticalId: [0],  // previouse
      verticalId: null,    // Added by Anif on 08-07-2022
      locationId: [0],
      functionId: [0],
      fromDate: [''],
      toDate: [''],
      resignationProcessStatus: [0],
      reasonId: [0],
      replacementStatusId: [0],
      createdBy: [this.createdBy]
    });
  }

  //verticals
  getAllVerticals() {
    this.verticals = [];
    // this.verticalIds = "1,2,3";
    var splitvertical = this.verticalIds.split(",");
    var allvertical = "";    
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

    // this.searchform.patchValue(          // Removed by Anif on 08-07-2022 as vertical filter added and bydefault set all    
    //   {
    //     verticalId: this.selectedVertical.verticalId,
    //   });    
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
    this.getAllLocation();
    this.getAllFunction();
  }
  //functions(Piu)
  getAllFunction() {
    this.functions = [];
    //this.searchFunction.verticalId = 2; // Previous 
    this.searchFunction.verticalId = this.selectedVertical.verticalId; // Added by Anif on 08-07-2022 
    // console.log("Vertical id for function", this.selectedVertical.verticalId);
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
      this.loadSelectPicker();
    });
  }

  //status
  getAllStatus() {
    this.statuses = [];
    this.commonService.getAllStatus().subscribe((result) => {
      if (result) {
        this.statuses = result.filter(x => x.statusTypeId == 6);
        this.statuses.splice(0, 0, {
          statusId: 0,
          statusName: "All",
          statusTypeId: 2,
          statusTypeName: "RequisitionProcessStatus",
          statusIcon: ""
        })
      }
      else {
        this.statuses = [];
        this.statuses.splice(0, 0, {
          statusId: 0,
          statusName: "All",
          statusTypeId: 2,
          statusTypeName: "RequisitionProcessStatus",
          statusIcon: ""
        })
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

  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
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
        "fixedColumns": {
          "left": 3
        }
      });
    });
  }

  loadTooltipMenu() {
    setTimeout(() => {
      var body_ = jQuery('body');
      var dropdownMenu,
        table_responsive = jQuery('.table-responsive');
      table_responsive.on('show.bs.dropdown', function (e) {
        dropdownMenu = jQuery(e.target).find('.dropdown-menu');
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
    });
  }

  // fromSubmit() {            // By Arnab on 05-08-2023
  //   this.searchform.patchValue(
  //     {
  //       fromDate: this.fDate.nativeElement.value,
  //       toDate: this.tDate.nativeElement.value
  //     });
  //   console.log(this.searchform.value);
  //   this.SpinnerService.show();
  //   this.resignationService.getAllResignationList(this.searchform.value).subscribe((result) => {
  //     if (result) {
  //       this.resignationLists = result;
  //       this.loadDataTable();
  //       this.SpinnerService.hide();
  //     }
  //     else {
  //       this.resignationLists = [];
  //       this.SpinnerService.hide();
  //     }
  //   }, error => {
  //     console.log(error);
  //     this.SpinnerService.hide();
  //   }, () => {
  //     this.loadSelectPicker();
  //     this.SpinnerService.hide();
  //   });
  // }

  fromSubmit() {            // By Arnab on 05-08-2023
    var flag = 0;
    this.searchform.patchValue(
      {
        fromDate: this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value
      }
    );
    if(this.fDate.nativeElement.value.length > 0 && this.tDate.nativeElement.value.length > 0){
      const [fDay, fMonth, fYear] = this.fDate.nativeElement.value.split("/");
      const fDate = new Date(fYear, fMonth - 1, fDay);
      const [tDay, tMonth, tYear] = this.tDate.nativeElement.value.split("/");
      const tDate = new Date(tYear, tMonth - 1, tDay);
      if(fDate > tDate){
        this.notificationService.showError("To Date Cann't be less than from From Date !! Please provide actual date", "Error");
        flag = 1;
      }
    }
    //console.log(this.searchform.value);
    if(flag == 0){
      this.SpinnerService.show();
      this.resignationService.getAllResignationList(this.searchform.value).subscribe((result) => {
        if (result) {
          //console.log("Resignation List", result);
          this.resignationLists = result;
          this.loadDataTable();
          this.SpinnerService.hide();
        }
        else {
          this.resignationLists = [];
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

  gotoAllocateToRM(id) {
    this.persistance.set('pagename', "rorequisitionlist");
    this.persistance.set('paramid', id);
    this._route.navigate(['/app/rorequisitionlist/allocatetorm']);
  }

  viewIOM(pathval) {
    window.open(this.apppath + "" + pathval, "blank");
  }

  reset() {
    this.searchform.reset();
    this.searchform.patchValue({
      verticalId: null,
      locationId: 0,
      resignationProcessStatus: 0,
      reasonId: 0,
      replacementStatusId: 0,
      createdBy: this.createdBy
    })
    this.loadSelectPicker();
    this.resignationLists = [];
    this.loadDataTable();
    this.fromSubmit();
  }

  getAllReasons() {
    this.reasons = [];
    this.commonService.getAllStatus().subscribe((result) => {
      if (result) {
        this.reasons = result.filter(x => x.statusTypeId == 5);
        this.reasons.splice(0, 0, {
          statusId: 0,
          statusName: "All",
          statusTypeId: 5,
          statusTypeName: "ResaonStatus",
          statusIcon: ""
        })
      }
      else {
        this.reasons = [];
        this.reasons.splice(0, 0, {
          statusId: 0,
          statusName: "All",
          statusTypeId: 5,
          statusTypeName: "ResaonStatus",
          statusIcon: ""
        })
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
        this.replacementStatuses.splice(0, 0, {
          statusId: 0,
          statusName: "All",
          statusTypeId: 4,
          statusTypeName: "ReplacementStatus",
          statusIcon: ""
        })
      }
      else {
        this.replacementStatuses = [];
        this.statuses.splice(0, 0, {
          statusId: 0,
          statusName: "All",
          statusTypeId: 4,
          statusTypeName: "ReplacementStatus",
          statusIcon: ""
        })
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }

  getAllResignationClarificationList(resignationDetailid) {
    this.SpinnerService.show();
    this.resignationClarificationList = [];
    this.searchResignationClarification.resignationDetailId = resignationDetailid
    this.resignationService.getAllResignationClarification(this.searchResignationClarification).subscribe((result) => {
      if (result) {
        this.resignationClarificationList = result;
      }
      else {
        this.resignationClarificationList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }

  openModalPopup(resignationDetailId, functionId, verticalId,
    departmentId, dor, lwd, targetDate, positionId, gradeId, jobTypeId, jobDescriptionId
  ) {
    this.resignationDetailId = resignationDetailId;
    this.oldFunctionId = functionId;
    this.StaticVerticalId = verticalId;
    this.getAllDepartment(departmentId);
    this.getAllJobType(jobTypeId);
    this.getAllJobDescription(jobDescriptionId);
    this.getAllPosition(positionId, gradeId);
    this.dor = dor;
    this.lwd = lwd;
    this.targetDate = targetDate;
    this.loadPSelectPicker();
    jQuery("#datepickerdor").datepicker('setDate', dor);
    jQuery("#datepickerlwd").datepicker('setDate', lwd);
    jQuery("#datepickertargetdate").datepicker('setDate', targetDate);

    this.getAllResignationClarificationList(resignationDetailId);
  }

  sendClarification() {
    this.SpinnerService.show();
    this.resignationService.sendClarification(this.saveform.value).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.fromSubmit();
          this.cModal.nativeElement.click();
          this.saveform.reset();
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

  //update
  //department
  getAllDepartment(selectedval) {
    this.departments = [];
    this.searchDepartment.verticalId = this.StaticVerticalId;
    this.searchDepartment.functionId = this.oldFunctionId; //this.functionId;
    this.departmentService.getAllFunctionDepartment(this.searchDepartment).subscribe((result) => {
      if (result) {
        this.departments = result;
        this.selectedDepartment = this.departments.filter(x => x.departmentId == selectedval)[0];
        this.selectedDepartmentId = this.selectedDepartment.departmentId;
      }
      else {
        this.departments = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadPSelectPicker();
    });
  }

  //position
  getAllPosition(selectedval, selectedgradeval) {
    this.positions = [];
    this.searchPosition.verticalId = this.StaticVerticalId;
    this.positionService.getAllVerticalPosition(this.searchPosition).subscribe((result) => {
      if (result) {
        this.positions = result;
        this.selectedPosition = this.positions.filter(x => x.positionId == selectedval)[0];
        this.positionId = this.selectedPosition.positionId;
        this.selectedPositionId = this.selectedPosition.positionId;
        this.getAllGradeSelected(selectedgradeval);
      }
      else {
        this.positions = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadPSelectPicker();
    });
  }

  onPositionChange(evt) {
    this.positionId = this.selectedPosition.positionId;
    this.getAllGrade(evt);
  }

  //grade
  getAllGrade(positionid) {
    this.grades = [];
    this.searchGrade.verticalId = this.StaticVerticalId;
    this.searchGrade.positionId = positionid;
    this.positionService.getAllPositionGrade(this.searchGrade).subscribe((result) => {
      if (result) {
        this.grades = result;
        this.selectedGrade = undefined;
      }
      else {
        this.grades = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadPSelectPicker();
    });
  }

  getAllGradeSelected(selectedval) {
    this.grades = [];
    this.searchGrade.verticalId = this.StaticVerticalId;
    this.searchGrade.positionId = this.positionId;
    this.positionService.getAllPositionGrade(this.searchGrade).subscribe((result) => {
      if (result) {
        this.grades = result;
        this.selectedGrade = selectedval;
        setTimeout(() => {
          jQuery('select[name="selectedGrade"]').val(selectedval);
          jQuery('.ddlgradeId').selectpicker('refresh');
        });
      }
      else {
        this.grades = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  //job type
  getAllJobType(selectedval) {
    this.jobtypes = [];
    this.jobTypeService.getAllJobType(this.searchJobType).subscribe((result) => {
      if (result) {
        this.jobtypes = result;
        this.selectedJobType = this.jobtypes.filter(x => x.jobTypeId == selectedval)[0];
        this.selectedJobTypeId = this.selectedJobType.jobTypeId;
      }
      else {
        this.jobtypes = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadPSelectPicker();
    });
  }

  //job description
  getAllJobDescription(selectedval) {
    this.jobdescriptions = [];
    this.searchJobDescription.verticalId = this.StaticVerticalId;
    this.jobDescriptionService.getAllJobDescription(this.searchJobDescription).subscribe((result) => {
      if (result) {
        this.jobdescriptions = result;
        this.selectedJobDescription = this.jobdescriptions.filter(x => x.jobDescriptionId == selectedval)[0];
        this.selectedJobDescriptionId = this.selectedJobDescription.jobDescriptionId;
      }
      else {
        this.jobdescriptions = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadPSelectPicker();
    });
  }

  loadPDatePicker() {
    jQuery(".pdatepicker").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });

  }

  loadPSelectPicker() {
    setTimeout(() => {
      jQuery('.pselectpicker').selectpicker({
        size: 6
      });
      jQuery('.pselectpicker').selectpicker('refresh');
    });
  }

  acknowledge() {
    this.SpinnerService.show();
    this.resignationService.acknowledgeResignation(this.saveform.value).subscribe((result) => {
      if (result) {
        // console.log(result);
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.fromSubmit();
          this.cModal.nativeElement.click();
          this.saveform.reset();
          this.saveform.patchValue({ acknowledgementStatusId: '' });
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

  openActionModal(id) {
    this.getAllResignationClarificationList(id);
    jQuery(".custom-menu").hide();
    this.saveform.patchValue({
      resignationDetailId: id,
      createdBy: this.createdBy,
      clarificationRemarks: ''
    })
    jQuery('.ddlacknowledge').val('').trigger('change');
    jQuery(".ddlacknowledge").selectpicker("refresh");
  }

  UpdateResignation() {
    var flag = 0;
    var msg = "";
    if (this.clarificationRemarks == undefined || this.clarificationRemarks == "") {
      flag = 1;
      msg = "Please enter comments";
    }
    if (this.tarDate.nativeElement.value == "") {
      flag = 1;
      msg = "Please enter target date";
    }
    if (this.selectedGrade == undefined) {
      flag = 1;
      msg = "Please enter grade";
    }
    if (this.dDate.nativeElement.value == "") {
      flag = 1;
      msg = "Please enter DOR";
    }
    if (this.lDate.nativeElement.value == "") {
      flag = 1;
      msg = "Please enter LWD";
    }
    if (this.managementfileToUpload == undefined) {
      flag = 1;
      msg = "Please upload Sep. Int";
    }
    if (flag == 0) {
      const formData = new FormData();
      var files: File[];
      formData.append("ResignationDetailId", this.resignationDetailId.toString());
      // formData.append("DepartmentId", this.selectedDepartment.departmentId.toString());
      // formData.append("PositionId", this.selectedPosition.positionId.toString());
      // formData.append("GradeId", this.selectedGrade.toString());
      // formData.append("JobTypeId", this.selectedJobType.jobTypeId.toString());
      // formData.append("JobDescriptionId", this.selectedJobDescription.jobDescriptionId.toString());
      formData.append("DepartmentId", this.selectedDepartmentId.toString());
      formData.append("PositionId", this.selectedPositionId.toString());
      formData.append("GradeId", this.selectedGrade.toString());
      formData.append("JobTypeId", this.selectedJobTypeId.toString());
      formData.append("JobDescriptionId", this.selectedJobDescriptionId.toString());
      formData.append("TargetDate", this.tarDate.nativeElement.value);
      formData.append("DOR", this.dDate.nativeElement.value);
      formData.append("LWD", this.lDate.nativeElement.value);
      formData.append("Remarks", this.remarks);
      formData.append("ManagementApprovalFile", this.managementfileToUpload);
      formData.append("ClarificationRemarks", this.clarificationRemarks);

      formData.append("CreatedBy", this.createdBy.toString());
      this.resignationService.updateResignation(formData).subscribe((result) => {        
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.managementfileToUpload = null;
          this.managementFileImport.nativeElement.innerText = "Choose file";
          this.notificationService.showSuccess(result.msg, "Success");
          this.cModal.nativeElement.click();
          this.fromSubmit();
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
        this.notificationService.showError("Something went wrong", "Error")
      });
    }
    else {
      this.notificationService.showError(msg, "Error");
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
    }
  }
  DownloadJD(docData, filename) {
    var htmlstring = docData;
    var dom = document.createElement('div');
    dom.innerHTML = htmlstring;
    html2pdf(dom, {
      margin: 10,
      filename: filename + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      //html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      html2canvas: { scale: 3, y: 0, scrollY: 0 },
      //jsPDF: { format: 'A4' },
      //jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      jsPDF: { format: 'A4' },
    });
  }
  openFile(blobName: string): void {
    let regex = /\.net(.*)/;
    let match = blobName.match(regex);
    let extractedString = match ? match[1] : '';
    let filename = extractedString.split('/')[2];
    let containername = extractedString.split('/')[1];
    this.locationService.getTestfile(filename,containername).subscribe(response => {
      let blob:Blob=response.body as  Blob;
      const url = window.URL.createObjectURL(blob);

      // Open the file in a new tab
      window.open(url);

    }, error => {
      console.error('Failed to download file:', error);
    });
  }
}
