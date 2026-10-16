'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Sidebar } from '@/components/sidebar';
import { loadInvoices, saveInvoices, type SavedInvoice } from '@/lib/business-storage';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<SavedInvoice[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setInvoices(loadInvoices());
  }, []);

  const markInvoiceAsPaid = (id: string) => {
    const nextInvoices = invoices.map((invoice) =>
      invoice.id === id
        ? { ...invoice, status: 'Paid', paidAt: new Date().toISOString() }
        : invoice
    );

    setInvoices(nextInvoices);
    saveInvoices(nextInvoices);
  };

  const copyInvoiceLink = async (invoice: SavedInvoice) => {
    if (!invoice.paymentLink) {
      return;
    }

    try {
      await navigator.clipboard.writeText(invoice.paymentLink);
      setCopiedId(invoice.id);
      window.setTimeout(() => setCopiedId(null), 1200);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Invoices</p>
            <h2 className="mt-1 text-3xl font-bold text-slate-900">Invoice management</h2>
          </div>
          <Link href="/invoice-builder" className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">+ Create invoice</Link>
        </div>

        <section className="card p-5">
          <div className="mb-4 flex items-center justify-between text-sm text-slate-600">
            <span>Recent activity</span>
            <span>Paystack-ready</span>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Invoice</th>
                  <th className="px-4 py-3 font-medium">Client</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Due</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-t border-slate-200">
                    <td className="px-4 py-3 font-semibold text-slate-800">{invoice.id}</td>
                    <td className="px-4 py-3 text-slate-600">{invoice.clientName}</td>
                    <td className="metric-value px-4 py-3 font-semibold text-slate-900">₦{invoice.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-600">{invoice.dueDate}</td>
                    <td className="px-4 py-3">
                      <span className={`badge ${invoice.status === 'Paid' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : invoice.status === 'Overdue' ? 'border-amber-200 bg-amber-50 text-amber-700' : invoice.status === 'Sent' ? 'border-sky-200 bg-sky-50 text-sky-700' : 'border-slate-200 bg-slate-100 text-slate-700'}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => copyInvoiceLink(invoice)}
                          className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-300"
                        >
                          {copiedId === invoice.id ? 'Copied' : 'Pay link'}
                        </button>
                        {invoice.status !== 'Paid' ? (
                          <button
                            onClick={() => markInvoiceAsPaid(invoice.id)}
                            className="rounded-lg bg-emerald-500 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-emerald-600"
                          >
                            Mark paid
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
