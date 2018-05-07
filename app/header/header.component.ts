import { Component, OnInit,ElementRef } from '@angular/core';
import { CommonService } from '../common/common.service';
import { HttpClientService } from '../common/http-client.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  profileClass : string = 'dropdown user user-inx-menu';
  errorMsg : string ='';
  constructor(
    public commonService:CommonService,
    private elementRef : ElementRef,
    public router: Router,
    public httpClient:HttpClientService
  ) { }

  ngOnInit() {
    
  }

  //set classes according to theme
  changeBodyClass() {
    let classname = (this.elementRef.nativeElement.parentElement.className=="skin-blue sidebar-inx-mini")?"skin-blue sidebar-inx-mini sidebar-collapse":"skin-blue sidebar-inx-mini";
    this.commonService.changeBodyClass(classname);
  }

  //set classes according to theme
  changeProfileClass(){
    this.profileClass = (this.profileClass=="dropdown user user-inx-menu")?"dropdown user user-inx-menu open":"dropdown user user-inx-menu";
    this.commonService.expandedprofile = !this.commonService.expandedprofile;
  }

  //Logout user
  logoutUser(){
    this.httpClient.post('users/logout',{})
    .subscribe(data => {
      if(data.status){
        this.commonService.expandedprofile = false;
        this.commonService.removelocalStorage('token');
        this.router.navigate(['']);
      }
      else{
        this.errorMsg = data['message'];
      }
    },error => {
      this.errorMsg = error.message;
    });
  }

  ngOnDestroy() {
    this.commonService.expandedprofile = false;
  }

  changeClass(){
    this.commonService.expandedprofile = false;
  }

}
