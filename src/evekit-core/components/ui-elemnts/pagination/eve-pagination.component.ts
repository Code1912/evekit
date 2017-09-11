import {Component, EventEmitter,Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'eve-pagination',
    templateUrl: 'eve-pagination.component.html'
})

export class EvePaginationComponent implements OnInit {

    private  start=0;
    private  end=0;
    private _pageSize: number = 10;
    private _pageIndex: number = 0;
    private _totalCount: number = 0;
    private _pagination: Array<number> = [5, 10, 20, 50, 100];
    private _bindPageList: Array<number> = [];
    private _pageCount: number = 0;

    @Output()
    onPageChange:EventEmitter<{pageSize:number,pageIndex:number}>=new EventEmitter();
    @Input()
    get pagination(): Array<number> {
        return this._pagination;
    }

    set pagination(value: Array<number>) {
        if (!Array.isArray(value)) {
            return;
        }
        value = value.filter(p => {
            if (p === null || p === undefined) {
                return false;
            }
            return /^\d{1,6}$/.test(p.toString());
        });
        if (!value.length) {
            return;
        }
        this._pagination = value;
    }

    @Input()
    get totalCount(): number {
        return this._totalCount;
    }

    set totalCount(value: number) {
        if (!value) {
            value = 0;
        }
        this._totalCount = value;
        this.setPageCount();
    }

    @Input()
    get pageSize(): number {
        return this._pageSize;
    }

    set pageSize(value: number) {
        if (!value) {
            value = 10;
        }
        if(this._pageSize === value){
            return;
        }
        this._pageSize = parseInt(value.toString());
        if(this.pagination.indexOf(this._pageSize)==-1){
            this.pagination.push(value);
            this.sortAsc( this.pagination)
        }
        this.setPageCount();
    }

    @Input()
    get pageIndex(): number {
        return this._pageIndex;
    }

    set pageIndex(value: number) {
        if (!value) {
            value = 0;
        }
        if(value==this._pageIndex){
            return;
        }
        this._pageIndex = value;
        this.setBindPageList();
    }

    constructor() {
    }

    ngOnInit() {
    }

    private  getPrePageList():Array<number>{
        let array = [];
        for (let i = (this.pageIndex-1); i > 0; i--) {
            if (i == 0) {
                break;
            }
            if (array.length == 4) {
                break;
            }
            array.push(i);
        }
        return array;
    }

    private  getNextPageList():Array<number>{
        let array = [];
        for (let i = this.pageIndex+1; i <= this._pageCount;i++) {
            if (array.length == 4) {
                break;
            }
            array.push(i);
        }
        return array;
    }
    private setBindPageList() {
        let array = [];
        this.start=this.pageSize*(this.pageIndex-1)+1;
        this.end=this.pageSize*this.pageIndex>this.totalCount?this.totalCount:this.pageSize*this.pageIndex;
        let index = this._bindPageList.indexOf(this.pageIndex);
        if (index > 0 && index < (this._bindPageList.length - 1)) {
            return;
        }
        array.push(this.pageIndex);
        if(index<1){
            array=array.concat(this.getPrePageList());
            array=array.concat(this.getNextPageList());
            array=this.sortAsc(array);
            array =array.slice(0, 5);
        }
        else {
            array=array.concat(this.getNextPageList());
            array=array.concat(this.getPrePageList());
            array=this.sortAsc(array);
            array =  array.slice(array.length - 5, array.length);
        }
        this._bindPageList = array;
    }
    private sortAsc(array:Array<number>){
        return array.sort((a,b)=>{
            return a-b;
        })
    }
    private onPageIndexChange(i) {
        if(this.pageIndex==i){
            return;
        }
        this.pageIndex = i;
        this.onPageChange.emit({pageSize:this.pageSize,pageIndex:this.pageIndex});
    }

    private  onPreOrNext(i){
        if(((this.pageIndex+i)<1&&i==-1)||
            ((this.pageIndex+1)>this._pageCount&&i==1)){
            return;
        }
        this.pageIndex+=i;
        this.onPageChange.emit({pageSize:this.pageSize,pageIndex:this.pageIndex});
    }

    private  onFirstOrLast(isFirst:boolean){
        if(isFirst){
            if(this.pageIndex<=1){
                return;
            }
           this.pageIndex=1;
        }
        else{
            if(this.pageIndex>=this._pageCount){
                return;
            }
            this.pageIndex=this._pageCount;
        }
        this.onPageChange.emit({pageSize:this.pageSize,pageIndex:this.pageIndex});
    }
    private  onPageSizeChange(){
        this.setPageCount();
        if(this.pageIndex>this._pageCount){
            this.pageIndex=this._pageCount;
        }
        this.setBindPageList();
        this.onPageChange.emit({pageSize:this.pageSize,pageIndex:this.pageIndex});
    }
    private setPageCount() {
        if (this.pageSize > 0) {
            this._pageCount = parseInt( (this.totalCount / this.pageSize).toString()) + (this.totalCount % this.pageSize === 0 ? 0 : 1);
        }
    }
}