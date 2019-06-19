import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { ClipsService } from '../../core/services/ui';

@Component({
    selector: 'cliply-clips',
    templateUrl: './clips.component.html',
    styleUrls: ['./clips.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipsComponent implements OnInit {
    constructor(public clipsService: ClipsService, private cdRef: ChangeDetectorRef) { }

    public ngOnInit(): void {
        this.clipsService.clips$.subscribe(() => this.cdRef.detectChanges());
    }
}
