import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CampusrequisitionService } from 'src/app/services/campus/campusrequisition/campusrequisition.service';
import { LocationService } from 'src/app/services/common/location/location.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

@Component({
  selector: 'app-campus-candidate-selection-acknowledgement',
  templateUrl: './campus-candidate-selection-acknowledgement.component.html',
  styleUrls: ['./campus-candidate-selection-acknowledgement.component.css']
})
export class CampusCandidateSelectionAcknowledgementComponent implements OnInit {
  candidateId:any;
  candidateDetailsData:any;
  LocationList:any=[]
  SelectedLocation:number;
  isReadoly:boolean=false;
  acknowledgeValue:number=0;
  constructor(
    private campusRequisitionService: CampusrequisitionService,
    private notificationService: NotificationService,
    private persistance: PersistanceService,
    private locationService: LocationService,
    private spinnerService: NgxSpinnerService,
  ) { 
    this.candidateId = this.persistance.get('loggedinuser').candidateId;
    this.getAllLocations()
    this.getAllCandidateData()
       
  }

  ngOnInit() {
  }

  onChangeAcknowledgementType(acknowledgementType) {
    if (acknowledgementType == "A") {
      this.acknowledgeValue=21;
    }  
    if (acknowledgementType == "D")  {
      this.acknowledgeValue=22;
    }
  }
  getAllCandidateData(){
    var value={
      CandidateId:this.candidateId
    }
    this.campusRequisitionService.CandidatewisseelectionData(value).subscribe((result) => {
      if (result != undefined || result != null) {
        this.candidateDetailsData=result;
        if(this.candidateDetailsData[0].hiringStatusId== 21 || this.candidateDetailsData[0].hiringStatusId==22){
          this.isReadoly=true;
          this.SelectedLocation=this.candidateDetailsData[0].locationId;

        } 
        else{
          this.isReadoly=false
        }

      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
 
  getAllLocations(){
    var saveForm = {
      LocationNo:null,
      LocationCode:null,
      LocationOffice:null,
      LocationId:null,
      VerticalId:null,
      IsActive:null,
      CreatedBy:null
    }
    this.locationService.getAllLocation(saveForm).subscribe((response: any) => {  
              
      if(response){
        this.LocationList = response;
                       
      }
      else{
        this.LocationList = [];        
      }      
    }, error => {      
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      
      this.spinnerService.hide();
    })
  }

  onClickFinalSubmit(value){
    if(value=="Y"){
      var data={
        CandidateId: this.candidateId,
        HiringStatusId:this.acknowledgeValue,
        LocationId:this.SelectedLocation,
        CreatedBy:this.persistance.get('loggedinuser').autoUserId
      }
      this.campusRequisitionService.UpdateCandidateDeatilsForAcknowledge(data).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.spinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.spinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getAllCandidateData()
            
          }
        }
        else {
          this.spinnerService.hide();
        }
      }, error => {
        console.log(error);
      }, () => {
      });
    }
  }
}
