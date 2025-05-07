import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ICandidateDetailData,ISearchCandidateDetail } from '../../../interfaces/preselection/candidate.interface';
import { IRequisitionCandidateHiringStatusFormData } from '../../../interfaces/preselection/requisition.interface';
import { RequisitionService } from '../../../services/preselection/requisition/requisition.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { CandidateService } from '../../../services/preselection/candidate/candidate.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { ToastrService } from 'ngx-toastr';
import { LocationService } from 'src/app/services/common/location/location.service';
declare var jQuery: any;

@Component({
  selector: 'app-requisitioncandidateview',
  templateUrl: './requisitioncandidateview.component.html',
  styleUrls: ['./requisitioncandidateview.component.css']
})
export class RequisitioncandidateviewComponent implements OnInit {
  candidates:ICandidateDetailData[]=[];
  formData:IRequisitionCandidateHiringStatusFormData={
    candidateIds:"",
    requisitionDetailId:0,
    createdBy:0,
    remarks:"",
    hiringStatusId:1
  };
  searchCandidate: ISearchCandidateDetail = {
    CandidateId:0,
    CandidateName:"",
    HiringStatusId:0,
    GenderIds:"",
    FromAge:0,
    ToAge:0,
    AadharNo:"",
    ContactNo:"",
    EmailId:"",
    MotherTongueIds:"",
    QualificationIds:"",
    CourseIds:"",
    StreamIds:"",
    FromPercentage:0,
    ToPercentage:0,
    DomainIds:"",
    SubDomainIds:"",
    StateIds:"",
    SourceChannelId:"",
    CreatedBy:0,
    RequisitionDetailId:0,
    FromDate:"",
    ToDate:"",
    FromExperience:0,
    ToExperience:0,
    CompletionYears:"",
    QualificationTypeIds:"",
    CurrentEmployer:"",
    Designation:"",
    RelativeStatus:"",
    PreviousApplied:0
  }
  candidateId:number;
  remarks:string;
  hiringStatusId:number=1;
  createdBy:number;
  requisitionDetailId:number;
  btnvisible:boolean=true;
  nextPageValue: number;
  constructor(
    private _route: Router,
    private candidateService: CandidateService,
    private requisitionService:RequisitionService,
    private persistance: PersistanceService,
    private notificationService:NotificationService,
    private toasterService:ToastrService,
    private locationService: LocationService,

  ) {     
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.nextPageValue = this.persistance.get('tabledisplayStartcandi');
    if (this.persistance.get('pagename') != null || this.persistance.get('nextpagename') != null) {
      if (this.persistance.get('nextpagename') == "candidateaction") {
        this.candidateId = this.persistance.get('candidateid');
        this.requisitionDetailId=this.persistance.get('paramid');
        this.getCandidateList();
      }else {
        //this._route.navigate(['/requesterrequisitionlist']);
      }
    }
    else {
      //this._route.navigate(['/requesterrequisitionlist']);
    }
  }

  ngOnInit() {
    
  }

  getCandidateList() {
    this.candidates = [];
    this.searchCandidate.CandidateId=this.candidateId;
    this.searchCandidate.RequisitionDetailId=this.requisitionDetailId;
    this.candidateService.getCandidateList(this.searchCandidate).subscribe((result) => {
      if (result) {
        this.candidates = result;
        console.log(result);
      }
      else {
        this.candidates = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  onSubmit(){
    this.formData.candidateIds=this.candidateId.toString();
    this.formData.requisitionDetailId=this.requisitionDetailId;
    this.formData.hiringStatusId=this.hiringStatusId;
    this.formData.createdBy=this.createdBy;
    this.formData.remarks=this.remarks;
    console.log(this.formData);
    if(this.formData.hiringStatusId==1){
      alert("Error");
      this.notificationService.showError("Please select the hiring status", "Error");
    }
    else{
      this.requisitionService.updateRequisitionCandidateHiringStatus(this.formData).subscribe((result) => {
        if (result) {
          console.log(result);
          if(result.successFlag==0){
            this.notificationService.showError(result.msg, "Error");
          }
          else{
            this.notificationService.showSuccess(result.msg, "Success");
            this.getCandidateList();
          }
        }
        else {
        }
      }, error => {
        console.log(error);
      }, () => {
      });    
    }
  }

  gotoCandidatelist(){
    this.persistance.set('nextpagename',null);
    this.persistance.set("candidateid",null);
    this.persistance.set('tabledisplayStartcandi',this.nextPageValue);
    this._route.navigate(['/app/requisition/all-positions/candidate-list']);
  }
  openFile(blobName: string): void {
    let regex = /\.net(.*)/;
    let match = blobName.match(regex);
    let extractedString = match ? match[1] : '';
    let filename = extractedString.split('/')[2];
    let containername = extractedString.split('/')[1];
    this.locationService.getTestfile(filename,containername).subscribe(response => {
      let blob:Blob=response.body as  Blob;
      const url = window.URL.createObjectURL(blob);

      // Open the file in a new tab
      window.open(url);
    }, error => {
      console.error('Failed to download file:', error);
    });
  }
}
