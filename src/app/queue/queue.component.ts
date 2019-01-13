import { Component, OnInit } from '@angular/core';
import { Clip } from '../shared/models/clip.model';

@Component({
    selector: 'app-queue',
    templateUrl: './queue.component.html',
    styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
    public testClip = new Clip();

    constructor() {
        this.testClip.fileMetadata.durationMs = 593000;
        this.testClip.fileMetadata.sizeMb = 12.4;
        this.testClip.title = 'My Video';
        this.testClip.uploadToYoutube = true;
    }

    ngOnInit() { }

}
