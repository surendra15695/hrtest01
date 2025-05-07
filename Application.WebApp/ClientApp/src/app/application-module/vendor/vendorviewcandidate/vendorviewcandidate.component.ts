import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ICandidateDetailData, ISearchCandidateDetail } from '../../../interfaces/preselection/candidate.interface';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { CandidateService } from '../../../services/preselection/candidate/candidate.service';
import { LocationService } from 'src/app/services/common/location/location.service';
declare var jQuery: any;

@Component({
  selector: 'app-vendorviewcandidate',
  templateUrl: './vendorviewcandidate.component.html',
  styleUrls: ['./vendorviewcandidate.component.css']
})
export class VendorviewcandidateComponent implements OnInit {
  candidates: ICandidateDetailData[] = [];
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
  pagename: string;
  constructor(
    private _route: Router,
    private candidateService: CandidateService,
    private persistance: PersistanceService,
    private locationService: LocationService,

  ) {
    if (this.persistance.get('pagename') != null || this.persistance.get('nextpagename') != null) {
      if (this.persistance.get('pagename') == "vendorcurrentjobssubmittedcandidate" || this.persistance.get('pagename') == "vendorraiscreditnote"|| this.persistance.get('pagename') == "vendorraisinvoice") {
        if (this.persistance.get('nextpagename') == "candidatedetail") {
          this.candidateId = this.persistance.get('candidateid');
          this.pagename = this.persistance.get('pagename');
          this.getCandidateList();
        }
      } else {
        this._route.navigate(['/app/vendor/current-job']);
      }
    }
    else {
      this._route.navigate(['/app/vendor/current-job']);
    }
  }

  ngOnInit() {

  }

  getCandidateList() {
    this.candidates = [];
    this.searchCandidate.CandidateId = this.candidateId
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

  gotoCandidateList() {
    this.persistance.set("pagename", "vendorcurrentjobssubmittedcandidate");
    this.persistance.set('candidateid', null);
    if (this.pagename == "vendorcurrentjobssubmittedcandidate") {
      this._route.navigate(['app/vendor/job/candidate-list']);
    }
    else if (this.pagename == "vendorraisinvoice") {
      this._route.navigate(['app/vendor/raise-invoice']);
    }
  else if (this.pagename == "vendorraiscreditnote") {
      this._route.navigate(['app/vendor/raise-creditnote']);
    }
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
