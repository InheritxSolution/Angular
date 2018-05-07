import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { ValidationService } from '../common/validation.service';
import { HttpClientService } from '../common/http-client.service';
import { CommonService } from '../common/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: FormGroup;
  isSubmitted : boolean = false;
  errorMsg : string = '';
  constructor(
    public fb: FormBuilder,
    public router: Router,
    public httpClient:HttpClientService,
    public common:CommonService,
    public validationService:ValidationService) { 
      this.user = this.fb.group({
        'email' : ['',  Validators.compose([Validators.required,this.validationService.emailValidator])],
        'password': ['', Validators.compose([Validators.required ])],
        'rememberme': [false]
      });
  }

  ngOnInit() {
    
  }
  /**
   * submit form
   */
  onSubmit() {
    if(this.user.valid){
      this.httpClient.post('users/adminlogin',this.user.value)
        .subscribe(data => {
          if(data.status){
            this.common.setlocalStorage('token',data['token']);
            this.router.navigate(['/user']);
          }
          else{
            this.errorMsg = data['message'];
          }
        },error => {
          this.errorMsg = error.message;
        });
    }
    else{
      this.isSubmitted = true;
    }
  }

}
