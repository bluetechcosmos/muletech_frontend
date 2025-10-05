import { z } from 'zod';

export const PlanDtoSchema = z.object({
  id: z.string().min(1),
  code: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().int().nonnegative(),       // minor unit
  currency: z.enum(['INR','USD','EUR','GBP']),
  interval: z.enum(['month','year']),
  features: z.array(z.string()).optional(),
  trialDays: z.number().int().nonnegative().optional(),
  isRecommended: z.boolean().optional(),
});
export type PlanDto = z.infer<typeof PlanDtoSchema>;
