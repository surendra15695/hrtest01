import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthguardserviceService } from './../../auth/authguardservice.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../sharedservices/notification.service';
import { userInfo } from 'os';
import { Observable, Subscription } from 'rxjs';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { UserService } from 'src/app/services/common/user/user.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  private formSubmitAttempt: boolean;
  pageTitle: string = "MRF Connect Us";
  //Operation: string;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });
  subscription: Subscription;
  hidePassword: boolean = true;
  ByCosmos: number = 0;
  EmpNo: string = "";
  // OTP Authentication
  otp: string[] = ['', '', '', ''];
  showLoginSection: boolean = true;
  OTPDetails: any;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthguardserviceService,
    private notificationService: NotificationService,
    private titleService: Title,
    private persister: PersistanceService,
    private userService: UserService,
    private SpinnerService: NgxSpinnerService
  ) {
    this.activateRoute.queryParams.subscribe((params) => {
      if (params["ByCosmos"] == "1") {
        let data = {
          userId: params["EmpNo"],
          password: '1'
        }
        this.authService.loginByCosmos(data);
        this.formSubmitAttempt = true;
      }
    });

  }

  ngOnInit() {
    this.subscription = new Subscription();
    this.titleService.setTitle(this.pageTitle);
    this.form = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  // OTP Authentication
  onSubmit() {
    if (this.form.value.userId != "" && this.form.value.password != "") {
      this.SpinnerService.show();
      var user = {
        userId: this.form.value.userId,
        password: this.form.value.password
      }
      this.userService.validateUserToSendOTP(user).subscribe((result) => {
        if (result) {
          if (result.status == 1) {
            this.OTPDetails = result;
            if (result.userOTP.isOTPRequired==1) {
              this.showLoginSection = false;
              this.SpinnerService.hide();
            } else {
              this.showLoginSection = true;
              this.loginAfterSuccessfulOTPVerification();
            }

          } else if (result.status == 2) {
            this.notificationService.showError(`Your account is blocked !
            Reset your password by clicking on the "Forgot Password" after entering your User ID`, "Error");
            console.log("Error");
            this.SpinnerService.hide();
          }
          else if (result.status == 3) {
            this.notificationService.showError("Invalid Password !!", "Error");
            console.log("Error");
            this.SpinnerService.hide();
          }
          else if (result.status == 4) {
            this.notificationService.showError("Invalid User OR Inactive User. Please Contact Your IT Administrator.", "Error");
            console.log("Error");
            this.SpinnerService.hide();
          }
          else {
            this.notificationService.showError(result.ErrorMsg, "Error");
            console.log("Error");
            this.SpinnerService.hide();
          }
        }
        else {
          this.SpinnerService.hide();
        }
      }, error => {
        console.log(error);
      }, () => {

      });

    } else {
      this.notificationService.showError("Please fill required fields !!", "Error");
    }

  }

  loginAfterSuccessfulOTPVerification() {
    if (this.form.valid) {
      this.authService.login(this.form.value);
    }
    else {
      this.notificationService.showError("Please fill required fields !!", "Error");
    }
    this.formSubmitAttempt = true;
  }

  //by kuntal
  ForgotPassword() {
    if (this.form.value.userId != "") {
      this.authService.forgotPassword(this.form.value);
    }
    else {
      this.notificationService.showError("Please enter User ID !!", "Error");
    }
  }


  //createForm() {
  //  //this.Operation = 'add';
  //  this.saveForm = this.fb.group({
  //    OldPw: ['', Validators.required],
  //    NewPw: ['', Validators.required],
  //    ConfPw: ['', Validators.required],
  //    //DomainId: [0]
  //  })
  //}
  onShowHidePassword() {
    this.hidePassword = !this.hidePassword;
  }

  // OTP Authentication

  moveToNextInput(event: any, nextInput: HTMLInputElement): void {
    if (event.target.value && event.target.value.length === 1) {
      nextInput.focus();
    }
  }
  cancelClick() {
    this.showLoginSection = true;
  }
  VerifyOTP() {
    if (Number(this.otp.join('')) == Number(this.OTPDetails.userOTP.otp)) {
      this.notificationService.showSuccess("OTP Verified Successfully", "Success");
      this.loginAfterSuccessfulOTPVerification();
    } else {
      this.notificationService.showError("Invalid OTP !!", "Error");
    }
  }
  resendOTP() {
    this.SpinnerService.show();
    var user = {
      userId: this.form.value.userId,
      password: this.form.value.password
    }
    this.userService.validateUserToSendOTP(user).subscribe((result) => {
      if (result) {
        if (result.status == 1) {
          this.OTPDetails = result;
          this.showLoginSection = false;
          this.SpinnerService.hide();
          this.notificationService.showSuccess("OTP resend Successfully", "Success");
        }
      }
      else {
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.show();
    });
  }

}
