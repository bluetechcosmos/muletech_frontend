// cross-cut enums/types (Currency, Money, etc.)
export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP';
export interface Money { amount: number; currency: Currency; }
