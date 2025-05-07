import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagementapprovalService {
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

  addManagementApproval(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/managementapproval/insertmanagementapproval', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  CampusCandidateaddManagementApproval(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/managementapproval/campuscandaiteinsertmanagementapproval', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getManagementApproval(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/managementapproval/getmanagementapprovaldata', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getManagementApprovalViewPage(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/managementapproval/getmanagementapprovaldataviewpage', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  CampusgetManagementApproval(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/managementapproval/campusgetmanagementapprovaldata', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  uploadManagementApproval(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/managementapproval/updatemanagementapproval', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  campusCandidateuploadManagementApproval(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/managementapproval/campusupdatemanagementapproval', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  reuploadManagementApproval(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/managementapproval/reuploadmanagementapproval', formData, this.httpOptionsFile)
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
