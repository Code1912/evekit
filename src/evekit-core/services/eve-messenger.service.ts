import {Injectable} from '@angular/core';
const noop=Function.prototype;
@Injectable({ providedIn: 'root' })
export class EveMessengerService{

    private  mask:JQuery;
    private  index:number=0;
    private  confirmMaping:Map<number,Messenger>=new Map();
    private  defaults={
        message: '',
        type: 'error',
        showCloseButton: true
    };

    constructor() {
        this.mask=$("#defaultMask");

        Messenger.options = {
            extraClasses: 'messenger-fixed messenger-on-top',
            theme: 'flat'
        }
    }

    info(msg:string,showSeconds?:number){
       this._post(msg,"info",showSeconds);
    }

    error(msg:string,showSeconds?:number){
        this._post(msg,"error",showSeconds);
    }

    success(msg:string,showSeconds?:number){
        this._post(msg,"success",showSeconds);
    }

    warning(msg:string,showSeconds?:number){
        this._post(msg,"warning",showSeconds);
    }
    confirm(message:string,onOk?:Function,onCancel?:Function,onComplete?:Function,okText?:string,cancelText?:string){
        this.mask.show();
        Messenger().hideAll();
        let _this=this;
        let i=this.index+1;
        let events={
            "click button.messenger-close":()=>{
                _this.confirmMaping[i].hide();
                _this.confirmMaping.delete(i);
                _this.mask.hide()
            }
        }

        let actions={
            ok: {
                label: okText||"Ok",
                action:  ()=>{
                    (onOk||noop)();
                    (onComplete||noop)();
                    _this.confirmMaping[i].hide();
                    _this.confirmMaping.delete(i);
                    _this.mask.hide()
                }
            },
            cancel:{
                label: cancelText||"Cancel",
                action: ()=>{
                    (onCancel||noop)();
                    (onComplete||noop)();
                    _this.confirmMaping[i].hide();
                    _this.confirmMaping.delete(i);
                    _this.mask.hide();

                }
            }

        };
        this._post(message,"info",60*60,actions,events);
    }
    private  _post(message,type:string,hideAfter:number=5,actions?:any,events?:any) {
        this.index++;
        let messenger =  Messenger().post(Object.assign({}, this.defaults, {id:this.index,message, type, actions,events,hideAfter}))
        if (actions) {
            this.confirmMaping[this.index] = messenger;
        }
    }
}