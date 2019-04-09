import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, HostListener } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import * as moment from 'moment';
import { Observable, fromEvent, Subject } from 'rxjs';
import {  takeWhile, debounceTime } from 'rxjs/operators';
import { Clip } from '../../models/clip.model';

@Component({
    selector: 'app-trim-video-slider',
    templateUrl: './trim-video-slider.component.html',
    styleUrls: ['./trim-video-slider.component.scss'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('0.1s', style({ opacity: 1 })),
            ]),
            transition(':leave', [
                style({ opacity: 1 }),
                animate('0.1s', style({ opacity: 0 })),
            ])
        ]),
        trigger('fadeOut', [
            transition(':leave', [
                style({ opacity: 1 }),
                animate('0.1s', style({ opacity: 0 }))
            ]),
        ]),
    ],
})
export class TrimVideoSliderComponent implements OnInit {
    private sliderLeft = 0;
    private sliderWidth = 0;
    public draggingThumb?: SliderThumb;
    public showProgressThumbGhost = false;
    public progressThumbReturning = false;
    public progressThumbGhostLeft?: number;

    private updateThumbnailDebounce = new Subject<number>();
    @Output() updateThumbnail = new EventEmitter<number>();

    @Input() clip = new Clip();

    private currentTimeValue = 0;
    @Input() get currentTime() {
        return this.currentTimeValue;
    }
    set currentTime(val: number) {
        this.currentTimeValue = val;
        this.currentTimeChange.emit(val);
    }
    @Output() currentTimeChange = new EventEmitter<number>();

    @ViewChild('startThumbRef') startThumbRef?: ElementRef<HTMLDivElement>;
    @ViewChild('progressThumbRef') progressThumbRef?: ElementRef<HTMLDivElement>;
    @ViewChild('endThumbRef') endThumbRef?: ElementRef<HTMLDivElement>;
    @ViewChild('activeRunnerRef') activeRunnerRef?: ElementRef<HTMLDivElement>;
    @ViewChild('sliderRef') sliderRef?: ElementRef<HTMLDivElement>;

    startThumb: SliderThumb = {
        positionPercent: 0,
        showLabel: false,
        timeStamp: '',
    };

    progressThumb: SliderThumb = {
        positionPercent: 0,
        showLabel: false,
        timeStamp: '',
    };

    endThumb: SliderThumb = {
        positionPercent: 0,
        showLabel: false,
        timeStamp: '',
    };

    ngOnInit() {
        // this gets destroyed and recreated, so use a getter
        const getProgressThumbRef = () => this.progressThumbRef;

        this.startThumb = {
            positionPercent: this.msToPercent(this.clip.startAtMs),
            timeStamp: this.toTimestamp(this.clip.startAtMs),
            elementRef: this.startThumbRef,
            showLabel: false,
        };

        this.progressThumb = {
            positionPercent: this.startThumb.positionPercent,
            timeStamp: this.startThumb.timeStamp,
            get elementRef() { return getProgressThumbRef(); },
            showLabel: false,
        };

        this.endThumb = {
            positionPercent: this.msToPercent(this.clip.endAtMs),
            timeStamp: this.toTimestamp(this.clip.endAtMs),
            elementRef: this.endThumbRef,
            showLabel: false,
        };

        this.updateThumbnailDebounce
            .pipe(debounceTime(10))
            .subscribe((time) => this.updateThumbnail.emit(time));

        this.updateThumbnailDebounce.next(this.currentTime);
    }

    @HostListener('pointermove', ['$event'])
    hostPointerMove(event: PointerEvent) {
        this.progressThumbReturning = false;
        this.progressThumb.showLabel = true;
        this.showProgressThumbGhost = true;

        if (this.progressThumbGhostLeft === undefined) {
            this.progressThumbGhostLeft = this.progressThumb.positionPercent;
        }

        if (this.sliderRef) {
            const clientRect = this.sliderRef.nativeElement.getClientRects()[0];
            this.sliderLeft = clientRect.left;
            this.sliderWidth = clientRect.width;

            if (this.draggingThumb) {
                this.thumbPointerMove(this.draggingThumb, event);
            } else {
                this.thumbPointerMove(this.progressThumb, event);
            }
        }
    }

    @HostListener('pointerleave', ['$event'])
    hostPointerLeave(event: PointerEvent) {
        this.progressThumbReturning = true;
        this.showProgressThumbGhost = false;
        this.progressThumbGhostLeft = undefined;

        this.progressThumb.showLabel = false;
        this.progressThumb.positionPercent = this.msToPercent(this.currentTime);
        this.updateThumbnailDebounce.next(this.currentTime);
    }

    thumbPointerDown(thumb: SliderThumb, event: PointerEvent) {
        if (thumb.elementRef) {
            thumb.elementRef.nativeElement.setPointerCapture(event.pointerId);
        }

        this.showProgressThumbGhost = false;
        thumb.showLabel = true;
        this.draggingThumb = thumb;
    }

    thumbPointerUp(thumb: SliderThumb, event: PointerEvent) {
        this.draggingThumb = undefined;

        const positionMs = this.percentToMs(thumb.positionPercent);
        if (thumb === this.startThumb) {
            this.clip.startAtMs = positionMs;
            this.progressThumb.positionPercent = thumb.positionPercent;
            this.currentTime = this.percentToMs(thumb.positionPercent);
        } else if (thumb === this.endThumb) {
            this.clip.endAtMs = positionMs;
        }

        if (thumb.elementRef) {
            thumb.elementRef.nativeElement.releasePointerCapture(event.pointerId);
        }
    }

    thumbPointerMove(thumb: SliderThumb, event: PointerEvent) {
        if (!thumb.elementRef) {
            return;
        }

        const thumbWidth = thumb.elementRef.nativeElement.clientWidth;

        let rawPercent = ((event.clientX - this.sliderLeft - thumbWidth / 2) / this.sliderWidth);

        if (thumb === this.endThumb) {
            rawPercent = ((event.clientX - this.sliderLeft + thumbWidth / 2) / this.sliderWidth);
        }

        thumb.positionPercent = Math.round(rawPercent * 1000) / 10;

        if (thumb.positionPercent < 0) {
            thumb.positionPercent = 0;
        } else if (thumb.positionPercent > 100) {
            thumb.positionPercent = 100;
        }

        const thumbTime = this.clip.durationMs * (thumb.positionPercent / 100);
        thumb.timeStamp = this.toTimestamp(thumbTime);

        this.updateThumbnailDebounce.next(thumbTime);
    }

    shouldShowProgressThumb() {
        const closeToStartThumb = this.progressThumb.positionPercent > this.startThumb.positionPercent - 1
                                  && this.progressThumb.positionPercent < this.startThumb.positionPercent + 1;

        const closeToEndThumb = this.progressThumb.positionPercent > this.endThumb.positionPercent - 2
                                && this.progressThumb.positionPercent < this.endThumb.positionPercent + 1;

        return !this.draggingThumb && !closeToStartThumb && !closeToEndThumb;
    }

    progressThumbClick() {
        this.currentTime = this.percentToMs(this.progressThumb.positionPercent);
        this.progressThumbGhostLeft = this.progressThumb.positionPercent;
        this.showProgressThumbGhost = false;
    }

    private percentToMs(percent: number) {
        return this.clip.durationMs * (percent / 100);
    }

    private msToPercent(ms: number) {
        return Math.round((ms / this.clip.durationMs) * 10000) / 100;
    }

    private toTimestamp(duration: number) {
        return moment.utc(duration).format('mm:ss');
    }
}

interface SliderThumb {
    positionPercent: number;
    elementRef?: ElementRef<HTMLDivElement>;
    timeStamp: string;
    showLabel: boolean;
}
