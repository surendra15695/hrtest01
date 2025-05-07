import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction } from '../../../interfaces/common/function.interface';
import { IFunctionDepartment, ISearchDepartment } from '../../../interfaces/common/department.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../interfaces/common/position.interface';
import { LocationService } from '../../../services/common/location/location.service';
import { FunctionService } from '../../../services/common/function/function.service';
import { DepartmentService } from '../../../services/common/department/department.service';
import { PositionService } from '../../../services/common/position/position.service';
import { ShareddataService } from '../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ReportService } from 'src/app/services/reports/report.service';
import { CommonService } from 'src/app/services/common/common/common.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
declare var jQuery: any;
@Component({
  selector: 'app-sap-and-digital-variance',
  templateUrl: './sap-and-digital-variance.component.html',
  styleUrls: ['./sap-and-digital-variance.component.css']
})
export class SapAndDigitalVarianceComponent implements OnInit {
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

  sapVarianceList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private commonService: CommonService,
    private reportService: ReportService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
    private functionService: FunctionService,
    private excelService: ExcelService,
  ) { 
    this.createForm();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllFunction();
    this.sapVarianceList = [];
  }

  ngOnInit() {
    this.loadDataTable();
    setTimeout(() => {
      this.fromSubmit();
    })
  }

  createForm() {
    this.searchform = this.fb.group({
      verticalId: [0],
      locationId: [0],
      functionId: [0],
    });
  }

  //vertical
  getAllVerticals(){
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

  fromSubmit() {
    this.sapVarianceList = [];
    this.searchform.patchValue(
      {
        verticalId: this.selectedVertical.verticalId
      });
    this.SpinnerService.show();
    this.reportService.sapVarianceReport(this.searchform.value).subscribe((result) => {
      if (result) {
        this.sapVarianceList = result;
        this.loadDataTable();
        this.SpinnerService.hide();
      }
      else {
        this.sapVarianceList = [];
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
      verticalId: 0,
      locationId: 0,
      functionId: 0
    })
    //this.loadSelectPicker();
    //this.requisitionLists = [];
    //this.loadDataTable();
    this.changeVertical();
    this.fromSubmit();
  }

  exportToExcel() {
    this.excelService.ExportAsExcelFileForReport(this.sapVarianceList, "SAP and digital variance Report");
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
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
      });
    });
  }  
}
