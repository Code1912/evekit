/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/3 (́>◞౪◟<‵)ﾉｼ
 */
import { Injectable } from '@angular/core';
import {LoadingComponent} from "../components/loading/loading.component";
import {RootEventService} from "eve/services";


@Injectable()
export class LoadingService {

    constructor(private rootEventService:RootEventService) {

    }
    showLoading(){
        this.rootEventService.broadcast("loading",true)
    }

    hideLoading(){
        this.rootEventService.broadcast("loading",false)
    }

}