import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class InterviewcalendaractionService {
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

  getPanelistCalendar(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/getpanellistcalendar', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCampusPanelistCalendar(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/campusviewcandidatedetails', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getCalendarList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/getCalendarList', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getMyCampusCalenderList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/getmycampuscalenderlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateInterviewCalendarStatus(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/updateinterviewcalendarstatus', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateInterviewCampusCalendarStatus(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/insertupdatestatusmycampuscalander', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addInterviewCalendarAssessment(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/addinterviewcalendarassessment', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addInterviewCalendarAssessmentWithPDFGeneration(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/addinterviewcalendarassessmentwithpdfgeneration', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addcampusinterviewcalendarassessment(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/addcampusinterviewcalendarassessment', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getInterviewCalendarAssessmentList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/getinterviewcalendarassessmentlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  campusgetInterviewCalendarAssessmentList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/campusgetinterviewcalendarassessmentlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getcampusinterviewcalendarassessmentlist(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/getcampusinterviewcalendarassessmentlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addInterviewFeedbackList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/addinterviewfeedback', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getInterviewFeedbackList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/getinterviewfeedback', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getInterviewClarificationList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/getinterviewclarificationlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getInterviewDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/getinterviewdetails', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  insertupdateStageGateAssessment(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/insertupdatestagegateassesment', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getStageGateAssessment(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/getstagegateassesment', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getRmCalendersearchdata(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/rmcalendersearchdata', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCandidateListCampusCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/getcandidatelistcampuscandidate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  insertupcampusinterviewname(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/insertupcampusinterviewname', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getcampusinterviewname(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/getcampusinterviewname', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getcampusinterviewassesmentlist(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interviewcalendaraction/getcampusinterviewassesmentlist', JSON.stringify(formData), this.httpOptions)
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
