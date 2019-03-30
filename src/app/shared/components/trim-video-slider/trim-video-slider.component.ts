import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import * as moment from 'moment';
import { Observable, fromEvent, of } from 'rxjs';
import {  takeWhile } from 'rxjs/operators';

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
    ],
})
export class TrimVideoSliderComponent implements OnInit {
    private _sliderClientLeft = 0;
    private _sliderWidth = 0;
    public draggingThumb = false;

    @Input() duration = 0;
    @Output() startAtChange = new EventEmitter<number>();
    @Output() endAtChange = new EventEmitter<number>();

    @ViewChild('startThumbRef') startThumbRef?: ElementRef<HTMLDivElement>;
    @ViewChild('endThumbRef') endThumbRef?: ElementRef<HTMLDivElement>;
    @ViewChild('activeRunnerRef') activeRunnerRef?: ElementRef<HTMLDivElement>;
    @ViewChild('sliderRef') sliderRef?: ElementRef<HTMLDivElement>;

    startThumb: SliderThumb = {
        positionPercent: 0,
        showLabel: false,
        timeStamp: '',
    };

    endThumb: SliderThumb = {
        positionPercent: 0,
        showLabel: false,
        timeStamp: '',
    };

    constructor() { }

    thumbPointerDown(thumb: SliderThumb, event: PointerEvent) {
        thumb.showLabel = true;
        this.draggingThumb = true;

        if (this.sliderRef) {
            const clientRect = this.sliderRef.nativeElement.getClientRects()[0];
            this._sliderClientLeft = clientRect.left;
            this._sliderWidth = clientRect.width;
        }

        if (thumb.elementRef) {
            const onPointerMoveObservable = fromEvent(thumb.elementRef.nativeElement, 'pointermove') as Observable<PointerEvent>;

            onPointerMoveObservable.pipe(takeWhile(() => {
                                        if (thumb && thumb.elementRef) {
                                            return thumb.elementRef.nativeElement.hasPointerCapture(event.pointerId);
                                        } else {
                                            return false;
                                        }
                                    }))
                                    .subscribe((e) => this.onPointerMove(thumb, e));

            thumb.elementRef.nativeElement.setPointerCapture(event.pointerId);
        }
    }

    thumbPointerUp(thumb: SliderThumb, event: PointerEvent) {
        this.draggingThumb = false;
        if (thumb.elementRef) {
            thumb.elementRef.nativeElement.onpointermove = null;
            thumb.elementRef.nativeElement.releasePointerCapture(event.pointerId);
        }
    }

    onPointerMove(thumb: SliderThumb, event: PointerEvent) {
        const thumbWidth = (event.target as HTMLDivElement).clientWidth;

        let rawPercent = ((event.clientX - this._sliderClientLeft - thumbWidth / 2) / this._sliderWidth);

        if (thumb === this.endThumb) {
            rawPercent = ((event.clientX - this._sliderClientLeft + thumbWidth / 2) / this._sliderWidth);
        }

        thumb.positionPercent = Math.round(rawPercent * 1000) / 10;

        if (thumb.positionPercent < 0) {
            thumb.positionPercent = 0;
        } else if (thumb.positionPercent > 100) {
            thumb.positionPercent = 100;
        }

        const thumbTime = this.duration * (thumb.positionPercent / 100);
        thumb.timeStamp = this.toTimestamp(thumbTime);

        if (thumb === this.startThumb) {
            this.startAtChange.emit(thumbTime);
        } else {
            this.endAtChange.emit(thumbTime);
        }
    }

    ngOnInit() {
        if (this.startThumbRef) {
            this.startThumb.elementRef = this.startThumbRef;
        }

        if (this.endThumbRef) {
            this.endThumb.elementRef = this.endThumbRef;
        }

        this.startThumb = {
            positionPercent: 0,
            timeStamp: '00:00',
            elementRef: this.startThumbRef,
            showLabel: false,
        };

        this.endThumb = {
            positionPercent: 100,
            timeStamp: this.toTimestamp(this.duration),
            elementRef: this.endThumbRef,
            showLabel: false,
        };
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
