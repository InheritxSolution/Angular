import { Injectable } from '@angular/core';
import { HttpModule, URLSearchParams, ConnectionBackend, RequestOptionsArgs, Headers, RequestOptions, Http, Request, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { ToastrService } from 'ngx-toastr';

@Injectable()

export class HttpClientService {
  //  apiUrl: string = 'http://localhost:4300/';
  //  domainUrl: string = 'http://localhost:4200/';
  apiUrl: string = 'http://jointed.tv:4300/';
  domainUrl: string = 'http://52.43.107.38:4200/';
  
  pageLimit : number = 10;
  successMsg : string = '';
  errorMsg : string = '';
  headers: Object = this.publicheader();
  loader: Array<any> = [];
  errormessage: string;
  constructor(
    public toastr: ToastrService,
    public http: Http,
    public router: Router,
  ) {

  }

  //Display error toastr
  showSuccess(msg) {
    this.toastr.success(msg);
  }

  //Display success toastr
  showError(msg) {
    this.toastr.error(msg);
  }

  /**
    *  Request
    */
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    this.loader.push(true);
    return this.http.request(
      this.apiUrl + url,
      this.publicheader()
    )
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => { this.finalResponse(); });
  }
  
  /**
   * Get Request
   */
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.loader.push(true);
    return this.http.get(
      this.apiUrl + url,
      this.publicheader()
    )
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => { this.finalResponse(); });
    ;
  }

  /**
   * Post Request
   */
  post(url: string, data, options?: RequestOptionsArgs, withCredentials?): Observable<Response> {
    this.loader.push(true);
    return this.http.post(
      this.apiUrl + url,
      data,
      this.publicheader(withCredentials)
    )
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => { this.finalResponse(); });
  }

  /**
   * put Request
   */
  put(url: string, data, options?: RequestOptionsArgs, withCredentials?): Observable<Response> {
    this.loader.push(true);
    return this.http.put(
      this.apiUrl + url,
      data,
      this.publicheader(withCredentials)
    )
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => { this.finalResponse(); });
  }

  /**
   * delete Request
   */
  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.loader.push(true);
    return this.http.delete(
      this.apiUrl + url,
      this.publicheader()
    )
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => { this.finalResponse(); });
  }

  /**
     * Success Handler
     */
  private extractData(res: Response) {
    let body = (res['_body'] !== '' && res['_body'] !== undefined && res['_body'] !== null) ? res.json() : {};
    return body || {};
  }

  /**
   * Error Handler
   */
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.message || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      this.errormessage = errMsg;
    } else {
      errMsg = error.message ? error.message : error.toString();
      this.errormessage = errMsg;
    }
    return Observable.throw(errMsg);
  }

  /**
   * Final Response
   */
  finalResponse() {
    this.loader.pop();
  }

  /**
   * Set Logout user Http Header
   */
  publicheader(withCredentials = true) {
    let headers = new Headers();
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    if(localStorage.getItem('token')!==null && localStorage.getItem('token')!==undefined && localStorage.getItem('token')!==''){
      headers.append('x-access-token', localStorage.getItem('token') );
    }
    return new RequestOptions({ headers: headers });
  }

}