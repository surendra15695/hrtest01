import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiURL = environment.apiurl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
  getTestfile(blobName:string , containername :string): Observable<any> {
    return this.httpClient.get((this.apiURL + '/location/TestDocumentDownliad?blobName=' + blobName + "&CloudStorageAccountname=" + containername),{observe:'response', responseType: 'blob' })
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllLocation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/location/getalllocation', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllVerticalLocation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/location/getallverticallocation', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllUnmappedLocation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/location/getallunmappedlocation', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addLocation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/location/addlocation', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllLocationFunction(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/location/getallLocationwisefunction', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllFunctionwiseLocation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/location/getallfunctionwiselocation', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addLocationFunction(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/location/locationwisefunctionsave', JSON.stringify(formData), this.httpOptions)
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
