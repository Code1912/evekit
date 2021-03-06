/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/3 (́>◞౪◟<‵)ﾉｼ
 */
import {Component, OnInit, AfterViewInit, ViewEncapsulation} from '@angular/core';
import {AlertInfo, AlertType} from "./alert";
import {  EveEventService} from '../../../services';
const classArray = ["danger", "info", "warning", "success"];
const iconArray = ["fa-ban", "fa-info", "fa-warning", "fa-check"];

@Component({
    selector: 'div[alert]',
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'alert.component.html',
})

export class EveAlertComponent implements OnInit, AfterViewInit{
    private  index:number=0;
    private selectId:number=0;
    private  alertArray:AlertInfo[]= [];

    constructor(private  rootEventService:EveEventService) {

    }
    ngOnInit() { }
    ngAfterViewInit(){
        this.rootEventService.subscribe("addAlert",( info:AlertInfo)=>{
            this.addAlert(info);
        })
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