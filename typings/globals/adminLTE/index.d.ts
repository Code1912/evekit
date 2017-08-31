/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/3 (́>◞౪◟<‵)ﾉｼ
 */
/// <reference path="../../../node_modules/@types/jquery/index.d.ts" />
interface  AdminLTEStatic{

    layout:{
        fix:Function,
        fixSidebar:Function,
    }
    load();

}

interface JQueryStatic {

    AdminLTE?: AdminLTEStatic;

}
interface JQuery{
    drags(...args: any[]):JQuery;
}