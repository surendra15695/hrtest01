import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IStatus } from '../../../interfaces/common/common.interface';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { CommonService } from '../../../services/common/common/common.service';
import { LocationService } from '../../../services/common/location/location.service';
import { ExcelService } from '../../../services/excel/excel.service';
//import { RequisitionService } from '../../../services/preselection/requisition/requisition.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { ReportService } from '../../../services/reports/report.service';
import { FunctionService } from '../../../services/common/function/function.service';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, } from '../../../interfaces/common/function.interface';
import { IRequisitionDetailData, IRequisitionList, ISearchRequisition } from '../../../interfaces/preselection/requisition.interface';
import { RequisitionService } from '../../../services/preselection/requisition/requisition.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
declare var jQuery: any;

@Component({
  selector: 'app-rqst-functionalhead-requisition-report',
  templateUrl: './rqst-functionalhead-requisition-report.component.html',
  styleUrls: ['./rqst-functionalhead-requisition-report.component.css']
})
export class RqstFunctionalheadRequisitionReportComponent implements OnInit {

  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  searchform: FormGroup;

  requisitionTypeId: number;
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
  //status
  statuses: IStatus[] = [];
  selectedStatus: IStatus;
  rqstFunctionalheadRequisitionLists: any[] = [];
  verticalIds: string;


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

  //functionalHead
  functionalhead: any[] = [];

  createdBy: number;

  constructor(
    private SpinnerService: NgxSpinnerService,
    private persistance: PersistanceService,
    private commonService: CommonService,
    private locationService: LocationService,
    private excelService: ExcelService,
    private fb: FormBuilder,
    private functionService: FunctionService,
    private requisitionService: RequisitionService,
    private reportService: ReportService,
    private notificationService: NotificationService,
  ) {
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllFunction();
    this.getAllFunctionalHead();
    this.createForm();
  }

  ngOnInit() {
    this.loadDatePicker();
    this.loadDataTable();
    setTimeout(() => {
      this.fromSubmit();
    })
  }

  createForm(){
    this.searchform = this.fb.group({
      requisitionNo: [''],
      candidateNo: [''],
      fromDate: [''],
      toDate: [''],
      verticalId: [0],
      locationId: [0],
      functionId: [0],   
      approverAutoUserId: [],
      AllocatedAutoUserId: [0],
    });
  }
  //verticals
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
    this.selectedFunction = this.functions.filter(x => x.functionId == 0)[0];
  }
  getAllFunctionalHead() {
    this.functionalhead = [];
    var obj = {
      approverAutoUserId: "",
      empNo: "",
      empName: ""
    }
    this.reportService.functionalheadNameForAll(obj).subscribe((result: any) => {
      if (result) {
        this.functionalhead = result;
         //console.log("arg", result)
          }
        }, 
        error => {
            console.log(error);
         },() => {
        this.loadSelectPicker();
     })
  }
  loadSelectPicker() {
    setTimeout(() => {
      jQuery('.selectpicker').selectpicker({
        size: 6
      });
      jQuery('.selectpicker').selectpicker('refresh');
    });
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
          createdBy: null
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
          createdBy: null
        })
      }
    }, error => {
      console.log(error);
    }, () => {
      //this.loadSelectPicker();
    });
  }


  changeFuction() {
    this.searchFunction.functionId = this.searchform.get("functionId").value;
  }

  changeRequisition() {
    let x = this.searchform.get('requisitionTypeId').value;
    this.reportService.requisitionTypeId = Number(x);
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
  exportToExcel() {
    this.rqstFunctionalheadRequisitionLists.forEach((e,index)=>{
      e.serialNo = index+1;
    })
    const updatedArray: any[] = [];
    this.rqstFunctionalheadRequisitionLists.forEach((obj) => {
    const updatedObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const updatedKey = this.capitalizeFirstLetter(key);
        updatedObj[updatedKey] = obj[key];
      }
    }
    updatedArray.push(updatedObj);
  });
    this.excelService.ExportAsExcelFileForReport(updatedArray, "Req & Fun Head - Requisition Report");
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
        fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,
        //functionId: this.searchFunction.functionId,
         //requisitionTypeId: this.reportService.requisitionTypeId,
        // createdBy: this.persistance.get('loggedinuser').autoUserId,
        // ApproverAutoUserId: this.persistance.get('loggedinuser').autoUserId
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
    if(flag == 0){
      this.rqstFunctionalheadRequisitionLists = [];
      this.SpinnerService.show();
      this.reportService.reportrequesterfunctionalheadrequisition(this.searchform.value).subscribe((result) => {
        if (result) {
          //console.log(result);
          this.rqstFunctionalheadRequisitionLists = result;
          this.loadDataTable();
          this.SpinnerService.hide();
        }
        else {
          this.rqstFunctionalheadRequisitionLists = [];
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
  }

  reset() {
    this.searchform.reset();
    this.searchform.patchValue({
      verticalId: 0,
      locationId: 0,
      functionId: 0,
      //approverAutoUserId: 0
    })
    this.changeVertical();
    this.fromSubmit();
  }
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }

}
