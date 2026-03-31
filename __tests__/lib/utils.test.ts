/**
 * @jest-environment node
 */
import { formatCurrency, formatStatusLabel, formatSubscriptionDateTime } from '../../lib/utils';

describe('formatCurrency', () => {
    it('formats a positive USD amount with 2 decimal places', () => {
        expect(formatCurrency(9.99)).toBe('$9.99');
    });

    it('formats a whole number with trailing zeros', () => {
        expect(formatCurrency(20)).toBe('$20.00');
    });

    it('formats zero', () => {
        expect(formatCurrency(0)).toBe('$0.00');
    });

    it('formats a large number with commas', () => {
        expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });

    it('formats a negative value', () => {
        expect(formatCurrency(-5.5)).toBe('-$5.50');
    });

    it('formats with a custom currency (EUR)', () => {
        const result = formatCurrency(12.0, 'EUR');
        expect(result).toContain('12.00');
        expect(result).toMatch(/€|EUR/);
    });

    it('uses default currency USD when currency is not provided', () => {
        expect(formatCurrency(77.49)).toBe('$77.49');
    });

    it('falls back to toFixed(2) for an invalid currency code', () => {
        const result = formatCurrency(15.0, 'INVALID_CURRENCY');
        expect(result).toBe('15.00');
    });

    it('rounds to 2 decimal places (does not exceed maximumFractionDigits)', () => {
        expect(formatCurrency(1.999)).toBe('$2.00');
    });

    it('formats amount with exactly 2 decimal places for precision boundary', () => {
        expect(formatCurrency(0.01)).toBe('$0.01');
    });
});

describe('formatSubscriptionDateTime', () => {
    it('returns "Not provided" when value is undefined', () => {
        expect(formatSubscriptionDateTime(undefined)).toBe('Not provided');
    });

    it('returns "Not provided" when value is an empty string', () => {
        expect(formatSubscriptionDateTime('')).toBe('Not provided');
    });

    it('formats a valid ISO date string to MM/DD/YYYY', () => {
        expect(formatSubscriptionDateTime('2026-03-20T10:00:00.000Z')).toBe('03/20/2026');
    });

    it('formats a simple date string (YYYY-MM-DD) to MM/DD/YYYY', () => {
        expect(formatSubscriptionDateTime('2025-06-27')).toBe('06/27/2025');
    });

    it('returns "Not provided" for an invalid date string', () => {
        expect(formatSubscriptionDateTime('not-a-date')).toBe('Not provided');
    });

    it('formats a date at start of year', () => {
        expect(formatSubscriptionDateTime('2024-01-01')).toBe('01/01/2024');
    });

    it('formats a date at end of year', () => {
        expect(formatSubscriptionDateTime('2024-12-31')).toBe('12/31/2024');
    });

    it('returns "Not provided" for a garbage string', () => {
        expect(formatSubscriptionDateTime('hello world')).toBe('Not provided');
    });
});

describe('formatStatusLabel', () => {
    it('returns "Unknown" when value is undefined', () => {
        expect(formatStatusLabel(undefined)).toBe('Unknown');
    });

    it('returns "Unknown" when value is an empty string', () => {
        expect(formatStatusLabel('')).toBe('Unknown');
    });

    it('capitalizes the first letter of a lowercase string', () => {
        expect(formatStatusLabel('active')).toBe('Active');
    });

    it('capitalizes the first letter of "paused"', () => {
        expect(formatStatusLabel('paused')).toBe('Paused');
    });

    it('capitalizes the first letter of "cancelled"', () => {
        expect(formatStatusLabel('cancelled')).toBe('Cancelled');
    });

    it('does not double-capitalize an already-capitalized string', () => {
        expect(formatStatusLabel('Active')).toBe('Active');
    });

    it('capitalizes only the first character, leaving the rest unchanged', () => {
        expect(formatStatusLabel('pAUsed')).toBe('PAUsed');
    });

    it('handles a single character string', () => {
        expect(formatStatusLabel('a')).toBe('A');
    });

    it('handles a single character already uppercase', () => {
        expect(formatStatusLabel('A')).toBe('A');
    });
});