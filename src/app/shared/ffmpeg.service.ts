import { Injectable } from '@angular/core';
import * as fluentFfmpeg from 'fluent-ffmpeg';
import { ElectronService } from '../electron.service';
import { Guid } from './guid.type';
import { get as getAppRoot } from 'app-root-dir';

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

    public makeThumbnail(videoPath: string) {
        const fileName = Guid.newGuid().toString() + '.png';

        this.ffmpeg(videoPath)
            .thumbnail({
                count: 1,
                folder: this.thumbnailsDir,
                filename: fileName,
                size: '640x480'
            });

        return this.thumbnailsDir + fileName;
    }

    private ffmpeg(videoPath: string) {
        return fluentFfmpeg(videoPath).setFfmpegPath(this.binaries.ffmpeg).setFfprobePath(this.binaries.ffprobe);
    }
}
