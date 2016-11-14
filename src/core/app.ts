/**
 * Created by Code1912 on 2016/10/1.
 */
import { NgModule,NgModuleFactoryLoader } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { EveComponent } from './components/eve/eve.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuItemComponent } from './components/menu/menu-item.component';
import {AppRoutes} from './route.config'
import {APP_BASE_HREF} from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {AlertService, LoadingService, RootEventService, EveHttpService, AuthService} from "eve/services";
import {
     ConfirmComponent, ConfirmShowDirective, AlertComponent, Error404Component
    , LoadingComponent, ContainerComponent
} from "eve/components";

import {HttpModule,Http,XHRBackend,RequestOptions} from "@angular/http"
import {ShortcutDirective} from "eve/directives";
import {LoginComponent} from "./components/login/login.component";
import {EveCoreModule} from "eve/module";
@NgModule({
    providers: [
        LoadingService,
        AuthService,
        RootEventService,
        AlertService,
        {provide: APP_BASE_HREF, useValue: ''},
        {
            provide: Http,
            useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, loadingService: LoadingService, alertService: AlertService) =>
                new EveHttpService(backend, defaultOptions, loadingService, alertService)
            ,
            deps: [XHRBackend, RequestOptions, LoadingService, AlertService]
        },
        {
            provide: EveHttpService,
            useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, loadingService: LoadingService, alertService: AlertService) =>
                new EveHttpService(backend, defaultOptions, loadingService, alertService)
            ,
            deps: [XHRBackend, RequestOptions, LoadingService, AlertService]
        }
    ],
    imports: [ EveCoreModule,
        CommonModule,
        HttpModule,
        BrowserModule,
        RouterModule
        , FormsModule,ReactiveFormsModule
        , AppRoutes,
    ],
    declarations: [
        EveComponent,
        DashboardComponent,
        Error404Component,
        MenuComponent,
        MenuItemComponent,
        LoadingComponent,
        AlertComponent,

        ConfirmComponent, ConfirmShowDirective
         ,ContainerComponent,LoginComponent
    ],
    bootstrap: [ContainerComponent]
})
export class AppModule {

}