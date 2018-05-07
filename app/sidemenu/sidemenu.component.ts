import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common/common.service';
import { HttpClientService } from '../common/http-client.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  
  errorMsg : string = '';
  constructor(
    public commonService:CommonService,
    public router: Router,
    public httpClient:HttpClientService) { 
  }

  ngOnInit() {
  }

  //logout user
  logoutUser(){
    this.httpClient.post('users/logout',{})
    .subscribe(data => {
      if(data.status){
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

}
