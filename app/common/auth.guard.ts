import { Injectable } from '@angular/core';
import { CommonService } from '../common/common.service';
import { Router,NavigationStart, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
/**
 * check login page
 */
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
        private commonService: CommonService) {
    }

    //Check if user is logged in before redirecting to any page
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let token = localStorage.getItem('token');
        if(token===undefined || token===null || token===''){
            this.router.navigate(['/']);
        }
        return true;
    }
}

/**
 * check without login page
 */
@Injectable()
export class UnauthGuard implements CanActivate {
    constructor(
        private router: Router,
        private commonService: CommonService) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let token = localStorage.getItem('token');
        if(token!==undefined && token!==null && token!==''){
            this.router.navigate(['/user']);
        }
        return true;
    }
}