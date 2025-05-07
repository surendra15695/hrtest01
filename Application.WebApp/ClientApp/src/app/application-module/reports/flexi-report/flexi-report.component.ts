import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { ReportService } from 'src/app/services/reports/report.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { IFlexiHeaderList, ISearchFlexiHeader } from '../../../interfaces/common/common.interface';
import { CommonService } from '../../../services/common/common/common.service';
import { DatePipe } from '@angular/common';
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from 'src/app/interfaces/common/location.interface';
import { ISearchFunction, IVerticalFunction } from 'src/app/interfaces/common/function.interface';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { LocationService } from 'src/app/services/common/location/location.service';
import * as XLSX from 'xlsx-js-style';
declare var jQuery: any;

@Component({
  selector: 'app-flexi-report',
  templateUrl: './flexi-report.component.html',
  styleUrls: ['./flexi-report.component.css'],
  providers: [DatePipe]
})
export class FlexiReportComponent implements OnInit {
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  searchform: FormGroup;
  saveform: FormGroup;

  //vertical
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

  flexiHeaderList: any[] = [];
  headerIds: string = "";
  searchFlexiHeader: ISearchFlexiHeader = {
    headerId: null,
    isActive: true,
    headerType: 1
  }
  hidecols: any[] = [];
  showrequisitionNo: boolean = true
  showrequisitionType: boolean = true
  showrequestedBy: boolean = true
  showlocationOffice: boolean = true
  showfunctionName: boolean = true
  showdepartmentName: boolean = true
  showpositionName: boolean = true
  showgradeName: boolean = true
  //added
  showDate: boolean = true
  showIom: boolean = true
  showApprove: boolean = true
  showrequsted: boolean = true
  showhold: boolean = true
  showclosed: boolean = true
  showtype: boolean = true
  showtarget: boolean = true
  showtotalcandidate: boolean = true
  showjd: boolean = true
  showreqstatus: boolean = true
  showsalaryrenge: boolean = true

  flexiReportList: any[] = [];
  items: any[] = [];
  exportFile: any[] = [];
  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private SpinnerService: NgxSpinnerService,
    private notificationService: NotificationService,
    private functionService: FunctionService,
    private locationService: LocationService,
    private excelService: ExcelService,
    private commonService: CommonService,
    private datepipe: DatePipe
  ) {
    this.createForm();
    this.getAllFlexiHeaderList();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllFunction();
    // setTimeout(() => {
    //   this.formSubmit('1');
    // }, 100);
  }

  ngOnInit() {

    this.loadDatePicker();
    this.loadSelectPicker();
  }

  createForm() {
    this.searchform = this.fb.group({
      verticalId: [0],
      locationId: [0],
      functionId: [0],
      headerId: [''],
      fromDate: [''],
      toDate: [''],
    });
  }

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

  getAllFlexiHeaderList() {
    this.flexiHeaderList = [];
    this.commonService.getAllFlexiReportHeader(this.searchFlexiHeader).subscribe((result) => {
      if (result) {
        this.flexiHeaderList = result;
        this.showrequisitionNo = true
        this.showrequisitionType = true
        this.showrequestedBy = true
        this.showlocationOffice = true
        this.showfunctionName = true
        this.showdepartmentName = true
        this.showpositionName = true
        this.showgradeName = true
        //added
        this.showDate = true
        this.showIom = true
        this.showApprove = true
        this.showrequsted = true
        this.showhold = true
        this.showclosed = true
        this.showtype = true
        this.showtarget = true
        this.showtotalcandidate = true
        this.showjd = true
        this.showreqstatus = true
        this.showsalaryrenge = true

      }
      else {
        this.flexiHeaderList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  formSubmit(num: any) {
    var validation = 0;
    var flag = 0;
    if (this.searchform.value.headerId.length == 0) {
      this.notificationService.showError("Please Select Header", "Error");
      this.SpinnerService.hide();
      validation = 1;
    }
    if (validation == 0) {
      if (num == '1') {
        this.headerIds = "1,2,3,4,5,6,7,8,";
        for (var val of this.flexiHeaderList) {
          this.items.push(val.reportHeaderName);
        }
        this.hidecols = []
      }

      if (num == '2') {
        this.items = []
        this.headerIds = "";
        this.hidecols = [];
        //this.hidecols.push(0, 1, 2, 3, 4, 5, 6, 7,);

        for (var val of this.searchform.value.headerId) {
          var value = this.flexiHeaderList.filter(e => e.reportHeaderId == val)
          this.items.push(value[0].reportHeaderName);
          this.headerIds += value[0].reportHeaderId.toString() + ","
          //this.hidecols = this.hidecols.filter(e => e != val - 1);
        }
        if (this.items.includes("Requisition No")) {
          this.showrequisitionNo = true;
          this.hidecols.filter(e => e != 0)
        }
        else {
          this.showrequisitionNo = false; //0
          this.hidecols.push(0)
        }

        if (this.items.includes("Request Type")) {
          this.showrequisitionType = true;
          this.hidecols.filter(e => e != 1)
        }
        else {
          this.showrequisitionType = false; //1
          this.hidecols.push(1)
        }

        if (this.items.includes("Requested By")) {
          this.showrequestedBy = true;
          this.hidecols.filter(e => e != 2)
        }
        else {
          this.showrequestedBy = false; //2
          this.hidecols.push(2)
        }

        if (this.items.includes("Location")) {
          this.showlocationOffice = true;
          this.hidecols.filter(e => e != 3)
        }
        else {
          this.showlocationOffice = false; //3
          this.hidecols.push(3)
        }
        if (this.items.includes("Function")) {
          this.showfunctionName = true;
          this.hidecols.filter(e => e != 4)
        }
        else {
          this.showfunctionName = false; //4
          this.hidecols.push(4)
        }
        if (this.items.includes("Department")) {
          this.showdepartmentName = true;
          this.hidecols.filter(e => e != 5)
        }
        else {
          this.showdepartmentName = false; //5
          this.hidecols.push(5)
        }

        if (this.items.includes("Position")) {
          this.showpositionName = true;
          this.hidecols.filter(e => e != 6)
        }
        else {
          this.showpositionName = false; //6
          this.hidecols.push(6)
        }
        if (this.items.includes("Grade")) {
          this.showgradeName = true;
          this.hidecols.filter(e => e != 7)
        }
        else {
          this.showgradeName = false; //7
          this.hidecols.push(7)
        }

        if (this.items.includes("Date")) {
          this.showDate = true;
          this.hidecols.filter(e => e != 8)
        }
        else {
          this.showDate = false; //8
          this.hidecols.push(8)
        }
        if (this.items.includes("IOM")) {
          this.showIom = true;
          this.hidecols.filter(e => e != 9)
        }
        else {
          this.showIom = false; //9
          this.hidecols.push(9)
        }

        if (this.items.includes("Approved")) {
          this.showApprove = true;
          this.hidecols.filter(e => e != 10)
        }
        else {
          this.showApprove = false; //10
          this.hidecols.push(10)
        }

        if (this.items.includes("Requested")) {
          this.showrequsted = true;
          this.hidecols.filter(e => e != 11)
        }
        else {
          this.showrequsted = false; //11
          this.hidecols.push(11)
        }
        if (this.items.includes("Hold")) {
          this.showhold = true;
          this.hidecols.filter(e => e != 12)
        }
        else {
          this.showhold = false; //12
          this.hidecols.push(12)
        }

        if (this.items.includes("Closed")) {
          this.showclosed = true;
          this.hidecols.filter(e => e != 13)
        }
        else {
          this.showclosed = false; //13
          this.hidecols.push(13)
        }

        if (this.items.includes("Type")) {
          this.showtype = true;
          this.hidecols.filter(e => e != 14)
        }
        else {
          this.showtype = false; //14
          this.hidecols.push(14)
        }

        if (this.items.includes("Target")) {
          this.showtarget = true;
          this.hidecols.filter(e => e != 15)
        }
        else {
          this.showtarget = false; //15
          this.hidecols.push(15)
        }
        if (this.items.includes("Total Candidate")) {
          this.showtotalcandidate = true;
          this.hidecols.filter(e => e != 16)
        }
        else {
          this.showtotalcandidate = false; //16
          this.hidecols.push(16)
        }

        if (this.items.includes("JD")) {
          this.showjd = true;
          this.hidecols.filter(e => e != 17)
        }
        else {
          this.showjd = false; //17
          this.hidecols.push(17)
        }

        if (this.items.includes("Requisition Status")) {
          this.showreqstatus = true;
          this.hidecols.filter(e => e != 18)
        }
        else {
          this.showreqstatus = false; //18
          this.hidecols.push(18)
        }
        if (this.items.includes("Salary Range")) {
          this.showsalaryrenge = true;
          this.hidecols.filter(e => e != 19)
        }
        else {
          this.showsalaryrenge = false; //19
          this.hidecols.push(19)
        }
      }
      // this.searchform.patchValue(
      //   {
      //     headerId: this.headerIds.slice(0, -1),
      //     fromDate: this.fDate.nativeElement.value,
      //     toDate: this.tDate.nativeElement.value,
      //   });
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
      if (flag == 0) {
        this.SpinnerService.show();
        var searchVal = {
          headerId: this.headerIds.slice(0, -1),
          verticalId: this.selectedVertical.verticalId,
          locationId: this.searchform.value.locationId,
          functionId: this.searchform.value.functionId,
          fromDate: this.fDate.nativeElement.value,
          toDate: this.tDate.nativeElement.value,
        }
        this.reportService.getAllReqFlexiReportList(searchVal).subscribe((result) => {
          if (result) {
            this.exportFile = []
            this.flexiReportList = result;
            console.log("hmm", result);
            // this.searchform.reset();
            for (var val of this.flexiReportList) {
              var date = new Date(val.createdDate);
              val.createdDate = this.datepipe.transform(date, 'dd/MM/yyyy')
            }
            this.exportFile = this.flexiReportList;
            if (num == '2') {
              if (this.showrequisitionNo == false) {
                this.exportFile.forEach(function (x) { delete x.requisitionNo });
              }
              if (this.showrequisitionType == false) {
                this.exportFile.forEach(function (x) { delete x.requisitionType });
              }
              if (this.showrequestedBy == false) {
                this.exportFile.forEach(function (x) { delete x.requestedBy });
              }
              if (this.showlocationOffice == false) {
                this.exportFile.forEach(function (x) { delete x.locationOffice });
              }
              if (this.showfunctionName == false) {
                this.exportFile.forEach(function (x) { delete x.functionName });
              }
              if (this.showdepartmentName == false) {
                this.exportFile.forEach(function (x) { delete x.departmentName });
              }
              if (this.showpositionName == false) {
                this.exportFile.forEach(function (x) { delete x.positionName });
              }
              if (this.showgradeName == false) {
                this.exportFile.forEach(function (x) { delete x.gradeName });
              }
              if (this.showDate == false) {
                this.exportFile.forEach(function (x) { delete x.date });
              }
              if (this.showIom == false) {
                this.exportFile.forEach(function (x) { delete x.iom });
              }
              if (this.showApprove == false) {
                this.exportFile.forEach(function (x) { delete x.approved });
              }


              if (this.showrequsted == false) {
                this.exportFile.forEach(function (x) { delete x.requested });
              }
              if (this.showhold == false) {
                this.exportFile.forEach(function (x) { delete x.hold });
              }
              if (this.showclosed == false) {
                this.exportFile.forEach(function (x) { delete x.closed });
              }
              if (this.showtype == false) {
                this.exportFile.forEach(function (x) { delete x.type });
              }
              if (this.showtarget == false) {
                this.exportFile.forEach(function (x) { delete x.target });
              }
              if (this.showtotalcandidate == false) {
                this.exportFile.forEach(function (x) { delete x.totalCandidate });
              }
              if (this.showjd == false) {
                this.exportFile.forEach(function (x) { delete x.jd });
              }
              if (this.showreqstatus == false) {
                this.exportFile.forEach(function (x) { delete x.requisitionStatus });
              }
              if (this.showsalaryrenge == false) {
                this.exportFile.forEach(function (x) { delete x.salaryRange });
              }

            }
            this.SpinnerService.hide();
          }
          else {
            this.flexiReportList = [];
            this.SpinnerService.hide();
          }
        }, error => {
          console.log(error);
          this.SpinnerService.hide();
        }, () => {
          //this.createForm();
          this.loadDataTable();
          this.loadSelectPicker();
          this.SpinnerService.hide();
        });
      }
    }
  }

  reset() {
    this.searchform.reset();
    this.searchform.patchValue(
      {
        headerId: '',
        verticalId: 0,
        locationId: 0,
        functionId: 0,
      }
    );
    this.flexiReportList = [];
    this.loadSelectPicker();
    //this.formSubmit('1');
    this.changeVertical();
  }
  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  insertSpaceBeforeCapitalLetter(inputString) {
    return inputString.replace(/([A-Z])/g, ' $1');
  }

  exportToExcel() {
    const updatedArray: any[] = [];
    this.exportFile.forEach((obj) => {
      const updatedObj: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const updatedKey = this.capitalizeFirstLetter(this.insertSpaceBeforeCapitalLetter(key));
          updatedObj[updatedKey] = obj[key];
        }
      }
      updatedArray.push(updatedObj);
    });
    console.log("chck", updatedArray)
    this.ExportAsExcelFileNew(updatedArray, "Flexi Report.xls");
  }
  public ExportAsExcelFileNew(json: any[], excelFileName: string): void {
    json = json.map((obj, index) => {
      return { "Serial No.": index + 1, ...obj };
    });
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    // Loop through each column and set the style to bold for the header row only
    for (let columnIndex = range.s.c; columnIndex <= range.e.c; columnIndex++) {
      const headerCell = XLSX.utils.encode_cell({ r: 0, c: columnIndex }); // Assuming header row is at index 0
      worksheet[headerCell].s = { font: { bold: true }, fill: { patternType: 'solid', fgColor: { rgb: 'FFFF00' } } }
    }
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');
    XLSX.writeFile(wb, 'Flexi Report.xlsx');

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
    var dothis = this
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "fixedColumns": {
          "left": 3
        },
        'columnDefs': [
          { 'visible': false, 'targets': dothis.hidecols }
        ]
      });
    });
  }

}
