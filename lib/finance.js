export function calculateInvoiceTotals({ quantity, rate, vatRate = 7.5, discount = 0 }) {
  const safeQuantity = Number(quantity) || 0;
  const safeRate = Number(rate) || 0;
  const safeVatRate = Number(vatRate) || 0;
  const safeDiscount = Number(discount) || 0;

  const subtotal = safeQuantity * safeRate;
  const discountAmount = subtotal * (safeDiscount / 100);
  const taxableAmount = subtotal - discountAmount;
  const vat = taxableAmount * (safeVatRate / 100);
  const total = taxableAmount + vat;

  return {
    subtotal: Math.round(subtotal),
    discountAmount: Math.round(discountAmount),
    taxableAmount: Math.round(taxableAmount),
    vat: Math.round(vat),
    total: Math.round(total),
  };
}

export function formatMoney(value) {
  const amount = Number(value) || 0;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generatePaystackCheckoutLink(invoice, email = 'hello@brightledger.ng') {
  const safeId = String(invoice?.id || 'BKS-0001')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9-]+/g, '-');

  const amountInKobo = Math.round((Number(invoice?.amount) || 0) * 100);
  const customerEmail = encodeURIComponent(String(email || 'hello@brightledger.ng'));
  const metadata = encodeURIComponent(JSON.stringify({
    invoiceId: safeId,
    businessName: invoice?.businessName || 'Bright Ledger',
    clientName: invoice?.clientName || 'Customer',
    description: invoice?.description || 'Invoice payment',
    amount: Number(invoice?.amount) || 0,
    currency: 'NGN',
  }));

  return `https://paystack.com/pay/${safeId}?amount=${amountInKobo}&currency=NGN&email=${customerEmail}&metadata=${metadata}`;
}

export function suggestExpenseCategory(vendor = '') {
  const normalized = vendor.toLowerCase();

  if (/airtel|zoom|google|slack|microsoft|software|domain|subscription|dropbox/.test(normalized)) {
    return 'Software';
  }

  if (/power|electric|nepa|diesel|generator|water|utility|accommodation/.test(normalized)) {
    return 'Utilities';
  }

  if (/transport|uber|bolt|fuel|kola|travel|taxi|logistics/.test(normalized)) {
    return 'Travel';
  }

  if (/print|ads|marketing|facebook|instagram|canva|design|brand/.test(normalized)) {
    return 'Marketing';
  }

  if (/rent|office|lease|workspace/.test(normalized)) {
    return 'Rent';
  }

  if (/salary|payroll|contractor|staff/.test(normalized)) {
    return 'Payroll';
  }

  if (/grocer|rice|beans|yam|food|market|ingredient/.test(normalized)) {
    return 'Inventory';
  }

  return 'General expenses';
}

export function scoreExpenseConfidence(vendor = '') {
  const category = suggestExpenseCategory(vendor);
  const normalized = vendor.toLowerCase();

  if (category === 'General expenses') {
    return 68;
  }

  if (/(airtel|google|slack|zoom|microsoft|subscription|domain)/.test(normalized)) {
    return 92;
  }

  if (/(power|fuel|rent|print|ads|food)/.test(normalized)) {
    return 84;
  }

  return 77;
}
