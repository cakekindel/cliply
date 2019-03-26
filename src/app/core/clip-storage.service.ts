import { Injectable, NgZone } from '@angular/core';
import { ElectronService } from './electron.service';

import { ClipsFile } from '../shared/models/clips-file.model';
import { Clip } from '../shared/models/clip.model';
import { FfmpegService } from './ffmpeg.service';

@Injectable()
export class ClipStorageService {
    public clips = new ClipsFile();

    private readonly clipsPath: string;
    private readonly thumbnailsPath: string;

    constructor(private electron: ElectronService, private ffmpeg: FfmpegService, private zone: NgZone) {
        this.clipsPath = electron.remote.app.getPath('userData') + '/clips.json';
        this.thumbnailsPath = electron.remote.app.getPath('userData') + '/thumbnails';

        this.loadClips();
    }

    public newClips(fileList: FileList) {
        const files = Array.from(fileList);
        files.forEach((file, i) => {
            const clip = new Clip();
            clip.inputPath = file.path;

            this.ffmpeg
                .fromClip(clip)
                .makeThumbnail()
                .setMetadata()
                .subscribe(() => {
                    this.zone.run(() => {
                        this.clips.queue.push(clip);

                        if (i === files.length - 1) {
                            this.save();
                        }
                    });
                });
        });
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
            this.clips = new ClipsFile(clipsJson);
        } else {
            this.save();
        }
    }
}
