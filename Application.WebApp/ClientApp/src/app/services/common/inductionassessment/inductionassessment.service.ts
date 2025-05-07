import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InductionassessmentService {

  private apiURL = environment.apiurl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  // Induction Assessment List
  getAllInductionAssessment(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/getassessmentlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  inductionAssessmentAssign(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/assessmentassignsave', JSON.stringify(formData), this.httpOptions)
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
  deleteAssessment(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/deleteAssessment', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  // Induction Template from admin
  saveInductionTemplate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/inductiontemplateinsert', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllInductionTemplate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallinductiontemplate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllInductionTemplateDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallinductiontemplatedetails', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllBatchWiseCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getbatchwisecandidate', JSON.stringify(formData), this.httpOptions)
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
