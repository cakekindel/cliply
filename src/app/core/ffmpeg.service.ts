import { FfmpegFluentObservable } from './../shared/models/ffmpeg-fluent-observable.model';
import { FfprobeFormat } from './../shared/models/ffprobe-format.model';
import { Clip } from './../shared/models/clip.model';
import { Injectable } from '@angular/core';
import * as fluentFfmpeg from 'fluent-ffmpeg';
import { ElectronService } from './electron.service';
import { Guid } from '../shared/guid.type';
import { get as getAppRoot } from 'app-root-dir';
import { Observable } from 'rxjs';

@Injectable()
export class FfmpegService {
    private readonly thumbnailsDir: string;
    private readonly binaries: { ffmpeg: string, ffprobe: string };

    constructor(private electronService: ElectronService) {
        this.thumbnailsDir = this.electronService.userDataDir + '/thumbnails/';
        this.binaries = {
            ffmpeg: getAppRoot() + '/dist/assets/ffmpeg.exe',
            ffprobe: getAppRoot() + '/dist/assets/ffprobe.exe'
        };
    }

    public fromClip(clip: Clip) {
        return new FfmpegFluentObservable(this, clip);
    }

    public makeThumbnail(clip: Clip) {
        const fileName = Guid.newGuid().toString() + '.png';

        const pathObs = new Observable<void>((sub) => {
            this.ffmpeg(clip.inputPath)
                .thumbnail({
                    count: 1,
                    timestamps: [0],
                    folder: this.thumbnailsDir,
                    filename: fileName,
                    size: '640x480'
                })
                .on('end', () => {
                    clip.thumbnailPath = this.thumbnailsDir + fileName;
                    sub.complete();
                });
        });

        return pathObs;
    }

    public setMetadata(clip: Clip) {
        return new Observable<void>((sub) => {
            this.ffmpeg(clip.inputPath)
                .ffprobe((err, data) => {
                    const probeInfo = data.format as FfprobeFormat;

                    const fileName = probeInfo.filename.substring(probeInfo.filename.lastIndexOf('\\') + 1);
                    const title = fileName.replace(/\.[a-z0-9]+/i, '');

                    clip.title = title;

                    clip.durationMs = parseFloat(probeInfo.duration) * 1000;

                    const sizeMb = parseFloat(probeInfo.size) / 1000000;
                    clip.sizeMb = Math.floor(sizeMb * 100) / 100;

                    sub.complete();
                });
        });
    }

    private ffmpeg(videoPath: string) {
        return fluentFfmpeg(videoPath).setFfmpegPath(this.binaries.ffmpeg).setFfprobePath(this.binaries.ffprobe);
    }
}
