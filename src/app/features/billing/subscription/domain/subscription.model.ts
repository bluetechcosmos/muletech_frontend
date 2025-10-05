// src/app/features/billing/subscription/domain/subscription.model.ts
import { ISODateString, Id } from '@/core/types/primitives';
import type { Plan } from './plan.model';

export const SubscriptionStatuses = ['active','trialing','past_due','canceled','incomplete'] as const;
export type SubscriptionStatus = typeof SubscriptionStatuses[number];

export interface Subscription {
  id: Id<'Subscription'>;
  planId: Id<'Plan'>;
  status: SubscriptionStatus;
  currentPeriodStart?: ISODateString;
  currentPeriodEnd?: ISODateString;
  cancelAtPeriodEnd?: boolean;
  createdAt?: ISODateString;
  plan?: Plan;
}
