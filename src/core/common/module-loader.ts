/**
 * Created by Code1912 on 2016/10/1.
 */

import {ScriptLoader} from "./script-loader";
import {StyleLoader} from "./style-loader";
import {Router, Route, NavigationError, NavigationEnd} from "@angular/router"
import {MenuConfig} from "../components/menu/menu-manager"

export class  ModuleLoader{
    private static moduleConfigs:Array<ModuleConfig>=new Array<ModuleConfig>();
    private static router:Router;
    static  addModuleConfig(config:ModuleConfig){
        config=Object.assign(new ModuleConfig(),config);
        config.isLoad=false;
        if(this.moduleConfigs.find(p=> p.path.toLocaleLowerCase()===config.path.toLocaleLowerCase())){
            throw  new Error(`addModuleConfig:The path: '${config.path}'   is duplicate `)
        }
        this.moduleConfigs.push(config);
    }
    static checkModule(event:any ){
        if(!(event instanceof NavigationError ) ){
            return  ;
        }
        let startEvent=  event as NavigationError ;
        let urlArray=startEvent.url.split("/");
        if(urlArray.length==1&&urlArray[1]==""){

            return  ;
        }
        let moduleName= urlArray[1];
        if(!moduleName){
            return  ;
        }
        var url=startEvent.url.substr(1,startEvent.url.length-1).split("?")[0].toLocaleLowerCase();
        if(moduleName.toLocaleLowerCase()==="system"&&MenuConfig.find(p=>p.path.toLocaleLowerCase()==url)){

            return  ;
        }
        var menu=MenuConfig.find(p=>{
            return p.path.toLocaleLowerCase().indexOf(url )==0});
        if(!menu){
            // 取消下一步执行
            // 导航到错误页面

            ModuleLoader.router.navigateByUrl("system/404");
            return  ;
        }
        let module=ModuleLoader.moduleConfigs.find(p=>p.path.toLocaleLowerCase()===moduleName.toLocaleLowerCase());
        if(module&&module.isLoad){
            return  ;
        }
        ModuleLoader.loadSource(moduleName,startEvent.url);
        startEvent.error.message="isLoading";
      //  ModuleLoader.router.events.forEach(p=>console.log(p))
    }
    static  loadSource(moduleName:string,routePath){
        var jsUrl=`modules/${moduleName}/${moduleName}.bundle.js`;
        StyleLoader.load(`modules/${moduleName}/${moduleName}.bundle.css`);
        ScriptLoader.load(jsUrl).then((ret)=>{
            System.import(`build/modules/${moduleName}/app.js`).then(function() {
                let module=ModuleLoader.moduleConfigs.find(p=>p.path.toLocaleLowerCase()===moduleName.toLocaleLowerCase());
                module.isLoad=true;
                ModuleLoader.addRoute(module);
                ModuleLoader.router.navigateByUrl(routePath);
            });
        },(ret)=>{
            ModuleLoader.router.navigateByUrl("system/404")
        });
    }

    static  setRouter(router:Router ){
        this.router=router;
        this.router.errorHandler=(error: any) =>{
            if(error.message==="isLoading"){
                return;
            }
            console.error(error);
        };
        this.router.events.filter(event => event instanceof NavigationError).subscribe(ModuleLoader.checkModule);
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