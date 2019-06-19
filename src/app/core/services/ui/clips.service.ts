import { Injectable } from '@angular/core';

import { Observable, zip as whenAll, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { JsonStoreService, FfmpegService } from '../utility';

import { Clip } from '../../models/clip';
import { ClipsJsonStore } from '../../models/utility/json-store/clips';

@Injectable()
export class ClipsService {
    private clipsStorage = new ClipsJsonStore();
    private clipsSubject$ = new ReplaySubject<Clip[]>(1);

    public clips$ = this.clipsSubject$.asObservable();

    constructor(private jsonStorage: JsonStoreService, private ffmpegService: FfmpegService) {
        this.jsonStorage.load(this.clipsStorage)
                        .subscribe(() => this.emitClips());
    }

    public create(nativeFile: File): void {
        const clip = new Clip();

        const setSourceFileMetadata$ = this.ffmpegService.getMetadata(nativeFile)
                                                         .pipe(tap((metadata) => {
                                                             clip.sourceFile.path = nativeFile.path;
                                                             clip.sourceFile.name = metadata.filename;
                                                             clip.sourceFile.extension = metadata.format_name;
                                                             clip.sourceFile.durationMs = parseFloat(metadata.duration) * 1000;
                                                         }));

        const makeThumbnail$ = this.ffmpegService.makeThumbnail(clip.uniqueId, nativeFile)
                                                 .pipe(tap((thumbnailPath) => clip.sourceFile.thumbnailPath = thumbnailPath));

        whenAll(setSourceFileMetadata$, makeThumbnail$).subscribe(() => {
            this.clipsStorage.contents.clips.push(clip);
            this.emitClips();
        });
    }

    public delete(clip: Clip): void {
        clip.isActive = false;
        this.save(clip).subscribe();
    }

    public save(clip: Clip): Observable<void> {
        const clips = this.getClips().map((c) => {
            return c.uniqueId === clip.uniqueId ? clip : c;
        });

        this.clipsStorage.contents.clips = clips;

        return this.jsonStorage.save(this.clipsStorage)
                               .pipe(tap(() => this.emitClips()));
    }

    public export(clip: Clip): void { }

    private getClips(): Clip[] {
        // deep copy?
        return this.clipsStorage.contents.clips.filter((c) => c.isActive);
    }

    private emitClips(): void {
        this.clipsSubject$.next(this.getClips());
    }
}
