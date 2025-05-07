import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../../interfaces/common/vertical.interface';
import { IStatus } from '../../../../../interfaces/common/common.interface';
import { ILocation, ISearchLocation } from '../../../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../../interfaces/common/function.interface';
import { IFunctionDepartment, ISearchDepartment } from '../../../../../interfaces/common/department.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../../interfaces/common/position.interface';
import { ISearchResignationList, IResignationList, IResignationRequisition, IMergeResignationFormData } from '../../../../../interfaces/preselection/resignation.interface';
import { LocationService } from '../../../../../services/common/location/location.service';
import { CommonService } from '../../../../../services/common/common/common.service';
import { FunctionService } from '../../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../../services/common/department/department.service';
import { PositionService } from '../../../../../services/common/position/position.service';
import { ResignationService } from '../../../../../services/preselection/resignation/resignation.service';
import { ShareddataService } from '../../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { environment } from '../../../../../../environments/environment';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { IApproverVertical, IApproverFunction, IApproverDepartment, IApproverVerticalFunctionDepartment, IApproverFunctionDepartment } from '../../../../../interfaces/common/common.interface';
declare var jQuery: any;
declare var html2pdf: any;

@Component({
  selector: 'app-approverresignationlist',
  templateUrl: './approverresignationlist.component.html',
  styleUrls: ['./approverresignationlist.component.css']
})
export class ApproverresignationlistComponent implements OnInit {
  pageTitle = "Resignation - Pending Action";
  resignationDetailId: number;
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
  verticalFunctionDepartmentHeads: IVerticalFunctionDepartmentHead[] = [];
  searchVerticalFunctionDepartmentHead: ISearchVerticalFunctionDepartmentHead = {
    autoUserId: null
  }
  //approver dropdowns
  approverVertical: IApproverVertical[] = [];
  approverFunction: IApproverFunction[] = [];
  //approverDepartment: IApproverDepartment[] = [];
  approverFunctionDepartment: IApproverFunctionDepartment[] = [];
  approverVerticalFunctionDepartment: IApproverVerticalFunctionDepartment[] = [];
  selectedVerticalId: number;
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
    private SpinnerService: NgxSpinnerService,
    private functionService: FunctionService,
    private titleService: Title
  ) {
    this.SpinnerService.show();
    localStorage.removeItem('pagename');
    localStorage.removeItem('id');
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.getAllVerticalFunctionDepartmentHead();
    this.createForm();
    this.createSaveForm();
    this.getAllReasons();
    this.getAllReplacementStatus();
    this.resignationRequisition = [];
    this.fillpageLoad();
    this.getAllLocation();
  }

  ngOnInit() {
    this.titleService.setTitle(this.pageTitle);
    this.loadDatePicker();
    this.loadDataTable();
    this.loadTooltipMenu();
    setTimeout(() => {
      this.fromSubmit();
    }, 100);
  }

  createSaveForm() {
    this.saveform = this.fb.group({
      ResignationDetailId: [0],
      Remarks: [''],
      StatusId: [0],
      CreatedBy: [0]
    });
  }

  createForm() {
    this.searchform = this.fb.group({
      verticalId: [0],
      locationId: [0],
      fromDate: [''],
      toDate: [''],
      approverAutoUserId: [0],
      resignationApprovalStatus: [0],
      reasonId: [0],
      replacementStatusId: [0]
    });
  }

  //status

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
        "order": [],
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
      jQuery(".dropdown-item").on("click", function () {
        jQuery('.dropdown-menu').hide();
      });
    });
  }

  // fromSubmit() {                         // By Arnab on 05-08-2023
  //   this.searchform.patchValue(
  //     {
  //       fromDate: this.fDate.nativeElement.value,
  //       toDate: this.tDate.nativeElement.value,
  //       approverAutoUserId: this.createdBy,
  //       verticalId: Number(this.searchform.value.verticalId)
  //     });
  //   this.SpinnerService.show();
  //   // console.log(this.searchform.value);
  //   this.resignationService.getAllResignationList(this.searchform.value).subscribe((result) => {
  //     if (result) {
  //       // console.log("Resignation List", result);
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

  fromSubmit() {           // By Arnab on 05-08-2023
    var flag = 0;
    this.searchform.patchValue(
      {
        fromDate: this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value,
        approverAutoUserId: this.createdBy,
        verticalId: Number(this.searchform.value.verticalId)
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
      // console.log(this.searchform.value);
      this.resignationService.getAllResignationList(this.searchform.value).subscribe((result) => {
        if (result) {
          // console.log("Resignation List", result);
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

  reset() {
    this.searchform.reset();
    this.searchform.patchValue({
      resignationApprovalStatus: 0,
      fromDate: "",
      toDate: "",
      reasonId: 0,
      replacementStatusId: 0,
      locationId: 0
    })
    this.loadSelectPicker();
    this.resignationLists = [];
    this.loadDataTable();
    this.getAllVerticalFunctionDepartmentHead();
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


  openApproveRejectModal(id, pos) {
    jQuery(".txtrejectremarks").removeClass("is-invalid");
    jQuery(".custom-menu").hide();
    this.resignationDetailId = id;
    this.saveform.patchValue({
      Remarks: ""
    })
  }

  reject() {
    if (confirm("Are you sure to reject ")) {
      if (this.saveform.value.Remarks == "") {
        jQuery(".txtrejectremarks").addClass("is-invalid");
      }
      else {
        jQuery(".txtrejectremarks").removeClass("is-invalid");
        this.saveform.patchValue({
          ResignationDetailId: this.resignationDetailId,
          StatusId: 4,
          CreatedBy: this.createdBy
        })
        this.SpinnerService.show();
        this.resignationService.resignationApproveReject(this.saveform.value).subscribe((result) => {
          if (result) {
            if (result.successFlag == 0) {
              this.SpinnerService.hide();
              this.notificationService.showError(result.msg, "Error");
            }
            else {
              this.cModal.nativeElement.click();
              this.fromSubmit();
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
          this.loadSelectPicker();
          this.SpinnerService.hide();
        });
      }
    }
  }
  approve() {
    this.saveform.patchValue({
      ResignationDetailId: this.resignationDetailId,
      StatusId: 3,
      CreatedBy: this.createdBy
    })
    this.SpinnerService.show();
    this.resignationService.resignationApproveReject(this.saveform.value).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.cModal.nativeElement.click();
          this.fromSubmit();
          this.SpinnerService.hide();
          jQuery(".txtrejectremarks").removeClass("is-invalid");
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
      this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }

  getAllVerticalFunctionDepartmentHead() {
    this.approverFunction = [];
    // this.approverDepartment = [];
    this.approverVertical = [];
    this.verticalFunctionDepartmentHeads = [];
    this.approverFunctionDepartment = [];
    this.approverVerticalFunctionDepartment = [];
    var unique = [];
    var distinct = [];
    var uniquef = [];
    var distinctf = [];
    var uniqued = [];
    var distinctd = [];
    this.searchVerticalFunctionDepartmentHead.autoUserId = this.createdBy;
    this.functionService.getAllVerticalFunctionDepartmentHead(this.searchVerticalFunctionDepartmentHead).subscribe((result) => {
      if (result) {
        this.verticalFunctionDepartmentHeads = result;
        unique = [];
        distinct = [];
        for (var i = 0; i < this.verticalFunctionDepartmentHeads.length; i++) {
          if (!unique[this.verticalFunctionDepartmentHeads[i].verticalId]) {
            distinct.push(this.verticalFunctionDepartmentHeads[i].verticalId);
            unique[this.verticalFunctionDepartmentHeads[i].verticalId] = 1;
            this.approverVertical.push({ verticalId: this.verticalFunctionDepartmentHeads[i].verticalId, verticalName: this.verticalFunctionDepartmentHeads[i].verticalName })
            var distinctfunction = this.verticalFunctionDepartmentHeads.filter(x => x.verticalId == this.verticalFunctionDepartmentHeads[i].verticalId);
            this.approverFunctionDepartment = [];
            uniquef = [];
            distinctf = [];
            for (var j = 0; j < distinctfunction.length; j++) {
              if (!uniquef[distinctfunction[j].functionId]) {
                distinctf.push(distinctfunction[j].functionId);
                uniquef[distinctfunction[j].functionId] = 1;
                var distinctdepartment = this.verticalFunctionDepartmentHeads.filter(x => x.functionId == distinctfunction[j].functionId);
                // this.approverDepartment = [];                          // Removed by anif 0n 08-07-2022
                // for (var k = 0; k < distinctdepartment.length; k++) {
                //   this.approverDepartment.push({
                //     departmentId: distinctdepartment[k].departmentId,
                //     departmentName: distinctdepartment[k].departmentName
                //   })
                // }
                // this.approverFunctionDepartment.push({
                //   functionId: distinctfunction[j].functionId,
                //   functionName: distinctfunction[j].functionName,
                //   departmentData: this.approverDepartment
                // })
              }
            }
            this.approverVerticalFunctionDepartment.push({
              verticalId: this.verticalFunctionDepartmentHeads[i].verticalId,
              verticalName: this.verticalFunctionDepartmentHeads[i].verticalName,
              functionDepartmentData: this.approverFunctionDepartment
            })
          }
        }
        // Added by Abif on 08-07-2022 for showing  All(Select) in  vertical dropdown by default
        this.approverVerticalFunctionDepartment.unshift({
          verticalId: 0,
          verticalName: "All",
          functionDepartmentData: this.approverFunctionDepartment
        })
        // till this   
        this.selectedVerticalId = this.approverVerticalFunctionDepartment[0].verticalId;
        this.searchform.patchValue({
          verticalId: this.selectedVerticalId
        })
        setTimeout(() => {
          jQuery('.ddlvertical').selectpicker("val", "" + this.selectedVerticalId + "");
          jQuery('.ddlvertical').selectpicker("refresh");
        });
      }
      else {
        this.verticalFunctionDepartmentHeads = [];
        this.verticalFunctionDepartmentHeads.splice(0, 0, {
          autoUserId: this.createdBy,
          verticalId: 0,
          verticalName: "All",
          functionId: 0,
          functionName: "",
          departmentId: 0,
          departmentName: ""
        })
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  fillpageLoad() {
    this.approverFunction = [];
    this.approverFunction.push({
      functionId: 0,
      functionName: "All"
    });
    // this.approverDepartment = [];
    // this.approverDepartment.push({
    //   departmentId: 0,
    //   departmentName: "All"
    // })
    for (var i = 0; i < this.approverVerticalFunctionDepartment.length; i++) {
      // console.log(this.approverVerticalFunctionDepartment[i]);
    }
  }

  changeVertical() {
    this.selectedVerticalId = this.searchform.get("verticalId").value;
    this.getAllLocation();
  }

  //locations
  getAllLocation() {
    this.locations = [];
    this.searchLocation.verticalId = Number(this.selectedVerticalId);
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
