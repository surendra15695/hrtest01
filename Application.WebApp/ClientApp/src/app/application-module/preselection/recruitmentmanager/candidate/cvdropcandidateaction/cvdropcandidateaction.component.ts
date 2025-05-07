import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ICandidateDetailData, ISearchCandidateDetail, IcandidateremarksList } from '../../../../../interfaces/preselection/candidate.interface';
import { IRequisitionCandidateHiringStatusFormData } from '../../../../../interfaces/preselection/requisition.interface';
import { RequisitionService } from '../../../../../services/preselection/requisition/requisition.service';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { CandidateService } from '../../../../../services/preselection/candidate/candidate.service';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { ToastrService } from 'ngx-toastr';
import { ITestResult, ISearchTestResult } from '../../../../../interfaces/selection/testschedule.interface'
import { TestscheduleService } from '../../../../../services/selection/testschedule/testschedule.service';
import { OfferletterService } from 'src/app/services/offer/offerletter/offerletter.service';
import { LocationService } from 'src/app/services/common/location/location.service';

declare var jQuery: any;

@Component({
  selector: 'app-cvdropcandidateaction',
  templateUrl: './cvdropcandidateaction.component.html',
  styleUrls: ['./cvdropcandidateaction.component.css']
})
export class CvdropcandidateactionComponent implements OnInit {
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
  }
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
  candidateRemarkAftersalacpt: any;
  isCandidateRemarkAftersalacpt: boolean = false;

  constructor(
    private _route: Router,
    private offerLetterService: OfferletterService,
    private candidateService: CandidateService,
    private requisitionService: RequisitionService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private testScheduleService: TestscheduleService,
    private locationService: LocationService,

  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    if (this.persistance.get('pagename') != null || this.persistance.get('nextpagename') != null) {
      if ((this.persistance.get('pagename') == "dropcvtag" || this.persistance.get('pagename') == "candidatedropcvtag") && this.persistance.get('nextpagename') == "candidateaction") {
        this.candidateId = this.persistance.get('candidateid');
        debugger;
        this.requisitionDetailId = this.persistance.get('paramid');
        this.getCandidateList();
        this.getTestReult();
      } else {
        this._route.navigate(['/app/dropcvtag']);
      }
    }
    else {
      this._route.navigate(['/app/dropcvtag']);
    }
  }

  ngOnInit() {
    this.isCandidateRemarkAftersalacpt = false
    this.getRemarksDetails();
    //this.getCandidateRemark();
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
       this.candidateremarksList = result;
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
  getCandidateList() {
    this.candidates = [];
    this.searchCandidate.CandidateId = this.candidateId;
    //this.searchCandidate.RequisitionDetailId = this.requisitionDetailId;

    this.candidateService.getCandidateList(this.searchCandidate).subscribe((result) => {
      if (result) {
        this.candidates = result;
        // console.log("Candidate Details",result);
      }
      else {
        this.candidates = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  //getCandidateRemark() {
  //  var searchOfferLetter = {
  //    offerLetterId: null,
  //    candidateId: this.candidateId,
  //    requsitaionDetailsId: null,
  //  }
  //  this.offerLetterService.getOfferLetter(searchOfferLetter).subscribe((response: any) => {
  //    if (response.remarks.length != 0) {
  //      console.log("hmm", response.remarks);
  //      this.candidateRemarkAftersalacpt = response.remarks;
  //      this.isCandidateRemarkAftersalacpt = true;
  //      debugger;
  //    }
  //  })
  //}

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
      this.requisitionService.updateRequisitionCandidateHiringStatus(this.formData).subscribe((result) => {
        if (result) {
          console.log(result);
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
          }
          else {
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

  gotoCandidateList() {
    if (this.persistance.get('pagename') == "dropcvtag") {
      //this.persistance.set('paramid', this.requisitionDetailId);
      this.persistance.set('pagename', "cvdroplist");
      this.persistance.set('nextpagename', null);
      this._route.navigate(['/app/dropcvtag']);
    }
    else if (this.persistance.get('pagename') == "candidatedropcvtag") {
      //this.persistance.set('paramid', this.requisitionDetailId);
      this.persistance.set('pagename', "candidatecvdroplist");
      this.persistance.set('nextpagename', null);
      this._route.navigate(['/app/candidatedropcvtag']);
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
