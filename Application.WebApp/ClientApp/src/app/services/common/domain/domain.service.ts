import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DomainService {
  private apiURL = environment.apiurl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getAllDomain(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/domain/getalldomain', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addDomain(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/domain/adddomain', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllSubDomain(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/domain/getallsubdomain', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllSubDomainNew(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/domain/getallsubdomainnew', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addSubDomain(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/domain/addsubdomain', JSON.stringify(formData), this.httpOptions)
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
