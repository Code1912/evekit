/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/3 (́>◞౪◟<‵)ﾉｼ
 */
import {Component, OnInit, OnDestroy, AfterContentInit} from '@angular/core';
import {EveEventService} from "../../../services";
import {Subject} from "rxjs";
@Component({
    selector: 'loading',
    templateUrl: 'loading.component.html',
    styleUrls:["loading.component.css"]
   
})
export class LoadingComponent implements OnInit,OnDestroy,AfterContentInit {
    public  isShow:boolean=false;
    private  removeFunc:Subject<any>;

    constructor(private  rootEventService:EveEventService) {

    }
    ngOnInit() {
        this.removeFunc=  this.rootEventService.subscribe("loading",  (val)=>{
            this.showHide(val);
        });

    }
    showHide(isShow:boolean){
        this.isShow=isShow;
    }
    ngOnDestroy(){
        this.removeFunc.unsubscribe();
    }
    ngAfterContentInit(){
    }

}