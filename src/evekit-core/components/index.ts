/**
 * Created by Code1912 on 2016/10/14.
 */
import {EveAlertComponent} from "./ui-elemnts/alert/alert.component";
import {EveConfirmComponent} from "./ui-elemnts/confirm/confirm.component";
import {LoadingComponent} from "./ui-elemnts/loading/loading.component";
import {EveChartComponent} from "./ui-elemnts/echart/echarts.component";
import {EveTabsComponent} from "./ui-elemnts/tabs/tabs";
import {EveTabComponent} from "./ui-elemnts/tabs/tab";
import {EveCheckboxComponent} from "./forms/eve-checkbox/eve-checkbox.component";
import {EveModalComponent} from "./ui-elemnts/modal/eve-modal.component";
import {EveDateTimeComponent} from "./forms/eve-datatiempicker/eve-date-time.component";

export * from "./ui-elemnts/alert/alert";


export {
    EveTabsComponent,
    EveTabComponent,
    EveAlertComponent,
    EveConfirmComponent,
    EveModalComponent,
    LoadingComponent,
    EveChartComponent,
    EveCheckboxComponent,
    EveDateTimeComponent
}

export const ALL_COMPONENTS = [EveTabsComponent,
    EveTabComponent,
    EveAlertComponent,
    EveConfirmComponent,
    EveModalComponent,
    LoadingComponent,
    EveChartComponent,
    EveCheckboxComponent,
    EveDateTimeComponent];
$.datetimepicker.setLocale("zh");
 