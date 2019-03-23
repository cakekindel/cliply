import { Component, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Clip } from '../../../models/clip.model';

@Component({
  selector: 'app-thumb-hover-preview',
  templateUrl: './thumb-hover-preview.component.html',
  styleUrls: ['./thumb-hover-preview.component.scss']
})
export class ThumbHoverPreviewComponent {
    public hovering = false;

    @Input() clip = new Clip();
    @ViewChild('video_preview') videoPreviewElementRef?: ElementRef<HTMLVideoElement>;

    constructor() { }

    @HostListener('mouseover')
    onMouseOver() {
        this.hovering = true;

        if (this.videoPreviewElementRef) {
            this.videoPreviewElementRef.nativeElement.currentTime = 0;
            this.videoPreviewElementRef.nativeElement.muted = true;
            this.videoPreviewElementRef.nativeElement.play();
        }
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.hovering = false;
    }
}
