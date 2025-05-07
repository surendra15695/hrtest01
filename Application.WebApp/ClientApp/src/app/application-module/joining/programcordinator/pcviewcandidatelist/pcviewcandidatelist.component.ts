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
import { IAssessemenrAssignReleaseList, IBatchAssessment, ICandidateAssessmentList, IEvaluateFeedbackListBatchNew, ISearchAssessmentAssignReleaseList, ISearchEvaluateFeedbackListBatch, ISearchEvaluateFeedbackRereleaseListBatch } from '../../../../interfaces/joining/programcoordinator.interface';
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
import { ProgramcoordinatorService } from '../../../../services/joining/programcoordinator/programcoordinator.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { RequisitionService } from 'src/app/services/preselection/requisition/requisition.service';
declare var jQuery: any;
import { CandidateService } from '../../../../services/joining/candidate/candidate.service'; // Added by anif on 05-12-2022
import { ISearchFeedbackReleaseForNewJoiner } from 'src/app/interfaces/common/inductionfeedback.interface';
declare var html2pdf: any;   // Added by anif on 05-12-2022

@Component({
  selector: 'app-pcviewcandidatelist',
  templateUrl: './pcviewcandidatelist.component.html',
  styleUrls: ['./pcviewcandidatelist.component.css']
})
export class PcviewcandidatelistComponent implements OnInit {
  searchFormIndividual: FormGroup;
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  assessmentStatusList: any[] = [];
  //candidateAssessmentList: ICandidateAssessmentList[] = [];
  candidateAssessmentList: any[] = [];
  assessmentAssignReleaseList: any[] = [];
  searchAssessmentAssignReleaseList: ISearchAssessmentAssignReleaseList = {
    batchId: null,
    candidateId: "",
  }
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
  candidateWiseAssesmentList: any[] = [];
  candidateWiseAssesmentLists: any[] = [];
  //function
  functions: IVerticalFunction[] = [];
  selectedFunction: IVerticalFunction;
  searchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  fEMPId: number;
  fFullName: string;
  aEMPId: number;
  aFullName: string;
  feedbackWiseAssesmentList: any[] = [];
  candidateWiseFeedbackLists: any[] = [];
  selectedfunctionId: number;
  functionName: string;
  assessmentAssignReleaseType: string;
  assessmentAssignRealeaseNo: string;
  assessmentAssignRealeaseId: number;
  selectAll: boolean;
  batchId: number;
  batchNo: string;
  EmpNo: string;
  type: string;
  candidateIdString: string = "";
  candidateNoString: string = "";
  callngIfFunction: boolean = true;
  releaseAssessmentMode: string;
  activeTabName: string;
  discontinueRemarks: string;
  actionName: string;
  declaineCandidateId: number;
  // Added By anif on 05-12-2022
  searchFeedbackDetails = {
    candidateId: null,
    feedBackId: null,
    candidateInductionScheduleDetailsId: null,
    isActive: true
  }
  feedbackAllDetails: any[] = [];
  feedbackFormatedDetails: any[] = [];
  feedbackData: any;
  releaseFeedbackMode: string;
  feedbackAssignReleaseType: string;
  feedbackAssignRealeaseNo: string;
  feedbackAssignRealeaseId: number;
  searchFeedbackAssignReleaseList: ISearchEvaluateFeedbackRereleaseListBatch = {
    batchId: null,
    candidateId: ""
  }
  feedbackAssignReleaseList: IEvaluateFeedbackListBatchNew;
  evaluateFeedbackDetails: any[] = [];
  // Tiil this by anif on 05-12-2022
  searchFeedbackReleaseForNewJoiner: ISearchFeedbackReleaseForNewJoiner = {
    candidateId: null,
    batchId: null,
    coOrdinatorId: null
  }


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
    private toasterService: ToastrService, private requisitionService: RequisitionService,
    private SpinnerService: NgxSpinnerService, public activatedRoute: ActivatedRoute,
    private titleService: Title,
    private positionService: PositionService,
    private programcoordinatorService: ProgramcoordinatorService,
    private candidateService: CandidateService // Added by anif in 05-12-200
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.activeTabName = this.persistance.get("activeTabName");
    this.assessmentStatusList.push({ statusId: 1, statusname: "Test 1" }, { statusId: 2, statusname: "Test 2" });
    this.activatedRoute.queryParams.subscribe((params) => {
      this.batchId = params['BatchId'];
      this.batchNo = params['BatchNo'];
      this.type = params['Type'];
    });
    this.creatSearchFormIndividual();
    this.getAllVerticals();
    this.getIndividualAssessment();
    this.tableOptionDropDown();
  }

  ngOnInit() {
    this.loadDataTable();
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
  onClickReset() {
    this.creatSearchFormIndividual();
    this.getAllVerticals();
    this.getIndividualAssessment();
  }
  creatSearchFormIndividual() {
    this.searchFormIndividual = this.fb.group({
      candidateId: null,
      batchId: Number(this.batchId),
      candidateNo: [''],
      name: [''],
      empNo: [''],
      location: null,
      function: null,
      assesmentStatus: null,
      coOrdinatorId: null,
    });
  }
  //verticals
  getAllVerticals(): void {
    this.verticals = [];
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
  getIndividualAssessment() {
    this.candidateAssessmentList = [];
    //console.log("Assessment List for Batch search Obj", this.searchFormIndividual.value);
    this.programcoordinatorService.getAllCandidateAssessmentForNewJoiner(this.searchFormIndividual.value).subscribe((result) => {
      if (result) {
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
  onSearchIndividual() {
    this.getIndividualAssessment();
  }
  onCheckSelectAll(eve) {
    if (this.candidateAssessmentList.length > 0) {
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
  onCheckAssign(eve, data) {
    data.isAssigned = eve.target.checked;
  }
  onCheckFeed(eve, data) {
    data.isAssigned = eve.target.checked;
  }
  showBtnReleaseAssessment() {
    var checkObj = this.candidateAssessmentList.find(e => e.checked == true);
    return checkObj == null ? false : true;
  }
  showBtnReleaseFeedBack() {
    var checkObj = this.candidateAssessmentList.find(e => e.checked == true);
    return checkObj == null ? false : true;
  }
  getAssignedStatus(data) {
    return data.isAssigned;
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
      this.searchAssessmentAssignReleaseList.batchId = Number(this.batchId);
      this.searchAssessmentAssignReleaseList.candidateId = data.candidateId.toString();
    }
    this.getAssessmentAssignReleaseList();
  }
  getFeedbackAssignReleaseList() {
    this.programcoordinatorService.getEvaluateFeedbackRerelease(this.searchFeedbackAssignReleaseList).subscribe((result) => {
      if (result) {
        // this.feedbackAssignReleaseList = result;
       // console.log("Piuaaaaaaaaaa", result)
        this.evaluateFeedbackDetails = result.filter(e => Number(e.createdDate) == 1);
        // this.evaluateFeedbackDetails = this.feedbackAssignReleaseList.batchesFeedbackDetailsList;
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
  onClickReleaseFeedback(data, Type) {
    debugger
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
      this.searchFeedbackAssignReleaseList.batchId = Number(this.batchId);
      this.searchFeedbackAssignReleaseList.candidateId = data.candidateId.toString();
    }
    this.getFeedbackAssignReleaseList();
  }
  btnClickReleaseAssessment() {
    this.releaseAssessmentMode = "M";
    this.candidateIdString = "";
    this.candidateNoString = "";
    var flag = 0;
    this.candidateAssessmentList.forEach(element => {
      if (element.checked) {
        this.candidateIdString += (flag == 0 ? "" : ",") + element.candidateId.toString();
        this.candidateNoString += (flag == 0 ? "" : ",") + element.candidateNo.toString();
        flag = 1;
      }
    })
    this.searchAssessmentAssignReleaseList.batchId = Number(this.batchId);
    this.searchAssessmentAssignReleaseList.candidateId = this.candidateIdString.toString();
    this.assessmentAssignReleaseType = "Candidate";
    this.assessmentAssignRealeaseNo = this.candidateNoString;
    this.getAssessmentAssignReleaseList();
  }
  btnClickReleaseFeedBack() {
    this.releaseFeedbackMode = "M";
    this.candidateIdString = "";
    this.candidateNoString = "";
    var flag = 0;
    this.candidateAssessmentList.forEach(element => {
      if (element.checked) {
        this.candidateIdString += (flag == 0 ? "" : ",") + element.candidateId.toString();
        this.candidateNoString += (flag == 0 ? "" : ",") + element.candidateNo.toString();
        flag = 1;
      }
    })
    this.searchFeedbackAssignReleaseList.batchId = Number(this.batchId);
    this.searchFeedbackAssignReleaseList.candidateId = this.candidateIdString.toString();
    this.feedbackAssignReleaseType = "Candidate";
    this.feedbackAssignRealeaseNo = this.candidateNoString;
    this.getFeedbackAssignReleaseList();
  }
  getAssessmentAssignReleaseList() {
    this.assessmentAssignReleaseList = [];
    //console.log("Assessment List Search Obj", this.searchAssessmentAssignReleaseList);

    this.programcoordinatorService.getAssessmentAssingReReleaseDetails(this.searchAssessmentAssignReleaseList).subscribe((result) => {
      if (result) {
        //this.assessmentAssignReleaseList = result.filter(e => Number(e.createdDate) == 1);
        this.assessmentAssignReleaseList = result;

       // console.log("Camdidate Assessment List", this.assessmentAssignReleaseList);

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
  onClickRelease() {
    debugger;
    this.SpinnerService.show();
    const formData = new FormData();
    var TrainingTitle = []//Piu
    //TrainingTitle=this.assessmentAssignReleaseList.map(item => item.traingTitle); //Piu
    for (var val of this.assessmentAssignReleaseList) {
      let obj = {
        TrainingTitle: val.traingTitle
      }
      TrainingTitle.push(obj);
    }
    formData.append("BatchId", this.batchId.toString());
    formData.append("CandidateId", this.assessmentAssignReleaseType == "Candidate" ? (this.releaseAssessmentMode == "M" ? this.candidateIdString : this.assessmentAssignRealeaseId.toString()) : "");
    var AssessementAssignReleaseDetails = [];
    this.assessmentAssignReleaseList.forEach(element => {
      if (element.isAssigned == true) {
        let obj = {
          AssessmentAssignId: element.assessmentAssignId,
          AssessmentId: element.assessmentId,
          CandidateId: element.candidateId,
          CandidateInductionScheduleDetailsId: element.candidateInductionScheduleDetailsId,
          IsAssigned: element.isAssigned
        }
        AssessementAssignReleaseDetails.push(obj);
      }
    })
    //console.log("Save Assessment Release Lits", AssessementAssignReleaseDetails);

    formData.append("AssessementAssignReleaseDetails", JSON.stringify(AssessementAssignReleaseDetails));
    formData.append("CreatedBy", this.loginUserId.toString());
    formData.append("Password", "welcome@1234");//Piu
    formData.append("TrainingTitle", JSON.stringify(TrainingTitle));//Piu
    this.programcoordinatorService.saveAssessmentAssignReleaseForCandidate(formData).subscribe((result) => {
      // console.log(result);
      if (result.status == 0) {
        this.notificationService.showError(result.msg, "Error");
        this.SpinnerService.hide();
      }
      else {
        this.SpinnerService.hide();
        this.notificationService.showSuccess(result.msg, "Success");
        this.getIndividualAssessment();
        jQuery("#releaseAssessmentModal").modal("hide");
        jQuery("#chkAll").prop("checked", false);
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
      this.notificationService.showError("Something went wrong", "Error");
    });
  }
  onClickReleaseFeed() {
    debugger;
    this.SpinnerService.show();
    const formData = new FormData();
    var TrainingTitle = []//Piu
    //TrainingTitle=this.assessmentAssignReleaseList.map(item => item.traingTitle); //Piu
    for (var val of this.evaluateFeedbackDetails) {
      let obj = {
        TrainingTitle: val.traingTitle
      }
      TrainingTitle.push(obj);
    }
    formData.append("BatchId", this.batchId.toString());
    formData.append("CandidateId", this.feedbackAssignReleaseType == "Candidate" ? (this.releaseFeedbackMode == "M" ? this.candidateIdString : this.feedbackAssignRealeaseId.toString()) : "");
    var FeedBackAssignReleaseDetails = [];
    this.evaluateFeedbackDetails.forEach(element => {
      if (element.isAssigned == true) {
        let obj = {
          FeedBackAssignId: element.feedBackAssignId,
          FeedBackId: element.feedBackId,
          CandidateId: element.candidateId,
          CandidateInductionScheduleDetailsId: element.candidateInductionScheduleDetailsId,
          IsAssigned: element.isAssigned
        }
        FeedBackAssignReleaseDetails.push(obj);
      }
    })
   // console.log("Save Assessment Release Lits", FeedBackAssignReleaseDetails);

    formData.append("FeedBackAssignReleaseDetails", JSON.stringify(FeedBackAssignReleaseDetails));
    formData.append("CreatedBy", this.loginUserId.toString());
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
        jQuery("#releaseFeedbackModal").modal("hide");
        jQuery("#chkAll").prop("checked", false);
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
      this.notificationService.showError("Something went wrong", "Error");
    });
  }
  onClicViewAssessment(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('activeTabName', this.activeTabName);
    this._route.navigate(['/app/view-assessment'], { queryParams: { CandidateId: data.candidateId, BatchId: this.batchId, BatchNo: this.batchNo, Type: this.type, From: "Batch", EmpNo: data.empNo } });
  }
  onClickCandiateAssessmentSummary(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('activeTabName', this.activeTabName);
    this._route.navigate(['/app/view-candidate-assessment-summary'], { queryParams: { CandidateId: data.candidateId, CoOrdinatiorId: data.coOrdinatiorId, BatchId: this.batchId, BatchNo: this.batchNo, Type: this.type,IsReassigned:data.isReassigned } });
  }
  onClickBack() {
    jQuery(".custom-menu").hide();
    if (this.type == "Corporate") {
      this.persistance.set('activeTabName', this.activeTabName);
      this._route.navigate(['/app/corporate/induction-assessment-list']);
    } else if (this.type == "Plant") {
      this.persistance.set('activeTabName', this.activeTabName);
      this._route.navigate(['/app/plant/induction-assessment-list']);
    } else if (this.type == "Sales") {
      this.persistance.set('activeTabName', this.activeTabName);
      this._route.navigate(['/app/sales/induction-assessment-list']);
    }
  }
  openModalPopupRejectDeclineCallBack(statusId, candidateId) {
    this.actionName = "Discontinue";
    this.declaineCandidateId = candidateId;
  }
  ProcessCandidate() {
    var flag = 0;
    var msg = "";
    if (this.discontinueRemarks == undefined || this.discontinueRemarks == "") {
      flag = 1;
      msg = "Please Enter Remarks";
    } else {

    }
    if (flag == 0) {
      var formdata = {
        candidateIds: this.declaineCandidateId.toString(),
        batchId: Number(this.batchId),
        createdBy: this.loginUserId,
        remarks: this.discontinueRemarks
      }
      this.requisitionService.discontinueCandidateFromBatch(formdata).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.discontinueRemarks = "";
            this.getIndividualAssessment();
            // jQuery(".close").click();
            jQuery('#declineModal').modal('hide');
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
  onClickViewFeedBack(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('activeTabName', this.activeTabName);
    this.persistance.set('candidateName', data.candidateFullName);
    this.persistance.set('candidateNo', data.candidateNo);
    this.persistance.set('Type', this.type);
    this.persistance.set('From', "Batch");
    this.persistance.set('BatchId', this.batchId);
    this.persistance.set('BatchNo', this.batchNo);
    this.persistance.set('candidateNo', data.candidateNo);
    this._route.navigate(['/app/view-induction-feedback'], { queryParams: { CandidateId: data.candidateId, EmpNo: data.empNo } });

  }

  // Added By anif on 05-12-2022
  onDownloadFeedback(data) {
    let feedbackObj = {
      EmpNo: data.empNo,
      CandidateName: data.candidateFullName,
      FeedBackDetailsArray: []
    }
    this.searchFeedbackDetails.candidateId = Number(data.candidateId);
    this.getAllFeedbackDetails(feedbackObj);
  }
  getAllFeedbackDetails(feedbackDetails) {
    this.SpinnerService.show();
    this.candidateService.getCandidateFeedbackDetails(this.searchFeedbackDetails).subscribe((result) => {
      if (result) {
        this.feedbackAllDetails = result;
        this.feedbackAllDetails.forEach(element => {
          this.feedbackFormatedDetails.push(element.feedbackData);
        })
        feedbackDetails.FeedBackDetailsArray = this.feedbackFormatedDetails;
        this.feedbackData = feedbackDetails;
        this.SpinnerService.hide();
      }
      else {
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      setTimeout(() => {
        this.doenloadPDF(feedbackDetails.EmpNo);
      }, 10)
      this.SpinnerService.hide();
    });
  }
  doenloadPDF(empNo) {
    var htmlstring = document.getElementById("printFeedBack").innerHTML;
    var dom = document.createElement('div');
    dom.innerHTML = htmlstring;
    html2pdf(dom, {
      margin: 10,
      filename: empNo + "_Induction_Feedback.pdf",
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3, y: 0, scrollY: 0 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      //jsPDF: { format: 'A4', orientation: 'landscape' },
    });
  }

  // Till this added by anif on 05-12-2022

  onClickAssesmentDetails(value, key) {
    this.candidateWiseAssesmentList = []
    this.candidateWiseAssesmentList = this.candidateWiseAssesmentLists.filter(e => e.candidateId == value);
    this.aEMPId = key.empNo;
    this.aFullName = key.candidateFullName;
  }

  onClickFeedbackDetails(value, key) {
    this.feedbackWiseAssesmentList = []
    //this.feedbackWiseAssesmentList = this.candidateWiseFeedbackLists.filter(e => e.candidateId == value)
    this.fEMPId = key.empNo;
    this.fFullName = key.candidateFullName;
    this.searchFeedbackReleaseForNewJoiner.candidateId = value;
    this.searchFeedbackReleaseForNewJoiner.batchId = Number(this.batchId);
    this.programcoordinatorService.getAllCandidateFeedbackReleaseListForNewJoiner(this.searchFeedbackReleaseForNewJoiner).subscribe((result) => {
      if (result) {
        this.feedbackWiseAssesmentList = result;
      } else {
        this.feedbackWiseAssesmentList = [];
      }
    }, error => {
      console.log(error);
    }, () => {

    });
  }

}
