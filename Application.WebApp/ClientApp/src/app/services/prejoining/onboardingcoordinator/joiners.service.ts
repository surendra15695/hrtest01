import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JoinersService {

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
  getAlljoinersList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/OnBoardingCoordinatorPendingJoiningType', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  confirmJoiningType(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/CandidateJoiningTypeDetailsInsert', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllPendingScheduleCandidateListBatchWise(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetBatchWiseOnBoardingPendingShedule', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllScheduledBatchWise(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetAllBatchesPendingReportingVenue', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllPendingScheduleCandidateListIndividual(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetAllIndividualOnBoardingPendingSchedule', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllScheduledIndividually(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetAllPendingReportingVenueIndividual', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllBatchWiseCandidateDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetAllOnBoardingBatchPendingScheduleDetails', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCandidateTravelReimbursementDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/joiningreimbursement/gettravelreimbursementcandidate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  moveCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/InsertMovingCandidateJoiningType', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  // Induction Schedule
  getAllTrainers(formData: any): Observable<any> { // need to add API Name
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllVenue(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetAllReportingVenue', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllJoinigDocument(formData: any): Observable<any> {  // API name to be add
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllTemplate(formData: any): Observable<any> { // need to add API Name
    return this.httpClient.post<any>(this.apiURL + '/emailtemplate/getallemailtemplate', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllRoleWiseUser(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallrolewiseuser', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllInductionMode(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/GetAllInductionMode', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  scheduleInduction(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/InsertUpdateCandidateInductionSchedule', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  reassignCandidateNewScheduleInduction(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/ReassignCandidateNewInductionScheduleInsert', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  reassignindividualCandidateNewScheduleInduction(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/ReassignIndividualCandidateNewInductionScheduleInsert', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  //  Details
  getScheduleInductionDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetAllCandidateInductionSchedule', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // Reporting venue 
  addReportingVenue(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/InsertUpdateCandidateReportingVenue', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getExistedReportingVenue(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetBatchOrCandidateFromOnBoardingCoordinatorAddReportingVenue', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getScheduleInduction(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetAllCandidateInductionSchedule', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getTrainingInChargeDetails(formData: any): Observable<any> {  //Traing Incharge Name (Arnab)    
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/Gettraininginchargedetails', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  // Accommodation schedule

  getAllAccommodationDetailsByCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetAllCandidateOnBoardingCoordinateBookAccommodation', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllAccommodationDetailsByBatch(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetAllBatchOnBoardingCoordinateBookAccommodation', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllInductionDetailsForBatchReassignCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/getallinductiondetailsforbatchforreaasigncandidate', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllInductionDetailsForIndividualReassignCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/getallinductiondetailsforindividualforreaasigncandidate', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  insertUpdateAccommodation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/InsertUpdateCandidateOnBoardingCoordinatorAccomodation', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  trainingReassignForBatchCanndidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/candidatereassigntraining', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  trainingReassignForIndividualCanndidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/individualcandidatereassigntraining', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  //Edit Accommodation for Individual
  getAllDetailsForEditAccommodation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetAllEditAccomodationInductionDetails', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  DeleteCandidateInductionScheduleDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/deletecandidateinductionscheduledetail', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getBatchIdfromCandidateId(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/Getbatchidfromcandidateid', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  //Edit Accommodation for Batch
  getAllDetailsForEditAccommodationForBatch(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetAllEditAccomodationInductionDetailsForBatch', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  //View Accommodation for Batch
  getAllBatchDetailsForViewAccommodation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetAllViewAccomodationInductionDetailsForBatch', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAccommodationdetailsByCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetEditAccomodationForEditing', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateCandidateAccommodationDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/InsertUpdateTrainingInchargeAccomodation', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  // Share induction details with candidate
  shareInductionDetailsWithcandidate(formData: any): Observable<any> {
    //return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/InsertShareWithCandidate', JSON.stringify(formData), this.httpOptions)
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/InsertShareWithCandidatewithattachment', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // Joining Check list

  getOCAlljoiningCheckList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetAllCandidateJoiningCheckForOnBoardingCoordinator', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getRMAlljoiningCheckList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetOnBoardingDocumentVerification', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  GetAdditionalDocumentList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/getadditionaldocumentlist', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateShareWithCandidateAdditionalDocumentOH(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/updatesharewithcandidate', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  saveOCJoiningChecklist(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/Candidateonboardingjoiningchecklistsave', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveRMJoiningChecklist(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/candidatermJoiningchecklistsave', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  discontinueCandidates(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/discontinuecandidates', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // Assign Program Coordinator
  assignProgramCoordinator(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/inductionprogrammecoordinatiorassignsave', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAssignedProgramCoordinatorDetails(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/inductionprogrammecoordinatiorassignedget', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // Delete Schedule Details
  deleteInductionSchedule(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/deleteinductionschedule', formData, this.httpOptions)
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
