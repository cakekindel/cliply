import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueueComponent } from './queue/queue.component';
import { SplashComponent } from './splash/splash.component';

const routes: Routes = [
    {
        path: 'splash',
        component: SplashComponent
    },
    {
        path: 'queue',
        component: QueueComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
