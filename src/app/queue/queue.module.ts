import { NgModule } from '@angular/core';
import { QueueComponent } from './queue.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        QueueComponent,
    ],
    exports: [
        QueueComponent,
    ],
})
export class QueueModule { }
