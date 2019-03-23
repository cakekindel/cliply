import { WindowTitleBarModule } from './window-title-bar/window-title-bar.module';
import { AppRoutingModule } from './app-routing.module';
import 'reflect-metadata';
import '../polyfills';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { NavDrawerModule } from './nav-drawer/nav-drawer.module';
import { QueueModule } from './queue/queue.module';
import { SplashModule } from './splash/splash.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CoreModule,
        SharedModule,
        AppRoutingModule,

        WindowTitleBarModule,
        NavDrawerModule,
        QueueModule,
        SplashModule,

        BrowserModule,
        FormsModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [ ],
    bootstrap: [AppComponent]
})
export class AppModule { }
