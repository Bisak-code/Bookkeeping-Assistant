'use client';

import { useEffect, useState } from 'react';

import { Sidebar } from '@/components/sidebar';
import { defaultBusinessProfile, loadBusinessProfile, saveBusinessProfile, type BusinessProfile } from '@/lib/business-storage';

export default function SettingsPage() {
  const [profile, setProfile] = useState<BusinessProfile>(defaultBusinessProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProfile(loadBusinessProfile());
  }, []);

  const updateField = (field: keyof BusinessProfile, value: string | number) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const handleSave = () => {
    saveBusinessProfile(profile);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1400);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Settings</p>
            <h2 className="mt-1 text-3xl font-bold text-slate-900">Business configuration</h2>
          </div>
          <button
            onClick={handleSave}
            className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
          >
            {saved ? 'Saved' : 'Save settings'}
          </button>
        </div>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="card p-5">
            <h3 className="text-lg font-semibold text-slate-900">Business profile</h3>
            <div className="mt-4 grid gap-4">
              <label className="text-sm font-medium text-slate-700">
                Business name
                <input
                  value={profile.businessName}
                  onChange={(event) => updateField('businessName', event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-500"
                />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Email address
                <input
                  value={profile.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-500"
                />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Country
                <input
                  value={profile.country}
                  onChange={(event) => updateField('country', event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-500"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm font-medium text-slate-700">
                  Currency
                  <input
                    value={profile.currency}
                    onChange={(event) => updateField('currency', event.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-500"
                  />
                </label>

                <label className="text-sm font-medium text-slate-700">
                  VAT rate (%)
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={profile.defaultVatRate}
                    onChange={(event) => updateField('defaultVatRate', Number(event.target.value))}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-500"
                  />
                </label>
              </div>

              <label className="text-sm font-medium text-slate-700">
                Invoice prefix
                <input
                  value={profile.invoicePrefix}
                  onChange={(event) => updateField('invoicePrefix', event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-500"
                />
              </label>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="text-lg font-semibold text-slate-900">Nigeria readiness</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>• ₦ default currency and invoice numbering</li>
              <li>• VAT rate is configurable per business</li>
              <li>• Paystack payment links and bank transfer options</li>
              <li>• Simple branding and footer template support</li>
            </ul>

            <div className="mt-6 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
              <p><span className="font-semibold text-slate-900">Gateway:</span> {profile.paymentGateway}</p>
              <p className="mt-2"><span className="font-semibold text-slate-900">Currency:</span> {profile.currency} ({profile.currencySymbol})</p>
              <p className="mt-2"><span className="font-semibold text-slate-900">Default VAT:</span> {profile.defaultVatRate}%</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
