import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IFunctionDepartment, ISearchDepartment } from 'src/app/interfaces/common/department.interface';
import { ISearchFunction, IVerticalFunction } from 'src/app/interfaces/common/function.interface';
import { IStatus } from '../../../interfaces/common/common.interface';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { CommonService } from '../../../services/common/common/common.service';
import { LocationService } from '../../../services/common/location/location.service';
import { ExcelService } from '../../../services/excel/excel.service';
import { RequisitionService } from '../../../services/preselection/requisition/requisition.service';
import { ReportService } from '../../../services/reports/report.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { DepartmentService } from 'src/app/services/common/department/department.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { CandidateService } from '../../../services/preselection/candidate/candidate.service';
import { IGrade, ISearchGrade } from 'src/app/interfaces/common/grade.interface';
import { GradeService } from 'src/app/services/common/grade/grade.service';
import { NotificationService } from '../../../sharedservices/notification.service';
declare var jQuery: any;

@Component({
  selector: 'app-functionalhead-attrition-report',
  templateUrl: './functionalhead-attrition-report.component.html',
  styleUrls: ['./functionalhead-attrition-report.component.css']
})
export class FunctionalheadAttritionReportComponent implements OnInit {
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  searchform: FormGroup;
  //vertical
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  //functions
  functions: IVerticalFunction[] = [];
  selectedFunction: IVerticalFunction;
  searchFunction: ISearchFunction =
    {
      verticalId: null,
      functionId: null,
      isActive: true
    };
  functionId: number;
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
  functionalheadAttritionLists: any[] = [];

//department
departments: IFunctionDepartment[] = [];
selectedDepartment: IFunctionDepartment;
searchDepartment: ISearchDepartment = {
  departmentId:null,
  functionId:null,
  verticalId:null,
  isActive:true
}
departmentId: number;
departmentName: string;
  verticalIds: string;
  //grade
  grades:IGrade[] = [];
  selectedGrade: IGrade;
  searchGrade: ISearchGrade = {
    gradeId: null,
    isActive: true
  }
  gradeId: number;
  gradeName: string;


  constructor(
    private SpinnerService: NgxSpinnerService,
    private candidateService: CandidateService,
    private persistance: PersistanceService,
    private commonService: CommonService,
    private functionService: FunctionService,
    private departmentService: DepartmentService,
    private locationService: LocationService,
    private requisitionService: RequisitionService,
    private excelService: ExcelService,
    private gradeService: GradeService,
    private notificationService: NotificationService,
    private reportService: ReportService,
    private fb: FormBuilder
  ) {
    this.createForm();
    this.getAllVerticals();
     this.getAllLocation();
    this.getAllFunction();
    this.getAllFunctionDepartment();
    this.getAllStatus();
    this.getAllGrades()
    
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
      locationId: [0],
      gradeId:[0],
      functionId: [0],
      fromDate: [''],
      toDate: [''],
      iOMNo: [''],
      requisitionProcessStatus: [0]
    });
  }

//verticals
getAllVerticals(){
  this.verticals = [];
  this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
  this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
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
          verticalName: "",
          isActive: true
        })
      }
      else {
        this.functions = [];
        this.functions.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          verticalName: "",
          isActive: true
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  setDefaultVertical() {
    setTimeout(() => {
      jQuery('.ddlvertical').selectpicker("val", "0: " + this.selectedVertical.verticalId + "");
      jQuery('.ddlvertical').selectpicker("refresh");
    });
  }
 
  changeFunction(){
    // var functionId = this.searchform.get("functionId").value;
    // this.selectedFunction = this.functions.filter(x => x.functionId == functionId)[0];
    this.getAllFunctionDepartment();
  }
  getAllFunctionDepartment() {
    this.departments = [];
    this.searchDepartment.verticalId = this.selectedVertical.verticalId;
    this.searchDepartment.functionId = this.searchform.value.functionId;
   console.log("functionid", this.searchDepartment)
    this.departmentService.getAllFunctionDepartment(this.searchDepartment).subscribe((response: any) => {
      if (response) {
        this.departments = response;
        this.departments.splice(0,0, {
          departmentId:0,
          departmentName:"All",
          verticalId:0,
          verticalName:"",
          functionName:"All",
          functionId:0,
          isActive:true,
        })              
      }
      else {
        this.departments = [];
        this.departments.splice(0,0, {
          departmentId:0,
          departmentName:"All",
          verticalId:0,
          verticalName:"",
          functionName:"All",
          functionId:0,
          isActive:true,
        }) 
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
      this.SpinnerService.hide(); 
    });
  }
  //grade
  getAllGrades() {
    this.gradeService.getAllGrade(this.searchGrade).subscribe((response: any) => {
      if (response) {
        this.grades = response;
        this.grades.splice(0, 0, {
          gradeId: 0,
          gradeName: "All",
          isActive: true,
          createdBy: 0
        })
      }
      else {
        this.grades = [];
        this.grades.splice(0, 0, {
          gradeId: 0,
          gradeName: "All",
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

  exportToExcel() {
    this.excelService.ExportAsExcelFileForReport(this.functionalheadAttritionLists, "Function Head - Attrition Report");
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
        //functionId: this.selectedFunction.functionId,
        fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,
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
        this.functionalheadAttritionLists = [];
        this.SpinnerService.show();
        this.reportService.functionalAttritionHeadReport(this.searchform.value).subscribe((result) => {
          if (result) {
            console.log(result);
            this.functionalheadAttritionLists = result;
            this.loadDataTable();
            this.SpinnerService.hide();
          }
          else {
            this.functionalheadAttritionLists = [];
            this.SpinnerService.hide();
          }
        }, error => {
          console.log(error);
          this.SpinnerService.hide();
        }, () => {
          this.SpinnerService.hide();
        });
      }
    //   if(flag == 0){
    //     console.log(this.searchform.value);
    //     this.SpinnerService.show();
    //     this.reportService.functionalAttritionHeadReport(this.searchform.value).subscribe((result) => {
    //       if (result) {
    //         console.log("hii",result);
    //         this.functionalheadAttritionLists = result;
    //         this.loadDataTable();
    //         this.SpinnerService.hide();
    //       }
    //       else {
    //         this.functionalheadAttritionLists = [];
    //         this.SpinnerService.hide();
    //       }
    //     }, error => {
    //       console.log(error);
    //       this.SpinnerService.hide();
    //     }, () => {
    //       this.SpinnerService.hide();
    //     });
    //  }
  }
  reset(){
    this.searchform.reset();
    this.searchform.patchValue({
      verticalId: 0,
      locationId: 0,
      functionId: 0,
      gradeId: 0,
      
    })
    this.changeVertical();
    this.changeFunction();
    this.fromSubmit();
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
}


