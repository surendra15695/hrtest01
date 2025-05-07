import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../interfaces/common/doctor.interface';
import { ICandidateAssessmentData, ICandidateAssessmentDetails, ICandidateMedicalReimbursement, ICandidateTravelReimbursement, IEmployeeTravelAttachmentDetails, IEmployeeTravelJourneyDetails, ISearchCandidateAssessment, ISearchCandidateMedicalReimbursement, ISearchCandidateTravelReimbursement } from '../../../../interfaces/joining/candidate.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import { IAssessemenrAssignReleaseList, IBatchAssessment, ICandidateAssessmentList, ISearchAssessmentAssignReleaseList } from '../../../../interfaces/joining/programcoordinator.interface';
import { LocationService } from '../../../../services/common/location/location.service';
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
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
declare var jQuery: any;

@Component({
  selector: 'app-cdtravelreimbursementlist',
  templateUrl: './cdtravelreimbursementlist.component.html',
  styleUrls: ['./cdtravelreimbursementlist.component.css']
})
export class CdtravelreimbursementlistComponent implements OnInit {

  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  candidateId: number;
  searchCandidateTravelReimbursement: ISearchCandidateTravelReimbursement = {
    candidateId: null,
    candidateTravelReimbursementId: null,
  }
  candidateTravelReimbursementList: ICandidateTravelReimbursement[] = [];
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
    private titleService: Title,
    private positionService: PositionService,
    private candidateService: CandidateService
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    //this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.candidateId = this.persistance.get('loggedinuser').candidateId;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.searchCandidateTravelReimbursement.candidateId = this.candidateId;
    this.getCandidateTravelReimbursement();
  }

  ngOnInit() {
    this.tableOptionDropDown();
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
  getCandidateTravelReimbursement() {
    this.candidateTravelReimbursementList = [];
   // console.log("Search Travel Reimbursement Obj", this.searchCandidateTravelReimbursement);

    this.candidateService.getCandidateTravelReimbursement(this.searchCandidateTravelReimbursement).subscribe((result) => {
      if (result.length>0) {
        var x = result[result.length-1]
        this.candidateTravelReimbursementList.push(x);
        //console.log("Travel Reimbursement List", this.candidateTravelReimbursementList);
        this.SpinnerService.hide();
      }
      else {
        //this.candidateAssessmentDataList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  onClickClaimReimbursement(data) {
    jQuery(".custom-menu").hide();
    this._route.navigate(['/app/career/travel-reimbursement-details'], { queryParams: { CandidateId: data.candidateId, CandidateTravelReimbursementId: data.candidateTravelReimbursementId, Mode: "Edit" } });
  }
  onClickEditReimbursement(data) {
    jQuery(".custom-menu").hide();
    this._route.navigate(['/app/career/travel-reimbursement-details'], { queryParams: { CandidateId: data.candidateId, CandidateTravelReimbursementId: data.candidateTravelReimbursementId, ApprovalRemarks: data.approvalRemarks, Mode: "Edit" } });
  }
  onClickView(data) {
    jQuery(".custom-menu").hide();
    this._route.navigate(['/app/career/travel-reimbursement-details'], { queryParams: { CandidateId: data.candidateId, CandidateTravelReimbursementId: data.candidateTravelReimbursementId, ApprovalRemarks: data.approvalRemarks, Mode: "View" } });
  }

}
