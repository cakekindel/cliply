import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Clip } from '../models/clip.model';
import { timer } from 'rxjs';
import { MORPH_DURATION_MS } from '../morph-from.directive';

@Component({
    selector: 'app-clip-card',
    templateUrl: './clip-card.component.html',
    styleUrls: ['./clip-card.component.scss']
})
export class ClipCardComponent implements OnInit {
    renderEdit = false;
    showEdit = false;
    showEditScrim = false;

    @Input() clip: Clip;
    @Output() editing = new EventEmitter<() => void>();

    @ViewChild('clip_thumbnail') clipThumbElement: ElementRef<HTMLVideoElement>;

    constructor() { }

    ngOnInit() { }

    editClip() {
        this.renderEdit = true;
        this.showEdit = true;
        this.showEditScrim = true;
        this.editing.emit(() => { this.closeEdit(); });
    }

    closeEdit() {
        this.showEdit = false;

        timer(MORPH_DURATION_MS).subscribe(() => {
            this.showEditScrim = false;
        });

        timer(MORPH_DURATION_MS + 200).subscribe(() => {
            this.renderEdit = false;
        });
    }

    thumbnailMouseover() {
        this.clipThumbElement.nativeElement.muted = true;
        this.clipThumbElement.nativeElement.play();
    }

    thumbnailMouseleave() {
        this.clipThumbElement.nativeElement.pause();
        this.clipThumbElement.nativeElement.currentTime = 0;
    }
}
