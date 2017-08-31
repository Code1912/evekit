/**
 * Created by Code1912 on 2017/8/16.
 */
let webpack = require('webpack');
//let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let helpers = require('./helpers');

let config= {
    output: {
        path: helpers.root('dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
        chunkFilename:"[id].js",
        library: ["evekit","[name]"],
        umdNamedDefine: true
    },
    entry: {
      //  'evekit[core]': './src/index.ts'
        //  'kendomodule': './src/core/kendomodule.ts',
        //  'wijmomodule':'./src/core/wijmo.module.ts'
    },
    resolve: {
        extensions: [ '.js', '.ts'],
        alias:{
            //   '@wijmo.module':helpers.root("src","core/wijmo.module"),
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.css$/,
                loaders: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ],
    externals: {
        "jquery": "jQuery",
        "JQuery":"jQuery",
        "$": "jQuery",
        'rxjs': 'Rx',
        '@angular/common': 'ng.common',
        '@angular/compiler': 'ng.compiler',
        '@angular/core': 'ng.core',
        '@angular/http': 'ng.http',
        '@angular/router': 'ng.router',
        '@angular/forms': 'ng.forms',
        '@angular/animations': 'ng.animations',
        '@angular/animations/browser': 'ng.animations.browser',
        '@angular/platform-browser': 'ng.platformBrowser',
        "@angular/platform-browser/animations":"ng.platformBrowser.animations",
        '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
        "evekit/core":"evekit.core"
    },
    watchOptions:{
        aggregateTimeout: 300,
    }
};
(function () {
    for(let key in config.externals){
        let array=config.externals[key].split(".");
        if(array.length>1){
         //   console.log(key,array)
            config.externals[key]=array;
        }
        let oldValue= config.externals[key];
        config.externals[key]={
            commonjs2:key,
            commonjs:key,
            amd:key,
            umd:oldValue,
            root:oldValue
        }
    }

})();
module.exports = config;