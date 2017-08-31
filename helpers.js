/**
 * Created by Code1912 on 2017/8/16.
 */
let path = require('path');
let _root = path.resolve(__dirname);
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args)) ;
}
function formatWebpackExternals(externals) {
    for(let key in  externals){
        let array= externals[key].split(".");
        if(array.length>1){
            //   console.log(key,array)
             externals[key]= array;
        }
        let oldValue= externals[key];
        externals[key]={
            commonjs2:oldValue,
            commonjs:oldValue,
            amd:oldValue,
            umd:oldValue,
            root:oldValue
        }
    }
    return externals;
}
exports.root = root;
exports.formatWebpackExternals = formatWebpackExternals;
