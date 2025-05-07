import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../interfaces/common/doctor.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../interfaces/common/function.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../interfaces/common/position.interface';
import { IJoinersList, IPendingScheduleBatchWise, IPendingScheduleIndividual, IScheduledBatchWise, IScheduledIndividually, IReportingVenueExists } from '../../../interfaces/prejoining/joinerslist.interface';
//import { IOnboardingCoordinator, ISearchOnboardingCoordinator, IVenue, ISearchVenue, IJoiningDocument, IWelcomeTemplate } from '../../../interfaces/prejoining/onboardingcoordinator.interface';
import { IAssessmentList, ICandidateList, IInductionTemplate, ISearchAssessment, ISearchCandidate } from '../../../interfaces/common/inductionassessment.interface';
import { LocationService } from '../../../services/common/location/location.service';
import { IOnboardingCoordinator, ISearchOnboardingCoordinator, IModeOfInduction, ISearchModeOfInduction, IVenue, ISearchVenue, ITrainer, IsearchTrainer, ITemplate, ISearchTemplate, IRoleWiseUser, ISearchRoleWiseUser, ICandidateInductionSchedule, ICandidateInductionSheduleHeader, ICandidateInductionSheduleDetails } from '../../../interfaces/prejoining/onboardingcoordinator.interface';
import { ISearchInductionVenue, IInductionVenue, IInductionVenueWithExternal } from 'src/app/interfaces/common/venue.interface';
import { CommonService } from '../../../services/common/common/common.service';
import { FunctionService } from '../../../services/common/function/function.service';
import { DepartmentService } from '../../../services/common/department/department.service';
import { PositionService } from '../../../services/common/position/position.service';
import { InductionassessmentService } from '../../../services/common/inductionassessment/inductionassessment.service';
import { ShareddataService } from '../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../sharedservices/notification.service';
import { CorporateallocationService } from '../../../services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { JoinersService } from '../../../services/prejoining/onboardingcoordinator/joiners.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { IApproverVertical, IApproverFunction, IApproverDepartment, IApproverVerticalFunctionDepartment, IApproverFunctionDepartment, IBatch, ISearchBatch, ITrainingTittle, IsearchTrainingTittle } from '../../../interfaces/common/common.interface';
import { VenueService } from '../../../services/common/venue/venue.service';
declare var jQuery: any;

@Component({
  selector: 'app-manage-template',
  templateUrl: './manage-template.component.html',
  styleUrls: ['./manage-template.component.css']
})
export class ManageTemplateComponent implements OnInit {

  assessmentAssignSaveForm: FormGroup;
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  showTemplateList: boolean = true;
  showTemplateAddNew: boolean = false;
  verticalId: any;
  trainerTypename: string = "Person To Meet";
  usetemplate: any;
  trainerRoleid: number = 48;
  searchInductionTemplate = {
    inductionTemplateId: null,
    isActive: null,
    isBatch: null
  }
  // inductionTemplateList: IInductionTemplate[] = [];
  inductionTemplateList: any[] = [];
  objInsertInductionTemplate: InsertInductionTemplate;
  objInsertInductionTemplateDetails: InsertInductionTemplateDetails;
  onBoardingCoordinatorList: any[] = [];
  searchRoleUser: any = {
    roleId: 0
  }

  verticals: IVertical[] = [];
  // induction mode
  inductionModes: IModeOfInduction[] = [];
  selectedInductionMode: IModeOfInduction;
  searchInductionMode: ISearchModeOfInduction = {
    inductionModeId: null,
    isActive: true
  }
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
  // venue
  venues: IInductionVenueWithExternal[] = [];
  locationwiseVenue: IInductionVenueWithExternal[] = [];
  selectedVenue: IInductionVenueWithExternal;
  searchVenue: ISearchInductionVenue = {
    InductionVenueId: null,
    isActive: null
  }
  // Trainer
  roleWiseUser: IRoleWiseUser[] = [];
  searchRoleWiseUser: ISearchRoleWiseUser = {
    roleId: null
  }
  searchExternalVenue = {
    ExternalVenueId: 0,
    IsActive: null,
  }
  externalLocation: any[] = [];
  combinedLocation: any[] = [];
  locationType: string = "Internal";
  inductionTemplateDetailsObject: any;
  editMode: boolean = false;
  editResult: any[] = [];
  // Edit Induction Template
  objEditInductionTemplate: EditInductionTemplate;
  fromTimeHour: string;
  toTimeHour: string;
  editScheduleIndex: any;
  onBoardingCoordinatorListForEdit: any[] = [];
  // Added by Anif on 25-11-2022
  searchTrainingTittle = {
    TrainingTittleId: 0,
    IsActive: true,
  }
  trainingTittleList: any[] = [];
  Verticals: any[] = [];
  showbatchtype: boolean = false;
  VerticalId: any;
  isVerticalDisabled: boolean = false;
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
    private titleService: Title, private joinersservice: JoinersService,
    private positionService: PositionService, private venueService: VenueService,
    private inductionassessmentService: InductionassessmentService
  ) {
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.getInductionMode();
    this.getVenue();
    // this.getAllRoleWiseUser()
    this.getExternalLocation();
    this.getAllVerticals();
  }

  ngOnInit() {
    this.objInsertInductionTemplate = new InsertInductionTemplate();
    this.objInsertInductionTemplateDetails = new InsertInductionTemplateDetails();
    this.objEditInductionTemplate = new EditInductionTemplate();
    this.loadDataTable();
    this.tableOptionDropDown();
    this.loadTimePicker1();
    this.getAllInductionTemplate();
    this.getAllTrainingTittle();
  }
  getAllVerticals() {
    this.Verticals.push(
      { verticalId: 1, verticalName: "Corporate", isActive: true },
      { verticalId: 2, verticalName: "Plant", isActive: true },
      { verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
  }
  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": true,
        "paging": true,
        "scrollX": false,
        "bLengthChange": false,
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
  loadTimePicker1() {
    jQuery('.timepik').datetimepicker(
      {
        format: 'hh:mm'
      }
    );
  }
  onChangeVertical() {
    this.getAllOnboardingCoordinator();
    this.getAllLocation();
    //this.objInsertInductionTemplateDetails.isExternal = false;
    this.objInsertInductionTemplateDetails.location = null;
    this.objInsertInductionTemplateDetails.inductionCoOrdinator = null;
  }
  getExternalLocation() {
    this.SpinnerService.show();
    this.venueService.getAllExternalInductionVenue(this.searchExternalVenue).subscribe((response: any) => {
      if (response) {
        this.externalLocation = response;
        //console.log("External Location", this.externalLocation);
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
  onChangeUseFor() {
    this.objInsertInductionTemplateDetails.trainer = null;
    if (this.usetemplate == "1") {
      this.showbatchtype = false;
      this.trainerTypename = "Person To Meet";
      this.trainerRoleid = 48;
      this.objInsertInductionTemplate.isBatch = false;
    } else if (this.usetemplate == "2") {
      this.showbatchtype = true;
      this.trainerTypename = "Trainer";
      this.trainerRoleid = 47;
      this.objInsertInductionTemplate.isBatch = true;
    }
    this.getAllRoleWiseUser();
  }
  onChangeVerticalfortemplate() {
    this.objInsertInductionTemplate.verticalid = this.VerticalId;
  }
  getAllOnboardingCoordinator() {
    this.onBoardingCoordinatorList = [];
    if (this.objInsertInductionTemplateDetails.verticalId == "1") {
      this.searchRoleUser.roleId = 24
    } else if (this.objInsertInductionTemplateDetails.verticalId == "2") {
      this.searchRoleUser.roleId = 25
    } else if (this.objInsertInductionTemplateDetails.verticalId == "3") {
      this.searchRoleUser.roleId = 26
    }
    this.SpinnerService.show();
    this.commonService.getRoleWiseUser(this.searchRoleUser).subscribe((result) => {
      if (result) {
        this.onBoardingCoordinatorList = result;
        //console.log("Onboarding Coordinator", this.onBoardingCoordinatorList);
      }
      else {
        this.onBoardingCoordinatorList = [];
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  getInductionMode() {
    this.inductionModes = [];
    //this.searchTrainer.verticalId = this.selectedVerticalId;
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
  //locations
  getAllLocation() {
    this.locations = [];
    this.searchLocation.verticalId = this.objInsertInductionTemplateDetails.verticalId;
    this.locationService.getAllLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        this.locations = result;
        this.combinedLocation = [];
        //console.log("Internal Location", this.locations);
        this.locations.forEach((element, index) => {
          this.combinedLocation.push({ locationId: element.locationId, locationOffice: element.locationOffice });
        })
        // this.locations.splice(0, 0, {
        //   locationId: 0,
        //   verticalId: 0,
        //   locationNo: "All",
        //   locationCode: "",
        //   locationOffice: "All",
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
        //   locationOffice: "All",
        //   isActive: true,
        //   createdBy: 0
        // })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  onChangeCheckbox(eve) {
    this.SpinnerService.show();
    if (eve.target.checked) {
      this.isVerticalDisabled = true;
      this.combinedLocation = [];
      this.locationType = "External";
      //this.getExternalLocation();
      this.objInsertInductionTemplateDetails.verticalId = null;
      this.objInsertInductionTemplateDetails.location = null;
      this.externalLocation.forEach((element, index) => {
        this.combinedLocation.push({ locationId: element.externalVenueId, locationOffice: element.externalVenueName });
      })
    } else {
      this.isVerticalDisabled = false;
      this.combinedLocation = [];
      this.locationType = "Internal";
      //this.getAllLocation();
      this.objInsertInductionTemplateDetails.verticalId = null;
      this.objInsertInductionTemplateDetails.location = null;
      this.locations.forEach((element, index) => {
        this.combinedLocation.push({ locationId: element.locationId, locationOffice: element.locationOffice });
      })
    }
    this.SpinnerService.hide();
  }
  getVenue() {
    this.venues = [];
    this.searchVenue.isActive = true;
    this.venueService.getAllInductionVenueWithExternal(this.searchVenue).subscribe((result) => {
      if (result) {
        this.venues = result;
        //console.log("Venue with external", this.venues);
      }
      else {
        this.venues = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  onChangeLocation() {
    if (this.objInsertInductionTemplateDetails.isExternal) {
      this.locationwiseVenue = this.venues.filter(e => e.locationId == this.objInsertInductionTemplateDetails.location && e.isExternal == true);
    } else {
      this.locationwiseVenue = this.venues.filter(e => e.locationId == this.objInsertInductionTemplateDetails.location && e.isExternal == false);
    }
    //console.log("Venue on change", this.locationwiseVenue);
    if (this.objInsertInductionTemplateDetails.location != undefined) {
      // var locationName = this.locations.find(e => e.locationId == locationid).locationNo;
      if (this.locationType == "External") {
        var externalLocationName = this.externalLocation.find(e => e.externalVenueId == this.objInsertInductionTemplateDetails.location);
        if (externalLocationName != undefined) {
          this.objInsertInductionTemplateDetails.locationName = externalLocationName.externalVenueName;
        }
      } else {
        var locationName = this.locations.find(e => e.locationId == this.objInsertInductionTemplateDetails.location);
        if (locationName != undefined) {
          this.objInsertInductionTemplateDetails.locationName = locationName.locationOffice;
        }
      }

    }
    this.objInsertInductionTemplateDetails.inductionCoOrdinator = null
    this.getAllTicByLocation(this.objInsertInductionTemplateDetails.location, this.locationType)
  }
  trainingInchargeList: any = [];
  searchTic: any = {
    locationId: 0
  }
  getAllTicByLocation(locationId, locationType) {
    this.trainingInchargeList = [];

    this.searchTic.locationId = Number(locationId);
    this.commonService.getAllTicByLocation(this.searchTic).subscribe((result: any[]) => {
      if (result.length > 0) {
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
  getAllRoleWiseUser() {
    this.roleWiseUser = [];
    this.searchRoleWiseUser.roleId = this.trainerRoleid;
    this.SpinnerService.show();
    this.joinersservice.getAllRoleWiseUser(this.searchRoleWiseUser).subscribe((result) => {
      if (result) {
        this.roleWiseUser = result;
      }
      else {
        this.roleWiseUser = [];
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }

  getAllInductionTemplate() {
    this.inductionTemplateList = [];
    this.SpinnerService.show();
    //console.log("Search Induction Template Obj", this.searchInductionTemplate);
    this.inductionassessmentService.getAllInductionTemplate(this.searchInductionTemplate).subscribe((result) => {
      if (result) {
        this.inductionTemplateList = result;
        //console.log("Induction Template Details", this.inductionTemplateList);
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
      this.loadDataTable();
      this.SpinnerService.hide();
    });
  }
  // Added By Anif for training tittle master creation on 25-11-2022
  getAllTrainingTittle() {
    this.SpinnerService.show();
    this.commonService.getAllTrainingTittleList(this.searchTrainingTittle).subscribe((response: any) => {
      if (response) {
        this.trainingTittleList = response;
        // console.log("Training Tittle list", this.trainingTittleList);

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
  onClickAddNew() {
    this.showTemplateList = false;
    this.showTemplateAddNew = true;
    this.editMode = false;
    this.usetemplate = null;
    this.isVerticalDisabled = false;
    this.objInsertInductionTemplateDetails = new InsertInductionTemplateDetails();
  }
  onClickEdit(data: any) {
    // console.log("Edit Record", data);
    jQuery(".custom-menu").hide();
    this.showTemplateList = false;
    this.showTemplateAddNew = true;
    this.editMode = true;
    this.objInsertInductionTemplate.inductionTemplateId = data.inductionTemplateId;
    this.getInductionTemplateDetails(data);
  }

  onBackClick() {
    this.showTemplateList = true;
    this.showTemplateAddNew = false;
    this.getAllInductionTemplate();
    this.objInsertInductionTemplate = new InsertInductionTemplate();
  }

  onSubmitInductionTemplateData() {
    var flag = 0;
    var msg = "";
    if (this.objInsertInductionTemplate.inductionTemplateDetails.length == 0) {
      flag = 1;
      msg = "Please add atleast one details";
    }

    else {

    }
    if (this.usetemplate == "" || this.usetemplate == undefined) {
      flag = 1;
      msg = "Please select use for";
    }

    else {

    }
    if (this.objInsertInductionTemplate.inductionTemplateName == "" || this.objInsertInductionTemplate.inductionTemplateName == undefined) {
      flag = 1;
      msg = "Please enter template name";
    } else {

    }
    if (flag == 0) {
      this.objInsertInductionTemplate.createdBy = this.loginUserId;
      //console.log("Induction template Save Obj", this.objInsertInductionTemplate);
      this.SpinnerService.show();
      this.inductionassessmentService.saveInductionTemplate(this.objInsertInductionTemplate).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.objInsertInductionTemplate = new InsertInductionTemplate();
            this.getAllInductionTemplate();
            this.notificationService.showSuccess(result.msg, "Success");
            this.showTemplateList = true;
            this.showTemplateAddNew = false;
            this.usetemplate = null;
            this.editMode = false;
          }
        }
        else {
          this.SpinnerService.hide();
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
      }, () => {
        this.loadDataTable();
        this.SpinnerService.hide();
      });

    } else {
      this.notificationService.showError(msg, "Error");
    }

  }
  getTrainingTittleName() {   // Added by Anif on 25-11-2022
    var trainingTittleNameObj = this.trainingTittleList.find(e => e.trainingTittleId == this.objInsertInductionTemplateDetails.traingTitleId);
    if (trainingTittleNameObj != undefined) {
      this.objInsertInductionTemplateDetails.traingTitle = trainingTittleNameObj.trainingTittleName;
    }
  }
  onAddNewRow() {
    var flag = 0;
    var msg = "";
    // if (this.objInsertInductionTemplateDetails.remarks == "" || this.objInsertInductionTemplateDetails.remarks == undefined) {
    //   flag = 1;
    //   msg = "Please enter remarks";
    // } else {

    // }
    if (this.objInsertInductionTemplateDetails.inductionVenue == null || this.objInsertInductionTemplateDetails.inductionVenue == undefined) {
      flag = 1;
      msg = "Please select venue";
    } else {

    }
    if (this.objInsertInductionTemplateDetails.location == null || this.objInsertInductionTemplateDetails.location == undefined) {
      flag = 1;
      msg = "Please select location";
    } else {

    }
    if (this.objInsertInductionTemplateDetails.inductionMode == null || this.objInsertInductionTemplateDetails.inductionMode == undefined) {
      flag = 1;
      msg = "Please select mode";
    } else {

    }
    if (this.objInsertInductionTemplateDetails.trainer == null || this.objInsertInductionTemplateDetails.trainer == undefined) {
      flag = 1;
      if (this.usetemplate == "1") {
        msg = "Please select person to meet";
      } else {
        msg = "Please select trainer";
      }
    } else {

    }
    if (this.objInsertInductionTemplateDetails.inductionCoOrdinator == null || this.objInsertInductionTemplateDetails.inductionCoOrdinator == undefined) {
      flag = 1;
      msg = "Please select induction coordinator";
    }

    else {

    }
    if ((this.objInsertInductionTemplateDetails.verticalId == null || this.objInsertInductionTemplateDetails.verticalId == undefined) && this.objInsertInductionTemplateDetails.isExternal == false) {
      flag = 1;
      msg = "Please select vertical";
    }

    else {

    }
    if (this.objInsertInductionTemplateDetails.detailsofSession == "" || this.objInsertInductionTemplateDetails.detailsofSession == undefined) {
      flag = 1;
      msg = "Please enter details of session";
    } else {

    }
    if (this.objInsertInductionTemplateDetails.timeTo == "" || this.objInsertInductionTemplateDetails.timeTo == undefined) {
      flag = 1;
      msg = "Please select to time";
    } else {

    }
    if (this.objInsertInductionTemplateDetails.timeFrom == "" || this.objInsertInductionTemplateDetails.timeFrom == undefined) {
      flag = 1;
      msg = "Please select from time";
    }
    else {

    }

    //if (this.objInsertInductionTemplateDetails.traingTitle == "" || this.objInsertInductionTemplateDetails.traingTitle == undefined) {
    if (this.objInsertInductionTemplateDetails.traingTitleId == null || this.objInsertInductionTemplateDetails.traingTitleId == undefined) {
      flag = 1;
      msg = "Please enter training tittle";
    }
    else {

    }
    if (flag == 0) {
      this.objInsertInductionTemplateDetails.index = this.objInsertInductionTemplate.inductionTemplateDetails.length == 0 ? 1 : this.objInsertInductionTemplate.inductionTemplateDetails.length + 1;
      //this.inductionTemplateDetailsObject = JSON.parse(JSON.stringify(this.objInsertInductionTemplateDetails));
      //this.objInsertInductionTemplate.inductionTemplateDetails.push(JSON.parse(JSON.stringify(this.objInsertInductionTemplateDetails)));
      this.objInsertInductionTemplate.inductionTemplateDetails.push(this.objInsertInductionTemplateDetails);
      this.objInsertInductionTemplateDetails = new InsertInductionTemplateDetails();
      this.locationType = "Internal";
      this.onBoardingCoordinatorList = [];
      this.isVerticalDisabled = false;
      //console.log("Induction Template Array", this.objInsertInductionTemplate);

    } else {
      this.notificationService.showError(msg, "Error");
    }

  }
  getInductionTemplateDetails(data: any) {
    this.SpinnerService.show();
    let editSearchObj = {
      inductionTemplateId: data.inductionTemplateId,
      isActive: null,
      isBatch: null
    }
    this.inductionassessmentService.getAllInductionTemplateDetails(editSearchObj).subscribe((result) => {
      if (result) {
        //this.inductionTemplateDetailsList = result;
        this.editResult = result;
        this.objInsertInductionTemplate.inductionTemplateDetails = result;
        this.objInsertInductionTemplate.inductionTemplateDetails.forEach((element, index) => {
          element.index = index + 1;
          element.rowEditMode = true;
        })
        this.objInsertInductionTemplate.inductionTemplateName = result[0].inductionTemplateName;
        this.VerticalId = result[0].templateVerticalId;
        // console.log("find", this.VerticalId)
        this.usetemplate = result[0].isBatch ? 2 : 1;
        this.onChangeUseFor();
        //console.log("Edit Details", this.objInsertInductionTemplate.inductionTemplateDetails);
        this.SpinnerService.hide();
      }
      else {
        // this.inductionTemplateDetailsList = [];
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
  getVerticalName(verticalId: any) {
    if (verticalId == "1") {
      return "Corporate";
    } else if (verticalId == "2") {
      return "Plant";
    } else if (verticalId == "3") {
      return "Sales & Marketing";
    }

  }
  // getTrainerName(trainerId) {
  //   if (trainerId != undefined) {
  //     var trainerName = this.roleWiseUser.find(e => e.autoUserId == trainerId).employeeName;
  //     return trainerName;
  //   }

  // }
  getTrainerName() {
    if (this.objInsertInductionTemplateDetails.trainer != undefined) {
      var trainerName = this.roleWiseUser.find(e => e.autoUserId == this.objInsertInductionTemplateDetails.trainer).employeeName;
      this.objInsertInductionTemplateDetails.trainerName = trainerName;
    }

  }
  getInductionModeName(modeId) {
    if (modeId != undefined) {
      var inductionmodeName = this.inductionModes.find(e => e.inductionModeId == modeId).inductionModeName;
      return inductionmodeName;
    }

  }
  getVenueName() {
    if (this.objInsertInductionTemplateDetails.inductionVenue != undefined) {
      var venueName = this.venues.find(e => e.inductionVenueId == this.objInsertInductionTemplateDetails.inductionVenue).inductionVenueName;
      this.objInsertInductionTemplateDetails.inductionVenueName = venueName;
    }

  }
  // getLocationName(locationid) {
  //   if (locationid != undefined) {
  //     // var locationName = this.locations.find(e => e.locationId == locationid).locationNo;
  //     var locationName = this.locations.find(e => e.locationId == locationid);
  //     if (locationName != undefined) {
  //       return locationName.locationOffice;
  //     }
  //   }
  // }
  getLocationName(locationid) {
    if (locationid != undefined) {
      // var locationName = this.locations.find(e => e.locationId == locationid).locationNo;
      var locationName = this.locations.find(e => e.locationId == locationid);
      if (locationName != undefined) {
        this.objInsertInductionTemplateDetails.locationName = locationName.locationOffice;
      }
    }
  }
  // getCoordinatorName(coordinatorId) {
  //   if (coordinatorId != undefined) {
  //     var name = this.onBoardingCoordinatorList.find(e => e.autoUserId == coordinatorId);
  //     // console.log("name ",name);
  //     if (name != undefined) {
  //       return name.employeeName;
  //     }
  //   }
  // }
  getCoordinatorName() {
    if (this.objInsertInductionTemplateDetails.inductionCoOrdinator != undefined) {
      //var name = this.onBoardingCoordinatorList.find(e => e.autoUserId == this.objInsertInductionTemplateDetails.inductionCoOrdinator);
      var name = this.trainingInchargeList.find(e => e.autoUserId == this.objInsertInductionTemplateDetails.inductionCoOrdinator);
      // console.log("name ",name);
      if (name != undefined) {
        this.objInsertInductionTemplateDetails.inductionCoOrdinatorName = name.employeeName;
      }
    }
  }
  getCoordinatorNameInEdit() {
    if (this.objEditInductionTemplate.InductionCoOrdinator != undefined) {
      var name = this.onBoardingCoordinatorList.find(e => e.autoUserId == this.objEditInductionTemplate.InductionCoOrdinator);
      // console.log("name ",name);
      if (name != undefined) {
        this.objEditInductionTemplate.InductionCoOrdinatorName = name.employeeName;
      }
    }
  }
  onClickDelete(data) {
    this.isVerticalDisabled = false;
    this.objInsertInductionTemplate.inductionTemplateDetails.forEach((element, index) => {
      if (element.index == data.index) {
        this.objInsertInductionTemplate.inductionTemplateDetails.splice(index, 1);
        //console.log("Induction Template After Delete", this.objInsertInductionTemplate);
      }
    })
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
  onClickCancel() {
    this.showTemplateList = true;
    this.showTemplateAddNew = false;
    this.getAllInductionTemplate();
    this.objInsertInductionTemplate = new InsertInductionTemplate();
  }
  onClickDetails(data: any) {
    jQuery(".custom-menu").hide();
    setTimeout(() => {
      this._route.navigate(["/app/admin/induction-template-details", data.inductionTemplateId]);
    }, 100);
  }
  getTrainingTittleNameForEdit() {
    var trainingTittleNameObj = this.trainingTittleList.find(e => e.trainingTittleId == this.objEditInductionTemplate.TraingTitleId);
    if (trainingTittleNameObj != undefined) {
      this.objEditInductionTemplate.TrainingTittle = trainingTittleNameObj.trainingTittleName;
    }
  }
  onClickEditSchedule(data) {
    // this.loadTimePicker3();
    this.objEditInductionTemplate.VerticalId = data.verticalId;
    this.getAllOnboardingCoordinatorEditClick(data.verticalId, data);
    this.prepareLocationDropdown(data);
    this.prepareVenue(data);
    this.getAllLocationEdit();
    this.editScheduleIndex = data.index;
    data.rowEditMode = false;
    if (!data.rowEditMode) {
      this.fromTimeHour = data.timeFrom.slice(-2);
      this.toTimeHour = data.timeTo.slice(-2);
    }

    // if (data.readOnly) {
    if (!data.rowEditMode) {
      var formatedFromTime = this.formateFromTime(this.fromTimeHour, data.timeFrom, data.rowEditMode);
      var formatedToTime = this.formateToTime(this.toTimeHour, data.timeTo, data.rowEditMode);
      data.timeFrom = formatedFromTime;
      data.timeTo = formatedToTime;
    }


    this.objEditInductionTemplate.TraingTitleId = data.traingTitleId;
    this.objEditInductionTemplate.TrainingTittle = data.traingTitle;
    // this.objEditInductionTemplate.FromDate = data.dateFrom;
    // this.objEditInductionTemplate.ToDate = data.dateTo;
    this.objEditInductionTemplate.FromTime = data.timeFrom;
    this.objEditInductionTemplate.ToTime = data.timeTo;
    this.objEditInductionTemplate.SessionDetails = data.detailsofSession;
    this.objEditInductionTemplate.VerticalId = data.verticalId;
    this.objEditInductionTemplate.InductionCoOrdinator = data.inductionCoOrdinator;
    this.objEditInductionTemplate.Trainer = data.trainer;
    this.objEditInductionTemplate.Mode = data.inductionMode;
    this.objEditInductionTemplate.Location = data.location;
    this.objEditInductionTemplate.Venue = data.inductionVenue;
    this.objEditInductionTemplate.Coordinator = data.inductionCoOrdinator;
    this.objEditInductionTemplate.Remarks = data.remarks;
    this.objEditInductionTemplate.IsExternal = data.isExternal;
  }
  getAllOnboardingCoordinatorEditClick(verticalId, data) {
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

    this.trainingInchargeList = [];
    //this.objInsertInductionTemplateDetails.location = this.objEditInductionTemplate.Location;
    this.getAllTicByLocation(this.objEditInductionTemplate.Location, data.isExternal == true ? 'External' : 'Internal');
  }
  prepareLocationDropdown(data) {
    this.combinedLocation = [];
    if (data.isExternal) {
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
    // Location Name
    var locationNameObj = this.combinedLocation.find(e => e.locationId == data.location);
    if (locationNameObj != undefined) {
      this.objEditInductionTemplate.LocationName = locationNameObj.locationOffice;
    }
  }
  prepareVenue(data) {
    if (data.isExternal) {
      this.locationwiseVenue = this.venues.filter(e => e.locationId == data.location && e.isExternal == true);
    } else {
      this.locationwiseVenue = this.venues.filter(e => e.locationId == data.location && e.isExternal == false);
    }
    // Prepare venue name
    var venueNameObj = this.locationwiseVenue.find(e => e.inductionVenueId == data.inductionVenue && e.isExternal == data.isExternal);
    if (venueNameObj != undefined) {
      this.objEditInductionTemplate.VenueName = venueNameObj.inductionVenueName;
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
      } else if (hourFormat == "PM") {
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
      } else if (hourFormat == "PM") {
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
  onChangeVerticalEdit() {
    this.getAllOnboardingCoordinatorEdit();
    this.getAllLocationEdit();
    this.objEditInductionTemplate.IsExternal = false;
    this.objEditInductionTemplate.Location = null;
    this.objEditInductionTemplate.InductionCoOrdinator = null;
    this.objEditInductionTemplate.Venue = null;
  }
  getAllOnboardingCoordinatorEdit() {
    this.onBoardingCoordinatorListForEdit = [];
    if (this.objEditInductionTemplate.VerticalId == "1") {
      this.searchRoleUser.roleId = 24
    } else if (this.objEditInductionTemplate.VerticalId == "2") {
      this.searchRoleUser.roleId = 25
    } else if (this.objEditInductionTemplate.VerticalId == "3") {
      this.searchRoleUser.roleId = 26
    }
    this.SpinnerService.show();
    this.commonService.getRoleWiseUser(this.searchRoleUser).subscribe((result) => {
      if (result) {
        this.onBoardingCoordinatorListForEdit = result;
        //console.log("Onboarding Coordinator", this.onBoardingCoordinatorListForEdit);
      }
      else {
        this.onBoardingCoordinatorListForEdit = [];
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  //locations
  getAllLocationEdit() {
    this.locations = [];
    this.searchLocation.verticalId = this.objEditInductionTemplate.VerticalId;
    this.locationService.getAllLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        this.locations = result;
        this.combinedLocation = [];
        //console.log("Internal Location", this.locations);
        this.locations.forEach((element, index) => {
          this.combinedLocation.push({ locationId: element.locationId, locationOffice: element.locationOffice });
        })
        // this.locations.splice(0, 0, {
        //   locationId: 0,
        //   verticalId: 0,
        //   locationNo: "All",
        //   locationCode: "",
        //   locationOffice: "All",
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
        //   locationOffice: "All",
        //   isActive: true,
        //   createdBy: 0
        // })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  onChangePopupCheckbox(eve) {
    this.combinedLocation = [];
    // this.locationID = null;
    this.objEditInductionTemplate.Location = null;
    this.objEditInductionTemplate.Venue = null;
    if (eve.target.checked) {
      // data.isExternal = true;
      this.objEditInductionTemplate.IsExternal = true;
      this.isVerticalDisabled = true;
      this.locationType = "External";
      this.objEditInductionTemplate.VerticalId = null;
      this.objEditInductionTemplate.Location = null;
      this.externalLocation.forEach((element, index) => {
        this.combinedLocation.push({ locationId: element.externalVenueId, locationOffice: element.externalVenueName });
      })
    } else {
      //  data.isExternal = false;
      this.objEditInductionTemplate.IsExternal = false;
      this.isVerticalDisabled = false;
      this.locationType = "Internal";
      this.objEditInductionTemplate.VerticalId = null;
      this.objEditInductionTemplate.Location = null;
      this.locations.forEach((element, index) => {
        this.combinedLocation.push({ locationId: element.locationId, locationOffice: element.locationOffice });
      })
    }
  }
  onChangeEditLocation() {
    this.objEditInductionTemplate.Venue = null;
    if (this.objEditInductionTemplate.IsExternal) {
      this.locationwiseVenue = this.venues.filter(e => e.locationId == this.objEditInductionTemplate.Location && e.isExternal == true);
    } else {
      this.locationwiseVenue = this.venues.filter(e => e.locationId == this.objEditInductionTemplate.Location && e.isExternal == false);
    }
    // Get location Name
    var locationNameObj = this.combinedLocation.find(e => e.locationId == this.objEditInductionTemplate.Location);
    if (locationNameObj != undefined) {
      this.objEditInductionTemplate.LocationName = locationNameObj.locationOffice;
    }
  }
  onChangeVenueOnEdit() {
    var venueNameObj = this.locationwiseVenue.find(e => e.inductionVenueId == this.objEditInductionTemplate.Venue && e.isExternal == this.objEditInductionTemplate.IsExternal);
    if (venueNameObj != undefined) {
      this.objEditInductionTemplate.VenueName = venueNameObj.inductionVenueName;
    }
  }
  onPopupSubmit() {
    var flag = 0;
    var msg = "";

    if (this.objEditInductionTemplate.Venue == null) {
      flag = 1;
      msg = "Please Select Venue";
    }
    else {

    }
    if (this.objEditInductionTemplate.Location == null) {
      flag = 1;
      msg = "Please Select Location";
    }
    else {

    }
    if (flag == 0) {
      // else {
      this.objInsertInductionTemplate.inductionTemplateDetails.forEach(element => {
        if (element.index == this.editScheduleIndex) {
          element.traingTitleId = this.objEditInductionTemplate.TraingTitleId;  // Added By Anif on 25-11-2022
          element.traingTitle = this.objEditInductionTemplate.TrainingTittle;
          element.timeFrom = this.objEditInductionTemplate.FromTime;
          element.timeTo = this.objEditInductionTemplate.ToTime;
          element.detailsofSession = this.objEditInductionTemplate.SessionDetails;
          element.trainer = this.objEditInductionTemplate.Trainer;
          element.verticalId = this.objEditInductionTemplate.VerticalId;
          element.location = this.objEditInductionTemplate.Location;
          element.locationName = this.objEditInductionTemplate.LocationName;
          element.inductionVenue = this.objEditInductionTemplate.Venue;
          element.inductionVenueName = this.objEditInductionTemplate.VenueName;
          element.inductionCoOrdinator = this.objEditInductionTemplate.Coordinator;
          element.remarks = this.objEditInductionTemplate.Remarks;
          element.isExternal = this.objEditInductionTemplate.IsExternal;
          element.rowEditMode = false;
        }
      })
      jQuery("#editScheduleModal").modal("hide");
      //}
    } else {
      this.notificationService.showError(msg, 'Error');
    }
  }
  ngOnDestroy() {
    jQuery(".custom-menu").hide();
  }

}

class InsertInductionTemplate {
  inductionTemplateId: number = 0;
  inductionTemplateName: string;
  inductionTemplateDetails: any[] = [];
  isActive: boolean = true;
  isBatch: boolean;
  createdBy: number;
  verticalid: any;
}



class InsertInductionTemplateDetails {
  inductionTemplateDetailId: number = 0;
  inductionTemplateId: number = 0;
  traingTitleId: number;       // Added by anif on 25-11-2022
  traingTitle: string;
  timeFrom: string;
  timeTo: string;
  detailsofSession: string;
  verticalId: any;
  trainer: number;
  trainerName: string = "";
  inductionMode: number;
  location: number;
  locationName: string = "";
  inductionVenue: number;
  inductionVenueName: string = "";
  inductionCoOrdinator: number;
  inductionCoOrdinatorName: string = "";
  remarks: string;
  isExternal: boolean = false;
  index: number;
  rowEditMode: boolean = false;
}
class EditInductionTemplate {
  TrainingTittle: string;
  TraingTitleId: number;       // Added by anif on 25-11-2022
  FromDate: any;
  ToDate: any;
  FromTime: any;
  ToTime: any;
  SessionDetails: string;
  VerticalId: any;
  InductionCoOrdinator: any;
  InductionCoOrdinatorName: string;
  Trainer: any;
  Mode: any;
  Location: any;
  LocationName: any;
  Venue: any;
  VenueName: any;
  Coordinator: any;
  Remarks: string;
  IsExternal: boolean;
}