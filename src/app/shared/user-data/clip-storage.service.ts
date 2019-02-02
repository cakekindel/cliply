import { Injectable } from '@angular/core';
import { ElectronService } from '../../electron.service';
import { ClipsFile as ClipsFile } from './clips-file.model';
import { Clip } from '../models/clip.model';
import { LocalFileServer } from '../../local-file-server.service';

@Injectable()
export class ClipStorageService {
    public clips = new ClipsFile();

    private readonly clipsPath: string;
    private readonly thumbnailsPath: string;

    constructor(private electron: ElectronService, private fileServer: LocalFileServer) {
        this.clipsPath = electron.remote.app.getPath('userData') + '/clips.json';
        this.thumbnailsPath = electron.remote.app.getPath('userData') + '/thumbnails';

        this.loadClips();
    }

    public newClips(fileList: FileList) {
        const files = Array.from(fileList);
        files.forEach((file) => {
            const clip = new Clip();
            clip.file.path = file.path;
            clip.file.url = this.fileServer.urlFromPath(file.path);

            this.clips.queue.push(clip);
        });

        this.save();
    }

    public save() {
        const clipsFileJson = JSON.stringify(this.clips);
        this.electron.fs.writeFileSync(this.clipsPath, clipsFileJson, 'utf8');
    }

    private loadClips() {
        if (!this.electron.fs.existsSync(this.thumbnailsPath)) {
            this.electron.fs.mkdirSync(this.thumbnailsPath);
        }

        if (this.electron.fs.existsSync(this.clipsPath)) {
            const clipsJson = this.electron.fs.readFileSync(this.clipsPath, 'utf8');
            this.clips = JSON.parse(clipsJson);
        } else {
            this.save();
        }
    }
}
