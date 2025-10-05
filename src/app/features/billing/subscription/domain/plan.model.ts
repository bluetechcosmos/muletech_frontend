// src/app/features/billing/subscription/domain/plan.model.ts
import { Currency, MinorUnit, Id } from '@/core/types/primitives';

export type BillingInterval = 'month' | 'year';

export interface Plan {
  id: Id<'Plan'>;
  code: string;
  name: string;
  description?: string;
  price: MinorUnit;          // strongly typed minor unit
  currency: Currency;
  interval: BillingInterval;
  features?: readonly string[];
  trialDays?: number;
  isRecommended?: boolean;
}
