import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ISearchCandidateInterviewFeedback,ICandidateInterviewFeedbackList,
  ICandidateInterviewFeedbackData
} from '../../../../interfaces/selection/interviewschedule.interface';
import { InterviewscheduleService } from '../../../../services/selection/interviewschedule/interviewschedule.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common/common/common.service';
import { isAbsolute } from 'path';
declare var jQuery: any;

@Component({
  selector: 'app-interviewfedbacklist',
  templateUrl: './interviewfedbacklist.component.html',
  styleUrls: ['./interviewfedbacklist.component.css']
})
export class InterviewfedbacklistComponent implements OnInit {
  @ViewChild('closeClarificationModal', { static: false }) ccModal: ElementRef;
  searchFeedbackList:ISearchCandidateInterviewFeedback={
    CandidateId:null,
    RequisitionDetailId:null,
    InterviewDetailId:null
  }
  feedbackList:ICandidateInterviewFeedbackList[]=[];
  candidateId:number;
  autoUserId:number;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private commonService:CommonService,
    private interviewService: InterviewscheduleService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
  ) { 
    this.candidateId = this.persistance.get('loggedinuser').candidateId;
    this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
    this.getAllFeedbackList();
  }

  ngOnInit() {
    this.loadDataTable();
    this.loadTooltipMenu();
  }

  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
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

    });
  }

  getAllFeedbackList(){
    this.SpinnerService.show();
    this.searchFeedbackList.CandidateId=this.candidateId;
    this.interviewService.getCandidateInterviewFeedbackList(this.searchFeedbackList).subscribe((result) => {
      if (result) {
        this.feedbackList = result;
        console.log(this.feedbackList)        
        this.SpinnerService.hide();
      }
      else {
        this.feedbackList = [];        
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);      
      this.SpinnerService.hide();
    }, () => {
      this.loadDataTable();
    });
  }

  gotoAddFeedback(requisitionDetailId,candidateId,interviewDetailId){
    jQuery(".custom-menu").hide();
    this.persistance.set('paramid1', requisitionDetailId);
    this.persistance.set('paramid2', this.candidateId);
    this.persistance.set('paramid3', interviewDetailId);
    this._route.navigate(['/app/career/add-interview-feedback']);
  }
}
