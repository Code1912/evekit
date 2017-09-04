/**
 * Created by Code1912 on 2016/10/9.
 */
/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/3 (́>◞౪◟<‵)ﾉｼ
 */
import { Injectable ,AfterViewChecked,EventEmitter} from '@angular/core';
import {EveEventService} from "./eve-event.service";
import {AlertInfo, AlertType} from "../components/ui-elemnts/alert/alert";

@Injectable()
export class EveAlertService {
    constructor(private  eventService:EveEventService){

    }
    info(msg: string, title?: string) {
        let info = new AlertInfo();
        info.title = title;
        info.msg = msg;
        info.type = AlertType.info;
        this.eventService.emit("addAlert",info);
    }

    error(msg: string, title?: string) {
        let info = new AlertInfo();
        info.title = title;
        info.msg = msg;
        info.type = AlertType.error;
        this.eventService.emit("addAlert",info);
    }

    success(msg: string, title?: string) {
        let info = new AlertInfo();
        info.title = title;
        info.msg = msg;
        info.type = AlertType.success;
        this.eventService.emit("addAlert",info);
    }

    warning(msg: string, title?: string) {
        let info = new AlertInfo();
        info.title = title;
        info.msg = msg;
        info.type = AlertType.warning;
        this.eventService.emit("addAlert",info);
    }
    confirm(msg:string,ok?:Function,cancel?:Function,close?:Function){
        var args={
            msg,ok,cancel,close
        }
        this.eventService.emit("addConfirm",args);
    }
}