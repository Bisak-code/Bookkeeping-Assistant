'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { defaultBusinessProfile, loadBusinessProfile, saveBusinessProfile } from '@/lib/business-storage';

export default function OnboardingPage() {
  const router = useRouter();
  const [profile, setProfile] = useState(loadBusinessProfile());

  const updateField = (field: keyof typeof profile, value: string | number) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = () => {
    saveBusinessProfile(profile);
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 md:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white shadow-soft">
        <div className="border-b border-slate-200 px-6 py-6 md:px-8">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Setup</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Set up your business profile</h1>
        </div>

        <div className="grid gap-8 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-8">
          <section className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Business name
              <input
                value={profile.businessName}
                onChange={(event) => updateField('businessName', event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-500"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Email address
              <input
                value={profile.email}
                onChange={(event) => updateField('email', event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-500"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Country
                <input
                  value={profile.country}
                  onChange={(event) => updateField('country', event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-500"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Currency
                <input
                  value={profile.currency}
                  onChange={(event) => updateField('currency', event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-500"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                VAT rate (%)
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={profile.defaultVatRate}
                  onChange={(event) => updateField('defaultVatRate', Number(event.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-500"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Payment gateway
                <input
                  value={profile.paymentGateway}
                  onChange={(event) => updateField('paymentGateway', event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-500"
                />
              </label>
            </div>

            <label className="block text-sm font-medium text-slate-700">
              Tax ID
              <input
                value={profile.taxId || ''}
                onChange={(event) => updateField('taxId', event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-500"
              />
            </label>
          </section>

          <aside className="rounded-2xl bg-brand-50 p-5">
            <h2 className="text-lg font-semibold text-brand-900">Nigeria-first defaults</h2>
            <ul className="mt-4 space-y-3 text-sm text-brand-900/80">
              <li>• Default currency: {profile.currencySymbol || '₦'}</li>
              <li>• VAT stays configurable per business</li>
              <li>• Paystack is enabled by default</li>
              <li>• Invoices are branded in the app and payment flow</li>
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={handleSubmit}
                className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
              >
                Save and continue
              </button>
              <Link href="/" className="rounded-xl border border-brand-200 bg-white px-4 py-2 text-center text-sm font-semibold text-brand-700">
                Skip for now
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
