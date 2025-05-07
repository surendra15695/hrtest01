import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ISearchOfferLetter, IOfferLetterHeader, IOfferLetterSalaryTemplate } from '../../../interfaces/offer/offerletter.interface'
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { RequisitionService } from '../../../services/preselection/requisition/requisition.service';
import { OfferletterService } from '../../../services/offer/offerletter/offerletter.service';
import { CommonService } from '../../../services/common/common/common.service';
import { IDownloadFileFormData } from '../../../interfaces/common/common.interface';
import { log } from 'console';
import { IcandidateremarksList } from 'src/app/interfaces/preselection/candidate.interface';
declare var html2pdf: any;

@Component({
  selector: 'app-campus-offer-acceptance',
  templateUrl: './campus-offer-acceptance.component.html',
  styleUrls: ['./campus-offer-acceptance.component.css']
})
export class CampusOfferAcceptanceComponent implements OnInit {

  offerLetterHeader: IOfferLetterHeader;
  searchOfferLetter: ISearchOfferLetter = {
    offerLetterId: null,
    candidateId: null,
    requsitaionDetailsId: null,
  }
  remarksDetails:IcandidateremarksList={
    CandidateId: 0,
    RequisitionDetailId: 0,
    HiringStatusId: 0,
    IsActive: false
  }
  candidateremarksList: any[]=[];
  createdBy: number;
  candidateId: number;
  offerAcceptance: number;
  Acceptance: number;
  remarks: string;
  offerLetterHTML: string = "";
  searchDownloadFile: IDownloadFileFormData = {
    HTMLCode: null,
    FileName: null
  }
  acceptance: number;
  constructor(
    private _route: Router,
    private requisitionService: RequisitionService,
    private SpinnerService: NgxSpinnerService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private offerLetterService: OfferletterService,
    private commonService: CommonService
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.candidateId = this.persistance.get('loggedinuser').candidateId;
    console.log("chck",this.candidateId)
    this.getOfferLetterHeader();
  }

  ngOnInit() {
    // this.getRemarksDetails();
  }
  // getRemarksDetails(){   
  //   this.remarksDetails={
  //     CandidateId: this.candidateId,
  //     RequisitionDetailId: 0,
  //     HiringStatusId: 0,
  //     IsActive: false
  //   }
  //   this.requisitionService.getCandidateHigringAction(this.remarksDetails).subscribe((result) => {
  //     if (result) {
  //       this.candidateremarksList = result;
  //       console.log("Remarks Details-",result);
  //     }
  //     else {
  //       this.candidateremarksList = [];
  //     }
  //   }, error => {
  //     console.log(error);
  //   }, () => {
  //   });
  // }
  onSubmit() {
    var flag = 0;
    var msg = "";
    if (this.offerAcceptance == 1) {
      flag = 1;
      msg = "Please select action";
    }
    if (this.offerAcceptance == 3) {
      if (this.remarks == undefined || this.remarks == "") {
        msg = "Please enter remarks";
        flag = 1;
      }
    }
    if (this.offerAcceptance == 2) {
      if (this.remarks == undefined) {
        this.remarks = "";
      }
    }
    if (flag == 0) {
      const formData = new FormData();
      formData.append("OfferLetterId", "0");
      formData.append("CandidateId", this.candidateId.toString());
      formData.append("RequsitaionDetailsId", "0");
      formData.append("Comments", this.remarks.toString());
      formData.append("Accepted", this.offerAcceptance.toString());
      formData.append("CreatedBy", this.createdBy.toString());
      this.offerLetterService.acceptRejectCampusOffer(formData).subscribe((result) => {
        if (result) {
          // console.log(result);
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.getOfferLetterHeader();
          }
        }
        else {
        }
      }, error => {
        console.log(error);
      }, () => {
      });
    }
    else {
      this.notificationService.showError(msg, "Error");
    }
  }

  getOfferLetterHeader() {
    this.SpinnerService.show();
    this.offerLetterHeader = null;
    this.searchOfferLetter.candidateId = this.candidateId;
    this.offerLetterService.getCampusOfferLetter(this.searchOfferLetter).subscribe((response: any) => {
      if (response) {
        this.offerLetterHeader = response;
        console.log("Offer letter header", this.offerLetterHeader);
        if (this.offerLetterHeader.accepted == 2) {
          this.acceptance = 2;
        }
        else if (this.offerLetterHeader.accepted == 3) {
          // this.acceptance=2;  // Previous
          this.acceptance = 3;  // Changed By anif on 04-07-2022
        }
        else {
          this.acceptance = 1;
        }
        this.offerLetterHTML = this.offerLetterHeader.templateDetails;
        // console.log(this.offerLetterHeader);
        this.Acceptance = this.offerLetterHeader.accepted;
        this.offerAcceptance = this.Acceptance;
      }
      else {
        this.offerLetterHeader = null;
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    })
  }

  DownloadPDF() {
    var htmlstring = this.offerLetterHTML;
    // console.log(htmlstring);
    var dom = document.createElement('div');
    dom.innerHTML = htmlstring;
    // console.log(dom);
    html2pdf(dom, {
      margin: 10,
      filename: 'OfferLetter.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    });
  }

}
