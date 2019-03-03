import { Injectable } from '@angular/core';
import * as fluentFfmpeg from 'fluent-ffmpeg';
import { ElectronService } from '../electron.service';
import { Guid } from './guid.type';

const FFMPEG_PATH = '../../assets/ffmpeg.exe';
const FFPROBE_PATH = '../../assets/ffprobe.exe';

@Injectable()
export class FfmpegService {
    constructor(private electronService: ElectronService) { }

    public generateThumbnail(videoPath: string) {
        this.ffmpeg(videoPath)
            .thumbnail({
                count: 1,
                folder: this.electronService.tempDir,
                filename: Guid.newGuid().toString() + '.png'
            });
    }

    private ffmpeg(videoPath: string) {
        return fluentFfmpeg(videoPath).setFfmpegPath(FFMPEG_PATH).setFfprobePath(FFPROBE_PATH);
    }
}
