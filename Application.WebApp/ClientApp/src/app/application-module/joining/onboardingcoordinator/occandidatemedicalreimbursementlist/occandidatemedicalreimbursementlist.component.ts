import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../interfaces/common/doctor.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../interfaces/common/position.interface';
import { IJoinersList, IPendingScheduleBatchWise, IPendingScheduleIndividual, IScheduledBatchWise, IScheduledIndividually, IReportingVenueExists } from '../../../../interfaces/prejoining/joinerslist.interface';
import { IOnboardingCoordinator, ISearchOnboardingCoordinator, IVenue, ISearchVenue, IJoiningDocument, IWelcomeTemplate } from '../../../../interfaces/prejoining/onboardingcoordinator.interface';
import { ICandidateDetailData, ISearchCandidateDetail, IModeOfJoining, ISearchModeOfJoining } from '../../../../interfaces/preselection/candidate.interface';
import { IAssessemenrAssignReleaseList, IBatchAssessment, ICandidateAssessmentList, ISearchAssessmentAssignReleaseList } from '../../../../interfaces/joining/programcoordinator.interface';
import { LocationService } from '../../../../services/common/location/location.service';
import { CommonService } from '../../../../services/common/common/common.service';
import { FunctionService } from '../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../services/common/department/department.service';
import { PositionService } from '../../../../services/common/position/position.service';
import { RecruitmentmanagerService } from '../../../../services/prejoining/recruitmentmanager/recruitmentmanager.service';
import { ShareddataService } from '../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { CorporateallocationService } from '../../../../services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { OnboardingcoordinatorService } from '../../../../services/joining/onboardingcoordinator/onboardingcoordinator.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { IEmployeeNo, IOnboardingManager, IReassignHiringCandidateList, IsearchEmployeeNo, ISearchonboardingManager } from 'src/app/interfaces/joining/hiringteam.interface';
import { CandidateService } from 'src/app/services/preselection/candidate/candidate.service';
import { ICandidateMedicalReimbursementlist } from 'src/app/interfaces/joining/onboardingcoordinator.interface';
import { IFunctionDepartment, ISearchDepartment } from 'src/app/interfaces/common/department.interface';
import { ICandidateMedicalReimbursementDetails, ISearchCandidateMedicalReimbursement } from 'src/app/interfaces/joining/candidate.interface';
// import {JSZip} from "jszip";
import { saveAs } from "file-saver";
import { HttpEventType } from '@angular/common/http';
declare var jQuery: any;
declare var html2pdf: any;

@Component({
  selector: 'app-occandidatemedicalreimbursementlist',
  templateUrl: './occandidatemedicalreimbursementlist.component.html',
  styleUrls: ['./occandidatemedicalreimbursementlist.component.css']
})
export class OccandidatemedicalreimbursementlistComponent implements OnInit {

  searchFormMedicalReimbursement: FormGroup;
  @ViewChild('dtofJoiningFrom', { static: false }) dtofJoiningFrom: ElementRef;
  @ViewChild('dtofJoiningTo', { static: false }) dtofJoiningTo: ElementRef;
  @ViewChild('dateOfJoining', { static: false }) dtOfJoining: ElementRef;
  loginUserId: number;
  verticalIds: string;
  roleIds: string;
  requisitionDetailId: number;
  //vertical
  verticals: IVertical[] = [];
  verticalsPopUp: IVertical[] = [];
  selectedPendingVertical: IVertical;
  selectedVerticalId: number;
  defaultverticalId: number;
  //location
  zipFileName: string = "";
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
  // Department

  departments: IFunctionDepartment[] = [];
  selectedDepartment: IFunctionDepartment;
  searchDepartment: ISearchDepartment = {
    departmentId: null,
    functionId: null,
    verticalId: null,
    isActive: true
  }
  allcandidatemedicalReimbursementDetails: any[] = [];
  //
  medicalReimbursementList: ICandidateMedicalReimbursementlist[] = [];
  medicalReimbursementProcessedList: ICandidateMedicalReimbursementlist[] = [];
  selectAll_pending: boolean;
  selectAll_processed: boolean;
  popupText: string;
  claimStatus: number;
  claimRemarks: string = "";
  callngIfFunction: boolean = true;
  showbtnforproccess: boolean = false;
  oh; boolead = false;//oh-onboarding head
  // Download PDF
  medicalReimbursementDetails: ICandidateMedicalReimbursementDetails;
  searchCandidateMedicalReimbursement: ISearchCandidateMedicalReimbursement = {
    candidateMedicalReimbursementId: null,
    requisitionDetailId: null,
    candidateId: null,
    empId: null,
  }
  medicalReimbursementData: any;
  canid: any;//for ohlogin
  canmedremid: any;//for ohlogin
  reqdetid: any;//for ohlogin
  singleapprove: number = 0;//for ohlogin
  activeTabNameShow: string = "Pending";
  activeTabName: string;

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
    private SpinnerService: NgxSpinnerService, public activatedRoute: ActivatedRoute,
    private titleService: Title,
    private positionService: PositionService,
    private onboardingCordinatorService: OnboardingcoordinatorService,
    private candidateService: CandidateService,
    private departmentService: DepartmentService,
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.roleIds = this.persistance.get('loggedinuser').roleIds;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.activeTabName = this.persistance.get("activeTabName");
    if (this.activeTabName != null) {
      this.activeTabNameShow = this.activeTabName;
    }
    this.persistance.set('activeTabName', null);
    this.createMedicalReimbursementSearchForm();
    this.getAllVerticals();
    this.loadDataTable();
    this.loadDataTable2();

  }

  ngOnInit() {
    this.getAllCandidateMedicalReimbursementList();
    this.getAllCandidateMedicalReimbursementProccessedList();
    this.loadDatePicker();
    this.tableOptionDropDown();
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
          "left": 4
        }
      });
    });
  }
  loadDataTable2() {
    jQuery('#dataTable2').dataTable().fnClearTable();
    jQuery('#dataTable2').dataTable().fnDestroy();
    setTimeout(() => {
      // jQuery('#dataTable1').DataTable({
      //   "searching": false,
      //   "paging": true,
      //   "scrollX": true,
      //   "bLengthChange": false,
      // });
      jQuery('#dataTable2').dataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "order": [],
        "fixedColumns": {
          "left": 4
        }
      });
    });
    // jQuery('#dataTable2').DataTable().clear().destroy();
    // setTimeout(() => {
    //   jQuery('#dataTable2').DataTable({
    //     "searching": false,
    //     "paging": true,
    //     "scrollX": true,
    //     "bLengthChange": false,
    //   });
    // });
  }
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
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
  //verticals
  getAllVerticals(): void {
    this.verticals = [];
    var splitroleIds = this.roleIds.split(",");
    for (var j = 0; j < splitroleIds.length; j++) {
      if (splitroleIds[j] == '49') {
        this.oh = true;
        this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true },
          { verticalId: 2, verticalName: "Plant", isActive: true },
          { verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
      }
      else {
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
        //console.log("checking", this.oh)
      }

    }
    this.SpinnerService.hide();
    this.selectedPendingVertical = this.verticals[0];
    this.defaultverticalId = this.selectedPendingVertical.verticalId;
    this.selectedVerticalId = this.defaultverticalId;
    this.getAllLocation();
    this.getAllFunction();
  }
  //locations
  getAllLocation() {
    this.locations = [];
    this.searchLocation.verticalId = this.selectedVerticalId;
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
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }

  //Function
  getAllFunction() {
    this.functions = [];
    this.searchFunction.verticalId = this.defaultverticalId;
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
  onChangeFunction() {
    this.searchDepartment.functionId = this.searchFormMedicalReimbursement.get("function").value;
    this.getAllDepartment();
  }
  //department
  getAllDepartment() {
    this.departments = [];
    // this.searchDepartment.verticalId = this.StaticVerticalId;
    this.departmentService.getAllFunctionDepartment(this.searchDepartment).subscribe((result) => {
      if (result) {
        this.departments = result;
        //console.log("Department", this.departments);
      }
      else {
        this.departments = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  createMedicalReimbursementSearchForm() {
    this.searchFormMedicalReimbursement = this.fb.group({
      candidateId: null,
      requisitionDetailId: null,
      candidateMedicalReimbursementId: null,
      dtofJoiningFrom: "",
      dtofJoiningTo: "",
      empNo: "",
      name: "",
      location: null,
      function: null,
      department: null,
      approvalStatus: 0
    });
  }
  getAllCandidateMedicalReimbursementList() {
    this.medicalReimbursementList = [];
    //  console.log("Search Medical Reimbursement Obj", this.searchFormMedicalReimbursement.value);
    this.onboardingCordinatorService.getCandidateMedicalReimbursement(this.searchFormMedicalReimbursement.value).subscribe((result) => {
      if (result) {
        this.medicalReimbursementList = result;
        this.medicalReimbursementList = this.medicalReimbursementList.filter(e => e.approvalStatus == 1);
        // console.log("Candiaddate Medical ReimbursementPending List", this.medicalReimbursementList);
        this.SpinnerService.hide();
      }
      else {
        this.medicalReimbursementList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      // this.loadDataTable();
      setTimeout(() => {
        this.tableOptionDropDown();
      });
      this.SpinnerService.hide();
    });
  }
  getAllCandidateMedicalReimbursementProccessedList() {
    this.medicalReimbursementProcessedList = [];
    //   console.log("Serach Processed list obj", this.searchFormMedicalReimbursement.value);
    this.onboardingCordinatorService.getCandidateMedicalReimbursement(this.searchFormMedicalReimbursement.value).subscribe((result) => {
      if (result) {
        this.medicalReimbursementProcessedList = result;
        this.medicalReimbursementProcessedList = this.medicalReimbursementProcessedList.filter(e => e.approvalStatus == 2 || e.approvalStatus == 3 || e.approvalStatus == 4);
        // console.log("Medical Reimbursement Processed list ", this.medicalReimbursementList);
        this.SpinnerService.hide();
      }
      else {
        this.medicalReimbursementProcessedList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.loadDataTable2();
      setTimeout(() => {
        this.tableOptionDropDown();
      });
      this.SpinnerService.hide();
    });
  }
  onSearchMedicalReimbursement() {
    this.searchFormMedicalReimbursement.patchValue(
      {
        dtofJoiningFrom: this.dtofJoiningFrom.nativeElement.value,
        dtofJoiningTo: this.dtofJoiningFrom.nativeElement.value,
        //approvalStatus: null
        //approvalStatus: 1
      });
    this.getAllCandidateMedicalReimbursementList();
    this.loadDataTable();  // added for data table issue
  }
  onResetPendingClick() {
    this.searchFormMedicalReimbursement.reset();
    //this.searchFormMedicalReimbursement.patchValue(
    //  {
    //    approvalStatus: 1
    //  });
    this.getAllCandidateMedicalReimbursementList();
  }

  onCheckSelectAll_Pending(eve) {
    var firstHiringStatusId = this.medicalReimbursementList[0].approvalStatus;
    var flag = 0;
    this.medicalReimbursementList.forEach(element => {
      if (element.approvalStatus != firstHiringStatusId) {
        flag = 1
      }
    })
    if (flag == 0) {
      this.medicalReimbursementList.forEach(element => {
        element.checked = eve.target.checked;
      })
    } else {
      jQuery("#chkAll_pending").prop("checked", false);
      this.notificationService.showError("Please select same approval status", "Error");
    }
  }
  onCheckSelectAll_Processed(eve) {
    this.showbtnforproccess = true
    var firstHiringStatusId = this.medicalReimbursementProcessedList[0].approvalStatus;
    var flag = 0;
    this.medicalReimbursementProcessedList.forEach(element => {
      if (element.approvalStatus != firstHiringStatusId) {
        flag = 1
      }
    })
    if (flag == 0) {
      this.medicalReimbursementProcessedList.forEach(element => {
        element.checked = eve.target.checked;
      })
    } else {
      jQuery("#chkAll_processed").prop("checked", false);
      this.notificationService.showError("Please select same approval status", "Error");
    }
  }
  onClickSendBackToCandidate() {
    this.popupText = "Send Back to Candidate";
    this.claimStatus = 2;
  }
  onClick_sendbacktocandidate(data) {
    this.popupText = "Send Back to Candidate";
    this.claimStatus = 2;
    this.canid = data.candidateId.toString();
    this.canmedremid = data.candidateMedicalReimbursementId.toString();
    this.reqdetid = data.requisitionDetailId.toString();
    this.singleapprove = 1;
  }//for ohlogin
  onClickApprove() {
    this.popupText = "Approve";
    this.claimStatus = 3;
    this.singleapprove = 0;
  }
  onClick_approve(data) {
    // console.log("data", data)
    this.popupText = "Approve";
    this.claimStatus = 3;
    this.canid = data.candidateId.toString();
    this.canmedremid = data.candidateMedicalReimbursementId.toString();
    this.reqdetid = data.requisitionDetailId.toString();
    this.singleapprove = 1;
  }//for ohlogin
  onClickReject() {
    this.popupText = "Reject";
    this.claimStatus = 4;
  }
  onClick_reject(data) {
    this.popupText = "Reject";
    this.claimStatus = 4;
    this.canid = data.candidateId.toString();
    this.canmedremid = data.candidateMedicalReimbursementId.toString();
    this.reqdetid = data.requisitionDetailId.toString();
    this.singleapprove = 1;
  }//for ohlogin
  getEnableStatus(data) {
    return data.checked;
  }
  onCheckRowWise(data, eve, index) {

    if (this.GetSelectedHiringStatus(data)) {
      data.checked = eve.target.checked;

      if (data.checked == true) {
        this.showbtnforproccess = true;
        //this.SpinnerService.show();
        // this.getAllCandidateMedicalReimDetails(data.candidateId,data.requisitionDetailId);
        // var candidateId=data.candidateId;
        // setTimeout(() => {
        //   var value=document.getElementById("printMedicalReimbursementForzip").innerHTML;
        //   this.allcandidatemedicalReimbursementDetails.push({
        //     EmpId: candidateId,
        //     Documentstring:value
        //   });
        //   this.SpinnerService.hide();
        // },500);
        this.allcandidatemedicalReimbursementDetails.push({ CandidateId: data.candidateId.toString(), EmpNo: data.empNo, EmpName: data.candidateFullName, RequisitionDetailsId: data.requisitionDetailId });
      }
      else if (data.checked == false) {
        this.showbtnforproccess = false;
        this.allcandidatemedicalReimbursementDetails = this.allcandidatemedicalReimbursementDetails.filter(e => e != data.candidateId.toString());
      }
    }
    else {
      jQuery("#" + index).prop("checked", false);
      this.notificationService.showError("Please select same Approval status", "Error");
    }
  }
  onCheckRowWiseProcessed(data, eve, index) {
    if (this.GetSelectedHiringStatusProcessed(data)) {
      data.checked = eve.target.checked;

      if (data.checked == true) {
        this.showbtnforproccess = true;
        //this.SpinnerService.show();
        // this.getAllCandidateMedicalReimDetails(data.candidateId,data.requisitionDetailId);
        // var candidateId=data.candidateId;
        // setTimeout(() => {
        //   var value=document.getElementById("printMedicalReimbursementForzip").innerHTML;
        //   this.allcandidatemedicalReimbursementDetails.push({
        //     EmpId: candidateId,
        //     Documentstring:value
        //   });
        //   this.SpinnerService.hide();
        // },500);
        this.allcandidatemedicalReimbursementDetails.push({ CandidateId: data.candidateId.toString(), EmpNo: data.empNo, EmpName: data.candidateFullName, RequisitionDetailsId: data.requisitionDetailId });
      }
      else if (data.checked == false) {
        this.showbtnforproccess = false;
        this.allcandidatemedicalReimbursementDetails = this.allcandidatemedicalReimbursementDetails.filter(e => e != data.candidateId.toString());
      }
    }
    else {
      jQuery("#" + index).prop("checked", false);
      this.notificationService.showError("Please select same Approval status", "Error");
    }
  }
  showActionButton() {
    var checkedObj = this.medicalReimbursementList.find(e => e.checked == true); //&& e.hiringStatusId == 52
    return checkedObj == null ? false : true;
  }
  showActionButtonProcessed() {
    var checkedObj = this.medicalReimbursementProcessedList.find(e => e.checked == true); //&& e.hiringStatusId == 52
    return checkedObj == null ? false : true;
  }
  GetSelectedHiringStatus(NewRow) {
    var AlredyChecked = this.medicalReimbursementList.find(e => e.checked);
    if (AlredyChecked == null) {
      return true;
    } else {
      return AlredyChecked.approvalStatus == NewRow.approvalStatus;
    }
  }
  GetSelectedHiringStatusProcessed(NewRow) {
    var AlredyChecked = this.medicalReimbursementProcessedList.find(e => e.checked);
    if (AlredyChecked == null) {
      return true;
    } else {
      return AlredyChecked.approvalStatus == NewRow.approvalStatus;
    }
  }
  onClickPendingTab() {
    this.medicalReimbursementList = [];
    jQuery("#chkAll_pending").prop("checked", false);
    // this.searchFormMedicalReimbursement.patchValue(
    //   {
    //     approvalStatus: 1                              // Commented because of datatable issue
    //   });
    this.getAllCandidateMedicalReimbursementList();   // Commented because of datatable issue
  }
  onClickProcessedTab() {
    this.medicalReimbursementProcessedList = [];
    jQuery("#chkAll_processed").prop("checked", false);
    // this.searchFormMedicalReimbursement.patchValue(
    //   {
    //     approvalStatus: null                                   // Commented because of datatable issue
    //   });
    this.getAllCandidateMedicalReimbursementProccessedList();   // Commented because of datatable issue
  }
  onSearchMedicalReimbursementProcessed() {
    this.medicalReimbursementProcessedList = [];
    this.searchFormMedicalReimbursement.patchValue(
      {
        dtofJoiningFrom: this.dtofJoiningFrom.nativeElement.value,
        dtofJoiningTo: this.dtofJoiningFrom.nativeElement.value,
        //approvalStatus: null
      });
    this.getAllCandidateMedicalReimbursementProccessedList();
    // this.loadDataTable2();   // added for data table issue
  }
  onResetClick() {
    this.searchFormMedicalReimbursement.reset();
    this.searchFormMedicalReimbursement.patchValue(
      {
        approvalStatus: 0
      });
    this.getAllCandidateMedicalReimbursementProccessedList();
  }
  onSubmitClaim() {
    var flag = 0;
    var msg = "";
    if (this.claimRemarks == "") {
      flag = 1;
      msg = "Please Enter Remarks";
    }
    else {

    }
    if (flag == 0 && this.singleapprove != 1) {
      var candidateNoString = "";
      var requisitionDetailIdString = "";
      var candidateMedicalReimbursementIdString = "";
      var cflag = 0;
      var canflag = 0;
      var reqflag = 0;
      this.medicalReimbursementList.forEach(element => {
        if (element.checked) {
          candidateNoString += (cflag == 0 ? "" : ",") + element.candidateId.toString();
          cflag = 1;
          candidateMedicalReimbursementIdString += (canflag == 0 ? "" : ",") + element.candidateMedicalReimbursementId.toString();
          canflag = 1;
          requisitionDetailIdString += (reqflag == 0 ? "" : ",") + element.requisitionDetailId.toString();
          reqflag = 1;
        }
      })

      let obj = {
        candidateMedicalReimbursementId: candidateMedicalReimbursementIdString,
        //candidateMedicalReimbursementId: null,
        requisitionDetailId: requisitionDetailIdString,
        candidateId: candidateNoString,
        approvalStatus: this.claimStatus,
        approvalRemarks: this.claimRemarks,
        createdBy: this.loginUserId
      }
      this.SpinnerService.show();
      console.log("Medical ReimbursementSave", obj);

      this.onboardingCordinatorService.saveMedicalClaimStatus(obj).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.loadDataTable();
            this.loadDataTable2()
            jQuery(".custom-menu").hide();
            jQuery("#myModal").modal("hide");
            jQuery("#onCheckSelectAll").prop("checked", false);
            jQuery("#chkAll_processed").prop("checked", false);
            jQuery("#chkAll_pending").prop("checked", false);
            this.showbtnforproccess = false;
            this.onClickPendingTab();
            this.claimRemarks = "";
            // this.onClickProcessedTab();

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
    else if (flag == 0 && this.singleapprove == 1) {//for ohlogin
      let obj = {
        candidateMedicalReimbursementId: this.canmedremid,
        //candidateMedicalReimbursementId: null,
        requisitionDetailId: this.reqdetid,
        candidateId: this.canid,
        approvalStatus: this.claimStatus,
        approvalRemarks: this.claimRemarks,
        createdBy: this.loginUserId
      }
      this.SpinnerService.show();
      //console.log("Medical ReimbursementSave", obj);

      this.onboardingCordinatorService.saveMedicalClaimStatus(obj).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.loadDataTable();
            this.loadDataTable2()
            jQuery(".custom-menu").hide();
            jQuery("#myModal").modal("hide");
            jQuery("#onCheckSelectAll").prop("checked", false);
            jQuery("#chkAll_processed").prop("checked", false);
            jQuery("#chkAll_pending").prop("checked", false);
            this.showbtnforproccess = false;
            this.onClickPendingTab();
            this.claimRemarks = "";
            this.singleapprove = 0;
            // this.onClickProcessedTab();

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
    }//for ohlogin added by Sayandeep
    else {
      this.notificationService.showError(msg, "Error");
    }

  }
  onClickViewDetailsForPending(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('activeTabName', "Pending");
    this._route.navigate(['/app/oc-view-medical-reimbursement-details'], { queryParams: { CandidateId: data.candidateId, CandidateMedicalReimbursementId: data.candidateMedicalReimbursementId } });
  }
  onClickViewDetailsForProcessed(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('activeTabName', "Processed");
    this._route.navigate(['/app/oc-view-medical-reimbursement-details'], { queryParams: { CandidateId: data.candidateId, CandidateMedicalReimbursementId: data.candidateMedicalReimbursementId } });
  }
  onCancelClick() {
    this.claimRemarks = "";
  }
  onClickDownload(data) {
    // console.log("data to download pdf", data);
    this.searchCandidateMedicalReimbursement.candidateId = data.candidateId;
    this.searchCandidateMedicalReimbursement.requisitionDetailId = data.requisitionDetailId;
    this.candidateService.getCandidateMedicalReimbursementDetails(this.searchCandidateMedicalReimbursement).subscribe((result) => {
      if (result) {
        this.medicalReimbursementDetails = result;
        this.medicalReimbursementData = this.medicalReimbursementDetails;
        // console.log("Medical Reimbursement Details", this.medicalReimbursementDetails);

        this.SpinnerService.hide();
      }
      else {
        //this.candidateAssessmentDataList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      setTimeout(() => {
        this.loadDatePicker();
        this.downloadMedicalReimbursement(data);
      }, 1000);
      this.SpinnerService.hide();
    });

  }
  downloadMedicalReimbursement(data) {
    var htmlstring = document.getElementById("printMedicalReimbursement").innerHTML;
    var dom = document.createElement('div');
    dom.innerHTML = htmlstring;
    html2pdf(dom, {
      margin: 6,
      filename: data.empNo + "_Medical_Reimbursement.pdf",
      image: { type: 'jpeg', quality: 0.98 },
      //html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      html2canvas: { scale: 3, y: 0, scrollY: 0 },
      //jsPDF: { format: 'A4' },
      //jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } // landscape
      jsPDF: { format: 'A4', orientation: 'portrait' },
    });

  }
  downloadAllDocuments() {

    //this.SpinnerService.show();
    var candidatestring = "";
    // for (var val of this.allcandidatemedicalReimbursementDetails) {
    //   candidatestring += val + ","
    // }
    if (this.allcandidatemedicalReimbursementDetails.length > 0) {
      var firstCandidateDetails = this.allcandidatemedicalReimbursementDetails[0]
      this.downloadMultipleZip(firstCandidateDetails);
    }
  }
  downloadMultipleZip(record) {
    this.zipFileName = record.EmpNo + "_" + record.EmpName.split('.').join("").split(' ').join("") + "_Medical_Reimbursement_Document_Details";
    let obj = {
      //requisitionDetailId: this.requisitionDetailId,
      requisitionDetailId: record.RequisitionDetailsId,
      // CandidateId: candidatestring.slice(0, -1)
      CandidateId: record.CandidateId
    };
    this.onboardingCordinatorService.downloadFileForPreEmployeeMedical(obj).subscribe(
      data => {
        switch (data.type) {
          case HttpEventType.DownloadProgress:
            break;
          case HttpEventType.Response:
            const downloadedFile = new Blob([data.body], { type: data.body.type });
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = this.zipFileName;
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.click();
            document.body.removeChild(a);

            // For downloading next employee doc
            this.allcandidatemedicalReimbursementDetails = this.allcandidatemedicalReimbursementDetails.filter(e => e.EmpNo != record.EmpNo);
            if (this.allcandidatemedicalReimbursementDetails.length > 0) {
              this.downloadMultipleZip(this.allcandidatemedicalReimbursementDetails[0]);
            } else {
              this.getAllCandidateMedicalReimbursementList();
            }
            break;
        }
        this.SpinnerService.hide();

      },
      error => {
      }
    );
  }

  getAllCandidateMedicalReimDetails(candiadteId, requisitionDetailId) {
    this.searchCandidateMedicalReimbursement.candidateMedicalReimbursementId = null;
    this.searchCandidateMedicalReimbursement.requisitionDetailId = requisitionDetailId;
    this.searchCandidateMedicalReimbursement.candidateId = candiadteId;
    this.searchCandidateMedicalReimbursement.empId = null;
    this.candidateService.getCandidateMedicalReimbursementDetails(this.searchCandidateMedicalReimbursement).subscribe((result: any[]) => {
      if (result) {
        this.medicalReimbursementData = result;
        //console.log("Medical Reimbursement Details", this.medicalReimbursementData);

        //this.SpinnerService.hide();
      }
      else {
        // this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      //this.SpinnerService.hide();
    }, () => {
      //this.SpinnerService.hide();
    });
  }
  openFile(blobName: string): void {
    let regex = /\.net(.*)/;
    let match = blobName.match(regex);
    let extractedString = match ? match[1] : '';
    let filename = extractedString.split('/')[2];
    let containername = extractedString.split('/')[1];
    this.locationService.getTestfile(filename, containername).subscribe(response => {
      let blob: Blob = response.body as Blob;
      const url = window.URL.createObjectURL(blob);

      // Open the file in a new tab
      window.open(url);
    }, error => {
      console.error('Failed to download file:', error);
    });
  }
}
