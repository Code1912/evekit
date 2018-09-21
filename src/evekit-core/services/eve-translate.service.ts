import {Injectable, EventEmitter, NgZone, ApplicationRef} from '@angular/core';
import {EveEventService} from "./eve-event.service";

@Injectable()
export class EveTranslateService {
    static lang: string = 'zh';
    static _langObj = {};

   // onTranslationChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private ngZone: NgZone, private  app: ApplicationRef,private eventService:EveEventService) {

    }

    public setDefaultLang(lang: string) {
        EveTranslateService.lang = lang;
        //this.onTranslationChange.emit(true);
        this.eventService.emit("translate",true);

    }

    public setLangValue(lang: string, value: object) {
        let oldValue = EveTranslateService._langObj[lang] || {};
        EveTranslateService._langObj[lang] = Object.assign(oldValue, value);

    }

    public setAllLang(value: object) {
        EveTranslateService._langObj = Object.assign(EveTranslateService._langObj, value);
    }

    public getValue(lang: string, key: string) {
        let oldValue = EveTranslateService._langObj[lang] || {};
        console.log(EveTranslateService._langObj);
        return oldValue[key] || key;
    }

}