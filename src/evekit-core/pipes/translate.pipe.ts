import {Pipe,PipeTransform} from "@angular/core"
import {EveTranslateService} from "../services";
import {Observable, Subscription} from "rxjs";
import {EveEventService,EveHttpService} from "../services";
@Pipe({name:"translate",pure:false})
export class TranslatePipe implements PipeTransform{
    private markForTransform = true;
    private value: string;

    private changes:any;
    constructor(private  eventServcie:EveEventService,
                private  translateSevcie:EveTranslateService,
                private  httpService:EveHttpService) {
        console.log(11)
       this.changes= this.eventServcie.subscribe("translate",()=>{
           console.log("sdfsdf")
            this.changed()
        });
        console.log(this.changes)

    }

    changed(){
        this.markForTransform = true;
        console.log(this.value)
    }

    transform(value: any, ...args: any[]): any {
        if (!this.markForTransform) {
            return this.value;
        }
        this.value = this.translateSevcie.getValue(EveTranslateService.lang,value);
        this.markForTransform = false;
        return this.value;
    }
    ngOnDestroy() {
        if(this.changes)

        {    console.log(this.changes.unsubscribe())

        }

    }

}