import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IFunctionDepartment, ISearchDepartment } from 'src/app/interfaces/common/department.interface';
import { ISearchFunction, IVerticalFunction } from 'src/app/interfaces/common/function.interface';
import { IGrade, ISearchGrade } from 'src/app/interfaces/common/grade.interface';
import { ILocation, ISearchLocation } from 'src/app/interfaces/common/location.interface';
import { IPositionList, ISearchPositionList } from 'src/app/interfaces/common/position.interface';
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { DepartmentService } from 'src/app/services/common/department/department.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { GradeService } from 'src/app/services/common/grade/grade.service';
import { LocationService } from 'src/app/services/common/location/location.service';
import { PositionService } from 'src/app/services/common/position/position.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { ReportService } from 'src/app/services/reports/report.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
declare var jQuery: any;

@Component({
  selector: 'app-hiringteam-onboardingcompleted-report',
  templateUrl: './hiringteam-onboardingcompleted-report.component.html',
  styleUrls: ['./hiringteam-onboardingcompleted-report.component.css']
})
export class HiringteamOnboardingcompletedReportComponent implements OnInit {
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  searchform: FormGroup;
  saveform: FormGroup;
  //verticals
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
 onBoardingCompletedReportList:any[]=[];

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private locationService: LocationService,
    private SpinnerService: NgxSpinnerService,
    private notificationService: NotificationService,
    private functionService: FunctionService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private gradeService: GradeService,
    private excelService: ExcelService
  ) {
    this.createForm();
    this.getAllVerticals();
   }

  ngOnInit() {
    this.loadDataTable();
    this.loadDatePicker();
    setTimeout(() => {
      this.formSubmit();
    })
  }

  createForm(){
    this.searchform = this.fb.group({
      fullName: [''],
      verticalId: [0],
      fromDate: [''],
      toDate: [''],
    });
  }

  getAllVerticals(){
    this.verticals = [];
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    //this.loadSelectPicker();
   // this.selectedVertical = this.verticals.filter(x => x.verticalId == 0)[0];
  } 
  // formSubmit() {                   // By  Piu on 05-08-2023
  //   this.searchform.patchValue(
  //     {
  //       fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
  //       toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,
  //     });
  //   if((this.fDate.nativeElement.value <= this.tDate.nativeElement.value) || this.tDate.nativeElement.value == ""){
  //     this.SpinnerService.show();
  //     this.reportService.onBoardingCompletedReport(this.searchform.value).subscribe((result) => {
  //       if (result) {
  //         this.onBoardingCompletedReportList = result;
  //         this.loadDataTable();
  //         this.SpinnerService.hide();
  //       }
  //       else {
  //         this.onBoardingCompletedReportList = [];
  //         this.SpinnerService.hide();
  //       }
  //     }, error => {
  //       console.log(error);
  //       this.SpinnerService.hide();
  //     }, () => {
  //       this.loadSelectPicker();
  //       this.SpinnerService.hide();
  //     });
  //   }
  //   else{
  //     this.notificationService.showError("From Date can't be greater than To Date, Please provide correct date.", "Error");
  //   }
  // }

  formSubmit() {                  // By  Piu on 05-08-2023
    var flag = 0
    console.log(this.fDate.nativeElement);
    this.searchform.patchValue(
      {
        fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,
      });
    if (this.fDate.nativeElement.value.length > 0 && this.tDate.nativeElement.value.length > 0) {
      const [fday, fmonth, fyear] = this.fDate.nativeElement.value.split("/");
      const fdate = new Date(fyear, fmonth - 1, fday);
      const [tday, tmonth, tyear] = this.tDate.nativeElement.value.split("/");
      const tdate = new Date(tyear, tmonth - 1, tday);
      if (fdate > tdate) {
        this.notificationService.showError("To Date Can't be less than From Date !! Please provide actual date", "Error");
        flag = 1;
    }
    }
    if (flag == 0) {
      this.SpinnerService.show();
      this.reportService.onBoardingCompletedReport(this.searchform.value).subscribe((result) => {
        if (result) {
          this.onBoardingCompletedReportList = result;
          this.loadDataTable();
          this.SpinnerService.hide();
        }
        else {
          this.onBoardingCompletedReportList = [];
          this.SpinnerService.hide();
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
      }, () => {
        this.loadSelectPicker();
        this.SpinnerService.hide();
      });
    } 
  }
  reset(){
    this.searchform.reset();
    this.searchform.patchValue(
      {
        verticalId: 0
      }
    );
    this.formSubmit();
  }
  exportToExcel() {
    //this.excelService.ExportAsExcelFile(this.onBoardingCompletedReportList, "Report_OnBoardingCompletedReport");
    var htmls = "";
    var uri = 'data:application/vnd.ms-excel;base64,';
    var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
    var base64 = function (s) {
      return window.btoa(unescape(encodeURIComponent(s)))
    };
    var format = function (s, c) {
      return s.replace(/{(\w+)}/g, function (m, p) {
        return c[p];
      })
    };
    htmls = jQuery("#exportTable").html();
    var ctx = {
      worksheet: 'Worksheet',
      table: htmls
    }
    var link = document.createElement("a");
    link.download = "OnBoarding Completed Report.xls";
    link.href = uri + base64(format(template, ctx));
    link.click();
  }

  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }

  loadSelectPicker() {
    setTimeout(() => {
      jQuery('.selectpicker').selectpicker({
        size: 6
      });
      jQuery('.selectpicker').selectpicker('refresh');
    });
  }

  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "fixedColumns": {
          "left": 3
        }
      });
    });
  }

}
