import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClipsViewRoutes } from './clips-view-routes.model';

@NgModule({
  imports: [RouterModule.forChild(ClipsViewRoutes.routes)],
  exports: [RouterModule]
})
export class ClipsRoutingModule { }
