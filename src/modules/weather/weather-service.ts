/**
 * Created by Code1912 on 2016/10/19.
 */
import { Injectable  } from '@angular/core';
import {Cookie} from "eve/common";
import {Router,ActivatedRouteSnapshot, RouterStateSnapshot,CanActivate} from '@angular/router';
import {Http, RequestOptionsArgs, Headers} from "@angular/http";
import {  Subject} from "rxjs/Subject";
import {  Observable} from "rxjs/Observable";
@Injectable()
export  class  WeatherService   {


    apiAddress:string="http://127.0.0.1:7777/"
    constructor(private  http: Http) {

    }

    getWeather(){
      return   this.http.get(`${this.apiAddress}weather`).map(p=>p.json());
    }
}