import { NgModule } from '@angular/core';

import { FfmpegService } from './ffmpeg.service';
import { ClipStorageService } from './clip-storage.service';
import { SettingsService } from './settings.service';
import { ElectronService } from './electron.service';
import { NavigationService } from './navigation.service';
import { EditClipService } from './edit-clip.service';

@NgModule({
    providers: [
        FfmpegService,
        ClipStorageService,
        SettingsService,
        ElectronService,
        NavigationService,
        EditClipService,
    ]
})
export class CoreModule { }
