import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-nav-item',
    templateUrl: './nav-item.component.html',
    styleUrls: ['./nav-item.component.scss'],
    host: {
        '[class.selected]': '_selected'
    }
})
export class NavItemComponent implements OnInit {
    private _selected = false;

    @Input() icon: string;
    @Input() set selected(val: string) {
        this._selected = true;
    }

    constructor() { }

    ngOnInit() { }

}
