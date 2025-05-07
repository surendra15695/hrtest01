import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { InterviewService } from 'src/app/services/common/interview/interview.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { InterviewcalendaractionService } from 'src/app/services/selection/interviewcalendaraction/interviewcalendaraction.service';
import { RouterModule, Routes, Router } from '@angular/router';

declare var jQuery: any;
declare var html2pdf: any;

@Component({
  selector: 'app-rm-viewcandidate-mycalender',
  templateUrl: './rm-viewcandidate-mycalender.component.html',
  styleUrls: ['./rm-viewcandidate-mycalender.component.css']
})
export class RmViewcandidateMycalenderComponent implements OnInit {
  @ViewChild('pfromDate', { static: false }) pfDate: ElementRef;
  @ViewChild('ptoDate', { static: false }) ptDate: ElementRef;
  @ViewChild('ifromDate', { static: false }) ifDate: ElementRef;
  @ViewChild('itoDate', { static: false }) itDate: ElementRef;
  @ViewChild('closeActionModal', { static: false }) caModal: ElementRef;
  @ViewChild('clodeFeedbackModal', { static: false }) cfModal: ElementRef;
  @ViewChild('closeInterviewClarificationModal', { static: false }) cInterviewClarificationModal: ElementRef;

  verticalIds : any;
  autoUserId:any;
  interviewMasterId:number;
  interviews:any[]=[]
  constructor(
    private _route: Router,
    private interViewService: InterviewService,
    private interActionService: InterviewcalendaractionService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,
    
  ) { 
    
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
    this.interviewMasterId=this.persistance.get('interviewMasterId')
    var roleIds=this.persistance.get('loggedinuser').roleIds.split(",");
    roleIds.includes("40")? this.isVisibleStageGetAssesment=true:this.isVisibleStageGetAssesment=false
  }

  ngOnInit() {
    this.loadTooltipMenu();
    this.getAllCandiate();
  }
  gotomycampusCalendar(){
   
    this._route.navigate(['app/campus/rm-mycalender']);
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
          },
          "drawCallback": function (settings) {
            setTimeout(() => {
              jQuery('[data-toggle="popover"]').popover({
                html: true
              });
            });
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
 
  getAllCandiate() {
    this.interviews = [];
    var value={
      interviewMasterId: Number(this.interviewMasterId)
    }
    this.interActionService.getCandidateListCampusCandidate(value).subscribe((result) => {
      if (result) {
        this.interviews = result;
        this.interviews.forEach(element => { 
          //if(element.hiringStatusId ==7 || element.hiringStatusId ==8 || element.hiringStatusId ==9){
            if(element.statusName != null || element.statusName != undefined ){
            var satus= element.statusName.split(",")
            element.hiringStatusName=satus[Number(satus.length)-2]
            element.popoverContent = "<div><span class='grey'> Interview Status</span><span><br/>" + element.statusName + "</span></div>"
            element.statusName=satus[0]
            }
          //}
        })
      }
      else {
        this.interviews = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadDataTable1()
    });
  }

  interviewDetailsData:any=[];
  isVisibleStageGetAssesment:boolean=false;
  onclickInterviewDetails(CandiateId){
    debugger
    var searachvalue={
      CandidateId: Number(CandiateId)
    }
    this.interActionService.getInterviewDetails(searachvalue).subscribe((result) => {
      if (result) {
        this.interviewDetailsData=result;
      }
      
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  gotoStageGetAssesment(candidateId){
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
    // this.persistance.set('candidateIdsForMail', candidateId.toString());
    // this.persistance.set('interviewMasterId', this.interviewMasterId);
    this.persistance.set('pagename', "mycalenderviewcandidate");
    this.persistance.set('candidateId', Number(candidateId));
    this.persistance.set('interviewMasterId', this.interviewMasterId);
    this._route.navigate(['/app/campus/interview-assesment-list']);
  }
}
