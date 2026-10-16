type StatCardProps = {
  label: string;
  value: string;
  tone?: 'brand' | 'success' | 'warning' | 'slate';
};

const toneClasses = {
  brand: 'bg-brand-50 text-brand-700',
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  slate: 'bg-slate-100 text-slate-700'
};

export function StatCard({ label, value, tone = 'brand' }: StatCardProps) {
  return (
    <div className="card p-5">
      <div className={`mb-4 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses[tone]}`}>
        {label}
      </div>
      <div className="metric-value text-2xl font-bold text-slate-900">{value}</div>
    </div>
  );
}
