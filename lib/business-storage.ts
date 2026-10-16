export type BusinessProfile = {
  businessName: string;
  email: string;
  country: string;
  currency: string;
  currencySymbol: string;
  defaultVatRate: number;
  paymentGateway: string;
  invoicePrefix: string;
  taxId?: string;
};

export type SavedInvoice = {
  id: string;
  clientName: string;
  businessName: string;
  description: string;
  quantity: number;
  rate: number;
  vatRate: number;
  discount: number;
  dueDate: string;
  amount: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
  createdAt: string;
  paymentLink?: string;
  paidAt?: string;
};

export type ExpenseEntry = {
  id: string;
  vendor: string;
  amount: number;
  date: string;
  category: string;
  confidence: number;
  source: 'manual' | 'receipt';
  description: string;
  status: 'review' | 'approved';
};

export const defaultBusinessProfile: BusinessProfile = {
  businessName: 'Bright Ledger',
  email: 'hello@brightledger.ng',
  country: 'Nigeria',
  currency: 'NGN',
  currencySymbol: '₦',
  defaultVatRate: 7.5,
  paymentGateway: 'Paystack',
  invoicePrefix: 'BKS',
  taxId: 'NG-000000',
};

const BUSINESS_STORAGE_KEY = 'bright-ledger-business-profile';
const INVOICE_STORAGE_KEY = 'bright-ledger-invoices';
const EXPENSE_STORAGE_KEY = 'bright-ledger-expenses';

export function loadBusinessProfile(): BusinessProfile {
  if (typeof window === 'undefined') {
    return defaultBusinessProfile;
  }

  const raw = window.localStorage.getItem(BUSINESS_STORAGE_KEY);

  if (!raw) {
    saveBusinessProfile(defaultBusinessProfile);
    return defaultBusinessProfile;
  }

  try {
    return { ...defaultBusinessProfile, ...JSON.parse(raw) };
  } catch {
    return defaultBusinessProfile;
  }
}

export function saveBusinessProfile(profile: BusinessProfile) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(BUSINESS_STORAGE_KEY, JSON.stringify(profile));
}

export function getNextInvoiceNumber(prefix: string) {
  const savedInvoices = loadInvoices();
  const lastNumber = savedInvoices.reduce((max, invoice) => {
    const match = invoice.id.match(/(\d+)$/);
    const current = match ? Number(match[1]) : 0;
    return Math.max(max, current);
  }, 1048);

  return `${prefix}-${lastNumber + 1}`;
}

export function loadInvoices(): SavedInvoice[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const raw = window.localStorage.getItem(INVOICE_STORAGE_KEY);

  if (!raw) {
    return [
      {
        id: 'BKS-1048',
        clientName: 'Ada Sol',
        businessName: 'Bright Ledger',
        description: 'Brand identity design package',
        quantity: 3,
        rate: 50000,
        vatRate: 7.5,
        discount: 0,
        dueDate: '2026-10-30',
        amount: 161250,
        status: 'Paid',
        createdAt: new Date().toISOString(),
        paymentLink: 'https://paystack.com/pay/BKS-1048?amount=16125000&currency=NGN&email=hello%40brightledger.ng',
        paidAt: new Date().toISOString(),
      },
      {
        id: 'BKS-1049',
        clientName: 'Lagos Design Studio',
        businessName: 'Bright Ledger',
        description: 'Website copywriting and homepage design',
        quantity: 2,
        rate: 350000,
        vatRate: 7.5,
        discount: 5,
        dueDate: '2026-11-05',
        amount: 702500,
        status: 'Sent',
        createdAt: new Date().toISOString(),
        paymentLink: 'https://paystack.com/pay/BKS-1049?amount=70250000&currency=NGN&email=hello%40brightledger.ng',
      },
    ];
  }

  try {
    return JSON.parse(raw) as SavedInvoice[];
  } catch {
    return [];
  }
}

export function saveInvoices(invoices: SavedInvoice[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(INVOICE_STORAGE_KEY, JSON.stringify(invoices));
}

export function loadExpenses(): ExpenseEntry[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const raw = window.localStorage.getItem(EXPENSE_STORAGE_KEY);

  if (!raw) {
    const defaultExpenses: ExpenseEntry[] = [
      {
        id: 'EXP-1001',
        vendor: 'Airtel Business',
        amount: 170000,
        date: '2026-10-08',
        category: 'Software',
        confidence: 91,
        source: 'receipt',
        description: 'Internet and phone subscription',
        status: 'approved'
      },
      {
        id: 'EXP-1002',
        vendor: 'PowerFlex',
        amount: 53000,
        date: '2026-10-09',
        category: 'Utilities',
        confidence: 88,
        source: 'manual',
        description: 'Electricity backup solution',
        status: 'review'
      },
      {
        id: 'EXP-1003',
        vendor: 'Kola Transport',
        amount: 95000,
        date: '2026-10-10',
        category: 'Travel',
        confidence: 76,
        source: 'receipt',
        description: 'Fuel and transport for client meetings',
        status: 'review'
      }
    ];

    saveExpenses(defaultExpenses);
    return defaultExpenses;
  }

  try {
    return JSON.parse(raw) as ExpenseEntry[];
  } catch {
    return [];
  }
}

export function saveExpenses(expenses: ExpenseEntry[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(EXPENSE_STORAGE_KEY, JSON.stringify(expenses));
}
