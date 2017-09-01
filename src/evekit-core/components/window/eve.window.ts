/**
 * Created by Code1912 on 2016/10/13.
 */

export  class  EveWindow{
    private  options:EveWindowOptions;
    private element:JQuery;
    constructor(ele:HTMLElement,Options:EveWindowOptions){
        this.options=Options;
        this.element=$(ele).modal("hide");
        this.init();
    }
   public open(){
        this.element.modal("show");
        if (this.options.center) {
            this.centerWin();
        }
        return this;
    }
    public center() {
        this.centerWin();
        return this;
    }
    public close(){
        this.element.modal("hide");
        return this;
    }
    public setOptions(options:EveWindowOptions){
        if(!options){
            return;
        }
        if(options.height){
            this.options.height=options.height;
            this.element.find(".modal-content").css({"height": this.options.height?this.options.height:"auto"});
        }
        if(options.width){
            this.options.width=options.width;
            this.element.find(".modal-content").css({"height": this.options.height?this.options.height:"auto"});
        }
        if(options.title){
            this.options.title=options.title;
        }
    }
    private  init(){
        this.element.drags({handle: ".modal-header"});
        var $modal_content = this.element.find(".modal-content");
        $modal_content.css({"height": this.options.height?this.options.height:"auto"});
        $modal_content.css({"width": this.options.width?this.options.width:"auto"});
        this.element.find(".modal-body").css({"height": this.options.height?this.options.height-56:"auto"});
    }
    private  centerWin () {
        var $modal_content = this.element.find(".modal-content");
        $modal_content.css({
            "margin": $("body").height() / 2 - $modal_content.height() / 2 - 10 + "px auto",
            "top": "",
            "left": ""
        });
    }
}
export  class  EveWindowOptions{
    title:string;
    height:number;
    width:number;
    center:boolean
}
