import { Route } from '@angular/router';
import { RouteWithPath } from '../../core/models/utility';

import { ClipsComponent } from '../components/clips.component';
import { EditClipComponent } from '../../shared/components/clip-card/edit-clip/edit-clip.component';

export class ClipsViewRoutes {
    public static readonly base: RouteWithPath = {
        path: '',
        component: ClipsComponent,
    };

    public static readonly editClip: RouteWithPath = {
        path: 'edit/:clipId',
        component: EditClipComponent,
        outlet: 'clips-modal-router'
    };

    public static readonly routes: Route[] = [
        ClipsViewRoutes.base,
        ClipsViewRoutes.editClip,
    ];
}
