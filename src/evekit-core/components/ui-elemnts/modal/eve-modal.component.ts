import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
    selector: 'eve-modal',
    templateUrl: 'eve-modal.component.html'
})

export class EveModalComponent implements OnInit {
    private _shown=false;
    private _allowDrag=false;
    @ViewChild("ele")
    private ele:ElementRef;
    @Input()
    set allowDrag(val){
        if(val===this._allowDrag){
            return;
        }
        if(val){
            $(this.ele.nativeElement).drags({handle: ".modal-header"});
        }
    }
    @Input()
    header:string;
    @Input()
    get shown(){
        return this._shown;
    }
    set shown(val){
        if(this._shown===val){
            return
        }
        this._shown=val;
        this.showModal(val);
        this.shownChange.emit(val);
    }
    @Output()
    shownChange:EventEmitter<boolean> =new EventEmitter();
    constructor(private eleRef:ElementRef) {
        this.eleRef.nativeElement.style["z-index"]=9999;
    }

    ngOnInit() {
    }
    onClose(){
        this.shown=false;
    }

    showModal(val:boolean){
        if(val){
            $(this.ele.nativeElement).find(".modal-content").attr("style","")
        }
        $(this.ele.nativeElement).modal(val?"show":"hide");
    }
}
