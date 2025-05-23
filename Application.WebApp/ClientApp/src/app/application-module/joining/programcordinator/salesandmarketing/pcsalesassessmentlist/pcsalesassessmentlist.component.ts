import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../../interfaces/common/doctor.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../../interfaces/common/function.interface';
import { IAssessemenrAssignReleaseList, IBatchAssessment, ICandidateAssessmentList, ISearchAssessmentAssignReleaseList, ISearchEvaluateFeedbackListBatch, IEvaluateFeedbackListBatchNew } from '../../../../../interfaces/joining/programcoordinator.interface';
import { LocationService } from '../../../../../services/common/location/location.service';
import { CommonService } from '../../../../../services/common/common/common.service';
import { FunctionService } from '../../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../../services/common/department/department.service';
import { PositionService } from '../../../../../services/common/position/position.service';
import { RecruitmentmanagerService } from '../../../../../services/prejoining/recruitmentmanager/recruitmentmanager.service';
import { ShareddataService } from '../../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { environment } from '../../../../../../environments/environment';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { CorporateallocationService } from '../../../../../services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { ProgramcoordinatorService } from '../../../../../services/joining/programcoordinator/programcoordinator.service';
import { RequisitionService } from 'src/app/services/preselection/requisition/requisition.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
declare var jQuery: any;


@Component({
  selector: 'app-pcsalesassessmentlist',
  templateUrl: './pcsalesassessmentlist.component.html',
  styleUrls: ['./pcsalesassessmentlist.component.css']
})
export class PcsalesassessmentlistComponent implements OnInit {

  searchFormIndividual: FormGroup;
  searchFormBatchwise: FormGroup;
  @ViewChild('dtofJoiningFrom', { static: false }) dtofJoiningFrom: ElementRef;
  @ViewChild('dtofJoiningTo', { static: false }) dtofJoiningTo: ElementRef;
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  assessmentStatusList: any[] = [];
  candidateAssessmentList: ICandidateAssessmentList[] = [];
  assessmentListBatchWise: IBatchAssessment[] = [];
  assessmentAssignReleaseList: IAssessemenrAssignReleaseList[] = [];
  searchAssessmentAssignReleaseList: ISearchAssessmentAssignReleaseList = {
    batchId: null,
    candidateId: "",
  }
  selectedFeedback: any[] = [];
  //vertical
  verticals: IVertical[] = [];
  verticalsPopUp: IVertical[] = [];
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
  assessmentAssignReleaseType: string;
  assessmentAssignRealeaseNo: string;
  assessmentAssignRealeaseId: number;
  selectAll: boolean;
  candidateIdString: string = "";
  candidateNoString: string = "";
  callngIfFunction: boolean = true;
  releaseAssessmentMode: string;
  activeTabNameShow: string = "Individual";
  activeTabName: string;
  actionName: string;
  discontinueRemarks: string;
  declaineCandidateId: number;
  candidateWiseAssesmentLists: any[] = [];
  candidateWiseAssesmentList: any[] = [];
  feedbackWiseAssesmentList: any[] = [];
  candidateWiseFeedbackLists: any[] = [];

  feedbackFormatedDetails: any[] = [];
  releaseFeedbackMode: string;
  feedbackAssignReleaseType: string;
  feedbackAssignRealeaseNo: string;
  feedbackAssignRealeaseId: number;
  searchFeedbackAssignReleaseList: ISearchEvaluateFeedbackListBatch = {
    batchId: null,
    candidateId: null,
    coOrdinatiorId: null,
  }
  feedbackAssignReleaseList: IEvaluateFeedbackListBatchNew;
  evaluateFeedbackDetails: any[] = [];
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
    private programcoordinatorService: ProgramcoordinatorService,
    private requisitionService: RequisitionService,
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.activeTabName = this.persistance.get("activeTabName");
    if (this.activeTabName != null) {
      this.activeTabNameShow = this.activeTabName;
    }
    this.persistance.set('activeTabName', null);
    //alert(this.verticalIds);
    this.requisitionDetailId = this.persistance.get('paramid');
    this.assessmentStatusList.push({ statusId: 1, statusname: "Not Assigned" }, { statusId: 2, statusname: "Evaluation Completed" });
    this.creatSearchFormIndividual();
    this.createSearchFormBatcWise();
    this.getAllVerticals();
    this.getIndividualAssessment();
    this.getBatchWiseAssessment();
  }

  ngOnInit() {
    this.loadDataTable();
    this.loadDataTable2();
    this.loadDatePicker();
    this.tableOptionDropDown();
  }
  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "fixedColumns": {
          "left": 4
        }
      });
    });
  }
  loadDataTable2() {
    jQuery('#dataTable2').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable2').DataTable({
        "searching": false,
        "paging": true,
        "scrollX": false,
        "bLengthChange": false,
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
  creatSearchFormIndividual() {
    this.searchFormIndividual = this.fb.group({
      candidateId: null,
      batchId: null,
      candidateNo: [''],
      name: [''],
      empNo: [''],
      location: null,
      function: null,
      assesmentStatus: null,
      coOrdinatorId: null,
      verticalId: 3
    });
  }
  createSearchFormBatcWise() {
    this.searchFormBatchwise = this.fb.group({
      batchNo: "",
      coOrdinatiorId: null,
      assesmentStatus: null,
      dtofJoiningFrom: "",
      dtofJoiningTo: "",
      verticalId: 3
    });
  }
  //verticals
  getAllVerticals() {
    this.verticals = [];
    var splitvertical = this.verticalIds.split(",");
    var allvertical = "";
    // for (var i = 0; i < splitvertical.length; i++) {
    //   if (splitvertical[i] != "0") {
    // if (splitvertical[i] == "1") {
    //   this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    // }
    // else if (splitvertical[i] == "2") {
    //   this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    // }
    // else if (splitvertical[i] == "3") {
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    //}
    //     if (allvertical == "") {
    //       allvertical = splitvertical[i];
    //     }
    //     else {
    //       allvertical = allvertical + "," + splitvertical[i];
    //     }
    //   }

    // }
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
    }, () => {
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
    }, () => {

    });
  }
  showIndividualAssessment() {
    jQuery("#chkAll").prop("checked", false);
    this.getIndividualAssessment();
  }
  showBatchWiseAssessment() {
    this.getBatchWiseAssessment();
  }
  onSearchBatchwise() {
    this.searchFormBatchwise.patchValue(
      {
        dtofJoiningFrom: this.dtofJoiningFrom.nativeElement.value,
        dtofJoiningTo: this.dtofJoiningFrom.nativeElement.value
      });
    this.getBatchWiseAssessment();
  }
  onSearchIndividual() {
    this.getIndividualAssessment();
  }
  onResetClickIndividual() {
    this.searchFormIndividual.reset();
    this.getIndividualAssessment();
  }
  onClickBatchwiseReset() {
    this.createSearchFormBatcWise();
    this.getBatchWiseAssessment();
  }
  getIndividualAssessment() {
    this.candidateAssessmentList = [];
    this.programcoordinatorService.getAllCandidateAssessment(this.searchFormIndividual.value).subscribe((result) => {
      if (result) {
        //this.candidateAssessmentList = result;
        this.candidateAssessmentList = result.candidateAssessmentReleaseList;
        this.candidateWiseAssesmentLists = result.candidateWiseAssesment;
        this.candidateWiseFeedbackLists = result.candidateWiseFeedback;
        this.SpinnerService.hide();
      }
      else {
        this.candidateAssessmentList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.loadDataTable();
      this.SpinnerService.hide();
    });
  }
  onCheckSelectAll(eve) {
    if (this.candidateAssessmentList.length > 0) {
      // var firstHiringStatusId = this.candidateAssessmentList[0].hiringStatusId;
      // var flag = 0;
      this.candidateAssessmentList.forEach(element => {
        element.checked = eve.target.checked;
      })
    } else {
      jQuery("#chkAll").prop("checked", false);
      this.notificationService.showError("No data to select", "Error");
    }
  }
  getEnableStatus(data) {
    return data.checked;
  }
  onCheckRowWise(data, eve) {
    data.checked = eve.target.checked;
  }
  getBatchWiseAssessment() {
    this.assessmentListBatchWise = [];
    this.programcoordinatorService.getAllAssessmentRealeaseBatchWise(this.searchFormBatchwise.value).subscribe((result) => {
      if (result) {
        this.assessmentListBatchWise = result;
        this.SpinnerService.hide();
      }
      else {
        this.assessmentListBatchWise = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.loadDataTable2();
      this.SpinnerService.hide();
    });
  }

  onClickReleaseAssment(data, Type) {
    this.releaseAssessmentMode = "I";
    if (Type == "Batch") {
      this.assessmentAssignReleaseType = "Batch";
      this.assessmentAssignRealeaseNo = data.batchNo;
      this.assessmentAssignRealeaseId = data.batchId;
      this.searchAssessmentAssignReleaseList.batchId = data.batchId;
      this.searchAssessmentAssignReleaseList.candidateId = "";
    } else {
      this.assessmentAssignReleaseType = "Candidate";
      this.assessmentAssignRealeaseNo = data.candidateNo;
      this.assessmentAssignRealeaseId = data.candidateId;
      this.searchAssessmentAssignReleaseList.batchId = null;
      this.searchAssessmentAssignReleaseList.candidateId = data.candidateId.toString();
    }
    this.getAssessmentAssignReleaseList();
  }
  btnClickReleaseAssessment() {
    this.releaseAssessmentMode = "M";
    this.candidateIdString = "";
    var flag = 0;
    this.candidateAssessmentList.forEach(element => {
      if (element.checked) {
        this.candidateIdString += (flag == 0 ? "" : ",") + element.candidateId.toString();
        this.candidateNoString += (flag == 0 ? "" : ",") + element.candidateNo.toString();
        flag = 1;
      }
    })
    this.searchAssessmentAssignReleaseList.batchId = null;
    this.searchAssessmentAssignReleaseList.candidateId = this.candidateIdString.toString();
    this.assessmentAssignReleaseType = "Candidate";
    this.assessmentAssignRealeaseNo = this.candidateNoString;
    this.getAssessmentAssignReleaseList();
  }
  getAssessmentAssignReleaseList() {
    this.assessmentAssignReleaseList = [];
    this.programcoordinatorService.getAssessmentAssingReleaseDetails(this.searchAssessmentAssignReleaseList).subscribe((result) => {
      if (result) {
        this.assessmentAssignReleaseList = result;
        this.SpinnerService.hide();
      }
      else {
        this.assessmentAssignReleaseList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }
  getAssignedStatus(data) {
    return data.isAssigned;
  }
  onCheckAssign(eve, data) {
    data.isAssigned = eve.target.checked;
  }
  onClickRelease() {
    this.SpinnerService.show();
    const formData = new FormData();
    var TrainingTitle: any[] = [];//Piu
    for (var val of this.assessmentAssignReleaseList) {
      if (val.isAssigned == true && val.isChecked == false) {
        let obj = {
          TrainingTitle: val.traingTitle
        }
        TrainingTitle.push(obj);
      }
    }
    TrainingTitle.push(this.assessmentAssignReleaseList.map(item => item.traingTitle)); //Piu
    formData.append("BatchId", this.assessmentAssignReleaseType == "Batch" ? this.assessmentAssignRealeaseId.toString() : "0");
    formData.append("CandidateId", this.assessmentAssignReleaseType == "Candidate" ? (this.releaseAssessmentMode == "M" ? this.candidateIdString : this.assessmentAssignRealeaseId.toString()) : "");
    var AssessementAssignReleaseDetails = [];
    this.assessmentAssignReleaseList.forEach(element => {
      let obj = {
        AssessmentAssignId: element.assessmentAssignId,
        AssessmentId: element.assessmentId,
        CandidateInductionScheduleDetailsId: element.candidateInductionScheduleDetailsId,
        IsAssigned: element.isAssigned
      }
      AssessementAssignReleaseDetails.push(obj);
    })
    formData.append("AssessementAssignReleaseDetails", JSON.stringify(AssessementAssignReleaseDetails));
    formData.append("CreatedBy", this.loginUserId.toString());
    formData.append("Password", "welcome@1234");//Piu
    formData.append("TrainingTitle", JSON.stringify(TrainingTitle));//Piu
    this.programcoordinatorService.saveAssessmentAssignRelease(formData).subscribe((result) => {
      // console.log(result);
      if (result.status == 0) {
        this.notificationService.showError(result.msg, "Error");
        this.SpinnerService.hide();
      }
      else {
        this.SpinnerService.hide();
        this.notificationService.showSuccess(result.msg, "Success");
        this.getIndividualAssessment();
        this.getBatchWiseAssessment();
        jQuery("#chkAll").prop("checked", false);
        jQuery("#releaseAssessmentModal").modal("hide");
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
      this.notificationService.showError("Something went wrong", "Error");
    });
  }
  onClickEvaluateAssessment(data, AssessmentFor) {
    jQuery(".custom-menu").hide();
    if (AssessmentFor == "Batch") {
      this.persistance.set('activeTabName', "Batch");
    } else {
      this.persistance.set('activeTabName', "Individual");
    }
    this._route.navigate(['/app/corporate/evaluate-assessment-list'], { queryParams: { BatchId: data.batchId, CoOrdinatiorId: data.coOrdinatiorId, Type: "Sales", AssessmetFor: AssessmentFor } });
  }
  onClickFeedbackList(data, AssessmentFor) {
    jQuery(".custom-menu").hide();
    this.persistance.set('activeTabName', "Batch");
    this._route.navigate(['/app/feedback-status-list'], { queryParams: { BatchId: data.batchId, CoOrdinatiorId: data.coOrdinatiorId, Type: "Sales", AssessmetFor: AssessmentFor } });
  }
  onClickEvaluateAssessmentCandidate(data, AssessmentFor) {
    jQuery(".custom-menu").hide();
    this._route.navigate(['/app/candidate-evaluate-assessment-list'], { queryParams: { CandidateId: data.candidateId, CoOrdinatiorId: data.coOrdinatiorId, Type: "Sales", AssessmetFor: AssessmentFor } });
  }
  onClickViewCandidate(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('activeTabName', "Batch");
    this._route.navigate(['/app/pc-view-candidate'], { queryParams: { BatchId: data.batchId, BatchNo: data.batchNo, Type: "Sales" } });
  }
  onReleaseCancleClick() {
    jQuery("#releaseAssessmentModal").modal("hide");
  }
  showBtnReleaseAssessment() {
    var checkObj = this.candidateAssessmentList.find(e => e.checked == true);
    return checkObj == null ? false : true;
  }
  onClickAssessmentSummary(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('activeTabName', "Batch");
    this._route.navigate(['/app/view-batch-assessment-summary'], { queryParams: { BatchId: data.batchId, BatchNo: data.batchNo, CoOrdinatiorId: data.coOrdinatiorId, Type: "Sales" } });
  }
  onClickAssesmentPendingDetails(data){
    jQuery(".custom-menu").hide();
    this.persistance.set('activeTabName', "Batch");
    this._route.navigate(['/app/view-batch-assessment-summary-pending'], { queryParams: { BatchId: data.batchId, BatchNo: data.batchNo, CoOrdinatiorId: data.coOrdinatiorId, Type: "Sales" } });
  }
  onClickCandiateAssessmentSummary(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('activeTabName', "Individual");
    this._route.navigate(['/app/view-candidate-assessment-summary'], { queryParams: { CandidateId: data.candidateId, CoOrdinatiorId: data.coOrdinatiorId, Type: "Sales" } });
  }
  onClicViewAssessment(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('activeTabName', this.activeTabName);
    this._route.navigate(['/app/view-assessment'], { queryParams: { CandidateId: data.candidateId, BatchId: data.batchId, BatchNo: data.batchNo, Type: "Sales", From: "Individual" } });
  }
  openModalPopupRejectDeclineCallBack(statusId, candidateId) {
    this.actionName = "Discontinue";
    this.declaineCandidateId = candidateId;
  }
  ProcessCandidate() {
    var formdata = {
      candidateId: Number(this.declaineCandidateId),
      requisitionDetailId: 0,
      //hiringStatusId: 55,
      hiringStatusId: 63,
      createdBy: this.loginUserId,
      remarks: this.discontinueRemarks
    }
    // this.requisitionService.updateRequisitionCandidateRejectDeclineCallBack(formdata).subscribe((result) => {
    this.requisitionService.discontinueIndividualCandidateCandidate(formdata).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          this.getIndividualAssessment();
          this.discontinueRemarks="";
          jQuery(".close").click();
        }
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  onClickViewFeedBack(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('activeTabName', "this.activeTabName");
    this.persistance.set('candidateName', data.candidateFullName);
    this.persistance.set('candidateNo', data.candidateNo);
    this.persistance.set('Type', "Sales");
    this.persistance.set('From', "Individual")
    this._route.navigate(['/app/view-induction-feedback'], { queryParams: { CandidateId: data.candidateId, EmpNo: data.empNo, Type: "Sales" } });

  }


  onClickAssesmentDetails(value) {
    this.candidateWiseAssesmentList = [];
    this.candidateWiseAssesmentList = this.candidateWiseAssesmentLists.filter(e => e.candidateId == value)
  }

  onClickFeedbackDetails(value) {
    this.feedbackWiseAssesmentList = []
    this.feedbackWiseAssesmentList = this.candidateWiseFeedbackLists.filter(e => e.candidateId == value)
  }

  onClickReleaseFeedback(data, Type) {
    this.releaseFeedbackMode = "I";
    if (Type == "Batch") {
      this.feedbackAssignReleaseType = "Batch";
      this.feedbackAssignRealeaseNo = data.batchNo;
      this.feedbackAssignRealeaseId = data.batchId;
      this.searchFeedbackAssignReleaseList.batchId = data.batchId;
      this.searchFeedbackAssignReleaseList.candidateId = 0;
    } else {
      this.feedbackAssignReleaseType = "Candidate";
      this.feedbackAssignRealeaseNo = data.candidateNo;
      this.feedbackAssignRealeaseId = data.candidateId;
      this.searchFeedbackAssignReleaseList.batchId = null;
      this.searchFeedbackAssignReleaseList.candidateId = data.candidateId;
    }
    this.getFeedbackAssignReleaseList();
  }


  getFeedbackAssignReleaseList() {
    this.programcoordinatorService.getEvaluateFeedbackListBatchwise(this.searchFeedbackAssignReleaseList).subscribe((result) => {
      if (result) {
        this.feedbackAssignReleaseList = result;
        console.log("Piuaaaaaaaaaa", result)
        this.evaluateFeedbackDetails = this.feedbackAssignReleaseList.batchesFeedbackDetailsList;
        this.SpinnerService.hide();
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
onCheckFeed(eve, data) {
  data.isAssigned = eve.target.checked;
  // this.selectedFeedback = this.evaluateFeedbackDetails.filter(obj => obj.isChecked == true);
  // console.log("puchu", this.selectedFeedback)
 }
 onClickReleaseFeed() {
  debugger;
  this.SpinnerService.show();
  const formData = new FormData();
  formData.append("BatchId", this.feedbackAssignReleaseType == "Batch" ? this.feedbackAssignRealeaseId.toString() : "0");
  formData.append("CandidateId", this.feedbackAssignReleaseType == "Candidate" ? (this.releaseFeedbackMode == "M" ? this.candidateIdString : this.feedbackAssignRealeaseId.toString()) : "");
  var FeedbackAssignReleaseDetails = [];
  formData.append("CreatedBy", this.loginUserId.toString());
  if (this.feedbackAssignReleaseType == "Batch") {
    this.evaluateFeedbackDetails.forEach(element => {
      let obj = {
        FeedbackAssignId: element.feedBackAssignId,
        FeedbackId: element.feedBackId,
        CandidateInductionScheduleDetailsId: element.candidateInductionScheduleDetailsId,
        IsAssigned: element.isAssigned
      }
      FeedbackAssignReleaseDetails.push(obj);
    })
    formData.append("FeedbackAssignReleaseDetails", JSON.stringify(FeedbackAssignReleaseDetails));
    this.programcoordinatorService.saveFeedbackAssignRelease(formData).subscribe((result) => {
      // console.log(result);
      if (result.status == 0) {
        this.notificationService.showError(result.msg, "Error");
        this.SpinnerService.hide();
      }
      else {
        this.SpinnerService.hide();
        this.notificationService.showSuccess(result.msg, "Success");
        this.getIndividualAssessment();
        this.getBatchWiseAssessment();
        jQuery("#chkAll").prop("checked", false);
        jQuery("#releaseModal").modal("hide");
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
      this.notificationService.showError("Something went wrong", "Error");
    });
  }
  if (this.feedbackAssignReleaseType == "Candidate") {
    var TrainingTitle = []//Piu
    //TrainingTitle=this.assessmentAssignReleaseList.map(item => item.traingTitle); //Piu
    for (var val of this.evaluateFeedbackDetails) {
      let obj = {
        TrainingTitle: val.traingTitle
      }
      TrainingTitle.push(obj);
    }
   this.selectedFeedback.forEach(element => {
     if (element.isAssigned == true) {
       let obj = {
         FeedbackAssignId: element.feedBackAssignId,
         FeedBackId: element.feedBackId,
         CandidateId: Number(element.candidateId),
         CandidateInductionScheduleDetailsId: element.candidateInductionScheduleDetailsId,
         IsAssigned: element.isAssigned
       }
       FeedbackAssignReleaseDetails.push(obj);
     }
   })
   formData.append("FeedbackAssignReleaseDetails", JSON.stringify(FeedbackAssignReleaseDetails));
   formData.append("Password", "welcome@1234");//Piu
   formData.append("TrainingTitle", JSON.stringify(TrainingTitle));//Piu
   this.programcoordinatorService.saveFeedBackAssignReleaseForCandidate(formData).subscribe((result) => {
     // console.log(result);
     if (result.status == 0) {
       this.notificationService.showError(result.msg, "Error");
       this.SpinnerService.hide();
     }
     else {
       this.SpinnerService.hide();
       this.notificationService.showSuccess(result.msg, "Success");
       this.getIndividualAssessment();
       jQuery("#chkAll").prop("checked", false);
       jQuery("#releaseAssessmentModal").modal("hide");
     }
   }, error => {
     console.log(error);
     this.SpinnerService.hide();
     this.notificationService.showError("Something went wrong", "Error");
   });
  }
}

}
