import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
//import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { EmailtemplateService } from 'src/app/services/common/emailtemplate/emailtemplate.service';
import { IEmailTemplate, ISearchEmailTemplate } from 'src/app/interfaces/common/emailtemplate.interface';
import { IAttachmentDocumentNameDetails, ISearchAttachmentDocumentName } from 'src/app/interfaces/common/attachmentdocument.interface';
import { AttachmentdocumentService } from 'src/app/services/common/attachementdocument/attachmentdocument.service';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { PlantallocationService } from 'src/app/services/prejoining/onboardingmanager/plant/plantallocation.service';
import { CommonService } from 'src/app/services/common/common/common.service';
import { LocationService } from 'src/app/services/common/location/location.service';
import { ShareddataService } from 'src/app/sharedservices/shareddata.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
//import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { PositionService } from 'src/app/services/common/position/position.service';
import { JoinersService } from 'src/app/services/prejoining/onboardingcoordinator/joiners.service';
import { RequisitionService } from 'src/app/services/preselection/requisition/requisition.service';
import { CandidateService} from 'src/app/services/candidate/candidate/candidate.service';
import { IBatch, ISearchBatch } from 'src/app/interfaces/common/common.interface';
import { ISearchFunction, IVerticalFunction } from 'src/app/interfaces/common/function.interface';
import { ILocation, ISearchLocation } from 'src/app/interfaces/common/location.interface';
//import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { IScheduledBatchWise, IScheduledIndividually } from 'src/app/interfaces/prejoining/joinerslist.interface';
import { DepartmentService } from 'src/app/services/common/department/department.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReportService } from 'src/app/services/reports/report.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { IFunctionDepartment, ISearchDepartment } from 'src/app/interfaces/common/department.interface';




declare var jQuery: any;
@Component({
  selector: 'app-induction-program-report',
  templateUrl: './induction-program-report.component.html',
  styleUrls: ['./induction-program-report.component.css']
})
export class InductionProgramReportComponent implements OnInit {
  searchformScheduledIndividual: FormGroup;
  searchformScheduledBatchWise: FormGroup;

  @ViewChild('dtofJoiningFrom', { static: false }) dtofJoiningFrom: ElementRef;
  @ViewChild('dtofJoiningTo', { static: false }) dtofJoiningTo: ElementRef;
  @ViewChild('bfromDate', { static: false }) bfromDate: ElementRef;
  @ViewChild('btoDate', { static: false }) btoDate: ElementRef;
  @ViewChild('toDateScheduledBatch', { static: false }) toDateScheduledBatch: ElementRef;
  @ViewChild('toDatePendingBatch', { static: false }) toDatePendingBatch: ElementRef;
  @ViewChild('fromDateScheduledBatch', { static: false }) fromDateScheduledBatch: ElementRef;
  @ViewChild('batchNo', { static: false }) batchNo: ElementRef;
  parentActiveTab: string = "Individual";
  constructor(private departmentService: DepartmentService,
    private locationService:LocationService,
    private functionService: FunctionService,
    private SpinnerService: NgxSpinnerService,
    private reportService: ReportService,
    private persistance: PersistanceService,
    private _route: Router,
    private excelService: ExcelService,
    private fb: FormBuilder
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
  locations: ILocation[] = [];
  searchLocation: ISearchLocation =
  {
    locationId: null,
    verticalId: null,
    locationCode: null,
    locationNo: null,
    isActive: true
  };
  selectedVerticalId: number;
   //function
   functions: IVerticalFunction[] = [];
   selectedFunction: IVerticalFunction;
   searchFunction: ISearchFunction = {
     verticalId: null,
     functionId: null,
     isActive: true
   }
   searchCandidate = {
    batchId: null,
    onBordingMangerId: null,
    onBordingCoordinatorId: null,
    dtofJoiningFrom: "",
    dtofJoiningTo: "",
    candidateName: "",
    verticalId: null,
    locationId: null,
    functionId: null,
   }
  ngOnInit() {
    this.loadDatePicker();
    this.loadTooltipMenu();
    this.createScheduledIndividualSearchForm();
    this.createScheduledBatchwiseSearchForm();
    this.getAllVerticals();
    this.getAllFunctionDepartment();
    this.getAllLocation();
    this.getAllFunction();
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
  createScheduledIndividualSearchForm() {
    this.searchformScheduledIndividual = this.fb.group({
      candidateId: null,
      onBordingMangerId: null,
      onBordingCoordinatorId: null,
      candidateName: [''],
      verticalId: [0],
      locationId: null,
      functionId: null,
    });
  }
  createScheduledBatchwiseSearchForm() {
    this.searchformScheduledBatchWise = this.fb.group({
      batchNo: [''],
      onBordingMangerId: null,
      onBordingCoordinatorId: null,
      verticalId: [1],
      dtofJoiningFrom: [''],
      dtofJoiningTo: ['']
    });
  }
  OnClickIndividualTab() {
    this.parentActiveTab="Individual";
    this.getAllVerticals();   
    this.getIndividualNewJoiner();
    jQuery("#chkAllIndividualScheduled").prop("checked", false);

  }
  onClickBatchTab() {
    this.parentActiveTab="Batch";
    this.getAllVerticals();
    this.getBatchnewJoiner();

    jQuery("#chkAllIndividualScheduled").prop("checked", false);

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
    //locations
    getAllLocation() {
      this.locations = [];
      this.searchLocation.verticalId = 0;//this.selectedVerticalId;
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
        this.SpinnerService.hide();
      });
    }
     //Function
  getAllFunction() {
    this.functions = [];
    this.searchFunction.verticalId = 0//this.selectedVerticalId;
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;
        this.functions.splice(0, 0, {
          functionId: 0,
          functionName: "All",
          verticalId: 0,
          verticalName: "",
          isActive: true
        })
      }
      else {
        this.functions = [];
        this.functions.splice(0, 0, {
          functionId: 0,
          functionName: "All",
          verticalId: 0,
          verticalName: "",
          isActive: true
        })
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
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
    
    this.reportService.inductionReportindividual(this.searchformScheduledIndividual.value).subscribe((result) => {
      if (result) {
        //console.log(result)
        this.newJoinerIndividual=result;
        this.SpinnerService.hide();
        this.loadDataTable();
      }
    });
  }
  getBatchnewJoiner(){
        this.SpinnerService.show();
     let data = {
    //  FromDate : this.bfromDate.nativeElement.value==undefined?null:this.bfromDate.nativeElement.value,
    //   ToDate : this.btoDate.nativeElement.value==undefined?null:this.btoDate.nativeElement.value,
    DtofJoiningFrom : this.dtofJoiningFrom.nativeElement.value==undefined?null:this.dtofJoiningFrom.nativeElement.value,
    DtofJoiningTo : this.dtofJoiningTo.nativeElement.value==undefined?null:this.dtofJoiningTo.nativeElement.value,
    }
    this.reportService.inductionReportBatch(data).subscribe((result) => {
      //this.reportService.inductionReportBatch(this.searchformScheduledBatchWise.value).subscribe((result) => {
      if (result) {
        //console.log(result)

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
    this.searchformScheduledIndividual.reset();
    // this.objModel={};
    // this.dtofJoiningFrom.nativeElement.value="";
    // this.dtofJoiningTo.nativeElement.value="";
    // Assign default Vertical Value
 
  this.getAllLocation();
  this.getAllFunction();
    this.getIndividualNewJoiner();
  }
  OnClickFilterBatch()
  {
    // this.searchformScheduledBatchWise.patchValue(
    //   {
    //     dtofJoiningFrom: this.fromDateScheduledBatch.nativeElement.value,
    //     dtofJoiningTo: this.toDateScheduledBatch.nativeElement.value
    //   });
    this.getBatchnewJoiner();
  }
  OnClickBatchReset()
  {
    // this.batchModel={};
    this.dtofJoiningFrom.nativeElement.value="";
    this.dtofJoiningTo.nativeElement.value="";
    //this.batchNo.nativeElement.value="";
    // this.searchformScheduledBatchWise.reset();
    // this.getAllLocation();
    // this.getAllFunction();
    this.getBatchnewJoiner();
  }
  onClickViewCandidate(data){
    jQuery(".custom-menu").hide();
    this._route.navigate(['/app/report/inductionreportbatchwiseviewcandidate'], { queryParams: { BatchId: data.batchId, BatchNo: data.batchNo } });
  }
  downloadarray:any[]=[];
 
  onClicViewScheduleBatchWise(data,actionType) {
    jQuery(".custom-menu").hide();
    if(actionType == 1){
      this._route.navigate(['/app/scheduleinductionbatchwise'], { queryParams: { InductionType:'Candidate', IndictionTypeId: data.candidateId, IndictionTypeNo: data.candidateNo, InductionJoiningType: "B", From: "Corporate", CandidateInductionScheduleId: data.candidateInductionScheduleId, Mode: "View", UserType: "OC" } });
    }
    if(actionType == 2){
    this._route.navigate(['/app/scheduleinductionbatchwise'], { queryParams: { InductionType:'Batch', IndictionTypeId: data.batchId, IndictionTypeNo: data.batchNo, InductionJoiningType: "B", From: "Corporate", CandidateInductionScheduleId: data.candidateInductionScheduleId, Mode: "View", UserType: "OC" } });
    }

  }
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
      jQuery(".custom-menu").find(".dropdown-item").on("click", function (e) {
        jQuery(e.target).append(dropdownMenu.detach());
        jQuery(e.target).find('.custom-menu').hide();
      });
    });
  }
  
  ngOnDestroy() {
    jQuery(".custom-menu").hide();
  }
}