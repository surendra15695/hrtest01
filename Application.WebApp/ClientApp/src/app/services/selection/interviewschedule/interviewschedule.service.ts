import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterviewscheduleService {
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

  createInterviewSchedule(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewschedule/createinterviewschedule', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getInterviewScheduleDetail(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewschedule/getinterviewscheduledetail', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addCandidateInterviewFeedback(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewschedule/addcandidateinterviewfeedback', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addCampusCandidateInterviewFeedback(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewschedule/addcampuscandidateinterviewfeedback', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCampusCandidateInterviewFeedbackDetail(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewschedule/getcampuscandidateinterviewfeedbackdetail', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCampusCandidateInterviewFeedbackList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewschedule/getcampuscandidateinterviewfeedbacklist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCandidateInterviewFeedbackDetail(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewschedule/getcandidateinterviewfeedbackdetail', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getCandidateInterviewFeedbackList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewschedule/getcandidateinterviewfeedbacklist', JSON.stringify(formData), this.httpOptions)
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
