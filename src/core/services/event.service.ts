/**
 * Created by Code1912 on 2016/10/10.
 */
import { Injectable ,EventEmitter} from '@angular/core';
@Injectable()
export class EventService {
    constructor(){

    }
    private  registerEvent={};
    public register(name:string,func:Function ):Function{
        if(!this.registerEvent.hasOwnProperty(name)){
            this.registerEvent[name]=new EventEmitter<any>();
        }
        let event:EventEmitter<any>=this.registerEvent[name];
        return  event.subscribe(func);
    }

    public broadcast(eventName:string,...args){
        if(!this.registerEvent.hasOwnProperty(eventName)){
            throw new Error(`event:'${eventName}' has not exists.`)
        }
        let event=<EventEmitter<any>>this.registerEvent[eventName];
        event.emit(...args);
    }
}