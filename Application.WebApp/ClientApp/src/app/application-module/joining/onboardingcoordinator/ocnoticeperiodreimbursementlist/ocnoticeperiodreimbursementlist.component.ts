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
import { ICandidateMedicalReimbursementlist, ICandidateNoticePeriodBuyOutList } from 'src/app/interfaces/joining/onboardingcoordinator.interface';
import { IFunctionDepartment, ISearchDepartment } from 'src/app/interfaces/common/department.interface';
import { HttpEventType } from '@angular/common/http';
declare var jQuery: any;

@Component({
  selector: 'app-ocnoticeperiodreimbursementlist',
  templateUrl: './ocnoticeperiodreimbursementlist.component.html',
  styleUrls: ['./ocnoticeperiodreimbursementlist.component.css']
})
export class OcnoticeperiodreimbursementlistComponent implements OnInit {


  searchFormNoticeReimbursement: FormGroup;
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
  noticeperiodData:any={};
  noticeperiodDataRecord:any;
  searchLocation: ISearchLocation =
    {
      locationId: null,
      verticalId: null,
      locationCode: null,
      locationNo: null,
      isActive: true
    };
  selectedLocationId: number;
  candidateIdArrayForbulkDwnld:any=[];
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
  zipFileName:string="";
  departments: IFunctionDepartment[] = [];
  selectedDepartment: IFunctionDepartment;
  searchDepartment: ISearchDepartment = {
    departmentId: null,
    functionId: null,
    verticalId: null,
    isActive: true
  }
  selectAll_pending: boolean;
  selectAll_processed: boolean;
  popupText: string;
  claimStatus: number;
  claimRemarks: string = "";
  callngIfFunction: boolean = true;
  noticePeriodReimbursement: ICandidateNoticePeriodBuyOutList[] = [];
  noticePeriodReimbursementProcessed: ICandidateNoticePeriodBuyOutList[] = [];
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
    this.createMedicalReimbursementSearchForm();
    this.getAllVerticals();
    this.getAllCandidateNoticeReimbursementList();
    this.getAllCandidateNoticeReimbursementProccessedList();
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
      });
    });
  }
  loadDataTable2() {
    jQuery('#dataTable2').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable2').DataTable({
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
    this.searchDepartment.functionId = this.searchFormNoticeReimbursement.get("function").value;
    this.getAllDepartment();
  }
  //department
  getAllDepartment() {
    this.departments = [];
    // this.searchDepartment.verticalId = this.StaticVerticalId;
    this.departmentService.getAllFunctionDepartment(this.searchDepartment).subscribe((result) => {
      if (result) {
        this.departments = result;
        // console.log("Department", this.departments);

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
    this.searchFormNoticeReimbursement = this.fb.group({
      candidateId: null,
      requisitionDetailId: null,
      candidateNoticePeriodBuyOutDaysId: null,
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
  getAllCandidateNoticeReimbursementList() {
    this.noticePeriodReimbursement = [];
    this.onboardingCordinatorService.getCandidateNoticePeriodReimbursement(this.searchFormNoticeReimbursement.value).subscribe((result) => {
      if (result) {
        this.noticePeriodReimbursement = result;
        //console.log("Piu", result)
        this.noticePeriodReimbursement = this.noticePeriodReimbursement.filter(e => e.approvalStatus == 1 || e.approvalStatus==5);
        // console.log("Candiaddate Notice Reimbursement Pending List", this.noticePeriodReimbursement);
        this.SpinnerService.hide();
      }
      else {
        this.noticePeriodReimbursement = [];
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
  getAllCandidateNoticeReimbursementProccessedList() {
    this.noticePeriodReimbursementProcessed = [];
    this.onboardingCordinatorService.getCandidateNoticePeriodReimbursement(this.searchFormNoticeReimbursement.value).subscribe((result) => {
      if (result) {
        this.noticePeriodReimbursementProcessed = result;
        this.noticePeriodReimbursementProcessed = this.noticePeriodReimbursementProcessed.filter(e => e.approvalStatus == 2 || e.approvalStatus == 3);
        //console.log("Notice period Processed List", this.noticePeriodReimbursement);

        this.SpinnerService.hide();
      }
      else {
        this.noticePeriodReimbursementProcessed = [];
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
  onSearchNoticePeriodBuyoutReimbursement() {
    this.searchFormNoticeReimbursement.patchValue(
      {
        dtofJoiningFrom: this.dtofJoiningFrom.nativeElement.value,
        dtofJoiningTo: this.dtofJoiningFrom.nativeElement.value,
        //approvalStatus: 1
      });
    this.getAllCandidateNoticeReimbursementList();
  }
  onResetClickPending() {
    this.searchFormNoticeReimbursement.reset();
    //this.searchFormNoticeReimbursement.patchValue(
    //  {
    //    approvalStatus: 1
    //  });
    this.getAllCandidateNoticeReimbursementList();
  }

  onCheckSelectAll_pending(eve) {
    var firstHiringStatusId = this.noticePeriodReimbursement[0].approvalStatus;
    var flag = 0;
    this.noticePeriodReimbursement.forEach(element => {
      if (element.approvalStatus != firstHiringStatusId) {
        flag = 1
      }
    })
    if (flag == 0) {
      this.noticePeriodReimbursement.forEach(element => {
        element.checked = eve.target.checked;
      })
    } else {
      jQuery("#selectAll_pending").prop("checked", false);
      this.notificationService.showError("Please select same approval status", "Error");
    }
  }
  onCheckSelectAll_processed(eve) {
    var firstHiringStatusId = this.noticePeriodReimbursementProcessed[0].approvalStatus;
    var flag = 0;
    this.noticePeriodReimbursementProcessed.forEach(element => {
      if (element.approvalStatus != firstHiringStatusId) {
        flag = 1
      }
    })
    if (flag == 0) {
      this.noticePeriodReimbursementProcessed.forEach(element => {
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
    this.claimRemarks = "";
  }
  onClickApprove() {
    this.popupText = "Approve";
    this.claimStatus = 3;
    this.claimRemarks = "";
  }
  onClickReject() {
    this.popupText = "Reject";
    this.claimStatus = 4;
    this.claimRemarks = "";
  }
  getEnableStatus(data) {
    return data.checked;
  }
  onCheckRowWise(data, eve, index) {
    if (this.GetSelectedHiringStatus(data)) {
      data.checked = eve.target.checked;
      if(data.checked==true){
        this.candidateIdArrayForbulkDwnld.push({ 
          CandidateId: data.candidateId.toString(),
          EmpNo: data.empNo,
          EmpName: data.candidateFullName, 
          RequisitionDetailsId: data.requisitionDetailId 
        });
      }
      else if(data.checked==false){
        this.candidateIdArrayForbulkDwnld=this.candidateIdArrayForbulkDwnld.filter(e=> e.CandidateId!= data.candidateId.toString());
      }
    } else {
      jQuery("#" + index).prop("checked", false);
      this.notificationService.showError("Please select same Approval status", "Error");
    }
  }
  onCheckRowWiseProcessed(data, eve, index) {
    if (this.GetSelectedHiringStatusProcessed(data)) {
      data.checked = eve.target.checked;
      if (data.checked == true) {
        this.candidateIdArrayForbulkDwnld.push({
          CandidateId: data.candidateId.toString(),
          EmpNo: data.empNo,
          EmpName: data.candidateFullName,
          RequisitionDetailsId: data.requisitionDetailId
        });
      }
      else if (data.checked == false) {
        this.candidateIdArrayForbulkDwnld = this.candidateIdArrayForbulkDwnld.filter(e => e.CandidateId != data.candidateId.toString());
      }
    } else {
      jQuery("#" + index).prop("checked", false);
      this.notificationService.showError("Please select same Approval status", "Error");
    }
  }
  showActionButton() {
    var checkedObj = this.noticePeriodReimbursement.find(e => e.checked == true); //&& e.hiringStatusId == 52
    return checkedObj == null ? false : true;
  }
  showActionButtonProcessed() {
    var checkedObj = this.noticePeriodReimbursementProcessed.find(e => e.checked == true); //&& e.hiringStatusId == 52
    return checkedObj == null ? false : true;
  }
  GetSelectedHiringStatus(NewRow) {
    var AlredyChecked = this.noticePeriodReimbursement.find(e => e.checked);
    if (AlredyChecked == null) {
      return true;
    } else {
      return AlredyChecked.approvalStatus == NewRow.approvalStatus;
    }
  }
  GetSelectedHiringStatusProcessed(NewRow) {
    var AlredyChecked = this.noticePeriodReimbursementProcessed.find(e => e.checked);
    if (AlredyChecked == null) {
      return true;
    } else {
      return AlredyChecked.approvalStatus == NewRow.approvalStatus;
    }
  }
  onClickPendingTab() {
    this.noticePeriodReimbursement = [];
    jQuery("#chkAll_pending").prop("checked", false);
    //this.searchFormNoticeReimbursement.patchValue(
    //  {
    //    approvalStatus: 1
    //  });
    this.getAllCandidateNoticeReimbursementList();
  }
  onClickProcessedTab() {
    this.noticePeriodReimbursementProcessed = [];
    jQuery("#chkAll_pending").prop("checked", false);
    //this.searchFormNoticeReimbursement.patchValue(
    //  {
    //    approvalStatus: null
    //  });
    this.getAllCandidateNoticeReimbursementProccessedList();
  }
  onSearchNoticePeriodBuyoutReimbursementProcessed() {
    this.searchFormNoticeReimbursement.patchValue(
      {
        dtofJoiningFrom: this.dtofJoiningFrom.nativeElement.value,
        dtofJoiningTo: this.dtofJoiningFrom.nativeElement.value,
        //approvalStatus: null
      });
    this.getAllCandidateNoticeReimbursementProccessedList();
  }
  onResetClickProcessed() {
    this.searchFormNoticeReimbursement.reset();
    //this.searchFormNoticeReimbursement.patchValue(
    //  {
    //    approvalStatus: null
    //  });
    this.getAllCandidateNoticeReimbursementProccessedList();
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
      var cflag = 0;
      this.noticePeriodReimbursement.forEach(element => {
        if (element.checked) {
          candidateNoString += (cflag == 0 ? "" : ",") + element.candidateId.toString();
          cflag = 1;
        }
      })

      let obj = {
        //candidateMedicalReimbursementId: this.medicalReimbursementList[0].candidateMedicalReimbursementId,
        candidateMedicalReimbursementId: null,
        // candidateNoticePeriodBuyOutDaysId: this.noticePeriodReimbursement[0],
        requisitionDetailId: this.noticePeriodReimbursement[0].requisitionDetailId,
        candidateId: candidateNoString,
        approvalStatus: this.claimStatus,
        approvalRemarks: this.claimRemarks,
        CreatedBy: this.loginUserId,
        //CandidateIdForEmail: this.noticePeriodReimbursement[0].candidateId
        EmailId: this.noticePeriodReimbursement[0].emailId
      }
      this.SpinnerService.show();
      this.onboardingCordinatorService.saveNoticePeriodBuyoutClaimStatus(obj).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.onClickPendingTab();
            this.claimRemarks = "";
            // this.onClickProcessedTab();
            this.loadDataTable();
            this.loadDataTable2()
            jQuery("#selectAll_pending").prop("checked", false);
            jQuery("#chkAll_processed").prop("checked", false);
            jQuery("#myModal").modal("hide");
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
  onClickViewDetailsForPending(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('activeTabName', "Pending");
    this._route.navigate(['/app/oc-view-noticeperiod-reimburshment-list'], { queryParams: { CandidateId: data.candidateId, CandidateNoticePeriodBuyOutDaysId: data.candidateNoticePeriodBuyOutDaysId } });
  }
  onClickViewDetailsForProcessed(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('activeTabName', "Processed");
    this._route.navigate(['/app/oc-view-noticeperiod-reimburshment-list'], { queryParams: { CandidateId: data.candidateId, CandidateNoticePeriodBuyOutDaysId: data.candidateNoticePeriodBuyOutDaysId } });
  }
  onClickDownload(){
    var candidateIdString="";

    if (this.candidateIdArrayForbulkDwnld.length > 0) {
      var firstCandidateDetails = this.candidateIdArrayForbulkDwnld[0]
      this.downloadMultipleZip(firstCandidateDetails);
    }
    // for(var val of this.candidateIdArrayForbulkDwnld){
    //   candidateIdString += val.toString() +","
    // }
    // var obj={
    //   candidateId: candidateIdString.slice(0, -1),
    //   requisitionDetailId:null
    // }
    //console.log("values",obj);
   // this.zipFileName="Notice_period_Buyout_list";
  //   this.onboardingCordinatorService.downloadFileForNoticePeriod(obj).subscribe(
  //     data => {
  //       switch (data.type) {
  //         case HttpEventType.DownloadProgress:
  //           break;
  //         case HttpEventType.Response:
  //           const downloadedFile = new Blob([data.body], { type: data.body.type });
  //           const a = document.createElement('a');
  //           a.setAttribute('style', 'display:none;');
  //           document.body.appendChild(a);
  //           a.download = this.zipFileName;
  //           a.href = URL.createObjectURL(downloadedFile);
  //           a.target = '_blank';
  //           a.click();
  //           document.body.removeChild(a);
  //           break;
  //       }
  //       this.SpinnerService.hide();

  //     },
  //   error => {
  //   }
  // );
  }

  downloadMultipleZip(record) {
    this.zipFileName = record.EmpNo + "_" + record.EmpName.split('.').join("").split(' ').join("") + "_Notice_Period_Reimbursement_Document_Details";
    let obj = {
      requisitionDetailId: null,
      candidateId: record.CandidateId,
    };

    this.onboardingCordinatorService.downloadFileForNoticePeriod(obj).subscribe(
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
            this.candidateIdArrayForbulkDwnld = this.candidateIdArrayForbulkDwnld.filter(e => e.EmpNo != record.EmpNo);
            if (this.candidateIdArrayForbulkDwnld.length > 0) {
              this.downloadMultipleZip(this.candidateIdArrayForbulkDwnld[0]);
            } else {
              this.getAllCandidateNoticeReimbursementList();
            }
            break;
        }
        this.SpinnerService.hide();

      },
      error => {
      }
    );
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
