import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { CommonService } from '../common/common.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  errorMsg : string = '';
  imageList : Array<any> = [];
  paginationData : Object;

  constructor(
    public common:CommonService,
    public httpClient:HttpClientService) {}

  ngOnInit() {
    //Set initial pagination
    this.paginationData = {
      startPage : 0,
      totalItems : 0,
      pageLimit : this.httpClient.pageLimit
    }
    this.getImageList();  
  }

  /**
   * get images List
   */
  getImageList(){
    var reqdata = {
      startPage : this.paginationData['startPage'],
      pageLimit : this.paginationData['pageLimit'],
    };
    this.httpClient.post('api/image/getImagetAll',reqdata)
      .subscribe(data => {
        if(data.status){
          this.paginationData['totalItems'] = data['total']['total'];
          this.imageList = data['data'];
        }
        else{
          this.imageList = [];
          this.errorMsg = data['message'];
        }
      },error => {
        this.errorMsg = error.message;
      });
  }

  /**
   * Delete image by Id
   */
  deleteImage(id){
    if (confirm('Are you sure you want to delete this record?')) { 
      this.httpClient.delete('api/image/deleteImage/'+id)
      .subscribe(data => {
        if(data.status){
          this.paginationData['startPage'] = this.paginationData['startPage']-1;
          this.httpClient.showSuccess(data['message']);
          this.getImageList();
        }
        else{
          this.httpClient.showError(data['message']);
        }
      },error => {
        this.httpClient.showError(error.message);
      });
    }
  }
  
  /**
   * @param event page change
   */
  pageChanged(event){
    let pageNo = (event<=1)?(event-1):((event-1)*this.paginationData['pageLimit']);
    this.paginationData['startPage'] = pageNo;
    this.getImageList();
  }

}
