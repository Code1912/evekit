/**
 * Created by Code1912 on 2016/10/24.
 */
import {Component, OnInit, ElementRef, Input, OnDestroy} from '@angular/core';
import {EveTabsComponent} from "./tabs";

@Component({
    selector: 'eve-tab',
    template:`
            <div [hidden]="!active"  class="tab-pane">
               <ng-content></ng-content>
            </div>
            `
})
export class EveTabComponent implements OnInit,OnDestroy {

    @Input()
    icon:string;

    @Input()
    header:string;
    @Input()
    active:boolean;
    constructor(private  tabs:EveTabsComponent) {
         this.tabs.addTab(this);
    }

    ngOnInit() { }
    ngOnDestroy(): void {
        this.tabs.removeTab(this);
    }
}