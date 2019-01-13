import { Component, OnInit, Input } from '@angular/core';
import { ExtendedFab } from '../extended-fab/extended-fab.component';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
    state: TopBarState;

    @Input() states?: TopBarState[];
    @Input() set currentState(state: TopBarState) {
        if (this.state) {
            this.transitionToState(state);
        } else {
            this.state = state;
        }
    }

    constructor() { }

    ngOnInit() { }

    transitionToState(state: TopBarState) {

    }
}

export interface TopBarState {
    title: string;
    back?: () => void;
    fabs: ExtendedFab[];
    actionItems: TopBarActionItem[];
}

export interface TopBarActionItem {
    icon: string;
    tooltipText: string;
    click: () => void;
}
