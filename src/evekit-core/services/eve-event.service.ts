/**
 * Created by Code1912 on 2016/10/10.
 */
import { Injectable ,EventEmitter} from '@angular/core';
@Injectable()
export class EveEventService {
    constructor(){

    }
    private  registerEvent={};
    public subscribe(name:string,func:Function ):Function{
        if(!this.registerEvent.hasOwnProperty(name)){
            this.registerEvent[name]=new EventEmitter<any>();
        }
        let event:EventEmitter<any>=this.registerEvent[name];
        return  event.subscribe(func);
    }

    public emit(eventName:string,value){
        if(!this.registerEvent.hasOwnProperty(eventName)){
            throw new Error(`event:'${eventName}' has not exists.`)
        }
        let event=<EventEmitter<any>>this.registerEvent[eventName];
        event.emit(value);
    }
}