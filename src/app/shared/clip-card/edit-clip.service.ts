import { Injectable } from '@angular/core';
import { Clip } from '../models/clip.model';
import { timer, Subject, Subscription } from 'rxjs';
import { MORPH_DURATION_MS } from '../morph-from.directive';

@Injectable()
export class EditClipService {
    public editingClip$ = new Subject<boolean>();

    selectedClip: Clip;

    renderEdit = false;
    showEdit = false;
    showEditScrim = false;

    private renderEditTimer: Subscription;
    private showEditScrimTimer: Subscription;

    constructor() { }

    editClip(clip: Clip) {
        this.selectedClip = clip;
        this.editingClip$.next(true);

        // cancel timers if another clip was clicked before they fired
        if (this.showEditScrimTimer && !this.showEditScrimTimer.closed) {
            this.showEditScrimTimer.unsubscribe();
        }
        if (this.showEditScrimTimer && !this.renderEditTimer.closed) {
            this.renderEditTimer.unsubscribe();
        }

        this.renderEdit = true;
        this.showEdit = true;
        this.showEditScrim = true;
    }

    closeEdit() {
        this.showEdit = false;
        this.editingClip$.next(false);

        this.showEditScrimTimer = timer(MORPH_DURATION_MS).subscribe(() => {
            this.showEditScrim = false;
        });

        this.renderEditTimer = timer(MORPH_DURATION_MS + 200).subscribe(() => {
            this.renderEdit = false;
        });
    }
}
