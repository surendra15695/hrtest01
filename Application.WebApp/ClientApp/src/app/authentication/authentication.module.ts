import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersistanceService } from '../sharedservices/persitence.service';
import { AuthguardserviceService } from '../auth/authguardservice.service';
import { NgSelectConfig, ɵs } from '@ng-select/ng-select';

import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginlayoutComponent } from '../layouts/loginlayout/loginlayout.component';
import { CreateaccountComponent } from '../../app/commonpages/createaccount/createaccount.component';
import { LoginComponent } from '../../app/commonpages/login/login.component';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    LoginlayoutComponent,
    CreateaccountComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    AuthenticationRoutingModule
  ],
  providers: [
    AuthenticationGuard,
    NgSelectConfig,
    ɵs,
    AuthguardserviceService,
    PersistanceService,
    //Title
  ],
})
export class AuthenticationModule { }
