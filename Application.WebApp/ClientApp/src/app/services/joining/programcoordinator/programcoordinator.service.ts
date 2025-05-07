import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramcoordinatorService {

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

  getAllCandidateAssessment(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/candidateassessmentreleaselistgetall', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllCandidateAssessmentForNewJoiner(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/candidateassessmentreleaselistgetallfornewjoinerlist', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllCandidateFeedbackReleaseListForNewJoiner(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/feedback/candidatefeedbackreleaselistfornewjoiner', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllAssessmentRealeaseBatchWise(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/batchreleaselistgetall', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllinductionFeedbackData(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/feedback/getfeedbackdatacandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAssessmentAssingReleaseDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/assessementassignreleaselist', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAssessmentAssingReReleaseDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/assessementassignrereleaselist', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveAssessmentAssignRelease(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/assementassignreleasesave', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveFeedbackAssignRelease(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/feedbackassignreleasesave', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveAssessmentAssignReleaseForCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/assementassignreleasesaveforcandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveFeedBackAssignReleaseForCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/feedbackassignreleasesaveforcandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  //saveFeedbackAssignReleaseForCandidate(formData: any): Observable<any> {
  //  return this.httpClient.post<any>(this.apiURL + '/assessment/feedbackassignreleasesaveforcandidate', formData, this.httpOptionsFile)
  //    .pipe(
  //      catchError(this.errorHandler)
  //    )
  //}
  getEvaluateAssessmentListBatchwise(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/getevaluateassessmentbatchlist', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getEvaluateFeedbackListBatchwise(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/getevaluatefeedbackbatchlist', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getEvaluateFeedbackRerelease(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/getevaluatefeedbackrerelease', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAssessmentEvaluationDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/getcandidateassessmentevaluation', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAssessmentEvaluationScore(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/getAssessmentEvaluationScore', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveAssessmentEvaluation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/candidateassessmentevaluationsave', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getUploadAssessmentEvaluationDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/candidateevaluationuploadget', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  uploadAssessmentEvaluationData(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/uploadassementtestresult', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveuploadAsseessmentEvaluation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/candidateevaluationuploadsave', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllViewAssessmentData(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/getcandidateassessmentevaluationview', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllBatchwiseAssessmentSummary(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/candidateassessmentsummaryget', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllBatchwiseAssessmentSummaryPending(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/candidateassessmentsummarypendingget', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveBatchAssessmentSummary(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/candidateassessmentsummarysave', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveIndividualAssessmentSummary(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/candidateassessmentsummarysaveIndividual', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getUploadedAssessmentEvaluation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/getuploadedassessmentevaluation', formData, this.httpOptionsFile)
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
