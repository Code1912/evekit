import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: '[eve-grid-detail]'})
export class EveGridDetailTemplateDirective {
    constructor(public templateRef:TemplateRef<any>) {
    }
}