import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { timer } from 'rxjs';
import { NavigationService } from '../nav-drawer/navigation.service';

@Component({
    selector: 'app-splash',
    templateUrl: './splash.component.html',
    styleUrls: ['./splash.component.scss'],
    host: {
        '[class.fade-out]': 'fadeOut'
    }
})
export class SplashComponent implements OnInit {
    fadeOut = false;

    @ViewChild('splash_animation') set splashAnimation(video: ElementRef<HTMLVideoElement>) {
        if (video) {
            video.nativeElement.playbackRate = 1.5;
        }
    }

    constructor(private navigationService: NavigationService) { }

    ngOnInit() {
        timer(2500).subscribe(
            () => { this.fadeOut = true; },
        );

        timer(3000).subscribe(
            () => { this.navigationService.navigateByItem(this.navigationService.queueNavItem); }
        );
    }
}
