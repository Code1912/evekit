/**
 * Created by Code1912 on 2016/10/20.
 */
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AlertService} from "eve/services";

@Component({
    selector: 'edit',
    templateUrl: 'edit.component.html'
})
export class EditComponent implements OnInit {
    constructor(private alertService:AlertService) { }

    @Input()
    weather:any;

    @Output()
    editNotify:EventEmitter<any>=new EventEmitter<any>();

    doSave(){
        this.alertService.confirm("Are you sure to save?",()=>{
            this.editNotify.emit(this.weather)
        },null,this);

    }
    ngOnInit() {

    }

}