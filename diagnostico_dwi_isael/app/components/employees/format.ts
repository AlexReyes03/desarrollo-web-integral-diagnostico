export const formatCurrencyMx = (value: number): string =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);

