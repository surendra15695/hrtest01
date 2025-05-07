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
import { ISearchRequisition, IRequisitionHistoryList } from '../../../../../interfaces/preselection/requisition.interface';
import { LocationService } from '../../../../../services/common/location/location.service';
import { CommonService } from '../../../../../services/common/common/common.service';
import { FunctionService } from '../../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../../services/common/department/department.service';
import { PositionService } from '../../../../../services/common/position/position.service';
import { RequisitionService } from '../../../../../services/preselection/requisition/requisition.service';
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
  selector: 'app-approverrequisitionlist',
  templateUrl: './approverrequisitionlist.component.html',
  styleUrls: ['./approverrequisitionlist.component.css']
})
export class ApproverrequisitionlistComponent implements OnInit {
  pageTitle = "Requisition - Pending Action";
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
  requisitionLists: IRequisitionHistoryList[] = [];
  loginUserId: number;
  requisitionDetailHistoryId: number;
  positionName: string;
  verticalFunctionDepartmentHeads: IVerticalFunctionDepartmentHead[] = [];
  searchVerticalFunctionDepartmentHead: ISearchVerticalFunctionDepartmentHead = {
    autoUserId: null
  }
  //approver dropdowns
  approverVertical: IApproverVertical[] = [];
  approverFunction: IApproverFunction[] = [];
  //approverDepartment: IApproverDepartment[] = [];  // Removed by Anif 0n 07-07-2022 as department not required in function head mapping
  approverFunctionDepartment: IApproverFunctionDepartment[] = [];
  approverVerticalFunctionDepartment: IApproverVerticalFunctionDepartment[] = [];
  selectedVerticalId: number;
  // Anif
  requisitionDetailsArrayPopup: any[] = [];
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private functionService: FunctionService,
    private commonService: CommonService,
    private requisitionService: RequisitionService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private titleService: Title
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.getAllVerticalFunctionDepartmentHead();
    localStorage.removeItem('pagename');
    localStorage.removeItem('id');
    this.createForm();
    this.createSaveForm();
    this.getAllVerticals();
    this.getAllStatus();
    this.fillpageLoad();
  }

  ngOnInit() {
    this.titleService.setTitle(this.pageTitle);
    this.loadDatePicker();
    this.loadDataTable();
    this.loadTooltipMenu();
    setTimeout(() => {
      this.fromSubmit();
    }, 100)
  }

  createForm() {
    this.searchform = this.fb.group({
      requisitionNo: [''],
      //verticalId: [0], // Previous
      verticalId: null, // Added by Anif on 08-07-2022
      locationId: [0],
      fromDate: [''],
      toDate: [''],
      iOMNo: [''],
      requisitionApprovalStatus: [0],
      approverAutoUserId: [this.loginUserId]
    });
  }

  createSaveForm() {
    this.saveform = this.fb.group({
      RequisitionDetailHistoryId: [0],
      Remarks: [''],
      StatusId: [0],
      CreatedBy: [0]
    });
  }

  //verticals
  getAllVerticals() {
    this.verticals = [];
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    this.loadSelectPicker();
    this.selectedVertical = this.verticals.filter(x => x.verticalId == 0)[0];
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
        this.statuses = result.filter(x => x.statusTypeId == 1);
        this.statuses.splice(0, 0, {
          statusId: 0,
          statusName: "All",
          statusTypeId: 1,
          statusTypeName: "RequisitionApprovalStatus",
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
        "left": 2
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

    });
  }

  // fromSubmit() {                                    // By Arnab on 05-08-2023
  //   this.searchform.patchValue(
  //     {
  //       fromDate: this.fDate.nativeElement.value,
  //       toDate: this.tDate.nativeElement.value
  //     });
  //   this.searchform.patchValue({
  //     verticalId: Number(this.selectedVerticalId)
  //   })
  //   //console.log(this.searchform.value);
  //   this.SpinnerService.show();
  //   this.requisitionService.getAllRequisitionHistory(this.searchform.value).subscribe((result) => {
  //     if (result) {
  //       //console.log(result);
  //       this.requisitionLists = result;
  //       this.loadDataTable();
  //       this.SpinnerService.hide();
  //     }
  //     else {
  //       this.requisitionLists = [];
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

  fromSubmit() {              // By Arnab on 05-08-2023
    var flag = 0;
    this.searchform.patchValue(
      {
        fromDate: this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value
      });
    this.searchform.patchValue({
      verticalId: Number(this.selectedVerticalId)
    })
    //console.log(this.searchform.value);
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
      this.requisitionService.getAllRequisitionHistory(this.searchform.value).subscribe((result) => {
        if (result) {
          //console.log(result);
          this.requisitionLists = result;
          this.loadDataTable();
          this.SpinnerService.hide();
        }
        else {
          this.requisitionLists = [];
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

  viewIOM(pathval) {
    window.open(this.apppath + "" + pathval, "blank");
  }

  reset() {
    var dothis = this;
    this.searchform.reset();  
    this.searchform.patchValue({
      locationId: 0,
      requisitionApprovalStatus: 0
    })
    this.getAllVerticalFunctionDepartmentHead();
    this.loadSelectPicker();
    this.requisitionLists = [];
    this.loadDataTable();
    this.fromSubmit();
  }

  openApproveRejectModal(id, pos) {
    jQuery(".txtrejectremarks").removeClass("is-invalid");
    jQuery(".custom-menu").hide();
    this.requisitionDetailHistoryId = id;
    this.positionName = pos;
    this.saveform.patchValue({
      Remarks: ""
    })
  }

  reject() {
    if (confirm("Are you sure to reject ")) {
      if (this.saveform.value.Remarks == "") {
        jQuery(".txtrejectremarks").addClass("is-invalid");
        this.notificationService.showError("Please enter Remarks", "Error");
      }
      else {
        jQuery(".txtrejectremarks").removeClass("is-invalid");
        this.saveform.patchValue({
          RequisitionDetailHistoryId: this.requisitionDetailHistoryId,
          StatusId: 4,
          CreatedBy: this.loginUserId
        })
        this.SpinnerService.show();
        this.requisitionService.requisitionApproveReject(this.saveform.value).subscribe((result) => {
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
          jQuery("#myModal").modal("hide");
        });
      }
    }
  }
  approve() {
    this.saveform.patchValue({
      RequisitionDetailHistoryId: this.requisitionDetailHistoryId,
      StatusId: 3,
      CreatedBy: this.loginUserId
    })
    this.SpinnerService.show();
    this.requisitionService.requisitionApproveReject(this.saveform.value).subscribe((result) => {
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
          jQuery(".txtrejectremarks").removeClass("is-invalid");
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
      jQuery("#myModal").modal("hide");
    });
  }


  //locations
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
    this.searchVerticalFunctionDepartmentHead.autoUserId = this.loginUserId;
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
                // this.approverDepartment = [];                            // Removed by Anif 0n 07-07-2022 as department not required in function head mapping
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

        this.getAllLocation();

        setTimeout(() => {
          jQuery('.ddlvertical').selectpicker("val", "" + this.selectedVerticalId + "");
          jQuery('.ddlvertical').selectpicker("refresh");
        });
      }
      else {
        this.verticalFunctionDepartmentHeads = [];
        this.verticalFunctionDepartmentHeads.splice(0, 0, {
          autoUserId: this.loginUserId,
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
    // this.approverDepartment = [];      // Removed by Anif 0n 07-07-2022 as department not required in function head mapping
    // this.approverDepartment.push({
    //   departmentId: 0,
    //   departmentName: "All"
    // })
    for (var i = 0; i < this.approverVerticalFunctionDepartment.length; i++) {
 //     console.log(this.approverVerticalFunctionDepartment[i]);
    }
  }

  gotoCandidateList(requisitionDetailId) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "approvercandidatelist");
    this.persistance.set('paramid', requisitionDetailId);
    this._route.navigate(['/app/requisition/all-positions/candidate-list']);
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
  // Anif

  onClickRequisitionNo(record: any) {
    this.requisitionDetailsArrayPopup = [];
    this.requisitionDetailsArrayPopup.push(record);
    //console.log("requesition Details", this.requisitionDetailsArrayPopup);
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
