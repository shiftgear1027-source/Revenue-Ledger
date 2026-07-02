import { formatNumber } from './formatNumber';

describe('formatNumber', () => {
  it('formats a whole number as USD currency', () => {
    expect(formatNumber(1000)).toBe('$1,000.00');
  });

  it('formats a decimal number and rounds to 2 decimal places', () => {
    expect(formatNumber(1970.755)).toBe('$1,970.76');
  });

  it('formats zero correctly', () => {
    expect(formatNumber(0)).toBe('$0.00');
  });

  it('adds thousands separators for large numbers', () => {
    expect(formatNumber(1234567.89)).toBe('$1,234,567.89');
  });

  it('falls back to 0 for non-numeric input', () => {
    expect(formatNumber(undefined)).toBe('$0.00');
    expect(formatNumber(null)).toBe('$0.00');
  });
});
