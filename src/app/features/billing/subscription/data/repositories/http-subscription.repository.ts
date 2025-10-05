// src/app/features/billing/subscription/data/repositories/http-subscription.repository.ts
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiClient } from '@/core/http/api-client';
import { Subscription } from '../../domain/subscription.model';
import { SubscriptionDtoSchema } from '../dto/subscription.schema';
import { mapSubscription } from '../dto/mappers';
import { Id } from '@/core/types/primitives';

@Injectable({ providedIn: 'root' })
export class HttpSubscriptionRepository {
  private api = inject(ApiClient);

  mySubscriptions(): Observable<readonly Subscription[]> {
    return this.api.get<unknown[]>('/subscriptions/me').pipe(
      map(arr => (Array.isArray(arr) ? arr : [])),
      map(arr => arr.map(x => mapSubscription(SubscriptionDtoSchema.parse(x))))
    );
  }

  subscribe(planId: Id<'Plan'>): Observable<Subscription> {
    return this.api.post<unknown>('/subscriptions', { planId }).pipe(
      map(x => mapSubscription(SubscriptionDtoSchema.parse(x)))
    );
  }

  cancel(subscriptionId: Id<'Subscription'>): Observable<void> {
    return this.api.post<void>(`/subscriptions/${encodeURIComponent(subscriptionId)}/cancel`, {});
  }
}
