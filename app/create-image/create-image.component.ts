import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../common/validation.service';
import { CommonService } from '../common/common.service';
import { fail } from 'assert';

var $;
@Component({
  selector: 'app-create-image',
  templateUrl: './create-image.component.html',
  styleUrls: ['./create-image.component.css']
})
export class CreateImageComponent implements OnInit {

  image: FormGroup;
  isSubmitted : boolean = false;
  fileformat : boolean =false;
  validURL : boolean =false;
  isStart: boolean =true;

  filesToUpload: Array<File> = [];
  videopath : string ='';
  title: string;
  typeList : Array<any> = [
    {id:1,name:'image'},
    {id:2,name:'Image Interactive screen'},
  ]
  
  constructor(
    public fb: FormBuilder,
    public httpClient:HttpClientService,
    public router:Router,
    public route:ActivatedRoute,
    public common:CommonService,
    public validationService:ValidationService,
  ) {}

  ngOnInit() {

    //Initialize input fields using Reactive form approach
    this.route.params.subscribe( params => {
      if(params.id!=undefined && params.id!=null && params.id!=''){
        this.getimage(params.id);
        this.fileformat = true;
        this.image = this.fb.group({
          'id' : [params.id],
          'title': ['', Validators.compose([Validators.required ])],
          'description': ['', Validators.compose([Validators.required ])],
          'image': [''],
        });
        this.title = "Edit"
      }
      else{
        this.image = this.fb.group({
          'title': ['', Validators.compose([Validators.required ])],
          'description': ['', Validators.compose([Validators.required ])],
          'image': [''],
        });
        this.title = "Add"
      }
    });

  }

  /**
   * To get image details and set in input fields
   * @param id get image detail
   */
  getimage(id){
    this.httpClient.get('api/image/getimagedetail/'+id)
      .subscribe(data => {
        if(data.status){
          this.image.controls['title'].setValue(data['results']['title']);
          this.image.controls['description'].setValue(data['results']['description']);
          this.videopath = data['results']['image'];
        }
        else{
          this.httpClient.showError(data['message']);
        }
      },error => {
        this.httpClient.showError(error.message);
      });
  }

  /**
   * To validate file
   * @param fileInput 
   */
  fileChangeEvent(fileInput: any) {
    if(fileInput.currentTarget.files[0].type=="image/png" || fileInput.currentTarget.files[0].type=="image/jpeg" || fileInput.currentTarget.files[0].type=="image/jpg"){
      this.fileformat = true;
      this.isStart= true;
      this.filesToUpload = <Array<File>>fileInput.target.files;
      console.log(this.filesToUpload);
    }
    else{
      this.isStart= false;
      this.fileformat = false;
    }

  }

  /**
   * submit Images and details
   */
  onSubmit(){

    this.image.controls['description'].setValue(this.image.controls['description'].value.trim())

    if(this.image.value['id']!==undefined && this.image.value['id']!==null && this.image.value['id']!==''){
        var isvalid = (this.image.valid && this.fileformat)?true:false;
    }
    else{     
        var isvalid = (this.image.valid && this.filesToUpload.length>0 && this.fileformat)?true:false;
    }
    //Append file in form 
    if(isvalid){
      var url = '';
      const formData: any = new FormData();
      const files: Array<File> = this.filesToUpload;
      if(this.filesToUpload.length>0){
        formData.append("uploads", files[0], files[0]['name']);
      }
      formData.append("title",this.image.controls['title'].value);
      formData.append("description",this.image.controls['description'].value);
      var msg = '';
      if(this.image.value['id']!==undefined && this.image.value['id']!==null && this.image.value['id']!==''){
        url = 'api/image/updateImage';
        formData.append("id",this.image.controls['id'].value);
        msg = "image update successfully.";
      }
      else{
        url = 'api/image/uploadImage';
        msg = "image add successfully.";
      }

      //Post image data
      this.httpClient.post(url,formData)
  
        .subscribe(data => {
          if(data.status){
            this.httpClient.showSuccess(msg);
            this.router.navigate(['/image']);
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
      this.fileformat = false;
      this.isStart=false;
    }
  }

}

