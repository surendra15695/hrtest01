import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {
  ISearchInterviewCalendarAssessment, IInterviewCalendarAssessmentList,
  IInterviewCalendarAssessmentListData, IInterviewCalendarAssessmentFormData,IInterviewAssesmentRecord
} from '../../../interfaces/selection/interviewcalendaraction.interface';
import { IState } from '../../../interfaces/common/common.interface';
import { InterviewcalendaractionService } from '../../../services/selection/interviewcalendaraction/interviewcalendaraction.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common/common/common.service';
declare var jQuery: any;
declare var html2pdf:any;
@Component({
  selector: 'app-campus-view-interview-assesment',
  templateUrl: './campus-view-interview-assesment.component.html',
  styleUrls: ['./campus-view-interview-assesment.component.css']
})
export class CampusViewInterviewAssesmentComponent implements OnInit {
  assessmentData:any;
  calendarIds: string;
  candidateId: number;
  requisitionDetailId: number;
  searchAssessmentList: ISearchInterviewCalendarAssessment = {
    CalendarIds: null,
    CandidateId: null,
    RequisitionDetailId: null,
  }
  fullName: string;
  positionName: string;
  interviewDate: string;
  states: IState[] = [];
  assessmentList: IInterviewCalendarAssessmentList[] = [];
  assessmentArray: IInterviewCalendarAssessmentListData[] = [];
  formData: IInterviewCalendarAssessmentFormData = {
    InterviewCalendarAssessmentData: null,
    CreatedBy: null,
    CandidateIds:null
  }
  autoUserId: number;
  isVisisble: boolean = false;
  requisitionDetailid:number;
  fileName:string;
  assessmentRecords:IInterviewAssesmentRecord[]=[];
  interviewDeatilId:any;
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
    this.candidateId = this.persistance.get('candidateId');
    this.interviewDeatilId = this.persistance.get('InterviewDetailsId');
    
    this.getAssessmentList();   
   }

  ngOnInit() {
  }
  getAssessmentList() {
    this.SpinnerService.show();
    this.assessmentList = [];
    var interviewNames:any[]=[];
    var seacrhValues={
      CandidateId:this.candidateId,
      InterviewDeatilsId:this.interviewDeatilId
    }
    this.interActionService.campusgetInterviewCalendarAssessmentList(seacrhValues).subscribe((result) => {
      if (result) {
        this.assessmentList = result;
        console.log(this.assessmentList);
        //this.assessmentList=this.assessmentList.filter(x=>x.overallScore>0);

        for(var i=0;i<this.assessmentList.length;i++){
          //var count=this.interviewClarificationList.filter(x=>x.calendarId==this.interClarifications[i].calendarId).length;
          var flag=0;
          for(var j=0;j<interviewNames.length;j++){
            if(interviewNames[j]==this.assessmentList[i].interviewName){
              flag=1;
            }
          }
          if(flag==0){
            interviewNames.push(this.assessmentList[i].interviewName);
          }
        }
        this.assessmentRecords=[];
        for(var i=0;i<interviewNames.length;i++){
          var listdata=this.assessmentList.filter(x=>x.interviewName==interviewNames[i]);
          
          this.assessmentRecords.push({
              interviewName:interviewNames[i],
              fullName:this.assessmentList[0].fullName,
              positionName:this.assessmentList[0].positionName,
              assessmentList:listdata,
              interviewDate:this.assessmentList[0].interviewDate,
            }
          )
        }
        this.fileName=this.assessmentList[0].candidateNo+"_InterviewAssessment.pdf";
        this.assessmentData=this.assessmentRecords;
        this.fullName = this.assessmentList[0].fullName;
        this.positionName = this.assessmentList[0].positionName;
        this.interviewDate = this.assessmentList[0].interviewDate;
        console.log(this.assessmentList);
      }
      else {
        this.assessmentList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }


  gotoCandidateList() {
    if(this.persistance.get('pagename')=="mycalenderviewcandidate"){
      this.persistance.set('pagename', this.persistance.get('pagename'));
      this.persistance.set('interviewMasterId', this.persistance.get('interviewMasterId'));
    }
    
    this.persistance.set('candidateId', this.persistance.get('candidateId'));
    this._route.navigate(['/app/campus/interview-assesment-list']);
    
  }

  DownloadPDF(){
    var htmlstring=document.getElementById("printerdiv").innerHTML;
    var dom = document.createElement('div');
	  dom.innerHTML = htmlstring;
    html2pdf(dom, {
      margin: 10,
      filename: this.fileName,
      image: { type: 'jpeg', quality: 0.98 },
      //html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      html2canvas: { scale: 3, y: 0,  scrollY: 0},
      //jsPDF: { format: 'A4' },
      //jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      jsPDF: { format: 'A4', orientation: 'landscape' },
    });
  }
}
