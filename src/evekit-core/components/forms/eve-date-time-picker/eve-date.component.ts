import {Component, ElementRef, forwardRef, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';

import {NG_VALUE_ACCESSOR} from "@angular/forms";
const EVE_DATE_VALUE_ACCESSOR =  {
    provide:NG_VALUE_ACCESSOR,
    useExisting:forwardRef(() => EveDateComponent),
    multi:true
};
@Component({
    selector: 'eve-date',
    templateUrl: 'eve-date.component.html',
    providers:[EVE_DATE_VALUE_ACCESSOR],
})

export class EveDateComponent  implements OnInit {
    static index=0;
    @Input()
    disabled:boolean;
    _value:any;
    protected  format="Y-m-d";
    get value (){
        return this._value;
    }
    set value(val) {
        if (val === this._value) {
            return
        }
        this._value = val;
        this.onChangeCallback(val);
    }
    private onTouchedCallback = Function.prototype;
    private onChangeCallback = Function.prototype;
    @ViewChild("ele")
    eleRef:ElementRef;
    id:number=EveDateComponent.index++;
    @Input()
    lang:string="zh";
    constructor( ) {

    }

    ngOnInit() {

    }
    ngAfterViewInit(): void {
        $(`#eve-date-picker-${this.id}`).datetimepicker({
            lang:this.lang||"zh",
            timepicker: false,
            datepicker:true,
            format:this.format,
            value:this.eleRef.nativeElement.value,
            onChangeDateTime:(dp,$input:JQuery)=>{
                this.value=$input.val().trim()
            }
        });
    }
    ngOnChanges(changes:SimpleChanges){


    }
    onIConClick(){
        if(this.disabled){
            return;
        }
        this.eleRef.nativeElement.focus();
    }
    onBlur(){
        this.onTouchedCallback();
    }
    writeValue(val: any): void{
        if(/^\d{13}$/.test(val)){
            this.value=this.eleRef.nativeElement.value=new Date(val).format();
            return;
        }
        if (val !== this._value) {
            this._value = val;
        }
    }

    registerOnChange(fn: any): void{
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void{
        this.onTouchedCallback = fn;
    }
}