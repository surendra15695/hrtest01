import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HiringteamService {

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

  getAllReassignHiringCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningdetails/getcandidatelistreassignhiring', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllReassignforRejectCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningdetails/getlistreassignforrejectcandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  } //arg

  reassignCandidateSave(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningdetails/savejoininghiringteamassign', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getEmployeeNoDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningdetails/getcandidateemployeeno', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateEmployeeNo(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningdetails/savecandidateemployeeno', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // Relocation reimbursement

  getAllRelocationReimbursement(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningreimbursement/getcandidatereimbursementbillsubmitlist', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveRelocationReimbursementData(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningreimbursement/savecandidatereimbursementbillsubmit', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllDiscontinuedCandidateList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningdetails/getalldiscontinuedcandidate', formData, this.httpOptionsFile)
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
