/**
 * Created by Code1912 on 2016/10/16.
 */
import {Component, OnInit, ElementRef} from '@angular/core';
import {AuthService,LoadingService, UserInfo,CookieService} from "evekit/core";
import {Router} from "@angular/router";

@Component({
    selector: 'div[login]',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    userInfo:UserInfo=new UserInfo();
    rememberMe:boolean;
    constructor(private  router:Router,private element:ElementRef,private  authService:AuthService,private loadingService:LoadingService,private  cookie:CookieService) {
        this.element.nativeElement.className="login-box";

    }

    ngOnInit() {
        this.loadingService.hideLoading();
    }

    public login(){
        this.authService.login("abc",'abc').subscribe(p=>{
            this.cookie.setCookie("eve-token",p.token);
            this.router.navigateByUrl("");
        })
    }

}