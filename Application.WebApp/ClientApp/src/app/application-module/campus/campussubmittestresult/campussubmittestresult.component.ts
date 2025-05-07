import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ICampusTestResult, ICampusTestResult1, ISearchCampusTestResult } from '../../../interfaces/campus/campusrequisition.interface'
import { CampusrequisitionService } from '../../../services/campus/campusrequisition/campusrequisition.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { ToastrService } from 'ngx-toastr';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { DecimalPipe } from '@angular/common';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { resolveTxt } from 'dns';
import { element } from 'protractor';
declare var jQuery: any;

@Component({
  selector: 'app-campussubmittestresult',
  templateUrl: './campussubmittestresult.component.html',
  styleUrls: ['./campussubmittestresult.component.css']
})
export class CampussubmittestresultComponent implements OnInit {
  @ViewChild('tDate', { static: false }) tDate: ElementRef;
  @ViewChild('testResult', { static: false }) testResultImport: ElementRef;
  createdBy: number;
  testResultfileToUpload: File = null;
  campusLinkId: number;
  testResults: ICampusTestResult[] = [];
  testResults1: ICampusTestResult1[] = [];
  sampletestarray: any[] = [];
  searchCampusTestResult: ISearchCampusTestResult = {
    requisitionDetailId: null,
    candidateId: null,
    campusLinkId: null
  }
  //invalidFileName: boolean = false;
  constructor(
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private toasterService: ToastrService,
    private _route: Router,
    private persistance: PersistanceService,
    private campusService: CampusrequisitionService,
    private excelService: ExcelService,
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    if (this.persistance.get('pagename') != null) {
      if (this.persistance.get('pagename') == "talentpool") {
        this.campusLinkId = this.persistance.get('paramid');
        this.searchCampusTestResult.campusLinkId = this.campusLinkId;
        this.getTestReult();

      } else {
        this._route.navigate(['/app/campus/requsition-link']);
      }
    }
    else {
      this._route.navigate(['/app/app/campus/requsition-link']);
    }
  }

  ngOnInit() {
    this.loadDataTable();
  }

  onFileChange(files: FileList) {

    // this.invalidFileName = false;
    // var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    // const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    // specialChars.forEach(element => {
    //   if (filenameforValidationCheck.includes(element)) {
    //     this.invalidFileName = true;
    //   }
    // })
    // if (this.invalidFileName) {
    //   this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
    //   this.testResultImport.nativeElement.innerText = "Choose file";
    //   this.testResultfileToUpload = null;
    //   return;
    // }
    if (files.length > 0) {
      if (files[0].size > 2097152) {
        this.notificationService.showError("File should be less than 2MB!", "Error");
        //this.testResultImport.nativeElement.innerText = "Choose file";
        this.testResultfileToUpload = null;
      } else {
        this.testResultImport.nativeElement.innerText = files[0].name;
        this.testResultfileToUpload = files.item(0);
        // const formData = new FormData();
        // formData.append("TestResultFile", this.testResultfileToUpload);
        // formData.append("CreatedBy", this.createdBy.toString());
        // formData.append("CampusLinkId", this.campusLinkId.toString());
        // console.log(formData);
        // this.campusService.uploadCampusTestResult(formData).subscribe((result) => {
        //   console.log(result);
        //   if (result.status == 0) {
        //     this.notificationService.showError(result.msg, "Error");
        //   }
        //   else {
        //     this.notificationService.showSuccess(result.msg, "Success");
        //     //this.testResultImport.nativeElement.innerText = "Choose file";
        //     this.testResultfileToUpload = null;
        //     this.getTestReult();
        //   }
        // }, error => {
        //   console.log(error);
        //   this.notificationService.showError("Something went wrong", "Error")
        // });
      }
    }
    else {
      this.testResultImport.nativeElement.innerText = "Choose file";
      this.testResultfileToUpload = null;
    }
  }
  onupload() {
    const formData = new FormData();
    formData.append("TestResultFile", this.testResultfileToUpload);
    formData.append("CreatedBy", this.createdBy.toString());
    formData.append("CampusLinkId", this.campusLinkId.toString());
    this.campusService.uploadCampusTestResult(formData).subscribe((result) => {
      if (result.status == 0) {
        this.notificationService.showError(result.msg, "Error");
      }
      else {
        this.notificationService.showSuccess(result.msg, "Success");
        //this.testResultImport.nativeElement.innerText = "Choose file";
        this.testResultfileToUpload = null;
        this.getTestReult();
      }
    }, error => {
      console.log(error);
      this.notificationService.showError("Something went wrong", "Error")
    });
  }
  getTestReult() {
    this.campusService.getCampusTestResult(this.searchCampusTestResult).subscribe((result) => {
      if (result) {
        this.testResults = result;
        result.forEach(element => {
          let headerObj = {
            AttemptId: element.attemptId,
            TestPin: element.testPin,
            CandidateNo: element.candidateNo,
            FullName: element.fullName,
            EmailId: element.emailId,
            AadharNo: element.aadharNo,
            ContactNo: element.contactNo,
            DOB: element.dob,
            TestCompletionDate: element.testCompletionDate,
            ScoreObtained: element.scoreObtained,
            Aptitude: element.apptitude,
            ReadingExercise: element.readingExercise,
            WrittenExercise: element.writtenExercise,
            Technical: element.technical,
            TestResult: element.testResult,
          }
          this.testResults1.push(headerObj);
        })
      }
      else {
        this.testResults = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadDataTable();
    });
  }

  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "order": []
      });
    });
  }

  gotoRMRequisitionList() {
    this.persistance.set('pagename', null)
    this.persistance.set('paramid', null)
    this._route.navigate(['/app/campus/requsition-link']);
  }

  ExportReport() {
    this.excelService.ExportAsExcelFile(this.testResults1, 'TestReport');
  }
  SampleFile() {
    this.sampletestarray = [];
    let Sampleobj = {
      AttemptId: '1',
      TestPin: '1',
      AadharNo: '111111111111',
      EmailId: 'sample@gmail.com',
      CandidateName: 'Sample',
      TestCompletionDate: '01-04-2023',
      ScoreObtained: 80,
      Apptitude: 80,
      ReadingExercise: 80,
      WrittenExercise: 80,
      Technical: 80,
      TestResult: 'Test Cleared'
    }
    this.sampletestarray.push(Sampleobj)
    this.excelService.ExportAsCSVFile(this.sampletestarray, 'Sample File');
  }
}
