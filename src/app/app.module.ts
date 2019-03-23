import 'reflect-metadata';
import '../polyfills';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { NavDrawerModule } from './nav-drawer/nav-drawer.module';
import { QueueModule } from './queue/queue.module';
import { SplashModule } from './splash/splash.module';

@NgModule({
    imports: [
        CoreModule,
        SharedModule,

        NavDrawerModule,
        QueueModule,
        SplashModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [ ],
    bootstrap: [AppComponent]
})
export class AppModule { }
