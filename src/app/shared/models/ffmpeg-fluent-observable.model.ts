import { FfmpegService } from './../../core/ffmpeg.service';
import { Observable, concat, of } from 'rxjs';
import { Clip } from './clip.model';

export class FfmpegFluentObservable {
    private observable = of<void>();

    constructor(private ffmpeg: FfmpegService, public clip: Clip) { }

    public makeThumbnail() {
        const thumbnailObservable = this.ffmpeg.makeThumbnail(this.clip);
        this.observable = concat(this.observable, thumbnailObservable);
        return this;
    }

    public setMetadata() {
        const metadataObservable = this.ffmpeg.setMetadata(this.clip);
        this.observable = concat(this.observable, metadataObservable);
        return this;
    }

    public subscribe(onComplete: () => void) {
        return this.observable.subscribe(undefined, undefined, onComplete);
    }
}
