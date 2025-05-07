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
import { ICandidateMedicalReimbursementlist, ICandidateTravelReimbursementList } from 'src/app/interfaces/joining/onboardingcoordinator.interface';
import { IFunctionDepartment, ISearchDepartment } from 'src/app/interfaces/common/department.interface';
import { ICandidateAssessmentData, ICandidateAssessmentDetails, ICandidateMedicalReimbursement, ICandidateTravelReimbursementDetails, IEmployeeTravelAttachmentDetails, IEmployeeTravelJourneyDetails, ISearchCandidateAssessment, ISearchCandidateMedicalReimbursement, ISearchCandidateTravelReimbursement } from '../../../../interfaces/joining/candidate.interface';
declare var jQuery: any;
declare var html2pdf: any;
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-occandidatetravelreimbursementlist',
  templateUrl: './occandidatetravelreimbursementlist.component.html',
  styleUrls: ['./occandidatetravelreimbursementlist.component.css']
})
export class OccandidatetravelreimbursementlistComponent implements OnInit {

  searchFormTravelReimbursement: FormGroup;
  @ViewChild('dtofJoiningFrom', { static: false }) dtofJoiningFrom: ElementRef;
  @ViewChild('dtofJoiningTo', { static: false }) dtofJoiningTo: ElementRef;
  @ViewChild('dateOfJoining', { static: false }) dtOfJoining: ElementRef;
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
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
  allcandidateTravelReimbursementDetails: any[] = [];
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
  travelReimbursementList: ICandidateTravelReimbursementList[] = [];
  travelReimbursementProcessedList: ICandidateTravelReimbursementList[] = [];
  selectAll_pending: boolean;
  selectAll_processed: boolean;
  popupText: string;
  claimStatus: number;
  claimRemarks: string = "";
  callngIfFunction: boolean = true;
  zipFileName: string = "";
  // Download PDF
  searchCandidateTravelReimbursement: ISearchCandidateTravelReimbursement = {
    candidateId: null,
    candidateTravelReimbursementId: null,
  }
  candidateTravelReimbursementList: ICandidateTravelReimbursementDetails;
  travelReimbursementData: any;
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
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.activeTabName = this.persistance.get("activeTabName");
    if (this.activeTabName != null) {
      this.activeTabNameShow = this.activeTabName;
    }
    this.persistance.set('activeTabName', null);
    this.createNoticeReimbursementSearchForm();
    this.getAllVerticals();
    this.getAllCandidateTravelReimbursementList();
    this.getAllCandidateTravelReimbursementProccessedList();
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
    jQuery('#dataTable2').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable2').DataTable({
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
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
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
  onChangeFunction() {
    this.searchDepartment.functionId = this.searchFormTravelReimbursement.get("function").value;
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

  createNoticeReimbursementSearchForm() {
    this.searchFormTravelReimbursement = this.fb.group({
      candidateId: null,
      requisitionDetailId: null,
      candidateTravelReimbursementId: null,
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
  getAllCandidateTravelReimbursementList() {
    this.travelReimbursementList = [];
    this.onboardingCordinatorService.getCandidateTravelReimbursement(this.searchFormTravelReimbursement.value).subscribe((result) => {
      if (result) {
        this.travelReimbursementList = result;
        //  console.log("Travel Reimbursement Pending Details", this.travelReimbursementList);
        this.travelReimbursementList = this.travelReimbursementList.filter(e => e.approvalStatus == 1);
        this.SpinnerService.hide();
      }
      else {
        this.travelReimbursementList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      jQuery(".custom-menu").hide();
      this.loadDataTable();
      this.SpinnerService.hide();
    });
  }
  onSearchTravelReimbursement() {
    this.searchFormTravelReimbursement.patchValue(
      {
        dtofJoiningFrom: this.dtofJoiningFrom.nativeElement.value,
        dtofJoiningTo: this.dtofJoiningFrom.nativeElement.value,
        approvalStatus: 1
      });
    this.getAllCandidateTravelReimbursementList();
  }
  onResetClickPending() {
    jQuery(".custom-menu").hide();
    this.searchFormTravelReimbursement.reset();
    this.searchFormTravelReimbursement.patchValue(
      {
        approvalStatus: 1
      });
    this.getAllCandidateTravelReimbursementList();
  }
  onClickPendingTab() {
    jQuery(".custom-menu").hide();
    jQuery("#chkAll_pending").prop("checked", false);
    //this.searchFormTravelReimbursement.patchValue(
    //  {
    //    approvalStatus: 1
    //  });
    this.getAllCandidateTravelReimbursementList();
  }
  onClickProcessedTab() {
    jQuery("#chkAll_processed").prop("checked", false);
    jQuery(".custom-menu").hide();
    //this.searchFormTravelReimbursement.patchValue(
    //  {
    //    approvalStatus: null
    //  });
    this.getAllCandidateTravelReimbursementProccessedList();
  }

  getAllCandidateTravelReimbursementProccessedList() {
    this.travelReimbursementProcessedList = [];
    this.onboardingCordinatorService.getCandidateTravelReimbursement(this.searchFormTravelReimbursement.value).subscribe((result) => {
      if (result) {
        this.travelReimbursementProcessedList = result;
        this.travelReimbursementProcessedList = this.travelReimbursementProcessedList.filter(e => e.approvalStatus == 2 || e.approvalStatus == 3);
        // console.log("Travel Reimbursement Processed Details", this.travelReimbursementList);
        this.SpinnerService.hide();
      }
      else {
        this.travelReimbursementProcessedList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      jQuery(".custom-menu").hide();
      this.loadDataTable2();
      this.SpinnerService.hide();
    });
  }
  onCheckSelectAll_pending(eve) {
    var firstHiringStatusId = this.travelReimbursementList[0].approvalStatus;
    var flag = 0;
    this.travelReimbursementList.forEach(element => {
      if (element.approvalStatus != firstHiringStatusId) {
        flag = 1
      }
    })
    if (flag == 0) {
      this.travelReimbursementList.forEach(element => {
        element.checked = eve.target.checked;
      })
    } else {
      jQuery("#chkAll_pending").prop("checked", false);
      this.notificationService.showError("Please select same approval status", "Error");
    }
  }
  onCheckSelectAll_Processed(eve) {
    var firstHiringStatusId = this.travelReimbursementProcessedList[0].approvalStatus;
    var flag = 0;
    this.travelReimbursementProcessedList.forEach(element => {
      if (element.approvalStatus != firstHiringStatusId) {
        flag = 1
      }
    })
    if (flag == 0) {
      this.travelReimbursementProcessedList.forEach(element => {
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
  onClickApprove() {
    this.popupText = "Approve";
    this.claimStatus = 3;
  }
  onClickReject() {
    this.popupText = "Reject";
    this.claimStatus = 4;
  }
  getEnableStatus(data) {
    return data.checked;
  }
  onCheckRowWise(data, eve, index) {
    if (this.GetSelectedHiringStatus(data)) {
      data.checked = eve.target.checked;
      if (data.checked == true) {
        this.SpinnerService.show();
        this.getAllCandidateTravelReimDetails(data);
        this.allcandidateTravelReimbursementDetails.push({ CandidateId: data.candidateId.toString(), EmpNo: data.empNo, EmpName: data.candidateFullName, RequisitionDetailsId: data.requisitionDetailId });
        this.SpinnerService.hide();

      }
      else if (data.checked == false) {
        this.allcandidateTravelReimbursementDetails = this.allcandidateTravelReimbursementDetails.filter(e => e != data.candidateId.toString());
      }
    } else {
      jQuery("#" + index).prop("checked", false);
      this.notificationService.showError("Please select same Approval status", "Error");
    }
  }

  showActionButton() {
    var checkedObj = this.travelReimbursementList.find(e => e.checked == true); //&& e.hiringStatusId == 52
    return checkedObj == null ? false : true;
  }
  GetSelectedHiringStatus(NewRow) {
    var AlredyChecked = this.travelReimbursementList.find(e => e.checked);
    if (AlredyChecked == null) {
      return true;
    } else {
      return AlredyChecked.approvalStatus == NewRow.approvalStatus;
    }
  }
  onSearchTravelReimbursementProcessed() {
    this.searchFormTravelReimbursement.patchValue(
      {
        dtofJoiningFrom: this.dtofJoiningFrom.nativeElement.value,
        dtofJoiningTo: this.dtofJoiningFrom.nativeElement.value,
        //approvalStatus: null
      });
    this.getAllCandidateTravelReimbursementProccessedList();
  }
  onResetClickProcessed() {
    this.searchFormTravelReimbursement.reset();
    this.searchFormTravelReimbursement.patchValue(
      {
        approvalStatus: 0
      });
    this.getAllCandidateTravelReimbursementProccessedList();
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
    if (flag == 0) {
      var candidateNoString = "";
      var requisitionDetailIdString = "";
      var candidateTravelReimbursementIdString = "";
      var cflag = 0;
      var canflag = 0;
      var reqflag = 0;
      this.travelReimbursementList.forEach(element => {
        if (element.checked) {
          candidateNoString += (cflag == 0 ? "" : ",") + element.candidateId.toString();
          cflag = 1;
          candidateTravelReimbursementIdString += (canflag == 0 ? "" : ",") + element.candidateTravelReimbursementId.toString();
          canflag = 1;
          requisitionDetailIdString += (reqflag == 0 ? "" : ",") + element.requisitionDetailId.toString();
          reqflag = 1;
        }
      })

      let obj = {
        candidateTravelReimbursementId: candidateTravelReimbursementIdString,
        //candidateTravelReimbursementId: null,
        requisitionDetailId: requisitionDetailIdString,
        candidateId: candidateNoString,
        approvalStatus: this.claimStatus,
        approvalRemarks: this.claimRemarks,
        createdBy: this.loginUserId
      }
      // console.log("obj", obj)
      // console.log("find", this.travelReimbursementList)
      this.SpinnerService.show();
      this.onboardingCordinatorService.saveTravelClaimStatus(obj).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            // this.onClickProcessedTab();
            this.loadDataTable();
            this.loadDataTable2();
            jQuery("#chkAll_processed").prop("checked", false);
            jQuery("#chkAll_pending").prop("checked", false);
            jQuery("#myModal").modal("hide");
            this.onClickPendingTab();
            this.claimRemarks = "";
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
    else {
      this.notificationService.showError(msg, "Error");
    }

  }
  onClickViewDetails(data, PageName) {
    if (PageName == "Processed") {
      this.persistance.set('activeTabName', "Processed");
    }
    else {
      this.persistance.set('activeTabName', "Pending");
    }
    jQuery(".custom-menu").hide();
    this._route.navigate(['/app/oc-view-travel-reimbursement-details'], { queryParams: { CandidateId: data.candidateId, CandidateTravelReimbursementId: data.candidateTravelReimbursementId } });
  }
  onClickDownload(data) {
    this.searchCandidateTravelReimbursement.candidateId = data.candidateId;
    this.searchCandidateTravelReimbursement.candidateTravelReimbursementId = data.candidateTravelReimbursementId;
    this.candidateService.getCandidateTravelReimbursementDetails(this.searchCandidateTravelReimbursement).subscribe((result) => {
      if (result) {
        this.candidateTravelReimbursementList = result;
        this.travelReimbursementData = this.candidateTravelReimbursementList;
        // console.log("Travel Reimbursement Details On Download Click", this.travelReimbursementData);
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
        // this.loadDatePicker();
        this.downloadTravelReimbursement(data);
      }, 1000);
      this.SpinnerService.hide();
    });
  }

  downloadTravelReimbursement(data) {
    var htmlstring = document.getElementById("printTravelReimbursementDiv").innerHTML;
    var dom = document.createElement('div');
    dom.innerHTML = htmlstring;
    html2pdf(dom, {
      margin: 6,
      filename: data.empNo + "_Travel_Reimbursement.pdf",
      image: { type: 'jpeg', quality: 0.98 },
      //html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      html2canvas: { scale: 3, y: 0, scrollY: 0 },
      //jsPDF: { format: 'A4' },
      //jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      jsPDF: { format: 'A4', orientation: 'portrait' },
    });
  }

  downloadAllDocuments() {

    this.SpinnerService.show();
    var candidateId = "";
    // for (var val of this.allcandidateTravelReimbursementDetails) {
    //   candidateId += val + ","
    // }
    if (this.allcandidateTravelReimbursementDetails.length > 0) {
      var firstCandidateDetails = this.allcandidateTravelReimbursementDetails[0]
      this.downloadMultipleZip(firstCandidateDetails);
    }

  }
  downloadMultipleZip(record) {
    this.zipFileName = record.EmpNo + "_" + record.EmpName.split('.').join("").split(' ').join("") + "_Travel_Reimbursement_Document_Details";
    let obj = {
      requisitionDetailId: record.RequisitionDetailsId,
      CandidateId: record.CandidateId,
    };
    this.onboardingCordinatorService.downloadFileForPreEmployeeTravel(obj).subscribe(
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
            this.allcandidateTravelReimbursementDetails = this.allcandidateTravelReimbursementDetails.filter(e => e.EmpNo != record.EmpNo);
            if (this.allcandidateTravelReimbursementDetails.length > 0) {
              this.downloadMultipleZip(this.allcandidateTravelReimbursementDetails[0]);
            } else {
              this.getAllCandidateTravelReimbursementList();
            }
            break;
        }
        this.SpinnerService.hide();

      },
      error => {
      }
    );
  }

  getAllCandidateTravelReimDetails(data) {
    this.searchCandidateTravelReimbursement.candidateId = data.candidateId;
    this.searchCandidateTravelReimbursement.candidateTravelReimbursementId = data.candidateTravelReimbursementId;
    this.candidateService.getCandidateTravelReimbursementDetails(this.searchCandidateTravelReimbursement).subscribe((result) => {
      if (result) {
        this.travelReimbursementData = result;
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
