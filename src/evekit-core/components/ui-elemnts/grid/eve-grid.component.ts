import {
    EventEmitter,
    Component, ContentChild, ContentChildren, Input, OnInit, Output, QueryList, TemplateRef
} from '@angular/core';
import {EveGridToolbarTemplateDirective} from "./eve-grid-toolbar.dirctive";
import {EveGridDetailTemplateDirective} from "./eve-grid-detail.directive";
import {EveGridColumnDirective} from "./eve-grid-column.directive";

@Component({
    selector: 'eve-grid',
    templateUrl: 'eve-grid.component.html',
    styleUrls: ['eve-grid.component.css']
})

export class EveGridComponent implements OnInit {

    private  _pageIndex: number;
    private _colspan: number;
    private _toolbarTemplate: TemplateRef<any>;
    private _detailTemplate: EveGridDetailTemplateDirective;
    private _columns: QueryList<EveGridColumnDirective>;

    private _pageSize:number;
    @Input()
    totalCount: number=0;
    @Input()
    pagination:Array<number>;
    @Input()
    get pageSize(): number {
        return this._pageSize;
    }

    set pageSize(value: number) {
        if(!value){
            value=10;
        }
        this._pageSize = value;
    }
    @Input()
    get pageIndex(): number {
        return this._pageIndex;
    }

    set pageIndex(value: number) {
        if(!value){
            value=0;
        }
        this._pageIndex = value;
    }
    @Input()
    pageable:boolean=false;
    @Input()
    data: Array<any> = [];
    @Input()
    singleSort: boolean = true;

    @ContentChild(EveGridToolbarTemplateDirective)
    get toolbarTemplate(): TemplateRef<any> {
        return this._toolbarTemplate;
    }

    set toolbarTemplate(val) {
        this._toolbarTemplate = val;
    }

    @ContentChildren(EveGridColumnDirective)
    get columns(): QueryList<EveGridColumnDirective> {
        return this._columns;
    }

    set columns(val) {
        this._columns = val;
        this.setColspan();
    }

    @ContentChild(EveGridDetailTemplateDirective)
    get detailTemplate(): EveGridDetailTemplateDirective {
        return this._detailTemplate;
    }

    set detailTemplate(val) {
        this._detailTemplate = val;
        this.setColspan();
    }

    @Output()
    pageChange: EventEmitter<GridChangeEvent> = new EventEmitter();

    constructor() {

    }

    private setColspan() {
        this._colspan = (this.columns || []).length + (this.detailTemplate ? 1 : 0);
    }

    ngOnInit() {
        console.log(this.toolbarTemplate);
        console.log(this.detailTemplate)
    }

    private onRowDetailShowClick(dataItem: any) {
        dataItem.__$detailShown = !dataItem.__$detailShown;
    }

    private onHeaderClick(column: EveGridColumnDirective) {
        if (!column.sortable) {
            return
        }
        if (this.singleSort) {
            this.columns.forEach(p => {
                if (p !== column&&p.sort) {
                    p.sort = "";
                }
            });
        }
        column.changeSort();
        this.emitChangeEvent();
    }

    expandAll() {
        (this.data || []).forEach((p, i) => {
            p.__$detailShown = true;
        })
    }

    toggle(index, shown: boolean) {
        let item = (this.data || [])[index];
        if (item) {
            item.__$detailShown = shown;
        }
    }

    collapseAll() {
        (this.data || []).forEach((p, i) => {
            p.__$detailShown = false;
        })
    }

    collapseRow(index: number) {
        this.toggle(index, false)
    }

    expandRow(index: number) {
        this.toggle(index, true)
    }
    private  onPageChange(pageIndex:number){
        this.pageIndex=pageIndex;
        console.log(1)
        this.emitChangeEvent();
    }
    private  emitChangeEvent(){
        let event=new GridChangeEvent();
        event.pageIndex=this.pageIndex;
        event.sortFields=this.columns.filter(p=>p.sort!='').map(p=>{
            return {
                sort:p.sort,
                field:p.field
            }
        });
        this.pageChange.emit( event )
    }
}

export class GridChangeEvent {
    pageIndex: number;
    sortFields: Array<{
        sort: string,
        field: string
    }>;
}
