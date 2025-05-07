import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../interfaces/common/doctor.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../interfaces/common/position.interface';
import { IJoinersList, IPendingScheduleBatchWise, IPendingScheduleIndividual, IScheduledBatchWise, IScheduledIndividually, IReportingVenueExists } from '../../../../interfaces/prejoining/joinerslist.interface';
import { IOnboardingCoordinator, ISearchOnboardingCoordinator, IVenue, ISearchVenue, IJoiningDocument, IWelcomeTemplate } from '../../../../interfaces/prejoining/onboardingcoordinator.interface';
import { ICandidateDetailData, ISearchCandidateDetail, IModeOfJoining, ISearchModeOfJoining } from '../../../../interfaces/preselection/candidate.interface';
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
import { JoinersService } from '../../../../services/prejoining/onboardingcoordinator/joiners.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { IApproverVertical, IApproverFunction, IApproverDepartment, IApproverVerticalFunctionDepartment, IApproverFunctionDepartment, IBatch, ISearchBatch } from '../../../../interfaces/common/common.interface';
declare var jQuery: any;

@Component({
  selector: 'app-candidatejoiningchecklist',
  templateUrl: './candidatejoiningchecklist.component.html',
  styleUrls: ['./candidatejoiningchecklist.component.css']
})
export class CandidatejoiningchecklistComponent implements OnInit {

  searchFormJoiningCheckList: FormGroup;
  @ViewChild('dtRequestedFrom', { static: false }) dtRequestedFrom: ElementRef;
  @ViewChild('dtRequestedTo', { static: false }) dtRequestedTo: ElementRef;

  //location
  locations: ILocation[] = [];
  selectedLocation: ILocation;
  searchLocation: ISearchLocation =
    {
      locationId: null,
      verticalId: null,
      locationCode: null,
      locationNo: null,
      isActive: true
    };
  selectedLocationId: number;
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
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
    private recruitmentmanagerService: RecruitmentmanagerService
  ) {
    this.createJoiningChecklistSearchForm();
    this.getAllCandidateJoiningCheckList();
  }

  ngOnInit() {
  }
  createJoiningChecklistSearchForm() {
    this.searchFormJoiningCheckList = this.fb.group({
      requisitionDetailId: [this.requisitionDetailId],
      candidateId: [0],
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
  getAllCandidateJoiningCheckList() {

  }

}
