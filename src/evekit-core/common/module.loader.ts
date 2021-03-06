/**
 * Created by Code1912 on 2016/10/1.
 */

import {ScriptLoader} from "./script.loader";
import {StyleLoader} from "./style.loader";
import {Router, Route, NavigationError, NavigationEnd} from "@angular/router"
import {EmptyModule} from "./empty.module";

export class  ModuleLoader{
    private static router:Router;
       static async  loadModule(moduleName:string):Promise<any>{
        let jsUrl=`modules/${moduleName}/app.js`;
        StyleLoader.load(`modules/${moduleName}/app.css`);
        let result=await ScriptLoader.load(jsUrl);
        if(result){
            return window["evekit"][moduleName].AppModule;
        }else {
            return EmptyModule;
        }
    }

    static  setRouter(router:Router ){
        this.router=router;
        this.router.events.filter(event => event instanceof NavigationError).subscribe(event=>{
            this.router.navigateByUrl("system/404");
        })

        this.router.errorHandler=(error: any) =>{
            if(error.message==="isLoading"){
                return;
            }
            console.error(error);
        };
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(function ($envet:NavigationEnd) {
            //console.log($envet)
            let path=($envet.url||"").split("?")[0];
            if(path=="/login"){
                document.body.className="hold-transition login-page";
            }
            else {
                if( document.body.className!=="hold-transition skin-blue sidebar-mini"){
                    document.body.className="hold-transition skin-blue sidebar-mini";
                }
            }
            if($.AdminLTE.layout) {
                $.AdminLTE.layout.fix();
                //    $.AdminLTE.layout.fixSidebar();
            }

        });

    }

    private static addRoute(config:ModuleConfig){
        if(this.router.config.find(p=>p.path==config.path)){
            throw  new Error(`addRoute:The route path: '${config.path}'  is duplicate `)
        }
        let newRouteConfig=Object.assign(new Array<Route>(),this.router.config);
        newRouteConfig[0].children.push({
            path:config.path,
            loadChildren :() =>config.moduleType});
        this.router.resetConfig(newRouteConfig);
    }
}

export  class ModuleConfig{
    path:string;
    moduleType:any;
    isLoad:boolean;
}