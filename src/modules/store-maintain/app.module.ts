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
 
 import { EvekitCoreModule} from  "evekit/core"

import "./feedback/style.css";
@NgModule({
    imports:[EvekitCoreModule,RouterModule.forChild([
        {
            path: 'feedback',
            loadChildren: ()=>{ return FeedbackModule}
        }
    ])]
})
export class AppModule {

}