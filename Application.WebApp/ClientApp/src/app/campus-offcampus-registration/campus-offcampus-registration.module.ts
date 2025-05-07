import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule, ɵs } from '@ng-select/ng-select';
import { NgSelectConfig } from '@ng-select/ng-select';
import { CKEditorModule } from 'ng2-ckeditor';
import { AuthguardserviceService } from '../auth/authguardservice.service';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { Title } from '@angular/platform-browser';
import { PersistanceService } from '../sharedservices/persitence.service';
import { ShareddataService } from '../sharedservices/shareddata.service';

import { CampusOffcampusRegistrationRoutingModule } from './campus-offcampus-registration-routing.module';
import { WindowlayoutComponent } from '../layouts/windowlayout/windowlayout.component';
import { ViewpdfComponent } from 'src/app/application-module/shared/viewpdf/viewpdf.component';
import { CampusregistrationComponent } from 'src/app/commonpages/campusregistration/campusregistration.component';
import { OffCampusRegistrationComponent } from 'src/app/commonpages/off-campus-registration/off-campus-registration.component';
import { TestAcknowledgementComponent } from 'src/app/application-module/campus/test-acknowledgement/test-acknowledgement.component';
import { InterviewAcknowlwdgementComponent } from 'src/app/application-module/campus/interview-acknowlwdgement/interview-acknowlwdgement.component';


@NgModule({
  declarations: [
    WindowlayoutComponent,
    ViewpdfComponent,
    CampusregistrationComponent,
    OffCampusRegistrationComponent,
    TestAcknowledgementComponent,
    InterviewAcknowlwdgementComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    NgSelectModule,
    CampusOffcampusRegistrationRoutingModule
  ],
  providers: [
   // AuthenticationGuard,
    NgSelectConfig,
    ɵs,
    AuthguardserviceService,
    ShareddataService,
    PersistanceService,
    Title
  ],
})
export class CampusOffcampusRegistrationModule { }
