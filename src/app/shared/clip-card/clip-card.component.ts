import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Clip } from '../models/clip.model';

@Component({
    selector: 'app-clip-card',
    templateUrl: './clip-card.component.html',
    styleUrls: ['./clip-card.component.scss']
})
export class ClipCardComponent implements OnInit {
    private _clipThumbElement: ElementRef<HTMLVideoElement>;

    @Input() clip: Clip;
    @ViewChild('clip_thumbnail') set clipThumbElement(el: ElementRef<HTMLVideoElement>) {
        this._clipThumbElement = el;
    }

    constructor() { }

    ngOnInit() { }

    thumbnailMouseover() {
        this._clipThumbElement.nativeElement.muted = true;
        this._clipThumbElement.nativeElement.play();
    }

    thumbnailMouseleave() {
        this._clipThumbElement.nativeElement.pause();
        this._clipThumbElement.nativeElement.currentTime = 0;
    }
}
