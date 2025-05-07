import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from '../../../services/common/common/common.service';
import { ShareddataService } from '../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { VendorService } from '../../../services/vendor/vendor/vendor.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from '../../../sharedservices/notification.service';
import { LocationService } from 'src/app/services/common/location/location.service';
declare var jQuery: any;

@Component({
  selector: 'app-vendorinvoicelist',
  templateUrl: './vendorinvoicelist.component.html',
  styleUrls: ['./vendorinvoicelist.component.css']
})
export class VendorinvoicelistComponent implements OnInit {
  pageTitle:string="Invoice List";
  @ViewChild('closeClarificationModal', { static: false }) cCModal: ElementRef;
  @ViewChild('closeActionModal', { static: false }) cAModal: ElementRef;
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  searchform: FormGroup;
  attachmentfileToUpload: File;
  candidateList:any[]=[];
  clarificationList: any[] = [];
  loginUserId: number;
  vendorInvoiceIds:String;
  prevselectedstatus: number = 0;
  currentHiringStatus: number;
  isBtnClarification:boolean=false;
  isBtnAccept:boolean=false;
  isBtnReject:boolean=false;
  invoiceremarks:string;
  invoiceStatusId:number;
  modalHeader:string="";
  ClarificationRemarks: string;
  selectedVendorInvoiceId: number=0;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private commonService: CommonService,
    private persistance: PersistanceService,
    private titleService:Title,
    private SpinnerService: NgxSpinnerService,
    private vendorService:VendorService,
    private notificationService: NotificationService,
    private locationService: LocationService,

  ) {
    this.SpinnerService.show();
    jQuery(".custom-menu").hide();
    this.titleService.setTitle(this.pageTitle);
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    localStorage.removeItem('pagename');
    localStorage.removeItem('id');
    this.createForm();
    this.vendorInvoiceIds="";
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
      createdBy:[0]
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
          "fixedColumns": {
            "left": 4
          },
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
          dothis.vendorInvoiceIds = "";
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
      jQuery(".custom-menu").find(".dropdown-item").on("click",function(e){
        
      });
    });
  }

  fromSubmit() {
    this.searchform.patchValue(
      {
        fromDate: this.fDate.nativeElement.value==undefined?"":this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value==undefined?"":this.tDate.nativeElement.value,
        
      });
      console.log(this.searchform.value);
      this.SpinnerService.show();
    this.vendorService.getAllVendorJoinedcandidate(this.searchform.value).subscribe((result) => {
      if (result) {
        this.candidateList = result;
        this.candidateList=this.candidateList.filter(x=>x.invoiceStatusId>0);
        console.log(this.candidateList);
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


  reset()
  {
    this.searchform.reset();
    this.searchform.patchValue({
      fromDate:'',
      toDate:''
    })
    this.candidateList=[];
    this.loadDataTable();
  }

  select(evt, id, statusid) {
    var flag = 0;
    this.currentHiringStatus = statusid;
    if (this.vendorInvoiceIds != "") {
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
      this.vendorInvoiceIds = this.vendorInvoiceIds + "," + id;
    }
    else {
      jQuery("#chkAll").prop("checked", false);
      this.vendorInvoiceIds = this.vendorInvoiceIds.replace("," + id, "");
    }
    if (this.vendorInvoiceIds != "") {
      if (statusid == 1 && flag == 0) {
        this.isBtnClarification = true;
        this.isBtnAccept = true;
        this.isBtnReject = true;
      }
      else if (statusid == 3 && flag == 0) {
        this.isBtnClarification = true;
        this.isBtnAccept = true;
        this.isBtnReject = true;
      }
      else {
        this.isBtnClarification = false;
        this.isBtnAccept = false;
        this.isBtnReject = false;
      }
    }
    else {
      this.isBtnClarification = false;
        this.isBtnAccept = false;
        this.isBtnReject = false;
    }
  }

  closeUploadmodal(){
    this.invoiceremarks=undefined;
    jQuery("#myModal").toggle();
  }

  openActionModal(acceptStatusId, modalHeader) {
    this.invoiceStatusId = acceptStatusId;
    this.modalHeader = modalHeader;
  }

  actionFormSubmit() {
    var flag = 0;
    if (this.invoiceStatusId == 4 || this.invoiceStatusId == 2) {
      if (this.invoiceremarks == "" || this.invoiceremarks == undefined) {
        this.notificationService.showError("Please fill remarks to proceed", "Error");
        flag = 1;
      }
      else {
      }
    }
    if (flag == 0) {
      this.SpinnerService.show();
      var formData={
        VendorInvoiceIds:this.vendorInvoiceIds,
        InvoiceStatusId:this.invoiceStatusId,
        Remarks:this.invoiceremarks,
        CreatedBy:this.loginUserId
      }
      this.vendorService.vendorInvoiceAction(formData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
            this.SpinnerService.hide();
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            
            this.cAModal.nativeElement.click();
            this.vendorInvoiceIds = "";
            this.invoiceremarks = "";
            this.fromSubmit();
            this.isBtnClarification = false;
            this.isBtnAccept = false;
            this.isBtnReject = false;
            this.SpinnerService.hide();
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
        console.log(this.clarificationList);
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

  clarificationSubmit(statusid){
    var flag = 0;
    if (this.ClarificationRemarks == "" || this.ClarificationRemarks == undefined) {
      this.notificationService.showError("Please fill remarks to proceed", "Error");
      flag = 1;
    }
    else {
    }
    if (flag == 0) {
      var formData={
        VendorInvoiceIds:this.selectedVendorInvoiceId.toString(),
        InvoiceStatusId:Number(statusid),
        Remarks:this.ClarificationRemarks,
        CreatedBy:this.loginUserId
      }
      this.SpinnerService.show();
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

  //getAllVendorClarificationRemarks
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
