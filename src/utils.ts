
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currencyCode: string = 'DZD') {
  return new Intl.NumberFormat('fr-DZ', {
    style: 'currency',
    currency: currencyCode === 'DA' ? 'DZD' : currencyCode,
  }).format(amount).replace('DZD', 'DA');
}
