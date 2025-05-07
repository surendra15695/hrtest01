import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import { IJoiningDocument, IViewCandidateList, IWelcomeTemplate } from '../../../../interfaces/prejoining/onboardingcoordinator.interface';
import { LocationService } from '../../../../services/common/location/location.service';
import { CommonService } from '../../../../services/common/common/common.service';
import { FunctionService } from '../../../../services/common/function/function.service';
import { PositionService } from '../../../../services/common/position/position.service'; searchForm: FormGroup;
import { ShareddataService } from '../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { CorporateallocationService } from '../../../../services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { JoinersService } from '../../../../services/prejoining/onboardingcoordinator/joiners.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { IBatch, ISearchBatch } from '../../../../interfaces/common/common.interface';
import { IModeOfJoining, ISearchModeOfJoining } from 'src/app/interfaces/preselection/candidate.interface';
import { EmailtemplateService } from 'src/app/services/common/emailtemplate/emailtemplate.service';
import { IEmailTemplate, ISearchEmailTemplate } from 'src/app/interfaces/common/emailtemplate.interface';
import { IAttachmentDocumentNameDetails, ISearchAttachmentDocumentName } from 'src/app/interfaces/common/attachmentdocument.interface';
import { AttachmentdocumentService } from 'src/app/services/common/attachementdocument/attachmentdocument.service';
import { RequisitionService } from '../../../../services/preselection/requisition/requisition.service';
import { IShareWithCandidate } from 'src/app/interfaces/prejoining/joinerslist.interface';
declare var jQuery: any;


@Component({
  selector: 'app-ohviewcandidatelist',
  templateUrl: './ohviewcandidatelist.component.html',
  styleUrls: ['./ohviewcandidatelist.component.css']
})
export class OhviewcandidatelistComponent implements OnInit {
  searchForm: FormGroup;
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
  loginUserId: number;
  batchId: number;
  batchNo: string;
  onBoardingCoordinator: number;
  from: string;
  type: string;
  candidateList: IViewCandidateList[] = [];
  selectedVerticalId: number = 1;
  verticalId: number;
  parentActiveTab: string;
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
    private emailtemplateService: EmailtemplateService,
    private attachmentDocumentService: AttachmentdocumentService,
    private joinersservice: JoinersService, private requisitionService: RequisitionService
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.parentActiveTab = this.persistance.get("parentActiveTab");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.batchId = params['BatchId'];
      this.batchNo = params['BatchNo'];
      this.onBoardingCoordinator = params['OnBoardingcoordinator'];
      this.from = params['From'];
      this.type = params['Type'];
      this.verticalId = params['VerticalId'];
    });
    this.selectedVerticalId = Number(this.verticalId);
    this.createSearchForm();
    if (this.batchId != undefined) {
      this.getAllCandidateDetailsBatchWise();
    }
    this.getAllFunction();
    this.getAllLocation();
  }

  ngOnInit() {
    this.loadDataTable();
    this.loadTooltipMenu();
    this.loadPopover();
  }
  loadTooltipMenu() {
    setTimeout(() => {
      var body_ = jQuery('body');
      var dropdownMenu,
        table_responsive = jQuery('.table-responsive');
      table_responsive.on('show.bs.dropdown', function (e) {
        dropdownMenu = jQuery(e.target).find('.dropdown-menu');
        body_.append(dropdownMenu.detach());
        var eOffset = jQuery(e.target).offset();
        dropdownMenu.css({
          'display': 'block',
          'top': eOffset.top + jQuery(e.target).outerHeight(),
          'left': eOffset.left,
          'font-size': '14px'
        });
        dropdownMenu.addClass("mobPosDropdown");
      });
      table_responsive.on('hide.bs.dropdown', function (e) {
        jQuery(e.target).append(dropdownMenu.detach());
        jQuery(e.target).find('.dropdown-menu').hide();
      });
    });
  }
  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
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
  loadPopover() {
    setTimeout(() => {
      jQuery('[data-toggle="popover"]').popover({
        html: true
      });
    });
  }
  createSearchForm() {
    this.searchForm = this.fb.group({
      batchId: [Number(this.batchId)],
      onBordingMangerId: [0],
      onBordingCoordinatorId: [Number(this.onBoardingCoordinator)],
      dtofJoiningFrom: [''],
      dtofJoiningTo: [''],
      candidateName: [''],
      verticalId: [Number(this.verticalId)],
      locationId: [0],
      functionId: [0],
    });
  }
  changeVertical() {
    this.selectedVerticalId = this.searchForm.get("verticalId").value;
    this.getAllLocation();
    this.getAllFunction();
  }
  //locations
  getAllLocation() {
    this.locations = [];
    this.SpinnerService.show();
    this.searchLocation.verticalId = this.selectedVerticalId;
    // console.log("Search Location", this.searchLocation);

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
    // console.log("Search Fuction", this.searchFunction);
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
  searchSubmit() {
    this.getAllCandidateDetailsBatchWise();
  }
  onClickReset() {
    this.createSearchForm();
    this.selectedVerticalId = 1;
    this.getAllCandidateDetailsBatchWise();
    this.getAllLocation();
    this.getAllFunction();

  }
  getAllCandidateDetailsBatchWise() {
    this.SpinnerService.show();
    // console.log("View Candidate Batch Wise searchObj", this.searchForm.value);

    this.joinersservice.getAllBatchWiseCandidateDetails(this.searchForm.value).subscribe((result) => {
      if (result) {
        this.candidateList = result;
        // console.log("candidate List", this.candidateList);
        this.candidateList.forEach(element => {
          if (element.onboardingManagerNotApproveDoc != " ") {
            element.popoverContent = "<div><span class='grey'>Pending/Need clarification Document: </span><span>" + element.onboardingManagerNotApproveDoc + "</span></div>";
          }
        })
        // console.log("candidate details list", this.candidateList);
        this.SpinnerService.hide();
      }
      else {
        this.candidateList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.loadDataTable();
      this.loadPopover();
      this.SpinnerService.hide();
    });
  }
  onClickViewDocument(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "newjoinerslist");
    this.persistance.set('nextpagename', "ohviewdocument");
    this.persistance.set('type', "plant");
    this.persistance.set('candidateId', data.candidateId);
    this.persistance.set('paramid', data.requisitionDetailId);
    this.persistance.set('parentActiveTab', this.parentActiveTab);
    jQuery(".custom-menu").hide();
    this._route.navigate(['app/oh-view-document']);
  }
  onClickBack() {
    jQuery(".custom-menu").hide();
    this.persistance.set('parentActiveTab', this.parentActiveTab);
    this._route.navigate(['/app/onboardingmanagement'])

  }


}
