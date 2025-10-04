import {
  EnvironmentProviders,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { AppConfig } from './app-config.model';
import { APP_CONFIG } from './app-config.token';

let runtimeConfig: AppConfig | null = null;

/** Load /assets/app-config.json before the app starts */
async function loadAppConfig(): Promise<void> {
  const res = await fetch('/assets/app-config.json', { cache: 'no-store' });
  runtimeConfig = await res.json();
}

/** Optional helper if you want to read config without DI (e.g., in an interceptor) */
export function getRuntimeAppConfig(): AppConfig {
  if (!runtimeConfig) throw new Error('AppConfig not loaded');
  return runtimeConfig;
}

/** Provide: (1) loader initializer, (2) APP_CONFIG token (after load) */
export function provideRuntimeAppConfig(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer(() => loadAppConfig()),
    {
      provide: APP_CONFIG,
      useFactory: () => {
        if (!runtimeConfig) throw new Error('AppConfig not loaded');
        return runtimeConfig;
      },
    },
  ]);
}
