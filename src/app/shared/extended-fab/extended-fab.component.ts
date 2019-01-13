import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-extended-fab',
    templateUrl: './extended-fab.component.html',
    styleUrls: ['./extended-fab.component.scss']
})
export class ExtendedFabComponent implements OnInit {
    pressed = false;
    type: FabType = { className: 'primary', rippleColor: 'rgba(0,0,0,0.1)' };

    @Input() set secondary(val: string) {
        this.type = {
            className: 'secondary', rippleColor: 'rgba(255,255,255,0.1)'
        };
    }

    @Input() icon: string;
    @Output() clicked = new EventEmitter<void>();

    constructor() { }

    ngOnInit() { }

    mouseDown() {
        this.pressed = true;
    }

    mouseUp() {
        this.pressed = false;
        this.clicked.next();
    }
}

interface FabType {
    className: string;
    rippleColor: string;
}
