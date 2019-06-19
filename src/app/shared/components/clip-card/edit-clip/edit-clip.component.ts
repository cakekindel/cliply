import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Clip } from '../../../../core/models/clip/clip.model';
import { EditClipService } from '../../../../core/services/ui/edit-clip.service';

@Component({
    selector: 'app-edit-clip',
    templateUrl: './edit-clip.component.html',
    styleUrls: ['./edit-clip.component.scss']
})
export class EditClipComponent {
    currentTime = 0;
    youtubePrivacies = [1, 2, 3]; // YouTubePrivacy.Privacies;

    @ViewChild('videoRef') videoRef?: ElementRef<HTMLVideoElement>;

    constructor(public editClipService: EditClipService) {
        // this.currentTime = this.editClipService.clipToEdit.startAtMs;
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
