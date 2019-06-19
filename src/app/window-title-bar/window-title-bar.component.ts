import { Component } from '@angular/core';
import { ElectronService } from '../core/services/utility/electron.service';

@Component({
  selector: 'app-window-title-bar',
  templateUrl: './window-title-bar.component.html',
  styleUrls: ['./window-title-bar.component.scss']
})
export class WindowTitleBarComponent {
    constructor(public electron: ElectronService) { }
}
