/**
 * Created by Code1912 on 2016/10/1.
 */
import {RouterModule,Routes} from "@angular/router"
import {ModuleWithProviders} from "@angular/core"

import {EveAuthService} from "evekit/core";
import {EveComponent,Error404Component,DashboardComponent,LoginComponent} from "./pages";

/*  {path: 'moduleA/test',
 loadChildren: "./moduleA/app#ModuleAModule"}*/
export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(<Routes>[
    {
        path: '',
        component: EveComponent,
        canActivate: [EveAuthService],
        children: [
            {
                path: 'system/404',
                component: Error404Component
            },{
                path: '',
                component: DashboardComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    }
]);
