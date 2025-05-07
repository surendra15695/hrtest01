import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ITestResult, ISearchTestResult } from '../../../interfaces/selection/testschedule.interface'
import { TestscheduleService } from '../../../services/selection/testschedule/testschedule.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { ToastrService } from 'ngx-toastr';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { DecimalPipe } from '@angular/common';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { EmployeeService } from 'src/app/services/employee/employee/employee.service';
import { NgxSpinnerService } from "ngx-spinner";
import { EmployeeDetails } from 'src/app/interfaces/common/common.interface';
declare var jQuery: any;

@Component({
  selector: 'app-uploademployeemaster',
  templateUrl: './uploademployeemaster.component.html',
  styleUrls: ['./uploademployeemaster.component.css']
})
export class UploademployeemasterComponent implements OnInit {
  @ViewChild('testResult', { static: false }) masterResultImport: ElementRef;
  createdBy: number;
  sampletestarray: any[] = [];
  masterFileToUpload: File = null;
  requisitionDetailId: number;
  employeeDetails: any[] = [];
  allEmployeeExportDetails: EmployeeDetails[] = []
  isDownloadVisible: boolean = false;
  constructor(
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private toasterService: ToastrService,
    private _route: Router, private SpinnerService: NgxSpinnerService,
    private persistance: PersistanceService,
    private testScheduleService: TestscheduleService,
    private excelService: ExcelService,
    private employeeService: EmployeeService
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
  }
  onFileChange(files: FileList) {
    console.log(files);
    //this.SpinnerService.show();
    if (files.length > 0) {
      if (files[0].size > 2097152) {
        this.notificationService.showError("File should be less than 2MB!", "Error");
        //this.masterResultImport.nativeElement.innerText = "Choose file";
        this.masterFileToUpload = null;
        // this.SpinnerService.hide();
      } else {
        this.masterResultImport.nativeElement.innerText = files[0].name;
        this.masterFileToUpload = files.item(0);
        // const formData = new FormData();
        // formData.append("File", this.masterFileToUpload);
        // formData.append("CreatedBy", this.createdBy.toString());        
        // console.log(formData);
        // this.employeeService.uploadEmployeeMaster(formData).subscribe((result) => {
        //   console.log(result);
        //   if (result.SuccessFlag == 0) {
        //     this.notificationService.showError(result.msg, "Error");
        //     this.SpinnerService.hide();
        //   }
        //   else {
        //     this.notificationService.showSuccess(result.msg, "Success");
        //     this.masterResultImport.nativeElement.innerText = "Choose file";
        //     this.masterFileToUpload = null;
        //     this.SpinnerService.hide();
        //   }
        // }, error => {
        //   this.SpinnerService.hide();
        //   console.log(error);
        //   this.notificationService.showError("Something went wrong", "Error")
        // });
      }
    }
    else {
      this.masterResultImport.nativeElement.innerText = "Choose file";
      this.masterFileToUpload = null;
      this.SpinnerService.hide();
    }
  }

  onUpload() {
    this.SpinnerService.show();
    const formData = new FormData();
    formData.append("File", this.masterFileToUpload);

    if (this.isValid()) {
      this.employeeService.uploadEmployeeMaster(formData).subscribe((result) => {
        // console.log(result);

        if (result.returnMessage[0].SuccessFlag == 0) {
          this.notificationService.showError(result.returnMessage[0].msg, "Error");
          this.SpinnerService.hide();
        }
        else {
          this.notificationService.showSuccess(result.returnMessage[0].msg, "Success");
          this.masterResultImport.nativeElement.innerText = "Choose file";
          this.employeeDetails = result.employeeDatas;

          result.employeeDatas != null ? this.isDownloadVisible = true : this.isDownloadVisible = false;

          result.employeeDatas.forEach(element => {
            let headerObj = {
              "Personnel Number": element.personnel_Number,
              "Formatted Name of Employee or Applicant": element.formatted_Name_of_Employee_or_Applicant,
              "Organizational Unit": element.organizational_Unit,
              "Position ": element.position,
              "Employee Group": element.employee_Group,
              "Employee Subgroup": element.employee_Subgroup,
              "Personnel Subarea": element.personnel_Subarea,
              "Cost center text": element.cost_center_text,
              "Cost Center": element.cost_Center,
              "Date of Birth": element.date_of_Birth == "01.01.1900" ? "" : element.date_of_Birth,
              "Entry Date": element.entry_Date == "01.01.1900" ? "" : element.entry_Date,
              "Leaving date": element.leaving_date == "01.01.1900" ? "" : element.leaving_date,
              "Mail ID": element.mail_ID,
              "Aadhar No": element.aadhar_No,
              "Update Status": element.statusId == 1 ? "Success" : "Error",
              "Update Status Remarks": element.errorMsg.length > 1 ? element.errorMsg.slice(0, -2) : ""
            }
            this.allEmployeeExportDetails.push(headerObj);
          })

          this.masterFileToUpload = null;
          this.SpinnerService.hide();
        }
      }, error => {
        this.SpinnerService.hide();
        console.log(error);
        this.notificationService.showError("Something went wrong", "Error")
      });
    }
  }
  SampleFile() {
    this.sampletestarray=[];
    let Sampleobj = {
      'Personnel Number': '123456',
      'Formatted Name of Employee or Applicant': 'Sample Test',
      'Organizational Unit': 'Quality Assurance',
      'Position': 'Engineer - Electrical',
      'Employee Group': 'Trainee',
      'Employee Subgroup': 'MA1',
      'Personnel Subarea': 'Dahej',
      'Cost center text': 'Gujarat Project Cent',
      'Cost Center': '123456',
      'Date of Birth': '10.09.1982',
      'Entry Date': '21.12.2022',
      'Leaving date': '21.12.2063',
      'Mail ID': 'sample@gmail.com',
      'Aadhar No': '111111111111'
    }
    this.sampletestarray.push(Sampleobj)
    this.excelService.ExportAsExcelFile(this.sampletestarray, 'Sample File');
  }
  isValid(): boolean {

    if (this.masterFileToUpload == null) {
      this.notificationService.showError("Please attatch a file", "Error");
      this.SpinnerService.hide();
      return false;
    }
    if (this.masterFileToUpload.type != ("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || "application/vnd.ms-excel")) {
      this.notificationService.showError("Please attatch a Valid Excel file", "Error");
      this.SpinnerService.hide();
      return false;
    }
    else {
      return true;
    }
  }
  ExportReport() {
    this.excelService.ExportAsExcelFile(this.allEmployeeExportDetails, 'Employee Update Status Report');
  }

}
