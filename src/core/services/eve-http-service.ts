/**
 * Created by Code1912 on 2016/10/14.
 */
import {Injectable} from "@angular/core"
import {
    Http, Headers, ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response,
    RequestMethod, URLSearchParams, ResponseContentType
} from "@angular/http"
import {Observable} from "rxjs/Observable";
import {LoadingService,AlertService} from "eve/services"
import {count} from "rxjs/operator/count";
@Injectable()
export class EveHttpService extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions,private  loadingService:LoadingService,private alertService:AlertService) {
        super(backend, defaultOptions);
    }

    private  count:number=0;
    request(url: string | Request, options?: EveRequestOptions): Observable<Response> {
        var req= super.request(url, options) ;
        return  this.intercept(req,options);
    }
    get(url: string, options ? : EveRequestOptions): Observable < Response > {
        return this.intercept(super.get(url, this.getRequestOptionArgs(options)),options);
    }
    post(url: string, body: any, options ? : EveRequestOptions): Observable < Response > {
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)),options);
    }
    put(url: string, body: any, options ? : EveRequestOptions): Observable < Response > {
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)),options);
    }
    delete(url: string, options ? : EveRequestOptions): Observable < Response > {
        return this.intercept(super.put(url, this.getRequestOptionArgs(options)),options);
    }
    getRequestOptionArgs(options ? : RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
      //  options.headers.append('Content-Type', 'application/json');
       // options.headers.append('Access-Control-Allow-Origin', '*');
      //  options.headers.append("Access-Control-Allow-Headers", "*");
        return options;
    }
    intercept(req: Observable < Response > ,options?: EveRequestOptions): Observable < Response > {
        let that=this;
        if(!(options&&options.hideLoading)) {
            this.showLoading();
        }
        req.subscribe(null,(error)=>{
            let errMsg = (error.message) ? error.message :
                error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            that.alertService.error(errMsg,"Error");
            that.hideLoading();
            console.log(error);
        },()=>{
            that.hideLoading();
        });
        req.catch((error: any)=> {
            let errMsg = (error.message) ? error.message :
                error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            that.hideLoading();
            that.alertService.error(errMsg,"Error");
            return Observable.throw(errMsg);
        });
        return req;
    }
    private  hideLoading() {
        this.count--;
        if (this.count <= 0) {
            this.count=0;
            this.loadingService.hideLoading.apply(this.loadingService);
        }
    }
    private  showLoading(){
        this.count++;
        this.loadingService.showLoading.apply(this.loadingService);
    }
    handleError(status) {
        if (status === 0) {

        } else if (status === 404) {

        } else if (status === 500) {

        } else {

        }
    }

}
export  interface EveRequestOptions extends RequestOptionsArgs{
    url?: string;
    method?: string | RequestMethod;
    search?: string | URLSearchParams;
    headers?: Headers;
    body?: any;
    withCredentials?: boolean;
    responseType?: ResponseContentType;
    hideLoading?:boolean;
}