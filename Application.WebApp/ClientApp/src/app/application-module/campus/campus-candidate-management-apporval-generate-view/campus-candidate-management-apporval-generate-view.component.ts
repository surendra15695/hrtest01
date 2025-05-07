import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import {
  IManagementApprovalCandidates, IManagementApprovalMasterData, IManagementApprovalVacancy,
  ISearchManagementApproval
} from '../../../interfaces/offer/managementapproval.interface';
import { ManagementapprovalService } from '../../../services/offer/managementapproval/managementapproval.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { element } from 'protractor';
import { LocationService } from 'src/app/services/common/location/location.service';
declare var jQuery: any;
declare var html2pdf: any;

@Component({
  selector: 'app-campus-candidate-management-apporval-generate-view',
  templateUrl: './campus-candidate-management-apporval-generate-view.component.html',
  styleUrls: ['./campus-candidate-management-apporval-generate-view.component.css']
})
export class CampusCandidateManagementApporvalGenerateViewComponent implements OnInit {
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('htmlContent', { static: false }) htmlContent: ElementRef;
  FromData: string;
  approvalId: number;
  ToData: string;
  createdBy: number;
  candidateIdNames: any[];
  candidateIds: string;
  candidateList: IManagementApprovalCandidates[] = [];
  requisitionDetailId: number;
  approvalVacancyList: IManagementApprovalVacancy[] = [];
  signatureFromText: string;
  signatureToText: string;
  signatureFrom: any[];
  signatureTo: any[];
  topNote: string;
  bottomNote: string;
  managementApprovalId: number;
  referancePangeName: string;
  managementApprovalData: any;
  serachManagementApproval: ISearchManagementApproval = {
    candidateId: null,
    managementApprovalId: null,
    requisitionDetailId: null
  }
  btnVisible: boolean = true;
  btnPDFVisible: boolean = true;
  approvedDocument: string;
  emitCandidateIds: string;
  selectedCandidateIds = "";
  manageApprovalstr: string;
  selectedVertical: number;
  dataTarget: string;

  constructor(private _route: Router,
    private managementApprovalService: ManagementapprovalService,
    private SpinnerService: NgxSpinnerService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private locationService: LocationService,

  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;

    this.candidateIdNames = this.persistance.get('candidateId');
    // this.onboardingMailIds = this.persistance.get('MailId');
    // var flag = this.persistance.get('Flag')
    // this.flag = flag == true ? 1 : 0;
    this.requisitionDetailId = this.persistance.get('requisitionDetailId');
    this.topNote = "We request your approval to recruit the following candidates as per the details given below. All these positions are critical as per the discussion with respective function head.";
    if (this.candidateIdNames.length > 0) {
      for (var i = 0; i < this.candidateIdNames.length; i++) {
        if (this.selectedCandidateIds == "") {
          this.selectedCandidateIds = this.candidateIdNames[i].candidateId
        }
        else {
          this.selectedCandidateIds = this.selectedCandidateIds + "," + this.candidateIdNames[i].candidateId
        }
      }
      console.log("candidate: " + this.selectedCandidateIds);
      setTimeout(() => {
        this.getManagementApproval(this.selectedCandidateIds);
      });
    }
    this.signatureFromText = "";
    this.signatureToText = "";
    this.signatureTo = [];
    this.signatureFrom = [];
   }

  ngOnInit() {
    this.loadDatePicker();
    this.dataTarget = "";
  }
  loadDatePicker() {
    jQuery(".datepiker").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }

  getAllCandidate() {
    this.candidateList = [];
    this.candidateIds = "";
    for (var i = 0; i < this.candidateIdNames.length; i++) {
      this.candidateList.push({
        managementApprovalId: 0,
        lineId: this.candidateList.length + 1,
        requisitionDetailId: this.requisitionDetailId,
        candidateId: this.candidateIdNames[i].candidateId,
        interViewPanel: "",
        name: this.candidateIdNames[i].candidateName,
        source: "",
        position: "",
        location: "",
        grade: "",
        qualification: "",
        experience: "",
        presentCTC: "",
        proposedBasic: "",
        proposedCTC: "",
        reporNew: ""
      })
      if (this.candidateIds == "") {
        this.candidateIds = this.candidateIdNames[i].candidateId;
      }
      else {
        this.candidateIds = this.candidateIds + "," + this.candidateIdNames[i].candidateId;
      }
    }
  }

  getVacancyList() {
    this.approvalVacancyList = [];
    this.approvalVacancyList.push({
      managementApprovalId: 0,
      lineId: 0,
      plant: "",
      function: "",
      approved: undefined,
      availableasOn: undefined,
      vacancies: undefined,
      inThisApproval: undefined,
      earlierApprovalYettoJoin: undefined,
      yetToFill: undefined
    })
  }
  removeSignatureFrom(index) {
    this.signatureFrom.splice(index, 1);
  }

  addSignatureTo() {
    if (this.signatureToText == "") {
      this.notificationService.showError("Please enter value to add", "Error");
    }
    else {
      this.signatureTo.push({
        signatureToText: this.signatureToText
      })
      this.signatureToText = "";
    }
  }

  removeSignatureTo(index) {
    this.signatureTo.splice(index, 1);
  }
  changeFromData(evt) {
    this.FromData = evt;
  }

  changeToData(evt) {
    this.ToData = evt;
  }

  changeTopNote(evt) {
    this.topNote = evt;
  }

  changeBottomNote(evt) {
    this.bottomNote = evt;
  }
  onSubmit() {
    if (this.FromData == "") {
      this.notificationService.showError("Please enter from Data", "Error");
      this.dataTarget = "";
      return false;
    } else if (this.ToData == "") {
      this.notificationService.showError("Please enter To Data", "Error");
      this.dataTarget = "";
      return false;
    } else if (this.managementApprovalData.managementApprovalCandidates[0].interViewPanel=="") {
      this.notificationService.showError("Please enter  INTERVIEW PANEL", "Error");
      this.dataTarget = "";
      return false;
    } else if (this.managementApprovalData.managementApprovalCandidates[0].source == "") {
      this.notificationService.showError("Please enter SOURCE", "Error");
      this.dataTarget = "";
      return false;
    }
    else if (this.managementApprovalData.managementApprovalCandidates[0].position == "") {
      this.notificationService.showError("Please enter 	POSITION & DEPT", "Error");
      this.dataTarget = "";
      return false;
    }
    else if (this.managementApprovalData.managementApprovalCandidates[0].location == "") {
      this.notificationService.showError("Please enter LOCATION", "Error");
      this.dataTarget = "";
      return false;
    }
    else if (this.managementApprovalData.managementApprovalCandidates[0].grade == "") {
      this.notificationService.showError("Please enter GRADE", "Error");
      this.dataTarget = "";
      return false;
    }
    else if (this.managementApprovalData.managementApprovalCandidates[0].qualification == "") {
      this.notificationService.showError("Please enter QUALIFICATION", "Error");
      this.dataTarget = "";
      return false;
    }
    else if (this.managementApprovalData.managementApprovalCandidates[0].experience == "") {
      this.notificationService.showError("Please enter EXPERIENCE", "Error");
      this.dataTarget = "";
      return false;
    }
    else if (this.managementApprovalData.managementApprovalCandidates[0].presentCTC == null) {
      this.notificationService.showError("Please enter 	PRESENT CTC", "Error");
      this.dataTarget = "";
      return false;
    }
    else if (this.managementApprovalData.managementApprovalCandidates[0].proposedBasic == null) {
      this.notificationService.showError("Please enter PROPOSED BASIC SALARY P.M", "Error");
      this.dataTarget = "";
      return false;
    }
    else if (this.managementApprovalData.managementApprovalCandidates[0].proposedCTC == null) {
      this.notificationService.showError("Please enter PROPOSED CTC", "Error");
      this.dataTarget = "";
      return false;
    }
    else if (this.managementApprovalData.managementApprovalCandidates[0].reporNew=="") {
      this.notificationService.showError("Please enter REPLACEMENT / NEW APPROVAL", "Error");
      this.dataTarget = "";
      return false;
    }
      else {
      this.dataTarget = "confirmPopup";
      return true;
    }
  }
  getManagementApproval(candidate) {
    this.approvalId = 0;
    this.SpinnerService.show();
    this.managementApprovalData = 0;
    this.serachManagementApproval.candidateId = candidate.toString();
    this.serachManagementApproval.requisitionDetailId = this.requisitionDetailId;
    this.managementApprovalService.CampusgetManagementApproval(this.serachManagementApproval).subscribe((response) => {
      if (response) {
        this.managementApprovalData = response;
        console.log("management Approval data", this.managementApprovalData);

        //this.fDate.nativeElement.value=this.managementApprovalData.date;
        console.log('managementApprovalData',this.managementApprovalData);
        this.selectedVertical = this.managementApprovalData.managementApprovalCandidates[0].verticalId;

        if (this.managementApprovalData.managementApprovalId > 0) {
          this.signatureFrom = [];
          this.approvalId = this.managementApprovalData.managementApprovalId;
          this.signatureTo = [];
          for (var i = 0; i < this.managementApprovalData.managementApprovalSigntureFrom.length; i++) {
            this.signatureFrom.push({
              signatureFromText: this.managementApprovalData.managementApprovalSigntureFrom[i].signatureNeededFrom
            })
          }
          for (var i = 0; i < this.managementApprovalData.managementApprovalSigntureTo.length; i++) {
            this.signatureTo.push({
              signatureToText: this.managementApprovalData.managementApprovalSigntureTo[i].signatureNeededTo
            })
          }
          this.FromData = this.managementApprovalData.from;
          this.ToData = this.managementApprovalData.to;
          this.fDate.nativeElement.value = this.managementApprovalData.date;
          this.candidateList = this.managementApprovalData.managementApprovalCandidates;
          this.topNote = this.managementApprovalData.note;
          this.bottomNote = this.managementApprovalData.bottomNote;
          this.approvalVacancyList = this.managementApprovalData.managementApprovalVacancy;
          this.getDocument(this.managementApprovalData, this.signatureFrom, this.signatureTo)
          if (this.managementApprovalData.approvedDocument != null) {
            this.btnVisible = false;
          }
          else {
            this.btnVisible = true;
          }
          this.approvedDocument = this.managementApprovalData.managementApprovalCandidates[0].approvedDocument;
        }
        else {
          this.approvedDocument = "";
          this.btnPDFVisible = false;
          this.btnVisible = true;
          this.topNote = "We request your approval to recruit the following candidates as per the details given below. All these positions are critical as per the discussion with respective function head.";
        }
      }
      else {
        this.btnVisible = true;
        this.managementApprovalData = null;
        this.getAllCandidate();
        this.approvedDocument = "";
        this.getVacancyList();
        this.btnPDFVisible = false;
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    })
  }
  FillManagementApproval(){
    this.btnVisible = true;
    this.getAllCandidate();
    this.approvedDocument = "";
    this.getVacancyList();
    this.topNote = "We request your approval to recruit the following candidates as per the details given below. All these positions are critical as per the discussion with respective function head.";
    
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  gotoCandidateList() {
    this.persistance.set('requisitionDetailId',this.persistance.get('requisitionDetailId'));
    this._route.navigate(['/app/campus/requisition-list/view-candidate']);
  }

  convertPdf() {
    console.log(this.manageApprovalstr);
    var htmlstring = this.manageApprovalstr;
    var dom = document.createElement('div');
    dom.innerHTML = htmlstring;
    console.log(dom);
    html2pdf(dom, {
      margin: 10,
      filename: 'ManagementApproval.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    });

  }
  getDocument(managementApprovalData: any, signatureFrom: any, signatureTo: any) {
    var str = "<div style='width: 1030px;font-size:13px; min-height:1000px; margin-top:-300px;'>" +
      "<h2 style='text-align: center; font-size: 20px;'>APPROVAL FOR APPOINTMENT</h2>" +
      "<div style='margin: 10px 0;'>" +
      "<table style='width: 100%; border-collapse: collapse; border-spacing: 0px; font-size: 13px;'>" +
      "<tr valign='top'>" +
      "<td style='width: 33.33%; padding: 3px 5px;'><b>From:</b> " + managementApprovalData.from + "</td>" +
      "<td style='width: 33.33%; padding: 3px 5px; text-align: center;'><b>To:</b> " + managementApprovalData.to + "</td>" +
      "<td style='width: 33.33%; padding: 3px 5px; text-align: right;'><b>Date:</b> " + managementApprovalData.date + "</td>" +
      "</tr>" +
      "</table>" +
      "</div>" +
      "<div style='margin: 10px 0;'>" +
      "<table style=' border-collapse: collapse; border-spacing: 0px; font-size: 13px;'>" +
      "<tr valign='top'>" +
      "<td style='width: 33.33%; padding: 3px 5px; text-align: justify;'>" + managementApprovalData.note + "</td>" +
      "</tr>" +
      "</table>" +
      "</div>" +
      "<div>" +
      "<table style='border-collapse:collapse; width: 100%; page-break-inside: auto; border-spacing: 0px; border:1px solid rgb(134, 134, 134); font-size: 13px;'>" +
      "<thead style='display:table-header-group;'>" +
      "<tr style='page-break-inside:avoid; page-break-after:auto;'>" +
      "<th style='border:1px solid rgb(134, 134, 134); border-collapse: collapse; padding: 3px 5px; text-align: center;'>Sl.No.</th>" +
      "<th style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>Interview Panel</th>" +
      "<th style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>Name of the candidate</th>" +
      "<th style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>Source</th>" +
      "<th style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>Position & Department</th>" +
      "<th style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>Plant</th>" +
      "<th style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;text-align: center;'>Grade</th>" +
      "<th style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>Qual.</th>" +
      "<th style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>Exp.</th>" +
      "<th style='border:1px solid rgb(134, 134, 134); padding: 3px 5px; text-align: right;'>Present CTC</th>" +
      "<th style='border:1px solid rgb(134, 134, 134); padding: 3px 5px; text-align: right;'>Proposed Basic Salary P.M</th>" +
      "<th style='border:1px solid rgb(134, 134, 134); padding: 3px 5px; text-align: right;'>Proposed CTC</th>" +
      "<th style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>Replacement/New Approval</th>" +
      "</tr>" +
      "</thead>" +
      "<tbody>";
    for (var j = 0; j < managementApprovalData.managementApprovalCandidates.length; j++) {
      str += "<tr style='page-break-inside:avoid; page-break-after:auto;'>" +
        "<td style='border:1px solid rgb(134, 134, 134); padding: 3px 5px; text-align: center;'>" + j + 1 + "</td>" +
        "<td style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>" + managementApprovalData.managementApprovalCandidates[j].interViewPanel + "</td>" +
        "<td style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>" + managementApprovalData.managementApprovalCandidates[j].name + "</td>" +
        "<td style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>" + managementApprovalData.managementApprovalCandidates[j].source + "</td>" +
        "<td style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>" + managementApprovalData.managementApprovalCandidates[j].position + "</td>" +
        "<td style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>" + managementApprovalData.managementApprovalCandidates[j].location + "</td>" +
        "<td style='border:1px solid rgb(134, 134, 134); padding: 3px 5px; text-align: center;'>" + managementApprovalData.managementApprovalCandidates[j].grade + "</td>" +
        "<td style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>" + managementApprovalData.managementApprovalCandidates[j].qualification + "</td>" +
        "<td style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>" + managementApprovalData.managementApprovalCandidates[j].experience + "</td>" +
        "<td style='border:1px solid rgb(134, 134, 134); padding: 3px 5px; text-align: right;'>" + managementApprovalData.managementApprovalCandidates[j].presentCTC + "</td>" +
        "<td style='border:1px solid rgb(134, 134, 134); padding: 3px 5px; text-align: right;'>" + managementApprovalData.managementApprovalCandidates[j].proposedBasic + "</td>" +
        "<td style='border:1px solid rgb(134, 134, 134); padding: 3px 5px; text-align: right;'>" + managementApprovalData.managementApprovalCandidates[j].proposedCTC + "</td>" +
        "<td style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>" + managementApprovalData.managementApprovalCandidates[j].reporNew + "</td>" +
        "</tr>";
    }
    str += "</tbody>" +
      "<tfoot>" +
      "<tr>" +
      "<td colspan='13'><b>Note:</b>" + managementApprovalData.bottomNote + "</td>" +
      "</tr>" +
      "</tfoot>" +
      "</table>" +
      "</div>";
    if (this.selectedVertical == 2) {
      if (managementApprovalData.managementApprovalVacancy.length > 0) {  // Added Anif on 14-07-2022
        str += "<div style='margin-top: 20px; margin-bottom: 80px;'>" +
          "<h5 style='margin-bottom: 5px; font-size: 14px;'>Vacancy Status as on " + managementApprovalData.date + "</h5>" +
          "<table style='width: 100%; border-collapse: collapse; border-spacing: 0px; border:1px solid rgb(134, 134, 134); text-align: left;font-size: 13px;'>" +
          "<thead>" +
          "<tr>" +
          "<th rowspan='2' style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>Location</th>" +
          "<th rowspan='2' style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>Function</th>" +
          "<th rowspan='2' style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>Approved</th>" +
          "<th rowspan='2' style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>Available as on " + managementApprovalData.date + "</th>" +
          "<th rowspan='2' style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>Vacancies</th>" +
          "<th rowspan='2' style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>In this approval</th>" +
          "<th rowspan='2' style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>Earlier approval and yet to join</th>" +
          "<th rowspan='2' style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>Yet to fill</th>" +
          "</tr>" +
          "</thead>" +
          "<tbody>" +
          "<tr>" +
          "<td style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>" + managementApprovalData.managementApprovalVacancy[0].plant + "</td>" +
          "<td style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;'>" + managementApprovalData.managementApprovalVacancy[0].function + "</td>" +
          "<td style='border:1px solid rgb(134, 134, 134); padding: 3px 5px; text-align:center;'>" + managementApprovalData.managementApprovalVacancy[0].approved + "</td>" +
          "<td style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;text-align:center;'>" + managementApprovalData.managementApprovalVacancy[0].availableasOn + "</td>" +
          "<td style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;text-align:center;'>" + managementApprovalData.managementApprovalVacancy[0].vacancies + "</td>" +
          "<td style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;text-align:center;'>" + managementApprovalData.managementApprovalVacancy[0].inThisApproval + "</td>" +
          "<td style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;text-align:center;'>" + managementApprovalData.managementApprovalVacancy[0].earlierApprovalYettoJoin + "</td>" +
          "<td style='border:1px solid rgb(134, 134, 134); padding: 3px 5px;text-align:center;'>" + managementApprovalData.managementApprovalVacancy[0].yetToFill + "</td>" +
          "</tr>" +
          "</tbody>" +
          "</table>" +
          "</div>" +
          "<div style='margin-bottom: 60px;'>";
      }
    }
    for (var j = 0; j < signatureFrom.length; j++) {
      str += "<div style='width: 220px; display: inline-block; border-top: 1px solid #000; margin-right: 30px; text-align: center;'>" +
        "<p>" + signatureFrom[j].signatureFromText + "</p>" +
        "</div>";
    }
    str += "</div>" +
      "<div style='margin-top: 60px;'>";
    for (var j = 0; j < signatureTo.length; j++) {
      str += "<div style='width: 220px; display: inline-block; border-top: 1px solid #000; margin-right: 30px; text-align: center;'>" +
        "<p>" + signatureTo[j].signatureToText + "</p>" +
        "</div>";
    }
    str += "</div></div>";
    this.manageApprovalstr = str;

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
  ngOnDestroy() {
    jQuery(".custom-menu").hide();
  }

}
