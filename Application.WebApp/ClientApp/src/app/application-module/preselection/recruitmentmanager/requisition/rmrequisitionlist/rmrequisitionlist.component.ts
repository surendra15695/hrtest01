import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../../interfaces/common/vertical.interface';
import { IStatus } from '../../../../../interfaces/common/common.interface';
import { ILocation, ISearchLocation } from '../../../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction } from '../../../../../interfaces/common/function.interface';
import { IFunctionDepartment, ISearchDepartment } from '../../../../../interfaces/common/department.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../../interfaces/common/position.interface';
import { ISearchRequisition, IRequisitionList } from '../../../../../interfaces/preselection/requisition.interface';
import { LocationService } from '../../../../../services/common/location/location.service';
import { CommonService } from '../../../../../services/common/common/common.service';
import { FunctionService } from '../../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../../services/common/department/department.service';
import { PositionService } from '../../../../../services/common/position/position.service';
import { RequisitionService } from '../../../../../services/preselection/requisition/requisition.service';
import { ShareddataService } from '../../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { NgxSpinnerService } from "ngx-spinner";
declare var jQuery: any;
declare var html2pdf: any;

@Component({
  selector: 'app-rmrequisitionlist',
  templateUrl: './rmrequisitionlist.component.html',
  styleUrls: ['./rmrequisitionlist.component.css']
})
export class RmrequisitionlistComponent implements OnInit {
  pageTitle: string = "Requisition List";
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
  pagValue:number;
  displaystart:number;
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
  previousValues:any={};
  locationId: number;
  //status
  statuses: IStatus[] = [];
  selectedStatus: IStatus;
  //requisition list
  requisitionLists: IRequisitionList[] = [];
  loginUserId: number;
  // Anif
  requisitionDetailsArrayPopup: any[] = [];
  moduleId: number;
  loggedInUserRoleIds: string;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private functionService: FunctionService,
    private commonService: CommonService,
    private requisitionService: RequisitionService,
    private persistance: PersistanceService,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
  ) {
    this.SpinnerService.show();
    jQuery(".custom-menu").hide();
    this.titleService.setTitle(this.pageTitle);
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.moduleId = this.persistance.get('moduleId');   // Added by anif on 09-02-2023
    this.loggedInUserRoleIds = this.persistance.get('loggedinuser').roleIds;   // Added by anif on 09-02-2023
    localStorage.removeItem('pagename');
    localStorage.removeItem('id');
    this.createForm();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllFunction();
    this.getAllStatus();
    if(this.persistance.get('previouspageparams') != (null || undefined)){
      var params=this.persistance.get('previouspageparams');
      this.searchform.patchValue({
      requisitionNo: params.requisitionNo,
      verticalId:params.verticalId,
      locationId: params.locationId,
      functionId: params.functionId,
      fromDate: params.fromDate,
      toDate: params.toDate,
      iOMNo: params.iOMNo,
      requisitionProcessStatus: params.requisitionProcessStatus
      })
      this.selectedVertical=params.verticalId;
    }
  }

  ngOnInit() {
    this.persistance.get('tabledisplayStart') == (null || undefined) ? this.displaystart=0 : this.displaystart=this.persistance.get('tabledisplayStart');
    if(this.persistance.get('tabledisplayStart') ==(null || undefined)){
      this.displaystart=0
    }
    if(this.persistance.get('tabledisplayStart') >0){
      var tablestart=this.persistance.get('tabledisplayStart')
      this.displaystart = (tablestart -1) *10;
    }
    this.loadDatePicker();
    this.loadDataTable();
    this.loadTooltipMenu();
    setTimeout(() => {
      this.fromSubmit();

    });
  }

  createForm() {
    this.searchform = this.fb.group({
      requisitionNo: '',
      verticalId: 0,
      locationId: [0],
      functionId: [0],
      fromDate: [''],
      toDate: [''],
      iOMNo: '',
      requisitionProcessStatus: [0],
      allocatedAutoUserId: [0],
      loggedInUserRoleIds: this.loggedInUserRoleIds,       // Added By anif on 09-02-2023
      moduleId: this.moduleId                               // Added By anif on 09-02-2023
    });

  }

  onclickNextPage(){
    this.previousValues.requisitionNo = this.searchform.value.requisitionNo
    this.previousValues.verticalId = this.searchform.value.verticalId
    this.previousValues.locationId = this.searchform.value.locationId
    this.previousValues.functionId = this.searchform.value.functionId
    this.previousValues.fromDate = this.searchform.value.fromDate
    this.previousValues.toDate = this.searchform.value.toDate
    this.previousValues.iOMNo = this.searchform.value.iOMNo
    this.previousValues.requisitionProcessStatus = this.searchform.value.requisitionProcessStatus
    
  }
  //verticals
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
    // console.log(this.selectedVertical);
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
      this.loadSelectPicker();
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
    });
  }

  //status
  getAllStatus() {
    this.statuses = [];
    this.commonService.getAllStatus().subscribe((result) => {
      if (result) {
        this.statuses = result.filter(x => x.statusTypeId == 3);
        this.statuses.splice(0, 0, {
          statusId: 0,
          statusName: "All",
          statusTypeId: 3,
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
      this.loadSelectPicker();
      this.SpinnerService.hide();
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
      var dothis=this
      jQuery('#dataTable1').DataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "order": [],
        "fixedColumns": {
          "left": 3
        },
        "displayStart":this.displaystart,
        "drawCallback": function (settings) {
          dothis.pagValue=(settings._iDisplayStart/settings._iDisplayLength) +1
          //this.pagValue.push({value:(settings._iDisplayStart/settings._iDisplayLength) +1});
          //settings._iDisplayStart=30;
          setTimeout(() => {
            jQuery('[data-toggle="popover"]').popover({
              html: true
            });
          });
        }
      });
    });
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

      });
    });
  }

  fromSubmit() {
    this.searchform.patchValue(
      {
        fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,
        allocatedAutoUserId: this.loginUserId
      });
    //console.log("valueaa",this.searchform.value);
    this.SpinnerService.show();
    this.requisitionService.getAllRequisition(this.searchform.value).subscribe((result) => {
      if (result) {
        this.requisitionLists = result;
        //console.log("Rm Candidate List", this.requisitionLists);
        this.loadDataTable();
        this.SpinnerService.hide();
      }
      else {
        this.requisitionLists = [];
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

  gotoAllocateToSourceChannel(id) {
    this.onclickNextPage();
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "rmrequisitionlist");
    this.persistance.set('paramid', id);
    this.persistance.set('previouspagefilters',this.previousValues);
    this.persistance.set('tabledisplayStart',this.pagValue);
    this._route.navigate(['/app/my-action/all-positions/allocate-to-source-channel']);
  }

  gotoStopSourceChannel(id) {
    jQuery(".custom-menu").hide();
    this.onclickNextPage();
    this.persistance.set('pagename', "rmrequisitionlist");
    this.persistance.set('paramid', id);
    this.persistance.set('previouspagefilters',this.previousValues);
    this.persistance.set('tabledisplayStart',this.pagValue);
    this._route.navigate(['/app/my-action/all-positions/stop-source-channel']);
  }

  gotoCandidateList(id, hrStatus, functionId, data) {
    jQuery(".custom-menu").hide();
    this.onclickNextPage();
    //console.log("chck",data);
    setTimeout(() => {
      this.persistance.set('pagename', "rmrequisitionlist");
      this.persistance.set('paramid', id);
      this.persistance.set('functionId', functionId);
      this.persistance.set('hrStatus', hrStatus);
      this.persistance.set('verticalidforcallback', data.verticalId);
      this.persistance.set('requisitionidforcallback', data.requisitionId);
      this.persistance.set('dept', data.departmentName);
      this.persistance.set('func', data);
      this.persistance.set('previouspagefilters',this.previousValues);
      this.persistance.set('tabledisplayStart',this.pagValue);
      this.persistance.set('previouspagefilter',null);
      this.persistance.set('tabledisplayStartcandi',0);
      this._route.navigate(['/app/my-action/all-positions/candidate-list']);
    });
  }

  gotoAddCandidate(id) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "rmrequisitionlist");
    this.persistance.set('paramid', id);
    this.persistance.set('previouspagefilters',this.previousValues);
    this.persistance.set('tabledisplayStart',this.pagValue);
    this._route.navigate(['/app/rmrequisitionlist/addcandidate']);
  }

  reset() {
    this.searchform.reset();
    this.searchform.patchValue({
      verticalId: 0,
      locationId: 0,
      functionId: 0,
      requisitionNo: '',
      fromDate: [''],
      toDate: [''],
      iOMNo: '',
      requisitionProcessStatus: 0,
      allocatedAutoUserId: 0,
      loggedInUserRoleIds: this.loggedInUserRoleIds,
      moduleId: this.moduleId
      //requisitionProcessStatus: 0
    })
    this.displaystart=0;
    //this.loadSelectPicker();
    //this.requisitionLists = [];
    //this.loadDataTable();
    setTimeout(() => {
      this.fromSubmit();
    });
    
  }

  viewIOM(pathval) {
    window.open("/viewpdf?q=" + "" + pathval, "blank");
  }

  gotoSubmitTestResult(requisitionDetailId) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "rmrequisitionlist");
    this.persistance.set('paramid', requisitionDetailId);
    this.persistance.set('previouspagefilters',this.previousValues);
    this.persistance.set('tabledisplayStart',this.pagValue);
    this._route.navigate(['/app/my-action/all-requisition/requisition/submit-test-result']);
  }

  DownloadJD(docData, filename) {
    var htmlstring = docData;
    var dom = document.createElement('div');
    dom.innerHTML = htmlstring;
    html2pdf(dom, {
      margin: 10,
      filename: filename + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      //html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      html2canvas: { scale: 3, y: 0, scrollY: 0 },
      //jsPDF: { format: 'A4' },
      //jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      jsPDF: { format: 'A4' },
    });
  }
  // Anif

  onClickRequisitionNo(record: any) {
    this.requisitionDetailsArrayPopup = [];
    //this.requisitionDetailsArrayPopup.push(record);
    var rec = {
      requisitionDetailId: record.requisitionDetailId
    }

    this.requisitionService.GetDetailsRequisitions(rec).subscribe((result) => {
      this.requisitionDetailsArrayPopup = result
      // console.log("hmm",this.requisitionDetailsArrayPopup)
      // debugger;
    })

    //console.log("requesition Details", this.requisitionDetailsArrayPopup);
  }
  openFile(blobName: string): void {
    let regex = /\.net(.*)/;
    let match = blobName.match(regex);
    let extractedString = match ? match[1] : '';
    let filename = extractedString.split('/')[2];
    let containername = extractedString.split('/')[1];
    this.locationService.getTestfile(filename,containername).subscribe(response => {
      let blob:Blob=response.body as  Blob;
      const url = window.URL.createObjectURL(blob);

      // Open the file in a new tab
      window.open(url);

    }, error => {
      console.error('Failed to download file:', error);
    });
  }
}
