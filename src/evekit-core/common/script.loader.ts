/**
 * Created by Code1912 on 2016/10/1.
 */
import {SourceLoader} from "./source.loader";
import  {Subject } from "rxjs"
export  class  ScriptLoader implements  SourceLoader {
    load(url: string): Promise<boolean> {
        return ScriptLoader.load(url);
    }

    static load(url: string): Promise<boolean> {
        var promise = new Promise<boolean>(function(resolve, reject) {
            if($(`#${url.split(".")[0]}JS`.replace(/\//g,"")).length>0){
                resolve(true);
                return;
            }
            let  scriptElement:HTMLScriptElement =  document.createElement("script");
            var subject = new Subject<boolean>();
            scriptElement.src=url;
            scriptElement.id=`${url.split(".")[0]}JS`.replace(/\//g,"")
            scriptElement.type="text/javascript";
            scriptElement.async=true;
            scriptElement.onload = ()=>{
                resolve(true)
            }
            scriptElement.addEventListener("error",  (ev: ErrorEvent) => {
                console.error(ev);
                reject(false)
            }, true);
            document.body.appendChild(scriptElement);
        });
        promise.catch(res=>{
            console.log(res);
        });
        return promise;
    }
}