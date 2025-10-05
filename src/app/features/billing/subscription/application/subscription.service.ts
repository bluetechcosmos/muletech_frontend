//orchestrates repos; exposes Observable + Promise
// src/app/features/billing/subscription/application/subscription.service.ts
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, firstValueFrom } from 'rxjs';
import { ok, err, type Result } from '@/core/models/result';
import type { Plan } from '../domain/plan.model';
import type { Subscription } from '../domain/subscription.model';
import { ApiError } from '@/core/http/api.types';
import { HttpPlanRepository } from '../data/repositories/http-plan.repository';
import { HttpSubscriptionRepository } from '../data/repositories/http-subscription.repository';
import { Id } from '@/core/types/primitives';


@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  private plansRepo = inject(HttpPlanRepository);
  private subsRepo = inject(HttpSubscriptionRepository);

  listPlans$(): Observable<Result<readonly Plan[], ApiError>> {
    return this.plansRepo.list().pipe(
      map(plans => ok(plans)),
      catchError((e: ApiError) => of(err(e)))
    );
  }

  mySubscriptions$(): Observable<Result<readonly Subscription[], ApiError>> {
    return this.subsRepo.mySubscriptions().pipe(
      map(subs => ok(subs)),
      catchError((e: ApiError) => of(err(e)))
    );
  }

  subscribe$(planId: Id<'Plan'>): Observable<Result<Subscription, ApiError>> {
    return this.subsRepo.subscribe(planId).pipe(
      map(s => ok(s)),
      catchError((e: ApiError) => of(err(e)))
    );
  }

  cancel$(id: Id<'Subscription'>): Observable<Result<void, ApiError>> {
    return this.subsRepo.cancel(id).pipe(
      map(() => ok(undefined)),
      catchError((e: ApiError) => of(err(e)))
    );
  }

  // Promise variants
  async listPlansAsync(): Promise<Result<readonly Plan[], ApiError>> {
    try { return ok(await firstValueFrom(this.plansRepo.list())); }
    catch (e) { return err(e as ApiError); }
  }
  async mySubscriptionsAsync(): Promise<Result<readonly Subscription[], ApiError>> {
    try { return ok(await firstValueFrom(this.subsRepo.mySubscriptions())); }
    catch (e) { return err(e as ApiError); }
  }
  async subscribeAsync(planId: Id<'Plan'>): Promise<Result<Subscription, ApiError>> {
    try { return ok(await firstValueFrom(this.subsRepo.subscribe(planId))); }
    catch (e) { return err(e as ApiError); }
  }
  async cancelAsync(id: Id<'Subscription'>): Promise<Result<void, ApiError>> {
    try { await firstValueFrom(this.subsRepo.cancel(id)); return ok(undefined); }
    catch (e) { return err(e as ApiError); }
  }
}
