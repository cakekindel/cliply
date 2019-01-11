import { Component, OnInit, Input, HostListener } from '@angular/core';
import { NavItem } from './nav-item.model';

@Component({
    selector: 'app-nav-item',
    templateUrl: './nav-item.component.html',
    styleUrls: ['./nav-item.component.scss'],
    host: {
        '[class.selected]': 'navItem.selected'
    }
})
export class NavItemComponent implements OnInit {
    @Input() navItem: NavItem;
    @HostListener('click') onClick = () => { this.navItem.click(); };

    constructor() { }

    ngOnInit() { }

}
