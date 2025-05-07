import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IState, IDropDown, IFormFiles } from '../../../../interfaces/common/common.interface';
import {
  ISearchTestTravelReimbursement, ITestTravelReimbursementDetailData, ITestTravelReimbursementAttachmentList,
  ITestTravelReimbursementJourneyList, ITestTravelReimbursementActionFormData,
  ITestTravelJourneyArray, ITestTravelAttachmentArray, ITestTravelJourneyArrayData, ITestTravelAttachmentArrayData, ITestTravelReimbursementActionFormDataNew
} from '../../../../interfaces/selection/travelreimbursement.interface';
import { TravelreimbursementService } from '../../../../services/selection/travelreimbursement/travelreimbursement.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common/common/common.service';
import { isAbsolute } from 'path';
import { Observable, Observer } from 'rxjs';
declare var jQuery: any;
declare var html2pdf: any;


@Component({
  selector: 'app-view-test-travel-reimbursement-component',
  templateUrl: './view-test-travel-reimbursement-component.component.html',
  styleUrls: ['./view-test-travel-reimbursement-component.component.css']
})
export class ViewTestTravelReimbursementComponentComponent implements OnInit {

  @ViewChild('jDate', { static: false }) jDate: ElementRef;
  @ViewChild('attachmentFileImport', { static: false }) attachmentFileImport: ElementRef;
  @ViewChild('bankStatementFileImport', { static: false }) bankStatementFileImport: ElementRef;
  searchTravelReimbursement: ISearchTestTravelReimbursement = {
    CandidateId: null,
    RequisitionDetailId: null,
    TestScheduleDetailId: null
  }

  travelReimbursementActionFormData: ITestTravelReimbursementActionFormData = {
    testScheduleDetailIds: null,
    ClaimStatusId: 0,
    Remarks: null,
    CreatedBy: null,
    CandidateNo: null,
  }
  travelReimbursementActionFormDataNew: ITestTravelReimbursementActionFormDataNew = {
    testScheduleDetailIds: null,
    ClaimStatusId: 0,
    Remarks: null,
    CreatedBy: null,
    CandidateNo: null,
    Password: null,
    ReimbursementName: null,
    Flag: 0,
  }
  travelReimbursement: any = {};
  states: IState[] = [];
  testScheduleDetailId: number;
  travelJourneyArray: ITestTravelJourneyArray[] = [];
  journeyDataArray: ITestTravelJourneyArrayData[] = [];
  travelAttachmentArray: ITestTravelAttachmentArray[] = [];
  journeyAttachmentArray: ITestTravelAttachmentArrayData[] = [];
  JourneyTypeId: number;
  JourneyDate: string;
  JourneySource: string;
  JourneyDestination: string;
  TravelModeId: number;
  ClaimAmount: number;
  AttachmentJourneyTypeId: number;
  TicketId: number;
  maxJourneyId: number;
  maxAttachmentId: number;
  journeyTypes: IDropDown[];
  travelModes: IDropDown[];
  tickets: IDropDown[];
  bankfileToUpload: File;
  attachmentfileToUpload: File;
  fileUpload: IFormFiles[] = [];
  //
  CommunicationAddress: string;
  PinCode: string;
  BankAccountName: string;
  BankAccountNumber: string;
  BankName: string;
  IFSC: string;
  BankStatementId: number;
  autoUserId: number;
  TravelReimbursementId: number;
  BankStatementDocument: string;
  journeyAddedDataArray: ITestTravelReimbursementJourneyList[] = [];
  journeyAddedAttachmentArray: ITestTravelReimbursementAttachmentList[] = [];

  ClaimStatusId: number = 0;
  Remarks: string;
  actionVisible: boolean = false;
  candidateNo: string;
  pagename:string;
  testTravelReimbursementDataForPDF = {
    travelReimbursementId: null,
    testScheduleDetailId: null,
    testName: null,
    fullName: null,
    emailId: null,
    contactNo: null,
    communicationAddress: null,
    pinCode: null,
    stateId: null,
    testDate: null,
    venueName: null,
    positionName: null,
    functionName: null,
    bankAccountName: null,
    bankAccountNumber: null,
    bankName: null,
    ifsc: null,
    bankBranch: null,
    bankStatementId: null,
    bankStatementDocument: null,
    claimStatusId: 0,
    travelReimbursementJourneyListData: [],
    travelReimbursementAttachmentListData: [],
    grandTotal: 0,
    stateName: ""
  };
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private commonService: CommonService,
    private travelReimbursementService: TravelreimbursementService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private titleService: Title, 
    private SpinnerService: NgxSpinnerService,
  ) {
    this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
    this.testScheduleDetailId = this.persistance.get('paramid');
   // this.candidateNo = this.persistance.get("candidateNoForMail").candidateNo; // Added anif on 04-08-2022
    this.candidateNo = this.persistance.get("candidateNoForMail"); // Added anif on 04-08-2022
    // console.log("find",this.autoUserId)
   // console.log("find1", this.candidateNo)
   this.pagename = this.persistance.get('pagename');
    this.getTravelReimbursement();
  }

  ngOnInit() {
  }
  convertBase64CandidatePhoto(imageUrl: string) {
    this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
      
      this.travelReimbursement.profileSignature = base64Data;
    });
  }
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

  getTravelReimbursement() {
    this.SpinnerService.show();
    this.journeyAddedAttachmentArray = [];
    this.journeyAddedDataArray = [];
    this.searchTravelReimbursement.TestScheduleDetailId = this.testScheduleDetailId;
    this.travelReimbursementService.getCampusTestTravelReimbursementDetailData(this.searchTravelReimbursement).subscribe((result) => {
      if (result) {
        this.travelReimbursement = result;
         console.log("aaaaaaaa",this.travelReimbursement);
         this.convertBase64CandidatePhoto(this.travelReimbursement.profileSignature);
        this.CommunicationAddress = this.travelReimbursement.communicationAddress;
        this.PinCode = this.travelReimbursement.pinCode;
        this.BankName = this.travelReimbursement.bankName;
        this.BankAccountName = this.travelReimbursement.bankAccountName;
        this.BankAccountNumber = this.travelReimbursement.bankAccountNumber;
        this.IFSC = this.travelReimbursement.ifsc;
        this.BankStatementId = this.travelReimbursement.bankStatementId;
        this.BankStatementDocument = this.travelReimbursement.bankStatementDocument;
        this.TravelReimbursementId = this.travelReimbursement.travelReimbursementId;

        this.journeyAddedDataArray = this.travelReimbursement.travelReimbursementJourneyListData;

        this.journeyAddedAttachmentArray = this.travelReimbursement.travelReimbursementAttachmentListData;
        if (this.travelReimbursement.claimStatusId == 3 || this.travelReimbursement.claimStatusId == 1) {
          this.actionVisible = true;
        }
        else {
          this.actionVisible = false;
        }
      }
      else {
        this.travelReimbursement = null;
      }
    }, error => {
      // console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }
  clickdownload()
  {
    // console.log("try",this.travelReimbursement);
    this.SpinnerService.show();
    this.travelReimbursementService.getCampusTestTravelReimbursementDetailData(this.searchTravelReimbursement).subscribe((result) => {
      if (result) {
        this.travelReimbursement = result;
       //console.log("Test Travel TReimbursement PDF List", this.travelReimbursement);
        this.travelReimbursement.travelReimbursementJourneyListData.forEach(element => {
          this.testTravelReimbursementDataForPDF.grandTotal += element.claimAmount;
        });
        this.testTravelReimbursementDataForPDF.travelReimbursementId = this.travelReimbursement.travelReimbursementId;
        this.testTravelReimbursementDataForPDF.testScheduleDetailId = this.travelReimbursement.testScheduleDetailId;
        this.testTravelReimbursementDataForPDF.fullName = this.travelReimbursement.fullName;
        this.testTravelReimbursementDataForPDF.emailId = this.travelReimbursement.emailId;
        this.testTravelReimbursementDataForPDF.testName = this.travelReimbursement.testName;
        this.testTravelReimbursementDataForPDF.contactNo = this.travelReimbursement.contactNo;
        this.testTravelReimbursementDataForPDF.communicationAddress = this.travelReimbursement.communicationAddress;
        this.testTravelReimbursementDataForPDF.pinCode = this.travelReimbursement.pinCode;
        this.testTravelReimbursementDataForPDF.stateId = this.travelReimbursement.stateId;
        this.testTravelReimbursementDataForPDF.testDate = this.travelReimbursement.testDate;
        this.testTravelReimbursementDataForPDF.venueName = this.travelReimbursement.venueName;
        this.testTravelReimbursementDataForPDF.positionName = this.travelReimbursement.positionName;
        this.testTravelReimbursementDataForPDF.functionName = this.travelReimbursement.functionName;
        this.testTravelReimbursementDataForPDF.bankAccountName = this.travelReimbursement.bankAccountName;
        this.testTravelReimbursementDataForPDF.bankAccountNumber = this.travelReimbursement.bankAccountNumber;
        this.testTravelReimbursementDataForPDF.bankName = this.travelReimbursement.bankName;
        this.testTravelReimbursementDataForPDF.ifsc = this.travelReimbursement.ifsc;
        this.testTravelReimbursementDataForPDF.bankBranch = this.travelReimbursement.bankBranch;
        this.testTravelReimbursementDataForPDF.bankStatementId = this.travelReimbursement.bankStatementId;
        this.testTravelReimbursementDataForPDF.bankStatementDocument = this.travelReimbursement.bankStatementDocument;
        this.testTravelReimbursementDataForPDF.claimStatusId = this.travelReimbursement.claimStatusId;
        this.testTravelReimbursementDataForPDF.travelReimbursementJourneyListData = this.travelReimbursement.travelReimbursementJourneyListData;
        this.testTravelReimbursementDataForPDF.travelReimbursementAttachmentListData = this.travelReimbursement.travelReimbursementAttachmentListData;
        this.testTravelReimbursementDataForPDF.stateName = result.stateName;

      }
      else {
        this.travelReimbursement = null;

      }
    }, error => {
      // console.log(error);
      this.SpinnerService.hide();
    }, () => {
      setTimeout(() => {
        this.downloadTravelReimbursement();
      }, 1000)
      this.SpinnerService.hide();
    });
    
  }
  downloadTravelReimbursement() {
    var htmlstring = document.getElementById("printTestTravelReimbursement").innerHTML;
    var dom = document.createElement('div');
    dom.innerHTML = htmlstring;
    html2pdf(dom, {
      margin: 10,
      filename: this.candidateNo + "_interview_Travel_Reimbursement.pdf",
      image: { type: 'jpeg', quality: 0.98 },
      //html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      html2canvas: { scale: 3, y: 0, scrollY: 0 },
      //jsPDF: { format: 'A4' },
      //jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      jsPDF: { format: 'A4', orientation: 'portrait' },
    });
  }
  gotoTravelReimbursementList() {
    this.persistance.set('pagename', null);
    if(this.pagename=="offtesttravellist"){
      this._route.navigate(['/app/offcampus-test-reimbursement']);
    }
    else{
      this._route.navigate(['/app/test-reimbursement']);
    }
    
  }

  changeClaimStatus(val) {
    this.ClaimStatusId = val;
  }

  actionFormSubmit() {
    var flag = 0;
    if (this.ClaimStatusId == 4 || this.ClaimStatusId == 2) {
      if (this.Remarks == "" || this.Remarks == undefined) {
        jQuery(".txtremarks").addClass("is-invalid");
        flag = 1;
      }
      else {
        jQuery(".txtremarks").removeClass("is-invalid");
      }
    }
    if (this.ClaimStatusId == 0) {
      flag = 1;
    }
    if (flag == 0) {
      this.SpinnerService.show();
      if (this.Remarks == undefined) {
        this.Remarks = "";
      }
        this.travelReimbursementActionFormDataNew.Remarks = this.Remarks;
        this.travelReimbursementActionFormDataNew.testScheduleDetailIds = this.testScheduleDetailId.toString();
        this.travelReimbursementActionFormDataNew.ClaimStatusId = this.ClaimStatusId;
        this.travelReimbursementActionFormDataNew.CreatedBy = this.autoUserId;
      this.travelReimbursementActionFormDataNew.CandidateNo = this.candidateNo; // Added anif
      this.travelReimbursementActionFormDataNew.Password = "welcome@1234";
      this.travelReimbursementActionFormDataNew.ReimbursementName = "Test Travel Reimbursement";
      this.travelReimbursementActionFormDataNew.Flag = 1; 
      // console.log(this.travelReimbursementActionFormData);
      this.travelReimbursementService.updateTestTravelReimbursementStatus(this.travelReimbursementActionFormDataNew).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.getTravelReimbursement();
          }
        }
        else {
        }
      }, error => {
        // console.log(error);
      }, () => {
        this.SpinnerService.hide();
      });
    }
  }

}

