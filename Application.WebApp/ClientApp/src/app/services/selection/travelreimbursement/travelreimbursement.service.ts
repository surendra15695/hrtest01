import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TravelreimbursementService {
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

  getCandidateTestTravelReimbursementList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/testschedule/getcandidatetesttravelreimbursementlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCampusCandidateTestTravelReimbursementList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/testschedule/getcampuscandidatetesttravelreimbursementlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getTestTravelReimbursementDetailData(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/testschedule/gettesttravelreimbursement', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCampusTestTravelReimbursementDetailData(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/testschedule/getcampustesttravelreimbursement', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addTestTravelReimbursement(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/testschedule/addtesttravelreimbursement', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  CampusaddTestTravelReimbursement(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/testschedule/campusaddtesttravelreimbursement', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getRMTestTravelReimbursementDetailList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/testschedule/getrmtesttravelreimbursementlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCampusTestTravelReimbursementDetailList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/testschedule/getcampustesttravelreimbursementlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateTestTravelReimbursementStatus(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/testschedule/updatetesttravelreimbursementstatus', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getTestTravelClarificationList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/testschedule/gettesttravelclarificationlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  //Test

  getCandidateTravelReimbursementList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/travelreimbursement/getcandidatetravelreimbursementlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCampusCandidateInterviewTravelReimbursementList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/travelreimbursement/getCampuscandidateinterviewtravelreimbursementlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getTravelReimbursementDetailData(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/travelreimbursement/gettravelreimbursement', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCampusInterviewTravelReimbursementDetailData(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/travelreimbursement/getcampusinterviewtravelreimbursement', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addTravelReimbursement(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/travelreimbursement/addtravelreimbursement', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  CampusaddTravelReimbursement(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/travelreimbursement/campusaddtravelreimbursement', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getRMTravelReimbursementDetailList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/travelreimbursement/getrmtravelreimbursementlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCampusTravelReimbursementDetailList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/travelreimbursement/getcampustravelreimbursementlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateTravelReimbursementStatus(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/travelreimbursement/updatetravelreimbursementstatus', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  AssignInterviewTravel(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/travelreimbursement/assigninterviewtravel', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  AssignTestTravel(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/travelreimbursement/assigntesttravel', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getTravelClarificationList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/travelreimbursement/gettravelclarificationlist', JSON.stringify(formData), this.httpOptions)
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
