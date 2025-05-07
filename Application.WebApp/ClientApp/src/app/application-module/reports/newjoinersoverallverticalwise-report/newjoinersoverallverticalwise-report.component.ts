import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { ReportService } from 'src/app/services/reports/report.service';

declare var jQuery: any;

@Component({
  selector: 'app-newjoinersoverallverticalwise-report',
  templateUrl: './newjoinersoverallverticalwise-report.component.html',
  styleUrls: ['./newjoinersoverallverticalwise-report.component.css']
})
export class NewjoinersoverallverticalwiseReportComponent implements OnInit {
  searchform: FormGroup;
  saveform: FormGroup;

  //verticals
  verticals: IVertical[] = [];
  selectedVertical: IVertical;

  newjoinersoverallverticalwiseList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private SpinnerService: NgxSpinnerService,
    private excelService: ExcelService,
  ) {
    this.createForm();
    this.getAllVerticals();
  }
  ngOnInit() {
    this.formSubmit();
    this.loadDataTable();
  }
  createForm() {
    this.searchform = this.fb.group({
      verticalId: [0]
    });
  }
  //vertical
  getAllVerticals() {
    this.verticals = [];
    this.verticals.push({ verticalId: 2, verticalName: "Manufacturing", isActive: true });
    this.verticals.push({ verticalId: 1, verticalName: "HeadOffice", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales", isActive: true });
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    this.loadSelectPicker();
    this.selectedVertical = this.verticals.filter(x => x.verticalId == 0)[0];
  }
  changeVertical() {
    var verticalId = this.searchform.get("verticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0];
  }

  formSubmit() {
    this.searchform.patchValue(
      {
        verticalId: this.selectedVertical.verticalId,
      });
      this.SpinnerService.show();
    this.reportService.newJoinersOverallVerticalWiseReport(this.searchform.value).subscribe((result) => {
        if (result) {
          this.newjoinersoverallverticalwiseList = result;
          this.loadDataTable();
          this.SpinnerService.hide();
          console.log("list", this.newjoinersoverallverticalwiseList)
        }
        else {
          this.newjoinersoverallverticalwiseList = [];
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
      verticalId: 0
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
    link.download = "New Joiners Overall Vertical Wise Report.xls";
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
