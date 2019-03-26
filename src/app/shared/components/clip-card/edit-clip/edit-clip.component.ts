import { Component, OnInit, HostListener } from '@angular/core';
import { Clip, YouTubePrivacy } from '../../../models/clip.model';
import { EditClipService } from '../../../../core/edit-clip.service';

@Component({
    selector: 'app-edit-clip',
    templateUrl: './edit-clip.component.html',
    styleUrls: ['./edit-clip.component.scss']
})
export class EditClipComponent {
    youtubePrivacies = YouTubePrivacy.Privacies;

    constructor(public editClipService: EditClipService) { }

    @HostListener('click', ['$event'])
    click(event: MouseEvent) {
        event.stopPropagation();
    }
}
