// src/app/features/billing/subscription/data/dto/subscription.schema.ts
import { z } from 'zod';
import { PlanDtoSchema } from './plan.schema';

export const SubscriptionDtoSchema = z.object({
  id: z.string().min(1),
  planId: z.string().min(1),
  status: z.enum(['active','trialing','past_due','canceled','incomplete']),
  currentPeriodStart: z.string().datetime().optional(),
  currentPeriodEnd: z.string().datetime().optional(),
  cancelAtPeriodEnd: z.boolean().optional(),
  createdAt: z.string().datetime().optional(),
  plan: PlanDtoSchema.optional(),
});
export type SubscriptionDto = z.infer<typeof SubscriptionDtoSchema>;
