import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { ICandidateWelcomeAcknowledgement } from '../../../../interfaces/prejoining/candidate.interface';
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
import { RequisitionService } from '../../../../services/preselection/requisition/requisition.service';
import { IBatch, ISearchBatch } from '../../../../interfaces/common/common.interface';
import { IcandidateremarksList } from 'src/app/interfaces/preselection/candidate.interface';
declare var jQuery: any;


@Component({
  selector: 'app-welcomeacknowledgement',
  templateUrl: './welcomeacknowledgement.component.html',
  styleUrls: ['./welcomeacknowledgement.component.css']
})
export class WelcomeacknowledgementComponent implements OnInit {
  getWelcomeAcknowledgementForm: FormGroup;
  saveWelcomeAcknowledgementForm: FormGroup;
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  candidateId: number;
  candidateWelcomeAcknowledgementDetails: ICandidateWelcomeAcknowledgement[] = [];
  readonly: boolean = false;
  coordinatorRemarks: any[] = [];
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private requisitionService: RequisitionService,
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
    private candidateService: CandidateService
  ) {
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.candidateId = this.persistance.get('loggedinuser').candidateId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    //this.requisitionDetailId = this.persistance.get('paramid');
    this.createGetWelcomeAcknowledgementForm();
    this.createSaveWelcomeAcknowledgementForm();
    this.getCandidateWelcomeAcknowledgementDetails();
  }

  ngOnInit() {
    this.getRemarksDetails();
  }
  remarksDetails: IcandidateremarksList = {
    CandidateId: 0,
    RequisitionDetailId: 0,
    HiringStatusId: 0,
    IsActive: false
  }
  candidateremarksList: any[] = [];
  createGetWelcomeAcknowledgementForm() {
    this.getWelcomeAcknowledgementForm = this.fb.group({
      candidateId: this.candidateId,
      candidateName: [''],
      requisitionNo: [''],
      //verticalId: Number(this.verticalIds),
      verticalId: null,
      locationId: null,
      functionId: null,
      gradeId: null,
      documentStatusId: null,
      employeeMedicalId: null,
      hiringStatusId: null,
    });
  }
  createSaveWelcomeAcknowledgementForm() {
    this.saveWelcomeAcknowledgementForm = this.fb.group({
      candidateId: this.candidateId,
      remarks: "",
      mailingStatus: null,
      isActive: true,
      createdBy: this.loginUserId,
    });
  }
  getCandidateWelcomeAcknowledgementDetails() {
    this.candidateWelcomeAcknowledgementDetails = [];
    this.candidateService.getCandidateWelcomeAcknowledgementDetails(this.getWelcomeAcknowledgementForm.value).subscribe((result) => {
      if (result) {
        this.candidateWelcomeAcknowledgementDetails = result;
       // console.log("Welcome Acknowlwdge Details", this.candidateWelcomeAcknowledgementDetails);
        this.requisitionDetailId = this.candidateWelcomeAcknowledgementDetails[0].requisitionDetailId;
      //  console.log("Requisition Detailsid", this.requisitionDetailId);
        if (this.candidateWelcomeAcknowledgementDetails.length > 0) {
          if (this.candidateWelcomeAcknowledgementDetails[0].swcMailingStatus == 49 || this.candidateWelcomeAcknowledgementDetails[0].swcMailingStatus == 50) {
            this.readonly = true;
            this.saveWelcomeAcknowledgementForm.patchValue({
              mailingStatus: this.candidateWelcomeAcknowledgementDetails[0].swcMailingStatus,
              //remarks: this.candidateWelcomeAcknowledgementDetails[0].remarks
            })

          } else {
            this.readonly = false;
          }
        } else {
          this.readonly = true;
        }
        if (this.candidateWelcomeAcknowledgementDetails[0].onboardingCoordinatorReamrks != "") {
          this.coordinatorRemarks = this.candidateWelcomeAcknowledgementDetails[0].onboardingCoordinatorReamrks.split(",");
        }
        // alert(this.readonly)
        // console.log("Welcome Acknowledgement Details", this.candidateWelcomeAcknowledgementDetails);
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

  onChangeAcknowledgementType(acknowledgementType) {
    if (acknowledgementType == "A") {
      this.saveWelcomeAcknowledgementForm.patchValue({
        mailingStatus: 50
      })
    } else {
      this.saveWelcomeAcknowledgementForm.patchValue({
        mailingStatus: 49
      })
    }
  }
  getRemarksDetails() {
    this.remarksDetails = {
      CandidateId: this.candidateId,
      RequisitionDetailId: 0,
      HiringStatusId: 0,
      IsActive: false
    }
    this.requisitionService.getCandidateHigringAction(this.remarksDetails).subscribe((result) => {
      if (result) {
        this.candidateremarksList = result;
        //console.log("Remarks Details-", result);
      }
      else {
        this.candidateremarksList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  onClickFinalSubmit(confirmationType) {
    if (confirmationType == "Y") {
      let finalObj = {
        ShareWithCandidateHeaderId: null,
        ShareWithCandidates: [],
        CandidateId: this.candidateId,
        Remarks: this.saveWelcomeAcknowledgementForm.value.remarks,
        MailingStatus: this.saveWelcomeAcknowledgementForm.value.mailingStatus,
        IsActive: true,
        CreatedBy: this.loginUserId,
      }
      var flag = 0;
      var msg = "";
      if (this.saveWelcomeAcknowledgementForm.value.mailingStatus == null) {
        flag = 1;
        msg = "Please select acknowledgement";
      }
      else {

      }
      if (this.saveWelcomeAcknowledgementForm.value.mailingStatus == 49) {
        if (this.saveWelcomeAcknowledgementForm.value.remarks == "") {
          flag = 1;
          msg = "Please Enter Remarks";
        }
        else {

        }
        // flag = 1;
        // msg = "Please select acknowledgement";
      }
      if (flag == 0) {

        let finalSubmitObj = {
          shareWithCandidateHeaderId: this.candidateWelcomeAcknowledgementDetails[0].shareWithCandidateHeader,
          shareWithCandidates: [],
          candidateId: this.candidateId.toString(),
          remarks: this.saveWelcomeAcknowledgementForm.value.remarks,
          mailingStatus: this.saveWelcomeAcknowledgementForm.value.mailingStatus,
          isActive: true,
          createdBy: this.loginUserId,
        }
        let shareWithCandidateObj = {
          shareWithCandidateId: this.candidateId,
          templateId: null,
          shareWithCandidateHeaderId: null,
          candidateJoiningDocumentId: null,
          candidateRequisitionDetailsId: this.requisitionDetailId,
          candidateInductionScheduleDetailsId: null,
          candidateId: this.candidateId,
          templateBody: null,
          isSend: false
        }
        finalSubmitObj.shareWithCandidates.push(shareWithCandidateObj);
        //  console.log("Final Submit Welcome Obj", finalSubmitObj);

        this.SpinnerService.show();
        this.candidateService.saveWelcomeAcknowledgement(finalSubmitObj).subscribe((result) => {
          if (result) {
            if (result.successFlag == 0) {
              this.SpinnerService.hide();
              this.notificationService.showError(result.msg, "Error");
            }
            else {
              this.SpinnerService.hide();
              this.notificationService.showSuccess(result.msg, "Success");
              this.getCandidateWelcomeAcknowledgementDetails();
              this.createSaveWelcomeAcknowledgementForm();
              jQuery("#radio1").prop('checked', false);
              jQuery("#radio2").prop('checked', false);
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
}


