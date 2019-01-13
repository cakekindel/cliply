import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Clip } from '../models/clip.model';

@Component({
    selector: 'app-clip-card',
    templateUrl: './clip-card.component.html',
    styleUrls: ['./clip-card.component.scss']
})
export class ClipCardComponent implements OnInit {
    private _clipThumbElement: ElementRef<HTMLVideoElement>;
    isEditing = false;

    @Input() clip: Clip;
    @Output() editing = new EventEmitter<boolean>();

    @ViewChild('clip_thumbnail') set clipThumbElement(el: ElementRef<HTMLVideoElement>) {
        this._clipThumbElement = el;
    }

    constructor() { }

    ngOnInit() { }

    clicked() {
        this.isEditing = true;
        this.editing.next(true);
    }

    thumbnailMouseover() {
        this._clipThumbElement.nativeElement.muted = true;
        this._clipThumbElement.nativeElement.play();
    }

    thumbnailMouseleave() {
        this._clipThumbElement.nativeElement.pause();
        this._clipThumbElement.nativeElement.currentTime = 0;
    }
}
