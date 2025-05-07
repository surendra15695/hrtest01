import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import {
  IReportingVenue, IEditAccommodationForBatch, IEditAccomodationCandidateForBatch, IEditAccomodationInductionSheduleForBatch, IAccommodationDetailsByCandidate,
  IGetEditCandidate, IGetEditAccomodationForCandidate, IEditAccomodationCandidate, ITrainingEditAccomodationRequiredCandidateForBatch
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
import { InductionassessmentService } from '../../../../services/common/inductionassessment/inductionassessment.service';
declare var jQuery: any;


@Component({
  selector: 'app-editaccommodationbatch',
  templateUrl: './editaccommodationbatch.component.html',
  styleUrls: ['./editaccommodationbatch.component.css']
})
export class EditaccommodationbatchComponent implements OnInit {
  searchEditAccommodationForm: FormGroup;
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  editAccommodationFor: string;
  editAccommodationForId: any;
  editAccommodationForNo: any;
  inductionScheduleId: number;
  editAccommodationDetails: any;
  editAccommodationcandidateDetailsObj: IEditAccomodationCandidateForBatch;
  editAccommodationInductionSchedule: IEditAccomodationInductionSheduleForBatch[] = [];
  trainingEditAccomodationRequiredCandidate: ITrainingEditAccomodationRequiredCandidateForBatch[] = [];
  //editAccommodationCandidateDetails: IEditAccomodationForCandidate[] = [];
  editAccommodationCandidateDetails: any[] = [];
  allAccommodationDetailsByCandidate: IAccommodationDetailsByCandidate;
  candidateDetailsByCandidate: IGetEditCandidate;
  accommodationDetailsByCandidate: IGetEditAccomodationForCandidate[] = [];
  firstCandidateId: number;
  requiredColspan: number;
  filteredArrayForShowingAllDatesLocation: any[] = [];
  filteredArrayForShowingDatesLocation: any[] = [];
  identicalCandidateArray: any[] = [];
  editClickedCandidateDetails: any;
  from: string;
  accommodationDetailsForPopup: any[] = [];
  candidateNoForPopup: string;
  candidateNameForPopup: string;
  parentActiveTab: string;
  childActiveTab: string;
  UserType: string;
  candidateAccommodationId: number;
  trainerTypename: string = "Trainer";
  batchWiseCandidateList: any[] = [];
  candidatePreviewList: any[] = [];
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
    private joinersservice: JoinersService,
    private inductionassessmentService: InductionassessmentService
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.parentActiveTab = this.persistance.get("parentActiveTab");
    this.childActiveTab = this.persistance.get("childActiveTab");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.editAccommodationFor = params['EditAccommodationFor'];
      this.editAccommodationForId = params['EditAccommodationForId'];
      this.editAccommodationForNo = params['EditAccommodationForNo'];
      this.inductionScheduleId = params['InductionScheduleId'];
      this.from = params['From'];
      this.UserType = params['UserType'];
    });

    this.createSearchAccomodationForm();
    this.updateFormValue();
    this.getAllDetailsForEdit();
    this.getBatchwiseCandidate();
    if (this.editAccommodationFor == "Candidate") {
      this.trainerTypename = "Person To Meet";
    } else if (this.editAccommodationFor == "Batch") {
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
    this.searchEditAccommodationForm = this.fb.group({
      // CandidateInductionScheduleId: null
      batchId: null,
      candidateId: null,
    });
  }
  updateFormValue() {
    if (this.editAccommodationFor == "Candidate") {
      this.searchEditAccommodationForm.patchValue({
        candidateId: Number(this.editAccommodationForId),
      })
    } else {
      this.searchEditAccommodationForm.patchValue({
        batchId: Number(this.editAccommodationForId),
      })
    }
  }
  getBatchwiseCandidate() {
    this.batchWiseCandidateList = [];
    this.SpinnerService.show();
    let searchObj = {
      BatchId: Number(this.editAccommodationForId)
    }
    this.inductionassessmentService.getAllBatchWiseCandidate(searchObj).subscribe((result) => {
      if (result) {
        this.batchWiseCandidateList = result;
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
      // this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }
  onClickCandidateList(candidateIds: any) {      // Added for multiple schedule
    debugger
    this.candidatePreviewList = [];
    var candidateIdsArray = candidateIds.split(",");
    candidateIdsArray.forEach(element => {
      var candidateObj = this.batchWiseCandidateList.find(e => e.candidateId == Number(element));
      if (candidateObj != undefined) {
        let candidateDetailsObj = {
          candidateNo: candidateObj.candidateNo,
          candidateName: candidateObj.fullName,
        }
        this.candidatePreviewList.push(candidateDetailsObj);
      }
    })
  }

  getAllDetailsForEdit() {
    this.SpinnerService.show();
    this.joinersservice.getAllDetailsForEditAccommodationForBatch(this.searchEditAccommodationForm.value).subscribe((result) => {
      if (result) {
        this.editAccommodationDetails = result;
        
        //console.log("Edit Accommodation Details", this.editAccommodationDetails);
        this.editAccommodationInductionSchedule = this.editAccommodationDetails.trainingEditAccomodationInductionSheduleDetailsForBatch; // 1st grid
        this.editAccommodationcandidateDetailsObj = this.editAccommodationDetails.editAccomodationCandidateDetailForBatchNew;
        this.editAccommodationCandidateDetails = this.editAccommodationDetails.trainingEditAccomodationForCandidateDetailsForBatch; // 2nd grid
        this.trainingEditAccomodationRequiredCandidate = this.editAccommodationDetails.editAccomodationRequiredCandidatesForBatch; // 2nd grid
        if (this.editAccommodationCandidateDetails.length > 0) {
          var accomodationFirstObj = this.editAccommodationCandidateDetails.find(e => e.accomodation != null);
          if (accomodationFirstObj != undefined) {
            this.candidateAccommodationId = accomodationFirstObj.candidateAccomodationId;
          }
        }
        // console.log("Edit Accommodation Accomodatin details", this.editAccommodationCandidateDetails);
        if (this.editAccommodationCandidateDetails.length > 0) {
          this.modifyAllValue();

        }
        this.SpinnerService.hide();
      }
      else {
        // this.editAccommodationDetails = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  modifyAllValue() {
    this.identicalCandidateArray = [];
    this.filteredArrayForShowingDatesLocation = [];
    // this.firstCandidateId = this.editAccommodationCandidateDetails[0].candidateId; // select one candidate id
    //this.filteredArrayForShowingAllDatesLocation = _.filter(this.editAccommodationCandidateDetails, { candidateId: this.firstCandidateId }); // filter with any of the candidate id for cheking the availale date
    this.filteredArrayForShowingAllDatesLocation = this.trainingEditAccomodationRequiredCandidate;
    if (this.filteredArrayForShowingAllDatesLocation.length > 0) {
      this.filteredArrayForShowingAllDatesLocation.forEach(element => {
        //var dateObj = this.filteredArrayForShowingDatesLocation.find(e => e.fromDate == element.fromDate && e.toDate == element.toDate && e.locationId == element.locationId);
        //var dateObj = this.filteredArrayForShowingDatesLocation.find(e => e.candidateAccomodationDetailsId == element.candidateAccomodationDetailsId);
        var dateObj = this.filteredArrayForShowingDatesLocation.find(e => e.candidateInductionScheduleDetailsId == element.candidateInductionScheduleDetailsId);
        if (dateObj == null) {
          this.filteredArrayForShowingDatesLocation.push(element);
        }
      })
    }

    this.requiredColspan = this.filteredArrayForShowingDatesLocation.length;
    this.editAccommodationCandidateDetails.forEach(element => { // getting indentical candidate id and pushed to an array for showing 3rd grid candidate list
      var findObj = this.identicalCandidateArray.find(e => e.candidateId == element.candidateId);
      if (findObj == null) {
        this.identicalCandidateArray.push(element);
      }
    })
  }
  getAccommodationDetails(candidateDetails, dateDetails) {
    var candidatesList = dateDetails.batchCandidateIds.split(",");
    if (candidatesList.includes(candidateDetails.candidateId.toString())) {
      var accommodationdetails = this.editAccommodationCandidateDetails.find(e => e.candidateId == Number(candidateDetails.candidateId) && e.fromDate == dateDetails.dateFrom && e.toDate == dateDetails.dateTo);
      if (accommodationdetails != undefined) {
        if (accommodationdetails.isAccomadateRequired) {
          return accommodationdetails.accomodation == null ? "Pending" : accommodationdetails.accomodation;
        } else {
          return "Not Required";
        }
      } else {
        return "Not Required";
      }
    } else {
      return "Not Required";
    }

  }

  onClickEdit(candidateDetails) {
    this.accommodationDetailsForPopup = [];
    this.candidateNoForPopup = candidateDetails.candidateNo;
    this.candidateNameForPopup = candidateDetails.candidateFullName;
    this.editAccommodationCandidateDetails.forEach(element => {
      if (element.candidateId == candidateDetails.candidateId) {
        //var dateObj = this.accommodationDetailsForPopup.find(e => e.fromDate == element.fromDate && e.toDate == element.toDate && e.candidateId == element.candidateId);
        var dateObj = this.accommodationDetailsForPopup.find(e => e.candidateAccomodationDetailsId == element.candidateAccomodationDetailsId);
        if (dateObj == null) {
          this.accommodationDetailsForPopup.push(JSON.parse(JSON.stringify(element)));
        }
      }
    })
  }

  onSubmitPopup() {
    this.editAccommodationCandidateDetails.forEach(element => {
      this.accommodationDetailsForPopup.forEach(pop_element => {
        if (element.fromDate == pop_element.fromDate && element.toDate == pop_element.toDate && element.candidateId == pop_element.candidateId) {
          element.accomodation = pop_element.accomodation;
        }
      })
    })
    this.modifyAllValue();
    jQuery("#myModal").modal("hide");
    // console.log("After Chnage Accomodation", this.editAccommodationCandidateDetails);

  }
  onClickCancel() {
    this.getAllDetailsForEdit();
  }
  onClickPopUpCancel() {
    this.modifyAllValue();
  }


  onClickSaveAndUpdate() {
    let obj = {
      candidateAccomodationHeaderId: this.editAccommodationCandidateDetails[0].candidateAccomodationHeaderId,
      batchId: this.editAccommodationFor == "Candidate" ? null : Number(this.editAccommodationForId),
      candidateId: this.editAccommodationFor == "Candidate" ? Number(this.editAccommodationForId) : null,
      //isActive: true,
      uDTCandidateAccomodationDetail: [],
      createdBy: this.loginUserId,
      CandidateName: this.identicalCandidateArray[0].candidateFullName,
      CandidateNo: this.identicalCandidateArray[0].candidateNo,
      Location: this.filteredArrayForShowingDatesLocation[0].locationName,
      Password: "welcome@1234"
    }
    this.editAccommodationCandidateDetails.forEach(element => {
      var candidateInductionScheduleDetailsID = this.editAccommodationInductionSchedule.find(e => e.dateTo == element.toDate).candidateInductionScheduleDetailsId
      var trainer = this.editAccommodationInductionSchedule.find(e => e.dateTo == element.toDate).trainer
      // alert(candidateInductionScheduleDetailsID);
      // alert(trainer);
      var detailsObj = {
        candidateAccomodationDetailsId: element.candidateAccomodationDetailsId,
        candidateAccomodationHeaderId: element.candidateAccomodationHeaderId,
        //candidateAccomodationId: element.candidateAccomodationId,
        candidateAccomodationId: this.candidateAccommodationId,
        candidateId: element.candidateId,
        candidateInductionScheduleDetailsId: candidateInductionScheduleDetailsID,
        trainingInchangeId: trainer,
        fromDate: element.fromDate,
        toDate: element.toDate,
        location: null,
        isActive: (element.accomodation == undefined || element.accomodation == "") ? false : true,
        accomodation: element.accomodation
      }
      obj.uDTCandidateAccomodationDetail.push(detailsObj);
    })
    //console.log("Final Submit Accommodation Obj Edit", obj);
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

  // Anifur

}
