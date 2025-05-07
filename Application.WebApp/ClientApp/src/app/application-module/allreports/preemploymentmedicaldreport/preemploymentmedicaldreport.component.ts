import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { IDocumentStatus, ISearchDocumentStatus } from '../../../interfaces/common/common.interface';
import { IDoctor, ISearchDoctor } from '../../../interfaces/common/doctor.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../interfaces/common/function.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../interfaces/common/position.interface';
import { IPendingCandidateList } from '../../../interfaces/prejoining/pendingcandidatelist.interface';
import { LocationService } from '../../../services/common/location/location.service';
import { CommonService } from '../../../services/common/common/common.service';
import { FunctionService } from '../../../services/common/function/function.service';
import { DepartmentService } from '../../../services/common/department/department.service';
import { PositionService } from '../../../services/common/position/position.service';
import { RecruitmentmanagerService } from '../../../services/prejoining/recruitmentmanager/recruitmentmanager.service';
import { ShareddataService } from '../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { IApproverVertical, IApproverFunction, IApproverDepartment, IApproverVerticalFunctionDepartment, IApproverFunctionDepartment } from '../../../interfaces/common/common.interface';
import { element } from 'protractor';
import { ICandidateDetailData, ISearchCandidateDetail, IModeOfJoining, ISearchModeOfJoining } from '../../../interfaces/preselection/candidate.interface';
import { CorporateallocationService } from 'src/app/services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { CandidateService } from '../../../services/preselection/candidate/candidate.service';
import { ISearchRequisition, IRequisitionList } from '../../../interfaces/preselection/requisition.interface';
import { ReportService } from 'src/app/services/reports/report.service';

declare var jQuery: any;

@Component({
  selector: 'app-preemploymentmedicaldreport',
  templateUrl: './preemploymentmedicaldreport.component.html',
  styleUrls: ['./preemploymentmedicaldreport.component.css']
})
export class PreemploymentmedicaldreportComponent implements OnInit {
  //@ViewChild('closeModal', { static: false }) cModal: ElementRef;
  searchform: FormGroup;
  saveform: FormGroup;
  //vertical
  verticals: IVertical[] = [];
  selectedPendingVertical: IVertical;
  selectedVerticalId: number;
  defaultverticalId: number;
  selectedVertical: IVertical;
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

  //grade
  grades: IPositionGrade[] = [];
  selectedGrade: IPositionGrade;
  searchGrade: ISearchPositionGrade = {
    verticalId: null,
    positionId: null,
    isActive: true
  }
  gradeId: number;
  gradeName: string;
  // document status
  documentStatus: IDocumentStatus[] = [];
  selectedDocument: IDocumentStatus;
  searchDocument: ISearchDocumentStatus = {
    approvalListId: null,
    isActive: null
  }
  selectedDocumentStatusId: number;

  loginUserId: number;
  pendingCandidateList: IPendingCandidateList[] = [];
  selectAll: boolean = false;
  callngIfFunction: boolean = true;
  sendingType: string;
  sendingCandidateId: number;
  searchDoctor: ISearchDoctor = {
    DoctorsId: null,
    IsActive: true
  }
  doctorsList: IDoctor[] = [];
  bGVReportType: string;
  bGVReportRequiredCandidateCheckList: any[] = [];
  fileUploadArray: any[] = [];
  @ViewChild('attachmentFileImport', { static: false }) attachmentFileImport: ElementRef;
  @ViewChild('dateOfJoiningFrom', { static: false }) dtOfJoiningFrom: ElementRef;
  @ViewChild('dateOfJoiningTo', { static: false }) dtOfJoiningTo: ElementRef;
  attachmentfileToUpload: File;
  candidateBVGReportId: any;
  verticalIds: string;
  candidateId: number;
  requisitionDetailId: number;
  showBtnSendToCompanyDoctor: boolean;
  showBtnSendtoCompanyDoctorFlag: number = 0;
  allJoiningDateInformation: any[] = [];
  btnJoiningConfirmation: boolean;
  btnSendToOnboarding: boolean;

  //SMAJI - START
  joiningConfirmationCandidateList: any[] = [];
  // Mode of joining dropdown

  modeOfJoiningList: IModeOfJoining[] = [];
  searchModeOfJoining: ISearchModeOfJoining = {
    modeofJoiningId: null,
    isActive: null
  }
  onBoardingSendingType: string;
  onBoardingSingleCandidateId: any;
  OnBoardingManager: number = null;
  onBoardingManagerList: any[] = [];
  //SMAJI - END

  searchRoleUser: any = {
    roleId: 0
  }
  requisitionLists: IRequisitionList[] = [];
  requisitionPositionName: string;
  requisitionDepartmentName: string;
  requisitionFunctionName: string;
  requisitionVerticalId: number;
  requisitionFunctionId: number;
  searchRequisition: ISearchRequisition = {
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
    requisitionTypeId: null,
  }
  sendToOnboardingVerticalId: any;
  prevVerticalId: number;
  dataList: any[] = [];
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private functionService: FunctionService,
    private commonService: CommonService,
    private recruitmentmanagerService: RecruitmentmanagerService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private titleService: Title,
    private positionService: PositionService,
    private corporateService: CorporateallocationService,
    private candidateService: CandidateService,
    private reportService: ReportService,
  ) {
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    //alert(this.verticalIds);
    this.requisitionDetailId = this.persistance.get('paramid');
    //alert(this.requisitionDetailId);
    this.createSearchForm();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllFunction();
  }

  ngOnInit() {
    this.loadDataTable();
    this.loadDatePicker();
    setTimeout(() => {
      this.formSubmit(); 
    })
  }

  createSearchForm() {
    this.searchform = this.fb.group({
      requisitionDetailId: [0],
      candidateId: null,
      candidateNo: [''],
      requisitionNo: [''],
      name: [''],
      verticalId: [0],
      locationId: [0],
      functionId: [0],
      gradeId: [0],
      docApprovalStatusId: [0],
      rmdocApprovalStatusId: [0],
      omdocApprovalStatusId: [0],
      preEmployeeMedicalStatus: [0],
      dtofJoiningFrom: [''],
      dtofJoiningTo: [''],
      hiringStatus: [0],
      allocatedAutouserId: [0],
      bgvstatus: [-1]
    });

  }

  loadDatePicker() {
    var dothis = this;
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    }).on("change", function (e) {
      var selecteddate = e.target.value;
      var datepickerid = jQuery(e.target).attr("id");
      var rowid = parseInt(datepickerid.replace("datepicker", ""));

      dothis.joiningConfirmationCandidateList[rowid].DateofJoining = e.target.value;
    });;
  }

  //verticals
  getAllVerticals(){
    this.verticals = [];
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
   // this.loadSelectPicker();
    this.selectedVertical = this.verticals.filter(x => x.verticalId == 0)[0];
  }
  changeVertical() {
    var verticalId = this.searchform.get("verticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0];
    this.getAllLocation();
    this.getAllFunction();
    this.getAllGrade();
  }
  //locations
  getAllLocation() {
    this.locations = [];
    this.searchLocation.verticalId = this.selectedVertical.verticalId;
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
    }, () => {
    });
  }
  changeLocation() {
    this.selectedLocationId = this.searchform.get("verticalId").value;
    // this.getAllFunction();
  }
  //Function
  getAllFunction() {
    this.functions = [];
    this.searchFunction.verticalId =  this.selectedVertical.verticalId;
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
    }, () => {

    });
  }

  // Grade
  getAllGrade() {
    this.grades = [];
    this.searchGrade.verticalId = this.defaultverticalId;
    this.positionService.getAllPositionGrade(this.searchGrade).subscribe((result) => {
      if (result) {
        this.grades = result;
        this.grades.splice(0, 0, {
          positionId: 0,
          gradeName: "All",
          gradeId: 0,
          verticalId: "",
          isActive: true,

        })
      }
      else {
        this.grades = [];
        this.grades = result;
        this.grades.splice(0, 0, {
          positionId: 0,
          gradeName: "All",
          gradeId: 0,
          verticalId: "",
          isActive: true,
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getPrejoiningCandidateList() {
    this.dataList = [];
    this.reportService.candidatemanagementreport(this.searchform.value).subscribe((result) => {
      if (result) {
        this.dataList = result;
        console.log(this.dataList);
        if (this.searchform.value.bgvstatus != -1) {
          this.dataList = this.dataList.filter(x => x.bvgReportStatusId == this.searchform.value.bgvstatus);
        }
        // console.log("All Candidate Management List", this.pendingCandidateList);
        this.SpinnerService.hide();
      }
      else {
        this.dataList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.loadDataTable();
      this.SpinnerService.hide();
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
        "fixedColumns": {
          "left": 3
        }
      });
    });
  }

  // formSubmit() {                             // By Arnab on 05-08-2023
  //   this.searchform.patchValue({
  //     candidateId: Number(this.searchform.value.candidateId),
  //     dtofJoiningFrom: this.dtOfJoiningFrom.nativeElement.value,
  //     dtofJoiningTo: this.dtOfJoiningTo.nativeElement.value,
  //   })
  //   this.getPrejoiningCandidateList();
  // }
  formSubmit() {                // By Arnab on 05-08-2023
    var flag = 0;
    this.searchform.patchValue({
      candidateId: Number(this.searchform.value.candidateId),
      dtofJoiningFrom: this.dtOfJoiningFrom.nativeElement.value,
      dtofJoiningTo: this.dtOfJoiningTo.nativeElement.value,
    })
    if (this.dtOfJoiningFrom.nativeElement.value.length > 0 && this.dtOfJoiningTo.nativeElement.value.length > 0) {
      const [fDay, fMonth, fYear] = this.dtOfJoiningFrom.nativeElement.value.split("/");
      const fDate = new Date(fYear, fMonth - 1, fDay);
      const [tDay, tMonth, tYear] = this.dtOfJoiningTo.nativeElement.value.split("/");
      const tDate = new Date(tYear, tMonth - 1, tDay);
      if (fDate > tDate) {
        this.notificationService.showError("To Date Cann't be less than from From Date !! Please provide actual date", "Error");
        flag = 1;
      }
    }
    if (flag == 0) {
      this.getPrejoiningCandidateList();
    }
  }
  exportToExcel() {
    var htmls = "";
    var uri = 'data:application/vnd.ms-excel;base64,';
    var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
    var base64 = function (s) {
      return window.btoa(unescape(encodeURIComponent(s)))
    };
    var format = function (s, c) {
      return s.replace(/{(\w+)}/g, function (m, p) {
        return c[p];
      })
    };
    htmls = jQuery("#exportTable").html();
    var ctx = {
      worksheet: 'Worksheet',
      table: htmls
    }
    var link = document.createElement("a");
    link.download = "Candidate Management Report.xls";
    link.href = uri + base64(format(template, ctx));
    link.click();
  }

  reset() {                   // By Arnab on 05-08-2023
    this.searchform.reset();
    this.searchform.patchValue({
      verticalId:   0,
      locationId:   0,
      functionId:   0,
      departmentId: 0,
      positionId:   0,
      bgvstatus:-1
    })
    this.changeVertical();
    //this.changeFunction();
    this.formSubmit();
  }
}
