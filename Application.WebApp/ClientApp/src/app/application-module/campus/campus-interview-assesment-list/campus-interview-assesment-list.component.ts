import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { InterviewService } from 'src/app/services/common/interview/interview.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { InterviewcalendaractionService } from 'src/app/services/selection/interviewcalendaraction/interviewcalendaraction.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { CampusrequisitionService } from 'src/app/services/campus/campusrequisition/campusrequisition.service';
declare var jQuery: any;

@Component({
  selector: 'app-campus-interview-assesment-list',
  templateUrl: './campus-interview-assesment-list.component.html',
  styleUrls: ['./campus-interview-assesment-list.component.css']
})
export class CampusInterviewAssesmentListComponent implements OnInit {
  @ViewChild('pfromDate', { static: false }) pfDate: ElementRef;
  @ViewChild('ptoDate', { static: false }) ptDate: ElementRef;
  @ViewChild('ifromDate', { static: false }) ifDate: ElementRef;
  @ViewChild('itoDate', { static: false }) itDate: ElementRef;
  @ViewChild('closeActionModal', { static: false }) caModal: ElementRef;
  @ViewChild('clodeFeedbackModal', { static: false }) cfModal: ElementRef;
  @ViewChild('closeInterviewClarificationModal', { static: false }) cInterviewClarificationModal: ElementRef;
  interviewDetailsData: any = [];
  verticalIds: any;
  autoUserId: any;
  interviewMasterId: number;
  interviews: any[] = []
  candiateId: any;
  verticals: any[] = []
  functions: any[] = []
  selectedFunctionId: number;
  constructor(
    private _route: Router,
    private interViewService: InterviewService,
    private interActionService: InterviewcalendaractionService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private campusRequisitionService: CampusrequisitionService,
  ) {
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
    this.candiateId = this.persistance.get('candidateId');
    this.selectedFunctionId=0;
    this.onclickInterviewDetails();
    this.openFunctionModal();
  }

  ngOnInit() {
    this.loadTooltipMenu();
  }
  gotomycampusCalendar() {
    jQuery(".custom-menu").hide();
    var objBody = {
      campusLink: this.persistance.get('CampusLinkId')
    }
    setTimeout(() => {
      if (this.persistance.get('pagename') == "talentpool") {
        this.persistance.set('pagename', "talentpool");
        this.persistance.set('paramid', this.persistance.get('CampusLinkId'));
        this._route.navigate(['/app/talent-pool'], {
          queryParams: objBody, skipLocationChange: false
        });
      }
      if (this.persistance.get('pagename') == "offcampustalentpool") {
        this.persistance.set('pagename', "talentpool");
        this.persistance.set('paramid', this.persistance.get('CampusLinkId'));
        this._route.navigate(['/app/off-campus-talent-pool'], {
          queryParams: objBody, skipLocationChange: false
        });
      }

      if (this.persistance.get('pagename') == "mycalenderviewcandidate") {
        this.persistance.set('pagename', "mycalenderviewcandidate");
        this.persistance.set('interviewMasterId', this.persistance.get('interviewMasterId'));
        this._route.navigate(['/app/campus/rm-mycalender-view-candidate'])
      }
    });

  }
  resetPendingForm(){
    this.selectedFunctionId=0;
    this.onclickInterviewDetails()
  }
  loadDataTable1() {
    var dothis = this;
    jQuery('#dataTable1').dataTable().fnClearTable();
    jQuery('#dataTable1').dataTable().fnDestroy();
    setTimeout(() => {
      var oTable =
        jQuery('#dataTable1').dataTable({
          "searching": true,
          "paging": true,
          "scrollX": true,
          "order": [],
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
        jQuery(e.target).append(dropdownMenu.detach());
        jQuery(e.target).find('.custom-menu').hide();
      });
    });
  }
  loadPopover() {
    setTimeout(() => {
      jQuery('[data-toggle="popover"]').popover({
        html: true
      });
    });
  }


  onclickInterviewDetails() {
    var searachvalue = {
      CandidateId: this.candiateId,
      FunctionId: this.selectedFunctionId
    }
    this.interActionService.getcampusinterviewassesmentlist(searachvalue).subscribe((result) => {
      if (result) {
        this.interviewDetailsData = result;
        console.log("interviewDetailsData", this.interviewDetailsData);
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  openFunctionModal() {
    var searchdata = {
      campusLinkId: 0,
      candidateId: 0
    }
    this.campusRequisitionService.getCampusCampusCandidateVerticalFunction(searchdata).subscribe((result) => {
      if (result) {
        console.log("Results", result);
        this.functions = result.campusFunction;
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {

    });
  }

  gotoStageGetAssesment(candidateId) {
    this.persistance.set('candidateId', candidateId);
    this.persistance.set('interviewMasterId', this.interviewMasterId);
    this.persistance.set('pagename', "mycalenderviewcandidate");
    this._route.navigate(['/app/campus/stage-get-assesment']);
  }
  viewapplicationform(candidateId) {
    jQuery(".custom-menu").hide();
    this.persistance.set('candidateId', candidateId);
    this.persistance.set('interviewMasterId', this.interviewMasterId);
    this.persistance.set('pagename', "mycalenderviewcandidate");
    // this.persistance.set('paramId', this.candidateProfile.requisitionDetailId);
    this._route.navigate(['/app/candidate-applicationformb/view']);
  }

  gotoInterviewHRFeedback(candidateid) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "mycalenderviewcandidate");
    this.persistance.set('candidateId', candidateid);
    this.persistance.set('interviewMasterId', this.interviewMasterId);
    this._route.navigate(['/app/hr-interview-feedback/view']);
  }

  gotoIndividualAssessment(candidateId) {
    jQuery(".custom-menu").hide();
    //this.persistance.set('calendarIds', calendarId.toString());
    this.persistance.set('candidateIdsForMail', candidateId.toString());
    this.persistance.set('interviewMasterId', this.interviewMasterId);
    this.persistance.set('pagename', "mycalenderviewcandidate");

    this._route.navigate(['/app/my-campuscalendar/interview-assessment']);
  }
  gotoAssesmentPage(value) {
    jQuery(".custom-menu").hide();
    if (this.persistance.get("pagename") == "mycalenderviewcandidate") {
      this.persistance.set('interviewMasterId', this.persistance.get('interviewMasterId'));
      this.persistance.set('pagename', this.persistance.get('pagename'));
    }

    this.persistance.set('candidateId', this.candiateId);
    this.persistance.set('InterviewDetailsId', value.interviewDetailId);
    this._route.navigate(['/app/campus/interview-assessment/view']);
  }
}
