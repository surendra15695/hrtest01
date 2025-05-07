import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { IInductionTemplate } from 'src/app/interfaces/common/inductionassessment.interface';
import { ILocation, ISearchLocation } from 'src/app/interfaces/common/location.interface';
import { IInductionVenueWithExternal, ISearchInductionVenue } from 'src/app/interfaces/common/venue.interface';
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { ICandidateInductionSchedule, ICandidateInductionSheduleDetails, ICandidateInductionSheduleHeader, IModeOfInduction, IRoleWiseUser, ISearchModeOfInduction, ISearchRoleWiseUser, ISearchTemplate, ITemplate } from 'src/app/interfaces/prejoining/onboardingcoordinator.interface';
import { CommonService } from 'src/app/services/common/common/common.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { InductionassessmentService } from 'src/app/services/common/inductionassessment/inductionassessment.service';
import { LocationService } from 'src/app/services/common/location/location.service';
import { PositionService } from 'src/app/services/common/position/position.service';
import { VenueService } from 'src/app/services/common/venue/venue.service';
import { JoinersService } from 'src/app/services/prejoining/onboardingcoordinator/joiners.service';
import { CorporateallocationService } from 'src/app/services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { ShareddataService } from 'src/app/sharedservices/shareddata.service';
import { ReportService } from 'src/app/services/reports/report.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
declare var jQuery: any;
@Component({
  selector: 'app-scheduleinductionbatchwise',
  templateUrl: './scheduleinductionbatchwise.component.html',
  styleUrls: ['./scheduleinductionbatchwise.component.css']
})
export class ScheduleinductionbatchwiseComponent implements OnInit {
  inductionForm: FormGroup;
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  inductionType: string;
  inductionTypeId: any;
  candidateFullName: any;
  
  inductionTypeNo: any;
  inductionJoiningType: string;
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  @ViewChild('fromDateEdit', { static: false }) fDateEdit: ElementRef;
  @ViewChild('toDateEdit', { static: false }) tDateEdit: ElementRef;
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
 
  onBoardingCoordinatorList: any[] = [];
  searchRoleUser: any = {
    roleId: 0
  }
  searchTic: any = {
    locationId: 0
  }
  // 05-09-2022
  onBoardingCoordinatorListForEdit: any[] = [];
  // induction mode
  inductionModes: IModeOfInduction[] = [];
  selectedInductionMode: IModeOfInduction;
  searchInductionMode: ISearchModeOfInduction = {
    inductionModeId: null,
    isActive: true
  }
  
  venues: IInductionVenueWithExternal[] = [];
  locationwiseVenue: IInductionVenueWithExternal[] = [];
  selectedVenue: IInductionVenueWithExternal;
  searchVenue: ISearchInductionVenue = {
    InductionVenueId: null,
    isActive: null
  }
  // Template
  templates: ITemplate[] = [];
  selectedTemplate: ITemplate;
  searchTemplate: ISearchTemplate = {
    templateTypeId: 7,
    templateId: null,
    isActive: true
  }
  // Trainer

  roleWiseUser: IRoleWiseUser[] = [];
  searchRoleWiseUser: ISearchRoleWiseUser = {
    roleId: null
  }
  inductionScheduleDetailsList: any[] = [];
  inductionScheduleDetailsNonEditableList: any[] = [];
  inductionTemplateId: number;
  from: string;

  trainerRoleid = 0;
  trainerTypename = "";
  candidateInductionScheduleId: any;
  mode: string;
  inductionSchedule: ICandidateInductionSchedule;
  //inductionSchedule:any[]=[];

  inductionScheduleHeader: ICandidateInductionSheduleHeader;
  inductionScheduleDetails: ICandidateInductionSheduleDetails;

  searchInductionSchedule = {
    candidateInductionScheduleId: null,
  }
  searchInductionTemplateOnChange = {
    inductionTemplateId: null,
    isActive: null,
    isBatch: null
  }
  // inductionTemplateDetails: IInductionTemplate[] = [];  // before external location map
  inductionTemplateDetails: any[] = [];                    // after external location map
  parentActiveTab: string;
  childActiveTab: string;
  disabledField: boolean;
  // R F A T
  locationID: number;
  coordinatorID: number;
  locationName: string = "";
  coordinatorName: string = "";
  inductionVenueName: string = "";
  trainerName: string = "";
  objEditSchedule: EditSchedule;
  editScheduleIndex: any;
  trainingInchargeList: any[] = [];
  fromTimeHour: string;
  toTimeHour: string;

  // Induction Template

  searchInductionTemplate = {
    inductionTemplateId: null,
    isActive: true,
    isBatch: null
  }
  inductionTemplateList: IInductionTemplate[] = [];
  locationReadonly: boolean;
  coordinatorReadonly: boolean;

  // Need to hide start
  UserType: string;
  // Need to hide end
  externalLocation: any[] = [];
  combinedLocation: any[] = [];
  locationType: string = "Internal";
  searchExternalVenue = {
    ExternalVenueId: 0,
    IsActive: null,
  }
  isSelectFromTemplate: boolean = false;
  locationwiseVenueForEdit: any[] = [];

  // Added by Anif on 25-11-2022
  searchTrainingTittle = {
    TrainingTittleId: 0,
    IsActive: true,
  }
  inductionScheduleDetailsNonEditableListforshow:any[]=[];
  trainingTittleList: any[] = [];
  batchWiseCandidateList: any[] = [];    // Added for multiple schedule from here
  candidatePreviewList: any[] = [];
  isForBatch: boolean = false;
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
    private titleService: Title, public activatedRoute: ActivatedRoute,
    private positionService: PositionService,
    private reportService: ReportService,
    private joinersservice: JoinersService,
    private venueService: VenueService,
    private inductionassessmentService: InductionassessmentService,
    private excelService: ExcelService
  ) {
    this.SpinnerService.show();
    this.objEditSchedule = new EditSchedule();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.parentActiveTab = this.persistance.get("parentActiveTab");
    this.childActiveTab = this.persistance.get("childActiveTab");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.inductionType = params['InductionType'];
      this.inductionTypeId = params['IndictionTypeId'];
      this.inductionTypeNo = params['IndictionTypeNo'];

     // this.inductionTypeId = params['IndictionTypeId'];
      this.candidateFullName = params['candidateFullName'];
      this.inductionJoiningType = params['InductionJoiningType'];
      this.from = params['From'];
      this.candidateInductionScheduleId = params['CandidateInductionScheduleId'];
      this.mode = params['Mode'];
      // Need to hide
      this.UserType = params['UserType'];
      if (this.mode == "View") {
        this.disabledFormField();
      }
      if (this.inductionType == 'Candidate') {
        this.trainerRoleid = 48;
        this.trainerTypename = "Person To Meet";
        this.getInductionTemplate("C");
        this.isForBatch = false;
      }
      else {
        this.trainerRoleid = 47;
        this.trainerTypename = "Trainer";
        this.getInductionTemplate("B");
        this.getBatchwiseCandidate();         // Added for multiple schedule 
        this.isForBatch = true;
      }
    });
    this.createIndcutionForm();
    this.updateFormValue();
    this.getAllDropdowndata();
    //alert(this.candidateInductionScheduleId);
    if (this.candidateInductionScheduleId != null) {
      this.getAllScheduleDetails();
    }
  }

  ngOnInit() {
    this.loadDatePicker();
    this.loadTimePicker1();
    this.loadTimePicker2();
    this.loadTimePicker3();
    this.loadSelectPicker();  // Added for multiple schedule 
    // this.loadDateTimePicker(); 

  }
  loadDatePicker() {
    // var today = new Date();

    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      minDate: new Date().setDate(new Date().getDate()),
      todayHighlight: true
    }).on("change", function (e) {
     // console.log("hmm", e.target.value)
      //this.tDateEdit.nativeElement.value="";
      jQuery(".datepickerto").parent(".input-group").datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        startDate: e.target.value,
        //todayHighlight: e.target.value
      })
    })

    jQuery(".datepickerform").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      minDate: new Date().setDate(new Date().getDate()),
      todayHighlight: true
    }).on("change", function (e) {
      //this.tDateEdit.nativeElement.value="";
      jQuery(".datepickertoedit").parent(".input-group").datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        startDate: e.target.value,
        //todayHighlight: e.target.value
      })
    })
  }
  loadTimePicker1() {
    // jQuery('#timepicker1').timepicker({
    //   minuteStep: 5,
    //   defaultTime: 'current'
    // });
    jQuery('.timepik').datetimepicker(
      {
        format: 'hh:mm'
      }
    );
  }
  loadTimePicker2() {
    // jQuery('#timepicker2').timepicker({
    //   minuteStep: 5,
    //   defaultTime: 'current'
    // });
    jQuery('.timepik').datetimepicker(
      {
        format: 'hh:mm'
      }
    );
  }
  loadTimePicker3() {
    setTimeout(() => {
      jQuery('.timepik3').datetimepicker(
        {
          format: 'hh:mm'
        }
      );
    }, 1000)
  }
  loadDateTimePicker() {
    setTimeout(() => {
      jQuery('.dateTimepik').datetimepicker(
        {
          format: 'DD-MM-YYYY hh:mm A'
        }
      );
      jQuery('.timepik').datetimepicker(
        {
          format: 'hh:mm'
        }
      );
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
  createIndcutionForm() {
    this.inductionForm = this.fb.group({
      candidateInductionScheduleId: [0],
      joinigType: [''],
      templateId: null,
      templateDetails: [''],
      batchId: null,
      candidateId: null,
      createdBy: this.loginUserId,
      onBordingCoordinatorId: null,
      locationId: null,
      inductionTypeNo: [''],
      fromDate: [''],
      toDate: [''],
      verticalId: [0],


    });
  }

  updateFormValue() {
    if (this.inductionType == "Candidate") {
      this.inductionForm.patchValue({
        candidateId: this.inductionTypeId,
        inductionTypeNo: this.inductionTypeNo,
        joinigType: this.inductionJoiningType

      })
    } else {
      this.inductionForm.patchValue({
       // batchId: this.inductionTypeId,
        batchId: this.inductionTypeId,
        inductionTypeNo: this.inductionTypeNo,
        joinigType: this.inductionJoiningType
      })
    }
  }
  disabledFormField() {
    this.disabledField = true;
  }
  getInductionTemplate(type: string) {  
    this.inductionTemplateList = [];
    this.SpinnerService.show();
    this.inductionassessmentService.getAllInductionTemplate(this.searchInductionTemplate).subscribe((result) => {
      if (result) {
        this.inductionTemplateList = result;
        if (type == "C") {
          this.inductionTemplateList = this.inductionTemplateList.filter(e => e.isBatch == false);
        } else {
          if (this.from == "Corporate") {
            this.inductionTemplateList = result.filter(e => e.isBatch == true && e.verticalId == 1);
          }
          else if (this.from == "Plant") {
            this.inductionTemplateList = result.filter(e => e.isBatch == true && e.verticalId == 2);
          }
          else if (this.from == "Sales & Marketing") {
            this.inductionTemplateList = result.filter(e => e.isBatch == true && e.verticalId == 3);
          }
        }
        this.SpinnerService.hide();
      }
      else {
        this.inductionTemplateList = [];
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
  getBatchwiseCandidate() {
    this.batchWiseCandidateList = [];
    this.SpinnerService.show();
    let searchObj = {
      BatchId: Number(this.inductionTypeId)
    }
    this.inductionassessmentService.getAllBatchWiseCandidate(searchObj).subscribe((result) => {
      if (result) {
        this.batchWiseCandidateList = result;
        //ADDED by sayandeep on 16-08-2023 for sorting the array alphabatically with candidate names
        this.batchWiseCandidateList.sort((a, b) => {
          const nameA = a.fullName.toLowerCase();
          const nameB = b.fullName.toLowerCase();
          return nameA.localeCompare(nameB);
        });
        // console.log("Batchwise candidate list", this.batchWiseCandidateList);
        this.SpinnerService.hide();
      }
      else {
        this.batchWiseCandidateList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }
  getAllDropdowndata() {
    this.getAllTemplate();
    this.getAllVerticals();
    this.getAllOnboardingCoordinator();
    this.getInductionMode();
    this.getVenue();
    this.getAllRoleWiseUser();
    this.getExternalLocation();
    this.getAllTrainingTittle();  // Added By anif on 25-11-2022

  }
  // Added By Anif for training tittle master creation on 25-11-2022
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
        //  console.log("Rolewise User", this.roleWiseUser);
        // this.locations.splice(0, 0, {
        //   locationId: 0,
        //   verticalId: 0,
        //   locationNo: "All",
        //   locationCode: "",
        //   locationOffice: "",
        //   isActive: true,
        //   createdBy: 0
        // })
      }
      else {
        this.roleWiseUser = [];
        // this.locations.splice(0, 0, {
        //   locationId: 0,
        //   verticalId: 0,
        //   locationNo: "All",
        //   locationCode: "",
        //   locationOffice: "",
        //   isActive: true,
        //   createdBy: 0
        // })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  getAllTemplate() {
    this.templates = [];
    //this.searchTrainer.verticalId = this.selectedVerticalId;
    this.joinersservice.getAllTemplate(this.searchTemplate).subscribe((result) => {
      if (result) {
        this.templates = result;
        this.templates.splice(0, 0, {
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
        this.templates = [];
        this.templates.splice(0, 0, {
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
    // For test adding some static value
    // this.templates.push({ templateId: "1", templateName: "Welcome" }, { templateId: "2", templateName: "Offer" })
  }
  //verticals
  getAllVerticals() {
    // this.verticals = [];
    // var splitvertical = this.verticalIds.split(",");
    // var allvertical = "";
    // //console.log("SSplit verticals", splitvertical);

    // for (var i = 0; i < splitvertical.length; i++) {
    //   if (splitvertical[i] != "0") {
    //     if (splitvertical[i] == "1") {
    //       this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    //     }
    //     else if (splitvertical[i] == "2") {
    //       this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    //     }
    //     else if (splitvertical[i] == "3") {
    //       this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    //     }

    //     if (allvertical == "") {
    //       allvertical = splitvertical[i];
    //     }
    //     else {
    //       allvertical = allvertical + "," + splitvertical[i];
    //     }
    //   }

    // }
    // // console.log("Verticalids", this.verticals);

    // if (this.from.toUpperCase() == "PLANT") {
    //   // this.selectedPendingVertical = this.verticals[1];
    //   this.selectedPendingVertical = this.verticals.find(e => e.verticalId == 2);
    // }
    // else if (this.from.toUpperCase() == "CORPORATE") {
    //   // this.selectedPendingVertical = this.verticals[0];
    //   this.selectedPendingVertical = this.verticals.find(e => e.verticalId == 1);
    // }
    // else {
    //   // this.selectedPendingVertical = this.verticals[2];
    //   this.selectedPendingVertical = this.verticals.length != 0 ? this.verticals.find(e => e.verticalId == 3) : this.selectedPendingVertical;
    // }
    // // console.log("Selected vertical", this.selectedPendingVertical);
    // //this.selectedPendingVertical = this.verticals[0];
    // this.defaultverticalId = this.selectedPendingVertical.verticalId;
    // this.selectedVerticalId = this.defaultverticalId;
    // this.getAllLocation();
    this.verticals = [];
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    //this.selectedVertical = this.verticals.filter(x => x.verticalId == 0)[0];

  }


  



  getExternalLocation() {
    this.SpinnerService.show();
    this.venueService.getAllExternalInductionVenue(this.searchExternalVenue).subscribe((response: any) => {
      if (response) {
        this.externalLocation = response;
      }
      else {
        this.externalLocation = [];
      }
    }, error => {
      this.SpinnerService.hide();
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    })
  }

  //locations
  getAllLocation() {
    this.locations = [];
    //this.searchLocation.verticalId = this.selectedVerticalId;
    this.locationService.getAllLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        this.locations = result;
        this.combinedLocation = [];
        this.locations.forEach((element, index) => {
          this.combinedLocation.push({ locationId: element.locationId, locationOffice: element.locationOffice });
        })
        // this.locations.splice(0, 0, {
        //   locationId: 0,
        //   verticalId: 0,
        //   locationNo: "All",
        //   locationCode: "",
        //   locationOffice: "",
        //   isActive: true,
        //   createdBy: 0
        // })
      }
      else {
        this.locations = [];
        // this.locations.splice(0, 0, {
        //   locationId: 0,
        //   verticalId: 0,
        //   locationNo: "All",
        //   locationCode: "",
        //   locationOffice: "",
        //   isActive: true,
        //   createdBy: 0
        // })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }


  getAllOnboardingCoordinator() {
    this.onBoardingCoordinatorList = [];
    if (this.from.toUpperCase() == "PLANT") {
      this.searchRoleUser.roleId = 31
    }
    else if (this.from.toUpperCase() == "CORPORATE") {
      this.searchRoleUser.roleId = 31
    }
    else {
      this.searchRoleUser.roleId = 31
    }

    //this.candidateService.getAllOnboardingManager(this.searchOnboardingManager).subscribe((result) => {
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

  getInductionMode() {
    this.inductionModes = [];
    //this.searchTrainer.verticalId = this.selectedVerticalId;
    this.joinersservice.getAllInductionMode(this.searchInductionMode).subscribe((result) => {
      if (result) {
        this.inductionModes = result;
        // this.inductionModes.splice(0, 0, {
        //   inductionModeId: 0,
        //   inductionModeName: "All",
        //   isActive: true,
        // })
      }
      else {
        this.inductionModes = [];
        // this.inductionModes.splice(0, 0, {
        //   inductionModeId: 0,
        //   inductionModeName: "All",
        //   isActive: true,
        // })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  onChangeLocation(data: any) {
    // this.locationwiseVenue = this.venues.filter(e => e.locationId == this.locationID);
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
    this.getAllTicByLocation(this.locationType);
  }
  getAllTicByLocation(locationType) {
    this.trainingInchargeList = [];
    this.searchTic.locationId = Number(this.locationID);
    this.commonService.getAllTicByLocation(this.searchTic).subscribe((result: any[]) => {
      // debugger
      if (result.length > 0) {
        // this.trainingInchargeList = result;
        if (locationType == "External") {
          this.trainingInchargeList = result.filter(e => e.isExternal == 1);
          //console.log("external TIC List", this.trainingInchargeList);
        } else {
          this.trainingInchargeList = result.filter(e => e.isExternal == 0);
          //console.log("Internal TIC List", this.trainingInchargeList);
        }
      }
      else {
        this.trainingInchargeList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  onChangeCoordinator() {
    if (this.coordinatorID != undefined) {
      // var locationName = this.locations.find(e => e.locationId == locationid).locationNo;
      var coordinatorNameObj = this.onBoardingCoordinatorList.find(e => e.autoUserId == this.coordinatorID);
      if (coordinatorNameObj != undefined) {
        this.coordinatorName = coordinatorNameObj.employeeName;
      }
    }
  }
  onChangeVenue(data) {
    if (data.inductionVenue != undefined) {
      var venueName = this.locationwiseVenue.find(e => e.inductionVenueId == data.inductionVenue).inductionVenueName;
      this.inductionVenueName = venueName;
    }

  }
  onChangePersonTomeet(data) {
    if (data.trainer != undefined) {
      var trainername = this.roleWiseUser.find(e => e.autoUserId == data.trainer).employeeName;
      this.trainerName = trainername;
    }
  }
  getVenue() {
    this.venues = [];
    //this.searchTrainer.verticalId = this.selectedVerticalId;
    this.searchVenue.isActive = true;
    // this.venueService.getAllInductionVenue(this.searchVenue).subscribe((result) => {
    this.venueService.getAllInductionVenueWithExternal(this.searchVenue).subscribe((result) => {
      if (result) {
        this.venues = result;
      }
      else {
        this.venues = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllScheduleDetails() {
    this.searchInductionSchedule.candidateInductionScheduleId = Number(this.candidateInductionScheduleId);
    this.reportService.getScheduleInductionDetails(this.searchInductionSchedule).subscribe((result) => {
      if (result) {
        this.inductionSchedule = result;
         //console.log("Schedule Details", result)
        if (this.inductionSchedule.candidateInductionSheduleDetails.length > 0) {
          this.inductionSchedule.candidateInductionSheduleDetails.forEach((element, index) => {
            var batchCandidateIdArray = [];
            if (this.isForBatch) {
              var batchCandidate = element.batchCandidateIds.split(",");
              if (batchCandidate.length > 0) {
                batchCandidate.forEach(element => {
                  batchCandidateIdArray.push(Number(element));
                })
              }
            }
//console.log(this.inductionSchedule.candidateInductionSheduleDetails)
            let obj = {
              candidateInductionScheduleDetailsId: element.candidateInductionScheduleDetailsId,
              candidateInductionScheduleId: element.candidateInductionScheduleId,
              trainingTittleId: element.trainingTittleId,
              traingTitle: element.traingTitle,
              candidateName: element.candidateName,
              dateFrom: element.dateFrom,
              dateTo: element.dateTo,
              timeFrom: element.timeFrom,
              timeTo: element.timeTo,
              batchCandidateIds: batchCandidateIdArray,
              detailsofSession: element.detailsofSession,
              trainer: element.trainer,
              inductionMode: element.inductionMode,
              location: element.location,
              inductioneName: element.inductioneName,
              //location: element.locationName,
              inductionVenue: element.inductionVenue,
              //inductionVenue: element.inductionVenueName,
              inductionCoOrdinator: element.inductionCoOrdinator,
              remarks: element.remarks,
              readOnly: true,
              index: index + 1,
              trainerName: element.trainerName,
              locationName: element.locationName,
              inductionVenueName: element.inductionVenueName,
              inductionCoOrdinatorName: element.trainingCoOrdinatorName,
              isExternal: element.isExternal,
              verticalId: element.verticalId
            }
            this.inductionScheduleDetailsNonEditableList.push(obj);
          })
        }
        this.inductionScheduleDetailsNonEditableListforshow=[];
        this.inductionScheduleDetailsNonEditableListforshow=this.inductionScheduleDetailsNonEditableList;
        this.inductionScheduleDetailsNonEditableListforshow.sort((a,b)=>{
          const datePartsA = a.dateFrom .split('/').map(part => parseInt(part, 10));
          const dateA = new Date(datePartsA[2], datePartsA[1] - 1, datePartsA[0]);

          const datePartsB = b.dateFrom.split('/').map(part => parseInt(part, 10));
          const dateB = new Date(datePartsB[2], datePartsB[1] - 1, datePartsB[0]);
          if(a.dateFrom == b.dateFrom){
            const timeA = new Date();
          timeA.setHours(Number(a.timeFrom.split(':')[0]) % 12 + (a.timeFrom.endsWith('PM') ? 12 : 0));
          timeA.setMinutes(Number(a.timeFrom.split(':')[1].slice(0, 2)));

          const timeB = new Date();
          timeB.setHours(Number(b.timeFrom.split(':')[0]) % 12 + (b.timeFrom.endsWith('PM') ? 12 : 0));
          timeB.setMinutes(Number(b.timeFrom.split(':')[1].slice(0, 2)));  
          if (timeA < timeB) {
            return -1;
          }
          else if (timeA > timeB) {
            return 1;
          } 
          else {
            return 0;
          }
          }
          if (dateA < dateB) {
            return -1;
          }
          else if (dateA > dateB) {
            return 1;
          } 
          else {
            return 0;
          }
        })
        // console.log("test1",this.inductionScheduleDetailsNonEditableListforshow)
        // console.log("test2",this.inductionScheduleDetailsNonEditableList)
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
  onChangeTemplate() {
    this.searchInductionTemplateOnChange.inductionTemplateId = this.inductionTemplateId;
    if (this.inductionTemplateId != undefined || this.inductionTemplateId != null) {
      this.locationReadonly = true;
      this.coordinatorReadonly = true;
      this.isSelectFromTemplate = true;
    }
    this.getTemplateDetails();
  }
  getTemplateDetails() {
    this.inductionTemplateDetails = [];
    this.SpinnerService.show();
    // this.inductionassessmentService.getAllInductionTemplate(this.searchInductionTemplateOnChange).subscribe((result) => { // before external location map
    this.inductionassessmentService.getAllInductionTemplateDetails(this.searchInductionTemplateOnChange).subscribe((result) => { // after external location map
      if (result) {
        this.inductionTemplateDetails = result;
        // console.log("Template Details", this.inductionTemplateDetails);

        // this.locationID = this.inductionTemplateDetails[0].location;
        // this.coordinatorID = this.inductionTemplateDetails[0].inductionCoOrdinator;
        this.SpinnerService.hide();
      }
      else {
        this.inductionTemplateDetails = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }

  getTrainingTittleName(data: any) {  // Added by anif on 25-11-2022
    // if (this.inductionScheduleDetailsNonEditableList.length > 0) {
    //   var checkExisted = this.inductionScheduleDetailsNonEditableList.find(e => e.trainingTittleId == data.trainingTittleId);
    //   if (checkExisted == undefined) {
    var trainingTittleNameObj = this.trainingTittleList.find(e => e.trainingTittleId == data.trainingTittleId);
    if (trainingTittleNameObj != undefined) {
      data.traingTitle = trainingTittleNameObj.trainingTittleName;
    }
    //   } else {
    //     this.notificationService.showError("Training Tittle Already Added , Select another", "Error");
    //     data.trainingTittleId = null;
    //   }
    // } else {
    //   var trainingTittleNameObj = this.trainingTittleList.find(e => e.trainingTittleId == data.trainingTittleId);
    //   if (trainingTittleNameObj != undefined) {
    //     data.traingTitle = trainingTittleNameObj.trainingTittleName;
    //   }
    // }

  }
  btnAddInductionDetails() {
    if (this.inductionTemplateId == undefined || this.inductionTemplateId == null) {
      this.addInductionDetailsWithoutTemplate();
    } else {
      this.addInductionDetailsWithTemplate();
    }
  }
  addInductionDetailsWithTemplate() {
    var flag = 0;
    var msg = "";
    if (this.tDate.nativeElement.value == "") {
      flag = 1;
      msg = "Please select To Date";
    }
    else {

    }
    if (this.fDate.nativeElement.value == "") {
      flag = 1;
      msg = "Please select From Date";
    }
    else {

    }
    if (this.tDate.nativeElement.value != "" && this.fDate.nativeElement.value != "") {
      const [fday, fmonth, fyear] = this.fDate.nativeElement.value.split('/');
      const fdate = new Date(fyear, fmonth - 1, fday);
      const [tday, tmonth, tyear] = this.tDate.nativeElement.value.split('/');
      const tdate = new Date(tyear, tmonth - 1, tday);
      if (tdate < fdate) {
        flag = 1;
        msg = "From Date can't be greater than To Date";
      }
    }
    if (flag == 0) {

      var inductionObj = this.inductionScheduleDetailsNonEditableList.find(e => e.templateId == this.inductionTemplateId);
      if (inductionObj == null) {
        this.inductionScheduleDetailsList = [];
        this.inductionScheduleDetailsNonEditableList = []; // for replace old template with new  added by anif on 25-11-2022
        this.inductionTemplateDetails.forEach(element => {
          let arrayIndex = this.inductionScheduleDetailsNonEditableList.length == 0 ? 1 : (this.inductionScheduleDetailsNonEditableList[this.inductionScheduleDetailsNonEditableList.length - 1].index) + 1;
          let obj = {
            candidateInductionScheduleDetailsId: 0,
            candidateInductionScheduleId: this.mode == "Edit" ? this.inductionSchedule.candidateInductionShedules.candidateInductionScheduleId : 0,
            trainingTittleId: element.traingTitleId,  // Added by anif on 25-11-2022
            traingTitle: element.traingTitle,
            dateFrom: this.fDate.nativeElement.value,
            dateTo: this.tDate.nativeElement.value,
            timeFrom: element.timeFrom,
            timeTo: element.timeTo,
            batchCandidateIds: [],    // Added for multiple schedule
            detailsofSession: element.detailsofSession,
            trainer: element.trainer,
            trainerName: element.trainerName,
            inductionMode: element.inductionMode,
            // location: this.inductionForm.value.locationId,
            isExternal: element.isExternal,
            location: element.location,
            locationName: element.locationName,
            inductionVenue: element.inductionVenue,
            inductionVenueName: element.inductionVenueName,
            // inductionCoOrdinator: this.inductionForm.value.onBordingCoordinatorId,
            inductionCoOrdinator: element.inductionCoOrdinator,
            inductionCoOrdinatorName: element.inductionCoOrdinatorName,
            remarks: element.remarks,
            readOnly: true,
            index: arrayIndex,
            templateId: this.inductionTemplateId,
            verticalId: element.verticalId
          }

          if (this.isForBatch) {  // Added for multiple schedule
            this.batchWiseCandidateList.forEach(can_id => {
              obj.batchCandidateIds.push(can_id.candidateId);
            })
          }

          this.inductionScheduleDetailsNonEditableList.push(obj);
        })
        //added by Sayandeep for sorting 
        this.inductionScheduleDetailsNonEditableListforshow=this.inductionScheduleDetailsNonEditableList;
        this.inductionScheduleDetailsNonEditableListforshow.sort((a,b)=>{
          
          const timeA = new Date();
          timeA.setHours(Number(a.timeFrom.split(':')[0]) % 12 + (a.timeFrom.endsWith('PM') ? 12 : 0));
          timeA.setMinutes(Number(a.timeFrom.split(':')[1].slice(0, 2)));

          const timeB = new Date();
          timeB.setHours(Number(b.timeFrom.split(':')[0]) % 12 + (b.timeFrom.endsWith('PM') ? 12 : 0));
          timeB.setMinutes(Number(b.timeFrom.split(':')[1].slice(0, 2)));  
          if (timeA < timeB) {
            return -1;
          }
          else if (timeA > timeB) {
            return 1;
          } 
          else {
            return 0;
          }
        })
        this.inductionTemplateId = null;
        this.locationID = null;
        this.coordinatorID = null;
        this.locationReadonly = false;
        this.coordinatorReadonly = false;
      } else {
        var errMsg = "This template already added";
        this.notificationService.showError(errMsg, "Error");
      }

    } else {
      this.notificationService.showError(msg, "Error");
    }
  }
  addInductionDetailsWithoutTemplate() {
    var flag = 0;
    var msg = "";

    // if (this.coordinatorID == null) {
    //   flag = 1;
    //   msg = "Please select coordinator";
    // }
    // else {

    // }

    // if (this.locationID == null) {
    //   flag = 1;
    //   msg = "Please select location";
    // }
    // else {

    // }
    if (this.tDate.nativeElement.value == "") {
      flag = 1;
      msg = "Please select To Date";
    }
    else {

    }
    if (this.fDate.nativeElement.value == "") {
      flag = 1;
      msg = "Please select From Date";
    }
    else {

    }
    if (this.tDate.nativeElement.value != "" && this.fDate.nativeElement.value != "") {
      const [fday, fmonth, fyear] = this.fDate.nativeElement.value.split('/');
      const fdate = new Date(fyear, fmonth - 1, fday);
      const [tday, tmonth, tyear] = this.tDate.nativeElement.value.split('/');
      const tdate = new Date(tyear, tmonth - 1, tday);
      if (tdate < fdate) {
        flag = 1;
        msg = "From Date can't be greater than To Date";
      }

    }
    if (flag == 0) {
      this.inductionScheduleDetailsList = [];
      let arrayIndex = this.inductionScheduleDetailsList.length == 0 ? 1 : (this.inductionScheduleDetailsList[this.inductionScheduleDetailsList.length - 1].index) + 1
      let obj = {
        candidateInductionScheduleDetailsId: 0,
        candidateInductionScheduleId: this.mode == "Edit" ? this.inductionSchedule.candidateInductionShedules.candidateInductionScheduleId : 0,
        trainingTittleId: null, // Adde by anif on 25-11-2022
        traingTitle: "",
        dateFrom: this.fDate.nativeElement.value,
        dateTo: this.tDate.nativeElement.value,
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
      if (this.isForBatch) {  // Added for multiple schedule
        this.batchWiseCandidateList.forEach(can_id => {
          obj.batchCandidateIds.push(can_id.candidateId);
        })
      }
      this.inductionScheduleDetailsList.push(obj);
      // this.inductionScheduleDetailsList.sort(function(a,b){
      //   // Turn your strings into dates, and then subtract them
      //   // to get a value that is either negative, positive, or zero.
      //   return b.timeFrom - a.timeFrom
      // });
      // this.inductionForm.reset();
      this.locationID = null;
      this.coordinatorID = null;
      this.updateFormValue();
      this.loadSelectPicker();
    } else {
      this.notificationService.showError(msg, "Error");
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

  onChangePopupCheckbox(eve) {
    this.combinedLocation = [];
    // this.locationID = null;
    this.objEditSchedule.Location = null;
    this.objEditSchedule.Venue = null;
    if (eve.target.checked) {
      // data.isExternal = true;
      this.objEditSchedule.IsExternal = true;
      this.locationType = "External";
      this.externalLocation.forEach((element, index) => {
        this.combinedLocation.push({ locationId: element.externalVenueId, locationOffice: element.externalVenueName });
      })
    } else {
      //  data.isExternal = false;
      this.objEditSchedule.IsExternal = false;
      this.locationType = "Internal";
      this.locations.forEach((element, index) => {
        this.combinedLocation.push({ locationId: element.locationId, locationOffice: element.locationOffice });
      })
    }
  }
  getLocationName(locationid) {
    if (locationid != undefined) {
      // var locationName = this.locations.find(e => e.locationId == locationid).locationNo;
      var locationName = this.locations.find(e => e.locationId == locationid);
      if (locationName != undefined) {
        return locationName.locationOffice;
      }
    }
  }
  getCoordinatorName(coordinatorId) {
    if (coordinatorId != undefined) {
      var name = this.onBoardingCoordinatorList.find(e => e.autoUserId == coordinatorId);
      if (name != undefined) {
        return name.employeeName;
      }

    }

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
  getTrainerName(trainerId) {
    if (trainerId != undefined) {
      var trainerName = this.roleWiseUser.find(e => e.autoUserId == trainerId).employeeName;
      return trainerName;
    }

  }
  getInductionModeName(modeId) {
    if (modeId != undefined) {
      var inductionmodeNameObj = this.inductionModes.find(e => e.inductionModeId == modeId);
      if (inductionmodeNameObj != undefined) {
        return inductionmodeNameObj.inductionModeName;
      }
    }

  }
  getVenueName(venueId) {
    if (venueId != undefined) {
      var venueName = this.venues.find(e => e.inductionVenueId == venueId).inductionVenueName;
      return venueName;
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
    if (data.batchCandidateIds.length == 0 && this.isForBatch == true) {
      flag = 1;
      msg = "Please select atleast one candidate";
    }
    else {

    }
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
    // if (data.traingTitle == "") {
    if (data.trainingTittleId == null || data.trainingTittleId == undefined) {
      flag = 1;
      msg = "Please Select Training Tittle";
    }
    else {

    }
    if (flag == 0) {
      var selectedObj = this.inductionScheduleDetailsList.find(e => e.index == data.index);
      selectedObj.locationName = this.locationName;
      selectedObj.inductionCoOrdinatorName = this.coordinatorName;
      selectedObj.inductionVenueName = this.inductionVenueName;
      selectedObj.trainerName = this.trainerName;
      selectedObj.location = this.locationID;
      selectedObj.inductionCoOrdinator = this.coordinatorID;
      // selectedObj.index = this.inductionScheduleDetailsNonEditableList.length == 0 ? 1 : (this.inductionScheduleDetailsNonEditableList[this.inductionScheduleDetailsNonEditableList.length - 1].index) + 1;
      selectedObj.index = this.inductionScheduleDetailsNonEditableList.length == 0 ? 1 : ((this.inductionScheduleDetailsNonEditableList.length)+1); //by sayandeep for editing 
      this.inductionScheduleDetailsNonEditableList.push(JSON.parse(JSON.stringify(selectedObj)));
      this.inductionScheduleDetailsList.forEach((element, index) => {
        if (element.index == data.index) {
          element.trainingTittleId = null,   // Added by anif on 25-11-2022
            element.traingTitle = "",
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

          if (this.isForBatch) {  // Added for multiple schedule
            this.batchWiseCandidateList.forEach(can_id => {
              element.batchCandidateIds.push(can_id.candidateId);
            })
          }

        }
      })

      this.locationID = null;
      this.coordinatorID = null;
      this.combinedLocation = [];
      this.locations.forEach((element, index) => {
        this.combinedLocation.push({ locationId: element.locationId, locationOffice: element.locationOffice });
      })
      //console.log("newlist",this.inductionScheduleDetailsNonEditableList)
      //added by Sayandeep for sorting 
      this.inductionScheduleDetailsNonEditableListforshow=this.inductionScheduleDetailsNonEditableList;
      this.inductionScheduleDetailsNonEditableListforshow.sort((a,b)=>{
        const datePartsA = a.dateFrom .split('/').map(part => parseInt(part, 10));
        const dateA = new Date(datePartsA[2], datePartsA[1] - 1, datePartsA[0]);

        const datePartsB = b.dateFrom.split('/').map(part => parseInt(part, 10));
        const dateB = new Date(datePartsB[2], datePartsB[1] - 1, datePartsB[0]);
        if(a.dateFrom == b.dateFrom){
        const timeA = new Date();
        if(a.timeFrom.endsWith('PM'))
        {
          timeA.setHours(Number(a.timeFrom.split(':')[0]) % 12 + (a.timeFrom.endsWith('PM') ? 12 : 0));
          timeA.setMinutes(Number(a.timeFrom.split(':')[1].slice(0, 2)));
        }
        else{
          timeA.setHours(Number(a.timeFrom.split(':')[0]) );
          timeA.setMinutes(Number(a.timeFrom.split(':')[1].slice(0, 2)));
        }

        const timeB = new Date();
        if(b.timeFrom.endsWith('PM'))
        {
          timeB.setHours(Number(b.timeFrom.split(':')[0]) % 12 + (b.timeFrom.endsWith('PM') ? 12 : 0));
          timeB.setMinutes(Number(b.timeFrom.split(':')[1].slice(0, 2)));  
        }
        else{
          timeB.setHours(Number(b.timeFrom.split(':')[0]) );
          timeB.setMinutes(Number(b.timeFrom.split(':')[1].slice(0, 2)));
        }
        if (timeA < timeB) {
          return -1;
        }
        else if (timeA > timeB) {
          return 1;
        } 
        else {
          return 0;
        }
      }
      if (dateA < dateB) {
        return -1;
      }
      else if (dateA > dateB) {
        return 1;
      } 
      else {
        return 0;
      }
      })
      this.loadSelectPicker();
    }
    else {
      this.notificationService.showError(msg, "Error");
    }

  }
  onClickCandidateList(candidateIds: any) {      // Added for multiple schedule
    this.candidatePreviewList = [];
    candidateIds.forEach(element => 
      {
      var candidateObj = this.batchWiseCandidateList.find(e => e.candidateId == element);
      if (candidateObj != undefined) {
        let candidateDetailsObj = {
          candidateNo: candidateObj.candidateNo,
          candidateName: candidateObj.fullName,
          departmentName: candidateObj.departmentName
        }
        this.candidatePreviewList.push(candidateDetailsObj);
      }
    })
  }
  onClickDelete(data) {
    this.inductionScheduleDetailsNonEditableList.forEach((element, index) => {
      if (element.index == data.index) {
        this.inductionScheduleDetailsNonEditableList.splice(index, 1)
      }
    })
  }
  //   convertToLocalDate(responseDate: any) {
  //     try {
  //         if (responseDate != null) {
  //             if (typeof (responseDate) === 'string') {
  //                 if (String(responseDate.indexOf('T') >= 0)) {
  //                     responseDate = responseDate.split('T')[0];
  //                 }
  //                 if (String(responseDate.indexOf('+') >= 0)) {
  //                     responseDate = responseDate.split('+')[0];
  //                 }
  //             }

  //             responseDate = new Date(responseDate);
  //             const newDate = new Date(responseDate.getFullYear(), responseDate.getMonth(), responseDate.getDate(), 0, 0, 0);
  //             const userTimezoneOffset = newDate.getTimezoneOffset() * 60000;

  //             const finalDate: Date = new Date(newDate.getTime() - userTimezoneOffset);
  //             // return finalDate > Util.minDateValue ? finalDate : null;
  //             return finalDate
  //         } else {
  //             return null;
  //         }
  //     } catch (error) {
  //         return responseDate;
  //     }
  // }
  onFinalSubmit() {
    if (this.inductionScheduleDetailsNonEditableList.length > 0) {
      let finalSubmitObj = {
        Password: "welcome@1234",
        candidateInductionScheduleId: this.inductionSchedule == undefined ? 0 : this.inductionSchedule.candidateInductionShedules.candidateInductionScheduleId,
        joinigType: this.inductionJoiningType,
        templateId: Number(this.inductionTemplateId),
        templateDetails: this.inductionSchedule == undefined ? "" : this.inductionSchedule.candidateInductionShedules.templateDetails,
        batchId: this.inductionType == "Candidate" ? null : Number(this.inductionTypeId),
        candidateId: this.inductionType == "Candidate" ? Number(this.inductionTypeId) : null,
        createdBy: this.loginUserId,
        candidateInductionScheduleDetails: [],
        candidateInductionScheduleDetails1: []

      }
      this.inductionScheduleDetailsNonEditableList.forEach(element => {
        if (this.isForBatch) {
          var candidateids = "";
          if (element.batchCandidateIds.length > 0) {
            element.batchCandidateIds.forEach(candidate_id => {
              candidateids += (candidateids == "" ? candidate_id.toString() : ("," + candidate_id.toString()));
            })
          }
        }

        let obj = {
          candidateInductionScheduleDetailsId: element.candidateInductionScheduleDetailsId,
          candidateInductionScheduleId: element.candidateInductionScheduleId,
          trainingTittleId: element.trainingTittleId,
          traingTitle: element.traingTitle,
          dateFrom: element.dateFrom,
          dateTo: element.dateTo,
          timeFrom: element.timeFrom,
          timeTo: element.timeTo,
          batchCandidateIds: element.batchCandidateIds.length > 0 ? candidateids : "0",  // Added for multiple schedule
          detailsofSession: element.detailsofSession,
          trainer: element.trainer,
          inductionMode: element.inductionMode,
          location: element.location,
          inductionVenue: element.inductionVenue,
          inductionCoOrdinator: element.inductionCoOrdinator,
          remarks: element.remarks,
          isExternal: element.isExternal, // Added this parameter
          verticalId: element.verticalId  // Added this parameter

        }
        finalSubmitObj.candidateInductionScheduleDetails.push(obj);
      })
      this.inductionScheduleDetailsNonEditableList.forEach(element => {
        if (this.isForBatch) {
          var candidateids1 = "";
          if (element.batchCandidateIds.length > 0) {
            element.batchCandidateIds.forEach(candidate_id => {
              candidateids1 += (candidateids1 == "" ? candidate_id.toString() : ("," + candidate_id.toString()));
            })
          }
        }
        let obj1 = {
          candidateInductionScheduleDetailsId: element.candidateInductionScheduleDetailsId,
          candidateInductionScheduleId: element.candidateInductionScheduleId,
          traingTitle: element.traingTitle,
          dateFrom: element.dateFrom,
          dateTo: element.dateTo,
          timeFrom: element.timeFrom,
          timeTo: element.timeTo,
          batchCandidateIds: element.batchCandidateIds.length > 0 ? candidateids1 : "0",  // Added for multiple schedule
          detailsofSession: element.detailsofSession,
          trainer: element.trainer,
          inductionMode: element.inductionMode,
          location: element.location,
          inductionVenue: element.inductionVenue,
          inductionCoOrdinator: element.inductionCoOrdinator,
          trainerName: element.trainerName,
          locationName: element.locationName,
          inductionVenueName: element.inductionVenueName,
          inductionCoOrdinatorName: element.inductionCoOrdinatorName,
          inductioneName: element.inductioneName,
          remarks: element.remarks,
          isExternal: element.isExternal, // Added this parameter
          verticalId: element.verticalId  // Added this parameter

        }
        finalSubmitObj.candidateInductionScheduleDetails1.push(obj1);
      })

      this.SpinnerService.show();
      //console.log("Final Submit Object", finalSubmitObj)
      this.joinersservice.scheduleInduction(finalSubmitObj).subscribe((result) => {
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
            this.updateFormValue();
            this.redirectTo()

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

  onClickEditSchedule(data) {
    // this.loadTimePicker3();
    // console.log("Edit Data1", data);
    // console.log("Edit Data", this.inductionScheduleDetailsNonEditableList);
    this.getAllOnboardingCoordinatorEditClick(data.verticalId);
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
    this.objEditSchedule.TrainingTittleId = data.trainingTittleId;  // Added By anif on 25-11-2022
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
    this.objEditSchedule.templateId = data.templateId;   // Added By anif on 25-11-2022
    this.objEditSchedule.locationName = data.locationName;   // Added By anif on 25-11-2022
    this.objEditSchedule.inductionVenueName = data.inductionVenueName;   // Added By anif on 25-11-2022
    this.loadSelectPicker();     // Added for multiple schedule
    this.locationID = data.location;
    this.getAllTicByLocation( data.isExternal == true ? 'External' : 'Internal');

  }
  getTrainingTittleNameForEdit() {  // Added by anif on 25-11-2022
    // if (this.inductionScheduleDetailsNonEditableList.length > 0) {
    //   var checkExisted = this.inductionScheduleDetailsNonEditableList.find(e => e.trainingTittleId == this.objEditSchedule.TrainingTittleId);
    //   if (checkExisted == undefined) {
    var trainingTittleNameObj = this.trainingTittleList.find(e => e.trainingTittleId == this.objEditSchedule.TrainingTittleId);
    if (trainingTittleNameObj != undefined) {
      this.objEditSchedule.TrainingTittle = trainingTittleNameObj.trainingTittleName;
    }
    //   } else {
    //     this.notificationService.showError("Training Tittle Already Added , Select another", "Error");
    //     this.objEditSchedule.TrainingTittleId = null;
    //   }
    // } else {
    //   var trainingTittleNameObj = this.trainingTittleList.find(e => e.trainingTittleId == this.objEditSchedule.TrainingTittleId);
    //   if (trainingTittleNameObj != undefined) {
    //     this.objEditSchedule.TrainingTittle = trainingTittleNameObj.trainingTittleName;
    //   }
    // }
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
  getAllOnboardingCoordinatorEditClick(verticalId) {
    this.onBoardingCoordinatorListForEdit = [];

    if (verticalId == 2) {
      this.searchRoleUser.roleId = 25
    }
    else if (verticalId == 1) {
      this.searchRoleUser.roleId = 24
    }
    else {
      this.searchRoleUser.roleId = 26
    }
    this.commonService.getRoleWiseUser(this.searchRoleUser).subscribe((result) => {
      if (result) {
        this.onBoardingCoordinatorListForEdit = result;
      }
      else {
        this.onBoardingCoordinatorListForEdit = [];
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
    this.getAllTicByLocation(this.objEditSchedule.IsExternal== true ? 'External' : 'Internal');

  }
  onChangeVenueOnEdit() {
    var venueNameObj = this.locationwiseVenue.find(e => e.inductionVenueId == this.objEditSchedule.Venue && e.isExternal == this.objEditSchedule.IsExternal);
    if (venueNameObj != undefined) {
      this.objEditSchedule.VenueName = venueNameObj.inductionVenueName;
      this.objEditSchedule.inductionVenueName = venueNameObj.inductionVenueName;
    }
  }
  onCancelClick() {

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
      // else {
      this.inductionScheduleDetailsNonEditableList.forEach(element => {
        if (element.index == this.editScheduleIndex) {
          element.trainingTittleId = this.objEditSchedule.TrainingTittleId; // Added By anif on 25-11-2022
          element.traingTitle = this.objEditSchedule.TrainingTittle;
          // element.dateFrom = this.objEditSchedule.FromDate;
          // element.dateTo = this.objEditSchedule.ToDate;
          element.dateFrom = this.fDateEdit.nativeElement.value;
          element.dateTo = this.tDateEdit.nativeElement.value;
          element.timeFrom = this.objEditSchedule.FromTime;
          element.timeTo = this.objEditSchedule.ToTime;
          element.batchCandidateIds = this.objEditSchedule.BatchCandidateIds; // Added for multiple schedule
          element.detailsofSession = this.objEditSchedule.SessionDetails;
          element.trainer = this.objEditSchedule.Trainer;
          element.location = this.objEditSchedule.Location;
          //element.locationName = this.objEditSchedule.LocationName;
          element.locationName = this.objEditSchedule.locationName;
          element.inductionVenue = this.objEditSchedule.Venue;
          //element.inductionVenueName = this.objEditSchedule.VenueName;
          element.inductionVenueName = this.objEditSchedule.inductionVenueName;
          element.inductionCoOrdinator = this.objEditSchedule.Coordinator;
          element.remarks = this.objEditSchedule.Remarks;
          element.isExternal = this.objEditSchedule.IsExternal;
          // element.inductionVenueName=this.objEditSchedule.inductionVenueName;
          // element.inductionVenueName=this.objEditSchedule.locationName;

        }
      })
     // console.log("inductionScheduleDetailsNonEditableList",this.inductionScheduleDetailsNonEditableList)
      
      jQuery("#editScheduleModal").modal("hide");
      this.loadDatePicker();
      this.objEditSchedule.FromDate="";
      this.objEditSchedule.ToDate="";
      this.objEditSchedule.BatchCandidateIds = [];
      this.inductionScheduleDetailsNonEditableListforshow=[];
      // //added by Sayandeep for sorting 
      this.inductionScheduleDetailsNonEditableListforshow=this.inductionScheduleDetailsNonEditableList;
      this.inductionScheduleDetailsNonEditableListforshow.sort((a,b)=>{
        const datePartsA = a.dateFrom .split('/').map(part => parseInt(part, 10));
        const dateA = new Date(datePartsA[2], datePartsA[1] - 1, datePartsA[0]);

        const datePartsB = b.dateFrom.split('/').map(part => parseInt(part, 10));
        const dateB = new Date(datePartsB[2], datePartsB[1] - 1, datePartsB[0]);
        if(a.dateFrom == b.dateFrom){
          const timeA = new Date();
        if(a.timeFrom.endsWith('PM'))
        {
          timeA.setHours(Number(a.timeFrom.split(':')[0]) % 12 + (a.timeFrom.endsWith('PM') ? 12 : 0));
          timeA.setMinutes(Number(a.timeFrom.split(':')[1].slice(0, 2)));
        }
        else{
          timeA.setHours(Number(a.timeFrom.split(':')[0]) );
          timeA.setMinutes(Number(a.timeFrom.split(':')[1].slice(0, 2)));
        }

        const timeB = new Date();
        if(b.timeFrom.endsWith('PM'))
        {
          timeB.setHours(Number(b.timeFrom.split(':')[0]) % 12 + (b.timeFrom.endsWith('PM') ? 12 : 0));
          timeB.setMinutes(Number(b.timeFrom.split(':')[1].slice(0, 2))); 
        }
        else{
          timeB.setHours(Number(b.timeFrom.split(':')[0]) );
          timeB.setMinutes(Number(b.timeFrom.split(':')[1].slice(0, 2)));
        }
        if (timeA < timeB) {
          return -1;
        }
        else if (timeA > timeB) {
          return 1;
        } 
        else {
          return 0;
        }
        }
        if (dateA< dateB) {
          return -1;
        }
        else if (dateA > dateB) {
          return 1;
        } 
        else {
          return 0;
        }
      })
      //}
    } else {
      this.notificationService.showError(msg, 'Error');
    }
  }
  BtnResetClick() {
    // this.inductionForm.reset();
    this.locationID = null;
    this.coordinatorID = null;
    this.inductionTemplateId = null;
    this.locationReadonly = false;
    this.coordinatorReadonly = false;
    this.updateFormValue();
    this.isSelectFromTemplate = false;
    this.fDate.nativeElement.value = "";
    this.tDate.nativeElement.value = "";
    // this.getAllDropdowndata();
  }
  onFinalReset() {
    this.inductionScheduleDetailsList = [];
    this.inductionScheduleDetailsNonEditableList = [];
    this.inductionScheduleDetailsNonEditableListforshow = [];//Added by Sayandeep on 01-09-2023
  }
  backTo() {
    // if (this.from == "Corporate") {
    //   this.persistance.set('parentActiveTab', this.parentActiveTab);
    //   this.persistance.set('childActiveTab', this.childActiveTab);
    this._route.navigate(['app/report/inductionProgramReportComponent']);
    // // } else if (this.from == "Plant") {
    // //   this.persistance.set('parentActiveTab', this.parentActiveTab);
    // //   this.persistance.set('childActiveTab', this.childActiveTab);
    // //   this._route.navigate(['/plant/new-joiner-list']);
    // // } else if (this.from == "Sales") {
    // //   this.persistance.set('parentActiveTab', this.parentActiveTab);
    // //   this.persistance.set('childActiveTab', this.childActiveTab);
    // //   this._route.navigate(['/sales/new-joiner-list']);
    // // }
    // if (this.UserType == "OC") {
    //   if (this.from == "Corporate") {
    //     this.persistance.set('parentActiveTab', this.parentActiveTab);
    //     this.persistance.set('childActiveTab', this.childActiveTab);
    //     this._route.navigate(['/app/corporate/new-joiner-list']);
    //   } else if (this.from == "Plant") {
    //     this.persistance.set('parentActiveTab', this.parentActiveTab);
    //     this.persistance.set('childActiveTab', this.childActiveTab);
    //     this._route.navigate(['/app/plant/new-joiner-list']);
    //   } else if (this.from == "Sales") {
    //     this.persistance.set('parentActiveTab', this.parentActiveTab);
    //     this.persistance.set('childActiveTab', this.childActiveTab);
    //     this._route.navigate(['/app/sales/new-joiner-list']);
    //   }
    // } else if (this.UserType == "OM") {
    //   if (this.from == "Corporate") {
    //     this.persistance.set('parentActiveTab', this.parentActiveTab);
    //     this.persistance.set('childActiveTab', this.childActiveTab);
    //     this._route.navigate(['/app/corporate/joiner-list']);
    //   } else if (this.from == "Plant") {
    //     this.persistance.set('parentActiveTab', this.parentActiveTab);
    //     this.persistance.set('childActiveTab', this.childActiveTab);
    //     this._route.navigate(['/app/plant/joiner-list']);
    //   } else if (this.from == "Sales") {
    //     this.persistance.set('parentActiveTab', this.parentActiveTab);
    //     this.persistance.set('childActiveTab', this.childActiveTab);
    //     this._route.navigate(['/app/sales/joiner-list']);
    //   }
    // }
  }
  redirectTo() {
   

    if (this.UserType == "OC") {
      if (this.from == "Corporate") {
        this.persistance.set('parentActiveTab', "Scheduled");
        this.persistance.set('childActiveTab', this.childActiveTab);
        this._route.navigate(['/app/corporate/new-joiner-list']);
      } else if (this.from == "Plant") {
        this.persistance.set('parentActiveTab', "Scheduled");
        this.persistance.set('childActiveTab', this.childActiveTab);
        this._route.navigate(['/app/plant/new-joiner-list']);
      } else if (this.from == "Sales") {
        this.persistance.set('parentActiveTab', "Scheduled");
        this.persistance.set('childActiveTab', this.childActiveTab);
        this._route.navigate(['/app/sales/new-joiner-list']);
      }
    } else if (this.UserType == "OM") {
      if (this.from == "Corporate") {
        this.persistance.set('parentActiveTab', "Scheduled");
        this.persistance.set('childActiveTab', this.childActiveTab);
        this._route.navigate(['/app/corporate/joiner-list']);
      } else if (this.from == "Plant") {
        this.persistance.set('parentActiveTab', "Scheduled");
        this.persistance.set('childActiveTab', this.childActiveTab);
        this._route.navigate(['/app/plant/joiner-list']);
      } else if (this.from == "Sales") {
        this.persistance.set('parentActiveTab', "Scheduled");
        this.persistance.set('childActiveTab', this.childActiveTab);
        this._route.navigate(['/app/sales/joiner-list']);
      }
    }
  }

  downloadarray:any[]=[];
  
  ExportReport(data:any)
  {
    this.downloadarray=[];
      if(this.inductionType=="Candidate")
      {
        this.inductionSchedule.candidateInductionSheduleDetails.forEach((element,index) => {
          let headerObj = {
            "Serial No." : index+1,
           // "Month" : element.month,
           "CandidateId" : this.inductionTypeId,
            "Candidate Name" : element.candidateFullName,
            "Training Title" : element.traingTitle,
            //"Date" : element.Date,
            "From Time" : element.timeFrom,
            "To Time" : element.timeTo,
           "Details of session" : element.detailsofSession,
           "Person To Meet" : element.trainer,
           "Mode" : element.inductionMode,
           "Is xternal" : element.isExternal,
           "Location" : element.locationName,
           "Venue" : element.inductionVenue,
           "Coordinator" : element.inductionCoOrdinator,
           "Renarks" : element.remarks,

          }
          this.downloadarray.push(headerObj);
        })
        this.excelService.ExportAsExcelFileForReport(this.downloadarray, 'Induction Program Report(Candidate Wise)');
      }
      else
      {
        // const abc = this.candidatePreviewList.map(candidate => ({
        //   'ID': candidate.candidateId,
          //'Candidate Name': this.extractCandidateNames(candidate.candidateName)
        //}));
        this.inductionSchedule.candidateInductionSheduleDetails.forEach((element,index) => {
          let headerObj = {
           
            "Serial No." : index+1,
            //"Month" : element.month,
           "BatchId" : this.inductionTypeId,
            "BatchNo" : this.inductionTypeNo,
            "Training Title" : element.traingTitle,
            //"Date" : element.Date,
            "From Time" : element.timeFrom,
            "To Time" : element.timeTo,
            //"Candidates" : abc,
            "Candidates" : element.batchCandidateIds,
            "CandidatesNo" : element.candidateNoInduction,
        
            "Details of session" : element.detailsofSession,
           "Person To Meet" : element.trainer,
           "Mode" : element.inductionMode,
           "Is xternal" : element.isExternal,
           "Location" : element.locationName,
           "Venue" : element.inductionVenue,
           "Coordinator" : element.inductionCoOrdinator,
           "Renarks" : element.remarks,

          }
          this.downloadarray.push(headerObj);
        })
        this.excelService.ExportAsExcelFileForReport(this.downloadarray, 'Induction Program Report(Batch Wise)');
      }

  }
  ngOnDestroy() {
    jQuery(".custom-menu").hide();
  }
}
class EditSchedule {
  TrainingTittleId: number;  // Added by anif on 25-11-2022
  TrainingTittle: string;
  FromDate: any;
  candidateFullName: any;
  ToDate: any;
  FromTime: any;
  ToTime: any;
  BatchCandidateIds: any; 
  candidateNoInduction: any;
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
  templateId: number; // Added by anif on 25-11-2022
  locationName: string;  // Added by anif on 25-11-2022
  inductionVenueName: string;  // Added by anif on 25-11-2022
}



