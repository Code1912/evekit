/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/3 (́>◞౪◟<‵)ﾉｼ
 */
import { Component, OnInit,Input } from '@angular/core';
import {Menu} from "./menu-manager"
import {Router} from  "@angular/router"
@Component({

    selector: '[menu-item]',
    templateUrl: 'menu-item.component.html'
})
export class MenuItemComponent implements OnInit {
    @Input()
    item:Menu;
    constructor(private  router:Router) {

    }

    menuClick(){
        this.router.navigateByUrl(this.item.path);
    }
    ngOnInit() { }

}