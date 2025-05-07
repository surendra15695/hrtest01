import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../interfaces/common/doctor.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import { IPendingAccommodationBatchWise, IPendingAccommodationIndividual, IProcessedAccommodationIndividual, IProcessedAccomodationBatchWise } from '../../../../interfaces/prejoining/trainingincharge.interface';
import { IJoinersList, IPendingScheduleBatchWise, IPendingScheduleIndividual, IScheduledBatchWise, IScheduledIndividually } from '../../../../interfaces/prejoining/joinerslist.interface';
import { IOnboardingCoordinator, ISearchOnboardingCoordinator, IVenue, ISearchVenue } from '../../../../interfaces/prejoining/onboardingcoordinator.interface';
import { IFillAccommodation, ITrainingAccomodationCandidate, ITrainingAccomodationCandidateList, ITrainingAccomodationRequiredCandidateList } from '../../../../interfaces/prejoining/trainingincharge.interface';
import { LocationService } from '../../../../services/common/location/location.service';
import { CommonService } from '../../../../services/common/common/common.service';
import { FunctionService } from '../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../services/common/department/department.service';
import { PositionService } from '../../../../services/common/position/position.service';
import { TraininginchargeService } from '../../../../services/prejoining/trainingincharge/trainingincharge.service';
import { ShareddataService } from '../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { JoinersService } from '../../../../services/prejoining/onboardingcoordinator/joiners.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { IApproverVertical, IApproverFunction, IApproverDepartment, IApproverVerticalFunctionDepartment, IApproverFunctionDepartment, IBatch, ISearchBatch } from '../../../../interfaces/common/common.interface';
import { IFunctionDepartment, ISearchDepartment } from 'src/app/interfaces/common/department.interface';
import { element } from 'protractor';
declare var jQuery: any;

@Component({
  selector: 'app-fillaccommodation',
  templateUrl: './fillaccommodation.component.html',
  styleUrls: ['./fillaccommodation.component.css']
})
export class FillaccommodationComponent implements OnInit {
  searchFillAccommodationForm: FormGroup;
  saveForm: FormGroup;
  searchForm: FormGroup;
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  fillAccommodationFor: string;
  accommodationForId: any;
  accommodationFromDate: string;
  accommodationTodate: string;
  fillAccommodationAllDetails: IFillAccommodation;
  // fillAccommodationDetails: ITrainingAccomodationCandidate[] = [];
  // fillAccommodationCandidateDetails: ITrainingAccomodationCandidateList[] = [];
  trainingAccomodationCandidateList: any[] = [];
  trainingAccomodationCandidateListForView: any[] = [];                        // By Anif on 04-05-2023
  //trainingAccomodationCandidateList: ITrainingAccomodationCandidateList[] = [];
  //trainingAccomodationRequiredCandidateList: ITrainingAccomodationRequiredCandidateList[] = [];
  trainingAccomodationRequiredCandidateList: any[] = [];
  fillAccommodationDetails: any;
  //fillAccommodationCandidateDetails: any[] = [];
  fillAccommodationCandidateDetails_Array: any[] = [];
  candidateId: number;
  candidateName: string;

  //chckbox: boolean = false;
  candidateNo: string;
  candidateAccomodationHeaderId: number;
  trainingInchageAccomodationDetailsId: number;
  accommodationDetails: string;
  accommodationDetailsArray: any[] = [];
  candidateList: any[] = [];
  candidateArray: any[] = [];
  candidateArrayForView: any[] = [];           // Added By anif on 04-09-2023
  candidateArrayForNameAndNo: any[] = [];
  candidateNameIndividual: string;
  inductionLocation: number;
  candidateAccommodationDetailsId: number;
  //chckselectall: boolean = false;

  parentActiveTab: string;
  childActiveTab: string;
  selectAll: boolean = false;
  candidateAccomodation: string = "";
  arr: any[] = []
  fromDateToShow: any;    // Added By anif on 22-12-2022
  toDateToShow: any;      // Added By anif on 22-12-2022
  showAccommodationDetails: boolean = false;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private functionService: FunctionService,
    private commonService: CommonService,
    private traininginchagerservice: TraininginchargeService,
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
    //this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.parentActiveTab = this.persistance.get("parentActiveTabAc");
    this.childActiveTab = this.persistance.get("childActiveTabAc");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.fillAccommodationFor = params['FillAccommodationFor'];
      this.accommodationForId = params['FillAccommodationForId'];
      this.accommodationFromDate = params['FillAccommodationFromDate'];
      this.accommodationTodate = params['FillAccommodationToDate'];
      this.inductionLocation = params['Location'];
      this.candidateAccommodationDetailsId = params['AccommodationDetailsId'];
      this.fromDateToShow = params['FillAccommodationFromDate'];
      this.toDateToShow = params['FillAccommodationToDate'];
      if (this.fillAccommodationFor == "Candidate") {
        this.candidateNameIndividual = params['CandidateName'];
      }
    });
    this.createFillAccommodationSearchForm();
    this.createSearchForm();
    this.createSaveForm();
    this.updateFormValue();
    this.getAllDetailsForFillAccommodation();
  }

  ngOnInit() {
    this.arr = [];
    // this.chckbox = false
    //this.chckselectall = false;
  }



  createFillAccommodationSearchForm() {
    this.searchFillAccommodationForm = this.fb.group({
      batchId: null,
      candidateId: null,
      candidateAccomodationDetailsId: null,
      candidateAccomodationHeaderId: null,
      locationId: null,
      autoUserId: this.persistance.get('loggedinuser').autoUserId
    });
  }
  createSaveForm() {
    this.saveForm = this.fb.group({
      trainingInchageAccomodationDetailsId: null,
      candidateAccomodationHeaderId: null,
      candidateId: null,
      trainingInchargeId: null,
      accomodation: [''],
      isActive: true
    });
  }
  createSearchForm() {
    this.searchForm = this.fb.group({
      batchId: [Number(this.accommodationForId)],
      onBordingMangerId: [0],
      onBordingCoordinatorId: [0],
      dtofJoiningFrom: [''],
      dtofJoiningTo: [''],
      candidateName: [''],
      verticalId: [0],
      locationId: [0],
      functionId: [0],
    });
  }
  updateFormValue() {
    if (this.fillAccommodationFor == "Candidate") {
      this.searchFillAccommodationForm.patchValue({
        candidateId: Number(this.accommodationForId),
        candidateAccomodationDetailsId: Number(this.candidateAccommodationDetailsId),
        locationId: Number(this.inductionLocation)
      })
    } else {
      this.searchFillAccommodationForm.patchValue({
        batchId: Number(this.accommodationForId),
        candidateAccomodationDetailsId: null,
        locationId: Number(this.inductionLocation)

      })
    }
  }
 

  getAllDetailsForFillAccommodation() {
    this.SpinnerService.show();
    this.traininginchagerservice.getAllFillAccommodationDetails(this.searchFillAccommodationForm.value).subscribe((result) => {
      if (result) {
        if (result.trainingAccomodationCandidate != null && result.trainingAccomodationRequiredCandidateList.length > 0) {
          this.showAccommodationDetails = true;
          this.fillAccommodationAllDetails = result;
          // console.log("Accommodation All Details", this.fillAccommodationAllDetails);
          this.fillAccommodationDetails = this.fillAccommodationAllDetails.trainingAccomodationCandidate;
          // this.fillAccommodationCandidateDetails = this.fillAccommodationAllDetails.trainingAccomodationCandidateDetails;
          this.trainingAccomodationCandidateList = this.fillAccommodationAllDetails.trainingAccomodationCandidateDetails;
          this.trainingAccomodationCandidateListForView = JSON.parse(JSON.stringify(this.fillAccommodationAllDetails.trainingAccomodationCandidateDetails));  // By Anif on 04-05-2023
          // console.log("Accommodation Candidate Details", this.trainingAccomodationCandidateList);
          this.trainingAccomodationRequiredCandidateList = this.fillAccommodationAllDetails.trainingAccomodationRequiredCandidateList;
          if (this.trainingAccomodationRequiredCandidateList.length > 0) {
            this.trainingAccomodationRequiredCandidateList.forEach(element => {
              var checkExisted = this.candidateArray.find(e => e.candidateAccomodationDetailsId == element.candidateAccomodationDetailsId && e.candidateInductionScheduleDetailsId == element.candidateInductionScheduleDetailsId);
              if (checkExisted == undefined) {

                // const [fday, fmonth, fyear] = element.fromDate.split('/');   // By anif on 04-05-2023
                // const fdate = new Date(fyear, fmonth - 1, fday);             // By anif on 04-05-2023
                // const [tday, tmonth, tyear] = element.toDate.split('/');     // By anif on 04-05-2023
                // const tdate = new Date(tyear, tmonth - 1, tday);             // By anif on 04-05-2023
                let candidateObj = {
                  candidateName: element.fullName,
                  candidateId: element.candidateId,
                  candidateNo: element.candidateNo,
                  fromDate: element.fromDate,
                  toDate: element.toDate,
                  //fromDateDateFormat: fdate,              // By anif on 04-05-2023
                  //toDateDateFormat: tdate,                // By anif on 04-05-2023
                  isChecked: false,
                  candidateAccomodationDetailsId: element.candidateAccomodationDetailsId,
                  candidateInductionScheduleDetailsId: element.candidateInductionScheduleDetailsId,
                  traingTitle: element.traingTitle
                }
                this.candidateArray.push(candidateObj)
              }
            })
          }
          // Removed already added accommodation candiadte
          if (this.trainingAccomodationCandidateList.length > 0) {
            this.trainingAccomodationCandidateList.forEach(element => {
              //this.candidateArray = this.candidateArray.filter(e => e.candidateId != element.candidateId || e.fromDate != element.fromDate || e.toDate != element.toDate);
              this.candidateArray = this.candidateArray.filter(e => e.candidateAccomodationDetailsId != element.candidateAccomodationDetailsId);
            })
          }

          // Added By anif on 04-09-2023 from here
          if (this.candidateArray.length > 0) {
            this.candidateArray.forEach((cnd_ele, index) => {
              // var checkContinuityExisted = this.candidateArrayForView.find(e => e.toDateDateFormat == cnd_ele.fromDateDateFormat && e.candidateId == cnd_ele.candidateId);
              var checkContinuityExisted = this.candidateArrayForView.find(e => e.toDate == cnd_ele.fromDate && e.candidateId == cnd_ele.candidateId);
              // Check Same Data Existed or not
              var checkDuplicateDataExisted = this.candidateArrayForView.find(e => e.fromDate == cnd_ele.fromDate && e.toDate == cnd_ele.toDate && e.candidateId == cnd_ele.candidateId);
              if (checkContinuityExisted == undefined && checkDuplicateDataExisted == undefined) {
                let candidateContinuityObj = {
                  candidateName: cnd_ele.candidateName,
                  candidateId: cnd_ele.candidateId,
                  candidateNo: cnd_ele.candidateNo,
                  fromDate: cnd_ele.fromDate,
                  toDate: cnd_ele.toDate,
                  //fromDateDateFormat: cnd_ele.fromDateDateFormat,
                  //  toDateDateFormat: cnd_ele.toDateDateFormat,
                  isChecked: false,
                  candidateAccomodationDetailsId: cnd_ele.candidateAccomodationDetailsId.toString(),
                  candidateInductionScheduleDetailsId: cnd_ele.candidateInductionScheduleDetailsId.toString(),
                  traingTitle: cnd_ele.traingTitle
                }
                this.candidateArrayForView.push(candidateContinuityObj);

              } else {
                this.candidateArrayForView.forEach(canview_ele => {
                  //if (canview_ele.toDateDateFormat == cnd_ele.fromDateDateFormat && canview_ele.candidateId == cnd_ele.candidateId) {
                  if (checkDuplicateDataExisted == undefined) {
                    if (canview_ele.toDate == cnd_ele.fromDate && canview_ele.candidateId == cnd_ele.candidateId) {
                      canview_ele.toDate = cnd_ele.toDate,
                        canview_ele.candidateInductionScheduleDetailsId += "," + cnd_ele.candidateInductionScheduleDetailsId.toString(),
                        canview_ele.candidateAccomodationDetailsId += "," + cnd_ele.candidateAccomodationDetailsId.toString()
                    }
                  } else {
                    if (canview_ele.fromDate == cnd_ele.fromDate && canview_ele.toDate == cnd_ele.toDate && canview_ele.candidateId == cnd_ele.candidateId) {
                      canview_ele.toDate = cnd_ele.toDate,
                        canview_ele.candidateInductionScheduleDetailsId += "," + cnd_ele.candidateInductionScheduleDetailsId.toString(),
                        canview_ele.candidateAccomodationDetailsId += "," + cnd_ele.candidateAccomodationDetailsId.toString()
                    }
                  }

                })
              }
            })
          }
          // Added By anif on 04-09-2023 till this


          /* Probably not required Start*/
          // if (this.fillAccommodationFor == "Batch") {
          //   this.getCandidateList();
          // } else {
          //   this.getCandidateDetails();
          // }
          /* Probably not required End*/
        } else {
          this.showAccommodationDetails = false;
        }
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
  // getCandidateList() {
  //   this.SpinnerService.show();
  //   this.joinersservice.getAllBatchWiseCandidateDetails(this.searchForm.value).subscribe((result) => {
  //     if (result) {
  //       this.candidateList = result;
  //       console.log(result);
  //       //console.log("candidate list", this.candidateList);
  //       if (this.candidateList.length > 0) {
  //         this.candidateList.forEach(element => {
  //           let candidateObj = {
  //             candidateName: element.candidateFullName,
  //             candidateId: element.candidateId,
  //             candidateNo: element.candidateNo
  //           }
  //           this.candidateArray.push(candidateObj);
  //           this.candidateArrayForNameAndNo.push(candidateObj);

  //         })
  //       }
  //       if (this.trainingAccomodationCandidateList.length > 0) {
  //         this.trainingAccomodationCandidateList.forEach(element => {
  //           this.candidateArray = this.candidateArray.filter(e => e.candidateId != element.candidateId)
  //         })
  //       }

  //     }
  //     else {
  //       this.candidateList = [];
  //       this.SpinnerService.hide();
  //     }
  //   }, error => {
  //     console.log(error);
  //     this.SpinnerService.hide();
  //   }, () => {
  //     //this.loadSelectPicker();
  //     this.SpinnerService.hide();
  //   });
  // }

  // getCandidateDetails() {
  //   let candidateObj = {
  //     candidateName: this.candidateNameIndividual,
  //     candidateId: this.fillAccommodationDetails.candidateId,
  //     candidateNo: this.fillAccommodationDetails.candidateNo
  //   }
  //   this.candidateArray.push(candidateObj)
  //   if (this.trainingAccomodationCandidateList.length > 0) {
  //     this.trainingAccomodationCandidateList.forEach(element => {
  //       this.candidateArray = this.candidateArray.filter(e => e.candidateId != element.candidateId)
  //     })
  //   }
  //   // console.log("Candidate List", this.candidateArray);
  // }
  onChangeCandidate() {
    // var obj = this.candidateArray.find(e => e.candidateId == this.saveForm.value.candidateId);
    // this.candidateName = obj.candidateName;
    // this.candidateNo = obj.candidateNo;
    // this.candidateAccomodationHeaderId = obj.candidateAccomodationHeaderId;
    // this.trainingInchageAccomodationDetailsId = obj.trainingInchageAccomodationDetailsId;
    // console.log(this.saveForm.value.candidateId);
    ///

    // if (this.saveForm.value.candidateId.length > 0) {
    //   this.saveForm.value.candidateId.forEach(element => {
    //     this.candidateArray = this.candidateArray.filter(e => e.candidateId != element)
    //   })
    // }

  }

  onCheckAll(eve) {
    if (eve.target.checked) {
      this.selectAll = true;
      this.candidateArray.forEach(element => {
        element.isChecked = true;
      })
      this.candidateArrayForView.forEach(element => {         // Added By anif on 04-05-2023
        element.isChecked = true;
      })
    } else {
      this.selectAll = false;
      this.candidateArray.forEach(element => {
        element.isChecked = false;
      })
      this.candidateArrayForView.forEach(element => {          // Added By anif on 04-05-2023
        element.isChecked = false;
      })
    }
    // this.chckbox = true;
    // this.chckselectall = true;
  }

  select(eve, rec) {
    if (eve.target.checked) {
      rec.isChecked = true;
      // By Anif on 04-05-2023 from here
      var scheduleDetailsIds = rec.candidateInductionScheduleDetailsId.split(",");
      // console.log("Schedule Details Array", scheduleDetailsIds);
      scheduleDetailsIds.forEach(details_ele => {
        this.candidateArray.forEach(cd_ele => {
          if (cd_ele.candidateInductionScheduleDetailsId == Number(details_ele) && cd_ele.candidateId == rec.candidateId) {
            cd_ele.isChecked = true;
          }
        })
      })
      // By Anif on 04-05-2023 till this
      var chkAllChecked = this.candidateArray.find(e => e.isChecked == false);
      if (chkAllChecked == undefined) {
        this.selectAll = true;
      }
    } else {
      rec.isChecked = false;
      this.selectAll = false;
      // By Anif on 04-05-2023 from here
      var scheduleDetailsIds = rec.candidateInductionScheduleDetailsId.split(",");
      scheduleDetailsIds.forEach(details_ele => {
        this.candidateArray.forEach(cd_ele => {
          if (cd_ele.candidateInductionScheduleDetailsId == Number(details_ele) && cd_ele.candidateId == rec.candidateId) {
            cd_ele.isChecked = false;
          }
        })
      })
      // By Anif on 04-05-2023 till this
    }
  }
  onClickAdd() {
    this.candidateArray.forEach(element => {
      if (element.isChecked) {
        let trainigCandidateObj = {
          candidateAccomodationHeaderId: null,
          trainingInchageAccomodationDetailsId: null,
          candidateId: element.candidateId,
          candidateNo: element.candidateNo,
          candidateName: element.candidateName,
          accomodation: this.candidateAccomodation,
          fromDate: element.fromDate,
          toDate: element.toDate,
          candidateAccomodationDetailsId: element.candidateAccomodationDetailsId
        }
        this.trainingAccomodationCandidateList.push(trainigCandidateObj);
      }
    })

    this.trainingAccomodationCandidateList.forEach(element => {
      this.candidateArray = this.candidateArray.filter(e => e.candidateAccomodationDetailsId != element.candidateAccomodationDetailsId);   //  && e.candidateId!=element.candidateId
    })

    // By Anif on 04-05-2023 from here

    this.candidateArray.forEach(element => {
      element.isChecked = false;
    })


    this.candidateArrayForView.forEach(element => {
      if (element.isChecked) {
        let trainigCandidateForViewObj = {
          candidateAccomodationHeaderId: null,
          trainingInchageAccomodationDetailsId: null,
          candidateId: element.candidateId,
          candidateNo: element.candidateNo,
          candidateName: element.candidateName,
          accomodation: this.candidateAccomodation,
          fromDate: element.fromDate,
          toDate: element.toDate,
          candidateAccomodationDetailsId: element.candidateAccomodationDetailsId,
          candidateInductionScheduleDetailsId: element.candidateInductionScheduleDetailsId
        }
        this.trainingAccomodationCandidateListForView.push(trainigCandidateForViewObj);
      }
    })
    this.trainingAccomodationCandidateListForView.forEach(element => {
      this.candidateArrayForView = this.candidateArrayForView.filter(e => e.candidateAccomodationDetailsId != element.candidateAccomodationDetailsId );  // && e.candidateId!=element.candidateId
    })
    // By Anif on 04-05-2023 till this

    this.selectAll = false;
    this.candidateAccomodation = "";
  }

  onClickDelete(data, index) {
    // Added By Anif on 04-05-2023 from here
    this.trainingAccomodationCandidateListForView.splice(index, 1);

    var accommodationDetailsIdsForDelete = data.candidateAccomodationDetailsId.split(",");
    accommodationDetailsIdsForDelete.forEach(del_ele => {
      this.trainingAccomodationCandidateList.forEach((element, index) => {
        if (Number(del_ele) == element.candidateAccomodationDetailsId) {
          this.trainingAccomodationCandidateList.splice(index, 1);
        }
      })
    })

    accommodationDetailsIdsForDelete.forEach(del_ele => {
      this.candidateArray.forEach((element, index) => {
        if (Number(del_ele) == element.candidateAccomodationDetailsId) {
          element.isChecked = false;
        }
      })
    })

    // let candidateObj = {                     // Removed By Anif on 04-05-2023
    //   candidateId: data.candidateId,
    //   candidateName: data.candidateName,
    //   candidateNo: data.candidateNo,
    //   fromDate: data.fromDate,
    //   toDate: data.toDate,
    //   isChecked: false
    // }
    // this.candidateArray.push(candidateObj);

    let candidateForViewObj = {                     // Added By Anif on 04-05-2023
      candidateId: data.candidateId,
      candidateName: data.candidateName,
      candidateNo: data.candidateNo,
      fromDate: data.fromDate,
      toDate: data.toDate,
      candidateAccomodationDetailsId: data.candidateAccomodationDetailsId,
      candidateInductionScheduleDetailsId: data.candidateInductionScheduleDetailsId,
      isChecked: false
    }
    this.candidateArrayForView.push(candidateForViewObj);
    // Added By Anif on 04-05-2023 till here
  }
  onClickFinalSubmit() {
    //if (this.trainingAccomodationCandidateList.length > 0) {
    if (this.candidateArrayForView.length == 0) {
      let finalSubmitObj = {
        candidateAccomodationHeaderId: this.fillAccommodationDetails.candidateAccomodationHeaderId,
        batchId: this.fillAccommodationFor == "Candidate" ? null : Number(this.accommodationForId),
        candidateId: this.fillAccommodationFor == "Candidate" ? Number(this.accommodationForId) : null,
        // isActive: true,
        fromDate: this.fillAccommodationDetails.dateFrom,
        toDate: this.fillAccommodationDetails.dateTo,
        location: this.fillAccommodationDetails.location,
        inductionVenue: this.fillAccommodationDetails.inductionVenue,
        trainingInchargeAccomodationDetails: [],
        createdBy: this.loginUserId

      }
      this.trainingAccomodationCandidateList.forEach(element => {
        let trainingInchargeAccomodationDetailsObj = {
          trainingInchageAccomodationDetailsId: element.trainingInchageAccomodationDetailsId,
          candidateAccomodationHeaderId: element.candidateAccomodationHeaderId,
          candidateId: element.candidateId,
          accomodation: element.accomodation,
          // Added on 27-04 
          CandidateAccomodationDetailsId: element.candidateAccomodationDetailsId
        }
        finalSubmitObj.trainingInchargeAccomodationDetails.push(trainingInchargeAccomodationDetailsObj);
      })
      this.SpinnerService.show();
      this.traininginchagerservice.saveAccommodationDetails(finalSubmitObj).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.accommodationDetailsArray = [];
            this.updateFormValue();
            this.persistance.set('parentActiveTabAc', this.parentActiveTab);
            this.persistance.set('childActiveTabAc', this.childActiveTab);
            this._route.navigate(['/app/manage-accomodation']);
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
      this.notificationService.showError("Please fill all details", "Error");
    }
  }
  onClickCancel() {
    //this.accommodationDetailsArray = [];
    this.trainingAccomodationCandidateList = [];
    this.trainingAccomodationCandidateListForView = [];      // By Anif on 04-05-2023
    this.candidateArray = [];                                  // By Anif on 04-05-2023
    this.candidateArrayForView = [];                           // By Anif on 04-05-2023
    this.getAllDetailsForFillAccommodation();
  }
  onBackClick() {
    this.persistance.set('parentActiveTabAc', this.parentActiveTab);
    this.persistance.set('childActiveTabAc', this.childActiveTab);
    this._route.navigate(['/app/manage-accomodation']);
  }
  // Test
}
