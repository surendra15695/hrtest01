import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PositionService {
  private apiURL = environment.apiurl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAllVerticalPosition(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/position/getallverticalposition', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  GetFamilyRelation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/venue/GetFamilyRelation', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllPositionGrade(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/position/getallpositiongrade', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  
  getAllGradePosition(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/position/getallgradeposition', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllGradePositionNew(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/position/getallgradepositionNew', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllVerticalPositionGrade(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/position/getallverticalpositiongrade', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllPositionMaster(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/position/getallpositionmasterlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addPosition(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/position/savepositionmaster', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addVerticalPositionList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/position/savevericalwiseposition', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllverticalPositionList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/position/getallverticalwisepositionlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllverticalPositionForMapping(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/position/getallverticalpositionformapping', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addGradePosition(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/position/savegradeposition', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllFunctionPositionList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/position/getallfunctionwisepositionlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addFunctionPosition(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/position/savefunctionwiseposition', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllFunctionPosition(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/position/getallfunctionposition', JSON.stringify(formData), this.httpOptions)
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
