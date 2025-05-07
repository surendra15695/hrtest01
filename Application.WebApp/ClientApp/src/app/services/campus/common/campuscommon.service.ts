import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampuscommonService {
  private apiURL = environment.apiurl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  addCampusCourse(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campuscommon/addcampuscourse', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllCampusCourse(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campuscommon/getcampuscourse', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addCampusStream(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campuscommon/addcampusstream', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllCampusStream(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campuscommon/getcampusstream', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addCampusCourseStream(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campuscommon/addcampuscoursestream', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllCampusCourseStream(): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campuscommon/getcampuscoursestream', null, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addCampusYear(formData: any): Observable<any> {
    console.log(JSON.stringify(formData));
    return this.httpClient.post<any>(this.apiURL + '/campuscommon/addcampusyear', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllCampusYear(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campuscommon/getallcampusyear', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllCampusCollegeCategory(): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campuscommon/getallcampuscollegecategory', null, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addCampusCollege(formData: any): Observable<any> {
    console.log(JSON.stringify(formData));
    return this.httpClient.post<any>(this.apiURL + '/campuscommon/addcampuscollege', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllCampusCollege(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campuscommon/getallcampuscollege', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCampusFunctionwiseRequisition(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campuscommon/getcampusfunctionwiserequisition', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getOffCampusFunctionwiseRequisition(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campuscommon/getoffcampusfunctionwiserequisition', JSON.stringify(formData), this.httpOptions)
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
