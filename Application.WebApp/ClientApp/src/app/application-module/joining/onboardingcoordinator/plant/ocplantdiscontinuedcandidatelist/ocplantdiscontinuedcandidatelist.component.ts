import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ILocation, ISearchLocation } from '../../../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction } from '../../../../../interfaces/common/function.interface';
import { LocationService } from '../../../../../services/common/location/location.service';
import { CommonService } from '../../../../../services/common/common/common.service';
import { FunctionService } from '../../../../../services/common/function/function.service';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { HiringteamService } from 'src/app/services/joining/hiringteam/hiringteam.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
declare var jQuery: any;

@Component({
  selector: 'app-ocplantdiscontinuedcandidatelist',
  templateUrl: './ocplantdiscontinuedcandidatelist.component.html',
  styleUrls: ['./ocplantdiscontinuedcandidatelist.component.css']
})
export class OcplantdiscontinuedcandidatelistComponent implements OnInit {

  searchform: FormGroup;
  @ViewChild('lstTrainingDateFrom', { static: false }) dtLstTrainingFrom: ElementRef;
  @ViewChild('lstTrainingDateTo', { static: false }) dtLstTrainingTo: ElementRef;
  //location
  locations: ILocation[] = [];
  selectedLocation: ILocation;
  searchLocation: ISearchLocation =
    {
      locationId: null,
      verticalId: null,
      locationCode: null,
      locationNo: null,
      isActive: true
    };
  selectedLocationId: number;
  displaystart:number;
  pagValue:number;
  //function
  functions: IVerticalFunction[] = [];
  selectedFunction: IVerticalFunction;
  searchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  selectedfunctionId: number;
  functionName: string;
  discontinuedCandidateList: any[] = [];
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private locationService: LocationService,
    private functionService: FunctionService,
    private commonService: CommonService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private titleService: Title,
    private hiringteamService: HiringteamService,

  ) {
    this.createSearchForm();
    this.getAllLocation();
    this.getAllFunction();
    this.getAllDiscontinuedCandidate();
  }

  ngOnInit() {
    this.loadDatePicker();
    this.loadDataTable();
    this.loadTooltipMenu();
    this.persistance.get('tabledisplayStartcandi') == (null || undefined) ? this.displaystart=0 : this.displaystart=this.persistance.get('tabledisplayStartcandi');
    if(this.persistance.get('tabledisplayStartcandi') ==(null || undefined)){
      this.displaystart=0
    }
    if(this.persistance.get('tabledisplayStartcandi') >0){
      var tablestart=this.persistance.get('tabledisplayStartcandi')
      this.displaystart = (tablestart -1) *10;
    }
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
      var dothis = this
      jQuery('#dataTable1').DataTable({
        "searching": false,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "fixedColumns": {
          "left": 3
        },
        // "drawCallback": function (settings) {
        //   setTimeout(() => {
        //     jQuery('[data-toggle="popover"]').popover({
        //       html: true
        //     });
        //   });
        // }
        "displayStart":this.displaystart,
        "drawCallback": function (settings) {
          dothis.pagValue=(settings._iDisplayStart/settings._iDisplayLength) +1
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
        jQuery(e.target).append(dropdownMenu.detach());
        jQuery(e.target).find('.custom-menu').hide();
      });
    });
  }
  createSearchForm() {
    this.searchform = this.fb.group({
      candidateId: null,
      candidateNo: [''],
      batchId: null,
      batchNo: [''],
      employeeNo: [''],
      employeeName: [''],
      lastTrainingFrom: "",
      lastTrainingTo: "",
      verticalId: [2],
      locationId: [0],
      functionId: [0],
    });
  }
  //locations
  getAllLocation() {
    this.locations = [];
    this.searchLocation.verticalId = 2;
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
    this.searchFunction.verticalId = 2;
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
  formSubmit() {
    this.searchform.patchValue(
      {
        lastTrainingFrom: this.dtLstTrainingFrom.nativeElement.value,
        lastTrainingTo: this.dtLstTrainingTo.nativeElement.value
      });
    this.getAllDiscontinuedCandidate();
  }

  getAllDiscontinuedCandidate() {
    this.SpinnerService.show();
    this.hiringteamService.getAllDiscontinuedCandidateList(this.searchform.value).subscribe((result) => {
      if (result) {
        this.discontinuedCandidateList = result;
        this.SpinnerService.hide();
      }
      else {
        this.discontinuedCandidateList = [];
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
  reset() {
    this.searchform.reset();
    // Assign Default Vertical Value
    this.searchform.patchValue({
      verticalId: 2
    })
    this.getAllDiscontinuedCandidate();
  }
  onClickReassignCandidate(data) {
    jQuery(".custom-menu").hide();
    this.persistance.set('tabledisplayStartcandi',this.pagValue);  
    if(data.batchId!=0 && data.batchId!=null){
      this._route.navigate(['/app/oc-reassign-candiadte'], { queryParams: { CandidateId: data.candidateId, BatchId: data.batchId, BatchNo: data.batchNo, For: "Candidate", Type: 'P', From: 'DCL',  ReqDetailsId: data.requisitionDetailId, EmpNo: data.empployeeNo } });
    }else{
      this._route.navigate(['/app/oc-reassign-individualcandiadte'], { queryParams: { CandidateId: data.candidateId, BatchId: data.batchId, BatchNo: data.batchNo, For: "Candidate", Type: 'P', From: 'DCL',  ReqDetailsId: data.requisitionDetailId, EmpNo: data.empployeeNo } });

    }
  }

}
