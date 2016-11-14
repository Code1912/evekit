/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/3 (́>◞౪◟<‵)ﾉｼ
 */
import { Component, OnInit,AfterViewInit } from '@angular/core';
import {AlertInfo, AlertType} from "./alert";
import {  RootEventService} from 'eve/services';
const classArray = ["danger", "info", "warning", "success"];
const iconArray = ["fa-ban", "fa-info", "fa-warning", "fa-check"];

@Component({
    selector: 'div[alert]',
    templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit, AfterViewInit{
    private  index:number=0;
    private selectId:number=0;
    private  alertArray:AlertInfo[]= [];

    constructor(private  rootEventService:RootEventService) {

    }
    ngOnInit() { }
    ngAfterViewInit(){
        let that=this;
        this.rootEventService.register("addAlert",(name:string,info:AlertInfo)=>{
            that.addAlert.call(that,info);
        },that)
    }
    private addAlert(info:AlertInfo){
        if(this.alertArray.length>0){
            this.alertArray.splice(0,this.alertArray.length);
        }
        this.index++;
        info.id=this.index;
        this.alertArray.push(info);
        this.autoDelete(info.id);
    }
    public getClass (type:AlertType) {
        return classArray[type];
    }
    public getIconClass (type:AlertType) {
        return iconArray[type];
    }
    private onClose(id:number){
        this.callFunc(id);
    }
    private autoDelete (id) {
        let that=this;
        setTimeout(function () {
            that.callFunc(id);
        }, 4000)
    }
    private callFunc (id) {
        for (var i = 0; i < this.alertArray.length; i++) {
            var item = this.alertArray[i];
            if (item.id === id) {
                this.selectId=item.id;
                this.alertArray.splice(i, 1);
                break;
            }
        }
    }
}