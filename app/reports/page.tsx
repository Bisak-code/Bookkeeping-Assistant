import { Sidebar } from '@/components/sidebar';
import { reports } from '@/lib/mock-data';

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Reports</p>
          <h2 className="mt-1 text-3xl font-bold text-slate-900">Financial reporting</h2>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {reports.map((report) => (
            <div key={report.name} className="card p-5">
              <p className="text-sm text-slate-500">{report.type}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{report.name}</h3>
              <p className="mt-4 text-sm text-slate-500">Updated {report.updated}</p>
              <button className="mt-4 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">Export</button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
