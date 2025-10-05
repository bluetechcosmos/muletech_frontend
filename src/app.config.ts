import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';

import { appRoutes } from './app.routes';
import { authAttachInterceptor } from '@/auth/auth-attach.interceptor';
import { provideAuth } from '@/auth/provide-auth';
import { provideRuntimeAppConfig } from '@/config/app-config.provider';

// NOTE: If `provideAuth` can ever return `undefined` (e.g., disabled in certain envs),
// we guard it before adding to the providers list to avoid type widening errors.
const authProviders = provideAuth({
  // The same runtime JSON you load for APP_CONFIG.
  // This keeps IDP base, clientId, scope in one place without rebuilds.
  configUrl: '/assets/app-config.json',
  // Use 'session' to clear tokens on tab close. Switch to 'memory' for stricter posture
  // (no persistence) or implement your own storage if needed.
  storage: 'session',
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      withEnabledBlockingInitialNavigation()
    ),
    provideHttpClient(withInterceptors([authAttachInterceptor]), withFetch()),

    // Runtime app config:
    // Loads /assets/app-config.json at bootstrap and exposes APP_CONFIG via DI.
    // Using runtime JSON lets you switch environments without rebuilding.
    provideRuntimeAppConfig(),

    // OAuth wiring (depends on the same /assets/app-config.json)
    // If `provideAuth` is guaranteed to always return EnvironmentProviders,
    // you can inline it here without the conditional spread.
    ...(authProviders ? [authProviders] : []),

    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: { darkModeSelector: '.app-dark' },
      },
    }),
  ],
};

/*
  Why this ordering?

  1) provideRouter(...) — early so navigation is ready during bootstrap.
  2) provideHttpClient(...) — before anything that might use HttpClient (not strictly required here since our runtime config uses `fetch`, but a good habit).
  3) provideRuntimeAppConfig() — ensures APP_CONFIG is ready for any service/interceptor that injects it.
  4) provideAuth(...) — consumes the same JSON file for IDP/client settings; keeps all config in one place.
  5) UI providers (animations/theme) — last, since they don’t affect application logic.

  Common pitfalls:
  - Do NOT spread `provideRuntimeAppConfig()` — it returns EnvironmentProviders already.
  - Ensure /assets/app-config.json is included under "assets" in angular.json.
  - In your auth interceptor, check req.url.startsWith(cfg.apiBase) so tokens are not sent to unrelated hosts.
  - If you move the config loader to HttpClient instead of fetch, keep provideHttpClient BEFORE the loader.
*/
