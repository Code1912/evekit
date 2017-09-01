/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/3 (́>◞౪◟<‵)ﾉｼ
 */
import {
    Component, Renderer, OnInit, AfterViewInit, ElementRef, AfterContentChecked, Directive,
    ViewChild
} from '@angular/core';
import {EventService} from "../../services"

const noop= ()=>{};
@Component({
    selector: 'div[confirm]',
    templateUrl: 'confirm.component.html'
})
export class ConfirmComponent implements OnInit, AfterViewInit,AfterContentChecked {
    @ViewChild("ele")
        ele:ElementRef;
    msg:string="";
    title:string="";
    ok:Function=noop;
    cancel:Function=noop;
    close:Function=noop;
    isShow:boolean=false;
    constructor(private  rootEventService: EventService ) {

    }

    ngOnInit() {
        $(this.ele.nativeElement).modal();
    }

    ngAfterViewInit() {
        this.rootEventService.subscribe("addConfirm",  (info)=> {
            this.show(info)
        });
    }
    show(info){
        this.msg=info.msg;
        this.title=info.title;
        this.ok=info.ok||noop;
        this.cancel=info.cancel||noop;
        this.close=info.close||noop;
        this.isShow=true;
    }
    hide(){
      this.isShow=false;
    }
    ngAfterContentChecked() {
        // console.log(this.element.nativeElement.querySelectorAll(".modal"))
    }


    onOk() {
        this.hide();
        this.ok();
        this.close();
    }

    onCancel() {
        this.hide();
        this.cancel();
        this.close();
    }
    onClose(){
        this.hide();
        this.close();
    }

}
