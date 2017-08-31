/**
 * Created by Code1912 on 2016/10/14.
 */

import {EventService} from "./event.service";
import {LoadingService} from "./loading.service";
import {EveHttpService} from "./eve-http.service";
import {AuthService,UserInfo} from "./auth.service";
import {CookieService} from "./cookie.service";
import {AlertService} from "./alert.service";

export {
    AlertService, EventService, LoadingService, EveHttpService, AuthService, CookieService,UserInfo
}
export const ALL_SERVICES = [AlertService, EventService, LoadingService, EveHttpService, AuthService, CookieService]