import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {
  ISearchInterviewFeedback, IInterviewFeedback,
  IInterviewHRFeedbackRecord
} from '../../../../interfaces/selection/interviewcalendaraction.interface';
import { IState } from '../../../../interfaces/common/common.interface';
import { InterviewcalendaractionService } from '../../../../services/selection/interviewcalendaraction/interviewcalendaraction.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common/common/common.service';
import { isAbsolute } from 'path';
declare var jQuery: any;

@Component({
  selector: 'app-viewhrfeedback',
  templateUrl: './viewhrfeedback.component.html',
  styleUrls: ['./viewhrfeedback.component.css']
})
export class ViewhrfeedbackComponent implements OnInit {
  calendarIds: string;
  candidateId: number;
  requisitionDetailId: number;
  searchFeedbackList: ISearchInterviewFeedback = {
    candidateId: null,
    calendarId: null,
    requisitionDetailId: null,
  }
  fullName: string;
  positionName: string;
  interviewDate: string;
  states: IState[] = [];
  feedbackList: IInterviewFeedback[] = [];
  feedbackRecords: IInterviewHRFeedbackRecord[] = [];
  
  autoUserId: number;
  isVisisble: boolean = false;
  requisitionDetailid:number;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private commonService: CommonService,
    private interActionService: InterviewcalendaractionService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
  ) {
    this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
    if (this.persistance.get('pagename') == "rmviewhrfeedback") {
      
      this.candidateId = this.persistance.get('candidateId');
      this.requisitionDetailid = this.persistance.get('paramid');
      console.log(this.calendarIds);
      this.getFeedbackList();
      
      
    }
    if(this.persistance.get('pagename') == "cmviewhrfeedback"){
      this.candidateId = this.persistance.get('candidateId');
      this.getFeedbackList();
    }
  }

  ngOnInit() {
  }

  getFeedbackList() {
    this.SpinnerService.show();
    this.feedbackList = [];
    var interviewNames:any[]=[];
    this.searchFeedbackList.candidateId = this.candidateId;
    this.searchFeedbackList.requisitionDetailId = this.requisitionDetailid;
    this.interActionService.getInterviewFeedbackList(this.searchFeedbackList).subscribe((result) => {
      if (result) {
        this.feedbackList = result;

        for(var i=0;i<this.feedbackList.length;i++){
          //var count=this.interviewClarificationList.filter(x=>x.calendarId==this.interClarifications[i].calendarId).length;
          var flag=0;
          for(var j=0;j<interviewNames.length;j++){
            if(interviewNames[j]==this.feedbackList[i].interviewName){
              flag=1;
            }
          }
          if(flag==0){
            interviewNames.push(this.feedbackList[i].interviewName);
          }
        }
        this.feedbackRecords=[];
        for(var i=0;i<interviewNames.length;i++){
          var listdata=this.feedbackList.filter(x=>x.interviewName==interviewNames[i]);
          
          this.feedbackRecords.push({
              interviewName:interviewNames[i],
              fullName:this.feedbackList[0].fullName,
              positionName:this.feedbackList[0].positionName,
              assessmentList:listdata,
            }
          )
        }
        
        this.fullName = this.feedbackList[0].fullName;
        this.positionName = this.feedbackList[0].positionName;
        //this.interviewDate = this.feedbackList[0].interviewDate;
      }
      else {
        this.feedbackList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }


  gotoCandidateList() {
    this.persistance.set('candidateId', null);
    if (this.persistance.get("pagename") == "rmviewhrfeedback") {
      this.persistance.set('pagename', "rmrequisitionlist");
      this.persistance.set('previouspageparams',this.persistance.get('previouspagefilter'));
      this.persistance.set('tabledisplayStartcandi',this.persistance.get('tabledisplayStartcandi'));
      this._route.navigate(['/app/my-action/all-positions/candidate-list']);
    }
    if(this.persistance.get('pagename') == "cmviewhrfeedback"){ 
      this.persistance.set('pagename', 'campusstalentpool');
      this._route.navigate(['/app/talent-pool']);
    }
    if(this.persistance.get('pagename') == "offcmviewhrfeedback"){ 
      this.persistance.set('pagename', 'campusstalentpool');
      this._route.navigate(['/app/off-campus-talent-pool']);
    }
    if(this.persistance.get('pagename') == "mycalenderviewcandidate"){ 
      this.persistance.set('candidateId', this.candidateId);
      this.persistance.set('interviewMasterId', this.persistance.get('interviewMasterId'));
      this._route.navigate(['/app/campus/rm-mycalender-view-candidate']);
    }
  }

}
