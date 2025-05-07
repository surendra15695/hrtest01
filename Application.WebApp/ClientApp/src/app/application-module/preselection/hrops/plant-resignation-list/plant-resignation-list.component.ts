import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from 'src/app/interfaces/common/vertical.interface'; 
import { IStatus } from 'src/app/interfaces/common/common.interface'; 
import { ISearchLocation,ILocation } from 'src/app/interfaces/common/location.interface';  
import { IVerticalFunction,ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead  } from 'src/app/interfaces/common/function.interface';
import { IFunctionDepartment,ISearchDepartment } from 'src/app/interfaces/common/department.interface';
import { IPositionVerticalDetail,ISearchPosition, IPositionGrade, ISearchPositionGrade } from 'src/app/interfaces/common/position.interface';
import { ISearchResignationList, IResignationList, IResignationRequisition, IMergeResignationFormData, IResignationClarification, ISearchResignationClarification  } from 'src/app/interfaces/preselection/resignation.interface'; 
import { LocationService } from 'src/app/services/common/location/location.service';
import { CommonService } from 'src/app/services/common/common/common.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { DepartmentService } from 'src/app/services/common/department/department.service';
import { PositionService } from 'src/app/services/common/position/position.service';
import { ResignationService } from 'src/app/services/preselection/resignation/resignation.service';
import { ShareddataService } from 'src/app/sharedservices/shareddata.service'; 
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { IApproverVertical,IApproverFunction, IApproverDepartment, IApproverVerticalFunctionDepartment, IApproverFunctionDepartment  } from 'src/app/interfaces/common/common.interface';
import { ToastrService } from 'ngx-toastr';
import { IDeleteBeforeRequisitionFormData } from 'src/app/interfaces/preselection/requisition.interface';
import { RequisitionService } from 'src/app/services/preselection/requisition/requisition.service';

declare var jQuery: any;
declare var html2pdf: any;

@Component({
  selector: 'app-plant-resignation-list',
  templateUrl: './plant-resignation-list.component.html',
  styleUrls: ['./plant-resignation-list.component.css']
})
export class PlantResignationListComponent implements OnInit {

  pageTitle: string = "Plant Resignation List";
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

  isMerge: boolean = false;
  verticalIds: string;
  searchResignationClarification: ISearchResignationClarification = {
    resignationDetailId: 0
  }

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

  resignationClarificationList: IResignationClarification[] = [];

  deleteRequisitionFormData: IDeleteBeforeRequisitionFormData = {
    DataId: null,
    TypeId: null,
    CreatedBy: null
  }
  isHrOps: boolean = false;

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
    private functionService: FunctionService,
    private requisitionService: RequisitionService
  ) {
    this.SpinnerService.show();
    localStorage.removeItem('pagename');
    localStorage.removeItem('id');
    this.loadDataTable();   // called here
    var roleids = this.persistance.get('loggedinuser').roleIds.split(",");
    for (var i = 0; i < roleids.length; i++) {
      if (roleids[i] == "8") {
        this.isHrOps = true;
      }
    }
    if (this.isHrOps == true) {
      this.verticalIds = "1,2,3";
    }
    else {
      this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    }
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.createForm();
    this.createAcknowledgementForm();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllStatus();
    this.getAllReasons();
    this.getAllReplacementStatus();
    this.resignationRequisition = [];
  }

  ngOnInit() {
    this.titleService.setTitle(this.pageTitle);
    this.loadDatePicker();
    // this.loadDataTable();  // Previously was called here but got issue of loading and ngIf was not working in th section so called in line no 127
    this.loadTooltipMenu();
    setTimeout(() => {
      this.fromSubmit();
    }, 100);
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
      requisitionNo: [''],
      verticalId: [''],
      locationId: [0],
      functionId: [0],
      fromDate: [''],
      toDate: [''],
      iOMNo: [''],
      resignationProcessStatus: [0],
      reasonId: [0],
      replacementStatusId: [0]
    });
  }

  getAllVerticals() {
    // this.verticals = [];
    // var splitvertical = this.verticalIds.split(",");
    // var allvertical = "";
    // console.log(splitvertical);
    // for (var i = 0; i < splitvertical.length; i++) {
    //   if (splitvertical[i] != "0") {
    //     if (splitvertical[i] == "1") {
    //       this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    //     }
    //     else if (splitvertical[i] == "2") {
    //       this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    //     }
    //     else if (splitvertical[i] == "3") {
    //       this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    //     }
    //     if (allvertical == "") {
    //       allvertical = splitvertical[i];
    //     }
    //     else {
    //       allvertical = allvertical + "," + splitvertical[i];
    //     }
    //   }

    // }
    // this.selectedVertical = this.verticals[0];
    // this.setDefaultVertical();
    // this.getAllFunction();
    this.verticals = [];
    // this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    // this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    // this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    this.loadSelectPicker();
    this.selectedVertical = this.verticals.filter(x => x.verticalId == 2)[0];
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
    //console.log(this.selectedVertical);
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
    this.commonService.getAllStatusForROResignation().subscribe((result) => {
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

  fromSubmit() {
    this.searchform.patchValue(
      {
        verticalId: this.selectedVertical.verticalId,
        fromDate: this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value
      });
    //console.log(this.searchform.value);
    this.SpinnerService.show();
    this.resignationService.getAllResignationList(this.searchform.value).subscribe((result) => {
      if (result) {
        this.resignationLists = result;
        console.log("Resignation Result", this.resignationLists);
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
      resignationApprovalStatus: 0,
      reasonId: 0,
      replacementStatusId: 0
    })
    this.loadSelectPicker();
    this.resignationLists = [];
    this.loadDataTable();
  }

  getAllReasons() {
    this.reasons = [];
    this.commonService.getAllStatusForROResignation().subscribe((result) => {
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
    this.commonService.getAllStatusForROResignation().subscribe((result) => {
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

  openModalPopup(id) {
    this.getAllResignationClarificationList(id);
    jQuery(".custom-menu").hide();
    this.saveform.patchValue({
      resignationDetailId: id,
      createdBy: this.createdBy,
      remarks: ''
    })
    jQuery('.ddlacknowledge').val('').trigger('change');
    jQuery(".ddlacknowledge").selectpicker("refresh");
  }

  select(evt, id) {
    for (var i = 0; i < this.resignationLists.length; i++) {
      if (this.resignationLists[i].resignationDetailId == id) {
        if (evt.target.checked) {
          if (this.resignationRequisition.length == 0) {
            this.resignationRequisition.push({
              ResignationDetailId: this.resignationLists[i].resignationDetailId,
              VerticalId: this.resignationLists[i].verticalId,
              LocationId: this.resignationLists[i].locationId,
              FunctionId: this.resignationLists[i].functionId,
              DepartmentId: this.resignationLists[i].departmentId,
              PositionId: this.resignationLists[i].positionId,
              GradeId: this.resignationLists[i].gradeId,
              JobTypeId: this.resignationLists[i].jobTypeId,
              JobDescriptionId: this.resignationLists[i].jobDescriptionId,
              TargetDate: this.resignationLists[i].targetDate,
            })
          }
          else {
            if (this.resignationLists[i].verticalId == this.resignationRequisition[0].VerticalId &&
              this.resignationLists[i].locationId == this.resignationRequisition[0].LocationId &&
              this.resignationLists[i].functionId == this.resignationRequisition[0].FunctionId &&
              this.resignationLists[i].departmentId == this.resignationRequisition[0].DepartmentId &&
              this.resignationLists[i].positionId == this.resignationRequisition[0].PositionId &&
              // this.resignationLists[i].gradeId == this.resignationRequisition[0].GradeId &&       // Removed as per point sl no 47
              this.resignationLists[i].jobTypeId == this.resignationRequisition[0].JobTypeId &&
              this.resignationLists[i].jobDescriptionId == this.resignationRequisition[0].JobDescriptionId //&&
              //this.resignationLists[i].targetDate == this.resignationRequisition[0].TargetDate
            ) {
              this.resignationRequisition.push({
                ResignationDetailId: this.resignationLists[i].resignationDetailId,
                VerticalId: this.resignationLists[i].verticalId,
                LocationId: this.resignationLists[i].locationId,
                FunctionId: this.resignationLists[i].functionId,
                DepartmentId: this.resignationLists[i].departmentId,
                PositionId: this.resignationLists[i].positionId,
                GradeId: this.resignationLists[i].gradeId,
                JobTypeId: this.resignationLists[i].jobTypeId,
                JobDescriptionId: this.resignationLists[i].jobDescriptionId,
                TargetDate: this.resignationLists[i].targetDate,
              })
            }
            else {
              this.notificationService.showError("Please select same resignation criteria", "Error");
              evt.target.checked = false;
            }
          }
        }
        else {
          this.resignationRequisition = this.resignationRequisition.filter(x => x.ResignationDetailId != this.resignationRequisition[i].ResignationDetailId);
        }
      }
    }
    if (this.resignationRequisition.length > 0) {
      this.isMerge = true;
    }
    else {
      this.isMerge = false;
    }
  }

  CreateRequisition(id) {
    jQuery(".custom-menu").hide();
    this.resignationRequisition = [];
    for (var i = 0; i < this.resignationLists.length; i++) {
      if (this.resignationLists[i].resignationDetailId == id) {
        if (this.resignationRequisition.length == 0) {
          this.resignationRequisition.push({
            ResignationDetailId: this.resignationLists[i].resignationDetailId,
            VerticalId: this.resignationLists[i].verticalId,
            LocationId: this.resignationLists[i].locationId,
            FunctionId: this.resignationLists[i].functionId,
            DepartmentId: this.resignationLists[i].departmentId,
            PositionId: this.resignationLists[i].positionId,
            GradeId: this.resignationLists[i].gradeId,
            JobTypeId: this.resignationLists[i].jobTypeId,
            JobDescriptionId: this.resignationLists[i].jobDescriptionId,
            TargetDate: this.resignationLists[i].targetDate,
          })
          this.merge();
        }
      }
    }
  }

  merge() {
    this.SpinnerService.show();
    this.mergeResignationFormdata.ResignationData = this.resignationRequisition;
    this.mergeResignationFormdata.CreatedBy = this.createdBy;
    this.resignationService.mergeResignation(this.mergeResignationFormdata).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.fromSubmit();
          this.isMerge = false;
          this.resignationRequisition = [];
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

  deleteRequisition(dataId) {
    if (confirm("Are you sure to delete ")) {
      this.deleteRequisitionFormData.DataId = dataId;
      this.deleteRequisitionFormData.TypeId = 1;         // Typeid 1 is For Resignation 
      this.deleteRequisitionFormData.CreatedBy = this.createdBy;
      // console.log(this.deleteRequisitionFormData);
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
