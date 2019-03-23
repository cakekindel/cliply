import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { timer } from 'rxjs';
import { NavigationService } from '../core/navigation.service';

@Component({
    selector: 'app-splash',
    templateUrl: './splash.component.html',
    styleUrls: ['./splash.component.scss'],
    host: {
        '[class.fade-out]': 'fadeOut',
    }
})
export class SplashComponent implements OnInit {
    fadeOut = false;
    videoDuration = 2000;
    fadeDuration = 500;

    constructor(private navigationService: NavigationService) { }

    ngOnInit() {
        timer(this.fadeDuration + this.videoDuration).subscribe(
            () => { this.fadeOut = true; },
        );

        timer(this.fadeDuration + this.videoDuration + this.fadeDuration).subscribe(
            () => { this.navigationService.navigateByItem(this.navigationService.navItems.queue); }
        );
    }
}
