import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../../interfaces/common/doctor.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../../interfaces/common/function.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../../interfaces/common/position.interface';
import { IJoinersList, IPendingScheduleBatchWise, IPendingScheduleIndividual, IScheduledBatchWise, IScheduledIndividually, IReportingVenueExists } from '../../../../../interfaces/prejoining/joinerslist.interface';
import { IOnboardingCoordinator, ISearchOnboardingCoordinator, IVenue, ISearchVenue, IJoiningDocument, IWelcomeTemplate } from '../../../../../interfaces/prejoining/onboardingcoordinator.interface';
import { ICandidateDetailData, ISearchCandidateDetail, IModeOfJoining, ISearchModeOfJoining } from '../../../../../interfaces/preselection/candidate.interface';
import { IAssessemenrAssignReleaseList, IBatchAssessment, ICandidateAssessmentList, ISearchAssessmentAssignReleaseList } from '../../../../../interfaces/joining/programcoordinator.interface';
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
import { HiringteamService } from '../../../../../services/joining/hiringteam/hiringteam.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { IEmployeeNo, IOnboardingManager, IReassignHiringCandidateList, IsearchEmployeeNo, ISearchonboardingManager } from 'src/app/interfaces/joining/hiringteam.interface';
import { CandidateService } from 'src/app/services/preselection/candidate/candidate.service';
import { IRequisitionList, ISearchRequisition } from 'src/app/interfaces/preselection/requisition.interface';
import { RequisitionService } from 'src/app/services/preselection/requisition/requisition.service';
declare var jQuery: any;

@Component({
  selector: 'app-htcandidatelist',
  templateUrl: './htcandidatelist.component.html',
  styleUrls: ['./htcandidatelist.component.css']
})
export class HtcandidatelistComponent implements OnInit {
  searchFormHtCandidateList: FormGroup;
  @ViewChild('dtofJoiningFrom', { static: false }) dtofJoiningFrom: ElementRef;
  @ViewChild('dtofJoiningTo', { static: false }) dtofJoiningTo: ElementRef;
  @ViewChild('dateOfJoining', { static: false }) dtOfJoining: ElementRef;
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
  // onboarding Manager Dropdown
  // onBoardingManagerList: IOnboardingManager[] = [];
  // selectedOnBoardingManager: IOnboardingManager;
  // searchOnboardingManager: ISearchonboardingManager = {
  //   requisitionDetailId: null
  // }
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
  requisitionLists: IRequisitionList[] = [];
  requisitionPositionName: string;
  requisitionDepartmentName: string;
  requisitionFunctionName: string;
  requisitionVerticalId: number;
  requisitionFunctionId: number;

  onBoardingManagerList: any[] = [];
  searchRoleUser: any = {
    roleId: 0
  }
  EmailIdForJoining:string;
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  selectAll: boolean;
  reassignHiringCandidateList: IReassignHiringCandidateList[] = [];
  hiringTeamId: number;
  candidateId: number;
  reassignType: string;
  callngIfFunction: boolean = true;
  joiningDate: any;
  updatedJoiningDateArray: any[] = [];
  searchEmployeeNo: IsearchEmployeeNo = {
    candidateId: null
  }
  employeeNoDetails: IEmployeeNo[] = [];
  employeeNo: string;;
  allJoiningDateInformation: any[] = [];
  rejectremarks: string;  //arg
  actionNameReject: string; //arg
  actionName: string;
  declaineCandidateId: number;
  rejectCandidateId: number;
  declineremarks: string;
  tabName: string;
  tabeName: string;

  disableEmployeeNoField: boolean;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private requisitionService: RequisitionService,
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
    private hiringteamService: HiringteamService,
    private candidateService: CandidateService
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    //this.requisitionDetailId = this.persistance.get('paramid');
    this.requisitionDetailId = null;
    // alert(this.requisitionDetailId)
    //  alert("vertical Id");
    //  alert(this.verticalIds);
    //this.searchOnboardingManager.requisitionDetailId = this.requisitionDetailId==null?"0":this.requisitionDetailId.toString();
    this.createHtCandidateSearchForm();
    this.getAllVerticals();
    this.getAllOnboardingmanagerList();
    this.getAllRequisition();
    this.getAllReassignHiringCandidateList();

  }

  ngOnInit() {
    this.loadDataTable();
    this.loadDatePicker();
    this.tableOptionDropDown();
  }
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }
  // loadDatePicker() {
  //   jQuery(".datepicker").parent(".input-group").datepicker({
  //     autoclose: true,
  //     format: "dd/mm/yyyy",
  //     todayHighlight: true
  //   });
  // }
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
    // for (var i = 0; i < splitvertical.length; i++) {
    //   if (splitvertical[i] != "0") {
    //     if (splitvertical[i] == "1") {
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    //   }
    //   else if (splitvertical[i] == "2") {
    //     this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    //   }
    //   else if (splitvertical[i] == "3") {
    //     this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    //   }
    //   if (allvertical == "") {
    //     allvertical = splitvertical[i];
    //   }
    //   else {
    //     allvertical = allvertical + "," + splitvertical[i];
    //   }
    // }

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
  getAllRequisition() {
    this.requisitionDepartmentName = "";
    this.requisitionPositionName = "";
    this.requisitionFunctionName = "";
    this.requisitionFunctionId = 0;
    this.requisitionVerticalId = 0;
    this.searchRequisition.requisitionDetailId = this.requisitionDetailId
    this.requisitionService.getAllRequisition(this.searchRequisition).subscribe((result) => {
      if (result) {
        this.requisitionLists = result;
        for (var i = 0; i < this.requisitionLists.length; i++) {
          this.requisitionDepartmentName = this.requisitionLists[i].departmentName;
          this.requisitionPositionName = this.requisitionLists[i].positionName;
          this.requisitionFunctionName = this.requisitionLists[i].functionName;
          this.requisitionVerticalId = this.requisitionLists[i].verticalId;
          this.requisitionFunctionId = this.requisitionLists[i].functionId;
          this.getAllOnboardingmanagerList();
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
  getAllOnboardingmanagerList() {
    this.onBoardingManagerList = [];
    // if (this.requisitionVerticalId == 1) {
    //   this.searchRoleUser.roleId = 21
    // }
    // else if (this.requisitionVerticalId == 2) {
    //   this.searchRoleUser.roleId = 22
    // }
    // else if (this.requisitionVerticalId == 3) {
    //   this.searchRoleUser.roleId = 23
    // }
    console.log("Verticals", this.verticals);

    for (var i = 0; i < this.verticals.length; i++) {
      if (this.verticals[i].verticalId.toString() == "1") {
        this.searchRoleUser.roleId = 21
      }
      else if (this.verticals[i].verticalId.toString() == "2") {
        this.searchRoleUser.roleId = 22
      }
      else if (this.verticals[i].verticalId.toString() == "3") {
        this.searchRoleUser.roleId = 23
      }
    }
    //this.candidateService.getAllOnboardingManager(this.searchOnboardingManager).subscribe((result) => {
    this.commonService.getRoleWiseUserReassignCandidate(this.searchRoleUser).subscribe((result) => {
      if (result) {
        this.onBoardingManagerList = result;
        // console.log("OnBoarding Manager List", this.onBoardingManagerList);
      }
      else {
        this.onBoardingManagerList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
    // this.onBoardingManagerList = [];
    // this.candidateService.getAllOnboardingManager(this.searchOnboardingManager).subscribe((result) => {
    //   if (result) {
    //     this.onBoardingManagerList = result;        
    //   }
    //   else {
    //     this.onBoardingManagerList = [];
    //   }
    // }, error => {
    //   console.log(error);
    // }, () => {
    //   // this.loadSelectPicker();
    // });
  }
  createHtCandidateSearchForm() {
    this.searchFormHtCandidateList = this.fb.group({
      //requisitionDetailId: this.requisitionDetailId,
      requisitionDetailId: null,
      candidateId: null,
      candidateNo: [''],
      name: [''],
      verticalId: 1,
      locationId: null,
      functionId: null,
      hiringStatus: null,
      dtofJoiningFrom: [''],
      dtofJoiningTo: [''],
    });
  }
  // onSearchCandidateList() {              // By  Piu on 05-08-2023
  //   this.searchFormHtCandidateList.patchValue(
  //     {
  //       dtofJoiningFrom: this.dtofJoiningFrom.nativeElement.value,
  //       dtofJoiningTo: this.dtofJoiningFrom.nativeElement.value
  //     });
  //   this.getAllReassignHiringCandidateList();
  // }

  onSearchCandidateList() {       // By  Piu on 05-08-2023
    var flag = 0
    this.searchFormHtCandidateList.patchValue(
      {
        dtofJoiningFrom: this.dtofJoiningFrom.nativeElement.value,
        dtofJoiningTo: this.dtofJoiningTo.nativeElement.value
      });
    if (this.dtofJoiningFrom.nativeElement.value.length > 0 && this.dtofJoiningTo.nativeElement.value.length > 0) {
      const [fday, fmonth, fyear] = this.dtofJoiningFrom.nativeElement.value.split("/");
      const fdate = new Date(fyear, fmonth - 1, fday);
      const [tday, tmonth, tyear] = this.dtofJoiningTo.nativeElement.value.split("/");
      const tdate = new Date(tyear, tmonth - 1, tday);
      if (fdate > tdate) {
        this.notificationService.showError("To Date Can't be less than From Date !! Please provide actual date", "Error");
        flag = 1;
      }
    }
    if (flag == 0) {
      this.getAllReassignHiringCandidateList();
    }
  }
  onClickResetClick() {
    this.searchFormHtCandidateList.reset();
    this.searchFormHtCandidateList.patchValue(
      {
        // requisitionDetailId: this.requisitionDetailId
        requisitionDetailId: null
      });
    this.getAllReassignHiringCandidateList();
  }
  getAllReassignHiringCandidateList() {
    this.reassignHiringCandidateList = [];
    var roleId=[]
    this.hiringteamService.getAllReassignforRejectCandidate(this.searchFormHtCandidateList.value).subscribe((result) => {
      if (result) {
        
        roleId=this.persistance.get('loggedinuser').roleIds.split(",");
        if(roleId.includes("41")){
        this.reassignHiringCandidateList = result;
        }
        else{
          this.reassignHiringCandidateList = result.filter(e => Number(e.hiringTeamId)== Number(this.loginUserId));
        }
        console.log("Reassign Candidate Hiring List", this.reassignHiringCandidateList);
        this.SpinnerService.hide();
      }
      else {
        this.reassignHiringCandidateList = [];
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
    var firstHiringStatusId = this.reassignHiringCandidateList[0].hiringStatusId;
    var flag = 0;
    this.reassignHiringCandidateList.forEach(element => {
      if (element.hiringStatusId != firstHiringStatusId) {
        flag = 1
      }
    })
    if (flag == 0) {
      this.reassignHiringCandidateList.forEach(element => {
        element.checked = eve.target.checked;
      })
    } else {
      jQuery("#chkAll").prop("checked", false);
      this.notificationService.showError("Please select same hiring status", "Error");
    }
  }
  getEnableStatus(data) {
    return data.checked;
  }
  onCheckRowWise(data, eve, index) {
    if (this.GetSelectedHiringStatus(data)) {
      data.checked = eve.target.checked;
    } else {
      jQuery("#" + index).prop("checked", false);
      this.notificationService.showError("Please select same hiring status", "Error");
    }
  }
  GetSelectedHiringStatus(NewRow) {
    var AlredyChecked = this.reassignHiringCandidateList.find(e => e.checked);
    if (AlredyChecked == null) {
      return true;
    } else {
      return AlredyChecked.hiringStatusId == NewRow.hiringStatusId;
    }
  }

  onClickReassignCandidate(data) {
    this.reassignType = "I";
    this.candidateId = data.candidateId;
  }
  btnClickReassignCandidate() {
    this.reassignType = "A";
    this.candidateId = 0;
  }
  showBtnReassignCandidate() {
    var checkedObj = this.reassignHiringCandidateList.find(e => e.checked == true); //&& e.hiringStatusId == 52
    return checkedObj == null ? false : true;
  }
  onReassignCandidateSave() {
    if (this.hiringTeamId == null) {
      this.notificationService.showError("Please select a Hiring Team", "Error");
    } else {
      //jQuery(".txtrejectremarks").removeClass("is-invalid");
      // msg="";
      let finalSubmitObj = {
        candidateId: "",
        hiringTeamId: this.hiringTeamId,
        createdBy: this.loginUserId
      }
      if (this.reassignType == "A") {
        var candidateIdString = "";
        var cflag = 0;
        this.reassignHiringCandidateList.forEach(element => {
          if (element.checked) {
            candidateIdString += (cflag == 0 ? "" : ",") + element.candidateId.toString();
            cflag = 1;
          }
        })
        finalSubmitObj.candidateId = candidateIdString;
      } else {
        finalSubmitObj.candidateId = this.candidateId.toString();
      }
      this.SpinnerService.show();
      this.hiringteamService.reassignCandidateSave(finalSubmitObj).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.createHtCandidateSearchForm();
            this.getAllVerticals();
            this.getAllOnboardingmanagerList();
            this.getAllReassignHiringCandidateList();
            this.loadDataTable();
            this.hiringTeamId = null;
            jQuery("#reassignCandidate").modal("hide");
            jQuery("#chkAll").prop("checked", false);


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
  onClickJoiningCheckList(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTab', "Scheduled");
    this.persistance.set('childActiveTab', "Individual");
    this._route.navigate(['/app/ht-joiningchecklist'], { queryParams: { CandidateId: data.candidateId, CandidateNo: data.candidateNo, From: "ht", Type: "C",HiringStatus: data.hiringStatusName  } });
  }
  onClickUpdateJoningDate(data) {
    this.EmailIdForJoining=data.emailId;
    this.getCandidateJoningDate(data.candidateId);
  }
  getCandidateJoningDate(candidateId) {
    let joiningDateObj = {
      candidateId: candidateId.toString()
    }
    this.allJoiningDateInformation = [];
    this.corporateService.getJoiningDateDetails(joiningDateObj).subscribe((result) => {
      if (result) {
        this.allJoiningDateInformation = result;
        this.joiningDate = "";
        this.updatedJoiningDateArray = [];
        if (this.allJoiningDateInformation.length > 0) {
          let joiningCandidateObj = {
            candidateId: this.allJoiningDateInformation[0].candidateId,
            requisitionDetailId: this.allJoiningDateInformation[0].requisitionDetailId,
            dateofJoining: this.allJoiningDateInformation[0].dateofJoining,
            modeofJoining: this.allJoiningDateInformation[0].modeofJoing.toString(),
            positionCode: this.allJoiningDateInformation[0].positionCode,
            remarks: this.allJoiningDateInformation[0].remarks,
            candidateName: this.allJoiningDateInformation[0].candidateFullName
          }
          this.joiningDate = this.allJoiningDateInformation[0].dateofJoining;
          this.updatedJoiningDateArray.push(joiningCandidateObj);
          // console.log("Update Joining Date Array", this.updatedJoiningDateArray);

        }
      }
      else {
        this.allJoiningDateInformation = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      // this.loadSelectPicker();
    });
  }
  onUpdateJoiningDate() {
    if (this.dtOfJoining.nativeElement.value == "") {
      this.notificationService.showError("Please select date", "Error");
    } else {
      this.updatedJoiningDateArray[0].dateofJoining = this.dtOfJoining.nativeElement.value;
      let finalSubmitObj = {
        candidateJoiningDates: this.updatedJoiningDateArray,
        EmailId:this.EmailIdForJoining,
        createdBy: this.loginUserId
      }
      //  console.log("Update Joining date Obj", finalSubmitObj);
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
            this.createHtCandidateSearchForm();
            this.getAllVerticals();
            this.getAllOnboardingmanagerList();
            this.getAllReassignHiringCandidateList();
            this.loadDataTable();
            jQuery("#updateJoiningDateModal").modal("hide");
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
  onClickUpdateEmployeeNo(data) {
    this.searchEmployeeNo.candidateId = data.candidateId;
    this.getEmployeeNoDeatils();
  }
  getEmployeeNoDeatils() {
    this.employeeNoDetails = [];
    this.hiringteamService.getEmployeeNoDetails(this.searchEmployeeNo).subscribe((result) => {
      if (result) {
        this.employeeNoDetails = result;
        //  console.log("Employee No Details", this.employeeNoDetails);

        this.SpinnerService.hide();
        // this.employeeNo = Number(this.employeeNoDetails[0].empployeeNo);
        if (this.employeeNoDetails[0].empployeeNo == "0") {
          this.employeeNo = "";
          this.disableEmployeeNoField = false;
        } else {
          this.employeeNo = this.employeeNoDetails[0].empployeeNo;
          this.disableEmployeeNoField = true;
        }
      }
      else {
        this.employeeNoDetails = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  onUpdateEmployeeNo() {
    if (this.employeeNo == null || this.employeeNo == "") {
      this.notificationService.showError("Please Enter Employee No", "Error");
    } else {
      let finalSubmitObj = {
        candidateId: this.employeeNoDetails[0].candidateId,
        empployeeId: this.employeeNoDetails[0].empId,
        //empployeeNo: Number(this.employeeNo),
        empployeeNo: this.employeeNo,
        createdBy: this.loginUserId,
        candidateName: this.reassignHiringCandidateList[0].candidateFullName,
        emailId: this.reassignHiringCandidateList[0].emailId,
        Password: "welcome@1234"
      }
  //  console.log("Update Employee No Obj", finalSubmitObj);
      this.SpinnerService.show();
      this.hiringteamService.updateEmployeeNo(finalSubmitObj).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.createHtCandidateSearchForm();
            this.getAllVerticals();
            this.getAllOnboardingmanagerList();
            this.getAllReassignHiringCandidateList();
            this.loadDataTable();
            this.employeeNo = "";
            jQuery("#updateEmployeeNoModal").modal("hide");
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
  onClickVerifyDocument(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "htcandidatelist");
    this.persistance.set('nextpagename', "htverifydocument");
    this.persistance.set('candidateId', data.candidateId);
    this.persistance.set('paramid', data.requisitionDetailId);
    this.persistance.set('sendType', "C");
    this._route.navigate(['app/ht-document-verification']);
  }
  openModalPopupRejectDeclineCallBack(statusId, candidateId, tabName) {
    this.actionName = "Declined";   
    this.declaineCandidateId = candidateId;
    this.tabName == tabName;
  }
  openModalForReject(candidateId, tabeName){
    this.actionNameReject = "Reject";
    this.rejectCandidateId = candidateId;
    this.tabeName == tabeName;
  }

  ProcessCandidate() {
    var formdata = {
      candidateIds: this.declaineCandidateId.toString(),
      requisitionDetailId: 0,
      hiringStatusId: 55,
      createdBy: this.loginUserId,
      remarks: this.declineremarks
    }
    this.requisitionService.updateRequisitionCandidateRejectDeclineCallBack(formdata).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          this.createHtCandidateSearchForm();
          // this.getAllVerticals();
          // // this.getAllOnboardingmanagerList();
          // this.getAllRequisition();
          this.getAllReassignHiringCandidateList();
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
  ForRejectCandidate(){
    var formdata = {
      candidateIds: this.rejectCandidateId.toString(),
      requisitionDetailId: 0,
      hiringStatusId: 4,
      createdBy: this.loginUserId,
      remarks: this.rejectremarks
    }
    this.requisitionService.updateRequisitionCandidateRejectDeclineCallBack(formdata).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          this.createHtCandidateSearchForm();
          this.getAllReassignHiringCandidateList();
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
}

