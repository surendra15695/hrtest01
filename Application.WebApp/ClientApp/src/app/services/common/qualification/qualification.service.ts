import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class QualificationService {
  private apiURL = environment.apiurl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getAllQualification(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/qualification/getallqualification', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllQualificationAllType(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/qualification/getaqualificationall', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllQualificationActive(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/qualification/getallqualificationActive', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addQualification(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/qualification/addqualification', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }  
    
  getAllQualificationType(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/qualification/getallqualificationType', JSON.stringify(formData), this.httpOptions)
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
