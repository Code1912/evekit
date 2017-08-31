/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/3 (́>◞౪◟<‵)ﾉｼ
 */
import { Injectable } from '@angular/core';
import {EventService} from "../services";


@Injectable()
export class LoadingService {

    constructor(private rootEventService:EventService) {

    }
    showLoading(){
        this.rootEventService.broadcast("loading",true)
    }

    hideLoading(){
        this.rootEventService.broadcast("loading",false)
    }

}