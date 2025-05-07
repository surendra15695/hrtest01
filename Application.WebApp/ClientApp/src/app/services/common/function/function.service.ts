import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FunctionService {
  private apiURL = environment.apiurl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private httpClient: HttpClient) { }

  getAllVerticalFunction(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/function/getallverticalfunction', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  searchgetAllVerticalFunction(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/function/candidatesearchgetallfunction', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllCampusVerticalFunction(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/function/getallcampusverticalfunction', JSON.stringify(formData), this.httpOptions)
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
  addCampusFunction(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/function/addcampusfunction', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addVerFunDeptHead(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/function/functiondepartmentheadinsertupdate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }  

  getAllFunctionDepartmentHead(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/function/getallfunctiondepartmenthead', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllVerticalFunctionDepartmentHead(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/function/getallverticalfunctiondepartmenthead', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllLocationFunction(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/function/getalllocationfunction', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllVerticalFunctionHiringManager(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/function/getallverticalfunctionhiringmanager', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addVerticalFunctionHiringManager(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/function/addverticalfunctionhiringmanager', JSON.stringify(formData), this.httpOptions)
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
