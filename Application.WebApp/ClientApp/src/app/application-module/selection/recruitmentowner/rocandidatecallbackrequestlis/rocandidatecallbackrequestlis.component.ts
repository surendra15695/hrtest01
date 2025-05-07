import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../interfaces/common/doctor.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../interfaces/common/position.interface';
import { IPlantAllocationList } from '../../../../interfaces/prejoining/plantallocation.interface';
import { IOnboardingCoordinator, ISearchOnboardingCoordinator } from '../../../../interfaces/prejoining/onboardingcoordinator.interface';
import { ICandidateDetailData, ISearchCandidateDetail, IModeOfJoining, ISearchModeOfJoining } from '../../../../interfaces/preselection/candidate.interface';
import { LocationService } from '../../../../services/common/location/location.service';
import { CommonService } from '../../../../services/common/common/common.service';
import { FunctionService } from '../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../services/common/department/department.service';
import { PositionService } from '../../../../services/common/position/position.service';
import { PlantallocationService } from '../../../../services/prejoining/onboardingmanager/plant/plantallocation.service';
import { ShareddataService } from '../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { RequisitionService } from '../../../../services/preselection/requisition/requisition.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { element } from 'protractor';
declare var jQuery: any;

@Component({
  selector: 'app-rocandidatecallbackrequestlis',
  templateUrl: './rocandidatecallbackrequestlis.component.html',
  styleUrls: ['./rocandidatecallbackrequestlis.component.css']
})
export class RocandidatecallbackrequestlisComponent implements OnInit {

  searchformPending: FormGroup;
  searchFormProcessed: FormGroup;
  saveform: FormGroup;
  callbackPendingList: any[] = [];
  processedCallBackList: any[] = [];
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  callngIfFunction: boolean = true;
  //vertical
  verticals: IVertical[] = [];
  selectedPendingVertical: IVertical;
  selectedVerticalId: number;
  defaultverticalId: number;
  selectAllPending: boolean;
  objApproveRejectFormData: ApproveRejectFormData;
  approveType: string = "S";
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private functionService: FunctionService,
    private commonService: CommonService,
    private plantservice: PlantallocationService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private titleService: Title,
    private positionService: PositionService,
    private requisitionService: RequisitionService
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    // console.log("Login User", this.loginUserId);
    this.objApproveRejectFormData = new ApproveRejectFormData();
    this.objApproveRejectFormData.approvedBy = this.loginUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');

    this.createPendingSearchForm();
    this.createProcessedSearchForm();
    this.getAllVerticals();
    this.getAllPendingCallbackRequest();
  }

  ngOnInit() {
    this.loadDataTable1();
    this.loadDataTable2();
    this.tableOptionDropDown();
  }
  createPendingSearchForm() {
    this.searchformPending = this.fb.group({
      candidateNo: [''],
      candidateName: [''],
      verticalId: [0]
    });
  }
  createProcessedSearchForm() {
    this.searchFormProcessed = this.fb.group({
      candidateNo: [''],
      candidateName: [''],
      verticalId: [0]
    });
  }
  tableOptionDropDown() {
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
  loadDataTable1() {
    jQuery('#dataTable1').dataTable().fnClearTable();
    jQuery('#dataTable1').dataTable().fnDestroy();
    setTimeout(() => {
      jQuery('#dataTable1').dataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "fixedColumns": {
          "left": 4
          },
        "drawCallback": function (settings) {
          setTimeout(() => {
            jQuery('[data-toggle="popover"]').popover({
              html: true
            });
          });
        }
      });
    });
  } //added by arg
  loadDataTable2() {
    jQuery('#dataTable2').dataTable().fnClearTable();
    jQuery('#dataTable2').dataTable().fnDestroy();
    setTimeout(() => {
      jQuery('#dataTable2').dataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "fixedColumns": {
          "left": 3
          },
        "drawCallback": function (settings) {
          setTimeout(() => {
            jQuery('[data-toggle="popover"]').popover({
              html: true
            });
          });
        }
      });
    });
  }  //added by arg
  //verticals
  getAllVerticals() {
    this.verticals = [];
    var splitvertical = this.verticalIds.split(",");
    // this.verticals.push({ verticalId: 0, verticalName: "All", isActive: true });
    for (var i = 0; i < splitvertical.length; i++) {
      if (splitvertical[i] != "0") {
        if (splitvertical[i] == "1") {
          var checkexisted = this.verticals.find(e => e.verticalId == 1);
          if (checkexisted == undefined) {
            this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
          }
        }
        else if (splitvertical[i] == "2") {
          var checkexisted = this.verticals.find(e => e.verticalId == 2);
          if (checkexisted == undefined) {

            this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
          }
        }
        else if (splitvertical[i] == "3") {
          var checkexisted = this.verticals.find(e => e.verticalId == 3);
          if (checkexisted == undefined) {
            this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
          }
        }
      }
    }
    // console.log("Verticalid", this.verticals);
    // var selectedVerticalObj = this.verticals.find(e => e.verticalId == 2);
    var selectedVerticalObj = this.verticals[0];
    this.selectedPendingVertical = selectedVerticalObj;
    this.defaultverticalId = this.selectedPendingVertical.verticalId;
    this.selectedVerticalId = this.defaultverticalId;
    // Sending one default value to backend
    this.searchformPending.patchValue({
      verticalId: this.defaultverticalId
    })
    this.searchFormProcessed.patchValue({
      verticalId: this.defaultverticalId
    })

  }
  getAllPendingCallbackRequest() {
    this.SpinnerService.show();
    this.plantservice.getCallbackRequestCandidate(this.searchformPending.value).subscribe((result) => {
      if (result) {
        this.callbackPendingList = result;
        //console.log("Callback Pending List", this.callbackPendingList);
        this.callbackPendingList = _.filter(this.callbackPendingList, { approvalStatusId: 1 });
        this.callbackPendingList.forEach(element => {
          element.isChecked = false;
        })
        this.SpinnerService.hide();
      }
      else {
        this.callbackPendingList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.loadDataTable1();
      this.SpinnerService.hide();
    });
  }

  onCheckSelectAllPending(event: any) {
    if (event.target.checked) {
      this.callbackPendingList.forEach(element => {
        element.isChecked = true;
      })
    } else {
      this.callbackPendingList.forEach(element => {
        element.isChecked = false;
      })
    }
  }
  onCheckRowWisePending(data, eve) {
    if (eve.target.checked) {
      data.isChecked = true;
      var checkanyfalse = this.callbackPendingList.find(e => e.isChecked == false);
      if (checkanyfalse == undefined) {
        this.selectAllPending = true;
      } else {
        this.selectAllPending = false;
      }
    } else {
      data.isChecked = false;
      this.selectAllPending = false;

    }
  }
  getPendingEnableStatus(data) {
    return data.isChecked ? true : false;
  }
  showAllocateCandidateButton() {
    var isCheckedAny = this.callbackPendingList.find(e => e.isChecked == true);
    return isCheckedAny == undefined ? false : true;
  }

  onClickPendingTab() {
    setTimeout(() => {
      this.getAllPendingCallbackRequest();
    }, 1000);
  }

  onClickTakeActionButton() {
    this.approveType = "A";
    this.objApproveRejectFormData.requisitionwisecandidate = [];
    this.objApproveRejectFormData = new ApproveRejectFormData();
    this.objApproveRejectFormData.approvedBy = this.loginUserId;
  }
  onClickTakeActionOption(data) {
    this.approveType = "S";
    this.objApproveRejectFormData.requisitionwisecandidate = [];
    this.objApproveRejectFormData = new ApproveRejectFormData();
    this.objApproveRejectFormData.requisitionwisecandidate = [];
    this.objApproveRejectFormData.approvedBy = this.loginUserId;
    this.objApproveRejectFormData.requisitionwisecandidate.push({ candidateId: data.candidateId, requisitionDetailId: data.requisitionDetailId })
  }

  onClickProcessedTab() {
    setTimeout(() => {
      this.getAllProcessedList()
    }, 1000);

  }
  getAllProcessedList() {
    this.SpinnerService.show();
    this.plantservice.getCallbackRequestCandidate(this.searchformPending.value).subscribe((result) => {
      if (result) {
        this.processedCallBackList = result;
        //console.log("Callback Processed List", this.processedCallBackList);
        //this.processedCallBackList = _.filter(this.processedCallBackList, { approvalStatusId: 1 });
        this.processedCallBackList = this.processedCallBackList.filter(e => e.approvalStatusId != 1);
        this.SpinnerService.hide();
      }
      else {
        this.processedCallBackList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.loadDataTable2();
      this.SpinnerService.hide();
    });
  }
  pendingFormSubmit() {
    setTimeout(() => {
      this.getAllPendingCallbackRequest();
    }, 1000);
  }
  pendingResetClick() {
    this.searchformPending.reset();
    this.searchformPending.patchValue({
      verticalId: this.defaultverticalId
    })
    this.getAllPendingCallbackRequest();
  }
  processedFormSubmit() {
    setTimeout(() => {
      this.getAllProcessedList()
    }, 1000);
  }
  processedResetClick() {
    this.searchFormProcessed.reset();
    this.searchFormProcessed.patchValue({
      verticalId: this.defaultverticalId
    })
    this.getAllProcessedList()
  }
  onChangeApprove(approveStatus) {
    if (approveStatus == "A") {
      this.objApproveRejectFormData.approvalStatusId = 2;
    } else {
      this.objApproveRejectFormData.approvalStatusId = 3;
    }
  }
  approveRejectSubmit() {
    var flag = 0;
    var msg = "";
    if (this.objApproveRejectFormData.approvalStatusId == undefined) {
      flag = 1;
      msg = "Please select approve/reject";
    }
    else {

    }
    if (this.objApproveRejectFormData.remarks == undefined || this.objApproveRejectFormData.remarks == "") {
      flag = 1;
      msg = "Please enter remarks";
    }
    else {

    }
    if (flag == 0) {
      this.objApproveRejectFormData.approvedBy = this.loginUserId;
      if (this.approveType == "A") {
        this.objApproveRejectFormData.requisitionwisecandidate = [];
        this.callbackPendingList.forEach(element => {
          if (element.isChecked) {
            this.objApproveRejectFormData.requisitionwisecandidate.push({ candidateId: element.candidateId, requisitionDetailId: element.requisitionDetailId })
          }
        })
      }
      this.requisitionService.approveRejectCallbackRequest(this.objApproveRejectFormData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
            jQuery("#callBackModal").modal("hide");
            this.selectAllPending = false;
            this.objApproveRejectFormData = new ApproveRejectFormData();
            this.getAllPendingCallbackRequest();
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.objApproveRejectFormData = new ApproveRejectFormData();
            this.getAllPendingCallbackRequest();
            jQuery("#callBackModal").modal("hide");
          }
        }
        else {
        }
      }, error => {
        console.log(error);
      }, () => {
      });

    } else {
      this.notificationService.showError(msg, "Error");
    }
  }

}
class ApproveRejectFormData {
  requisitionwisecandidate: any[];
  remarks: string;
  approvalStatusId: number = 2;
  approvedBy: number;
}

// public long  CandidateId { get; set; }
// public long RequisitionDetailId { get; set; }