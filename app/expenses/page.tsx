'use client';

import { useEffect, useState } from 'react';

import { Sidebar } from '@/components/sidebar';
import { loadExpenses, saveExpenses, type ExpenseEntry } from '@/lib/business-storage';
import { formatMoney, scoreExpenseConfidence, suggestExpenseCategory } from '@/lib/finance';

const blankExpense = {
  vendor: 'Airtel Business',
  amount: 170000,
  date: '2026-10-16',
  description: 'Monthly internet and mobile plan',
};

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<ExpenseEntry[]>([]);
  const [form, setForm] = useState(blankExpense);

  useEffect(() => {
    setExpenses(loadExpenses());
  }, []);

  const approveExpense = (id: string) => {
    const nextExpenses: ExpenseEntry[] = expenses.map((expense) =>
      expense.id === id ? { ...expense, status: 'approved' } : expense
    );

    setExpenses(nextExpenses);
    saveExpenses(nextExpenses);
  };

  const addExpense = () => {
    const vendor = form.vendor.trim();
    if (!vendor) {
      return;
    }

    const category = suggestExpenseCategory(vendor);
    const confidence = scoreExpenseConfidence(vendor);
    const nextExpense: ExpenseEntry = {
      id: `EXP-${Date.now()}`,
      vendor,
      amount: Number(form.amount) || 0,
      date: form.date,
      category,
      confidence,
      source: 'manual',
      description: form.description,
      status: 'review'
    };

    const nextExpenses: ExpenseEntry[] = [nextExpense, ...expenses];

    setExpenses(nextExpenses);
    saveExpenses(nextExpenses);
    setForm(blankExpense);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Expenses</p>
            <h2 className="mt-1 text-3xl font-bold text-slate-900">Expense capture and categorization</h2>
          </div>
          <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300">+ Upload receipt</button>
        </div>

        <section className="mb-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 md:grid-cols-4">
          <label className="text-sm font-medium text-slate-700">
            Vendor
            <input
              value={form.vendor}
              onChange={(event) => setForm((current) => ({ ...current, vendor: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-500"
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Amount (₦)
            <input
              type="number"
              min="0"
              value={form.amount}
              onChange={(event) => setForm((current) => ({ ...current, amount: Number(event.target.value) }))}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-500"
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Date
            <input
              type="date"
              value={form.date}
              onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-500"
            />
          </label>

          <div className="flex items-end">
            <button
              onClick={addExpense}
              className="w-full rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
            >
              Add expense
            </button>
          </div>
        </section>

        <section className="card p-5">
          <div className="mb-4 flex items-center justify-between rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            <span>{expenses.filter((expense) => expense.status === 'review').length} items awaiting review</span>
            <span>AI category suggestions enabled</span>
          </div>

          <div className="space-y-3">
            {expenses.map((expense) => (
              <div key={expense.id} className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-slate-800">{expense.vendor}</p>
                  <p className="text-sm text-slate-500">{expense.date} · {expense.description}</p>
                </div>
                <div className="text-left md:text-right">
                  <p className="metric-value font-bold text-slate-900">{formatMoney(expense.amount)}</p>
                  <p className="text-sm text-slate-500">Suggested: {expense.category}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`badge ${expense.status === 'approved' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-amber-200 bg-amber-50 text-amber-700'}`}>
                    {expense.confidence}% confidence
                  </span>
                  <button
                    onClick={() => approveExpense(expense.id)}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-slate-300"
                  >
                    {expense.status === 'approved' ? 'Approved' : 'Approve'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
