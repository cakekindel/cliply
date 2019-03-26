import { Guid } from '../guid.type';

export class Clip {
    private _durationString = '';
    private _durationMs = 0;

    public id = Guid.newGuid().toString();

    public titleUnchanged = true;
    public title = '';

    public inputPath = '';
    public thumbnailPath = '';
    public outputPath = '';
    public startAtMs = 0;
    public endAtMs = 0;
    public sizeMb = 0;

    public get durationMs() { return this._durationMs; }
    public set durationMs(duration: number) {
        this._durationMs = duration;
        this._durationString = '';
    }

    public get formattedDuration() { return this.getFormattedDuration(); }

    public exported = false;
    public uploadToYoutube = false;
    public youtubeMetadata = new YouTubeMetadata();

    constructor(init?: Partial<Clip>) {
        if (init) {
            Object.assign(this, init);
        }
    }

    private getFormattedDuration() {
        if (!this._durationString) {
            const durationSec = Math.floor(this.durationMs / 1000);
            const durationMin = Math.floor(durationSec / 60);
            const leftoverDurationSec = durationSec - durationMin * 60;

            this._durationString = `${durationMin}:${leftoverDurationSec}`;
        }

        return this._durationString;
    }
}

class YouTubeMetadata {
    url?: string;
    privacy = YouTubePrivacy.Unlisted;
}

export class YouTubePrivacy {
    static Public = 'Public';
    static Private = 'Private';
    static Unlisted = 'Unlisted';

    static Privacies = [YouTubePrivacy.Public, YouTubePrivacy.Private, YouTubePrivacy.Unlisted];
}
