/**
 * Created by Code1912 on 2016/10/14.
 */
import {EveAlertComponent} from "./ui-elemnts/alert/alert.component";
import {EveConfirmComponent} from "./ui-elemnts/confirm/confirm.component";
import {EveWindowComponent} from "./ui-elemnts/window/window.component";
import {LoadingComponent} from "./ui-elemnts/loading/loading.component";
import {EveChartComponent} from "./ui-elemnts/echart/echarts.component";
import {EveTabsComponent} from "./ui-elemnts/tabs/tabs";
import {EveTabComponent} from "./ui-elemnts/tabs/tab";
import {EveCheckboxComponent} from "./forms/eve-checkbox/eve-checkbox.component";

export * from "./ui-elemnts/alert/alert";
export * from "./ui-elemnts/window/eve.window";

export {
    EveTabsComponent,
    EveTabComponent,
    EveAlertComponent,
    EveConfirmComponent,
    EveWindowComponent,
    LoadingComponent,
    EveChartComponent,
    EveCheckboxComponent
}

export const ALL_COMPONENTS = [EveTabsComponent,
    EveTabComponent,
    EveAlertComponent,
    EveConfirmComponent,
    EveWindowComponent,
    LoadingComponent,
    EveChartComponent,
    EveCheckboxComponent];
 