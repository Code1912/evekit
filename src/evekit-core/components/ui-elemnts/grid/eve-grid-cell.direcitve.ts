import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: '[eve-grid-cell]'})
export class EveGridCellTemplateDirective {
    constructor(public templateRef:TemplateRef<any>) {
    }
}