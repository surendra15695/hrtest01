import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IRecruiterPerformanceReportList } from '../../../interfaces/common/common.interface';
import { IPositionList, ISearchPositionList } from '../../../interfaces/common/position.interface';
import { IRequisitionList, ISearchRequisition } from '../../../interfaces/preselection/requisition.interface';
import { CommonService } from '../../../services/common/common/common.service';
import { PositionService } from '../../../services/common/position/position.service';
import { RequisitionService } from '../../../services/preselection/requisition/requisition.service';
import { ReportService } from '../../../services/reports/report.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { ISearchFunction, IVerticalFunction } from 'src/app/interfaces/common/function.interface';
import { FunctionService } from 'src/app/services/common/function/function.service';
declare var jQuery: any;

@Component({
  selector: 'app-recruiterperformance-report',
  templateUrl: './recruiterperformance-report.component.html',
  styleUrls: ['./recruiterperformance-report.component.css']
})
export class RecruiterperformanceReportComponent implements OnInit {
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  searchform: FormGroup;
  PositionList: any[] = [];
  positions: IPositionList[] = [];
  verticals:any[]=[];
  functions:any[]=[];
  selectedVertical: IVertical;
  selectedFunction: IVerticalFunction;
  searchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  searchPosition: ISearchPositionList =
    {
      positionId: null,
      isActive: true
    }
  recruiterperformancereportLists: any[] = [];
  constructor(
    private SpinnerService: NgxSpinnerService,
    private persistance: PersistanceService,
    private reportService: ReportService,
    private fb: FormBuilder,
    private requisitionService: RequisitionService,
    private positionService: PositionService,
    private excelService: ExcelService,
    private notificationService: NotificationService,
    private functionService: FunctionService,
  ) {
    this.createForm();
    this.getAllPositionMaster();
    
  }
  ngOnInit() {
    this.getAllVerticals();
    this.getAllFunction();
    this.loadDatePicker();
    //this.loadDataTable();
    setTimeout(() => {
      this.fromSubmit();
    })
  }
  getAllVerticals(){
    this.verticals = [];
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    this.loadSelectPicker();
    this.selectedVertical = this.verticals.filter(x => x.verticalId == 0)[0];
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
  changeVertical() {
    var verticalId = this.searchform.get("verticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0];
    this.getAllFunction();
  }
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }
  createForm() {
    this.searchform = this.fb.group({
      requisitionNo: [''],
      positionId: [0],
      fromDate: [''],       
      toDate: [''], 
      verticalId: [0],
      functionId: [0],      
    });
  }
  //Position
  getAllPositionMaster() {
    this.positionService.getAllPositionMaster(this.searchPosition).subscribe((response: any) => {
      if (response) {
        this.positions = response;
        this.positions.splice(0, 0, {
          positionId: 0,
          positionName: "All",
          isActive: true,
          createdBy: 0
        })
      }
      else {
        this.positions = [];
        this.positions.splice(0, 0, {
          positionId: 0,
          positionName: "All",
          isActive: true,
          createdBy: 0
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    })
  }
  onchangePosition() {
    this.searchPosition.positionId = this.searchform.get("positionId").value;
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
        "fixedColumns":{
          "left":4
        }
      });
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
  ExportReport(){
    if(this.recruiterperformancereportLists.length != 0){
      this.recruiterperformancereportLists.forEach((e,index)=>{
        e.serialNo = index+1;
      })
      const updatedArray: any[] = [];
      this.recruiterperformancereportLists.forEach((obj) => {
      const updatedObj: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const updatedKey = this.capitalizeFirstLetter(key);
          updatedObj[updatedKey] = obj[key];
        }
      }
      updatedArray.push(updatedObj);
    });
      this.excelService.ExportAsExcelFileForReport(updatedArray, 'Recruiter Performance Report');
    }
  }
  fromSubmit() {
    var flag = 0;
    this.searchform.patchValue(
      {
        positionId: this.searchPosition.positionId,
        fromDate: this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value,
        verticalId: this.selectedVertical.verticalId
      }
    )
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
    if(flag==0)
    {
      console.log(this.searchform.value);
    this.recruiterperformancereportLists = [];
      this.SpinnerService.show();
    this.reportService.recruiterperformancereport(this.searchform.value).subscribe((result) => {
      if (result) {
        //console.log("Piu", result)
        this.recruiterperformancereportLists = result;
        this.loadDataTable();
        this.SpinnerService.hide();
      }
      else {
        this.recruiterperformancereportLists = [];
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
  loadTooltipMenu() {
    setTimeout(() => {
      var body_ = jQuery('body');
      var dropdownMenu,
        table_responsive = jQuery('.table-responsive');
      table_responsive.on('show.bs.dropdown', function (e) {
        dropdownMenu = jQuery(e.target).find('.custom-menu');
        body_.append(dropdownMenu.detach());
        var eOffset = jQuery(e.target).offset();
        dropdownMenu.css({
          'display': 'block',
          'top': eOffset.top + jQuery(e.target).outerHeight(),
          'left': eOffset.left,
          'font-size': '14px'
        });
        dropdownMenu.addClass("mobPosDropdown");
      });
      table_responsive.on('hide.bs.dropdown', function (e) {
        jQuery(e.target).append(dropdownMenu.detach());
        jQuery(e.target).find('.dropdown-menu').hide();
      });
      jQuery(".dropdown-item").on("click", function () {
        jQuery('.dropdown-menu').hide();
      });
    });
  }
  reset() {
    this.searchform.reset();
    this.searchform.patchValue({
      positionId: 0,
      verticalId: 0,
      functionId: 0,
    })
    this.onchangePosition();
    this.changeVertical();
    this.fromSubmit();
    
    // this.loadSelectPicker(); 
    // this.loadDataTable();
  }
}
