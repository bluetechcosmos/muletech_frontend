//Safe token reader (used by guard + interceptor)
import { Injectable, Inject } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';

function isExpired(jwt: string): boolean {
  try {
    const p = JSON.parse(atob(jwt.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')));
    return !p?.exp || Date.now() >= p.exp * 1000;
  } catch { return true; }
}

@Injectable({ providedIn: 'root' })
export class TokenReader {
  constructor(@Inject(OAuthStorage) private storage: OAuthStorage) {}

  get accessToken(): string | null {
    return this.storage.getItem('access_token');
  }

  get isAuthenticated(): boolean {
    const t = this.accessToken;
    return !!t && !isExpired(t);
  }
}
