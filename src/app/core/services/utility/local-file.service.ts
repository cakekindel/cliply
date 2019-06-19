import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ElectronService } from './electron.service';

@Injectable()
export class LocalFileService {
    constructor(private electron: ElectronService) { }

    public write(path: string, data: string): Observable<void> {
        return new Observable((sub) => {
            this.electron.fs.writeFile(path, data, (err) => {
                if (err) {
                    sub.error(err);
                } else {
                    sub.next();
                }

                sub.complete();
            });
        });
    }

    public read<TContents extends object>(path: string): Observable<TContents | undefined> {
        return new Observable<TContents>((sub) => {
            this.electron.fs.readFile(path, 'utf8', (err, data) => {
                if (err) {
                    sub.next(undefined);
                }

                sub.next(JSON.parse(data));
                sub.complete();
            });
        });
    }

    public exists(path: string): Observable<boolean> {
        const existsFlag = this.electron.fs.constants.F_OK;

        return new Observable<boolean>((sub) => {
            this.electron.fs.access(path, existsFlag, (err) => {
                if (err) {
                    sub.next(false);
                } else {
                    sub.next(true);
                }

                sub.complete();
            });
        });
    }

    public isWriteable(path: string): Observable<boolean> {
        const writeAllowedFlag = this.electron.fs.constants.W_OK;

        return new Observable<boolean>((sub) => {
            this.electron.fs.access(path, writeAllowedFlag, (err) => {
                if (err) {
                    sub.next(false);
                } else {
                    sub.next(true);
                }

                sub.complete();
            });
        });
    }
}
