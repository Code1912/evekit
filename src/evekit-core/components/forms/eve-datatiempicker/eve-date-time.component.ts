import {
    Component, ElementRef, OnInit, AfterViewInit, Input, OnChanges, SimpleChanges, ViewChild,
    forwardRef
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
const EVE_DATE_TIME_VALUE_ACCESSOR =  {
    provide:NG_VALUE_ACCESSOR,
    useExisting:forwardRef(() => EveDateTimeComponent),
    multi:true
};

@Component({
    selector: 'eve-date-time',
    templateUrl: 'eve-date-time.component.html',
    providers:[EVE_DATE_TIME_VALUE_ACCESSOR],
})
export class EveDateTimeComponent implements OnInit,AfterViewInit,OnChanges {
    static index=0;
    @Input()
    disabled:boolean;
    _value:any;
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
    id:number=EveDateTimeComponent.index++;
    @Input()
    lang:string="zh";
    constructor( ) {

    }

    ngOnInit() {

    }
    ngAfterViewInit(): void {
        $(`#eve-date-time-picker-${this.id}`).datetimepicker({
            lang:this.lang||"zh",
            value:this.eleRef.nativeElement.value,
            onChangeDateTime:(dp,$input:JQuery)=>{
               this.value=$input.val().trim()
            }
        });
    }
    ngOnChanges(changes:SimpleChanges){

    }
    onIConClick(){
        this.eleRef.nativeElement.focus();
    }
    onBlur(){
        this.onTouchedCallback();
    }
    writeValue(val: any): void{
        if(/^\d{13}$/.test(val)){
            val=this.eleRef.nativeElement.value=new Date(val).format();
            this.onChangeCallback(val);
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