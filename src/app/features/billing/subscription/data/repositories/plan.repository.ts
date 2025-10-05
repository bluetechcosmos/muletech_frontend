// src/app/features/billing/subscription/data/repositories/plan.repository.ts
import { Observable } from 'rxjs';
import type { Plan } from '../../domain/plan.model';

export abstract class PlanRepository {
  abstract list(): Observable<readonly Plan[]>; // immutable array type
}
