import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QueueRoutes } from './queue-routes.model';

@NgModule({
    imports: [RouterModule.forChild(QueueRoutes.routes)],
    exports: [RouterModule],
})
export class QueueRoutingModule { }
