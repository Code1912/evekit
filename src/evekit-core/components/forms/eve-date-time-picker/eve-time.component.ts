import {Component, ElementRef, forwardRef, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
const EVE_TIME_VALUE_ACCESSOR =  {
    provide:NG_VALUE_ACCESSOR,
    useExisting:forwardRef(() => EveTimeComponent),
    multi:true
};
@Component({
    selector: 'eve-time',
    templateUrl: 'eve-time.component.html',
    providers:[EVE_TIME_VALUE_ACCESSOR],
})
export class EveTimeComponent   implements OnInit {
    static index=0;
    @Input()
    disabled:boolean;
    _value:any;
    format="H:i";
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
    protected eleRef:ElementRef;
    id:number=EveTimeComponent.index++;
    @Input()
    lang:string="zh";
    constructor( ) {

    }

    ngOnInit() {

    }
    ngAfterViewInit(): void {
        $(`#eve-time-picker-${this.id}`).datetimepicker({
            lang:this.lang||"zh",
            timepicker: true,
            datepicker:false,
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
        if(! /^((([0-1]\d)|(\d))|(2[0-4])):[0-5]\d$/.test(val)){
            val="";
            this.eleRef.nativeElement.value="";
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