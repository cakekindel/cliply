import { EditClipComponent } from './components/clip-card/edit-clip/edit-clip.component';
import { NgModule } from '@angular/core';

import { MorphFromDirective } from './morph-from.directive';

import { ButtonComponent } from './components/button/button.component';
import { ClipCardComponent } from './components/clip-card/clip-card.component';
import { ExtendedFabComponent } from './components/extended-fab/extended-fab.component';
import { ChipComponent } from './components/chip/chip.component';
import { ThumbHoverPreviewComponent } from './components/clip-card/thumb-hover-preview/thumb-hover-preview.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRippleModule, MatTooltipModule, MatInputModule, MatCheckboxModule, MatRadioModule } from '@angular/material';
import { LoadLocalFilePipe } from './pipes/load-local-file.pipe';
import { TrimVideoSliderComponent } from './components/trim-video-slider/trim-video-slider.component';
import { PlayControlsComponent } from './components/play-controls/play-controls.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatRippleModule,
        MatTooltipModule,
        MatInputModule,
        MatCheckboxModule,
        MatRadioModule,
    ],
    declarations: [
        MorphFromDirective,

        ButtonComponent,
        ClipCardComponent,
        ExtendedFabComponent,
        ChipComponent,
        EditClipComponent,
        ThumbHoverPreviewComponent,
        LoadLocalFilePipe,
        TrimVideoSliderComponent,
        PlayControlsComponent,
    ],
    exports: [
        MorphFromDirective,

        ButtonComponent,
        ClipCardComponent,
        ExtendedFabComponent,
        ChipComponent,
        EditClipComponent,
        ThumbHoverPreviewComponent,

        CommonModule,
        FormsModule,
        MatRippleModule,
        MatTooltipModule,
        MatInputModule,
        MatCheckboxModule,
        MatRadioModule,
    ]
})
export class SharedModule { }
