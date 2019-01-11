import { Injectable } from '@angular/core';
import { NavItem } from './nav-item/nav-item.model';
import { Router } from '@angular/router';

@Injectable()
export class NavigationService {
    public readonly queueNavItem: NavItem = {
        title: 'Queue',
        icon: 'queue',
        route: '/queue',
        selected: false,
        click: () => this.navigateByItem(this.queueNavItem),
    };
    public readonly libraryNavItem: NavItem = {
        title: 'Library',
        icon: 'video_library',
        route: '/library',
        selected: false,
        click: () => this.navigateByItem(this.libraryNavItem),
    };
    public readonly connectionsNavItem: NavItem = {
        title: 'Connections',
        icon: 'people',
        route: '/connections',
        selected: false,
        click: () => this.navigateByItem(this.connectionsNavItem),
    };
    public readonly settingsNavItem: NavItem = {
        title: 'Settings',
        icon: 'settings',
        route: '/settings',
        selected: false,
        click: () => this.navigateByItem(this.settingsNavItem),
    };

    public navItems = [
        this.queueNavItem,
        this.libraryNavItem,
        this.connectionsNavItem,
        this.settingsNavItem
    ];

    constructor(private router: Router) { }

    public navigateByItem(navItem: NavItem) {
        this.navItems.forEach((i) => i.selected = false);
        navItem.selected = true;
        this.router.navigateByUrl(navItem.route);
    }
}
