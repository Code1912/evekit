/**
 * Created by Code1912 on 2016/10/1.
 */
import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {EveAlertService ,EveHttpService,EveMessengerService } from 'evekit/core';

@Component({
    selector: 'div[dashboard]',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit,AfterViewInit {
  //  dateTime = "2017-12-11 12:36";
    time="12:36";
    date="2017-5-5"
    widgetCollapse=false
    dateTime="2017-12-11 12:36"
    eveCb=true;
    private shown: boolean;

    constructor(private  alertService:EveAlertService,private  http:EveHttpService,private  router:Router,private  messenger:EveMessengerService) {

    }
    msg(){
        this.messenger.confirm("<div>sdfsdfsdf</div>",()=>{
            this.messenger.warning("ok");
        },()=>{
            console.log("cancel")
        },()=>{
            console.log("dsfsdf")
        })

    }
    change(eve){
       console.log("srouce:",this.eveCb,"       new:",eve);

    }
    ngOnInit() {

    }
    ngAfterViewInit(){

    }
    btnClick(type:number) {
        if (type == 0) {
            this.alertService.error("eeeeeeeeeeeee", "err")
        }
        if (type == 1) {
            this.alertService.info("<div>sdfsdfsdfsfsdfs</div>", "iiiiiiii")
        }
        if (type == 2) {
            this.alertService.warning("<div>wwwwwwwwwwwwwwww</div>", "wwwwwww")
        }
        if (type == 3) {
            this.alertService.success("<div>ssssss</div>", "sssss")
        }
        if (type == 4) {
            this.alertService.confirm("ffff", () => {
                this.alertService.confirm("22222222222222", function () {
                    alert(1)
                })
            })
        }
    }
    btnOpenWindow(){
        this.shown=true;
    }
    testHttp(hideLoading:boolean){
        this.http.get("http://www.google.hk",{ hideLoading:hideLoading}).subscribe(res=>{
            alert(res)
        });
    }
}