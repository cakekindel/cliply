import { NgModule } from '@angular/core';

import { ClipsRoutingModule } from './routing/clips-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ClipsComponent } from './components/clips.component';
import { EditClipComponent } from './components/edit-clip/edit-clip.component';
import { ClipCardComponent } from './components/clip-card/clip-card.component';
import { CreateFirstClipComponent } from './components/create-first-clip/create-first-clip.component';

@NgModule({
    declarations: [
        ClipsComponent,
        EditClipComponent,
        ClipCardComponent,
        CreateFirstClipComponent
    ],
    imports: [
        SharedModule,
        ClipsRoutingModule
    ]
})
export class ClipsModule { }
