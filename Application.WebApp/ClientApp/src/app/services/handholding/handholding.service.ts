import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HandholdingService {
  private apiURL = environment.apiurl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getAllHandHoldingAllocationList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/getallhandholdingallocationlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getHandHoldingAllocationList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/gethandholdingallocationlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  allocateHandHolding(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/allocatedhandholding', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
//added for bulk download
  public downloadFiles(formData: any): Observable<HttpEvent<Blob>> {
    return this.httpClient.request(new HttpRequest(
      'POST',
      `${this.apiURL + '/handholding/downloadallforms'}`,
      formData,
      {
        responseType: 'blob'
      }));
  }

  getAllAICAllocatedJobShadowList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/getallaicjobshadowcandidatelist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  submitHandHoldingJobShadowReview(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/submithandholdingjobshadowreview', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getJobShadowReviewDetail(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/gethandholdingjobshadowreviewdetail', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllAICAllocatedListenList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/getallaiclistencandidatelist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllAICAllocatedHalfYearlyList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/getallaichalfyearlycandidatelist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllAICAllocatedConfirmationList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/getallaicconfirmationcandidatelist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  submitHandHoldingListenReview(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/submithandholdinglistenreview', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getListenReviewDetail(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/gethandholdinglistenreviewdetail', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllHandHoldingReviewQuestions(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/gethandholdingreviewquestions', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  GetCandidateDetailsConfReview(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/getcanddatedetailsforconfreview', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  submitHandHoldingHalfYearlyReview(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/submithandholdinghalfyearlyreview', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllHandHoldingHalfYearlyReviewDetail(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/gethandholdinghalfyearlyreviewdetail', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  submitHandHoldingConfirmationReview(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/submithandholdingconfirmationreview', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllHandHoldingConfirmationReviewDetail(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/gethandholdingconfirmationreviewdetail', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  submitHandHoldingHRFeedBack(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/submithandholdinghrfeedback', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getHRFeedbackDetail(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/gethandholdinghrfeedbackdetail', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  submitHandHoldingHRReview(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/submithandholdinghrreview', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getHRReviewDetail(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/gethandholdinghrreviewdetail', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getApproverJobShadowList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/gethandholdingapproverjobshadowlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllHandholdingApproverPendingList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/gethandholdingapproverpendinglist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllHandholdingConfirmationForm(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/gethandholdingconfirmationform', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllHandholdingApproverAllocatedList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/gethandholdingapproverallocatedlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getApproverListenList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/gethandholdingapproverlistenlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  submitApproverAction(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/submitapproveraction', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getApproverHalfYearlyList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/gethandholdingapproverhalfyearlylist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getApproverConfirmationList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/handholding/gethandholdingapproverconfirmationlist', JSON.stringify(formData), this.httpOptions)
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
