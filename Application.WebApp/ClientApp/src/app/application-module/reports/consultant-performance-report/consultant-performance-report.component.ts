import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IconsultantPerformanceLists } from '../../../interfaces/common/common.interface';
import { IRequisitionList, ISearchRequisition } from '../../../interfaces/preselection/requisition.interface';
import { ISearchVendor, IVendor } from '../../../interfaces/vendor/vendor.interface';
import { CommonService } from '../../../services/common/common/common.service';
import { RequisitionService } from '../../../services/preselection/requisition/requisition.service';
import { ReportService } from '../../../services/reports/report.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
declare var jQuery: any;

@Component({
  selector: 'app-consultant-performance-report',
  templateUrl: './consultant-performance-report.component.html',
  styleUrls: ['./consultant-performance-report.component.css']
})
export class ConsultantPerformanceReportComponent implements OnInit {
  searchform: FormGroup;
  requisitionLists: IRequisitionList[] = [];
  SearchReqNo: ISearchRequisition = {
    requisitionNo: null,
    requistionId: null,
    requisitionDetailId: null,
    locationId: null,
    verticalId: null,
    fromDate: null,
    toDate: null,
    iOMNo: null,
    requisitionApprovalStatus: null,
    requisitionProcessStatus: null,
    createdBy: null,
    approverAutoUserId: null,
    allocatedUserId: null,
    requisitionTypeId: null

  }
  searchVendor: ISearchVendor = {
    vendorId: null,
    isActive: null
  }
  vendorList: any[] = [];
  vendors: IVendor[] = [];
  consultantPerformanceLists: IconsultantPerformanceLists[] = [];
  constructor(
    private SpinnerService: NgxSpinnerService,
    private persistance: PersistanceService,
    private commonService: CommonService,
    private requisitionService: RequisitionService,
    private fb: FormBuilder,
    private reportService: ReportService,
    private excelService: ExcelService,
  )
  {
    this.createForm();
    this.selectedRequisition();
    this.getAllVendor();
  }

  ngOnInit() {
    this.loadSelectPicker();
    this.loadDataTable();
    setTimeout(() => {
      this.fromSubmit();
    })
  }

  createForm() {
    this.searchform = this.fb.group({
      requisitionNo: [''],
      vendorId: [0],
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
          "left": 3
        }
      });
    });
  }
  // Requisition
  selectedRequisition() {
    this.requisitionLists = [];
    var obj = {
      ReqNo: "",
      ReqId: 0
    }
    //this.SearchReqNo.requisitionNo = this.SearchReqNo.requisitionNo;
    this.requisitionService.getAllRequisition(obj).subscribe((result) => {
      if (result) {
        this.requisitionLists = result;
        console.log("req", result)
      }
    }, error => {
      console.log(error);
    }, () => {
      //this.loadSelectPicker();
    });
  }
  changeRequisitionNo() {
    this.SearchReqNo.requisitionNo = this.SearchReqNo.requisitionNo;
  }
  getAllVendor() {
    //this.SpinnerService.show();
    this.commonService.getAllVendor(this.searchVendor).subscribe((response: any) => {
      if (response) {
        this.vendors = response;
        //this.vendorList = response;
        console.log("vendor", response)
    
        this.vendors.splice(0, 0, {
          vendorId: 0,
          vendorName: "",
          emailId: "",
          alternateEmailId: "",
          contactNo: "",
          alternateContactNo: "",
          website: "",
          city: "",
          street: "",
          zipCode: "",
          stateId: 0,
          statename: "",
          termsOfService: "",
          isActive: true
        })
      }
      else {
        this.vendors = [];
        this.vendors.splice(0, 0, {
          vendorId: 0,
          vendorName: "",
          emailId: "",
          alternateEmailId: "",
          contactNo: "",
          alternateContactNo: "",
          website: "",
          city: "",
          street: "",
          zipCode: "",
          stateId: 0,
          statename: "",
          termsOfService: "",
          isActive: true
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  onchangeReqNoVendor() {
    this.SearchReqNo.requisitionNo = this.searchform.get("requisitionNo").value;
    this.searchVendor.vendorId = this.searchform.get("vendorId").value;
  }
  fromSubmit() {
    // this.searchform.patchValue(
    //   {
    //     vendorId: this.searchVendor.vendorId,
    //     requisitionNo: this.SearchReqNo.requisitionNo
    //   });
    console.log(this.searchform.value);
    this.consultantPerformanceLists = [];
    this.SpinnerService.show();
    this.reportService.getAllConsultantPerformance(this.searchform.value).subscribe((result) => {
      if (result) {
        //console.log(result);
        this.consultantPerformanceLists = result;
        console.log("list", result)
        this.loadDataTable();
        this.SpinnerService.hide();
      }
      else {
        this.consultantPerformanceLists = [];
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
  ExportReport() {
    var htmls = "";
    var uri = 'data:application/vnd.ms-excel;base64,';
    var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
    var base64 = function (s) {
      return window.btoa(unescape(encodeURIComponent(s)))
    };
    var format = function (s, c) {
      return s.replace(/{(\w+)}/g, function (m, p) {
        return c[p];
      })
    };
    htmls = jQuery("#exportTable").html();
    var ctx = {
      worksheet: 'Worksheet',
      table: htmls
    }
    var link = document.createElement("a");
    link.download = "Consultant Performance Report.xls";
    link.href = uri + base64(format(template, ctx));
    link.click();
  }
  reset() {
    this.searchform.reset();
    this.searchform.patchValue({
      vendorId: 0,
      requisitionNo: ''
    })
    this.fromSubmit();
    this.consultantPerformanceLists = [];
    //this.loadSelectPicker();
    //this.requisitionLists = [];
    this.loadDataTable();
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
