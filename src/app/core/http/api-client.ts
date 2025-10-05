// src/app/core/http/api-client.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError, firstValueFrom } from 'rxjs';
import { APP_CONFIG } from '@/config/app-config.token';
import { ApiError, ApiErrorPayload } from './api.types';

@Injectable({ providedIn: 'root' })
export class ApiClient {
  private http = inject(HttpClient);
  private cfg = inject(APP_CONFIG);

  /** GET to `${apiBase}${path}` */
  get<T>(path: string, params?: Record<string, any>): Observable<T> {
    const httpParams = params ? this.buildParams(params) : undefined;
    return this.http.get<T>(`${this.cfg.apiBase}${path}`, { params: httpParams }).pipe(
      catchError(e => throwError(() => this.wrapError(e)))
    );
  }

  /** POST to `${apiBase}${path}` */
  post<T>(path: string, body?: unknown, params?: Record<string, any>): Observable<T> {
    const httpParams = params ? this.buildParams(params) : undefined;
    return this.http.post<T>(`${this.cfg.apiBase}${path}`, body ?? {}, { params: httpParams }).pipe(
      catchError(e => throwError(() => this.wrapError(e)))
    );
  }

  /** Optional helpers for PUT/DELETE if you need them */
  put<T>(path: string, body?: unknown, params?: Record<string, any>): Observable<T> {
    const httpParams = params ? this.buildParams(params) : undefined;
    return this.http.put<T>(`${this.cfg.apiBase}${path}`, body ?? {}, { params: httpParams }).pipe(
      catchError(e => throwError(() => this.wrapError(e)))
    );
  }

  delete<T>(path: string, params?: Record<string, any>): Observable<T> {
    const httpParams = params ? this.buildParams(params) : undefined;
    return this.http.delete<T>(`${this.cfg.apiBase}${path}`, { params: httpParams }).pipe(
      catchError(e => throwError(() => this.wrapError(e)))
    );
  }

   // ---- Promise-flavored wrappers (mirror the Observable ones) ----
  async getAsync<T>(path: string, params?: Record<string, any>): Promise<T> {
    try {
      return await firstValueFrom(this.get<T>(path, params));
    } catch (e) {
      throw this.wrapError(e);
    }
  }

  async postAsync<T>(path: string, body?: unknown, params?: Record<string, any>): Promise<T> {
    try {
      return await firstValueFrom(this.post<T>(path, body, params));
    } catch (e) {
      throw this.wrapError(e);
    }
  }

  async putAsync<T>(path: string, body?: unknown, params?: Record<string, any>): Promise<T> {
    try {
      return await firstValueFrom(this.put<T>(path, body, params));
    } catch (e) {
      throw this.wrapError(e);
    }
  }

  async deleteAsync<T>(path: string, params?: Record<string, any>): Promise<T> {
    try {
      return await firstValueFrom(this.delete<T>(path, params));
    } catch (e) {
      throw this.wrapError(e);
    }
  }

  private buildParams(obj: Record<string, any>): HttpParams {
    let p = new HttpParams();
    for (const [k, v] of Object.entries(obj)) {
      if (v === undefined || v === null) continue;
      if (Array.isArray(v)) {
        v.forEach(item => { p = p.append(k, String(item)); });
      } else {
        p = p.set(k, String(v));
      }
    }
    return p;
  }

  private wrapError(e: any): ApiError {
    const status = e?.status as number | undefined;
    const payload = (e?.error ?? {}) as ApiErrorPayload;
    const msg = payload?.title || e?.message || 'API request failed';
    return new ApiError(msg, { status, payload, cause: e });
  }
}
