/**
 * Created by Code1912 on 2016/10/15.
 */
import {OnInit, Directive, Renderer, ElementRef, Input, HostListener, Output, EventEmitter} from '@angular/core';

@Directive({
    selector: '[shortcuts]'
})
export class ShortcutDirective implements OnInit {
    @Input()
    shortcuts: string;

    @Output()
    shortcutEvent: EventEmitter<KeyboardEvent>=new EventEmitter<KeyboardEvent>();

    constructor(private renderer: Renderer, private  element: ElementRef) {

    }

    ngOnInit() {
    }

    @HostListener("keydown")
    onKeyDown($event:KeyboardEvent) {
        if (!this.shortcuts) {
            return;
        }
        let shortcutArray = (this.shortcuts||"").toString().split("|");
        let ret = shortcutArray.some(p=> {
             return this.checkKeys(p,$event||<KeyboardEvent>window.event);
        });
        if (!ret) {
            return;
        }
        this.shortcutEvent.emit($event||<KeyboardEvent>window.event);
    };

    private checkKeys(shortcut:string,$event:KeyboardEvent):boolean{
        let keyCode=$event.key.toLowerCase();
        let tempKeys=shortcut.split("+");
        if(tempKeys[tempKeys.length-1].toLocaleLowerCase()!==keyCode){
            return   false;
        }
        if(tempKeys.length==1){
            return  true;
        }
        if(tempKeys.length==2){
            if(tempKeys[0]=="ctrl"&& $event.ctrlKey){
                return true;
            }
            if(tempKeys[1]=="shift"&& $event.shiftKey){
                return true;
            }
            if(tempKeys[1]=="alt"&& $event.altKey){
                return true;
            }
            return false;
        }
        return false;
    }
}