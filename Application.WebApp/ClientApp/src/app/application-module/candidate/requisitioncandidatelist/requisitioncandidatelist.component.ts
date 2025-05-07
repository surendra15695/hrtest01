import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ICandidateDetailData, ISearchCandidateDetail } from '../../../interfaces/preselection/candidate.interface';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { CandidateService } from '../../../services/preselection/candidate/candidate.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { ManagementapprovalService } from '../../../services/offer/managementapproval/managementapproval.service';
import { NgxSpinnerService } from "ngx-spinner";
declare var jQuery: any;

@Component({
  selector: 'app-requisitioncandidatelist',
  templateUrl: './requisitioncandidatelist.component.html',
  styleUrls: ['./requisitioncandidatelist.component.css']
})
export class RequisitioncandidatelistComponent implements OnInit {

  @ViewChild('managementFileImport', { static: false }) managementFileImport: ElementRef;
  @ViewChild('managementReuploadFileImport', { static: false }) managementReuploadFileImport: ElementRef;
  @ViewChild('closeManagementApprovalModal', { static: false }) closeManagementApprovalModal: ElementRef;
  @ViewChild('closeReuploadManagementApprovalModal', { static: false }) closeReuploadManagementApprovalModal: ElementRef;

  btnVisible: boolean = false;
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
  candidateIds: string = "";
  candidiateIdCb: any;
  hiringStatusIdCb: any;
  emailIdCb: any;
  btnManagementApprovalVisible: boolean = false;
  candidateIdNames: any[];
  OnboardingMailIds: any[];
  btnUploadManagementApprovalVisible: boolean = false;
  btnUpdateManagementApprovalVisible: boolean = false;
  btnreScheduleInterviewVisible: boolean = false;
  btnReuploadManagementApprovalVisible: boolean = false;  // Added by Anif 04-02-2023
  managementfileToUpload: File = null;
  managementfileToReuploadUpload: File = null;
  prevselectedstatus: number = 0;
  currentHiringStatus: number;
  EmailId: string;
  candidateNo: string;
  managementApprovalId: number = 0;
  oldManagementApprovalId: number = 0;
  emailidAray: any[] = [];
  candidateNoarray: any[] = [];
  btnTestVisible: boolean = false;
  btnInterviewVisible: boolean = false;
  btnDocumentCollectionVisible: boolean = false;
  managementApprovalFlag: boolean = false;
  // Anif
  pageNameForBack: string;
  pagValue: number;
  previousValues: any = {};
  nextPageValue: number;
  displaystart: number;
  invalidFileName1: boolean = false;
  invalidFileName2: boolean = false;
  constructor(
    private _route: Router,
    private candidateService: CandidateService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private SpinnerService: NgxSpinnerService,
    private managementApprovalService: ManagementapprovalService,
  ) {

    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.pagValue = this.persistance.get("tabledisplayStart")
    this.previousValues = this.persistance.get('previouspagefilters')
    if (this.persistance.get('pagename') != null) {
      this.pageNameForBack = this.persistance.get('pagename');
      if (this.persistance.get('pagename') == "recruitmentownercandidatelist" || this.persistance.get('pagename') == "sendofferletter" ||
        this.persistance.get('pagename') == "approvercandidatelist" || this.persistance.get('pagename') == "requesterrequisitionlist" ||
        this.persistance.get('pagename') == "rocandidatelist"
      ) {
        this.requisitionDetailId = this.persistance.get('paramid');
        this.getCandidateList();
      } else {
        if (this.persistance.get('pagename') == "recruitmentownercandidatelist") {
          this._route.navigate(['/app/corporate/all-requisition']);
        }
        else if (this.persistance.get('pagename') == "approvercandidatelist") {
          this._route.navigate(['/app/plant/all-requisition']);
        }
      }
    }
    else {
      if (this.persistance.get('pagename') == "recruitmentownercandidatelist") {
        this._route.navigate(['/app/corporate/all-requisition']);
      }
      else if (this.persistance.get('pagename') == "approvercandidatelist") {
        this._route.navigate(['/app/plant/all-requisition']);
      }
    }
  }

  ngOnInit() {
    //this.openNav();
    //this.closeNav();
    this.persistance.get('tabledisplayStartcandi') == (null || undefined) ? this.displaystart = 0 : this.displaystart = this.persistance.get('tabledisplayStartcandi');
    if (this.persistance.get('tabledisplayStartcandi') == (null || undefined)) {
      this.displaystart = 0
    }
    if (this.persistance.get('tabledisplayStartcandi') > 0) {
      var tablestart = this.persistance.get('tabledisplayStartcandi')
      this.displaystart = (tablestart - 1) * 10;
    }
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginRight = "300px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
  }

  getCandidateList() {
    this.candidates = [];
    this.searchCandidate.RequisitionDetailId = this.requisitionDetailId;
    //console.log(this.searchCandidate);
    this.SpinnerService.show();
    this.candidateService.getCandidateList(this.searchCandidate).subscribe((result) => {
      if (result) {
        this.candidates = result;
        //console.log("RO Candidate List", this.candidates);
        //this.SpinnerService.hide();
      }
      else {
        this.candidates = [];
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.loadDataTable();
      this.SpinnerService.hide();
    });
  }

  // loadDataTable() {
  //   jQuery('#dataTable1').DataTable().clear().destroy();
  //   setTimeout(() => {
  //     jQuery('#dataTable1').DataTable({
  //       "searching": true,
  //       "paging": true,
  //       "scrollX": true,
  //       "bLengthChange": false,
  //       "fixedColumns": {
  //         "left": 2
  //         }
  //     });
  //   });
  // } //added by arg
  loadDataTable() {
    var dothis = this;
    jQuery('#dataTable1').dataTable().fnClearTable();
    jQuery('#dataTable1').dataTable().fnDestroy();
    setTimeout(() => {
      var oTable =
        jQuery('#dataTable1').dataTable({
          "searching": true,
          "paging": true,
          "scrollX": true,
          //"pageLength": 2,
          //"stateSave": true,
          "fixedColumns": {
            "left": 3
          },
          "displayStart": this.displaystart,
          "drawCallback": function (settings) {
            dothis.nextPageValue = (settings._iDisplayStart / settings._iDisplayLength) + 1
            setTimeout(() => {
              jQuery('[data-toggle="popover"]').popover({
                html: true
              });
            });
          }
        });
      var flag = 0;
      var l = 0;
      var firsttext = "";
      var nexttext = "";
      jQuery('body').on('click', '#chkAll', function () {
        l = 0;
        flag = 0;
        if (jQuery(this).prop("checked")) {
          jQuery('.cmdUpdateStatus', oTable.fnGetNodes()).each(function () {
            if (l == 0) {
              firsttext = jQuery(this).parent("td").parent("tr").find("td:eq(14)").html();
            }
            else {
              nexttext = jQuery(this).parent("td").parent("tr").find("td:eq(14)").html();
            }
            if (jQuery(this).val() == "0") {
              flag = 1;
            }
            else {
              if (l > 0) {
                if (firsttext != nexttext) {
                  flag = 2;
                }
              }
            }
            l++;
          });
          if (flag == 1) {
            dothis.notificationService.showError("Please update the CMD approval status", "Error");
            jQuery("#chkAll").prop("checked", false);
          }
          else if (flag == 2) {
            jQuery("#chkAll").prop("checked", false);
            dothis.notificationService.showError("Please select same hiring status", "Error");
          }
          else {
            jQuery('.cmdUpdateStatus', oTable.fnGetNodes()).each(function () {
              if (jQuery(this).parent("td").find('input[type="checkbox"]').prop("checked")) {
                jQuery(this).parent("td").find('input[type="checkbox"]').click();
              }
              jQuery(this).parent("td").find('input[type="checkbox"]').click();
            });
            jQuery("#chkAll").prop("checked", true);
          }
        }
        else {
          jQuery('.cmdUpdateStatus', oTable.fnGetNodes()).each(function () {
            if (jQuery(this).parent("td").find('input[type="checkbox"]').prop("checked")) {
              jQuery(this).parent("td").find('input[type="checkbox"]').click();
            }
          });
          dothis.candidateIds = "";
        }
      });
    });
  }

  // selectAll(event) {
  //   jQuery('#dataTable1 tr').each(function () {
  //     jQuery(this).find("input[type=checkbox]").attr("checked", event.target.checked);
  //   });
  // }
  selectAll(event) {
    jQuery('#dataTable1 tbody tr').each(function () {
      jQuery("#chkm2").click();
    });
  }

  // select(event) {
  //   jQuery(this).find("input[type=checkbox]").attr("checked", event.target.checked);
  //   var candidates = "";
  //   jQuery('#dataTable1 tbody tr').each(function () {
  //     alert("Hi");
  //     if (jQuery(this).find("input[type=checkbox]").attr("checked")) {
  //       alert("Hi");
  //       var idval = jQuery(this).find("input[type=checkbox]").val();
  //       if (candidates == "") {
  //         candidates = idval;
  //       }
  //       else {
  //         candidates += "," + idval;
  //       }
  //     }

  //   });
  // }
  select(evt, id, statusid, emailId, candidateNo, managementApprovalId, managementApprovalFlag) {
    var flag = 0;
    var managementflag = 0;
    this.candidiateIdCb = id;
    this.hiringStatusIdCb = statusid;
    this.emailIdCb = emailId;
    this.btnreScheduleInterviewVisible = false;
    this.currentHiringStatus = statusid;
    this.EmailId = emailId;
    this.candidateNo = candidateNo;
    var managementApprovalFlag = managementApprovalFlag;
    this.managementApprovalFlag = managementApprovalFlag;
    if (this.candidateIds != "") {
      if (this.prevselectedstatus != statusid) {
        jQuery("#chkm" + id).prop("checked", false);
        flag = 1;
      }
      else {
        this.prevselectedstatus = statusid;
        //    if (this.oldManagementApprovalId != managementApprovalId) {
        //      jQuery("#chkm" + id).prop("checked", false);
        //      managementflag = 1;
        //    }
        //    else {
        //      this.oldManagementApprovalId = managementApprovalId;
        //    }
        //  }
        //}
        //else {
        //  this.prevselectedstatus = statusid;
        //}
      }
    }
    if (evt.target.checked && flag == 0 && managementflag == 0) {
      this.candidateIds = this.candidateIds + "," + id;
      this.prevselectedstatus = statusid;
      this.emailidAray.push({
        id: id,
        emailId: emailId
      });
      this.candidateNoarray.push({
        id: id,
        candidateNo: candidateNo
      });
    }
    else {
      jQuery("#chkAll").prop("checked", false);
      this.candidateIds = this.candidateIds.replace("," + id, "");
      //this.emailidAray = this.emailidAray.filter(e => e.id != id);
      //this.candidateNoarray = this.candidateNoarray.filter(e => e.id != id);
    }
    if (this.candidateIds != "") {
      //if (statusid == 38 && flag == 0) {
      //  this.btnVisible = false;
      //  this.btnTestVisible = false;
      //  this.btnInterviewVisible = false;
      //  this.btnDocumentCollectionVisible = false;
      //  this.btnManagementApprovalVisible = true;
      //  this.btnUploadManagementApprovalVisible = false;
      //  this.btnUpdateManagementApprovalVisible = false;
      //}
      if (statusid == 39 && flag == 0 && managementApprovalFlag == true) {
        this.btnVisible = false;
        this.btnTestVisible = false;
        this.btnInterviewVisible = false;
        this.btnDocumentCollectionVisible = false;
        this.btnManagementApprovalVisible = false;
        this.btnUploadManagementApprovalVisible = true;
        this.btnUpdateManagementApprovalVisible = false;
        this.btnReuploadManagementApprovalVisible = false;   // Added By Anif 04-02-2023
      }
      else if (statusid >= 40 && flag == 0 && statusid != 54 && statusid != 55 && statusid != 56 && managementflag == 0) {
        this.oldManagementApprovalId = managementApprovalId;
        if (this.oldManagementApprovalId != 0) {
          if (this.oldManagementApprovalId == managementApprovalId) {
            this.btnManagementApprovalVisible = false;
            this.btnUpdateManagementApprovalVisible = true;
            this.btnUploadManagementApprovalVisible = false;
            this.btnReuploadManagementApprovalVisible = true;   // Added By Anif 04-02-2023
          }
          else {
            //this.oldManagementApprovalId = this.managementApprovalId
            this.notificationService.showWarning("Please select same type of Management Approval", "Error");
          }
        }
        else {
          this.oldManagementApprovalId = this.managementApprovalId
          this.btnManagementApprovalVisible = false;
          this.btnUpdateManagementApprovalVisible = true;
          this.btnUploadManagementApprovalVisible = false;
          this.btnReuploadManagementApprovalVisible = false;   // Added By Anif 04-02-2023
        }
      }
      else if (statusid == 8 || statusid == 11 || statusid == 26 ||
        statusid == 14 || statusid == 17 || statusid == 20 || statusid == 23) {
        this.btnreScheduleInterviewVisible = true;
      }
      // else if (statusid == 40 && flag == 0 && managementApprovalFlag == true) {     // Added By Anif 04-02-2023
      //   this.btnVisible = false;
      //   this.btnTestVisible = false;
      //   this.btnInterviewVisible = false;
      //   this.btnDocumentCollectionVisible = false;
      //   this.btnManagementApprovalVisible = false;
      //   this.btnUploadManagementApprovalVisible = false;
      //   this.btnUpdateManagementApprovalVisible = false;
      //   this.btnReuploadManagementApprovalVisible = true;
      // }



    }
    else {
      this.btnVisible = false;
      this.btnTestVisible = false;
      this.btnInterviewVisible = false;
      this.btnTestVisible = false;
      this.prevselectedstatus = 0;
      this.btnDocumentCollectionVisible = false;
      this.btnManagementApprovalVisible = false;
      this.btnUploadManagementApprovalVisible = false;
      this.btnUpdateManagementApprovalVisible = false;
      this.btnReuploadManagementApprovalVisible = false;   // Added By Anif 04-02-2023
    }



    //this.searchTestScheduleDetail.candidateId = id;
    //this.searchTestScheduleDetail.requisitionDetailId = this.requisitionDetailId;
    //this.testScheduleService.getTestScheduleDetail(this.searchTestScheduleDetail).subscribe((result) => {
    //  if (result) {
    //    if (result) {
    //      this.testScheduleDetail = result;
    //      this.ContactName = this.testScheduleDetail.contactPersonName;
    //      this.ContactNo = this.testScheduleDetail.contactNo;
    //    }
    //  }
    //})
  }
  gotoGenerateManagementApproval() {
    this.candidateIdNames = [];
    this.OnboardingMailIds = [];
    var splittedCandidates = this.candidateIds.split(",");
    for (var i = 0; i < this.candidates.length; i++) {
      for (var j = 0; j < splittedCandidates.length; j++) {
        if (this.candidates[i].candidateId.toString() == splittedCandidates[j].toString()) {
          this.candidateIdNames.push({
            candidateId: this.candidates[i].candidateId,
            candidateName: this.candidates[i].fullName
          })
          this.OnboardingMailIds.push({
            OMMailIds: this.candidates[i].omMailId,
            OHMailIds: this.candidates[i].ohMailId,
            OCMailIds: this.candidates[i].ocMailId,
            HTMailIds: this.candidates[i].htMailId,
            StatusFlag: this.candidates[i].statusFlag
          })
        }
      }
    }
    this.persistance.set('pagename', "rocandidatelist");
    this.persistance.set('nextpagename', "managementapproval");
    this.persistance.set('candidateId', this.candidateIdNames);
    this.persistance.set('MailId', this.OnboardingMailIds);
    this.persistance.set('Flag', this.managementApprovalFlag);
    this.persistance.set('paramid', this.requisitionDetailId);
    this.persistance.set('tabledisplayStartcandi', this.nextPageValue);
    this._route.navigate(['/app/my-action/all-positions/candidate/management-approval']);
  }
  gotoManagementApproval(candidateId) {
    this.candidateIdNames = [];
    this.candidateIdNames.push({
      candidateId: this.candidates.filter(x => x.candidateId == candidateId)[0].candidateId,
      candidateName: this.candidates.filter(x => x.candidateId == candidateId)[0].fullName
    })
    this.OnboardingMailIds = [];
    this.OnboardingMailIds.push({
      OMMailIds: this.candidates.filter(x => x.candidateId == candidateId)[0].omMailId,
      OHMailIds: this.candidates.filter(x => x.candidateId == candidateId)[0].ohMailId,
      OCMailIds: this.candidates.filter(x => x.candidateId == candidateId)[0].ocMailId,
      HTMailIds: this.candidates.filter(x => x.candidateId == candidateId)[0].htMailId,
      StatusFlag: this.candidates.filter(x => x.candidateId == candidateId)[0].statusFlag
    })
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "rocandidatelist");
    this.persistance.set('nextpagename', "managementapproval");
    this.persistance.set('candidateId', this.candidateIdNames);
    this.persistance.set('MailId', this.OnboardingMailIds);
    this.persistance.set('Flag', this.managementApprovalFlag);
    this.persistance.set('paramid', this.requisitionDetailId);
    this.persistance.set('tabledisplayStartcandi', this.nextPageValue);
    this._route.navigate(['/app/my-action/all-positions/candidate/management-approval']);
  }

  gotoManagementApprovalView(candidateId) {
    this.candidateIdNames = [];
    this.candidateIdNames.push({
      candidateId: this.candidates.filter(x => x.candidateId == candidateId)[0].candidateId,
      candidateName: this.candidates.filter(x => x.candidateId == candidateId)[0].fullName
    })
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "rocandidatelist");
    this.persistance.set('nextpagename', "managementapproval");
    this.persistance.set('candidateId', this.candidateIdNames);
    this.persistance.set('MailId', this.OnboardingMailIds);
    this.persistance.set('Flag', this.managementApprovalFlag);
    this.persistance.set('paramid', this.requisitionDetailId);
    this.persistance.set('tabledisplayStartcandi', this.nextPageValue);
    this._route.navigate(['/app/my-action/all-positions/candidate/management-approvalview']);
  }
  gotoSendOfferLetter(candidateId) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "rocandidatelist");
    this.persistance.set('nextpagename', "sendofferletter");
    this.persistance.set('candidateId', candidateId);
    this.persistance.set('paramid', this.requisitionDetailId);
    this.persistance.set('tabledisplayStartcandi', this.nextPageValue);
    this._route.navigate(['/app/my-action/all-positions/candidate/send-offer-letter']);
  }

  getCandidateIds() {
    var dothis = this;
    var candidates = "";
    jQuery('#dataTable1 tr').each(function () {
      if (jQuery(this).find("input[type=checkbox]").attr("checked")) {
        var idval = jQuery(this).find("input[type=checkbox]").val();
        if (candidates == "") {
          candidates = idval;
        }
        else {
          candidates += "," + idval;
        }
      }

    });
    dothis.candidateIds = candidates;
  }

  gotoCandidateAction(id: any) {
    this.persistance.set('nextpagename', "candidateaction");
    this.persistance.set('candidateid', id);
    this.persistance.set('paramid', this.requisitionDetailId);
    this.persistance.set('tabledisplayStartcandi', this.nextPageValue);
    this._route.navigate(['/app/requisition/all-positions/candidate-list/candidate']);
  }

  gotoRoRequisitionList(id: any) {
    if (this.pageNameForBack == "recruitmentownercandidatelist" || this.pageNameForBack == "rocandidatelist") {
      this.persistance.set('pagename', null);
      this.persistance.set('paramid', null);
      this.persistance.set('previouspageparams', this.previousValues);
      this.persistance.set('tabledisplayStart', this.pagValue);
      this._route.navigate(['/app/requisition/all-positions']);
    }
    else if (this.pageNameForBack == "approvercandidatelist") {
      this.persistance.set('pagename', null);
      this.persistance.set('paramid', null);
      this._route.navigate(['/app/requisition/all-positions-pending']);
    } else if (this.pageNameForBack == "requesterrequisitionlist") {
      this.persistance.set('pagename', null);
      this.persistance.set('paramid', null);
      this._route.navigate(['/app/my-action/requisition-list']);
    }
  }

  gotoCandidateDocumentAction(candidateId) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "rocandidatelist");
    this.persistance.set('nextpagename', "candidatedocuments");
    this.persistance.set('candidateId', candidateId);
    this.persistance.set('paramid', this.requisitionDetailId);
    this.persistance.set('tabledisplayStartcandi', this.nextPageValue);
    this._route.navigate(['/app/my-action/all-positions/candidate/view-documents']);
  }

  onFileChange(event) {
    const files = event.target.files;
    this.invalidFileName1 = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName1 = true;
      }
    })
    if (files.length === 0) {
      this.managementFileImport.nativeElement.innerText = "Choose file";
      return;
    }
    if (this.invalidFileName1) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.managementFileImport.nativeElement.innerText = "Choose file";
      this.managementfileToUpload = null;
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      this.managementFileImport.nativeElement.innerText = "Choose file";
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("File should be less than 2MB!", "Error");
      this.managementFileImport.nativeElement.innerText = "Choose file";
      this.managementfileToUpload = null;
    } else {
      this.managementFileImport.nativeElement.innerText = files[0].name;
      this.managementfileToUpload = files.item(0);
    }
  }
  onReuploadFileChange(event) {
    const files = event.target.files;
    this.invalidFileName2 = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName2 = true;
      }
    })
    if (files.length === 0) {
      this.managementReuploadFileImport.nativeElement.innerText = "Choose file";
      return;
    }
    if (this.invalidFileName2) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.managementReuploadFileImport.nativeElement.innerText = "Choose file";
      this.managementfileToReuploadUpload = null;
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      this.managementReuploadFileImport.nativeElement.innerText = "Choose file";
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("File should be less than 2MB!", "Error");
      this.managementReuploadFileImport.nativeElement.innerText = "Choose file";
      this.managementfileToReuploadUpload = null;
    } else {
      this.managementReuploadFileImport.nativeElement.innerText = files[0].name;
      this.managementfileToReuploadUpload = files.item(0);
    }
  }
  UploadManagementApproval() {
    if (this.managementfileToUpload == null) {
      this.notificationService.showError("Please attach the management approval document !!", "Error");
    }
    else {
      this.SpinnerService.show();
      const formData = new FormData();
      formData.append("CreatedBy", this.createdBy.toString());
      formData.append("RequisitionDetailId", this.requisitionDetailId.toString());
      formData.append("CandidateIds", this.candidateIds.toString());
      formData.append("ManagementApprovalFile", this.managementfileToUpload);
      this.managementApprovalService.uploadManagementApproval(formData).subscribe((result) => {
        if (result.status == 0) {
          this.notificationService.showError(result.msg, "Error");
          this.SpinnerService.hide();
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.managementfileToUpload = null;
          this.managementFileImport.nativeElement.innerText = "Choose file";
          this.closeManagementApprovalModal.nativeElement.click();
          this.btnUploadManagementApprovalVisible = false;
          this.candidateIds = "";
          //this.getFilterCandidateList();
        }
      }, error => {
        console.log(error);
        this.SpinnerService.show();
        this.notificationService.showError("Something went wrong", "Error");
      });
    }
    this.getCandidateList();
  }

  reuploadManagementApproval() {
    if (this.managementfileToReuploadUpload == null) {
      this.notificationService.showError("Please attach the management approval document !!", "Error");
    }
    else {
      this.SpinnerService.show();
      const formData = new FormData();
      formData.append("CreatedBy", this.createdBy.toString());
      formData.append("RequisitionDetailId", this.requisitionDetailId.toString());
      formData.append("CandidateIds", this.candidateIds.toString());
      formData.append("ManagementApprovalFile", this.managementfileToReuploadUpload);
      this.managementApprovalService.reuploadManagementApproval(formData).subscribe((result) => {
        if (result.status == 0) {
          this.notificationService.showError(result.msg, "Error");
          this.SpinnerService.hide();
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.managementfileToReuploadUpload = null;
          this.managementReuploadFileImport.nativeElement.innerText = "Choose file";
          this.closeReuploadManagementApprovalModal.nativeElement.click();
          this.btnUploadManagementApprovalVisible = false;
          this.btnReuploadManagementApprovalVisible = false;
          this.candidateIds = "";
          //this.getFilterCandidateList();
        }
      }, error => {
        console.log(error);
        this.SpinnerService.show();
        this.notificationService.showError("Something went wrong", "Error");
      });
    }
    this.getCandidateList();
  }

}
