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

  //comment by kuntal
  createAccount(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/createaccount', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateOnlyCandidateProfile(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/Updateonlycandidateprofile', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateOnlyCampusCandidateProfile(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/Updateonlycampuscandidateprofile', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  CreateOnlyCandidateProfile(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/createnewcandidateprofile', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateCandidateProfile(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/updatecandidateprofile', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getCandidateData(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/getcandidatedata', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCampusCandidateDataUpdate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/getcampuscandidateupdatedata', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  createCandidateProfile(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/createcandidateprofile', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateCMDApproval(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/savecandidatecmdstatus', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  candidateApplyJob(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/candidateapplyjob', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getInternalCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/getinternalcandidate', JSON.stringify(formData), this.httpOptions)
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
  getCampusCandidateProfile(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidateprofile/getallcampuscandidateprofile', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCandidateProfileApplication(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidateprofile/getallcandidateprofileapplication', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCampusCandidateProfileApplication(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidateprofile/getallcampuscandidateprofileapplication', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  enableDisableCandidateProfileStatus(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidateprofile/enabledisablecandidateprofile', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  saveCandidateProfile(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidateprofile/insertcandidateprofile', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveCampusCandidateProfile(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidateprofile/insertcampuscandidateprofile', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  CandidateProfileMrfPpf(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidateprofile/candidateprofileupdateppf', formData, this.httpOptionsFile)
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

  getAllOnboardingManager(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/GetAllOnBoardingManager', JSON.stringify(formData), this.httpOptions)
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

  sendToOnboardingTeam(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/CandidateOnBoardingAssignInsert', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }  

  candidateCheckUpdateProfile(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/candidatecheckProfileUpdate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
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
