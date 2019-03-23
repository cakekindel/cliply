import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { WindowTitleBarComponent } from './window-title-bar.component';
import { TitleBarButtonComponent } from './title-bar-button/title-bar-button.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        WindowTitleBarComponent,
        TitleBarButtonComponent
    ],
    exports: [
        WindowTitleBarComponent,
        TitleBarButtonComponent,
    ],
})
export class WindowTitleBarModule { }
