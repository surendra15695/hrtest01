import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IFunctionDepartment, ISearchDepartment } from 'src/app/interfaces/common/department.interface';
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { DepartmentService } from 'src/app/services/common/department/department.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { ReportService } from 'src/app/services/reports/report.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
declare var jQuery: any;
@Component({
  selector: 'app-newjoiner-report',
  templateUrl: './newjoiner-report.component.html',
  styleUrls: ['./newjoiner-report.component.css']
})
export class NewjoinerReportComponent implements OnInit {
  @ViewChild('dtofJoiningFrom', { static: false }) dtofJoiningFrom: ElementRef;
  @ViewChild('dtofJoiningTo', { static: false }) dtofJoiningTo: ElementRef;
  @ViewChild('bfromDate', { static: false }) bfromDate: ElementRef;
  @ViewChild('btoDate', { static: false }) btoDate: ElementRef;
  parentActiveTab: string = "Individual";
  constructor(private departmentService: DepartmentService,
    private SpinnerService: NgxSpinnerService,
    private reportService: ReportService,
    private persistance: PersistanceService,
    private _route: Router,
    private excelService: ExcelService
  ) { 
    if(this.persistance.get('parentActiveTab')=="Batch")
      {
        this.parentActiveTab="Batch"
      }
  }
  
  objModel: any = {};
  batchModel : any = {};
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  departments: IFunctionDepartment[] = [];
  newJoinerIndividual:any[]=[];
  newJoinerBatch:any[]=[];
  searchDepartment: ISearchDepartment = {
    departmentId: null,
    functionId: null,
    verticalId: null,
    isActive: true
  }
  ngOnInit() {
    this.loadDatePicker();
    this.getAllVerticals();
    this.getAllFunctionDepartment();
    setTimeout(() => {
      if(this.parentActiveTab=="Individual")
        {
          this.getIndividualNewJoiner();
        }
      else{
        this.getBatchnewJoiner();
      }
    })
  }
  OnClickIndividualTab() {
    this.parentActiveTab="Individual";
    this.getIndividualNewJoiner();
  }
  onClickBatchTab() {
    this.parentActiveTab="Batch";
    this.getBatchnewJoiner();
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
        "fixedColumns": {
          "left": 3
        },
        "drawCallback": function (settings) {
          setTimeout(() => {
            jQuery('[data-toggle="popover"]').popover({
              html: true
            });
          });
        }
      });
    });
  }
  loadDataTable2() {
    jQuery('#dataTable2').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable2').DataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "fixedColumns": {
          "left": 3
        },
        "drawCallback": function (settings) {
          setTimeout(() => {
            jQuery('[data-toggle="popover"]').popover({
              html: true
            });
          });
        }
      });
    });
  }
  getAllVerticals() {
    this.verticals = [];
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    //this.loadSelectPicker();
    this.objModel.verticalId = this.verticals.filter(x => x.verticalId == 0)[0].verticalId;
  }
  changeVertical() {
    console.log("vert", this.objModel.verticalId)
    this.getAllFunctionDepartment();
  }
  getAllFunctionDepartment() {
    this.departments = [];
    this.searchDepartment.verticalId = this.objModel.verticalId;
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
      this.SpinnerService.hide();
    });
  }
  getIndividualNewJoiner() {
    this.SpinnerService.show();
    let data = {
      VerticalId:this.objModel.verticalId,
      DepartmentId:this.objModel.departmentId,
      FromDate : this.dtofJoiningFrom.nativeElement.value==undefined?null:this.dtofJoiningFrom.nativeElement.value,
      ToDate : this.dtofJoiningTo.nativeElement.value==undefined?null:this.dtofJoiningTo.nativeElement.value,
    }
    this.reportService.newJoinerReport(data).subscribe((result) => {
      if (result) {
        this.newJoinerIndividual=result;
        this.SpinnerService.hide();
        this.loadDataTable();
      }
    });
  }
  getBatchnewJoiner(){
    this.SpinnerService.show();
    let data = {
      FromDate : this.bfromDate.nativeElement.value==undefined?null:this.bfromDate.nativeElement.value,
      ToDate : this.btoDate.nativeElement.value==undefined?null:this.btoDate.nativeElement.value,
    }
    this.reportService.newJoinerReportBatch(data).subscribe((result) => {
      if (result) {
        this.newJoinerBatch=result;
        this.SpinnerService.hide();
        this.loadDataTable2();
      }
    });
  }
  OnClickFilterIndividual()
  {
    this.getIndividualNewJoiner();
  }
  OnClickIndividualReset()
  {
    this.objModel={};
    this.dtofJoiningFrom.nativeElement.value="";
    this.dtofJoiningTo.nativeElement.value="";
    this.getIndividualNewJoiner();
  }
  OnClickFilterBatch()
  {
    this.getBatchnewJoiner();
  }
  OnClickBatchReset()
  {
    this.batchModel={};
    this.bfromDate.nativeElement.value="";
    this.btoDate.nativeElement.value="";
    this.getBatchnewJoiner();
  }
  onClickViewCandidate(data){
    jQuery(".custom-menu").hide();
    this._route.navigate(['/app/report/newjoinerreportbatchwisecandidate'], { queryParams: { BatchId: data.batchId, BatchNo: data.batchNo } });
  }
  downloadarray:any[]=[];
  ExportReport(data:any)
  {
    this.downloadarray=[];
      if(data=="Individual")
      {
        this.newJoinerIndividual.forEach((element,index) => {
          let headerObj = {
            "Serial No." : index+1,
            "Month" : element.month,
            "Candidate Name" : element.candidateFullName,
            "Mode of Joining" : element.modeofJoiningName,
            "Date of Joining" : element.dateofJoining,
            "Grade" : element.gradeName,
            "Department" : element.departmentName,
            "Location" : element.locationName
          }
          this.downloadarray.push(headerObj);
        })
        this.excelService.ExportAsExcelFileForReport(this.downloadarray, 'New Joiners Report');
      }
      else
      {
        this.newJoinerBatch.forEach((element,index) => {
          let headerObj = {
            "Serial No." : index+1,
            "Month" : element.month,
            "Batch Name" : element.batchNo,
            "Date of Joining" : element.dateofJoining,
            "No. of Trainees" : element.totalCandidates
          }
          this.downloadarray.push(headerObj);
        })
        this.excelService.ExportAsExcelFileForReport(this.downloadarray, 'New Joiners Report');
      }
  }
}
