/**
 * Created by Code1912 on 2016/10/19.
 */
import {Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {WeatherService} from "./weather-service";
import {EveWindowComponent, EveWindowOptions} from "eve/components";
import {EveChart} from "eve/directives";


@Component({
    selector: 'div[query]',
    templateUrl: 'query.component.html'
})
export class QueryComponent implements OnInit {
    windowOptions: EveWindowOptions;

    @ViewChild(EveWindowComponent)
    editWindow: EveWindowComponent;
    @ViewChild(EveChart)
    chart: EveChart;
    info: any = {};

    selectedItem: any = {};

    constructor(private  service: WeatherService) {
    }

    ngOnInit() {
        this.doRefresh();
        this.windowOptions = new EveWindowOptions();
        this.windowOptions.height = 270;
        this.windowOptions.width = 600;
        this.windowOptions.title = "Edit Weather";
        this.chart.setOption({
            backgroundColor: '#2c343c',
            title: {
                text: 'Customized Pie',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },

            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series : [
                {
                    name:'访问来源',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:274, name:'联盟广告'},
                        {value:235, name:'视频广告'},
                        {value:400, name:'搜索引擎'}
                    ].sort(function (a, b) { return a.value - b.value}),
                    roseType: 'angle',
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#3c8dbc',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        })
    }

    doRefresh() {

        this.service.getWeather().subscribe(res=> {
            console.log(res);
            this.info = res.result;
        })
    }

    doEdit(item) {
        this.selectedItem = Object.assign({}, item);
        this.editWindow.eveWindow.center().open()
    }

    onEdit(val) {
        var item = this.info.weather_data.find(p=>p.day === val.day);
        item.weather = val.weather;
        this.editWindow.eveWindow.close();
    }
}
class WeatherInfo{
    "city": string;
    "cityid":  string;
    "temp":  string;
    "WD": string;
    "WS":  string;
    "SD":  string;
    "WSE":  string;
    "time":  string;
    "isRadar":  string;
    "Radar":  string;
    "njd":  string;
    "qy":  string;
    "rain":  string;
}