import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IFunctionDepartment, ISearchDepartment } from 'src/app/interfaces/common/department.interface';
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { DepartmentService } from 'src/app/services/common/department/department.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { ReportService } from 'src/app/services/reports/report.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
declare var jQuery: any;
@Component({
  selector: 'app-newjoinerbatch-wise-candidate',
  templateUrl: './newjoinerbatch-wise-candidate.component.html',
  styleUrls: ['./newjoinerbatch-wise-candidate.component.css']
})
export class NewjoinerbatchWiseCandidateComponent implements OnInit {
  @ViewChild('dtofJoiningFrom', { static: false }) dtofJoiningFrom: ElementRef;
  @ViewChild('dtofJoiningTo', { static: false }) dtofJoiningTo: ElementRef;
  batchId: number;
  batchNo: string;
  objModel:any={};
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  departments: IFunctionDepartment[] = [];
  searchDepartment: ISearchDepartment = {
    departmentId: null,
    functionId: null,
    verticalId: null,
    isActive: true
  }
  newJoinerBatchWiseCandidate:any[]=[];
  constructor(public activatedRoute: ActivatedRoute,
    private departmentService: DepartmentService,
    private SpinnerService: NgxSpinnerService,
    private reportService: ReportService,
    private _route: Router,
    private persistance: PersistanceService,
    private excelService: ExcelService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.batchId = params['BatchId'];
      this.batchNo = params['BatchNo'];
   })
  }

  ngOnInit() {
    this.loadDatePicker();
    this.getAllVerticals();
    this.getAllFunctionDepartment();
    setTimeout(() => {
      this.getbatchwiseCandidate();
    })
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
  getbatchwiseCandidate()
  {
    this.SpinnerService.show();
    let data = {
      BatchId:Number(this.batchId),
      VerticalId:this.objModel.verticalId,
      DepartmentId:this.objModel.departmentId,
      FromDate : this.dtofJoiningFrom.nativeElement.value==undefined?null:this.dtofJoiningFrom.nativeElement.value,
      ToDate : this.dtofJoiningTo.nativeElement.value==undefined?null:this.dtofJoiningTo.nativeElement.value,
    }
    this.reportService.newJoinerReportBatchWiseCandidate(data).subscribe((result) => {
      if (result) {
        this.newJoinerBatchWiseCandidate=result;
        this.SpinnerService.hide();
        this.loadDataTable();
      }
    });
  }
  OnClickFilterIndividual()
  {
    this.getbatchwiseCandidate();
  }
  OnClickIndividualReset()
  {
    this.objModel={};
    this.dtofJoiningFrom.nativeElement.value="";
    this.dtofJoiningTo.nativeElement.value="";
    this.getbatchwiseCandidate();
  }
  onClickBack()
  {
    this.persistance.set('parentActiveTab', "Batch");
    this._route.navigate(['/app/report/newjoinerreport'])
  }
  downloadarray:any[]=[];
  ExportReport()
  {
    this.downloadarray=[];
    this.newJoinerBatchWiseCandidate.forEach((element,index) => {
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
}
