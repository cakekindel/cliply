import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { NavDrawerComponent } from './nav-drawer/nav-drawer.component';
import { NavItemComponent } from './nav-drawer/nav-item/nav-item.component';
import { NavigationService } from './nav-drawer/navigation.service';
import { ExtendedFabComponent } from './shared/extended-fab/extended-fab.component';
import { QueueComponent } from './queue/queue.component';
import { SplashComponent } from './splash/splash.component';
import { ChipComponent } from './shared/chip/chip.component';
import { VideoCardComponent } from './shared/video-card/video-card.component';
import { ButtonComponent } from './shared/button/button.component';
import { TopBarComponent } from './shared/top-bar/top-bar.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        WebviewDirective,
        NavDrawerComponent,
        NavItemComponent,
        ExtendedFabComponent,
        QueueComponent,
        SplashComponent,
        ChipComponent,
        VideoCardComponent,
        ButtonComponent,
        TopBarComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        MatRippleModule,
        MatTooltipModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        ElectronService,
        NavigationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
