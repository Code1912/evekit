/**
 * Created by Code1912 on 2016/10/1.
 */

import {ModuleLoader,ModuleConfig} from "./module-loader"
export function RoutePathConfig(path: any,folderName?:string) {
    return function (target ) {
        let config=new ModuleConfig();
        config.path=path;
        config.moduleType=target;
        ModuleLoader.addModuleConfig(config)
    };
}