import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

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
  // Assessment List
  getCandidateAllAssesmentData(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/getcandidateassessmentdata', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // Assessment Question Answer Details
  getCandidateAssessmentQuestionAnswer(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/getassessmentdatacandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveAssessmentQuestionAnswer(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/assessmentsavecandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // Medical Reimbursement
  getCandidateMedicalReimbursement(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningreimbursement/getmedicalreimbursemtcandidatelist', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCandidateMedicalReimbursementDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningreimbursement/getmedicalreimbursemtcandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getCandidateMedicalReimbursementDetailsApprove(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningreimbursement/getmedicalreimbursemtcandidatewithaprove', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveMedicalReimbursement(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningreimbursement/savemedicalreimbursemtcandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // Travel Reimbursement
  getCandidateTravelReimbursement(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningreimbursement/gettravelreimbursementlistcandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCandidateTravelReimbursementDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningreimbursement/gettravelreimbursementcandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveTravelreimbursement(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningreimbursement/savetravelreimbursementcandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // Notice Period Buyout Reimbursement
  getCandidateNoticePeriodBuyoutReimbursement(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningreimbursement/getnoticeperiodreimbursemtcandidatelist', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCandidateNoticePeriodBuyoutReimbursementDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningreimbursement/getnoticeperiodreimbursemtcandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveNoticePeriodBuyoutReimbursement(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningreimbursement/savenoticeperiodreimbursemtcandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  // Induction Feedback
  getAllCandidateInductionFeedback(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/feedback/getcandidatewisefeedbackdata', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCandidateFeedbackDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/feedback/getfeedbackdatacandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveCandidateFeedback(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/feedback/feedbacksavecandidate', formData, this.httpOptionsFile)
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
