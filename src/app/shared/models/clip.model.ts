export class Clip {
    private _durationString: string;

    title: string;
    exported = false;
    uploadToYoutube = false;
    youtubeMetadata = new YouTubeMetadata();
    fileMetadata = new ClipMetadata();

    get duration() {
        if (!this._durationString) {
            const durationSec = Math.floor(this.fileMetadata.durationMs / 1000);
            const durationMin = Math.floor(durationSec / 60);
            const leftoverDurationSec = durationSec - durationMin * 60;

            this._durationString = `${durationMin}:${leftoverDurationSec}`;
        }

        return this._durationString;
    }
}

class ClipMetadata {
    sourceFile: File;
    sizeMb: number;
    durationMs: number;
    startAtMs: number;
}

class YouTubeMetadata {
    url?: string;
    privacy = YouTubePrivacy.Unlisted;
}

export class YouTubePrivacy {
    static Public = 'Public';
    static Private = 'Private';
    static Unlisted = 'Unlisted';

    static enum = [YouTubePrivacy.Public, YouTubePrivacy.Private, YouTubePrivacy.Unlisted];
}
