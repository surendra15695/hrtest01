import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../../interfaces/common/doctor.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../../interfaces/common/function.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../../interfaces/common/position.interface';
import { ICorporateAllocationList } from '../../../../../interfaces/prejoining/corporateallocation.interface';
import { IOnboardingCoordinator, ISearchOnboardingCoordinator } from '../../../../../interfaces/prejoining/onboardingcoordinator.interface';
import { ICandidateDetailData, ISearchCandidateDetail, IModeOfJoining, ISearchModeOfJoining } from '../../../../../interfaces/preselection/candidate.interface';
import { LocationService } from '../../../../../services/common/location/location.service';
import { CommonService } from '../../../../../services/common/common/common.service';
import { FunctionService } from '../../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../../services/common/department/department.service';
import { PositionService } from '../../../../../services/common/position/position.service';
import { RecruitmentmanagerService } from '../../../../../services/prejoining/recruitmentmanager/recruitmentmanager.service';
import { ShareddataService } from '../../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { RequisitionService } from '../../../../../services/preselection/requisition/requisition.service';
import { environment } from '../../../../../../environments/environment';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { CorporateallocationService } from '../../../../../services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { IApproverVertical, IApproverFunction, IApproverDepartment, IApproverVerticalFunctionDepartment, IApproverFunctionDepartment } from '../../../../../interfaces/common/common.interface';
declare var jQuery: any;


@Component({
  selector: 'app-corporateallocation',
  templateUrl: './corporateallocation.component.html',
  styleUrls: ['./corporateallocation.component.css']
})
export class CorporateallocationComponent implements OnInit {
  searchformPending: FormGroup;
  searchformAllocated: FormGroup;
  saveform: FormGroup;
  saveformEdit: FormGroup;
  updateJoiningDateForm: FormGroup;
  @ViewChild('dateOfJoining', { static: false }) dtOfJoining: ElementRef;
  @ViewChild('fromDatePending', { static: false }) fDatePending: ElementRef;
  @ViewChild('toDatePending', { static: false }) tDatePending: ElementRef;
  @ViewChild('fromDateAllocated', { static: false }) fDateAllocated: ElementRef;
  @ViewChild('toDateAllocated', { static: false }) tDateAllocated: ElementRef;
  //vertical
  verticals: IVertical[] = [];
  selectedPendingVertical: IVertical;
  selectedVerticalId: number;
  defaultverticalId: number;
  //location
  locations: ILocation[] = [];
  selectedLocation: ILocation;
  searchLocation: ISearchLocation =
    {
      locationId: null,
      verticalId: null,
      locationCode: null,
      locationNo: null,
      isActive: true
    };
  selectedLocationId: number;

  //function
  functions: IVerticalFunction[] = [];
  selectedFunction: IVerticalFunction;
  searchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  selectedfunctionId: number;
  functionName: string;
  // Orboarding Coordinator
  // onBoardingCoordinatorList: IOnboardingCoordinator[] = [];
  // selectedCoordinator: IOnboardingCoordinator;
  // searchCoordinator: ISearchOnboardingCoordinator = {
  //   requisitionDetailId: null
  // }
  onBoardingCoordinatorList: any[] = [];
  searchRoleUser: any = {
    roleId: 0
  }
  //Mode Of Joining
  modeOfJoiningList: IModeOfJoining[] = [];
  searchModeOfJoining: ISearchModeOfJoining = {
    modeofJoiningId: null,
    isActive: null
  }
  loginUserId: number;
  verticalIds: string;
  corporateAllocationPendingList: ICorporateAllocationList[] = [];
  corporateAllocationAllocatedList: ICorporateAllocationList[] = [];
  requisitionDetailId: number;
  selectAllPending: boolean;
  selectAllAllocated: boolean;
  callngIfFunction: boolean = true;
  allocationType: string;
  sendToAllocationCandidateId: number;
  updatedJoiningDateArray: any[] = [];
  modeofJoiningId: number = null;
  joiningDate: any;
  allJoiningDateInformation: any[] = [];
  actionName: string;
  declaineCandidateId: number;
  declineremarks: string;
  tabName: string;
  // Added 29-09-2022
  reallocationType: string;
  sendToReallocationCandidateId: number;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private functionService: FunctionService,
    private commonService: CommonService,
    private corporateService: CorporateallocationService,
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
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.createPendingSearchForm();
    this.createAllocatedSearchForm();
    this.createAllocateForm();
    this.createReallocateForm();
    this.getModeOfJoining();
    this.getAllVerticals();
    this.getCorporateAllocationPendingList();
  }

  ngOnInit() {
    this.loadDataTable();
    this.loadDataTable2();
    this.loadDatePicker();
    this.tableOptionDropDown();
    this.loadPopover();

  }
  tableOptionDropDown() {
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
        'font-size': '13px'
      });
      dropdownMenu.addClass("mobPosDropdown");
    });
    table_responsive.on('hide.bs.dropdown', function (e) {
      jQuery(e.target).append(dropdownMenu.detach());
      dropdownMenu.hide();
    });
  }

  createPendingSearchForm() {
    this.searchformPending = this.fb.group({
      //requisitionDetailId: [this.requisitionDetailId],   // Previous
      requisitionDetailId: null,     // Added while retest on 14/06/2022
      candidateId: [0],
      // onBordingMangerId: [0],                     // Previous         
      onBordingMangerId: this.loginUserId,          // Added while retest on 14/06/2022 
      onBordingCoordinatorId: [0],
      allocationPendig: true,
      name: [''],
      verticalId: [1],
      locationId: [0],
      functionId: [0],
      fromDate: [''],
      toDate: [''],

    });
  }
  createAllocatedSearchForm() {
    this.searchformAllocated = this.fb.group({
      // requisitionDetailId: [this.requisitionDetailId],   // Previous  
      requisitionDetailId: null,                            // Added while retest on 14/06/2022
      candidateId: [0],
      // onBordingMangerId: [0],                            // Previous
      onBordingMangerId: this.loginUserId,                  // Added while retest on 14/06/2022
      onBordingCoordinatorId: [0],
      allocationPendig: false,
      name: [''],
      verticalId: [1],
      locationId: [0],
      functionId: [0],
      fromDate: [''],
      toDate: [''],
    });
  }
  createAllocateForm() {
    this.saveform = this.fb.group({
      candidateId: [''],
      onBoardingCoordinator: null,
      createdBy: [this.loginUserId],
      candidateOnBoardingCoordinatorId: 0
    });
  }
  // createUpdateJoinigDateForm(){
  //   this.updateJoiningDateForm = this.fb.group({
  //     candidateId: [''],
  //     onBoardingCoordinator: null,
  //     createdBy: [this.loginUserId]
  //   });
  // }
  //verticals
  getAllVerticals() {
    this.verticals = [];
    var splitvertical = this.verticalIds.split(",");
    // for (var i = 0; i < splitvertical.length; i++) {
    //   if (splitvertical[i] != "0") {
    //     if (splitvertical[i] == "1") {
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    //     }
    //     else if (splitvertical[i] == "2") {
    //       this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    //     }
    //     else if (splitvertical[i] == "3") {
    //       this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    //     }
    //   }

    // }
    var selectedVerticalObj = this.verticals.find(e => e.verticalId == 1);
    this.selectedPendingVertical = selectedVerticalObj;
    this.defaultverticalId = this.selectedPendingVertical.verticalId;
    this.selectedVerticalId = this.defaultverticalId;
    // Sending one default value to backend
    this.searchformPending.patchValue({
      verticalId: this.defaultverticalId
    })
    this.searchformAllocated.patchValue({
      verticalId: this.defaultverticalId
    })
    this.getAllLocation();
    this.getAllFunction();
    //this.getCorporateAllocationPendingList();
  }
  changeVertical() {
    this.selectedVerticalId = this.searchformPending.get("verticalId").value;
    this.getAllLocation();
    this.getAllFunction();
  }
  changeVerticalAllocated() {
    this.selectedVerticalId = this.searchformAllocated.get("verticalId").value;
    this.getAllLocation();
    this.getAllFunction();
  }
  //locations
  getAllLocation() {
    this.locations = [];
    this.SpinnerService.show();
    this.searchLocation.verticalId = this.selectedVerticalId;
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
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }

  //Function
  getAllFunction() {
    this.functions = [];
    this.SpinnerService.show();
    this.searchFunction.verticalId = this.selectedVerticalId;
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;
        this.functions.splice(0, 0, {
          functionId: 0,
          functionName: "All",
          verticalId: 0,
          verticalName: "",
          isActive: true
        })
      }
      else {
        this.functions = [];
        this.functions.splice(0, 0, {
          functionId: 0,
          functionName: "All",
          verticalId: 0,
          verticalName: "",
          isActive: true
        })
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  loadDataTable() {
    // jQuery('#dataTable1').DataTable().clear().destroy();
    jQuery('#dataTable1').dataTable().fnClearTable();
    jQuery('#dataTable1').dataTable().fnDestroy();
    setTimeout(() => {
      // jQuery('#dataTable1').DataTable({
      //   "searching": false,
      //   "paging": true,
      //   "scrollX": true,
      //   "bLengthChange": false,
      // });
      jQuery('#dataTable1').dataTable({
        "searching": false,
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
  }
  loadDataTable2() {
    // jQuery('#dataTable2').DataTable().clear().destroy();
    jQuery('#dataTable2').dataTable().fnClearTable();
    jQuery('#dataTable2').dataTable().fnDestroy();
    setTimeout(() => {
      // jQuery('#dataTable2').DataTable({
      //   "searching": false,
      //   "paging": true,
      //   "scrollX": true,
      //   "bLengthChange": false,
      // });
      jQuery('#dataTable2').dataTable({
        "searching": false,
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
  }
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }
  // loadDatePicker2() {
  //   jQuery(".datepicker1").parent(".input-group").datepicker({
  //     autoclose: true,
  //     format: "dd/mm/yyyy",
  //     todayHighlight: true
  //   });
  // }
  loadPopover() {
    setTimeout(() => {
      jQuery('[data-toggle="popover"]').popover({
        html: true
      });
    });
  }

  getCorporateAllocationPendingList() {
    this.SpinnerService.show();
    this.corporateService.getCorporateAllocationCandidateList(this.searchformPending.value).subscribe((result) => {
      if (result) {
        this.corporateAllocationPendingList = result;
        this.corporateAllocationPendingList = _.filter(this.corporateAllocationPendingList, { onBoardingCoordinator: 0 });
        //console.log("Pending List", this.corporateAllocationPendingList)

        this.corporateAllocationPendingList.forEach(element => {
          if (element.onboardingManagerNotApproveDoc != " ") {
            element.popoverContent = "<div><span class='grey'>Pending/Need clarification Document: </span><span>" + element.onboardingManagerNotApproveDoc + "</span></div>";
          }
        })

        this.SpinnerService.hide();
      }
      else {
        this.corporateAllocationPendingList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.loadDataTable();
      this.loadPopover();
      this.SpinnerService.hide();
    });
  }
  getCorporateAllocationAllocatedList() {
    this.SpinnerService.show();
    this.corporateService.getCorporateAllocationCandidateList(this.searchformAllocated.value).subscribe((result) => {
      if (result) {
        this.corporateAllocationAllocatedList = result;
        this.corporateAllocationAllocatedList = this.corporateAllocationAllocatedList.filter(e => e.onBoardingCoordinator != 0);
        //console.log("Allocated List", this.corporateAllocationAllocatedList);
        this.corporateAllocationAllocatedList.forEach(element => {
          if (element.onboardingManagerNotApproveDoc != " ") {
            element.popoverContent = "<div><span class='grey'>Pending/Need clarification Document: </span><span>" + element.onboardingManagerNotApproveDoc + "</span></div>";
          }
        })
        // console.log("Allocation List Allocate", this.corporateAllocationAllocatedList);
        this.SpinnerService.hide();
      }
      else {
        this.corporateAllocationAllocatedList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.loadDataTable2();
      this.loadPopover();
      this.SpinnerService.hide();
    });
  }


  onClickPendingTab() {
    setTimeout(() => {
      this.createPendingSearchForm();
      this.getAllVerticals();
      this.getCorporateAllocationPendingList();
    }, 100);
  }
  onClickAllocatedTab() {
    setTimeout(() => {
      this.createAllocatedSearchForm();
      this.getAllVerticals();
      this.getCorporateAllocationAllocatedList();
    }, 100);
  }

  pendingFormSubmit() {
    this.searchformPending.patchValue(
      {
        fromDate: this.fDatePending.nativeElement.value,
        toDate: this.tDatePending.nativeElement.value
      });
    this.getCorporateAllocationPendingList();
  }
  pendingResetClick() {
    this.searchformPending.reset();
    this.searchformPending.patchValue({
      verticalId: this.defaultverticalId,
      onBordingMangerId: this.loginUserId,
      allocationPendig: true,
    })
    this.getCorporateAllocationPendingList();
  }
  allocatedFormSubmit() {
    this.searchformAllocated.patchValue(
      {
        fromDate: this.fDateAllocated.nativeElement.value,
        toDate: this.tDateAllocated.nativeElement.value
      });
    this.getCorporateAllocationAllocatedList();
  }
  allocatedResetClick() {
    this.searchformAllocated.reset();
    this.searchformAllocated.patchValue({
      verticalId: this.defaultverticalId,
      onBordingMangerId: this.loginUserId,
      allocationPendig: false,
    })
    this.getCorporateAllocationAllocatedList();
  }
  onCheckSelectAllPending(eve) {
    if (this.corporateAllocationPendingList.length > 0) {
      var firstHiringStatusId = this.corporateAllocationPendingList[0].hiringStatusId;
      var flag = 0;
      this.corporateAllocationPendingList.forEach(element => {
        if (element.hiringStatusId != firstHiringStatusId) {
          flag = 1
        }
      })
      if (flag == 0) {
        this.corporateAllocationPendingList.forEach(element => {
          element.checked = eve.target.checked;
        })
      } else {
        jQuery("#chkAllPending").prop("checked", false);
        this.notificationService.showError("Please select same hiring status", "Error");
      }
    } else {
      jQuery("#chkAllPending").prop("checked", false);
      this.notificationService.showError("No data to select", "Error");
    }

  }
  onCheckSelectAllAllocated(eve) {
    if (this.corporateAllocationAllocatedList.length > 0) {
      var firstHiringStatusId = this.corporateAllocationAllocatedList[0].hiringStatusId;
      var firstCoordinator = this.corporateAllocationAllocatedList[0].onBoardingCoordinator;   // Added 29-09-2022
      var flag = 0;
      this.corporateAllocationAllocatedList.forEach(element => {
        if (element.hiringStatusId != firstHiringStatusId && element.onBoardingCoordinator != firstCoordinator) {
          flag = 1
        }
      })
      if (flag == 0) {
        this.corporateAllocationAllocatedList.forEach(element => {
          element.checked = eve.target.checked;
        })
      } else {
        jQuery("#chkAllAllocated").prop("checked", false);
        this.notificationService.showError("Please select same hiring status and allocated to", "Error");
      }
    } else {
      jQuery("#chkAllAllocated").prop("checked", false);
      this.notificationService.showError("No data to select", "Error");
    }

  }
  // For Pending tab
  getPendingEnableStatus(data) {
    return data.checked;
  }
  onCheckRowWisePending(data, eve, index) {
    if (this.GetSelectedHiringStatusPending(data)) {
      data.checked = eve.target.checked;
      //console.log("zzzzzzzz", data)
    } else {
      jQuery("#" + index).prop("checked", false);
      this.notificationService.showError("Please select same hiring status", "Error");
    }
  }
  GetSelectedHiringStatusPending(NewRow) {
    var AlredyChecked = this.corporateAllocationPendingList.find(e => e.checked);
    if (AlredyChecked == null) {
      return true;
    } else {
      return AlredyChecked.hiringStatusId == NewRow.hiringStatusId;
    }
  }

  // For allocated tab
  getEnableStatusAllocated(data) {
    return data.checked;
  }
  onCheckRowWiseAllocated(data, eve) {
    if (this.GetSelectedHiringStatusAllocated(data)) {
      data.checked = eve.target.checked;
    } else {
      jQuery("#" + data.candidateId).prop("checked", false);
      this.notificationService.showError("Please select same hiring status and allocated to", "Error");  // Added 29-09-2022
    }
  }
  GetSelectedHiringStatusAllocated(NewRow) {
    var AlredyChecked = this.corporateAllocationAllocatedList.find(e => e.checked);
    if (AlredyChecked == null) {
      return true;
    } else {
      return AlredyChecked.hiringStatusId == NewRow.hiringStatusId && AlredyChecked.onBoardingCoordinator == NewRow.onBoardingCoordinator; // Added 29-09-2022
    }
  }

  showAllocateCandidateButton() {
    var checkedObj = this.corporateAllocationPendingList.find(e => e.checked == true); /* && e.hiringStatusId == 32 */
    return checkedObj == null ? false : true;
  }
  // Added 29-09-2022
  showReallocateCandidateButton() {
    var checkedObj = this.corporateAllocationAllocatedList.find(e => e.checked == true); /* && e.hiringStatusId == 32 */
    return checkedObj == null ? false : true;
  }
  onAllocateSingleCandidate(data) {
    this.allocationType = "S";
    this.createAllocateForm();
    this.sendToAllocationCandidateId = data.candidateId;
    this.getAllOnboardingCoordinator();
  }
  allocateAllCandidate() {
    this.allocationType = "A";
    this.sendToAllocationCandidateId = 0;
    this.createAllocateForm();
    this.getAllOnboardingCoordinator();
  }
  // Added 29-09-2022
  onReallocateSingleCandidate(data) {
    this.reallocationType = "S";
    this.sendToReallocationCandidateId = data.candidateId;
    this.createReallocateForm();
    this.saveformEdit.patchValue({
      onBoardingCoordinator: data.onBoardingCoordinator,
    })
    this.getAllOnboardingCoordinator();
  }
  reallocateAllCandidate() {
    this.reallocationType = "A";
    this.sendToReallocationCandidateId = 0;
    this.createReallocateForm();
    this.getAllOnboardingCoordinator();
    var onboardingCoordinatorIdForEdit = this.corporateAllocationAllocatedList.find(e => e.checked == true).onBoardingCoordinator;
    this.saveformEdit.patchValue({
      onBoardingCoordinator: onboardingCoordinatorIdForEdit,
    })
  }
  createReallocateForm() {
    this.saveformEdit = this.fb.group({
      candidateId: [''],
      onBoardingCoordinator: null,
      createdBy: [this.loginUserId],
      candidateOnBoardingCoordinatorId: 1
    });

  }



  getAllOnboardingCoordinator() {
    this.onBoardingCoordinatorList = [];
    for (var i = 0; i < this.verticals.length; i++) {
      if (this.verticals[i].verticalId.toString() == "1") {
        this.searchRoleUser.roleId = 24
      }
      else if (this.verticals[i].verticalId.toString() == "2") {
        this.searchRoleUser.roleId = 25
      }
      else if (this.verticals[i].verticalId.toString() == "3") {
        this.searchRoleUser.roleId = 26
      }
    }
    this.SpinnerService.show();
    //this.candidateService.getAllOnboardingManager(this.searchOnboardingManager).subscribe((result) => {
    this.commonService.getRoleWiseUser(this.searchRoleUser).subscribe((result) => {
      if (result) {
        this.onBoardingCoordinatorList = result;
        //console.log("Onboarding Coordinator", this.onBoardingCoordinatorList);
      }
      else {
        this.onBoardingCoordinatorList = [];
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }

  // getAllOnboardingCoordinator() {
  //   this.onBoardingCoordinatorList = [];
  //  // this.searchCoordinator.requisitionDetailId = this.requisitionDetailId.toString();
  //   this.corporateService.getAllOnboardingCorordinator(this.searchCoordinator).subscribe((result) => {
  //     if (result) {
  //       this.onBoardingCoordinatorList = result;
  //       console.log("Coordinator LIst",this.onBoardingCoordinatorList);

  //     }
  //     else {
  //       this.onBoardingCoordinatorList = [];

  //     }
  //   }, error => {
  //     console.log(error);
  //   }, () => {
  //     // this.loadSelectPicker();
  //   });
  // }
  onAllocateCandidateToCoordinator() {
    var dateofJoining: any[] = [];
    if (this.allocationType == "A") {
      this.corporateAllocationPendingList.forEach(element => {
        if (element.checked) {
          dateofJoining.push(element.dateofJoining)
        }
      })
    }
    if (this.allocationType == "S") {
      dateofJoining.push(this.corporateAllocationPendingList[0].dateofJoining)
    }
    // = this.corporateAllocationPendingList.map(item => item.dateofJoining)
    var obj = {}
    var onboardingEmailId = this.onBoardingCoordinatorList.find(e => e.autoUserId == this.saveform.value.onBoardingCoordinator).empEmailId;
    if (this.saveform.value.onBoardingCoordinator == null) {
      this.notificationService.showError("Please select Coordinator", "Error");
    } else if (this.defaultverticalId != this.selectedVerticalId) {    // Added this line later
      this.notificationService.showError("Cannot assign coordinator in different vertical , menu and filter vertical should be same", "Error");
    } else {
      if (this.allocationType == "A") {
        var candidateIdString = "";
        var flag = 0;
        this.corporateAllocationPendingList.forEach(element => {
          if (element.checked) {
            candidateIdString += (flag == 0 ? "" : ",") + element.candidateId.toString();
            flag = 1;
          }
        })
        obj = {
          candidateId: candidateIdString,
          createdBy: this.loginUserId,
          //OnBoardingCoordinator: this.saveform.value.onBoardingCoordinatetor, // was added by piu
          OnBoardingCoordinator: this.saveform.value.onBoardingCoordinator, // added by anif on 15-11-2022
          CandidateOnBoardingCoordinatorId: this.saveform.value.candidateOnBoardingCoordinatorId,
          // EmailId: this.onBoardingCoordinatorList[0].empEmailId, //commented out for wrong mail trigger on 29-11-2023
          EmailId: onboardingEmailId,
          JoiningDate: String(dateofJoining),
          ReallocationType: "S"
        }
        this.saveform.patchValue({
          candidateId: candidateIdString,
          createdBy: this.loginUserId
          //doctors: Number(this.saveform.value.doctors)7
        })
      } else {
        obj = {
          // candidateId: candidateIdString,
          candidateId: this.sendToAllocationCandidateId.toString(),
          createdBy: this.loginUserId,
          //OnBoardingCoordinator: this.saveform.value.onBoardingCoordinatetor, // was added by piu
          OnBoardingCoordinator: this.saveform.value.onBoardingCoordinator, // added by anif on 15-11-2022
          CandidateOnBoardingCoordinatorId: this.saveform.value.candidateOnBoardingCoordinatorId,
          //EmailId: this.onBoardingCoordinatorList[0].empEmailId, //commented out for wrong mail trigger on 29-11-2023
          EmailId: onboardingEmailId,
          JoiningDate: String(dateofJoining),
          ReallocationType: "S"
        }
        this.saveform.patchValue({
          // candidateId: candidateIdString,
          candidateId: this.sendToAllocationCandidateId.toString(),
          createdBy: this.loginUserId

        })
      }
      this.SpinnerService.show();
      //console.log("Save Allocate Obj", obj);
      //  this.corporateService.sendToAllocate(this.saveform.value).subscribe((result) => { 
      this.corporateService.sendToAllocate(obj).subscribe((result) => {    //Piu Biswas
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.createPendingSearchForm();
            //this.createAllocatedSearchForm();
            this.createAllocateForm();
            this.getCorporateAllocationPendingList();
            // this.loadDataTable();
            jQuery("#myModal").modal("hide");
            jQuery("#chkAllPending").prop("checked", false);
            jQuery(".custom-menu").hide();
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
  }
  onClickCancel() {
    this.saveform.reset();
    this.getAllOnboardingCoordinator();
  }
  onClickReallocatrCancel() {  // Added 29-09-2022
    this.saveformEdit.reset();
    this.getAllOnboardingCoordinator();
  }
  onReallocateCandidateToCoordinator() { // Added 29-09-2022
    // this.reallocationType = "A";
    // this.sendToReallocationCandidateId = 0;
    //var dateofJoining = this.corporateAllocationPendingList.map(item => item.dateofJoining)
    var dateofJoining: any[] = [];
    if (this.reallocationType == "A") {
      this.corporateAllocationAllocatedList.forEach(element => {
        if (element.checked) {
          dateofJoining.push(element.dateofJoining)
        }
      })
    }
    if (this.reallocationType == "S") {
      dateofJoining.push(this.corporateAllocationAllocatedList[0].dateofJoining)
    }
    var obj = {}
    if (this.saveformEdit.value.onBoardingCoordinator == null) {
      this.notificationService.showError("Please select Coordinator", "Error");
    } else if (this.defaultverticalId != this.selectedVerticalId) {    // Added this line later
      this.notificationService.showError("Cannot assign coordinator in different vertical , menu and filter vertical should be same", "Error");
    } else {
      if (this.reallocationType == "A") {
        var candidateIdString = "";
        var flag = 0;
        this.corporateAllocationAllocatedList.forEach(element => {
          if (element.checked) {
            candidateIdString += (flag == 0 ? "" : ",") + element.candidateId.toString();
            flag = 1;
          }
        })
        obj = {
          candidateId: candidateIdString,
          createdBy: this.loginUserId,
          OnBoardingCoordinator: this.saveform.value.onBoardingCoordinatetor,
          CandidateOnBoardingCoordinatorId: this.saveform.value.candidateOnBoardingCoordinatorId,
          EmailId: this.onBoardingCoordinatorList[0].empEmailId,
          JoiningDate: String(dateofJoining),
          ReallocationType: "S"
        }
        this.saveformEdit.patchValue({
          candidateId: candidateIdString,
          createdBy: this.loginUserId,
          //doctors: Number(this.saveformEdit.value.doctors)
        })
      } else {
        obj = {
          //candidateId: candidateIdString,
          candidateId: this.sendToReallocationCandidateId.toString(),
          createdBy: this.loginUserId,
          OnBoardingCoordinator: this.saveform.value.onBoardingCoordinatetor,
          CandidateOnBoardingCoordinatorId: this.saveform.value.candidateOnBoardingCoordinatorId,
          EmailId: this.onBoardingCoordinatorList[0].empEmailId,
          JoiningDate: String(dateofJoining),
          ReallocationType: "S"
        }
        this.saveformEdit.patchValue({
          candidateId: this.sendToReallocationCandidateId.toString(),
          createdBy: this.loginUserId
        })
      }
      this.SpinnerService.show();
      //console.log("Save Reallocate Obj", this.saveformEdit.value);
      //this.corporateService.sendToAllocate(this.saveformEdit.value).subscribe((result) => {
      this.corporateService.sendToAllocate(obj).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            //this.createPendingSearchForm();
            this.createAllocatedSearchForm();
            this.createReallocateForm();
            this.getCorporateAllocationAllocatedList();
            //this.loadDataTable();
            jQuery("#myModalEdit").modal("hide");
            jQuery("#chkAllAllocated").prop("checked", false);
            jQuery(".custom-menu").hide();
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
  }
  onClickUpdateJoningDate(data) {
    this.getCandidateJoningDate(data.candidateId);
  }
  getCandidateJoningDate(candidateId) {
    let joiningDateObj = {
      candidateId: candidateId.toString()
    }
    this.allJoiningDateInformation = [];
    this.SpinnerService.show();
    this.corporateService.getJoiningDateDetails(joiningDateObj).subscribe((result) => {
      if (result) {
        this.allJoiningDateInformation = result;
        this.modeofJoiningId = null;
        this.joiningDate = "";
        this.updatedJoiningDateArray = [];
        if (this.allJoiningDateInformation.length > 0) {
          let joiningCandidateObj = {
            CandidateId: this.allJoiningDateInformation[0].candidateId,
            RequisitionDetailId: this.allJoiningDateInformation[0].requisitionDetailId,
            DateofJoining: this.allJoiningDateInformation[0].dateofJoining,
            ModeofJoining: this.allJoiningDateInformation[0].modeofJoing,
            PositionCode: this.allJoiningDateInformation[0].positionCode,
            Remarks: this.allJoiningDateInformation[0].remarks,
            CandidateName: this.allJoiningDateInformation[0].candidateFullName
          }
          this.modeofJoiningId = this.allJoiningDateInformation[0].modeofJoing == 0 ? null : this.allJoiningDateInformation[0].modeofJoing;
          this.joiningDate = this.allJoiningDateInformation[0].dateofJoining;
          this.updatedJoiningDateArray.push(joiningCandidateObj);
        }
      }
      else {
        this.allJoiningDateInformation = [];
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      // this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }
  getModeOfJoining() {
    this.modeOfJoiningList = [];
    this.SpinnerService.show();
    this.corporateService.getAllModeOfJoining(this.searchModeOfJoining).subscribe((result) => {
      if (result) {
        this.modeOfJoiningList = result;
      }
      else {
        this.modeOfJoiningList = [];
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      // this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }
  onUpdateJoiningDate() {
    if (this.dtOfJoining.nativeElement.value == "") {
      this.notificationService.showError("Please select date", "Error");
    } else {
      this.updatedJoiningDateArray[0].DateofJoining = this.dtOfJoining.nativeElement.value;
      this.updatedJoiningDateArray[0].ModeofJoining = this.modeofJoiningId.toString();
      let finalSubmitObj = {
        CandidateJoiningDates: this.updatedJoiningDateArray,
        CreatedBy: this.loginUserId,
        EmailId: this.corporateAllocationPendingList[0].rmEmailId
      }
      this.SpinnerService.show();
      this.corporateService.updateJoiningDate(finalSubmitObj).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getCorporateAllocationPendingList()
            this.getCorporateAllocationAllocatedList()
            this.modeofJoiningId = null;
            this.dtOfJoining.nativeElement.value = "";
            this.joiningDate = "";
            this.loadDataTable();
            jQuery("#updateJoiningDateModal").modal("hide");
            jQuery(".custom-menu").hide();
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

  }
  onClickUpdateJoiningDateCancel() {
    this.updatedJoiningDateArray = [];
    this.modeofJoiningId = null;
  }

  openModalPopupRejectDeclineCallBack(statusId, candidateId, tabName) {
    this.actionName = "Declined";
    this.declaineCandidateId = candidateId;
    this.tabName == tabName;
  }
  ProcessCandidate() {
    var formdata = {
      candidateIds: this.declaineCandidateId.toString(),
      requisitionDetailId: 0,
      hiringStatusId: 55,
      createdBy: this.loginUserId,
      remarks: this.declineremarks
    }
    this.SpinnerService.show();
    this.requisitionService.updateRequisitionCandidateRejectDeclineCallBack(formdata).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          this.pendingFormSubmit();
          this.allocatedFormSubmit();
          jQuery(".close").click();
        }
      }
      else {
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }


}
