import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { LocalFileService } from './local-file.service';
import { ElectronService } from './electron.service';

import { JsonStoreBase } from '../../models/utility/json-store';

@Injectable()
export class JsonStoreService {
    constructor(private electron: ElectronService, private files: LocalFileService) { }

    public load<TStore extends JsonStoreBase<TContents>, TContents extends object>(file: TStore): Observable<TStore> {
        const filePath = `${this.electron.userDataDir}/${file.fileName}`;

        return this.files.read<TContents>(filePath)
                   .pipe(
                       tap((contents) => {
                           if (contents !== undefined) {
                               file.contents = contents;
                           }
                       }),
                       switchMap((contents) => !contents ? this.save(file) : of<void>()),
                       switchMap(() => of(file)),
                   );
    }

    public save<TStore extends JsonStoreBase<TContents>, TContents extends object>(file: TStore): Observable<void> {
        const filePath = `${this.electron.userDataDir}/${file.fileName}`;
        const contentsJson = JSON.stringify(file.contents);

        return this.files.write(filePath, contentsJson);
    }
}
