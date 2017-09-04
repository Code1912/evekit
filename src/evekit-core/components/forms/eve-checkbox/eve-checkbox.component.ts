
import {Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider, ViewEncapsulation} from '@angular/core';
import {UtilService} from "../../../services/util.service";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

const EVE_CHECKBOX_VALUE_ACCESSOR =  {
    provide:NG_VALUE_ACCESSOR,
    useExisting:forwardRef(() => EveCheckboxComponent),
    multi:true
};

@Component({
    selector: 'eve-checkbox',
    templateUrl: 'eve-checkbox.component.html',
    encapsulation: ViewEncapsulation.None,
    providers:[EVE_CHECKBOX_VALUE_ACCESSOR],
    styleUrls:["eve-checkbox.component.styl"]
})
export class EveCheckboxComponent implements OnInit,  ControlValueAccessor {
    _value:boolean;
    @Input()
    text: string;
    @Input()
    name: string;

    @Input()
    disabled:boolean;

    private onTouchedCallback = Function.prototype;
    private onChangeCallback = Function.prototype;
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

    setDisabledState?(isDisabled: boolean): void{

    }
}