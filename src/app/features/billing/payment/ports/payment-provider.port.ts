
export type PaymentProviderKey = 'noop' | 'razorpay' | 'stripe'; // extend as you add
export interface StartCheckoutInput { planId: string; email?: string; }
export interface CheckoutSession {
  id: string;
  provider: PaymentProviderKey;
  status: 'created'|'authorized'|'requires_action'|'paid'|'failed'|'canceled';
  clientSecret?: string;
  orderInfo?: unknown;
}
export interface PaymentProvider {
  /** stable identifier to select this provider */
  key: PaymentProviderKey;
  startCheckout(input: StartCheckoutInput): Promise<CheckoutSession>;
  capture?(sessionId: string): Promise<void>;
  refund?(paymentId: string, amountMinor?: number): Promise<void>;
  verify?(payload: unknown): Promise<boolean>;
}
