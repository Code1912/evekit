/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/3 (́>◞౪◟<‵)ﾉｼ
 */
'use strict';

let through=require("through2")
//console.log(args)
let ts = require("gulp-typescript");
let exec = require('child_process').exec;
let gutil = require("gulp-util");
let colors = require('colors');
let gulp = require("gulp4");
let webpack = require('webpack');
let webpackConfig = require("./webpack.common.js");
let uglify = require("gulp-uglify");
let concat = require("gulp-concat");
let watch = require('gulp-watch');
let fs = require("fs");
let historyApiFallback = require('connect-history-api-fallback');
//let compress=require('compression');
let cssmin = require('gulp-minify-css');
let browserSync = require("browser-sync");
let addsrc = require('gulp-add-src');
let del = require("del");
let logger = require('gulp-logger');
let helpers = require('./helpers');
let args = helpers.args();
// import embedTemplates   from  'gulp-angular-embed-templates';
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'red',
    info: 'green',
    data: 'blue',
    help: 'cyan',
    warn: 'yellow',
    debug: 'magenta',
    error: 'red'
});
let modules = [];

function handleError(err, stats, done) {
    if (err) {
        gutil.log('webpack: compilation error', err);
    } else {
        Object.keys(stats.compilation.assets).forEach(function (key) {
            gutil.log('webpack: output ', gutil.colors.green(key));
        });
    }
    if (stats.compilation.errors && stats.compilation.errors.length) {
        gutil.log('webpack:', stats.compilation.errors);
    }
    if (done) {
        done();
    }
}

(function readModule() {
    var dirList = fs.readdirSync("src/modules");
    dirList.forEach(function (item) {
        if (item.indexOf(".") > -1) {
            return;
        }
        modules.push(item);
    });
})();
let assetJS = ["./src/assets/js/jQuery/jquery-3.1.1.js",
    "./src/assets/js/echarts/echarts.min.js",
    "./src/assets/js/bootstrap/bootstrap.js",
    "./src/assets/js/extend/extend.js",
    "./src/assets/js/slimscroll/jquery.slimscroll.js",
    "./src/assets/js/adminLTE/app.js",
    "./node_modules/core-js/client/shim.min.js",
    "./node_modules/zone.js/dist/zone.js",
    "./node_modules/rxjs/bundles/Rx.js",
    "./node_modules/reflect-metadata/Reflect.js",
    "src/assets/plugins/messenger/js/messenger.js",
    "src/assets/plugins/messenger/js/messenger-theme-flat.js",
    "./node_modules/@angular/core/bundles/core.umd.js",
    "./node_modules/@angular/compiler/bundles/compiler.umd.js",
    "./node_modules/@angular/common/bundles/common.umd.js",
    "./node_modules/@angular/platform-browser/bundles/platform-browser.umd.js",
    "./node_modules/@angular/forms/bundles/forms.umd.js",
    "./node_modules/@angular/http/bundles/http.umd.js",
    "./node_modules/@angular/animations/bundles/animations.umd.js",
    "./node_modules/@angular/animations/bundles/animations-browser.umd.js",

    "./node_modules/@angular/platform-browser/bundles/platform-browser-animations.umd.js",
    "./node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
    "./node_modules/@angular/router/bundles/router.umd.js"];
let reload = browserSync.reload;
let assetCss = [
    "src/assets/css/bootstrap.min.css",
    "src/assets/css/font-awesome.min.css",
    "src/assets/css/AdminLTE.min.css",
    "src/assets/css/_all-skins.min.css",
    "src/assets/plugins/messenger/css/messenger.css",
    "src/assets/plugins/messenger/css/messenger-spinner.css",
    "src/assets/plugins/messenger/css/messenger-theme-flat.css"
];


gulp.task('clean', (done) =>
    del(['./dist/'], done)
);

function minifyJS(gulpStream) {
    if(args.minify){
        return gulpStream.pipe(uglify({mangle:false}))
    }
    return gulpStream;
}
function minifyCSS(gulpStream) {
    if(args.minify){
        return gulpStream.pipe(cssmin())
    }
    return gulpStream;
}


gulp.task("utility:js", function () {
    return minifyJS(gulp.src(assetJS)
        .pipe(concat("asset.js")))
        .pipe(gulp.dest('dist/assets/js'));
});

gulp.task("utility:css", function () {
    return minifyCSS(gulp.src(assetCss)
        .pipe(concat("asset.css")))
        .pipe(gulp.dest('dist/assets/css'));
});
gulp.task("utility:fonts", function () {
    return gulp.src("src/assets/fonts/*.*")
        .pipe(gulp.dest('dist/assets/fonts'));
});
gulp.task("utility:img", function () {
    return gulp.src("src/assets/img/**/*")
        .pipe(gulp.dest('dist/assets/img'));
});
gulp.task("utility:html", function () {
    return gulp.src(["src/**/*.html", "!src/modules/**/*.html", "!src/evekit-core/**/*.html"])
        .pipe(gulp.dest('dist'));
});
gulp.task('utility', function (done) {
    //, "utility:fonts", "utility:img", "utility:html"
    return gulp.series("clean", gulp.parallel(["utility:js", "utility:css", "utility:fonts", "utility:img", "utility:html"]))(done);
});

function buildModuleTask(moduleName) {
    let taskName = `build:evekit[${moduleName}]`;
    gulp.src([`src/modules/${moduleName}/resources/**/*`, `!src/modules/${moduleName}/**/*.js`])
        .pipe(gulp.dest('dist/assets/img'));
    gulp.task(taskName, function (done) {
        let config = Object.create(webpackConfig);
        let key = `evekit[${moduleName}]`;
        config.entry[`${moduleName}`] = `./src/modules/${moduleName}/index.ts`;
        config.output.path=helpers.root("dist","modules");
        config.watch = args.env === "dev";
        webpackCompile(config, done);
    });
    return taskName;
}

gulp.task("build:modules", function (done) {
    let tasks = modules.map(buildModuleTask);
    return gulp.parallel(tasks)(done);
});
gulp.task("dts:evekit-core", function () {
    return dts("evekit-core")
        .pipe(through.obj(function (chunk, enc, cb) {
       fs.writeFileSync( "./node_modules/@types/evekit/index.d.ts" ,"export * from './core'","utf-8");
      cb(null, chunk)
      }));
});

function dts(module) {
    let src=`./src/modules/${module}/**/*.ts`;
    let dest =`./node_modules/@types/evekit/${module}`;
    if (module === "evekit-core") {
        src=`./src/evekit-core/**/*.ts`;
        dest = `./node_modules/@types/evekit/core`;
    }
    let tsProject = ts.createProject('tsconfig.json', {
        outDir: dest,
        declaration: true,
        removeComments:args.env==="prd"
    });
    let tsResult = gulp.src([src]) // or tsProject.src()
        .pipe(tsProject());
    return tsResult.pipe(gulp.dest(dest));
}

gulp.task("build:evekit-core", (done) => {
    let config = Object.assign({}, webpackConfig);
    config.entry = {
        'evekit-core': './src/evekit-core/index.ts',
    };
    webpackCompile(config, done);
});

function webpackCompile(config, done) {
    config.watch = args.env === "dev";
    /*config.module.loaders[0].loaders=  config.module.loaders[0].loaders.map(p=>{
       return `${p}?configFileName=tsconfig.${args.env}.json`;
    })*/
    if (config.watch) {
        webpack(config).watch(300, function (err, stats) {
            handleError(err, stats)
            if(config.entry["evekit-core"]){
                dts("evekit-core")
            }
            reload();
        });
        done();
    }
    else {
        webpack(config, (err, stats) => {
            handleError(err, stats);
            reload();
            done();
        });
    }
}

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./dist",
            ghostMode: false,
            middleware: [historyApiFallback()]
        }
    });
    //  gulp.run("watch");
});
gulp.task("serve", done => {
    let cmdStr = 'node serve/server';
    exec(cmdStr, function (err, stdout, stderr) {
        if (err) {
            console.log(err);
        }
    });
    console.log("--------------run serve--------------".blue)
    done();
});
gulp.task('default', function (done) {
    return gulp.series("serve","build", "browser-sync")(done);
});
gulp.task('build', function (done) {
    return gulp.series("clean", "utility","dts:evekit-core", "build:evekit-core",  "build:modules")(done);
});


gulp.task("dts", done => {
});