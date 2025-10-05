// src/app/features/billing/subscription/data/repositories/subscription.repository.ts
import { Observable } from 'rxjs';
import type { Subscription } from '../../domain/subscription.model';
import { Id } from '@/core/types/primitives';

export abstract class SubscriptionRepository {
  abstract mySubscriptions(): Observable<readonly Subscription[]>;
  abstract subscribe(planId: Id<'Plan'>): Observable<Subscription>;
  abstract cancel(subscriptionId: Id<'Subscription'>): Observable<void>;
}
