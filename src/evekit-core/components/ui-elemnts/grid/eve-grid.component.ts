import {
    Component, ContentChild, ContentChildren, Input, OnInit, QueryList, TemplateRef
} from '@angular/core';
import {EveGridToolbarTemplateDirective} from "./eve-grid-toolbar.dirctive";
import {EveGridDetailTemplateDirective} from "./eve-grid-detail.directive";
import {EveGridColumnDirective} from "./eve-grid-column.directive";

@Component({
    selector: 'eve-grid',
    templateUrl: 'eve-grid.component.html',
    styleUrls:['eve-grid.component.css']
})

export class EveGridComponent implements OnInit {

    @Input()
    data:Array<any>=[];

    @ContentChild(EveGridToolbarTemplateDirective)
    toolbarTemplate:TemplateRef<any>;

    @ContentChildren(EveGridColumnDirective)
    columns:QueryList<EveGridColumnDirective>=new QueryList();

    @ContentChild(EveGridDetailTemplateDirective)
    detailTemplate:EveGridDetailTemplateDirective;
    constructor() {
        console.log(1)
    }

    ngOnInit() {
        console.log(this.toolbarTemplate);
        console.log(this.detailTemplate)
    }

    private onRowDetailShowClick(dataItem:any){
        dataItem.__$detailShown=!dataItem.__$detailShown;
    }

    expandAll(){
        (this.data||[]).forEach((p,i)=>{
            p.__$detailShown=true;
        })
    }

    toggle(index,shown:boolean){
        let item=(this.data||[])[index];
        if(item){
            item.__$detailShown=shown;
        }
    }

    collapseAll(){
        (this.data||[]).forEach((p,i)=>{
            p.__$detailShown=false;
        })
    }

    collapseRow(index:number){
        this.toggle(index,false)
    }

    expandRow(index:number){
        this.toggle(index,true)
    }
}