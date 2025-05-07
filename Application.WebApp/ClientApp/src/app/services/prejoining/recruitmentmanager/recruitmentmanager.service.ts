import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentmanagerService {
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

  getPendingCandidateList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/getprejoiningcandidatelist', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  GetJoiningRelationShip(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/getJoiningRelationShip', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  CampusgetPendingCandidateList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/campusgetprejoiningcandidatelist', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllDoctors(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getalldoctorslist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  sendCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/MedicalDocumentDoctorApprovalAssignInsert', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  BGVReportRequired(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/CandidateBGVReportInsert', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  uploadBGVReport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/UploadCandidateBGVReport', formData, this.httpOptionsFile)
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
