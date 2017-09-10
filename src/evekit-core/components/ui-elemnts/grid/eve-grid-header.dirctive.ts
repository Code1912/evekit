import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({selector: '[eve-grid-header]'})
export class EveGridHeaderTemplateDirective {
    constructor(public templateRef:TemplateRef<any>) {
    }
}