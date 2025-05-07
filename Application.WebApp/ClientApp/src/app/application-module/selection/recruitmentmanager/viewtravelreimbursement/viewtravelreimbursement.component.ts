import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IState, IDropDown, IFormFiles } from '../../../../interfaces/common/common.interface';
import {
  ISearchTravelReimbursement, ITravelReimbursementDetailData,ITravelReimbursementAttachmentList,
  ITravelReimbursementJourneyList,ITravelReimbursementActionFormData,
  ITravelJourneyArray, ITravelAttachmentArray, ITravelJourneyArrayData, ITravelAttachmentArrayData, ITravelReimbursementActionFormDataNew
} from '../../../../interfaces/selection/travelreimbursement.interface';
import { TravelreimbursementService } from '../../../../services/selection/travelreimbursement/travelreimbursement.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common/common/common.service';
import { isAbsolute } from 'path';
import { LocationService } from 'src/app/services/common/location/location.service';
declare var jQuery: any;
declare var html2pdf: any;

@Component({
  selector: 'app-viewtravelreimbursement',
  templateUrl: './viewtravelreimbursement.component.html',
  styleUrls: ['./viewtravelreimbursement.component.css']
})
export class ViewtravelreimbursementComponent implements OnInit {

  @ViewChild('jDate', { static: false }) jDate: ElementRef;
  @ViewChild('attachmentFileImport', { static: false }) attachmentFileImport: ElementRef;
  @ViewChild('bankStatementFileImport', { static: false }) bankStatementFileImport: ElementRef;
  searchTravelReimbursement: ISearchTravelReimbursement = {
    CandidateId: null,
    RequisitionDetailId: null,
    InterviewDetailId: null
  }
  DocumentPathForPDF: string;
  travelReimbursementActionFormData: ITravelReimbursementActionFormData = {
    InterviewDetailIds: null,
    ClaimStatusId: 0,
    Remarks: null,
    CreatedBy: null,
    CandidateNo:null
  }
  travelReimbursementActionFormDataNew: ITravelReimbursementActionFormDataNew = {
    InterviewDetailIds: null,
    ClaimStatusId: 0,
    Remarks: null,
    CreatedBy: null,
    CandidateNo: null,
    ReimbursementName: null,
    Password: null,
    Flag: 0,
  }

  travelReimbursement: ITravelReimbursementDetailData = {
    travelReimbursementId: null,
    interviewDetailId: null,
    interviewName:null,
    fullName: null,
    emailId: null,
    contactNo: null,
    communicationAddress: null,
    pinCode: null,
    stateId: null,
    interviewDate: null,
    venueName: null,
    positionName: null,
    functionName: null,
    bankAccountName: null,
    bankAccountNumber: null,
    bankName: null,
    ifsc: null,
    bankBranch:null,
    bankStatementId: null,
    bankStatementDocument: null,
    claimStatusId: 0,
    //by kuntal-->
    ProfileSignature: null,
    travelReimbursementJourneyListData: [],
    travelReimbursementAttachmentListData: []
  };
  states: IState[] = [];
  interviewDetailId: number;
  travelJourneyArray: ITravelJourneyArray[] = [];
  journeyDataArray: ITravelJourneyArrayData[] = [];
  travelAttachmentArray: ITravelAttachmentArray[] = [];
  journeyAttachmentArray: ITravelAttachmentArrayData[] = [];
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
  BankStatementDocument:string;
  journeyAddedDataArray:ITravelReimbursementJourneyList[]=[];
  journeyAddedAttachmentArray:ITravelReimbursementAttachmentList[]=[];

  ClaimStatusId:number=0;
  Remarks:string;
  actionVisible:boolean=false;
  candidateNos: string;
  interviewTravelReimbursementData = {
    travelReimbursementId: null,
    interviewDetailId: null,
    interviewName: null,
    fullName: null,
    emailId: null,
    contactNo: null,
    communicationAddress: null,
    pinCode: null,
    stateId: null,
    interviewDate: null,
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
  ProfileSignature: string;
  activeTabName: string;
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
    private locationService: LocationService,

  ) {
    this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
    this.interviewDetailId = this.persistance.get('paramid');
    this.candidateNos = this.persistance.get("candidateNoForMailTravel"); // Added anif
    this.activeTabName = this.persistance.get("activeTabName");
    this.getTravelReimbursement();
  }

  ngOnInit() {
  }

  getTravelReimbursement() {
    this.SpinnerService.show();
    this.journeyAddedAttachmentArray=[];
    this.journeyAddedDataArray=[];
    this.searchTravelReimbursement.InterviewDetailId = this.interviewDetailId;
    this.travelReimbursementService.getTravelReimbursementDetailData(this.searchTravelReimbursement).subscribe((result) => {
      if (result) {
        this.travelReimbursement = result;
        this.DocumentPathForPDF = result.documentPathForPDF;
        console.log(this.travelReimbursement);
        this.CommunicationAddress=this.travelReimbursement.communicationAddress;
        this.PinCode=this.travelReimbursement.pinCode;
        this.BankName=this.travelReimbursement.bankName;
        this.BankAccountName=this.travelReimbursement.bankAccountName;
        this.BankAccountNumber=this.travelReimbursement.bankAccountNumber;
        this.IFSC=this.travelReimbursement.ifsc;
        this.BankStatementId=this.travelReimbursement.bankStatementId;
        this.BankStatementDocument=this.travelReimbursement.bankStatementDocument;
        this.TravelReimbursementId = this.travelReimbursement.travelReimbursementId;
        
        this.journeyAddedDataArray = this.travelReimbursement.travelReimbursementJourneyListData;
        this.ProfileSignature = this.travelReimbursement.ProfileSignature;
        
        this.journeyAddedAttachmentArray=this.travelReimbursement.travelReimbursementAttachmentListData;
        if(this.travelReimbursement.claimStatusId==3 || this.travelReimbursement.claimStatusId==1){
          this.actionVisible=true;
        }
        else{
          this.actionVisible=false;
        }
      }
      else {
        this.travelReimbursement = null;
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }

  clickdownload(){
    this.SpinnerService.show();
    this.travelReimbursementService.getTravelReimbursementDetailData(this.searchTravelReimbursement).subscribe((result) => {
      if (result) {
        this.travelReimbursement = result;
        this.travelReimbursement.travelReimbursementJourneyListData.forEach(element => {
          this.interviewTravelReimbursementData.grandTotal += element.claimAmount;
        });
        this.interviewTravelReimbursementData.travelReimbursementId = this.travelReimbursement.travelReimbursementId;
        this.interviewTravelReimbursementData.interviewDetailId = this.travelReimbursement.interviewDetailId;
        this.interviewTravelReimbursementData.fullName = this.travelReimbursement.fullName;
        this.interviewTravelReimbursementData.emailId = this.travelReimbursement.emailId;
        this.interviewTravelReimbursementData.interviewName = this.travelReimbursement.interviewName;
        this.interviewTravelReimbursementData.contactNo = this.travelReimbursement.contactNo;
        this.interviewTravelReimbursementData.communicationAddress = this.travelReimbursement.communicationAddress;
        this.interviewTravelReimbursementData.pinCode = this.travelReimbursement.pinCode;
        this.interviewTravelReimbursementData.stateId = this.travelReimbursement.stateId;
        this.interviewTravelReimbursementData.interviewDate = this.travelReimbursement.interviewDate;
        this.interviewTravelReimbursementData.venueName = this.travelReimbursement.venueName;
        this.interviewTravelReimbursementData.positionName = this.travelReimbursement.positionName;
        this.interviewTravelReimbursementData.functionName = this.travelReimbursement.functionName;
        this.interviewTravelReimbursementData.bankAccountName = this.travelReimbursement.bankAccountName;
        this.interviewTravelReimbursementData.bankAccountNumber = this.travelReimbursement.bankAccountNumber;
        this.interviewTravelReimbursementData.bankName = this.travelReimbursement.bankName;
        this.interviewTravelReimbursementData.ifsc = this.travelReimbursement.ifsc;
        this.interviewTravelReimbursementData.bankBranch = this.travelReimbursement.bankBranch;
        this.interviewTravelReimbursementData.bankStatementId = this.travelReimbursement.bankStatementId;
        this.interviewTravelReimbursementData.bankStatementDocument = this.travelReimbursement.bankStatementDocument;
        this.interviewTravelReimbursementData.claimStatusId = this.travelReimbursement.claimStatusId;
        this.interviewTravelReimbursementData.travelReimbursementJourneyListData = this.travelReimbursement.travelReimbursementJourneyListData;
        this.interviewTravelReimbursementData.travelReimbursementAttachmentListData = this.travelReimbursement.travelReimbursementAttachmentListData;
        this.interviewTravelReimbursementData.stateName = result.stateName;
        //console.log("Interview travel reimbursement data", result);
      }
      else {
        this.travelReimbursement = null;
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        this.downloadTravelReimbursement();
      }, 1000)
      this.SpinnerService.hide();
    });
  }
  downloadTravelReimbursement() {
    var htmlstring = document.getElementById("printInterviewTravelReimbursement").innerHTML;
    var dom = document.createElement('div');
    dom.innerHTML = htmlstring;
    html2pdf(dom, {
      margin: 10,
      filename: this.candidateNos + "_interview_Travel_Reimbursement.pdf",
      image: { type: 'jpeg', quality: 0.98 },
      //html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      html2canvas: { scale: 3, y: 0, scrollY: 0 },
      //jsPDF: { format: 'A4' },
      //jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      jsPDF: { format: 'A4', orientation: 'portrait' },
    });
  }

  gotoTravelReimbursementList(){
    this.persistance.set('pagename', null);
    this.persistance.set('activeTabName', this.activeTabName);
    this._route.navigate(['/app/travel-reimbursement-list']);
  }

  changeClaimStatus(val){
    this.ClaimStatusId=val;
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
    if(this.ClaimStatusId==0){
      flag=1;
    }
    if (flag == 0) {
      this.SpinnerService.show();
      if(this.Remarks==undefined){
        this.Remarks="";
      }
      this.travelReimbursementActionFormDataNew.Remarks = this.Remarks;
      this.travelReimbursementActionFormDataNew.InterviewDetailIds = this.interviewDetailId.toString();
      this.travelReimbursementActionFormDataNew.ClaimStatusId=this.ClaimStatusId;
      this.travelReimbursementActionFormDataNew.CreatedBy=this.autoUserId;
      this.travelReimbursementActionFormDataNew.CandidateNo = this.candidateNos;
      this.travelReimbursementActionFormDataNew.Password = "welcome@1234";
      this.travelReimbursementActionFormDataNew.ReimbursementName = "Interview Travel Reimbursement";
      this.travelReimbursementActionFormDataNew.Flag = 1;
      console.log(this.travelReimbursementActionFormData);
      this.travelReimbursementService.updateTravelReimbursementStatus(this.travelReimbursementActionFormDataNew).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getTravelReimbursement();
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
    }
  }
  openFile(blobName: string): void {
    let regex = /\.net(.*)/;
    let match = blobName.match(regex);
    let extractedString = match ? match[1] : '';
    let filename = extractedString.split('/')[2];
    let containername = extractedString.split('/')[1];
    this.locationService.getTestfile(filename,containername).subscribe(response => {
      let blob:Blob=response.body as  Blob;
      const url = window.URL.createObjectURL(blob);

      // Open the file in a new tab
      window.open(url);

    }, error => {
      console.error('Failed to download file:', error);
    });
  }
}
