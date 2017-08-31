/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/3 (́>◞౪◟<‵)ﾉｼ
 */
import { Component,Renderer, OnInit,AfterViewInit,ElementRef,AfterContentChecked,Directive } from '@angular/core';
import {ConfirmInfo} from "../../components";
import {EventService} from "../../services"


@Component({
    selector: 'div[confirm]',
    templateUrl: 'confirm.component.html'
})

export class ConfirmComponent implements OnInit, AfterViewInit,AfterContentChecked{
    private  index:number=0;
    private selectId:number=0;
    private  confirmArray:ConfirmInfo[]= [];

    constructor(private  rootEventService:EventService ) {

    }
    ngOnInit() { }
    ngAfterViewInit(){

        this.rootEventService.register("addConfirm",function (info:ConfirmInfo) {
            this.addConfirm( info);
        });

    }
    ngAfterContentChecked(){
       // console.log(this.element.nativeElement.querySelectorAll(".modal"))
    }
    private addConfirm(info:ConfirmInfo){
        this.index++;
        info.id=this.index;
        this.confirmArray.push(info);
    }
    private delConfirm (id) {
        for (var i = 0; i < this.confirmArray.length; i++) {
            var item = this.confirmArray[i];
            if (item.id === id) {
                this.selectId=item.id;
                this.confirmArray.splice(i, 1);
                break;
            }
        }
    }

      onOk(info:ConfirmInfo){
        this.delConfirm(info.id);
        if(!info.ok){
            return;
        }
        if(info.source){
            info.ok.apply(info.source)
        }
        else {
            info.ok();
        }
    }
     onCancel(info:ConfirmInfo){
        this.delConfirm(info.id);
        if(!info.cancel){
            return;
        }
        if(info.source){
            info.cancel.apply(info.source)
        }
        else {
            info.cancel();
        }
    }
}

@Directive({ selector: '[confirmShow]' })
export class ConfirmShowDirective {
    constructor(el: ElementRef, renderer: Renderer) {
        $(el.nativeElement).modal("show");
    }
}