/**
 * Created by Code1912 on 2016/10/20.
 */
import { NgModule } from '@angular/core';

import {EveWindowComponent, EveWindowOptions} from "eve/components";

import {ShortcutDirective, EveChart} from "eve/directives";
import {EveTabsComponent} from "./components/tabs/tabs";
import {EveTabComponent} from "./components/tabs/tab";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
@NgModule({
    imports:[CommonModule,FormsModule],
    declarations: [
        EveWindowComponent,
        ShortcutDirective,
        EveTabsComponent,
        EveTabComponent,
        EveChart
    ],
    exports:[
        EveWindowComponent,
        ShortcutDirective ,
        EveTabsComponent,
        EveTabComponent,
        EveChart
    ]
})
export class EveCoreModule {

}