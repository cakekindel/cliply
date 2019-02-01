import { Component, OnInit, HostListener } from '@angular/core';
import { Clip, YouTubePrivacy } from '../../models/clip.model';
import { EditClipService } from '../edit-clip.service';

@Component({
    selector: 'app-edit-clip',
    templateUrl: './edit-clip.component.html',
    styleUrls: ['./edit-clip.component.scss']
})
export class EditClipComponent {
    clip?: Clip;
    youtubePrivacies = YouTubePrivacy.enum;

    constructor(private editClipService: EditClipService) {
        this.clip = editClipService.selectedClip;
    }

    @HostListener('click', ['$event'])
    click(event: MouseEvent) {
        event.stopPropagation();
    }
}
