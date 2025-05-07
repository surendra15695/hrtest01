import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ICandidateDetailData, IcandidateremarksList, ISearchCandidateDetail } from '../../../../../interfaces/preselection/candidate.interface';
import { IRequisitionCandidateHiringStatusFormData } from '../../../../../interfaces/preselection/requisition.interface';
import { RequisitionService } from '../../../../../services/preselection/requisition/requisition.service';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { CandidateService } from '../../../../../services/preselection/candidate/candidate.service';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { ToastrService } from 'ngx-toastr';
import { ITestResult, ISearchTestResult } from '../../../../../interfaces/selection/testschedule.interface'
import { TestscheduleService } from '../../../../../services/selection/testschedule/testschedule.service';
import { OfferletterService } from 'src/app/services/offer/offerletter/offerletter.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { element } from 'protractor';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LocationService } from 'src/app/services/common/location/location.service';

declare var jQuery: any;

@Component({
  selector: 'app-rmrequisitioncandidateaction',
  templateUrl: './rmrequisitioncandidateaction.component.html',
  styleUrls: ['./rmrequisitioncandidateaction.component.css']
})
export class RmrequisitioncandidateactionComponent implements OnInit {

  testResults: ITestResult[] = [];
  searchTestResult: ISearchTestResult = {
    requisitionDetailId: null,
    candidateId: null
  }
  candidateremarksList: any[] = [];
  remarksDetails:IcandidateremarksList={
    CandidateId: 0,
    RequisitionDetailId: 0,
    HiringStatusId: 0,
    IsActive: false
  }//argg
  
  candidates: ICandidateDetailData[] = [];
  formData: IRequisitionCandidateHiringStatusFormData = {
    candidateIds: "",
    requisitionDetailId: 0,
    createdBy: 0,
    remarks: "",
    hiringStatusId: 1
  };
  searchCandidate: ISearchCandidateDetail = {
    CandidateId: 0,
    CandidateName: "",
    HiringStatusId: 0,
    GenderIds: "",
    FromAge: 0,
    ToAge: 0,
    AadharNo: "",
    ContactNo: "",
    EmailId: "",
    MotherTongueIds: "",
    QualificationIds: "",
    CourseIds: "",
    StreamIds: "",
    FromPercentage: 0,
    ToPercentage: 0,
    DomainIds: "",
    SubDomainIds: "",
    StateIds: "",
    SourceChannelId: "",
    CreatedBy: 0,
    RequisitionDetailId: 0,
    FromDate: "",
    ToDate: "",
    FromExperience: 0,
    ToExperience: 0,
    CompletionYears: "",
    QualificationTypeIds: "",
    CurrentEmployer: "",
    Designation: "",
    RelativeStatus: "",
    PreviousApplied: 0
  }
  candidateId: number;
  remarks: string;
  hiringStatusId: number = 1;
  createdBy: number;
  requisitionDetailId: number;
  btnvisible: boolean = true;
  testScoreVisible: boolean = false;
  candidateRemarkAftersalacpt:any;
  isCandidateRemarkAftersalacpt:boolean=false;
  hideremarks:boolean;
  constructor(
    private _route: Router,
    private offerLetterService: OfferletterService,
    private candidateService: CandidateService,
    private requisitionService: RequisitionService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private SpinnerService: NgxSpinnerService,
    private toasterService: ToastrService,
    private testScheduleService: TestscheduleService,
    private sanitizer: DomSanitizer,
    private locationService: LocationService,

  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    if (this.persistance.get('pagename') != null || this.persistance.get('nextpagename') != null) {
      if ((this.persistance.get('pagename') == "rmrequisitionlist" || this.persistance.get('pagename') == "candidatemanagement" ||  this.persistance.get('pagename') == "rmdummyrequisitionlist") && this.persistance.get('nextpagename') == "candidateaction") {
        this.candidateId = this.persistance.get('candidateid');
        this.requisitionDetailId = this.persistance.get('paramid');
        this.getCandidateList();
        this.getTestReult();
      } else {
        this._route.navigate(['/app/rmrequisitionlist']);
      }
    }
    else {
      this._route.navigate(['/app/rmrequisitionlist']);
    }
  }

  ngOnInit() {
    this.isCandidateRemarkAftersalacpt=false
    this.getCandidateRemark();
    this.getRemarksDetails();
  }

  getCandidateList() {
    this.candidates = [];
    this.searchCandidate.CandidateId = this.candidateId;
    this.searchCandidate.RequisitionDetailId = this.requisitionDetailId;
    // console.log("Search Candidate",this.searchCandidate);
    
    this.candidateService.getCandidateList(this.searchCandidate).subscribe((result) => {
      if (result) {
        this.candidates = result;
        //const safeUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(this.candidates[0].resume);
        //console.log("URL",safeUrl);
      }
      else {
        this.candidates = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  getCandidateRemark(){
    var searchOfferLetter={
      offerLetterId: null,
      candidateId: this.candidateId,
      requsitaionDetailsId: null,
    }
    this.offerLetterService.getOfferLetter(searchOfferLetter).subscribe((response: any) => {
      if(response.remarks.length != 0){
        console.log("hmm",response.remarks);
        this.candidateRemarkAftersalacpt=response.remarks;
        this.isCandidateRemarkAftersalacpt=true;
        debugger;
      }
    })
  }

  onSubmit() {
    this.formData.candidateIds = this.candidateId.toString();
    this.formData.requisitionDetailId = this.requisitionDetailId;
    this.formData.hiringStatusId = this.hiringStatusId;
    this.formData.createdBy = this.createdBy;
    this.formData.remarks = this.remarks;
    console.log(this.formData);
    if (this.formData.hiringStatusId == 1) {
      // alert("Error");
      this.notificationService.showError("Please select the hiring status", "Error");
    }
    else {
      this.SpinnerService.show();
      this.requisitionService.updateRequisitionCandidateHiringStatus(this.formData).subscribe((result) => {
        if (result) {
          console.log(result);
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getCandidateList();
          }
        }
        else {
          this.SpinnerService.hide();
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
      }, () => {
        this.SpinnerService.hide();
      });
    }
  }
  
  getRemarksDetails(){   
     this.remarksDetails={
        CandidateId: this.candidateId,
        RequisitionDetailId: 0,
        HiringStatusId: 0,
        IsActive: false
      }
    this.requisitionService.getCandidateHigringAction(this.remarksDetails).subscribe((result) => {
      if (result) {
        this.candidateremarksList = result.filter((element)=>((element.remarks!="")&&(element.remarks!=null)));
        if(this.candidateremarksList.length>0)
        {
          this.hideremarks=true;
        }
        else{
          this.hideremarks=false;
        }
        console.log("Remarks Details-",result);
      }
      else {
        this.candidateremarksList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  
  gotoCandidateList() {
    if (this.persistance.get('pagename') == "rmrequisitionlist") {
      this.persistance.set('paramid', this.requisitionDetailId);
      this.persistance.set('pagename', "rmrequisitionlist");
      this.persistance.set('nextpagename', null);
      this.persistance.set('previouspageparams',this.persistance.get('previouspagefilter'));
      this.persistance.set('tabledisplayStartcandi',this.persistance.get('tabledisplayStartcandi'));
      this._route.navigate(['/app/my-action/all-positions/candidate-list']);
    } else if (this.persistance.get('pagename') == "candidatemanagement") {
      this.persistance.set('paramid', this.requisitionDetailId);
      this.persistance.set('pagename', "candidatemanagement");
      this.persistance.set('nextpagename', null);
      this._route.navigate(['/app/my-action/candidate-management']);
    }

    else if (this.persistance.get('pagename') == "rmdummyrequisitionlist") {
      //this.persistance.set('paramid', this.requisitionDetailId);
      this.persistance.set('pagename', "rmdummyrequisitionlist");
      this.persistance.set('paramid', this.persistance.get('paramid'));
      this.persistance.set('hrStatus', this.persistance.get('hrStatus'));
      this.persistance.set('functionId', this.persistance.get('functionId'));
      this._route.navigate(['/app/campus/dummyrequisition-candidatelist']);
    }
  }

  getTestReult() {
    this.testScoreVisible = false;
    this.searchTestResult.candidateId = this.candidateId;
    this.searchTestResult.requisitionDetailId = this.requisitionDetailId;

    this.testScheduleService.getTestResult(this.searchTestResult).subscribe((result) => {
      if (result) {
        this.testResults = result;
        if (this.testResults.length > 0) {
          this.testScoreVisible = true;
        }
      }
      else {
        this.testResults = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
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
