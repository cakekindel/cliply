import { NgModule } from '@angular/core';

import { ButtonComponent } from './components/button/button.component';
import { ClipCardComponent } from './components/clip-card/clip-card.component';
import { ExtendedFabComponent } from './components/extended-fab/extended-fab.component';
import { ChipComponent } from './components/chip/chip.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@NgModule({
    declarations: [
        ButtonComponent,
        ClipCardComponent,
        ExtendedFabComponent,
        ChipComponent,
        TopBarComponent,
    ],
    exports: [
        ButtonComponent,
        ClipCardComponent,
        ExtendedFabComponent,
        ChipComponent,
        TopBarComponent,
    ]
})
export class SharedModule { }
