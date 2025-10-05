// domain stays clean; any shape mismatch dies in the mapper with a readable Zod error.

import { asId, asISO, asMinor } from '@/src/app/core/types/primitives';
import type { Plan } from '../../domain/plan.model';
import type { Subscription } from '../../domain/subscription.model';
import { PlanDtoSchema, type PlanDto } from './plan.schema';
import { SubscriptionDtoSchema, type SubscriptionDto } from './subscription.schema';

export function mapPlan(dto: unknown): Plan {
  const p: PlanDto = PlanDtoSchema.parse(dto);
  return {
    id: asId<'Plan'>(p.id),
    code: p.code,
    name: p.name,
    description: p.description,
    price: asMinor(p.price),
    currency: p.currency,
    interval: p.interval,
    features: p.features ?? [],
    trialDays: p.trialDays,
    isRecommended: p.isRecommended,
  };
}

export function mapSubscription(dto: unknown): Subscription {
  const s: SubscriptionDto = SubscriptionDtoSchema.parse(dto);
  return {
    id: asId<'Subscription'>(s.id),
    planId: asId<'Plan'>(s.planId),
    status: s.status,
    currentPeriodStart: s.currentPeriodStart ? asISO(s.currentPeriodStart) : undefined,
    currentPeriodEnd: s.currentPeriodEnd ? asISO(s.currentPeriodEnd) : undefined,
    cancelAtPeriodEnd: s.cancelAtPeriodEnd,
    createdAt: s.createdAt ? asISO(s.createdAt) : undefined,
    plan: s.plan ? mapPlan(s.plan) : undefined,
  };
}
