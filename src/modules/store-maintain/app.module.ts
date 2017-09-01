/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/1 (́>◞౪◟<‵)ﾉｼ
 */
/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/1 (́>◞౪◟<‵)ﾉｼ
 */

import { NgModule, NgModuleFactoryLoader, Component, Directive } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule} from '@angular/router';
import { FeedbackModule} from "./feedback/app"
 
 import {RoutePathConfig,EvekitCoreModule} from  "evekit/core"


@NgModule({
    imports:[EvekitCoreModule,RouterModule.forChild([
        {
            path: 'feedback',
            loadChildren: ()=>{ return FeedbackModule}
        }
    ])]
})

@RoutePathConfig("store-maintain")
export class StoreMaintainModule {

}