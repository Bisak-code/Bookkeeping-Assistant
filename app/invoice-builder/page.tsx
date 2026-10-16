'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { getNextInvoiceNumber, loadBusinessProfile, loadInvoices, saveInvoices, type SavedInvoice } from '@/lib/business-storage';
import { calculateInvoiceTotals, formatMoney, generatePaystackCheckoutLink } from '@/lib/finance';

const defaultInvoice = {
  clientName: 'Ada Sol',
  businessName: 'Bright Ledger',
  description: 'Brand identity design package',
  quantity: 3,
  rate: 50000,
  vatRate: 7.5,
  discount: 0,
  dueDate: '2026-10-30',
};

export default function InvoiceBuilderPage() {
  const [invoice, setInvoice] = useState(defaultInvoice);
  const [saved, setSaved] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    const profile = loadBusinessProfile();
    setInvoice((current) => ({ ...current, businessName: profile.businessName, vatRate: profile.defaultVatRate }));
  }, []);

  const totals = useMemo(() => {
    return calculateInvoiceTotals({
      quantity: invoice.quantity,
      rate: invoice.rate,
      vatRate: invoice.vatRate,
      discount: invoice.discount,
    });
  }, [invoice]);

  const updateField = (field: keyof typeof defaultInvoice, value: string | number) => {
    setInvoice((current) => ({ ...current, [field]: value }));
  };

  const handleSaveInvoice = () => {
    const profile = loadBusinessProfile();
    const nextId = getNextInvoiceNumber(profile.invoicePrefix || 'BKS');
    const savedInvoice: SavedInvoice = {
      id: nextId,
      clientName: invoice.clientName,
      businessName: invoice.businessName,
      description: invoice.description,
      quantity: invoice.quantity,
      rate: invoice.rate,
      vatRate: invoice.vatRate,
      discount: invoice.discount,
      dueDate: invoice.dueDate,
      amount: totals.total,
      status: 'Draft',
      createdAt: new Date().toISOString(),
      paymentLink: generatePaystackCheckoutLink({
        id: nextId,
        amount: totals.total,
        businessName: invoice.businessName,
        clientName: invoice.clientName,
        description: invoice.description,
      }, profile.email),
    };

    const currentInvoices = loadInvoices();
    saveInvoices([savedInvoice, ...currentInvoices]);
    setSaved(true);
    setPaymentStatus('Draft saved with Paystack-ready link');
    window.setTimeout(() => setSaved(false), 1400);
  };

  const handleSendViaPaystack = () => {
    const profile = loadBusinessProfile();
    const nextId = getNextInvoiceNumber(profile.invoicePrefix || 'BKS');
    const paidInvoice: SavedInvoice = {
      id: nextId,
      clientName: invoice.clientName,
      businessName: invoice.businessName,
      description: invoice.description,
      quantity: invoice.quantity,
      rate: invoice.rate,
      vatRate: invoice.vatRate,
      discount: invoice.discount,
      dueDate: invoice.dueDate,
      amount: totals.total,
      status: 'Sent',
      createdAt: new Date().toISOString(),
      paymentLink: generatePaystackCheckoutLink({
        id: nextId,
        amount: totals.total,
        businessName: invoice.businessName,
        clientName: invoice.clientName,
        description: invoice.description,
      }, profile.email),
    };

    const currentInvoices = loadInvoices();
    saveInvoices([paidInvoice, ...currentInvoices]);
    setPaymentStatus('Payment link prepared and saved for sending');
    if (typeof window !== 'undefined') {
      window.open(paidInvoice.paymentLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white p-6 lg:flex">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-lg font-bold text-white">B</div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Finance OS</p>
            <h1 className="text-lg font-bold text-slate-900">Bright Ledger</h1>
          </div>
        </div>

        <nav className="space-y-2 text-sm font-medium text-slate-600">
          <Link href="/" className="sidebar-link">Dashboard</Link>
          <Link href="/invoice-builder" className="sidebar-link active">Invoice Builder</Link>
          <Link href="/invoices" className="sidebar-link">Invoices</Link>
          <Link href="/expenses" className="sidebar-link">Expenses</Link>
          <Link href="/reports" className="sidebar-link">Reports</Link>
          <Link href="/settings" className="sidebar-link">Settings</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Invoice builder</p>
            <h2 className="mt-1 text-3xl font-bold text-slate-900">Create a branded invoice</h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSaveInvoice}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
            >
              {saved ? 'Saved' : 'Save draft'}
            </button>
            <button
              onClick={handleSendViaPaystack}
              className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
            >
              Send via Paystack
            </button>
          </div>
        </div>

        {paymentStatus ? (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {paymentStatus}
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="card p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700">
                Client name
                <input
                  value={invoice.clientName}
                  onChange={(event) => updateField('clientName', event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-0 focus:border-brand-500"
                />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Business name
                <input
                  value={invoice.businessName}
                  onChange={(event) => updateField('businessName', event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-0 focus:border-brand-500"
                />
              </label>

              <label className="md:col-span-2 text-sm font-medium text-slate-700">
                Description
                <input
                  value={invoice.description}
                  onChange={(event) => updateField('description', event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-0 focus:border-brand-500"
                />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Quantity
                <input
                  type="number"
                  min="1"
                  value={invoice.quantity}
                  onChange={(event) => updateField('quantity', Number(event.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-0 focus:border-brand-500"
                />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Rate (₦)
                <input
                  type="number"
                  min="0"
                  value={invoice.rate}
                  onChange={(event) => updateField('rate', Number(event.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-0 focus:border-brand-500"
                />
              </label>

              <label className="text-sm font-medium text-slate-700">
                VAT rate (%)
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={invoice.vatRate}
                  onChange={(event) => updateField('vatRate', Number(event.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-0 focus:border-brand-500"
                />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Discount (%)
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={invoice.discount}
                  onChange={(event) => updateField('discount', Number(event.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-0 focus:border-brand-500"
                />
              </label>

              <label className="md:col-span-2 text-sm font-medium text-slate-700">
                Due date
                <input
                  type="date"
                  value={invoice.dueDate}
                  onChange={(event) => updateField('dueDate', event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-0 focus:border-brand-500"
                />
              </label>
            </div>
          </section>

          <aside className="card p-5">
            <h3 className="text-lg font-semibold text-slate-900">Invoice preview</h3>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Invoice</p>
                  <p className="mt-1 text-xl font-bold text-slate-900">{invoice.businessName}</p>
                </div>
                <div className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">Draft</div>
              </div>

              <div className="mt-5 space-y-2 text-sm text-slate-600">
                <p><span className="font-medium text-slate-800">Bill to:</span> {invoice.clientName}</p>
                <p><span className="font-medium text-slate-800">Service:</span> {invoice.description}</p>
                <p><span className="font-medium text-slate-800">Due:</span> {invoice.dueDate}</p>
              </div>

              <div className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatMoney(totals.subtotal)}</span></div>
                <div className="flex justify-between"><span>Discount</span><span>-{formatMoney(totals.discountAmount)}</span></div>
                <div className="flex justify-between"><span>VAT</span><span>{formatMoney(totals.vat)}</span></div>
                <div className="mt-3 flex justify-between border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
                  <span>Total</span>
                  <span>{formatMoney(totals.total)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
