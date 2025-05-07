import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TransferService {
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

  generateTransfer(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/transfer/generatetransfer', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllTransferList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/transfer/gettransferlist', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllTransferListReport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/transfer/gettransferlistReport', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  acknowledgeTransfer(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/transfer/acknowledgetransfer', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  mergeTransfer(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/transfer/mergetransfer', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllVacancyList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/transfer/getvacancylist', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  transferApproveReject(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/transfer/transferapprovereject', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllTransferHoldReleaseList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/transfer/gettransferholdreleaselist', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllTransferHoldReleaseListPlant(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/transfer/gettransferholdreleaselistPlant', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateholdrelease(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/transfer/updateholdrelease', formData, this.httpOptions)
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
