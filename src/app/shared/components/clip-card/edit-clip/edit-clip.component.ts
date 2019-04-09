import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Clip, YouTubePrivacy } from '../../../models/clip.model';
import { EditClipService } from '../../../../core/edit-clip.service';

@Component({
    selector: 'app-edit-clip',
    templateUrl: './edit-clip.component.html',
    styleUrls: ['./edit-clip.component.scss']
})
export class EditClipComponent {
    currentTime = 0;
    youtubePrivacies = YouTubePrivacy.Privacies;

    @ViewChild('videoRef') videoRef?: ElementRef<HTMLVideoElement>;

    constructor(public editClipService: EditClipService) {
        this.currentTime = this.editClipService.clipToEdit.startAtMs;
        this.updateThumbnail(this.currentTime);
    }

    @HostListener('mousedown', ['$event'])
    public mousedown(event: MouseEvent) {
        event.stopPropagation();
    }

    public updateThumbnail(timeMs: number) {
        if (this.videoRef) {
            this.videoRef.nativeElement.currentTime = timeMs / 1000;
        }
    }
}
