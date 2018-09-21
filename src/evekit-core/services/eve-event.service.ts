/**
 * Created by Code1912 on 2016/10/10.
 */
import { Injectable ,EventEmitter} from '@angular/core';

@Injectable()
export class EveEventService {
    constructor(){

    }
    static   registerEvent={};
    public subscribe(name:string,func:Function ):any{
        if(!EveEventService.registerEvent.hasOwnProperty(name)){
            EveEventService.registerEvent[name]=new EventEmitter<any>();
        }
        let event:EventEmitter<any>=EveEventService.registerEvent[name];


        return  event.subscribe(func);
    }


    public emit(eventName:string,value){
        if(!EveEventService.registerEvent.hasOwnProperty(eventName)){
            throw new Error(`event:'${eventName}' has not exists.`)
        }
        let event=<EventEmitter<any>>EveEventService.registerEvent[eventName];
        event.emit(value);
    }
}