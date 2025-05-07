import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../interfaces/common/position.interface';
import { IDoctorVerificationCandidateList } from '../../../../interfaces/prejoining/doctorverification.interface';
import { LocationService } from '../../../../services/common/location/location.service';
import { CommonService } from '../../../../services/common/common/common.service';
import { FunctionService } from '../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../services/common/department/department.service';
import { PositionService } from '../../../../services/common/position/position.service';
import { DoctorService } from '../../../../services/prejoining/doctor/doctor.service';
import { ShareddataService } from '../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { IApproverVertical, IApproverFunction, IApproverDepartment, IApproverVerticalFunctionDepartment, IApproverFunctionDepartment } from '../../../../interfaces/common/common.interface';
declare var jQuery: any;

@Component({
  selector: 'app-candidatelist',
  templateUrl: './candidatelist.component.html',
  styleUrls: ['./candidatelist.component.css']
})
export class CandidatelistComponent implements OnInit {

  @ViewChild('pfromDate', { static: false }) pfDate: ElementRef;
  @ViewChild('ptoDate', { static: false }) ptDate: ElementRef;
  @ViewChild('vfromDate', { static: false }) vfDate: ElementRef;
  @ViewChild('vtoDate', { static: false }) vtDate: ElementRef;
  searchpendingform: FormGroup;
  searchverifiedform: FormGroup;
  //vertical
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  //location
  locations: ILocation[] = [];
  selectedLocation: ILocation;
  selectedLocationCode: string = "";
  selectedVerticalId: number;
  searchLocation: ISearchLocation =
    {
      locationId: null,
      verticalId: null,
      locationCode: null,
      locationNo: null,
      isActive: true
    };
  loginUserId: number;
  doctorVerificationCandidiateList: IDoctorVerificationCandidateList[] = [];
  pendingCandidateList: IDoctorVerificationCandidateList[] = [];
  verifiedCandidateList: IDoctorVerificationCandidateList[] = [];
  selectAll: boolean = false;
  callngIfFunction: boolean = true;
  doctorId: number;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private functionService: FunctionService,
    private commonService: CommonService,
    private doctorService: DoctorService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private titleService: Title
  ) {
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.doctorId = this.persistance.get('loggedinuser').mapId;
    this.createPendingForm();
    this.createVerifiedForm();
    // setTimeout(()=>{
    //   this.getPendingList();
    // })
    // this.getVerifiedList();
    //this.getDoctorVerficationPendingCandidateList();
  }

  ngOnInit() {
    this.loadDatePicker();
    this.loadDataTable1();
    this.loadDataTable2();
    this.loadTooltipMenu();
    this.getPendingList();
  }

  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }

  loadDataTable1() {
    var dothis = this;
    jQuery('#dataTable1').dataTable().fnClearTable();
    jQuery('#dataTable1').dataTable().fnDestroy();
    setTimeout(() => {
      var oTable =
        jQuery('#dataTable1').dataTable({
          "searching": true,
          "paging": true,
          "scrollX": true,
          "autoWidth": false,
          "order": [],
          "fixedColumns":{
            "left": 3
          }
        });
    });
  }

  loadDataTable2() {
    var dothis = this;
    jQuery('#dataTable2').dataTable().fnClearTable();
    jQuery('#dataTable2').dataTable().fnDestroy();
    setTimeout(() => {
      var oTable =
        jQuery('#dataTable2').dataTable({
          "searching": true,
          "paging": true,
          "scrollX": true,
          "autoWidth": false,
          "order": [],
          "fixedColumns":{
            "left": 3
          }
        });
    });
  }
  onClickPending() {
    setTimeout(() => {
      this.getPendingList();
      // this.loadDataTable1();
    }, 100)
  }
  onCLickVerified() {
    setTimeout(() => {
      this.getVerifiedList();
      //this.loadDataTable2();
    }, 100)
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


  createPendingForm() {
    this.searchpendingform = this.fb.group({
      medicalDocumentDoctorApprovalId: [0],
      requsitaionDetailsId: [0],
      candidateId: [0],
      fromDate: [''],
      toDate: [''],
      name: [''],
      pending: null,
      doctorsId: this.doctorId
    });

  }
  createVerifiedForm() {
    this.searchverifiedform = this.fb.group({
      medicalDocumentDoctorApprovalId: [0],
      requsitaionDetailsId: [0],
      candidateId: [0],
      fromDate: [''],
      toDate: [''],
      name: [''],
      pending: null,
      doctorsId: this.doctorId
    });
    //  setTimeout(() => {
    //this.fromVerifiedSubmit();
    //}, 100)
  }

  fromPendingSubmit() {
    this.searchpendingform.patchValue(
      {
        fromDate: this.pfDate.nativeElement.value,
        toDate: this.ptDate.nativeElement.value
      });
    this.getPendingList();
  }
  getPendingList() {
    this.SpinnerService.show();
    this.pendingCandidateList = [];
    this.doctorService.getDoctorVerificationCandidateList(this.searchpendingform.value).subscribe((result) => {
      if (result) {
        this.pendingCandidateList = result;
        this.pendingCandidateList = this.pendingCandidateList.filter(x => x.verificationStatus == "Pending");
        console.log("Pending Candidat List", this.pendingCandidateList);
      }
      else {
        this.pendingCandidateList = [];
      }
    }, error => {
      this.SpinnerService.hide();
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
      this.loadDataTable1();
      this.SpinnerService.hide();
    });
  }
  fromVerifiedSubmit() {
    this.SpinnerService.show();
    this.searchverifiedform.patchValue(
      {
        fromDate: this.vfDate.nativeElement.value,
        toDate: this.vtDate.nativeElement.value
      });
    this.getVerifiedList();
  }
  getVerifiedList() {
    this.SpinnerService.show();
    this.verifiedCandidateList = [];
    this.doctorService.getDoctorVerificationCandidateList(this.searchverifiedform.value).subscribe((result) => {
      if (result) {
        this.verifiedCandidateList = result;
        this.verifiedCandidateList = this.verifiedCandidateList.filter(x => x.verificationStatus == "Approved");
        //console.log("verified Candidate List", this.pendingCandidateList);
      }
      else {
        this.verifiedCandidateList = [];
      }
    }, error => {
      this.SpinnerService.hide();
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
      this.loadDataTable2();
    });
  }
  onClickView(data) {
    this._route.navigate(['/app/verifycandidate'], { queryParams: { CandidateId: data.candidateId, RequestNo: data.requisitionNo, Mode: "Verify", CandidateNo: data.candidateNo } });
  }
  onClickViewDetails(data) {
    this._route.navigate(['/app/verifycandidate'], { queryParams: { CandidateId: data.candidateId, RequestNo: data.requisitionNo, Mode: "View" ,CandidateNo: data.candidateNo } });
  }
  onClickPendingReset() {
    this.searchpendingform.reset();
    this.getPendingList();
  }
  onClickVerifiedReset() {
    this.searchverifiedform.reset();
    this.getVerifiedList();
  }
  ngOnDestroy() {
    jQuery(".custom-menu").hide();
  }

}
