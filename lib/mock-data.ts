import { appConfig } from '@/lib/config';

export type InvoiceStatus = 'Paid' | 'Sent' | 'Draft' | 'Overdue';

export const dashboardStats = [
  { label: 'Cash in bank', value: `${appConfig.currencySymbol}24,480,000`, tone: 'brand' },
  { label: 'Outstanding invoices', value: `${appConfig.currencySymbol}6,250,000`, tone: 'warning' },
  { label: 'Paid this month', value: `${appConfig.currencySymbol}15,900,000`, tone: 'success' },
  { label: 'Expense run-rate', value: `${appConfig.currencySymbol}8,180,000`, tone: 'slate' }
];

export const recentInvoices = [
  { id: 'INV-1048', client: 'Ada Sol', amount: 420000, status: 'Paid' as InvoiceStatus, due: 'Due today' },
  { id: 'INV-1049', client: 'Lagos Design Studio', amount: 780000, status: 'Sent' as InvoiceStatus, due: 'Due in 4 days' },
  { id: 'INV-1050', client: 'Jade Foods', amount: 560000, status: 'Overdue' as InvoiceStatus, due: 'Overdue by 6 days' },
  { id: 'INV-1051', client: 'Mosaic Events', amount: 2500000, status: 'Draft' as InvoiceStatus, due: 'Draft' }
];

export const expenseQueue = [
  { vendor: 'Print Avenue', amount: 185000, category: 'Marketing', confidence: '94%' },
  { vendor: 'PowerFlex', amount: 53000, category: 'Utilities', confidence: '88%' },
  { vendor: 'Kola Transport', amount: 95000, category: 'Travel', confidence: '76%' },
  { vendor: 'Airtel Business', amount: 170000, category: 'Software', confidence: '91%' }
];

export const alerts = [
  { severity: 'warning', text: 'Projected cash shortfall in 30 days: ₦1.4m.' },
  { severity: 'info', text: '3 overdue invoices above ₦500k are awaiting follow-up.' },
  { severity: 'success', text: 'Average payment cycle improved by 3 days this month.' }
];

export const reports = [
  { name: 'Profit & Loss', type: 'Monthly', updated: '2 hours ago' },
  { name: 'Cash flow', type: '90 days', updated: 'Today' },
  { name: 'VAT summary', type: 'Quarterly', updated: 'Yesterday' },
  { name: 'Aged receivables', type: 'Current', updated: 'Today' }
];

export const aiSuggestions = [
  'The largest expense spike is software and internet costs in the last 14 days.',
  'Two clients are behind on payment terms and may need reminders this week.',
  'Your margin is still healthy, but rent and payroll are tightening margin for the next 30 days.'
];
