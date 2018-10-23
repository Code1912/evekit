/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/3 (́>◞౪◟<‵)ﾉｼ
 */
import { Injectable } from '@angular/core';
import {EveEventService} from "../services";


@Injectable({ providedIn: 'root' })
export class EveLoadingService {

    constructor(private rootEventService:EveEventService) {

    }
    showLoading(){
        this.rootEventService.emit("loading",true)
    }

    hideLoading(){
        this.rootEventService.emit("loading",false)
    }

}