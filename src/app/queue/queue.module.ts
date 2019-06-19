import { NgModule } from '@angular/core';
import { QueueComponent } from './queue.component';
import { SharedModule } from '../shared/shared.module';
import { QueueRoutingModule } from './routing/queue-routing.module';

@NgModule({
    imports: [
        SharedModule,
        QueueRoutingModule,
    ],
    declarations: [
        QueueComponent,
    ],
    exports: [
        QueueComponent,
    ],
})
export class QueueModule { }
