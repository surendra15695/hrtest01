import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
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

  getDoctorVerificationCandidateList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/getAllDoctorsApprovalCandidateList', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // Doctor Report Verification
  getDoctorVerificationReportDetailsForCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/medicaldocument/getmedicaldocumentcollectiondata', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  verifyMedicalReport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/medicaldocument/UpdateMedicalDocumentDoctorApproval', formData, this.httpOptions)
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
