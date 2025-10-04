import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-callback',
  template: `<p>Signing you in…</p>`
})
export class CallbackComponent implements OnInit {
  private router = inject(Router);

  async ngOnInit() {
    // The app initializer already ran oauth.tryLoginCodeFlow() and stored tokens.
    // Just go to your landing page.
    this.router.navigateByUrl('/');
  }
}
