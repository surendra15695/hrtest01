import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/services/common/common/common.service';
import { LocationService } from 'src/app/services/common/location/location.service';
import { VendorService } from 'src/app/services/vendor/vendor/vendor.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { ShareddataService } from 'src/app/sharedservices/shareddata.service';

declare var jQuery: any;

@Component({
  selector: 'app-process-creditnotefor-ro',
  templateUrl: './process-creditnotefor-ro.component.html',
  styleUrls: ['./process-creditnotefor-ro.component.css']
})
export class ProcessCreditnoteforROComponent implements OnInit {
  searchFormCreditNoteList: FormGroup;
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;

  processCreditNoteList: any[] = [];
  loginUserId: number;
  callngIfFunction: boolean = true;
  remarks: string;
  popupText: string;
  creditNoteStatusId: number;
  clarificationCreditNoteForBulk: any = [];

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
    this.createProcessCreditNoteSearchForm();
    this.getAllProcessCreditNoteListPending();
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
        "scrollX": true
      });
    });
  }
  loadDataTable2() {
    jQuery('#dataTable2').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable2').DataTable({
        "searching": false,
        "paging": true,
        "scrollX": true
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
  createProcessCreditNoteSearchForm(){
    this.searchFormCreditNoteList = this.fb.group({
      vendorName: [''],
      fromDate: [''],
      toDate: [''],
      candidateNo: [''],
      // candidateName: ['']
      allocatedAutoUserId: this.loginUserId
    })
  }

  getAllProcessCreditNoteListPending(){
    this.processCreditNoteList = [];
    this.SpinnerService.show();
    this.vendorService.getAllProcessCreditNoteListForRO(this.searchFormCreditNoteList.value).subscribe((result) => {
      if (result) {
        this.processCreditNoteList = result;
        this.processCreditNoteList = this.processCreditNoteList.filter(e => e.creditNoteStatusId == 3);
        console.log("LIST",this.processCreditNoteList)
        this.SpinnerService.hide();
      }
      else {
        this.processCreditNoteList = [];
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
  getAllProcessCreditNoteListProcessed(){
    this.processCreditNoteList = [];
    this.SpinnerService.show();
    this.vendorService.getAllProcessCreditNoteListForRO(this.searchFormCreditNoteList.value).subscribe((result) => {
      if (result) {
        this.processCreditNoteList = result;
        this.processCreditNoteList = this.processCreditNoteList.filter(e => e.creditNoteStatusId == 4 || e.creditNoteStatusId == 5 || e.creditNoteStatusId ==6);
        this.SpinnerService.hide();
      }
      else {
        this.processCreditNoteList = [];
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
    this.getAllProcessCreditNoteListPending();
  }
  onSearchCreditNotePending(){
    this.searchFormCreditNoteList.patchValue(
      {
        fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,
      });
    this.getAllProcessCreditNoteListPending();
  }
  onResetPending(){
    this.searchFormCreditNoteList.reset();
    this.getAllProcessCreditNoteListPending();
  }
  onClickProcessedTab(){
    this.getAllProcessCreditNoteListProcessed();
  }
  onSearchCreditNoteProcessed(){
    this.searchFormCreditNoteList.patchValue(
      {
        fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,
      });
    this.getAllProcessCreditNoteListProcessed();  
  }
  onResetProcessed(){
    this.searchFormCreditNoteList.reset();
    this.getAllProcessCreditNoteListProcessed();
  }
  onCheckSelectAll_pending(eve) {
    var firstHiringStatusId = this.processCreditNoteList[0].creditNoteStatusId;
    var flag = 0;
    this.processCreditNoteList.forEach(element => {
      if (element.creditNoteStatusId != firstHiringStatusId) {
        flag = 1
      }
    })
    if (flag == 0) {
      this.processCreditNoteList.forEach(element => {
        element.checked = eve.target.checked;
      })
    } else {
      jQuery("#chkAll_pending").prop("checked", false);
      //this.notificationService.showError("Please select same approval status", "Error");
    }
  }
  onCheckSelectAll_Processed(eve) {
    var firstHiringStatusId = this.processCreditNoteList[0].creditNoteStatusId;
    var flag = 0;
    this.processCreditNoteList.forEach(element => {
      if (element.creditNoteStatusId != firstHiringStatusId) {
        flag = 1
      }
    })
    if (flag == 0) {
      this.processCreditNoteList.forEach(element => {
        element.checked = eve.target.checked;
      })
    } else {
      jQuery("#chkAll_processed").prop("checked", false);
      //this.notificationService.showError("Please select same approval status", "Error");
    }
  }
  onClickSendBackToCandidate() {
    this.popupText = "Send Back to Vendor";
    this.creditNoteStatusId = 4;
    this.remarks = "";
  }
  onClickApprove() {
    this.popupText = "Approve";
    this.creditNoteStatusId = 5;
    this.remarks = "";
  }
  onClickReject() {
    this.popupText = "Reject";
    this.creditNoteStatusId = 6;
    this.remarks = "";
  }
  getEnableStatus(data) {
    return data.checked;
  }
  showActionButton() {
    var checkedObj = this.processCreditNoteList.find(e => e.checked == true); 
    return checkedObj == null ? false : true;
  }
  onCheckRowWise(data, eve, index) {
    if (this.GetSelectedCreditNoteStatus(data)) {
      data.checked = eve.target.checked;
      if(data.checked==true){
        this.clarificationCreditNoteForBulk.push({ 
          VendorCreditNoteId: data.vendorCreditNoteId.toString(),
        });
      }
      else if(data.checked==false){
        this.clarificationCreditNoteForBulk=this.clarificationCreditNoteForBulk.filter(e=> e.VendorCreditNoteId!= data.vendorCreditNoteId.toString());
      }
    } else {
      jQuery("#" + index).prop("checked", false);
      //this.notificationService.showError("Please select same Approval status", "Error");
    }
  }
  GetSelectedCreditNoteStatus(NewRow) {
    var AlredyChecked = this.processCreditNoteList.find(e => e.checked);
    if (AlredyChecked == null) {
      return true;
    } else {
      return AlredyChecked.creditNoteStatusId == NewRow.creditNoteStatusId;
    }
  }
  onSubmitClaim() {

    var flag = 0;
    var msg = "";
    if (this.remarks == "") {
      flag = 1;
      msg = "Please Enter Remarks";
    }
    else {

    }
    if (flag == 0) {
      var vendorCreditNoteIds = "";
      var cflag = 0;
      this.processCreditNoteList.forEach(element => {
        if (element.checked) {
          vendorCreditNoteIds += (cflag == 0 ? "" : ",") + element.vendorCreditNoteId.toString();
          cflag = 1;
        }
      })

      let obj = {
        VendorCreditNoteIds: vendorCreditNoteIds,
        CreditNoteStatus: this.creditNoteStatusId,
        Remarks: this.remarks,
        CreatedBy: this.loginUserId,
      }
      this.SpinnerService.show();
      this.vendorService.addCreditNoteClarificationForVendor(obj).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.onClickPendingTab();
            this.remarks = "";
            // this.onClickProcessedTab();
            this.loadDataTable();
            this.loadDataTable2()
            jQuery("#selectAll_pending").prop("checked", false);
            jQuery("#chkAll_processed").prop("checked", false);
            jQuery("#myModal").modal("hide");
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
    else {
      this.notificationService.showError(msg, "Error");
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
