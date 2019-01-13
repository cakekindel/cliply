import { Component, OnInit } from '@angular/core';
import { Clip } from '../shared/models/clip.model';
import { TopBarState } from '../shared/top-bar/top-bar.component';
import { FabTypes } from '../shared/extended-fab/extended-fab.component';

@Component({
    selector: 'app-queue',
    templateUrl: './queue.component.html',
    styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
    private defaultTopBar: TopBarState = {
        title: 'Clip Queue',
        actionItems: [
            { icon: 'create_new_folder', tooltipText: 'Add Output Directory Group', click: () => { } },
            { icon: 'folder_open', tooltipText: 'Add All Clips From Folder', click: () => { } },
        ],
        fabs: [
            { icon: 'add', type: FabTypes.Primary, label: 'ADD CLIP(S)', click: () => { } },
            { icon: 'play_arrow', type: FabTypes.Secondary, label: 'EXPORT ALL CLIPS', click: () => { } },
        ]
    };

    public topBarState = this.defaultTopBar;

    public testClip = new Clip();
    public clips: Clip[] = [this.testClip, this.testClip, this.testClip, this.testClip, this.testClip];
    public selectedClip: Clip;

    constructor() {
        this.testClip.fileMetadata.durationMs = 593000;
        this.testClip.fileMetadata.sizeMb = 12.4;
        this.testClip.title = 'My Video';
        this.testClip.uploadToYoutube = true;
    }

    ngOnInit() { }

    editClip(clip: Clip) {
        this.selectedClip = clip;
    }
}
