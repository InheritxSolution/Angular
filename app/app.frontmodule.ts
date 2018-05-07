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

import { HttpClientService } from './common/http-client.service';
import { ValidationService } from './common/validation.service';
import { CommonService } from './common/common.service';

import { AppComponent } from './app.component';
import { routing } from './common/app.frontroutes';
import { FrontHeaderComponent } from './front-header/front-header.component';
import { FrontFooterComponent } from './front-footer/front-footer.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  
];

@NgModule({
  declarations: [
    AppComponent,
    FrontHeaderComponent,
    FrontFooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    routing,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: false }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),    
    ToastContainerModule
  ],
  exports:[RouterModule],
  providers: [
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
