import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: '[eve-grid-toolbar]'})
export class EveGridToolbarTemplateDirective {
    constructor(public templateRef:TemplateRef<any>) {

    }
}