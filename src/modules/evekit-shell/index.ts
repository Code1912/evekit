import { AppModule } from './app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
platformBrowserDynamic().bootstrapModule(AppModule)
    .then(success => {
        console.log(`Bootstrap Eve success`);
        $("#defaultLoading").hide()
        $("#defaultMask").hide()
    })
    .catch(error => console.error(error));
//enableProdMode();