import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Notfound } from './app/pages/notfound/notfound';
import { authMatchGuard } from '@/auth/auth.guard';

export const appRoutes: Routes = [
    { path: 'login', loadComponent: () => import('./app/login/login.component').then(m => m.LoginComponent) },
    { path: 'auth/callback', loadComponent: () => import('./app/login/callback.component').then(m => m.CallbackComponent) },  
     // Protected app shell
    {
        path: '',
        component: AppLayout,
        canMatch: [authMatchGuard],   //blocks entire shell unless authenticated
        children: [
            { path: '', component: Dashboard },
            // If pages.routes exports `default`: use m => m.default
            // If it exports `routes`: use m => m.routes
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes').then(m => m.default) }
            // or: .then(m => m.routes)
        ]
    },
    { path: 'notfound', component: Notfound },
    //{ path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
