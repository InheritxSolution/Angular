import { Injectable, Inject,Component,Input,Output,EventEmitter} from '@angular/core';
import { HttpModule, Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { HttpClientService } from './http-client.service';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class CommonService {
  dateConfig: any = {
    dateFormat: 'dd/mm/yyyy',
    showClearDateBtn: false,
    editableDateField: false,
    openSelectorOnInputClick: true,
    minYear: 1950,
    showTodayBtn: false,
    disableSince: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate() + 1
    }
  };
  activemenu : string = 'user';
  expandedprofile : boolean = false;
  // Observable string sources
  private bodyClassSource = new Subject<string>();
  // Observable string streams
  bodyClass$ = this.bodyClassSource.asObservable();
  
  constructor(
    private httpclient: HttpClientService,) {

  }
  
  changeBodyClass(classname: string) {
    this.bodyClassSource.next(classname);
  }
  
  /**
   * Check if user is logged in
  */
 
  isLoginUser(){
    return (this.getlocalStorage('token')!==undefined && this.getlocalStorage('token')!==null && this.getlocalStorage('token')!=='')?true:false;
  }

  /**
   * Convert object to string
   */
  stringifyObject(data) {
    return (typeof data == "object") ? JSON.stringify(data) : data;
  }

  /**
   * Convert string to object
   */
  json(str) {
    return JSON.parse(str);
  }

  /**
   * @param key set value in local storage
   */

  setlocalStorage(key,value){
    localStorage.setItem(key,value);
  }

  /**
   * @param get value from local storage
  */
  getlocalStorage(key){
    return localStorage.getItem(key);
  }

  /**
   * @param remove value from local storage
  */
  removelocalStorage(key){
    return localStorage.removeItem(key);
  }

  /**
   * change date format
  */
  changeDateFormat(dateval){
    let date = new Date(dateval);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();
    return {
      year: year, 
      month: month, 
      day: dt
    };
  }


}
