import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { APP_CONFIG } from '../config/app-config.token';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule],
  template: `
    <h2>Welcome</h2>
    <p *ngIf="email()">Signed in as: {{ email() }}</p>

    <button (click)="callApi()">Call API</button>
    <pre>{{ apiResult }}</pre>

    <h3>Tokens</h3>
    <details>
      <summary>Show</summary>
      <div><strong>access_token</strong><br><small>{{ accessToken() }}</small></div>
      <div *ngIf="idToken()"><strong>id_token</strong><br><small>{{ idToken() }}</small></div>
    </details>

    <p><a href="#" (click)="logout(); $event.preventDefault()">Sign out</a></p>
  `
})
export class HomeComponent {
  private http = inject(HttpClient);
  private oauth = inject(OAuthService);
  private cfg = inject(APP_CONFIG);

  accessToken = computed(() => this.oauth.getAccessToken());
  idToken = computed(() => this.oauth.getIdToken());
  email = computed(() => {
    const claims: any = this.oauth.getIdentityClaims();
    return claims?.email || claims?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || null;
  });

  apiResult = '';

  callApi() {
    this.http.get(`${this.cfg.apiBase}/api/ping`, { responseType: 'text' })
      .subscribe({ next: t => this.apiResult = t, error: e => this.apiResult = JSON.stringify(e, null, 2) });
  }

  logout() {
    this.oauth.logOut(); // clears tokens client-side
    location.assign('/login');
  }
}
