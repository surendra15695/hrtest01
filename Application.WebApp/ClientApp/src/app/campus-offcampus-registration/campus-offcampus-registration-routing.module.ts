import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WindowlayoutComponent } from '../layouts/windowlayout/windowlayout.component';
import { ViewpdfComponent } from 'src/app/application-module/shared/viewpdf/viewpdf.component';
import { CampusregistrationComponent } from 'src/app/commonpages/campusregistration/campusregistration.component';
import { OffCampusRegistrationComponent } from 'src/app/commonpages/off-campus-registration/off-campus-registration.component';
import { TestAcknowledgementComponent } from 'src/app/application-module/campus/test-acknowledgement/test-acknowledgement.component';
import { InterviewAcknowlwdgementComponent } from 'src/app/application-module/campus/interview-acknowlwdgement/interview-acknowlwdgement.component';



const routes: Routes = [
  {
      path: '',
      component: WindowlayoutComponent,
      children: [
        {
          path: 'viewpdf',
          component: ViewpdfComponent
        },
        {
          path: 'campus-registration',
          component: CampusregistrationComponent
        },
        {
          path: 'off-campus-registration',
          component: OffCampusRegistrationComponent
        },
        {
          path: 'testacknowledgement',
          component: TestAcknowledgementComponent
        },
        {
          path: 'interviewacknowledgement',
          component: InterviewAcknowlwdgementComponent
        }
      ]
     }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampusOffcampusRegistrationRoutingModule { }
