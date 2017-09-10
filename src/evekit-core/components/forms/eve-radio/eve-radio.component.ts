
import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {UtilService} from "../../../services/util.service";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
const EVE_RADIO_VALUE_ACCESSOR =  {
    provide:NG_VALUE_ACCESSOR,
    useExisting:forwardRef(() => EveRadioComponent),
    multi:true
};
@Component({
    selector: 'eve-radio',
    templateUrl: 'eve-radio.component.html',
    styleUrls:["eve-radio.component.styl"],
    providers: [  EVE_RADIO_VALUE_ACCESSOR]
})

export class EveRadioComponent implements OnInit {
    _value:boolean;
    @Input()
    text: string;
    @Input()
    name: string;

    @Input()
    bindValue:string="";
    @Input()
    disabled:boolean;

    private onTouchedCallback = Function.prototype;
    private onChangeCallback = Function.prototype;
    get value (){
        return this._value;
    }
    set value(val) {
        console.log(val)
        if (val === this._value) {
            return
        }
        this._value = val;
        this.onChangeCallback(val);
    }


    constructor(private  utils: UtilService) {
        this.name = `eve-checkbox-${this.name || this.utils.guid()}`
    }

    ngOnInit() {

    }
    onBlur(){
        this.onTouchedCallback();
    }
    writeValue(val: any): void{
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
    fireUncheck(value:any){

    }
    setDisabledState?(isDisabled: boolean): void{

    }
}