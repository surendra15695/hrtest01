import { Component, OnInit, ViewChild, ElementRef, SystemJsNgModuleLoader } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ICandidateDetailData, ISearchCandidateDetail, IModeOfJoining } from '../../../interfaces/preselection/candidate.interface';
import { ISearchInterviewClarificationList, IInterviewClarificationList, IInterviewClarificationListData, IInterviewClarificationData, IInterviewCalendarActionFormData } from '../../../interfaces/selection/interviewcalendaraction.interface';
import { CandidateService } from '../../../services/preselection/candidate/candidate.service';
import { RequisitionService } from '../../../services/preselection/requisition/requisition.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { IRequisitionList, ISearchRequisition } from '../../../interfaces/preselection/requisition.interface';
import { FunctionService } from '../../../services/common/function/function.service';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { ISearchFunction, IVerticalFunction } from '../../../interfaces/common/function.interface';
import { ReportService } from '../../../services/reports/report.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { ICandidateList } from '../../../interfaces/common/inductionassessment.interface';


declare var jQuery: any;
declare var moment: any;

@Component({
  selector: 'app-candidatetracker-report',
  templateUrl: './candidatetracker-report.component.html',
  styleUrls: ['./candidatetracker-report.component.css']
})

export class CandidatetrackerReportComponent implements OnInit {

  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string

  searchInterviewClarification: ISearchInterviewClarificationList = {
    calendarId: null,
    requisitionDetailId: null,
    candidateId: null
  };
  //vertical
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  verticalIds: string;
  //function
  functions: IVerticalFunction[] = [];
  selectedFunction: IVerticalFunction;
  searchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  functionId: number;
  functionName: string;
  //requisition list
  requisitionLists: IRequisitionList[] = [];
  SearchReqNo: ISearchRequisition = {
    requisitionNo: null,
    requistionId: null,
    requisitionDetailId: null,
    locationId: null,
    verticalId: null,
    fromDate: null,
    toDate: null,
    iOMNo: null,
    requisitionApprovalStatus: null,
    requisitionProcessStatus: null,
    createdBy: null,
    approverAutoUserId: null,
    allocatedUserId: null,
    requisitionTypeId: null

  }
  //candidate list
  candidateLists: ICandidateList[] = [];
  searchCandidateNo: ICandidateList = {
    requisitionDetailId: null,
    candidateId: null,
    candidateNo: null,
    requisitionNo: null,
    candidateFullName: null,
    verticalId: null,
    verticalName: null,
    designation: null,
    designationName: null,
    functionId: null,
    functionName: null,
    departmentId: null,
    departmentName: null,
    locationId: null,
    locationName: null,
    gradeId: null,
    gradeName: null,
    emailId: null,
    contact: null,
    qualificationId: null,
    qualificationName: null,
    courseId: null,
    courseName: null,
    streamId: null,
    streamName: null,
    marksPercentage: null,
    experienceYear: null,
    experienceMonth: null,
    stateId: null,
    stateName: null,
    dateofJoining: null,
    modeofJoining: null,
    modeofJoiningName: null,
    positionCode: null,
    remarks: null,
    docApprovalStatusId: null,
    docApprovalStatus: null,
    hiringStatusId: null,
    hiringStatusName: null,
    candidateOnBoardingId: null,
    onBoardingCoordinator: null,
    candidateReprtingVenueId: null


  }

  interClarifications: IInterviewClarificationList[];
  interviewClarificationList: IInterviewClarificationListData[];
  interviewClarificationdata: IInterviewClarificationData[] = [];
  calendarActionFormData: IInterviewCalendarActionFormData = {
    CalendarIds: null,
    AcceptStatus: null,
    Remarks: null,
    CreatedBy: null
  }

  filterForm: FormGroup;
  scheduleForm: FormGroup;
  btnVisible: boolean = false;
  topBtnVisible: boolean = false;
  candidates: ICandidateDetailData[] = [];
  candidateIds: string = "";
    //reportService: any;

  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private candidateService: CandidateService,
    private requisitionService: RequisitionService,
    private SpinnerService: NgxSpinnerService,
    private excelService: ExcelService,
    public functionService: FunctionService,
    public reportService: ReportService,
    private persistance: PersistanceService,

  ) {
    this.createFilterForm();
    this.getAllVerticals();
    this.getAllFunction();
    //this.getAllAllocatedUserId();
    this.selectedHiringStatus();

  }

  ngOnInit() {
    this.loadSelectPicker();
    this.loadDataTable();
  }

  createFilterForm() {
    this.filterForm = this.fb.group({
      requisitionNo: [''],
      verticalId: null,
      functionId: null,
      allocatedAutoUserId: null,
      hiringStatusId: null,
    });
  }
  //functions
  getAllFunction() {
    this.functions = [];
    this.searchFunction.verticalId = this.selectedVertical.verticalId;
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;
        this.functions.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          isActive: true,
          verticalName: ""
        })
      }
      else {
        this.functions = [];
        this.functions.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          isActive: true,
          verticalName: ""
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  //verticals
  getAllVerticals() {
    this.verticals = [];
    this.verticalIds = "1,2,3";
    var splitvertical = this.verticalIds.split(",");
    var allvertical = "";
    console.log(splitvertical);
    for (var i = 0; i < splitvertical.length; i++) {
      if (splitvertical[i] != "0") {
        if (splitvertical[i] == "1") {
          this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
        }
        else if (splitvertical[i] == "2") {
          this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
        }
        else if (splitvertical[i] == "3") {
          this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
        }
        if (allvertical == "") {
          allvertical = splitvertical[i];
        }
        else {
          allvertical = allvertical + "," + splitvertical[i];
        }
      }

    }
    this.selectedVertical = this.verticals[0];
    this.filterForm.patchValue(
      {
        verticalId: this.selectedVertical.verticalId,
      });
    // this.setDefaultVertical();
  }

  setDefaultVertical() {
    setTimeout(() => {
      jQuery('.ddlvertical').selectpicker("val", "0: " + this.selectedVertical.verticalId + "");
      jQuery('.ddlvertical').selectpicker("refresh");
    });
  }

  changeVertical() {
    var verticalId = this.filterForm.get("verticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0];
    console.log(this.selectedVertical);
    this.getAllFunction();
  }

  // HiringStatus
  selectedHiringStatus() {
    this.candidateLists = [];
    var obj = {
      hiringStatusId: 0,
      hiringStatusName: "",
      
    }
    //this.SearchCandidateNo.candidateNo = this.SearchCandidateNo.candidateNo;
    this.candidateService.getCandidateList(obj).subscribe((result) => {
      if (result) {
        this.candidateLists = result;
      }
    }, error => {
      console.log(error);
    }, () => {
      //this.loadSelectPicker();
    });
  }
  //changeHiringStatus() {
  //  this.searchCandidateNo.hiringStatusId = this.searchCandidateNo.hiringStatusId;
  //}
  // Requisition
  selectedRequisition() {
    this.requisitionLists = [];
    var obj = {
      ReqNo: "",
      ReqId: 0
    }
    //this.SearchReqNo.requisitionNo = this.SearchReqNo.requisitionNo;
    this.requisitionService.getAllRequisition(obj).subscribe((result) => {
      if (result) {
        this.requisitionLists = result;
      }
    }, error => {
      console.log(error);
    }, () => {
      //this.loadSelectPicker();
    });
  }
  changeRequisitionNo() {
    this.SearchReqNo.requisitionNo = this.SearchReqNo.requisitionNo;
  }

  //onFilter() {
  //  debugger
  //  this.filterForm.patchValue({
  //    HiringStatusId: Number(this.filterForm.value.HiringStatusId),
  //  });
  //  //console.log(this.filterForm.value);
  //  this.getFilterCandidateList();
  //}
  fromSubmit() {
    this.filterForm.patchValue(
      {
        createdBy: this.persistance.get('loggedinuser').autoUserId,
        approverAutoUserId: this.persistance.get('loggedinuser').autoUserId,
       // fromDate: this.fDate.nativeElement.value,
       // toDate: this.tDate.nativeElement.value,
        verticalId: this.selectedVertical.verticalId,
        // departmentId: this.SearchDepartmentId.departmentId,
      });
    console.log(this.filterForm.value);
    //this.SpinnerService.show();
    this.reportService.candidatetrackerreport(this.filterForm.value).subscribe((result) => {
      if (result) {
        console.log(result);
        this.candidates = result;
        this.loadDataTable();
        //this.SpinnerService.hide();
      }
      else {
        this.candidates = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
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
      jQuery(".dropdown-item").on("click", function () {
        jQuery('.dropdown-menu').hide();
      });
    });
  }
  reset() {
    this.filterForm.reset();
    this.filterForm.patchValue({
      verticalId: 0,
      locationId: 0,
      requisitionApprovalStatus: 0
    })
    //this.loadSelectPicker();
    this.candidates = [];
    this.loadDataTable();
  }

  ExportReport() {
    this.excelService.ExportAsExcelFile(this.candidates, 'Report_CandidateTracker');
  }

  getFilterCandidateList() {
    this.SpinnerService.show();
    this.candidates = [];
    // this.setFilterForm();           
    this.reportService.candidatetrackerreport(this.filterForm.value).subscribe((result) => {
      if (result) {
        this.candidates = result;
        //console.log("Candidate: ", this.candidates);
        // for (var i = 0; i < this.candidates.length; i++) {
        //   this.candidates[i].popoverContent = "<div><span class='grey'>Emp. ID: </span><span>" + this.candidates[i].referalEmpNo + "</span></div><div><span class='grey'>Designation: </span></br><span>" + this.candidates[i].referalDesignation + "</span></div><div><span class='grey'>Function: </span><span>" + this.candidates[i].referalGrade + "</span></div>";
        // }        
      }
      else {
        this.candidates = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadDataTable();
      this.SpinnerService.hide();
    });
  }


  loadSelectPicker() {
    setTimeout(() => {
      jQuery('.selectpicker').selectpicker({
        size: 6
      });
      jQuery('.selectpicker').selectpicker('refresh');
    });
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
}
