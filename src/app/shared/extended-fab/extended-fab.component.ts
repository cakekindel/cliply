import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-extended-fab',
    templateUrl: './extended-fab.component.html',
    styleUrls: ['./extended-fab.component.scss']
})
export class ExtendedFabComponent implements OnInit {
    pressed = false;

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
