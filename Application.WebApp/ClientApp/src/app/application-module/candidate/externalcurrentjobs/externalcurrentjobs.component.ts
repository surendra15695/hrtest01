import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { IApplyJob, ICandidateApplyJob } from '../../../interfaces/candidate/candidate.interface';
import { IVerticalFunction, ISearchFunction } from '../../../interfaces/common/function.interface';
import { ISourceChannelJobList, ISearchSourceChannelJobList } from '../../../interfaces/preselection/requisition.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../interfaces/common/position.interface';
import { LocationService } from '../../../services/common/location/location.service';
import { CandidateService } from '../../../services/candidate/candidate/candidate.service';
import { FunctionService } from '../../../services/common/function/function.service';
import { PositionService } from '../../../services/common/position/position.service';
import { RequisitionService } from 'src/app/services/preselection/requisition/requisition.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
declare var jQuery: any;
declare var html2pdf: any;

@Component({
  selector: 'app-externalcurrentjobs',
  templateUrl: './externalcurrentjobs.component.html',
  styleUrls: ['./externalcurrentjobs.component.css']
})
export class ExternalcurrentjobsComponent implements OnInit {
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
      sourceChannelId: 0,
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
  userroleid: string;
  candidateApplyJob: any = {
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
    candidate: null,
    candidateNo:""
  }
  candidateId: number;
  emailId: any;
  name: any;
  canid: any;
  candidateNo:any;
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
    private SpinnerService: NgxSpinnerService,
  ) {
    this.SpinnerService.show();
    this.candidateId = this.persistance.get('loggedinuser').candidateId;
    this.loginUserId = this.persistance.get('loggedinuser').mapId;
    //this.emailId = this.persistance.get('emailId');
    this.emailId = this.persistance.get('loggedinuser').emailId;
    //this.name = this.persistance.get('name');
    this.name = this.persistance.get('loggedinuser').userName;
    // this.canid = this.persistance.get('candidateid');
    this.canid = this.persistance.get('loggedinuser').candidateId;
    this.candidateNo = this.persistance.get('loggedinuser').userId;
    localStorage.removeItem('pagename');
    localStorage.removeItem('id');
    this.createForm();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllFunction();
    this.getAllPosition();
    this.getExternalJobList(1);
  }

  ngOnInit() {
    this.loadDatePicker();
    //console.log("mail",this.emailId)
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
  createForm() {
    this.searchform = this.fb.group({
      verticalId: [0],
      positionId: [0],
      functionId: [0],
      locationId: [0],
      fromDate: [''],
      toDate: [''],
      isActive: [true],
      sourceChannelId: [0],
      roleIds: [''],
      candidateId: [this.candidateId]
    });
  }

  getExternalJobList(type: any) {
    this.SpinnerService.show();
    this.currentJobs = [];
    if (type == 1) {
      this.searchform.patchValue({ sourceChannelId: 2 });
    }
    else {
      this.searchform.patchValue(
        {
          fromDate: this.fDate.nativeElement.value,
          toDate: this.tDate.nativeElement.value,
          sourceChannelId: 2
        });
    }
    //console.log(this.searchform.value)
    this.requisitionService.getSourceChannelJobList(this.searchform.value).subscribe((result) => {
      if (result) {
        //this.currentJobs = result;
        // console.log("External Job", result);
        let obj = {
          CandidateId: this.candidateId,
          RequisitionDetailId: 0,
          CreatedBy: 0
        }
        if (type == 1) {
          this.candidateService.candidateCheckUpdateProfile(obj).subscribe((result1) => {
            if (result1) {
              if (result1.successFlag == 0) {
                this.currentJobs = result;
                this.currentJobs = this.currentJobs.filter(e => e.appliedStatus == 0);
              } else {
                this.currentJobs = result;
              }
            }
            else {
              this.notificationService.showError("Something went wrong.", "Error");
            }
          }, error => {
            console.log(error);
          }, () => {
          });
        } else {
          this.currentJobs = result;
        }
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
        //console.log(result);
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
  getAllVerticals() {
    this.verticals = [];
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    this.loadSelectPicker();
    this.selectedVertical = this.verticals.filter(x => x.verticalId == 0)[0];
    this.getAllFunction();
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
  //functions
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
          isActive: true,
          verticalName: ""
        })
      }
      else {
        this.functions = [];
        this.functions.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          isActive: true,
          verticalName: ""
        })
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  //position
  getAllPosition() {
    this.positions = [];
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
      this.loadSelectPicker();
    });
  }

  fromSubmit() {
    this.getExternalJobList(2)
    this.loadSelectPicker();
  }

  applyJob(id: any) {
    // console.log("che", id)
    this.SpinnerService.show();
    this.candidateApplyJob.candidateId = this.candidateId;
    this.candidateApplyJob.requisitionDetailId = id.requisitionDetailId;
    this.candidateApplyJob.createdBy = this.loginUserId;
    this.candidateApplyJob.position = id.positionName;
    this.candidateApplyJob.department = id.departmentName;
    this.candidateApplyJob.function = id.functionName;
    this.candidateApplyJob.location = id.locationNo;
    this.candidateApplyJob.state = id.stateName;
    this.candidateApplyJob.reqno = id.requisitionNo.toString();
    this.candidateApplyJob.EmailId = this.emailId.toString();
    this.candidateApplyJob.Name = this.name.toString();
    this.candidateApplyJob.candidate = this.canid.toString();
    this.candidateApplyJob.candidateNo = this.candidateNo.toString();
    //console.log("json", this.candidateApplyJob)
    this.candidateService.candidateApplyJob(this.candidateApplyJob).subscribe((result) => {

      if (result) {
        if (result.successFlag == 1) {
          this.notificationService.showSuccess(result.msg, "Success");
          this.getExternalJobList(2);
          this.SpinnerService.hide();
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
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  resetForm() {
    this.searchform.reset();
    this.searchform.patchValue({
      positionId: 0,
      functionId: 0,
      locationId: 0,
      fromDate: '',
      toDate: '',
      isActive: true,
      sourceChannelId: 4
    })
    this.getAllPosition();
    this.getAllFunction();
    this.getAllVerticals();
    this.fromSubmit();
    this.loadSelectPicker();
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
