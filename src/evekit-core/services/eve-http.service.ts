/**
 * Created by Code1912 on 2016/10/14.
 */
import {Injectable} from "@angular/core"
import {
    Http, Headers, RequestOptions, Request, RequestOptionsArgs, Response,
    RequestMethod, URLSearchParams, ResponseContentType
} from "@angular/http"
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {EveLoadingService} from "./eve-loading.service";
import {EveAlertService} from "./eve-alert.service";

@Injectable({ providedIn: 'root' })
export class EveHttpService {
    constructor(private  http: Http,
                private  loadingService: EveLoadingService,
                private alertService: EveAlertService) {
        console.log("http service init")
    }

    private _count: number = 0;

    request(url: string | Request, options?: EveRequestOptions): Observable<Response> {
        let req = this.http.request(url, options);
        return this._intercept(req, options);
    }

    get(url: string, options ?: EveRequestOptions): Observable<Response> {
        return this._intercept(this.http.get(url, this._getRequestOptionArgs(options)), options);
    }

    post(url: string, body: any, options ?: EveRequestOptions): Observable<Response> {
        return this._intercept(this.http.post(url, body, this._getRequestOptionArgs(options)), options);
    }

    put(url: string, body: any, options ?: EveRequestOptions): Observable<Response> {
        return this._intercept(this.http.put(url, body, this._getRequestOptionArgs(options)), options);
    }

    delete(url: string, options ?: EveRequestOptions): Observable<Response> {
        return this._intercept(this.http.put(url, this._getRequestOptionArgs(options)), options);
    }

    private _getRequestOptionArgs(options ?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');

        // options.headers.append('Access-Control-Allow-Origin', '*');
        //  options.headers.append("Access-Control-Allow-Headers", "*");
        return options;
    }

    private _intercept(req: Observable<Response>, options?: EveRequestOptions): Observable<Response> {
        let that = this;
        if (!(options && options.hideLoading)) {
            this._showLoading();
        }
        req.subscribe(null, (error) => {
            let errMsg = (error.message) ? error.message :
                error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            that.alertService.error(errMsg, "Error");
            that._hideLoading();
            console.log(error);
        }, () => {
            that._hideLoading();
        });
        return req;
    }

    private _hideLoading() {
        this._count--;
        if (this._count <= 0) {
            this._count = 0;
            this.loadingService.hideLoading();
        }
    }

    private _showLoading() {
        this._count++;
        this.loadingService.showLoading();
    }

    private _handleError(status) {
        if (status === 0) {

        } else if (status === 404) {

        } else if (status === 500) {

        } else {

        }
    }
}

export interface EveRequestOptions extends RequestOptionsArgs {
    url?: string;
    method?: string | RequestMethod;
    search?: string | URLSearchParams;
    headers?: Headers;
    body?: any;
    withCredentials?: boolean;
    responseType?: ResponseContentType;
    hideLoading?: boolean;
}