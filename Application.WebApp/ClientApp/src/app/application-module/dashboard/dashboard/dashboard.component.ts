import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { DashboardService } from '../../../services/common/dashboard/dashboard.service';
import { ShareddataService } from '../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { UserService } from '../../../services/common/user/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthguardserviceService } from '../../../auth/authguardservice.service';
import * as $ from 'jquery';

declare var jQuery: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  rmData: any[] = [];
  searchRMData: any =
    {
      autoUserId: null,
      dayCount: null
    };
    
  loginUserId: number;
  rmContent: boolean = false;
  // For ForcePassword Change
  isForcePassword: boolean = false;
  objChangePassword: ChangePassword;
  newPassMissmatch: boolean = false;
  cnfPasswordMissmatch: boolean = false;
  newPasswordPatternMissmatch: boolean = false;
  patternMedium: any = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$";
  selectedPattern: string;
  passwordhide:boolean=false;
  changePasswordForm: FormGroup;
  constructor(
    private dashboardService: DashboardService,
    private shareddataService: ShareddataService,
    private persistance: PersistanceService,
    private fb: FormBuilder,
    private notiService: NotificationService,
    private userService: UserService,
    private spinnerService: NgxSpinnerService,
    private authService: AuthguardserviceService
  ) {
    this.isForcePassword = this.persistance.get('loggedinuser').isForcedPasswordchange;  // Checking force password status
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    var roleids = this.persistance.get('loggedinuser').roleIds.split(",");
    for (var i = 0; i < roleids.length; i++) {
      if (roleids[i] == "5") {
        this.rmContent = true;
      }
    }
    // this.objChangePassword = new ChangePassword();
    this.createForm();

  }
  createForm() {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$")]],
      cnfNewPassword: ['', [Validators.required]],
      userId: this.persistance.get('loggedinuser').userId
    })
    // this.changePasswordForm.value.userId = this.persistance.get('loggedinuser').userId;
  }
  // passwordConfirming(c: AbstractControl): { invalid: boolean } {
  //   if (c.get('newPassword').value !== c.get('cnfNewPassword').value) {
  //     return { invalid: true };
  //   }
  // }
  ngOnInit() {
    this.getRMDashboard();
    this.passwordhide=true;
    // jQuery("#myModal").modal("hide");
    // jQuery("#myModal").modal('show');
    // Show popup if force password is true
    if (this.isForcePassword) {
      //jQuery("#myModal").modal('show');
      jQuery("#myModal").modal({
        backdrop: 'static',
        keyboard: false
      }, 'show');
    }

  }

  getRMDashboard() {
    this.searchRMData.autoUserId = this.loginUserId;
    this.searchRMData.dayCount = 30;
    this.dashboardService.getRMdashboard(this.searchRMData).subscribe((result) => {
      if (result) {
        this.rmData = result;
        // console.log(result);
      }
      else {
        this.rmData = [];
      }
    })
  }

  // For Change Password
  actionFormSubmit() {
    if (this.IsValid()) {
      this.spinnerService.show();
      this.userService.changePassword(this.changePasswordForm.value).subscribe((result) => {
        if (result) {
          if (result.status == 0) {
            this.notiService.showError("Old password does not match ", "Error");
          }
          else {
            this.notiService.showSuccess("Password changed successfully", "Success");
            this.onlogout();
            jQuery("#myModal").modal("hide");
          }
        }
        else {
        }
      }, error => {
        console.log(error);
      }, () => {
        this.spinnerService.hide();
      });
    }

  }
  onlogout() {
    this.authService.logout();
    // Added By Anif on 20-07-2022
    this.persistance.set('EDMSLinkAuthorization', null);
  }
  IsValid() {
    if (this.changePasswordForm.value.oldPassword == undefined || this.changePasswordForm.value.oldPassword == "") {
      this.notiService.showError("Please Enter Old Password", "Error");
      return false;
    }
    if (this.changePasswordForm.value.newPassword == undefined || this.changePasswordForm.value.newPassword == "") {
      this.notiService.showError("Please Enter New Password", "Error");
      return false;
    }
    if (this.changePasswordForm.value.cnfNewPassword == undefined || this.changePasswordForm.value.cnfNewPassword == "") {
      this.notiService.showError("Please Enter Confirm Password", "Error");
      return false;
    }
    if (this.changePasswordForm.value.newPassword != this.changePasswordForm.value.cnfNewPassword) {
      this.notiService.showError("New password and confirm password does not match", "Error");
      return false;
    }
    return true;

  }
  onclickeye(){
    this.passwordhide == true ? this.passwordhide=false : this.passwordhide=true
  }
  onNewPasswordPress(eve) {    
    if (this.changePasswordForm.get("cnfNewPassword").value != "") {
      if (this.changePasswordForm.get("newPassword").value != this.changePasswordForm.get("cnfNewPassword").value) {
        this.newPassMissmatch = true;
      } else {
        this.newPassMissmatch = false;
        this.cnfPasswordMissmatch = false;
      }
    }
  }
  onCnfPasswordPress(eve) {
    if (this.changePasswordForm.get("newPassword").value != "") {
      if (this.changePasswordForm.get("cnfNewPassword").value != this.changePasswordForm.get("newPassword").value) {
        this.cnfPasswordMissmatch = true;
      } else {
        this.cnfPasswordMissmatch = false;
        this.newPassMissmatch = false;
      }

    }
  }
}
class ChangePassword {
  oldPassword: string;
  newPassword: string;
  cnfNewPassword: string;
  userId: string;
}
