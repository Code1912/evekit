import {Component, ContentChild, Directive, forwardRef, Input, ViewChild} from '@angular/core';
import {EveGridHeaderTemplateDirective} from "./eve-grid-header.dirctive";
import {EveGridCellTemplateDirective} from "./eve-grid-cell.direcitve";

@Directive({
    selector: 'eve-grid-column'
})
export class EveGridColumnDirective {

    headerClass: string = "";
    private _sortable: boolean = false;
    private _sort: string = "";

    @Input()
    get sort(): string {
        return this._sort;
    }

    set sort(value: string) {
        if (["desc", "asc", ""].indexOf((value || "").trim()) < 0) {
            value = "";
        }
        this._sort = value;
        this.setHeaderClass();
    }

    @Input()
    get sortable(): boolean {
        return this._sortable;
    }

    set sortable(value: boolean) {
        this._sortable = value;
        this.setHeaderClass();
    }

    @Input()
    name: string = "";

    @Input()
    field: string = "";


    @Input()
    visible: boolean = true;

    @Input()
    width: number = null;

    @ContentChild(EveGridHeaderTemplateDirective)
    headerTemplate: EveGridHeaderTemplateDirective;

    @ContentChild(EveGridCellTemplateDirective)
    cellTemplate: EveGridCellTemplateDirective;

    constructor() {
    }

    private setHeaderClass() {
        if (this.sortable) {
            this.headerClass = `sorting${this.sort ? "_" : ""}${this.sort}`;
        } else {
            this.headerClass = "";
        }
    }

    changeSort() {
        if (this.sort === "") {
            this.sort = "asc";
        } else if (this.sort === "asc") {
            this.sort = "desc";
        }
        else {
            this.sort = "";
        }
    }
}