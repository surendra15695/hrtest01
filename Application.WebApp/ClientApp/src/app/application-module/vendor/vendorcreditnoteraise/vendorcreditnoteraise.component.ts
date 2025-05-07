import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../services/common/common/common.service';
import { VendorService } from '../../../services/vendor/vendor/vendor.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { ShareddataService } from '../../../sharedservices/shareddata.service';
declare var jQuery: any;

@Component({
  selector: 'app-vendorcreditnoteraise',
  templateUrl: './vendorcreditnoteraise.component.html',
  styleUrls: ['./vendorcreditnoteraise.component.css']
})
export class VendorcreditnoteraiseComponent implements OnInit {

  pageTitle: string = "Candidate List";
  @ViewChild('closeUploadModal', { static: false }) cUModal: ElementRef;
  @ViewChild('closeClarificationModal', { static: false }) cCModal: ElementRef;
  @ViewChild('attachmentFileImport', { static: false }) attachmentFileImport: ElementRef;
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  @ViewChild('creditFileimport', { static: false }) creditFileimport: ElementRef;
  searchform: FormGroup;
  attachmentfileToUpload: File;
  candidateList: any[] = [];
  clarificationList: any[] = [];
  loginUserId: number;
  candidateIds: String;
  prevselectedstatus: number = 0;
  currentHiringStatus: number;
  isBtnUpload: boolean = false;
  invoiceremarks: string;
  ClarificationRemarks: string;
  selectedVendorInvoiceId: number;
  vendorInvoiceId : number;
  CreditBillAmount: number;
  vendorCreditNoteId: number;   //arg
  creditNoteStatusId: number;
  creditBillAmount: number;
  remarks: string;
  candidateId     : number;
  candidateName   : string;
  CreditBillUpload: File =null;
  TotalBillAmount: number;
  CreditNoteRemarks: string;
  invalidFileName1:boolean=false;
  invalidFileName2:boolean=false;
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
  ) {
    this.SpinnerService.show();
    jQuery(".custom-menu").hide();
    this.titleService.setTitle(this.pageTitle);
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    localStorage.removeItem('pagename');
    localStorage.removeItem('id');
    this.createForm();
    this.candidateIds = "";
  }

  ngOnInit() {
    this.loadDatePicker();
    this.loadDataTable();
    this.loadTooltipMenu();
    setTimeout(() => {
      this.fromSubmit();

    });
  }

  createForm() {
    this.searchform = this.fb.group({
      fromDate: [''],
      toDate: [''],
      createdBy: [this.loginUserId]
    });
  }



  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }

  loadDataTable() {
    var dothis = this;
    jQuery('#dataTable1').dataTable().fnClearTable();
    jQuery('#dataTable1').dataTable().fnDestroy();
    setTimeout(() => {
      var oTable =
        jQuery('#dataTable1').dataTable({
          "searching": false,
          "paging": true,
          "scrollX": true,
          //"pageLength": 2,
          //"stateSave": true
        });
      var flag = 0;
      var l = 0;
      var firsttext = "";
      var nexttext = "";
      jQuery('body').on('click', '#chkAll', function () {
        l = 0;
        flag = 0;
        if (jQuery(this).prop("checked")) {
          jQuery('.invoiceStatus', oTable.fnGetNodes()).each(function () {
            if (l == 0) {
              firsttext = jQuery(this).parent("td").parent("tr").find("td:eq(12)").html();
            }
            else {
              nexttext = jQuery(this).parent("td").parent("tr").find("td:eq(12)").html();
            }

            if (l > 0) {
              if (firsttext != nexttext) {
                flag = 2;
              }
            }

            l++;
          });
          if (flag == 1) {
            jQuery("#chkAll").prop("checked", false);
            dothis.notificationService.showError("Please select same status", "Error");
          }
          else {
            jQuery('.invoiceStatus', oTable.fnGetNodes()).each(function () {
              if (jQuery(this).parent("td").find('input[type="checkbox"]').prop("checked")) {
                jQuery(this).parent("td").find('input[type="checkbox"]').click();
              }
              jQuery(this).parent("td").find('input[type="checkbox"]').click();
            });
            jQuery("#chkAll").prop("checked", true);
          }
        }
        else {
          jQuery('.invoiceStatus', oTable.fnGetNodes()).each(function () {
            if (jQuery(this).parent("td").find('input[type="checkbox"]').prop("checked")) {
              jQuery(this).parent("td").find('input[type="checkbox"]').click();
            }
          });
          dothis.candidateIds = "";
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

  fromSubmit() {
    this.searchform.patchValue(
      {
        fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,
        allocatedAutoUserId: this.loginUserId
      });    
    this.SpinnerService.show();
    this.vendorService.getAllVendorRaiseCreditnote(this.searchform.value).subscribe((result) => {
      if (result) {
        this.candidateList = result;        
        this.loadDataTable();
        this.SpinnerService.hide();
      }
      else {
        this.candidateList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }


  reset() {
    this.searchform.reset();
    this.searchform.patchValue({
      fromDate: '',
      toDate: ''
    })
    this.candidateList = [];
    this.loadDataTable();
  }

  select(evt, id, statusid) {
    var flag = 0;
    this.currentHiringStatus = statusid;
    if (this.candidateIds != "") {
      if (this.prevselectedstatus != statusid) {
        jQuery("#chkm" + id).prop("checked", false);
        flag = 1;
      }
      else {
        this.prevselectedstatus = statusid;
      }
    }
    else {
      this.prevselectedstatus = statusid;
    }
    if (evt.target.checked && flag == 0) {
      this.candidateIds = this.candidateIds + "," + id;
    }
    else {
      jQuery("#chkAll").prop("checked", false);
      this.candidateIds = this.candidateIds.replace("," + id, "");
    }
    if (this.candidateIds != "") {
      if (statusid == 0 && flag == 0) {
        this.isBtnUpload = true;
      }
      else {
        this.isBtnUpload = false;
      }
    }
    else {
      this.isBtnUpload = false;
    }
  }

  onAttachmentFileChange(files: FileList) {
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

  onUploadInvoice() {
    var flag = 0;
    var msg = "";
    if (this.attachmentfileToUpload == null) {
      flag = 1;
      msg = "Please Attach a file";
    }
    else {

    }
    if (this.invoiceremarks == undefined || this.invoiceremarks == "") {
      msg = "Please fill remarks";
      flag = 1;
    }
    else {

    }
    if (flag == 0) {
      //this.SpinnerService.show();
      const formData = new FormData();
      if (this.selectedVendorInvoiceId == 0 || this.selectedVendorInvoiceId == undefined) {
        formData.append("CandidateIds", this.candidateIds.toString());
        formData.append("Files", this.attachmentfileToUpload);
        formData.append("CreatedBy", this.loginUserId.toString());
        formData.append("Remarks", this.invoiceremarks);
        this.vendorService.uploadVendorInvoice(formData).subscribe((result) => {
          if (result.status == 0) {
            this.notificationService.showError(result.msg, "Error");
            this.SpinnerService.hide();
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.cUModal.nativeElement.click();
            this.attachmentFileImport.nativeElement.innerText = "";
            this.attachmentFileImport.nativeElement.value = "";
            this.attachmentfileToUpload = null;
            this.fromSubmit();
            this.candidateIds = "";
          }
        }, error => {
          console.log(error);
          this.SpinnerService.hide();
          this.notificationService.showError("Something went wrong", "Error");
        });
      }
      else {
        formData.append("VendorInvoiceId", this.selectedVendorInvoiceId.toString());
        formData.append("Files", this.attachmentfileToUpload);
        formData.append("CreatedBy", this.loginUserId.toString());
        formData.append("Remarks", this.invoiceremarks);
        this.vendorService.uploadVendorInvoiceUpdate(formData).subscribe((result) => {
          if (result.status == 0) {
            this.notificationService.showError(result.msg, "Error");
            this.SpinnerService.hide();
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.cUModal.nativeElement.click();
            this.attachmentFileImport.nativeElement.innerText = "";
            this.attachmentFileImport.nativeElement.value = "";
            this.attachmentfileToUpload = null;
            this.fromSubmit();
            this.candidateIds = "";
          }
        }, error => {
          console.log(error);
          this.SpinnerService.hide();
          this.notificationService.showError("Something went wrong", "Error");
        });
      }

    }
    else {
      this.notificationService.showError(msg, "Error");
      this.SpinnerService.hide();
    }
  }

  openClarificationModal(vendorInvoiceId) {
    this.selectedVendorInvoiceId = vendorInvoiceId;
    this.getClarificationList();
  }

  getClarificationList() {
    var formData = {
      vendorInvoiceId: this.selectedVendorInvoiceId
    }
    this.SpinnerService.show();
    this.vendorService.getAllVendorClarificationRemarks(formData).subscribe((result) => {
      if (result) {
        this.clarificationList = result;
        this.SpinnerService.hide();
      }
      else {
        this.clarificationList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }

  clarificationSubmit() {
    var flag = 0;
    if (this.ClarificationRemarks == "" || this.ClarificationRemarks == undefined) {
      this.notificationService.showError("Please fill remarks to proceed", "Error");
      flag = 1;
    }
    else {
    }
    if (flag == 0) {
      var formData = {
        VendorInvoiceIds: this.selectedVendorInvoiceId.toString(),
        InvoiceStatusId: 3,
        Remarks: this.ClarificationRemarks,
        CreatedBy: this.loginUserId
      }
      this.vendorService.vendorInvoiceAction(formData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
            this.SpinnerService.hide();
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");

            this.cCModal.nativeElement.click();
            this.selectedVendorInvoiceId = 0;
            this.ClarificationRemarks = "";
            this.fromSubmit();
            this.SpinnerService.hide();
          }
        }
        else {
        }
      }, error => {
        console.log(error);
      }, () => {
        this.SpinnerService.hide();
      });
    }
  }

  // openUploadCreditNoteModal(vendorInvoiceId, candidateId) {
  //   this.candidateIds = candidateId.toString();
  //   this.selectedVendorInvoiceId = vendorInvoiceId;
  // }

  closeSelectedvendorCreditNote() {
    this.selectedVendorInvoiceId = 0;
  }


  gotoSubmittedCandidateDetail(id) {
    this.persistance.set('pagename', "vendorraiscreditnote");
    this.persistance.set('nextpagename', "candidatedetail");
    this.persistance.set('candidateid', id);
    this._route.navigate(['/app/vendor/job/candidate-list/candidate']);
  }
  creditFileUpload(files: FileList){
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
      this.creditFileimport.nativeElement.innerText = "Choose file";
      this.CreditBillUpload = null;
      return;
    }
    if (files.length > 0) {
      if (files[0].size > 2097152) {
        this.notificationService.showError("File should be less than 2MB!", "Error");
        this.creditFileimport.nativeElement.innerText = "Choose file";
        this.CreditBillUpload = null;
      } else {
        this.creditFileimport.nativeElement.innerText = files[0].name;
        this.CreditBillUpload = files.item(0);
      }
    }
    else {
      this.creditFileimport.nativeElement.innerText = "Choose file";
      this.CreditBillUpload = null;
    }
  }
  onClickUploadCreditNote(data){
    this.creditFileimport.nativeElement.innerText = "Choose file";
    this.CreditBillUpload = null;
    this.creditNoteStatusId=3;
    this.CreditBillAmount = data.creditBillAmount;
    this.vendorInvoiceId = data.vendorInvoiceId;
    this.vendorCreditNoteId = data.vendorCreditNoteId;
    this.candidateId = data.candidateId;
    this.candidateName = data.candidateFullName;
    this.TotalBillAmount = data.totalBillAmount;
    this.CreditNoteRemarks = data.creditNoteRemarks
  }
  onUploadCreditNote(){
    var flag = 0;
    var msg = "";
    if (this.CreditBillAmount == 0 || this.CreditBillAmount == undefined) {
      flag = 1;
      msg = "Please Enter Credit Amount";
    }
    if (this.CreditBillUpload == null || this.CreditBillUpload == undefined) {
      flag = 1;
      msg = "Please Attach Bill details";
    }
    if (flag == 0) { 
      const formData = new FormData();
      formData.append("VendorCreditNoteId", this.vendorCreditNoteId.toString());
      formData.append("vendorInvoiceId", this.vendorInvoiceId.toString());
      formData.append("CreditNoteStatus", this.creditNoteStatusId.toString());
      formData.append("CreditBillAmount", this.CreditBillAmount.toString());
      formData.append("UploadDocument",this.CreditBillUpload);
      formData.append("CreatedBy",this.loginUserId.toString());
      //formData.append("CandidateId", this.candidateId.toString());
        this.vendorService.addCreditNoteForVendor(formData).subscribe((result) => {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.creditFileimport.nativeElement.innerText = "Choose file";
            this.CreditBillAmount = null;
            this.CreditBillUpload = null;
            this.fromSubmit();
            jQuery("#CreditNoteModal").modal("hide");
          }
        }, error => {
          console.log(error);
          this.SpinnerService.hide();
          this.notificationService.showError("Something went wrong", "Error")
        });     
    }
    else {
      this.notificationService.showError(msg, "Error");
    }

  }

}
