/**
 * Created by Code1912 on 2016/10/19.
 */

import { NgModule, NgModuleFactoryLoader, Component, Directive } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule} from '@angular/router';
import { QueryComponent} from "./query.compopent"

import {RoutePathConfig} from  "eve/common"
import {WeatherService} from "./weather-service";
import {CommonModule} from "@angular/common";

import {EveWindowComponent} from "eve/components";
import {EveCoreModule} from "eve/module";
import {EditComponent} from "./edit.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    providers:[WeatherService],
    declarations: [
        QueryComponent,EditComponent
    ],
    imports:[ EveCoreModule, CommonModule, FormsModule,  RouterModule.forChild([
        {
            path: 'query',
            component:QueryComponent
        }
    ])]
})

@RoutePathConfig("weather")
export class WeatherModule {

}