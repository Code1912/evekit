/**
 * Created by Code1912 on 2016/10/1.
 */
import {RouterModule,Routes} from "@angular/router"
import {ModuleWithProviders} from "@angular/core"
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {Error404Component} from "./components/system-error/error404.component";
import {EveComponent} from "./components/eve/eve.component";
import {AuthService} from "eve/services";
import {LoginComponent} from "./components/login/login.component";

/*  {path: 'moduleA/test',
 loadChildren: "./moduleA/app#ModuleAModule"}*/
export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(<Routes>[
    {
        path: '',
        component: EveComponent,
        canActivate: [AuthService],
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
