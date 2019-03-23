import { Component } from '@angular/core';
import { ElectronService } from './core/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { Router } from '@angular/router';
import { NavigationService } from './core/navigation.service';
import { SettingsService } from './core/settings.service';
import { ClipStorageService } from './core/clip-storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        electronService: ElectronService,
        translate: TranslateService,
        router: Router,
        navSvc: NavigationService,
        settingsService: SettingsService,
        clipsStorage: ClipStorageService,
    ) {
        translate.setDefaultLang('en');
        console.log('AppConfig', AppConfig);
        router.navigateByUrl('splash');

        // comment this line to show splash screen
        navSvc.navigateByItem(navSvc.navItems.queue);

        if (electronService.isElectron()) {
            console.log('Mode electron');
            console.log('Electron ipcRenderer', electronService.ipcRenderer);
            console.log('NodeJS childProcess', electronService.childProcess);
        } else {
            console.log('Mode web');
        }
    }
}
