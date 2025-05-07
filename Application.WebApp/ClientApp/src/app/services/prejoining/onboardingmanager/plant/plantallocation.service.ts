import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantallocationService {

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



  getPlantAllocationCandidateList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/getAllForCandidateListOnBoarding', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCallbackRequestCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/getallcallbackrequestcandidate', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllOnboardingCorordinator(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallonboardingcoordinator', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  sendToAllocate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/OnBoardingCoordinatorAllocation', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllModeOfJoining(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/ModeOfJoining/GetAllModeOfJoining', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getJoiningDateDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/getAllCandidateJoiningDate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateJoinigDate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/CandidateJoiningDateInsert', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  //Share with Inductors

  shareWithInductors(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/plansharewithinductor', formData, this.httpOptions)
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
