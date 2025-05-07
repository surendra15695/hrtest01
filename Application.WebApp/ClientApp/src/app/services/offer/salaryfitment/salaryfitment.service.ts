import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalaryfitmentService {
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

  saveSalaryFitment(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/salaryfitment/insertsalaryfitment', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  CampussaveSalaryFitment(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/salaryfitment/campusinsertsalaryfitment', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  acceptRejectSalaryFitment(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/salaryfitment/updatesalaryfitmentcandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  acceptRejectCampusSalaryFitment(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/salaryfitment/updatecampussalaryfitmentcandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getSalaryFitment(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/salaryfitment/getsalaryfitmentData', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCampusSalaryFitment(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/salaryfitment/getcampussalaryfitmentData', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getSalaryFitmentListNew(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidate/getsalaryfitmentlistnew', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addManagementApproval(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/managementapproval/insertmanagementapproval', formData, this.httpOptionsFile)
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
