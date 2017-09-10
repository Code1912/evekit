import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'eve-widget',
    templateUrl: 'eve-widget.component.html'
})
export class EveWidgetComponent implements OnInit {

    _collapse = false;
    @Input()
    header: string = "";

    @Input()
    type: string = "default";

    @Input()
    icon:string="";
    @Input()
    showCollapseBtn: boolean = true;

    @Input()
    get collapse() {
        return this._collapse;
    }

    set collapse(val) {
        this._collapse = val;
        this.collapseChange.emit(val);
    }

    @Output()
    collapseChange: EventEmitter<boolean> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    onToggleClick(){
        this.collapse=!this.collapse;
    }
}