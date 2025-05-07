import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SalaryService {
  private apiURL = environment.apiurl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getAllSalary(formData: any): Observable<any> {
    console.log(formData);
    return this.httpClient.post<any>(this.apiURL + '/salary/getallsalary', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  InsertUpdateSalary(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/salary/insertupdatesalary', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // Sayandeep
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
