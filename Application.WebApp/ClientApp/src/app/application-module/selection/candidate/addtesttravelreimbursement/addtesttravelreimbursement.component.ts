import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IState, IDropDown, IFormFiles } from '../../../../interfaces/common/common.interface';
import {
  ISearchTestTravelReimbursement, ITestTravelReimbursementDetailData, ITestTravelReimbursementAttachmentList,
  ITestTravelReimbursementJourneyList,
  ITestTravelJourneyArray, ITestTravelAttachmentArray, ITestTravelJourneyArrayData, ITestTravelAttachmentArrayData
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
  selector: 'app-addtesttravelreimbursement',
  templateUrl: './addtesttravelreimbursement.component.html',
  styleUrls: ['./addtesttravelreimbursement.component.css']
})
export class AddtesttravelreimbursementComponent implements OnInit {
  @ViewChild('jDate', { static: false }) jDate: ElementRef;
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  @ViewChild('attachmentFileImport', { static: false }) attachmentFileImport: ElementRef;
  @ViewChild('bankStatementFileImport', { static: false }) bankStatementFileImport: ElementRef;
  searchTravelReimbursement: ISearchTestTravelReimbursement = {
    CandidateId: null,
    RequisitionDetailId: null,
    TestScheduleDetailId: null
  }
  stateName: string;
  file: File;
  testTravelReimbursementForPDF = {
    fullName: '',
    testDate: '',
    venueName: '',
    positionName: '',
    emailId: '',
    contactNo: '',
    communicationAddress: '',
    stateName: '',
    pinCode: '',
    grandTotal: 0,
    bankAccountName: '',
    bankAccountNumber: '',
    bankName: '',
    ifsc: '',
    travelReimbursementJourneyListData: []
  }
  travelReimbursement: ITestTravelReimbursementDetailData = {
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
    travelReimbursementAttachmentListData: []
  };
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
  BankBranch: string;
  BankStatementId: number;
  autoUserId: number;
  TravelReimbursementId: number;
  BankStatementDocument: string;
  journeyAddedDataArray: ITestTravelReimbursementJourneyList[] = [];
  journeyAddedAttachmentArray: ITestTravelReimbursementAttachmentList[] = [];
  isVisible: boolean = false;
  invalidFileName1: boolean = false;
  invalidFileName2: boolean = false;
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
    this.maxJourneyId = 0;
    this.maxAttachmentId = 0;
    this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
    this.testScheduleDetailId = this.persistance.get('paramid');
    this.getAllState();
    this.getAllJourneyType();
    this.getAllTravelModes();
    this.getAllTickets();
    this.getTravelReimbursement();
  }

  ngOnInit() {
    this.loadDatePicker();
  }

  loadDatePicker() {
    setTimeout(() => {
      var today = new Date();
      jQuery(".datepicker").parent(".input-group").datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        //startDate: today,
        todayHighlight: true
      });
    });

  }

  getAllState() {
    this.states = [];
    this.commonService.getAllState().subscribe((result) => {
      if (result) {
        this.states = result;
        this.states.splice(0, 0, {
          stateId: 0,
          stateName: "Select"
        })
      }
      else {
        this.states = [];
        this.states.splice(0, 0, {
          stateId: 0,
          stateName: "Select"
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllJourneyType() {
    this.journeyTypes = [];
    this.journeyTypes.push({ name: "Onward", id: 1 });
    this.journeyTypes.push({ name: "Return", id: 2 });
  }

  getAllTravelModes() {
    this.travelModes = [];
    this.travelModes.push({ name: "Bus", id: 1 });
    this.travelModes.push({ name: "Taxi", id: 2 });
    this.travelModes.push({ name: "Train", id: 3 });
    this.travelModes.push({ name: "Air", id: 4 });
  }

  getAllTickets() {
    this.tickets = [];
    this.tickets.push({ name: "Train/Bus/Air ticket", id: 1 });
    this.tickets.push({ name: "Boarding Pass", id: 2 });
    this.tickets.push({ name: "Taxi Bills", id: 3 });
  }

  getTravelReimbursement() {
    this.SpinnerService.show();
    this.journeyAddedAttachmentArray = [];
    this.journeyAddedDataArray = [];
    this.searchTravelReimbursement.TestScheduleDetailId = this.testScheduleDetailId;
    this.travelReimbursementService.getTestTravelReimbursementDetailData(this.searchTravelReimbursement).subscribe((result) => {
      if (result) {
        this.travelReimbursement = result;
        this.stateName = result.stateName;
        this.CommunicationAddress = this.travelReimbursement.communicationAddress;
        this.PinCode = this.travelReimbursement.pinCode;
        this.BankName = this.travelReimbursement.bankName;
        this.BankAccountName = this.travelReimbursement.bankAccountName;
        this.BankAccountNumber = this.travelReimbursement.bankAccountNumber;
        this.IFSC = this.travelReimbursement.ifsc;
        this.BankBranch = this.travelReimbursement.bankBranch;
        this.BankStatementId = this.travelReimbursement.bankStatementId;
        this.BankStatementDocument = this.travelReimbursement.bankStatementDocument;
        this.TravelReimbursementId = this.travelReimbursement.travelReimbursementId;
        if (this.travelReimbursement.claimStatusId == 2 || this.travelReimbursement.claimStatusId == 0) {
          this.isVisible = true;
        }
        else {
          this.isVisible = false;
        }
        for (var i = 0; i < this.travelReimbursement.travelReimbursementJourneyListData.length; i++) {
          this.journeyAddedDataArray.push({
            autoId: this.travelReimbursement.travelReimbursementJourneyListData[i].autoId,
            travelReimbursementId: this.travelReimbursement.travelReimbursementJourneyListData[i].travelReimbursementId,
            journeyTypeId: this.travelReimbursement.travelReimbursementJourneyListData[i].journeyTypeId,
            journeyTypeName: this.travelReimbursement.travelReimbursementJourneyListData[i].journeyTypeName,
            journeyDate: this.travelReimbursement.travelReimbursementJourneyListData[i].journeyDate,
            journeySource: this.travelReimbursement.travelReimbursementJourneyListData[i].journeySource,
            journeyDestination: this.travelReimbursement.travelReimbursementJourneyListData[i].journeyDestination,
            travelModeId: this.travelReimbursement.travelReimbursementJourneyListData[i].travelModeId,
            travelModeName: this.travelReimbursement.travelReimbursementJourneyListData[i].travelModeName,
            claimAmount: this.travelReimbursement.travelReimbursementJourneyListData[i].claimAmount
          })
          // this.journeyDataArray.push({
          //   AutoId: this.travelReimbursement.travelReimbursementJourneyListData[i].autoId,
          //   JourneyType: this.journeyTypes.filter(x => x.id == this.travelReimbursement.travelReimbursementJourneyListData[i].journeyTypeId)[0].name,
          //   JourneyDate: this.travelReimbursement.travelReimbursementJourneyListData[i].journeyDate,
          //   JourneySource: this.travelReimbursement.travelReimbursementJourneyListData[i].journeySource,
          //   JourneyDestination: this.travelReimbursement.travelReimbursementJourneyListData[i].journeyDestination,
          //   TravelMode: this.travelModes.filter(x => x.id == this.travelReimbursement.travelReimbursementJourneyListData[i].travelModeId)[0].name,
          //   ClaimAmount: this.travelReimbursement.travelReimbursementJourneyListData[i].claimAmount
          // })
          this.maxJourneyId = this.travelReimbursement.travelReimbursementJourneyListData[i].autoId;
        }
        this.journeyAddedDataArray = this.travelReimbursement.travelReimbursementJourneyListData;
        for (var i = 0; i < this.travelReimbursement.travelReimbursementAttachmentListData.length; i++) {
          // this.journeyAttachmentArray.push({
          //   AutoId: this.travelReimbursement.travelReimbursementAttachmentListData[i].autoId,
          //   JourneyType: this.journeyTypes.filter(x => x.id == this.travelReimbursement.travelReimbursementAttachmentListData[i].journeyTypeId)[0].name,
          //   TicketName: this.tickets.filter(x => x.id == this.travelReimbursement.travelReimbursementAttachmentListData[i].ticketId)[0].name,
          //   AttachmentLink: "attachment"
          // })
          // this.travelAttachmentArray.push({
          //   AutoId: this.travelReimbursement.travelReimbursementAttachmentListData[i].autoId,
          //   JourneyTypeId: this.travelReimbursement.travelReimbursementAttachmentListData[i].journeyTypeId,
          //   TicketId: this.travelReimbursement.travelReimbursementAttachmentListData[i].ticketId,
          //   AttachmentLink: "attachment"
          // })
          this.maxAttachmentId = this.travelReimbursement.travelReimbursementAttachmentListData[i].autoId;
        }
        this.journeyAddedAttachmentArray = this.travelReimbursement.travelReimbursementAttachmentListData;
      }
      else {
        this.travelReimbursement = null;
        this.isVisible = true;
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadDatePicker();
      this.SpinnerService.hide();
    });
  }

  onAttachmentFileChange(files: FileList) {
    this.invalidFileName1 = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName1 = true;
      }
    })
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      return;
    }
    if (this.invalidFileName1) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.attachmentFileImport.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("File should be less than 2MB!", "Error");
      this.attachmentFileImport.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    } else {
      this.attachmentFileImport.nativeElement.innerText = files[0].name;
      this.attachmentfileToUpload = files.item(0);
    }
  }

  onBankFileChange(files: FileList) {
    this.invalidFileName2 = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName2 = true;
      }
    })
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      return;
    }
    if (this.invalidFileName2) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.bankStatementFileImport.nativeElement.innerText = "Choose file";
      this.bankfileToUpload = null;
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("File should be less than 2MB!", "Error");
      this.bankStatementFileImport.nativeElement.innerText = "Choose file";
      this.bankfileToUpload = null;
    } else {
      this.bankStatementFileImport.nativeElement.innerText = files[0].name;
      this.bankfileToUpload = files.item(0);
    }
  }

  addJourneyRow() {
    var flag = 0;
    var msg = "";
    if (this.ClaimAmount == 0 || this.ClaimAmount == undefined) {
      flag = 1;
      msg = "Please enter claim amount";
    }
    else {

    }
    if (this.TravelModeId == 0 || this.TravelModeId == undefined) {
      flag = 1;
      msg = "Please select travel mode";
    }
    else {

    }
    if (this.JourneyDestination == "" || this.JourneyDestination == undefined) {
      flag = 1;
      msg = "Please enter destination";
    }
    else {

    }
    if (this.JourneySource == "" || this.JourneySource == undefined) {
      flag = 1;
      msg = "Please enter source";
    }
    else {

    }
    if (this.jDate.nativeElement.value == undefined || this.jDate.nativeElement.value == "") {
      flag = 1;
      msg = "Please select journey date";
    }
    else {

    }
    if (this.JourneyTypeId == 0 || this.JourneyTypeId == undefined) {
      flag = 1;
      msg = "Please select journey type";
    }
    else {

    }
    if (flag == 0) {
      this.maxJourneyId = this.maxJourneyId + 1;
      this.journeyDataArray.push({
        AutoId: this.maxJourneyId,
        JourneyType: this.journeyTypes.filter(x => x.id == this.JourneyTypeId)[0].name,
        JourneyDate: this.jDate.nativeElement.value,
        JourneySource: this.JourneySource,
        JourneyDestination: this.JourneyDestination,
        TravelMode: this.travelModes.filter(x => x.id == this.TravelModeId)[0].name,
        ClaimAmount: this.ClaimAmount
      })
      this.travelJourneyArray.push({
        AutoId: this.maxJourneyId,
        JourneyTypeId: this.JourneyTypeId,
        JourneyDate: this.jDate.nativeElement.value,
        JourneySource: this.JourneySource,
        JourneyDestination: this.JourneyDestination,
        TravelModeId: this.TravelModeId,
        ClaimAmount: this.ClaimAmount
      })
      this.ClaimAmount = null;
      this.JourneyDate = "";
      this.jDate.nativeElement.value = "";
      this.JourneyTypeId = undefined;
      this.TravelModeId = undefined;
      this.JourneySource = "";
      this.JourneyDestination = "";
    }
    else {
      this.notificationService.showError(msg, "Error");
    }
  }

  removeJourneyAddedRow(autoId) {
    this.journeyAddedDataArray = this.journeyAddedDataArray.filter(x => x.autoId != autoId);
  }

  removeJourneyRow(index) {
    this.journeyDataArray = this.journeyDataArray.filter(x => x.AutoId != index);
    this.travelJourneyArray = this.travelJourneyArray.filter(x => x.AutoId != index);
  }

  addAttachmentRow() {
    var flag = 0;
    var msg = "";
    if (this.attachmentfileToUpload == null) {
      flag = 1;
      msg = "Please select attachment";
    }
    else {

    }
    if (this.TicketId == 0 || this.TicketId == undefined) {
      flag = 1;
      msg = "Please select ticket type";
    }
    else {

    }
    if (this.AttachmentJourneyTypeId == 0 || this.AttachmentJourneyTypeId == undefined) {
      flag = 1;
      msg = "Please select journey type";
    }
    else {

    }
    if (flag == 0) {
      this.maxAttachmentId = this.maxAttachmentId + 1;
      this.journeyAttachmentArray.push({
        AutoId: this.maxAttachmentId,
        JourneyType: this.journeyTypes.filter(x => x.id == this.AttachmentJourneyTypeId)[0].name,
        TicketName: this.tickets.filter(x => x.id == this.TicketId)[0].name,
        AttachmentLink: "attachment"
      })
      this.travelAttachmentArray.push({
        AutoId: this.maxAttachmentId,
        JourneyTypeId: this.AttachmentJourneyTypeId,
        TicketId: this.TicketId,
        AttachmentLink: "attachment"
      })
      this.AttachmentJourneyTypeId = undefined;
      this.TicketId = undefined;
      this.attachmentFileImport.nativeElement.innerText = "Choose file";
      this.fileUpload.push({ file: this.attachmentfileToUpload });
    }
    else {
      this.notificationService.showError(msg, "Error");
    }
  }

  removeJourneyAddedAttachmentRow(autoId) {
    this.journeyAddedAttachmentArray = this.journeyAddedAttachmentArray.filter(x => x.autoId != autoId);
  }

  removeJourneyAttachmentRow(index, i) {
    this.journeyAttachmentArray = this.journeyAttachmentArray.filter(x => x.AutoId != index);
    this.travelAttachmentArray = this.travelAttachmentArray.filter(x => x.AutoId != index);
    delete this.fileUpload[i];
  }

  submitData() {
    var flag = 0;
    var msg = "";
    if (this.bankfileToUpload == null && this.BankStatementDocument == "") {
      flag = 1;
      msg = "Please select bank statement document";
    }
    else {

    }
    if (this.BankStatementId == undefined || this.BankStatementId == 0) {
      flag = 1;
      msg = "Please select bank statement";
    }
    else {

    }
    if (this.travelAttachmentArray.length == 0 && this.journeyAddedAttachmentArray.length == 0) {
      flag = 1;
      msg = "Please enter attachment details";
    }
    else {

    }
    if (this.BankBranch == undefined || this.BankBranch == "") {
      flag = 1;
      msg = "Please enter bank branch & address";
    }
    else {

    }
    if (this.IFSC == undefined || this.IFSC == "") {
      flag = 1;
      msg = "Please enter IFSC";
    }
    else {

    }
    if (this.BankAccountNumber == undefined || this.BankAccountNumber == "") {
      flag = 1;
      msg = "Please enter bank account number";
    }
    else {

    }
    if (this.BankName == undefined || this.BankName == "") {
      flag = 1;
      msg = "Please enter bank name";
    }
    else {

    }
    if (this.BankAccountName == undefined || this.BankAccountName == "") {
      flag = 1;
      msg = "Please enter bank account name";
    }
    else {

    }
    if (this.travelJourneyArray.length == 0 && this.journeyAddedDataArray.length == 0) {
      flag = 1;
      msg = "Please enter journey details";
    }
    else {

    }
    if (this.PinCode == undefined || this.PinCode == "") {
      flag = 1;
      msg = "Please enter pincode";
    }
    else {

    }
    if (this.CommunicationAddress == undefined || this.CommunicationAddress == "") {
      flag = 1;
      msg = "Please enter communiction address";
    }
    else {

    }
    if (flag == 0) {
      this.SpinnerService.show();
      const formData = new FormData();
      var previousJourneyIds = "";
      var previousAttachmentIds = "";
      for (var i = 0; i < this.journeyAddedDataArray.length; i++) {
        if (previousJourneyIds == "") {
          previousJourneyIds = this.journeyAddedDataArray[i].autoId.toString();
        }
        else {
          previousJourneyIds = previousJourneyIds + "," + this.journeyAddedDataArray[i].autoId.toString();
        }
      }
      for (var i = 0; i < this.journeyAddedAttachmentArray.length; i++) {
        if (previousAttachmentIds == "") {
          previousAttachmentIds = this.journeyAddedAttachmentArray[i].autoId.toString();
        }
        else {
          previousAttachmentIds = previousAttachmentIds + "," + this.journeyAddedAttachmentArray[i].autoId.toString();
        }
      }
      formData.append("TravelReimbursementId", this.TravelReimbursementId.toString());
      formData.append("TestScheduleDetailId", this.testScheduleDetailId.toString());
      formData.append("CommunicationAddress", this.CommunicationAddress.toString());
      formData.append("PinCode", this.PinCode.toString());
      formData.append("BankAccountName", this.BankAccountName.toString());
      formData.append("BankAccountNumber", this.BankAccountNumber.toString());
      formData.append("BankName", this.BankName.toString());
      formData.append("IFSC", this.IFSC.toString());
      formData.append("BankBranch", this.BankBranch.toString());
      formData.append("BankStatementId", this.BankStatementId.toString());
      formData.append("PreviousAttachmentIds", previousAttachmentIds);
      formData.append("PreviousJourneyIds", previousJourneyIds);
      formData.append("BankStatementDocument", this.bankfileToUpload);
      formData.append("JourneyData", JSON.stringify(this.travelJourneyArray));
      formData.append("AttachmentData", JSON.stringify(this.travelAttachmentArray));
      for (var i = 0; i < this.fileUpload.length; i++) {
        formData.append("AttachmentFiles_" + i.toString(), this.fileUpload[i].file);
      }
      formData.append("CreatedBy", this.autoUserId.toString());
      formData.append("theFile", this.file);
      this.travelReimbursementService.addTestTravelReimbursement(formData).subscribe((result) => {        
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
          this.closeModal.nativeElement.click();
          this.SpinnerService.hide();
        }
        else {
          this.SpinnerService.hide();
          this.journeyDataArray = [];
          this.journeyAttachmentArray = [];
          this.notificationService.showSuccess(result.msg, "Success");
          this.closeModal.nativeElement.click();
          this.getTravelReimbursement();
          this.bankStatementFileImport.nativeElement.innerText = "Choose file";
          this.bankfileToUpload = null;
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
        this.closeModal.nativeElement.click();
        this.notificationService.showError("Something went wrong", "Error");
      });
    }
    else {
      this.notificationService.showError(msg, "Error");
    }
  }

  formSubmit() {
    this.SpinnerService.show();
    this.testTravelReimbursementForPDF.fullName = this.travelReimbursement.fullName;
    this.testTravelReimbursementForPDF.testDate = this.travelReimbursement.testDate;
    this.testTravelReimbursementForPDF.venueName = this.travelReimbursement.venueName;
    this.testTravelReimbursementForPDF.positionName = this.travelReimbursement.positionName;
    this.testTravelReimbursementForPDF.emailId = this.travelReimbursement.emailId;
    this.testTravelReimbursementForPDF.contactNo = this.travelReimbursement.contactNo;
    this.testTravelReimbursementForPDF.communicationAddress = this.CommunicationAddress;
    this.testTravelReimbursementForPDF.stateName = this.stateName;
    this.testTravelReimbursementForPDF.pinCode = this.PinCode;
    this.testTravelReimbursementForPDF.bankAccountName = this.BankAccountName;
    this.testTravelReimbursementForPDF.bankAccountNumber = this.BankAccountNumber;
    this.testTravelReimbursementForPDF.bankName = this.BankName;
    this.testTravelReimbursementForPDF.ifsc = this.IFSC;

    this.testTravelReimbursementForPDF.travelReimbursementJourneyListData = JSON.parse(JSON.stringify(this.journeyAddedDataArray));

    for (var i = 0; i < this.journeyDataArray.length; i++) {
      this.testTravelReimbursementForPDF.travelReimbursementJourneyListData.push({
        autoId: this.journeyDataArray[i].AutoId,
        journeyTypeName: this.journeyDataArray[i].JourneyType,
        journeyDate: this.journeyDataArray[i].JourneyDate,
        journeySource: this.journeyDataArray[i].JourneySource,
        journeyDestination: this.journeyDataArray[i].JourneyDestination,
        travelModeName: this.journeyDataArray[i].TravelMode,
        claimAmount: Number(this.journeyDataArray[i].ClaimAmount)
      })
    }

    this.testTravelReimbursementForPDF.grandTotal = 0;
    if (this.testTravelReimbursementForPDF.travelReimbursementJourneyListData.length > 0) {
      this.testTravelReimbursementForPDF.travelReimbursementJourneyListData.forEach(element => {
        this.testTravelReimbursementForPDF.grandTotal += element.claimAmount;
      });
    }
    var htmlString = "";
    setTimeout(() => {
      htmlString = document.getElementById("printTestTravelReimbursement").innerHTML;
      var dom = document.createElement('div');
      dom.innerHTML = htmlString;
      var opt = {
        margin: 6,
        filename: this.travelReimbursement.fullName + "_Test_Travel_Reimbursement",
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, y: 2, scrollY: 0 },
        jsPDF: { format: 'A4', orientation: "portrait" },
      }

      html2pdf().set(opt).from(dom).toPdf().output('blob').then((data: any) => {
        this.file = data;

        //this.submitData();
        jQuery("#confirmPopup").modal('show');
      })
      this.SpinnerService.hide()
      //this.SpinnerService.hide()
    }, 300);
  }

  gotoTravelReimbursement() {
    this.persistance.set('pagename', null);
    this._route.navigate(['/app/career/test-travel-reimbursement']);
  }
  openFile(blobName: string): void {
    let regex = /\.net(.*)/;
    let match = blobName.match(regex);
    let extractedString = match ? match[1] : '';
    let filename = extractedString.split('/')[2];
    let containername = extractedString.split('/')[1];
    this.locationService.getTestfile(filename, containername).subscribe(response => {
      let blob: Blob = response.body as Blob;
      const url = window.URL.createObjectURL(blob);

      // Open the file in a new tab
      window.open(url);

    }, error => {
      console.error('Failed to download file:', error);
    });
  }
}
