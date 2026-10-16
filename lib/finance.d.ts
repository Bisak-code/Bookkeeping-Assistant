export type InvoiceTotals = {
  subtotal: number;
  discountAmount: number;
  taxableAmount: number;
  vat: number;
  total: number;
};

export function calculateInvoiceTotals(params: {
  quantity: number;
  rate: number;
  vatRate?: number;
  discount?: number;
}): InvoiceTotals;

export function formatMoney(value: number): string;

export function suggestExpenseCategory(vendor?: string): string;

export function scoreExpenseConfidence(vendor?: string): number;

export function generatePaystackCheckoutLink(
  invoice: {
    id?: string;
    amount?: number;
    businessName?: string;
    clientName?: string;
    description?: string;
  },
  email?: string,
): string;
