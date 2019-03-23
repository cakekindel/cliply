import { Injectable } from '@angular/core';
import { NavItem } from '../nav-drawer/nav-item/nav-item.model';
import { Router } from '@angular/router';

@Injectable()
export class NavigationService {
    public readonly navItems: {
        queue: NavItem,
        library: NavItem,
        connections: NavItem,
        settings: NavItem,
    } = {
            queue: {
                title: 'Queue',
                icon: 'queue',
                route: '/queue',
                selected: false,
                click: () => this.navigateByItem(this.navItems.queue),
            } as NavItem,
            library: {
                title: 'Library',
                icon: 'video_library',
                route: '/library',
                selected: false,
                click: () => this.navigateByItem(this.navItems.library),
            } as NavItem,
            connections: {
                title: 'Connections',
                icon: 'people',
                route: '/connections',
                selected: false,
                click: () => this.navigateByItem(this.navItems.connections),
            } as NavItem,
            settings: {
                title: 'Settings',
                icon: 'settings',
                route: '/settings',
                selected: false,
                click: () => this.navigateByItem(this.navItems.settings),
            } as NavItem,
        };

    public navItemsIterable = [
        this.navItems.queue,
        this.navItems.library,
        this.navItems.connections,
        this.navItems.settings,
    ];

    constructor(private router: Router) { }

    public navigateByItem(navItem: NavItem) {
        this.navItemsIterable.forEach((i) => i.selected = false);
        navItem.selected = true;
        this.router.navigateByUrl(navItem.route);
    }
}
