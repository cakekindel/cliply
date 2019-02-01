import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
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
import { ClipCardComponent } from './shared/clip-card/clip-card.component';
import { ButtonComponent } from './shared/button/button.component';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { MorphFromDirective } from './shared/morph-from.directive';
import { EditClipComponent } from './shared/clip-card/edit-clip/edit-clip.component';
import { EditClipService } from './shared/clip-card/edit-clip.service';
import { SettingsService } from './shared/user-data/settings.service';
import { ClipStorageService } from './shared/user-data/clip-storage.service';
import { LocalFileServer } from './local-file-server.service';

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
        ClipCardComponent,
        ButtonComponent,
        TopBarComponent,
        MorphFromDirective,
        EditClipComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        MatRippleModule,
        MatTooltipModule,
        MatInputModule,
        MatCheckboxModule,
        MatRadioModule,
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
        NavigationService,
        EditClipService,
        ClipStorageService,
        SettingsService,
        LocalFileServer
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
