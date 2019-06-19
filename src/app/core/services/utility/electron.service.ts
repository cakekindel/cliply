import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote, app } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

@Injectable()
export class ElectronService {
    public window = {
        close: () => {
            this.remote.getCurrentWindow().close();
        },
        maximize: () => {
            if (this.remote.getCurrentWindow().isMaximized()) {
                this.remote.getCurrentWindow().unmaximize();
            } else {
                this.remote.getCurrentWindow().maximize();
            }
        },
        minimize: () => {
            this.remote.getCurrentWindow().minimize();
        },
    };

    userDataDir?: string;

    ipcRenderer: typeof ipcRenderer;
    webFrame: typeof webFrame;
    remote: typeof remote;
    childProcess: typeof childProcess;
    fs: typeof fs;

    constructor() {
        this.ipcRenderer = window.require('electron').ipcRenderer;
        this.webFrame = window.require('electron').webFrame;
        this.remote = window.require('electron').remote;

        this.childProcess = window.require('child_process');
        this.fs = window.require('fs');

        this.userDataDir = this.remote.app.getPath('userData');
    }

    isElectron = () => {
        return window && window.process && window.process.type;
    }
}