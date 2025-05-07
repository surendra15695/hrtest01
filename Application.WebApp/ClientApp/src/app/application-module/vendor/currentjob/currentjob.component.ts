import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction } from '../../../interfaces/common/function.interface';
import { IVendorJobList, ISearchVendorJobList } from '../../../interfaces/vendor/vendorjob.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../interfaces/common/position.interface';
import { LocationService } from '../../../services/common/location/location.service';
import { FunctionService } from '../../../services/common/function/function.service';
import { PositionService } from '../../../services/common/position/position.service';
import { VendorjobService } from 'src/app/services/vendor/vendorjob/vendorjob.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { NgxSpinnerService } from "ngx-spinner";
declare var jQuery: any;
declare var html2pdf:any;

@Component({
  selector: 'app-currentjob',
  templateUrl: './currentjob.component.html',
  styleUrls: ['./currentjob.component.css']
})
export class CurrentjobComponent implements OnInit {
  pageTitle: string = "Current Jobs";
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  searchform: FormGroup;
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
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
  //curr job
  currentJobs: IVendorJobList[] = [];
  searchVendorJobList: ISearchVendorJobList =
    {
      vendorId: null,
      requisitionDetailId: null,
      fromDate: "",
      toDate: "",
      positionId: null,
      functionId: null,
      locationId: null,
      stateId: null,
      isActive: true
    };
  locationId: number;
  //position
  positions: IPositionVerticalDetail[] = [];
  selectedPosition: IPositionVerticalDetail;
  searchPosition: ISearchPosition = {
    verticalId: null,
    positionId: null,
    isActive: true
  }
  positionId;
  positionName: string;

  //function
  functions: IVerticalFunction[] = [];
  selectedFunction: IVerticalFunction;
  searchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  functionId: number;
  functionName: string;
  loginUserId: number;
  constructor(
    private locationService: LocationService,
    private positionService: PositionService,
    private functionService: FunctionService,
    private vendorJobService: VendorjobService,
    private fb: FormBuilder,
    private persistance: PersistanceService,
    private _route: Router,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
  ) {
    this.SpinnerService.show();
    this.titleService.setTitle(this.pageTitle);
    this.loginUserId = this.persistance.get('loggedinuser').mapId;
    localStorage.removeItem('pagename');
    localStorage.removeItem('id');
    this.createForm();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllFunction();
    this.getAllPosition();
    this.getVendorJobList(1);
  }

  ngOnInit() {
    this.loadDatePicker();
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
      verticalId:[0],
      positionId: [0],
      functionId: [0],
      locationId: [0],
      fromDate: [''],
      toDate: [''],
      isActive: [true],
      vendorId: [0]
    });
  }

  getVendorJobList(param) {
    this.SpinnerService.show();
    this.currentJobs = [];

    if (param == 1) {
      this.searchform.patchValue({
        vendorId: this.loginUserId
      });
    }
    else {
      this.searchform.patchValue({
        vendorId: this.loginUserId,
        fromDate: this.fDate.nativeElement.value,
        toDate: this.tDate.nativeElement.value,
      });
    }
    this.searchform.patchValue({
      verticalId:Number(this.searchform.value.verticalId)
    })
    this.vendorJobService.getVendorJobList(this.searchform.value).subscribe((result) => {
      if (result) {
        this.currentJobs = result;
        //console.log(result);
      }
      else {
        this.currentJobs = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker({
          size: 6
        });
        jQuery('.selectpicker').selectpicker('refresh');
      });
      this.SpinnerService.hide();
    });
  }
  //locations
  getAllLocation() {
    this.locations = [];
    this.locationService.getAllLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        this.locations = result;
        console.log(result);
      }
      else {
        this.locations = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker({
          size: 6
        });
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
  }

  onLocationChange(location: any) {
    this.selectedLocationCode = this.selectedLocation.locationCode;
    this.selectedLocationOffice = this.selectedLocation.locationOffice;
  }

  //functions
  getAllFunction() {
    this.functions = [];
    this.searchFunction.verticalId = this.selectedVertical.verticalId;;
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
    });
  }

  //position
  getAllPosition() {
    this.positions = [];
    this.searchPosition.verticalId=this.selectedVertical.verticalId;
    this.positionService.getAllVerticalPosition(this.searchPosition).subscribe((result) => {
      if (result) {
        this.positions = result;
        this.positions.splice(0, 0, {
          positionId: 0,
          positionName: "All",
          verticalIds: "",
          verticalNames: "",
          isActive: true
        })
      }
      else {
        this.positions = [];
        this.positions.splice(0, 0, {
          positionId: 0,
          positionName: "All",
          verticalIds: "",
          verticalNames: "",
          isActive: true
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  fromSubmit() {
    this.getVendorJobList(2)
  }

  gotoSubmitCandidate(id) {
    this.persistance.set('pagename', "vendorcurrentjobs");
    this.persistance.set('paramid', id);
    this._route.navigate(['/app/vendor/job/add-candidate']);
  }

  gotoSubmittedCandidate(id) {
    this.persistance.set('pagename', "vendorcurrentjobssubmittedcandidate");
    this.persistance.set('paramid', id);
    this._route.navigate(['/app/vendor/job/candidate-list']);
  }

  reset() {
    this.searchform.reset();
    this.searchform.patchValue({
      positionId: 0,
      functionId: 0,
      locationId: 0,
      fromDate: '',
      toDate: '',
      isActive: true
    })
    setTimeout(() => {
      jQuery('.selectpicker').selectpicker({
        size: 6
      });
      jQuery('.selectpicker').selectpicker('refresh');
    });
    this.getVendorJobList(1);
  }

  //verticals
  getAllVerticals() {
    this.verticals = [];
    this.verticals.push({ verticalId: 0, verticalName: "All", isActive: true });
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.selectedVertical = this.verticals[0];
    this.searchform.patchValue({ verticalId: this.selectedVertical.verticalId })
  }


  changeVertical() {
    var verticalId = this.searchform.get("verticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0];    
    this.getAllPosition();
    this.getAllFunction();
    this.searchform.patchValue({
      positionId:0,
      functionId:0
    })
  }

  resetForm(){
    this.searchform.reset();    
    this.getAllVerticals();
    this.searchform.patchValue({
      positionId: 0,
      functionId: 0,
      fromDate: '',
      toDate: '',
      isActive: true,
      verticalId:0,
      vendorId: 0
    })
    this.getAllPosition();
    this.getAllFunction();
    this.fromSubmit();
  }

  DownloadJD(docData,filename){
    var htmlstring=docData;
    var dom = document.createElement('div');
	  dom.innerHTML = htmlstring;
    html2pdf(dom, {
      margin: 10,
      filename: filename+'.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      //html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      html2canvas: { scale: 3, y: 0,  scrollY: 0},
      //jsPDF: { format: 'A4' },
      //jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      jsPDF: { format: 'A4' },
    });
  }

}
