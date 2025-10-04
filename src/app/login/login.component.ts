import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

// PrimeNG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AuthFacade } from '@/auth/auth.facade';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, ProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  private auth = inject(AuthFacade);
  private router = inject(Router);
  private route  = inject(ActivatedRoute);

  loading = signal(false);
  error   = signal<string | null>(null);

  ngOnInit() {
    // already signed in? go home
    if (this.auth.hasToken()) {
      this.router.navigateByUrl('/');
      return;
    }

    // Auto-redirect unless ?auto=0 (handy for debugging the page)
    const auto = (this.route.snapshot.queryParamMap.get('auto') ?? '1') !== '0';
    if (auto) {
      // allow first paint so spinner shows
      setTimeout(() => this.start(), 0);
    }
  }

  start() {
    this.error.set(null);
    this.loading.set(true);
    try {
       this.auth.startLogin(); ; // redirects to your IdP /authorize (with PKCE)
      // execution stops here because the browser navigates away
    } catch (e) {
      this.loading.set(false);
      this.error.set('Could not start sign-in. Please try again.');
      console.error(e);
    }
  }
}
