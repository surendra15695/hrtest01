import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PersistanceService } from '../sharedservices/persitence.service';
import { AuthguardserviceService } from './authguardservice.service';

@Injectable(
  //{
  //providedIn: 'root'
//}
)
export class AuthenticationGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  constructor(private authService: AuthguardserviceService,
    private persister: PersistanceService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        //console.log(isLoggedIn);
        //if (!isLoggedIn) {
          if(this.persister.get("loggedinuser")==null){
          this.router.navigate(['/auth/login']);
          return false;
        }
        return true;
      })
    );
  }
  
}
