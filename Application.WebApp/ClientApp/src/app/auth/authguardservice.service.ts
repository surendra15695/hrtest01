import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User, ILoginUser } from '../interfaces/common/user';
import { PersistanceService } from '../sharedservices/persitence.service';
import { NotificationService } from '../sharedservices/notification.service';
import { IUserMenu, ISearchMenu, IMenu, ISubMenus } from '../interfaces/common/menu.interface';
import { UserService } from '../services/common/user/user.service';
// import { CandidateService } from '../..../../services/candidate/candidate/candidate.service';
import { CandidateService } from '../services/candidate/candidate/candidate.service';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class AuthguardserviceService {
  userMenus: IMenu[] = [];
  searchMenu: ISearchMenu = {
    autoUserId: null
  }
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  set isLoggedIn(status: any) {
    this.loggedIn.next(status);
  }

  // Added by Anif on 20-07-2022

  edmsMenuAuthorization: any[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private persister: PersistanceService,
    private notificationService: NotificationService,
    private SpinnerService: NgxSpinnerService,
    private candidateService: CandidateService,
  ) { }



  login(user: ILoginUser) {
    if (user.userId !== '' && user.password !== '') {
      this.SpinnerService.show();
      this.userService.getUserByUserId(user).subscribe((result) => {
        if (result) {
          if (result.status == 1) {
            this.persister.set('timeslogin', "0");
            this.persister.set('loggedinuser', result.loginUser);
            this.loggedIn.next(true);
            this.getUserMenu(result.loginUser.autoUserId, result);
            this.getEDMSAuthorization(result.loginUser.autoUserId)          // Added by ANif on 20-07-2022 for EDMS Link Authoriation
            setTimeout(() => {
              this.SpinnerService.hide();
            }, 12000)

          }
          else {
            this.notificationService.showError("Invalid Username or Password !!", "Error");
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
    }
  }
  loginByCosmos(user: ILoginUser) {
    if (user.userId !== '' && user.password !== '') {
      this.SpinnerService.show();
      this.userService.getUserByUserIdByCosmos(user).subscribe((result) => {
        if (result) {
          if (result.status == 1) {
            this.persister.set('timeslogin', "0");
            this.persister.set('loggedinuser', result.loginUser);
            this.loggedIn.next(true);
            this.getUserMenu(result.loginUser.autoUserId, result);
            this.getEDMSAuthorization(result.loginUser.autoUserId)          // Added by ANif on 20-07-2022 for EDMS Link Authoriation
            setTimeout(() => {
              this.SpinnerService.hide();
            }, 12000)

          }
          else {
            this.notificationService.showError("Invalid Username or Password !!", "Error");
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
    }
  }
  forgotPassword(user: ILoginUser) {
    if (user.userId !== '') {
      this.SpinnerService.show();
      this.userService.getForgotUserByUserId(user).subscribe((result) => {
        if (result) {
          if (result.status == 1) {

            this.SpinnerService.hide();
            this.notificationService.showSuccess("A mail has been sent to register email adreess with new password !!", "Success");
          }
          else {
            this.notificationService.showError("Invalid Username !!", "Error");
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
    }
  }


  logout() {
    //added on 19-12-2023 for Azure table Call On LogInout
    var values = {
      UserName: this.persister.get('loggedinuser').userName + " ( AutoUserId- " + this.persister.get('loggedinuser').autoUserId.toString() + ")"
    }
    this.userService.AzuretableCallOnLogInout(values).subscribe((result) => {
    });

    this.persister.set('loggedinuser', null);
    this.persister.set('menudata', null);
    this.loggedIn.next(false);
    this.router.navigate(['/auth/login']);
  }

  getUserMenu(autouserid, loginResult: any) {
    this.userMenus = [];
    this.searchMenu.autoUserId = autouserid;
    this.userService.getUserMenu(this.searchMenu).subscribe((result) => {
      if (result) {
        this.userMenus = result;
        this.persister.set('menudata', result);
        //this.router.navigate(['/']);
        this.router.navigate(['/app/']);
        // Anif
        if (loginResult.loginUser.userId != "") {
          var isCandidate = loginResult.loginUser.userId.includes("C-MRF");
          if (isCandidate) {
            let obj = {
              CandidateId: loginResult.loginUser.candidateId,
              RequisitionDetailId: 0,
              CreatedBy: 0
            }
            this.candidateService.candidateCheckUpdateProfile(obj).subscribe((result1) => {
              if (result1) {
                if (result1.successFlag == 0) {
                  //this.notificationService.showError(result1.msg, "Error");
                  this.router.navigate(['/app/career/update-profile']);
                  //this.router.navigate(['/login']);
                }
                else {
                  this.router.navigate(['/app/career/current-jobs']);
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
        }
        // Till this
      }
      else {
        this.userMenus = [];
      }
    }, error => {
      console.log(error);
    }, () => {

    });
  }



  // Added By Anif on 20-07-2022 for checking EDMS Link Authorization
  getEDMSAuthorization(autoUserId) {
    let edmsAuthAutoUserId = {
      AutoUserId: autoUserId
    }
    this.userService.getEDMSLinkAuthorization(edmsAuthAutoUserId).subscribe((result) => {
      if (result) {
        this.edmsMenuAuthorization = result;
        this.persister.set('EDMSLinkAuthorization', this.edmsMenuAuthorization);
      }
      else {
        this.userMenus = [];
      }
    }, error => {
      console.log(error);
    }, () => {

    });
  }


}
