import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Clip } from '../models/clip.model';
import { timer } from 'rxjs';

@Component({
    selector: 'app-clip-card',
    templateUrl: './clip-card.component.html',
    styleUrls: ['./clip-card.component.scss']
})
export class ClipCardComponent implements OnInit {
    isEditing = false;
    expandEditCard = false;
    fadeOutEditCard = false;
    clipCardTop: number;
    clipCardLeft: number;

    @Input() clip: Clip;
    @Output() editing = new EventEmitter<() => void>();

    @ViewChild('clip_thumbnail') clipThumbElement: ElementRef<HTMLVideoElement>;
    @ViewChild('clip_card') clipCard: ElementRef<HTMLDivElement>;

    constructor() { }

    ngOnInit() { }

    editClip() {
        this.clipCardTop = this.clipCard.nativeElement.offsetTop;
        this.clipCardLeft = this.clipCard.nativeElement.offsetLeft;

        this.isEditing = true;
        this.editing.next(() => { this.cancelEdit(); });
        timer(200).subscribe(() => {
            this.expandEditCard = true;
        });
    }

    cancelEdit() {
        this.expandEditCard = false;
        timer(400).subscribe(() => {
            this.fadeOutEditCard = true;
            this.isEditing = false;
        });
        timer(600).subscribe(() => {
            this.fadeOutEditCard = false;
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
