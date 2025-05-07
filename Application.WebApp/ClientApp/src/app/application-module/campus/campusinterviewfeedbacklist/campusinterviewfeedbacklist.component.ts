import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common/common/common.service';
import { isAbsolute } from 'path';
import { InterviewscheduleService } from '../../../services/selection/interviewschedule/interviewschedule.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import {  ICampusCandidateInterviewFeedbackList, ISearchCampusCandidateInterviewFeedback } from '../../../interfaces/selection/interviewschedule.interface';
declare var jQuery: any;

@Component({
  selector: 'app-campusinterviewfeedbacklist',
  templateUrl: './campusinterviewfeedbacklist.component.html',
  styleUrls: ['./campusinterviewfeedbacklist.component.css']
})
export class CampusinterviewfeedbacklistComponent implements OnInit {
  @ViewChild('closeClarificationModal', { static: false }) ccModal: ElementRef;
  searchFeedbackList: ISearchCampusCandidateInterviewFeedback = {
    candidateId: null
  }
  feedbackList: ICampusCandidateInterviewFeedbackList = {
    candidateId: null,
    interviewDetailId: null,
    interviewDate: null,
    venueName: null,
    functionName: null,
    filledStatus: null,
    isEnable: null
  }
  FeedbackNewlist: ICampusCandidateInterviewFeedbackList[] = [];
  candidateId: number;
  autoUserId: number;
  isEnable: number;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private commonService: CommonService,
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

  getAllFeedbackList() {
    debugger;
    this.SpinnerService.show();
    this.searchFeedbackList.candidateId = this.candidateId;
    this.interviewService.getCampusCandidateInterviewFeedbackList(this.searchFeedbackList).subscribe((result) => {
      if (result) {
        this.feedbackList = result;
        this.FeedbackNewlist = result;
        this.isEnable = this.feedbackList[0].isEnable;
        if (this.isEnable == 1) {
          this.FeedbackNewlist;
        }
        else {
          this.FeedbackNewlist = [];
        }
        this.SpinnerService.hide();
      }
      else {
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.loadDataTable();
    });
  }

  gotoAddCampusFeedback(candidateId, interviewDetailId) {
    jQuery(".custom-menu").hide();
    this.persistance.set('paramid1', this.candidateId);
    this.persistance.set('paramid2', interviewDetailId);
    this._route.navigate(['/app/career/add-campus-interview-feedback']);
  }
}

