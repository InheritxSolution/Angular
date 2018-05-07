import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { CommonService } from '../common/common.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  userList: Array<any> = [];
  searchkey: string = '';
  paginationData: Object;

  constructor(
    private modalService: NgbModal,
    public httpClient: HttpClientService,
    public commonService: CommonService,
  ) {
    //Set initial pagination
    this.paginationData = {
      startPage: 0,
      totalItems: 0,
      pageLimit: httpClient.pageLimit
    }
  }

  ngOnInit() {
    this.getUserList();
  }

  /**
   * get user list with pagination
   */
  getUserList() {
    //set pagination
    let requestData = {
      startPage: this.paginationData['startPage'],
      pageLimit: this.paginationData['pageLimit'],
      search: this.searchkey
    };

    this.httpClient.post('api/adminuser/getnormaluser', requestData)
      .subscribe(data => {
        if (data.status) {
          this.userList = data['data'];
          this.paginationData['totalItems'] = data['total']['total'];
        }
        else {
          this.httpClient.showError(data['message']);
          this.userList = [];
        }
      }, error => {
        this.httpClient.showError(error.message);
      });
  }

  /**
  * Delete user by Id
  */
  deleteUser(id) {

    //Open confirmation modal and if user ok is pressed  delete user
    if (confirm('Are you sure you want to delete this record?')) {
      this.httpClient.delete('api/adminuser/deletenormaluser/' + id)
        .subscribe(data => {
          if (data.status) {
            this.paginationData['startPage'] = this.paginationData['startPage'] - 1;
            this.httpClient.showSuccess(data['message']);
            this.getUserList();
          }
          else {
            this.httpClient.showError(data['message']);
          }
        }, error => {
          this.httpClient.showError(error.message);
        });
    }
  }

  /**
  * To search user
  */
  searchUser() {
    this.httpClient.post('api/adminuser/searchuser', { search: this.searchkey })
      .subscribe(data => {
        if (data.status) {
          this.userList = data['data'];
          this.paginationData['totalItems'] = data['total']['total'];
        }
        else {
          this.userList = [];
          this.httpClient.showError(data['message']);
        }
      }, error => {
        this.httpClient.showError(error.message);
      });
  }

  /**
   * @param event page change
   */
  pageChanged(event) {
    let pageNo = (event <= 1) ? (event - 1) : ((event - 1) * this.paginationData['pageLimit']);
    this.paginationData['startPage'] = pageNo;
    this.getUserList();
  }
}
