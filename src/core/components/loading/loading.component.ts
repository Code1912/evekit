/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/3 (́>◞౪◟<‵)ﾉｼ
 */
import {Component, OnInit, OnDestroy, AfterContentInit} from '@angular/core';
import {EventService} from "../../services";
@Component({
    selector: 'loading',
    templateUrl: 'loading.component.html',
   
})
export class LoadingComponent implements OnInit,OnDestroy,AfterContentInit {
    private  isShow:boolean=false;
    private  removeFunc:Function;

    constructor(private  rootEventService:EventService) {
        this.isShow=true;
    }
    ngOnInit() {
        this.removeFunc=  this.rootEventService.register("loading",  (val)=>{
            this.showHide(val);
        });

    }
    showHide(isShow:boolean){
        this.isShow=isShow;
    }
    ngOnDestroy(){
        this.removeFunc();
    }
    ngAfterContentInit(){
    }

}