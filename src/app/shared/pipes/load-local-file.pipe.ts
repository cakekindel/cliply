import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'loadLocalFile'
})
export class LoadLocalFilePipe implements PipeTransform {
    constructor(private domSanitizer: DomSanitizer) { }

    transform(path: string) {
        if (!path) {
            return '';
        }

        return this.domSanitizer.bypassSecurityTrustUrl('file://' + path.replace(/\\/g, '/'));
    }
}
