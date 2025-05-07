import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ISearchRequisition, IRequisitionList } from '../../../../../interfaces/preselection/requisition.interface';
import { IUserDetail, ISearchUser } from '../../../../../interfaces/common/user';
import { IVerticalRM, ISearchVerticalRM } from '../../../../../interfaces/common/vertical.interface';
import { ISalary, ISearchSalary } from '../../../../../interfaces/common/salary.interface';
import { ShareddataService } from '../../../../../sharedservices/shareddata.service';
import { RequisitionService } from '../../../../../services/preselection/requisition/requisition.service';
import { UserService } from '../../../../../services/common/user/user.service';
import { SalaryService } from '../../../../../services/common/salary/salary.service';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { ToastrService } from 'ngx-toastr';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { SharedcomponentdataService } from '../../../../../sharedservices/sharedcomponentdata.service';
import { NgxSpinnerService } from "ngx-spinner";
import { LocationService } from 'src/app/services/common/location/location.service';
declare var jQuery: any;

@Component({
  selector: 'app-allocatetorm',
  templateUrl: './allocatetorm.component.html',
  styleUrls: ['./allocatetorm.component.css']
})
export class AllocatetormComponent implements OnInit {
  pageTitle: string = "Requisition - Allocate To RM";
  saveForm: FormGroup;
  //requisition detail
  requisitionDetailId: number;
  requisitionLists: IRequisitionList[] = [];
  // searchRequisition: ISearchRequisition = {
  //   requisitionNo: null,
  //   requistionId: null,
  //   requisitionDetailId: null,
  //   locationId: null,
  //   verticalId: null,
  //   fromDate: null,
  //   toDate: null,
  //   iOMNo: null,
  //   requisitionApprovalStatus: null,
  //   requisitionProcessStatus: null,
  //   createdBy: null,
  //   approverAutoUserId: null,
  //   allocatedUserId: null,
  //   requisitionTypeId: null
  // }
  searchRequisition: any = {
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
    requisitionTypeId: null,
    loggedInUserRoleIds: null,
    moduleId: null

  }
  //rm user
  rmUser: IUserDetail[] = [];
  searchUser: ISearchUser = {
    userId: null,
    userName: null,
    roleId: 3,
    isActive: null
  };
  selectedUser: IUserDetail;
  //salary
  salaries: ISalary[] = [];
  searchSalary: ISearchSalary = {
    salaryId: 0,
    isActive: true
  }
  selectedSalary: ISalary;
  createdBy: number;

  pageName: string;
  paramId: string;
  reqVerticalId: number;
  searchVerticalRM: ISearchVerticalRM = {
    autoUserId: null,
    verticalId: null
  }
  moduleId: number;
  loggedInUserRoleIds: string;

  pagValue:number;
  previousValues:any = {};
  constructor(
    private fb: FormBuilder,
    private shareddataService: ShareddataService,
    private requisitionService: RequisitionService,
    private userService: UserService,
    private salaryService: SalaryService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private persistance: PersistanceService,
    private _route: Router,
    private SpinnerService: NgxSpinnerService,
    private sharedDataComponentService: SharedcomponentdataService,
    private locationService: LocationService,

  ) {
    // this.getPageName();
    // this.getParamId();
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.moduleId = this.persistance.get('moduleId');   // Added by anif on 18-03-2023
    this.loggedInUserRoleIds = this.persistance.get('loggedinuser').roleIds;   // Added by anif on 18-03-2023
    this.pagValue = this.persistance.get("tabledisplayStart")
    this.previousValues = this.persistance.get('previouspagefilters')
    if (this.persistance.get('pagename') != null) {
      if (this.persistance.get('pagename') == "rorequisitionlist") {
        this.SpinnerService.show();
        this.requisitionDetailId = this.persistance.get('paramid');
        this.getAllSalary();
        this.createForm();
        this.getRMUser();
        this.getRequisitionDetail();
      }
      else {
        this._route.navigate(['/app/rorequisitionlist']);
      }
    }
    else {
      this._route.navigate(['/app/rorequisitionlist']);
    }

  }

  getPageName() {
    this.sharedDataComponentService.pageName.subscribe(c => {
      this.pageName = c;
    });
  }

  getParamId() {
    this.sharedDataComponentService.paramId.subscribe(c => {
      this.paramId = c;
    });
  }

  ngOnInit() {

  }

  createForm() {
    this.saveForm = this.fb.group({
      requisitionDetailId: [this.requisitionDetailId],
      allocatedAutoUserId: [undefined, Validators.required],
      salaryId: [undefined, Validators.required],
      remarks: [''],
      createdBy: [0]
    });
  }

  getRequisitionDetail() {
    this.requisitionLists = [];
    this.searchRequisition.loggedInUserRoleIds = this.loggedInUserRoleIds;   // Added by anif on 18-03-2023
    this.searchRequisition.moduleId = this.moduleId;   // Added by anif on 18-03-2023
    this.searchRequisition.requisitionDetailId = this.requisitionDetailId;
    this.requisitionService.getAllRequisition(this.searchRequisition).subscribe((result) => {
      if (result) {       
        this.requisitionLists = result;
        this.reqVerticalId = this.requisitionLists[0].verticalId;
        this.searchVerticalRM.verticalId = Number(this.reqVerticalId);
        this.getRMUser();
        if (this.requisitionLists[0].allocatedRMAutoUserId > 0) {
          this.saveForm.patchValue({
            allocatedAutoUserId: this.requisitionLists[0].allocatedRMAutoUserId,
            salaryId: this.requisitionLists[0].salaryId,
          });
          this.loadSelectPicker();
        }
      }
      else {
        this.requisitionLists = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }

  getRMUser() {
    this.rmUser = [];    
    this.userService.getVerticalRM(this.searchVerticalRM).subscribe((result) => {
      if (result) {
        this.rmUser = result;
        //this.rmUser=this.rmUser.filter(x=>x.roleIds.indexOf("5")>-1 && x.roleIds.indexOf("15")<0)
      }
      else {
        this.rmUser = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  getAllSalary() {
    this.salaries = [];
    this.salaryService.getAllSalary(this.searchSalary).subscribe((result) => {
      if (result) {
        this.salaries = result;
        if (this.salaries.length == 0) {
          this.getAllSalary();
        }
      }
      else {
        this.salaries = [];
      }
    }, error => {
      console.log(error);
    }, () => {
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

  formSubmit() {
    this.saveForm.patchValue({
      createdBy: this.createdBy
    })
    this.SpinnerService.show();
    this.requisitionService.allocateRequisitionToRM(this.saveForm.value).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.gotoRoRequisitionList();
        }
      }
      else {
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

  gotoRoRequisitionList() {
    this.persistance.set('pagename', null);
    this.persistance.set('paramid', null);
    this.persistance.set('previouspageparams',this.previousValues);
    this.persistance.set('tabledisplayStart',this.pagValue);
    this._route.navigate(['/app/requisition/all-positions']);
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
