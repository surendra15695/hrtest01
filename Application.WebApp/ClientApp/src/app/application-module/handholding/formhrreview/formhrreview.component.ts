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
  selector: 'app-formhrreview',
  templateUrl: './formhrreview.component.html',
  styleUrls: ['./formhrreview.component.css']
})
export class FormhrreviewComponent implements OnInit {
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  saveForm: FormGroup;
  selectedQuestion1Status: string;
  selectedQuestion9Status: string;
  createdBy: number;
  candidateId: number;
  empNo: string;
  empName: string;
  hrReviewData: any[] = [];
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
        || this.persistance.get('pagename') == "campushrreview" 
      ) {
        this.candidateId = this.persistance.get('candidateId');
        this.empNo = this.persistance.get('empNo');
        this.empName = this.persistance.get('empName');
        this.createForm();
        this.getHRReview();
      }
    }
  }

  ngOnInit() {
  }

  createForm() {
    this.saveForm = this.fb.group({
      CandidateId:[this.candidateId],
      EmpNo:[this.empNo],
      Question1Answer: [''],
      Question2Answer: [''],
      Question3Answer: [''],
      Question4Answer: [''],
      Question5Answer: [''],
      Question6Answer: [''],
      Question7Answer: [''],
      Question8Answer: [''],
      CreatedBy:[this.createdBy]
    });
  }

  onSubmit() {
    console.log(this.saveForm.value);
    if (
      this.saveForm.value.Question1Answer == '' || this.saveForm.value.Question1Answer == undefined ||
      this.saveForm.value.Question2Answer == '' || this.saveForm.value.Question2Answer == undefined ||
      this.saveForm.value.Question3Answer == '' || this.saveForm.value.Question3Answer == undefined ||
      this.saveForm.value.Question4Answer == '' || this.saveForm.value.Question4Answer == undefined ||
      this.saveForm.value.Question5Answer == '' || this.saveForm.value.Question5Answer == undefined ||
      this.saveForm.value.Question6Answer == '' || this.saveForm.value.Question6Answer == undefined ||
      this.saveForm.value.Question7Answer == '' || this.saveForm.value.Question7Answer == undefined ||
      this.saveForm.value.Question8Answer == '' || this.saveForm.value.Question8Answer == undefined 
      
    ) {
      this.notificationService.showError("Please fill all fields to proceed", "Error");
    }
    else {
      this.SpinnerService.show();
      this.handholdingService.submitHandHoldingHRReview(this.saveForm.value).subscribe((result) => {
        if (result) {
          console.log(result);
          if (result.successFlag == 0) {
            this.closeModal.nativeElement.click();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.closeModal.nativeElement.click();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getHRReview();
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

  getHRReview() {
    this.disableAll=false;
    this.showButton=false;
    this.SpinnerService.show();
    var searchdata = {
      candidateId: this.candidateId,
      empNo: this.empNo
    }
    this.handholdingService.getHRReviewDetail(searchdata).subscribe((result) => {
      if (result) {
        this.hrReviewData = result;
        console.log(this.hrReviewData);

        if (this.hrReviewData.length > 0) {
          this.saveForm.patchValue({
            Question1Answer:this.hrReviewData[0].question1Answer,
            Question2Answer:this.hrReviewData[0].question2Answer,
            Question3Answer:this.hrReviewData[0].question3Answer,
            Question4Answer:this.hrReviewData[0].question4Answer,
            Question5Answer:this.hrReviewData[0].question5Answer,
            Question6Answer:this.hrReviewData[0].question6Answer,
            Question7Answer:this.hrReviewData[0].question7Answer,
            Question8Answer:this.hrReviewData[0].question8Answer,
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
        this.hrReviewData = [];
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
    if(this.persistance.get('pagename') == "campushrreview"){        
      this.persistance.set('pagename', null);
      this._route.navigate(['/app/campus/hr-review']);  
    }
  }
}
