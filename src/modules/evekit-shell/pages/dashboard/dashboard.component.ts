/**
 * Created by Code1912 on 2016/10/1.
 */
import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {EveAlertService ,EveHttpService,EveMessengerService } from 'evekit/core';
import {Subject} from "rxjs";
import {delay} from "rxjs/operators";

@Component({
    selector: 'div[dashboard]',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit,AfterViewInit {
  //  dateTime = "2017-12-11 12:36";
    time="12:36";
    radioValue;
    date="2017-5-5"
    widgetCollapse=false
    dateTime="2017-12-11 12:36"
    eveCb=true;
    private shown: boolean;


    dataList=[
        {id:1,name:"abc",age:12},
        {id:2,name:"222",age:22},
        {id:3,name:"3333",age:33},
        {id:4,name:"4444",age:444}
    ]
    constructor(private  alertService:EveAlertService,private  http:EveHttpService,private  router:Router,private  messenger:EveMessengerService) {

    }
    onPageChange($event:any){
        console.log($event);
      let sb=new Subject();
      sb.pipe(delay(1000));
      sb.subscribe(()=>{
          let array=[];
         for (let i=$event.pageIndex;i<$event.pageIndex+10;i++){
             array.push( {id:i,name:"name"+i,age:i})
         }
         this.dataList=array;
      });
      sb.next();
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