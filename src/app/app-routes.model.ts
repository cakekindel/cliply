import { Route } from '@angular/router';

import { SplashComponent } from './splash/splash.component';
import { RouteWithPath } from './core/models/utility';

export class AppRoutes {
    public static readonly clips: RouteWithPath = {
        path: 'clips',
        loadChildren: 'app/clips/clips.module#ClipsModule',
    };

    public static readonly queue: RouteWithPath = {
        path: 'queue',
        loadChildren: 'app/queue/queue.module#QueueModule',
    };

    public static readonly settings: RouteWithPath = {
        path: 'settings',
        loadChildren: 'app/settings/settings.module#SettingsModule',
    };

    public static readonly splashScreen: RouteWithPath = {
        path: 'splash',
        component: SplashComponent,
    };

    public static readonly blankRedirectToClips: RouteWithPath = {
        path: '**',
        redirectTo: '/clips',
        pathMatch: 'full',
    };

    public static readonly routes: Route[] = [
        AppRoutes.clips,
        AppRoutes.queue,
        AppRoutes.splashScreen,
        // AppRoutes.settings,
        AppRoutes.blankRedirectToClips,
    ];
}
