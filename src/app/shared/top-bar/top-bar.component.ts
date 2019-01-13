import { Component, OnInit, Input } from '@angular/core';
import { ExtendedFab } from '../extended-fab/extended-fab.component';
import { timer } from 'rxjs';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
    state: TopBarState;
    fadeOutItems = false;
    fadeInItems = false;
    hasFabs = false;

    @Input() set currentState(state: TopBarState) {
        this.hasFabs = state.fabs && state.fabs.length > 0;
        if (this.state) {
            this.transitionToState(state);
        } else {
            this.state = state;
        }
    }

    constructor() { }

    ngOnInit() { }

    transitionToState(state: TopBarState) {
        this.fadeOutItems = true;

        timer(300).subscribe(() => {
            this.state = state;
            this.fadeOutItems = false;
            this.fadeInItems = true;
        });
    }
}

export interface TopBarState {
    title: string;
    back?: () => void;
    fabs?: ExtendedFab[];
    actionItems?: TopBarActionItem[];
}

export interface TopBarActionItem {
    icon: string;
    tooltipText: string;
    click: () => void;
}
