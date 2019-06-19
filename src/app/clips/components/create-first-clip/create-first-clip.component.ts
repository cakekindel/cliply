import { Component, OnInit } from '@angular/core';
import { trigger } from '@angular/animations';

@Component({
    selector: 'cliply-create-first-clip',
    templateUrl: './create-first-clip.component.html',
    styleUrls: ['./create-first-clip.component.scss'],
    animations: [
        // smiley on hover!!
    ],
})
export class CreateFirstClipComponent implements OnInit {
    constructor() { }

    public ngOnInit(): void { }
}
