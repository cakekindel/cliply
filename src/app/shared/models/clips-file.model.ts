import { Clip } from '../models/clip.model';

export class ClipsFile {
    queue: Clip[] = [];
    library: Clip[] = [];

    constructor(json?: string) {
        if (json) {
            const parsedClips = JSON.parse(json);
            Object.assign(this, parsedClips);

            this.queue = this.queue.map((clip) => new Clip(clip));
            this.library = this.library.map((clip) => new Clip(clip));
        }
    }
}
