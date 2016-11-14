/**
 * Created by Code1912 on 2016/9/18.
 */
 /// <reference path="../typings/index.d.ts" />
 
import { AppModule } from './core/app';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
platformBrowserDynamic().bootstrapModule(AppModule)
    .then(success => console.log(`Bootstrap Eve success`))
    .catch(error => console.error(error));

