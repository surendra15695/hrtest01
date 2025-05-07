import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ICandidateDetailData, ISearchCandidateDetail } from '../../../interfaces/preselection/candidate.interface';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { CandidateService } from '../../../services/preselection/candidate/candidate.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { IVendorInvoiceDetails } from 'src/app/interfaces/vendor/vendor.interface';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { VendorService } from 'src/app/services/vendor/vendor/vendor.service';
import { error } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
declare var jQuery: any;

@Component({
  selector: 'app-vendorcandidatelist',
  templateUrl: './vendorcandidatelist.component.html',
  styleUrls: ['./vendorcandidatelist.component.css']
})
export class VendorcandidatelistComponent implements OnInit {
  @ViewChild('uploadBillimport', { static: false }) uploadBillimport: ElementRef;
  candidateId: number;
  candidateName: string;
  billableCTC: number;
  ServiceChargePercent: number;
  ServiceCharge: number;
  GSTPercent: number;
  GST: number;
  TotalBillAmount: number;
  vendorId: number;
  invoiceStatusId:number;
  vendorInvoiceDetails: IVendorInvoiceDetails[] = [];
  candidates: ICandidateDetailData[] = [];
  searchCandidate: ISearchCandidateDetail = {
    CandidateId: 0,
    CandidateName: "",
    HiringStatusId: 0,
    GenderIds: "",
    FromAge: 0,
    ToAge: 0,
    AadharNo: "",
    ContactNo: "",
    EmailId: "",
    MotherTongueIds: "",
    QualificationIds: "",
    CourseIds: "",
    StreamIds: "",
    FromPercentage: 0,
    ToPercentage: 0,
    DomainIds: "",
    SubDomainIds: "",
    StateIds: "",
    SourceChannelId: "",
    CreatedBy: 0,
    RequisitionDetailId: 0,
    FromDate: "",
    ToDate: "",
    FromExperience: 0,
    ToExperience: 0,
    CompletionYears: "",
    QualificationTypeIds: "",
    CurrentEmployer: "",
    Designation: "",
    RelativeStatus: "",
    PreviousApplied: 0
  }
  requisitionDetailId: number;
  createdBy: number;
  pageName: string = "";
  saveForm = new FormGroup({
    Name: new FormControl('')
  });  
  BillUpload: File = null;
  invalidFileName:boolean=false;
  constructor(
    private _route: Router,
    private candidateService: CandidateService,
    private persistance: PersistanceService,
    private notiService: NotificationService,
    private SpinnerService: NgxSpinnerService,
    private vendorService: VendorService,
    private fb: FormBuilder,
  ) {

    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    if (this.persistance.get('pagename') != null) {
      this.pageName = this.persistance.get('pagename');
      if (this.persistance.get('pagename') == "vendorcurrentjobssubmittedcandidate" || this.persistance.get('pagename') == "archivedjobs") {
        this.requisitionDetailId = this.persistance.get('paramid');
        this.getCandidateList();
      } else {
        this._route.navigate(['/app/vendor/current-job']);
      }
    }
    else {
      this._route.navigate(['/app/vendor/current-job']);
    }
  }

  ngOnInit() {

  }
  getCandidateList() {
    this.candidates = [];
    this.searchCandidate.RequisitionDetailId = this.requisitionDetailId;
    this.searchCandidate.CreatedBy = this.createdBy;
    this.candidateService.getCandidateList(this.searchCandidate).subscribe((result) => {
      if (result) {
        this.candidates = result;
      }
      else {
        this.candidates = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadDataTable();
    });
  }
  
  onSubmitRaiseInvoice(){
    var flag = 0;
    var msg = "";
    if(this.ServiceChargePercent == 0 || this.ServiceChargePercent == undefined || this.ServiceChargePercent > 100){
      flag = 1;
      msg = "Please Enter Actual Serviece Charge...";
    }
    if(this.GSTPercent == 0 || this.GSTPercent == undefined || this.GSTPercent > 100){
      flag = 1;
      msg = "Please Enter Actual GST Percentage...";
    } 
    if(this.BillUpload == null || this.BillUpload == undefined){
      flag = 1;
      msg = "Please attach Bill details...";
    }
    if(flag == 0){
      this.vendorInvoiceDetails = [];
      this.vendorInvoiceDetails.push(
        {
          vendorInvoiceDetailId: 0,
          vendorInvoiceId: 0,
          billableCTC: this.billableCTC,
          serviceChargePer: Number(this.ServiceChargePercent),
          serviceChargeAmount: Number((this.billableCTC * this.ServiceChargePercent) / 100),
          gstPer: Number(this.GSTPercent),
          gstAmount: Number((this.billableCTC * this.GSTPercent) / 100),
          totalBillAmount: Number(((this.billableCTC * this.ServiceChargePercent) / 100)+((this.billableCTC * this.GSTPercent) / 100)),
          purchaseRequestNo: null,
          purchaseOrderNo: null,
          serviceSheetEntryNo: null
          
          // createdBy: this.createdBy,
          // createdOn: null,
          // modifiedBy: 0,
          // modifiedOn: null 
  
        });
      const formData = new FormData();
      formData.append("VendorId", this.vendorId.toString());
      formData.append("CandidateId", this.candidateId.toString());
      formData.append("InvoicePath", this.BillUpload);
      formData.append("InvoiceStatus", this.invoiceStatusId.toString());
      formData.append("CreatedBy", this.createdBy.toString());
      formData.append("VendorInvoiceDetails", JSON.stringify(this.vendorInvoiceDetails));
      this.SpinnerService.show();
      this.vendorService.addInvoiceForVendor(formData).subscribe((result) => {
        if (result.successFlag == 0){
          this.SpinnerService.hide();
          this.notiService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notiService.showSuccess(result.msg, "Success");
          this.ServiceChargePercent = null;
          this.GSTPercent = null;
          this.uploadBillimport.nativeElement.innerText = "Choose file";
          this.BillUpload = null;
          this.getCandidateList();
          jQuery("#myModal").modal("hide");
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
        this.notiService.showError("Something went wrong", "Error")
      });
    }
    else {
      this.notiService.showError(msg, "Error");
    }
    
  }
  onClickRaiseInvoice(data){
    this.ServiceChargePercent = null;
    this.GSTPercent = null;
    this.uploadBillimport.nativeElement.innerText = "Choose file";
    this.BillUpload = null;
    
    this.candidateId = data.candidateId;
    this.candidateName = data.fullName;
    this.billableCTC = data.acceptedCTC;
    this.vendorId = data.vendorId;
    this.invoiceStatusId = 1;
    
    
  }
  onFileChange(files: FileList) {
    this.invalidFileName = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName = true;
      }
    })
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null ) { 
      this.notiService.showError("Only pdf files are supported", "Error");
      return;
    }
    if (this.invalidFileName) {
      this.notiService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.uploadBillimport.nativeElement.innerText = "Choose file";
      this.BillUpload = null;
      return;
    }
    if (files.length > 0) {
      if (files[0].size > 2097152) {
        this.notiService.showError("File should be less than 2MB!", "Error");
        this.uploadBillimport.nativeElement.innerText = "Choose file";
        this.BillUpload = null;
      } else {
        this.uploadBillimport.nativeElement.innerText = files[0].name;
        this.BillUpload = files.item(0);
      }
    }
    else {
      this.uploadBillimport.nativeElement.innerText = "Choose file";
      this.BillUpload = null;
    }
  }
  
  gotoVendorCurrentJobs() {
    this.persistance.set("pagename", null);
    this.persistance.set("paramid", null);
    if (this.pageName == "archivedjobs") {
      this._route.navigate(['/app/vendor/archived-jobs']);
    } else {
      this._route.navigate(['/app/vendor/current-jobs']);
    }
  }
  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": false,
        "paging": false,
      });
    });
  }

  gotoSubmittedCandidateDetail(id) {
    this.persistance.set('pagename', "vendorcurrentjobssubmittedcandidate");
    this.persistance.set('nextpagename', "candidatedetail");
    this.persistance.set('candidateid', id);
    this._route.navigate(['/app/vendor/job/candidate-list/candidate']);
  }

}

//Arghya
