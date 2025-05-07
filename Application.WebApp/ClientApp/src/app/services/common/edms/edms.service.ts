import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EdmsService {

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

  getAllGradeWiseDocCount(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/GradeWiseDocumentMap/getgradewisedocumentcount', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllGradeWiseDocMapList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/GradeWiseDocumentMap/getallgradewisedoclist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  AddEditGradewiseDocMap(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/GradeWiseDocumentMap/addgradewisedocumentmapping', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllGradeWiseDocMapDetailsList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/GradeWiseDocumentMap/getgradewisedocumentdetails', JSON.stringify(formData), this.httpOptions)
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
