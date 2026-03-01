export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
    maximumFractionDigits: 0,
  }).format(amount);

export const toTitleCase = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
