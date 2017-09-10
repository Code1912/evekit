import {Component, ContentChild, Directive, forwardRef, Input, ViewChild} from '@angular/core';
import {EveGridHeaderTemplateDirective} from "./eve-grid-header.dirctive";
import {EveGridCellTemplateDirective} from "./eve-grid-cell.direcitve";

@Directive({
    selector: 'eve-grid-column'
})
export class EveGridColumnDirective {
    @Input()
    name:string="";

    @Input()
    field:string="";

    @Input()
    sort:string="";

    @Input()
    sortable:boolean=false;

    @Input()
    visible:boolean=true;

    @ContentChild(EveGridHeaderTemplateDirective)
    headerTemplate:EveGridHeaderTemplateDirective;

    @ContentChild(EveGridCellTemplateDirective)
    cellTemplate:EveGridCellTemplateDirective;
    constructor() {
    }
}