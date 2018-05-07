import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { ValidationService } from '../common/validation.service';
import { HttpClientService } from '../common/http-client.service';
import { CommonService } from '../common/common.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  user: FormGroup;
  isSubmitted : boolean = false;
  errorMsg : string = '';
  successMsg : string = '';

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public httpClient:HttpClientService,
    public common:CommonService,
    public validationService:ValidationService) { 
      
  }
  
  ngOnInit() {
    this.user = this.fb.group({
      'email' : ['',  Validators.compose([Validators.required,this.validationService.emailValidator])],
    });
  }
  
  /**
   * submit form
   */
  onSubmit() {
    if(this.user.valid){
      this.httpClient.post('users/forgetpassword',this.user.value)
        .subscribe(data => {
          if(data.status){
            this.successMsg = data['msg'];
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
