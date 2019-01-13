export class Clip {
    private _durationString: string;

    title: string;
    exported = false;
    uploadToYoutube = false;
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
