import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class VenueService {
  private apiURL = environment.apiurl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getAllVenue(formData: any): Observable<any> {
    console.log(JSON.stringify(formData));
    return this.httpClient.post<any>(this.apiURL + '/venue/getallvenue', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllInductionVenue(formData: any): Observable<any> {
    console.log(JSON.stringify(formData));
    return this.httpClient.post<any>(this.apiURL + '/venue/getallinductionvenue', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllInductionVenueWithExternal(formData: any): Observable<any> {
    console.log(JSON.stringify(formData));
    return this.httpClient.post<any>(this.apiURL + '/venue/getallinductionvenuewithexternal', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  //External Induction venue-
  getAllExternalInductionVenue(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/venue/GetAllExternalInductionVenue', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

addExternalInductionVenue(formData: any): Observable<any>
{
  return this.httpClient.post<any>(this.apiURL + '/venue/ExternalInductionVenueInsertUpdate', formData, this.httpOptions)
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
