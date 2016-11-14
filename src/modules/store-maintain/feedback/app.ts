/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/1 (́>◞౪◟<‵)ﾉｼ
 */
import { NgModule,NgModuleFactoryLoader } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule} from '@angular/router';
import { QueryComponent} from "./query.component"
@NgModule({
    imports:[RouterModule.forChild([
        {
            path: 'query',
            component: QueryComponent
        }
    ])],
    declarations: [
        QueryComponent,
    ],
    bootstrap: [QueryComponent]
})
export class FeedbackModule {

}