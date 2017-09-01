/**
 * Created by Code1912 on 2016/10/16.
 */
import {Component, OnInit, AfterContentChecked} from '@angular/core';
import {Router} from "@angular/router";
import {ModuleLoader} from "evekit/core"
@Component({
    moduleId: "container",
    selector: 'container',
    templateUrl: 'container.component.html'
})
export class ContainerComponent implements OnInit {
    constructor(private  router:Router) {
        ModuleLoader.setRouter(router);
    }
    ngOnInit() {

    }
}