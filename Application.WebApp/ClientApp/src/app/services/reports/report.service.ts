import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ReportService {

  requisitionTypeId: number;

  private apiURL = environment.apiurl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  httpOptionsFormData = {
    headers: new HttpHeaders()
  }
  
  constructor(private httpClient: HttpClient) { }

  getSourceChannelMonWiseRpt(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/report/getsourcechannelmonthwisereport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  requisitionreport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/report/requisitionreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  requisitionhistoryreport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/report/requisitionhistoryreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  resignationreport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/report/resignationreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  reportnoticeperiodcostsaving(formData: any): Observable<any> {

    return this.httpClient.post<any>(this.apiURL + '/mrfreports/noticeperiodCostsaving', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

//arg
  successionplanreport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/report/successionplanreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  transferreport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/report/transferreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  sapVarianceReport(formData: any): Observable<any> { //Arnab
    return this.httpClient.post<any>(this.apiURL + '/report/sapvariancereport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }

  vacancyReport(formData: any): Observable<any> { //Arnab
    return this.httpClient.post<any>(this.apiURL + '/report/vacancyreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  candidateAttritionReport(formData: any):Observable<any>{  //Arnab
    return this.httpClient.post<any>(this.apiURL + '/report/candidateattritionreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  consPaymentTrackerReport(formData: any):Observable<any>{  //Arnab
    return this.httpClient.post<any>(this.apiURL + '/report/conspaymenttrackerreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  recruitmentCostReport(formData: any):Observable<any>{  //Arnab
    return this.httpClient.post<any>(this.apiURL + '/report/recruitmentcostreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  hrOpsAttritionReport(formData: any):Observable<any>{  //Arnab
    return this.httpClient.post<any>(this.apiURL + '/report/hropsattritionreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  campusCandidateReport(formData: any):Observable<any>{  //Arnab
    return this.httpClient.post<any>(this.apiURL + '/report/campuscandidatereport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  interviewFeedbackReport(formData: any): Observable<any> {  //Piu
    return this.httpClient.post<any>(this.apiURL + '/report/reportinterviewfeedback', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  newJoinersRecruitmentModeReport(formData: any): Observable<any> {  //Piu
    return this.httpClient.post<any>(this.apiURL + '/report/newjoinersrecruitmentmode', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  newJoinersOverallVerticalWiseReport(formData: any): Observable<any> {  //Piu
    return this.httpClient.post<any>(this.apiURL + '/report/newjoinersoverallverticalwise', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  salaryStatisticsReport(formData: any): Observable<any> { //Piu
    return this.httpClient.post<any>(this.apiURL + '/report/salarystatisticsreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  newjoinersexternalrecruitmentReport(formData: any): Observable<any> { //Piu
    return this.httpClient.post<any>(this.apiURL + '/report/newjoinersexternalrecruitmentreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  newJoinersRecruitmentActivityReport(formData: any): Observable<any> { //Piu
    return this.httpClient.post<any>(this.apiURL + '/report/newjoinersrecruitmentactivityreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  newJoinersVerticalWisePositionReport(formData: any):Observable<any>{  //Arnab
    return this.httpClient.post<any>(this.apiURL + '/report/newjoinersverticalwisepositionreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  preemployeementReport(formData: any):Observable<any>{  //Arnab
    return this.httpClient.post<any>(this.apiURL + '/report/preemploymentreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  resignationReport(formData: any):Observable<any>{  //Arnab
    return this.httpClient.post<any>(this.apiURL + '/report/resignationreportlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  newJoinerReport(formData: any):Observable<any>{  //Arnab
    return this.httpClient.post<any>(this.apiURL + '/report/newJoinersReportList', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  newJoinerReportBatch(formData: any):Observable<any>{  //Arnab
    return this.httpClient.post<any>(this.apiURL + '/report/newJoinersReportListBatch', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  newJoinerReportBatchWiseCandidate(formData: any):Observable<any>{  //Arnab
    return this.httpClient.post<any>(this.apiURL + '/report/newJoinersReportListBatchwiseCandidate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  interviewPanelReport(formData: any):Observable<any>{  //Arnab
    return this.httpClient.post<any>(this.apiURL + '/report/interviewpanelreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  hiringManagerReport(formData: any):Observable<any>{  //Arnab
    return this.httpClient.post<any>(this.apiURL + '/report/hiringmanagerreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  onBoardingCompletedReport(formData: any):Observable<any>{  //Arnab
    return this.httpClient.post<any>(this.apiURL + '/report/onboardingcompletedreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  noticePeriodReport(formData: any):Observable<any>{  //Arnab
    return this.httpClient.post<any>(this.apiURL + '/mrfreports/noticeperiod', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  getAllFlexiReportList(formData: any): Observable<any> {  //Piu
    return this.httpClient.post<any>(this.apiURL + '/report/getallflexireport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllCandidateFlexiReportList(formData: any): Observable<any> {  
    return this.httpClient.post<any>(this.apiURL + '/report/getAllCandidateFlexiReport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllReqFlexiReportList(formData: any): Observable<any> { 
    return this.httpClient.post<any>(this.apiURL + '/report/getAllReqFlexiReport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  bgvStatusReport(formData: any):Observable<any>{  //Arnab
    return this.httpClient.post<any>(this.apiURL + '/report/bgvreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  consultantReport(formData: any):Observable<any>{  //Arnab
    return this.httpClient.post<any>(this.apiURL + '/report/consultantreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  recruitmentFunnelReport(formData: any):Observable<any>{  //Arnab
    return this.httpClient.post<any>(this.apiURL + '/report/receruitmentfunnelreport',JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  functionalAttritionHeadReport(formData: any):Observable<any>{  
    return this.httpClient.post<any>(this.apiURL + '/report/functionalattritionhead', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  requisitioncandidatereport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/report/requisitioncandidatereport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  candidatetrackerreport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/report/candidatetrackerreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  employeesalaryreport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/report/employeesalaryreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  leadtimereport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/report/leadtimereport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  intervieworganisedreport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/report/intervieworganisedreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  candidatemanagementreport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/report/candidatemanagementreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  reportrequesterfunctionalheadrequisition(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/report/reportrequesterfunctionalheadrequisition', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  functionalheadNameForAll(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/report/functionalheadnameforall', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  reportrequesterfunctionalheadofferedcandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/report/reportrequesterfunctionalheadofferedcandidate', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  hropsresignationreport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/mrfreports/hropsresignation', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }
  documentstatusreport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/mrfreports/documentstatus', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }


  functionalHeadAttritionReport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/report/reportfunctionalheadattrition', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  vendorcandidateReport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/mrfreports/vendorcandidate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  candidatemastergetAll(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/mrfreports/candidatemasterforallreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  getRelocation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/mrfreports/relocation', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  recruitmentCostSavingReport(formData: any):Observable<any>{  //Arnab
    return this.httpClient.post<any>(this.apiURL + '/mrfreports/recruitmentcostsavingreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  //Piu
  travelreimbursementreport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/mrfreports/travelreimbursement', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  //Piu
  interviewcalendarreport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/mrfreports/interviewcalender', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }
  //Piu
  recruiterperformancereport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/report/recruiterperformancereport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }
//Piu
  employeesalaryReportLists(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/mrfreports/employeesalary', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }
  comapnydoctorreport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/report/companydoctorreport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }
  //Piu
  getAllConsultantPerformance(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/report/consultantperformancereport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }
  recruitmentManagerRequisitionReport(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/report/reportrecruitmentmanagerrequisition', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  } 
  //ankita
  candidatedocumentReport(formData: any): Observable<any> 
  {
    return this.httpClient.post<any>(this.apiURL + '/report/CandidateDocumentReport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  } 
  inductionReportindividual(formData: any):Observable<any>{  
    return this.httpClient.post<any>(this.apiURL + '/report/GetAllcandidateIndividualtab', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  inductionReportBatch(formData: any):Observable<any>{  
    return this.httpClient.post<any>(this.apiURL + '/report/GetAllforbatchtab', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  getAllBatchWiseCandidateDetails(formData: any):Observable<any>{  
    return this.httpClient.post<any>(this.apiURL + '/report/getAllBatchWiseCandidateDetails', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  getScheduleInductionDetails(formData: any):Observable<any>{  
    return this.httpClient.post<any>(this.apiURL + '/report/getAllInductionScheduleDetails', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  reimbursementReport(formData: any):Observable<any>{  
    return this.httpClient.post<any>(this.apiURL + '/report/getAllReimbursementdetailsReport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }


  inductionfeedbackReportIndividual(formData: any):Observable<any>
  {  
    return this.httpClient.post<any>(this.apiURL + '/report/getAllInductionFeedbackDetails', JSON.stringify(formData), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    

  GetAllHandholdingDataAsReport(formData: any):Observable<any>{  
    return this.httpClient.post<any>(this.apiURL + '/report/GetAllHandholdingDataAsReport', JSON.stringify(formData), this.httpOptions)

      .pipe(
        catchError(this.errorHandler)
    )
  }


  inductionfeedbackReportBatch(formData: any):Observable<any>{ 
    return this.httpClient.post<any>(this.apiURL + '/report/getAllInductionFeedbackDetails', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  viewfeedback(formData: any):Observable<any>{ 
    return this.httpClient.post<any>(this.apiURL + '/report/getcandidatewiseviewfeedback', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }

  viewCandidate(formData: any):Observable<any>{  
    return this.httpClient.post<any>(this.apiURL + '/report/getAllViewCandidateFeedbackReport', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
    )
  }
  //ankita


  
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
