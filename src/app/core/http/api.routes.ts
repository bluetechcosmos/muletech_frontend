// src/app/core/http/api.routes.ts
import { Plan } from '@/features/billing/subscription/domain/plan.model';
import { Subscription } from '@/features/billing/subscription/domain/subscription.model';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type ApiDef<M extends HttpMethod, Path extends string, Res, Req = null> = Readonly<{
  method: M;
  path: Path;
  /** Type witness for the response shape */
  res: Res;
  /** Type witness for the request body (null = no body) */
  req?: Req;
}>;

const route = <
  M extends HttpMethod,
  Path extends string,
  Res,
  Req = null
>(def: ApiDef<M, Path, Res, Req>) => def;

export const ApiRoutes = {
  GetPlans: route<'GET', '/plans', readonly Plan[]>({
    method: 'GET',
    path: '/plans',
    res: null as unknown as readonly Plan[],
  }),

  GetMySubs: route<'GET', '/subscriptions/me', readonly Subscription[]>({
    method: 'GET',
    path: '/subscriptions/me',
    res: null as unknown as readonly Subscription[],
  }),

  PostSubscribe: route<'POST', '/subscriptions', Subscription, { planId: string }>({
    method: 'POST',
    path: '/subscriptions',
    res: null as unknown as Subscription,
    req: null as unknown as { planId: string },
  }),

  PostCancel: route<'POST', '/subscriptions/:id/cancel', void, null>({
    method: 'POST',
    path: '/subscriptions/:id/cancel',
    res: undefined as unknown as void,
    req: null, // explicitly no body
  }),
} as const;

export type ApiRouteMap = typeof ApiRoutes;
export type ApiRouteKey = keyof ApiRouteMap;
export type RouteDef<K extends ApiRouteKey> = ApiRouteMap[K];

export type KeysByMethod<M extends HttpMethod> =
  { [K in ApiRouteKey]: ApiRouteMap[K]['method'] extends M ? K : never }[ApiRouteKey];
