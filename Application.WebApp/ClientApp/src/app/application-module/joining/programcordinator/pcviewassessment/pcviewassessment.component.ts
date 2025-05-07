import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../interfaces/common/doctor.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../interfaces/common/position.interface';
import { IJoinersList, IPendingScheduleBatchWise, IPendingScheduleIndividual, IScheduledBatchWise, IScheduledIndividually, IReportingVenueExists } from '../../../../interfaces/prejoining/joinerslist.interface';
import { IOnboardingCoordinator, ISearchOnboardingCoordinator, IVenue, ISearchVenue, IJoiningDocument, IWelcomeTemplate } from '../../../../interfaces/prejoining/onboardingcoordinator.interface';
import { ICandidateDetailData, ISearchCandidateDetail, IModeOfJoining, ISearchModeOfJoining } from '../../../../interfaces/preselection/candidate.interface';
import { IAssessemenrAssignReleaseList, IBatchAssessment, ICandidateAssessmentList, ICandidateEvaluationAnswerData, ICandidateEvaluationQuestionShowData, ISearchAssessmentAssignReleaseList, ISearchViewAssessment, IViewAssessment } from '../../../../interfaces/joining/programcoordinator.interface';
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
import { ProgramcoordinatorService } from '../../../../services/joining/programcoordinator/programcoordinator.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
declare var jQuery: any;

@Component({
  selector: 'app-pcviewassessment',
  templateUrl: './pcviewassessment.component.html',
  styleUrls: ['./pcviewassessment.component.css']
})
export class PcviewassessmentComponent implements OnInit {

  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  candidateId: number;
  batchId: number;
  batchNo: string;
  type: string;
  EmpNo: string;
  serachViewAssessement: ISearchViewAssessment = {
    candidateId: null
  }
  viewAssessmentDetails: IViewAssessment;
  viewAssessmentQuestiondata: ICandidateEvaluationQuestionShowData[] = [];
  viewAssessmentAnswerdata: ICandidateEvaluationAnswerData[] = [];
  from: string;
  activeTabName: string;
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
    private SpinnerService: NgxSpinnerService, public activatedRoute: ActivatedRoute,
    private titleService: Title,
    private positionService: PositionService,
    private programcoordinatorService: ProgramcoordinatorService
  ) {
    this.SpinnerService.show();
    jQuery(".custom-menu").hide();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.activeTabName = this.persistance.get("activeTabName");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.candidateId = params['CandidateId'];
      this.batchId = params['BatchId'];
      this.batchNo = params['BatchNo'];
      this.type = params['Type'];
      this.from = params['From'];
      this.EmpNo = params['EmpNo'];
    });
    this.serachViewAssessement.candidateId = Number(this.candidateId);
    this.getViewAssessmentData();
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
  getViewAssessmentData() {
    this.programcoordinatorService.getAllViewAssessmentData(this.serachViewAssessement).subscribe((result) => {
      if (result) {
        this.viewAssessmentDetails = result;
        console.log("Assessment Result", this.viewAssessmentDetails);
        this.viewAssessmentQuestiondata = this.viewAssessmentDetails.candidateEvaluationQuestionShowData;
        this.SpinnerService.hide();
      }
      else {
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();      
      this.SpinnerService.hide();
    });
  }
  getQuestionStatus(val) {
    return val == true ? "True" : "False";
  }
  onClickBack() {
    if (this.from == "Individual") {
      if (this.type == "Corporate") {
        this.persistance.set('activeTabName', this.activeTabName);
        this._route.navigate(['/app/corporate/induction-assessment-list']);
      } else if (this.type == "Plant") {
        this.persistance.set('activeTabName', this.activeTabName);
        this._route.navigate(['/app/plant/induction-assessment-list']);
      } else if (this.type == "Sales") {
        this.persistance.set('activeTabName', this.activeTabName);
        this._route.navigate(['/app/sales/induction-assessment-list']);
      }
    } else {
      this._route.navigate(['/app/pc-view-candidate'], { queryParams: { BatchId: this.batchId, BatchNo: this.batchNo, Type: this.type } });
    }
  }

}
