import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-extended-fab',
    templateUrl: './extended-fab.component.html',
    styleUrls: ['./extended-fab.component.scss']
})
export class ExtendedFabComponent implements OnInit {
    @Input() icon: string;
    @Output() click = new EventEmitter<void>();

    constructor() { }

    ngOnInit() { }
}
