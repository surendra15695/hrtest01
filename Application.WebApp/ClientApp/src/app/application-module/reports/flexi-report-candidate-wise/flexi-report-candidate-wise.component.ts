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
import { LocationService } from 'src/app/services/common/location/location.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { IFunctionDepartment, ISearchDepartment } from 'src/app/interfaces/common/department.interface';
import { DepartmentService } from 'src/app/services/common/department/department.service';
import * as XLSX from 'xlsx-js-style';
declare var jQuery: any;

@Component({
  selector: 'app-flexi-report-candidate-wise',
  templateUrl: './flexi-report-candidate-wise.component.html',
  styleUrls: ['./flexi-report-candidate-wise.component.css'],
  providers: [DatePipe]
})
export class FlexiReportCandidateWiseComponent implements OnInit {
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
  //department
  departments: IFunctionDepartment[] = [];
  selectedDepartment: IFunctionDepartment;
  searchDepartment: ISearchDepartment = {
    departmentId: null,
    functionId: null,
    verticalId: null,
    isActive: true
  }
  departmentId: number;
  departmentName: string;

  flexiHeaderList: any[] = [];
  headerIds: string = "";
  searchFlexiHeader: ISearchFlexiHeader = {
    headerId: null,
    isActive: true,
    headerType: 2
  }
  hidecols: any[] = [];
  showcandidateName: boolean = true
  showcandidateEmail: boolean = true
  showage: boolean = true
  showaadharNo: boolean = true
  showmotherTongue: boolean = true
  showhighestQualification: boolean = true
  showhiringStatus: boolean = true
  showcandidateNo: boolean = true
  showemployeeNo: boolean = true
  showlanguage: boolean = true

  showCourse: boolean = true
  showStream: boolean = true
  showExperience: boolean = true
  showPresentComapny: boolean = true
  showDesignation: boolean = true
  showRelatives: boolean = true
  showCandidateOwner: boolean = true
  showMappedToReq: boolean = true
  showReqNo: boolean = true
  showReqStatus: boolean = true
  showMrfPrev: boolean = true
  showApplicationFormStatus: boolean = true
  showIsReffeded: boolean = true
  showCreatedDate: boolean = true
  showSource: boolean = true
  showDateOfSubmission: boolean = true


  flexiReportList: any[] = [];
  items: any[] = [];
  exportFile: any[] = [];
  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private SpinnerService: NgxSpinnerService,
    private notificationService: NotificationService,
    private excelService: ExcelService,
    private commonService: CommonService,
    private functionService: FunctionService,
    private locationService: LocationService,
    private departmentService: DepartmentService,
    private datepipe: DatePipe
  ) {
    this.createForm();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllFunction();
    this.getAllFunctionDepartment();
    this.getAllFlexiHeaderList();
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
      departmentId: [0],
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
  changeFunction() {
    // var functionId = this.searchform.get("functionId").value;
    // this.selectedFunction = this.functions.filter(x => x.functionId == functionId)[0];
    this.getAllFunctionDepartment();
  }
  //functions
  getAllFunctionDepartment() {
    this.departments = [];
    this.searchDepartment.verticalId = this.selectedVertical.verticalId;
    this.searchDepartment.functionId = this.searchform.value.functionId;
    this.departmentService.getAllFunctionDepartment(this.searchDepartment).subscribe((response: any) => {
      if (response) {
        this.departments = response;
        this.departments.splice(0, 0, {
          departmentId: 0,
          departmentName: "All",
          verticalId: 0,
          verticalName: "All",
          functionName: "All",
          functionId: 0,
          isActive: true,
        })
      }
      else {
        this.departments = [];
        this.departments.splice(0, 0, {
          departmentId: 0,
          departmentName: "All",
          verticalId: 0,
          verticalName: "",
          functionName: "",
          functionId: 0,
          isActive: true,
        })
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
      this.SpinnerService.hide();
    });
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
        //this.flexiHeaderList = result.filter( e =>e.reportHeaderId !=14);
        this.flexiHeaderList = result.filter(e => e.reportHeaderId != 16);
        this.showcandidateName = true
        this.showcandidateEmail = true
        this.showage = true
        this.showaadharNo = true
        this.showmotherTongue = true
        this.showhighestQualification = true
        this.showhiringStatus = true
        this.showcandidateNo = true
        this.showemployeeNo = true
        this.showlanguage = true

        this.showCourse = true
        this.showStream = true
        this.showExperience = true
        this.showPresentComapny = true
        this.showDesignation = true
        this.showRelatives = true
        this.showCandidateOwner = true
        this.showMappedToReq = true
        this.showReqNo = true
        this.showReqStatus = true
        this.showMrfPrev = true
        this.showApplicationFormStatus = true
        this.showIsReffeded = true
        this.showCreatedDate = true
        this.showSource = true
        this.showDateOfSubmission = true

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
        this.headerIds = "9,10,11,12,13,14,15,17,18,19,";
        for (var val of this.flexiHeaderList) {
          this.items.push(val.reportHeaderName);
        }
        this.hidecols = []
      }

      if (num == '2') {
        this.items = []
        this.headerIds = "";
        this.hidecols = [];

        for (var val of this.searchform.value.headerId) {
          var value = this.flexiHeaderList.filter(e => e.reportHeaderId == val)
          this.items.push(value[0].reportHeaderName);
          this.headerIds += value[0].reportHeaderId.toString() + ","

        }
        if (this.items.includes("Candidate Name")) {
          this.showcandidateName = true;
          this.hidecols.filter(e => e != 0)
        }
        else {
          this.showcandidateName = false; //0
          this.hidecols.push(0)
        }

        if (this.items.includes("Candidate Email")) {
          this.showcandidateEmail = true;
          this.hidecols.filter(e => e != 1)
        }
        else {
          this.showcandidateEmail = false;//1
          this.hidecols.push(1)
        }
        if (this.items.includes("Age")) {
          this.showage = true
          this.hidecols.filter(e => e != 2)
        }
        else {
          this.showage = false;
          this.hidecols.push(2)
        }
        if (this.items.includes("Aadhar No")) {
          this.showaadharNo = true
          this.hidecols.filter(e => e != 3)
        }
        else {
          this.showaadharNo = false;
          this.hidecols.push(3)
        }

        if (this.items.includes("Mother Tongue")) {
          this.showmotherTongue = true
          this.hidecols.filter(e => e != 4)
        }
        else {
          this.showmotherTongue = false;
          this.hidecols.push(4)
        }

        if (this.items.includes("Language Known")) {
          this.showlanguage = true
          this.hidecols.filter(e => e != 5)
        }
        else {
          this.showlanguage = false;
          this.hidecols.push(5)
        }

        if (this.items.includes("Highest Qualification")) {
          this.showhighestQualification = true
          this.hidecols.filter(e => e != 6)
        }
        else {
          this.showhighestQualification = false;
          this.hidecols.push(6)
        }

        if (this.items.includes("Hiring Status")) {
          this.showhiringStatus = true
          this.hidecols.filter(e => e != 7)
        }
        else {
          this.showhiringStatus = false;
          this.hidecols.push(7)
        }

        if (this.items.includes("Candidate No")) {
          this.showcandidateNo = true
          this.hidecols.filter(e => e != 8)
        }
        else {
          this.showcandidateNo = false;
          this.hidecols.push(8)
        }
        if (this.items.includes("Employee No")) {
          this.showemployeeNo = true
          this.hidecols.filter(e => e != 9)
        }
        else {
          this.showemployeeNo = false;
          this.hidecols.push(9)
        }
        
//added
        if (this.items.includes("Course")) {
          this.showCourse = true
          this.hidecols.filter(e => e != 10)
        }
        else {
          this.showCourse = false;
          this.hidecols.push(10)
        }
        if (this.items.includes("Stream")) {
          this.showStream = true
          this.hidecols.filter(e => e != 11)
        }
        else {
          this.showStream = false;
          this.hidecols.push(11)
        }

        if (this.items.includes("Experience")) {
          this.showExperience = true
          this.hidecols.filter(e => e != 12)
        }
        else {
          this.showExperience = false;
          this.hidecols.push(12)
        }

        if (this.items.includes("Present Company")) {
          this.showPresentComapny = true
          this.hidecols.filter(e => e != 13)
        }
        else {
          this.showPresentComapny = false;
          this.hidecols.push(13)
        }
        if (this.items.includes("Designation")) {
          this.showDesignation = true
          this.hidecols.filter(e => e != 14)
        }
        else {
          this.showDesignation = false;
          this.hidecols.push(14)
        }
        if (this.items.includes("Relatives")) {
          this.showRelatives = true
          this.hidecols.filter(e => e != 15)
        }
        else {
          this.showRelatives = false;
          this.hidecols.push(15)
        }
        if (this.items.includes("Source")) {
          this.showSource = true
          this.hidecols.filter(e => e != 16)
        }
        else {
          this.showSource = false;
          this.hidecols.push(16)
        }
        if (this.items.includes("Candidate Owner")) {
          this.showCandidateOwner = true
          this.hidecols.filter(e => e != 17)
        }
        else {
          this.showCandidateOwner = false;
          this.hidecols.push(17)
        }
        if (this.items.includes("Date Of Submission")) {
          this.showDateOfSubmission = true
          this.hidecols.filter(e => e != 18)
        }
        else {
          this.showDateOfSubmission = false;
          this.hidecols.push(18)
        }
        if (this.items.includes("Mapped to Requisition")) {
          this.showMappedToReq = true
          this.hidecols.filter(e => e != 19)
        }
        else {
          this.showMappedToReq = false;
          this.hidecols.push(19)
        }
        if (this.items.includes("Requisition No")) {
          this.showReqNo = true
          this.hidecols.filter(e => e != 20)
        }
        else {
          this.showReqNo = false;
          this.hidecols.push(20)
        }
        if (this.items.includes("Requisition Status")) {
          this.showReqStatus = true
          this.hidecols.filter(e => e !=21)
        }
        else {
          this.showReqStatus = false;
          this.hidecols.push(21)
        }
        if (this.items.includes("Appliction form Status")) {
          this.showApplicationFormStatus = true
          this.hidecols.filter(e => e != 22)
        }
        else {
          this.showApplicationFormStatus = false;
          this.hidecols.push(22)
        }
        if (this.items.includes("MRF Rec./EMP Histroy")) {
          this.showMrfPrev = true
          this.hidecols.filter(e => e != 23)
        }
        else {
          this.showMrfPrev = false;
          this.hidecols.push(23)
        }
        if (this.items.includes("Is Reffered")) {
          this.showIsReffeded = true
          this.hidecols.filter(e => e != 24)
        }
        else {
          this.showIsReffeded = false;
          this.hidecols.push(24)
        }
        
      }

      // this.searchform.patchValue(
      //   {
      //     //headerId: this.headerIds.slice(0, -1),
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
          departmentId: this.searchform.value.departmentId,
          fromDate: this.fDate.nativeElement.value,
          toDate: this.tDate.nativeElement.value,
        }
        this.reportService.getAllCandidateFlexiReportList(searchVal).subscribe((result) => {
          if (result) {
            this.exportFile = []
            this.flexiReportList = result;
            // this.searchform.reset();
            for (var val of this.flexiReportList) {
              var date = new Date(val.createdDate);
              val.createdDate = this.datepipe.transform(date, 'dd/MM/yyyy')
            }
            this.exportFile = this.flexiReportList;
            console.log("hmm", this.exportFile);
            //this.exportFile.forEach(function (x) { delete x.languageKnown });
            this.exportFile.forEach(function (x) { delete x.qualification });
            if (num == '2') {
              if (this.showcandidateName == false) {
                this.exportFile.forEach(function (x) { delete x.candidateName });
              }
              if (this.showcandidateEmail == false) {
                this.exportFile.forEach(function (x) { delete x.candidateEmail });
              }
              if (this.showage == false) {
                this.exportFile.forEach(function (x) { delete x.age });
              }
              if (this.showaadharNo == false) {
                this.exportFile.forEach(function (x) { delete x.aadharNo });
              }
              if (this.showmotherTongue == false) {
                this.exportFile.forEach(function (x) { delete x.motherTongue });
              }
              if (this.showhighestQualification == false) {
                this.exportFile.forEach(function (x) { delete x.highestQualification });
              }
              if (this.showhiringStatus == false) {
                this.exportFile.forEach(function (x) { delete x.hiringStatus });
              }
              if (this.showcandidateNo == false) {
                this.exportFile.forEach(function (x) { delete x.candidateNo });
              }
              if (this.showemployeeNo == false) {
                this.exportFile.forEach(function (x) { delete x.employeeNo });
              }
              if (this.showlanguage == false) {
                this.exportFile.forEach(function (x) { delete x.languageKnown });
              }

              //added
              if (this.showCourse == false) {
                this.exportFile.forEach(function (x) { delete x.course });
              }
              if (this.showStream == false) {
                this.exportFile.forEach(function (x) { delete x.stream });
              }
              if (this.showExperience == false) {
                this.exportFile.forEach(function (x) { delete x.experience });
              }
              if (this.showPresentComapny == false) {
                this.exportFile.forEach(function (x) { delete x.presentComapny });
              }
              if (this.showDesignation == false) {
                this.exportFile.forEach(function (x) { delete x.designation });
              }
              if (this.showRelatives == false) {
                this.exportFile.forEach(function (x) { delete x.relatives });
              }
              if (this.showCandidateOwner == false) {
                this.exportFile.forEach(function (x) { delete x.candidateOwner });
              }
              if (this.showMappedToReq == false) {
                this.exportFile.forEach(function (x) { delete x.mappedToReq });
              }
              if (this.showReqNo == false) {
                this.exportFile.forEach(function (x) { delete x.reqNo });
              }
              if (this.showReqStatus == false) {
                this.exportFile.forEach(function (x) { delete x.reqStatus });
              }
              if (this.showMrfPrev == false) {
                this.exportFile.forEach(function (x) { delete x.mrfPrev });
              }
              if (this.showApplicationFormStatus == false) {
                this.exportFile.forEach(function (x) { delete x.applicationFormStatus });
              }
              if (this.showIsReffeded == false) {
                this.exportFile.forEach(function (x) { delete x.isReffeded });
              }
              if (this.showSource == false) {
                this.exportFile.forEach(function (x) { delete x.source });
              }
              if (this.showDateOfSubmission == false) {
                this.exportFile.forEach(function (x) { delete x.dateOfSubmission });
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
        departmentId: 0,
      }
    );
    this.flexiReportList = [];
    this.loadSelectPicker();
    //this.formSubmit('1');
    this.changeVertical();
    this.changeFunction();
  }
  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  exportToExcel() {
    const updatedArray: any[] = [];
    this.exportFile.forEach((obj) => {
      const updatedObj: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const updatedKey = this.capitalizeFirstLetter(key);
          updatedObj[updatedKey] = obj[key];
        }
      }
      updatedArray.push(updatedObj);
    });
    console.log("chck", updatedArray)
    this.ExportAsExcelFileNew(updatedArray, "FlexiReport.xls");
  }
  public ExportAsExcelFileNew(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    // Loop through each column and set the style to bold for the header row only
    for (let columnIndex = range.s.c; columnIndex <= range.e.c; columnIndex++) {
      const headerCell = XLSX.utils.encode_cell({ r: 0, c: columnIndex }); // Assuming header row is at index 0
      worksheet[headerCell].s = { font: { bold: true }, fill: { patternType: 'solid', fgColor: { rgb: 'FFFF00' } } }
    }
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');
    XLSX.writeFile(wb, 'FlexiReport.xlsx');

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
