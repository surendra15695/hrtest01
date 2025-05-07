import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private apiURL = environment.apiurl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  httpOptionsFile = {
    headers: new HttpHeaders()
  }

  constructor(private httpClient: HttpClient) { }

  getAllStatus(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/common/getallstatus')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllStatusForROResignation(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/common/getallstatusROResignation')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllAge(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/common/getallage')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllExperience(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/common/getallexperience')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllGender(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/gender/getallgender', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllPrefix(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/prefix/getallprefix', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllState(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/common/getallstate', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllYears(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/common/getallyears', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllMonths(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/common/getallmonths', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllBloodGroup(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallbloodgroup', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllReligion(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallreligion', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addReligion(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/religioninsertupdate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllCaste(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallcaste', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addCaste(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/casteinsertupdate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllExternalTrainer(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getAllExternalTrainer', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addExternalTrainers(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/externaltrainersinsertupdate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllCountryList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallcountrylist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addCountryList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/countrylistinsertupdate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllRelationship(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallrelationship', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllFamilyRelationship(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallfamilyrelationship', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addRelationship(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/relationshipinsertupdate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addFamilyRelationship(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/familyrelationshipinsertupdate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllNationality(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallnationality', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addNationality(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/natioanalityinsertupdate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllQualificationUniversityBoard(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallqulificationuniversityboard', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addUniversityBoard(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/qulificationuniversityboardinsertupdate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllQualificationClassGradeDivision(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallqulificationclassgaradedivision', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllPreviousSalsryAccounthead(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallsalaryaccountheadprevious', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllOccupationList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getalloccupationlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addOccupation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/occupationinsertupdate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllAttachmentDocumentType(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallattachmentdocumenttype', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getRoleWiseDocument(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getrolewisedocument', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addAttachmentDocType(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/attachmentdocumentTypeinsertupdate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  GetAllAttachmentDocumentParticular(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallattachmentdocumentparticular', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addAttachmentDocParticular(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/attachmentdocumentparticularinsertupdate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllAttachmentDocumentName(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallattachmentdocumentname', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getFilteredAttachmentDocumentName(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getfilteredattachmentdocumentname', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  addAttachmentDocName(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/attachmentdocumentnameinsertupdate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllDownloadPDFHandBook(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getalldownloadpdfhandbook', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  } //arg

  getAllAttachmentPDF(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallpdfattachment', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addAttachmentPDF(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/attachmentpdfinsertupdate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllDocumentStatus(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallapprovallist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addUserRole(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/userroleinsert', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllUserRole(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getalluserrole', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getuserrolehandholding(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getuserrolehandholding', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getRoleWiseUser(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallrolewiseuser', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllEmployeeForSignature(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallemployeeforsignature', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  insertUpdateSignature(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/insertupdatesignature', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllSignature(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallsignature', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getRoleWiseUserhandhold(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallrolewiseuserhandhold', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getRoleLocationWiseUser(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getrolelocationwiseuser', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getRoleWiseUserReassignCandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallrolewiseuserreassigncandidate', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllTicByLocation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallticbylocation', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getalllocationwisearea(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getalllocationwisearea', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getallfunctionwiselocation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getfunctionwiselocation', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllBatch(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallBatch', JSON.stringify(formData), this.httpOptions)
      // return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetAllBatchesPendingReportingVenue', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllVerticalrm(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallverticalrm', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllMenuAccess(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallmenuaccess', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addMenuAccess(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/menuaccessinsert', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllTrainingTittle(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/assessment/getindusctiontraninglist', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllUserBasedonRole(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallrolewiseuser', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getDownloadFile(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/downloadhtmlfile', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllHiringStatus(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/common/getallhiringstatus')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllRoleMenuAccess(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getalluserrolemenuaccess', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getuserrolefunction(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/GetRoleWiseUsrVertFunc', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getuserrolelocationfunction(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/GetRoleWiseUsrLocaFunc', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllModeOfjoining(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/ModeOfJoining/GetAllModeOfJoining', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addModeOfJoining(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/ModeOfJoining/ModeofJoiningInsertUpdate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllInductionVenue(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/venue/getallinductionvenue', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addInductionVenue(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/venue/InductionVenueInsertUpdate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllReportingVenue(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/venue/GetAllReportingVenue', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllInterviewVenue(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/venue/GetAllInterviewVenue', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllTestVenue(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/venue/GetAllTestVenue', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addReportingVenue(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/venue/ReportingVenueInsertUpdate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addInterviewVenue(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/venue/InterviewVenueInsertUpdate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addtestvenue(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/venue/TestVenueInsertUpdate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addInsertUpdateRoleWiseUsrVertFunc(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/InsertupdateRoleWiseUsrVertFunc', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addInsertUpdateRoleWiseUsrLoctFunc(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/InsertupdateRoleWiseUsrLoctFunc', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  //   //External Induction venue-
  //   getAllExternalInductionVenue(formData: any): Observable<any> {
  //     return this.httpClient.post<any>(this.apiURL + '/venue/GetAllExternalInductionVenue', formData, this.httpOptionsFile)
  //       .pipe(
  //         catchError(this.errorHandler)
  //       )
  //   }

  // addExternalInductionVenue(formData: any): Observable<any>
  // {
  //   return this.httpClient.post<any>(this.apiURL + '/venue/ExternalInductionVenueInsertUpdate', formData, this.httpOptionsFile)
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }

  getAllInductionMode(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/GetAllInductionMode', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addInductionMode(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/InsertUpdateInductionMode', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllLocationWiseTrainingIncharge(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/venue/GetAllLocationWiseTrainingInCharge', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addLocationWiseTrainingIncharge(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/venue/LocationWiseTrainingInChargeInsertUpdate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllMasterState(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getstatelist', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllStateByCountry(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getstatelistbycountry', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addState(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/addstate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addCountryStateLocationMapping(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/addcountrystatelocationmap', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCountryStateLocationMapping(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getcountrystatelocationmap', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllSelectionGuide(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/selectionguide/getallselectionGuide', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllSelectionGuideInterview(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/interview/getallinterview', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addSelectionGuide(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/selectionguide/addselectionguide', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllVendor(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/vendor/getallvendor', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addVendor(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/vendor/addvendor', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllEmailTemplateType(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/emailtemplate/getallemailtemplatetype', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllEmailTemplate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/emailtemplate/getallemailtemplate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveEmailTemplate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/emailtemplate/addemailtemplate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  GetHiringStatus(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/gethiringstatus', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllClaimStatusList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallclaimstatus', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  // Added By anifur pon 23-06-2022
  getAllOccupation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getalloccupationlist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateDocumentRole(formData: any): Observable<any> {
    debugger
    return this.httpClient.post<any>(this.apiURL + '/common/updateDocumentRole', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // Anif on 25-11-2022
  getAllTrainingTittleList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getalltrainingtittle', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  insertUpdateTrainingTittle(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/trainingtittleinsertupdate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  //added by Amartya on 22-12-2022
  getAllCostCenterList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getcostcenterdata', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  insertUpdateCostCenter(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/insertupdatecostcentermap', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllFatherOccupation(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallfatheroccupation', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getDashBoardValues(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getdashboardValuesOfRm', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllFlexiReportHeader(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getallflexireportheader', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addFlexiReportHeader(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/addflexireportheader', JSON.stringify(formData), this.httpOptions)
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
  //Ankita
  OnboardingEmailStatus(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/CandidateOnboardingEmailStatus', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  GetAllEmailTypeToSendMail(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/common/GetAllEmailTypeToSendMail', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  GetAllEmailsByTypeID(data): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/GetAllEmailsByTypeID' , data, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  SendMailForSelectedItems(data): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/SendMailForSelectedItems', data, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  SendMailForUpdatedSchedule(data): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/SendMailForUpdatedSchedule', data, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  SharewithCandidateWelcomeMail(data): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/ShareWithCandidateSendMail', data, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  SendBookAccommodationMail(data): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/BookAccommodationEmail', data, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  SendEmailNaukriCandidates(data): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/SendEmailNaukriCandidates', data, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
}
