/**
 * Created by Code1912 on 2016/11/14.
 */
import {  ElementRef,  Input,  Component} from '@angular/core';

@Component({
    selector: '[evechart]',
    template: "<div></div>"
})
export class EveChartComponent {
    @Input()
    chartOption?: any;

    @Input()
    notMerge?: boolean;

    @Input()
    lazyUpdate?: any;

    private _chart: ECharts;

    constructor(private  eleRef: ElementRef) {
        this._chart = window.echarts.init(eleRef.nativeElement);
        if (this.chartOption) {
            this._chart.setOption(this.chartOption, this.notMerge, this.lazyUpdate);
        }
    }

    get chart(): ECharts {
        return this._chart;
    }

    setOption(option: any, notMerge?: boolean, lazyUpdate?: boolean) {
        if (!option) {
            throw  new Error("option is null")
        }
        this.chartOption = option;
        this.notMerge = notMerge;
        this.lazyUpdate = lazyUpdate;
        this._chart.setOption(this.chartOption, notMerge, lazyUpdate);
    }
}