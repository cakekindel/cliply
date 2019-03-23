import { EditClipComponent } from './components/clip-card/edit-clip/edit-clip.component';
import { NgModule } from '@angular/core';

import { MorphFromDirective } from './morph-from.directive';

import { ButtonComponent } from './components/button/button.component';
import { ClipCardComponent } from './components/clip-card/clip-card.component';
import { ExtendedFabComponent } from './components/extended-fab/extended-fab.component';
import { ChipComponent } from './components/chip/chip.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ThumbHoverPreviewComponent } from './components/clip-card/thumb-hover-preview/thumb-hover-preview.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRippleModule, MatTooltipModule, MatInputModule, MatCheckboxModule, MatRadioModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatRippleModule,
        MatTooltipModule,
        MatInputModule,
        MatCheckboxModule,
        MatRadioModule,
        BrowserAnimationsModule,
    ],
    declarations: [
        MorphFromDirective,

        ButtonComponent,
        ClipCardComponent,
        ExtendedFabComponent,
        ChipComponent,
        TopBarComponent,
        EditClipComponent,
        ThumbHoverPreviewComponent,
    ],
    exports: [
        MorphFromDirective,

        ButtonComponent,
        ClipCardComponent,
        ExtendedFabComponent,
        ChipComponent,
        TopBarComponent,
        EditClipComponent,
        ThumbHoverPreviewComponent,

        MatRippleModule,
        MatTooltipModule,
        MatInputModule,
        MatCheckboxModule,
        MatRadioModule,
        BrowserAnimationsModule,
    ]
})
export class SharedModule { }
