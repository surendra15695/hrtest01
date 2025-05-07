import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ILocation, ISearchLocation } from 'src/app/interfaces/common/location.interface';
import { ISearchFunction, IVerticalFunction } from 'src/app/interfaces/common/function.interface';
import { ShareddataService } from 'src/app/sharedservices/shareddata.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { LocationService } from 'src/app/services/common/location/location.service';
import { CommonService } from 'src/app/services/common/common/common.service';
import { HandholdingService } from 'src/app/services/handholding/handholding.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { PositionService } from 'src/app/services/common/position/position.service';
import { HttpEventType } from '@angular/common/http';
import { Log } from 'oidc-client';
import { Observable, Observer } from 'rxjs';
import { filter } from 'rxjs/operators';
declare var jQuery: any;
declare var html2pdf: any;
@Component({
  selector: 'app-handholding-confirmationform-view',
  templateUrl: './handholding-confirmationform-view.component.html',
  styleUrls: ['./handholding-confirmationform-view.component.css']
})
export class HandholdingConfirmationformViewComponent implements OnInit {
  searchForm: FormGroup;
  saveform: FormGroup;
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  //vertical
  verticals: IVertical[] = [];
  selectedPendingVertical: IVertical;
  selectedVerticalId: number;
  defaultverticalId: number;
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
  zipFileName: any;
  arraytoUpload: any[] = [];
  selectedLocationId: number;
  confirmationReviewData: any;
  creviewData: any;
  confirmationReviewQuestions: any[] = [];
  AssignmentsArray: any[] = [];
  halfYearlyReviewData: any;
  halfYearlyReviewQuestions: any[] = [];
  hreviewData: any;
  jobshadowReviewData: any;
  jsrLength: any;
  lrLength: any;
  hrfLength: any;
  jreviewData: any;
  hrFeedbackData: any;
  hfData: any;
  hrReviewData: any;
  hrrLength: any;
  reviewDataForPdf: any = {};
  fileName: string;
  htmlPath: any;
  hrRData: any;
  listenReviewData: any;
  lreviewData: any;
  isDwnldFrmVisible: boolean = false;
  flag: number;
  //function
  selectAll: boolean;
  functions: IVerticalFunction[] = [];
  selectedFunction: IVerticalFunction;
  searchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  selectedfunctionId: number;
  functionName: string;
  getCandidateDetailsCandiate:any=[];
  verticalId: number;
  loginUserId: number;
  verticalIds: string;
  confirmationList: any[] = [];
  modifiedPdfValues:any={}
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private locationService: LocationService,
    private functionService: FunctionService,
    private chandHoldingService: HandholdingService,
    private persistance: PersistanceService,
    private SpinnerService: NgxSpinnerService,
    private notificationService: NotificationService
  ) {
    this.verticalId = null;
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.getAllLocation();
    this.getAllFunction();
    this.createSearchForm();
    this.getConfirmationList();
    this.isDwnldFrmVisible = false
  }

  ngOnInit() {
    this.loadDataTable();
    this.loadDatePicker();
    this.tableOptionDropDown();
    this.loadPopover();
    this.loadTooltipMenu();
  }
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }
  // loadDatePicker2() {
  //   jQuery(".datepicker1").parent(".input-group").datepicker({
  //     autoclose: true,
  //     format: "dd/mm/yyyy",
  //     todayHighlight: true
  //   });
  // }
  loadPopover() {
    setTimeout(() => {
      jQuery('[data-toggle="popover"]').popover({
        html: true
      });
    });
  }
  getCandiateDetails(data){
    var searchdata={
      EmpNo:data.EmpNo.toString(),
      CandidateId: Number(data.CandidateId)
    }
    this.chandHoldingService.GetCandidateDetailsConfReview(searchdata).subscribe((result) => {
      if (result) {
        this.getCandidateDetailsCandiate=result[0];
        this.modifiedPdfValues.candidateDetails=this.getCandidateDetailsCandiate;
        
      }
      else {
       // this.ReviewQuestions = [];
      }
    }, error => {
      console.log(error);
    }, () => {
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
  tableOptionDropDown() {
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
        'font-size': '13px'
      });
      dropdownMenu.addClass("mobPosDropdown");
    });
    table_responsive.on('hide.bs.dropdown', function (e) {
      jQuery(e.target).append(dropdownMenu.detach());
      dropdownMenu.hide();
    });
  }
  createSearchForm() {
    this.searchForm = this.fb.group({
      empId: [''],
      empName: [''],
      empStatus: [0],
      fromDate: [''],
      toDate: [''],
      locationId: [0],
      functionId: [0],
      probationId: [0],
      allocationStatus: [1],
      roleIds: this.persistance.get('loggedinuser').roleIds,
      autoUserId: this.persistance.get('loggedinuser').autoUserId,
      verticalId: [this.verticalId]
    });
  }
  //location
  getAllLocation() {
    this.locations = [];
    this.SpinnerService.show();
    this.searchLocation.verticalId = this.verticalId;
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
    this.searchFunction.verticalId = this.verticalId;
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        console.log(result);
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
  loadDataTable() {
    jQuery('#dataTable1').dataTable().fnClearTable();
    jQuery('#dataTable1').dataTable().fnDestroy();
    setTimeout(() => {
      // jQuery('#dataTable2').DataTable({
      //   "searching": false,
      //   "paging": true,
      //   "scrollX": true,
      //   "bLengthChange": false,
      // });
      jQuery('#dataTable1').dataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "fixedColumns": {
          "left": 6
          }
      });
    });
  }
  getEnableStatus(data) {
    return data.checked;
  }
  confirmationListVal :any=[];
  getConfirmationList() {
    this.SpinnerService.show();
    this.chandHoldingService.getAllHandholdingConfirmationForm(this.searchForm.value).subscribe((result) => {
      if (result) {
        this.confirmationList = result.filter(e => e.statusId == "Approved");
        this.confirmationListVal=this.confirmationList;
        this.SpinnerService.hide();
      }
      else {
        this.confirmationList = [];
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

  formSubmit(){            // By Arnab on 05-08-2023
    var flag = 0;
    this.searchForm.patchValue(
      {
        fromDate: this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value
      });
    if(this.fDate.nativeElement.value.length > 0 && this.tDate.nativeElement.value.length > 0){
      const [fDay, fMonth, fYear] = this.fDate.nativeElement.value.split("/");
      const fDate = new Date(fYear, fMonth - 1, fDay);
      const [tDay, tMonth, tYear] = this.tDate.nativeElement.value.split("/");
      const tDate = new Date(tYear, tMonth - 1, tDay);
      if(fDate > tDate){
        this.notificationService.showError("To Date Cann't be less than from From Date !! Please provide actual date", "Error");
        flag = 1;
      }
    }
    if(flag == 0){
      this.getConfirmationList();
    }
  }
  resetClick() {
    this.searchForm.reset();
    this.searchForm.patchValue({
      verticalId: this.verticalId,
      roleIds: this.persistance.get('loggedinuser').roleIds,                 // By Arnab on 05-08-2023
      autoUserId: this.persistance.get('loggedinuser').autoUserId            // By Arnab on 05-08-2023
    })
    this.getConfirmationList();
  }
  goToPDFDownload(data) {
    var searchdata = {
      CandidateId: data.candidateId,
      EmpNo: data.employeeNo
    }
    this.reviewDataForPdf.fullName = data.fullName;
    this.reviewDataForPdf.designation = data.designation;
    this.reviewDataForPdf.departmentName = data.departmentName;
    this.reviewDataForPdf.doj = data.doj;
    this.reviewDataForPdf.gradeName = data.gradeName;
    this.reviewDataForPdf.confirmationDue = data.confirmationDue;

    this.getConfirmationReviewDetail(searchdata);
    this.getCandiateDetails(searchdata);
    // this.getHalfYearlyReviewDetail(searchdata);
    // this.getJobShadowReview(searchdata);
    // this.getListenReview(searchdata);
    // this.getHrFeedbackDetails(searchdata);
    // this.getHrReviewDetails(searchdata);
    this.fileName = data.employeeNo.toString() + "_handholdingdocument.pdf";

    setTimeout(() => {
      this.htmlPath = document.getElementById("printerdiv").innerHTML;
      var dom = document.createElement('div');
      dom.innerHTML = this.htmlPath;
      html2pdf(dom, {
        margin: 6,
        filename: this.fileName,
        image: { type: 'jpeg', quality: 0.98 },
        //html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
        html2canvas: { scale: 3, y: 0, scrollY: 0 },
        //jsPDF: { format: 'A4' },
        //jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
        jsPDF: { format: 'A4', orientation: 'portrait' },
      });
    }, 100);
  }
  goToPDFDownloadMultiple(data) {
   if(this.flag==0) {
 var searchdata: any = {
      CandidateId: data.candidateId,
      EmpNo: data.EmpNo
    }
   } 
    if(this.flag==1){
      searchdata=this.confirmationList
       
    }

    this.getConfirmationReviewDetail(searchdata);
    this.getCandiateDetails(searchdata);
    this.fileName = data.EmpNo.split('.').join("").split(' ').join("") +  "_handholdingdocument.pdf";
    setTimeout(() => {
      this.htmlPath = document.getElementById("printerdiv").innerHTML;
      var dom = document.createElement('div');
      dom.innerHTML = this.htmlPath;
      html2pdf(dom, {
        margin: 8,
        filename: this.fileName,
        image: { type: 'jpeg', quality: 0.98 },
        //html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
        html2canvas: { scale: 3, y: 0, scrollY: 0 },
        //jsPDF: { format: 'A4' },
        //jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
        jsPDF: { format: 'A4', orientation: 'portrait' },
      });
      this.downloadAllDocuments()
    }, 400);
  }
  convertBase64ReviewerSign(imageUrl: string) {
    this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
      this.confirmationReviewData.confirmationData.reviewerSign = base64Data;
    });
  }
  convertBase64HodReviewerSign(imageUrl: string) {
    this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
      this.confirmationReviewData.confirmationData.hodReviewerSign = base64Data;
    });
  }
  convertBase64HrHeadReviewerSign(imageUrl: string) {
    this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
      this.confirmationReviewData.confirmationData.hrHeadReviewerSign = base64Data;
    });
  }
  convertBase64PlantHeadReviewerSign(imageUrl: string) {
    this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
      this.confirmationReviewData.confirmationData.plantHeadReviewerSign = base64Data;
    });
  }

  getConfirmationReviewDetail(data) {
    this.chandHoldingService.getAllHandHoldingConfirmationReviewDetail(data).subscribe((result) => {
      if (result) {
        this.confirmationReviewData = result;
        this.creviewData = this.confirmationReviewData.confirmationData;
        this.convertBase64ReviewerSign(this.confirmationReviewData.confirmationData.reviewerSign);
        this.convertBase64HodReviewerSign(this.confirmationReviewData.confirmationData.hodReviewerSign);
        this.convertBase64HrHeadReviewerSign(this.confirmationReviewData.confirmationData.hrHeadReviewerSign);
        this.convertBase64PlantHeadReviewerSign(this.confirmationReviewData.confirmationData.plantHeadReviewerSign);
        this.reviewDataForPdf.creviewData = this.creviewData;
        this.modifiedPdfValues.creviewData=this.creviewData;
        if (this.confirmationReviewData.confirmationDetailData.length > 0) {
          this.confirmationReviewQuestions = this.confirmationReviewData.confirmationDetailData;
          this.AssignmentsArray = this.confirmationReviewData.confirmationAssignmentData;

        }
        else {
        }
        this.reviewDataForPdf.confirmationReviewQuestions = this.confirmationReviewQuestions;
        this.reviewDataForPdf.AssignmentsArray = this.AssignmentsArray;
        this.modifiedPdfValues.AssignmentsArray=this.AssignmentsArray;
        this.modifiedPdfValues.confirmationReviewQuestions=this.confirmationReviewQuestions;
      }
      else {
        this.confirmationReviewData = {};
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getHalfYearlyReviewDetail(data) {
    this.chandHoldingService.getAllHandHoldingHalfYearlyReviewDetail(data).subscribe((result) => {
      if (result) {
        this.halfYearlyReviewData = result;
        this.hreviewData = this.halfYearlyReviewData.halfYearlyData;
        this.reviewDataForPdf.hreviewData = this.hreviewData;
        if (this.halfYearlyReviewData.halfYearlyDetailData.length > 0) {
          this.halfYearlyReviewQuestions = this.halfYearlyReviewData.halfYearlyDetailData;

        }
        else {
        }
        this.reviewDataForPdf.halfYearlyReviewQuestions = this.halfYearlyReviewQuestions;
      }
      else {
        this.halfYearlyReviewData = {};
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getJobShadowReview(data) {
    this.SpinnerService.show();
    this.chandHoldingService.getJobShadowReviewDetail(data).subscribe((result) => {
      if (result) {
        this.jobshadowReviewData = result;

        this.jsrLength = this.jobshadowReviewData.length;
        if (this.jobshadowReviewData.length > 0) {
          this.jreviewData = this.jobshadowReviewData[0];

        }
        else {
        }
        this.reviewDataForPdf.jreviewData = this.jreviewData;
        this.SpinnerService.hide();
      }
      else {
        this.jobshadowReviewData = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }

  getHrFeedbackDetails(data) {
    this.SpinnerService.show();
    this.chandHoldingService.getHRFeedbackDetail(data).subscribe((result) => {
      if (result) {
        this.hrFeedbackData = result;
        this.hrfLength = this.hrFeedbackData.length;
        if (this.hrFeedbackData.length > 0) {
          this.hfData = this.hrFeedbackData[0];

        }
        else {
        }
        this.reviewDataForPdf.hfData = this.hfData;
        this.SpinnerService.hide();
      }
      else {
        this.hrFeedbackData = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }

  getHrReviewDetails(data) {
    this.SpinnerService.show();
    this.chandHoldingService.getHRReviewDetail(data).subscribe((result) => {
      if (result) {
        this.hrReviewData = result;
        this.hrrLength = this.hrReviewData.length;
        if (this.hrReviewData.length > 0) {
          this.hrRData = this.hrReviewData[0];

        }
        this.SpinnerService.hide();
        this.reviewDataForPdf.hrRData = this.hrRData;
      }
      else {

        this.hrReviewData = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }

  getListenReview(data) {
    this.SpinnerService.show();
    this.chandHoldingService.getListenReviewDetail(data).subscribe((result) => {
      if (result) {
        this.listenReviewData = result;

        this.lrLength = this.listenReviewData.length;
        if (this.listenReviewData.length > 0) {
          this.lreviewData = this.listenReviewData[0];

        }
        else {
        }
        this.SpinnerService.hide();
        this.reviewDataForPdf.lreviewData = this.lreviewData;
      }
      else {
        this.listenReviewData = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  onCheckRowWiseAll() {
    // if (eve.target.checked == true) {
    //   this.flag=0
    //   console.log("check single row-",data)
    //   this.SpinnerService.show();
    if(this.confirmationListVal.length >0){
      var searchdata = {
        CandidateId: this.confirmationListVal[0].candidateId,
        EmpNo: this.confirmationListVal[0].employeeNo
      }
      this.getConfirmationReviewDetail(searchdata);
      this.getHalfYearlyReviewDetail(searchdata);
      this.getJobShadowReview(searchdata);
      this.getListenReview(searchdata);
      this.getHrFeedbackDetails(searchdata);
      this.getHrReviewDetails(searchdata);
      var EmpNoforupload = this.confirmationListVal[0].employeeNo;
      var candidateIdforupload=this.confirmationListVal[0].candidateId
      setTimeout(() => {
        var singlehtmlPath = document.getElementById("printerdivZip").innerHTML;
        this.arraytoUpload.push({
          documentstring: singlehtmlPath,
          empNo: EmpNoforupload,
          cadidateId:candidateIdforupload
        })
        this.confirmationListVal = this.confirmationListVal.filter( e=> e.candidateId != candidateIdforupload)
       
        this.arraytoUpload.length > 0 ? this.isDwnldFrmVisible = true : this.isDwnldFrmVisible = false
        this.onCheckRowWiseAll();
        this.SpinnerService.hide();
      }, 500);
    }
    // }
    // else {
    //   this.arraytoUpload = this.arraytoUpload.filter(e => e.empNo != data.employeeNo);
    //   this.arraytoUpload.length > 0 ? this.isDwnldFrmVisible = true : this.isDwnldFrmVisible = false
    // }
  }

  onCheckRowWise(data, eve, index) {
    if (eve.target.checked == true) {
      this.flag=0
      console.log("check single row-",data)
      this.SpinnerService.show();
      var searchdata = {
        CandidateId: data.candidateId,
        EmpNo: data.employeeNo
      }
      this.getConfirmationReviewDetail(searchdata);
      this.getHalfYearlyReviewDetail(searchdata);
      this.getJobShadowReview(searchdata);
      this.getListenReview(searchdata);
      this.getHrFeedbackDetails(searchdata);
      this.getHrReviewDetails(searchdata);
      var EmpNoforupload = data.employeeNo;
      var candidateIdforupload=data.candidateId
      setTimeout(() => {
        var singlehtmlPath = document.getElementById("printerdivZip").innerHTML;
        this.arraytoUpload.push({
          documentstring: singlehtmlPath,
          empNo: EmpNoforupload,
          cadidateId:candidateIdforupload
        })
        this.arraytoUpload.length > 0 ? this.isDwnldFrmVisible = true : this.isDwnldFrmVisible = false
        this.SpinnerService.hide();
      }, 500);

    }
    else {
      this.arraytoUpload = this.arraytoUpload.filter(e => e.empNo != data.employeeNo);
      this.arraytoUpload.length > 0 ? this.isDwnldFrmVisible = true : this.isDwnldFrmVisible = false
    }
  }
  downloadcheckAllDocuments(){
    if( this.arraytoUpload.length >0){
      for (let i = 0;i<this.arraytoUpload.length;i++) {
        var data={
          candidateId:this.arraytoUpload[i].cadidateId,
          EmpNo: this.arraytoUpload[i].empNo
        }
      // var data={
      //   candidateId:this.arraytoUpload[0].cadidateId,
      //   EmpNo: this.arraytoUpload[0].empNo
      // }
      // this.arraytoUpload=this.arraytoUpload.filter(e => e.cadidateId != data.candidateId);
      this.goToPDFDownloadMultiple(data)
    }
  }
}
  downloadAllDocuments() {
    // this.zipFileName = "Handholding_document_Details";
    // this.SpinnerService.show();
    // var empids = ""
    // for (var val of this.arraytoUpload) {
    //   empids += val.empNo + ","
    // }
    // var formdata = new FormData();
    // formdata.append("Empids", empids);
    // formdata.append("DownloadFormsStringValues", JSON.stringify(this.arraytoUpload));
    // this.chandHoldingService.downloadFiles(formdata).subscribe(
    //   data => {
    //     switch (data.type) {
    //       case HttpEventType.DownloadProgress:
    //         break;
    //       case HttpEventType.Response:
    //         const downloadedFile = new Blob([data.body], { type: data.body.type });
    //         const a = document.createElement('a');
    //         a.setAttribute('style', 'display:none;');
    //         document.body.appendChild(a);
    //         a.download = this.zipFileName;
    //         a.href = URL.createObjectURL(downloadedFile);
    //         a.target = '_blank';
    //         a.click();
    //         document.body.removeChild(a);
    //         break;
    //     }
    //     this.SpinnerService.hide();

    //   },
    //   error => {
    //   }
    // );
    if( this.arraytoUpload.length >0){
    var data={
      candidateId:this.arraytoUpload[0].cadidateId,
      EmpNo: this.arraytoUpload[0].empNo
    }
    this.arraytoUpload=this.arraytoUpload.filter(e => e.cadidateId != data.candidateId);
    this.goToPDFDownloadMultiple(data)
  }
  else{
    this.getConfirmationList()
    jQuery("#chkAll").prop("checked", false);
  }
  }
  onCheckSelectAll(event) {
    
    // if (event.target.checked == true) { 
    //   this.flag=1   
    //  for(var obj of this.confirmationList){
    //   obj.isChecked=true;
    //   console.log("check for All-",this.confirmationList);
    //  }
    //   this.arraytoUpload = [];
    //   this.SpinnerService.show();
    //   for (var val of this.confirmationList) {
    //     var searchdata = {
    //       CandidateId: val.candidateId,
    //       EmpNo: val.employeeNo
    //     }
        
    //     this.getConfirmationReviewDetail(searchdata);
    //     this.getHalfYearlyReviewDetail(searchdata);
    //     this.getJobShadowReview(searchdata);
    //     this.getListenReview(searchdata);
    //     this.getHrFeedbackDetails(searchdata);
    //     this.getHrReviewDetails(searchdata);
    //     var candidateIdforupload=val.candidateId
    //     var EmpNoforupload = val.employeeNo;
    //     setTimeout(() => {
    //       var singlehtmlPath = document.getElementById("printerdivZip").innerHTML;
    //       this.arraytoUpload.push({
    //         documentstring: singlehtmlPath,
    //         empNo: EmpNoforupload,
    //         candidateId: candidateIdforupload,
    //       })
    //       this.SpinnerService.hide();
    //       this.arraytoUpload.length > 0 ? this.isDwnldFrmVisible = true : this.isDwnldFrmVisible = false
          
    //     }, 200);
    //   }
    // }
    // else {
    //   this.arraytoUpload = [];
    //   for(var obj of this.confirmationList){
    //     obj.isChecked=false;
    //     this.isDwnldFrmVisible = false;
    //     this.SpinnerService.hide();
    //    }
    // }
    if(event.target.checked ==true){
      for(var obj of this.confirmationList){
        obj.isChecked=true;
      }
      this.flag=0
      this.confirmationListVal=this.confirmationList;
      this.onCheckRowWiseAll();
    }
    if(event.target.checked ==false){
      for(var obj of this.confirmationList){
        obj.isChecked=false;
      }
    }
  }

  getSelectAllValue(data) {
    return this.selectAll;
  }

    /* Method to fetch image from Url */
    getBase64ImageFromURL(url: string): Observable<string> {
      return Observable.create((observer: Observer<string>) => {
        // create an image object
        let img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = url;
        if (!img.complete) {
          // This will call another method that will create image from url
          img.onload = () => {
            observer.next(this.getBase64Image(img));
            observer.complete();
          };
          img.onerror = err => {
            observer.error(err);
          };
        } else {
          observer.next(this.getBase64Image(img));
          observer.complete();
        }
      });
    }
  
    /* Method to create base64Data Url from fetched image */
    getBase64Image(img: HTMLImageElement): string {
      // We create a HTML canvas object that will create a 2d image
      var canvas: HTMLCanvasElement = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
      // This will draw image
      ctx.drawImage(img, 0, 0);
      // Convert the drawn image to Data URL
      let dataURL: string = canvas.toDataURL("image/png");
      //return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
      return dataURL;
    }
}
