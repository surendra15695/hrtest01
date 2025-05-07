import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../interfaces/common/doctor.interface';
import { INoticePeriodBuyouteReimbursement, INoticePeriodBuyouteReimbursementNew, ISearcheNoticePeriodBuyouteReimbursement } from '../../../../interfaces/joining/candidate.interface';
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
  selector: 'app-noticperiodbuyoutreimbursementlist',
  templateUrl: './noticperiodbuyoutreimbursementlist.component.html',
  styleUrls: ['./noticperiodbuyoutreimbursementlist.component.css']
})
export class NoticperiodbuyoutreimbursementlistComponent implements OnInit {

  RemarksName: string;
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  candidateId: number;
  searchNoticPeriodBuyOutReimbursement: ISearcheNoticePeriodBuyouteReimbursement = {
    candidateId: null,
    requisitionDetailId: null,
    candidateNoticePeriodBuyOutDaysId: null,
    empId: null,
  }
  noticePeriodBuyOutReimbursement: INoticePeriodBuyouteReimbursementNew[] = [];
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
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.candidateId = this.persistance.get('loggedinuser').candidateId;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.searchNoticPeriodBuyOutReimbursement.candidateId = this.candidateId;
   // this.searchNoticPeriodBuyOutReimbursement.requisitionDetailId = this.requisitionDetailId;
    this.getCandidateNoticePeriodBuyoutReimbursement()
  }

  ngOnInit() {
  }
  getCandidateNoticePeriodBuyoutReimbursement() {
    this.noticePeriodBuyOutReimbursement = [];
    this.candidateService.getCandidateNoticePeriodBuyoutReimbursement(this.searchNoticPeriodBuyOutReimbursement).subscribe((result:any[]) => {
      if (result.length>0) {
        var x = result[result.length-1]
        this.noticePeriodBuyOutReimbursement.push(x);       
        //console.log("Notice Period Buyout Reimbursment List", this.noticePeriodBuyOutReimbursement);

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
    this._route.navigate(['/app/career/notice-period-buyout-reimbursement-details'], { queryParams: { CandidateId: data.candidateId, CandidateNoticePeriodBuyOutDaysId: data.candidateNoticePeriodBuyOutDaysId,Mode:"Edit" } });
  }
  onClickEdit(data) {
    jQuery(".custom-menu").hide();
    this._route.navigate(['/app/career/notice-period-buyout-reimbursement-details'], { queryParams: { CandidateId: data.candidateId, CandidateNoticePeriodBuyOutDaysId: data.candidateNoticePeriodBuyOutDaysId,ApprovalRemarks:data.approvalRemarks, Mode:"Edit" } });
  }
  onClickView(data) {
    jQuery(".custom-menu").hide();
    this._route.navigate(['/app/career/notice-period-buyout-reimbursement-details'], { queryParams: { CandidateId: data.candidateId, CandidateNoticePeriodBuyOutDaysId: data.candidateNoticePeriodBuyOutDaysId,ApprovalRemarks:data.approvalRemarks, Mode:"View" } });
  }
}
