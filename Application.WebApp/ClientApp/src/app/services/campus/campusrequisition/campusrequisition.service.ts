import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampusrequisitionService {
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

  createCampusrequisition(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/createcampusrequisition', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  createOffCampusrequisition(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/createoffcampusrequisition', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllCampusrequisition(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getallcampusrequisition', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllOffCampusrequisition(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getalloffcampusrequisition', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllCampusLink(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getallcampuslink', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCandidateRegistrationDetail(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getcampusregistrationdetails', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCandidateRegistrationRemarks(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getcampusregistrationremarks', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  createCampusLink(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/createcampuslink', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateCampusLink(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/updatecampuslink', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  shareCampusLinkToCaollege(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/sharecampuslinktocollege', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllCampusCollegeSharedLink(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getallsharedcampuslinktocollege', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllCampusRequisitionTitle(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getallcampusrequisitiontitle', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  saveCampusCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campuscandidateregistration/savecampuscandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveOffCampusCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campuscandidateregistration/saveoffcampuscandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  editCampusCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campuscandidateregistration/editcampuscandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCampusCandidateDataForExcel(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campuscandidateregistration/getallcanditatedetailsforexcel', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllCampusCandidateList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getcampuscandidatelist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllCampusHiringStatus(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getcampushiringstatus', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateCampusCandidateHiringStatus(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/updatecampushiringstatus', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  createCampusTestSchedule(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/createcampustestschedule', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  createPrePlacementTalkSchedule(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/createPreplacemetSchedule', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCampusTestScheduleDetail(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getcampustestscheduledetail', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  uploadCampusTestResult(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/uploadtestresult', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getCampusTestResult(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getcampustestresult', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  createCampusInterviewSchedule(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/createcampusinterviewschedule', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getCampusInterviewScheduleDetail(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getcampusinterviewscheduledetail', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getCampusCampusCandidateVerticalFunction(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getcampuscandidateverticalfunction', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateCampusCampusCandidateVerticalFunction(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/updatecampuscandidateverticalfunction', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateOffCampusCampusCandidateVerticalFunction(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/updateoffcampuscandidateverticalfunction', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getCampusVerticalFunctionRequisition(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getcampusverticalfunctionrequisition', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getRequisitionListForRequisitionMapping(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getallrequisitionlistforcampusrequisitionmap', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  umapCampusCandidateRequisition(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/mapcampuscandidaterequisition', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getCampusCampusData(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getallcampusrequisitiondata', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateCampusCampusData(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/updatecampusrequisitiondata', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getCampusCampusProfileData(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getcampusrequisitionprofiledata', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  enableDisableCampusLink(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/enabledisablecampuslink', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllCampusTestScheduleDetail(formData: any): Observable<any>{
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getallcampustestscheduledetail', JSON.stringify(formData), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getAllCampusTalkScheduleDetail(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getallcampustalkscheduledetail', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getInterviewScheduleDetailForCandidate(formData: any): Observable<any>{
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getinterviewscheduledetailforcandidate', JSON.stringify(formData), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  CampusgetInterviewScheduleDetailForCandidate(formData: any): Observable<any>{
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/campusgetinterviewscheduledetailforcandidate', JSON.stringify(formData), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

//arg
  updateCampusCandidateInstitute(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/updatecampuscandidateinstitute', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateCampusCandidateProfile(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/updatecampuscandidateprofile', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateCandidateRejctDecline(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/updatecandidaterejectdecline', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateCandidateAcknowledged(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/updatecandidateacknowledged', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  cancelPreplacementTalk(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/cancelpreplacementtalk', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  cancelTestSchedule(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/canceltestschedule', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  cancelInterview(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/cancelinterview', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCandidateDetailsForStageGate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getcandidatedetailsforstagegate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getStageGateAssesmentComp(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getstagegateassesmentcomp', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }//campusrequisition.service.ts

  ViewCanidateListByRequisition(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/viewcanidatelistbyrequisition', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateselectioncomunication(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/updateselectioncomunication', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  CandidatewisseelectionData(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/candidatewisseelectiondata', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  UpdateCandidateDeatilsForAcknowledge(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/campusCandidateAcknowledgeMent', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllOffCampusLink(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/getalloffcampuslink', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  createOffCampusLink(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/createoffcampuslink', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  InsertUpdateMapRequistion(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/campusrequisition/insertupdatemaprequistion', JSON.stringify(formData), this.httpOptions)
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
