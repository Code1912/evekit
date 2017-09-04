/**
 * Created by Code1912 on 2016/10/16.
 */
import {Component, OnInit, ElementRef} from '@angular/core';
import {EveAuthService,EveLoadingService, UserInfo,EveCookieService} from "evekit/core";
import {Router} from "@angular/router";

@Component({
    selector: 'div[login]',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    userInfo:UserInfo=new UserInfo();
    rememberMe:boolean;
    constructor(private  router:Router,private element:ElementRef,private  authService:EveAuthService,private loadingService:EveLoadingService,private  cookie:EveCookieService) {
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