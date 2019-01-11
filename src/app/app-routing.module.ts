import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueueComponent } from './queue/queue.component';

const routes: Routes = [
    {
        path: 'queue',
        component: QueueComponent
    },
    {
        path: '**',
        component: QueueComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
