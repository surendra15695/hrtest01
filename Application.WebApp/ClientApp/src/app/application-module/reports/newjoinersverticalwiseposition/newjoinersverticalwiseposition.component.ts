import { Component, OnInit } from '@angular/core';
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
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;
@Component({
  selector: 'app-newjoinersverticalwiseposition',
  templateUrl: './newjoinersverticalwiseposition.component.html',
  styleUrls: ['./newjoinersverticalwiseposition.component.css']
})
export class NewjoinersverticalwisepositionComponent implements OnInit {
  searchform: FormGroup;
  saveform: FormGroup;
  //verticals
  verticals: IVertical[] = [];
  selectedVertical: IVertical;

  verticalWisePositionList: any[] = [];
  loginUserId: number;

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private locationService: LocationService,
    private SpinnerService: NgxSpinnerService,
    private functionService: FunctionService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private gradeService: GradeService,
    private excelService: ExcelService,
    private persistance: PersistanceService,
  ) { 
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.createForm();
    this.getAllVerticals();
  }

  ngOnInit() {
    this.formSubmit();
    this.loadDataTable();
  }
  createForm(){
    this.searchform = this.fb.group({
      verticalId: [0]
    });
  }
  //vertical
  getAllVerticals(){
    this.verticals = [];
    this.verticals.push({ verticalId: 2, verticalName: "Manufacturing", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
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
        verticalId: this.selectedVertical.verticalId
      });
    this.SpinnerService.show();
    this.reportService.newJoinersVerticalWisePositionReport(this.searchform.value).subscribe((result) => {
      if (result) {
        this.verticalWisePositionList = result;
        this.loadDataTable();
        this.SpinnerService.hide();
        console.log("list", this.verticalWisePositionList)
      }
      else {
        this.verticalWisePositionList = [];
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
    link.download = "New Joiners Vertical Wise Position Report.xls";
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
        "fixedColumns": {
          "left": 4
        },
      });
    });
  }

}
