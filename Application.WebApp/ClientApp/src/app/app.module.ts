import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
//import {MasterLayoutModule} from './layouts/masterlayout/masterlayout.module';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './layouts/masterlayout/routing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
//import { AuthenticationGuard } from './auth/authentication.guard';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    NoopAnimationsModule
    // MasterLayoutModule,
  ],
  providers: [
   // AuthenticationGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
