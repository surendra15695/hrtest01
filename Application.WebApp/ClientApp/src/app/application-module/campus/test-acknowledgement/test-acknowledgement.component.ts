import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { CampusrequisitionService } from 'src/app/services/campus/campusrequisition/campusrequisition.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';

@Component({
  selector: 'app-test-acknowledgement',
  templateUrl: './test-acknowledgement.component.html',
  styleUrls: ['./test-acknowledgement.component.css']
})
export class TestAcknowledgementComponent implements OnInit {
  candidateId:any;
  isRemarksVisible:boolean=false;
  remarks:any;
  radioButtonValue:any;
  constructor(
    private _activeRoute: ActivatedRoute,
    private _route: Router,
    private campusRequisitionService: CampusrequisitionService,
    private notificationService: NotificationService,
    ) {
    this.candidateId = this._activeRoute.snapshot.queryParamMap.get('CandiateId')
   }

  ngOnInit() {
    this.isRemarksVisible=false;
  }
  onClickStatusChangeYes(){
    var formdata = {
      CandidateId:Number(this.candidateId),
      HiringStatusId: 15,
      Remarks:""
    }
    this.campusRequisitionService.updateCandidateAcknowledged(formdata).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          
        }
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  onClickStatusChangeNo(){
    var formdata = {
      CandidateId:Number(this.candidateId),
      HiringStatusId: 16,
      Remarks:this.remarks
    }
    this.campusRequisitionService.updateCandidateAcknowledged(formdata).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          
        }
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  onClickRadioBtn(value){
    if(value==1){
      this.isRemarksVisible=false;
      this.radioButtonValue=value;
      this.remarks=""
    }
    if(value==2){
      this.radioButtonValue=value;
      this.isRemarksVisible=true;
      this.remarks=""
    }
  }

  onSubmit(){
    var flag=0;
    if(this.radioButtonValue==1){
      this.onClickStatusChangeYes();
    }
    if(this.radioButtonValue==2){
      if(this.remarks == undefined || this.remarks==null || this.remarks.length==0){
        this.notificationService.showError("Please fill the Reason", "Error");
        flag=0;
      }
      if(this.remarks.length>0){
        flag=1;
      }
    }
    if(flag==1){
      this.onClickStatusChangeNo();
    }
    
  }
}
