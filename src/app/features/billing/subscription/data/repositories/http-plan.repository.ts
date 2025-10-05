// src/app/features/billing/subscription/data/repositories/http-plan.repository.ts
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiClient } from '@/core/http/api-client';
import { Plan } from '../../domain/plan.model';
import { PlanDtoSchema } from '../dto/plan.schema';
import { mapPlan } from '../dto/mappers';

@Injectable({ providedIn: 'root' })
export class HttpPlanRepository {
  private api = inject(ApiClient);

  list(): Observable<readonly Plan[]> {
    return this.api.get<unknown[]>('/plans').pipe(
      map(arr => (Array.isArray(arr) ? arr : [])),
      map(arr => arr.map(x => mapPlan(PlanDtoSchema.parse(x))))
    );
  }
}
