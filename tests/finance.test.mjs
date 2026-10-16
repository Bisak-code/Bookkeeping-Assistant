import test from 'node:test';
import assert from 'node:assert/strict';

import { calculateInvoiceTotals, formatMoney, generatePaystackCheckoutLink, scoreExpenseConfidence, suggestExpenseCategory } from '../lib/finance.js';

test('calculateInvoiceTotals adds subtotal, vat and total correctly', () => {
  const totals = calculateInvoiceTotals({
    quantity: 3,
    rate: 50000,
    vatRate: 7.5,
    discount: 0,
  });

  assert.equal(totals.subtotal, 150000);
  assert.equal(totals.vat, 11250);
  assert.equal(totals.total, 161250);
});

test('formatMoney uses NGN symbol and rounding', () => {
  assert.equal(formatMoney(161250), '₦161,250');
  assert.equal(formatMoney(0), '₦0');
});

test('suggestExpenseCategory returns sensible bookkeeping categories', () => {
  assert.equal(suggestExpenseCategory('Airtel Business'), 'Software');
  assert.equal(suggestExpenseCategory('Print Avenue'), 'Marketing');
  assert.equal(suggestExpenseCategory('Kola Transport'), 'Travel');
  assert.equal(suggestExpenseCategory('Unknown supplier'), 'General expenses');
  assert.ok(scoreExpenseConfidence('Airtel Business') >= 90);
});

test('generatePaystackCheckoutLink creates a valid NGN payment link for an invoice', () => {
  const link = generatePaystackCheckoutLink({
    id: 'BKS-1051',
    clientName: 'Ada Sol',
    businessName: 'Bright Ledger',
    description: 'Brand design work',
    quantity: 2,
    rate: 50000,
    vatRate: 7.5,
    discount: 0,
    dueDate: '2026-11-01',
    amount: 107500,
    status: 'Draft',
    createdAt: '2026-10-16',
  }, 'hello@brightledger.ng');

  assert.match(link, /^https:\/\/paystack\.com\/pay\//);
  assert.match(link, /BKS-1051/);
  assert.match(link, /NGN/);
  assert.match(link, /hello%40brightledger\.ng/);
});
