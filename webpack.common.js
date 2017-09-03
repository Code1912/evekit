/**
 * Created by Code1912 on 2017/8/16.
 */
let webpack = require('webpack');
let WatchIgnorePlugin = require('watch-ignore-webpack-plugin')
//let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let helpers = require('./helpers');

let config = {
    output: {
        path: helpers.root('dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
        chunkFilename: "[id].js",
        library: ["evekit", "[name]"],
        umdNamedDefine: true
    },
    entry: {
        //  'evekit[evekit-core]': './src/index.ts'
        //  'kendomodule': './src/evekit-core/kendomodule.ts',
        //  'wijmomodule':'./src/evekit-core/wijmo.module.ts'
    },
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            //   '@wijmo.module':helpers.root("src","evekit-core/wijmo.module"),
        }
    },
    module: {
        loaders:
            [
                {
                    test: /\.ts$/,
                    loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    loaders: ExtractTextPlugin.extract("to-string-loader!css-loader"),
                    exclude: /node_modules/
                },
                {
                    test: /\.scss/,
                    loaders: ExtractTextPlugin.extract("to-string-loader!css-loader!sass-loader"),
                    exclude: /node_modules/
                },
                {
                    test: /\.sass/,
                    loaders: ExtractTextPlugin.extract("to-string-loader!css-loader!sass-loader"),
                    exclude: /node_modules/
                },
                {
                    test: /\.less/,
                    loaders: ExtractTextPlugin.extract("to-string-loader!css-loader!less-loader"),
                    exclude: /node_modules/
                },
                {
                    test: /\.styl/,
                    loaders: ExtractTextPlugin.extract("to-string-loader!css-loader!stylus-loader"),
                    exclude: /node_modules/
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader',
                    exclude: /node_modules/
                }
            ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new WatchIgnorePlugin([
            helpers.root( 'node_modules'),
        ]),
    ],
    externals: [{
        "jquery": "jQuery",
        "JQuery": "jQuery",
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
        "@angular/platform-browser/animations": "ng.platformBrowser.animations",
        '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
        "evekit/core": "evekit.evekit-core"
    }, function (context, request, callback) {
        if (request.indexOf('evekit/') === 0) {
            let key = request.split('/')[1];
            return callback(null, `var evekit['${key}']`);
        }
        callback();
    }],
    watchOptions: {
        aggregateTimeout: 300,
        ignored: /node_modules/
    }
};
(function () {
    for (let key in config.externals[0]) {
        let array = config.externals[0][key].split(".");
        if (array.length > 1) {
            //   console.log(key,array)
            config.externals[0][key] = array;
        }
        let oldValue = config.externals[0][key];
        config.externals[0][key] = {
            commonjs2: key,
            commonjs: key,
            amd:key,
            umd:oldValue,
            root: oldValue
        }
    }

})();
module.exports = config;