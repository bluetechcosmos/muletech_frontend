// features/billing/payment/providers/noop/noop.provider.ts
import type { PaymentProvider, CheckoutSession, StartCheckoutInput } from '../../ports/payment-provider.port';

export class RazorpayPaymentProvider implements PaymentProvider {
  key = 'razorpay' as const;
  async startCheckout(_: StartCheckoutInput): Promise<CheckoutSession> {
    return { id: `razorpay_${Date.now()}`, provider: 'razorpay', status: 'paid' };
  }
}
