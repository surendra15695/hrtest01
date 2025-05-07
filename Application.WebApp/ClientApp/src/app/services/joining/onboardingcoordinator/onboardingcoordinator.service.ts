import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OnboardingcoordinatorService {

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

  getCandidateMedicalReimbursement(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningreimbursement/getmedicalreimbursementapprovallist', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveMedicalClaimStatus(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningreimbursement/savemedicalreimbursementapproval', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  public downloadFile(formData: any): Observable<HttpEvent<Blob>> {
    return this.httpClient.request(new HttpRequest(
      'POST',
      `${this.apiURL + '/joiningreimbursement/downloadFormsformedicalreimForall'}`,
      formData,
      {
        responseType: 'blob'
      }));
  }

  public downloadFileForPreEmployeeMedical(formData: any): Observable<HttpEvent<Blob>> {
    return this.httpClient.request(new HttpRequest(
      'POST',
      `${this.apiURL + '/joiningreimbursement/downloadFormsmedicalreim'}`,
      formData,
      {
        responseType: 'blob'
      }));
  }
  public downloadFileForPreEmployeeTravel(formData: any): Observable<HttpEvent<Blob>> {
    return this.httpClient.request(new HttpRequest(
      'POST',
      `${this.apiURL + '/joiningreimbursement/downloadFormstravel'}`,
      formData,
      {
        responseType: 'blob'
      }));
  }

  public downloadFileForNoticePeriod(formData: any): Observable<HttpEvent<Blob>> {
    return this.httpClient.request(new HttpRequest(
      'POST',
      `${this.apiURL + '/joiningreimbursement/downloadFormsnoticeperiodbuyout'}`,
      formData,
      {
        responseType: 'blob'
      }));
  }
  // Travel

  getCandidateTravelReimbursement(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningreimbursement/gettravelreimbursementapprovallist', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveTravelClaimStatus(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningreimbursement/savetravelreimbursementapproval', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  //Notice period

  getCandidateNoticePeriodReimbursement(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningreimbursement/getcandidatenoticeperiodbuyoutapprovallist', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveNoticePeriodBuyoutClaimStatus(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningreimbursement/savecandidatenoticeperiodbuyoutapproval', formData, this.httpOptionsFile)
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
