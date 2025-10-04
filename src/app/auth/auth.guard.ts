import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { TokenReader } from './token-reader';

export const authMatchGuard: CanMatchFn = () => {
  const reader = inject(TokenReader);
  const router = inject(Router);

  if (location.pathname.startsWith('/auth/callback')) return true;
  return reader.isAuthenticated ? true : router.createUrlTree(['/login']);
};
