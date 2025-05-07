import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { IVerticalFunction, ISearchFunction } from '../../../interfaces/common/function.interface';
import { ICampusRequisitionList } from '../../../interfaces/campus/campusrequisition.interface';
import {
  ICampusYear, ISearchCampusYear, ICampusCollegeCategory,
  ICampusCourseStream, ISearchCampusCourse, ICampusCourse, ICampusStream, ISearchCampusStream
} from '../../../interfaces/campus/campuscommon.interface';
import { CampuscommonService } from 'src/app/services/campus/common/campuscommon.service'
import { CampusrequisitionService } from 'src/app/services/campus/campusrequisition/campusrequisition.service'
import { NotificationService } from '../../../sharedservices/notification.service';
import { CommondataService } from '../../../services/common/commondata/commondata.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { CommonService } from '../../../services/common/common/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { FunctionService } from '../../../services/common/function/function.service';
import { stream } from 'xlsx';

declare var jQuery: any;

@Component({
  selector: 'app-off-campusrequisitionlist-component',
  templateUrl: './off-campusrequisitionlist-component.component.html',
  styleUrls: ['./off-campusrequisitionlist-component.component.css']
})
export class OffCampusrequisitionlistComponentComponent implements OnInit {

  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  searchform: FormGroup;
  verticalIds: string;
  verticals: IVertical[] = [];
  searchCampusYear: ISearchCampusYear = {
    campusYearId: null,
    isActive: null
  }
  campusYears: ICampusYear[] = [];
  selectedCampusYear: number;
  courses: ICampusCourse[] = [];
  searchCourse: ISearchCampusCourse = {
    campusCourseId: null,
    isActive: true
  }
  functions: IVerticalFunction[] = [];
  searchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  requisitionList: any[] = [];
  verticalFunctions: IVerticalFunction[] = [];
  CampusRequisitionTypeId: number;
  CampusrequisitionStreamId: number;
  CampusFunctionId: number;
  CampusCourseId: number;
  campusStream: string;
  CampusCollegeCategory: number;
  CampusCandidateCount: number;
  createdBy: number;
  CampusRequisitionTitle: string;
  CampusRequisitionStream: string;
  CampusRecruitmentYear: number;
  collegeCategories: any[] = [];
  SelectedRequisitionDetailId: number;
  constructor(
    private SpinnerService: NgxSpinnerService,
    private notificationService: NotificationService,
    private commonDataService: CommondataService,
    private campusCommonService: CampuscommonService,
    private functionService: FunctionService,
    private persistance: PersistanceService,
    private requisitionService: CampusrequisitionService,
    private _route: Router,
    private fb: FormBuilder
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.SpinnerService.show();
    this.createForm();
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.getAllVerticals();
    this.getAllCampusYear();
    this.courses = [];
    this.getAllCampusCourse();
    this.getAllCollegeCategory();
    this.getAllCampusRequisitionList()
  }

  ngOnInit() {
    this.loadDataTable();
    this.loadTooltipMenu();
  }

  createForm() {
    this.searchform = this.fb.group({
      requisitionNo: [''],
      campusYearId: [null],
      verticalId: [null],
      functionId: [null],
      campusCourseId: [null],
      createdBy: this.createdBy,
      //requisitionStreamId: [null],
    })
  }


  getAllVerticals() {
    this.verticals = [];
    var splitvertical = this.verticalIds.split(",");
    var allvertical = "";
    for (var i = 0; i < splitvertical.length; i++) {
      if (splitvertical[i] != "0") {
        if (splitvertical[i] == "1") {
          this.verticals.push({ verticalId: 1, verticalName: "Plant & Corporate", isActive: true });
        }
        // else if (splitvertical[i] == "2") {
        //   this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
        // }
        else if (splitvertical[i] == "3") {
          this.verticals.push({ verticalId: 2, verticalName: "Sales & Marketing", isActive: true });
        }
        if (allvertical == "") {
          allvertical = splitvertical[i];
        }
        else {
          allvertical = allvertical + "," + splitvertical[i];
        }
      }
    }
  }

  changeVertical(event) {
    var verticalId = event;
    this.getAllFunction(event);
  }

  getAllFunction(verticalId) {
    this.functions = [];
    this.searchFunction.verticalId = verticalId;
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;
      }
      else {
        this.functions = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllCampusYear() {
    this.searchCampusYear.campusYearId = null;
    this.searchCampusYear.isActive = null;
    this.campusCommonService.getAllCampusYear(this.searchCampusYear).subscribe((response: any) => {
      if (response) {
        this.campusYears = response;
      }
      else {
        this.campusYears = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    })
  }

  getAllCampusCourse() {
    this.searchCourse.campusCourseId = null;
    this.searchCourse.isActive = true
    this.campusCommonService.getAllCampusCourse(this.searchCourse).subscribe((response: any) => {
      if (response) {
        this.courses = response;
      }
      else {
        this.courses = [];
      }
    }, error => {
      console.log(error);
    }, () => {

      this.SpinnerService.hide();
    })
  }

  getAllCampusRequisitionList() {
    this.SpinnerService.show();
    this.requisitionService.getAllOffCampusrequisition(this.searchform.value).subscribe((response: any) => {
      if (response) {
        this.requisitionList = response.filter(e => e.verticalId == 1);
      }
      else {
        this.requisitionList = [];
      }
    }, error => {
      // display form values on success
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.loadDataTable();
      this.SpinnerService.hide();
    })
  }

  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "fixedColumns": {
          "left": 3
        }
      });
    });
  }

  loadTooltipMenu() {
    setTimeout(() => {
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
          'font-size': '14px'
        });
        dropdownMenu.addClass("mobPosDropdown");
      });
      table_responsive.on('hide.bs.dropdown', function (e) {
        jQuery(e.target).append(dropdownMenu.detach());
        jQuery(e.target).find('.dropdown-menu').hide();
      });
      jQuery(".custom-menu").find(".dropdown-item").on("click", function (e) {
        jQuery(e.target).append(dropdownMenu.detach());
        jQuery(e.target).find('.custom-menu').hide();
      });
    });
  }

  fromSubmit() {
    this.SpinnerService.show();
    this.requisitionService.getAllOffCampusrequisition(this.searchform.value).subscribe((response: any) => {
      if (response) {
        this.requisitionList = response.filter(e => e.verticalId == 1);
      }
      else {
        this.requisitionList = [];
      }
    }, error => {
      // display form values on success
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.loadDataTable();
      this.SpinnerService.hide();
    })
  }
  reset() {
    this.searchform.reset();
    this.fromSubmit();
  }

  openRequisitionModal(data) {
    this.SelectedRequisitionDetailId = data.requisitionDetailId;
    this.CampusRequisitionTitle = data.requisitionTitle;
    this.CampusRequisitionTypeId = data.requisitionTypeId;
    this.getAllCampusFunction(data.verticalId);
    this.CampusFunctionId = data.functionId;
    this.CampusCandidateCount = data.candidateCount;
    this.CampusCollegeCategory = data.collegeCategoryId;
    this.CampusCourseId = data.campusCourseId;
    this.CampusRecruitmentYear = data.campusYearName;
    this.CampusrequisitionStreamId = data.campusStreamId;
    this.CampusRequisitionStream = data.streamName;
  }

  getAllCollegeCategory() {
    this.collegeCategories = [];
    this.campusCommonService.getAllCampusCollegeCategory().subscribe((result) => {
      if (result) {
        this.collegeCategories = result;
      }
      else {
        this.collegeCategories = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  closeRequisitionModal() {
    this.CampusRequisitionTitle = "";
    this.CampusRequisitionTypeId = undefined;
    this.CampusFunctionId = undefined;
    this.CampusCandidateCount = undefined;
    this.CampusCollegeCategory = undefined;
    this.CampusRequisitionStream = undefined;
    this.CampusrequisitionStreamId = undefined;
    this.CampusCourseId = undefined;
    jQuery("#requisitionModal").modal('toggle');
  }

  getAllCampusFunction(verticalId) {
    this.verticalFunctions = [];
    this.searchFunction.verticalId = verticalId;
    this.functionService.getAllCampusVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.verticalFunctions = result;
      }
      else {
        this.verticalFunctions = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  openConfirmModal(data) {
    this.SelectedRequisitionDetailId = data.requisitionDetailId;
  }

  onDelete() {
    this.SpinnerService.show();
    var formData = {
      RequisitionDetailId: Number(this.SelectedRequisitionDetailId),
      StatusId: 2,
      CreatedBy: this.createdBy
    }
    this.requisitionService.updateCampusCampusData(formData).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notificationService.showSuccess(response.msg, "Success");
        this.closeModal.nativeElement.click();
        this.fromSubmit();
        this.SpinnerService.hide();
      }
      else {
        this.notificationService.showError(response.msg, "Error");
        this.SpinnerService.hide();
      }
    }, error => {
      this.notificationService.showError("Something went wrong.. Try again later..", "");
      this.SpinnerService.hide();
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    })

  }
  onCanceClick() {

  }

  onUpdate() {

    this.SpinnerService.show();
    var formData = {
      RequisitionDetailId: Number(this.SelectedRequisitionDetailId),
      RequisitionTitle: this.CampusRequisitionTitle,
      RequisitionTypeId: Number(this.CampusRequisitionTypeId),
      FunctionId: Number(this.CampusFunctionId),
      CampusId: Number(this.CampusCourseId),
      CandidateCount: Number(this.CampusCandidateCount),
      CollegeCategoryId: Number(this.CampusCollegeCategory),
      StreamId: Number(this.CampusrequisitionStreamId),
      Stream: this.CampusRequisitionStream,
      Recruitmentyear: this.CampusRecruitmentYear,
      StatusId: 1,
      CreatedBy: this.createdBy
    }
    this.requisitionService.updateCampusCampusData(formData).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notificationService.showSuccess(response.msg, "Success");
        this.closeRequisitionModal();
        this.fromSubmit();
        this.SpinnerService.hide();
      }
      else {
        this.notificationService.showError(response.msg, "Error");
        this.SpinnerService.hide();
      }
    }, error => {
      this.notificationService.showError("Something went wrong.. Try again later..", "");
      this.SpinnerService.hide();
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    })
  }
  gotoViewCandiate(value) {
    jQuery(".custom-menu").hide();
    this.persistance.set("requisitionDetailId", Number(value.requisitionDetailId))
    this._route.navigate(['/app/offcampus/requisition-list/view-candidate']);
  }

}

