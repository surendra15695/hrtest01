import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RequisitionService {
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

  generateRequisition(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/generaterequisition', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  generateRequisitionWithDummy(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/generaterequisitionwithdummy', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  checkIOM(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/checkiom', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllRequisition(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/getallrequisition', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  ddlGetAllRequisition(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/ddlrequsitionlistgetAll', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllDummyRequisition(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/getalldummyrequisition', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllRequisitionForHM(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/getallrequisitionforhm', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateHoldPositionForRequisition(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/holdupdateforrequisition', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllStageListForRequisitionReleaseCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/getreleasecandidatestagetorequisitiontag', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveRequisitionReleaseCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/assignedreleasedcandidatetorequisition', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  newCandidateRequisitionMapInsert(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/UnMappedCandidateRequsitionInsertUpdate', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  GetDetailsRequisitions(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/getDetailsRequisition', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  GetCandidatetaggedRequisitions(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/getCandidatetaggedRequisition', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllRequisitionHistory(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/getallrequisitionhistory', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  allocateRequisitionToRM(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/allocaterequisitiontorm', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  allocateSourceChannel(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/allocaterequisitiontosourcechannel', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getRequisitionSourceChannelDetailList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/getrequisitionsourcechanneldetaillist', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  requisitionApproveReject(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/requisitionapprovereject', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCandidateHigringAction(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/getcandidatehiringstatus', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }//argg
  getCampusCandidateHigringAction(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/getcampuscandidatehiringstatus', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }//argg
  updateRequisitionCandidateHiringStatus(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/updaterequisitioncandidatehiringstatus', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateRequisitionCandidateHiringStatusForCancel(formData: any): Observable<any> { //Piu
    return this.httpClient.post<any>(this.apiURL + '/requisition/updaterequisitioncandidatehiringstatusforcancel', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateRequisitionCVCandidateTag(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/updateRequisitionCVCandidateTag', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateRequisitionCVCandidateTagNew(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/updateRequisitionCVCandidateTagNew', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  DeleteCandidates(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/deletecandidates', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  CandidatesUpdateProfile(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/candidatesupdateprofilemail', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateRequisitionCandidateRejectDeclineCallBack(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/updaterequisitioncandidaterejectdeclinecallback', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  discontinueCandidateFromBatch(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/discontinuecandidatefrombatch', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  discontinueIndividualCandidateCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/discontinueindividualcandidate', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // Callback insert
  insertCallbackRequest(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/insertcallbackrequest', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  approveRejectCallbackRequest(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/approverejectcallbackrequest', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getSourceChannelJobList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/getsourcechanneljoblist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getRequisitionHoldRelease(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/getrequisitionholdrelease', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  uploadNaukriProfile(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/uploadnaukricandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateholdrelease(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/updateholdrelease', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllMergeRequisitionDetailList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/getallmergerequisitiondetaillist', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  deleteBeforeRequisition(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/requisition/deletebeforerequisition', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  deleteBeforeTransfer(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/transfer/deletetransfer', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  deleteBeforeSuccessionPlan(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/successionplan/deletesuccessionplan', JSON.stringify(formData), this.httpOptions)
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
