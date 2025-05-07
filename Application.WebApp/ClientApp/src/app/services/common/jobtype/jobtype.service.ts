import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class JobtypeService {
  private apiURL = environment.apiurl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private httpClient: HttpClient) { }

  addJobType(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/jobtype/addjobtype', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllJobType(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/jobtype/getalljobtype', JSON.stringify(formData), this.httpOptions)
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
