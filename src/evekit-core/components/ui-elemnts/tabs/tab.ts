/**
 * Created by Code1912 on 2016/10/24.
 */
import {Component, OnInit, ElementRef, Input} from '@angular/core';
import {EveTabsComponent} from "./tabs";

@Component({
    selector: 'evetab',
    template:`
            <div [hidden]="!active"  class="tab-pane">
               <ng-content></ng-content>
            </div>
            `
})
export class EveTabComponent implements OnInit {
    @Input()
    tabTitle:string;
    @Input()
    active:boolean;
    constructor(private  tabs:EveTabsComponent) {
         this.tabs.addTab(this);
    }

    ngOnInit() { }

}