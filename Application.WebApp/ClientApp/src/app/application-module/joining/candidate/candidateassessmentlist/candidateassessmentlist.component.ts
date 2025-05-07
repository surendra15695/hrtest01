import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../interfaces/common/doctor.interface';
import { ICandidateAssessmentData, ICandidateAssessmentDetails, ISearchCandidateAssessment } from '../../../../interfaces/joining/candidate.interface';
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
  selector: 'app-candidateassessmentlist',
  templateUrl: './candidateassessmentlist.component.html',
  styleUrls: ['./candidateassessmentlist.component.css']
})
export class CandidateassessmentlistComponent implements OnInit {

  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  candidateId: number;
  searchCandidateAssessmentData: ISearchCandidateAssessment = {
    candidateId: null
  }
  candidateAssessmentDataList: ICandidateAssessmentData;
  candiddateAssementDetails: ICandidateAssessmentDetails[] = [];
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private candidateService: CandidateService
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.candidateId = this.persistance.get('loggedinuser').candidateId;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.searchCandidateAssessmentData.candidateId = this.candidateId
    this.getCandidateAssessmentData();
  }

  ngOnInit() {
  }
  getCandidateAssessmentData() {
    this.candiddateAssementDetails = [];
    this.candidateService.getCandidateAllAssesmentData(this.searchCandidateAssessmentData).subscribe((result) => {
      if (result) {
        this.candidateAssessmentDataList = result;
        this.candiddateAssementDetails = this.candidateAssessmentDataList.candidateAssessmentDetails;
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
  onClickTakeAssessment(data) {
    this._route.navigate(['/app/career/take-assessment'], { queryParams: { AssessmentId: data.assessmentId, CandidateInductionScheduleDetailsId: data.candidateInductionScheduleDetailsId, Type: "New" } });
  }
  onClickViewAssessment(data) {
    this._route.navigate(['/app/career/take-assessment'], { queryParams: { AssessmentId: data.assessmentId, CandidateInductionScheduleDetailsId: data.candidateInductionScheduleDetailsId, Type: "View",AssessmentType: data.assessmentTypeName } });
  }

}
