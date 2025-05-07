import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { CommonService } from '../../../services/common/common/common.service';
import { LocationService } from 'src/app/services/common/location/location.service';
declare var jQuery: any;

@Component({
  selector: 'app-manage-vendor',
  templateUrl: './manage-vendor.component.html',
  styleUrls: ['./manage-vendor.component.css']
})
export class ManageVendorComponent implements OnInit {

  Operation: string;
  saveForm: FormGroup;
  createdBy: number;
  searchState = {
    StateId: 0,
    IsActive: true
  }
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  stateList: any[] = [];
  searchVendor = {
    VendorId: null,
    IsActive: null
  }
  vendorList: any[] = [];
  showUserIdPassword: boolean;
  constructor(
    private commonService: CommonService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private fb: FormBuilder, private locationService: LocationService,
    private persistance: PersistanceService
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;

  }

  ngOnInit() {
    this.tableOptionDropDown();
    this.loadDatePicker();
    this.createForm();
    this.loadDataTable();
    this.getAllState();
    this.getAllVendor();
  }
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }
  createForm() {
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      VendorId: [0],
      VendorUserID: [''],
      // Password: ['', Validators.required],
      // SaltKey: [''],
      VendorName: ['', Validators.required],
      ContactPersonName: ['', Validators.required],
      AgreementValidityDate: [''],
      EmailId: ['', Validators.required],
      AlternateEmailId: [""],
      ContactNo: ['', Validators.required],
      City: ['', Validators.required],
      Street: [''],
      ZipCode: ['', Validators.required],
      StateId: [null, Validators.required],
      IsActive: [true],
      // CreatedBy: [this.createdBy]
    })
    this.showUserIdPassword = true;
  }
  tableOptionDropDown() {
    setTimeout(() => {
      var body_ = jQuery('body');
      var dropdownMenu,
        table_responsive = jQuery('.table-responsive');
      table_responsive.on('show.bs.dropdown', function (e) {
        dropdownMenu = jQuery(e.target).find('.dropdown-menu');
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
    });
  }
  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        //"searching": true,
        //"paging": true,
        "scrollX": true,
        "bLengthChange": false,
      });
    });
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  getAllState() {
    this.spinnerService.show();
    // this.saveForm.value.IsActive = null;
    this.commonService.getAllMasterState(this.searchState).subscribe((response: any) => {
      if (response) {
        this.stateList = response;
      }
      else {
        this.stateList = [];
      }
    }, error => {
      this.spinnerService.hide();
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })

  }
  getAllVendor() {
    this.spinnerService.show();
    // this.saveForm.value.IsActive = null;
    this.commonService.getAllVendor(this.searchVendor).subscribe((response: any) => {

      if (response) {
        this.vendorList = response;
      }
      else {
        this.vendorList = [];
      }
    }, error => {
      this.spinnerService.hide();
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.loadDataTable();
      this.showUserIdPassword = true;
      this.spinnerService.hide();
    })
  }
  onSubmit() {
    var falg = 0;
    var msg = "";
    if (this.fDate.nativeElement.value == "") {
      falg = 1;
      msg = "Please Select Agreement Date"
    }
    if (falg == 0) {
      this.spinnerService.show();
      this.saveForm.patchValue({
        AgreementValidityDate: this.fDate.nativeElement.value
      })
      // console.log("save-data:", this.saveForm.value);
      this.commonService.addVendor(this.saveForm.value).subscribe((response: any) => {
        if (response.successFlag == 1) {
          this.notiService.showSuccess(response.msg, "Success");
          this.createForm();
          this.getAllVendor();
          jQuery(".close").click();
          this.showUserIdPassword = true;
          jQuery(".custom-menu").hide();
        }
        else {
          this.notiService.showError(response.msg, "Error");
        }
      }, error => {
        this.spinnerService.hide();
        jQuery(".custom-menu").hide();
        this.notiService.showError("Something went wrong.. Try again later..", "")
        console.log(error);
      }, () => {
        this.spinnerService.hide();
      })
    } else {
      this.notiService.showError(msg, "Error");
    }

  }
  onEdit(Data: any) {
    this.Operation = 'edit';

    // console.log("Edit test- ", Data);
    this.saveForm.patchValue({
      VendorId: Data.vendorId,
      // VendorUserId: Data.vendorUserId,
      // Password: Data.password,
      VendorUserID: Data.vendorUserID,
      ContactPersonName: Data.contactPersonName,
      AgreementValidityDate: Data.agreementValidityDate,
      VendorName: Data.vendorName,
      EmailId: Data.emailId,
      AlternateEmailId: Data.alternateEmailId,
      ContactNo: Data.contactNo,
      City: Data.city,
      Street: Data.street,
      ZipCode: Data.zipCode,
      StateId: Data.stateId,
      IsActive: Data.isActive,
      // CreatedBy: this.createdBy
    });

    this.showUserIdPassword = false;
    jQuery(".custom-menu").hide();
  }

}
