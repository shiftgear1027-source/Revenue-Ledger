/**
 * formatNumber
 * Formats a numeric revenue value as a USD currency string,
 * e.g. 1970.75 -> "$1,970.75"
 *
 * This is the single formatting utility used everywhere numbers
 * are rendered in the app, so all figures stay consistent.
 */
export function formatNumber(value) {
  const number = Number(value) || 0;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
}

export default formatNumber;
