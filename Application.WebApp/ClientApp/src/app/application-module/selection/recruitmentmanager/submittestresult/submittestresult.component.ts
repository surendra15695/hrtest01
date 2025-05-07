import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ITestResult, ISearchTestResult, ITestResult1 } from '../../../../interfaces/selection/testschedule.interface'
import { TestscheduleService } from '../../../../services/selection/testschedule/testschedule.service';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { ToastrService } from 'ngx-toastr';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { DecimalPipe } from '@angular/common';
import { ExcelService } from 'src/app/services/excel/excel.service';
declare var jQuery: any;

@Component({
  selector: 'app-submittestresult',
  templateUrl: './submittestresult.component.html',
  styleUrls: ['./submittestresult.component.css']
})
export class SubmittestresultComponent implements OnInit {
  @ViewChild('tDate', { static: false }) tDate: ElementRef;
  @ViewChild('testResult', { static: false }) testResultImport: ElementRef;
  createdBy: number;
  testResultfileToUpload: File = null;
  requisitionDetailId: number;
  //testResults: ITestResult[] = [];
  testResults: any[] = [];
  //testResults1: ITestResult1[] = [];
  testResults1: any[] = [];
  testResults2: any[] = [];
  samplearray:any[] = [];
  searchTestResult: ISearchTestResult = {
    requisitionDetailId: null,
    candidateId: null
  }
  constructor(
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private toasterService: ToastrService,
    private _route: Router,
    private persistance: PersistanceService,
    private testScheduleService: TestscheduleService,
    private excelService: ExcelService,
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    if (this.persistance.get('pagename') != null) {
      if (this.persistance.get('pagename') == "rmrequisitionlist") {
        this.requisitionDetailId = this.persistance.get('paramid');
        this.searchTestResult.requisitionDetailId = this.requisitionDetailId;
        this.getTestReult();

      } else {
        this._route.navigate(['/app/my-action/all-requisition']);
      }
    }
    else {
      this._route.navigate(['/app/my-action/all-requisition']);
    }
  }

  ngOnInit() {
    this.loadDataTable();
  }

  onFileChange(files: FileList) {
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
        // formData.append("RequisitionDetailId", this.requisitionDetailId.toString());
        // console.log(formData);
        // this.testScheduleService.uploadTestResult(formData).subscribe((result) => {
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
    formData.append("RequisitionDetailId", this.requisitionDetailId.toString());
    console.log(formData);
    this.testScheduleService.uploadTestResult(formData).subscribe((result) => {
      console.log(result);
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
    console.log(this.searchTestResult);
    this.testScheduleService.getTestResult(this.searchTestResult).subscribe((result) => {
      if (result) {
        this.testResults = result;
        this.testResults = this.testResults.filter(e => e.testResultStatus == 1);
        this.testResults2 = [];
        result.forEach(element => {
          if (element.testResultStatus == 1) {
            let headerObj1 = {
              RequisitionNo: element.requisitionNo,
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
              UploadStatus: element.uploadStatus,
            }
            this.testResults1.push(headerObj1);
          }
        })

        result.forEach(element => {
          let headerObj1 = {
            RequisitionNo: element.requisitionNo,
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
            UploadStatus: element.uploadStatus,
          }
          this.testResults2.push(headerObj1);
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
        "fixedColumns": {
          "left": 5
        },
      });
    });
  }

  gotoRMRequisitionList() {
    this.persistance.set('pagename', null)
    this.persistance.set('paramid', null)
    this.persistance.set('previouspageparams',this.persistance.get('previouspagefilters'));
    this.persistance.set('tabledisplayStart',this.persistance.get('tabledisplayStart'));
    this._route.navigate(['/app/my-action/all-positions']);
  }

  ExportReport() {
    //this.excelService.ExportAsExcelFile(this.testResults1, 'TestReport');
    this.excelService.ExportAsExcelFile(this.testResults2, 'TestReport');
  }
  SampleFile(){
    this.samplearray=[];
    let sampleobj = {
      AttemptId: 1,
      TestPin: 1,
      AadharNo: '111111111111',
      EmailId: 'sample@gmail.com',
      CandidateName: 'Sample',
      TestCompletionDate: '04/08/2023',
      ScoreObtained: 80,
      Aptitude: 80,
      ReadingExercise: 80,
      WrittenExercise: 80,
      Technical: 80,
      TestResult: 'Test Cleared',
    }
    this.samplearray.push(sampleobj);
    this.excelService.ExportAsCSVFile(this.samplearray, 'Sample File');
  }
}
