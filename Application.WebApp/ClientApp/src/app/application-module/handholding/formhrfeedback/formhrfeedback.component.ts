import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ShareddataService } from '../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../sharedservices/notification.service';
import { HandholdingService } from '../../../services/handholding/handholding.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formhrfeedback',
  templateUrl: './formhrfeedback.component.html',
  styleUrls: ['./formhrfeedback.component.css']
})
export class FormhrfeedbackComponent implements OnInit {
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  saveForm: FormGroup;
  selectedQuestion1Status: string;
  selectedQuestion9Status: string;
  createdBy: number;
  candidateId: number;
  empNo: string;
  empName: string;
  hrFeedBackData: any[] = [];
  disableAll:boolean=false;
  showButton:boolean=false;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private titleService: Title,
    private persistance: PersistanceService,
    private handholdingService: HandholdingService
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    if (this.persistance.get('pagename') != null) {
      if (this.persistance.get('pagename') == "plantcandidate" 
        || this.persistance.get('pagename') == "corporatecandidate" 
        || this.persistance.get('pagename') == "salescandidate"
        || this.persistance.get('pagename') == "hrhandholding"
        || this.persistance.get('pagename') == "corporatehrhandholding"
        || this.persistance.get('pagename') == "salesandmarketinghrhandholding"
      ) {
        this.candidateId = this.persistance.get('candidateId');
        this.empNo = this.persistance.get('empid');
        this.empName = this.persistance.get('empName');
        this.createForm();
        this.getHrFeedback();
      }
      // else if(this.persistance.get('pagename')=="hrhandholding")
      // {
      //   this.candidateId = this.persistance.get('candidateId');
      //   this.empName = this.persistance.get('empName');
      //   this.empNo=this.persistance.get('empid');
      //   this.createForm();
      //   console.log("c",this.empNo)
      // }
    }
  }

  ngOnInit() {
  }

  createForm() {
    this.saveForm = this.fb.group({
      CandidateId:[this.candidateId],
      EmpNo:[this.empNo],
      Question1Answer: [''],
      Question1Reason: [''],
      Question2Answer: [''],
      Question2Reason: [''],
      Question3Answer: [''],
      Question4Answer: [''],
      Question5Answer: [''],
      Question6Answer: [''],
      Question6Reason: [''],
      Question7Answer: [''],
      Question7Reason: [''],
      Question8Answer: [''],
      CreatedBy:[this.createdBy]
    });
  }

  onSubmit() {
    console.log(this.saveForm.value);
    if (
      this.saveForm.value.Question1Answer == '' || this.saveForm.value.Question1Answer == undefined ||
      this.saveForm.value.Question1Reason == '' || this.saveForm.value.Question1Reason == undefined ||
      this.saveForm.value.Question2Answer == '' || this.saveForm.value.Question2Answer == undefined ||
      this.saveForm.value.Question2Reason == '' || this.saveForm.value.Question2Reason == undefined ||
      this.saveForm.value.Question3Answer == '' || this.saveForm.value.Question3Answer == undefined ||
      this.saveForm.value.Question4Answer == '' || this.saveForm.value.Question4Answer == undefined ||
      this.saveForm.value.Question5Answer == '' || this.saveForm.value.Question5Answer == undefined ||
      this.saveForm.value.Question6Answer == '' || this.saveForm.value.Question6Answer == undefined ||
      this.saveForm.value.Question6Reason == '' || this.saveForm.value.Question6Reason == undefined ||
      this.saveForm.value.Question7Answer == '' || this.saveForm.value.Question7Answer == undefined ||
      this.saveForm.value.Question7Reason == '' || this.saveForm.value.Question7Reason == undefined ||
      this.saveForm.value.Question8Answer == '' || this.saveForm.value.Question8Answer == undefined 
      
    ) {
      this.notificationService.showError("Please fill all fields to proceed", "Error");
    }
    else {
      this.SpinnerService.show();
      this.handholdingService.submitHandHoldingHRFeedBack(this.saveForm.value).subscribe((result) => {
        if (result) {
          console.log(result);
          if (result.successFlag == 0) {
            this.closeModal.nativeElement.click();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.closeModal.nativeElement.click();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getHrFeedback();
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
      });
    }
  }

  getHrFeedback() {
    this.disableAll=false;
    this.showButton=false;
    this.SpinnerService.show();
    var searchdata = {
      candidateId: this.candidateId,
      empNo: this.empNo
    }
    this.handholdingService.getHRFeedbackDetail(searchdata).subscribe((result) => {
      if (result) {
        this.hrFeedBackData = result;
        console.log(this.hrFeedBackData);

        if (this.hrFeedBackData.length > 0) {
          this.saveForm.patchValue({
            Question1Answer:this.hrFeedBackData[0].question1Answer,
            Question1Reason:this.hrFeedBackData[0].question1Reason,
            Question2Answer:this.hrFeedBackData[0].question2Answer,
            Question2Reason:this.hrFeedBackData[0].question2Reason,
            Question3Answer:this.hrFeedBackData[0].question3Answer,
            Question4Answer:this.hrFeedBackData[0].question4Answer,
            Question5Answer:this.hrFeedBackData[0].question5Answer,
            Question6Answer:this.hrFeedBackData[0].question6Answer,
            Question6Reason:this.hrFeedBackData[0].question6Reason,
            Question7Answer:this.hrFeedBackData[0].question7Answer,
            Question7Reason:this.hrFeedBackData[0].question7Reason,
            Question8Answer:this.hrFeedBackData[0].question8Answer,
          })
          this.disableAll=true;
          this.showButton=true;
        }
        else {
          this.disableAll=false;
          this.showButton=false;
        }
        this.SpinnerService.hide();
      }
      else {
        this.hrFeedBackData = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }

  gotoCandidateList()
  {
    this.persistance.set('candidateId',null);
    this.persistance.set('empNo', null);
    this.persistance.set('empName', null);
    if(this.persistance.get('pagename') == "plantcandidate"){        
      this.persistance.set('pagename', null);
      this._route.navigate(['/app/handholding/plant-candidate-list']);  
    }
    if(this.persistance.get('pagename') == "corporatecandidate"){        
      this.persistance.set('pagename', null);
      this._route.navigate(['/app/handholding/corporate-candidate-list']);  
    }
    if(this.persistance.get('pagename') == "salescandidate"){        
      this.persistance.set('pagename', null);
      this._route.navigate(['/app/handholding/sales-candidate-list']);  
    }
    if(this.persistance.get('pagename') == "hrhandholding"){ 
      this.persistance.set('pagename', null);
      this._route.navigate(['/app/campus/hrhand-holding']);
    }
    if(this.persistance.get('pagename') == "corporatehrhandholding"){ 
      this.persistance.set('pagename', null);
      this._route.navigate(['/app/campus/corporate-hr-hand-holding']);
    }
    if(this.persistance.get('pagename') == "salesandmarketinghrhandholding"){ 
      this.persistance.set('pagename', null);
      this._route.navigate(['/app/campus/salesandmarketing-hr-hand-holding']);
    }
  }

}
