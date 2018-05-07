import { Component,ViewChild ,HostListener} from '@angular/core';
import { CommonService } from './common/common.service';
import { HttpClientService } from './common/http-client.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';
import { Title } from '@angular/platform-browser';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  host: {'window:beforeunload':'doSomething'},
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Zonked';
  stateUrl : any;
  subscription: Subscription;
  bodyClass : string = 'skin-blue sidebar-inx-mini';
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  
  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event) {
    alert('dd')
  }

  @HostListener('window:beforeunload', ['$event'])
  doSomething($event) {
    alert('dd')
  }

  constructor(
    public httpclient: HttpClientService,
    public commonService: CommonService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public titleService: Title,
    private toastrService: ToastrService
  ) {
    this.subscription = commonService.bodyClass$.subscribe(
        classname => {
            this.bodyClass = classname;
    });

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

  onClick() {
    this.toastrService.success('in div');
  }

  changeProfileClass(){
    this.commonService.expandedprofile = false;
  }
  
}
