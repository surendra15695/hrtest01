import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeviewModule } from 'ngx-treeview';
//import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ɵs } from '@ng-select/ng-select';
//import { NgMonthPickerModule } from 'ng-month-picker';
// import { TwoDigitDecimaNumberDirective } from '../../directives/numericdecimal';
// import { NumberOnlyDirective } from '../../directives/positivenumber';
// import { NumberDirective } from '../../directives/numberonly';
// import { TwoDigitDecimaNumberNegativeDirective } from '../../directives/twodecimalnumericnumbers';
// import { TwoDigitDecimaNumberLessThanHundredDirective } from '../../directives/rangewithinghundred';
//import { BrowserModule, Title } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthenticationGuard } from '../../auth/authentication.guard';
import { AuthguardserviceService } from '../../auth/authguardservice.service';
import { ShareddataService } from '../../sharedservices/shareddata.service';
import { PersistanceService } from '../../sharedservices/persitence.service';
//import { NavMenuComponent } from '../../nav-menu/nav-menu.component'

// import { CampusregistrationComponent } from 'src/app/commonpages/campusregistration/campusregistration.component';
// import { OffCampusRegistrationComponent } from 'src/app/commonpages/off-campus-registration/off-campus-registration.component';
// import { TestAcknowledgementComponent } from 'src/app/application-module/campus/test-acknowledgement/test-acknowledgement.component';
// import { InterviewAcknowlwdgementComponent } from 'src/app/application-module/campus/interview-acknowlwdgement/interview-acknowlwdgement.component';
@NgModule({
  declarations: [
    // TwoDigitDecimaNumberLessThanHundredDirective,
    // TwoDigitDecimaNumberDirective,
    // TwoDigitDecimaNumberNegativeDirective,
    // NumberOnlyDirective,
    // NumberDirective,
   // NavMenuComponent,

    // CampusregistrationComponent,
    // OffCampusRegistrationComponent,
    // TestAcknowledgementComponent,
    // InterviewAcknowlwdgementComponent,    
  ],
  imports: [
    TreeviewModule.forRoot(),
    CommonModule,
    //PdfViewerModule,
    RouterModule,
    CKEditorModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    //BrowserAnimationsModule,
    NgxSpinnerModule,
    //BrowserModule,
    //NgMonthPickerModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthenticationGuard,
    NgSelectConfig,
    ɵs,
    AuthguardserviceService,
    ShareddataService,
    PersistanceService,
   // Title
  ],
})
export class MasterLayoutModule { }
