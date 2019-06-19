import { Guid } from '../utility';

import { UploadMeta } from './upload';
import { ClipDestinationFile, ClipSourceFile } from './file';
import { TrimSection } from '.';

export class Clip {
    public uniqueId = Guid.newGuid().toString();
    public isActive = true;

    public sourceFile = new ClipSourceFile();
    public destinationFile = new ClipDestinationFile();

    public trimSections: TrimSection[] = [];
    public uploadDestinations: UploadMeta[] = [];

    constructor() {  }
}
