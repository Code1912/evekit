/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/3 (́>◞౪◟<‵)ﾉｼ
 */
import {Component, OnInit, OnDestroy, AfterContentInit} from '@angular/core';
import {RootEventService} from "eve/services";
@Component({
    selector: 'loading',
    templateUrl: 'loading.component.html',
   
})
export class LoadingComponent implements OnInit,OnDestroy,AfterContentInit {
    private  isShow:boolean=false;
    private  removeFunc:Function;

    constructor(private  rootEventService:RootEventService) {
        this.isShow=true;
    }
    ngOnInit() {
        this.removeFunc=  this.rootEventService.register("loading", this.showHide,this);

    }
    showHide(name:string,isShow:boolean){
        this.isShow=isShow;
    }
    ngOnDestroy(){
        this.removeFunc();
    }
    ngAfterContentInit(){
    }

}