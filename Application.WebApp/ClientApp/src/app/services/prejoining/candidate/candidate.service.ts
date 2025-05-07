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


  uploadMedicalDocument(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/medicaldocument/SaveMedicalDocumentCollection', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getUploadedMedicalDocument(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/medicaldocument/getmedicaldocumentcollectiondata', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getUploadedJoiningForm(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/getprejoiningdocumentcollectiondata', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  uploadJoiningForm(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/prejoiningdocumentcollectiondatasave', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // Welcome Acknowledgement

  getCandidateWelcomeAcknowledgementDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetAllCandidateWelcomeAcknowledgementStatus', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveCandidateAcknowledgement(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/InsertShareWithCandidate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveWelcomeAcknowledgement(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/InsertShareWithCandidate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // Induction Plan
  getCandidateInductionPlan(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetCandidateInductionPlan', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // Joining form 

  getCandidateJoiningFormDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/getcandidatejoiningform', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveJoiningForm(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/savecandidatejoiningform', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  // Added by anif on 16-11-2022
  getAllCandidateJoinigFormDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/getcandidatejoiningformpdf', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  insertUpdateSignature(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/inserrtupdatesignature', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getSignatureCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/getsignaturecandidate', formData, this.httpOptionsFile)
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
