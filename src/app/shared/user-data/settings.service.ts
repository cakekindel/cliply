import { ElectronService } from '../../electron.service';
import { SettingsFile } from './settings-file.model';
import { Clip } from '../models/clip.model';
import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
    public clipQueue: Clip[] = [];
    public clipLibrary: Clip[] = [];
    public settings = new SettingsFile();

    private userDataPath: string;
    private settingsPath: string;

    constructor(private electron: ElectronService) {
        this.userDataPath = electron.remote.app.getPath('userData');
        this.settingsPath = this.userDataPath + '/settings.json';

        this.loadSettings();
    }

    public save() {
        const settingsJson = JSON.stringify(this.settings);
        this.electron.fs.writeFileSync(this.settingsPath, settingsJson, 'utf8');
    }

    private loadSettings() {
        if (!this.electron.fs.existsSync(this.userDataPath)) {
            this.electron.fs.mkdirSync(this.userDataPath);
        }

        if (this.electron.fs.existsSync(this.settingsPath)) {
            const settingsJson = this.electron.fs.readFileSync(this.settingsPath, 'utf8');
            this.settings = JSON.parse(settingsJson);
        } else {
            this.save();
        }
    }
}
