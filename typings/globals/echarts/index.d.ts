/**
 * Created by Code1912 on 2016/11/14.
 */
  interface Window extends EventTarget, WindowTimers, WindowSessionStorage, WindowLocalStorage, WindowConsole, GlobalEventHandlers, IDBEnvironment, WindowBase64{

    echarts: {
        init(dom: HTMLDivElement|HTMLCanvasElement, theme?: Object|string, opts?: {
            devicePixelRatio?: number,
            renderer?: string,
            width?: number|string,
            height?: number|string
        }): ECharts,
        getInstanceByDom(target: HTMLDivElement|HTMLCanvasElement) :ECharts,
        registerMap(mapName: string, geoJson: Object, specialAreas?: Object),
        getMap(mapName: string): Object,
        registerTheme(themeName: string, theme: Object),
        connect(group:string|Array<any>),
        disConnect(group:string),
        dispose(target: ECharts|HTMLDivElement|HTMLCanvasElement)
    }

}

interface  ECharts {
    setOption(option: Object, notMerge?: boolean, lazyUpdate?: boolean);
}