// src/app/auth/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { TokenReader } from './token-reader';
import { getAppConfig } from '../config/app-config.store';
import { inject } from '@angular/core';

export const authAttachInterceptor: HttpInterceptorFn = (req, next) => {
  const { apiBase } = getAppConfig();
  if (!req.url.startsWith(apiBase)) return next(req);

  const token = inject(TokenReader).accessToken;
  if (!token) return next(req);

  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
