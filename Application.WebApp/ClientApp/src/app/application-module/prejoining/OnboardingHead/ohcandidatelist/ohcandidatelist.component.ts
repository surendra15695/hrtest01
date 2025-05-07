import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../interfaces/common/doctor.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../interfaces/common/position.interface';
import { IJoinersList, IPendingScheduleBatchWise, IPendingScheduleIndividual, IScheduledBatchWise, IScheduledIndividually, IReportingVenueExists, IShareWithCandidate } from '../../../../interfaces/prejoining/joinerslist.interface';
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
import { EmailtemplateService } from 'src/app/services/common/emailtemplate/emailtemplate.service';
import { IEmailTemplate, ISearchEmailTemplate } from 'src/app/interfaces/common/emailtemplate.interface';
import { IAttachmentDocumentNameDetails, ISearchAttachmentDocumentName } from 'src/app/interfaces/common/attachmentdocument.interface';
import { AttachmentdocumentService } from 'src/app/services/common/attachementdocument/attachmentdocument.service';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { RequisitionService } from '../../../../services/preselection/requisition/requisition.service';
import { PlantallocationService } from 'src/app/services/prejoining/onboardingmanager/plant/plantallocation.service';
import { IModeOfInduction, ISearchModeOfInduction, ITrainer, IsearchTrainer, ITemplate, ISearchTemplate, IRoleWiseUser, ISearchRoleWiseUser, ICandidateInductionSchedule, ICandidateInductionSheduleHeader, ICandidateInductionSheduleDetails } from '../../../../interfaces/prejoining/onboardingcoordinator.interface';
import * as _ from 'lodash';
declare var jQuery: any;

@Component({
  selector: 'app-ohcandidatelist',
  templateUrl: './ohcandidatelist.component.html',
  styleUrls: ['./ohcandidatelist.component.css']
})
export class OhcandidatelistComponent implements OnInit {
  searchformScheduledIndividual: FormGroup;
  searchformScheduledBatchWise: FormGroup;
  loginUserId: number;
  scheduledIndividually: IScheduledIndividually[] = [];
  scheduledBatchWise: IScheduledBatchWise[] = [];
  parentActiveTab: string = "Individual";
  selectedVerticalId: number = 1;
  defaultverticalId: number = 1;
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

  //function
  functions: IVerticalFunction[] = [];
  selectedFunction: IVerticalFunction;
  searchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  selectedfunctionId: number;
  functionName: string;

  @ViewChild('fromDateScheduledBatch', { static: false }) fromDateScheduledBatch: ElementRef;
  @ViewChild('toDateScheduledBatch', { static: false }) toDateScheduledBatch: ElementRef;

  constructor(private fb: FormBuilder,
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
    private emailtemplateService: EmailtemplateService,
    private joinersservice: JoinersService,
    private attachmentDocumentService: AttachmentdocumentService,
    private requisitionService: RequisitionService,
    private plantservice: PlantallocationService,) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.parentActiveTab = this.persistance.get("parentActiveTab");
    if (this.parentActiveTab == undefined) {
      this.parentActiveTab = "Individual";
    }
    this.createScheduledIndividualSearchForm();
    this.createScheduledBatchwiseSearchForm();
    this.getAllScheduledListIndividually();
    this.getAllLocation();
    this.getAllFunction();
    this.persistance.set('parentActiveTab', null);
  }

  ngOnInit() {
    this.loadDataTable4();
    this.loadDataTable5();
    this.loadPopover();
  }
  loadDataTable4() {
    jQuery('#dataTable4').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable4').DataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "drawCallback": function (settings) {
          setTimeout(() => {
            jQuery('[data-toggle="popover"]').popover({
              html: true
            });
          });
        }
      });
    });
  }
  loadDataTable5() {
    jQuery('#dataTable5').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable5').DataTable({
        "searching": false,
        "paging": true,
        "scrollX": false,
        "bLengthChange": false,
        "drawCallback": function (settings) {
          setTimeout(() => {
            jQuery('[data-toggle="popover"]').popover({
              html: true
            });
          });
        }
      });
    });
  }
  loadPopover() {
    setTimeout(() => {
      jQuery('[data-toggle="popover"]').popover({
        html: true
      });
    });
  }
  createScheduledIndividualSearchForm() {
    this.searchformScheduledIndividual = this.fb.group({
      candidateId: null,
      onBordingMangerId: null,
      onBordingCoordinatorId: null,
      candidateName: [''],
      verticalId: 1,
      locationId: null,
      functionId: null,
    });
  }
  createScheduledBatchwiseSearchForm() {
    this.searchformScheduledBatchWise = this.fb.group({
      batchNo: [''],
      onBordingMangerId: null,
      onBordingCoordinatorId: null,
      verticalId: 1,
      dtofJoiningFrom: [''],
      dtofJoiningTo: ['']
    });
  }
  changeVertical(tab) {
    switch (tab) {
      case "SI":
        this.selectedVerticalId = this.searchformScheduledIndividual.get("verticalId").value;
        break;
      case "SB":
        this.selectedVerticalId = this.searchformScheduledBatchWise.get("verticalId").value;
        break;
      default:
        this.selectedVerticalId = this.searchformScheduledIndividual.get("verticalId").value;
        break;
    }
    this.getAllLocation();
    this.getAllFunction();
  }
  //locations
  getAllLocation() {
    this.locations = [];
    this.SpinnerService.show();
    this.searchLocation.verticalId = this.selectedVerticalId;
    this.locationService.getAllLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        this.locations = result;
        this.locations.splice(0, 0, {
          locationId: 0,
          verticalId: 0,
          locationNo: "All",
          locationCode: "",
          locationOffice: "All",
          isActive: true,
          createdBy: 0
        })
      }
      else {
        this.locations = [];
        this.locations.splice(0, 0, {
          locationId: 0,
          verticalId: 0,
          locationNo: "All",
          locationCode: "",
          locationOffice: "All",
          isActive: true,
          createdBy: 0
        })
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }

  //Function
  getAllFunction() {
    this.functions = [];
    this.SpinnerService.show();
    this.searchFunction.verticalId = this.selectedVerticalId;
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;
        this.functions.splice(0, 0, {
          functionId: 0,
          functionName: "All",
          verticalId: 0,
          verticalName: "",
          isActive: true
        })
      }
      else {
        this.functions = [];
        this.functions.splice(0, 0, {
          functionId: 0,
          functionName: "All",
          verticalId: 0,
          verticalName: "",
          isActive: true
        })
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  onClickIndividual() {
    this.createScheduledIndividualSearchForm();
    this.getAllScheduledListIndividually();
    jQuery("#chkAllIndividualScheduled").prop("checked", false);
    this.locations = [];
    this.functions = [];
  }
  scheduleSearchIndividualSubmit() {
    this.getAllScheduledListIndividually();
  }
  onClickScheduledIndividualReset() {
    this.searchformScheduledIndividual.reset();
    // Assign default Vertical Value
    this.searchformScheduledIndividual.patchValue({
      verticalId: this.defaultverticalId
    })
    this.selectedVerticalId = this.defaultverticalId;
    this.getAllLocation();
    this.getAllFunction();
    this.getAllScheduledListIndividually();
  }
  getAllScheduledListIndividually() {
    this.scheduledIndividually = [];
    // console.log("Serach Individual Obj", this.searchformScheduledIndividual.value);
    this.SpinnerService.show();
    this.joinersservice.getAllScheduledIndividually(this.searchformScheduledIndividual.value).subscribe((result) => {
      if (result) {
        this.scheduledIndividually = result;
        // this.scheduledIndividually = result.filter(x => x.verticalId == 2 && x.onBoardingCoordinator == this.loginUserId);  // no need as vertical will come from filter
        // this.scheduledIndividually = result.filter(x => x.onBoardingCoordinator == this.loginUserId);  // no need as vertical will come from filter
        // console.log("Schedule Individual Candidate list", this.scheduledIndividually);
        // console.log(this.scheduledIndividually);
        this.scheduledIndividually.forEach(element => {
          if (element.onboardingManagerNotApproveDoc != " ") {
            element.popoverContent = "<div><span class='grey'>Pending/Need clarification Document: </span><span>" + element.onboardingManagerNotApproveDoc + "</span></div>";
          }
        })
        // console.log("Schedule Individual", this.scheduledIndividually);
        this.SpinnerService.hide();
      }
      else {
        this.scheduledIndividually = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.loadDataTable4();
      this.loadPopover();
      this.SpinnerService.hide();
    });
  }
  getScheduleIndividualEnableStatus(data) {
    return data.checked;
  }
  onClickScheduledBatchTab() {
    this.createScheduledBatchwiseSearchForm();
    this.getAllScheduledListBatchWise();
    jQuery("#chkAllIndividualScheduled").prop("checked", false);
    this.locations = [];
    this.functions = [];
  }
  scheduleSearchBatchSubmit() {
    this.searchformScheduledBatchWise.patchValue(
      {
        dtofJoiningFrom: this.fromDateScheduledBatch.nativeElement.value,
        dtofJoiningTo: this.toDateScheduledBatch.nativeElement.value
      });
    this.getAllScheduledListBatchWise();
  }
  getAllScheduledListBatchWise() {
    this.scheduledBatchWise = [];
    this.SpinnerService.show();
    // console.log("Search batch Obj", this.searchformScheduledBatchWise.value);

    this.joinersservice.getAllScheduledBatchWise(this.searchformScheduledBatchWise.value).subscribe((result) => {
      if (result) {
        //this.scheduledBatchWise = result.filter(x => x.verticalId == 2 && x.onBoardingcoordinator == this.loginUserId);
        this.scheduledBatchWise = result;
        // console.log("Schedule Batch List", this.scheduledBatchWise);
        this.SpinnerService.hide();
      }
      else {
        this.scheduledBatchWise = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.loadDataTable5();
      this.SpinnerService.hide();
    });
  }

  onClickViewDocument(data, parentTabName) {
    // alert(parentTabName);
    // alert(childTabName);
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "newjoinerslist");
    this.persistance.set('nextpagename', "ohviewdocument");
    this.persistance.set('type', "plant");
    this.persistance.set('candidateId', data.candidateId);
    this.persistance.set('paramid', data.requisitionDetailId);
    this.persistance.set('parentActiveTab', parentTabName);
    jQuery(".custom-menu").hide();
    this._route.navigate(['app/oh-view-document']);
  }
  onClickViewCandidate(data, pagetext, parentTabName) {
    jQuery(".custom-menu").hide();
    this.persistance.set('oldpagename', pagetext);
    this.persistance.set('parentActiveTab', parentTabName);
    this._route.navigate(['/app/oh-view-candidate'], { queryParams: { BatchId: data.batchId, BatchNo: data.batchNo, OnBoardingcoordinator: data.onBoardingcoordinator, VerticalId: this.selectedVerticalId } });
  }

}
