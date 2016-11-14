/**
 * Created by Code1912 on 2016/10/16.
 */
import {Component, OnInit, ElementRef} from '@angular/core';
import {AuthService} from "../../services/auth-service";
import {LoadingService, UserInfo} from "eve/services";
import {Cookie} from "eve/common";
import {Router} from "@angular/router";
import {FormGroup,FormControl,FormBuilder,Validators} from "@angular/forms"

@Component({
    selector: 'div[login]',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    userInfo:UserInfo=new UserInfo();
    rememberMe:boolean;
    constructor(private  router:Router,private element:ElementRef,private  authService:AuthService,private loadingService:LoadingService ) {
        this.element.nativeElement.className="login-box";

    }

    ngOnInit() {
        this.loadingService.hideLoading();
    }

    public login(){
        this.authService.login("abc",'abc').subscribe(p=>{
            Cookie.setCookie("eve-token",p.token);
            this.router.navigateByUrl("");
        })
    }

}