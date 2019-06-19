import { NgModule } from '@angular/core';

import {
    ElectronService,
    FfmpegService,
    JsonStoreService,
    LocalFileService,
} from './services/utility';

import {
    EditClipService,
    TopBarService,
    ClipsService,
} from './services/ui';

@NgModule({
    providers: [
        FfmpegService,
        ClipsService,
        ElectronService,
        EditClipService,
        TopBarService,
        JsonStoreService,
        LocalFileService,
    ]
})
export class CoreModule { }
