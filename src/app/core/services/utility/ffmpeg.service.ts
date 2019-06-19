import { Injectable } from '@angular/core';
import * as fluentFfmpeg from 'fluent-ffmpeg';
import { get as getAppRoot } from 'app-root-dir';
import { Observable } from 'rxjs';

import { ElectronService } from './electron.service';
import { FfprobeResult } from '../../models/utility';

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

    public getMetadata(nativeFile: File): Observable<FfprobeResult> {
        return new Observable<FfprobeResult>((sub) => {
            this.ffmpeg(nativeFile.path)
                .ffprobe((err, data) => {
                    const probeInfo = data.format as FfprobeResult;

                    probeInfo.filename = probeInfo.filename
                                                  .substring(probeInfo.filename.lastIndexOf('\\') + 1)
                                                  .replace(probeInfo.format_name, '');

                    probeInfo.durationMs = parseFloat(probeInfo.duration) * 1000;
                    probeInfo.sizeMb = parseFloat(probeInfo.size) / 1000000;

                    sub.next(probeInfo);
                    sub.complete();
                });
        });
    }

    public makeThumbnail(name: string, nativeFile: File): Observable<string> {
        const fileName = name + '.png';

        return new Observable<string>((sub) => {
            this.ffmpeg(nativeFile.path)
                .thumbnail({
                    count: 1,
                    timestamps: [0],
                    folder: this.thumbnailsDir,
                    filename: fileName,
                    size: '640x480'
                })
                .on('end', () => {
                    sub.next(this.thumbnailsDir + fileName);
                    sub.complete();
                });
        });
    }

    private ffmpeg(videoPath: string): fluentFfmpeg.FfmpegCommand {
        return fluentFfmpeg(videoPath).setFfmpegPath(this.binaries.ffmpeg).setFfprobePath(this.binaries.ffprobe);
    }
}
