import { inject, Injectable } from '@angular/core';
import { PAYMENT_PROVIDERS, DEFAULT_PAYMENT_PROVIDER } from '../../shared/billing.tokens';
import type { PaymentProvider, PaymentProviderKey } from '../ports/payment-provider.port';

@Injectable({ providedIn: 'root' })
export class PaymentProviderRegistry {
  private providers = inject(PAYMENT_PROVIDERS, { optional: true }) ?? [];
  private defaultKey = inject(DEFAULT_PAYMENT_PROVIDER, { optional: true }) ?? 'noop';

  list(): ReadonlyArray<PaymentProvider> { return this.providers; }

  get(key?: PaymentProviderKey): PaymentProvider {
    const k = key ?? this.defaultKey;
    const found = this.providers.find(p => p.key === k);
    if (!found) throw new Error(`Payment provider '${k}' not registered`);
    return found;
  }
}
