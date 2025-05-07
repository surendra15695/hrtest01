import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class JobdescriptionService {
  private apiURL = environment.apiurl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  httpOptionsFile = {
    headers: new HttpHeaders()
  }

  constructor(private httpClient: HttpClient) { }

  getAllJobDescription(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/jobdescription/getalljobdescription', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllFuncJobDescription(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/jobdescription/getAllFuncJobDescription', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllJobDescriptionDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/jobdescription/getalljobdescriptiondetails', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  saveJobDescription(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/jobdescription/savejobdescription', formData, this.httpOptionsFile)
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
