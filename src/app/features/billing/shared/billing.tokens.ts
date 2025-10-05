//DI tokens (multi providers, ports)

import { InjectionToken } from '@angular/core';
import type { PaymentProvider, PaymentProviderKey } from '../payment/ports/payment-provider.port';

export const PAYMENT_PROVIDERS = new InjectionToken<ReadonlyArray<PaymentProvider>>('PAYMENT_PROVIDERS');
export const DEFAULT_PAYMENT_PROVIDER = new InjectionToken<PaymentProviderKey>('DEFAULT_PAYMENT_PROVIDER');

