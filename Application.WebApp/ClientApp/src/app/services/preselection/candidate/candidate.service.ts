import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiURL = environment.apiurl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  httpOptionsFile = {
    headers: new HttpHeaders(

    )
  }

  constructor(private httpClient: HttpClient) { }

  createCandidateProfile(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/createcandidateprofile', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  saveCandidateCMDStatus(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/savecandidatecmdstatus', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getCandidateDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/getcandidateprofile', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  editcampusCandidateapplicationform(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/editcampuscandidateapplicationform', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  editcampusCandidateregistrationform(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/editcampuscandidateregistrationform', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCampusCandidateProfile(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidateprofile/getallcampuscandidateprofile', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCandidateList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/getcandidatelist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCandidatedummyList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/getcandidatedummylist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  CandidateDetailsSalaryFitment(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/candidatedetailssalaryfitment', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getNaukriCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/getnaukricandidate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getCvDropCandidateList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/getCvDropCandidateList', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCvDropCandidateListNew(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/getcvdropcandidatelistnew', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCvDropList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/GetAllCVDropList', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveCandidateDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/savecandidateprofile', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveCandidateStatus(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/savecandidatestatus', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  saveJoiningConfirmationDate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/CandidateJoiningDateInsert', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateJoiningDate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/CandidateJoiningDateUpdate', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllModeOfJoining(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/ModeOfJoining/GetAllModeOfJoining', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  sendToOnboardingTeam(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/CandidateOnBoardingAssignInsert', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllOnboardingManager(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/GetAllOnBoardingManager', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllCandidateJoinigFormDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/getcandidatejoiningformpdf', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // Added by anif on 01-12-2022 for Edit By AIC
  getCandidateJoiningFormDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/getcandidatejoiningform', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCandidateMedicalReimbursementDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningreimbursement/getmedicalreimbursemtcandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCandidateTravelReimbursementDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningreimbursement/gettravelreimbursementcandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCandidateProfile(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidateprofile/getallcandidateprofile', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCandidateHiringRemarks(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/getcandidatehiringremarks', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
   // 15-11-2022
  // uploadJoiningForm(formData: any): Observable<any> {
  //   return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/prejoiningdocumentcollectiondatasave', formData, this.httpOptionsFile)
  //     .pipe(
  //       catchError(this.errorHandler)
  //     )
  // }
  // Added by Anif on 04-07-2022

  getCandidateOfferRejectRemarks(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/getcandidateofferrejectremarks', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // Added by ANif on 01-12-2022
  updateCandiadteJoiningFamilyDetailsForm(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/updatecandidatejoiningfamilydetailsform', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getFamilyDeatilsUpdatehistroy(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/getjoiningformfamilydetailsupdatehistory', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateAccidenInsurancePolicy(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/updateaccidentinsurancepolicy', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updatejoiningReportform(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/updatejoiningReportform', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAccidentPolicyUpdateDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/getaccidentinsurancepolicyupdatehistiry', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getJoiningReportFormHistory(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/getjoiningreporthistory', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getMRFPPFHistory(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/getmrfppfhistory', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateSEBIInitialDisclosure(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/updatecandidatesebiinitialdisclosure', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getSEBIInitialDisclosureUpdateHistory(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/getsebidisclosureupdatehistory', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getRequitionDetailsForCvDrop(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/getrequitiondetailsforcvdrop', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // Anif till this on 01-12-2022

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
