import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { NavDrawerComponent } from './nav-drawer.component';
import { NavItemComponent } from './nav-item/nav-item.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        NavDrawerComponent,
        NavItemComponent,
    ],
    exports: [
        NavDrawerComponent,
        NavItemComponent,
    ],
})
export class NavDrawerModule { }
