import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { ReportService } from 'src/app/services/reports/report.service';
import { LocationService } from 'src/app/services/common/location/location.service';
import { ILocation, ISearchLocation } from 'src/app/interfaces/common/location.interface';

declare var jQuery: any;

@Component({
  selector: 'app-newjoinersrecruitmentactivity-report',
  templateUrl: './newjoinersrecruitmentactivity-report.component.html',
  styleUrls: ['./newjoinersrecruitmentactivity-report.component.css']
})
export class NewjoinersrecruitmentactivityReportComponent implements OnInit {
  searchform: FormGroup;
  saveform: FormGroup;

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

  newjoinersrecruitmentactivityList: any[] = [];
  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private locationService: LocationService,
    private SpinnerService: NgxSpinnerService,
    private excelService: ExcelService,
  ) {
    this.createForm();
    this.getAllLocation();
  }
  ngOnInit() {
    this.formSubmit();
    this.loadDataTable();
  }
  createForm() {
    this.searchform = this.fb.group({
      locationId: [0]
    });
  }

  //locations
  getAllLocation() {
    this.locations = [];
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

  formSubmit() {
      this.SpinnerService.show();
    this.reportService.newJoinersRecruitmentActivityReport(this.searchform.value).subscribe((result) => {
        if (result) {
          this.newjoinersrecruitmentactivityList = result;
          this.loadDataTable();
          this.SpinnerService.hide();
          console.log("list", this.newjoinersrecruitmentactivityList)
        }
        else {
          this.newjoinersrecruitmentactivityList = [];
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
      locationId: 0
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
    link.download = "New Joiners Recruitment Activity Report.xls";
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
        "fixedColumn": {
          "left": 4
        },
      });
    });
  }

}
