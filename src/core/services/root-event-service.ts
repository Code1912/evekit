/**
 * Created by Code1912 on 2016/10/10.
 */
import { Injectable } from '@angular/core';
@Injectable()
export class RootEventService {
    constructor(){

    }
    private  registerEvent={};
    public register(name:string,func:Function,source:Object):Function{
        var array=[];
        if(this.registerEvent.hasOwnProperty(name)){
            array=this.registerEvent[name];
        }
        else {
            this.registerEvent[name]=array;
        }
        let tempFunc=function (...args: any[]) {
            func.apply(source,args);
        }
        array.push(tempFunc);
        let that=this;
        return function () {
            for(let i=0;i<array.length;i++){
                if(tempFunc==array[i]){
                    array.splice(i,1);
                    break;
                }
            }
        }
    }

    public broadcast(...args: any[]){
        if(!this.registerEvent.hasOwnProperty(args[0])){
            throw new Error(`event:'${args[0]}' has not exists.`)
        }
        let array=this.registerEvent[args[0]];
        array.forEach(p=>{
            if(p){
                p.apply(p,args);
            }
        })
    }
}