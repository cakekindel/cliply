import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-extended-fab',
    templateUrl: './extended-fab.component.html',
    styleUrls: ['./extended-fab.component.scss']
})
export class ExtendedFabComponent implements OnInit {
    pressed = false;

    @Input() model: ExtendedFab;
    @ViewChild('file') fileInput: ElementRef<HTMLInputElement>;

    constructor() { }

    ngOnInit() { }

    mouseDown() {
        this.pressed = true;
    }

    mouseUp() {
        this.pressed = false;
        this.model.click();

        if (this.fileInput) {
            this.fileInput.nativeElement.click();
        }
    }

    filesChosen(files: FileList) {
        this.model.filesChosen(files);
    }
}

export interface ExtendedFab {
    label: string;
    icon: string;
    type: FabType;
    click: () => void;
    file?: FileOptions;
    filesChosen?: (files: FileList) => void;
}

export const FabTypes = {
    Primary: { className: 'primary', rippleColor: 'rgba(0,0,0,0.1)' } as FabType,
    Secondary: { className: 'secondary', rippleColor: 'rgba(255,255,255,0.1)' } as FabType
};

interface FabType {
    className: string;
    rippleColor: string;
}

interface FileOptions {
    accept: string;
    multiple: boolean;
}
