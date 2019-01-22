import { Component, OnInit } from '@angular/core';
import { Clip } from '../shared/models/clip.model';
import { TopBarState } from '../shared/top-bar/top-bar.component';
import { FabTypes } from '../shared/extended-fab/extended-fab.component';
import { EditClipService } from '../shared/clip-card/edit-clip.service';

@Component({
    selector: 'app-queue',
    templateUrl: './queue.component.html',
    styleUrls: ['./queue.component.scss']
})
export class QueueComponent {
    private defaultTopBar: TopBarState = {
        title: 'Clip Queue',
        actionItems: [
            { icon: 'create_new_folder', tooltipText: 'Add Output Directory Group', click: () => { } },
            { icon: 'folder_open', tooltipText: 'Add All Clips From Folder', click: () => { } },
        ],
        fabs: [
            {
                icon: 'add',
                type: FabTypes.Primary,
                label: 'ADD CLIP(S)',
                click: () => { },
                file: { accept: 'video/mp4', multiple: true },
                filesChosen: (files) => { }
            },
            { icon: 'play_arrow', type: FabTypes.Secondary, label: 'EXPORT ALL CLIPS', click: () => { } },
        ]
    };

    public topBarState = this.defaultTopBar;

    public _testClip = new Clip();
    public clips: Clip[];

    constructor(private editClipService: EditClipService) {
        this.editClipService.editingClip$.subscribe(editing => this.editingClip(editing));

        this._testClip.fileMetadata.durationMs = 593000;
        this._testClip.fileMetadata.sizeMb = 12.4;
        this._testClip.title = 'My Video';
        this._testClip.uploadToYoutube = true;

        this.clips = [
            this._copyOfTestClip(),
            this._copyOfTestClip(),
            this._copyOfTestClip(),
            this._copyOfTestClip(),
            this._copyOfTestClip(),
            this._copyOfTestClip()
        ];
    }

    editingClip(editing: boolean) {
        if (editing) {
            this.topBarState = {
                title: `Edit Clip: ${this.editClipService.selectedClip.title}`,
                back: () => { this.editClipService.closeEdit(); }
            };
        } else {
            this.topBarState = this.defaultTopBar;
        }
    }

    private _copyOfTestClip() { return JSON.parse(JSON.stringify(this._testClip)); }
}
