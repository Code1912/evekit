import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {NoopAnimationsModule, BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ALL_COMPONENTS} from "./components/index";
import {ALL_SERVICES} from "./services/index";
import {ALL_DIRECTIVES} from "./directives";
import "./app.module.css"
import {ALL_PIPES} from "./pipes";
@NgModule({
    providers: [...ALL_SERVICES],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule,
        JsonpModule,
        ReactiveFormsModule],
    declarations: [
        ...ALL_DIRECTIVES,
        ...ALL_COMPONENTS,
        ...ALL_PIPES
    ],
    exports: [
        ...ALL_PIPES,
        ...ALL_DIRECTIVES,
        ...ALL_COMPONENTS,
        CommonModule,
        HttpModule,
        JsonpModule,
        FormsModule,
        ReactiveFormsModule,
    ]

})
export class EvekitCoreModule {

}
