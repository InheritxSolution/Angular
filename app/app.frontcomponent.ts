import { Component,ViewChild ,HostListener} from '@angular/core';
import { CommonService } from './common/common.service';
import { HttpClientService } from './common/http-client.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';
import { Title } from '@angular/platform-browser';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { debug } from 'util';


@Component({
  selector: 'app-root',
  templateUrl: './app.frontcomponent.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Zonked';
  stateUrl : any;
  subscription: Subscription;
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  

  constructor(
    public httpclient: HttpClientService,
    public commonService: CommonService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public titleService: Title,
    private toastrService: ToastrService
  ) {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe(event =>{
        this.commonService.expandedprofile = false;
        this.titleService.setTitle(event.title);
        this.commonService.activemenu = (event.title!='' && event.title!=undefined)?event.title.toLowerCase():event.title;
    });
  }

}
