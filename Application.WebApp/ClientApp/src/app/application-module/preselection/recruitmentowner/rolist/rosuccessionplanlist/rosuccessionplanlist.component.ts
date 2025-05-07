import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IDeleteBeforeRequisitionFormData, IDeleteBeforeSuccessionPlanFormData } from '../../../../../interfaces/preselection/requisition.interface';
import { RequisitionService } from '../../../../../services/preselection/requisition/requisition.service';
import { IVertical } from '../../../../../interfaces/common/vertical.interface';
import { IStatus } from '../../../../../interfaces/common/common.interface';
import { ILocation, ISearchLocation } from '../../../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction } from '../../../../../interfaces/common/function.interface';
import { IFunctionDepartment, ISearchDepartment } from '../../../../../interfaces/common/department.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../../interfaces/common/position.interface';
import { ISearchSuccessionPlanList, ISuccessionPlanList, ISuccessionPlanRequisition, IMergeSuccessionPlanFormData } from '../../../../../interfaces/preselection/successionplan.interface';
import { LocationService } from '../../../../../services/common/location/location.service';
import { CommonService } from '../../../../../services/common/common/common.service';
import { FunctionService } from '../../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../../services/common/department/department.service';
import { PositionService } from '../../../../../services/common/position/position.service';
import { SuccessionService } from '../../../../../services/preselection/succession/succession.service';
import { ShareddataService } from '../../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { environment } from '../../../../../../environments/environment';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
declare var jQuery: any;
declare var html2pdf: any;

@Component({
  selector: 'app-rosuccessionplanlist',
  templateUrl: './rosuccessionplanlist.component.html',
  styleUrls: ['./rosuccessionplanlist.component.css']
})
export class RosuccessionplanlistComponent implements OnInit {
  pageTitle: string = "Succession Plan List";
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  @ViewChild('closeModal', { static: false }) cModal: ElementRef;
  private apppath = environment.apppath;
  searchform: FormGroup;
  saveform: FormGroup;
  //vertical
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
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
  successionPlanLists: ISuccessionPlanList[] = [];

  reasons: IStatus[] = [];
  selectedReason: IStatus;
  //replacestatus
  replacementStatuses: IStatus[] = [];
  selectedReplacementStatus: IStatus;

  createdBy: number;

  successionPlanRequisition: ISuccessionPlanRequisition[];

  mergeSuccessionPlanFormdata: IMergeSuccessionPlanFormData = {
    SuccessionPlanData: null,
    CreatedBy: null
  }

  isMerge: boolean = false;
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

  deleteRequisitionFormData: IDeleteBeforeRequisitionFormData = {
    DataId: null,
    TypeId: null,
    CreatedBy: null
  }
  deleteSuccessionPlanFormData: IDeleteBeforeSuccessionPlanFormData = {
    SuccessionPlanDetailId: null
  }
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private commonService: CommonService,
    private successionPlanService: SuccessionService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
    private functionService: FunctionService,
    private requisitionService: RequisitionService
  ) {
    this.SpinnerService.show();
    localStorage.removeItem('pagename');
    localStorage.removeItem('id');
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.createForm();
    this.createAcknowledgementForm();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllStatus();
    this.getAllReasons();
    this.getAllReplacementStatus();
    this.successionPlanRequisition = [];
  }

  ngOnInit() {
    this.titleService.setTitle(this.pageTitle);
    this.loadDatePicker();
    //this.loadDataTable();
    this.loadTooltipMenu();
    setTimeout(() => {
      this.fromSubmit();
    }, 100);
  }

  createAcknowledgementForm() {
    this.saveform = this.fb.group({
      successionPlanDetailId: [0],
      acknowledgementStatusId: [4, [Validators.required]],
      remarks: ['', [Validators.required]],
      createdBy: [0]
    })
  }

  createForm() {
    this.searchform = this.fb.group({
      requisitionNo: [''],
      verticalId: [''],
      functionId: [0],
      locationId: [0],
      fromDate: [''],
      toDate: [''],
      iOMNo: [''],
      successionPlanProcessStatus: [0],
      replacementStatusId: [0]
    });
  }

  getAllVerticals() {
    // this.verticals = [];
    // var splitvertical=this.verticalIds.split(",");
    // var allvertical="";
    // console.log(splitvertical);
    // for(var i=0;i<splitvertical.length;i++){
    //   if(splitvertical[i]!="0"){
    //     if(splitvertical[i]=="1"){
    //     this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    //     }
    //     else if(splitvertical[i]=="2"){
    //       this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    //     }
    //     else if(splitvertical[i]=="3"){
    //       this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    //     }
    //     if(allvertical==""){
    //       allvertical=splitvertical[i];
    //     }
    //     else{
    //       allvertical=allvertical+","+splitvertical[i];
    //     }
    //   }

    // }
    // this.selectedVertical = this.verticals[0];
    this.verticals = [];
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    //this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    this.loadSelectPicker();
    this.selectedVertical = this.verticals.filter(x => x.verticalId == 0)[0];
    this.setDefaultVertical();
    this.getAllFunction();
  }

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
      this.loadSelectPicker();
    });
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
        "order": [],
        "bLengthChange": false,
        "fixedColumns": {
          "left": 5
          }
      });
    });
  } //added by arg

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
 
  // fromSubmit() {                                // By Arnab on 05-08-2023
  //   this.searchform.patchValue(
  //     {
  //       verticalId: Number(this.selectedVertical.verticalId),
  //       fromDate: this.fDate.nativeElement.value,
  //       toDate: this.tDate.nativeElement.value
  //     });
  //   this.SpinnerService.show();
  //   //console.log(this.searchform.value);
  //   this.successionPlanService.getAllSuccessionPlanList(this.searchform.value).subscribe((result) => {
  //     if (result) {
  //       //console.log(result);
  //       this.successionPlanLists = result;
  //       this.loadDataTable();
  //       this.SpinnerService.hide();
  //     }
  //     else {
  //       this.successionPlanLists = [];
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

  fromSubmit() {                        // By Arnab on 05-08-2023
    var flag = 0;
    this.searchform.patchValue(
      {
        verticalId: Number(this.selectedVertical.verticalId),
        fromDate: this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value
      });
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
    if(flag == 0){
      this.SpinnerService.show();
      //console.log(this.searchform.value);
      this.successionPlanService.getAllSuccessionPlanList(this.searchform.value).subscribe((result) => {
        if (result) {
          this.successionPlanLists = result;
          this.loadDataTable();
          this.SpinnerService.hide();
        }
        else {
          this.successionPlanLists = [];
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
    this.fromSubmit();
    this.searchform.patchValue({
      verticalId: 0,
      locationId: 0,
      requisitionApprovalStatus: 0
    })
    this.loadSelectPicker();
    this.successionPlanLists = [];
    this.loadDataTable();
  }

  getAllReasons() {
    this.reasons = [];
    this.commonService.getAllStatus().subscribe((result) => {
      if (result) {
        this.reasons = result.filter(x => x.statusTypeId == 5);
        this.replacementStatuses.splice(0, 0, {
          statusId: 0,
          statusName: "All",
          statusTypeId: 5,
          statusTypeName: "ResaonStatus",
          statusIcon: ""
        })
      }
      else {
        this.reasons = [];
        this.replacementStatuses.splice(0, 0, {
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

  select(evt, id) {
    for (var i = 0; i < this.successionPlanLists.length; i++) {
      if (this.successionPlanLists[i].successionPlanDetailId == id) {
        if (evt.target.checked) {
          if (this.successionPlanRequisition.length == 0) {
            this.successionPlanRequisition.push({
              SuccessionPlanDetailId: this.successionPlanLists[i].successionPlanDetailId,
              VerticalId: this.successionPlanLists[i].verticalId,
              LocationId: this.successionPlanLists[i].locationId,
              FunctionId: this.successionPlanLists[i].functionId,
              DepartmentId: this.successionPlanLists[i].departmentId,
              PositionId: this.successionPlanLists[i].positionId,
              GradeId: this.successionPlanLists[i].gradeId,
              JobTypeId: this.successionPlanLists[i].jobTypeId,
              JobDescriptionId: this.successionPlanLists[i].jobDescriptionId,
              TargetDate: this.successionPlanLists[i].targetDate,
            })
          }
          else {
            if (this.successionPlanLists[i].verticalId == this.successionPlanRequisition[0].VerticalId &&
              this.successionPlanLists[i].locationId == this.successionPlanRequisition[0].LocationId &&
              this.successionPlanLists[i].functionId == this.successionPlanRequisition[0].FunctionId &&
              this.successionPlanLists[i].departmentId == this.successionPlanRequisition[0].DepartmentId &&
              this.successionPlanLists[i].positionId == this.successionPlanRequisition[0].PositionId &&
              this.successionPlanLists[i].gradeId == this.successionPlanRequisition[0].GradeId &&
              this.successionPlanLists[i].jobTypeId == this.successionPlanRequisition[0].JobTypeId &&
              this.successionPlanLists[i].jobDescriptionId == this.successionPlanRequisition[0].JobDescriptionId //&&
              //this.successionPlanLists[i].targetDate == this.successionPlanRequisition[0].TargetDate
            ) {
              this.successionPlanRequisition.push({
                SuccessionPlanDetailId: this.successionPlanLists[i].successionPlanDetailId,
                VerticalId: this.successionPlanLists[i].verticalId,
                LocationId: this.successionPlanLists[i].locationId,
                FunctionId: this.successionPlanLists[i].functionId,
                DepartmentId: this.successionPlanLists[i].departmentId,
                PositionId: this.successionPlanLists[i].positionId,
                GradeId: this.successionPlanLists[i].gradeId,
                JobTypeId: this.successionPlanLists[i].jobTypeId,
                JobDescriptionId: this.successionPlanLists[i].jobDescriptionId,
                TargetDate: this.successionPlanLists[i].targetDate,
              })
            }
            else {
              this.notificationService.showError("Please select same resignation criteria", "Error");
              evt.target.checked = false;
            }
          }
        }
        else {
          this.successionPlanRequisition = this.successionPlanRequisition.filter(x => x.SuccessionPlanDetailId != this.successionPlanRequisition[i].SuccessionPlanDetailId);
        }
      }
    }
    if (this.successionPlanRequisition.length > 0) {
      this.isMerge = true;
    }
    else {
      this.isMerge = false;
    }
  }

  CreateRequisition(id) {
    jQuery(".custom-menu").hide();
    this.successionPlanRequisition = [];
    for (var i = 0; i < this.successionPlanLists.length; i++) {
      if (this.successionPlanLists[i].successionPlanDetailId == id) {
        if (this.successionPlanRequisition.length == 0) {
          this.successionPlanRequisition.push({
            SuccessionPlanDetailId: this.successionPlanLists[i].successionPlanDetailId,
            VerticalId: this.successionPlanLists[i].verticalId,
            LocationId: this.successionPlanLists[i].locationId,
            FunctionId: this.successionPlanLists[i].functionId,
            DepartmentId: this.successionPlanLists[i].departmentId,
            PositionId: this.successionPlanLists[i].positionId,
            GradeId: this.successionPlanLists[i].gradeId,
            JobTypeId: this.successionPlanLists[i].jobTypeId,
            JobDescriptionId: this.successionPlanLists[i].jobDescriptionId,
            TargetDate: this.successionPlanLists[i].targetDate,
          })
          this.merge();
        }
      }
    }
  }

  merge() {
    this.SpinnerService.show();
    this.mergeSuccessionPlanFormdata.SuccessionPlanData = this.successionPlanRequisition;
    this.mergeSuccessionPlanFormdata.CreatedBy = this.createdBy;
    this.successionPlanService.mergeSuccessionPlan(this.mergeSuccessionPlanFormdata).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.fromSubmit();
          this.isMerge = false;
          this.successionPlanRequisition = [];
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

  deleteSuccessionPlan(dataId) {
    if (confirm("Are you sure to delete ")) {
      this.deleteRequisitionFormData.DataId = dataId;
      this.deleteRequisitionFormData.TypeId = 2;
      this.deleteRequisitionFormData.CreatedBy = this.createdBy;
      this.SpinnerService.show();
      this.requisitionService.deleteBeforeRequisition(this.deleteRequisitionFormData).subscribe((result) => {
        if (result) {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.fromSubmit();
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Error");
        }
      }, error => {
        console.log(error);
      }, () => {
        this.SpinnerService.hide();
      });
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

}
