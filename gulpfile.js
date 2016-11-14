/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/3 (́>◞౪◟<‵)ﾉｼ
 */

let colors = require('colors');  
let gulp=require("gulp");
let uglify=require("gulp-uglify");
let notify=require("gulp-notify");
let concat=require("gulp-concat");
let watch=require('gulp-watch');
let fs=require("fs"); 
let historyApiFallback= require('connect-history-api-fallback');
//let compress=require('compression');
let cssmin = require('gulp-minify-css');
let browserSync=require("browser-sync");
let tsc = require('gulp-typescript'); 
let addsrc = require('gulp-add-src');
let systemjsBuilder = require('systemjs-builder');
let runSequence=require('gulp-run-sequence');
let del=require("del");
var embedTemplates = require('gulp-angular-embed-templates');
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
var modules=[];

(function readModule() {
    var dirList =  fs.readdirSync("src/modules");
    dirList.forEach(function (item) {
        if (item.indexOf(".")>-1) {
            return;
        } 
         modules.push(item); 
    });
})();
let assetJS=["./src/assets/js/jQuery/jquery-3.1.1.js",
    "./src/assets/js/echarts/echarts.min.js"
    ,"./src/assets/js/bootstrap/bootstrap.js"
    ,"./src/assets/js/extend/extend.js"
    ,"./src/assets/js/slimscroll/jquery.slimscroll.js"
    ,"./src/assets/js/adminLTE/app.js"
    ,"node_modules/core-js/client/shim.min.js"
    ,"node_modules/zone.js/dist/zone.js"
    ,"node_modules/reflect-metadata/Reflect.js"
    ,"node_modules/systemjs/dist/system.src.js"];
let   reload   = browserSync.reload;
var assetCss= [
        "src/assets/css/bootstrap.min.css",
        "src/assets/css/font-awesome.min.css",
        "src/assets/css/AdminLTE.min.css",
        "src/assets/css/_all-skins.min.css"

];
gulp.task('clean', (callback)=>
    del(['./dist/',"./build/"], callback)
);
gulp.task('clean:build', (callback)=>
    del(["./build/"], callback)
);
gulp.task('dist-config', function() {
  return gulp.src('systemjs.config.js')
    .pipe(gulp.dest('build'));
});
gulp.task('tsc', function () { 
    return gulp.src(['src/**/*.ts', 'typings/index.d.ts'])
    .pipe(embedTemplates({sourceType:'ts'}))
    .pipe(tsc( tsc.createProject('tsconfig.json')))
    .js.pipe(gulp.dest('build')); 
});
gulp.task('bundle:app', ["dist-config"],function () {
    var builder = new systemjsBuilder('', 'systemjs.config.js');
    builder.config = {
        meta: {
            'build/modules/**/*': {build: false}
        }
    };
    return builder
        .bundle('[build/**/*] - [build/modules/**/*]  ', 'dist/assets/app.bundle.js', {
            minify: false,
            mangle: false,
            sourceMaps: false,
            encodeNames:false
        })
        .then(function () {
            console.log('Build app complete'.info);
        })
        .catch(function (err) {
            console.log('Build app error'.error);
            console.log(err);
        });
});
gulp.task('bundle:angular2', function() {
  var builder = new systemjsBuilder('', './systemjs.config.js');
  return builder
      .bundle('build/**/* - [build/**/*.js]', 'dist/assets/angular2.bundle.js', {
          minify: false,
          mangle: false
      })
      .then(function() {
          console.log('Build angular2 complete'.info);
      })
      .catch(function(err) {
          console.log('Build angular2 error'.error);
          console.log(err);
      });

  });
gulp.task("bundle:modules",function (callback) {
    var tasks=[];
    modules.forEach(p=>{
        tasks.push(`bundle:${p}`);
        gulp.task(`bundle:${p}`,function () {
            var builder = new systemjsBuilder('', 'systemjs.config.js');
            builder.config = {
                meta: {
                    'build/modues/**/*': {build: false}
                }
            };
            return builder
                .bundle(`[build/modules/${p}/**/*]`, `dist/modules/${p}/${p}.bundle.js`, {
                    minify: false,
                    mangle: false
                })
                .then(function () {
                    console.log(`Build ${p} complete`.info);
                })
                .catch(function (err) {
                    console.log(`Build ${p} error`.error);
                    console.log(err);
                });
        });
    });
    runSequence(tasks,callback)
});

gulp.task("bundle:css",function (callback) {
    var tasks=[];
    modules.forEach(p=>{
        tasks.push(`bundle:${p}css`);
        gulp.task(`bundle:${p}css`,function () {
            return  gulp.src(`src/modules/${p}/**/*.css`)
                .pipe(concat(`${p}.bundle.css`))
                .pipe(gulp.dest(`dist/modules/${p}/`));
        });
    });
    tasks.push("bundle:appcss")
    gulp.task(`bundle:appcss`,function () {
        return  gulp.src(`src/core/**/*.css`)
            .pipe(concat(`app.bundle.css`))
            .pipe(gulp.dest(`dist/assets`));
    });
    runSequence(tasks,callback)
});

gulp.task("utility:js",function(){
    return gulp.src(assetJS)
    .pipe(concat("asset.js"))
    .pipe(gulp.dest('dist/assets/js'));
});

gulp.task("utility:css",function(){
    return  gulp.src(assetCss)
    //.pipe(cssmin())
    .pipe(concat("asset.css"))
    .pipe(gulp.dest('dist/assets/css'));
});
gulp.task("utility:fonts",function(){
    return  gulp.src("src/assets/fonts/*.*")
    .pipe(gulp.dest('dist/assets/fonts'));
});
gulp.task("utility:img",function(){
    return     gulp.src("src/assets/img/**/*")
    .pipe(gulp.dest('dist/assets/img'));
});
gulp.task("utility:html",function() {
    return gulp.src(["src/**/*.html", "!src/modules/**/*.html"])
        .pipe(gulp.dest('dist'));
});
gulp.task('utility',["utility:js","utility:css","utility:fonts","utility:img","utility:html"], function (callback) {
    runSequence( "clean",["utility:js","utility:css","utility:fonts","utility:img","utility:html"]  ,callback   )
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist",
            middleware: [historyApiFallback()]
        }
    });
    gulp.run("watch");
});
gulp.task('watch', function( callback) {
    watch('./src/**/*', function (event) {
        console.log(`event type:${event.event}`.data);
        console.log(`event file:${event.path}`.data);
        var task = ["clean:build"];
        if (event.path.indexOf("modules") > -1) {
            var moduleName = event.path.toString().split(/modules\\/)[1].split("\\")[0];
            task.push("tsc");
            task.push("utility:html");
            task.push(`bundle:${moduleName}`);
            task.push(`bundle:${moduleName}css`);
        }
        else {
            task.push("tsc");
            task.push("utility:html");
            task.push("bundle:app");
            task.push("bundle:appcss");
        }
        task.push(function () {
            reload();
        });
        runSequence.apply(this,task);
    });
    callback();
});

gulp.task("serve",callback=>{
    var exec = require('child_process').exec;
    var cmdStr = 'npm run serve';
    exec(cmdStr, function(err,stdout,stderr){
        if(err) {
            console.log(err);
        } else {

        }
    });
    callback();
});
gulp.task('default', function (callback) {
    runSequence("clean", "utility",  "bundle:css","tsc","bundle:app","bundle:angular2","bundle:modules","browser-sync","serve", callback)
});
gulp.task('b', (callback)=>{
    runSequence("clean", "utility",  "bundle:css","tsc", "bundle:app","bundle:angular2","bundle:modules", callback)
});
gulp.task('c', (callback)=>{
    runSequence("tsc", "bundle:app", callback)
});
 