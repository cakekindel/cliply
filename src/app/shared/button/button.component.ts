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
    buttonTypes = {
        contained: { className: 'contained-btn' } as ButtonType,
        outlined: { className: 'outlined-btn' } as ButtonType,
        text: { className: 'text-btn' } as ButtonType,
    };
    type = this.buttonTypes.contained;

    @Input() set outlined(val: string) {
        this.type = this.buttonTypes.outlined;
    }

    @Input() set text(val: string) {
        this.type = this.buttonTypes.text;
    }

    @Input() icon: string;

    @Output() click = new EventEmitter<void>();

    constructor() { }

    ngOnInit() { }

    onClick(event: Event) {
        event.stopPropagation();
        this.click.next();
    }
}

export interface ButtonType {
    className: string;
}
