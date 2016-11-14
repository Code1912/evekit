/**
 * Created by Code1912 on 2016/10/9.
 */
/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/3 (́>◞౪◟<‵)ﾉｼ
 */
import { Injectable ,AfterViewChecked,EventEmitter} from '@angular/core';
import {RootEventService} from "./root-event-service";
import  { Subject ,Observable,}  from "rxjs/rx"
import { AlertInfo,AlertType,ConfirmInfo } from 'eve/components'; 
@Injectable()
export class AlertService {
    constructor(private  rootEventService:RootEventService){}



    info(msg: string, title?: string) {
        let info = new AlertInfo();
        info.title = title;
        info.msg = msg;
        info.type = AlertType.info;
        this.rootEventService.broadcast("addAlert",info);
    }

    error(msg: string, title?: string) {
        let info = new AlertInfo();
        info.title = title;
        info.msg = msg;
        info.type = AlertType.error;
        this.rootEventService.broadcast("addAlert",info);
    }

    success(msg: string, title?: string) {
        let info = new AlertInfo();
        info.title = title;
        info.msg = msg;
        info.type = AlertType.success;
        this.rootEventService.broadcast("addAlert",info);
    }

    warning(msg: string, title?: string) {
        let info = new AlertInfo();
        info.title = title;
        info.msg = msg;
        info.type = AlertType.warning;
        this.rootEventService.broadcast("addAlert",info);
    }
    confirm(msg:string,ok?:Function,cancel?:Function,source?:Object){
        let info=new ConfirmInfo();
        info.msg=msg;
        info.ok=ok;
        info.cancel=cancel;
        info.source=source;
        this.rootEventService.broadcast("addConfirm",info);
    }
}