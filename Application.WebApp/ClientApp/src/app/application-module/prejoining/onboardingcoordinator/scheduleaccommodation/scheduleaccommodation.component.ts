import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import {
  IOnboardingCoordinator, ISearchOnboardingCoordinator, IModeOfInduction, ISearchModeOfInduction, IVenue, ISearchVenue, ITrainer, IsearchTrainer, ITemplate, ISearchTemplate, IScheduleAccommodation
  , ICandidateInductionScheduleByBatch, ICandidateInductionScheduleByIndividual, ICandidateListOnBoarding, ICandidateAccommodationInsert, IReportingVenue, ISearchTrainingInChargeId
} from '../../../../interfaces/prejoining/onboardingcoordinator.interface';
import { LocationService } from '../../../../services/common/location/location.service';
import { CommonService } from '../../../../services/common/common/common.service';
import { FunctionService } from '../../../../services/common/function/function.service';
import { PositionService } from '../../../../services/common/position/position.service';
import { ShareddataService } from '../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { CorporateallocationService } from '../../../../services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { JoinersService } from '../../../../services/prejoining/onboardingcoordinator/joiners.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { IBatch, ISearchBatch } from '../../../../interfaces/common/common.interface';
import { ISearchModeOfJoining } from 'src/app/interfaces/preselection/candidate.interface';
import { element } from 'protractor';
declare var jQuery: any;

@Component({
  selector: 'app-scheduleaccommodation',
  templateUrl: './scheduleaccommodation.component.html',
  styleUrls: ['./scheduleaccommodation.component.css']
})
export class ScheduleaccommodationComponent implements OnInit {
  searchAccommodationForm: FormGroup;
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  accommodationFor: string;
  accommodationForId: any;
  accommodationForNo: any;
  scheduleAccomodation: IScheduleAccommodation;
  inductionScheduleCandidateList: ICandidateListOnBoarding[] = [];
  inductionScheduledList: ICandidateInductionScheduleByBatch[] = [];
  scheduledCandidateAccommodationList: ICandidateInductionScheduleByIndividual[] = [];
  reportingVenueDetails: IReportingVenue[] = [];
  availableInductionDateGroupByCandidateId: any;
  filteredArrayForShowingAllDates: any[] = [];
  filteredArrayForShowingDates: any[] = [];
  firstCandidateId: number;
  requiredColspan: number;
  identicalCandidateArray: any[] = [];
  from: string;
  parentActiveTab: string;
  childActiveTab: string;
  UserType: string;
  trainingInChargeDetails: any[] = [];
  searchTrainingInChargeId: ISearchTrainingInChargeId = {
    // InductionVenueId: ""
    locationDetailIds: []
  };
  trainerTypename: string = "Trainer";
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
    private joinersservice: JoinersService
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.parentActiveTab = this.persistance.get("parentActiveTab");
    this.childActiveTab = this.persistance.get("childActiveTab");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.accommodationFor = params['AccommodationFor'];
      this.accommodationForId = params['AccommodationForId'];
      this.accommodationForNo = params['AccommodationForNo'];
      this.from = params['From'];
      this.UserType = params['UserType'];
    });
    this.createSearchAccomodationForm();
    this.updateFormValue();
    if (this.accommodationFor == "Candidate" && this.accommodationForId != undefined) {
      this.trainerTypename = "Person To Meet";
      this.getAllCandidateAccommodationDetails();
    } else if (this.accommodationFor == "Batch" && this.accommodationForId != undefined) {
      this.getAllBatchAccommodationDetails();
      this.trainerTypename = "Trainer";
    }
  }

  ngOnInit() {
    this.loadAccordion();
  }
  loadAccordion() {
    jQuery("#accordion").on("hide.bs.collapse show.bs.collapse", e => {
      jQuery(e.target)
        .prev()
        .find("i:last-child")
        .toggleClass("fa-minus fa-plus");
    });
  }
  createSearchAccomodationForm() {
    this.searchAccommodationForm = this.fb.group({
      batchId: null,
      candidateId: null
    });
  }
  updateFormValue() {
    if (this.accommodationFor == "Candidate") {
      this.searchAccommodationForm.patchValue({
        candidateId: Number(this.accommodationForId),
        // accommodationForNo: this.accommodationForNo
      })
    } else {
      this.searchAccommodationForm.patchValue({
        batchId: Number(this.accommodationForId),
        // accommodationForNo: this.accommodationForNo
      })
    }
  }
  getAllCandidateAccommodationDetails() {
    // this.scheduleAccomodation = [];
    this.SpinnerService.show();
    this.joinersservice.getAllAccommodationDetailsByCandidate(this.searchAccommodationForm.value).subscribe((result) => {
      if (result) {
        this.scheduleAccomodation = result;
        // console.log("Accommodation List", this.scheduleAccomodation);
        this.reportingVenueDetails = this.scheduleAccomodation.reportingVenu;
        this.inductionScheduleCandidateList = this.scheduleAccomodation.candidateAccomodationDetails; // 1st grid
        this.firstCandidateId = this.inductionScheduleCandidateList[0].candidateId; // get first candidate id from frist grid        
        this.inductionScheduledList = this.scheduleAccomodation.candidateInductionScheduleByBatchs; // 2nd gris
        this.scheduledCandidateAccommodationList = this.scheduleAccomodation.candidateInductionScheduleByIndividuals; // 3rd grid
        //console.log("Schdule Candidate List", this.scheduledCandidateAccommodationList);

        this.filteredArrayForShowingAllDates = _.filter(this.scheduledCandidateAccommodationList, { candidateId: this.firstCandidateId }); // filter with any of the candidate id for cheking the availale date
        //this.filteredArrayForShowingDates = _.filter(this.scheduledCandidateAccommodationList, { candidateid: this.firstCandidateId }); // filter with any of the candidate id for cheking the availale date
        this.filteredArrayForShowingAllDates.forEach(element => {
          var dateObj = this.filteredArrayForShowingDates.find(e => e.dateFrom == element.dateFrom && e.dateTo == element.dateTo);
          if (dateObj == null) {
            this.filteredArrayForShowingDates.push(element);
          }
        })

        this.btnAccommodationShowTraingIncharge();//Piu
        this.filteredArrayForShowingDates.forEach((element, index) => {
          element.indenticalNumber = index + 1;
        })

        this.requiredColspan = this.filteredArrayForShowingDates.length;
        this.scheduledCandidateAccommodationList.forEach(element => { // getting indentical candidate id and pushed to an array for showing 3rd grid candidate list
          // By default all should isactive
          element.isActive = true;
          var findObj = this.identicalCandidateArray.find(e => e.candidateId == element.candidateId);
          if (findObj == null) {
            this.identicalCandidateArray.push(element);
          }
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
  getAllBatchAccommodationDetails() {
    // this.scheduleAccomodation = [];
    this.SpinnerService.show();
    this.joinersservice.getAllAccommodationDetailsByBatch(this.searchAccommodationForm.value).subscribe((result) => {
      if (result) {
        this.scheduleAccomodation = result;
        this.reportingVenueDetails = this.scheduleAccomodation.reportingVenu;
        this.inductionScheduleCandidateList = this.scheduleAccomodation.candidateAccomodationDetails; // 1st grid

        this.firstCandidateId = this.inductionScheduleCandidateList[0].candidateId; // get first candidate id from frist grid
        this.inductionScheduledList = this.scheduleAccomodation.candidateInductionScheduleByBatchs; // 2nd gris
        this.scheduledCandidateAccommodationList = this.scheduleAccomodation.candidateInductionScheduleByIndividuals; // 3rd grid
        this.filteredArrayForShowingAllDates = _.filter(this.scheduledCandidateAccommodationList, { candidateId: this.firstCandidateId }); // filter with any of the candidate id for cheking the availale date
        //this.filteredArrayForShowingDates = _.filter(this.scheduledCandidateAccommodationList, { candidateid: this.firstCandidateId }); // filter with any of the candidate id for cheking the availale date
        this.filteredArrayForShowingAllDates.forEach(element => {
          var dateObj = this.filteredArrayForShowingDates.find(e => e.dateFrom == element.dateFrom && e.dateTo == element.dateTo);
          if (dateObj == null) {
            this.filteredArrayForShowingDates.push(element);
          }
        })

        this.btnAccommodationShowTraingIncharge();//Piu
        this.filteredArrayForShowingDates.forEach((element, index) => {
          element.indenticalNumber = index + 1;
        })

        this.requiredColspan = this.filteredArrayForShowingDates.length;
        this.scheduledCandidateAccommodationList.forEach(element => { // getting indentical candidate id and pushed to an array for showing 3rd grid candidate list
          // By default all should isactive
          element.isActive = true;
          var findObj = this.identicalCandidateArray.find(e => e.candidateId == element.candidateId);
          if (findObj == null) {
            this.identicalCandidateArray.push(element);
          }
          // if (element.isActive) {
          //   element.isChanged = true;
          // }
        })
        // this.loadDataTable();
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

  //Show Training Incharge Names
  btnAccommodationShowTraingIncharge() {
    this.SpinnerService.show();
    for (let i = 0; i < this.inductionScheduledList.length; i++) {
      //this.searchVenueId.InductionVenueId += (this.searchVenueId.InductionVenueId == "" ? this.inductionScheduledList[i].inductionVenue.toString() : (',' + this.inductionScheduledList[i].inductionVenue.toString()));
      if (this.searchTrainingInChargeId.locationDetailIds.length == 0) {
        this.searchTrainingInChargeId.locationDetailIds.push({ locationId: this.inductionScheduledList[i].location, isExternal: this.inductionScheduledList[i].isExternal })
      } else {
        var checkExisted = this.searchTrainingInChargeId.locationDetailIds.find(e => e.locationId == this.inductionScheduledList[i].location && e.isExternal == this.inductionScheduledList[i].isExternal);
        if (checkExisted == undefined) {
          this.searchTrainingInChargeId.locationDetailIds.push({ locationId: this.inductionScheduledList[i].location, isExternal: this.inductionScheduledList[i].isExternal })
        }
      }
    }
    this.joinersservice.getTrainingInChargeDetails(this.searchTrainingInChargeId).subscribe((results) => {
      if (results) {
        this.trainingInChargeDetails = results;
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

  onChangecheckBox(eve, candidateDetails, dateDetails) {
    this.scheduledCandidateAccommodationList.forEach(element => {
      if (element.candidateId == candidateDetails.candidateId && element.dateFrom == dateDetails.dateFrom && element.dateTo == dateDetails.dateTo) {
        element.isActive = eve.target.checked;
        // element.isChanged = true;
      }
    })
  }
  getAccommodationDateStatus(candidateDetails, dateDetails) {
    var obj = this.scheduledCandidateAccommodationList.find(e => e.candidateId == candidateDetails.candidateId && e.dateFrom == dateDetails.dateFrom && e.dateTo == dateDetails.dateTo && e.isActive == true);
    return obj == null ? false : true;
  }
  onClickShareWithTrainingIncharge() {
     //From Date 
     const mindateObjects: Date[] = this.filteredArrayForShowingDates.map(item => {
      const parts = item.dateFrom.split('/');
      return new Date(+parts[2], +parts[1] - 1, +parts[0]); // year, month (zero-based), day
    });

  // Find the minimum date
    const lowestDate: Date = new Date(Math.min(...mindateObjects.map(date => date.getTime())));

    //console.log("Lowest date:", lowestDate.toLocaleDateString('en-GB'));
    const maxdateObjects: Date[] = this.filteredArrayForShowingDates.map(item => {
      const parts = item.dateTo.split('/');
      return new Date(+parts[2], +parts[1] - 1, +parts[0]); // year, month (zero-based), day
    });

  // Find the maximum date
  //To Date Calculation
    const maxDate: Date = new Date(Math.max(...maxdateObjects.map(date => date.getTime())));
    var trainingEmailId = this.trainingInChargeDetails.map(item => item.trainingInChargeEmail)//Piu
    let obj = {
      candidateAccomodationHeaderId: this.scheduledCandidateAccommodationList[0].candidateAccomodationHeaderId,
      batchId: this.accommodationFor == "Candidate" ? null : Number(this.accommodationForId),
      candidateId: this.accommodationFor == "Candidate" ? Number(this.accommodationForId) : null,
      //isActive: true,
      uDTCandidateAccomodationDetail: [],
      createdBy: this.loginUserId,
      joiningDate: this.inductionScheduleCandidateList[0].dateofJoining,//Piu
      FromDate: lowestDate.toLocaleDateString('en-GB').toString(),
      ToDate: maxDate.toLocaleDateString('en-GB').toString(),
      //Location: this.inductionScheduledList.map(item => item.location),//Piu
      EmailId: String(trainingEmailId)//Piu
    }
    this.scheduledCandidateAccommodationList.forEach(element => {
      // if (element.isActive) {
      var detailsObj = {
        candidateAccomodationDetailsId: element.candidateAccomodationDetailsId,
        candidateAccomodationHeaderId: element.candidateAccomodationHeaderId,
        candidateId: element.candidateId,
        candidateInductionScheduleDetailsId: element.candidateInductionScheduleDetailsId,
        trainingInchangeId: element.trainer,
        fromDate: element.dateFrom,
        toDate: element.dateTo,
        location: null,
        isActive: element.isActive
      }
      obj.uDTCandidateAccomodationDetail.push(detailsObj);
      //}
    })
    this.SpinnerService.show();
    this.joinersservice.insertUpdateAccommodation(obj).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.updateFormValue();
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
  btnAccommodationCancelClick() {
    this.scheduledCandidateAccommodationList.forEach(element => {
      element.isActive = false;
    })
    if (this.accommodationFor == "Candidate" && this.accommodationForId != undefined) {
      this.getAllCandidateAccommodationDetails();
    } else if (this.accommodationFor == "Batch" && this.accommodationForId != undefined) {
      this.getAllBatchAccommodationDetails();
    }
  }
  backTo() {
    if (this.UserType == "OC") {
      if (this.from == "Corporate") {
        this.persistance.set('parentActiveTab', this.parentActiveTab);
        this.persistance.set('childActiveTab', this.childActiveTab);
        this._route.navigate(['/app/corporate/new-joiner-list']);
      } else if (this.from == "Plant") {
        this.persistance.set('parentActiveTab', this.parentActiveTab);
        this.persistance.set('childActiveTab', this.childActiveTab);
        this._route.navigate(['/app/plant/new-joiner-list']);
      } else if (this.from == "Sales") {
        this.persistance.set('parentActiveTab', this.parentActiveTab);
        this.persistance.set('childActiveTab', this.childActiveTab);
        this._route.navigate(['/app/sales/new-joiner-list']);
      }
    } else if (this.UserType == "OM") {
      if (this.from == "Corporate") {
        this.persistance.set('parentActiveTab', this.parentActiveTab);
        this.persistance.set('childActiveTab', this.childActiveTab);
        this._route.navigate(['/app/corporate/joiner-list']);
      } else if (this.from == "Plant") {
        this.persistance.set('parentActiveTab', this.parentActiveTab);
        this.persistance.set('childActiveTab', this.childActiveTab);
        this._route.navigate(['/app/plant/joiner-list']);
      } else if (this.from == "Sales") {
        this.persistance.set('parentActiveTab', this.parentActiveTab);
        this.persistance.set('childActiveTab', this.childActiveTab);
        this._route.navigate(['/app/sales/joiner-list']);
      }
    }
  }

}
