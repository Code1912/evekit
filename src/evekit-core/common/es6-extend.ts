interface  Date{
    addHours(h:number);
    addMinutes(m:number);
    format(str):string
}

interface String{
    trim():string;
}

interface Array<T> {
    clear();
    removeItem(item:T)
    removeByIndex(index:number);
    removeAll(fn:(t:T)=>boolean);
}

(function(){
    if(window["es6.extend.loaded"]){
        return;
    }
    window["es6.extend.loaded"]=true;
    Date.prototype.addHours= function(h:number) {
        this.setTime(this.getTime() + (h*60*60*1000));
        return this;
    } ;
    Date.prototype.addMinutes= function(m:number) {
        this.setTime(this.getTime() + (m*60*1000));
        return this;
    } ;
    Date.prototype.format=function(fmt:string="yyyy-MM-dd hh:mm:ss"):string {
        let date=this;
        if(!date){
            return date;
        }
        if (fmt === undefined || fmt === "" || fmt === null) {
            fmt = "yyyy-MM-dd hh:mm:ss";
        }

        let o = {
            "M+": date.getMonth() + 1,                 //月份
            "d+": date.getDate(),                    //日
            "h+": date.getHours(),                   //小时
            "m+": date.getMinutes(),                 //分
            "s+": date.getSeconds(),                 //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    if(!String.prototype.trim){
        String.prototype.trim=function () {
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')||"";
        }
    }
    Array.prototype.clear=function () {
        this.splice(0,this.length);
    };
    Array.prototype.removeByIndex= function(index:number) {
        this.splice(index,1);
    };
    Array.prototype.removeAll= function(fn:(t:any)=>boolean) {
        let items = this.filter(fn);
        let that=this;
        items.forEach(function (item) {
            let index = that.indexOf(item);
            this.removeByIndex(index);
        })
    };
    Array.prototype.removeItem=function (item: any) {
        let index = this.indexOf(item);
        this.removeByIndex(index);
    }
})();