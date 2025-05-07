import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class StreamService {
  private apiURL = environment.apiurl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getAllStream(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/stream/getallstream', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllStreamList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/stream/getallstreamlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addStream(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/stream/addstream', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addQualificationCourseStream(formData: any){
    return this.httpClient.post<any>(this.apiURL + '/stream/addqualificationcoursestream', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllQualificationCourseStream(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/stream/getallqualificationcoursestream', JSON.stringify(formData), this.httpOptions)
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
