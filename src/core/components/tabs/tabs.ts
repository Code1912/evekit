/**
 * Created by Code1912 on 2016/10/24.
 */
import { Component, OnInit } from '@angular/core';
import {EveTabComponent} from "./tab";

@Component({
    selector: 'evetabs',
    template:`
<div class="nav-tabs-custom">
    <ul class="nav nav-tabs">
       <li (click)="selectTab(tab)"   *ngFor="let tab of tabs" [ngClass]="{'active': tab.active}"  >
              <a href="javascript:void(0)" data-toggle="tab" aria-expanded="false" [innerText]="tab.tabTitle"></a>
       </li> 
     </ul>
     <div class="tab-content">
         <ng-content></ng-content>
     </div>
</div>
`
})
export class EveTabsComponent implements OnInit {
    constructor() { }

    private  tabs:EveTabComponent[]=[];
    ngOnInit() { }
    addTab(tab:EveTabComponent) {
        this.tabs.push(tab);
    }
    selectTab(tab:EveTabComponent) {
        this.tabs.forEach((tab) => {
            tab.active = false;
        });
        tab.active = true
    }
}