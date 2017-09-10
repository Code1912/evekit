/**
 * Created by Code1912 on 2016/10/24.
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {EveTabComponent} from "./tab";

@Component({
    selector: 'eve-tabs',
    template: `
        <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
                <li (click)="selectTab(tab)" *ngFor="let tab of tabs" [ngClass]="{'active': tab.active}">
                    <a href="javascript:void(0)" data-toggle="tab" aria-expanded="false"  >
                        <span [innerText]="tab.header"></span>
                           <i *ngIf="tab.icon" class="fa fa-{{tab.icon}}"></i>
                    </a>
                </li>
            </ul>
            <div class="tab-content">
                <ng-content></ng-content>
            </div>
        </div>
    `
})
export class EveTabsComponent implements OnInit, OnDestroy {
    constructor() {
    }

    private tabs: EveTabComponent[] = [];

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    addTab(tab: EveTabComponent) {
        this.tabs.push(tab);
    }

    removeTab(tab: EveTabComponent) {
        this.tabs.removeItem(tab)
    }

    selectTab(tab: EveTabComponent) {
        this.tabs.forEach((tab) => {
            tab.active = false;
        });
        tab.active = true
    }
}