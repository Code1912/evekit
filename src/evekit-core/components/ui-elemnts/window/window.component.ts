/**
 * Created by Code1912 on 2016/10/13.
 */
import {
    Component, OnInit, ElementRef, Input, AfterViewInit, Output, OnChanges, SimpleChanges,
    AfterContentInit
} from '@angular/core';
import {EveWindow,EveWindowOptions} from "./eve.window"
@Component({
    selector: 'div[eveWindow]',
    templateUrl: 'window.component.html',
    inputs:["eveWindowOptions"],
    styleUrls:["style.css"]

})
export class EveWindowComponent implements OnInit ,AfterContentInit,OnChanges{
    eveWindowOptions:EveWindowOptions;
    eveWindow:EveWindow;

    constructor(private  element: ElementRef) {
   // class="modal fade default"
       // role="dialog" data-backdrop="false"
        element.nativeElement.className="modal fade  ";
        element.nativeElement.setAttribute("role","dialog");
        element.nativeElement.setAttribute("data-backdrop",false);
    }

    ngOnInit() {
        if(!this.eveWindowOptions){
            throw new Error("eveWindowOptions is require")
        }
        this.eveWindow=new EveWindow(this.element.nativeElement, this.eveWindowOptions);
    }

    ngAfterContentInit(){

    }

    ngOnChanges(changes: SimpleChanges) {
        //console.log(changes );
    }
}
