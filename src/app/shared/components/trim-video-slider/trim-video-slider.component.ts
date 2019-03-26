import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
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
    @Input() duration = 0;
    @Output() startAtChange = new EventEmitter<number>();
    @Output() endAtChange = new EventEmitter<number>();

    @ViewChild('startThumbRef') startThumbRef?: ElementRef<HTMLDivElement>;
    @ViewChild('endThumbRef') endThumbRef?: ElementRef<HTMLDivElement>;
    @ViewChild('activeRunnerRef') activeRunnerRef?: ElementRef<HTMLDivElement>;

    private _durationMoment = moment.duration(this.duration);

    startThumb: SliderThumb = {
        positionPercent: 50,
        timeStamp: '0:00',
        elementRef: this.startThumbRef,
    };

    endThumb: SliderThumb = {
        positionPercent: 0,
        timeStamp: this._durationMoment.minutes() + ':' + this._durationMoment.seconds(),
        elementRef: this.endThumbRef,
    };

    thumbMouseDown(thumb: SliderThumb, event: Event) { }
    thumbMouseUp(thumb: SliderThumb, event: Event) { }

    constructor() { }

    ngOnInit() {
        if (this.duration) {
            this._durationMoment = moment.duration(this.duration);
        }
    }
}

interface SliderThumb {
    positionPercent: number;
    elementRef?: ElementRef<HTMLDivElement>;
    timeStamp: string;
}
