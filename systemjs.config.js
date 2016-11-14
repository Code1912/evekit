(function () {
var maps= {
    // Our app is compiled to js files in the dist folder
    app: 'build',
    // Angular bundles
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

    // Other libraries
    'rxjs': 'npm:rxjs',
    'ng2-translate': 'node_modules/ng2-translate',
    "eve/services": "build/core/services/index.js",
    "eve/components": "build/core/components/index.js",
    "eve/directives": "build/core/directives/index.js",
    "eve/common": "build/core/common/index.js",
    "eve/module": "build/core/index.js"
};
System.config({

    defaultExtension: 'js',
    defaultJSExtensions: true,

    paths: {
       'npm:': 'node_modules/'
    },

    // Let the system loader know where to look for things
    map:maps,

    // Tell the system loader how to load when no filename and/or no extension
    packages: {
        app: {
             main: './index.js', 
             defaultExtension: 'js' },
        rxjs: { defaultExtension: 'js' },
        "eve/**/*": { defaultExtension: 'js' },
        'ng2-translate': { defaultExtension: 'js' }
    }

});

})();
