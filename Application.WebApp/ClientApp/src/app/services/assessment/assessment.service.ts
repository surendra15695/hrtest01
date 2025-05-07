import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AssessmentService {

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

  getAllAssessmentData(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/getassessmentdata', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllAssessmentType(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/getassessmenttype', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAssessmentQuestionTypeAll(formData: any){
    return this.httpClient.post<any>(this.apiURL + '/assessment/getassessmentquestiontypeall', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllBatch(formData: any){
    // return this.httpClient.post<any>(this.apiURL + '/common/getallBatch', JSON.stringify(formData), this.httpOptions)
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetAllBatchesPendingReportingVenue', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllBatchForReassign(formData: any){
    // return this.httpClient.post<any>(this.apiURL + '/common/getallBatch', JSON.stringify(formData), this.httpOptions)
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/getallbatchforreassign', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  getInductionTraingingList(formData: any){
    return this.httpClient.post<any>(this.apiURL + '/assessment/getindusctiontraninglist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  saveAssessment(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/assessmentsave', formData, this.httpOptionsFormData)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCandidateList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetAllPendingReportingVenueIndividual', JSON.stringify(formData), this.httpOptions)
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
