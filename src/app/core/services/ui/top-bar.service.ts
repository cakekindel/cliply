import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AppRoutes } from '../../../app-routes.model';

import { RoutableIcon, MaterialIcon } from '../../models/ui';

@Injectable()
export class TopBarService {
    private quickButtonDefault = new RoutableIcon(MaterialIcon.Settings, [ AppRoutes.settings.path ]);
    private quickButtonSubject$ = new BehaviorSubject<RoutableIcon>(this.quickButtonDefault);

    public quickButton$ = this.quickButtonSubject$.asObservable();

    public setQuickButton(quickButton?: RoutableIcon): void {
        this.quickButtonSubject$.next(quickButton || this.quickButtonDefault);
    }
}
