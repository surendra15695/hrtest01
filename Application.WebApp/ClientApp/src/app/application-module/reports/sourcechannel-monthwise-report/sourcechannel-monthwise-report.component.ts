import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { LocationService } from '../../../services/common/location/location.service';
import { CommonService } from '../../../services/common/common/common.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ExcelService } from 'src/app/services/excel/excel.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { ReportService } from 'src/app/services/reports/report.service';
import * as XLSX from 'xlsx';

declare var jQuery: any;

@Component({
  selector: 'app-sourcechannel-monthwise-report',
  templateUrl: './sourcechannel-monthwise-report.component.html',
  styleUrls: ['./sourcechannel-monthwise-report.component.css']
})

export class SourcechannelMonthwiseReportComponent implements OnInit {
  searchform: FormGroup;
  verticals: IVertical[] = [];
  FunctionList: any[] = [];
  selectedVertical: IVertical;

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
  sourceChannelLists: any[] = [];
  sourceChannelHeaders: any[] = [];
  grandTotalByHeader: any[] = [];
  grandTotal: number = 0;
  FromDate: any = null;
  ToDate: any = null;
  verticalIds: string;

  constructor(
    private SpinnerService: NgxSpinnerService,
    private persistance: PersistanceService,
    private commonService: CommonService,
    private locationService: LocationService,
    private reportService: ReportService,
    private excelService: ExcelService,
    private functionService: FunctionService,
    private notiService: NotificationService,
    private fb: FormBuilder
  ) {
    this.getAllVerticals();
    this.getAllLocation();
    this.createForm();
  }

  ngOnInit() {
    //this.loadDatePicker();    
  }

  createForm() {
    this.searchform = this.fb.group({
      requisitionNo: [''],
      verticalId: [null],
      locationId: [0],
      FromDate: [null],
      ToDate: [null],
      functionId: [null]
    });
  }

  getAllVerticals() {
    this.verticals = [];
    this.verticalIds = "1,2,3";
    var splitvertical = this.verticalIds.split(",");
    var allvertical = "";
    console.log(splitvertical);
    for (var i = 0; i < splitvertical.length; i++) {
      if (splitvertical[i] != "0") {
        if (splitvertical[i] == "1") {
          this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
        }
        else if (splitvertical[i] == "2") {
          this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
        }
        else if (splitvertical[i] == "3") {
          this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
        }
        if (allvertical == "") {
          allvertical = splitvertical[i];
        }
        else {
          allvertical = allvertical + "," + splitvertical[i];
        }
      }

    }
    this.selectedVertical = this.verticals[0];
    this.setDefaultVertical();
  }

  setDefaultVertical() {
    setTimeout(() => {
      jQuery('.ddlvertical').selectpicker("val", "0: " + this.selectedVertical.verticalId + "");
      jQuery('.ddlvertical').selectpicker("refresh");
    });
  }

  changeVertical() {
    debugger
    let verticalId = this.searchform.get("verticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0];
    this.getAllLocation();

    let data: any = {
      'VerticalId': verticalId,
      'IsActive': true
    }

    this.getVerticalFunction(data);
  }

  getVerticalFunction(data: any) {
    this.functionService.getAllVerticalFunction(data).subscribe((response: any) => {
      if (response) {
        this.FunctionList = response;
        //console.log("FunList: ", this.FunctionList);                
      }
      else {
        this.FunctionList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }

  getAllLocation() {
    this.locations = [];
    this.searchLocation.verticalId = Number(this.selectedVertical.verticalId);
    this.locationService.getAllLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        this.locations = result;
        this.locations.splice(0, 0, {
          locationId: 0,
          verticalId: 0,
          locationNo: "All",
          locationCode: "",
          locationOffice: "",
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
          locationOffice: "",
          isActive: true,
          createdBy: 0
        })
      }
    }, error => {
      console.log(error);
    });
  }

  exportToExcel() {
    if (this.sourceChannelLists.length != 0) {
      let fileName: string = 'Source_Channel_Wise_Report.xlsx';
      /* table id is passed over here */
      let element = document.getElementById('Source_Channel_Wise_Report');
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Report By Source Cahannel');

      /* save to file */
      XLSX.writeFile(wb, fileName);
    }
  }

  fromSubmit() {
    let TempFromDT: any = '01/' + this.searchform.value.FromDate;
    let TempToDT: any = '01/' + this.searchform.value.ToDate;
    let frmMon: number = +this.searchform.value.FromDate.split('/')[0];
    let toMon: number = +this.searchform.value.ToDate.split('/')[0];

    let Data: any = {
      FromDate: TempFromDT,
      ToDate: TempToDT
    }

    //console.log(this.searchform.value);
    this.SpinnerService.show();
    this.reportService.getSourceChannelMonWiseRpt(Data).subscribe((result) => {
      if (result) {
        debugger

        //console.log(result);    
        let tempHeader: Array<string> = [];
        for (let item of result) {
          tempHeader.push(item.sourceChannelName);
        }

        let uniqueHeader: Array<string> = tempHeader.filter((v, i, a) => a.indexOf(v) === i);
        this.sourceChannelHeaders = uniqueHeader;

        let tempArr: any[] = [];
        let finalArr: any[] = [];
        for (let i = 0; frmMon <= toMon; i++) {

          let Header: string = '';
          let HeaderVal: number = 0;
          for (let i = 0; i < uniqueHeader.length; i++) {

            for (let item of result) {
              let fromMonth: number = 0;
              if (item.sourceChannelName == uniqueHeader[i]) {
                let temp: string = item.sourceMonth.split('-')[0];
                if (temp == 'Jan') { fromMonth = 1; }
                if (temp == 'Feb') { fromMonth = 2; }
                if (temp == 'Mar') { fromMonth = 3; }
                if (temp == 'Apr') { fromMonth = 4; }
                if (temp == 'May') { fromMonth = 5; }
                if (temp == 'Jun') { fromMonth = 6; }
                if (temp == 'Jul') { fromMonth = 7; }
                if (temp == 'Aug') { fromMonth = 8; }
                if (temp == 'Sep') { fromMonth = 9; }
                if (temp == 'Oct') { fromMonth = 10; }
                if (temp == 'Nov') { fromMonth = 11; }
                if (temp == 'Dec') { fromMonth = 12; }

                if (fromMonth == frmMon) {
                  HeaderVal = item.candidateCount;
                  Header = uniqueHeader[i];
                }
              }
            }

            let obj: any = {};
            obj[Header] = HeaderVal;
            obj['HeaderVal'] = HeaderVal;
            obj['Month'] = frmMon;

            tempArr.push(obj);
          }

          let finalObj: any = {};
          let grandTotal: number = 0;
          for (let rec of tempArr) {
            let strHeader: string = Object.keys(rec)[0];

            finalObj[strHeader] = rec.HeaderVal;
            grandTotal = grandTotal + rec.HeaderVal;
            finalObj.GrandTotalByMonth = grandTotal;
          }

          tempArr = [];
          finalObj.Month = frmMon;
          frmMon = frmMon + 1;
          finalArr.push(finalObj);
        }

        this.sourceChannelLists = finalArr;
        let localGTByHeader: any[] = [];
        for (let rec of this.sourceChannelHeaders) {
          let HeaderTotal: any = finalArr.map(m => m[rec]).reduce((x, y) => x + y, 0);
          localGTByHeader.push(HeaderTotal);
        }

        this.grandTotalByHeader = localGTByHeader;
        this.grandTotal = finalArr.map(m => m.GrandTotalByMonth).reduce((x, y) => x + y, 0);
        this.createForm();
        this.SpinnerService.hide();
        //console.log("Source Channel List: ", this.sourceChannelLists);
      }
      else {
        this.sourceChannelLists = [];
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }

  returnHeaderValue(val: number, header: string) {
    return Number(this.sourceChannelLists[val][header]);
  }
  reset() {
    this.searchform.reset();
    this.searchform.patchValue({
      verticalId: 0,
      locationId: 0,
      requisitionApprovalStatus: 0
    })
    this.sourceChannelLists = [];
    this.loadDataTable();
  }
  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
      });
    });
  }

  // loadDatePicker() {
  //   jQuery(".datepicker").parent(".input-group").datepicker({
  //     autoclose: true,
  //     format: "mm/yyyy",
  //     changeMonth: true,
  //     changeYear: true,
  //     showButtonPanel: true,
  //     todayHighlight: true
  //   });
  // }    
}


