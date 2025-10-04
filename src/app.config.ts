import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideAppInitializer } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { AppConfig } from '@/config/app-config.model';
import { authAttachInterceptor } from '@/auth/auth-attach.interceptor';
import { setAppConfig } from '@/config/app-config.store';
import { provideAuth } from '@/auth/provide-auth';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withInterceptors([authAttachInterceptor]), withFetch()),

        // All auth wiring (runtime JSON + OAuth config + code flow)
        provideAuth({
            configUrl: '/assets/app-config.json',
            storage: 'session' // change to 'memory' for stricter posture later
        }),
        
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } })
    ]
};
