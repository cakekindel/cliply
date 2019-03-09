import { Component, OnInit } from '@angular/core';
import { NavigationService } from './navigation.service';

@Component({
    selector: 'app-nav-drawer',
    templateUrl: './nav-drawer.component.html',
    styleUrls: ['./nav-drawer.component.scss']
})
export class NavDrawerComponent implements OnInit {
    constructor(public navService: NavigationService) { }

    ngOnInit() { }
}
