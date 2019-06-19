import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app-routes.model';

@NgModule({
    imports: [RouterModule.forRoot(AppRoutes.routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
