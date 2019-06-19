import { WindowTitleBarModule } from './window-title-bar/window-title-bar.module';
import { AppRoutingModule } from './app-routing.module';
import 'reflect-metadata';
import '../polyfills';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { QueueModule } from './queue/queue.module';
import { SplashModule } from './splash/splash.module';
import { FormsModule } from '@angular/forms';
import { TopBarModule } from './top-bar/top-bar.module';

@NgModule({
    imports: [
        CoreModule,
        SharedModule,
        AppRoutingModule,
        BrowserAnimationsModule,

        WindowTitleBarModule,
        SplashModule,

        TopBarModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [ ],
    bootstrap: [AppComponent]
})
export class AppModule { }
