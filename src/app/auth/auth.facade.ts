import { Injectable, inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private oauth = inject(OAuthService);

  startLogin() { this.oauth.initCodeFlow(); }
  logout()     { this.oauth.logOut(); }
  hasToken()   { return this.oauth.hasValidAccessToken(); }

  get idToken()     { return this.oauth.getIdToken(); }
  get accessToken() { return this.oauth.getAccessToken(); }
  get claims(): any { return this.oauth.getIdentityClaims(); }
}
