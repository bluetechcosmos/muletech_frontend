// src/app/core/http/typed-client.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '@/config/app-config.token';
import {
  ApiRoutes, ApiRouteKey, ApiRouteMap, RouteDef, KeysByMethod
} from './api.routes';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TypedClient {
  private http = inject(HttpClient);
  private cfg  = inject(APP_CONFIG);

  private buildUrl<Path extends string>(path: Path, pathParams?: Record<string, string>): string {
    let p: string = path;
    if (pathParams) {
      for (const [k, v] of Object.entries(pathParams)) {
        p = p.replace(`:${k}`, encodeURIComponent(v));
      }
    }
    return `${this.cfg.apiBase}${p}`;
  }

  // GET routes (no body)
  get<K extends KeysByMethod<'GET'>>(key: K, pathParams?: Record<string, string>): Observable<ApiRouteMap[K]['res']> {
    const def = ApiRoutes[key];
    const url = this.buildUrl(def.path, pathParams);
    return this.http.get<ApiRouteMap[K]['res']>(url);
  }

  // POST routes (body is required IF route defines req ≠ null; otherwise null)
  post<K extends KeysByMethod<'POST'>>(
    key: K,
    body: RouteDef<K>['req'] extends null ? null : NonNullable<RouteDef<K>['req']>,
    pathParams?: Record<string, string>
  ): Observable<ApiRouteMap[K]['res']> {
    const def = ApiRoutes[key];
    const url = this.buildUrl(def.path, pathParams);

    // If route's req type is null, enforce sending null as body, else send the typed body
    const actualBody = (def as RouteDef<K>)['req'] === null ? null : body;
    return this.http.post<ApiRouteMap[K]['res']>(url, actualBody as any);
  }
}
