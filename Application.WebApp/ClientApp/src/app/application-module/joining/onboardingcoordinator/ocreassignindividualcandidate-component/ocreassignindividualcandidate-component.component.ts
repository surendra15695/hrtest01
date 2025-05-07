import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../interfaces/common/doctor.interface';
import { ICandidateAssessmentData, ICandidateAssessmentDetails, ICandidateMedicalReimbursement, ICandidateMedicalReimbursementDetails, IEmployeeReimbursementDetails, ISearchCandidateAssessment, ISearchCandidateMedicalReimbursement } from '../../../../interfaces/joining/candidate.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import { IAssessemenrAssignReleaseList, IBatchAssessment, ICandidateAssessmentList, ISearchAssessmentAssignReleaseList } from '../../../../interfaces/joining/programcoordinator.interface';
import { LocationService } from '../../../../services/common/location/location.service';
import { OnboardingcoordinatorService } from '../../../../services/joining/onboardingcoordinator/onboardingcoordinator.service';
import {
  IEditAccommodation, IEditAccomodationForCandidate, IEditAccomodationInductionShedule, IAccommodationDetailsByCandidate,
  IGetEditCandidate, IGetEditAccomodationForCandidate, IEditAccomodationCandidate, IReassignCandidateForBatch, IRoleWiseUser, ISearchRoleWiseUser
} from '../../../../interfaces/prejoining/onboardingcoordinator.interface';
import {
  IOnboardingCoordinator, ISearchOnboardingCoordinator, IModeOfInduction, ISearchModeOfInduction, IVenue, ISearchVenue, ITrainer, IsearchTrainer, ITemplate, ISearchTemplate, IScheduleAccommodation
  , ICandidateInductionScheduleByBatch, ICandidateInductionScheduleByIndividual, ICandidateListOnBoarding, ICandidateAccommodationInsert, IReportingVenue
} from '../../../../interfaces/prejoining/onboardingcoordinator.interface';
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
import { CandidateService } from '../../../../services/joining/candidate/candidate.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { JoinersService } from '../../../../services/prejoining/onboardingcoordinator/joiners.service';
import { IApproverVertical, IApproverFunction, IApproverDepartment, IApproverVerticalFunctionDepartment, IApproverFunctionDepartment, IBatch, ISearchBatch, ITrainingTittle, IsearchTrainingTittle } from '../../../../interfaces/common/common.interface';
import { AssessmentService } from 'src/app/services/assessment/assessment.service';
import { IReportingVenueExists } from 'src/app/interfaces/prejoining/joinerslist.interface';
import { element } from 'protractor';
import { IInductionVenueWithExternal } from 'src/app/interfaces/common/venue.interface';
import { ISearchInductionVenue, IInductionVenue } from 'src/app/interfaces/common/venue.interface';
import { VenueService } from '../../../../services/common/venue/venue.service';

declare var jQuery: any;

@Component({
  selector: 'app-ocreassignindividualcandidate-component',
  templateUrl: './ocreassignindividualcandidate-component.component.html',
  styleUrls: ['./ocreassignindividualcandidate-component.component.css']
})
export class OcreassignindividualcandidateComponentComponent implements OnInit {
  searchEditAccommodationForm: FormGroup;
  searchformScheduledBatchWise: FormGroup;
  // saveReportingVenueForm = {
  //   candidateReprtingVenueId: null,
  //   batchId: null,
  //   candidateId: null,
  //   reprtingVenue: null,
  //   reprtingVenueAddress: "",
  //   createdBy: null
  // };
  EmpNo: string;
  from: string;
  type: string;
  candidateId: any;;
  batchId: any;
  editAccommodationDetails: IEditAccommodation;
  editAccommodationcandidateDetailsObj: IEditAccomodationCandidate;
  editAccommodationInductionSchedule: IEditAccomodationInductionShedule[] = [];
  editAccommodationCandidateDetails: IEditAccomodationForCandidate[] = [];
  allAccommodationDetailsByCandidate: IAccommodationDetailsByCandidate;
  candidateDetailsByCandidate: IGetEditCandidate;
  accommodationDetailsByCandidate: IGetEditAccomodationForCandidate[] = [];
  scheduleAccomodation: IScheduleAccommodation;
  inductionScheduleCandidateList: ICandidateListOnBoarding[] = [];
  inductionScheduledList: ICandidateInductionScheduleByBatch[] = [];
  scheduledCandidateAccommodationList: ICandidateInductionScheduleByIndividual[] = [];
  reportingVenueDetails: IReportingVenue[] = [];
  // Batch
  allBatch: any[] = [];
  batchs: IBatch[] = [];
  selectedBatch: IBatch;
  searchBatch: ISearchBatch = {
    batchId: null,
    vertical: null,
    isActive: null
  }
  //vertical
  verticals: IVertical[] = [];
  verticalsPopUp: IVertical[] = [];
  selectedPendingVertical: IVertical;
  selectedVerticalId: number;
  defaultverticalId: number;
  loginUserId: number;
  verticalIds: string;
  verticalId: number;
  searchCandidateInfo = {
    batchId: null,
    candidateId: null
  }
  // searchCandidateMedicalReimbursement: ISearchCandidateMedicalReimbursement = {
  //   candidateMedicalReimbursementId: null,
  //   requisitionDetailId: null,
  //   candidateId: null,
  //   empId: null,
  // }
  showBatchSection: boolean;
  candidateInfo: any;
  batchNo: string = "";
  searchReportingVenue = {
    candidateReprtingVenueId: null,
    batchId: null,
    candidateId: null,
    reprtingVenue: null,
    reprtingVenueAddress: "",
    createdBy: null
  }
  reportingVenueExists: IReportingVenueExists[] = [];
  // venue
  // venues: IVenue[] = [];
  // selectedVenue: IVenue;
  // searchVenue: ISearchVenue = {
  //   reportingVenueId: null,
  //   isActive: null
  // }
  reportingVenue: any;
  reportingVenueAddress: string;
  fillAccommodationDetails: any[] = [];
  reassigningFor: string;
  parentActiveTab: string;
  childActiveTab: string;
  OnBoardingcoordinator: any;
  selectedBatchId: any;
  // Induction Deatils For candidate
  inductionDetailsForBatch: IReassignCandidateForBatch;
  reportingVenueReassign: any;
  reassignInductionDetails: any;
  reportingInductionVenue: any;
  reportingInductionVenueAddres: any;
  reportingInductionVenueList: any[] = [];
  requisitionDetailsIdForReassign: number;
  coordinatorID: number;
  coordinatorName: string = "";
  // Added by anif from here on 14-01-2023
  showNewAddSection: boolean = false;
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  searchTrainingTittle = {
    TrainingTittleId: 0,
    IsActive: true,
  }
  trainingTittleList: any[] = [];
  roleWiseUser: IRoleWiseUser[] = [];
  searchRoleWiseUser: ISearchRoleWiseUser = {
    roleId: null
  }
  trainerRoleid = 0;
  trainerTypename = "";
  inductionModes: IModeOfInduction[] = [];
  selectedInductionMode: IModeOfInduction;
  searchInductionMode: ISearchModeOfInduction = {
    inductionModeId: null,
    isActive: true
  }
  externalLocation: any[] = [];
  combinedLocation: any[] = [];
  locationType: string = "Internal";
  searchExternalVenue = {
    ExternalVenueId: 0,
    IsActive: null,
  }
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
  venues: IInductionVenueWithExternal[] = [];
  locationwiseVenue: IInductionVenueWithExternal[] = [];
  selectedVenue: IInductionVenueWithExternal;
  searchVenue: ISearchInductionVenue = {
    InductionVenueId: null,
    isActive: null
  }
  onBoardingCoordinatorList: any[] = [];
  searchRoleUser: any = {
    roleId: 0
  }
  inductionScheduleDetailsNonEditableList: any[] = [];
  trainerName: string = "";
  locationID: number;
  locationName: string = "";
  inductionVenueName: string = "";
  inductionScheduleDetailsList: any[] = [];
  fromBatch: boolean = false;
  // Till this by anif on 14-01-2023
  // By Sayandeep on 21-02-2023 from here
  objEditSchedule: EditSchedule;
  editScheduleIndex: any;
  fromTimeHour: string;
  toTimeHour: string;
  @ViewChild('fromDateEdit', { static: false }) fDateEdit: ElementRef;
  @ViewChild('toDateEdit', { static: false }) tDateEdit: ElementRef;
  trainingInchargeList: any[] = [];
  searchTic: any = {
    locationId: 0
  };
  CandidateInductionScheduleDetailsID:any;
  // By Sayandeep on 21-02-2023 end here
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
    private SpinnerService: NgxSpinnerService, private assessmentService: AssessmentService,
    private titleService: Title, public activatedRoute: ActivatedRoute,
    private positionService: PositionService, private candidateService: CandidateService,
    private joinersservice: JoinersService, private venueService: VenueService,
  ) {
    this.SpinnerService.show();
    this.objEditSchedule = new EditSchedule();     // By Sayandeep on 21-02-2023               
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.parentActiveTab = this.persistance.get("parentActiveTab");
    this.childActiveTab = this.persistance.get("childActiveTab");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.candidateId = params['CandidateId'];
      this.batchId = params['BatchId'];
      this.from = params['From'];
      this.type = params['Type'];
      this.batchNo = params['BatchNo'];
      this.OnBoardingcoordinator = params['OnBoardingcoordinator'];
      this.requisitionDetailsIdForReassign = params['ReqDetailsId'];
      this.EmpNo = params['EmpNo'];
      if(this.type=='P'){
        this.verticalId=2
      }
      else if(this.type=='C'){
        this.verticalId=1
      }
      else if(this.type=='S'){
        this.verticalId=3
      }
      console.log("chck", this.verticalId)
    });
    //this.saveReportingVenueForm.createdBy = this.loginUserId;
    // this.searchCandidateMedicalReimbursement.candidateId = Number(this.candidateId);
    // this.searchCandidateMedicalReimbursement.candidateMedicalReimbursementId =null;   
    // this.searchCandidateMedicalReimbursement.requisitionDetailId = null;
    this.createSearchAccomodationForm();
    this.createScheduledBatchwiseSearchForm();
    this.updateFormValue();
   // this.getAllBatch();
    //this.getAllVerticals();
    //this.getVenue();
    // this.getCandidateInfo();
    this.trainerRoleid = 48;                       // Added by Sayandeep on 21-02-2023 this page will come only for individual
    this.getAllDropdownDataToAddNewSchedule();      // By Anif on 14-01-2023
    if (this.candidateId != undefined && this.batchId == undefined) {
      this.searchCandidateInfo.candidateId = Number(this.candidateId);
      this.searchCandidateInfo.batchId = null;
      this.getCandidateInfoBatch();
      ///this.getCandidateInfoIndividual();need to ask commented by Sayandeep
      this.showBatchSection = false;
      this.reassigningFor = "Candidate";
      // this.trainerRoleid = 48;                // By Sayandeep on 21-02-2023
      this.trainerTypename = "Person To Meet";  // By anif on 14-01-2023
      this.fromBatch = false;  // By anif on 14-01-2023
    } else if (this.batchId != undefined && this.candidateId != undefined) {
      this.searchCandidateInfo.candidateId = Number(this.candidateId);
      // this.searchCandidateInfo.batchId = Number(this.batchId);
      if (this.batchId != 0) {
        this.getCandidateInfoBatch();
      }
      this.showBatchSection = true;
      this.reassigningFor = this.batchId == 0 ? "Candidate" : "Batch";
      // this.trainerRoleid = 47;         // By Sayandeep on 21-02-2023
      this.trainerTypename = "Trainer"; // By anif on 14-01-2023
      this.fromBatch = true;  // By anif on 14-01-2023
      this.selectedBatchId = this.batchId == 0 ? null : Number(this.batchId);
    }
    // this.getAllAccommodationDetails();
    // this.getReportingVenueDetails();
  }

  ngOnInit() {
    this.loadAccrodian();
    this.loadDatePicker(); // by anif on 14-01-2023
    this.loadTimePicker1(); // by anif on 14-01-2023
    this.loadTimePicker2(); // by anif on 14-01-2023
    this.loadSelectPicker(); // by anif on 14-01-2023
    this.getCandidateInfoBatch();
  }
  loadAccrodian() {
    jQuery("#accordion").on("hide.bs.collapse show.bs.collapse", e => {
      jQuery(e.target)
        .prev()
        .find("i:last-child")
        .toggleClass("fa-minus fa-plus");
    });
  }
  loadDatePicker() {  //By Sayandeep on 21-02-2023
    // jQuery(".datepicker").parent(".input-group").datepicker({
    //   autoclose: true,
    //   format: "dd/mm/yyyy",
    //   todayHighlight: true
    // });
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      minDate: new Date().setDate(new Date().getDate()),
      todayHighlight: true
    }).on("change", function (e) {
      jQuery(".datepickerto").parent(".input-group").datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        startDate: e.target.value,
      })
    })

    jQuery(".datepickerform").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      minDate: new Date().setDate(new Date().getDate()),
      todayHighlight: true
    }).on("change", function (e) {
      console.log("hmm2", e.target.value)
      jQuery(".datepickertoedit").parent(".input-group").datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        startDate: e.target.value,
      })
    })
  }
  loadTimePicker1() {
    jQuery('.timepik').datetimepicker(
      {
        format: 'hh:mm'
      }
    );
  }
  loadTimePicker2() {
    jQuery('.timepik').datetimepicker(
      {
        format: 'hh:mm'
      }
    );
  }
  loadSelectPicker() {
    setTimeout(() => {
      jQuery('.selectpicker').selectpicker({
        size: 6
      });
      jQuery('.selectpicker').selectpicker('refresh');
    });
  }
  getAllDropdownDataToAddNewSchedule() {
    this.getAllTrainingTittle();
    this.getAllRoleWiseUser();
    this.getInductionMode();
    this.getAllLocation();
    this.getAllOnboardingCoordinator();
    this.getVenue();
  }
  getAllTrainingTittle() {
    this.SpinnerService.show();
    this.commonService.getAllTrainingTittleList(this.searchTrainingTittle).subscribe((response: any) => {
      if (response) {
        this.trainingTittleList = response;
        //console.log("Training Tittle list", this.trainingTittleList);
      }
      else {
        this.trainingTittleList = [];
      }
    }, error => {
      this.SpinnerService.hide();
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      //this.loadDataTable();
      this.SpinnerService.hide();
    })
  }
  getAllRoleWiseUser() {
    this.roleWiseUser = [];
    this.searchRoleWiseUser.roleId = this.trainerRoleid;
    this.joinersservice.getAllRoleWiseUser(this.searchRoleWiseUser).subscribe((result) => {
      if (result) {
        this.roleWiseUser = result;
      }
      else {
        this.roleWiseUser = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  getInductionMode() {
    this.inductionModes = [];
    this.joinersservice.getAllInductionMode(this.searchInductionMode).subscribe((result) => {
      if (result) {
        this.inductionModes = result;
      }
      else {
        this.inductionModes = [];
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
        this.combinedLocation = [];
        this.locations.forEach((element, index) => {
          this.combinedLocation.push({ locationId: element.locationId, locationOffice: element.locationOffice });
        })
      }
      else {
        this.locations = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  getAllOnboardingCoordinator() {
    this.onBoardingCoordinatorList = [];
    if (this.type.toUpperCase() == "P") {
      this.searchRoleUser.roleId = 25
    }
    else if (this.type.toUpperCase() == "C") {
      this.searchRoleUser.roleId = 24
    }
    else {
      this.searchRoleUser.roleId = 26
    }

    this.commonService.getRoleWiseUser(this.searchRoleUser).subscribe((result) => {
      if (result) {
        this.onBoardingCoordinatorList = result;
      }
      else {
        this.onBoardingCoordinatorList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  getVenue() {
    this.venues = [];
    //this.searchTrainer.verticalId = this.selectedVerticalId;
    this.searchVenue.isActive = true;
    // this.venueService.getAllInductionVenue(this.searchVenue).subscribe((result) => {
    this.venueService.getAllInductionVenueWithExternal(this.searchVenue).subscribe((result) => {
      if (result) {
        this.venues = result;
        //console.log("Reporting Venue list", this.venues);
      }
      else {
        this.venues = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  // getVenue() {
  //   this.venues = [];
  //   //this.searchTrainer.verticalId = this.selectedVerticalId;
  //   this.joinersservice.getAllVenue(this.searchVenue).subscribe((result) => {
  //     if (result) {
  //       this.venues = result;
  //       console.log("Reporting Venue list", this.venues);
  //     }
  //     else {
  //       this.venues = [];
  //     }
  //   }, error => {
  //     console.log(error);
  //   }, () => {
  //   });
  // }
  createSearchAccomodationForm() {
    this.searchEditAccommodationForm = this.fb.group({
      batchId: null,
      candidateId: null,
    });
  }
  createScheduledBatchwiseSearchForm() {
    this.searchformScheduledBatchWise = this.fb.group({
      batchNo: [''],
      onBordingMangerId: null,
      onBordingCoordinatorId: null,
      verticalId: null,
      dtofJoiningFrom: [''],
      dtofJoiningTo: ['']
    });
  }

  updateFormValue() {
    if (this.candidateId != undefined && this.batchId == undefined) {
      this.searchEditAccommodationForm.patchValue({
        candidateId: Number(this.candidateId),
      })
    } else {
      this.searchEditAccommodationForm.patchValue({
        batchId: Number(this.batchId),
      })
    }
  }
  // getAllAccommodationDetails() {
  //   this.SpinnerService.show();
  //   this.joinersservice.getAllDetailsForEditAccommodation(this.searchEditAccommodationForm.value).subscribe((result) => {
  //     if (result) {
  //       this.inductionDetailsForBatch = result;
  //       //  console.log("Edit Accommodation Details", this.editAccommodationDetails);
  //       // this.editAccommodationInductionSchedule = this.editAccommodationDetails.trainingEditAccomodationInductionSheduleDetails; // 1st grid
  //       // this.editAccommodationcandidateDetailsObj = this.editAccommodationDetails.editAccomodationCandidateDetail;
  //       // this.editAccommodationCandidateDetails = this.editAccommodationDetails.trainingEditAccomodationForCandidateDetails; // 2nd grid

  //       this.SpinnerService.hide();
  //     }
  //     else {
  //       // this.editAccommodationDetails = [];
  //       this.SpinnerService.hide();
  //     }
  //   }, error => {
  //     console.log(error);
  //     this.SpinnerService.hide();
  //   }, () => {
  //     this.SpinnerService.hide();
  //   });
  // }
  getCandidateInfoIndividual() {
    // this.scheduleAccomodation = [];
    this.SpinnerService.show();
    this.joinersservice.getAllAccommodationDetailsByCandidate(this.searchCandidateInfo).subscribe((result) => {
      if (result) {
        this.scheduleAccomodation = result;
        this.candidateInfo = this.scheduleAccomodation.candidateAccomodationDetails.find(e => e.candidateId == Number(this.candidateId))
        // console.log("Candidate Info Individual", this.candidateInfo);

        // console.log("Schedule Accommodation All_Details Individual", this.scheduleAccomodation);
        this.reportingVenueDetails = this.scheduleAccomodation.reportingVenu;
        this.inductionScheduleCandidateList = this.scheduleAccomodation.candidateAccomodationDetails; // 1st grid       
        this.SpinnerService.hide();
      }
      else {
        // this.scheduleAccomodation = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  getCandidateInfoBatch() {
    //  this.scheduleAccomodation = [];

    this.SpinnerService.show();
    this.joinersservice.getAllInductionDetailsForIndividualReassignCandidate(this.searchCandidateInfo).subscribe((result) => {
      if (result) {
        this.inductionDetailsForBatch = result;
        //  console.log("Induction Details for batch", this.inductionDetailsForBatch);
        this.candidateInfo = this.inductionDetailsForBatch.reaasingCandidatesDetail.find(e => e.candidateId == Number(this.candidateId))
        //console.log("Candidate Info", this.candidateInfo);
        this.reportingVenueReassign = this.inductionDetailsForBatch.inductionReportingVenueDetails;
        //console.log("Reporting Venue Details", this.reportingVenueReassign);
        this.reassignInductionDetails = this.inductionDetailsForBatch.batchInductionScheduleDetail; // 1st grid
        //console.log("Induction Details", this.reassignInductionDetails);
        // By default make all checked as false
        this.reassignInductionDetails.forEach((element, index) => {
          element.isChecked = false;
        })
        this.SpinnerService.hide();
      }
      else {
        // this.scheduleAccomodation = [];        
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  onCheckDetails(eve, data) {
    debugger
    // console.log("Rowwise data", data);
    data.isChecked = eve.target.checked;
    if (eve.target.checked) {
      //this.reassignInductionDetails.forEach(element => {
      // if (element.locationId == Number(data.location) && element.toDate == data.dateTo && element.candidateId == Number(this.candidateId) && element.accomodation != null) {
      var isExisted = this.fillAccommodationDetails.find(e => e.locationId == Number(data.location) && e.dateFrom == data.dateFrom && e.dateTo == data.dateTo && e.isExternal == data.isExternal);
      if (isExisted == null) {
        var i = this.fillAccommodationDetails.length == 0 ? 1 : this.fillAccommodationDetails.length + 1;
        let obj = {
          index: i,
          locationId: Number(data.location),
          dateFrom: data.dateFrom,
          dateTo: data.dateTo,
          accommodation: "",
          locationName: data.locationName,
          candidateId: data.candidateId,
          isExternal: data.isExternal,
          candidateInductionScheduleDetailsId: data.candidateInductionScheduleDetailsId,
          candidateInductionScheduleId: data.candidateInductionScheduleId,
          inductionVenue: data.inductionVenue,
          //location: Number(data.location)
        }
        this.fillAccommodationDetails.push(obj);
      }
      // Reporting venue list
      var reportinginductionVenueExisted = this.reportingInductionVenueList.find(e => e.reportingVenueId == data.inductionVenue && e.isExternal == data.isExternal);
      if (reportinginductionVenueExisted == null) {
        let reportinginductinVenueObj = {
          reportingVenueId: data.inductionVenue,
          reportingVenueName: data.inductionVenueName,
          isExternal: data.isExternal
        }
        this.reportingInductionVenueList.push(reportinginductinVenueObj);
      }
      // Set one default reportinf venue

      // if (this.reportingInductionVenueList.length == 1) {
      //   this.reportingInductionVenue = data.inductionVenue
      // } else {
      //   var tempDate = data.dateFrom;
      //   this.fillAccommodationDetails.forEach(element => {
      //     if (tempDate < element.dateFrom) {
      //       this.reportingInductionVenue = data.inductionVenue;
      //     } else {
      //       tempDate = element.dateFrom;
      //       this.reportingInductionVenue = element.inductionVenue;
      //     }
      //     count = 1;
      //   })
      // }
      // console.log("Reporting Induction Venue", this.reportingInductionVenueList);

    } else {
      this.fillAccommodationDetails.forEach((element, index) => {
        if (element.candidateInductionScheduleDetailsId == data.candidateInductionScheduleDetailsId && element.locationId == Number(data.location) && element.dateFrom == data.dateFrom && element.dateTo == data.dateTo && element.isExternal == data.isExternal) {
          this.fillAccommodationDetails.splice(index, 1);
        }
      })
      // Reporting Venue splice
      this.reportingInductionVenueList.forEach((element, index) => {
        if (element.reportingVenueId == data.inductionVenue && element.isExternal == data.isExternal) {
          this.reportingInductionVenueList.splice(index, 1);
        }
      })
      // Set one default reportinf venue
      // var count = 0;
      // var tempDate;
      // this.fillAccommodationDetails.forEach(element => {
      //   if (count == 0) {
      //     tempDate = element.dateFrom;
      //     this.reportingInductionVenue = element.inductionVenue;
      //   } else {
      //     if (tempDate < element.dateFrom) {
      //       // this.reportingInductionVenue = element.inductionVenue;
      //     } else {
      //       tempDate = element.dateFrom;
      //       this.reportingInductionVenue = element.inductionVenue;
      //     }
      //   }
      //   count = 1;
      // })
    }
  }
  onClickSubmit() {


    let finalObj = {
      //batchId: Number(this.batchId),
      batchId: Number(this.selectedBatchId),
      candidateId: Number(this.candidateId),
      candidateNo: this.candidateInfo.candidateNo,
      verticalId:this.verticalId,
      requisitionDetailsId: Number(this.requisitionDetailsIdForReassign),
      reassignCandidateInductionDetails: [],                // Added by Anif Later on
      candidateInductionScheduleCandidateDetails: [],
      candidateAccomodationDetails: [],
      trainingInchargeAccomodationDetailsReassign: [],
      createdBy: this.loginUserId
    }

    // Added later by anif
    // this.reassignInductionDetails.forEach(reassign_ele => {
    //   this.fillAccommodationDetails.forEach(fill_ele => {
    //     if (reassign_ele.isChecked == false) {
    //       if (Number(reassign_ele.location) == Number(fill_ele.locationId) && reassign_ele.dateFrom == fill_ele.dateFrom && reassign_ele.dateTo == fill_ele.dateTo) {
    //         reassign_ele.isChecked = true;
    //       }
    //     }
    //   })
    // })

    this.reassignInductionDetails.forEach(re_element => {
      if (re_element.isChecked) {
        let reassignCandidateInductionScheduleDetailsObj = {
          CandidateInductionScheduleDetailsId: re_element.candidateInductionScheduleDetailsId,
          CandidateInductionScheduleId: re_element.candidateInductionScheduleId,
          BatchCandidateIds: null
        }
        finalObj.reassignCandidateInductionDetails.push(reassignCandidateInductionScheduleDetailsObj);
      }
    })


    // Till this

    // Logic chnaged by Anif

    this.reassignInductionDetails.forEach((reassign_element, index) => {
      if (reassign_element.isChecked) {

        // Candidate Induction schedule candidate details obj
        let candidateInductionScheduleCandidateDetailsObj = {
          CandidateInductionScheduleDetailsId: reassign_element.candidateInductionScheduleDetailsId,
          CandidateInductionScheduleId: reassign_element.candidateInductionScheduleId,
          CandidateId: Number(this.candidateId)
        }
        finalObj.candidateInductionScheduleCandidateDetails.push(candidateInductionScheduleCandidateDetailsObj);


        this.fillAccommodationDetails.forEach(element => {
          if (Number(reassign_element.location) == Number(element.locationId) && reassign_element.dateFrom == element.dateFrom && reassign_element.dateTo == element.dateTo) {
            // Candidate Accommodation details Obj

            let candidateAccomodationDetailsObj = {
              candidateAccomodationDetailsId: 0,
              candidateAccomodationHeaderId: 0,
              CandidateAccomodationId: 0,
              candidateId: Number(this.candidateId),
              candidateInductionScheduleDetailsId: reassign_element.candidateInductionScheduleDetailsId,
              fromDate: reassign_element.dateFrom,
              toDate: reassign_element.dateTo,
              accomodation: element.accommodation,
              location: Number(reassign_element.location),
              isActive: true
            }
            finalObj.candidateAccomodationDetails.push(candidateAccomodationDetailsObj);

            // Candiate training in charge accommodation details

            let traininginchargeAccomodationDetailsObj = {
              TrainingInchageAccomodationDetailsId: 0,
              CandidateAccomodationHeaderId: 0,
              CandidateId: Number(this.candidateId),
              FromDate: reassign_element.dateFrom,
              ToDate: reassign_element.dateTo,
              Location: Number(reassign_element.location),
              InductionVenue: element.inductionVenue,
              Accomodation: element.accommodation,
              CandidateAccomodationDetailsId: 0
            }
            finalObj.trainingInchargeAccomodationDetailsReassign.push(traininginchargeAccomodationDetailsObj);
          }
        })
      }

    })





    // this.fillAccommodationDetails.forEach(element => {
    //   // Candidate Induction schedule candidate details obj
    //   let candidateInductionScheduleCandidateDetailsObj = {
    //     CandidateInductionScheduleDetailsId: element.candidateInductionScheduleDetailsId,
    //     CandidateInductionScheduleId: element.candidateInductionScheduleId,
    //     CandidateId: Number(this.candidateId)
    //   }
    //   finalObj.candidateInductionScheduleCandidateDetails.push(candidateInductionScheduleCandidateDetailsObj);

    //   // Candidate Accommodation details Obj

    //   let candidateAccomodationDetailsObj = {
    //     candidateAccomodationDetailsId: 0,
    //     candidateAccomodationHeaderId: 0,
    //     CandidateAccomodationId: 0,
    //     candidateId: Number(this.candidateId),
    //     candidateInductionScheduleDetailsId: element.candidateInductionScheduleDetailsId,
    //     fromDate: element.dateFrom,
    //     toDate: element.dateTo,
    //     accomodation: element.accommodation,
    //     location: element.locationId,
    //     isActive: true
    //   }
    //   finalObj.candidateAccomodationDetails.push(candidateAccomodationDetailsObj);

    //   // Candiate training in charge accommodation details

    //   let traininginchargeAccomodationDetailsObj = {
    //     TrainingInchageAccomodationDetailsId: 0,
    //     CandidateAccomodationHeaderId: 0,
    //     CandidateId: Number(this.candidateId),
    //     FromDate: element.dateFrom,
    //     ToDate: element.dateTo,
    //     Location: element.locationId,
    //     InductionVenue: element.inductionVenue,
    //     Accomodation: element.accommodation,
    //     CandidateAccomodationDetailsId: 0
    //   }
    //   finalObj.trainingInchargeAccomodationDetailsReassign.push(traininginchargeAccomodationDetailsObj)
    // })
    console.log("Final Submit Accommodation Obj Reassign", finalObj);
    this.SpinnerService.show();
    this.joinersservice.trainingReassignForIndividualCanndidate(finalObj).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          // this.updateFormValue();
          // this.getAllDetailsForEdit();
          this.backTo();
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
  OnClickAddNewSchedule() {
    this.showNewAddSection = true;
    // this.loadDataTable();
    this.inductionScheduleDetailsList = [];
    let arrayIndex = this.inductionScheduleDetailsList.length == 0 ? 1 : (this.inductionScheduleDetailsList[this.inductionScheduleDetailsList.length - 1].index) + 1
    let obj = {
      candidateInductionScheduleDetailsId: 0,
      candidateInductionScheduleId: 0,
      trainingTittleId: null, // Adde by anif on 25-11-2022
      traingTitle: "",
      dateFrom: "",
      dateTo: "",
      timeFrom: "",
      timeTo: "",
      batchCandidateIds: [],    // Added for multiple schedule    
      detailsofSession: "",
      trainer: null,
      inductionMode: null,
      // location: this.inductionForm.value.locationId,
      location: this.locationID,
      inductionVenue: null,
      // inductionCoOrdinator: this.inductionForm.value.onBordingCoordinatorId,
      inductionCoOrdinator: this.coordinatorID,
      remarks: "",
      readOnly: false,
      index: arrayIndex,
      isExternal: false,
      locationName: this.locationName,
      inductionCoOrdinatorName: this.coordinatorName,
      inductionVenueName: this.inductionVenueName,
      trainerName: this.trainerName,
      verticalId: this.defaultverticalId,
      templateId: 0  // Added by anif on 25-11-2022
    }
    // if (this.isForBatch) {  // Added for multiple schedule
    //   this.batchWiseCandidateList.forEach(can_id => {
    //     obj.batchCandidateIds.push(can_id.candidateId);
    //   })
    // }
    this.inductionScheduleDetailsList.push(obj);
    // this.inductionForm.reset();
    this.locationID = null;
    this.coordinatorID = null;
    //  this.updateFormValue();
    this.loadSelectPicker();
    // console.log("New Induction Details", this.inductionScheduleDetailsList);
    setTimeout(() => {
      this.loadDatePicker();
    }, 100);

  }
  getFormatedTime(time) {
    let hour = (time.split(':'))[0]
    let min = (time.split(':'))[1]
    let part = hour > 12 ? 'PM' : 'AM';
    if (parseInt(hour) == 0)
      hour = 12;
    min = (min + '').length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour + '').length == 1 ? `0${hour}` : hour;
    return `${hour}:${min}${part}`
  }
  getInductionModeName(modeId) {
    if (modeId != undefined) {
      var inductionmodeNameObj = this.inductionModes.find(e => e.inductionModeId == modeId);
      if (inductionmodeNameObj != undefined) {
        return inductionmodeNameObj.inductionModeName;
      }
    }

  }
  getTrainingTittleName(data: any) {  // Added by anif on 25-11-2022
    var trainingTittleNameObj = this.trainingTittleList.find(e => e.trainingTittleId == data.trainingTittleId);
    if (trainingTittleNameObj != undefined) {
      data.traingTitle = trainingTittleNameObj.trainingTittleName;
    }
  }
  onChangePersonTomeet(data) {
    if (data.trainer != undefined) {
      var trainername = this.roleWiseUser.find(e => e.autoUserId == data.trainer).employeeName;
      this.trainerName = trainername;
    }
  }
  onChangeCheckbox(eve, data) {
    this.combinedLocation = [];
    this.locationID = null;
    if (eve.target.checked) {
      data.isExternal = true;
      this.locationType = "External";
      this.externalLocation.forEach((element, index) => {
        this.combinedLocation.push({ locationId: element.externalVenueId, locationOffice: element.externalVenueName });
      })
    } else {
      data.isExternal = false;
      this.locationType = "Internal";
      this.locations.forEach((element, index) => {
        this.combinedLocation.push({ locationId: element.locationId, locationOffice: element.locationOffice });
      })
    }
  }
  onChangeLocation(data: any) {
    if (data.isExternal) {
      this.locationwiseVenue = this.venues.filter(e => e.locationId == this.locationID && e.isExternal == true);
    } else {
      this.locationwiseVenue = this.venues.filter(e => e.locationId == this.locationID && e.isExternal == false);
    }
    if (this.locationID != undefined) {
      // var locationName = this.locations.find(e => e.locationId == locationid).locationNo;
      var locationName = this.combinedLocation.find(e => e.locationId == this.locationID);
      if (locationName != undefined) {
        this.locationName = locationName.locationOffice;
      }
    }
    this.getAllTicByLocation(this.locationID);    // By Sayandeep on 21-02-2023
  }
  onChangeVenue(data) {
    if (data.inductionVenue != undefined) {
      var venueName = this.locationwiseVenue.find(e => e.inductionVenueId == data.inductionVenue).inductionVenueName;
      this.inductionVenueName = venueName;
    }

  }
  onChangeCoordinator() {
    if (this.coordinatorID != undefined) {
       // var locationName = this.locations.find(e => e.locationId == locationid).locationNo;
      //  var coordinatorNameObj = this.onBoardingCoordinatorList.find(e => e.autoUserId == this.coordinatorID);
      var coordinatorNameObj = this.trainingInchargeList.find(e => e.autoUserId == this.coordinatorID);    // By Sayandeep on 21-02-2023
      if (coordinatorNameObj != undefined) {
        this.coordinatorName = coordinatorNameObj.employeeName;
      }
    }
  }

  onClickAddIcon(data) {
    var flag = 0;
    var msg = "";

    if (data.inductionVenue == null) {
      flag = 1;
      msg = "Please Select Venue";
    }
    else {

    }
    if (data.inductionMode == null) {
      flag = 1;
      msg = "Please Select Induction Mode";
    }
    else {

    }
    if (data.trainer == null) {
      flag = 1;
      msg = "Please Select Trainer";
    }
    else {

    }
    if (data.detailsofSession == "") {
      flag = 1;
      msg = "Please Enter Details of Session";
    }
    else {

    }
    // if (data.batchCandidateIds.length == 0) {
    //   flag = 1;
    //   msg = "Please select atleast one candidate";
    // }
    // else {

    // }
    if (data.timeTo == "") {
      flag = 1;
      msg = "Please Enter Time To";
    }
    else {

    }
    if (data.timeFrom == "") {
      flag = 1;
      msg = "Please Enter Time From";
    }
    else {

    }
    if (this.fDate.nativeElement.value != "" && this.tDate.nativeElement.value != "") {
      const [feday, femonth, feyear] = this.fDate.nativeElement.value.split('/');
      const fedate = new Date(feyear, femonth - 1, feday);
      const [teday, temonth, teyear] = this.tDate.nativeElement.value.split('/');
      const tedate = new Date(teyear, temonth - 1, teday);
      if (tedate < fedate) {
        flag = 1;
        msg = "From Date Can't be greater than To Date";
      }
    } else {

    }
    if (this.tDate.nativeElement.value == "") {
      flag = 1;
      msg = "Please Select To Date";
    }
    else {

    }
    if (this.fDate.nativeElement.value == "") {
      flag = 1;
      msg = "Please Select From Date";
    }
    else {

    }
    if (data.trainingTittleId == null || data.trainingTittleId == undefined) {
      flag = 1;
      msg = "Please Select Training Tittle";
    }
    else {

    }
    if (flag == 0) {
      var selectedObj = this.inductionScheduleDetailsList.find(e => e.index == data.index);
      selectedObj.dateFrom = this.fDate.nativeElement.value;
      selectedObj.dateTo = this.tDate.nativeElement.value;
      selectedObj.locationName = this.locationName;
      selectedObj.inductionCoOrdinatorName = this.coordinatorName;
      selectedObj.inductionVenueName = this.inductionVenueName;
      selectedObj.trainerName = this.trainerName;
      selectedObj.location = this.locationID;
      selectedObj.inductionCoOrdinator = this.coordinatorID;
      selectedObj.index = this.inductionScheduleDetailsNonEditableList.length == 0 ? 1 : (this.inductionScheduleDetailsNonEditableList[this.inductionScheduleDetailsNonEditableList.length - 1].index) + 1;
      this.inductionScheduleDetailsNonEditableList.push(JSON.parse(JSON.stringify(selectedObj)));
      this.inductionScheduleDetailsList.forEach((element, index) => {
        if (element.index == data.index) {
          element.trainingTittleId = null,   // Added by anif on 25-11-2022
            element.traingTitle = "",
            element.dateFrom = "",
            element.dateTo = "",
            element.timeFrom = "",
            element.timeTo = "",
            element.batchCandidateIds = [],  // Added for multiple schedule
            element.detailsofSession = "",
            element.trainer = null,
            element.inductionMode = null,
            element.inductionVenue = null,
            element.remarks = "",
            element.readOnly = false,
            element.isExternal = false
          // element.index= arrayIndex

          // if (this.isForBatch) {  // Added for multiple schedule
          //   this.batchWiseCandidateList.forEach(can_id => {
          //     element.batchCandidateIds.push(can_id.candidateId);
          //   })
          // }

        }
      })
      this.fDate.nativeElement.value = "";
      this.tDate.nativeElement.value = "";
      this.locationID = null;
      this.coordinatorID = null;
      this.combinedLocation = [];
      this.locations.forEach((element, index) => {
        this.combinedLocation.push({ locationId: element.locationId, locationOffice: element.locationOffice });
      })
      //console.log("Induction Details List", this.inductionScheduleDetailsNonEditableList);
      this.loadSelectPicker();
    }
    else {
      this.notificationService.showError(msg, "Error");
    }

  }
  onClickDelete(data) {
    this.inductionScheduleDetailsNonEditableList.forEach((element, index) => {
      if (element.index == data.index) {
        this.inductionScheduleDetailsNonEditableList.splice(index, 1)
      }
    })
  }
  onClickAssignedDelete(data) {
    this.CandidateInductionScheduleDetailsID=data.candidateInductionScheduleDetailsId;
  }
  onDeleteModal(){
    debugger;
    console.log("find",this.CandidateInductionScheduleDetailsID)
    let obj = {
      CandidateInductionScheduleDetailsID : this.CandidateInductionScheduleDetailsID
    }
    this.joinersservice.DeleteCandidateInductionScheduleDetails(obj).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          jQuery("#DeleteModal").modal("hide");
          this.getCandidateInfoBatch();
          // this.onChageBatch();
          //  this.updateFormValue();            
        }
      }
    })

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
        "fixedColumns": {"left": 3}
      });
    });
  }
  onFinalSubmit() {
    if (this.inductionScheduleDetailsNonEditableList.length > 0) {
      let finalSubmitObj = {
        candidateInductionScheduleId: 0,
        batchId: null,
        candidateId: Number(this.candidateId),
        createdBy: this.loginUserId,
        reassignCandidateNewInductionScheduleDetails: [],
      }
      this.inductionScheduleDetailsNonEditableList.forEach(element => {
        // console.log("Candidate Id", candidateids);
        let obj = {
          candidateInductionScheduleDetailsId: element.candidateInductionScheduleDetailsId,
          candidateInductionScheduleId: element.candidateInductionScheduleId,
          trainingTittleId: element.trainingTittleId,
          traingTitle: element.traingTitle,
          dateFrom: element.dateFrom,
          dateTo: element.dateTo,
          timeFrom: element.timeFrom,
          timeTo: element.timeTo,
          // batchCandidateIds: element.batchCandidateIds.length > 0 ? candidateids : "0",  // Added for multiple schedule
          detailsofSession: element.detailsofSession,
          trainer: element.trainer,
          inductionMode: element.inductionMode,
          location: element.location,
          inductionVenue: element.inductionVenue,
          inductionCoOrdinator: element.inductionCoOrdinator,
          remarks: element.remarks,
          isExternal: element.isExternal, // Added this parameter
          //verticalId: element.verticalId  // Added this parameter
          verticalId: this.verticalId  // Added this parameter

        }
        finalSubmitObj.reassignCandidateNewInductionScheduleDetails.push(obj);
      })
      // console.log("New Schedule Object", finalSubmitObj);
      console.log("Final Submit Object", finalSubmitObj)
      this.SpinnerService.show();
      //console.log("Final Submit Object", finalSubmitObj)
      this.joinersservice.reassignindividualCandidateNewScheduleInduction(finalSubmitObj).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.inductionScheduleDetailsList = [];
            this.inductionScheduleDetailsNonEditableList = [];
            this.showNewAddSection = false;
            this.getCandidateInfoBatch();
            // this.onChageBatch();
            //  this.updateFormValue();            
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
    } else {
      this.notificationService.showError("Please add atleast one details", "Error");
    }

  }
  onFinalReset() {
    this.showNewAddSection = false;
  }
  onClickBack() {   // By Sayandeep on 21-02-2023 
    this.showNewAddSection = false;
  }
  // Till this by anif on 14-01-2023
  backTo() {
    jQuery(".custom-menu").hide();
    if (this.from == "DCL") {
      if (this.type == "C") {
        this._route.navigate(['/app/corporate/oc-reassign-candidatelist']);
      } else if (this.type == "P") {
        this._route.navigate(['/app/plant/oc-reassign-candidatelist']);
      } else {
        this._route.navigate(['/app/sales/oc-reassign-candidatelist']);
      }
    } else {
      if (this.type == "C") {
        this.persistance.set('parentActiveTab', this.parentActiveTab);
        this.persistance.set('childActiveTab', this.childActiveTab);
        if (this.reassigningFor == "Candidate") {
          this._route.navigate(['app/corporate/new-joiner-list']);
        } else {
          this._route.navigate(['/app/viewcandidatedetails'], { queryParams: { BatchId: this.batchId, BatchNo: this.batchNo, OnBoardingcoordinator: this.OnBoardingcoordinator, From: this.from, Type: this.type } });
        }
      } else if (this.type == "P") {
        this.persistance.set('parentActiveTab', this.parentActiveTab);
        this.persistance.set('childActiveTab', this.childActiveTab);
        if (this.reassigningFor == "Candidate") {
          this._route.navigate(['app/plant/new-joiner-list']);
        } else {
          this._route.navigate(['/app/viewcandidatedetails'], { queryParams: { BatchId: this.batchId, BatchNo: this.batchNo, OnBoardingcoordinator: this.OnBoardingcoordinator, From: this.from, Type: this.type } });
        }

      } else if (this.type == "S") {
        this.persistance.set('parentActiveTab', this.parentActiveTab);
        this.persistance.set('childActiveTab', this.childActiveTab);
        if (this.reassigningFor == "Candidate") {
          this._route.navigate(['app/sales/new-joiner-list']);
        } else {
          this._route.navigate(['/app/viewcandidatedetails'], { queryParams: { BatchId: this.batchId, BatchNo: this.batchNo, OnBoardingcoordinator: this.OnBoardingcoordinator, From: this.from, Type: this.type } });
        }
      }
    }
}
// By Sayandeep on 21-02-2023 from here
onClickEditSchedule(data) {
  //console.log("Edit Data", data);
  this.prepareLocationDropdown(data.isExternal);
  this.prepareVenue(data);
  this.editScheduleIndex = data.index;
  if (!data.IsEditMode) {
    this.fromTimeHour = data.timeFrom.slice(-2);
    this.toTimeHour = data.timeTo.slice(-2);
  }
  if (data.readOnly) {
    var formatedFromTime = this.formateFromTime(this.fromTimeHour, data.timeFrom, data.IsEditMode);
    var formatedToTime = this.formateToTime(this.toTimeHour, data.timeTo, data.IsEditMode);
    data.timeFrom = formatedFromTime;
    data.timeTo = formatedToTime;
  }
  data.IsEditMode = true;
  this.objEditSchedule.TrainingTittleId = data.trainingTittleId;
  this.objEditSchedule.TrainingTittle = data.traingTitle;
  this.objEditSchedule.FromDate = data.dateFrom;
  this.objEditSchedule.ToDate = data.dateTo;
  this.objEditSchedule.FromTime = data.timeFrom;
  this.objEditSchedule.ToTime = data.timeTo;
  this.objEditSchedule.BatchCandidateIds = data.batchCandidateIds;
  this.objEditSchedule.SessionDetails = data.detailsofSession;
  this.objEditSchedule.Trainer = data.trainer;
  this.objEditSchedule.Mode = data.inductionMode;
  this.objEditSchedule.Location = data.location;
  this.objEditSchedule.Venue = data.inductionVenue;
  this.objEditSchedule.Coordinator = data.inductionCoOrdinator;
  this.objEditSchedule.Remarks = data.remarks;
  this.objEditSchedule.IsExternal = data.isExternal;
  this.objEditSchedule.templateId = data.templateId;
  this.objEditSchedule.locationName = data.locationName;
  this.objEditSchedule.inductionVenueName = data.inductionVenueName;
  this.loadSelectPicker();     // Added for multiple schedule
  // this.locationID = data.location;
  this.getAllTicByLocation(data.location);
  this.loadDatePicker();

}
getAllTicByLocation(locationId) {    // By Sayandeep on 21-02-2023
  this.trainingInchargeList = [];
  //this.searchTic.locationId = Number(this.locationID);
  this.searchTic.locationId = Number(locationId);          // By Sayandeep on 21-02-2023
  this.commonService.getAllTicByLocation(this.searchTic).subscribe((result: any[]) => {      
    if (result.length > 0) {
      this.trainingInchargeList = result;
    }
    else {
      this.trainingInchargeList = [];
    }
  }, error => {
    console.log(error);
  }, () => {
  });
}
prepareLocationDropdown(isExternal) {
  this.combinedLocation = [];
  if (isExternal) {
    // data.isExternal = true;
    this.locationType = "External";
    this.externalLocation.forEach((element, index) => {
      this.combinedLocation.push({ locationId: element.externalVenueId, locationOffice: element.externalVenueName });
    })
  } else {
    // data.isExternal = false;
    this.locationType = "Internal";
    this.locations.forEach((element, index) => {
      this.combinedLocation.push({ locationId: element.locationId, locationOffice: element.locationOffice });
    })
  }
}
prepareVenue(data) {
  if (data.isExternal) {
    this.locationwiseVenue = this.venues.filter(e => e.locationId == data.location && e.isExternal == true);
  } else {
    this.locationwiseVenue = this.venues.filter(e => e.locationId == data.location && e.isExternal == false);
  }
}
formateFromTime(hourFormat, time, editMode) {
  var colonIndex = time.indexOf(":");
  var stringBeforeCol;
  var stringAfterCol;
  var finalFromTime;
  if (colonIndex != -1) {
    stringBeforeCol = time.substring(0, colonIndex);
    stringAfterCol = (time.substring(colonIndex + 1)).substring(0, 2);
    if (hourFormat == "AM") {
      if (stringBeforeCol.length == 1) {
        stringBeforeCol = "0" + stringBeforeCol;
      }
    } else {
      if (!editMode) {
        if (stringBeforeCol != "12") {
          stringBeforeCol = Number(stringBeforeCol) + 12;
        }
        stringBeforeCol.toString();
      }
    }
  }
  finalFromTime = stringBeforeCol + ":" + stringAfterCol;
  return finalFromTime;

}
formateToTime(hourFormat, time, editMode) {
  var colonIndex = time.indexOf(":");
  var stringBeforeCol;
  var stringAfterCol;
  var finalToTime;
  if (colonIndex != -1) {
    stringBeforeCol = time.substring(0, colonIndex);
    stringAfterCol = (time.substring(colonIndex + 1)).substring(0, 2);
    if (hourFormat == "AM") {
      if (stringBeforeCol.length == 1) {
        stringBeforeCol = "0" + stringBeforeCol;
      }
    } else {
      if (!editMode) {
        if (stringBeforeCol != "12") {
          stringBeforeCol = Number(stringBeforeCol) + 12;
        }
        stringBeforeCol.toString();
      }
    }
  }
  finalToTime = stringBeforeCol + ":" + stringAfterCol;
  return finalToTime;
}
getTrainingTittleNameForEdit() {
  var trainingTittleNameObj = this.trainingTittleList.find(e => e.trainingTittleId == this.objEditSchedule.TrainingTittleId);
  if (trainingTittleNameObj != undefined) {
    this.objEditSchedule.TrainingTittle = trainingTittleNameObj.trainingTittleName;
  }
}
onChangeEditLocation() {
  this.objEditSchedule.Venue = null;
  if (this.objEditSchedule.IsExternal) {
    this.locationwiseVenue = this.venues.filter(e => e.locationId == this.objEditSchedule.Location && e.isExternal == true);
  } else {
    this.locationwiseVenue = this.venues.filter(e => e.locationId == this.objEditSchedule.Location && e.isExternal == false);
  }
  // Get location Name
  var locationNameObj = this.combinedLocation.find(e => e.locationId == this.objEditSchedule.Location);
  if (locationNameObj != undefined) {
    this.objEditSchedule.LocationName = locationNameObj.locationOffice;
    this.objEditSchedule.locationName = locationNameObj.locationOffice;
  }
  this.locationID = this.objEditSchedule.Location
  this.getAllTicByLocation(this.locationID);
}

onChangeVenueOnEdit() {
  var venueNameObj = this.locationwiseVenue.find(e => e.inductionVenueId == this.objEditSchedule.Venue && e.isExternal == this.objEditSchedule.IsExternal);
  if (venueNameObj != undefined) {
    this.objEditSchedule.VenueName = venueNameObj.inductionVenueName;
    this.objEditSchedule.inductionVenueName = venueNameObj.inductionVenueName;
  }
}

onPopupSubmit() {
  var flag = 0;
  var msg = "";

  if (this.objEditSchedule.Venue == null) {
    flag = 1;
    msg = "Please Select Venue";
  }
  else {

  }
  if (this.objEditSchedule.Location == null) {
    flag = 1;
    msg = "Please Select Location";
  }
  else {

  }
  if (this.fDateEdit.nativeElement.value != "" && this.tDateEdit.nativeElement.value != "") {
    const [feday, femonth, feyear] = this.fDateEdit.nativeElement.value.split('/');
    const fedate = new Date(feyear, femonth - 1, feday);
    const [teday, temonth, teyear] = this.tDateEdit.nativeElement.value.split('/');
    const tedate = new Date(teyear, temonth - 1, teday);
    if (tedate < fedate) {
      flag = 1;
      msg = "From Date Can't be greater than To Date";
    }
  } else {

  }
  if (this.objEditSchedule.TrainingTittleId == null || this.objEditSchedule.TrainingTittleId == undefined) {
    flag = 1;
    msg = "Please Select Training Tittle";
  }
  else {

  }
  if (flag == 0) {
    this.inductionScheduleDetailsNonEditableList.forEach(element => {
      if (element.index == this.editScheduleIndex) {
        element.trainingTittleId = this.objEditSchedule.TrainingTittleId;
        element.traingTitle = this.objEditSchedule.TrainingTittle;
        element.dateFrom = this.fDateEdit.nativeElement.value;
        element.dateTo = this.tDateEdit.nativeElement.value;
        element.timeFrom = this.objEditSchedule.FromTime;
        element.timeTo = this.objEditSchedule.ToTime;
        element.batchCandidateIds = this.objEditSchedule.BatchCandidateIds; // Added for multiple schedule
        element.detailsofSession = this.objEditSchedule.SessionDetails;
        element.trainer = this.objEditSchedule.Trainer;
        element.location = this.objEditSchedule.Location;
        element.locationName = this.objEditSchedule.locationName;
        element.inductionVenue = this.objEditSchedule.Venue;
        element.inductionVenueName = this.objEditSchedule.inductionVenueName;
        element.inductionCoOrdinator = this.objEditSchedule.Coordinator;
        element.remarks = this.objEditSchedule.Remarks;
        element.isExternal = this.objEditSchedule.IsExternal;

      }
    })
    jQuery("#editScheduleModal").modal("hide");
    this.loadDatePicker();
    this.objEditSchedule.BatchCandidateIds = [];
  } else {
    this.notificationService.showError(msg, 'Error');
  }
}

// By Sayandeep on 21-02-2023 end here

}

class EditSchedule {     // By Sayandeep on 21-02-2023
  TrainingTittleId: number;  
  TrainingTittle: string;
  FromDate: any;
  ToDate: any;
  FromTime: any;
  ToTime: any;
  BatchCandidateIds: any; 
  SessionDetails: string;
  Trainer: any;
  Mode: any;
  Location: any;
  LocationName: any;
  Venue: any;
  VenueName: any;
  Coordinator: any;
  Remarks: string;
  IsExternal: boolean;
  templateId: number; 
  locationName: string;  
  inductionVenueName: string;  
}