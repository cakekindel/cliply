import { Injectable } from '@angular/core';
import { NavItem } from './nav-item/nav-item.model';

@Injectable()
export class NavigationService {
    private queueNavItem: NavItem = {
        title: 'Queue',
        icon: 'queue',
        route: '/queue',
        selected: true,
    };
    private libraryNavItem: NavItem = {
        title: 'Library',
        icon: 'video_library',
        route: '/library',
        selected: false,
    };
    private connectionsNavItem: NavItem = {
        title: 'Connections',
        icon: 'people',
        route: '/connections',
        selected: false,
    };
    private settingsNavItem: NavItem = {
        title: 'Settings',
        icon: 'settings',
        route: '/settings',
        selected: false,
    };

    public navItems = [
        this.queueNavItem,
        this.libraryNavItem,
        this.connectionsNavItem,
        this.settingsNavItem
    ];
}
