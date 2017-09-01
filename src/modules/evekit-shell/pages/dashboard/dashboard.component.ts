/**
 * Created by Code1912 on 2016/10/1.
 */
import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AlertService ,EveHttpService } from 'evekit/core';
import {EveWindowOptions,EveWindowComponent} from "evekit/core";

@Component({
    selector: 'div[dashboard]',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit,AfterViewInit {
    testOptions:EveWindowOptions;

    @ViewChild(EveWindowComponent)
    testWindow:EveWindowComponent;

    constructor(private  alertService:AlertService,private  http:EveHttpService,private  router:Router) {

        this.testOptions=new EveWindowOptions();
        this.testOptions.height=500;
        this.testOptions.width=600;
        this.testOptions.title="test window title";
    }

    ngOnInit() {

    }
    ngAfterViewInit(){

    }
    btnClick(type:number){
        if(type==0)
        {
            this.alertService.error("eeeeeeeeeeeee","err")
        }
        if(type==1)
        {
            this.alertService.info("<div>sdfsdfsdfsfsdfs</div>","iiiiiiii")
        }
        if(type==2)
        {
            this.alertService.warning("<div>wwwwwwwwwwwwwwww</div>","wwwwwww")
        }
        if(type==3)
        {
            this.alertService.success("<div>ssssss</div>","sssss")
        }
        if(type==4)
        {
            this.alertService.confirm( "ffff",null, ()=> {
                this.alertService.confirm( "22222222222222","666666",function () {
  alert(1)
                })
            })
        }
    }
    btnOpenWindow(){
        this.testWindow.eveWindow.open()
    }
    testHttp(hideLoading:boolean){
        this.http.get("http://www.google.hk",{ hideLoading:hideLoading}).subscribe(res=>{
            alert(res)
        });
    }
}