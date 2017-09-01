/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/3 (́>◞౪◟<‵)ﾉｼ
 */
import {SourceLoader} from "./source.loader";
export  class  StyleLoader implements  SourceLoader {
    load(url: string): Promise<boolean> {
        return StyleLoader.load(url);
    }

    static load(url: string): Promise<boolean> {
        var promise = new Promise<boolean>(function(resolve, reject) {
            if($(`#${url.split(".")[0]}Style`.replace(/\//g,"")).length>0){
                resolve(true);
                return;
            }
            let  linkElement:HTMLLinkElement =  document.createElement("link");
            linkElement.href=url;
            linkElement.id=`${url.split(".")[0]}Style`.replace(/\//g,"")
            linkElement.rel="stylesheet"
            linkElement.onload = ()=>{
                resolve(true)
            }
            linkElement.addEventListener("error",  (ev: ErrorEvent) => {
                console.log(ev);
                reject(false)
            }, true);
            document.head.appendChild(linkElement);
        });
        promise.catch(res=>{
             console.log(res)
        })
        return promise;
    }
}