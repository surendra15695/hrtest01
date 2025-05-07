import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TestscheduleService {
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

  createTestSchedule(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/testschedule/createtestschedule', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  uploadTestResult(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/testschedule/uploadtestresult', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getTestScheduleDetail(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/testschedule/gettestscheduledetail', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getTestResult(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/testschedule/gettestresult', JSON.stringify(formData), this.httpOptions)
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
