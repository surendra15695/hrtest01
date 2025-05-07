import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../../interfaces/common/doctor.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../../interfaces/common/function.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../../interfaces/common/position.interface';
import { IJoinersList, IPendingScheduleBatchWise, IPendingScheduleIndividual, IScheduledBatchWise, IScheduledIndividually, IReportingVenueExists } from '../../../../../interfaces/prejoining/joinerslist.interface';
import { IOnboardingCoordinator, ISearchOnboardingCoordinator, IVenue, ISearchVenue, IJoiningDocument, IWelcomeTemplate } from '../../../../../interfaces/prejoining/onboardingcoordinator.interface';
import { ICandidateDetailData, ISearchCandidateDetail, IModeOfJoining, ISearchModeOfJoining } from '../../../../../interfaces/preselection/candidate.interface';
import { IAssessemenrAssignReleaseList, IBatchAssessment, ICandidateAssessmentList, ISearchAssessmentAssignReleaseList } from '../../../../../interfaces/joining/programcoordinator.interface';
import { LocationService } from '../../../../../services/common/location/location.service';
import { CommonService } from '../../../../../services/common/common/common.service';
import { FunctionService } from '../../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../../services/common/department/department.service';
import { PositionService } from '../../../../../services/common/position/position.service';
import { ShareddataService } from '../../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { environment } from '../../../../../../environments/environment';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { CorporateallocationService } from '../../../../../services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { RecruitmentmanagerService } from '../../../../../services/joining/recruitmentmanager/recruitmentmanager.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { IEmployeeNo, IOnboardingManager, IReassignHiringCandidateList, IsearchEmployeeNo, ISearchonboardingManager } from 'src/app/interfaces/joining/hiringteam.interface';
import { CandidateService } from 'src/app/services/preselection/candidate/candidate.service';
import { IEmployeeManagement } from 'src/app/interfaces/joining/recruitmentmanager.interface';
declare var jQuery: any;

@Component({
  selector: 'app-salesemployeemanagement',
  templateUrl: './salesemployeemanagement.component.html',
  styleUrls: ['./salesemployeemanagement.component.css']
})
export class SalesemployeemanagementComponent implements OnInit {
  searchFormEmployeeManagement: FormGroup;
  @ViewChild('dtofJoiningFrom', { static: false }) dtofJoiningFrom: ElementRef;
  @ViewChild('dtofJoiningTo', { static: false }) dtofJoiningTo: ElementRef;
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  employeeManagementList: IEmployeeManagement[] = [];
  candidateId: number;
  candidateNo: string;
  employeeId: any;
  selectAll: boolean;
  buyOutType: string;
  relocationReimbursementType: string;
  callngIfFunction: boolean = true;
  shownoticeperiodbuyout: boolean=true;
  showdisablenoticeperiod: boolean = true;
  showreallocationreimbursement: boolean=true;
  showdisablereallocationreimbursement: boolean=true;
  count:boolean=false;
  noticestatus:boolean;
  disablenoticestatus:boolean;
  relocationstatus:boolean;
  disablerelocationstatus:boolean;
  pagValueSales:number;
  displaystart:number;
  previousValuesSales:any = {};
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private functionService: FunctionService,
    private commonService: CommonService,
    private corporateService: CorporateallocationService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService, public activatedRoute: ActivatedRoute,
    private titleService: Title,
    private positionService: PositionService,
    private recruitmentManagerService: RecruitmentmanagerService,
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.createHtCandidateSearchForm();
    if(this.persistance.get('previouspageparamsSales') != (null || undefined)){
      var params=this.persistance.get('previouspageparamsSales');
      this.searchFormEmployeeManagement.patchValue({
        requisitionDetailId: params.requisitionDetailId,
        candidateId:params.candidateId,
        employeeNo: params.employeeNo,
        requisitionNo: params.requisitionNo,
        source: params.source,
        name: params.name,
        hiringStatus: params.hiringStatus,
        employeeStatus: params.employeeStatus,
        dtofJoiningFrom: params.dtofJoiningFrom,
        dtofJoiningTo: params.dtofJoiningTo
      })
    }
    this.getAllEmployee();
  }

  ngOnInit() {
    this.persistance.get('tabledisplayStartSales') == (null || undefined) ? this.displaystart=0 : this.displaystart=this.persistance.get('tabledisplayStartSales');
    if(this.persistance.get('tabledisplayStartSales') ==(null || undefined)){
      this.displaystart=0
    }
    if(this.persistance.get('tabledisplayStartSales') >0){
      var tablestart=this.persistance.get('tabledisplayStartSales')
      this.displaystart = (tablestart -1) *10;
    }
    this.loadDataTable();
    this.loadDatePicker();
    this.tableOptionDropDown();
    setTimeout(() => {
      this.getAllEmployee();
    })
  }
  loadDataTable() {
    jQuery('#dataTable1').dataTable().fnClearTable();
    jQuery('#dataTable1').dataTable().fnDestroy();
    setTimeout(() => {
      var dothis = this;
        jQuery('#dataTable1').dataTable({
          "searching": false,
          "paging": true,
          "scrollX": true,
          "autoWidth": false,
          "fixedColumns": {
            "left": 4
          },
          "displayStart":this.displaystart,
          "drawCallback": function (settings) {
          dothis.pagValueSales=(settings._iDisplayStart/settings._iDisplayLength) +1
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
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }
  tableOptionDropDown() {
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
  createHtCandidateSearchForm() {
    this.searchFormEmployeeManagement = this.fb.group({
      requisitionDetailId: null,
      candidateId: null,
      employeeNo: [''],
      requisitionNo: [''],
      source: null,
      name: [''],
      hiringStatus: null,
      employeeStatus: null,
      dtofJoiningFrom: [''],
      dtofJoiningTo: ['']
    });
  }
  onClickNextPage(){
    this.previousValuesSales.requisitionDetailId = this.searchFormEmployeeManagement.value.requisitionDetailId;
    this.previousValuesSales.candidateId = this.searchFormEmployeeManagement.value.candidateId;
    this.previousValuesSales.employeeNo = this.searchFormEmployeeManagement.value.employeeNo;
    this.previousValuesSales.requisitionNo = this.searchFormEmployeeManagement.value.requisitionNo;
    this.previousValuesSales.source = this.searchFormEmployeeManagement.value.source;
    this.previousValuesSales.name = this.searchFormEmployeeManagement.value.name;
    this.previousValuesSales.hiringStatus = this.searchFormEmployeeManagement.value.hiringStatus;
    this.previousValuesSales.employeeStatus = this.searchFormEmployeeManagement.value.employeeStatus;
    this.previousValuesSales.dtofJoiningFrom = this.searchFormEmployeeManagement.value.dtofJoiningFrom;
    this.previousValuesSales.dtofJoiningTo = this.searchFormEmployeeManagement.value.dtofJoiningTo;

  }
  onSearchEmployee() {
    this.searchFormEmployeeManagement.patchValue(
      {
        dtofJoiningFrom: this.dtofJoiningFrom.nativeElement.value,
        dtofJoiningTo: this.dtofJoiningFrom.nativeElement.value
      });
    this.getAllEmployee();
  }
  onResetClick() {
    this.searchFormEmployeeManagement.reset();
    this.getAllEmployee();
  }
  getAllEmployee() {
    this.employeeManagementList = [];
    // console.log("Search Obj Sales", this.searchFormEmployeeManagement.value);

    this.recruitmentManagerService.getAllEmployeeManagementList(this.searchFormEmployeeManagement.value).subscribe((result) => {
      if (result) {
        this.employeeManagementList = result;
        this.employeeManagementList = this.employeeManagementList.filter(e => ((e.verticalId == 3)&&(e.hiringStatusId==54)));
        // console.log("Employee Data", this.employeeManagementList);
        this.SpinnerService.hide();
      }
      else {
        this.employeeManagementList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.loadDataTable();
      this.SpinnerService.hide();
    });
  }
  onClickNoticePeriodBuyout(data) {
    this.candidateId = data.candidateId;
    this.candidateNo = data.candidateNo;
    this.employeeId = data.empNo;
    this.buyOutType = "I";
  }
  btnClickEnableNoticePeriod() {
    this.candidateId = 0;
    //this.candidateNo=data.candidateNo;
    this.buyOutType = "A";
    var candidateNoString = "";
    var cflag = 0;
    this.employeeManagementList.forEach(element => {
      if (element.checked) {
        candidateNoString += (cflag == 0 ? "" : ", ") + element.empNo.toString();
        cflag = 1;
      }
    })
    this.employeeId = candidateNoString;
  }
  onClickRelocationReimbursement(data) {
    this.candidateId = data.candidateId;
    this.candidateNo = data.candidateNo;
    this.employeeId = data.empNo;
    this.relocationReimbursementType = "I";
  }
  btnClickRelocationReimbursement() {
    this.candidateId = 0;
    this.relocationReimbursementType = "A";
    var candidateNoString = "";
    var cflag = 0;
    this.employeeManagementList.forEach(element => {
      if (element.checked) {
        candidateNoString += (cflag == 0 ? "" : ", ") + element.empNo.toString();
        cflag = 1;
      }
    })
    this.employeeId = candidateNoString;
  }
  showBtnEnableNoticePeriod() {
    var checkObj = this.employeeManagementList.find(e => e.checked == true);
    return checkObj == null ? false : true;
  }
  showBtnDisableNoticePeriod() {
    var checkObj = this.employeeManagementList.find(e => e.checked == true);
    return checkObj == null ? false : true;
  }
  showBtnRelocationReimbursement() {
    var checkObj = this.employeeManagementList.find(e => e.checked == true);
    return checkObj == null ? false : true;
  }
  showBtnDisableRelocationReimbursement(){
    var checkObj = this.employeeManagementList.find(e => e.checked == true);
    return checkObj == null ? false : true;
  }
  onSaveEnableNoticcPeriodBuyout() {
    let saveObj = {
      CandidateId: "",
      CreatedBy: this.loginUserId
    }
    if (this.buyOutType == "A") {
      var candidateIdString = "";
      var cflag = 0;
      this.employeeManagementList.forEach(element => {
        if (element.checked) {
          candidateIdString += (cflag == 0 ? "" : ",") + element.candidateId.toString();
          cflag = 1;
        }
      })
      saveObj.CandidateId = candidateIdString;
    } else {
      saveObj.CandidateId = this.candidateId.toString();
    }
    this.SpinnerService.show();
    this.recruitmentManagerService.saveEnableNoticePeriodBuyout(saveObj).subscribe((result) => {
      // console.log(result);
      if (result.status == 0) {
        this.notificationService.showError(result.msg, "Error");
        this.SpinnerService.hide();
      }
      else {
        this.SpinnerService.hide();
        this.notificationService.showSuccess(result.msg, "Success");
        jQuery("#noticePeriod").modal("hide");
        this.getAllEmployee();
        jQuery("#chkAll").prop("checked", false);
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
      this.notificationService.showError("Something went wrong", "Error");
    });
  }
  onSavedisableNoticcPeriodBuyout(){
    let saveObj = {
      CandidateId: "",
      CreatedBy: this.loginUserId
    }
    if (this.buyOutType == "A") {
      var candidateIdString = "";
      var cflag = 0;
      this.employeeManagementList.forEach(element => {
        if (element.checked) {
          candidateIdString += (cflag == 0 ? "" : ",") + element.candidateId.toString();
          cflag = 1;
        }
      })
      saveObj.CandidateId = candidateIdString;
    } else {
      saveObj.CandidateId = this.candidateId.toString();
    }
    this.SpinnerService.show();
    this.recruitmentManagerService.saveDisableNoticePeriodBuyout(saveObj).subscribe((result) => {
      // console.log(result);
      if (result.status == 0) {
        this.notificationService.showError(result.msg, "Error");
        this.SpinnerService.hide();
      }
      else {
        this.SpinnerService.hide();
        this.notificationService.showSuccess(result.msg, "Success");
        jQuery("#noticePeriod").modal("hide");
        this.getAllEmployee();
        jQuery("#chkAll").prop("checked", false);
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
      this.notificationService.showError("Something went wrong", "Error");
    });
  }
  onSaveRelocationReimbursement() {
    let saveObj = {
      CandidateId: "",
      CreatedBy: this.loginUserId
    }
    if (this.relocationReimbursementType == "A") {
      var candidateIdString = "";
      var cflag = 0;
      this.employeeManagementList.forEach(element => {
        if (element.checked) {
          candidateIdString += (cflag == 0 ? "" : ",") + element.candidateId.toString();
          cflag = 1;
        }
      })
      saveObj.CandidateId = candidateIdString;
    } else {
      saveObj.CandidateId = this.candidateId.toString();
    }
    this.SpinnerService.show();
    this.recruitmentManagerService.saveRelocationReimbursement(saveObj).subscribe((result) => {
      // console.log(result);
      if (result.status == 0) {
        this.notificationService.showError(result.msg, "Error");
        this.SpinnerService.hide();
      }
      else {
        this.SpinnerService.hide();
        this.notificationService.showSuccess(result.msg, "Success");
        jQuery("#relocationreimbursement").modal("hide");
        this.getAllEmployee();
        jQuery("#chkAll").prop("checked", false);
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
      this.notificationService.showError("Something went wrong", "Error");
    });
  }
  onSaveRelocationReimbursementdisable() {
    let saveObj = {
      CandidateId: "",
      CreatedBy: this.loginUserId
    }
    if (this.relocationReimbursementType == "A") {
      var candidateIdString = "";
      var cflag = 0;
      this.employeeManagementList.forEach(element => {
        if (element.checked) {
          candidateIdString += (cflag == 0 ? "" : ",") + element.candidateId.toString();
          cflag = 1;
        }
      })
      saveObj.CandidateId = candidateIdString;
    } else {
      saveObj.CandidateId = this.candidateId.toString();
    }
    this.SpinnerService.show();
    this.recruitmentManagerService.saveRelocationReimbursementDisable(saveObj).subscribe((result) => {
      if (result.status == 0) {
        this.notificationService.showError(result.msg, "Error");
        this.SpinnerService.hide();
      }
      else {
        this.SpinnerService.hide();
        this.notificationService.showSuccess(result.msg, "Success");
        jQuery("#relocationreimbursement").modal("hide");
        this.getAllEmployee();
        jQuery("#chkAll").prop("checked", false);
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
      this.notificationService.showError("Something went wrong", "Error");
    });
  }
  onCheckSelectAll(eve) {
    if (this.employeeManagementList.length > 0) {
      this.employeeManagementList.forEach(element => {
        element.checked = eve.target.checked;
      })
    } else {
      jQuery("#chkAll").prop("checked", false);
      this.notificationService.showError("No data to select", "Error");
    }
  }
  getEnableStatus(data) {
    return data.checked;
  }
  GetSelectedNoticePeriodStatus(NewRow) {
    debugger;
    this.shownoticeperiodbuyout=false;
    this.showdisablenoticeperiod=false;
    this.showreallocationreimbursement=false;
    this.showdisablereallocationreimbursement=false;
    var Noticechecked = this.employeeManagementList.find(e => e.checked);
    if (Noticechecked == null) {
      this.count=true
      return true;
    }
    else {
      this.count=false;
      if((Noticechecked.candidateNoticePeriodBuyOutId==0)&&( Noticechecked.candidateNoticePeriodBuyOutId == NewRow.candidateNoticePeriodBuyOutId))
      {
        this.shownoticeperiodbuyout=true;
        this.showdisablenoticeperiod=false;
        if((Noticechecked.candidateReallocationReimbursementEnableId==0)&&( Noticechecked.candidateReallocationReimbursementEnableId == NewRow.candidateReallocationReimbursementEnableId))
        {
          this.showreallocationreimbursement=true
          this.showdisablereallocationreimbursement=false
          return true;
        }
        else if((Noticechecked.candidateReallocationReimbursementEnableId!=0)&&(NewRow.reallocationReimbursementEnableStatus=="Enabled")){
          this.showdisablereallocationreimbursement=true
          this.showreallocationreimbursement=false
          return true;
        }
        else{
          return true;
        }
        
      }
      else if((Noticechecked.candidateReallocationReimbursementEnableId==0)&&( Noticechecked.candidateReallocationReimbursementEnableId == NewRow.candidateReallocationReimbursementEnableId)){
        this.showreallocationreimbursement=true
        this.showdisablereallocationreimbursement=false
        if((Noticechecked.candidateNoticePeriodBuyOutId==0)&&( Noticechecked.candidateNoticePeriodBuyOutId == NewRow.candidateNoticePeriodBuyOutId))
        {
          this.shownoticeperiodbuyout=true;
          this.showdisablenoticeperiod=false;
          return true;
        }else{
          this.showdisablenoticeperiod=true;
          this.shownoticeperiodbuyout=false;
          return true;
        }
        
      }
      else if((Noticechecked.candidateNoticePeriodBuyOutId!=0 )&& (NewRow.noticeperiodBuyoutStatus=='Enabled'))
      {
        this.showdisablenoticeperiod=true;
        if((Noticechecked.candidateReallocationReimbursementEnableId==0)&&( Noticechecked.candidateReallocationReimbursementEnableId == NewRow.candidateReallocationReimbursementEnableId))
        {
          this.showreallocationreimbursement=true
          return true;
        }
        else if(((Noticechecked.candidateReallocationReimbursementEnableId!=0)&&( NewRow.reallocationReimbursementEnableStatus=="Enabled"))){
          this.showdisablereallocationreimbursement=true;
          return true;
        }
      }
      else if((Noticechecked.candidateReallocationReimbursementEnableId!=0)&&( NewRow.reallocationReimbursementEnableStatus=="Enabled"))
      {
        this.showdisablereallocationreimbursement=true;
        if((Noticechecked.candidateNoticePeriodBuyOutId==0)&&( Noticechecked.candidateNoticePeriodBuyOutId == NewRow.candidateNoticePeriodBuyOutId))
        {
          this.shownoticeperiodbuyout=true;
          this.showdisablenoticeperiod=false;
          return true;
        }else{
          this.showdisablenoticeperiod=true;
          this.shownoticeperiodbuyout=false;
          return true;
        }
      }
      else{
        // this.showdisablenoticeperiod=true;
        return false;
      }
    }
  }
  onCheckRowWise(data, eve,i) {
    debugger;
    console.log("check",data)
    if(data.empNo=="")
    {
      this.shownoticeperiodbuyout=false;
      this.showdisablenoticeperiod=false;
      this.showreallocationreimbursement=false;
    }
    if (this.GetSelectedNoticePeriodStatus(data)) {
      if(this.count==true)
      {
        if(data.candidateNoticePeriodBuyOutId==0){
          this.shownoticeperiodbuyout=true
          this.showdisablenoticeperiod=false;
        }
        else if(data.noticeperiodBuyoutStatus=="Enabled"){
          this.shownoticeperiodbuyout=false
          this.showdisablenoticeperiod=true;
        }
        if(data.candidateReallocationReimbursementEnableId==0){
          this.showreallocationreimbursement=true;
          this.showdisablereallocationreimbursement=false;
        }
        else if(data.reallocationReimbursementEnableStatus=="Enabled"){
          this.showreallocationreimbursement=false;
          this.showdisablereallocationreimbursement=true;
        }
        else {
          this.showreallocationreimbursement=false;
        }
        this.noticestatus=this.shownoticeperiodbuyout;
        this.disablenoticestatus=this.showdisablenoticeperiod;
        this.relocationstatus=this.showreallocationreimbursement;
        this.disablerelocationstatus=this.showdisablereallocationreimbursement;
      }
      data.checked = eve.target.checked;
      if(data.checked==false){
        this.shownoticeperiodbuyout=this.noticestatus;
        this.showdisablenoticeperiod=this.disablenoticestatus;
        this.showreallocationreimbursement=this.relocationstatus;
        this.showdisablereallocationreimbursement=this.disablerelocationstatus
      }
    }else {
      data.checked=false;
      this.shownoticeperiodbuyout=this.noticestatus;
      this.showdisablenoticeperiod=this.disablenoticestatus;
      this.showreallocationreimbursement=this.relocationstatus;
      this.showdisablereallocationreimbursement=this.disablerelocationstatus
      jQuery("#" + i).prop("checked", false);
      this.notificationService.showError("Please select incomplete Notice period buyout", "Error");
    }
    
  }
  GetSelectedHiringStatus(NewRow) {
    debugger;
    var AlredyChecked = this.employeeManagementList.find(e => e.checked);
    if (AlredyChecked == null) {
      return true;
    } else {
      return AlredyChecked.hiringStatusId == NewRow.hiringStatusId;
    }
  }
  onClickViewDocument(data) {
    jQuery(".custom-menu").hide();
    this.onClickNextPage();
    this.persistance.set('pagename', "employeemanagement");
    this.persistance.set('nextpagename', "ocviewdocument");
    this.persistance.set('type', "sales");
    this.persistance.set('candidateId', data.candidateId);
    this.persistance.set('paramid', data.requisitionDetailId);
    this.persistance.set('previouspagefiltersSales',this.previousValuesSales);
    this.persistance.set('tabledisplayStartSales',this.pagValueSales);
    jQuery(".custom-menu").hide();
    this._route.navigate(['app/oc-view-document']);
  }

}
