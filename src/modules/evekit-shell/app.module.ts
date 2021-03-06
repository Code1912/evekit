import {NgModule, NgModuleFactoryLoader} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ALL_COMPONENTS, ContainerComponent} from './components';
import {ALL_PAGES} from './pages';
import {AppRoutes} from './app.route'
import {APP_BASE_HREF} from '@angular/common';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpModule} from "@angular/http" ;
import {EvekitCoreModule} from "evekit/core";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import "./app.module.styl";
@NgModule({
    providers: [
        {provide: APP_BASE_HREF, useValue: ''}
    ],
    imports: [
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        HttpModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        EvekitCoreModule,
         AppRoutes
    ],
    declarations: [
        ...ALL_PAGES
        , ...ALL_COMPONENTS,
    ],
    bootstrap: [ContainerComponent]
})
export class AppModule {

}