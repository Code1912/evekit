/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/1 (́>◞౪◟<‵)ﾉｼ
 */
const menuConfig:Array<Menu>=[
    {
        name: "dashboard",
        path: "",
        children: [],
        active:false,
        icon:"table"
    },
    {
        name:"404Error",
        path:"system/404",
        children:[{     name:"404ErrorChildren",
            path:"system/404/ssss",
            children:[]    ,
            active:false,
            icon:"save"}]    ,
        active:false,
        icon:"save"
    },
    {
        name:"store-maintain/feedback",
        path:"store-maintain/feedback/query",
        children:[],
        active:false,
        icon:"th"
    },
    
    {
        name:"weather",
        path:"weather/query",
        children:[],
        active:false,
        icon:"th"
    }];

export const MenuConfig=menuConfig;
export class  Menu {
    constructor(){
        this.active=false;
        this.icon="dashboard"
    }
    name: string;
    path: string;
    children: Array<Menu>;
    active:boolean;
    icon:string;
}