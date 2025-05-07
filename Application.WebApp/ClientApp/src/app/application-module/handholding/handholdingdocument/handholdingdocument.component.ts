import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ShareddataService } from '../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../sharedservices/notification.service';
import { HandholdingService } from '../../../services/handholding/handholding.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { CandidateService } from '../../../services/joining/candidate/candidate.service';
import { ICandidateAssessmentData, ICandidateAssessmentDetails, ISearchCandidateAssessment } from '../../../interfaces/joining/candidate.interface';
import { ICandidateInductionFeedback, ICandidateFeedbackDetailData } from '../../../interfaces/joining/candidate.interface';
import { Observable, Observer } from 'rxjs';
declare var jQuery: any;
declare var html2pdf: any;
@Component({
  selector: 'app-handholdingdocument',
  templateUrl: './handholdingdocument.component.html',
  styleUrls: ['./handholdingdocument.component.css']
})
export class HandholdingdocumentComponent implements OnInit {
  createdBy: number;
  candidateId: number;
  empNo: string;
  empName: string;
  halfYearlyReviewData:any;
  halfYearlyReviewQuestions:any[]=[];
  hreviewData:any;
  confirmationReviewData:any;
  confirmationReviewQuestions:any[]=[];
  creviewData:any;
  approver:any;
  AssignmentsArray:any[]=[];
  listenReviewData:any;
  lreviewData:any;
  jobshadowReviewData:any;
  jreviewData:any;
  hrFeedbackData:any;
  hfData:any;
  hrReviewData:any=[];
  hrRData:any;
  jsrLength: any;
  lrLength:any;
  hrfLength:any;
  hrrLength:any;
  reviewDataForPdf:any={};
  candiddateAssementDetails: ICandidateAssessmentDetails[] = [];
  candidateAssessmentDataList: ICandidateAssessmentData;
  candidateInductionFeedbackList: ICandidateInductionFeedback;
  candidateFeedbackDetailData: ICandidateFeedbackDetailData[] = [];
  fileName:string;
  htmlPath:any;
  searchCandidateAssessmentData: ISearchCandidateAssessment = {
    candidateId: null
  }
  searchInductionFeedback = {
    candidateId: null,
  }
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private titleService: Title,
    private persistance: PersistanceService,
    private handholdingService: HandholdingService,
    private candidateService: CandidateService
  ) { 
    if(this.persistance.get('pagename') != null){
      if (this.persistance.get('pagename') == "plantcandidate"
        || this.persistance.get('pagename') == "handholdingPlantApprovalList"
        || this.persistance.get('pagename') == "handholdingCorporateApprovalList"
        || this.persistance.get('pagename') == "handholdingSalesApprovalList"
      ){
        this.candidateId = this.persistance.get('candidateId');
        this.empNo = this.persistance.get('empNo');
        this.empName = this.persistance.get('empName');
        this.approver = this.persistance.get('approver');
        this.getConfirmationReviewDetail();
        this.getHalfYearlyReviewDetail();
        this.getJobShadowReview();
        this.getListenReview();
        this.getHrFeedbackDetails();
        this.getHrReviewDetails();
        this.searchCandidateAssessmentData.candidateId =Number(this.candidateId)
        this.searchInductionFeedback.candidateId = Number(this.candidateId)
        this.getCandidateAssessmentData();
        this.getCandidateInductionFeedbackList()
      }
    }
  
  }

  ngOnInit() {
    this.loadAccordion();
   
  }
  loadAccordion() {
    jQuery("#accordion").on("hide.bs.collapse show.bs.collapse", e => {
      jQuery(e.target)
        .prev()
        .find("i:last-child")
        .toggleClass("fa-plus fa-minus");
    });
  }
  getHalfYearlyReviewDetail() {
    var searchdata = {
      CandidateId: this.candidateId,
      EmpNo:this.empNo
    }
    this.handholdingService.getAllHandHoldingHalfYearlyReviewDetail(searchdata).subscribe((result) => {
      if (result) {
        this.halfYearlyReviewData = result;
        this.hreviewData=this.halfYearlyReviewData.halfYearlyData;
        if(this.halfYearlyReviewData.halfYearlyDetailData.length>0){
          this.halfYearlyReviewQuestions=this.halfYearlyReviewData.halfYearlyDetailData;
          
        }
        else{
        }
      }
      else {
        this.halfYearlyReviewData = {};
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getConfirmationReviewDetail() {
    var searchdata = {
      CandidateId: this.candidateId,
      EmpNo:this.empNo
    }
    this.handholdingService.getAllHandHoldingConfirmationReviewDetail(searchdata).subscribe((result) => {
      if (result) {
        this.confirmationReviewData = result;
        this.creviewData=this.confirmationReviewData.confirmationData;
        this.convertBase64ReviewerSign(this.confirmationReviewData.confirmationData.reviewerSign);
        this.convertBase64HodReviewerSign(this.confirmationReviewData.confirmationData.hodReviewerSign);
        this.convertBase64HrHeadReviewerSign(this.confirmationReviewData.confirmationData.hrHeadReviewerSign);
        this.convertBase64PlantHeadReviewerSign(this.confirmationReviewData.confirmationData.plantHeadReviewerSign);
        if(this.confirmationReviewData.confirmationDetailData.length>0){
          this.confirmationReviewQuestions=this.confirmationReviewData.confirmationDetailData;
          this.AssignmentsArray=this.confirmationReviewData.confirmationAssignmentData;
          
        }
        else{
        }
      }
      else {
        this.confirmationReviewData = {};
      }
    }, error => {
      console.log(error);
    }, () => {
    });
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

  getListenReview() {
    this.SpinnerService.show();
    var searchdata = {
      candidateId: this.candidateId,
      empNo: this.empNo
    }
    this.handholdingService.getListenReviewDetail(searchdata).subscribe((result) => {
      if (result) {
        this.listenReviewData = result;
        this.lrLength = this.listenReviewData.length;
        if (this.listenReviewData.length > 0) {
          this.lreviewData=this.listenReviewData[0];
          
        }
        else {
        }
        this.SpinnerService.hide();
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

  getJobShadowReview() {
    this.SpinnerService.show();
    var searchdata = {
      candidateId: this.candidateId,
      empNo: this.empNo
    }
    this.handholdingService.getJobShadowReviewDetail(searchdata).subscribe((result) => {
      if (result) {
        this.jobshadowReviewData = result.aICHandHoldingJobShadowReviewDetails;
        this.jsrLength = Object.keys(this.jobshadowReviewData).length;
        if (this.jobshadowReviewData !=undefined) {
          this.jreviewData=this.jobshadowReviewData;
          
        }
        else {
        }
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
  getHrFeedbackDetails() {
    this.SpinnerService.show();
    var searchdata = {
      candidateId: this.candidateId,
      empNo: this.empNo
    }
    this.handholdingService.getHRFeedbackDetail(searchdata).subscribe((result) => {
      if (result) {
        this.hrFeedbackData = result;
        this.hrfLength = this.hrFeedbackData.length;
        if (this.hrFeedbackData.length > 0) {
          this.hfData=this.hrFeedbackData[0];
          
        }
        else {
        }
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
  getHrReviewDetails() {
    this.SpinnerService.show();
    var searchdata = {
      candidateId: this.candidateId,
      empNo: this.empNo
    }
    this.handholdingService.getHRReviewDetail(searchdata).subscribe((result) => {
      if (result) {
        this.hrReviewData = result;
        this.hrrLength = this.hrReviewData.length;
        if (this.hrReviewData.length > 0) {
          this.hrRData=this.hrReviewData[0];
          
        }
        else {
        }
        this.SpinnerService.hide();
      }
      else {
        //this.hrReviewData = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  getCandidateAssessmentData() {
    this.candiddateAssementDetails = [];
    this.candidateService.getCandidateAllAssesmentData(this.searchCandidateAssessmentData).subscribe((result) => {
      if (result) {
        debugger;
        this.candidateAssessmentDataList = result;
        this.candiddateAssementDetails = this.candidateAssessmentDataList.candidateAssessmentDetails;
        this.SpinnerService.hide();
      }
      else {
        //this.candidateAssessmentDataList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }

  getCandidateInductionFeedbackList() {
    this.SpinnerService.show();
    // console.log("Search Induction Obj", this.searchInductionFeedback);
    this.candidateService.getAllCandidateInductionFeedback(this.searchInductionFeedback).subscribe((result) => {
      if (result) {
        this.candidateInductionFeedbackList = result;
        //console.log("Candidate Induction Feedback list", this.candidateInductionFeedbackList);
        this.candidateFeedbackDetailData = this.candidateInductionFeedbackList.candidateDetailData;
        this.SpinnerService.hide();
      }
      else {
        //this.candidateAssessmentDataList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  getFeedbackStatus(statusId, feedbackbutton) {
    switch (statusId) {
      case "1":
        return "Not Released";
        break;
      case "2":
        switch (feedbackbutton) {
          case true:
            return "Pending";
            break;
          case false:
            return "Expired";
            break;
        }
      //return "Pending";
      break;
      case "3":
        return "Feedback Provided";
        break;
    }
  }

  backButton(){
    
    this.persistance.set('candidateId', null);
    this.persistance.set('empNo', null);
    this.persistance.set('empName', null);
    if(this.persistance.get('pagename') == "plantcandidate"){        
      this.persistance.set('pagename', null);
      this._route.navigate(['/app/handholding/plant-candidate-list']);  
    }
    if(this.persistance.get('pagename') == "handholdingPlantApprovalList"){        
      this.persistance.set('pagename', null);
      this._route.navigate(['/app/handholding/plant-approval-list']);  
    }
    if(this.persistance.get('pagename') == "handholdingCorporateApprovalList"){        
      this.persistance.set('pagename', null);
      this._route.navigate(['/app/handholding/corporate-approval-list']);  
    }
    if(this.persistance.get('pagename') == "handholdingSalesApprovalList"){        
      this.persistance.set('pagename', null);
      this._route.navigate(['/app/handholding/sales-approval-list']);  
    }
    //this._route.navigate(['/handholding/plant-candidate-list']);
  }

  onclickDownloadPdf(){
     //confirmation review Approval
    this.reviewDataForPdf.empNo=this.empNo;
    this.reviewDataForPdf.empName= this.empName
    this.reviewDataForPdf.creviewData= this.creviewData;
    this.reviewDataForPdf.confirmationReviewQuestions=this.confirmationReviewQuestions;
    this.reviewDataForPdf.AssignmentsArray=this.AssignmentsArray;
    //Half Yearly Review Approval

    this.reviewDataForPdf.hreviewData=this.hreviewData;
    if(this.halfYearlyReviewQuestions.length >0){
    this.reviewDataForPdf.halfYearlyReviewQuestions=this.halfYearlyReviewQuestions;
    }
    //Job Shadow review approval
    this.reviewDataForPdf.jreviewData=this.jreviewData;

    //Listen reviw 
    this.reviewDataForPdf.lreviewData=this.lreviewData;

    //hr feedback details
    this.reviewDataForPdf.hfData=this.hfData;

    //hr review details
    if(this.hrRData !=undefined){
    this.reviewDataForPdf.hrRData=this.hrRData;
    }

    this.reviewDataForPdf.candiddateAssementDetails=this.candiddateAssementDetails;
    if(this.candidateAssessmentDataList !=undefined || this.candidateAssessmentDataList != null ){
    this.reviewDataForPdf.assesmentavg= this.candidateAssessmentDataList.totalScore;
    }
    this.reviewDataForPdf.candidateFeedbackDetailData= this.candidateFeedbackDetailData;
    this.fileName=this.empNo.toString() +"_handholdingdocument.pdf";
    
    setTimeout(() => {
    this.htmlPath = document.getElementById("printerdiv").innerHTML;
    var dom = document.createElement('div');
    dom.innerHTML = this.htmlPath;
    html2pdf(dom, {
      margin: 20,
      filename: this.fileName,
      image: { type: 'jpeg', quality: 0.98 },
      //html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      html2canvas: { scale: 3, y: 0, scrollY: 0 },
      //jsPDF: { format: 'A4' },
      //jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      jsPDF: { format: 'A4', orientation: 'portrait' },
    }); 
    }, 400);
    
    
  }
}
