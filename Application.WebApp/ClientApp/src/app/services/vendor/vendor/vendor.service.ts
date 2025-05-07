import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class VendorService {
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
  getCurrentJob(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/vendor/getcurrentjob', JSON.stringify(formData), this.httpOptions)
        .pipe(
          catchError(this.errorHandler)
        )
    }
  getAllVendor(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/vendor/getallvendor', formData, this.httpOptions)
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

  getAllVendorJoinedcandidate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/vendor/getvendorjoinedcandidate', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllVendorRaiseCreditnote(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/vendor/getAllVendorRaiseCreditnote', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  uploadVendorInvoice(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/vendor/uploadvendorinvoce', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  vendorInvoiceAction(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/vendor/vendorinvoiceaction', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllVendorClarificationRemarks(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/vendor/getvendorinvoiceclarification', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  uploadVendorInvoiceUpdate(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/vendor/uploadvendorinvoiceupdate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllProcessInvoiceList(formData: any): Observable<any> {     //Arnab
     return this.httpClient.post<any>(this.apiURL + '/vendor/getallprocessinvoicecandidatelistforrm', formData, this.httpOptions)
     .pipe(
       catchError(this.errorHandler)
      )
  }
  getAllProcessInvoiceListForRO(formData: any): Observable<any> {     //Arnab
    return this.httpClient.post<any>(this.apiURL + '/vendor/getallprocessinvoicecandidatelistforro', formData, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
     )
 }
  getAllProcessCreditNoteList(formData: any): Observable<any> {     //Arnab
    return this.httpClient.post<any>(this.apiURL + '/vendor/getallprocesscreditnotecandidatelistforrm', formData, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
     )
  }
  getAllProcessCreditNoteListForRO(formData: any): Observable<any> {     //Arnab
    return this.httpClient.post<any>(this.apiURL + '/vendor/getallprocesscreditnotecandidatelistforro', formData, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
     )
  }
  addInvoiceForVendor(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/vendor/invoiceinsertupdateforvendor', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addCreditNoteForVendor(formData: any): Observable<any> {        //Arnab
    return this.httpClient.post<any>(this.apiURL + '/vendor/creditnoteinsertupdateforvendor', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addCreditNoteClarificationForVendor(formData: any): Observable<any> {        //Arnab
    return this.httpClient.post<any>(this.apiURL + '/vendor/vendorCreditNoteClarificationinsertupdate', formData, this.httpOptionsFile)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateReleaseInvoice(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/vendor/releaseinvoiceinsertupdate', formData, this.httpOptionsFile)
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
