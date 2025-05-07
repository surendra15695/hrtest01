import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ISearchOfferLetter, IOfferLetterHeader, IOfferLetterSalaryTemplate } from '../../../../interfaces/offer/offerletter.interface'
import { OfferletterService } from '../../../../services/offer/offerletter/offerletter.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
declare var jQuery: any;
declare var html2pdf: any;
@Component({
  selector: 'app-sendofferletter',
  templateUrl: './sendofferletter.component.html',
  styleUrls: ['./sendofferletter.component.css']
})
export class SendofferletterComponent implements OnInit {

  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  offerLetterHeader: IOfferLetterHeader;
  searchOfferLetter: ISearchOfferLetter = {
    offerLetterId: null,
    candidateId: null,
    requsitaionDetailsId: null,
  }
  file: File;
  createdBy: number;
  candidateId: number;
  requisitionDetailId: number;
  offerLetterTemplateDescription: string;
  offerLetterTemplateDescriptionSave: string;
  referancePangeName: string
  ckeConfig: any;
  nextPageValue: string;
  constructor(
    private offerLetterService: OfferletterService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private _route: Router,
    private SpinnerService: NgxSpinnerService,
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    if (this.persistance.get('pagename') != null || this.persistance.get('nextpagename') != null) {
      if (this.persistance.get('pagename') == "rmcandidatelist" || "rocandidatelist" && this.persistance.get('nextpagename') == "sendofferletter") {
        this.candidateId = this.persistance.get('candidateId');
        this.requisitionDetailId = this.persistance.get('paramid');
        this.referancePangeName = this.persistance.get('pagename');
        this.nextPageValue = this.persistance.get('tabledisplayStartcandi');
      } else {
        this._route.navigate(['/app/my-action/all-positions/candidate-list']);
      }
    }
    else {
      this._route.navigate(['/app/my-action/all-positions/candidate-list']);
    }
  }

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: true,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true,
      removePlugins: 'specialchar,about,others,link',
      removeButtons: 'Save,NewPage,Preview,Print,Templates,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Find,Select,Button,ImageButton,HiddenField,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,PageBreak,Iframe,ShowBlocks,Image,Maximize,Anchor,SpecialChar,PasteFromWord,PasteText,Scayt,RemoveFormat,Indent,Outdent,Blockquote'
    };
    this.getOfferLetterHeader();
  }

  getOfferLetterHeader() {
    var table = "";
    // table += "<table  border='0' cellpadding='0' cellspacing='0' style='width:500px'>" +
    //   "<thead>" +
    //   "<tr>" +
    //   "<th rowspan='2' style='width: 40px;'></th>" +
    //   "<th rowspan='2'></th>" +
    //   "<th colspan='2' class='text-center'>Proposed</th>" +
    //   "</tr>" +
    //   "<tr>" +
    //   "<th class='text-right' style='width: 140px;'>Monthly(Rs.)</th>" +
    //   "<th class='text-right' style='width: 140px;'>Yearly(Rs.)</th>" +
    //   "</tr>" +
    //   "</thead>" +
    //   "<tbody>";
    this.SpinnerService.show();
    this.offerLetterHeader = null;
    this.searchOfferLetter.requsitaionDetailsId = this.requisitionDetailId;
    this.searchOfferLetter.candidateId = this.candidateId;
    this.offerLetterService.getOfferLetter(this.searchOfferLetter).subscribe((response: any) => {
      if (response) {
        this.offerLetterHeader = response;
        
        //console.log("Offer Letter Header", this.offerLetterHeader);
        // console.log(this.offerLetterHeader.salaryTemplateList);
        for (var i = 0; i < this.offerLetterHeader.salaryTemplateList.length; i++) {
          table += "<tr>" +
            "<td  style='border: 1px solid rgb(168, 168, 168); text-align: center;padding: 4px;'>"
          if (this.offerLetterHeader.salaryTemplateList[i].visibleOrder == "A" || this.offerLetterHeader.salaryTemplateList[i].visibleOrder == "A1"
            || this.offerLetterHeader.salaryTemplateList[i].visibleOrder == "B" || this.offerLetterHeader.salaryTemplateList[i].visibleOrder == "C") {
            table += "<b>" + this.offerLetterHeader.salaryTemplateList[i].visibleOrder + "</b></td>"
          }
          else {
            table += this.offerLetterHeader.salaryTemplateList[i].visibleOrder + "</td>"
          }

          if (this.offerLetterHeader.salaryTemplateList[i].visibleOrder == "A" || this.offerLetterHeader.salaryTemplateList[i].visibleOrder == "A1"
            || this.offerLetterHeader.salaryTemplateList[i].visibleOrder == "B" || this.offerLetterHeader.salaryTemplateList[i].visibleOrder == "C"
            || this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName == "Basic"
            || this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName == "A1 Total"
            || this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName == "A+A1"
            || this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName == "A+A1"
            || this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName == "B Total"
            || this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName == "C Total"
            || this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName == "Grand Total(A+A1+B+C)"
          ) {
            table += "<td style='border: 1px solid rgb(168, 168, 168); font-weight: bold;padding: 4px;'>" + this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName + "</td>";
          }
          else {
            table += "<td style='border: 1px solid rgb(168, 168, 168);padding: 4px;'>" + this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName + "</td>";
          }

          if (this.offerLetterHeader.salaryTemplateList[i].calculatedSalaryValue > 0) {
            table += "<td  style='border: 1px solid rgb(168, 168, 168); text-align: center;padding: 4px;'>"
            if (this.offerLetterHeader.salaryTemplateList[i].visibleOrder == "A" || this.offerLetterHeader.salaryTemplateList[i].visibleOrder == "A1"
              || this.offerLetterHeader.salaryTemplateList[i].visibleOrder == "B" || this.offerLetterHeader.salaryTemplateList[i].visibleOrder == "C"
              || this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName == "Basic"
              || this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName == "A1 Total"
              || this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName == "A+A1"
              || this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName == "A+A1"
              || this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName == "B Total"
              || this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName == "C Total"
              || this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName == "Grand Total(A+A1+B+C)"
            ) {
              table += "<b>" + this.offerLetterHeader.salaryTemplateList[i].calculatedSalaryValue + "</b></td>"
            }
            else {
              table += this.offerLetterHeader.salaryTemplateList[i].calculatedSalaryValue + "</td>"
            }
          }
          else {
            table += "<td style='border: 1px solid rgb(168, 168, 168); text-align: right;padding: 4px;'></td>";
          }
          if (this.offerLetterHeader.salaryTemplateList[i].calculatedSalaryValueYearly > 0) {
            table += "<td  style='border: 1px solid rgb(168, 168, 168); text-align: center;padding: 4px;'>"

            if (this.offerLetterHeader.salaryTemplateList[i].visibleOrder == "A" || this.offerLetterHeader.salaryTemplateList[i].visibleOrder == "A1"
              || this.offerLetterHeader.salaryTemplateList[i].visibleOrder == "B" || this.offerLetterHeader.salaryTemplateList[i].visibleOrder == "C"
              || this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName == "Basic"
              || this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName == "A1 Total"
              || this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName == "A+A1"
              || this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName == "A+A1"
              || this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName == "B Total"
              || this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName == "C Total"
              || this.offerLetterHeader.salaryTemplateList[i].salaryAccountHeadName == "Grand Total(A+A1+B+C)"
            ) {
              table += "<b>" + this.offerLetterHeader.salaryTemplateList[i].calculatedSalaryValueYearly + "</b></td>"
            }

            else {
              table += this.offerLetterHeader.salaryTemplateList[i].calculatedSalaryValueYearly + "</td>"
            }


            // + this.offerLetterHeader.salaryTemplateList[i].calculatedSalaryValueYearly + "</td>";
          }
          else {
            table += "<td  style='border: 1px solid rgb(168, 168, 168); text-align: center;padding: 4px;'></td>";
          }
          table += "</tr>";
        }
        //table += "</tbody>" +
        // "</table>";
        // console.log("Table", table);
        this.offerLetterTemplateDescription = this.offerLetterHeader.templateDetails.replace("@@SalaryTemplate", table);
        this.offerLetterTemplateDescriptionSave = this.offerLetterHeader.templateDetails.replace("@@SalaryTemplate", table);
        //console.log("Template Description", this.offerLetterTemplateDescription);
        setTimeout(() => {
          jQuery(".cke_wysiwyg_div").html("");
          jQuery(".cke_wysiwyg_div").html(this.offerLetterTemplateDescription);
        });
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
  yessubmitData() {
    var dom = document.createElement('div');
    dom.innerHTML = this.offerLetterTemplateDescription;
    var opt = {
      margin: 6,
      filename: this.candidateId.toString() + "_Offerletter.pdf",
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, y: 2, scrollY: 0 },
      jsPDF: { format: 'A4', orientation: "portrait" },
    }
    html2pdf().set(opt).from(dom).toPdf().output('blob').then((data: any) => {
      this.file = data;
      //this.SpinnerService.hide();
      jQuery("#confirmPopup").modal('show');
    })
  }
  submitData() {
    this.SpinnerService.show();
    const formData = new FormData();
    formData.append("CandidateId", this.candidateId.toString());
    formData.append("OfferLetterId", "0");
    formData.append("RequsitaionDetailsId", this.requisitionDetailId.toString());
    formData.append("EmailTemplateId", "5");
    formData.append("EmailTemplateDetails", this.offerLetterTemplateDescription);
    formData.append("CreatedBy", this.createdBy.toString());
    formData.append("theFile", this.file);
    this.offerLetterService.sendOfferLetter(formData).subscribe((result) => {
      console.log(result);

      if (result.successFlag == 0) {
        this.SpinnerService.hide();
        this.notificationService.showError(result.msg, "Error");
      }
      else {
        this.closeModal.nativeElement.click();
        this.SpinnerService.hide();
        this.notificationService.showSuccess(result.msg, "Success");
        this.gotoCandidateList();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
      this.notificationService.showError("Something went wrong", "Error")
    }//,() => {
      //   this.gotoCandidateList();
      // }
    );
  }

  gotoCandidateList() {
    this.persistance.set('paramid', this.requisitionDetailId);
    this.persistance.set('pagename', this.referancePangeName);
    if (this.referancePangeName == "rmcandidatelist") {
      this.persistance.set('nextpagename', null);
      this.persistance.set('previouspageparams', this.persistance.get('previouspagefilter'));
      this.persistance.set('tabledisplayStartcandi', this.persistance.get('tabledisplayStartcandi'));
      this._route.navigate(['/app/my-action/all-positions/candidate-list']);
    }
    else if (this.referancePangeName == "rocandidatelist") {
      this.persistance.set('nextpagename', null);
      this.persistance.set('tabledisplayStartcandi', this.nextPageValue);
      this._route.navigate(['/app/requisition/all-positions/candidate-list']);
    }
    // this.persistance.set('pagename', "rmrequisitionlist");

  }
  // rmrequisitionlist

}
