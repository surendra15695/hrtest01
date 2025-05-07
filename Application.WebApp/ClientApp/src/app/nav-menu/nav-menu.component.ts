import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { AuthguardserviceService } from '../auth/authguardservice.service';
import { PersistanceService } from '../sharedservices/persitence.service';
import { IUserMenu, ISearchMenu, IMenu, ISubMenus } from '../interfaces/common/menu.interface';
import { UserService } from '../services/common/user/user.service';
import { NotificationService } from '../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import 'simplebar';
import 'simplebar/dist/simplebar.css';
import { environment } from 'src/environments/environment';
declare var jQuery: any;

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  loginautouserid: number;
  userMenus: IMenu[] = [];
  searchMenu: ISearchMenu = {
    autoUserId: null
  }
  passwordhide: boolean = false;
  menustr: string;
  userName: string;
  userId: string;
  // Added By Anif on 20-07-2022 for EDMS Link Authorization
  showEDMSLinkVisible: boolean;
  edmsLinkResult: any;
  autoUserId: number;
  // For ForcePassword Change added by ani on 05-08-2022
  isForcePassword: boolean = false;
  objChangePassword: ChangePassword;
  newPassMissmatch: boolean = false;
  cnfPasswordMissmatch: boolean = false;
  patternMedium: any = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$";
  selectedPattern: string;
  edmslink : any;
  changePasswordForm: FormGroup;
  constructor(
    private authService: AuthguardserviceService,
    private persistance: PersistanceService,
    private userService: UserService,
    private notiService: NotificationService,
    private spinnerService: NgxSpinnerService,
    private fb: FormBuilder
  ) {
    this.isForcePassword = this.persistance.get('loggedinuser').isForcedPasswordchange;  // Checking force password status
    this.userName = this.persistance.get('loggedinuser').userName;
    //by kuntal
    this.userId = this.persistance.get('loggedinuser').userId;
    this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
    this.userMenus = this.persistance.get('menudata');
    this.menustr = JSON.stringify(this.persistance.get('menudata'));
    this.edmslink = environment.edmslink;
    this.loadMenuDetail();
    this.checkEdmsLinkVisible();
    // Change Password
    this.passwordhide = true;
    // this.objChangePassword = new ChangePassword();
    // this.objChangePassword.userId = this.userId;
    this.createForm();

  }
  onclickeye() {
    this.passwordhide == true ? this.passwordhide = false : this.passwordhide = true
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
  onlogout() {
    this.authService.logout();
    // Added By Anif on 20-07-2022
    this.persistance.set('EDMSLinkAuthorization', null);
  }
  // Added By Anif on 20-07-2022
  checkEdmsLinkVisible() {
    this.edmsLinkResult = this.persistance.get('EDMSLinkAuthorization');
    // console.log("In Nav Menu", this.edmsLinkResult);
    if (this.edmsLinkResult != null && this.edmsLinkResult != undefined) {
      if (this.edmsLinkResult.isEDMSAccess) {
        this.showEDMSLinkVisible = true;
      } else {
        this.showEDMSLinkVisible = false;
      }
    }

  }

  loadMenuDetail() {
    setTimeout(() => {
      jQuery(".open-left").on("click", function () {
        jQuery("#wrapper").toggleClass("enlarged");
        jQuery("#wrapper").addClass("forced");
        if (jQuery("#wrapper").hasClass("enlarged") && jQuery("body").hasClass("fixed-left")) {
          jQuery("body").removeClass("fixed-left").addClass("fixed-left-void");
        } else if (jQuery("#wrapper").hasClass("enlarged") && jQuery("body").hasClass("fixed-left-void")) {
          jQuery("body").removeClass("fixed-left-void").addClass("fixed-left");
        }
        if (jQuery("#wrapper").hasClass("enlarged")) {
          jQuery(".left ul").removeAttr("style");
        } else {
          jQuery(".subdrop").siblings("ul:first").show();
        }
        //toggle_slimscroll(".slimscrollleft");
        if (jQuery("#wrapper").hasClass("enlarged")) {
          jQuery(".slimscrollleft").css("overflow", "inherit").parent().css("overflow", "inherit");
          jQuery(".slimscrollleft").siblings(".slimScrollBar").css("visibility", "hidden");
        } else {
          jQuery(".slimscrollleft").css("overflow", "hidden").parent().css("overflow", "hidden");
          jQuery(".slimscrollleft").siblings(".slimScrollBar").css("visibility", "visible");
        }
        jQuery("body").trigger("resize");
      });

      jQuery("#sidebar-menu a").on("click", function () {
        if (!jQuery("#wrapper").hasClass("enlarged")) {
          if (jQuery(this).parent().hasClass("has_sub")) {

          }
          if (!jQuery(this).hasClass("subdrop")) {
            // hide any open menus and remove all other classes
            jQuery("ul", jQuery(this).parents("ul:first")).slideUp(350);
            jQuery("a", jQuery(this).parents("ul:first")).removeClass("subdrop");
            jQuery("#sidebar-menu .pull-right i").removeClass("md-remove").addClass("md-add");

            // open our new menu and add the open class
            jQuery(this).next("ul").slideDown(350);
            jQuery(this).addClass("subdrop");
            jQuery(".pull-right i", jQuery(this).parents(".has_sub:last")).removeClass("md-add").addClass("md-remove");
            jQuery(".pull-right i", jQuery(this).siblings("ul")).removeClass("md-remove").addClass("md-add");
          } else if (jQuery(this).hasClass("subdrop")) {
            jQuery(this).removeClass("subdrop");
            jQuery(this).next("ul").slideUp(350);
            jQuery(".pull-right i", jQuery(this).parent()).removeClass("md-remove").addClass("md-add");
          }
        }
      });
    })
  }

  toggle_slimscroll(item) {
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
            jQuery("#changePasswordModal").modal("hide");
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

  /* Added  By Anif on 09-02-2023 */
  onClickMenuData(menuData) {
    this.persistance.set('moduleId', menuData.moduleId);
  }
  onClickSubMenu(submenuData) {
    this.persistance.set('moduleId', submenuData.moduleId);
  }
  /* Added  By Anif on 09-02-2023 Till this*/
}
class ChangePassword {
  oldPassword: string;
  newPassword: string;
  cnfNewPassword: string;
  userId: string;
}
