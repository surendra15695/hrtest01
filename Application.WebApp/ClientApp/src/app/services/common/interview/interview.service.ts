import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private apiURL = environment.apiurl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getAllInterview(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interview/getallinterview', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllInterviewRoom(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interview/getallinterviewroom', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllInterviewPanelMember(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interview/getallinterviewpanelmember', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  // Added by Anif on 06-07-2022
  getAllInterviewPanelMemberList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interview/getpanelmemberslist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  saveInterviewPanelMember(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interview/saveinterviewpanelmember', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // Anif
  getInterviewPanelMemberList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interview/getallinterviewpanelmemberMaplist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveInterviewPanelMemberMapping(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interview/saveinterviewpanelmembermapping', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addCampusCandidateInterviewFeedbackList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interview/campuscandidateinterviewfeedbacklistInsert', JSON.stringify(formData), this.httpOptions)
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
