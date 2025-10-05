import { Injectable, Inject } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';

/** Base64URL → UTF-8 string (handles '-' '_' and padding) */
function base64UrlDecode(input: string): string {
  let b64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b64.length % 4;
  if (pad) b64 += '='.repeat(4 - pad);
  // atob returns a binary string; convert to UTF-8
  const bin = atob(b64);
  let out = '';
  for (let i = 0; i < bin.length; i++) {
    out += '%' + ('00' + bin.charCodeAt(i).toString(16)).slice(-2);
  }
  return decodeURIComponent(out);
}

/** Safely parse the payload of a JWT; returns null if invalid */
function parseJwtPayload(jwt: string | null | undefined): Record<string, unknown> | null {
  if (!jwt) return null;
  const parts = jwt.split('.');
  if (parts.length < 2 || !parts[1]) return null;
  try {
    const json = base64UrlDecode(parts[1]);
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/** True if JWT is missing/invalid or 'exp' has passed */
function isExpired(jwt: string | null | undefined): boolean {
  const p = parseJwtPayload(jwt);
  if (!p) return true;
  const exp = typeof p['exp'] === 'number' ? (p['exp'] as number) : undefined;
  if (!exp) return true; // no exp → treat as expired
  return Date.now() >= exp * 1000;
}

@Injectable({ providedIn: 'root' })
export class TokenReader {
  constructor(@Inject(OAuthStorage) private storage: OAuthStorage) {}

  /** Raw access token from storage (or null) */
  get accessToken(): string | null {
    return this.storage.getItem('access_token');
  }

  /** True when a non-expired access token is present */
  get isAuthenticated(): boolean {
    const t = this.accessToken;
    return !!t && !isExpired(t);
  }

  /** Read a claim (typed) from the token payload */
  getClaim<T = unknown>(claim: string): T | null {
    const payload = parseJwtPayload(this.accessToken);
    if (!payload) return null;
    return (payload[claim] as T) ?? null;
  }
}
