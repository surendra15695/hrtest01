import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentmanagerService {

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

  getAllEmployeeManagementList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidateemployee/getcandidateemployeelistall', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveEnableNoticePeriodBuyout(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidateemployee/savenoticeperiodbuyoutenable', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveDisableNoticePeriodBuyout(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidateemployee/savenoticeperiodbuyoutdisable', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveRelocationReimbursement(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidateemployee/saverelocationreimbursementenable', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveRelocationReimbursementDisable(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/candidateemployee/saverelocationreimbursementdisable', formData, this.httpOptionsFile)
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
