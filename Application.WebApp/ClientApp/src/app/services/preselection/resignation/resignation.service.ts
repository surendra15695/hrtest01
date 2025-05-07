import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ResignationService {
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

  generateResignation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/resignation/generateresignation', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateResignation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/resignation/updateresignation', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllResignationList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/resignation/getresignationlist', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  acknowledgeResignation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/resignation/acknowledgeresignation', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  mergeResignation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/resignation/mergeresignation', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  resignationApproveReject(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/resignation/resignationapprovereject', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllResignationHoldReleaseList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/resignation/getresignationholdreleaselist', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateholdrelease(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/resignation/updateholdrelease', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  sendClarification(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/resignation/sendclarification', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllResignationClarification(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/resignation/getallresignationclarification', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  deleteResignation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/resignation/deleteresignation', formData, this.httpOptions)
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
