export class Clip {
    private _durationString = '';

    title = '';
    exported = false;
    uploadToYoutube = false;
    youtubeMetadata = new YouTubeMetadata();
    file = new FileInfo();

    get duration() {
        if (!this._durationString) {
            const durationSec = Math.floor(this.file.durationMs / 1000);
            const durationMin = Math.floor(durationSec / 60);
            const leftoverDurationSec = durationSec - durationMin * 60;

            this._durationString = `${durationMin}:${leftoverDurationSec}`;
        }

        return this._durationString;
    }
}

class FileInfo {
    /** stream url for safely using in template without disabling webSecurity */
    url = '';
    thumbnailUrl = '';
    path = '';
    sizeMb = 0;
    durationMs = 0;
    startAtMs = 0;
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
