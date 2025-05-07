import { Title } from '@angular/platform-browser';
import { RouterModule, Routes, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  ICandidateProfile, ISearchCandidateProfile, ICandidateFamilyDetails,
  ICandidateMRFRelatives, ICandidateTyreRelatives, ICandidateAcademicDetails, ICandidateCertificationDetails,
  ICandidateMembershipDetails, ICandidateExtraCarricularActivitiesDetails, ICandidateLanguageKnownDetails,
  ICandidatePeviousAssignmentDetails
} from '../../../interfaces/candidate/candidateprofile.interface'

import {
  ICandidateFamilyDetailsArray, ICandidateMRFRelativesArray, ICandidatePeviousAssignmentDetailsArray,
  ICandidateLanguageKnownDetailsArray, ICandidateExtraCarricularActivitiesDetailsArray, ICandidateMembershipDetailsArray,
  ICandidateCertificationDetailsArray, ICandidateAcademicDetailsArray, ICandidateTyreRelativesArray,
  IMRFPreInterviewArray
} from '../../../interfaces/candidate/candidateprofile.interface'
import { CandidateService } from '../../../services/candidate/candidate/candidate.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { Observable, Observer } from 'rxjs';
import { LocationService } from 'src/app/services/common/location/location.service';
declare var jQuery: any;
declare var html2pdf: any;
@Component({
  selector: 'app-viewapplicationformb',
  templateUrl: './viewapplicationformb.component.html',
  styleUrls: ['./viewapplicationformb.component.css']
})
export class ViewapplicationformbComponent implements OnInit {

  @ViewChild('content', { static: false }) content: ElementRef;
  candidateProfile: ICandidateProfile;
  searchCandidateProfile: ISearchCandidateProfile = {
    candidateId: null,
    candidateProfileId: null,
    requisitionDetailId: null
  }
  isFamily: boolean = false;
  isMRFRelative: boolean = false;
  isTyreRelative: boolean = false;
  defaultimg: string;
  createdBy: number;
  requisitionDetailId: number;
  candidateId: number;
  showBack: boolean = true;
  userRole: string;
  showEnable: boolean = false;
  isFormEnabled: boolean = false;
  applicationFormData: any;
  fileName: string;
  photourl: any;
  signatureurl: any;
  constructor(
    private SpinnerService: NgxSpinnerService,
    private notificationService: NotificationService,
    private candidateService: CandidateService,
    private persistance: PersistanceService,
    private _route: Router,
    private locationService: LocationService,
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.userRole = this.persistance.get('loggedinuser').roleIds;
    console.log('role', this.userRole)
    var userRoleArr = this.userRole.split(",");
    for (var i = 0; i < userRoleArr.length; i++) {
      if (userRoleArr[i] == "38" || userRoleArr[i] == "39" || userRoleArr[i] == "40" || userRoleArr[i] == "68" || userRoleArr[i] == "69") {
        this.showEnable = true;
      }
    }
    //console.log(this.persistance.get('loggedinuser'));
    if (this.persistance.get('pagename') != null) {
      if (this.persistance.get('pagename') == "rmcandidatelist" ||
        this.persistance.get('pagename') == "candidateapplicationform" ||
        this.persistance.get('pagename') == "candidateapplicationformview" ||
        this.persistance.get('pagename') == "panelcampuscandidatelist" ||
        this.persistance.get('pagename') == "candidateapplicationformview" ||
        this.persistance.get('pagename') == "mycalenderviewcandidate" ||
        this.persistance.get('pagename') == "candidatedetailapplicationformview" ||
        this.persistance.get('pagename') == "offcampuscandidatedetailapplicationformview") {
        this.SpinnerService.show();
        this.requisitionDetailId = this.persistance.get('paramid');
        this.candidateId = this.persistance.get('candidateId');
        if (this.persistance.get('pagename') == "candidateapplicationform") {
          this.showBack = false;
        }
        this.getCandidateProfile();
      }
      else {
        this._route.navigate(['/app/rmrequisitionlist']);
      }
    }
    else {
      this._route.navigate(['/app/rmrequisitionlist']);
    }
  }

  ngOnInit() {
  }


  getCandidateProfile() {
    this.candidateProfile = null;
    this.searchCandidateProfile.candidateId = this.candidateId;
    this.searchCandidateProfile.requisitionDetailId = this.requisitionDetailId;
    this.candidateService.getCampusCandidateProfile(this.searchCandidateProfile).subscribe((result) => {
      if (result) {
        this.candidateProfile = result;
        this.applicationFormData = this.candidateProfile;
        this.openFileforphoto(this.candidateProfile.candiadatePhoto);
        this.openFileforpsignature(this.candidateProfile.signature);
        this.fileName = this.candidateProfile.candidateId.toString() + "_ApplicationForm.pdf";
        // console.log("-------Candidate Profile", result);
        this.isFormEnabled = this.candidateProfile.isEnabled;
        if (this.candidateProfile.familyBackGroundDetails.length > 0) {
          this.isFamily = true;
        }
        else {
          this.isFamily = false;
        }
        if (this.candidateProfile.mrfRelationShipDetails.length > 0) {
          this.isMRFRelative = true;
        }
        else {
          this.isMRFRelative = false;
        }
        if (this.candidateProfile.tyreCompanyRelationShipDetails.length > 0) {
          this.isTyreRelative = true;
        }
        else {
          this.isTyreRelative = false;
        }
        if (this.candidateProfile.permanentNativeStateId == 0) {
          this.candidateProfile.permanentNativeStateId = undefined;
        }
        if (this.candidateProfile.nationalityId == 0) {
          this.candidateProfile.nationalityId = undefined;
        }
        if (this.candidateProfile.permanentStateId == 0) {
          this.candidateProfile.permanentStateId = undefined;
        }
        if (this.candidateProfile.religionId == 0) {
          this.candidateProfile.religionId = undefined;
        }
        if (this.candidateProfile.casteId == 0) {
          this.candidateProfile.casteId = undefined;
        }
        if (this.candidateProfile.bloodGroupId == 0) {
          this.candidateProfile.bloodGroupId = undefined;
        }
        this.defaultimg = this.candidateProfile.candiadatePhoto;
        // console.log("---------------------");
        // console.log(this.candidateProfile.membershipDetails);
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
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

  gotoList() {
    if (this.persistance.get('pagename') == "rmcandidatelist") {
      this.persistance.set('candidateId', null);
      this.persistance.set('pagename', "rmrequisitionlist");
      this.persistance.set('paramId', this.requisitionDetailId);
      this._route.navigate(['/app/my-action/all-positions/candidate-list']);
    }
    else if (this.persistance.get('pagename') == "panelcampuscandidatelist") {
      this.persistance.set('candidateId', null);
      this.persistance.set('pagename', 'viewapplication');
      this.persistance.set('paramId', null);
      this.persistance.set('interviewMasterId', this.persistance.get('interviewMasterId'));
      this.persistance.set('functionId', this.persistance.get('functionId'));
      this._route.navigate(['/app/campus/campusmycalendar'])
      //this._route.navigate(['/app/campus/mycalendar']);
    }
    else if (this.persistance.get('pagename') == "candidateapplicationformview") {
      this.persistance.set('pagename', 'talentpool');
      this.persistance.set('candidateId', null);
      this._route.navigate(['/app/talent-pool'])
      //this._route.navigate(['/app/campus/requsition-link']);
    }
    else if (this.persistance.get('pagename') == "mycalenderviewcandidate") {
      this.persistance.set('candidateId', this.persistance.get('candidateId'));
      this.persistance.set('interviewMasterId', this.persistance.get('interviewMasterId'));
      this._route.navigate(['/app/campus/rm-mycalender-view-candidate']);
    }
    else if (this.persistance.get('pagename') == "candidatedetailapplicationformview") {
      this.persistance.set('candidateId', this.persistance.get('candidateId'));
      this.persistance.set('prevpagename', this.persistance.get('prevpagename'));
      this._route.navigate(['/app/talent-pool/candidate-detail']);
    }
    else if (this.persistance.get('pagename') == "offcampuscandidatedetailapplicationformview") {
      this.persistance.set('candidateId', this.persistance.get('candidateId'));
      this.persistance.set('pagename', "offcampustalentpool");
      this._route.navigate(['/app/talent-pool/candidate-detail']);
    }
  }

  changeProfileStatus(evt) {
    this.isFormEnabled = evt;
    // console.log(this.isFormEnabled);
  }

  updateProfileStatus() {
    var formData: any = {
      CandidateId: this.candidateId,
      IsEnabled: this.isFormEnabled,
      CreatedBy: this.createdBy
    }
    // console.log(formData);
    this.SpinnerService.show();
    this.candidateService.enableDisableCandidateProfileStatus(formData).subscribe((result) => {
      if (result.successFlag == 1) {
        this.SpinnerService.hide();
        this.notificationService.showSuccess(result.msg, "Success");
        this.getCandidateProfile();
      }
      else {
        this.SpinnerService.hide();
        this.notificationService.showError(result.msg, "Error");
      }

    }, error => {
      this.SpinnerService.hide();
      // display form values on success
      this.notificationService.showError("Something went wrong.. Try again later..", "");
    });
  }



  DownloadPDF() {
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



  /* Method to fetch image from Url */
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
  openFileforphoto(blobName: string): void {
    let regex = /\.net(.*)/;
    let match = blobName.match(regex);
    let extractedString = match ? match[1] : '';
    let filename = extractedString.split('/')[2];
    let containername = extractedString.split('/')[1];
    this.locationService.getTestfile(filename, containername).subscribe(response => {
      let blob: Blob = response.body as Blob;
      const url = window.URL.createObjectURL(blob);
      this.photourl = url;
      this.convertBase64CandidatePhoto(this.photourl)
    });
  }
  openFileforpsignature(blobName: string): void {
    let regex = /\.net(.*)/;
    let match = blobName.match(regex);
    let extractedString = match ? match[1] : '';
    let filename = extractedString.split('/')[2];
    let containername = extractedString.split('/')[1];
    this.locationService.getTestfile(filename, containername).subscribe(response => {
      let blob: Blob = response.body as Blob;
      const url = window.URL.createObjectURL(blob);
      this.signatureurl = url;
      this.convertBase64CandidateSignature(this.signatureurl)
    });
  }

}

