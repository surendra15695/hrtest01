import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IStatus } from '../../../interfaces/common/common.interface';
import { ISearchFunction, IVerticalFunction } from '../../../interfaces/common/function.interface';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { IEmployeeNo, IsearchEmployeeNo } from '../../../interfaces/joining/hiringteam.interface';
import { CommonService } from '../../../services/common/common/common.service';
import { FunctionService } from '../../../services/common/function/function.service';
import { LocationService } from '../../../services/common/location/location.service';
import { ExcelService } from '../../../services/excel/excel.service';
import { HiringteamService } from '../../../services/joining/hiringteam/hiringteam.service';
import { RequisitionService } from '../../../services/preselection/requisition/requisition.service';
import { ReportService } from '../../../services/reports/report.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';

declare var jQuery: any;

@Component({
  selector: 'app-vendorcandidate-report',
  templateUrl: './vendorcandidate-report.component.html',
  styleUrls: ['./vendorcandidate-report.component.css']
})
export class VendorcandidateReportComponent implements OnInit {
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  searchform: FormGroup;
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

  //status
  statuses: IStatus[] = [];
  selectedStatus: IStatus;
  vendorcandidateLists: any[] = [];
  verticalIds: string;


  employeeNoDetails: IEmployeeNo[] = [];
  employeeNo: string;
  disableEmployeeNoField: boolean;
  //searchEmployeeNo: IsearchEmployeeNo = {
  //  candidateId: null
  //}

  searchEmployeeNo: IEmployeeNo = {
    //candidateId: null
    requisitionDetailId: null,
    candidateId: null,
    candidateNo: null,
    candidateFullName: null,
    candidateEmployeeNoId: null,
    empployeeNo: null,
    empId: null
  }

  constructor(
    private SpinnerService: NgxSpinnerService,
    private persistance: PersistanceService,
    private commonService: CommonService,
    private locationService: LocationService,
    private requisitionService: RequisitionService,
    private reportService: ReportService,
    private excelService: ExcelService,
    private functionService: FunctionService,
    private notificationService: NotificationService,
    private hiringteamService: HiringteamService,
    private fb: FormBuilder
  ) {
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllFunction();
    this.getAllStatus();
    this.getEmoloyeeNo();
    this.createForm();
  }

  ngOnInit() {
    this.loadDatePicker();
    this.loadDataTable();
    setTimeout(() => {
      this.fromSubmit();
    })
  }
  createForm() {
    this.searchform = this.fb.group({
      requisitionNo: [''],
      verticalId: [0],
      functionId: [0],
      locationId: [0],
      candidateNo: [''],
      fromDate: [''],       
      toDate: [''],  
      empployeeNo: ['']
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

  //verticals
  // getAllVerticals() {
  //   this.verticals = [];
  //   this.verticalIds = "1,2,3";
  //   var splitvertical = this.verticalIds.split(",");
  //   var allvertical = "";
  //   console.log(splitvertical);
  //   for (var i = 0; i < splitvertical.length; i++) {
  //     if (splitvertical[i] != "0") {
  //       if (splitvertical[i] == "1") {
  //         this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
  //       }
  //       else if (splitvertical[i] == "2") {
  //         this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
  //       }
  //       else if (splitvertical[i] == "3") {
  //         this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
  //       }
  //       if (allvertical == "") {
  //         allvertical = splitvertical[i];
  //       }
  //       else {
  //         allvertical = allvertical + "," + splitvertical[i];
  //       }
  //     }

  //   }
  //   this.selectedVertical = this.verticals[0];
  //   this.setDefaultVertical();
  //   this.getAllFunction();
  // }
  getAllVerticals(){
    this.verticals = [];
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    this.loadSelectPicker();
    this.selectedVertical = this.verticals.filter(x => x.verticalId == 0)[0];
  }


  setDefaultVertical() {
    setTimeout(() => {
      jQuery('.ddlvertical').selectpicker("val", "0: " + this.selectedVertical.verticalId + "");
      jQuery('.ddlvertical').selectpicker("refresh");
    });
  }

  changeVertical() {
    var verticalId = this.searchform.get("verticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0];
    console.log(this.selectedVertical);
    this.getAllLocation();
    this.getAllFunction();
  }

  //locations
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
      //this.loadSelectPicker();
    });
  }


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
          verticalName:""
        })
      }
      else {
        this.functions = [];
        this.functions.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          isActive: true,
          verticalName:""
        })
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }


  changeFuction() {
    this.searchFunction.functionId = this.searchform.get("functionId").value;
  }

  getEmoloyeeNo() {
    this.employeeNoDetails = [];
    this.hiringteamService.getEmployeeNoDetails(this.searchEmployeeNo).subscribe((result) => {
      if (result) {
        this.employeeNoDetails = result;
        this.employeeNoDetails.splice(0, 0, {
          requisitionDetailId: 0,
          candidateId: 0,
          candidateNo: "All",
          candidateFullName: "",
          candidateEmployeeNoId: 0,
          empployeeNo: "All",
          empId: 0
        })
      }
      else {
        this.employeeNoDetails = [];
        this.employeeNoDetails.splice(0, 0, {
          requisitionDetailId: 0,
          candidateId: 0,
          candidateNo: "ALL",
          candidateFullName: "",
          candidateEmployeeNoId: 0,
          empployeeNo: "All",
          empId: 0
        })
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }

  changeEmoloyeeNo() {
    this.searchEmployeeNo.empployeeNo = this.searchform.get("empployeeNo").value;
  }

  changeCandidateNo() {
    this.searchEmployeeNo.candidateNo = this.searchform.get("candidateNo").value;
  }

  //status
  getAllStatus() {
    this.statuses = [];
    this.commonService.getAllStatus().subscribe((result) => {
      if (result) {
        this.statuses = result.filter(x => x.statusTypeId == 2);
        this.statuses.splice(0, 0, {
          statusId: 0,
          statusName: "All",
          statusTypeId: 2,
          statusTypeName: "RequisitionProcessStatus",
          statusIcon: ""
        })
      }
      else {
        this.statuses = [];
        this.statuses.splice(0, 0, {
          statusId: 0,
          statusName: "All",
          statusTypeId: 2,
          statusTypeName: "RequisitionProcessStatus",
          statusIcon: ""
        })
      }
    }, error => {
      console.log(error);
    }, () => {
      //this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }
  capitalizeFirstLetter(str: string): string {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (i > 0 && str[i] === str[i].toUpperCase()) {
            result += ' ';
        }
        result += str[i];
    }
    return result.charAt(0).toUpperCase()+ result.slice(1);;

  }
  exportToExcel(){
    if(this.vendorcandidateLists.length != 0){
      const updatedArray: any[] = [];
      this.vendorcandidateLists.forEach((obj) => {
      const updatedObj: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const updatedKey = this.capitalizeFirstLetter(key);
          updatedObj[updatedKey] = obj[key];
        }
      }
      updatedArray.push(updatedObj);
    });
      this.excelService.ExportAsExcelFileForReport(updatedArray, 'Vendor Report');
    }
  }

  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "fixedColumns":{
          "left": 4
        }
      });
    });
  }

  fromSubmit() {
    var flag = 0;
    this.searchform.patchValue(
      {
        verticalId: this.selectedVertical.verticalId,
        // functionId: this.searchFunction.functionId,
        fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,
        // createdBy: this.persistance.get('loggedinuser').autoUserId,
        // approverAutoUserId: this.persistance.get('loggedinuser').autoUserId,
        // candidateNo: this.searchEmployeeNo.candidateNo,
        // empNo: this.searchEmployeeNo.empployeeNo
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
      if(flag==0){
        this.vendorcandidateLists = [];
        this.SpinnerService.show();
        this.reportService.vendorcandidateReport(this.searchform.value).subscribe((result) => {
          if (result) {
            console.log(result);
            this.vendorcandidateLists = result;
            this.loadDataTable();
            this.SpinnerService.hide();
          }
          else {
            this.vendorcandidateLists = [];
            this.SpinnerService.hide();
          }
        }, error => {
          console.log(error);
          this.SpinnerService.hide();
        }, () => {
          this.SpinnerService.hide();
        });
      }
   
  }
  reset(){
    this.searchform.reset();
    this.searchform.patchValue({
      // requisitionNo:'',
      verticalId: 0,
      locationId: 0,
      functionId: 0
    })
    this.changeFuction();
    this.changeVertical();
    this.fromSubmit();
   
  }

  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true,
    });
  }
}

