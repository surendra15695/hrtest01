import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SuccessionService {
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

  generateSuccessionPlan(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/successionplan/generatesuccessionplan', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllSuccessionPlanList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/successionplan/getsuccessionplanlist', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllSuccessionPlanListReport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/successionplan/getsuccessionplanlistforReport', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  acknowledgeSuccessionPlan(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/successionplan/acknowledgesuccessionplan', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  mergeSuccessionPlan(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/successionplan/mergesuccessionplan', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  successionPlanApproveReject(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/successionplan/successionplanapprovereject', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllSuccessionPlanHoldReleaseList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/successionplan/getsuccessionplanholdreleaselist', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateholdrelease(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/successionplan/updateholdrelease', formData, this.httpOptions)
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
