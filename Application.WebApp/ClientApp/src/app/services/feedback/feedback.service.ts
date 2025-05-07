import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FeedbackService {

  private apiURL = environment.apiurl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  httpOptionsFormData = {
    headers: new HttpHeaders()
  }
  
  constructor(private httpClient: HttpClient) { }  

  getFeedbackList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/feedback/getfeedbacklist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getFeedbackQuestionType(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/feedback/getfeedbackquestiontype', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getFeedBackQuestionOption(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/feedback/getfeedbackquestionoption', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  feedBackAssignSave(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/feedback/feedbackassignsave', formData, this.httpOptionsFormData)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  feedBackScheduleSave(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/feedback/feedbackschedulesave', formData, this.httpOptionsFormData)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  feedBackScheduleGetAll(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/feedback/feedbackschedulegetall', formData, this.httpOptionsFormData)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  deleteFeedback(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/feedback/deletefeedback', formData, this.httpOptionsFormData)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  
  getFeedbackData(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/feedback/getfeedbackdata', formData, this.httpOptionsFormData)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  saveFeedback(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/feedback/feedbacksave', formData, this.httpOptionsFormData)
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
