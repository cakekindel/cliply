import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { RoutableIcon } from '../core/models/ui';
import { Router } from '@angular/router';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent implements OnInit {
    @Input() quickButton$?: Observable<RoutableIcon>;

    constructor(private router: Router) { }

    ngOnInit() { }

    public quickButtonClick(quickButton: RoutableIcon) {
        this.router.navigate(quickButton.routes);
    }
}
