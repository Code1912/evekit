/**
 * Created by Code1912 on 2016/10/14.
 */

import {EveEventService} from "./eve-event.service";
import {EveLoadingService} from "./eve-loading.service";
import {EveHttpService} from "./eve-http.service";
import {EveAuthService,UserInfo} from "./eve-auth.service";
import {EveCookieService} from "./eve-cookie.service";
import {EveAlertService} from "./eve-alert.service";
import {UtilService} from "./util.service";
import {EveMessengerService} from "./eve-messenger.service";
import {EveTranslateService} from'./eve-translate.service'

export {
    EveAlertService,
    EveEventService,
    EveLoadingService,
    EveHttpService,
    EveAuthService,
    EveCookieService,
    UserInfo,
    UtilService,
    EveMessengerService,
    EveTranslateService
}
export const ALL_SERVICES = [EveTranslateService ,EveAlertService, EveEventService, EveLoadingService, EveHttpService, EveAuthService, EveCookieService,UtilService,EveMessengerService]