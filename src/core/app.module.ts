import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {NoopAnimationsModule, BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ALL_COMPONENTS} from "./components/index";
import {ALL_SERVICES} from "./services/index";
import {ALL_DIRECTIVES} from "./directives";

@NgModule({
    providers: [...ALL_SERVICES],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        BrowserModule,
        RouterModule,
        NoopAnimationsModule,
        BrowserAnimationsModule],
    declarations: [
        ...ALL_DIRECTIVES,
        ...ALL_COMPONENTS,
    ],
    exports: [
        ...ALL_DIRECTIVES,
        ...ALL_COMPONENTS
    ]

})
export class EvekitCoreModule {

}