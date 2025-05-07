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
import { IAssessemenrAssignReleaseList, IAssessmentEvaluate, IBatchAssessment, IBatchesAssementEvaluateDetailsList, ICandidateAssessmentList, ICandidateEvaluationQuestionAnswer, ICandidateEvaluationQuestionMaster, ICandidateEvaluationUploadDetailsView, IEvaluateAssessmentListBatch, ISearchAssessmentAssignReleaseList, ISearchAssessmentEvaluation, ISearchEvaluateAssessmentListBatch, ISearchUploadAssessment, IUploadAssessmentDetails } from '../../../../interfaces/joining/programcoordinator.interface';
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
import { IApproverVertical, IApproverFunction, IApproverDepartment, IApproverVerticalFunctionDepartment, IApproverFunctionDepartment, IBatch, ISearchBatch } from '../../../../interfaces/common/common.interface';
import { ExcelService } from 'src/app/services/excel/excel.service';
declare var jQuery: any;

@Component({
  selector: 'app-pcuploadassessmentevaluation',
  templateUrl: './pcuploadassessmentevaluation.component.html',
  styleUrls: ['./pcuploadassessmentevaluation.component.css']
})
export class PcuploadassessmentevaluationComponent implements OnInit {

  @ViewChild('attachmentFileImport', { static: false }) attachmentFileImport: ElementRef;
  attachmentfileToUpload: File;
  BatchId: number;
  fileUploadArray: any[] = [];
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  batchId: number;
  coordinatorId: number;
  type: string;
  assessmentId: number;
  assessmentName: string;
  evaluateFor: string;
  candidatId: number;
  candidateInductionScheduleDetailsId: number;
  searchUplaodAssessmentEvaluation: ISearchUploadAssessment = {
    candidateAssessmentId: null,
    batchId: null,
    candidateId: null,
    candidateInductionScheduleDetailsId: null
  }
  uploadAssessmentAllDeatails: IUploadAssessmentDetails;
  uploadAssessmentCandidateDetails: ICandidateEvaluationUploadDetailsView[] = [];
  uploadedReturnDataArray: any[] = [];
  uploadeddetailsarray: any[] = [];
  successarray: any[] = [];
  searchuploadedevaluationdetails = {
    BatchId: null,
    EmployeeNo: null,
    candidateId: null,
    assessmentId: null
  }
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
    private programcoordinatorService: ProgramcoordinatorService,
    private excelService: ExcelService
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.BatchId = this.persistance.get('BatchId');
    this.activatedRoute.queryParams.subscribe((params) => {
      this.batchId = params['BatchId'];
      this.candidatId = params['CandidateId'];
      this.coordinatorId = params['CoOrdinatiorId'];
      this.assessmentId = params['AssessmentId'];
      this.candidateInductionScheduleDetailsId = params['CandidateInductionScheduleDetailsId'];
      this.evaluateFor = params['EvaluateFor'];
      this.type = params['Type'];
      this.assessmentName = params['AssessmentName'];
      this.searchuploadedevaluationdetails.BatchId = Number(this.batchId);
    });
    this.updateSearchEvaluateValue();
  }

  ngOnInit() {
    this.UploadedAssessmentEvaluation();
    this.loadDataTable();
  }
  updateSearchEvaluateValue() {
    if (this.evaluateFor == "Batch") {
      this.searchUplaodAssessmentEvaluation.batchId = Number(this.batchId);
    } else {
      this.searchUplaodAssessmentEvaluation.candidateId = Number(this.candidatId);
    }
    this.searchUplaodAssessmentEvaluation.candidateAssessmentId = Number(this.assessmentId);
    this.searchUplaodAssessmentEvaluation.candidateInductionScheduleDetailsId = Number(this.candidateInductionScheduleDetailsId);
    this.getUploadAssessmentEvaluationDetails();
  }
  getUploadAssessmentEvaluationDetails() {
    this.programcoordinatorService.getUploadAssessmentEvaluationDetails(this.searchUplaodAssessmentEvaluation).subscribe((result) => {
      if (result) {
        this.uploadAssessmentAllDeatails = result;
        this.SpinnerService.hide();
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
  }
  UploadedAssessmentEvaluation() {
    if (this.candidatId != undefined) {
      this.searchuploadedevaluationdetails.candidateId = Number(this.candidatId);
    }
    this.searchuploadedevaluationdetails.BatchId = Number(this.batchId);
    this.searchuploadedevaluationdetails.assessmentId = Number(this.assessmentId);
    this.programcoordinatorService.getUploadedAssessmentEvaluation(this.searchuploadedevaluationdetails).subscribe((result) => {
      if (result) {
        this.uploadeddetailsarray = result;
        this.successarray = this.uploadeddetailsarray.filter(e => (e.isActive == 1));
        console.log("check", this.uploadeddetailsarray)
        this.SpinnerService.hide();
      }
      else {
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
  onAttachmentFileChange(files: FileList) {
    // this.fileUploadArray = [];
    const mimeType = files[0].type;
    //alert(mimeType)
    // if (mimeType.match(/csv\/*/) == null) {
    //   this.notificationService.showError("Only csv files are supported", "Error");
    //   return;
    // }
    // if (files[0].size > 2097152) {
    //   this.notificationService.showError("File should be less than 2MB!", "Error");
    //   this.attachmentFileImport.nativeElement.innerText = "Choose file";
    //   this.attachmentfileToUpload = null;
    // } else {
    this.attachmentFileImport.nativeElement.innerText = files[0].name;
    this.attachmentfileToUpload = files.item(0);
    console.log("chck", this.attachmentfileToUpload)
    //}
  }
  onClickFileSubmit() {
    var flag = 0;
    var msg = "";
    if (this.attachmentfileToUpload == null) {
      flag = 1;
      msg = "Please Attach a file";
    }
    else {

    }
    // if (this.fileUploadArray.length == 0) {
    //   flag = 1;
    //   msg = "Please Attach a file";
    // }
    // else {

    // }
    if (flag == 0) {
      this.SpinnerService.show();
      const formData = new FormData();
      formData.append("Files", this.attachmentfileToUpload);
      this.programcoordinatorService.uploadAssessmentEvaluationData(formData).subscribe((result) => {
        console.log(result);
        if (result.status == 0) {
          this.notificationService.showError(result.msg, "Error");
          this.SpinnerService.hide();
        }
        else {
          this.uploadedReturnDataArray = result;  // List to be return from API
          //this.uploadedReturnDataArray.push(result)          
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.attachmentFileImport.nativeElement.innerText = "";
          this.attachmentFileImport.nativeElement.value = "";
          this.fileUploadArray = [];
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
        this.notificationService.showError("Something went wrong", "Error");
      });
    }
    else {
      this.notificationService.showError(msg, "Error");
    }
  }
  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        //"searching": true,
        //"paging": true,
        "scrollX": true,
        "bLengthChange": false,
      });
    });
  }
  onClickSubmit() {
    this.SpinnerService.show();
    const formData = new FormData();
    formData.append("CandidateAssessmentId", this.assessmentId.toString());
    formData.append("BatchId", this.batchId == undefined ? "0" : this.batchId.toString());
    formData.append("CandidateId", this.candidatId == undefined ? "0" : this.candidatId.toString());
    formData.append("CandidateInductionScheduleDetailsId", this.candidateInductionScheduleDetailsId.toString());
    formData.append("CandidateEvaluationUploadDetailsSave", JSON.stringify(this.uploadedReturnDataArray));
    formData.append("Files", this.attachmentfileToUpload);
    formData.append("CreatedBy", this.loginUserId.toString());
    this.programcoordinatorService.saveuploadAsseessmentEvaluation(formData).subscribe((result) => {
      // console.log(result);
      if (result.successFlag == 0) {
        this.notificationService.showError(result.msg, "Error");
        this.SpinnerService.hide();
      }
      else {
        this.SpinnerService.hide();
        this.notificationService.showSuccess(result.msg, "Success");
        this.attachmentFileImport.nativeElement.innerText = "";
        this.attachmentFileImport.nativeElement.value = "";
        this.fileUploadArray = [];
        this.UploadedAssessmentEvaluation();
        // this.AdditionalRemarks="";
        // this.getMedicalDocument();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
      this.notificationService.showError("Something went wrong", "Error");
    });
  }
  onClickBack() {
    if (this.BatchId == 0) {
      this._route.navigate(['/app/candidate-evaluate-assessment-list'], { queryParams: { CandidateId: this.candidatId, CoOrdinatiorId: this.coordinatorId, Type: this.type, AssessmetFor: this.evaluateFor } });
    }
    else {
      this._route.navigate(['/app/corporate/evaluate-assessment-list'], { queryParams: { BatchId: this.batchId, CoOrdinatiorId: this.coordinatorId, Type: this.type, AssessmetFor: this.evaluateFor } });
    }
  }
  onClickCancel() {

  }
  onFileDownload() {
    this.excelService.ExportAsExcelFile(this.uploadedReturnDataArray, "Assesment");
  }
  onFileDownloadaftersubmit() {
    //this.excelService.ExportAsExcelFile(this.uploadeddetailsarray, "SuccessReport");
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
    if (this.batchId == 0) {
      htmls = jQuery("#exportTableIndividual").html();
    } else {
      htmls = jQuery("#exportTableBatch").html();
    }

    var ctx = {
      worksheet: 'Worksheet',
      table: htmls
    }
    var link = document.createElement("a");
    link.download = "SuccessReport.xls";
    link.href = uri + base64(format(template, ctx));
    link.click();
  }
}
