import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginlayoutComponent } from '../layouts/loginlayout/loginlayout.component';
import { CreateaccountComponent } from '../../app/commonpages/createaccount/createaccount.component';
import { LoginComponent } from '../../app/commonpages/login/login.component';


const routes: Routes = [
  {
    path: '',
    component: LoginlayoutComponent,
    children: [
      {path:'',redirectTo:'login',pathMatch:'full'},
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'createaccount',
        component: CreateaccountComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
