import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/reports/report.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare var jQuery: any;

@Component({
  selector: 'app-handholding-report-all',
  templateUrl: './handholding-report-all.component.html',
  styleUrls: ['./handholding-report-all.component.css']
})
export class HandholdingReportAllComponent implements OnInit {
  employeeNo: string = "";
  employeeName: string = "";
  candidatedocumetreportLists: any[] = [];
  constructor(
    private SpinnerService: NgxSpinnerService,
    private reportService: ReportService,
    private excelService: ExcelService,
  ) { }

  ngOnInit() {
    this.fromSubmit();
  }
  fromSubmit() {
    this.candidatedocumetreportLists = [];
    this.SpinnerService.show();
    let obj = {
      EmpNo: this.employeeNo,
      EmpName: this.employeeName
    }
    this.reportService.GetAllHandholdingDataAsReport(obj).subscribe((result) => {
      if (result) {
        this.candidatedocumetreportLists = result;
        this.loadDataTable();
        this.SpinnerService.hide();
        console.log("okkk", result);
      }
      else {
        this.candidatedocumetreportLists = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }
    );
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
          "left": 3
        }
      });
    });
  }
  ExportReport() {
    if (this.candidatedocumetreportLists.length != 0) {
      const updatedArray: any[] = [];
      // this.candidatedocumetreportLists.forEach((e, index) => {
      //   e.serialNo = index + 1;
      // })
      // const updatedArray: any[] = [];
      // this.candidatedocumetreportLists.forEach((obj) => {
      //   const updatedObj: any = {};
      //   for (const key in obj) {
      //     if (Object.prototype.hasOwnProperty.call(obj, key)) {
      //       const updatedKey = this.capitalizeFirstLetter(key);
      //       updatedObj[updatedKey] = obj[key];
      //     }
      //   }
      //   updatedArray.push(updatedObj);
      // })

      for (var i = 0; i < this.candidatedocumetreportLists.length; i++) {
        var data = {
          "Serial No": i + 1,
          "Employee Number": this.candidatedocumetreportLists[i].empNo,
          "Employee Name": this.candidatedocumetreportLists[i].empName,
          "Posting Location": this.candidatedocumetreportLists[i].locationOffice,
          "Allocated AIC": this.candidatedocumetreportLists[i].allocatedUserName,
          "Probation Period": this.candidatedocumetreportLists[i].probation,
          "Job Shadow Review Filled By": this.candidatedocumetreportLists[i].jobshadowFilledBy,
          "Job Shadow Review Approved By": this.candidatedocumetreportLists[i].jobshadowApprover,
          "HR Feed back Filled By": this.candidatedocumetreportLists[i].hrFeedBackFilledBy,
          "Listening Form Filled By": this.candidatedocumetreportLists[i].listeningFromFilledBy,
          "Half Yearly Review Filled By": this.candidatedocumetreportLists[i].halfYearlyReviewFilledBy,
          "Half Yearly Review Apporved By": this.candidatedocumetreportLists[i].halfYearlyApprovedBy,
          "HR Review Filled By": this.candidatedocumetreportLists[i].hrReviewFilledBy,
          "Annual Confirmation Review Filled By": this.candidatedocumetreportLists[i].annualConfReviewFilledBy,
          "Annual Confirmation Review Approved By Stage 1(HOD)": this.candidatedocumetreportLists[i].annualConfReviewStageOne,
          "Annual Confirmation Review Approved By Stage 2(Plant HR Head)": this.candidatedocumetreportLists[i].annualConfReviewStageTwo,
          "Annual Confirmation Review Approved By Stage 3(Plant Head)": this.candidatedocumetreportLists[i].annualConfReviewStageThree
        }
        updatedArray.push(data);
      }
      this.excelService.ExportAsExcelFileForReport(updatedArray, 'Handholding Report');
    }
  }
  capitalizeFirstLetter(str: string): string {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      if (i > 0 && str[i] === str[i].toUpperCase()) {
        result += ' ';
      }
      result += str[i];
    }
    return result.charAt(0).toUpperCase() + result.slice(1);;

  }
  reset() {
    this.employeeNo = "";
    this.employeeName = "";
    this.fromSubmit();
  }

}
