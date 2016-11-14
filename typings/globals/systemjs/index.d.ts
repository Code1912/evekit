/**
 * Created by Code1912 on 2016/10/8.
 */
///<reference path="../core-js/index.d.ts"/>

interface  SystemJsStatic{
    import(path:any):Promise<any>;
    //System.import('build/systemjs.config.js').then(function() {
    //System.import('app').catch(function(err){ console.error(err); });
//});
}


declare  var    System: SystemJsStatic;