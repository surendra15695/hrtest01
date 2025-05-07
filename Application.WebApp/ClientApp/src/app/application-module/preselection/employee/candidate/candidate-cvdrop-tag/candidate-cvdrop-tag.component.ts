import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { cvdropcandidatedetail, ICandidateCVData, ICandidateDetailData, ISearchCandidateDetail } from '../../../../../interfaces/preselection/candidate.interface';
import { IRequisitionList, ISearchRequisition } from '../../../../../interfaces/preselection/requisition.interface';
import { CommonService } from '../../../../../services/common/common/common.service';
import { RequisitionService } from '../../../../../services/preselection/requisition/requisition.service';
import { VendorService } from '../../../../../services/vendor/vendor/vendor.service';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { ShareddataService } from '../../../../../sharedservices/shareddata.service';
import { LocationService } from '../../../../../services/common/location/location.service';
import { CandidateService } from '../../../../../services/preselection/candidate/candidate.service';
import { ISearchLocation } from 'src/app/interfaces/common/location.interface';
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { ISearchFunction } from 'src/app/interfaces/common/function.interface';
import { IHiringStatus } from 'src/app/interfaces/common/common.interface';
declare var jQuery: any;

@Component({
  selector: 'app-candidate-cvdrop-tag',
  templateUrl: './candidate-cvdrop-tag.component.html',
  styleUrls: ['./candidate-cvdrop-tag.component.css']
})
export class CandidateCvdropTagComponent implements OnInit {
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  searchform: FormGroup;
  filterForm: FormGroup;
  loginUserId: number;
  verticalIds: string;
  selectedVertical: IVertical;
  requisitionDetailId: number;
  requisitionLists: IRequisitionList[] = [];
  candidateLists: IHiringStatus[] = [];
  requisitionPositionName: string;
  requisitionDepartmentName: string;
  requisitionFunctionName: string;
  requisitionVerticalId: number;
  requisitionFunctionId: number;
  locations: any[] = [];
  functions: any[] = [];
  verticals: any[] = [];
  arr: any[] = [];
  searchLocation: ISearchLocation =
    {
      locationId: null,
      verticalId: null,
      locationCode: null,
      locationNo: null,
      isActive: true
    };
  searchFunction: ISearchFunction =
    {
      verticalId: null,
      functionId: null,
      isActive: true
    };
  searchRequisition: ISearchRequisition = {
    requisitionNo: null,
    requistionId: null,
    requisitionDetailId: null,
    locationId: null,
    verticalId: null,
    fromDate: null,
    toDate: null,
    iOMNo: null,
    requisitionApprovalStatus: null,
    requisitionProcessStatus: null,
    createdBy: null,
    approverAutoUserId: null,
    allocatedUserId: null,
    requisitionTypeId: null,
  }
  candidates: ICandidateCVData[] = [];
  candidate: ICandidateCVData = {
    candidateNo: "",
    candidateId: 0,
    CandidateIds: "",
    prefixId: 0,
    prefixName: "",
    fullName: "",
    genderId: 0,
    genderName: "",
    dob: "",
    age: 0,
    emailId: "",
    contactNo: "",
    aadharNo: "",
    motherTongueId: 0,
    motherTongueName: "",
    laguageIds: "",
    languageNames: "",
    qualificationId: 0,
    qualificationName: "",
    courseId: 0,
    courseName: "",
    streamId: 0,
    streamName: "",
    marksPercentage: "",
    completionYear: 0,
    qualificationTypeId: 0,
    qualificationTypeName: "",
    experienceYear: 0,
    experienceMonth: 0,
    currentCTC: "",
    currentEmployer: "",
    currentDesignation: "",
    domainId: 0,
    domainName: "",
    subDomainId: 0,
    subDomainName: "",
    stateId: 0,
    stateName: "",
    previousApplied: 0,
    previousAppliedName: "",
    relativeStatus: 0,
    relativeStatusName: "",
    relativeName: "",
    relativeContactNo: "",
    sourceChannelId: 0,
    sourceChannelName: "",
    createdBy: 0,
    candidateOwner: "",
    hiringStatusId: 0,
    hiringStatusName: "",
    resume: "",
    referalEmpNo: "",
    referalDesignation: "",
    referalGrade: "",
    parentRelationshipId: 0,
    childRelationshipId: 0,
    parentRelationshipName: "",
    childRelationshipName: "",
    relationshipNotes: "",
    cmdApprovalRequired: 0,
    cmdApprovalStatus: 0,
    cmdApprovalNo: "",
    cmdApprovalDocument: "",
    popoverContent: "",
    cmdUpdateStatus: 0,
    testOption: 0,
    hrFeedbackCount: 0,
    assessmentCount: 0,
    applicationCount: 0,
    clarificationCount: 0,
    checked: null,
    requisitionDetailId: 0,
    Position: "",
    Department: "",
    Location: "",
    state: "",
    Requisitionno: "",
  };
  candidatedetailsarray: any[] = [];
  candidateIds: string = "";
  candidateId: number;
  candidateNo: string;
  searchCandidate: ISearchCandidateDetail = {
    CandidateId: 0,
    CandidateName: "",
    HiringStatusId: 0,
    GenderIds: "",
    FromAge: 0,
    ToAge: 0,
    AadharNo: "",
    ContactNo: "",
    EmailId: "",
    MotherTongueIds: "",
    QualificationIds: "",
    CourseIds: "",
    StreamIds: "",
    FromPercentage: 0,
    ToPercentage: 0,
    DomainIds: "",
    SubDomainIds: "",
    StateIds: "",
    SourceChannelId: "",
    CreatedBy: 0,
    RequisitionDetailId: 0,
    FromDate: "",
    ToDate: "",
    FromExperience: 0,
    ToExperience: 0,
    CompletionYears: "",
    QualificationTypeIds: "",
    CurrentEmployer: "",
    Designation: "",
    RelativeStatus: "",
    PreviousApplied: 0,
    //CandidateOwner:""

  }
  cvdropcandidate: cvdropcandidatedetail = {
    CandidateId: null,
    HiringStatusId: "",
    formDate: "",
    requisitionMapped: false,
    requisitionDetailId: null
  }

  selectAll: boolean;
  buyOutType: string;
  relocationReimbursementType: string;
  callngIfFunction: boolean = true;
  pageNameForBack: string;

  // Release and call back
  createdBy: number;
  statusId: number;
  actionName: string;
  releaseCandidateId: number;
  releaseremarks: string;
  callbackCandidateId: number;
  callbackremarks: string = "";
  objCallbackHistoryInsert: CallbackHistoryInsert;
  val:any;

  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private candidateService: CandidateService,
    private requisitionService: RequisitionService,
    private commonService: CommonService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private locationService: LocationService,
    private functionService: FunctionService,
    private SpinnerService: NgxSpinnerService, public activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {
    this.SpinnerService.show();
    this.objCallbackHistoryInsert = new CallbackHistoryInsert();  // callback
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.pageNameForBack = this.persistance.get('pagename');
    this.persistance.get('pagename') == "candidatedropcvtag";
    this.val=this.persistance.get('data');
    console.log("check",this.val)
    this.filterform();
    this.Reqstatus();
    this.createForm();
    this.getAllCvDropCandidate();
    this.getAllRequisition();
    this.getHiringStatus();
  }

  ngOnInit() {
    this.getAllLocation();
    this.loadDataTable();
    this.loadDatePicker();
    this.tableOptionDropDown();
    this.getAllFunction();
    this.getAllVerticals();
  }

  createForm() {
    this.searchform = this.fb.group({
      requisitionNo: [''],
      verticalId: [0],
      locationId: [0],
      functionId: [0],
      fromDate: [''],
      toDate: [''],
      iOMNo: [''],
      requisitionProcessStatus: [0],
      allocatedAutoUserId: [0]
    });
  }
  filterform() {
    this.filterForm = this.fb.group({
      fromDate: [''],
      requisitionProcessStatus: [false],
      HiringStatusId: ['']
    });
  }
  Reqstatus() {
    this.arr = [];
    this.arr.push({ reqid: true, reqstatus: "Yes" });
    this.arr.push({ reqid: false, reqstatus: "No", });
  }
  loadDataTable() {
    var dothis = this;
    jQuery('#dataTable1').dataTable().fnClearTable();
    jQuery('#dataTable1').dataTable().fnDestroy();
    setTimeout(() => {
      var oTable =
        jQuery('#dataTable1').dataTable({
          "searching": true,
          "paging": true,
          "scrollX": true,
          "autoWidth": false
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
  getHiringStatus() {
    this.candidateLists = [];
    var obj = {
      hiringStatusId: 0
      //hiringStatusName: "",

    }
    //this.SearchCandidateNo.candidateNo = this.SearchCandidateNo.candidateNo;
    this.commonService.GetHiringStatus(obj).subscribe((result) => {
      if (result) {
        this.candidateLists = result;
      }
    }, error => {
      console.log(error);
    }, () => {
      //this.loadSelectPicker();
    });

    //changeHiringStatus() {
    //  this.searchCandidateNo.Fi = this.searchCandidateNo.hiringStatusId;
    //}
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
  fromSubmit() {
    this.cvdropcandidate.HiringStatusId = this.filterForm.value.HiringStatusId.toString();
    this.cvdropcandidate.requisitionMapped = this.filterForm.value.requisitionProcessStatus;
    this.getAllCvDropCandidate();
  }
  reset() {

  }
  getAllVerticals() {
    this.verticals = [];
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    this.selectedVertical = this.verticals.filter(x => x.verticalId == 0)[0];
  }
  getAllFunction() {
    this.functions = [];
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;
        this.functions.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          verticalName: "",
          isActive: true
        })
      }
      else {
        this.functions = [];
        this.functions.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          verticalName: "",
          isActive: true
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  getAllLocation() {
    this.locations = [];
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
    });
  }
  getAllCvDropCandidate() {
    this.SpinnerService.show();
    this.candidates = [];
    this.cvdropcandidate.requisitionDetailId = this.requisitionDetailId;
    this.candidateService.getCvDropList(this.cvdropcandidate).subscribe((result) => {
      if (result) {
        this.candidates = result;  
        console.log("values",this.candidates)    
        this.SpinnerService.hide();
      }
      else {
        this.candidates = [];
        this.SpinnerService.hide();
      }
    }, error => {
      this.SpinnerService.hide();
    }, () => {
      this.loadDataTable();
      this.SpinnerService.hide();
    });
  }
  onClickNoticePeriodBuyout(data) {
    this.candidateId = data.candidateId;
    this.candidateNo = data.candidateNo;
    this.buyOutType = "I";
  }
  btnClickEnableTagCVDropRequisition() {
    this.candidateId = 0;
    this.buyOutType = "A";
    var candidateNoString = "";
    var cflag = 0;
    this.candidates.forEach(element => {
      if (element.checked) {
        candidateNoString += (cflag == 0 ? "" : ",") + element.candidateNo.toString();
        cflag = 1;
      }
    })
    this.candidateNo = candidateNoString;
    this.getAllRequisition();
  }

  showBtnEnableTagCVDropRequisition() {
    var checkObj = this.candidates.find(e => e.checked == true);
    return checkObj == null ? false : true;
  }

  onCheckSelectAll(eve) {
    if (this.candidates.length > 0) {
      this.candidates.forEach(element => {
        element.checked = eve.target.checked;
        //this.candidateIds = this.candidateIds + "," + this.candidates;
      })
    } else {
      jQuery("#chkAll").prop("checked", false);
      this.notificationService.showError("No data to select", "Error");
    }
  }
  getEnableStatus(data) {
    return data.checked;
  }
  onCheckRowWise(data, eve,index) {
    var flag = 0;
    data.checked = eve.target.checked;
    this.candidateId = data.candidateId;
    this.candidate.emailId = data.emailId;   // need change later for bulk
    if (this.candidateIds != "") {
      jQuery("#chkm" + this.candidateId).prop("checked", false);
      flag = 1;
    }
    if (eve.target.checked) {
      this.candidateIds = this.candidateIds + "," + this.candidateId;
      this.candidatedetailsarray.push({
        CandidateName: data.fullName,
        Position: this.val.positionName,
        Department: this.val.departmentName,
        Function: this.val.functionName,
        Location: this.val.locationOffice, 
        State: data.stateName,
        ReqNo: this.val.requisitionNo ,
        EmailId: data.emailId,
        UserId : data.candidateNo
      });
    }
    else {
      // start
      //after deselecting the checkbox candidateid will also be removed from candidateids array same for requisitiondetailids
      let canidarray = this.candidateIds.split(",");
      let index = canidarray.indexOf(data.candidateId.toString());
      canidarray.splice(index, 1);
      this.candidateIds = canidarray.join(",")
      this.candidatedetailsarray.splice(index - 1, 1);
    }
    console.log("can",this.candidateIds)
    console.log("array",this.candidatedetailsarray)
  }
  onClickViewDocument(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "employeemanagement");
    this.persistance.set('nextpagename', "ocviewdocument");
    this.persistance.set('type', "plant");
    this.persistance.set('candidateId', data.candidateId);
    this.persistance.set('paramid', data.requisitionDetailId);
    jQuery(".custom-menu").hide();
    this._route.navigate(['app/oc-view-document']);
  }

  getAllRequisition() {
    this.requisitionDepartmentName = "";
    this.requisitionPositionName = "";
    this.requisitionFunctionName = "";
    this.requisitionFunctionId = 0;
    this.requisitionVerticalId = 0;

    this.searchform.patchValue(
      {
        allocatedAutoUserId: this.loginUserId
      });
    this.requisitionService.getAllRequisition(this.searchform.value).subscribe((result) => {
      if (result) {
        this.requisitionLists = result;
        for (var i = 0; i < this.requisitionLists.length; i++) {
          this.requisitionDepartmentName = this.requisitionLists[i].departmentName;
          this.requisitionPositionName = this.requisitionLists[i].positionName;
          this.requisitionFunctionName = this.requisitionLists[i].functionName;
          this.requisitionVerticalId = this.requisitionLists[i].verticalId;
          this.requisitionFunctionId = this.requisitionLists[i].functionId;
        }
      }
      else {
        this.requisitionLists = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }


  onCVCandidateTag() {
    let obj = {
      CandidateIds : this.candidateIds,
      RequisitionDetailId : this.requisitionDetailId,
      CreatedBy : this.loginUserId,
      CandidateDetailsCvDropTag : this.candidatedetailsarray
    }
    console.log(obj);
    this.SpinnerService.show();
    this.requisitionService.updateRequisitionCVCandidateTagNew(obj).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
          this.SpinnerService.hide();
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          this.getAllCvDropCandidate();
          this.getAllRequisition();
          this.closeCvDropCandidateModal();
          jQuery("#tagCVDropRequisition").modal("hide");
          this.candidates = [];
          this.SpinnerService.hide();
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


  getCandidateIds() {
    var dothis = this;
    var candidates = "";
    jQuery('#dataTable1 tr').each(function () {
      if (jQuery(this).find("input[type=checkbox]").attr("checked")) {
        var idval = jQuery(this).find("input[type=checkbox]").val();
        if (candidates == "") {
          candidates = idval;
        }
        else {
          candidates += "," + idval;
        }
      }

    });
    dothis.candidateIds = candidates;
  }

  gotoCandidateList() {
    this.persistance.set('pagename', "rmrequisitionlist");
    this.persistance.set('previouspageparams',this.persistance.get('previouspagefilter'));
    this.persistance.set('tabledisplayStartcandi',this.persistance.get('tabledisplayStartcandi'));
    this._route.navigate(['/app/my-action/all-positions/candidate-list']);
  }

  closeCvDropCandidateModal() {
    this.requisitionDepartmentName = "";
    this.requisitionPositionName = "";
    this.requisitionFunctionName = "";
    this.requisitionFunctionId = 0;
    this.requisitionVerticalId = 0;
    this.requisitionDetailId = 0;
    this.requisitionLists = [];
   // jQuery("#tagCVDropRequisition").modal('toggle');
  }

  gotoCandidateAction(id: any, relativeStatus: any, childRelationshipId: any, cmdUpdateStatus: any) {
    if ((parseInt(childRelationshipId) > 1 || relativeStatus == "1") && cmdUpdateStatus == "0") {
      jQuery(".custom-menu").hide();
      this.persistance.set('pagename', "candidatedropcvtag");
      this.persistance.set('nextpagename', "candidateaction");
      this.persistance.set('candidateid', id);
      //this.persistance.set('paramid', this.requisitionDetailId);
      this._route.navigate(['/app/my-action/all-positions/candidate-list/candidate-cmd-approval']);
    }
    else {
      jQuery(".custom-menu").hide();
      this.persistance.set('pagename', "candidatedropcvtag");
      this.persistance.set('nextpagename', "candidateaction");
      this.persistance.set('candidateid', id);
      //this.persistance.set('paramid', this.requisitionDetailId);
      this._route.navigate(['/app/my-action/all-positions/candidate-list/cvdropcandidate']);
    }
  }



  openModalPopupCallBack(data) {
    this.actionName = "Callback";
    this.objCallbackHistoryInsert.callBackHistoryId = 0;
    this.objCallbackHistoryInsert.requisitionId = this.persistance.get("requisitionidforcallback");
    if (data.requisitionDetailId != 0 || data.requisitionDetailId != null) {
      this.objCallbackHistoryInsert.requisitionDetailId = data.requisitionDetailId;
    }
    else {
      this.objCallbackHistoryInsert.requisitionDetailId = this.persistance.get('paramid');
    }
    this.objCallbackHistoryInsert.verticalId = this.persistance.get("verticalidforcallback");
    this.objCallbackHistoryInsert.candidateId = data.candidateId;
    this.objCallbackHistoryInsert.currentHiringStatusId = 59;
    // this.objCallbackHistoryInsert.callBackRemarks = this.callbackremarks;
    this.objCallbackHistoryInsert.createdBy = this.createdBy;
    // this.callbackCandidateId = candidateId;
    //this.tabName == tabName;

  }

  openModalPopupRejectDeclineCallBack(statusId, candidateId) {
    this.statusId = statusId;
    if (this.statusId == 56) {
      this.actionName = "Declined";
    }
    else if (this.statusId == 57) {
      this.actionName = "Reject";
    }
    else if (this.statusId == 59) {
      this.actionName = "Call back";
    }
    else if (this.statusId == 8) {
      this.actionName = "Cancel Interview"
    }
    this.candidateIds = "," + candidateId.toString();
  }

  onChangeCandidateStage(stage: any) {
    // if (stage == "I") {
    //   this.objCallbackHistoryInsert.isFromBeginning = true;
    // } else {
    this.objCallbackHistoryInsert.isFromBeginning = false;
    // }

  }

  callBackCandidate() {
    var flag = 0;
    var msg = "";
    if (this.objCallbackHistoryInsert.isFromBeginning == undefined) {
      flag = 1;
      msg = "Please select candidate recall stage";
    }
    else {

    }
    if (this.callbackremarks == "") {
      flag = 1;
      msg = "Please enter remarks";
    }
    else {

    }
    if (flag == 0) {
      this.objCallbackHistoryInsert.callBackRemarks = this.callbackremarks;
      this.requisitionService.insertCallbackRequest(this.objCallbackHistoryInsert).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.getAllCvDropCandidate();
            this.callbackremarks = "";
            this.objCallbackHistoryInsert = new CallbackHistoryInsert();
            jQuery("#callBackModal").modal("hide");
          }
        }
        else {
        }
      }, error => {
        console.log(error);
      }, () => {
      });
    }
    else {
      this.notificationService.showError(msg, "Error");
    }
  }


}


class CallbackHistoryInsert {
  callBackHistoryId: number;
  requisitionId: number;
  requisitionDetailId: number;
  candidateId: number;
  verticalId: number;
  currentHiringStatusId: number;
  approvalStatusId: number;
  isFromBeginning: boolean;
  callBackRemarks: string;
  createdBy: number;
}

