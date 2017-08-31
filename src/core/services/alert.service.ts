/**
 * Created by Code1912 on 2016/10/9.
 */
/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/3 (́>◞౪◟<‵)ﾉｼ
 */
import { Injectable ,AfterViewChecked,EventEmitter} from '@angular/core';
import {EventService} from "./event.service";
import {AlertInfo, AlertType} from "../components/alert/alert";
import {ConfirmInfo} from "../components/confirm/confirm";

@Injectable()
export class AlertService {
    constructor(private  eventService:EventService){

    }
    info(msg: string, title?: string) {
        let info = new AlertInfo();
        info.title = title;
        info.msg = msg;
        info.type = AlertType.info;
        this.eventService.broadcast("addAlert",info);
    }

    error(msg: string, title?: string) {
        let info = new AlertInfo();
        info.title = title;
        info.msg = msg;
        info.type = AlertType.error;
        this.eventService.broadcast("addAlert",info);
    }

    success(msg: string, title?: string) {
        let info = new AlertInfo();
        info.title = title;
        info.msg = msg;
        info.type = AlertType.success;
        this.eventService.broadcast("addAlert",info);
    }

    warning(msg: string, title?: string) {
        let info = new AlertInfo();
        info.title = title;
        info.msg = msg;
        info.type = AlertType.warning;
        this.eventService.broadcast("addAlert",info);
    }
    confirm(msg:string,ok?:Function,cancel?:Function,source?:Object){
        let info=new ConfirmInfo();
        info.msg=msg;
        info.ok=ok;
        info.cancel=cancel;
        info.source=source;
        this.eventService.broadcast("addConfirm",info);
    }
}