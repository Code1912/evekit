///<reference path="../../../../../node_modules/@angular/forms/src/directives/control_value_accessor.d.ts"/>
import {Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider} from '@angular/core';
import {UtilService} from "../../../services/util.service";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
const EVE_CHECKBOX_VALUE_ACCESSOR =  {
    provide:NG_VALUE_ACCESSOR,
    useExisting:forwardRef(() => EveCheckboxComponent),
    multi:true
};
const noop = () => {
};

@Component({
    selector: 'eve-checkbox',
    templateUrl: 'eve-checkbox.component.html',
    providers:[EVE_CHECKBOX_VALUE_ACCESSOR]
})
export class EveCheckboxComponent implements OnInit,  ControlValueAccessor {
    _value:boolean;
    @Input()
    text: string;
    @Input()
    name: string;

    @Input()
    disabled:boolean;

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
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
    }

    ngOnInit() {
        this.name = `eve-checkbox-${this.name || this.utils.guid()}`
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