/**
 * Created by Code1912 on 2017/8/16.
 */
let webpackConfig=require("./webpack.common.js");
let _=require("lodash");
let config = Object.assign({},webpackConfig);
config=_.merge(config,{
    entry:{  'core': './src/core/index.ts'},
});
module.exports=config;