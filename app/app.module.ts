import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrowserXhr, XHRBackend, RequestOptions, HttpModule, JsonpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import 'rxjs/Rx';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule ,ToastContainerModule} from 'ngx-toastr';
import { InputTrimModule } from 'ng2-trim-directive';

import { AppComponent } from './app.component';
import { routing } from './common/app.routes';
import { AuthGuard } from './common/auth.guard';
import { UnauthGuard } from './common/auth.guard';
import { HttpClientService } from './common/http-client.service';
import { ValidationService } from './common/validation.service';
import { CommonService } from './common/common.service';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { UserComponent } from './user/user.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserlistComponent } from './userlist/userlist.component';
import { SettingsComponent } from './settings/settings.component';
import { ImageComponent } from './image/image.component';
import { ImageListComponent } from './image-list/image-list.component';
import { CreateImageComponent } from './create-image/create-image.component';

const routes: Routes = [
  
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SidemenuComponent,
    UserComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent,
    CreateUserComponent,
    UserlistComponent,
    ImageComponent,
    ImageListComponent,
    CreateImageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    routing,
    NgbModule.forRoot(),
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: false }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),    
    ToastContainerModule,
    InputTrimModule
  ],
  exports:[RouterModule],
  providers: [
    AuthGuard,
    UnauthGuard,
    MockBackend,
    BaseRequestOptions,
    HttpClientService,
    CommonService,
    ValidationService,
    FormBuilder,
    {provide: LocationStrategy, useClass: HashLocationStrategy}    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
