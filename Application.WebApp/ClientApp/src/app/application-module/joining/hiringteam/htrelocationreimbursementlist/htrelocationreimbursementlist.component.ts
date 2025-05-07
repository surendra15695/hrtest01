import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../interfaces/common/doctor.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../interfaces/common/position.interface';
import { IJoinersList, IPendingScheduleBatchWise, IPendingScheduleIndividual, IScheduledBatchWise, IScheduledIndividually, IReportingVenueExists } from '../../../../interfaces/prejoining/joinerslist.interface';
import { IOnboardingCoordinator, ISearchOnboardingCoordinator, IVenue, ISearchVenue, IJoiningDocument, IWelcomeTemplate } from '../../../../interfaces/prejoining/onboardingcoordinator.interface';
import { ICandidateDetailData, ISearchCandidateDetail, IModeOfJoining, ISearchModeOfJoining } from '../../../../interfaces/preselection/candidate.interface';
import { IAssessemenrAssignReleaseList, IBatchAssessment, ICandidateAssessmentList, ISearchAssessmentAssignReleaseList } from '../../../../interfaces/joining/programcoordinator.interface';
import { LocationService } from '../../../../services/common/location/location.service';
import { CommonService } from '../../../../services/common/common/common.service';
import { FunctionService } from '../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../services/common/department/department.service';
import { PositionService } from '../../../../services/common/position/position.service';
import { RecruitmentmanagerService } from '../../../../services/prejoining/recruitmentmanager/recruitmentmanager.service';
import { ShareddataService } from '../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { CorporateallocationService } from '../../../../services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { HiringteamService } from '../../../../services/joining/hiringteam/hiringteam.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ICandidateRelocationReimbursementList, IEmployeeNo, IOnboardingManager, IReassignHiringCandidateList, IsearchEmployeeNo, ISearchonboardingManager } from 'src/app/interfaces/joining/hiringteam.interface';
import { CandidateService } from 'src/app/services/preselection/candidate/candidate.service';
declare var jQuery: any;


@Component({
  selector: 'app-htrelocationreimbursementlist',
  templateUrl: './htrelocationreimbursementlist.component.html',
  styleUrls: ['./htrelocationreimbursementlist.component.css']
})
export class HtrelocationreimbursementlistComponent implements OnInit {


  searchRelocationReimbursementFormPending: FormGroup;
  searchRelocationReimbursementFormProcessed: FormGroup;
  @ViewChild('dtofJoiningFromPending', { static: false }) dtofJoiningFromPending: ElementRef;
  @ViewChild('dtofJoiningToPending', { static: false }) dtofJoiningToPending: ElementRef;
  @ViewChild('dtofJoiningFromProcessed', { static: false }) dtofJoiningFromProcessed: ElementRef;
  @ViewChild('dtofJoiningToProcessed', { static: false }) dtofJoiningToProcessed: ElementRef;
  @ViewChild('dateOfJoining', { static: false }) dtOfJoining: ElementRef;
  //vertical
  verticals: IVertical[] = [];
  verticalsPopUp: IVertical[] = [];
  selectedPendingVertical: IVertical;
  selectedVerticalId: number;
  defaultverticalId: number;
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
  requisitionDetailId: number;
  loginUserId: number;
  verticalIds: string;
  rolenames: string;
  candidateRelocationReimbursementList: ICandidateRelocationReimbursementList[] = [];
  @ViewChild('attachmentFileImport', { static: false }) attachmentFileImport: ElementRef;
  @ViewChild('attachmentFileImport1', { static: false }) attachmentFileImport1: ElementRef;
  attachmentfileToUpload: File;
  billAmount: string;
  candidateReimbursementBillSubmitId: number;
  candidateId: number;
  type: number;
  bill: string;
  invalidFileName: boolean = false;
  invalidFileName2: boolean = false;
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
    private hiringteamService: HiringteamService,
    private candidateService: CandidateService,
    private router: Router
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.rolenames = this.persistance.get('loggedinuser').roleNames;
    // this.requisitionDetailId = this.persistance.get('paramid');
    this.requisitionDetailId = null;
    if ((this.rolenames == "Corporate Hiring Team,Employee") || (this.rolenames == "Corporate Logistic Team,Employee")) {
      this.type = 1;
    }
    else if ((this.rolenames == "Employee,Plant Hiring Team") || (this.rolenames == "Employee,Plant Logistic Team")) {
      this.type = 2;
    }
    else if ((this.rolenames == "Employee,Sales &amp; Marketing Hiring Team") || (this.rolenames == "Employee,Sales &amp; Marketing Logistic Tea")) {
      this.type = 3;
    }
    this.createRelocationReimbursementSearchFormPending();
    this.createRelocationReimbursementSearchFormProcessed();
    this.getAllVerticals();
    this.getAllRelocationReimbursementList();

  }

  ngOnInit() {
    this.loadDataTable();
    this.loadDatePicker();
    this.loadDataTable2();
    this.tableOptionDropDown();
    //jQuery(".custom-menu").hide();
  }
  loadDataTable() {
    // jQuery('#dataTable1').DataTable().clear().destroy();
    // setTimeout(() => {
    //   jQuery('#dataTable1').DataTable({
    //     "searching": false,
    //     "paging": true,
    //     "scrollX": true,
    //     "bLengthChange": false,
    //   });
    // });
    var dothis = this;
    jQuery('#dataTable1').dataTable().fnClearTable();
    jQuery('#dataTable1').dataTable().fnDestroy();
    setTimeout(() => {
      var oTable =
        jQuery('#dataTable1').dataTable({
          "searching": false,
          "paging": true,
          "scrollX": true,
          "autoWidth": false
        });
    });
  }
  loadDataTable2() {
    // jQuery('#dataTable2').DataTable().clear().destroy();
    // setTimeout(() => {
    //   jQuery('#dataTable2').DataTable({
    //     "searching": false,
    //     "paging": true,
    //     "scrollX": true,
    //     "bLengthChange": false,
    //   });
    // });
    var dothis = this;
    jQuery('#dataTable2').dataTable().fnClearTable();
    jQuery('#dataTable2').dataTable().fnDestroy();
    setTimeout(() => {
      var oTable =
        jQuery('#dataTable2').dataTable({
          "searching": false,
          "paging": true,
          "scrollX": true,
          "autoWidth": false
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
        'font-size': '13px'
      });
      dropdownMenu.addClass("mobPosDropdown");
    });
    table_responsive.on('hide.bs.dropdown', function (e) {
      jQuery(e.target).append(dropdownMenu.detach());
      dropdownMenu.hide();
    });
  }
  //verticals
  getAllVerticals(): void {
    this.verticals = [];
    var splitvertical = this.verticalIds.split(",");
    var allvertical = "";
    for (var i = 0; i < splitvertical.length; i++) {
      if (splitvertical[i] != "0") {
        if (splitvertical[i] == "1") {
          this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
        }
        else if (splitvertical[i] == "2") {
          this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
        }
        else if (splitvertical[i] == "3") {
          this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
        }
        if (allvertical == "") {
          allvertical = splitvertical[i];
        }
        else {
          allvertical = allvertical + "," + splitvertical[i];
        }
      }

    }
    this.selectedPendingVertical = this.verticals[0];
    this.defaultverticalId = this.selectedPendingVertical.verticalId;
    this.selectedVerticalId = this.defaultverticalId;

  }
  changeVerticalPending() {
    this.selectedVerticalId = this.searchRelocationReimbursementFormPending.get("vertical").value;
    this.getAllLocation();
    this.getAllFunction();
  }
  changeVerticalProcessed() {
    this.selectedVerticalId = this.searchRelocationReimbursementFormProcessed.get("vertical").value;
    this.getAllLocation();
    this.getAllFunction();
  }
  //locations
  getAllLocation() {
    this.locations = [];
    this.searchLocation.verticalId = this.selectedVerticalId;
    this.locationService.getAllLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        this.locations = result;
        this.locations.splice(0, 0, {
          locationId: 0,
          verticalId: 0,
          locationNo: "All",
          locationCode: "",
          locationOffice: "",
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
          locationOffice: "",
          isActive: true,
          createdBy: 0
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  //Function
  getAllFunction() {
    this.functions = [];
    this.searchFunction.verticalId = this.defaultverticalId;
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

  createRelocationReimbursementSearchFormPending() {
    this.searchRelocationReimbursementFormPending = this.fb.group({
      candidateId: null,
      requisitionDetailId: null,
      candidateReimbursementBillSubmitId: null,
      dtofJoiningFrom: "",
      dtofJoiningTo: "",
      empNo: "",
      name: "",
      vertical: null,
      location: null,
      function: null,
      department: null,
      pending: true
    });
  }
  createRelocationReimbursementSearchFormProcessed() {
    this.searchRelocationReimbursementFormProcessed = this.fb.group({
      candidateId: null,
      requisitionDetailId: null,
      candidateReimbursementBillSubmitId: null,
      dtofJoiningFrom: "",
      dtofJoiningTo: "",
      empNo: "",
      name: "",
      vertical: null,
      location: null,
      function: null,
      department: null,
      pending: true
    });
  }

  // onSearchRelocationReimbursementProcessed() {                  // By  Piu on 05-08-2023
  //   this.searchRelocationReimbursementFormProcessed.patchValue(
  //     {
  //       dtofJoiningFrom: this.dtofJoiningFromProcessed.nativeElement.value,
  //       dtofJoiningTo: this.dtofJoiningFromProcessed.nativeElement.value,
  //       pending: false
  //     });
  //   this.getAllRelocationReimbursementProcessedList();
  // }

  onSearchRelocationReimbursementProcessed() {                  // By  Piu on 05-08-2023
    var flag = 0
    this.searchRelocationReimbursementFormProcessed.patchValue(
      {
        dtofJoiningFrom: this.dtofJoiningFromProcessed.nativeElement.value,
        dtofJoiningTo: this.dtofJoiningToProcessed.nativeElement.value,
        pending: false
      });
    if (this.dtofJoiningFromProcessed.nativeElement.value.length > 0 && this.dtofJoiningToProcessed.nativeElement.value.length > 0) {
      const [fday, fmonth, fyear] = this.dtofJoiningFromProcessed.nativeElement.value.split("/");
      const fdate = new Date(fyear, fmonth - 1, fday);
      const [tday, tmonth, tyear] = this.dtofJoiningToProcessed.nativeElement.value.split("/");
      const tdate = new Date(tyear, tmonth - 1, tday);
      if (fdate > tdate) {
        this.notificationService.showError("To Date Can't be less than From Date !! Please provide actual date", "Error");
        flag = 1;
      }
    }
    if (flag == 0) {
      this.getAllRelocationReimbursementProcessedList();
    }
  }
  onResetClickProcessed() {
    this.searchRelocationReimbursementFormProcessed.reset();
    this.searchRelocationReimbursementFormProcessed.patchValue(
      {
        pending: false
      });
    this.getAllRelocationReimbursementProcessedList();
  }
  onSearchRelocationPendingReimbursement() {
    this.searchRelocationReimbursementFormPending.patchValue(
      {
        dtofJoiningFrom: this.dtofJoiningFromPending.nativeElement.value,
        dtofJoiningTo: this.dtofJoiningFromPending.nativeElement.value,
        pending: true
      });
    this.getAllRelocationReimbursementList();
  }
  onPendingResetClick() {
    this.searchRelocationReimbursementFormPending.reset();
    this.searchRelocationReimbursementFormPending.patchValue(
      {
        pending: true
      });
    this.getAllRelocationReimbursementList();
  }
  getAllRelocationReimbursementList() {
    debugger;
    this.candidateRelocationReimbursementList = [];
    this.hiringteamService.getAllRelocationReimbursement(this.searchRelocationReimbursementFormPending.value).subscribe((result) => {
      if (result) {
        this.candidateRelocationReimbursementList = result.filter(s => s.verticalId == this.type);
        this.SpinnerService.hide();
      }
      else {
        this.candidateRelocationReimbursementList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      // this.loadDatePicker();
      this.loadDataTable();
      this.SpinnerService.hide();
    });
  }

  getAllRelocationReimbursementProcessedList() {
    this.candidateRelocationReimbursementList = [];
    this.hiringteamService.getAllRelocationReimbursement(this.searchRelocationReimbursementFormProcessed.value).subscribe((result) => {
      if (result) {
        this.candidateRelocationReimbursementList = result.filter(s => s.verticalId == this.type);
        this.SpinnerService.hide();
      }
      else {
        this.candidateRelocationReimbursementList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.loadDataTable2();
      this.SpinnerService.hide();
    });
  }
  onClickPendingTab() {
    this.searchRelocationReimbursementFormPending.patchValue(
      {
        pending: true
      });
    setTimeout(() => {
      //this.loadDataTable();
      this.getAllRelocationReimbursementList();
    }, 1000);
    // this.getAllRelocationReimbursementList();
  }
  onClickProcessedTab() {
    this.searchRelocationReimbursementFormProcessed.patchValue(
      {
        pending: false
      });
    setTimeout(() => {
      // this.loadDataTable2();
      this.getAllRelocationReimbursementProcessedList();
    }, 1000);
    // this.getAllRelocationReimbursementProcessedList();
  }
  onAttachmentFileChange(files: FileList) {
    this.invalidFileName = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName = true;
      }
    })
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      return;
    }
    if (this.invalidFileName) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.attachmentFileImport.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("File should be less than 2MB!", "Error");
      this.attachmentFileImport.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    } else {
      this.attachmentFileImport.nativeElement.innerText = files[0].name;
      this.attachmentfileToUpload = files.item(0);

    }
  }
  onAttachmentFileChange1(files: FileList) {
    this.invalidFileName2 = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName2 = true;
      }
    })
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      return;
    }
    if (this.invalidFileName2) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.attachmentFileImport1.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("File should be less than 2MB!", "Error");
      this.attachmentFileImport1.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    } else {
      this.attachmentFileImport1.nativeElement.innerText = files[0].name;
      this.attachmentfileToUpload = files.item(0);

    }
  }
  onClickUploadBill(data) {
    //alert(JSON.stringify(data))
    this.candidateReimbursementBillSubmitId = data.candidateReimbursementBillSubmitId;
    this.requisitionDetailId = data.requisitionDetailId;
    this.candidateId = data.candidateId;
  }
  doc: string;

  onClickEditBill(data) {
    //console.log("Data",data)
    this.candidateReimbursementBillSubmitId = data.candidateReimbursementBillSubmitId;
    this.requisitionDetailId = data.requisitionDetailId;
    this.candidateId = data.candidateId;
    this.billAmount = data.amount;
    var subStr = new String(data.document);
    var strsSplits = subStr.split("/");
    var lastSubStr = strsSplits[strsSplits.length - 1]
    var lastSubStrSplits = lastSubStr.split("_");
    var result = lastSubStrSplits[lastSubStrSplits.length - 1]
    this.doc = result;
    this.bill = data.document;
  }
  onClickViewBill(record) {
    var subStr = new String(record.document);
    var strsSplits = subStr.split("/");
    var lastSubStr = strsSplits[strsSplits.length - 1]
    var lastSubStrSplits = lastSubStr.split("_");
    var result: any = lastSubStrSplits[lastSubStrSplits.length - 1];
    this.router.navigate(['/app/ht-relocation-reimbursement-details-view'], { queryParams: record, skipLocationChange: true });
  }
  onSubmitClaim() {
    var flag = 0;
    var msg = "";
    if (this.billAmount == null || this.billAmount == "") {
      flag = 1;
      msg = "Please Enter Bill Amount";
    }
    else {

    }
    if (this.attachmentfileToUpload == null) {
      flag = 1;
      msg = "Please Attach a file";
    }
    else {

    }

    if (flag == 0) {
      this.SpinnerService.show();
      const formData = new FormData();
      formData.append("CandidateReimbursementBillSubmitId", this.candidateReimbursementBillSubmitId.toString());
      formData.append("RequisitionDetailId", this.requisitionDetailId.toString());
      formData.append("CandidateId", this.candidateId.toString());
      formData.append("Amount", this.billAmount);
      formData.append("CreatedBy", this.loginUserId.toString());
      formData.append("Files", this.attachmentfileToUpload);
      this.hiringteamService.saveRelocationReimbursementData(formData).subscribe((result) => {
        // console.log(result);
        if (result.status == 0) {
          this.notificationService.showError(result.msg, "Error");
          this.SpinnerService.hide();
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.attachmentFileImport.nativeElement.innerText = "";
          this.attachmentFileImport.nativeElement.value = "";
          this.billAmount = "";
          // this.onClickPendingTab();
          // this.onClickProcessedTab();
          this.getAllRelocationReimbursementList();
          jQuery("#myModal").modal("hide");

        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
        this.notificationService.showError("Something went wrong", "Error");
      });
    }
    else {
      this.notificationService.showError(msg, "Error");
    }
  }
  onSubmitClaim1() {
    var flag = 0;
    var msg = "";
    if (this.billAmount == null || this.billAmount == "") {
      flag = 1;
      msg = "Please Enter Bill Amount";
    }
    else {

    }
    if (this.attachmentfileToUpload == null) {
      flag = 1;
      msg = "Please Attach a file";
    }
    else {

    }

    if (flag == 0) {
      this.SpinnerService.show();
      const formData = new FormData();
      formData.append("CandidateReimbursementBillSubmitId", this.candidateReimbursementBillSubmitId.toString());
      formData.append("RequisitionDetailId", this.requisitionDetailId.toString());
      formData.append("CandidateId", this.candidateId.toString());
      formData.append("Amount", this.billAmount);
      formData.append("CreatedBy", this.loginUserId.toString());
      formData.append("Files", this.attachmentfileToUpload);
      this.hiringteamService.saveRelocationReimbursementData(formData).subscribe((result) => {
        // console.log(result);
        if (result.status == 0) {
          this.notificationService.showError(result.msg, "Error");
          this.SpinnerService.hide();
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.attachmentFileImport.nativeElement.innerText = "";
          this.attachmentFileImport.nativeElement.value = "";
          this.billAmount = "";
          // this.onClickPendingTab();
          // this.onClickProcessedTab();
          //this.getAllRelocationReimbursementList();
          this.getAllRelocationReimbursementProcessedList();
          jQuery("#myModal1").modal("hide");

        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
        this.notificationService.showError("Something went wrong", "Error");
      });
    }
    else {
      this.notificationService.showError(msg, "Error");
    }
  }
  onCancelClick() {
    this.billAmount = "";
    this.attachmentFileImport.nativeElement.innerText = "";
    this.attachmentFileImport.nativeElement.value = "";
  }
  openFile(blobName: string): void {
    let regex = /\.net(.*)/;
    let match = blobName.match(regex);
    let extractedString = match ? match[1] : '';
    let filename = extractedString.split('/')[2];
    let containername = extractedString.split('/')[1];
    this.locationService.getTestfile(filename, containername).subscribe(response => {
      let blob: Blob = response.body as Blob;
      const url = window.URL.createObjectURL(blob);

      // Open the file in a new tab
      window.open(url);
    }, error => {
      console.error('Failed to download file:', error);
    });
  }
  ngOnDestroy() {
    jQuery(".custom-menu").hide();
  }

}
