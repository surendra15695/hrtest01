import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaystructureService {

  private apiURL = environment.apiurl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  httpOptionsFile = {
    headers: new HttpHeaders(
      
    )
  }
  constructor(private httpClient: HttpClient) { }

  getAllSalaryType(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/paystructure/getallsalarytype', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllSalaryAccountHead(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/paystructure/getallsalaryaccounthead', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addSalaryAccountHead(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/paystructure/savesalaryaccounthead', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }  

  addSalaryTemplate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/paystructure/insertsalarytemplate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  } 

  getAllSalaryTemplate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/paystructure/getsalarytemplate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getCalculatedSalaryTemplate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/paystructure/calculatepaystructure', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllSalaryTemplateList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/paystructure/getsalarytemplatelist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllSalaryTemplateFormula(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/paystructure/getsalarytemplateformula', JSON.stringify(formData), this.httpOptions)
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
