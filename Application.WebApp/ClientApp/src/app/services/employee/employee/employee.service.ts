import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
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

  getEmployeeReplacementList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/employee/getemployeereplacementlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getVendorJobList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/vendorjob/getvendorjoblist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  uploadEmployeeMaster(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/uploademployeemaster', formData, this.httpOptionsFile)
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
