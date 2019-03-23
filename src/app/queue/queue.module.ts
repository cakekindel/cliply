import { NgModule } from '@angular/core';
import { QueueComponent } from './queue.component';

@NgModule({
    declarations: [
        QueueComponent,
    ],
    exports: [
        QueueComponent,
    ],
})
export class QueueModule { }
