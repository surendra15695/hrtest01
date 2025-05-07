import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class VerticalService {

  private apiURL = environment.apiurl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private httpClient: HttpClient) { }

  getAllVertical(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/vertical/getallvertical', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllCAmpusVertical(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/vertical/getallcampusvertical', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllVerticalRM(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/vertical/getallverticalrm', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addFunction(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/function/addfunction', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }  

  addVerticalRM(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/vertical/verticalrminsertupdate', JSON.stringify(formData), this.httpOptions)
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
