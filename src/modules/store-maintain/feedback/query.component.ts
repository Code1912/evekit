/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/1 (́>◞౪◟<‵)ﾉｼ
 */
import { Component, OnInit } from '@angular/core';
import {EveTranslateService} from "evekit/core";

@Component({
    selector: 'selector',
    templateUrl: 'query.component.html',
})
export class QueryComponent implements OnInit {
    constructor( private  translateService:EveTranslateService) {
        this.translateService.setLangValue('zh',{
            "test":"测试语言"
        });
        this.translateService.setLangValue('en',{
            "test":"english"
        })
    }

    ngOnInit() { }
    doCheck(){
        this.translateService.setDefaultLang('en')
    }
    doCheck1(){
        this.translateService.setDefaultLang('zh')
    }

}