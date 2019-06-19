import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ElectronService } from './core/services/utility/electron.service';
import { AppConfig } from '../environments/environment';
import { Router } from '@angular/router';
import { ClipsService } from './core/services/ui/clips.service';
import { TopBarService } from './core/services/ui';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    constructor(
        electronService: ElectronService,
        public topBarService: TopBarService,
    ) {
        console.log('AppConfig', AppConfig);

        // comment this line to show splash screen
        // navSvc.navigateByItem(navSvc.navItemsIterable[0]);

        if (electronService.isElectron()) {
            console.log('Mode electron');
            console.log('Electron ipcRenderer', electronService.ipcRenderer);
            console.log('NodeJS childProcess', electronService.childProcess);
        } else {
            console.log('Mode web');
        }
    }
}
