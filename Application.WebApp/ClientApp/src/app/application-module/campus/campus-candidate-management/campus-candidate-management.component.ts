import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { element } from 'protractor';
import { CorporateallocationService } from 'src/app/services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { RequisitionService } from 'src/app/services/preselection/requisition/requisition.service';
import { IDocumentStatus, IHiringStatus, ISearchDocumentStatus } from 'src/app/interfaces/common/common.interface';
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from 'src/app/interfaces/common/location.interface';
import { IPositionGrade, ISearchPositionGrade } from 'src/app/interfaces/common/position.interface';
import { IPendingCandidateList } from 'src/app/interfaces/prejoining/pendingcandidatelist.interface';
import { IDoctor, ISearchDoctor } from 'src/app/interfaces/common/doctor.interface';
import { IModeOfJoining, ISearchModeOfJoining } from 'src/app/interfaces/preselection/candidate.interface';
import { IRequisitionList, ISearchRequisition } from 'src/app/interfaces/preselection/requisition.interface';
import { ShareddataService } from 'src/app/sharedservices/shareddata.service';
import { LocationService } from 'src/app/services/common/location/location.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { CommonService } from 'src/app/services/common/common/common.service';
import { RecruitmentmanagerService } from 'src/app/services/prejoining/recruitmentmanager/recruitmentmanager.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { PositionService } from 'src/app/services/common/position/position.service';
import { CandidateService } from 'src/app/services/preselection/candidate/candidate.service';
import { ISearchFunction, IVerticalFunction } from 'src/app/interfaces/common/function.interface';
declare var jQuery: any;

@Component({
  selector: 'app-campus-candidate-management',
  templateUrl: './campus-candidate-management.component.html',
  styleUrls: ['./campus-candidate-management.component.css']
})
export class CampusCandidateManagementComponent implements OnInit {

  searchform: FormGroup;
  saveform: FormGroup;
  //HiringStatus
  candidateLists: IHiringStatus[] = [];
  searchCandidateNo: IHiringStatus = {
    hiringStatusId: null,
    hiringStatusName: null,
  }
  //vertical
  verticals: IVertical[] = [];
  selectedPendingVertical: IVertical;
  selectedVerticalId: number;
  defaultverticalId: number;
  //selectedVertical: IVertical;
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

  //grade
  grades: IPositionGrade[] = [];
  selectedGrade: IPositionGrade;
  searchGrade: ISearchPositionGrade = {
    verticalId: null,
    positionId: null,
    isActive: true
  }
  gradeId: number;
  gradeName: string;
  // document status
  documentStatus: IDocumentStatus[] = [];
  selectedDocument: IDocumentStatus;
  searchDocument: ISearchDocumentStatus = {
    approvalListId: null,
    isActive: null
  }
  selectedDocumentStatusId: number;

  loginUserId: number;
  pendingCandidateList: IPendingCandidateList[] = [];
  selectAll: boolean = false;
  callngIfFunction: boolean = true;
  sendingType: string;
  sendingCandidateId: number;
  searchDoctor: ISearchDoctor = {
    DoctorsId: null,
    IsActive: true
  }
  doctorsList: IDoctor[] = [];
  bGVReportType: string;
  bGVReportRequiredCandidateCheckList: any[] = [];
  fileUploadArray: any[] = [];
  @ViewChild('attachmentFileImport', { static: false }) attachmentFileImport: ElementRef;
  @ViewChild('dateOfJoiningFrom', { static: false }) dtOfJoiningFrom: ElementRef;
  @ViewChild('dateOfJoiningTo', { static: false }) dtOfJoiningTo: ElementRef;
  @ViewChild('dateOfJoining', { static: false }) dtofJoining: ElementRef;
  attachmentfileToUpload: File;
  candidateBVGReportId: any;
  verticalIds: string;
  candidateId: number;
  requisitionDetailId: number;
  showBtnSendToCompanyDoctor: boolean;
  showBtnSendtoCompanyDoctorFlag: number = 0;
  allJoiningDateInformation: any[] = [];
  btnJoiningConfirmation: boolean;
  btnSendToOnboarding: boolean;

  //SMAJI - START
  joiningConfirmationCandidateList: any[] = [];
  // Mode of joining dropdown

  modeOfJoiningList: IModeOfJoining[] = [];
  searchModeOfJoining: ISearchModeOfJoining = {
    modeofJoiningId: null,
    isActive: null
  }
  onBoardingSendingType: string;
  onBoardingSingleCandidateId: any;
  OnBoardingManager: number = null;
  onBoardingManagerList: any[] = [];
  //SMAJI - END

  searchRoleUser: any = {
    roleId: 0
  }
  requisitionLists: IRequisitionList[] = [];
  requisitionPositionName: string;
  requisitionDepartmentName: string;
  requisitionFunctionName: string;
  requisitionVerticalId: number;
  requisitionFunctionId: number;
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
  sendToOnboardingVerticalId: any;
  prevVerticalId: number;

  actionName: string;
  declaineCandidateId: number;
  declineremarks: string;
  tabName: string;
  callbackremarks: string;
  callbackCandidateId: number;
  releaseremarks: string;
  releaseCandidateId: number;
  filterValue: any;
  // Release and callback
  objCallbackHistoryInsert: CallbackHistoryInsert;
  resendToOnboarding: boolean = false;
  invalidFileName: boolean = false;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private functionService: FunctionService,
    private commonService: CommonService,
    private recruitmentmanagerService: RecruitmentmanagerService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private titleService: Title,
    private positionService: PositionService,
    private corporateService: CorporateallocationService,
    private candidateService: CandidateService,
    private requisitionService: RequisitionService,

  ) {
    this.SpinnerService.show();
    this.objCallbackHistoryInsert = new CallbackHistoryInsert();  // callback
    jQuery(".custom-menu").hide();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.filterValue = this.persistance.get("CandidateFilterObj");
    // console.log("Filter Value", this.filterValue);
    //alert(this.verticalIds);
    this.requisitionDetailId = this.persistance.get('paramid');
    //alert(this.requisitionDetailId);
    this.createSearchForm();
    this.createSaveForm();
    this.getAllVerticals();
    this.getDocumentStatus();
    this.getDoctorList();
    this.getModeOfJoining();
    this.getHiringStatus();
    //this.getAllRequisition();
    //this.getAllOnboardingmanagerList();
    // this.getAllGrade();
    setTimeout(() => {

      if (this.filterValue != undefined && this.filterValue != null) {
        this.setFilterValue();
      } else {
        this.getPrejoiningCandidateList();
      }
    }, 1000)
    this.persistance.set('CandidateFilterObj', null);
  }

  ngOnInit() {
    this.loadTooltipMenu();
    this.loadDataTable();
    this.loadPopover();
    this.loadDatePicker();
  }
  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     if (this.filterValue != undefined && this.filterValue != null) {
  //       this.setFilterValue();
  //     } else {
  //       this.getPrejoiningCandidateList();
  //     }
  //   }, 1000)
  //   this.persistance.set('CandidateFilterObj', null);
  // }
  createSearchForm() {
    this.searchform = this.fb.group({
      requisitionDetailId: [0],
      candidateId: null,
      candidateNo: [''],
      requisitionNo: [''],
      name: [''],
      verticalId: [0],
      locationId: [0],
      functionId: [0],
      gradeId: [0],
      docApprovalStatusId: [0],
      rmdocApprovalStatusId: null,
      omdocApprovalStatusId: [0],
      preEmployeeMedicalStatus: [0],
      dtofJoiningFrom: "",
      dtofJoiningTo: "",
      hiringStatus: null,
    });

    //console.log("Search Form Value Initialization", this.searchform.value);
  }

  // ManagerOnbording()
  // {
  //   console.log("hii w-",this.OnBoardingManager)
  // }

  setFilterValue() {
    if (this.filterValue != undefined) {
      this.searchform.patchValue({
        requisitionDetailId: this.filterValue.requisitionDetailId == 0 ? 0 : this.filterValue.requisitionDetailId,
        candidateId: this.filterValue.candidateId == 0 ? null : this.filterValue.candidateId,
        candidateNo: this.filterValue.candidateNo == "" ? "" : this.filterValue.candidateNo,
        requisitionNo: this.filterValue.requisitionNo == "" ? "" : this.filterValue.requisitionNo,
        name: this.filterValue.name == "" ? "" : this.filterValue.name,
        verticalId: this.filterValue.verticalId == 0 ? 0 : this.filterValue.verticalId,
        locationId: this.filterValue.locationId == 0 ? 0 : Number(this.filterValue.locationId),
        functionId: this.filterValue.functionId == 0 ? 0 : this.filterValue.functionId,
        gradeId: this.filterValue.gradeId == 0 ? 0 : this.filterValue.gradeId,
        docApprovalStatusId: this.filterValue.docApprovalStatusId == 0 ? 0 : this.filterValue.docApprovalStatusId,
        rmdocApprovalStatusId: this.filterValue.rmdocApprovalStatusId == 0 ? 0 : this.filterValue.rmdocApprovalStatusId,
        omdocApprovalStatusId: this.filterValue.omdocApprovalStatusId == 0 ? 0 : this.filterValue.omdocApprovalStatusId,
        preEmployeeMedicalStatus: this.filterValue.preEmployeeMedicalStatus == 0 ? 0 : this.filterValue.preEmployeeMedicalStatus,
        dtofJoiningFrom: this.filterValue.dtofJoiningFrom == "" ? "" : this.filterValue.dtofJoiningFrom,
        dtofJoiningTo: this.filterValue.dtofJoiningTo == "" ? "" : this.filterValue.dtofJoiningTo,
        hiringStatusId: this.filterValue.hiringStatus == 0 ? 0 : this.filterValue.hiringStatus
      })
      this.selectedVerticalId = this.searchform.get("verticalId").value;
      this.getAllLocation();
      this.getAllFunction();
      this.getPrejoiningCandidateList();
      // console.log("Search Form Value after", this.searchform.value);

    }
  }


  createSaveForm() {
    this.saveform = this.fb.group({
      candidateId: [''],
      doctors: [0, Validators.required],
      createdBy: [0]
    });
  }
  loadPopover() {
    setTimeout(() => {
      jQuery('[data-toggle="popover"]').popover({
        html: true
      });
    });
  }
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
      jQuery(".custom-menu").find(".dropdown-item").on("click", function (e) {
        jQuery(e.target).append(dropdownMenu.detach());
        jQuery(e.target).find('.custom-menu').hide();
      });
    });
  }
  // loadDatePicker() {
  //   var dothis = this;
  //   jQuery(".datepicker").parent(".input-group").datepicker({
  //     autoclose: true,
  //     format: "dd/mm/yyyy",
  //     todayHighlight: true
  //   }).on("change", function (e) {
  //     var selecteddate = e.target.value;
  //     var datepickerid = jQuery(e.target).attr("id");
  //     var rowid = parseInt(datepickerid.replace("datepicker", ""));

  //     dothis.joiningConfirmationCandidateList[rowid].DateofJoining = e.target.value;
  //   });;
  // }

  loadDatePicker() {
    var dothis = this;
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    }).on("change", function (e) {
      var selecteddate = e.target.value;
      var datepickerid = jQuery(e.target).attr("id");
      var rowid = parseInt(datepickerid.replace("datepicker", ""));

      dothis.joiningConfirmationCandidateList[rowid].DateofJoining = e.target.value;
    });;
  }
  // HiringStatus
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
  }
  //changeHiringStatus() {
  //  this.searchCandidateNo.hiringStatusId = this.searchCandidateNo.hiringStatusId;
  //}

  //verticals
  getAllVerticals() {
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
    // Sendind one default value to backend
    this.searchform.patchValue({
      verticalId: this.defaultverticalId
      // verticalId: 0
    })
    this.getAllLocation();
    this.getAllFunction();
    this.getAllGrade();
    // this.getPrejoiningCandidateList();
  }
  changeVertical() {
    this.selectedVerticalId = this.searchform.get("verticalId").value;
    this.getAllLocation();
    this.getAllFunction();
    this.getAllGrade();
  }
  //locations
  getAllLocation() {
    this.locations = [];
    this.searchLocation.verticalId = this.selectedVerticalId;
    this.locationService.getAllLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        this.locations = result;
        //console.log("Location", this.locations);

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
  changeLocation() {
    this.selectedLocationId = this.searchform.get("verticalId").value;
    // this.getAllFunction();
  }
  //Function
  getAllFunction() {
    this.functions = [];
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
    }, () => {

    });
  }

  // Grade
  getAllGrade() {
    this.grades = [];
    this.searchGrade.verticalId = this.defaultverticalId;
    this.positionService.getAllPositionGrade(this.searchGrade).subscribe((result) => {
      if (result) {
        this.grades = result;
        this.grades.splice(0, 0, {
          positionId: 0,
          gradeName: "All",
          gradeId: 0,
          verticalId: "",
          isActive: true,

        })
      }
      else {
        this.grades = [];
        this.grades = result;
        this.grades.splice(0, 0, {
          positionId: 0,
          gradeName: "All",
          gradeId: 0,
          verticalId: "",
          isActive: true,
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  // Document Status

  getDocumentStatus() {
    this.documentStatus = [];
    this.commonService.getAllDocumentStatus(this.searchDocument).subscribe((result) => {
      if (result) {
        this.documentStatus = result;
        // console.log("Document Status", this.documentStatus);
        this.documentStatus.splice(0, 0, {
          approvalListId: 0,
          approvalListName: "All",
          isActive: true
        })
      }
      else {
        this.documentStatus = [];
        this.documentStatus.splice(0, 0, {
          approvalListId: 0,
          approvalListName: "All",
          isActive: true
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getModeOfJoining() {
    this.modeOfJoiningList = [];
    this.candidateService.getAllModeOfJoining(this.searchModeOfJoining).subscribe((result) => {
      if (result) {
        this.modeOfJoiningList = result;
      }
      else {
        this.modeOfJoiningList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }
  getDoctorList() {
    this.doctorsList = [];
    this.recruitmentmanagerService.getAllDoctors(this.searchDoctor).subscribe((result) => {
      if (result) {
        this.doctorsList = result;
        // this.doctors.splice(0, 0, {
        //   doctorsId: 0,
        //   doctorsName: "All",
        //   isActive: true,
        // })
      }
      else {
        this.doctorsList = [];
        // this.doctors.splice(0, 0, {
        //   doctorsId: 0,
        //   doctorsName: "All",
        //   isActive: true,
        // })
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }
  //arg
  getPrejoiningCandidateList() {
    this.pendingCandidateList = [];
    console.log("Search Form Value", this.searchform.value);
    this.recruitmentmanagerService.CampusgetPendingCandidateList(this.searchform.value).subscribe((result) => {
      if (result) {
        this.pendingCandidateList = result;
        // console.log("All Candidate Management List", result);
        this.pendingCandidateList.forEach(element => {
          if (element.recruitmentManagerNotApproveDoc != " ") {
            element.popoverContent = "<div><span class='grey'>Pending/Need clarification Document: </span><span>" + element.recruitmentManagerNotApproveDoc + "</span></div>";
          }
        })
        // this.loadPopover();
        // console.log("All Candidate Management List", this.pendingCandidateList);
        this.SpinnerService.hide();
      }
      else {
        this.pendingCandidateList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.loadDataTable();
      // setTimeout(() => {
      this.loadPopover();
      // }, 1000)      
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
  loadDataTable() {
    jQuery('#dataTable1').dataTable().fnClearTable();
    jQuery('#dataTable1').dataTable().fnDestroy();
    setTimeout(() => {
      jQuery('#dataTable1').dataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "order": [],
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

  // formSubmit() {
  //   this.searchform.patchValue({
  //     candidateId: Number(this.searchform.value.candidateId),
  //     dtofJoiningFrom: this.dtOfJoiningFrom.nativeElement.value,
  //     dtofJoiningTo: this.dtOfJoiningTo.nativeElement.value,
  //   })
  //   this.getPrejoiningCandidateList();
  //   this.persistance.set('CandidateFilterObj', this.searchform.value);

  // }

  formSubmit() {
    var flag = 0
    this.searchform.patchValue({
      candidateId: Number(this.searchform.value.candidateId),
      dtofJoiningFrom: this.dtOfJoiningFrom.nativeElement.value,
      dtofJoiningTo: this.dtOfJoiningTo.nativeElement.value,
    })
    if (this.dtOfJoiningFrom.nativeElement.value.length > 0 && this.dtOfJoiningTo.nativeElement.value.length > 0) {
      const [fday, fmonth, fyear] = this.dtOfJoiningFrom.nativeElement.value.split("/");
      const fdate = new Date(fyear, fmonth - 1, fday);
      const [tday, tmonth, tyear] = this.dtOfJoiningTo.nativeElement.value.split("/");
      const tdate = new Date(tyear, tmonth - 1, tday);
      if (fdate > tdate) {
        this.notificationService.showError("To Date Can't be less than From Date !! Please provide actual date", "Error");
        flag = 1;
      }
    }
    if (flag == 0) {
      this.getPrejoiningCandidateList();
      this.persistance.set('CandidateFilterObj', this.searchform.value);
    }
  }


  reset() {
    this.searchform.reset();
    //   this.searchform.patchValue({
    //     verticalId:this.defaultverticalId
    // })

    this.getAllVerticals();
    this.getPrejoiningCandidateList();
  }
  onCheckSelectAll(eve) {
    var firstHiringStatusId = this.pendingCandidateList[0].hiringStatusId;
    var flag = 0;
    this.pendingCandidateList.forEach(element => {
      if (element.hiringStatusId != firstHiringStatusId) {
        flag = 1
      }
    })
    if (flag == 0) {
      this.pendingCandidateList.forEach(element => {
        element.checked = eve.target.checked;
      })
    } else {
      jQuery("#ani").prop("checked", false);
      this.notificationService.showError("Please select same hiring status", "Error");
    }
  }
  getSelectAllValue(data) {
    return this.selectAll;
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
    // if (this.showHideSendtoCompanyDoctor(data, eve)) {
    //   this.showBtnSendToCompanyDoctor = true;
    //   if (this.showBtnSendtoCompanyDoctorFlag == 1) {
    //     this.notificationService.showError("Only medical document uploaded candidate can be send to company doctor", "Error");
    //   }
    // } else {
    //   this.showBtnSendToCompanyDoctor = false;
    //   if (this.showBtnSendtoCompanyDoctorFlag == 0) {
    //     this.notificationService.showError("Only medical document uploaded candidate can be send to company doctor", "Error");
    //   }
    // }
  }
  GetSelectedHiringStatus(NewRow) {
    var AlredyChecked = this.pendingCandidateList.find(e => e.checked);
    if (AlredyChecked == null) {
      return true;
    } else {
      return AlredyChecked.hiringStatusId == NewRow.hiringStatusId;
    }
  }
  // showHideSendtoCompanyDoctor(NewRow, eve) {
  //   var documentStatus = this.pendingCandidateList.find(e => e.checked && e.hiringStatusId == 43 && e.medicalDocumentCollectionId == 1);
  //   if (documentStatus == null) {
  //     this.showBtnSendtoCompanyDoctorFlag = 1;
  //     return false;
  //   } else {
  //     if (eve.target.checked) {
  //       if (this.showBtnSendtoCompanyDoctorFlag == 1) {
  //         this.showBtnSendtoCompanyDoctorFlag = 0;
  //         return documentStatus.medicalDocumentCollectionId != NewRow.medicalDocumentCollectionId;
  //       } else {
  //         return documentStatus.medicalDocumentCollectionId == NewRow.medicalDocumentCollectionId;
  //       }
  //     } else {
  //       return documentStatus.medicalDocumentCollectionId != NewRow.medicalDocumentCollectionId;
  //     }
  //   }
  // }
  showSendToCompanyDoctor() {
    // var flag = 0;
    // var ChyeckedObj = [];
    // ChyeckedObj = this.pendingCandidateList.filter(e => e.checked == true && e.hiringStatusId == 43); 
    // if (ChyeckedObj.length > 0) {
    //   //console.log("Checked Obj", ChyeckedObj);
    //   var medicalCollectionId = ChyeckedObj.find(e => e.checked == true && e.hiringStatusId == 43 && e.medicalDocumentDoctorApprovalId == 0);
    //   // console.log("medicalCollectionId", medicalCollectionId);
    //   if (medicalCollectionId == null) {
    //     return false;
    //   } else {
    //     ChyeckedObj.forEach(element => {
    //       if (element.medicalDocumentCollectionId <= 0 || element.preEmployeeMedicaStatuslId < 3) {
    //         flag = 1;
    //       }
    //     })
    //     return flag == 0 ? true : false;
    //   }
    // }
    /* Change as per Requirement */
    var flag = 0;
    var ChyeckedObj = [];
    ChyeckedObj = this.pendingCandidateList.filter(e => e.checked == true && e.hiringStatusId >= 43);
    if (ChyeckedObj.length > 0) {
      // var medicalCollectionId = ChyeckedObj.find(e => e.checked == true && e.hiringStatusId == 43 && e.preEmployeeMedicaStatuslId == 4);
      var medicalCollectionId = ChyeckedObj.find(e => e.checked == true && e.hiringStatusId >= 43 && e.preEmployeeMedicaStatuslId == 4);
      if (medicalCollectionId == null) {
        return false;
      } else {
        ChyeckedObj.forEach(element => {
          if (element.medicalDocumentCollectionId <= 0 || element.preEmployeeMedicaStatuslId > 4) {
            flag = 1;
          }
        })
        return flag == 0 ? true : false;
      }
    }
  }

  showBGVRepoirtRequired() {
    // var checkedObj = this.pendingCandidateList.find(e => e.checked == true && e.hiringStatusId >= 43 && e.bvgReportStatus!='Uploaded'); //candidateBVGReportId  e.hiringStatusId == 43 && e.preEmployeeMedicaStatuslId == 1 ,, && e.preEmployeeMedicaStatuslId >= 1
    // return checkedObj == null ? false : true;
    var flag = 0;
    var ChyeckedObj = [];
    ChyeckedObj = this.pendingCandidateList.filter(e => e.checked == true && e.hiringStatusId >= 43);
    if (ChyeckedObj.length > 0) {
      // var medicalCollectionId = ChyeckedObj.find(e => e.checked == true && e.hiringStatusId == 43  && e.bvgReportStatus!='Uploaded');
      // if (medicalCollectionId == null) {
      //   return false;
      // } else {
      ChyeckedObj.forEach(element => {
        if (element.bvgReportStatus == 'Uploaded') {
          flag = 1;
        }
      })
      return flag == 0 ? true : false;
      //}
    }
    else {
      return false;
    }
  }
  uploadBGVRepoirtRequired() {
    var flag = 0;
    var ChyeckedObj = [];
    ChyeckedObj = this.pendingCandidateList.filter(e => e.checked == true && e.hiringStatusId >= 43);
    if (ChyeckedObj.length > 0) {
      ChyeckedObj.forEach(element => {
        if (element.bvgReportStatus == 'Uploaded' || element.bvgReportStatus == 'Unset' || element.bvgReportStatus == 'Not Required') {
          flag = 1;
        }
      })
      return flag == 0 ? true : false;
    }
    else {
      return false;
    }
  }
  sendAllCheckedToDoctor() {
    this.sendingType = "A";
    this.sendingCandidateId = 0;
    this.saveform.patchValue({
      doctors: [0, Validators.required]
    })
    this.getDoctorList();
  }
  sendAllCheeckedForBGVreport() {
    this.bGVReportType = "A";
    this.bGVReportRequiredCandidateCheckList = [];
    this.pendingCandidateList.forEach(element => {
      //if (element.checked && element.medicalDocumentCollectionId == 1 && element.hiringStatusId >= 43) {
      if (element.checked && element.hiringStatusId >= 43) {
        let obj = {
          CandidateId: element.candidateId,
          CandidateNo: element.candidateNo,
          RequisitionDetailId: element.requisitionDetailId,
          CandidateBVGReportId: element.candidateBVGReportId,
          //BVGReportApplicable: element.candidateBVGReportId == 1 ? true : false,
          BVGReportApplicable: element.bvgReportStatus == "Required" ? true : false,
          //BVGReportApplicable: element.bVGReportStatus == "Required" ? true : false,
          CandidateName: element.candidateFullName,
          Grade: element.gradeName
        }
        this.bGVReportRequiredCandidateCheckList.push(obj);
      }
    })
  }
  onSendSingleToDoctor(data) {
    this.sendingType = "S";
    this.sendingCandidateId = data.candidateId;
    this.saveform.patchValue({
      doctors: [0, Validators.required]
    })
    this.getDoctorList();
  }
  onClickSingleBGVReportRequired(data) {
    this.bGVReportType = "S";
    this.bGVReportRequiredCandidateCheckList = [];
    let obj = {
      CandidateId: data.candidateId,
      CandidateNo: data.candidateNo,
      RequisitionDetailId: data.requisitionDetailId,
      CandidateBVGReportId: data.candidateBVGReportId,
      //BVGReportApplicable: data.candidateBVGReportId == 1 ? true : false,
      BVGReportApplicable: data.bvgReportStatus == "Required" ? true : false,
      CandidateName: data.candidateFullName,
      Grade: data.gradeName
    }
    this.bGVReportRequiredCandidateCheckList.push(obj);
  }
  onchange(eve, data) {
    data.BVGReportApplicable = eve.target.checked;
  }
  onSubmitBGVReportRequird() {
    let finalSubmitObj = {
      CandidateBVGReports: this.bGVReportRequiredCandidateCheckList,
      CreatedBy: this.loginUserId
    }
    this.SpinnerService.show();
    this.recruitmentmanagerService.BGVReportRequired(finalSubmitObj).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          // this.createSearchForm();
          this.createSaveForm();
          // this.getAllVerticals();
          this.getPrejoiningCandidateList();
          this.loadDataTable();
          jQuery("#myModal1").modal("hide");
          jQuery("#ani").prop("checked", false);
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
  onClickUplodBGVReport(data) {
    this.candidateBVGReportId = data.candidateBVGReportId.toString() + ",";
  }
  onClickBulkUplodBGVReport() {
    this.candidateBVGReportId = "";
    this.pendingCandidateList.forEach(element => {
      if (element.checked && element.hiringStatusId >= 43) {
        this.candidateBVGReportId += element.candidateBVGReportId.toString() + ","
      }
    })
  }
  onAttachmentFileChange(files: FileList) {
    this.invalidFileName = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName = true;
      }
    })
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      return;
    }
    if (this.invalidFileName) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.attachmentFileImport.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("File should be less than 2MB!", "Error");
      this.attachmentFileImport.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    } else {
      this.attachmentFileImport.nativeElement.innerText = files[0].name;
      this.attachmentfileToUpload = files.item(0);
    }
  }
  onUploadReport() {
    var flag = 0;
    var msg = "";
    if (this.attachmentfileToUpload == null) {
      flag = 1;
      msg = "Please Attach a file";
    }
    else {

    }
    if (flag == 0) {
      this.SpinnerService.show();
      const formData = new FormData();
      formData.append("CandidateBVGReportId", this.candidateBVGReportId.slice(0, -1));
      formData.append("Files", this.attachmentfileToUpload);
      formData.append("CreatedBy", this.loginUserId.toString());
      this.recruitmentmanagerService.uploadBGVReport(formData).subscribe((result) => {
        if (result.status == 0) {
          this.notificationService.showError(result.msg, "Error");
          this.SpinnerService.hide();
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          jQuery("#myModal2").modal("hide");
          this.attachmentFileImport.nativeElement.innerText = "";
          this.attachmentFileImport.nativeElement.value = "";
          this.fileUploadArray = [];
          this.getPrejoiningCandidateList();
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
        this.notificationService.showError("Something went wrong", "Error");
      });
    }
    else {
      this.notificationService.showError(msg, "Error");
    }
  }



  finalSendToDoctor() {
    if (this.saveform.value.doctors == 0) {
      this.notificationService.showError("Please select a doctor", "Error");
    } else {
      //jQuery(".txtrejectremarks").removeClass("is-invalid");
      // msg="";
      if (this.sendingType == "A") {
        var candidateIdString = "";
        var flag = 0;
        this.pendingCandidateList.forEach(element => {
          // if (element.checked && element.hiringStatusId == 43 && element.medicalDocumentCollectionId > 0) {
          if (element.checked && element.hiringStatusId >= 43 && element.medicalDocumentCollectionId > 0) {
            candidateIdString += (flag == 0 ? "" : ",") + element.candidateId.toString();
            flag = 1;
          }
        })
        this.saveform.patchValue({
          candidateId: candidateIdString,
          createdBy: this.loginUserId,
          doctors: Number(this.saveform.value.doctors)
        })
      } else {
        this.saveform.patchValue({
          candidateId: this.sendingCandidateId.toString(),
          createdBy: this.loginUserId,
          doctors: Number(this.saveform.value.doctors)
        })
      }
      this.SpinnerService.show();
      // console.log("Send To Comapnt Doctor Obj", this.saveform.value);

      this.recruitmentmanagerService.sendCandidate(this.saveform.value).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            // this.createSearchForm();
            this.createSaveForm();
            //this.getAllVerticals();
            this.getPrejoiningCandidateList();
            this.loadDataTable();
            jQuery("#myModal").modal("hide");
            this.saveform.patchValue({
              doctors: null
            })

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
    this.createSaveForm();
    this.getDoctorList();
  }

  gotoViewDocuments(candidateId, requisitionDetailId) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "rmcandidatemanagement");
    this.persistance.set('nextpagename', "candidatedocuments");
    this.persistance.set('candidateId', candidateId);
    // this.persistance.set('paramid', this.requisitionDetailId);
    this.persistance.set('paramid', requisitionDetailId);
    this._route.navigate(['app/verifymedicaldocument']);
  }


  /* Addedd on 09/12/2021 as per requirement */


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
  onChangeVertical() {
    // this.searchRoleUser.roleId = this.sendToOnboardingVerticalId;
    // this.getAllOnboardingmanagerList();
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

    this.commonService.getRoleWiseUser(this.searchRoleUser).subscribe((result) => {
      if (result) {
        this.onBoardingManagerList = result;
        //console.log("Onboarding Manager List:", this.onBoardingManagerList);
      }
      else {
        this.onBoardingManagerList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  showBtnJoiningConfirmation() {
    // var flag = 0;
    // var ChyeckedObj = [];
    // ChyeckedObj = this.pendingCandidateList.filter(e => e.checked == true && e.hiringStatusId == 43);
    // if (ChyeckedObj.length > 0) {
    //   //console.log("Checked Obj", ChyeckedObj);
    //   var medicalCollectionId = ChyeckedObj.find(e => e.checked == true && e.hiringStatusId == 43 && e.medicalDocumentDoctorApprovalId > 0);
    //   //console.log("medicalCollectionId", medicalCollectionId);
    //   if (medicalCollectionId == null) {
    //     return false;
    //   } else {
    //     ChyeckedObj.forEach(element => {
    //       if (element.medicalDocumentDoctorApprovalId <= 0) {
    //         flag = 1;
    //       }
    //     })
    //     return flag == 0 ? true : false;        
    //   }
    // }

    /* Change as per Requirement */
    //var flag = 0;
    var ChyeckedObj = [];
    ChyeckedObj = this.pendingCandidateList.filter(e => e.checked == true && e.hiringStatusId >= 43);
    if (ChyeckedObj.length > 0) {
      //console.log("Checked Obj", ChyeckedObj);
      var medicalCollectionId = ChyeckedObj.find(e => e.checked == true && e.hiringStatusId >= 43);
      //console.log("medicalCollectionId", medicalCollectionId);
      if (medicalCollectionId == null) {
        return false;
      } else {
        return true;
      }
    }
  }
  showBtnSendToOnboarding() {
    var flag = 0;
    var checkedCount = 0;
    var ChyeckedObj = [];
    ChyeckedObj = this.pendingCandidateList.filter(e => e.checked == true && e.hiringStatusId == 44 && e.onBoardingManager == null); //&& e.medicalDocumentCollectionId == 1
    if (ChyeckedObj.length > 0) {
      var medicalCollectionId = ChyeckedObj.find(e => e.checked == true && e.hiringStatusId == 44 && e.onBoardingManager == null);  //&& e.medicalDocumentDoctorApprovalId > 0
      if (medicalCollectionId == null) {
        return false;
      } else {
        ChyeckedObj.forEach(element => {
          if (checkedCount == 0) {
            this.prevVerticalId = element.vertical;
          }
          if (this.prevVerticalId != element.vertical) {
            flag = 1;
          }
          checkedCount += 1;
          //  console.log(checkedCount);
        })
        return flag == 0 ? true : false;
      }
    }

    /* Change as per Requirement */

    // var flag = 0;
    // var ChyeckedObj = [];
    // ChyeckedObj = this.pendingCandidateList.filter(e => e.checked == true && e.hiringStatusId >= 43);
    // if (ChyeckedObj.length > 0) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
  showBtnResendToOnboarding() {
    var flag = 0;
    var checkedCount = 0;
    var ChyeckedObj = [];
    var prevOnboardingMnanager = 0;
    ChyeckedObj = this.pendingCandidateList.filter(e => e.checked == true && e.onBoardingManager != null && e.hiringStatusId != 55 && e.hiringStatusId != 56); //&& e.medicalDocumentCollectionId == 1
    if (ChyeckedObj.length > 0) {
      var medicalCollectionId = ChyeckedObj.find(e => e.checked == true && e.onBoardingManager != null);  //&& e.medicalDocumentDoctorApprovalId > 0
      if (medicalCollectionId == null) {
        return false;
      } else {
        ChyeckedObj.forEach(element => {
          if (checkedCount == 0) {
            this.prevVerticalId = element.vertical;
            prevOnboardingMnanager = element.onBoardingManager;
          }
          if (prevOnboardingMnanager != element.onBoardingManager) {
            flag = 1;
          }
          checkedCount += 1;
          //  console.log(checkedCount);
        })
        return flag == 0 ? true : false;
      }
    }
  }
  onClickJoiningConfirmation() {
    var candidateIdString = "";
    var cFlag = 0;
    // this.pendingCandidateList.forEach(element => {
    //   if (element.checked && (element.hiringStatusId == 43) && element.medicalDocumentCollectionId > 0) {
    //     candidateIdString += (cFlag == 0 ? "" : ",") + element.candidateId.toString();
    //     cFlag = 1;
    //   }
    // })

    /* Change as per Requirement */

    this.pendingCandidateList.forEach(element => {
      if (element.checked && (element.hiringStatusId >= 43)) {
        candidateIdString += (cFlag == 0 ? "" : ",") + element.candidateId.toString();
        cFlag = 1;
      }
    })
    this.getCandidateJoningDate(candidateIdString, "");//Piu
    setTimeout(() => {
      this.loadDatePicker();
    }, 1000);
  }
  onJoiningConfirmation(data) {
    this.getCandidateJoningDate(data.candidateId, data.joiningDateStatus);//Piu
    setTimeout(() => {
      this.loadDatePicker();
    }, 1000);
  }
  getCandidateJoningDate(candidateId, joiningDateStatus) {//Piu
    let joiningDateObj = {
      candidateId: candidateId.toString()
    }
    this.allJoiningDateInformation = [];
    this.corporateService.getJoiningDateDetails(joiningDateObj).subscribe((result) => {
      if (result) {
        this.allJoiningDateInformation = result;
        console.log("Joining Date Details", this.allJoiningDateInformation);

        this.joiningConfirmationCandidateList = [];
        if (this.allJoiningDateInformation.length > 0) {
          this.allJoiningDateInformation.forEach(element => {
            let joiningCandidateObj = {
              CandidateId: element.candidateId,
              CandidateNo: element.candidateNo,
              RequisitionDetailId: element.requisitionDetailId,
              DateofJoining: element.dateofJoining,
              ModeofJoining: element.modeofJoing == 0 ? null : element.modeofJoing,
              PositionCode: element.positionCode,
              Remarks: element.remarks,
              CandidateName: element.candidateFullName
            }
            this.joiningConfirmationCandidateList.push(joiningCandidateObj);
          })
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
  onConfirmJoiningDate() {

    let finalSubmitObj = {
      CandidateJoiningDates: [],
      CreatedBy: this.loginUserId,
      JoiningDateStatus: this.joiningConfirmationCandidateList[0].JoiningDateStatus,//Piu
      EmailId: this.allJoiningDateInformation[0].onBoardingEmailId//Piu
    }

    var flag = 0;
    var msg = "";
    var i = 0;
    this.joiningConfirmationCandidateList.forEach(element => {
      // if (element.Remarks == null || element.Remarks == "") {
      //   flag = 1;
      //   jQuery("#datepicker"+i).addClass("is-invalid");
      //   //msg = "Please Enter Remarks for Candidate " + element.CandidateName;
      // }
      // else {
      //   jQuery("#datepicker"+i).removeClass("is-invalid");
      // }
      if (element.PositionCode == null || element.PositionCode == "") {
        flag = 1;
        jQuery("#positioncode" + i).addClass("is-invalid");
        //msg = "Please Enter Position Code for Candidate " + element.CandidateName;
      }
      else {
        jQuery("#positioncode" + i).removeClass("is-invalid");
      }
      if (element.ModeofJoining == null) {
        flag = 1;
        jQuery("#modeofJoining" + i).addClass("is-invalid");
        //msg = "Please Select Mode of Joining for Candidate " + element.CandidateName;
      }
      else {
        jQuery("#modeofJoining" + i).removeClass("is-invalid");
      }
      if (element.DateofJoining == "" || element.DateofJoining == null) {
        flag = 1;
        jQuery("#datepicker" + i).addClass("is-invalid");
        //msg = "Please Select Joining Date for Candidate " + element.CandidateName;
      }
      else {
        jQuery("#datepicker" + i).removeClass("is-invalid");
      }
      i++;
    })
    if (flag == 0) {
      this.joiningConfirmationCandidateList.forEach(element => {
        let joiningDateObj = {
          CandidateId: element.CandidateId,
          RequisitionDetailId: element.RequisitionDetailId,
          DateofJoining: element.DateofJoining,
          ModeofJoining: element.ModeofJoining.toString(),
          PositionCode: element.PositionCode,
          Remarks: element.Remarks,
          JoiningDateStatus: element.JoiningDateStatus//Piu
        }
        finalSubmitObj.CandidateJoiningDates.push(joiningDateObj);
      })
      this.SpinnerService.show();
      this.candidateService.saveJoiningConfirmationDate(finalSubmitObj).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getPrejoiningCandidateList();
            this.loadDataTable();
            jQuery("#joiningConfirmationModal").modal("hide");
            jQuery("#ani").prop("checked", false);

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
      this.notificationService.showError("Please provide all details to proceed", "Error");
    }
  }
  sendAllCheckedToOnboarding() {
    this.OnBoardingManager = null;
    this.resendToOnboarding = false;
    this.onBoardingSendingType = "A";
    this.onBoardingSingleCandidateId = 0;
    if (this.prevVerticalId == 1) {
      this.searchRoleUser.roleId = 21
    }
    else if (this.prevVerticalId == 2) {
      this.searchRoleUser.roleId = 22
    }
    else if (this.prevVerticalId == 3) {
      this.searchRoleUser.roleId = 23
    }
    this.getAllOnboardingmanagerList();
  }
  resendAllCheckedToOnboarding() {
    this.resendToOnboarding = true;
    this.onBoardingSendingType = "A";
    this.onBoardingSingleCandidateId = 0;
    if (this.prevVerticalId == 1) {
      this.searchRoleUser.roleId = 21
    }
    else if (this.prevVerticalId == 2) {
      this.searchRoleUser.roleId = 22
    }
    else if (this.prevVerticalId == 3) {
      this.searchRoleUser.roleId = 23
    }
    this.getAllOnboardingmanagerList();
    var checkedResendOnboardingManager = this.pendingCandidateList.find(e => e.checked == true && e.onBoardingManager != null && e.hiringStatusId != 55 && e.hiringStatusId != 56).onBoardingManager;
    if (checkedResendOnboardingManager != undefined) {
      this.OnBoardingManager = checkedResendOnboardingManager;
    }
  }
  onSendSingleToOnboarding(data, flag) {//Piu
    this.flag = flag;//Piu
    this.doj = data.dateOfJoining;//Piu
    this.getTestReult(data.candidateId, data.requisitionDetailId)//Piu
    this.OnBoardingManager = null;
    this.onBoardingSendingType = "S";
    this.onBoardingSingleCandidateId = data.candidateId;
    if (data.vertical == 1) {
      this.searchRoleUser.roleId = 21
    }
    else if (data.vertical == 2) {
      this.searchRoleUser.roleId = 22
    }
    else if (data.vertical == 3) {
      this.searchRoleUser.roleId = 23
    }
    this.getAllOnboardingmanagerList();
    if (data.onBoardingManager != null) {
      this.OnBoardingManager = data.onBoardingManager;
      this.resendToOnboarding = true;
    } else {
      this.resendToOnboarding = false;
    }
  }
  //Add function//Piu
  testResults: any
  flag: string = "";
  doj: string = "";
  getTestReult(candidateId, requisitionDetailId) {
    var objBody = {
      CandidateId: candidateId,
      RequisitionDetailId: requisitionDetailId
    }

    this.candidateService.getCandidateList(objBody).subscribe((result) => {
      if (result) {
        this.testResults = result;
        console.log('##', result)
      }
      else {
        this.testResults = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  //Piu
  onSendToOnboardingTeam() {
    let obj = {
      CandidateId: "",
      OnBoardingManager: 0,
      CreatedBy: 0,
      EmailId: this.onBoardingManagerList[0].empEmailId,//Piu
      DOJ: this.doj,//Piu
      flag: this.flag//Piu
    }
    if (this.OnBoardingManager == null) {
      this.notificationService.showError("Please select Onboarding Manager", "Error");
    } else {

      if (this.onBoardingSendingType == "A") {
        var candidateIdString = "";
        var cFlag = 0;
        if (this.resendToOnboarding == true) {  // Added this conditin by anif to resend on 01-10-2022
          this.pendingCandidateList.forEach(element => {
            if (element.checked && element.onBoardingManager != null && element.hiringStatusId != 55 && element.hiringStatusId != 56) {
              candidateIdString += (cFlag == 0 ? "" : ",") + element.candidateId.toString();
              cFlag = 1;
            }
          })
        } else {
          this.pendingCandidateList.forEach(element => {
            //if (element.checked && element.hiringStatusId == 44 && element.medicalDocumentDoctorApprovalId > 0) {
            if (element.checked && element.hiringStatusId == 44) {
              candidateIdString += (cFlag == 0 ? "" : ",") + element.candidateId.toString();
              cFlag = 1;
            }
          })
        }

        obj.CandidateId = candidateIdString; //All candidate id which are checked;
        obj.OnBoardingManager = Number(this.OnBoardingManager);
        obj.CreatedBy = this.loginUserId;
      } else {
        obj.CandidateId = this.onBoardingSingleCandidateId.toString();
        obj.OnBoardingManager = Number(this.OnBoardingManager);
        obj.CreatedBy = this.loginUserId;
      }
      this.SpinnerService.show();
      this.candidateService.sendToOnboardingTeam(obj).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getPrejoiningCandidateList();
            this.loadDataTable();
            this.OnBoardingManager = null;
            jQuery("#sendtoOnboardingModal").modal("hide");
            jQuery("#ani").prop("checked", false);
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
    this.persistance.set('pagename', "candidatemanagement");
    this.persistance.set('paramid', data.requisitionDetailId);
    this._route.navigate(['/app/rm-joining-check-list'], { queryParams: { CandidateId: data.candidateId, HiringStatus: data.hiringStatusName } });
  }
  gotoCandidateAction(id: any, relativeStatus: any, childRelationshipId: any, cmdUpdateStatus: any, requisitionDetailId: any) {
    if ((parseInt(childRelationshipId) > 1 || relativeStatus == "1") && cmdUpdateStatus == "0") {
      jQuery(".custom-menu").hide();
      this.persistance.set('pagename', "candidatemanagement");
      this.persistance.set('nextpagename', "candidateaction");
      this.persistance.set('candidateid', id);
      this.persistance.set('paramid', requisitionDetailId);
      this._route.navigate(['/app/my-action/all-positions/candidate-list/candidate-cmd-approval']);
    }
    else {
      jQuery(".custom-menu").hide();
      this.persistance.set('pagename', "candidatemanagement");
      this.persistance.set('nextpagename', "candidateaction");
      this.persistance.set('candidateid', id);
      this.persistance.set('paramid', requisitionDetailId);
      this._route.navigate(['/app/my-action/all-positions/candidate-list/candidate']);
    }
  }

  openModalPopupRejectDeclineCallBack(statusId, candidateId, tabName) {
    this.actionName = "Declined";
    this.declaineCandidateId = candidateId;
    this.tabName == tabName;
  }
  openModalPopupCallBack(statusId, candidateId, tabName, data) {
    this.actionName = "Callback";
    this.callbackCandidateId = candidateId;
    this.tabName == tabName;
    //console.log("callback data", data);
    this.objCallbackHistoryInsert.callBackHistoryId = 0;
    this.objCallbackHistoryInsert.requisitionId = data.requisitionId;
    this.objCallbackHistoryInsert.requisitionDetailId = data.requisitionDetailId;
    this.objCallbackHistoryInsert.verticalId = data.verticalId;
    this.objCallbackHistoryInsert.candidateId = data.candidateId;
    this.objCallbackHistoryInsert.currentHiringStatusId = 59;
    this.objCallbackHistoryInsert.createdBy = this.loginUserId;
  }
  openModalPopupreleaseCandidate(statusId, candidateId, tabName) {
    this.actionName = "Release";
    this.releaseCandidateId = candidateId;
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
          this.SpinnerService.hide();
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          this.SpinnerService.hide();
          this.createSearchForm();
          // this.getAllVerticals();
          this.getPrejoiningCandidateList();
          this.loadDataTable();
          jQuery(".close").click();
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


  releaseCandidate() {
    var formdata = {
      candidateIds: this.releaseCandidateId.toString(),
      requisitionDetailId: 0,
      hiringStatusId: 31,
      createdBy: this.loginUserId,
      remarks: this.callbackremarks
    }
    this.SpinnerService.show();
    this.requisitionService.updateRequisitionCandidateRejectDeclineCallBack(formdata).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
          this.SpinnerService.hide();
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          this.SpinnerService.hide();
          this.createSearchForm();
          // this.getAllVerticals();
          this.getPrejoiningCandidateList();
          this.loadDataTable();
          jQuery(".close").click();
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

  ngOnDestroy() {
    jQuery(".custom-menu").hide();
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
      this.SpinnerService.show();
      this.objCallbackHistoryInsert.callBackRemarks = this.callbackremarks;
      this.requisitionService.insertCallbackRequest(this.objCallbackHistoryInsert).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
            this.SpinnerService.hide();
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.SpinnerService.hide();
            this.createSearchForm();
            this.getPrejoiningCandidateList();
            this.callbackremarks = "";
            this.objCallbackHistoryInsert = new CallbackHistoryInsert();
            jQuery("#callBackModal").modal("hide");
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

