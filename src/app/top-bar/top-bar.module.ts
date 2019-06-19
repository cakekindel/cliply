import { NgModule } from '@angular/core';
import { TopBarComponent } from './top-bar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TopBarComponent],
  exports: [TopBarComponent],
  imports: [
      SharedModule
  ]
})
export class TopBarModule { }
