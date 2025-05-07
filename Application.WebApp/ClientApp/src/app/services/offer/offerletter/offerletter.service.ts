import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfferletterService {
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

  getOfferLetter(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/ofeerletter/getofferletter', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCampusOfferLetter(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/ofeerletter/getcampusofferletter', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  acceptRejectOffer(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/ofeerletter/updateofferletter', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  acceptRejectCampusOffer(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/ofeerletter/updatecampusofferletter', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // getSalaryFitment(formData: any): Observable<any> {
  //   return this.httpClient.post<any>(this.apiURL + '/salaryfitment/getsalaryfitmentData', formData, this.httpOptionsFile)
  //     .pipe(
  //       catchError(this.errorHandler)
  //     )
  // }

  sendOfferLetter(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/ofeerletter/insertofferletter', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  campussendOfferLetter(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/ofeerletter/campusinsertofferletter', formData, this.httpOptionsFile)
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
