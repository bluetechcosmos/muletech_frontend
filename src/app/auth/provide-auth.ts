import {
  EnvironmentProviders,
  importProvidersFrom,
  makeEnvironmentProviders,
  provideAppInitializer,
  inject,
} from '@angular/core';
import { OAuthModule, OAuthService, OAuthStorage, AuthConfig } from 'angular-oauth2-oidc';
import { setAppConfig } from '@/config/app-config.store';
import { AppConfig } from '@/config/app-config.model';

// Optional in-memory storage for stricter posture later
class MemoryStorage implements OAuthStorage {
  private map = new Map<string, string>();
  getItem(k: string) { return this.map.get(k) ?? null as any; }
  setItem(k: string, v: string) { this.map.set(k, v); }
  removeItem(k: string) { this.map.delete(k); }
  clear() { this.map.clear(); }
  key(_: number) { return null as any; }
  get length() { return this.map.size; }
}

export type AuthProvidersOptions = {
  /** Where to fetch runtime config from. Default: '/assets/app-config.json' */
  configUrl?: string;
  /** Storage: 'session' (default) or 'memory' */
  storage?: 'session' | 'memory';
};

export function provideAuth(opts: AuthProvidersOptions = {}): EnvironmentProviders {
  const configUrl = opts.configUrl ?? '/assets/app-config.json';
  const storageImpl = opts.storage === 'memory' ? new MemoryStorage() : sessionStorage;

  return makeEnvironmentProviders([
    // Library services (UrlHelperService, etc.). Disable its resourceServer interceptor.
    importProvidersFrom(
      OAuthModule.forRoot({ resourceServer: { allowedUrls: [], sendAccessToken: true } })
    ),

    { provide: OAuthStorage, useValue: storageImpl },

    // ONE initializer: load JSON -> setAppConfig -> configure OAuth -> finish code flow
    provideAppInitializer(() => {
      const oauth = inject(OAuthService);

      return (async () => {
        // 1) Load runtime config
        const res = await fetch(configUrl, { cache: 'no-store' });
        const cfg = (await res.json()) as AppConfig;
        setAppConfig(cfg);

        // 2) Build a fully typed AuthConfig (no `any`)
        const redirectUri = `${location.origin}/auth/callback`;
        const authCfg: AuthConfig = {
          issuer: cfg.idpBase,
          loginUrl: `${cfg.idpBase}/authorize`,
          tokenEndpoint: `${cfg.idpBase}/token`,
          clientId: cfg.clientId,
          redirectUri,
          responseType: 'code',
          scope: cfg.scope,

          // PKCE (works across lib versions thanks to our type augmentation)
          //usePkce: true,
          disablePKCE: false,

          // Helpful when not using discovery / at_hash
          disableAtHashCheck: true,

          // We’re wiring endpoints directly for now
          requireHttps: true,
          skipIssuerCheck: true,
          strictDiscoveryDocumentValidation: false,

          showDebugInformation: true
        };

        // 3) Configure & finish login if returning from IdP
        oauth.configure(authCfg);
        await oauth.tryLoginCodeFlow();
      })();
    }),
  ]);
}
