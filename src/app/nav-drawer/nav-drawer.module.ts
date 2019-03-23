import { NgModule } from '@angular/core';
import { NavDrawerComponent } from './nav-drawer.component';
import { NavItemComponent } from './nav-item/nav-item.component';

@NgModule({
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
