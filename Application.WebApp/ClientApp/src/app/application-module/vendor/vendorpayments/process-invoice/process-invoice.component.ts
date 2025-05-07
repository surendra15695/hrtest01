import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IVendorInvoiceDetails } from 'src/app/interfaces/vendor/vendor.interface';
import { CommonService } from 'src/app/services/common/common/common.service';
import { LocationService } from 'src/app/services/common/location/location.service';
import { VendorService } from 'src/app/services/vendor/vendor/vendor.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { ShareddataService } from 'src/app/sharedservices/shareddata.service';

declare var jQuery: any;

@Component({
  selector: 'app-process-invoice',
  templateUrl: './process-invoice.component.html',
  styleUrls: ['./process-invoice.component.css']
})
export class ProcessInvoiceComponent implements OnInit {
  searchFormProcessInvoiceList: FormGroup;
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;

  processInvoiceList: any[] = [];
  loginUserId: number;
  vendorInvoiceId: number;
  vendorInvoiceDetailId: number;
  candidateId: number;
  employeeNo: string;
  candidateName: string;
  billAmount: number;
  prNo: string = "";
  poNo: string = "";
  ssEntryNo: string = "";
  remarks: string = "";
  invoiceStatusId: number;
  vendorId: number;
  invoicePath: string;
  vendorName: string;
  billDate: string;
  invoiceStatus: string;

  dataVendorInvoiceId: number;
  dataBillableCTC: number
  dataServiceChargePer: number;
  dataServiceChargeAmount: number;
  datagstPer: number;
  datagstAmount: number;
  dataTotalBillAmount: number;

  dataPurchaseRequestNo: string;
  dataPurchaseOrderNo: string;
  dataServiceSheetEntryNo: string;

  totalBillAmount: number;
  creditNoteStatusId: number;
  vendorCreditNoteId: number;

  vendorInvoiceDetails: IVendorInvoiceDetails[] = [];
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private commonService: CommonService,
    private persistance: PersistanceService,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
    private vendorService: VendorService,
    private notificationService: NotificationService,
    private locationService: LocationService,

  ) { 
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.createProcessInvoiceSearchForm();
    this.getAllProcessInvoiceListPending();
  }

  ngOnInit() {
    this.loadDataTable();
    this.loadDataTable2();
    this.loadDatePicker();
    this.loadTooltipMenu();
  }

  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }
  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "fixedColumns": {
          "left": 3
        }
      });
    });
  }
  loadDataTable2() {
    jQuery('#dataTable2').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable2').DataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
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

      });
    });
  }

  createProcessInvoiceSearchForm(){
    this.searchFormProcessInvoiceList = this.fb.group({
      vendorName: [''],
      fromDate: [''],
      toDate: [''],
      candidateNo: [''],
      // candidateName: ['']
      allocatedAutoUserId: this.loginUserId
    })
  }

  getAllProcessInvoiceListPending(){
    this.processInvoiceList = [];
    this.SpinnerService.show();
    this.vendorService.getAllProcessInvoiceList(this.searchFormProcessInvoiceList.value).subscribe((result) => {
      if (result) {
        this.processInvoiceList = result;
        this.processInvoiceList = this.processInvoiceList.filter(e => e.invoiceStatusId == 2 || e.purchaseRequestNo==null || e.purchaseOrderNo==null || e.serviceSheetEntryNo==null);
        this.SpinnerService.hide();
      }
      else {
        this.processInvoiceList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.loadDataTable();
      this.SpinnerService.hide();
    });
  }
  getAllProcessInvoiceListProcessed(){
    this.processInvoiceList = [];
    this.SpinnerService.show();
    this.vendorService.getAllProcessInvoiceList(this.searchFormProcessInvoiceList.value).subscribe((result) => {
      if (result) {
        this.processInvoiceList = result;
        this.processInvoiceList = this.processInvoiceList.filter(e => e.invoiceStatusId != 2 && e.purchaseRequestNo!=null && e.purchaseOrderNo!=null && e.serviceSheetEntryNo!=null);
        this.SpinnerService.hide();
      }
      else {
        this.processInvoiceList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.loadDataTable2();
      this.SpinnerService.hide();
    });
  }
  onClickPendingTab(){
    this.getAllProcessInvoiceListPending();
  }
  onSearchProcessInvoicePending(){
    this.searchFormProcessInvoiceList.patchValue(
      {
        fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,
      });
    this.getAllProcessInvoiceListPending();
  }
  onResetPending(){
    this.searchFormProcessInvoiceList.reset();
    this.getAllProcessInvoiceListPending();
  }

  onClickProcessedTab(){
    this.getAllProcessInvoiceListProcessed();
  }
  onSearchProcessInvoiceProcessed(){
    this.searchFormProcessInvoiceList.patchValue(
      {
        fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,
      });
    this.getAllProcessInvoiceListProcessed();  
  }
  onResetProcessed(){
    this.searchFormProcessInvoiceList.reset();
    this.getAllProcessInvoiceListProcessed();
  }

  //Need Clarification Part
  onClickClarification(data){
    this.remarks = "";
    
    this.candidateId = data.candidateId;
    this.candidateName = data.candidateFullName;
    this.billAmount = data.totalBillAmount;
    this.vendorInvoiceId = data.vendorInvoiceId;
    this.vendorInvoiceDetailId = data.vendorInvoiceDetailId;
    this.vendorId = data.vendorId;
    this.invoicePath = data.invoicePath;
    this.dataVendorInvoiceId = data.vendorInvoiceId;
    this.dataBillableCTC = data.billableCTC;
    this.dataServiceChargePer = data.serviceChargePer;
    this.dataServiceChargeAmount = data.serviceChargeAmount;
    this.datagstPer = data.gstPer;
    this.datagstAmount = data.gstAmount;
    this.dataTotalBillAmount = data.totalBillAmount;
    this.dataPurchaseRequestNo = data.purchaseRequestNo;
    this.dataPurchaseOrderNo = data.purchaseOrderNo;
    this.dataServiceSheetEntryNo = data.serviceSheetEntryNo;
    this.invoiceStatusId = 2;
  }
  onSubmitReason(){
    var flag = 0;
    var msg = "";
    if(this.remarks == "" || this.remarks == undefined){
      flag = 1;
      msg = "Please enter your remarks...";
    }
    if(flag == 0){
      this.vendorInvoiceDetails = [];
      this.vendorInvoiceDetails.push({
        vendorInvoiceId: this.dataVendorInvoiceId,
        vendorInvoiceDetailId: this.vendorInvoiceDetailId,
        billableCTC: this.dataBillableCTC,
        serviceChargePer: this.dataServiceChargePer,
        serviceChargeAmount: this.dataServiceChargeAmount,
        gstPer: this.datagstPer,
        gstAmount: this.datagstAmount,
        totalBillAmount: this.dataTotalBillAmount,
        purchaseRequestNo: this.dataPurchaseRequestNo,
        purchaseOrderNo: this.dataPurchaseOrderNo,
        serviceSheetEntryNo: this.dataServiceSheetEntryNo
      })
  
      const formData = new FormData();
      formData.append("VendorInvoiceId", this.vendorInvoiceId.toString());
      formData.append("VendorId", this.vendorId.toString());
      formData.append("CandidateId", this.candidateId.toString());
      formData.append("InvoicePath", this.invoicePath);
      formData.append("Remarks", this.remarks);
      formData.append("InvoiceStatus", this.invoiceStatusId.toString());
      formData.append("CreatedBy", this.loginUserId.toString());
      formData.append("VendorInvoiceDetails", JSON.stringify(this.vendorInvoiceDetails));
      
      this.SpinnerService.show();
      this.vendorService.addInvoiceForVendor(formData).subscribe((result) => {
        if (result.successFlag == 0){
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.remarks = "";
          this.onClickPendingTab();
          //this.onClickProcessedTab();
          jQuery("#myModal").modal("hide");
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
        this.notificationService.showError("Something went wrong", "Error")
      });
    }
    else{
      this.notificationService.showError(msg, "Error");
    }
    
  }

  //PR Update Part
  onClickUpdatePR(data){
    this.prNo = data.purchaseRequestNo;

    this.candidateId = data.candidateId;
    this.candidateName = data.candidateFullName;
    this.billAmount = data.totalBillAmount;
    this.vendorInvoiceId = data.vendorInvoiceId;
    this.vendorInvoiceDetailId = data.vendorInvoiceDetailId;
    this.vendorId = data.vendorId;
    this.invoicePath = data.invoicePath;
    this.dataVendorInvoiceId = data.vendorInvoiceId;
    this.dataBillableCTC = data.billableCTC;
    this.dataServiceChargePer = data.serviceChargePer;
    this.dataServiceChargeAmount = data.serviceChargeAmount;
    this.datagstPer = data.gstPer;
    this.datagstAmount = data.gstAmount;
    this.dataTotalBillAmount = data.totalBillAmount;
    this.dataPurchaseOrderNo = data.purchaseOrderNo;
    this.dataServiceSheetEntryNo = data.serviceSheetEntryNo;
    this.invoiceStatusId = 4;
  }
  onSubmitPR(){
    var flag = 0;
    var msg ="";
    if(this.prNo == "" || this.prNo == undefined){
      flag=1;
      msg="Please enter PR No...";
    }
    if(flag == 0){
      this.vendorInvoiceDetails = [];
      this.vendorInvoiceDetails.push({
        vendorInvoiceId: this.dataVendorInvoiceId,
        vendorInvoiceDetailId: this.vendorInvoiceDetailId,
        billableCTC: this.dataBillableCTC,
        serviceChargePer: this.dataServiceChargePer,
        serviceChargeAmount: this.dataServiceChargeAmount,
        gstPer: this.datagstPer,
        gstAmount: this.datagstAmount,
        totalBillAmount: this.dataTotalBillAmount,
        purchaseRequestNo: this.prNo,
        purchaseOrderNo: this.dataPurchaseOrderNo,
        serviceSheetEntryNo: this.dataServiceSheetEntryNo
      })
      const formData = new FormData();
      formData.append("VendorInvoiceId", this.vendorInvoiceId.toString());
      formData.append("VendorId", this.vendorId.toString());
      formData.append("CandidateId", this.candidateId.toString());
      formData.append("InvoicePath", this.invoicePath);
      formData.append("InvoiceStatus", this.invoiceStatusId.toString());
      formData.append("CreatedBy", this.loginUserId.toString());
      formData.append("VendorInvoiceDetails", JSON.stringify(this.vendorInvoiceDetails));
  
      this.SpinnerService.show();
      this.vendorService.addInvoiceForVendor(formData).subscribe((result) => {
        if (result.successFlag == 0){
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.prNo = "";
          this.onClickPendingTab();
          //this.onClickProcessedTab();
          jQuery("#updatePRModal").modal("hide");
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
        this.notificationService.showError("Something went wrong", "Error")
      });
    }
    else{
      this.notificationService.showError(msg, "Error");
    }

    
  }

  //PO Update Part
  onClickUpdatePO(data){
    this.poNo = data.purchaseOrderNo;

    this.candidateId = data.candidateId;
    this.candidateName = data.candidateFullName;
    this.billAmount = data.totalBillAmount;
    this.vendorInvoiceId = data.vendorInvoiceId;
    this.vendorInvoiceDetailId = data.vendorInvoiceDetailId;
    this.vendorId = data.vendorId;
    this.invoicePath = data.invoicePath;
    this.dataVendorInvoiceId = data.vendorInvoiceId;
    this.dataBillableCTC = data.billableCTC;
    this.dataServiceChargePer = data.serviceChargePer;
    this.dataServiceChargeAmount = data.serviceChargeAmount;
    this.datagstPer = data.gstPer;
    this.datagstAmount = data.gstAmount;
    this.dataTotalBillAmount = data.totalBillAmount;
    this.dataPurchaseRequestNo = data.purchaseRequestNo;
    this.dataServiceSheetEntryNo = data.serviceSheetEntryNo;
    this.invoiceStatusId = 5;
  }
  onSubmitPO(){
    var flag = 0;
    var msg = "";
    if(this.poNo == "" || this.poNo == undefined){
      flag = 1;
      msg = "Please enter PO No...";
    }
    if(flag == 0){
      this.vendorInvoiceDetails = [];
      this.vendorInvoiceDetails.push({
        vendorInvoiceId: this.dataVendorInvoiceId,
        vendorInvoiceDetailId: this.vendorInvoiceDetailId,
        billableCTC: this.dataBillableCTC,
        serviceChargePer: this.dataServiceChargePer,
        serviceChargeAmount: this.dataServiceChargeAmount,
        gstPer: this.datagstPer,
        gstAmount: this.datagstAmount,
        totalBillAmount: this.dataTotalBillAmount,
        purchaseRequestNo: this.dataPurchaseRequestNo,
        purchaseOrderNo: this.poNo,
        serviceSheetEntryNo: this.dataServiceSheetEntryNo
      })
      const formData = new FormData();
      formData.append("VendorInvoiceId", this.vendorInvoiceId.toString());
      formData.append("VendorId", this.vendorId.toString());
      formData.append("CandidateId", this.candidateId.toString());
      formData.append("InvoicePath", this.invoicePath);
      formData.append("InvoiceStatus", this.invoiceStatusId.toString());
      formData.append("CreatedBy", this.loginUserId.toString());
      formData.append("VendorInvoiceDetails", JSON.stringify(this.vendorInvoiceDetails));
  
      this.SpinnerService.show();
      this.vendorService.addInvoiceForVendor(formData).subscribe((result) => {
        if (result.successFlag == 0){
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.poNo = "";
          this.onClickPendingTab();
          //this.onClickProcessedTab();
          jQuery("#updatePOModal").modal("hide");
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
        this.notificationService.showError("Something went wrong", "Error")
      });
    }
    else{
      this.notificationService.showError(msg, "Error");
    }

    
  }

  //Service Sheet Update Part
  onClickUpdateSS(data){
    this.ssEntryNo = data.serviceSheetEntryNo;

    this.candidateId = data.candidateId;
    this.candidateName = data.candidateFullName;
    this.billAmount = data.totalBillAmount;
    this.vendorInvoiceId = data.vendorInvoiceId;
    this.vendorInvoiceDetailId = data.vendorInvoiceDetailId;
    this.vendorId = data.vendorId;
    this.invoicePath = data.invoicePath;
    this.dataVendorInvoiceId = data.vendorInvoiceId;
    this.dataBillableCTC = data.billableCTC;
    this.dataServiceChargePer = data.serviceChargePer;
    this.dataServiceChargeAmount = data.serviceChargeAmount;
    this.datagstPer = data.gstPer;
    this.datagstAmount = data.gstAmount;
    this.dataTotalBillAmount = data.totalBillAmount;
    this.dataPurchaseRequestNo = data.purchaseRequestNo;
    this.dataPurchaseOrderNo = data.purchaseOrderNo;
    this.invoiceStatusId = 6;
  }
  onSubmitServiceSheet(){
    var flag = 0;
    var msg = "";
    if(this.ssEntryNo == "" || this.ssEntryNo == undefined){
      flag = 1;
      msg = "Please enter Service Sheet Entry No...";
    }
    if(flag == 0){
      this.vendorInvoiceDetails = [];
      this.vendorInvoiceDetails.push({
        vendorInvoiceId: this.dataVendorInvoiceId,
        vendorInvoiceDetailId: this.vendorInvoiceDetailId,
        billableCTC: this.dataBillableCTC,
        serviceChargePer: this.dataServiceChargePer,
        serviceChargeAmount: this.dataServiceChargeAmount,
        gstPer: this.datagstPer,
        gstAmount: this.datagstAmount,
        totalBillAmount: this.dataTotalBillAmount,
        purchaseRequestNo: this.dataPurchaseRequestNo,
        purchaseOrderNo: this.dataPurchaseOrderNo,
        serviceSheetEntryNo: this.ssEntryNo
      })
  
      const formData = new FormData();
      formData.append("VendorInvoiceId", this.vendorInvoiceId.toString());
      formData.append("VendorId", this.vendorId.toString());
      formData.append("CandidateId", this.candidateId.toString());
      formData.append("InvoicePath", this.invoicePath);
      formData.append("Remarks", this.remarks);
      formData.append("InvoiceStatus", this.invoiceStatusId.toString());
      formData.append("CreatedBy", this.loginUserId.toString());
      formData.append("VendorInvoiceDetails", JSON.stringify(this.vendorInvoiceDetails));
      
      this.SpinnerService.show();
      this.vendorService.addInvoiceForVendor(formData).subscribe((result) => {
        if (result.successFlag == 0){
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.ssEntryNo = "";
          this.onClickPendingTab();
          //this.onClickProcessedTab();
          jQuery("#updateSSEntryModal").modal("hide");
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
        this.notificationService.showError("Something went wrong", "Error")
      });
    }
    else{
      this.notificationService.showError(msg, "Error");
    }

    
  }

  onClickReleaseInvoice(data){
    this.candidateId = data.candidateId;
    this.vendorId = data.vendorId;
    this.vendorInvoiceId = data.vendorInvoiceId;
    this.invoiceStatusId = 7;
  }
  onSaveReleaseInvoice(){
    // const formData = new FormData();
    // formData.append("VendorInvoiceId", this.vendorInvoiceId.toString());
    // formData.append("VendorId", this.vendorId.toString());
    // formData.append("CandidateId", this.candidateId.toString());
    // formData.append("InvoiceStatus", this.invoiceStatusId.toString());
    // formData.append("CreatedBy", this.loginUserId.toString());

    var value={
      VendorInvoiceId: Number(this.vendorInvoiceId),
      VendorId: Number(this.vendorId),
      CandidateId: Number(this.candidateId),
      InvoiceStatus: Number(this.invoiceStatusId),
      CreatedBy: Number(this.loginUserId)
    }

    this.SpinnerService.show();
    this.vendorService.updateReleaseInvoice(value).subscribe((result) => {
      if (result.successFlag == 0){
        this.SpinnerService.hide();
        this.notificationService.showError(result.msg, "Error");
      }
      else {
        this.notificationService.showSuccess(result.msg, "Success");
        this.SpinnerService.hide();
        this.onClickProcessedTab();
        jQuery("#releaseInvoice").modal("hide");
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
      this.notificationService.showError("Something went wrong", "Error")
    });
  }

  onClickEnableCreditNote(data){
    this.vendorInvoiceId = data.vendorInvoiceId;
    this.totalBillAmount = data.totalBillAmount;
    this.creditNoteStatusId = 1;
    if(data.vendorCreditNoteId == 0){
      this.vendorCreditNoteId = 0;
    }
    else{
      this.vendorCreditNoteId = data.vendorCreditNoteId;
    }
  }
  onSaveEnableCreditNote(){
    const formData = new FormData();
    formData.append("VendorCreditNoteId", this.vendorCreditNoteId.toString());
    formData.append("VendorInvoiceId", this.vendorInvoiceId.toString());
    formData.append("TotalBillAmount", this.totalBillAmount.toString());
    formData.append("CreditNoteStatus", this.creditNoteStatusId.toString());
    formData.append("CreatedBy", this.loginUserId.toString());
    this.SpinnerService.show();
    this.vendorService.addCreditNoteForVendor(formData).subscribe((result) => {
      if (result.successFlag == 0){
        this.SpinnerService.hide();
        this.notificationService.showError(result.msg, "Error");
      }
      else {
        this.notificationService.showSuccess(result.msg, "Success");
        this.SpinnerService.hide();
        this.onClickProcessedTab();
        jQuery("#enableCreditNote").modal("hide");
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
      this.notificationService.showError("Something went wrong", "Error")
    });
  }

  onClickDisableCreditNote(data){
    this.vendorInvoiceId = data.vendorInvoiceId;
    this.totalBillAmount = data.totalBillAmount;
    this.vendorCreditNoteId = data.vendorCreditNoteId;
    this.creditNoteStatusId = 2;
  }
  onSaveDisableCreditNote(){
    const formData = new FormData();
    formData.append("VendorCreditNoteId", this.vendorCreditNoteId.toString());
    formData.append("VendorInvoiceId", this.vendorInvoiceId.toString());
    formData.append("TotalBillAmount", this.totalBillAmount.toString());
    formData.append("CreditNoteStatus", this.creditNoteStatusId.toString());
    formData.append("CreatedBy", this.loginUserId.toString());
    this.SpinnerService.show();
    this.vendorService.addCreditNoteForVendor(formData).subscribe((result) => {
      if (result.successFlag == 0){
        this.SpinnerService.hide();
        this.notificationService.showError(result.msg, "Error");
      }
      else {
        this.notificationService.showSuccess(result.msg, "Success");
        this.SpinnerService.hide();
        this.onClickProcessedTab();
        jQuery("#disableCreditNote").modal("hide");
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
      this.notificationService.showError("Something went wrong", "Error")
    });
  }

  onClickViewDetails(data){
    this.vendorName = data.vendorName;
    this.billDate = data.submittedOn;
    this.employeeNo = data.candidateNo;
    this.candidateName = data.candidateFullName;
    this.billAmount = data.totalBillAmount;
    this.dataPurchaseRequestNo = data.purchaseRequestNo;
    this.dataPurchaseOrderNo = data.purchaseOrderNo;
    this.dataServiceSheetEntryNo = data.serviceSheetEntryNo;
    this.invoiceStatus = data.invoiceStatusName;
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
