import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, NgZone } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import * as moment from 'moment';

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

    @Input() duration = 0;
    @Output() startAtChange = new EventEmitter<number>();
    @Output() endAtChange = new EventEmitter<number>();

    @ViewChild('startThumbRef') startThumbRef?: ElementRef<HTMLDivElement>;
    @ViewChild('endThumbRef') endThumbRef?: ElementRef<HTMLDivElement>;
    @ViewChild('activeRunnerRef') activeRunnerRef?: ElementRef<HTMLDivElement>;
    @ViewChild('sliderRef') sliderRef?: ElementRef<HTMLDivElement>;

    private _durationMoment = moment.duration(this.duration);

    startThumb: SliderThumb = {
        positionPercent: 50,
        timeStamp: '0:00',
        elementRef: this.startThumbRef,
        showLabel: false,
    };

    endThumb: SliderThumb = {
        positionPercent: 100,
        timeStamp: this._durationMoment.minutes() + ':' + this._durationMoment.seconds(),
        elementRef: this.endThumbRef,
        showLabel: false,
    };

    constructor(private zone: NgZone) { }

    thumbPointerDown(thumb: SliderThumb, event: PointerEvent) {
        thumb.showLabel = true;

        if (this.sliderRef) {
            const clientRect = this.sliderRef.nativeElement.getClientRects()[0];
            this._sliderClientLeft = clientRect.left;
            this._sliderWidth = clientRect.width;
        }

        if (thumb.elementRef) {
            thumb.elementRef.nativeElement.onpointermove = this.onPointerMove(thumb);
            thumb.elementRef.nativeElement.setPointerCapture(event.pointerId);
        }
    }

    thumbPointerUp(thumb: SliderThumb, event: PointerEvent) {
        thumb.showLabel = false;

        if (thumb.elementRef) {
            thumb.elementRef.nativeElement.onpointermove = null;
            thumb.elementRef.nativeElement.releasePointerCapture(event.pointerId);
        }
    }

    onPointerMove(thumb: SliderThumb) {
        return (event: PointerEvent) => {
            this.zone.run(() => {
                thumb.positionPercent = ((event.clientX - this._sliderClientLeft) / this._sliderWidth) * 100;

                if (thumb.positionPercent < 0) {
                    thumb.positionPercent = 0;
                } else if (thumb.positionPercent > 100) {
                    thumb.positionPercent = 100;
                }
            });
        };
    }

    ngOnInit() {
        if (this.duration) {
            this._durationMoment = moment.duration(this.duration);
        }

        if (this.startThumbRef) {
            this.startThumb.elementRef = this.startThumbRef;
        }

        if (this.endThumbRef) {
            this.endThumb.elementRef = this.endThumbRef;
        }
    }
}

interface SliderThumb {
    positionPercent: number;
    elementRef?: ElementRef<HTMLDivElement>;
    timeStamp: string;
    showLabel: boolean;
}
