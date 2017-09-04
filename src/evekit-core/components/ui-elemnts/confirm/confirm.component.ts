/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/3 (́>◞౪◟<‵)ﾉｼ
 */
import {
    Component, Renderer, OnInit, AfterViewInit, ElementRef, AfterContentChecked, Directive,
    ViewChild
} from '@angular/core';
import {EveEventService} from "../../../services"

@Component({
    selector: 'div[confirm]',
    templateUrl: 'confirm.component.html'
})
export class EveConfirmComponent implements OnInit, AfterViewInit,AfterContentChecked {
    @ViewChild("ele")
        ele:ElementRef;
    msg:string="";
    ok:Function=Function.prototype;
    cancel:Function=Function.prototype;
    close:Function=Function.prototype;
    isShow:boolean=false;
    constructor(private  rootEventService: EveEventService ) {

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
        this.ok=info.ok||Function.prototype;
        this.cancel=info.cancel||Function.prototype;
        this.close=info.close||Function.prototype;
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
