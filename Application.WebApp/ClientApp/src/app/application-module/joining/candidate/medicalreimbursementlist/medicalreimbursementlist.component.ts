import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../interfaces/common/doctor.interface';
import { ICandidateAssessmentData, ICandidateAssessmentDetails, ICandidateMedicalReimbursement, ISearchCandidateAssessment, ISearchCandidateMedicalReimbursement } from '../../../../interfaces/joining/candidate.interface';
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
  selector: 'app-medicalreimbursementlist',
  templateUrl: './medicalreimbursementlist.component.html',
  styleUrls: ['./medicalreimbursementlist.component.css']
})
export class MedicalreimbursementlistComponent implements OnInit {

  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  candidateId: number;
  searchCandidateMedicalReimbursement: ISearchCandidateMedicalReimbursement = {
    candidateMedicalReimbursementId: null,
    requisitionDetailId: null,
    candidateId: null,
    empId: null,
  }
  candidateMedicalReimbursementList: ICandidateMedicalReimbursement[] = [];
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
    this.searchCandidateMedicalReimbursement.candidateId = this.candidateId;
    //this.searchCandidateMedicalReimbursement.requisitionDetailId = this.requisitionDetailId;
    this.getCandidateMedicalReimbursementList()
  }

  ngOnInit() {
   // this.tableOptionDropDown();
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
  getCandidateMedicalReimbursementList(){
    this.candidateMedicalReimbursementList=[];
   // console.log("Search Obj Medical Reimbursement",this.searchCandidateMedicalReimbursement);
    
    this.candidateService.getCandidateMedicalReimbursement(this.searchCandidateMedicalReimbursement).subscribe((result) => {
      if (result.length>0) {
        var x = result[result.length-1]
        this.candidateMedicalReimbursementList.push(x); 
        // console.log("candidate Medical Reimbursement List",this.candidateMedicalReimbursementList);
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
  onClickClaimReimbursement(data){
    jQuery(".custom-menu").hide();
    this._route.navigate(['/app/career/medical-reimbursement-details'], { queryParams: { CandidateId: data.candidateId,CandidateMedicalReimbursementId:data.candidateMedicalReimbursementId,Mode:"Edit"} });
  }
  onClickEditClaim(data){
    jQuery(".custom-menu").hide();
    this._route.navigate(['/app/career/medical-reimbursement-details'], { queryParams: { CandidateId: data.candidateId,CandidateMedicalReimbursementId:data.candidateMedicalReimbursementId,ApprovalRemarks:data.approvalRemarks, Mode:"Edit"} });
  }
  onClickView(data){
    jQuery(".custom-menu").hide();
    this._route.navigate(['/app/career/medical-reimbursement-details'], { queryParams: { CandidateId: data.candidateId,CandidateMedicalReimbursementId:data.candidateMedicalReimbursementId,ApprovalRemarks:data.approvalRemarks,Mode:"View"} });
  }

}
