'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/invoice-builder', label: 'Invoice Builder' },
  { href: '/invoices', label: 'Invoices' },
  { href: '/expenses', label: 'Expenses' },
  { href: '/reports', label: 'Reports' },
  { href: '/settings', label: 'Settings' }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white px-5 py-6">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-lg font-bold text-white">B</div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Finance OS</p>
          <h1 className="text-lg font-bold text-slate-900">Bright Ledger</h1>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx('sidebar-link', isActive && 'active')}
            >
              <span className="h-2 w-2 rounded-full bg-current opacity-80" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl bg-slate-100 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Nigeria default</p>
        <p className="mt-2 text-sm font-semibold text-slate-800">Currency: ₦ NGN</p>
        <p className="mt-1 text-sm text-slate-600">Paystack enabled</p>
      </div>
    </aside>
  );
}
