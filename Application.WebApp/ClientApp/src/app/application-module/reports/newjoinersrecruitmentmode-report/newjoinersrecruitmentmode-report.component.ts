import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { ReportService } from 'src/app/services/reports/report.service';

declare var jQuery: any;

@Component({
  selector: 'app-newjoinersrecruitmentmode-report',
  templateUrl: './newjoinersrecruitmentmode-report.component.html',
  styleUrls: ['./newjoinersrecruitmentmode-report.component.css']
})
export class NewjoinersrecruitmentmodeReportComponent implements OnInit {

  searchform: FormGroup;
  saveform: FormGroup;

  newjoinersrecruitmentmodeList: any[] = [];


  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private SpinnerService: NgxSpinnerService,
    private excelService: ExcelService,
  ) {
    this.createForm();
  }
  ngOnInit() {
    this.formSubmit();
    this.loadDataTable();
  }
  createForm() {
    this.searchform = this.fb.group({
      recruitmentMode: ['']
    });
  }
  formSubmit() {
      this.SpinnerService.show();
    this.reportService.newJoinersRecruitmentModeReport(this.searchform.value).subscribe((result) => {
        if (result) {
          this.newjoinersrecruitmentmodeList = result;
          this.loadDataTable();
          this.SpinnerService.hide();
          console.log("list", this.newjoinersrecruitmentmodeList)
        }
        else {
          this.newjoinersrecruitmentmodeList = [];
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
    link.download = "New Joiners Recruitment ModeReport.xls";
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
