import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { ReportService } from 'src/app/services/reports/report.service';
import { IGrade, ISearchGrade } from 'src/app/interfaces/common/grade.interface';
import { GradeService } from 'src/app/services/common/grade/grade.service';

declare var jQuery: any;

@Component({
  selector: 'app-salarystatistics-report',
  templateUrl: './salarystatistics-report.component.html',
  styleUrls: ['./salarystatistics-report.component.css']
})
export class SalarystatisticsReportComponent implements OnInit {
  searchform: FormGroup;
  saveform: FormGroup;
  //grade

  grades: IGrade[] = [];
  selectedGrade: IGrade;
  searchGrade: ISearchGrade = {
    gradeId: null,
    isActive: true
  }

  gradeId: number;
  gradeName: string;

  salaryStatisticsList: any[] = [];
  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private SpinnerService: NgxSpinnerService,
    private excelService: ExcelService,
    private gradeService: GradeService,
  ) {
    this.createForm();
    this.getAllGrades();
  }
  ngOnInit() {
    this.formSubmit();
    this.loadDataTable();
  }
  createForm() {
    this.searchform = this.fb.group({
      gradeId: [0]
    });
  }
  //grade

  getAllGrades() {
    this.gradeService.getAllGrade(this.searchGrade).subscribe((response: any) => {
      if (response) {
        this.grades = response;
        this.grades.splice(0, 0, {
          gradeId: 0,
          gradeName: "All",
          isActive: true,
          createdBy: 0
        })
      }
      else {
        this.grades = [];
        this.grades.splice(0, 0, {
          gradeId: 0,
          gradeName: "All",
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

  formSubmit() {
      this.SpinnerService.show();
    this.reportService.salaryStatisticsReport(this.searchform.value).subscribe((result) => {
        if (result) {
          this.salaryStatisticsList = result;
          this.loadDataTable();
          this.SpinnerService.hide();
          console.log("list", this.salaryStatisticsList)
        }
        else {
          this.salaryStatisticsList = [];
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
  reset() {
    this.searchform.reset();
    this.searchform.patchValue({
      gradeId: 0
    })
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
    link.download = "SalaryStatisticsReport.xls";
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
  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "fixedColumn": {
          "left": 4
        },
      });
    });
  }
}
