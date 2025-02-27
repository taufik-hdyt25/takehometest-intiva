export const formatRupiah = (
  angka: number | string,
  withSymbol: boolean = true
): string => {
  const num = typeof angka === 'number' ? angka : parseFloat(angka);
  if (isNaN(num)) return 'Invalid Number';

  const formatted = num.toLocaleString('id-ID');
  return withSymbol ? `Rp ${formatted}` : formatted;
};
