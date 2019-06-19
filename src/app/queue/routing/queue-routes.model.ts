import { Route } from '@angular/router';
import { RouteWithPath } from '../../core/models/utility';
import { EditClipComponent } from '../../shared/components/clip-card/edit-clip/edit-clip.component';
import { QueueComponent } from '../queue.component';

export class QueueRoutes {
    public static readonly base: RouteWithPath = {
        path: '',
        component: QueueComponent,
    };

    public static readonly editClip: RouteWithPath = {
        path: 'edit/:clipId',
        component: EditClipComponent,
    };

    public static readonly routes: Route[] = [];
}
