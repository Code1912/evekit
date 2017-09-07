/**
 * Created by Code1912 on 2017/8/16.
 */
let webpack = require('webpack');
let WatchIgnorePlugin = require('watch-ignore-webpack-plugin')
//let HtmlWebpackPlugin = require('html-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let helpers = require('./helpers');
let args = helpers.args();
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
                    loaders: ['awesome-typescript-loader','angular2-template-loader'],
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    loaders: ['to-string-loader'].concat(ExtractTextPlugin.extract("css-loader")),
                    exclude: /node_modules/
                },
                {
                    test: /\.scss/,
                    loaders: ['to-string-loader'].concat(ExtractTextPlugin.extract("css-loader!sass-loader")),
                    exclude: /node_modules/
                },
                {
                    test: /\.sass/,
                    loaders: ['to-string-loader'].concat(ExtractTextPlugin.extract("css-loader!sass-loader")),
                    exclude: /node_modules/
                },
                {
                    test: /\.less/,
                    loaders: ['to-string-loader'].concat(ExtractTextPlugin.extract("css-loader!less-loader")),
                    exclude: /node_modules/
                },
                {
                    test: /\.styl/,
                    loaders: ['to-string-loader'].concat(ExtractTextPlugin.extract("css-loader!stylus-loader")),
                    exclude: /node_modules/
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader',
                    exclude: [helpers.root('src/index.html')]
                }
            ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new WatchIgnorePlugin([
            helpers.root( 'node_modules'),
          //  helpers.root( 'src'),
            helpers.root( 'build'),
            helpers.root( 'dist'),
        ]),
    ],
    externals: [{
        "jquery": "jQuery",
        "JQuery": "jQuery",
        "window.Messenger":"Messenger",
        "Messenger":"Messenger",
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
        if(/\.(css|sass|scss|less|styl)$/.test(request)){
         //   return callback(null, "return ''");
        }
        if (/^evekit\//.test(request)) {
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
if(args.minify){
    config.plugins.push(  new webpack.optimize.UglifyJsPlugin({
        mangle:{
            keep_fnames:true
        },
        compress:true
    }));
    config.plugins.push( new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        canPrint: true
    }));
}

module.exports = config;