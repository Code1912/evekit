/**
 * Created by Code1912 on 2016/10/16.
 */
import { Injectable  } from '@angular/core';

import {Router,ActivatedRouteSnapshot, RouterStateSnapshot,CanActivate} from '@angular/router';
import {Http} from "@angular/http";
import {  Observable} from "rxjs";
import {EveCookieService} from "./eve-cookie.service";
@Injectable()
export  class  EveAuthService implements CanActivate {
    private apiAddress = "http://127.0.0.1:7777";
    private _userInfo: UserInfo;
    public get userInfo(){
        return this._userInfo;
    }
    constructor(private  router: Router, private  http: Http,private  cookie:EveCookieService) {
    }

    isLogin(): boolean {
        var token = this.cookie.getCookie("eve-token");
        if (token)
            return true;
        this.router.navigateByUrl("login");
        return false;
    }

    login(name: string, pwd: string) {
        return this.http.post(`${this.apiAddress}/login`, {
            name: name,
            pwd: pwd
        }).map(res => res.json());
    }

    private  getUser() {
        return this.http.get(`${this.apiAddress}/user`).map(res => res.json());
    }

    logOut() {
        this.cookie.clearCookie("eve-token");
        this.router.navigateByUrl("login")
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
        var that = this;
        var ret = that.isLogin();
        if (!ret) {
            return false;
        }
        var observable = that.getUser();
        return observable.map(p=> {
            that._userInfo = <UserInfo>p.result;
            return p.success;
        })
    }
}

export  class  UserInfo{
    userName:string;
    img:string;
    pwd:string
}