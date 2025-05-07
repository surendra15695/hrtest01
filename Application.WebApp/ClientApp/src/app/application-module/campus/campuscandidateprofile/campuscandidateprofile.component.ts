import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ICampusTestResult, ISearchCampusTestResult } from '../../../interfaces/campus/campusrequisition.interface'
import { ICandidateDetailData, ISearchCandidateDetail, IcandidateremarksList } from '../../../interfaces/preselection/candidate.interface';
import { IRequisitionCandidateHiringStatusFormData } from '../../../interfaces/preselection/requisition.interface';
import { RequisitionService } from '../../../services/preselection/requisition/requisition.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { CampusrequisitionService } from 'src/app/services/campus/campusrequisition/campusrequisition.service'
import { NotificationService } from '../../../sharedservices/notification.service';
import { ToastrService } from 'ngx-toastr';
import { CandidateService } from 'src/app/services/preselection/candidate/candidate.service';
import { ICandidateProfile, ISearchCandidateProfile } from 'src/app/interfaces/candidate/candidateprofile.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Observer } from 'rxjs';
import { InterviewcalendaractionService } from 'src/app/services/selection/interviewcalendaraction/interviewcalendaraction.service';
import { LocationService } from 'src/app/services/common/location/location.service';
declare var jQuery: any;
declare var html2pdf: any;

@Component({
  selector: 'app-campuscandidateprofile',
  templateUrl: './campuscandidateprofile.component.html',
  styleUrls: ['./campuscandidateprofile.component.css']
})
export class CampuscandidateprofileComponent implements OnInit {
  campusCandidateData: any;
  profileData: any;
  academicDataDetail: any;
  candidateId: number;
  hiringstatus:string;
  showtest : boolean = false;
  searchCampusTestResult:ISearchCampusTestResult={
    requisitionDetailId:null,
    candidateId:null,
    campusLinkId:null
  }
  testResults:any[]=[];
  searchCandidateProfile: ISearchCandidateProfile = {
    candidateId: null,
    candidateProfileId: null,
    requisitionDetailId: null
  }
  interviewDetailsData:any=[];
  candidateProfile: ICandidateProfile;
  applicationFormData: any;
  fileName: string;
  remarksDetails:IcandidateremarksList={
    CandidateId: 0,
    RequisitionDetailId: 0,
    HiringStatusId: 0,
    IsActive: false
  }//argg
  candidateremarksList: any[] = [];
  constructor(
    private _route: Router,
    private campusService: CampusrequisitionService,
    private requisitionService: RequisitionService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private candidateService: CandidateService,
    private SpinnerService: NgxSpinnerService,
    private calendarActionService: InterviewcalendaractionService,
    private locationService: LocationService,

  ) {
    this.candidateId = this.persistance.get('candidateId');
    this.hiringstatus = this.persistance.get('hiringstatus');
    this.getCandidateProfile();
    this.getTestReult();
    this.getcampusdata();
    this.onclickInterviewDetails();
    this.getRemarksDetails();
  }

  ngOnInit() {
  }

  onclickInterviewDetails(){
    var searachvalue={
      CandidateId: Number(this.candidateId)
    }
    this.calendarActionService.getInterviewDetails(searachvalue).subscribe((result) => {
      if (result) {
        this.interviewDetailsData=result;
      }
      
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getCandidateProfile() {
    var formData = {
      candidateId: this.candidateId
    }
    this.campusService.getCampusCampusProfileData(formData).subscribe((result) => {
      if (result) {
        this.campusCandidateData = result;
        console.log("campus",this.campusCandidateData);
        // if (this.campusCandidateData.profileData.length > 0) {
          //this.profileData = this.campusCandidateData.profileData[0];
          this.academicDataDetail = this.campusCandidateData.academicData;
          console.log("academic",this.academicDataDetail)
        // }
      }
      else {
        this.campusCandidateData = {};
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getTestReult(){
    this.searchCampusTestResult.candidateId=this.candidateId;
    console.log(this.searchCampusTestResult);
    this.campusService.getCampusTestResult(this.searchCampusTestResult).subscribe((result) => {
      if (result) {
        this.testResults = result;
        if(this.testResults.length==0)
        {
          this.showtest = false;
        }
        else{
          this.showtest = true;
        }
      }
      else {
        this.testResults = [];
        this.showtest = false;
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  gotoCandidateList(){
    
    if(this.persistance.get('pagename')=="offcampustalentpool"){
      
      this.persistance.set('pagename', 'campusstalentpool');
      this.persistance.set('candidateId', null);
      this._route.navigate(['/app/off-campus-talent-pool'])
    }
    else if(this.persistance.get('pagename')=="campuscanidateview" || this.persistance.get('prevpagename')=="campuscalendar")
    {
      this.persistance.set('pagename', 'campuscanidateview');
      this.persistance.set('interviewMasterId', this.persistance.get('interviewMasterId'));
      this.persistance.set('functionId', this.persistance.get('functionId'));
      this._route.navigate(['/app/campus/campusmycalendar'])
    }
    else if(this.persistance.get('pagename')=="campusrequisitionlistcandidatedetails"){
      this.persistance.set('requisitionDetailId', this.persistance.get('requisitionDetailId'));
      this._route.navigate(['/app/campus/requisition-list/view-candidate'])

    }
    else if(this.persistance.get('prevpagename')=="campustalentpool"){
      this.persistance.set('candidateId', null);
    this.persistance.set('pagename', 'talentpool');
    this._route.navigate(['/app/talent-pool'])
    }
    
  }
  getcampusdata(){
    this.candidateProfile = null;
    this.searchCandidateProfile.candidateId = this.candidateId;
    this.candidateService.getCampusCandidateProfile(this.searchCandidateProfile).subscribe((result) => {
      if (result) {
        this.candidateProfile = result;
        this.applicationFormData = this.candidateProfile;
        this.campusCandidateData.profileData.forEach(element => {
          element.candiadatePhoto = this.candidateProfile.candiadatePhoto;
        })
        console.log("chc",this.campusCandidateData)
        this.convertBase64CandidatePhoto(this.candidateProfile.candiadatePhoto)
        this.convertBase64CandidateSignature(this.candidateProfile.signature)
        this.fileName = this.candidateProfile.candidateId.toString() + "_ApplicationForm.pdf";
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }
  onclickDownload() {
    if (this.applicationFormData != undefined) {
      this.pdfdownload();
    }
  }
  pdfdownload() {
    var htmlstring = document.getElementById("printerdiv").innerHTML;
    var dom = document.createElement('div');
    dom.innerHTML = htmlstring;
    html2pdf(dom, {
      margin: 6,
      filename: this.fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }

    });
  }
  getRemarksDetails(){   
    this.remarksDetails={
       CandidateId: this.candidateId,
       RequisitionDetailId: 0,
       HiringStatusId: 0,
       IsActive: false
     }
   this.requisitionService.getCampusCandidateHigringAction(this.remarksDetails).subscribe((result) => {
     if (result) {
       this.candidateremarksList = result.filter((element)=>((element.remarks!="")&&(element.remarks!=null)));
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
 viewapplicationform(event: Event){
  if(this.persistance.get('pagename')=="offcampustalentpool"){
    event.preventDefault();
    this.persistance.set('candidateId', this.candidateId);
    this.persistance.set('pagename', "offcampuscandidatedetailapplicationformview");
    this._route.navigate(['/app/candidate-applicationformb/view']);
  }
  else{
  event.preventDefault();//this is used to prevent the vage from opening in new browser
  this.persistance.set('candidateId', this.candidateId);
  this.persistance.set('pagename', "candidatedetailapplicationformview");
  // this.persistance.set('paramId', this.candidateProfile.requisitionDetailId);
  this._route.navigate(['/app/candidate-applicationformb/view']);
  }
 }
  convertBase64CandidatePhoto(imageUrl: string) {
    this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
      this.applicationFormData.candiadatePhoto = base64Data;
    });
  }
  convertBase64CandidateSignature(imageUrl: string) {
    this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
      this.applicationFormData.signature = base64Data;
    });
  }
  getBase64ImageFromURL(url: string): Observable<string> {
    return Observable.create((observer: Observer<string>) => {
      // create an image object
      let img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      if (!img.complete) {
        // This will call another method that will create image from url
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }
  /* Method to create base64Data Url from fetched image */
  getBase64Image(img: HTMLImageElement): string {
    // We create a HTML canvas object that will create a 2d image
    var canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    // This will draw image
    ctx.drawImage(img, 0, 0);
    // Convert the drawn image to Data URL
    let dataURL: string = canvas.toDataURL("image/png");
    //return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    return dataURL;
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
