import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../interfaces/common/doctor.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../interfaces/common/function.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../interfaces/common/position.interface';
import { IJoinersList, IPendingScheduleBatchWise, IPendingScheduleIndividual, IScheduledBatchWise, IScheduledIndividually, IReportingVenueExists } from '../../../interfaces/prejoining/joinerslist.interface';
import { IOnboardingCoordinator, ISearchOnboardingCoordinator, IVenue, ISearchVenue, IJoiningDocument, IWelcomeTemplate } from '../../../interfaces/prejoining/onboardingcoordinator.interface';
import { IAssessmentList, ICandidateList, ISearchAssessment, ISearchCandidate } from '../../../interfaces/common/inductionassessment.interface';
import { LocationService } from '../../../services/common/location/location.service';
import { CommonService } from '../../../services/common/common/common.service';
import { FunctionService } from '../../../services/common/function/function.service';
import { DepartmentService } from '../../../services/common/department/department.service';
import { PositionService } from '../../../services/common/position/position.service';
import { InductionassessmentService } from '../../../services/common/inductionassessment/inductionassessment.service';
import { ShareddataService } from '../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../sharedservices/notification.service';
import { CorporateallocationService } from '../../../services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { JoinersService } from '../../../services/prejoining/onboardingcoordinator/joiners.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { IApproverVertical, IApproverFunction, IApproverDepartment, IApproverVerticalFunctionDepartment, IApproverFunctionDepartment, IBatch, ISearchBatch, ITrainingTittle, IsearchTrainingTittle, IsearchTrainingTittleGetAll } from '../../../interfaces/common/common.interface';
import { AssessmentService } from 'src/app/services/assessment/assessment.service';
declare var jQuery: any;

@Component({
  selector: 'app-inductionassessment',
  templateUrl: './inductionassessment.component.html',
  styleUrls: ['./inductionassessment.component.css']
})
export class InductionassessmentComponent implements OnInit {

  assessmentAssignSaveForm: FormGroup;
  searchformScheduledBatchWise: FormGroup;
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  inductionAssessmentList: IAssessmentList[] = [];
  searchAssessment: ISearchAssessment = {
    assessmentId: null,
    isActive: null
  }
  // Batch
  batchs: IBatch[] = [];
  selectedBatch: IBatch;
  searchBatch: ISearchBatch = {
    batchId: null,
    vertical: null,
    isActive: null
  }
  trainingTittleListGetAll: any;
  // Training tittle
  trainingTittleList: ITrainingTittle[] = [];
  searchTrainingTittle: IsearchTrainingTittle = {
    batchId: null,
    candidateId: null
  }
  searchTrainingTittleGetAll: IsearchTrainingTittleGetAll = {
    trainingTittleId: 0,
    IsActive: null
  }
  candidateList: ICandidateList[] = [];
  verticals: IVertical[] = [];
  Candidateverticals: IVertical[] = [];
  selectedVertical: IVertical;
  searchCandidate: ISearchCandidate = {
    candidateId: null,
    onBordingMangerId: null,
    onBordingCoordinatorId: null,
    candidateName: "",
    verticalId: null,
    locationId: null,
    functionId: null,
  }
  del_Assessmentid: number;

  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private assessmentService: AssessmentService,
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
    private inductionassessmentService: InductionassessmentService
  ) {
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.createAssessmentAssignSaveForm();
    this.createScheduledBatchwiseSearchForm();
    this.getAllInductionAssessment();
    this.getAllVerticals();
    this.getAllVerticalsCandidate();
    this.getAllTrainingTittleGetAll();
  }

  ngOnInit() {
    this.loadDataTable();
    this.tableOptionDropDown();
    // this.getAllInductionAssessment();
  }
  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
      });
    });
  }
  tableOptionDropDown() {
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
  createScheduledBatchwiseSearchForm() {
    this.searchformScheduledBatchWise = this.fb.group({
      batchNo: [''],
      onBordingMangerId: null,
      onBordingCoordinatorId: null,
      verticalId: null,
      dtofJoiningFrom: [''],
      dtofJoiningTo: ['']
    });
  }
  goToCreateAssessment() {
    this._route.navigate(['/app/create-induction-assessment']);
  }
  createAssessmentAssignSaveForm() {
    this.assessmentAssignSaveForm = this.fb.group({
      assessmentId: null,
      vertical: null,
      batchId: null,
      candidateId: null,
      trainingTittleId: null,
      candidateInductionScheduleDetailsId: null,
      createdBy: this.loginUserId
    });
  }

  getAllVerticals() {
    this.verticals = [];
    this.verticals.push({ verticalId: 1, verticalName: "Corporate Batch", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant Batch", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing Batch", isActive: true });
  }
  getAllVerticalsCandidate() {
    this.Candidateverticals = [];
    this.Candidateverticals.push({ verticalId: 1, verticalName: "Corporate Individual", isActive: true });
    this.Candidateverticals.push({ verticalId: 2, verticalName: "Plant Individual", isActive: true });
    this.Candidateverticals.push({ verticalId: 3, verticalName: "Sales & Marketing Individual", isActive: true });
  }

  getVerticalWiseBatch(evt) {
    this.getAllBatch(evt);
  }
  getVerticalWiseCandidate(evt) {
    this.getAllCandidate(evt);
  }
  getAllInductionAssessment() {
    this.inductionAssessmentList = [];
    this.inductionassessmentService.getAllInductionAssessment(this.searchAssessment).subscribe((result) => {
      if (result) {
        this.inductionAssessmentList = result;
        //console.log("Induction Assemssment List", this.inductionAssessmentList);

        // this.loadDataTable();
        this.SpinnerService.hide();
      }
      else {
        this.inductionAssessmentList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.loadDataTable();
      this.createAssessmentAssignSaveForm();
      this.createScheduledBatchwiseSearchForm();
      this.SpinnerService.hide();
    });

  }
  getAllBatch(verticalId) {
    this.batchs = [];
    this.SpinnerService.show();
    this.searchBatch.vertical = verticalId;//this.defaultverticalId;
    this.commonService.getAllBatch(this.searchBatch).subscribe((result) => {
      if (result) {
        console.log("batch", result)
        this.batchs = result.filter(x => x.createdBy == this.loginUserId);

        this.batchs = result.filter(x => x.vertical == verticalId);
      }
      else {
        this.batchs = [];
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  getAllCandidate(verticalId) {
    this.candidateList = [];
    this.inductionassessmentService.getCandidateList(this.searchCandidate).subscribe((result) => {
      if (result) {
        this.candidateList = result.filter(x => x.verticalId == verticalId);
        console.log("check", result)
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
      this.SpinnerService.hide();
    });
  }
  // onChageBatch() {
  //   this.assessmentAssignSaveForm.patchValue({
  //     candidateInductionScheduleDetailsId: null
  //   })
  //   this.searchTrainingTittle.batchId = this.assessmentAssignSaveForm.get("batchId").value;
  //   this.searchTrainingTittle.candidateId = null;
  //   this.getAllTrainingTittle();
  // }
  onChangeCandidate() {
    this.assessmentAssignSaveForm.patchValue({
      candidateInductionScheduleDetailsId: null
    })
    this.searchTrainingTittle.batchId = null;
    this.searchTrainingTittle.candidateId = this.assessmentAssignSaveForm.get("candidateId").value;
    this.getAllTrainingTittle();
  }
  getAllTrainingTittle() {
    this.trainingTittleList = [];
    this.commonService.getAllTrainingTittle(this.searchTrainingTittle).subscribe((result) => {
      if (result) {
        this.trainingTittleList = result;
      }
      else {
        this.batchs = [];
      }
    }, error => {
      console.log(error);
    }, () => {

    });
  }
  onClickAssignToBatch(data) {
    this.trainingTittleList = [];
    this.createAssessmentAssignSaveForm();
    this.assessmentAssignSaveForm.patchValue({
      assessmentId: data.assessmentId,
      candidateId: 0
      //candidateId: null
    })
  }
  onClickAssignToCandidate(data) {
    this.trainingTittleList = [];
    this.createAssessmentAssignSaveForm();
    this.assessmentAssignSaveForm.patchValue({
      assessmentId: data.assessmentId,
      batchId: 0,
      candidateId: 1
      // batchId: null
    })
  }
  onSubmitAssignAssessment(assignFor: string) {
    var flag = 0;
    var msg = "";
    if (this.assessmentAssignSaveForm.value.trainingTittleId == null) {
      flag = 1;
      msg = "Please Select Training Tittle";
    }
    else {

    }
    // if (assignFor == "B") {
    //   // if (this.assessmentAssignSaveForm.value.batchId == null) {
    //   //   flag = 1;
    //   //   msg = "Please select Batch";
    //   // }
    //   else {

    //   }
    // } else if (assignFor == "C") {
    //   if (this.assessmentAssignSaveForm.value.candidateId == null) {
    //     flag = 1;
    //     msg = "Please select candidate";
    //   }
    //   else {

    //   }
    // }
    if (flag == 0) {
      this.SpinnerService.show();
      //console.log("Assign to Batch", this.assessmentAssignSaveForm.value);
      this.assessmentAssignSaveForm.value.batchId = 0;
      this.assessmentAssignSaveForm.value.candidateInductionScheduleDetailsId = 0;
      this.inductionassessmentService.inductionAssessmentAssign(this.assessmentAssignSaveForm.value).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.createAssessmentAssignSaveForm();
            this.createScheduledBatchwiseSearchForm();
            jQuery("#assignAssessmentModal").modal("hide");
            jQuery("#assignToCandidateModal").modal("hide");
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
      this.notificationService.showError(msg, "Error");
    }
  }

  onClickForCancel() {
    this.createAssessmentAssignSaveForm();
  }
  onDeleteClick(data: any) {
    this.del_Assessmentid = data.assessmentId;
  }
  onClickConfirmatin(value) {
    if (value == "Y") {
      let delObj = {
        AssessmentId: this.del_Assessmentid,
      }
      this.inductionassessmentService.deleteAssessment(delObj).subscribe((response: any) => {
        if (response.successFlag == 1) {
          this.notificationService.showSuccess(response.msg, "Success");
          this.getAllInductionAssessment();
        }
        else {
          this.notificationService.showError(response.msg, "Error");
        }
      }, error => {
        this.notificationService.showError("Something went wrong.. Try again later..", "");
        this.SpinnerService.hide();
        console.log(error);
      }, () => {
        // jQuery("#myModalOne").modal("hide");
        this.SpinnerService.hide();
      })

    }

  }
  onClickEdit(data: any) {
    this._route.navigate(['/app/create-induction-assessment'], { queryParams: { AssessmentId: data.assessmentId } });
  }

  getAllTrainingTittleGetAll() {
    this.SpinnerService.show();
    this.commonService.getAllTrainingTittleList(this.searchTrainingTittleGetAll).subscribe((response: any) => {
      if (response) {
        this.trainingTittleListGetAll = response;
      }
      else {
        this.trainingTittleListGetAll = [];
      }
    }, error => {
      this.SpinnerService.hide();
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      //this.loadDataTable();
      this.SpinnerService.hide();
    })
  }

  ngOnDestroy() {
    jQuery(".custom-menu").hide();
  }

}


