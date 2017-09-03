/**
 * Created by Code1912 on 2016/10/14.
 */
import {AlertComponent} from "./alert/alert.component";
import {ConfirmComponent} from "./confirm/confirm.component";
import {EveWindowComponent} from "./window/window.component";
import {LoadingComponent} from "./loading/loading.component";
import {EChartComponent} from "./echart/echarts.component";
import {EveTabsComponent} from "./tabs/tabs";
import {EveTabComponent} from "./tabs/tab";
import {EveCheckboxComponent} from "./forms/eve-checkbox/eve-checkbox.component";

export * from "./alert/alert";
export * from "./window/eve.window";

export {
    EveTabsComponent,
    EveTabComponent,
    AlertComponent,
    ConfirmComponent,
    EveWindowComponent,
    LoadingComponent,
    EChartComponent,
    EveCheckboxComponent
}

export const ALL_COMPONENTS = [EveTabsComponent,
    EveTabComponent,
    AlertComponent,
    ConfirmComponent,
    EveWindowComponent,
    LoadingComponent,
    EChartComponent,
    EveCheckboxComponent];
 