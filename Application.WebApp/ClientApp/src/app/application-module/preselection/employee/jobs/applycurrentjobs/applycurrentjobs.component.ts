import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { IVertical } from '../../../../../interfaces/common/vertical.interface';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ILocation, ISearchLocation } from '../../../../../interfaces/common/location.interface';
import { IVerticalFunction, ISearchFunction } from '../../../../../interfaces/common/function.interface';
import { ISourceChannelJobList, ISearchSourceChannelJobList } from '../../../../../interfaces/preselection/requisition.interface';
import { ISearchInternalCandidate, IInternalCandidate, ICandidateApplyJob, IApplyJob } from '../../../../../interfaces/candidate/candidate.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../../interfaces/common/position.interface';
import { LocationService } from '../../../../../services/common/location/location.service';
import { FunctionService } from '../../../../../services/common/function/function.service';
import { PositionService } from '../../../../../services/common/position/position.service';
import { RequisitionService } from 'src/app/services/preselection/requisition/requisition.service';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { CandidateService } from '../../../../../services/candidate/candidate/candidate.service';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
declare var jQuery: any;
declare var html2pdf: any;

@Component({
  selector: 'app-applycurrentjobs',
  templateUrl: './applycurrentjobs.component.html',
  styleUrls: ['./applycurrentjobs.component.css']
})
export class ApplycurrentjobsComponent implements OnInit {
  pageTitle: string = "Current Jobs";
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  searchform: FormGroup;
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  searchInternalCandidate: ISearchInternalCandidate = {
    CreatedBy: null
  }
  internalCandidate: IInternalCandidate[];
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
  currentJobs: ISourceChannelJobList[] = [];
  searchSourceChannelJobList: ISearchSourceChannelJobList =
    {
      requisitionDetailId: null,
      fromDate: "",
      toDate: "",
      positionId: null,
      functionId: null,
      locationId: null,
      stateId: null,
      isActive: null,
      sourceChannelId: 3,
      roleIds: '',
      candidateId: null
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

  // candidateApplyJob: ICandidateApplyJob = {
  //   candidateId: null,
  //   requisitionDetailId: null,
  //   createdBy: null
  // }
  candidateApplyJob: IApplyJob = {
    candidateId: null,
    requisitionDetailId: null,
    createdBy: null,
    position: "",
    department: "",
    function: "",
    location: "",
    state: "",
    reqno: null,
    EmailId: "",
    Name: "",
    candidate: null
  }

  candidateId: number;
  constructor(
    private locationService: LocationService,
    private positionService: PositionService,
    private functionService: FunctionService,
    private requisitionService: RequisitionService,
    private fb: FormBuilder,
    private persistance: PersistanceService,
    private _route: Router,
    private toasterService: ToastrService,
    private candidateService: CandidateService,
    private notificationService: NotificationService,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
  ) {
    this.SpinnerService.show();
    this.titleService.setTitle(this.pageTitle);
    console.log(this.persistance.get('loggedinuser'));
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    localStorage.removeItem('pagename');
    localStorage.removeItem('id');
    this.candidateId = this.persistance.get('loggedinuser').candidateId;

    this.getInternalCandidateData();
    this.createForm();
    this.getAllVerticals();
    //this.getAllLocation();
    this.getAllFunction();
    this.getAllPosition();
    this.getApplyJobList(1);
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
      verticalId: [0],
      positionId: [0],
      functionId: [0],
      locationId: [0],
      fromDate: [''],
      toDate: [''],
      isActive: [true],
      sourceChannelId: [3],
      roleIds: [null],
      candidateId: [this.candidateId]
    });
  }

  getInternalCandidateData() {
    this.internalCandidate = [];
    this.searchInternalCandidate.CreatedBy = this.loginUserId;
    this.candidateService.getInternalCandidate(this.searchInternalCandidate).subscribe((result) => {
      if (result) {
        this.internalCandidate = result;
        console.log('Internal Candidate', result);
      }
      else {
        this.internalCandidate = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getApplyJobList(type: any) {
    this.currentJobs = [];
    if (type == 2) {
      this.searchform.patchValue(
        {
          fromDate: this.fDate.nativeElement.value,
          toDate: this.tDate.nativeElement.value
        });
    }
    this.searchform.patchValue({
      candidateId: this.candidateId
    });
    //console.log(this.searchform.value);
    this.searchform.patchValue({
      verticalId: Number(this.searchform.value.verticalId)
    })
    this.requisitionService.getSourceChannelJobList(this.searchform.value).subscribe((result) => {
      if (result) {
        this.currentJobs = result;
        //  console.log(result);
      }
      else {
        this.currentJobs = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
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
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
  }

  //position
  getAllPosition() {
    this.positions = [];
    this.searchPosition.verticalId = this.selectedVertical.verticalId;
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
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
  }

  // fromSubmit() {
  //   this.getApplyJobList(2)
  // }
  fromSubmit() {
    var flag = 0;
    if(this.fDate.nativeElement.value.length > 0 && this.tDate.nativeElement.value.length > 0){
      const [fDay, fMonth, fYear] = this.fDate.nativeElement.value.split("/");
      const fDate = new Date(fYear, fMonth - 1, fDay);
      const [tDay, tMonth, tYear] = this.tDate.nativeElement.value.split("/");
      const tDate = new Date(tYear, tMonth - 1, tDay);
      if(fDate > tDate){
        this.notificationService.showError("To Date Cann't be less than from From Date !! Please provide actual date", "Error");
        flag = 1;
      }
    }
    if(flag == 0){
      this.getApplyJobList(2)
    }
  }
  
  gotoApplyCandidate(data) {
    if (this.internalCandidate.length == 0) {
      this.persistance.set('pagename', "applycurrentjobs");
      this.persistance.set('paramid', data.requisitionDetailId);
      this.persistance.set('jobdetails', data);
      this._route.navigate(['/app/current-jobs/apply/add-candidate']);
      // this.notificationService.showError("Please update your profile to proceed!", "Error");
    }
    else {
      this.applyJob(data.requisitionDetailId);
    }
  }

  applyJob(id) {
    this.candidateApplyJob.candidateId = this.internalCandidate[0].candidateId;
    this.candidateApplyJob.requisitionDetailId = id;
    this.candidateApplyJob.createdBy = this.loginUserId;

    // this.candidateApplyJob.candidateId = this.candidateId;
    // this.candidateApplyJob.requisitionDetailId = id.requisitionDetailId;
    // this.candidateApplyJob.createdBy = this.loginUserId;
    // this.candidateApplyJob.position = id.positionName;
    // this.candidateApplyJob.department = id.departmentName;
    // this.candidateApplyJob.function = id.functionName;
    // this.candidateApplyJob.location = id.locationNo;
    // this.candidateApplyJob.state = id.stateName;
    // this.candidateApplyJob.reqno = id.requisitionNo.toString();
    // this.candidateApplyJob.EmailId = this.emailId.toString();
    // this.candidateApplyJob.Name = this.name.toString();
    // this.candidateApplyJob.candidate = this.canid.toString();





    this.candidateService.candidateApplyJob(this.candidateApplyJob).subscribe((result) => {
      if (result) {
        if (result.successFlag == 1) {
          this.notificationService.showSuccess(result.msg, "Success");
          this.getApplyJobList(2);
        }
        else {
          this.notificationService.showError(result.msg, "Error");
        }
      }
      else {
        this.notificationService.showError("Something went wrong.", "Error");
      }
    }, error => {
      console.log(error);
    }, () => {
    });
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
      positionId: 0,
      functionId: 0
    })
  }

  resetForm() {
    this.searchform.reset();
    this.getAllVerticals();
    this.searchform.patchValue({
      positionId: 0,
      functionId: 0,
      locationId: 0,
      fromDate: '',
      toDate: '',
      isActive: true,
      verticalId: 0,
      roleIds: '',
      sourceChannelId: 3
    })
    this.getAllPosition();
    this.getAllFunction();
    this.fromSubmit();
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

}
