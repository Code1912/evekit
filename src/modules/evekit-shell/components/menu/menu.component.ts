/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/3 (́>◞౪◟<‵)ﾉｼ
 */
import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Menu,MenuConfig} from "./menu-manager"

@Component({
    selector: '[menu]',
    templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnInit {
    private  menus:Menu[];
    private  tempMenus:Menu[]=[];
    constructor() {
        this.menus=MenuConfig;
        this.tempMenus=this.menus;
    }

    search(text:string){
        if(!text){
            this.tempMenus=this.menus;
            return;
        }
        this.tempMenus=this.menus.filter(p=>p.name.indexOf(text)>-1)||[];
    }
    ngOnInit() {

    }


}