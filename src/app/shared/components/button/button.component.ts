import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    host: {
        '[class]': 'type.className',
    }
})
export class ButtonComponent implements OnInit {
    pressed = false;

    buttonTypes = {
        contained: { className: 'contained-btn', rippleColor: 'rgba(0,0,0,0.1)' } as ButtonType,
        outlined: { className: 'outlined-btn', rippleColor: 'rgba(255,255,255,0.1)' } as ButtonType,
        text: { className: 'text-btn', rippleColor: 'rgba(255,255,255,0.1)' } as ButtonType,
    };
    type = this.buttonTypes.contained;

    @Input() set outlined(val: string) { this.type = this.buttonTypes.outlined; }
    @Input() set text(val: string) { this.type = this.buttonTypes.text; }

    @Input() icon?: string;
    @Output() clicked = new EventEmitter<void>();

    constructor() { }

    ngOnInit() { }

    mouseDown(event: MouseEvent) {
        event.stopPropagation();
        this.pressed = true;
    }

    mouseUp() {
        this.pressed = false;
        this.clicked.next();
    }
}

export interface ButtonType {
    className: string;
    rippleColor: string;
}
