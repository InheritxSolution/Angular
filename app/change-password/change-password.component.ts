import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';
import { ValidationService } from '../common/validation.service';
import { HttpClientService } from '../common/http-client.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user: FormGroup;
  isSubmitted : boolean = false;
  errorMsg : string = '';
  successMsg : string = '';

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private route:ActivatedRoute,
    public httpClient:HttpClientService,
    public validationService:ValidationService) {}
  
  ngOnInit() {
    //Initialize input fields usimg Reactive form approach
    this.route.params.subscribe( params => {
      this.user = this.fb.group({
        'id' : [params.id],
        'password' : ['',  Validators.compose([Validators.required])],
        'compare_password' : ['',  [Validators.required]],
      },{validator: this.validationService.compareField('password', 'compare_password')});
    });
  }

  /**
   * submit form
   */
  onSubmit() {
    if(this.user.valid){
      this.httpClient.post('users/resetpassword',this.user.value)
        .subscribe(data => {
          if(data.status){
            this.successMsg = data['message'];
            this.router.navigate(['']);
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
