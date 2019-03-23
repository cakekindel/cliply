import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

import { AppRoutingModule } from '../app-routing.module';
import { FfmpegService } from './ffmpeg.service';
import { ClipStorageService } from './clip-storage.service';
import { SettingsService } from './settings.service';
import { ElectronService } from './electron.service';

@NgModule({
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
    ],
    exports: [
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
    ],
    providers: [
        FfmpegService,
        ClipStorageService,
        SettingsService,
        ElectronService,
    ]
})
export class CoreModule { }
