import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../common/validation.service';
import { CommonService } from '../common/common.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { debug } from 'util';

@Component({  
  selector: 'app-create-user',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {
  user: FormGroup;
  isSubmitted : boolean = false;
  dobvalidate : boolean = false;
  maxDate;
  title: string = '';
  constructor(
    public fb: FormBuilder,
    public httpClient:HttpClientService,
    private router:Router,
    private route:ActivatedRoute,
    public common:CommonService,
    public validationService:ValidationService,
  ) {}
  
  ngOnInit() {
    //Get data if Id is present
    this.route.params.subscribe( params => {
      if(params.id!=undefined && params.id!=null && params.id!=''){
        this.getuserProfile(params.id);
        this.user = this.fb.group({
          'id' : [params.id],
          'email' : ['',  Validators.compose([Validators.required,this.validationService.emailValidator])],
          'dob': ['', Validators.compose([Validators.required ])],
        });
        this.title="Edit";
      }
      else{
        this.user = this.fb.group({
          'email' : ['',  Validators.compose([Validators.required,this.validationService.emailValidator])],
          'password': ['', Validators.compose([Validators.required ])],
          'dob': ['', Validators.compose([Validators.required ])],
        });
        this.title="Add"
      }
    });
    var currentdate = new Date();
    this.user.controls['dob'].valueChanges.subscribe((data) =>{
      this.dobvalidate = true;
      if(data.year>currentdate.getFullYear()-17){
        this.dobvalidate = false;
      }
      else if(data.year==currentdate.getFullYear()){
        if(data.month>currentdate.getMonth()+1){
          this.dobvalidate = false;
        }
        else if(data.month==currentdate.getMonth()+1){
          if(data.day>currentdate.getDate()){
            this.dobvalidate = false;
          }
        }
      }
    });
  }

  handleClick(event){
    var clickedComponent = event.target;
    if(event.target.id!=='dob' && event.target.className!="custom-select d-inline-block" && document.getElementsByClassName('d-inline-block')[0]!==undefined){
      let dobele: HTMLElement = document.getElementById('dob');
      // dobele.click();
    }
  }
  
  /**
   * get User Profile
   */
  getuserProfile(id){
    this.httpClient.get('api/adminuser/getuserprofile/'+id)
      .subscribe(data => {
        if(data.status){
          this.user.controls['email'].setValue(data['results']['email']);
          let dateobj = this.common.changeDateFormat(data['results']['dob']);
          if(data['results']['dob']!==undefined && data['results']['dob']!==null && data['results']['dob']!==''){
            this.user.controls['dob'].setValue(dateobj);
          }
        }
        else{
          this.httpClient.showError(data['message']);
        }
      },error => {
        this.httpClient.showError(error.message);
      });
  }

  /**
   * submit user data
   */
  onSubmit(){
    if(this.user.valid && this.dobvalidate){
      var data = this.user.value;
      data['dob'] = this.user.value['dob']['year']+'-'+this.user.value['dob']['month']+'-'+this.user.value['dob']['day'];
      var url = '';
      if(this.user.value['id']!==undefined 
      && this.user.value['id']!==null 
      && this.user.value['id']!==''){
        url = 'api/adminuser/updateuser';
      }
      else{
        url = 'api/adminuser/createuser';
      }
      this.httpClient.post(url,data)
        .subscribe(data => {
          if(data.status){
            this.httpClient.showSuccess(data['message']);
            this.router.navigate(['/user']);
          }
          else{
            this.httpClient.showError(data['message']);
          }
        },error => {
          this.httpClient.showError(error.message);
        });
    }
    else{
      this.isSubmitted = true;
    }
  }
}