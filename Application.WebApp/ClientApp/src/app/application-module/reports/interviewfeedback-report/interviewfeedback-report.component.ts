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
  selector: 'app-interviewfeedback-report',
  templateUrl: './interviewfeedback-report.component.html',
  styleUrls: ['./interviewfeedback-report.component.css']
})
export class InterviewfeedbackReportComponent implements OnInit {

  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  //@ViewChild('modeOfInterview', { static: false }) modeOfInterview: ElementRef;
  searchform: FormGroup;
  saveform: FormGroup;
  //verticals
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  //location
  locations: ILocation[] = [];
  selectedLocation: ILocation;
  selectedLocationCode: string = "";
  selectedLocationOffice: string = "";
  searchLocation: ISearchLocation =
    {
      locationId: null,
      verticalId: null,
      locationCode: null,
      locationNo: null,
      isActive: true
    };
  locationId: number;
  //function
  functions: IVerticalFunction[] = [];
  selectedFunction: IVerticalFunction;
  searchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  functionId: number;
  functionName: string;


  interviewFeedbackList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private locationService: LocationService,
    private SpinnerService: NgxSpinnerService,
    private functionService: FunctionService,
    private excelService: ExcelService,
    private notificationService: NotificationService,
  ) {
    this.createForm();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllFunction();
  }
  ngOnInit() {
    this.getdata();
    this.loadDataTable();
    this.loadDatePicker();
  }
  createForm() {
    this.searchform = this.fb.group({
      requisitionNo: [''],
      candidateNo: [''],
      verticalId: [0],
      locationId: [0],
      functionId: [0],
      fromDate: [''],
      toDate: [''],
    });
  }
  //vertical
  getAllVerticals() {
    this.verticals = [];
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    this.loadSelectPicker();
    this.selectedVertical = this.verticals.filter(x => x.verticalId == 0)[0];
  }
  changeVertical() {
    var verticalId = this.searchform.get("verticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0];
    this.getAllLocation();
    this.getAllFunction();
  }
  //locations
  getAllLocation() {
    this.locations = [];
    this.searchLocation.verticalId = this.selectedVertical.verticalId;
    this.locationService.getAllLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        this.locations = result;
        this.locations.splice(0, 0, {
          locationId: 0,
          verticalId: 0,
          locationNo: "All",
          locationCode: "",
          locationOffice: "All",
          isActive: true,
          createdBy: 0
        })
      }
      else {
        this.locations = [];
        this.locations.splice(0, 0, {
          locationId: 0,
          verticalId: 0,
          locationNo: "All",
          locationCode: "",
          locationOffice: "All",
          isActive: true,
          createdBy: 0
        })
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }
  //function
  getAllFunction() {
    this.functions = [];
    this.searchFunction.verticalId = this.selectedVertical.verticalId;
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;
        this.functions.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          isActive: true,
          verticalName: ""
        })
      }
      else {
        this.functions = [];
        this.functions.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          isActive: true,
          verticalName: ""
        })
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
      this.SpinnerService.hide();
    });
    this.selectedFunction = this.functions.filter(x => x.functionId == 0)[0];
  }
  getdata()
  {
    this.searchform.patchValue(
      {
        verticalId: this.selectedVertical.verticalId,
        fromDate: "" ,
        toDate: "" ,
      });
      this.SpinnerService.show();
      this.reportService.interviewFeedbackReport(this.searchform.value).subscribe((result) => {
        if (result) {
          console.log("okk",result);
          this.interviewFeedbackList = result;
          this.loadDataTable();
          this.SpinnerService.hide();
        }
        else {
          this.interviewFeedbackList = [];
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
  formSubmit() {
    this.interviewFeedbackList=[];
    var flag = 0;
    this.searchform.patchValue(
      {
        verticalId: this.selectedVertical.verticalId,
        fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,
      });
    if (this.fDate.nativeElement.value.length > 0 && this.tDate.nativeElement.value.length > 0) {
      const [fDay, fMonth, fYear] = this.fDate.nativeElement.value.split("/");
      const fDate = new Date(fYear, fMonth - 1, fDay);
      const [tDay, tMonth, tYear] = this.tDate.nativeElement.value.split("/");
      const tDate = new Date(tYear, tMonth - 1, tDay);
      if (fDate > tDate) {
        this.notificationService.showError("To Date Cann't be less than from From Date !! Please provide actual date", "Error");
        flag = 1;
      }
    }
    if(flag == 0){
      this.SpinnerService.show();
      this.reportService.interviewFeedbackReport(this.searchform.value).subscribe((result) => {
        if (result) {
          this.interviewFeedbackList = result;
          console.log("hmm",result)
          this.loadDataTable();
          this.SpinnerService.hide();
        }
        else {
          this.interviewFeedbackList = [];
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
  reset() {
    this.searchform.reset();
    this.searchform.patchValue({
      verticalId: 0,
      locationId: 0,
      functionId: 0,
    })
    this.changeVertical();
    this.formSubmit();
  }
  exportToExcel() {
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
    link.download = "Interview Feedback Report.xls";
    link.href = uri + base64(format(template, ctx));
    link.click();
  }
  loadSelectPicker() {
    setTimeout(() => {
      jQuery('.selectpicker').selectpicker({
        size: 6
      });
      jQuery('.selectpicker').selectpicker('refresh');
    });
  }
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
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
        "fixedColumns":{
          "left": 4
        }
      });
    });
  }
}
