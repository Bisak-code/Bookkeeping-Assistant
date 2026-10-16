'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { Sidebar } from '@/components/sidebar';
import { StatCard } from '@/components/stat-card';
import { defaultBusinessProfile, loadBusinessProfile, loadInvoices, type SavedInvoice } from '@/lib/business-storage';
import { formatMoney } from '@/lib/finance';
import { alerts, aiSuggestions, expenseQueue } from '@/lib/mock-data';

export default function HomePage() {
  const [profile, setProfile] = useState(defaultBusinessProfile);
  const [invoices, setInvoices] = useState<SavedInvoice[]>([]);

  useEffect(() => {
    setProfile(loadBusinessProfile());
    setInvoices(loadInvoices());
  }, []);

  const dashboardStats = useMemo(() => {
    const paidTotal = invoices
      .filter((invoice) => invoice.status === 'Paid')
      .reduce((sum, invoice) => sum + invoice.amount, 0);

    const outstandingTotal = invoices
      .filter((invoice) => invoice.status !== 'Paid')
      .reduce((sum, invoice) => sum + invoice.amount, 0);

    return [
      { label: 'Cash in bank', value: formatMoney(Math.max(0, paidTotal - outstandingTotal)), tone: 'brand' },
      { label: 'Outstanding invoices', value: formatMoney(outstandingTotal), tone: 'warning' },
      { label: 'Paid this month', value: formatMoney(paidTotal), tone: 'success' },
      { label: 'Expense run-rate', value: formatMoney(8200000), tone: 'slate' }
    ];
  }, [invoices]);

  const recentInvoices = useMemo(() => {
    return invoices.slice(0, 4).map((invoice) => ({
      id: invoice.id,
      client: invoice.clientName,
      amount: invoice.amount,
      status: invoice.status,
      due: invoice.dueDate
    }));
  }, [invoices]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Overview</p>
            <h2 className="mt-1 text-3xl font-bold text-slate-900">{profile.businessName}</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/onboarding" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300">
              Setup business
            </Link>
            <Link href="/invoice-builder" className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600">
              + New invoice
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={String(stat.value)} tone={stat.tone as 'brand' | 'success' | 'warning' | 'slate'} />
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <section className="card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Recent invoices</h3>
              <button className="text-sm font-medium text-brand-700">View all</button>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">Invoice</th>
                    <th className="px-4 py-3 font-medium">Client</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-t border-slate-200">
                      <td className="px-4 py-3 font-medium text-slate-800">{invoice.id}</td>
                      <td className="px-4 py-3 text-slate-600">{invoice.client}</td>
                      <td className="metric-value px-4 py-3 font-semibold text-slate-900">₦{invoice.amount.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`badge ${invoice.status === 'Paid' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : invoice.status === 'Overdue' ? 'border-amber-200 bg-amber-50 text-amber-700' : invoice.status === 'Sent' ? 'border-sky-200 bg-sky-50 text-sky-700' : 'border-slate-200 bg-slate-100 text-slate-700'}`}>
                          {invoice.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-6">
            <div className="card p-5">
              <h3 className="text-lg font-semibold text-slate-900">AI alerts</h3>
              <ul className="mt-4 space-y-3">
                {alerts.map((alert) => (
                  <li key={alert.text} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <span className={`mt-1 h-2.5 w-2.5 rounded-full ${alert.severity === 'warning' ? 'bg-amber-500' : alert.severity === 'success' ? 'bg-emerald-500' : 'bg-sky-500'}`} />
                    <span className="text-sm text-slate-700">{alert.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-5">
              <h3 className="text-lg font-semibold text-slate-900">AI assistant</h3>
              <div className="mt-4 space-y-3">
                {aiSuggestions.map((text) => (
                  <div key={text} className="rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm text-slate-700">
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_1fr]">
          <section className="card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Expense review queue</h3>
              <button className="text-sm font-medium text-brand-700">Review all</button>
            </div>

            <div className="space-y-3">
              {expenseQueue.map((expense) => (
                <div key={expense.vendor} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                  <div>
                    <p className="font-semibold text-slate-800">{expense.vendor}</p>
                    <p className="text-sm text-slate-500">{expense.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="metric-value font-semibold text-slate-900">₦{expense.amount.toLocaleString()}</p>
                    <p className="text-xs text-emerald-700">AI confidence: {expense.confidence}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card p-5">
            <h3 className="text-lg font-semibold text-slate-900">MVP focus</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>• Business profile + branding setup</li>
              <li>• Invoice drafting, PDF preview and payment tracking</li>
              <li>• Expense OCR and categorization review</li>
              <li>• Daily cash flow summary and alerts</li>
              <li>• Nigeria pricing defaults with configurable VAT</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
