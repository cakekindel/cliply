import { Component, OnInit } from '@angular/core';
import { TopBarState } from '../shared/components/top-bar/top-bar.component';
import { FabTypes } from '../shared/components/extended-fab/extended-fab.component';
import { EditClipService } from '../core/edit-clip.service';
import { ClipStorageService } from '../core/clip-storage.service';

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
                filesChosen: (files) => {
                    if (files.length >= 1) {
                        this.clipStorage.newClips(files);
                    }
                }
            },
            { icon: 'play_arrow', type: FabTypes.Secondary, label: 'EXPORT ALL CLIPS', click: () => { } },
        ]
    };

    public topBarState = this.defaultTopBar;

    constructor(private editClipService: EditClipService, public clipStorage: ClipStorageService) {
        this.editClipService.editingClip$.subscribe(editing => this.editingClip(editing));
    }

    editingClip(editing: boolean) {
        if (editing && this.editClipService.selectedClip) {
            this.topBarState = {
                title: `Edit Clip: ${this.editClipService.selectedClip.title}`,
                back: () => { this.editClipService.closeEdit(); }
            };
        } else {
            this.topBarState = this.defaultTopBar;
        }
    }
}
