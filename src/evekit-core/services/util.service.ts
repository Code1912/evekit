
import {Injectable} from "@angular/core";

@Injectable()
export  class  UtilService{
    constructor(){

    }
    guid():string {
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
    toArray(obj:object){
         return Object.keys(obj).map(p=>{
            let temp=  { };
             temp[`${p}`]=obj[p];
             return temp;
        })
    }
    trim(){

    }
}