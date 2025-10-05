//DI wiring for the whole billing context
import { makeEnvironmentProviders } from '@angular/core';
import { PAYMENT_PROVIDERS, DEFAULT_PAYMENT_PROVIDER } from './shared/billing.tokens';
import { RazorpayPaymentProvider } from './payment/providers/razorpay/razorpay.provider';

export function provideBillingFeature() {
  return makeEnvironmentProviders([
    { provide: DEFAULT_PAYMENT_PROVIDER, useValue: 'razorpay' as const },
    // You can register class providers…
    { provide: PAYMENT_PROVIDERS, useValue: new RazorpayPaymentProvider(), multi: true },
    // …and later add real ones:
    // { provide: PAYMENT_PROVIDERS, useClass: StripePaymentProvider, multi: true },
  ]);
}
