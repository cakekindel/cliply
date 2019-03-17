import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Clip } from '../models/clip.model';
import { timer } from 'rxjs';
import { MORPH_DURATION_MS } from '../morph-from.directive';
import { EditClipService } from './edit-clip.service';

@Component({
    selector: 'app-clip-card',
    templateUrl: './clip-card.component.html',
    styleUrls: ['./clip-card.component.scss']
})
export class ClipCardComponent implements OnInit {
    @Input() clip = new Clip();

    @ViewChild('clip_thumbnail') clipThumbElement?: ElementRef<HTMLVideoElement>;

    constructor(public editClipService: EditClipService) { }

    ngOnInit() { }

    thumbnailMouseover() {
        if (this.clipThumbElement) {
            this.clipThumbElement.nativeElement.muted = true;
            this.clipThumbElement.nativeElement.play();
        }
    }

    thumbnailMouseleave() {
        if (this.clipThumbElement) {
            this.clipThumbElement.nativeElement.pause();
            this.clipThumbElement.nativeElement.currentTime = 0;
        }
    }
}
