import { Injectable } from '@angular/core';
import { Clip } from '../shared/models/clip.model';
import { timer, Subject, Subscription } from 'rxjs';
import { MORPH_DURATION_MS } from '../shared/morph-from.directive';
import { ClipStorageService } from './clip-storage.service';

@Injectable()
export class EditClipService {
    public editingClip$ = new Subject<boolean>();

    selectedClip?: Clip;

    renderEdit = false;
    showEdit = false;
    showEditScrim = false;

    private renderEditTimer?: Subscription;
    private showEditScrimTimer?: Subscription;

    constructor(private clipStorage: ClipStorageService) { }

    editClip(clip: Clip) {
        this.selectedClip = clip;
        this.editingClip$.next(true);

        // cancel timers if another clip was clicked before they fired
        if (this.showEditScrimTimer && !this.showEditScrimTimer.closed) {
            this.showEditScrimTimer.unsubscribe();
        }
        if (this.showEditScrimTimer && this.renderEditTimer && !this.renderEditTimer.closed) {
            this.renderEditTimer.unsubscribe();
        }

        this.renderEdit = true;
        this.showEdit = true;
        this.showEditScrim = true;
    }

    save() {
        this.clipStorage.save();
        this.closeEdit();
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