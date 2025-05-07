import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import {
  ICandidateInductionPlan, ICandidateDetails, ICandidateInductionPlanSheduleDetails, ICandidateAccommodationDetails, IAccommodationDetails, IInductionDetails,
  IInductionList
} from '../../../../interfaces/prejoining/candidate.interface';
import { IViewCandidateList } from '../../../../interfaces/prejoining/onboardingcoordinator.interface';
import { LocationService } from '../../../../services/common/location/location.service';
import { CommonService } from '../../../../services/common/common/common.service';
import { FunctionService } from '../../../../services/common/function/function.service';
import { PositionService } from '../../../../services/common/position/position.service';
import { ShareddataService } from '../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { CorporateallocationService } from '../../../../services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { CandidateService } from '../../../../services/prejoining/candidate/candidate.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { IBatch, ISearchBatch } from '../../../../interfaces/common/common.interface';
import { JoinersService } from 'src/app/services/prejoining/onboardingcoordinator/joiners.service';
// import { jsPDF } from 'jspdf';
declare var jQuery: any;
declare var html2pdf: any;

@Component({
  selector: 'app-candidateinductionplan',
  templateUrl: './candidateinductionplan.component.html',
  styleUrls: ['./candidateinductionplan.component.css']
})
export class CandidateinductionplanComponent implements OnInit {

  getInductionDetailsForm: FormGroup;
  @ViewChild('content', { static: false }) content: ElementRef;
  @ViewChild('accommodationDetails', { static: false }) accommodationDetailsForDownLoad: ElementRef;
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  candidateId: number;
  candidateInductionPlan: ICandidateInductionPlan;
  candidateDetails: ICandidateDetails;
  candidateInductionPlanDetails: ICandidateInductionPlanSheduleDetails[] = [];
  candidateAllAccommodationDetails: ICandidateAccommodationDetails[] = [];
  candidateAccommodationDetails: ICandidateAccommodationDetails[] = [];
  batch: any;
  allUserList: any[] = [];
  searchRoleUser: any = {
    roleId: 0
  }
  reportingVenueExists: any[] = [];
  searchAccommodationDetails = {
    batchId: null,
    candidateId: null
  }
  accommodationAndVenueDetails: any;
  venueDetails: any;
  accommodationDetails: any;
  showForDownload: boolean = false;

  accommodationData: any;
  accommodation: any;
  accomodationDetails: IAccommodationDetails = {
    candidateName: "",
    location: "",
    department: "",
    grade: "",
    batchNo: "",
    function: "",
    position: "",
    joiningDate: "",
    accommodationList: []
  };

  inductionData: any;
  inductionDetails: IInductionDetails = {
    candidateName: "",
    location: "",
    department: "",
    grade: "",
    batchNo: "",
    function: "",
    position: "",
    joiningDate: "",
    inductionList: []
  };
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
    private candidateService: CandidateService
  ) {
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.candidateId = this.persistance.get('loggedinuser').candidateId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.getBatchid();
    this.getAllOnboardingCoordinator();
    this.createGetInductionPlanDetailsForm();
    this.getReportingVenue();
  }

  ngOnInit() {
    this.loadAccrodian();
  }
  loadAccrodian() {
    jQuery("#accordion").on("hide.bs.collapse show.bs.collapse", e => {
      jQuery(e.target)
        .prev()
        .find("i:last-child")
        .toggleClass("fa-minus fa-plus");
    });
  }
  createGetInductionPlanDetailsForm() {
    this.getInductionDetailsForm = this.fb.group({
      candidateId: this.candidateId,
    });
  }
  getBatchid() {
    var search = {
      CandidateId: this.candidateId
    }
    this.joinersservice.getBatchIdfromCandidateId(search).subscribe((result) => {
      if (result) {
        //console.log("batch", result[0].batchId)
        this.batch = result[0].batchId;
        // this.searchAccommodationDetails.batchId = this.batch;
        this.getReportingVenuerAndAccommodation();
      }
    })

  }
  getReportingVenue() {
    var saveReportingVenue = {
      batchId: null,
      candidateId: this.candidateId,
    }
    this.joinersservice.getExistedReportingVenue(saveReportingVenue).subscribe((result) => {
      if (result) {
        this.reportingVenueExists = result;
        // console.log("Reporting Venue", this.reportingVenueExists);
      }
      else {
        this.reportingVenueExists = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  getReportingVenuerAndAccommodation() {
    let searchaccomodation = {
      "batchId": this.batch,
      "candidateId": this.candidateId
    }
    this.joinersservice.getAllDetailsForEditAccommodation(searchaccomodation).subscribe((result) => {
      if (result) {
        this.accommodationAndVenueDetails = result;
        this.venueDetails = this.accommodationAndVenueDetails.editAccomodationCandidateDetail;
        // this.accommodationDetails=this.accommodationAndVenueDetails.trainingEditAccomodationForCandidateDetails[0];
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
  getAllOnboardingCoordinator() {
    this.allUserList = [];
    this.commonService.getRoleWiseUser(this.searchRoleUser).subscribe((result) => {
      if (result) {
        this.allUserList = result;
        this.getCandidateInductionPlanDetails();
        //console.log("All User List", this.allUserList);
      }
      else {
        this.allUserList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  getCoordinatorName(coordinatorId) {
    var userlist = this.allUserList.filter(e => e.autoUserId == coordinatorId);
    return userlist[0].employeeName;
  }
  getCandidateInductionPlanDetails() {
    this.candidateService.getCandidateInductionPlan(this.getInductionDetailsForm.value).subscribe((result) => {
      if (result) {
        this.candidateInductionPlan = result;
        // console.log("Candidate Induction Plan", result);
        this.candidateDetails = this.candidateInductionPlan.candidateInductionPlanShedule;
        // console.log("Candidate Details", this.candidateDetails);
        this.candidateInductionPlanDetails = this.candidateInductionPlan.candidateInductionPlanShedules;
        //console.log("Candidate Induction Plan Details", this.candidateInductionPlanDetails);
        this.candidateAllAccommodationDetails = this.candidateInductionPlan.candidateInductionPlanAccomodations;
       // console.log("Candidate Accommodation All Details", this.candidateAllAccommodationDetails);
        this.candidateAllAccommodationDetails.forEach(element => {
          var existed = this.candidateAccommodationDetails.find(e => e.fromDate == element.fromDate && e.toDate == element.toDate);
          if (existed == null) {
            this.candidateAccommodationDetails.push(element);
          }
        })
        // Prepare Download PDF data
        if (this.candidateInductionPlan.candidateInductionPlanShedule != null) {
          this.accomodationDetails.candidateName = this.candidateInductionPlan.candidateInductionPlanShedule.candidateFullName;
          this.accomodationDetails.location = this.candidateInductionPlan.candidateInductionPlanShedule.locationName;
          this.accomodationDetails.department = this.candidateInductionPlan.candidateInductionPlanShedule.departmentName;
          // this.accomodationDetails.candidateName = this.candidateInductionPlan.candidateInductionPlanShedule.candidateFullName;
          this.accomodationDetails.grade = this.candidateInductionPlan.candidateInductionPlanShedule.gradeName;
          this.accomodationDetails.batchNo = this.candidateInductionPlan.candidateInductionPlanShedule.batchId == null ? "" : this.candidateInductionPlan.candidateInductionPlanShedule.batchId.toString();
          this.accomodationDetails.function = this.candidateInductionPlan.candidateInductionPlanShedule.functionName;
          this.accomodationDetails.position = this.candidateInductionPlan.candidateInductionPlanShedule.positionName;
          this.accomodationDetails.joiningDate = this.candidateInductionPlan.candidateInductionPlanShedule.dateofJoining;
        }
        if (this.candidateAllAccommodationDetails.length > 0) {
          this.candidateAllAccommodationDetails.forEach(element => {
            var existed = this.accomodationDetails.accommodationList.find(e => e.fromDate == element.fromDate && e.toDate == element.toDate);
            if (existed == null) {
              var obj = {
                fromDate: element.fromDate,
                toDate: element.toDate,
                location: element.locationName,
                accommodation: element.accomodation
              }
              this.accomodationDetails.accommodationList.push(obj);
            }
          })
        }
        this.accommodationData = this.accomodationDetails;
        //console.log("Accommodation Data for PDF", this.accommodationData);
        this.prepareInductionPdfData();
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
  prepareInductionPdfData() {
    // Prepare Download PDF data
    if (this.candidateInductionPlan.candidateInductionPlanShedule != null) {
      this.inductionDetails.candidateName = this.candidateInductionPlan.candidateInductionPlanShedule.candidateFullName;
      this.inductionDetails.location = this.candidateInductionPlan.candidateInductionPlanShedule.locationName;
      this.inductionDetails.department = this.candidateInductionPlan.candidateInductionPlanShedule.departmentName;
      // this.inductionDetails.candidateName = this.candidateInductionPlan.candidateInductionPlanShedule.candidateFullName;
      this.inductionDetails.grade = this.candidateInductionPlan.candidateInductionPlanShedule.gradeName;
      this.inductionDetails.batchNo = this.candidateInductionPlan.candidateInductionPlanShedule.batchId == null ? "" : this.candidateInductionPlan.candidateInductionPlanShedule.batchId.toString();
      this.inductionDetails.function = this.candidateInductionPlan.candidateInductionPlanShedule.functionName;
      this.inductionDetails.position = this.candidateInductionPlan.candidateInductionPlanShedule.positionName;
      this.inductionDetails.joiningDate = this.candidateInductionPlan.candidateInductionPlanShedule.dateofJoining;
    }
    if (this.candidateInductionPlan.candidateInductionPlanShedules.length > 0) {
      this.candidateInductionPlan.candidateInductionPlanShedules.forEach(element => {
        var existed = this.inductionDetails.inductionList.find(e => e.trainingTittle == element.traingTitle);
        if (existed == null) {
          let obj = {
            trainingTittle: element.traingTitle,
            trainingTittleId: element.trainingTittleId,
            trainingDetails: []
          }
          this.inductionDetails.inductionList.push(obj);
        }
      })
      //console.log("Induction Details After push only name", this.inductionDetails);
     // console.log("CandidateInductionPlan", this.candidateInductionPlan);

      this.inductionDetails.inductionList.forEach(element => {
        this.candidateInductionPlan.candidateInductionPlanShedules.forEach(plan_element => {
          if (element.trainingTittle == plan_element.traingTitle) {
            this.accommodation = null;
            this.candidateInductionPlan.candidateInductionPlanAccomodations.forEach(e => {
              if (e.locationId == plan_element.locationId) {
                this.accommodation = this.candidateInductionPlan.candidateInductionPlanAccomodations.find(loc => loc.locationId).accomodation;
              }
            })
            //console.log("accommodationObj", this.accommodation);
            let trainingDetailsObj = {
              inductionDate: plan_element.dateFrom,
              // fromTime: plan_element.timeFrom,
              // toTime: plan_element.timeTo,
              fromTime: plan_element.timeFrom == '' ? plan_element.timeFrom : plan_element.timeFrom.substring(0, plan_element.timeFrom.length - 3),
              toTime: plan_element.timeTo == '' ? plan_element.timeTo : plan_element.timeTo.substring(0, plan_element.timeTo.length - 3),
              detailsOfSession: plan_element.detailsofSession,
              location: plan_element.locationName,
              venue: plan_element.inductionVenueName,
              persontoMeet: plan_element.trainerName,
              accommodationRequire: this.accommodation == null ? "NO" : "YES",
              remarks: ""
            }
            element.trainingDetails.push(trainingDetailsObj);
          }
        })

      })
     // console.log("Induction Details For PDF", this.inductionDetails);
      this.inductionData = this.inductionDetails;
      //console.log("chck", this.inductionData)
    }

  }
  downloadInductionDetails() {
    var htmlstring = document.getElementById("printerInductiondiv").innerHTML;
    var dom = document.createElement('div');
    dom.innerHTML = htmlstring;
    html2pdf(dom, {
      margin: 10,
      filename: "Induction_Details.pdf",
      image: { type: 'jpeg', quality: 0.98 },
      //html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      html2canvas: { scale: 3, y: 0, scrollY: 0 },
      //jsPDF: { format: 'A4' },
      //jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      jsPDF: { format: 'A4', orientation: 'landscape' },
      //jsPDF: { format: 'A4', orientation: 'portrait' },
    });
  }

  downloadAccommodationDetails() {
    var htmlstring = document.getElementById("printerAccommodationdiv").innerHTML;
    var dom = document.createElement('div');
    dom.innerHTML = htmlstring;
    html2pdf(dom, {
      margin: 10,
      filename: "Accommodation_Details.pdf",
      image: { type: 'jpeg', quality: 0.98 },
      //html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      html2canvas: { scale: 3, y: 0, scrollY: 0 },
      //jsPDF: { format: 'A4' },
      //jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      jsPDF: { format: 'A4', orientation: 'landscape' },
    });
  }



}
