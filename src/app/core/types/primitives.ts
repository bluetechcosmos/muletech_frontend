// src/app/core/types/primitives.ts
export type Brand<T, B extends string> = T & { readonly __brand: B };

export type ISODateString = Brand<string, 'ISODateString'>;
export type Uuid = Brand<string, 'Uuid'>;
export type Id<T extends string> = Brand<string, `Id<${T}>`>;

export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP';
export type MinorUnit = Brand<number, 'MinorUnit'>; // paise/cents
export type MajorUnit = Brand<number, 'MajorUnit'>;

export interface MoneyMinor {
  amount: MinorUnit;
  currency: Currency;
}

export const asUuid = (v: string) => v as Uuid;
export const asId = <T extends string>(v: string) => v as Id<T>;
export const asISO = (v: string) => v as ISODateString;
export const asMinor = (n: number) => n as MinorUnit;
export const asMajor = (n: number) => n as MajorUnit;
