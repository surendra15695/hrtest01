import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateofferdocumentService {
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

  addCandidateOfferDocument(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/documentcollection/insertdocumentcollection', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  CampusaddCandidateOfferDocument(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/documentcollection/campusinsertdocumentcollection', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCandidateOfferDocument(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/documentcollection/getdocumentcollectiondata', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCampusCandidateOfferDocument(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/documentcollection/getcampusdocumentcollectiondata', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCandidateOfferDocumentForAdditional(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/documentcollection/getdocumentcollectiondataforadditional', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCampusCandidateOfferDocumentForAdditional(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/documentcollection/getcampusdocumentcollectiondataforadditional', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateCandidateOfferDocument(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/documentcollection/updatedocumentcollection', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  campusupdateCandidateOfferDocument(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/documentcollection/campusupdatedocumentcollection', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  approveCandidateOfferDocument(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/documentcollection/approvedocumentcollection', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  approveCampusCandidateOfferDocument(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/documentcollection/approvecampusdocumentcollection', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateDocument(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningdetails/updateofferdocument', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
// Added By anifur on 11-11-2022

public downloadFile(formData: any): Observable<HttpEvent<Blob>> {
  return this.httpClient.request(new HttpRequest(
    'POST',
    `${this.apiURL + '/documentcollection/downloadfolder'}`,
    formData,
    {
      //reportProgress: true,
      responseType: 'blob'
    }));
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
