import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../../auth/authentication.guard'
//import { DashboardComponent } from 'src/app/appl/dashboard/dashboard.component';
//import { LoginComponent } from 'src/app/commonpages/login/login.component';
//import { LoginlayoutComponent } from '../loginlayout/loginlayout.component';

// import { WindowlayoutComponent } from '../windowlayout/windowlayout.component';
// import { ViewpdfComponent } from 'src/app/application-module/shared/viewpdf/viewpdf.component';
// import { CampusregistrationComponent } from 'src/app/commonpages/campusregistration/campusregistration.component';
// import { OffCampusRegistrationComponent } from 'src/app/commonpages/off-campus-registration/off-campus-registration.component';
// import { TestAcknowledgementComponent } from 'src/app/application-module/campus/test-acknowledgement/test-acknowledgement.component';
// import { InterviewAcknowlwdgementComponent } from 'src/app/application-module/campus/interview-acknowlwdgement/interview-acknowlwdgement.component';


const routes: Routes = [
  { path: '', redirectTo: "auth", pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('../../authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'app', loadChildren: () => import('../../application/application.module').then(m => m.ApplicationModule) },
  { path: 'campusoffcampus', loadChildren: () => import('../../campus-offcampus-registration/campus-offcampus-registration.module').then(m => m.CampusOffcampusRegistrationModule) },
  // {
  //   path: '',
  //   component: WindowlayoutComponent,
  //   children: [
  //     {
  //       path: 'viewpdf',
  //       component: ViewpdfComponent
  //     },
  //     {
  //       path: 'campus-registration',
  //       component: CampusregistrationComponent
  //     },
  //     {
  //       path: 'off-campus-registration',
  //       component: OffCampusRegistrationComponent
  //     },
  //     {
  //       path: 'testacknowledgement',
  //       component: TestAcknowledgementComponent
  //     },
  //     {
  //       path: 'interviewacknowledgement',
  //       component: InterviewAcknowlwdgementComponent
  //     }
  //   ]
  //  }
];
//export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
