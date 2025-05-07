import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
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

  AzuretableCallOnLogInout(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/user/azuretableCallOnLogInout', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  saveUserMaster(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/user/save', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  saveRoleWiseUser(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/user/addroleiseuser', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllUser(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/user/getalluser', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getLocationwiseAllUser(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/user/getlocationwisealluser', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getUserByUserId(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/user/getloginuser', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  validateUserToSendOTP(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/user/validateusertosendotp', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getUserByUserIdByCosmos(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/user/getloginuserbycosmos', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  //by kuntal
  getForgotUserByUserId(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/user/getforgotloginuser', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  //updatePassword(formData: any): Observable<any> {
  //  return this.httpClient.post<any>(this.apiURL + '/user/updatePassword', JSON.stringify(formData), this.httpOptions)
  //    .pipe(
  //      catchError(this.errorHandler)
  //    )
  //}
  getUserMenu(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/user/getusermenu', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getVerticalRM(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/vertical/getallverticalrm', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getVerticalHiringManager(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/vertical/getallverticalhiringmanager', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getVerticalFunctionHiringManager(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/vertical/getallverticalfunctionhiringmanager', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getallDoctorList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getalldoctorslist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addDoctorList(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/user/adddoctor', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllUserWiseRole(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getalluserwiserole', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  //Anif
  getAllUserWiseRoleWithAutoUserId(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/common/getalluserwiserolewithautouserid', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // Added By Anif on 20-07-2022 for EDMS Link Authorization
  getEDMSLinkAuthorization(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/user/getedmslinkauthorization', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllUserCanAccessEDMS(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/user/getalledmsaccessuserslist', JSON.stringify(formData), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  // addEDMSUsersAccess(formData: any): Observable<any> {
  //   return this.httpClient.post<any>(this.apiURL + '/user/addedmsaccessforusers', JSON.stringify(formData), this.httpOptions)
  //     .pipe(
  //       catchError(this.errorHandler)
  //     )
  // }
  addEDMSUsersAccess(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/user/addedmsaccessforusers', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  changePassword(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/user/changepassword', JSON.stringify(formData), this.httpOptions)
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
